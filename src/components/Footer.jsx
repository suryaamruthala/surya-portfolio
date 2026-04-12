import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const socials = [
  { icon: <FiGithub size={20} />, url: 'https://github.com/suryaamruthala', label: 'GitHub' },
  { icon: <FiLinkedin size={20} />, url: 'https://www.linkedin.com/in/surya-amruthala-a10a213b5', label: 'LinkedIn' },
  { icon: <FiMail size={20} />, url: 'mailto:amruthalasurya2@gmail.com', label: 'Email' },
];

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full py-12 px-6 border-t border-border relative overflow-hidden"
    >
      {/* Subtle glow */}
      <motion.div
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary blur-[100px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="text-3xl font-black tracking-tighter text-gradient cursor-default"
          >
            SA.
          </motion.span>
          <p className="text-gray-500 max-w-xs text-center md:text-left text-sm">
            Building the future of the web with intelligence and precision.
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {socials.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              whileHover={{ y: -5, scale: 1.2, color: '#3b82f6' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="relative p-3 glass rounded-xl text-gray-400 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-primary/15 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"
              />
              <span className="relative z-10">{social.icon}</span>
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          © {new Date().getFullYear()} Surya Amruthala. Made with
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <FiHeart className="text-red-500" size={14} />
          </motion.span>
        </p>
      </div>
    </motion.footer>
  );
};
