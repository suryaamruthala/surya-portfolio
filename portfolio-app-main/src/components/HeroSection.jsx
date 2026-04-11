import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiLoader } from 'react-icons/fi';
import { getProfile } from '../services/profileService';

export const HeroSection = () => {
  const [profile, setProfile] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error);
  }, []);

  const name = profile?.name || 'Surya Amruthala';
  const title = profile?.title || 'Full Stack Developer';
  const subtitle = profile?.subtitle || 'I Build Scalable Enterprise Applications & Modern Full-Stack Experiences';
  const photoUrl = profile?.photo_url || null;
  const resumeUrl = profile?.resume_url || '/resume.pdf';

  const handleDownloadResume = async () => {
    if (!resumeUrl) return;
    // Open in new tab immediately (no popup blocker)
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    // Also force-download via blob for cross-origin Supabase URLs
    setDownloading(true);
    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloading(false);
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
      
      {/* Resume Button - Absolute Top Left Below Header */}
      <div className="absolute top-8 left-4 md:left-8 z-10">
        <button
          onClick={handleDownloadResume}
          disabled={downloading}
          className="flex items-center gap-2 text-sm md:text-base font-bold text-primary px-5 py-2.5 glass glass-hover rounded-full transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-wait"
        >
          {downloading ? <FiLoader size={18} className="animate-spin" /> : <FiDownload size={18} />}
          {downloading ? 'Downloading...' : 'Download Resume'}
        </button>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-12"
      >
        {/* Planet elements revolving around the profile */}
        <div className="absolute inset-[-40px] animate-[spin_12s_linear_infinite] pointer-events-none">
          {/* Orbit Trail */}
          <div className="absolute inset-0 rounded-full border border-primary/20 border-dashed"></div>
          {/* Planet 1 - Cyan/Blue */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -ml-3 w-6 h-6 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>
          </div>
          {/* Planet 2 - Purple/Pink */}
          <div className="absolute inset-0 rotate-[120deg]">
            <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
          </div>
          {/* Planet 3 - Yellow/Orange */}
          <div className="absolute inset-0 rotate-[240deg]">
            <div className="absolute top-0 left-1/2 -ml-2.5 w-5 h-5 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>
          </div>
        </div>

        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full p-2 bg-gradient-to-tr from-primary via-secondary to-accent">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-card">
            {photoUrl ? (
              <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30 text-5xl font-black text-white">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </div>
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 animate-ping opacity-20"></div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl md:text-8xl font-black mb-6 tracking-tight"
      >
        Hi, I'm <span className="text-gradient">{name}</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-lg md:text-2xl text-primary font-bold mb-4 uppercase tracking-widest"
      >
        {title}
      </motion.p>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl leading-relaxed font-medium"
      >
        {subtitle}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 md:gap-6"
      >
        <a href="#projects" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-2xl shadow-primary/40 hover:-translate-y-1">
          Explore Projects
        </a>
        <a href="#contact" className="px-8 py-4 glass glass-hover rounded-2xl font-bold flex items-center gap-2 hover:-translate-y-1">
          Let's Talk
        </a>
      </motion.div>
    </section>
  );
};
