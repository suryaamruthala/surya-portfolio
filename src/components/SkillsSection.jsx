import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSkills } from '../services/skillsService';
import { FiCode, FiServer, FiCpu, FiTool, FiDatabase, FiCheckCircle } from 'react-icons/fi';

const categories = [
  { id: 'frontend', title: 'Frontend', icon: <FiCode size={22} />, color: 'bg-blue-500 text-white', activeGlow: 'shadow-blue-500/20' },
  { id: 'backend', title: 'Backend', icon: <FiServer size={22} />, color: 'bg-purple-500 text-white', activeGlow: 'shadow-purple-500/20' },
  { id: 'database', title: 'Database', icon: <FiDatabase size={22} />, color: 'bg-teal-500 text-white', activeGlow: 'shadow-teal-500/20' },
  { id: 'ai', title: 'AI & ML', icon: <FiCpu size={22} />, color: 'bg-pink-500 text-white', activeGlow: 'shadow-pink-500/20' },
  { id: 'tools', title: 'Tools', icon: <FiTool size={22} />, color: 'bg-orange-500 text-white', activeGlow: 'shadow-orange-500/20' },
];

// Per-category skill card colors
const cardColors = {
  frontend: { bg: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 hover:border-blue-500/50', icon: 'bg-blue-500/20 text-blue-600 dark:text-white', text: 'text-blue-900 dark:text-white' },
  backend:  { bg: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 hover:border-purple-500/50', icon: 'bg-purple-500/20 text-purple-600 dark:text-white', text: 'text-purple-900 dark:text-white' },
  database: { bg: 'bg-teal-500/10 hover:bg-teal-500/20 border-teal-500/20 hover:border-teal-500/50', icon: 'bg-teal-500/20 text-teal-700 dark:text-white', text: 'text-teal-900 dark:text-white' },
  ai:       { bg: 'bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/20 hover:border-pink-500/50', icon: 'bg-pink-500/20 text-pink-600 dark:text-white', text: 'text-pink-900 dark:text-white' },
  tools:    { bg: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/20 hover:border-orange-500/50', icon: 'bg-orange-500/20 text-orange-600 dark:text-white', text: 'text-orange-900 dark:text-white' },
};

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

  if (loading && skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient inline-block">Technical Arsenal</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies, languages, and tools I use to build digital solutions.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Tabs Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 flex flex-col gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 border text-left w-full
                  ${activeTab === cat.id 
                    ? `glass border-primary/30 shadow-lg ${cat.activeGlow} translate-x-2 text-foreground` 
                    : 'bg-black/10 dark:bg-black/20 border-transparent hover:bg-white/5 hover:translate-x-1 text-gray-700 dark:text-gray-400 hover:text-foreground'}`}
              >
                <div className={`p-3 rounded-xl transition-colors flex-shrink-0 ${activeTab === cat.id ? cat.color : 'bg-black/10 dark:bg-white/5'}`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold">{cat.title}</h3>
                <span className="ml-auto text-xs font-bold text-gray-600 dark:text-gray-500 bg-black/10 dark:bg-white/5 px-2 py-1 rounded-full">
                  {skills.filter(s => s.category === cat.id).length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/3 min-h-[360px]"
          >
            <div className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"
                >
                  {activeSkills.length > 0 ? (
                    activeSkills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-5 rounded-2xl flex items-center gap-4 border transition-colors ${cardColors[activeTab]?.bg || 'bg-white/5 border-white/10'}`}
                      >
                        <div className={`p-2 rounded-xl flex-shrink-0 ${cardColors[activeTab]?.icon || 'bg-primary/20 text-primary'}`}>
                          <FiCheckCircle size={18} />
                        </div>
                        <span className={`text-base font-semibold ${cardColors[activeTab]?.text || 'text-white'}`}>{skill}</span>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
                      <FiCheckCircle size={36} className="opacity-30" />
                      <p className="italic text-sm">No skills yet in this category.<br/>Add them from the Admin Dashboard.</p>
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
