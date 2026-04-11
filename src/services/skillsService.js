import { supabase } from '../lib/supabaseClient';

export const getSkills = async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const addSkill = async (skillData) => {
  const { data, error } = await supabase
    .from('skills')
    .insert([skillData])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateSkill = async (id, skillData) => {
  const { data, error } = await supabase
    .from('skills')
    .update(skillData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteSkill = async (id) => {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
