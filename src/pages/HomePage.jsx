import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { TimelineSection } from '../components/TimelineSection';
import { SkillsSection } from '../components/SkillsSection';
import { CertificationsSection } from '../components/CertificationsSection';
import { ContactSection } from '../components/ContactSection';
import { getGithubData } from '../services/githubService';
import { FiFolder, FiGithub, FiStar, FiExternalLink } from 'react-icons/fi';

/* ── Project card with spotlight hover ── */
function ProjectCard({ repo, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 300, damping: 25 });
  const glowX = useTransform(x, [-80, 80], [0, 100]);
  const glowY = useTransform(y, [-60, 60], [0, 100]);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      className="relative p-8 glass rounded-3xl flex flex-col h-80 group overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-300"
    >
      {/* Mouse-tracking spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(59,130,246,0.18) 0%, transparent 65%)`,
        }}
      />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none skew-x-12" />

      {/* Corner glow orb */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-all duration-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Header row */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <motion.div
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
          className="p-3 bg-primary/10 rounded-2xl text-primary"
        >
          <FiFolder size={28} />
        </motion.div>
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="text-gray-500 group-hover:text-white transition-colors"
        >
          <FiGithub size={24} />
        </motion.div>
      </div>

      {/* Name */}
      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10 truncate">
        {repo.name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow relative z-10">
        {repo.description || 'Building future technologies, one commit at a time.'}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500 mt-auto pt-6 border-t border-white/5 relative z-10">
        <span className="flex items-center gap-1.5">
          <FiStar size={14} className="text-yellow-500" /> {repo.stargazers_count}
        </span>
        <motion.span
          whileHover={{ scale: 1.1 }}
          className="px-3 py-1 bg-primary/10 text-primary rounded-full tracking-wider"
        >
          {repo.language || 'Web'}
        </motion.span>
      </div>

      {/* Expanding bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full"
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.a>
  );
}

export const HomePage = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    getGithubData().then(({ repos }) => {
      setRepos(repos || []);
    });
  }, []);

  return (
    <div className="w-full space-y-0">
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <SkillsSection />
      <CertificationsSection />

      {repos.length > 0 && (
        <section id="projects" className="py-24 px-6 relative overflow-hidden border-y border-border">
          {/* Section background */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-primary/10 blur-[130px] rounded-full pointer-events-none"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient inline-block">Featured Work</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A selection of my latest open-source projects directly from GitHub.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </div>
  );
};
