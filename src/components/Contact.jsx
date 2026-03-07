import { useEffect, useRef, useState } from 'react';

export default function Contact() {
    const ref = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
            { threshold: 0.15 }
        );
        ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <section className="contact" id="contact" ref={ref}>
            <div className="container">
                <h2 className="section-title reveal">
                    Get In <span>Touch</span>
                </h2>
                <p className="section-subtitle reveal">
                    Have an opportunity, project, or just want to say hi? My inbox is always open!
                </p>

                <div className="contact-grid">
                    {/* Left: Info */}
                    <div className="contact-info reveal-left">
                        <h3 className="contact-info-title">Let's Build <span>Together</span></h3>
                        <p className="contact-info-text">
                            I'm currently seeking internships, research collaborations, and exciting
                            project opportunities in AI/ML and Web Development. Don't hesitate to reach out!
                        </p>

                        <div className="contact-links">
                            {[
                                { icon: '📧', label: 'Email', value: 'amruthalasurya2@gmail.com', href: 'mailto:amruthalasurya2@gmail.com' },
                                { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/suryaamruthala', href: 'https://linkedin.com' },
                                { icon: '🐙', label: 'GitHub', value: 'github.com/suryaamruthala', href: 'https://github.com' },
                                { icon: '📱', label: 'Phone', value: '+91 8522824487', href: 'tel:+918522824487' },
                            ].map((item) => (
                                <a key={item.label} href={item.href} className="contact-link-card" target="_blank" rel="noreferrer">
                                    <span className="contact-link-icon">{item.icon}</span>
                                    <div>
                                        <div className="contact-link-label">{item.label}</div>
                                        <div className="contact-link-value">{item.value}</div>
                                    </div>
                                    <span className="contact-link-arrow">→</span>
                                </a>
                            ))}
                        </div>

                        <div className="contact-resume-cta">
                            <a className="btn-primary" href="/resume.pdf" download="Surya_Amruthala_Resume.pdf">
                                <span>⬇</span> Download My Resume
                            </a>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="contact-form-wrapper reveal-right">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-field">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Ravi Kumar"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="ravi@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell me about your opportunity or project..."
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary form-submit" disabled={sent}>
                                {sent ? '✅ Message Sent!' : (<><span>🚀</span> Send Message</>)}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
