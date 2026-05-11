import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { FiDownload, FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import { getProfile } from '../services/profileService';

/* Magnetic button with 3D tilt */
function MagneticButton({ children, className, onClick, disabled, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-30, 30], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), { stiffness: 300, damping: 25 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      disabled={disabled}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </Tag>
  );
}

export const HeroSection = () => {
  const [profile, setProfile] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });

  // Scroll-linked parallax
  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 600], [0, -120]);
  const orbY2 = useTransform(scrollY, [0, 600], [0, -70]);
  const avatarY = useTransform(scrollY, [0, 600], [0, 80]);
  const textY = useTransform(scrollY, [0, 600], [0, 50]);

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error);
  }, []);

  const name = profile?.name || 'Surya Amruthala';
  const title = profile?.title || 'Full Stack Developer & AI Enthusiast';
  const subtitle = profile?.subtitle || 'Hi, I\'m Surya Amruthala, passionate about building intelligent systems and scalable enterprise applications.';
  const photoUrl = profile?.photo_url || '/profile.png';
  const resumeUrl = profile?.resume_url || '/resume.pdf';

  const handleDownloadResume = async (e) => {
    if (!resumeUrl) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ active: true, x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple({ active: false, x: 0, y: 0 }), 600);
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
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
    } catch (err) { console.error('Download failed:', err); }
    setDownloading(false);
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">

      {/* Download Resume – top left */}
      <div className="absolute top-8 left-4 md:left-8 z-10">
        <motion.button
          onClick={handleDownloadResume}
          disabled={downloading}
          whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 24px rgba(59,130,246,0.4)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="relative flex items-center gap-2 text-sm md:text-base font-bold text-primary px-5 py-2.5 glass rounded-full transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-wait overflow-hidden"
        >
          {ripple.active && (
            <motion.span
              className="absolute rounded-full bg-primary/30 pointer-events-none"
              style={{ left: ripple.x - 10, top: ripple.y - 10, width: 20, height: 20 }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 15, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
          <div className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <AnimatePresence mode="wait">
            {downloading ? (
              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full" />
                Downloading...
              </motion.span>
            ) : (
              <motion.span key="download" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <FiDownload size={18} /> Download Resume
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Parallax background orbs */}
      <motion.div
        style={{ y: orbY1 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        style={{ y: orbY2 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[120px] -z-10"
      />

      {/* Avatar + orbit — parallax */}
      <motion.div style={{ y: avatarY }} className="relative mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          className="relative cursor-default"
        >
          <div className="absolute inset-[-40px] animate-[spin_12s_linear_infinite] pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-primary/20 border-dashed" />
            <div className="absolute inset-0">
              <motion.div whileHover={{ scale: 1.5 }} className="absolute top-0 left-1/2 -ml-3 w-6 h-6 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
            </div>
            <div className="absolute inset-0 rotate-[120deg]">
              <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
            </div>
            <div className="absolute inset-0 rotate-[240deg]">
              <div className="absolute top-0 left-1/2 -ml-2.5 w-5 h-5 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
            </div>
          </div>

          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(59,130,246,0.3)', '0 0 50px rgba(139,92,246,0.5)', '0 0 20px rgba(59,130,246,0.3)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-40 h-40 md:w-56 md:h-56 rounded-full p-2 bg-gradient-to-tr from-primary via-secondary to-accent"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-card">
              {photoUrl ? (
                <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30 text-5xl font-black text-white">
                  {name.charAt(0)}
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1.1, 1.15, 1.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-white/20"
          />
        </motion.div>
      </motion.div>

      {/* Text — parallax */}
      <motion.div style={{ y: textY }} className="flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black mb-6 tracking-tight"
        >
          <motion.span
            className="text-gradient"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {name}
          </motion.span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-2xl text-primary font-bold mb-4 uppercase tracking-widest"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl leading-relaxed font-medium"
        >
          {subtitle}
        </motion.p>
      </motion.div>{/* end parallax text wrapper */}

      {/* CTA Buttons — outside parallax so they never shrink on scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 md:gap-6"
      >
        <MagneticButton
          href="#projects"
          className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-2xl shadow-primary/40 flex items-center gap-2"
        >
          Explore Projects <FiArrowRight />
        </MagneticButton>

        <MagneticButton
          href="#contact"
          className="px-8 py-4 glass rounded-2xl font-bold flex items-center gap-2"
        >
          Let's Talk <FiMessageCircle />
        </MagneticButton>
      </motion.div>
    </section>
  );
};
