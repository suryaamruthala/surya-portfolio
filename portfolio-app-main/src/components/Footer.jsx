import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 border-t border-border bg-mesh/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-3xl font-black tracking-tighter text-gradient">SA.</span>
          <p className="text-gray-500 max-w-xs text-center md:text-left">
            Building the future of the web with intelligence and precision.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/suryaamruthala" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors"><FiGithub size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FiLinkedin size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FiMail size={20} /></a>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Surya Amruthala. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
