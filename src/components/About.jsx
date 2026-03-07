import { useEffect, useRef } from 'react';
import profilePic from '../assets/surya_avatar.jpeg';

const techStack = [
    { icon: '🐍', name: 'Python' },
    { icon: '⚛️', name: 'React' },
    { icon: '☕', name: 'Java' },
];

export default function About() {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
            { threshold: 0.15 }
        );
        ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="about" id="about" ref={ref}>
            <div className="container">
                <h2 className="section-title reveal">
                    About <span>Me</span>
                </h2>

                <div className="about-grid">
                    {/* Left: Info Card */}
                    <div className="about-card reveal-left">
                        <div className="about-card-header">
                            <div className="about-avatar">
                                <img src={profilePic} alt="Surya Amruthala" className="about-avatar-img" />
                                <div className="about-avatar-glow" />
                            </div>
                            <div>
                                <h3 className="about-name">Surya Amruthala</h3>
                                <p className="about-role">BTech · CSE · AI/ML</p>
                                <div className="about-status">
                                    <span className="status-dot" />
                                    Available for Internships
                                </div>
                            </div>
                        </div>

                        <div className="about-info-list">
                            {[
                                { icon: '🎓', label: 'Degree', value: 'B.Tech Computer Science' },
                                { icon: '🤖', label: 'Specialization', value: 'Artificial Intelligence & ML' },
                                { icon: '📍', label: 'Location', value: 'Andhra Pradesh, India' },
                                { icon: '📧', label: 'Email', value: 'amruthalasurya2@gmail.com' },
                            ].map((item) => (
                                <div className="about-info-row" key={item.label}>
                                    <span className="about-info-icon">{item.icon}</span>
                                    <div>
                                        <span className="about-info-label">{item.label}</span>
                                        <span className="about-info-value">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Bio + Technologies */}
                    <div className="about-content reveal-right">
                        <div className="about-bio">
                            <h3 className="about-bio-title">
                                Crafting the <span>Future</span> with Code & AI
                            </h3>
                            <p>
                                I'm a passionate final-year BTech student specializing in Computer Science with a
                                focus on Artificial Intelligence and Machine Learning. My journey in tech started
                                with curiosity about how computers <em>think</em> — and evolved into building
                                systems that genuinely learn.
                            </p>
                            <p>
                                I love bridging the gap between intelligent backend systems and beautiful frontends.
                                Whether it's training a neural network, crafting a React UI, or writing clean
                                Python scripts — I bring precision and creativity to every project.
                            </p>
                        </div>

                        <div className="tech-stack-title">Tech I Work With</div>
                        <div className="tech-stack-grid">
                            {techStack.map((t) => (
                                <div className="tech-chip" key={t.name}>
                                    <span>{t.icon}</span>
                                    <span>{t.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="about-cta">
                            <a className="btn-secondary" href="#contact" onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                Let's Connect 🤝
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
