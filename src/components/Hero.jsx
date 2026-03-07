import { useState, useEffect } from 'react';
import profilePic from '../assets/surya_avatar.jpeg';

const typingTexts = [
    'AI/ML Engineer',
    'React Developer',
    'Python Enthusiast',
    'Problem Solver',
    'BTech CSE Student',
];

const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    duration: `${4 + Math.random() * 6}s`,
    color: i % 3 === 0 ? 'var(--primary)' : i % 3 === 1 ? 'var(--secondary)' : 'var(--accent)',
}));

export default function Hero() {
    const [typedText, setTypedText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = typingTexts[textIndex];
        let timeout;

        if (!deleting && charIndex < current.length) {
            timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
        } else if (!deleting && charIndex === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && charIndex > 0) {
            timeout = setTimeout(() => setCharIndex((c) => c - 1), 45);
        } else if (deleting && charIndex === 0) {
            setDeleting(false);
            setTextIndex((i) => (i + 1) % typingTexts.length);
        }

        setTypedText(current.substring(0, charIndex));
        return () => clearTimeout(timeout);
    }, [charIndex, deleting, textIndex]);

    return (
        <section className="hero" id="hero">
            {/* Floating particles */}
            <div className="hero-particles">
                {particles.map((p) => (
                    <span
                        key={p.id}
                        className="particle"
                        style={{
                            left: p.left,
                            top: p.top,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                            background: p.color,
                        }}
                    />
                ))}
            </div>

            <div className="hero-content">
                {/* Left: Text */}
                <div className="hero-text">
                    <div className="hero-badge">
                        🎓 BTech CSE · AI/ML Specialization
                    </div>

                    <h1 className="hero-name">
                        <span className="first">Surya</span>
                        <span className="last">Amruthala</span>
                    </h1>

                    <p className="hero-typing">
                        I'm a&nbsp;
                        <span className="typed-text">{typedText}</span>
                        <span className="typed-cursor" />
                    </p>

                    <p className="hero-description">
                        Passionate BTech Computer Science student specializing in Artificial Intelligence
                        &amp; Machine Learning. Building intelligent systems and beautiful web experiences
                        with Python, React, and cutting-edge ML frameworks.
                    </p>

                    <div className="hero-cta">
                        <a
                            className="btn-primary"
                            href="/resume.pdf"
                            download="Surya_Amruthala_Resume.pdf"
                            id="download-resume-btn"
                        >
                            <span className="btn-icon">⬇</span>
                            Download Resume
                        </a>
                        <a
                            className="btn-secondary"
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <span className="btn-icon">🚀</span>
                            View Projects
                        </a>
                    </div>

                    <div className="hero-stats">
                        {[
                            { num: '10+', label: 'Projects' },
                            { num: '5+', label: 'Technologies' },
                            { num: '3+', label: 'Years Coding' },
                        ].map((s) => (
                            <div className="stat-item" key={s.label}>
                                <div className="stat-number">{s.num}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Visual */}
                <div className="hero-visual">
                    <div className="hero-avatar-ring">
                        <div className="ring-outer" />
                        <div className="ring-inner" />
                        <div className="hero-avatar">
                            <img src={profilePic} alt="Surya Amruthala" className="hero-avatar-img" />
                        </div>
                        <div className="orbit-dot" />
                        <div className="orbit-dot" />
                        <div className="orbit-dot" />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <div className="scroll-dot" />
            </div>
        </section>
    );
}
