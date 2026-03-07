export default function Footer() {
    const year = new Date().getFullYear();

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <span className="footer-logo">SA<span style={{ opacity: 0.5 }}>.</span>DEV</span>
                    <p className="footer-tagline">Building the future with AI & Code 🚀</p>
                    <div className="footer-socials">
                        {[
                            { icon: '🐙', href: 'https://github.com', label: 'GitHub' },
                            { icon: '💼', href: 'https://linkedin.com', label: 'LinkedIn' },
                            { icon: '🐦', href: 'https://twitter.com', label: 'Twitter' },
                            { icon: '📧', href: 'mailto:amruthalasurya2@gmail.com', label: 'Email' },
                        ].map((s) => (
                            <a key={s.label} href={s.href} className="footer-social" target="_blank" rel="noreferrer" title={s.label}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-links-group">
                    <h4>Navigation</h4>
                    <ul>
                        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((l) => (
                            <li key={l}>
                                <a href={`#${l.toLowerCase()}`} onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(`#${l.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    {l}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4>Skills</h4>
                    <ul>
                        {['Python', 'React.js', 'Machine Learning', 'Java', 'Bootstrap'].map((s) => (
                            <li key={s}><span className="footer-skill-tag">{s}</span></li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    © {year} <strong>Surya Amruthala</strong>. Built with ⚛️ React & ❤️
                </p>
                <button className="scroll-top-btn" onClick={scrollTop} title="Back to top">
                    ↑
                </button>
            </div>
        </footer>
    );
}
