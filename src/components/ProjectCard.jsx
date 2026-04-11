import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="glass rounded-xl overflow-hidden shadow-lg flex flex-col h-full"
    >
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
        <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack?.map((tech, i) => (
            <span key={i} className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-auto">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <FiGithub size={20} /> <span className="text-sm">Code</span>
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <FiExternalLink size={20} /> <span className="text-sm">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
