import { useEffect, useState, useRef, useCallback } from 'react';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../services/skillsService';
import { getCertifications, addCertification, updateCertification, deleteCertification, uploadCertificationFile } from '../services/certificationsService';
import { getProfile, upsertProfile, uploadProfilePhoto, uploadResume, deleteProfilePhoto } from '../services/profileService';
import { FiTrash2, FiEdit2, FiPlus, FiAward, FiCode, FiUser, FiUpload, FiSave, FiFile } from 'react-icons/fi';

const TABS = ['profile', 'skills', 'certifications'];
const TAB_ICONS = { profile: <FiUser />, skills: <FiCode />, certifications: <FiAward /> };

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  // Profile state
  const [profile, setProfile] = useState({ name: '', title: '', subtitle: '', bio: '', bio2: '', resume_url: '', github_url: '', linkedin_url: '', email: '', photo_url: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoDeleting, setPhotoDeleting] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [certUploading, setCertUploading] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const fileInputRef = useRef();
  const resumeInputRef = useRef();
  const certInputRef = useRef();

  // List states
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      if (activeTab === 'profile') {
        const p = await getProfile();
        if (p) setProfile(p);
      }
      if (activeTab === 'skills') setSkills(await getSkills());
      if (activeTab === 'certifications') setCertifications(await getCertifications());
    } catch (err) { console.error(err); }
    if (!silent) setLoading(false);
  }, [activeTab]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData(); }, [activeTab, fetchData]);

  // Profile photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUploading(true);
    try {
      const url = await uploadProfilePhoto(file);
      setProfile(p => ({ ...p, photo_url: url }));
    } catch (err) { alert('Photo upload failed: ' + err.message); }
    setPhotoUploading(false);
  };

  // Profile photo delete
  const handlePhotoDelete = async () => {
    if (!window.confirm("Are you sure you want to remove your current profile photo?")) return;
    setPhotoDeleting(true);
    try {
      await deleteProfilePhoto(profile.photo_url);
      setProfile(p => ({ ...p, photo_url: null }));
    } catch (err) { alert('Photo delete failed: ' + err.message); }
    setPhotoDeleting(false);
  };

  // Profile resume upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') { alert('Please upload a PDF file only.'); return; }
    setResumeUploading(true);
    try {
      const url = await uploadResume(file);
      setProfile(p => ({ ...p, resume_url: url }));
      setProfileMsg('✓ Resume uploaded!');
      setTimeout(() => setProfileMsg(''), 3000);
    } catch (err) { alert('Resume upload failed: ' + err.message); }
    setResumeUploading(false);
  };

  // Cert upload
  const handleCertUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCertUploading(true);
    try {
      const url = await uploadCertificationFile(file);
      setFormData(prev => ({ ...prev, credential_url: url }));
    } catch (err) { alert('Credential upload failed: ' + err.message); }
    setCertUploading(false);
  };

  // Profile save
  const handleProfileSave = async () => {
    setProfileSaving(true);
    setProfileMsg('');
    try {
      await upsertProfile(profile);
      setProfileMsg('✓ Profile saved successfully!');
      setTimeout(() => setProfileMsg(''), 3000);
    } catch (err) { alert('Failed to save profile: ' + err.message); }
    setProfileSaving(false);
  };

  // Modal open/close
  const handleOpenModal = (entity = null) => {
    setCurrentEntity(entity);
    if (activeTab === 'skills') {
      setFormData(entity ? { ...entity } : { category: 'frontend', name: '' });
    } else if (activeTab === 'certifications') {
      const formattedDate = entity?.issue_date ? new Date(entity.issue_date).toISOString().split('T')[0] : '';
      setFormData(entity ? { ...entity, issue_date: formattedDate } : { title: '', issuer: '', issuer_logo_url: '', issue_date: '', credential_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => { setIsModalOpen(false); setCurrentEntity(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'skills') {
        currentEntity ? await updateSkill(currentEntity.id, formData) : await addSkill(formData);
      } else if (activeTab === 'certifications') {
        currentEntity ? await updateCertification(currentEntity.id, formData) : await addCertification(formData);
      }
      handleCloseModal();
      fetchData(true); // silent fetch for instant feel
    } catch (err) { alert('Save failed: ' + err.message); }
  };

  const [deleteError, setDeleteError] = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    setDeleteError('');
    
    // Optimistic UI update
    if (activeTab === 'skills') setSkills(s => s.filter(x => x.id !== id));
    if (activeTab === 'certifications') setCertifications(c => c.filter(x => x.id !== id));

    try {
      if (activeTab === 'skills') await deleteSkill(id);
      if (activeTab === 'certifications') await deleteCertification(id);
      fetchData(true); // silent background sync
    } catch (err) {
      // Revert if failed
      fetchData(true);
      setDeleteError(err.message);
      setTimeout(() => setDeleteError(''), 10000); // clear after 10s
    }
  };

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-black/20 p-1.5 rounded-2xl">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold capitalize transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:text-white'}`}
            >
              {TAB_ICONS[tab]} {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-24 text-gray-400 animate-pulse font-bold">Loading...</div>
      ) : (

        <>
          {/* ──── PROFILE TAB ──── */}
          {activeTab === 'profile' && (
            <div className="glass rounded-3xl p-8 md:p-12 border border-border">
              <h2 className="text-2xl font-bold mb-8">Edit Profile</h2>
              
              {/* Photo Upload */}
              <div className="flex items-center gap-6 mb-10">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/40 flex-shrink-0 bg-card">
                  {profile.photo_url
                    ? <img src={profile.photo_url} alt="Profile" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center bg-primary/20 text-3xl font-black text-primary">{profile.name?.charAt(0) || '?'}</div>
                  }
                </div>
                <div>
                  <p className="font-bold mb-2">Profile Photo</p>
                  <p className="text-sm text-gray-400 mb-3">Upload to Supabase Storage (portfolio-assets bucket)</p>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
                  
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => fileInputRef.current.click()} disabled={photoUploading || photoDeleting}
                      className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl font-bold text-primary hover:bg-primary/20 transition-all disabled:opacity-50"
                    >
                      <FiUpload /> {photoUploading ? 'Uploading...' : 'Edit / Update Photo'}
                    </button>

                    {profile.photo_url && (
                      <button onClick={handlePhotoDelete} disabled={photoUploading || photoDeleting}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-500 rounded-xl font-bold hover:bg-red-500/20 shadow-none border border-red-500/20 transition-all disabled:opacity-50"
                      >
                        <FiTrash2 /> {photoDeleting ? 'Removing...' : 'Remove'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Full Name', field: 'name', placeholder: 'Surya Amruthala' },
                  { label: 'Job Title', field: 'title', placeholder: 'Full Stack Developer' },
                  { label: 'GitHub URL', field: 'github_url', placeholder: 'https://github.com/...' },
                  { label: 'LinkedIn URL', field: 'linkedin_url', placeholder: 'https://linkedin.com/in/...' },
                  { label: 'Email', field: 'email', placeholder: 'you@example.com' },
                ].map(({ label, field, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">{label}</label>
                    <input type="text" value={profile[field] || ''} onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-white"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Subtitle / Tagline</label>
                  <input type="text" value={profile.subtitle || ''} onChange={e => setProfile(p => ({ ...p, subtitle: e.target.value }))}
                    placeholder="I Build Scalable Enterprise Applications..."
                    className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Bio (Paragraph 1)</label>
                  <textarea rows="4" value={profile.bio || ''} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-white resize-none"
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Bio (Paragraph 2)</label>
                  <textarea rows="3" value={profile.bio2 || ''} onChange={e => setProfile(p => ({ ...p, bio2: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-white resize-none"
                  ></textarea>
                </div>

                {/* Resume Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Resume (PDF)</label>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-border rounded-xl">
                    <div className="text-primary"><FiFile size={36} /></div>
                    <div className="flex-grow min-w-0">
                      {profile.resume_url
                        ? <><p className="font-semibold text-sm truncate">Resume uploaded ✓</p><a href={profile.resume_url} target="_blank" rel="noreferrer" className="text-primary text-xs hover:underline truncate block">{profile.resume_url}</a></>
                        : <p className="text-gray-400 text-sm">No resume uploaded yet. Upload a PDF file.</p>
                      }
                    </div>
                    <div>
                      <input type="file" accept="application/pdf" ref={resumeInputRef} onChange={handleResumeUpload} className="hidden" />
                      <button type="button" onClick={() => resumeInputRef.current.click()} disabled={resumeUploading}
                        className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl font-bold text-primary hover:bg-primary/20 transition-all disabled:opacity-50 whitespace-nowrap"
                      >
                        <FiUpload /> {resumeUploading ? 'Uploading...' : 'Upload PDF'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button onClick={handleProfileSave} disabled={profileSaving}
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/30 disabled:opacity-50"
                >
                  <FiSave /> {profileSaving ? 'Saving...' : 'Save Profile'}
                </button>
                {profileMsg && <span className="text-green-400 font-bold">{profileMsg}</span>}
              </div>
            </div>
          )}

          {/* ──── LIST TABS (Skills / Certifications) ──── */}
          {activeTab !== 'profile' && (
            <>
              <div className="flex justify-end mb-6">
                <button onClick={() => handleOpenModal()}
                  className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
                >
                  <FiPlus size={20} /> Add {activeTab === 'skills' ? 'Skill' : 'Certification'}
                </button>
              </div>

              {deleteError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 font-bold flex items-center justify-between">
                  <span>⚠️ {deleteError}</span>
                  <button onClick={() => setDeleteError('')} className="hover:text-red-300">✕</button>
                </div>
              )}

              <div className="glass rounded-2xl overflow-hidden border border-border">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/20 border-b border-border">
                      {activeTab === 'skills' && <><th className="p-5 font-semibold text-gray-300">Name</th><th className="p-5 font-semibold text-gray-300">Category</th></>}
                      {activeTab === 'certifications' && <><th className="p-5 font-semibold text-gray-300">Title</th><th className="p-5 font-semibold text-gray-300 hidden md:table-cell">Issuer & Date</th></>}
                      <th className="p-5 font-semibold text-gray-300 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === 'skills' && skills.map(item => (
                      <tr key={item.id} className="border-b border-border hover:bg-white/5">
                        <td className="p-5 font-medium">{item.name}</td>
                        <td className="p-5"><span className="px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-widest">{item.category}</span></td>
                        <td className="p-5 text-right">
                          <button onClick={() => handleOpenModal(item)} className="p-2 text-primary hover:bg-primary/20 rounded mr-2"><FiEdit2 size={18} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-500/20 rounded"><FiTrash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'certifications' && certifications.map(item => (
                      <tr key={item.id} className="border-b border-border hover:bg-white/5">
                        <td className="p-5 font-medium">{item.title}</td>
                        <td className="p-5 text-sm text-gray-400 hidden md:table-cell">{item.issuer}<br /><span className="text-xs">{item.issue_date}</span></td>
                        <td className="p-5 text-right">
                          <button onClick={() => handleOpenModal(item)} className="p-2 text-primary hover:bg-primary/20 rounded mr-2"><FiEdit2 size={18} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-500/20 rounded"><FiTrash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                    {((activeTab === 'skills' && skills.length === 0) || (activeTab === 'certifications' && certifications.length === 0)) && (
                      <tr><td colSpan="3" className="p-10 text-center text-gray-500 italic">No {activeTab} found. Add one!</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass p-8 rounded-3xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto border border-border shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gradient capitalize">{currentEntity ? `Edit` : `Add`} {activeTab.slice(0, -1)}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {activeTab === 'projects' && (
                <>
                  <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Title *</label><input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white" /></div>
                  <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Description</label><textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white resize-none"></textarea></div>
                  <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Tech Stack (comma separated)</label><input type="text" value={formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})} placeholder="React, Node, Supabase" className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white" /></div>
                  <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">GitHub URL</label><input type="url" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white" /></div>
                  <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Live URL</label><input type="url" value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white" /></div>
                </>
              )}
              {activeTab === 'skills' && (
                <>
                  <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Skill Name *</label><input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. React.js" className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white" /></div>
                  <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Category *</label>
                    <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-black border border-border rounded-xl focus:outline-none focus:border-primary text-white">
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="database">Database</option>
                      <option value="ai">AI & ML</option>
                      <option value="tools">Tools</option>
                    </select>
                  </div>
                </>
              )}
              {activeTab === 'certifications' && (
                <>
                  <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Title *</label><input required type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Issuer *</label><input required type="text" value={formData.issuer || ''} onChange={e => setFormData({...formData, issuer: e.target.value})} placeholder="Coursera, AWS..." className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white" /></div>
                    <div><label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Issue Date *</label><input required type="date" value={formData.issue_date || ''} onChange={e => setFormData({...formData, issue_date: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white [color-scheme:dark]" /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Issuer Logo URL <span className="normal-case text-xs font-normal opacity-60">(optional — paste logo image URL)</span></label>
                    <div className="flex items-center gap-3">
                      {formData.issuer_logo_url && <img src={formData.issuer_logo_url} alt="logo" className="w-10 h-10 rounded-full object-cover border border-border flex-shrink-0" />}
                      <input type="url" value={formData.issuer_logo_url || ''} onChange={e => setFormData({...formData, issuer_logo_url: e.target.value})} placeholder="https://example.com/logo.png" className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Credential URL or File (PDF/Image)</label>
                    <div className="flex gap-3">
                      <input type="url" value={formData.credential_url || ''} onChange={e => setFormData({...formData, credential_url: e.target.value})} placeholder="https://..." className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:border-primary text-white" />
                      <input type="file" accept="image/*,application/pdf" ref={certInputRef} onChange={handleCertUpload} className="hidden" />
                      <button type="button" onClick={() => certInputRef.current.click()} disabled={certUploading} className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-border rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50 whitespace-nowrap font-bold">
                        <FiUpload /> {certUploading ? '...' : 'Upload'}
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={handleCloseModal} className="px-6 py-3 rounded-xl hover:bg-white/10 transition-colors font-bold">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-blue-600 font-bold shadow-lg shadow-primary/30">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
