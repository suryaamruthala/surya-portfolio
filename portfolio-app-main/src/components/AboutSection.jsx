import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCode, FiDatabase, FiGlobe } from 'react-icons/fi';
import { getProfile } from '../services/profileService';

const highlights = [
  { icon: <FiCode className="text-blue-400" size={24} />, title: "Frontend", desc: "Crafting immersive, responsive React applications." },
  { icon: <FiDatabase className="text-purple-400" size={24} />, title: "Backend", desc: "Building robust Java/Spring Boot microservices." },
  { icon: <FiGlobe className="text-cyan-400" size={24} />, title: "Full Stack", desc: "Seamlessly bridging the gap between design and logic." },
  { icon: <FiUser className="text-indigo-400" size={24} />, title: "Passionate", desc: "Always learning and pushing the boundaries of tech." },
];

export const AboutSection = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error);
  }, []);

  const bio = profile?.bio || "I am a dedicated Full Stack Developer with a strong focus on Java and React. With a background in Computer Science, I specialize in building scalable web applications that prioritize user experience and performance.";
  const bio2 = profile?.bio2 || "Currently, I am exploring the intersections of Artificial Intelligence and Web Technologies to create more intelligent and adaptive digital platforms.";

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            <div className="glass p-10 rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
              <h3 className="text-3xl font-bold mb-6">My Story</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-6">{bio}</p>
              <p className="text-gray-400 leading-relaxed text-lg italic">{bio2}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 glass glass-hover rounded-3xl"
              >
                <div className="mb-4 p-3 bg-white/5 inline-block rounded-2xl">{item.icon}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
