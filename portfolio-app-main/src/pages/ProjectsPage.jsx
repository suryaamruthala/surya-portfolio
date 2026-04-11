import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiGitBranch, FiExternalLink, FiGithub, FiCode, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { getGithubData } from '../services/githubService';

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', 'C++': '#f34b7d', HTML: '#e34c26', CSS: '#563d7c',
  Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516', Shell: '#89e051',
  Kotlin: '#A97BFF', Swift: '#ffac45', Dart: '#00B4AB',
};

const RepoCard = ({ repo, index }) => {
  const langColor = LANG_COLORS[repo.language] || '#8b949e';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="glass rounded-2xl p-6 flex flex-col h-full group hover:border-primary/40 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FiGithub className="text-gray-400 flex-shrink-0" size={18} />
          <h3 className="text-lg font-bold truncate group-hover:text-primary transition-colors">
            {repo.name}
          </h3>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="p-2 glass-hover rounded-xl text-gray-400 hover:text-primary transition-colors flex-shrink-0"
          aria-label={`Open ${repo.name} on GitHub`}
        >
          <FiExternalLink size={16} />
        </a>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
        {repo.description || 'No description provided.'}
      </p>

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2.5 py-0.5 text-xs font-semibold bg-primary/15 text-primary rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mt-auto pt-4 border-t border-border">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: langColor }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <FiStar size={14} className="text-yellow-400" />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <FiGitBranch size={14} className="text-cyan-400" />
            {repo.forks_count}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export const ProjectsPage = () => {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  const username = import.meta.env.VITE_GITHUB_USERNAME;
  const githubUrl = `https://github.com/${username}`;

  useEffect(() => {
    getGithubData()
      .then(({ profile, repos }) => {
        setProfile(profile);
        // Filter out forks by default, sort by stars then updated
        const filtered = repos
          .filter(r => !r.fork)
          .sort((a, b) => (b.stargazers_count - a.stargazers_count) || new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(filtered);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load GitHub repositories.');
        setLoading(false);
      });
  }, []);

  // Get unique languages for filter
  const languages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))];
  const displayed = filter === 'All' ? repos : repos.filter(r => r.language === filter);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto min-h-screen">

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient">My Projects</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A collection of open-source work from my GitHub. Explore the code, star what you like!
        </p>
      </motion.div>

      {/* GitHub Profile Card */}
      {profile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-3xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto"
        >
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="w-24 h-24 rounded-2xl border-2 border-primary/30 flex-shrink-0"
          />
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-2xl font-bold">{profile.name || profile.login}</h2>
            {profile.bio && <p className="text-gray-400 mt-1 text-sm">{profile.bio}</p>}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-sm">
              <span className="text-gray-300 font-semibold">
                <span className="text-primary font-black">{profile.public_repos}</span> repos
              </span>
              <span className="text-gray-300 font-semibold">
                <span className="text-primary font-black">{profile.followers}</span> followers
              </span>
              <span className="text-gray-300 font-semibold">
                <span className="text-primary font-black">{profile.following}</span> following
              </span>
            </div>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/30 flex-shrink-0"
          >
            <FiGithub size={18} /> View Profile
          </a>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <FiLoader className="animate-spin text-primary" size={40} />
          <p className="text-gray-400 text-lg">Fetching repositories from GitHub...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <FiAlertCircle className="text-red-400" size={40} />
          <p className="text-red-400 text-lg font-semibold">{error}</p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 glass glass-hover rounded-xl text-primary font-bold"
          >
            <FiGithub size={18} /> View on GitHub directly
          </a>
        </div>
      )}

      {/* Language Filter */}
      {!loading && !error && repos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => setFilter(lang)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                filter === lang
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'glass glass-hover text-gray-400 hover:text-white'
              }`}
            >
              {lang === 'All' ? (
                <span className="flex items-center gap-1.5"><FiCode size={13} /> All</span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: LANG_COLORS[lang] || '#8b949e' }}
                  />
                  {lang}
                </span>
              )}
            </button>
          ))}
        </motion.div>
      )}

      {/* Repo Grid */}
      {!loading && !error && (
        <>
          {displayed.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No repositories found for this filter.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((repo, index) => (
                <RepoCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>
          )}

          {/* View All on GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-2xl shadow-primary/40 hover:-translate-y-1"
            >
              <FiGithub size={22} /> View All on GitHub
            </a>
          </motion.div>
        </>
      )}
    </div>
  );
};
