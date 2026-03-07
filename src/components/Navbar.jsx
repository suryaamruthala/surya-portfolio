import { useState, useEffect } from 'react';

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNav = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <div className="navbar-inner">
                    <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}>
                        <span>SA</span><span style={{ opacity: 0.5 }}>.</span><span>DEV</span>
                    </a>
                    <ul className="navbar-links">
                        {navLinks.map((l) => (
                            <li key={l.label}>
                                <a href={l.href} onClick={(e) => { e.preventDefault(); handleNav(l.href); }}>
                                    {l.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a className="btn-primary" href="/resume.pdf" download style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                                <span className="btn-icon">⬇</span> Resume
                            </a>
                        </li>
                    </ul>
                    <button
                        className="navbar-menu-btn"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        style={{ display: 'none' }}
                        id="hamburger"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />
            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
                {navLinks.map((l) => (
                    <a key={l.label} href={l.href} onClick={(e) => { e.preventDefault(); handleNav(l.href); }}>
                        {l.label}
                    </a>
                ))}
                <a className="btn-primary" href="/resume.pdf" download style={{ marginTop: '2rem', justifyContent: 'center' }}>
                    <span className="btn-icon">⬇</span> Download Resume
                </a>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .navbar-links { display: none !important; }
          #hamburger { display: flex !important; }
        }
      `}</style>
        </>
    );
}
