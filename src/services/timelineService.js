import { supabase } from '../lib/supabaseClient';

export const getTimeline = async () => {
  const { data, error } = await supabase
    .from('timeline')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const addTimelineItem = async (itemData) => {
  const { data, error } = await supabase
    .from('timeline')
    .insert([itemData])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateTimelineItem = async (id, itemData) => {
  const { data, error } = await supabase
    .from('timeline')
    .update(itemData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteTimelineItem = async (id) => {
  const { data, error } = await supabase
    .from('timeline')
    .delete()
    .eq('id', id)
    .select();
  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error("Supabase RLS Policy rejected delete. You need to enable DELETE permissions in your Supabase database.");
  }
};

export const uploadTimelineDocument = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `timeline_doc_${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage
    .from('portfolio-assets')
    .upload(`timeline/${fileName}`, file, { cacheControl: '3600' });
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('portfolio-assets')
    .getPublicUrl(`timeline/${fileName}`);
  return publicUrl;
};
