import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

export const Navbar = () => {
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Certifications', path: '#certifications' },
    { name: 'Projects', path: '#projects' },
    { name: 'Contact', path: '#contact' },
  ];

  const socialLinks = [
    { icon: <FiGithub size={20} />, url: 'https://github.com/suryaamruthala' },
    { icon: <FiLinkedin size={20} />, url: 'https://linkedin.com' },
    { icon: <FiMail size={20} />, url: 'mailto:contact@example.com' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass w-full px-6 py-4 flex justify-between items-center bg-mesh border-b border-border">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-black tracking-tighter text-gradient">
          SA.
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.path} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-4 border-r border-border pr-6 mr-2">
          {socialLinks.map((social, idx) => (
            <a 
              key={idx} 
              href={social.url} 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-primary transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-sm font-semibold text-primary px-3 py-1 rounded-md border border-primary/20 hover:bg-primary/10 transition-colors">
              Admin
            </Link>
            <button onClick={signOut} className="text-sm text-red-500 hover:text-red-400 font-medium">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/?surya=admin" className="w-1 h-1 opacity-10 blur-sm pointer-events-none absolute"></Link>
        )}
        
        <ThemeToggle />
      </div>
    </nav>
  );
};
