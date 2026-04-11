import { supabase } from '../lib/supabaseClient';

// Profile is a single-row table. We always upsert with id = 1.
const PROFILE_ID = 1;

export const getProfile = async () => {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', PROFILE_ID)
    .single();
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = row not found, that's ok
  return data || null;
};

export const upsertProfile = async (profileData) => {
  const { data, error } = await supabase
    .from('profile')
    .upsert({ ...profileData, id: PROFILE_ID }, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const uploadProfilePhoto = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `profile.${fileExt}`;
  const { error } = await supabase.storage
    .from('portfolio-assets')
    .upload(fileName, file, { upsert: true, cacheControl: '3600' });
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage
    .from('portfolio-assets')
    .getPublicUrl(fileName);
  return publicUrl;
};

export const uploadResume = async (file) => {
  const { error } = await supabase.storage
    .from('portfolio-assets')
    .upload('resume.pdf', file, { upsert: true, cacheControl: '3600' });
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage
    .from('portfolio-assets')
    .getPublicUrl('resume.pdf');
  return publicUrl;
};
