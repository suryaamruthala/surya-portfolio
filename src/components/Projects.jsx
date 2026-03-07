import { useEffect, useRef, useState } from 'react';

const projects = [
    {
        id: 2,
        title: 'Smart Chatbot (NLP)',
        description: 'AI-powered chatbot using Natural Language Processing with NLTK and transformers. Capable of intent recognition and context-aware response generation.',
        tags: ['Python', 'NLP', 'NLTK', 'Transformers', 'AI'],
        icon: '🤖',
        color: 'var(--secondary)',
        github: 'https://github.com/suryaamruthala',
        live: '#',
    },
    {
        id: 3,
        title: 'Student Performance Predictor',
        description: 'ML model to predict student academic performance using historical data. Implements Random Forest, SVM, and regression algorithms with Scikit-learn.',
        tags: ['Python', 'Scikit-learn', 'Pandas', 'ML', 'Data Analysis'],
        icon: '📊',
        color: 'var(--accent)',
        github: 'https://github.com/suryaamruthala',
        live: '#',
    },
    {
        id: 4,
        title: 'Portfolio Website',
        description: 'This futuristic React portfolio with stunning animations, glassmorphism UI, particle effects, and a dark space-themed design system.',
        tags: ['React', 'CSS3', 'Vite', 'JavaScript', 'UI/UX'],
        icon: '🌐',
        color: 'var(--primary)',
        github: 'https://github.com/suryaamruthala',
        live: '#',
    },
    {
        id: 5,
        title: 'Crop Disease Detector',
        description: 'Computer Vision model to detect crop diseases from leaf images using CNN and transfer learning with MobileNetV2, achieving 94% accuracy.',
        tags: ['Python', 'OpenCV', 'MobileNet', 'CNN', 'Agriculture AI'],
        icon: '🌿',
        color: 'var(--secondary)',
        github: 'https://github.com/suryaamruthala',
        live: '#',
    },
    {
        id: 6,
        title: 'Expense Tracker App',
        description: 'Responsive expense tracking web app built with React frontend and Bootstrap styling, featuring charts, categories, and monthly analytics.',
        tags: ['React', 'Python', 'Bootstrap', 'Chart.js', 'REST API'],
        icon: '💰',
        color: 'var(--accent)',
        github: 'https://github.com/suryaamruthala',
        live: '#',
    },
];

export default function Projects() {
    const ref = useRef(null);
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'AI/ML', 'Web', 'Python'];

    const filtered = projects.filter((p) => {
        if (filter === 'All') return true;
        if (filter === 'AI/ML') return p.tags.some((t) => ['TensorFlow', 'ML', 'CNN', 'NLP', 'Deep Learning', 'AI', 'Scikit-learn', 'MobileNet', 'Transformers'].includes(t));
        if (filter === 'Web') return p.tags.some((t) => ['React', 'Bootstrap', 'HTML/CSS', 'CSS3'].includes(t));
        if (filter === 'Python') return p.tags.includes('Python');
        return true;
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal, .project-card').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [filter]);

    return (
        <section className="projects" id="projects" ref={ref}>
            <div className="container">
                <h2 className="section-title reveal">
                    Featured <span>Projects</span>
                </h2>
                <p className="section-subtitle reveal">
                    A showcase of AI/ML and web development projects built with passion
                </p>

                {/* Filter Tabs */}
                <div className="project-filters reveal">
                    {filters.map((f) => (
                        <button
                            key={f}
                            className={`filter-btn${filter === f ? ' active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filtered.map((project, i) => (
                        <div
                            className="project-card reveal"
                            key={project.id}
                            style={{ '--card-color': project.color, animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="project-card-top">
                                <div className="project-icon" style={{ background: `${project.color}20`, boxShadow: `0 0 20px ${project.color}40` }}>
                                    {project.icon}
                                </div>
                                <div className="project-links">
                                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link" title="GitHub">
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.25.8-.56v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.65-1.3-1.65-1.1-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.2.67.81.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                                        </svg>
                                    </a>
                                    <a href={project.live} target="_blank" rel="noreferrer" className="project-link" title="Live Demo">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>

                            <div className="project-tags">
                                {project.tags.map((t) => (
                                    <span className="project-tag" key={t} style={{ borderColor: `${project.color}50`, color: project.color }}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="project-card-glow" style={{ background: `radial-gradient(circle at 50% 100%, ${project.color}20, transparent 70%)` }} />
                        </div>
                    ))}
                </div>

                <div className="projects-cta reveal">
                    <a
                        href="https://github.com/suryaamruthala"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                    >
                        <span>⭐</span> View All on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
