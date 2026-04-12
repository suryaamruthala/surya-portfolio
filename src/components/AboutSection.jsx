import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiUser, FiCode, FiDatabase, FiGlobe } from 'react-icons/fi';
import { getProfile } from '../services/profileService';

const highlights = [
  { icon: <FiCode className="text-blue-400" size={24} />,     title: 'Frontend',  desc: 'Crafting immersive, responsive React applications.',       glow: 'rgba(59,130,246,0.3)' },
  { icon: <FiDatabase className="text-purple-400" size={24} />, title: 'Backend', desc: 'Building robust Java/Spring Boot microservices.',           glow: 'rgba(168,85,247,0.3)' },
  { icon: <FiGlobe className="text-cyan-400" size={24} />,   title: 'Full Stack', desc: 'Seamlessly bridging the gap between design and logic.',    glow: 'rgba(6,182,212,0.3)' },
  { icon: <FiUser className="text-indigo-400" size={24} />,  title: 'Passionate', desc: 'Always learning and pushing the boundaries of tech.',      glow: 'rgba(99,102,241,0.3)' },
];

function HighlightCard({ item, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [10, -10]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-10, 10]), { stiffness: 300, damping: 25 });
  const glowX = useTransform(x, [-40, 40], [0, 100]);
  const glowY = useTransform(y, [-40, 40], [0, 100]);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      className="relative p-8 glass rounded-3xl overflow-hidden group cursor-default"
    >
      {/* Mouse-tracking glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
        style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${item.glow} 0%, transparent 65%)` }}
      />
      {/* Shimmer sweep */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none skew-x-12" />

      <motion.div
        whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
        className="mb-4 p-3 bg-white/5 inline-block rounded-2xl relative z-10"
      >
        {item.icon}
      </motion.div>

      <h4 className="text-xl font-bold mb-2 relative z-10">{item.title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed relative z-10">{item.desc}</p>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{ background: item.glow.replace('0.3', '0.8') }}
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

export const AboutSection = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error);
  }, []);

  const bio  = profile?.bio  || 'I am a dedicated Full Stack Developer with a strong focus on Java and React. With a background in Computer Science, I specialize in building scalable web applications that prioritize user experience and performance.';
  const bio2 = profile?.bio2 || 'Currently, I am exploring the intersections of Artificial Intelligence and Web Technologies to create more intelligent and adaptive digital platforms.';

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Breathing background orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 left-1/2 w-96 h-96 -translate-x-1/2 bg-secondary/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient inline-block">About Me</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed italic">
            "I turn complex problems into simple, beautiful, and intuitive digital solutions."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              whileHover={{ y: -6, boxShadow: '0 30px 60px rgba(59,130,246,0.12)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="glass p-10 rounded-3xl relative overflow-hidden group"
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl transition-all duration-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Shimmer on hover */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

              <h3 className="text-3xl font-bold mb-6 relative z-10">My Story</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-6 relative z-10">{bio}</p>
              <p className="text-gray-400 leading-relaxed text-lg italic relative z-10">{bio2}</p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <HighlightCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
