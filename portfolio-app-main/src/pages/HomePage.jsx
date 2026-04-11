import { useEffect, useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { CertificationsSection } from '../components/CertificationsSection';
import { ContactSection } from '../components/ContactSection';
import { getGithubData } from '../services/githubService';
import { FiFolder, FiGithub, FiStar } from 'react-icons/fi';

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
      
      <SkillsSection />

      <CertificationsSection />
      
      {repos.length > 0 && (
        <section id="projects" className="py-24 px-6 relative overflow-hidden bg-mesh/5 border-y border-border">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient inline-block">Featured Work</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A selection of my latest open-source projects directly from GitHub.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.map((repo) => (
                <a 
                  key={repo.id} 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="relative p-8 glass rounded-3xl flex flex-col h-80 group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] border border-white/5 hover:border-primary/50"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="p-3 bg-white/5 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                      <FiFolder size={28} />
                    </div>
                    <FiGithub size={24} className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10 truncate">{repo.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow relative z-10">{repo.description || "Building future technologies, one commit at a time."}</p>
                  
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500 mt-auto pt-6 border-t border-white/5 relative z-10">
                    <span className="flex items-center gap-1.5"><FiStar size={14} className="text-yellow-500" /> {repo.stargazers_count}</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full tracking-wider">{repo.language || "Web"}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </div>
  );
};
