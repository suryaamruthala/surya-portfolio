import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { getSkills } from '../services/skillsService';
import { FiCode, FiServer, FiCpu, FiTool, FiDatabase, FiCheckCircle, FiZap } from 'react-icons/fi';

const categories = [
  { id: 'frontend', title: 'Frontend',  icon: <FiCode size={22} />,     color: 'bg-blue-500',   glow: 'rgba(59,130,246,0.5)',   activeGlow: 'shadow-blue-500/30' },
  { id: 'backend',  title: 'Backend',   icon: <FiServer size={22} />,   color: 'bg-purple-500', glow: 'rgba(168,85,247,0.5)',   activeGlow: 'shadow-purple-500/30' },
  { id: 'database', title: 'Database',  icon: <FiDatabase size={22} />, color: 'bg-teal-500',   glow: 'rgba(20,184,166,0.5)',   activeGlow: 'shadow-teal-500/30' },
  { id: 'ai',       title: 'AI & ML',   icon: <FiCpu size={22} />,      color: 'bg-pink-500',   glow: 'rgba(236,72,153,0.5)',   activeGlow: 'shadow-pink-500/30' },
  { id: 'tools',    title: 'Tools',     icon: <FiTool size={22} />,     color: 'bg-orange-500', glow: 'rgba(249,115,22,0.5)',   activeGlow: 'shadow-orange-500/30' },
];

const cardConfig = {
  frontend: { border: 'border-blue-500/30',   glow: 'rgba(59,130,246,0.4)',   iconBg: 'bg-blue-500/20 text-blue-400',   accent: '#3b82f6' },
  backend:  { border: 'border-purple-500/30', glow: 'rgba(168,85,247,0.4)',   iconBg: 'bg-purple-500/20 text-purple-400', accent: '#a855f7' },
  database: { border: 'border-teal-500/30',   glow: 'rgba(20,184,166,0.4)',   iconBg: 'bg-teal-500/20 text-teal-400',   accent: '#14b8a6' },
  ai:       { border: 'border-pink-500/30',   glow: 'rgba(236,72,153,0.4)',   iconBg: 'bg-pink-500/20 text-pink-400',   accent: '#ec4899' },
  tools:    { border: 'border-orange-500/30', glow: 'rgba(249,115,22,0.4)',   iconBg: 'bg-orange-500/20 text-orange-400', accent: '#f97316' },
};

/* ── 3D Tilt Skill Card ── */
function SkillCard({ skill, index, config }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [12, -12]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-12, 12]), { stiffness: 300, damping: 25 });
  const glowX = useTransform(x, [-40, 40], [0, 100]);
  const glowY = useTransform(y, [-40, 40], [0, 100]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-5 rounded-2xl flex items-center gap-4 border ${config.border} bg-transparent overflow-hidden cursor-default group`}
    >
      {/* Animated glow spotlight that follows mouse */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${config.glow} 0%, transparent 70%)`,
        }}
      />
      {/* Shimmer sweep on hover */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent pointer-events-none skew-x-12" />

      <motion.div
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ duration: 0.5 }}
        className={`p-2 rounded-xl flex-shrink-0 ${config.iconBg}`}
      >
        <FiCheckCircle size={18} />
      </motion.div>

      <span className="text-base font-semibold text-foreground z-10">{skill}</span>

      {/* Accent bottom border that expands on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{ background: config.accent }}
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

/* ── Animated Tab Button ── */
function TabButton({ cat, isActive, count, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative flex items-center gap-4 p-5 rounded-2xl border text-left w-full overflow-hidden group
        ${isActive
          ? `glass border-primary/40 shadow-xl ${cat.activeGlow} text-foreground`
          : 'skill-tab-inactive bg-white/5 dark:bg-white/5 border-transparent hover:border-black/10 dark:hover:border-white/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 hover:text-foreground'}`}
    >
      {/* Active animated background gradient */}
      {isActive && (
        <motion.div
          layoutId="activeTabBg"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at left, ${cat.glow} 0%, transparent 70%)`, opacity: 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      {/* Hover shimmer */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent pointer-events-none skew-x-12" />

      {/* Icon */}
      <motion.div
        animate={isActive ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.5 }}
        className={`p-3 rounded-xl flex-shrink-0 transition-all duration-300 text-white
          ${isActive ? `${cat.color} shadow-lg` : 'bg-black/10 dark:bg-white/10 text-current group-hover:scale-110'}`}
      >
        {cat.icon}
      </motion.div>

      <h3 className="text-lg font-bold z-10">{cat.title}</h3>

      <motion.span
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
        className={`ml-auto text-xs font-black px-2.5 py-1 rounded-full z-10
          ${isActive ? 'bg-primary/20 text-primary' : 'bg-black/10 dark:bg-white/5 text-gray-700 dark:text-gray-300'}`}
      >
        {count}
      </motion.span>

      {/* Active left accent bar */}
      {isActive && (
        <motion.div
          layoutId="activeAccent"
          className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-primary"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(data => { setSkills(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const activeSkills = skills.filter(s => s.category === activeTab).map(s => s.name);
  const cfg = cardConfig[activeTab] || cardConfig.frontend;

  if (loading && skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary blur-[140px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <FiZap className="text-primary" size={24} />
            </motion.div>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient inline-block">Technical Arsenal</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies, languages, and tools I use to build digital solutions.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Tabs Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-1/3 flex flex-col gap-3"
          >
            {categories.map((cat) => (
              <TabButton
                key={cat.id}
                cat={cat}
                isActive={activeTab === cat.id}
                count={skills.filter(s => s.category === cat.id).length}
                onClick={() => setActiveTab(cat.id)}
              />
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-2/3 min-h-[360px]"
          >
            <div className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden h-full">
              {/* Dynamic glow orb tied to active tab */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
                style={{ background: cfg.glow, opacity: 0.25 }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"
                >
                  {activeSkills.length > 0 ? (
                    activeSkills.map((skill, index) => (
                      <SkillCard key={skill} skill={skill} index={index} config={cfg} />
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                        <FiCheckCircle size={36} className="opacity-30" />
                      </motion.div>
                      <p className="italic text-sm">No skills yet in this category.<br />Add them from the Admin Dashboard.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
