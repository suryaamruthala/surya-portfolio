import { supabase } from '../lib/supabaseClient';

export const getCertifications = async () => {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('issue_date', { ascending: false });
  if (error) throw error;
  return data;
};

export const addCertification = async (certData) => {
  const { data, error } = await supabase
    .from('certifications')
    .insert([certData])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateCertification = async (id, certData) => {
  const { data, error } = await supabase
    .from('certifications')
    .update(certData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteCertification = async (id) => {
  const { error } = await supabase
    .from('certifications')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const uploadCertificationFile = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `credential_${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage
    .from('portfolio-assets')
    .upload(`credentials/${fileName}`, file, { cacheControl: '3600' });
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('portfolio-assets')
    .getPublicUrl(`credentials/${fileName}`);
  return publicUrl;
};
