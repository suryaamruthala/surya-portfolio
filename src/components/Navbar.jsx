import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from 'react-icons/fi';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home',           path: '/#home' },
    { name: 'About',          path: '#about' },
    { name: 'Skills',         path: '#skills' },
    { name: 'Certifications', path: '#certifications' },
    { name: 'Timeline',       path: '#experience' },
    { name: 'Projects',       path: '#projects' },
    { name: 'Contact',        path: '#contact' },
  ];

  const socialLinks = [
    { icon: <FiGithub size={18} />,  url: 'https://github.com/suryaamruthala',                    label: 'GitHub' },
    { icon: <FiLinkedin size={18} />, url: 'https://www.linkedin.com/in/surya-amruthala-a10a213b5', label: 'LinkedIn' },
    { icon: <FiMail size={18} />,    url: 'mailto:amruthalasurya2@gmail.com',                       label: 'Email' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full px-6 py-4 flex justify-between items-center border-b border-border transition-all duration-300 ${
        scrolled ? 'glass shadow-2xl shadow-black/20' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-8">
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400 }}>
          <Link to="/" className="text-2xl font-black tracking-tighter text-gradient relative group">
            SA.
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.path}
              onHoverStart={() => setHoveredLink(link.name)}
              onHoverEnd={() => setHoveredLink(null)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative px-3 py-2 text-sm font-medium hover:text-primary transition-colors rounded-xl"
            >
              {link.name}
              {/* Animated underline */}
              <AnimatePresence>
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="navUnderline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Social icons */}
        <div className="hidden sm:flex items-center gap-3 border-r border-border pr-4 mr-1">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              whileHover={{ y: -3, scale: 1.2, color: '#3b82f6' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="text-gray-400 transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/admin" className="text-sm font-semibold text-primary px-3 py-1 rounded-md border border-primary/20 hover:bg-primary/10 transition-colors">
                Admin
              </Link>
            </motion.div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={signOut} className="text-sm text-red-500 hover:text-red-400 font-medium">
              Logout
            </motion.button>
          </div>
        )}

        <ThemeToggle />

        {/* Mobile menu toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl glass"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <FiX size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <FiMenu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 glass border-b border-border overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 6 }}
                  className="px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
