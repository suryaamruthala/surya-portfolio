import { useEffect, useRef, useState } from 'react';

const skillCategories = [
    {
        title: 'AI / ML',
        icon: '🧠',
        color: 'var(--primary)',
        skills: [
            { name: 'PyTorch (basics)', level: 50 },
            { name: 'NLP / NLTK', level: 50 },
            { name: 'Computer Vision', level: 50 },
        ],
    },
    {
        title: 'Programming',
        icon: '💻',
        color: 'var(--secondary)',
        skills: [
            { name: 'Python', level: 90 },
            { name: 'Java', level: 75 },
            { name: 'JavaScript', level: 78 },
            { name: 'C / C++', level: 65 },
            { name: 'SQL', level: 72 },
        ],
    },
    {
        title: 'Web / Tools',
        icon: '⚡',
        color: 'var(--accent)',
        skills: [
            { name: 'React.js', level: 82 },
            { name: 'HTML / CSS', level: 88 },
            { name: 'Git & GitHub', level: 80 },
            { name: 'Bootstrap', level: 75 },
        ],
    },
];

function SkillBar({ name, level, color, animate }) {
    return (
        <div className="skill-bar-item">
            <div className="skill-bar-header">
                <span className="skill-name">{name}</span>
                <span className="skill-percent" style={{ color }}>{level}%</span>
            </div>
            <div className="skill-track">
                <div
                    className="skill-fill"
                    style={{
                        '--target-width': `${level}%`,
                        background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.6))`,
                        width: animate ? `${level}%` : '0%',
                        boxShadow: `0 0 12px ${color}80`,
                        transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
                    }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        setAnimate(true);
                    }
                });
            },
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="skills" id="skills" ref={ref}>
            <div className="container">
                <h2 className="section-title reveal">
                    My <span>Skills</span>
                </h2>
                <p className="section-subtitle reveal">
                    Technologies and tools I've mastered on my journey through CSE & AI/ML
                </p>

                <div className="skills-grid">
                    {skillCategories.map((cat, i) => (
                        <div
                            className={`skill-card ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}
                            key={cat.title}
                            style={{ '--card-color': cat.color }}
                        >
                            <div className="skill-card-header">
                                <span className="skill-card-icon">{cat.icon}</span>
                                <h3 className="skill-card-title">{cat.title}</h3>
                            </div>
                            <div className="skill-bars">
                                {cat.skills.map((s) => (
                                    <SkillBar key={s.name} {...s} color={cat.color} animate={animate} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Badges */}
                <div className="cert-badges reveal">
                    {['Deep Learning', 'Data Science', 'Web Development', 'Open-Source Contributor'].map((b) => (
                        <div className="cert-badge" key={b}>{b}</div>
                    ))}
                </div>
            </div>
        </section>
    );
}
