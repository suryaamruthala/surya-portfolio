import { supabase } from '../lib/supabaseClient';

// Profile is a single-row table. We always upsert with id = 1.
const PROFILE_ID = 1;

export const getProfile = async () => {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', PROFILE_ID)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  
  if (data) {
    try {
      const { data: files } = await supabase.storage.from('portfolio-assets').list();
      if (files && files.length > 0) {
        // Find if the current photo_url exists in the bucket
        let currentPhotoExists = false;
        if (data.photo_url) {
          const currentFileName = data.photo_url.substring(data.photo_url.lastIndexOf('/') + 1);
          currentPhotoExists = files.some(f => f.name === currentFileName);
        }

        // If current photo is deleted from bucket but we have other images, fallback to one
        // ONLY do this if there is a broken URL (data.photo_url is present but not in bucket)
        // If data.photo_url is null, it means they clicked 'Remove', so we should respect that!
        if (data.photo_url && !currentPhotoExists) {
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
          const anotherImage = files.find(f => 
            imageExtensions.some(ext => f.name.toLowerCase().endsWith(ext)) && 
            f.name !== 'resume.pdf' && 
            f.name !== '.emptyFolderPlaceholder' &&
            f.name !== 'credentials'
          );
          
          if (anotherImage) {
            const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(anotherImage.name);
            data.photo_url = publicUrl;
          } else {
            data.photo_url = null; // No images left at all
          }
        }
      }
    } catch (err) {
      console.error('Error fetching dynamic profile photo:', err);
    }
  }
  
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
  // Use a unique name so we don't aggressively overwrite and we can store multiple
  const fileExt = file.name.split('.').pop();
  const rawName = file.name.replace(`.${fileExt}`, '').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `profile_${rawName}_${Date.now()}.${fileExt}`;

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

export const deleteProfilePhoto = async (photoUrl) => {
  if (photoUrl) {
    // Extract exact file name from URL
    const fileName = photoUrl.substring(photoUrl.lastIndexOf('/') + 1);
    const { error: storageError } = await supabase.storage.from('portfolio-assets').remove([fileName]);
    if (storageError) console.error("Could not delete from storage:", storageError);
  }
  
  const { error } = await supabase.from('profile').update({ photo_url: null }).eq('id', PROFILE_ID);
  if (error) throw error;
};

