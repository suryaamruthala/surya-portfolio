import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend, FiArrowRight } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const isEmailJsConfigured = Boolean(serviceId && templateId && publicKey);

/* ── Magnetic 3D Info Row ── */
function InfoRow({ icon, label, value, accentClass, glowColor }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-30, 30], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-30, 30], [-8, 8]), { stiffness: 300, damping: 25 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="flex items-center gap-4 group cursor-default"
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
        className={`relative p-4 rounded-2xl ${accentClass} transition-all duration-300 overflow-hidden`}
      >
        {/* Pulse ring on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ background: glowColor }}
        />
        {icon}
      </motion.div>
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-foreground">{value}</p>
      </div>
    </motion.div>
  );
}

/* ── Glowing Input Field ── */
function GlowInput({ label, children }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="group">
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        {/* Animated glow border */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl pointer-events-none"
          animate={focused
            ? { opacity: 1, boxShadow: '0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.2)' }
            : { opacity: 0, boxShadow: '0 0 0px transparent' }
          }
          transition={{ duration: 0.3 }}
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(168,85,247,0.5))', borderRadius: 16 }}
        />
        {/* Content with focus/blur events */}
        <div onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Animated Social Button ── */
function SocialButton({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ y: -6, scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative p-4 glass rounded-2xl text-foreground overflow-hidden group"
    >
      {/* Glow bg on hover */}
      <motion.div
        className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
      />
      {/* Shimmer */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
      <motion.div
        whileHover={{ rotate: [0, -15, 15, 0] }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-primary"
      >
        {icon}
      </motion.div>
    </motion.a>
  );
}

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });

  useEffect(() => { if (publicKey) emailjs.init(publicKey); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailJsConfigured) {
      alert('EmailJS is not configured.');
      return;
    }
    setIsSubmitting(true);
    try {
      await emailjs.send(serviceId, templateId, {
        from_name:  formData.name,
        from_email: formData.email,
        message:    formData.message,
        to_email:   'amruthalasurya2@gmail.com',
      });
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      alert(`Failed to send: ${error?.text || error?.message || 'Try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ active: true, x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple({ active: false, x: 0, y: 0 }), 600);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-0 w-80 h-80 bg-primary blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient inline-block">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out. I'm always open to new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(59,130,246,0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="glass p-8 rounded-3xl space-y-6"
            >
              <h3 className="text-2xl font-bold mb-4 text-foreground">Contact Information</h3>

              <InfoRow
                icon={<FiMail size={24} />}
                label="Email"
                value="amruthalasurya2@gmail.com"
                accentClass="bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white"
                glowColor="rgba(59,130,246,0.3)"
              />
              <InfoRow
                icon={<FiMapPin size={24} />}
                label="Location"
                value="Andhra Pradesh, India"
                accentClass="bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-white"
                glowColor="rgba(168,85,247,0.3)"
              />

              <div className="pt-6 border-t border-border flex gap-4">
                <SocialButton
                  href="https://github.com/suryaamruthala"
                  icon={<FiGithub size={24} />}
                  label="GitHub"
                />
                <SocialButton
                  href="https://www.linkedin.com/in/surya-amruthala-a10a213b5"
                  icon={<FiLinkedin size={24} />}
                  label="LinkedIn"
                />
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative glass p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/5 overflow-hidden group"
            >
              {/* Animated border gradient */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(168,85,247,0.15))' }}
              />
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                />
                <h4 className="text-xl font-bold text-foreground">Available for Freelance</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400">I'm currently taking on new projects and collaborations.</p>
              <motion.div
                whileHover={{ x: 4 }}
                className="mt-4 flex items-center gap-2 text-primary text-sm font-bold"
              >
                Let's work together <FiArrowRight />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {!isEmailJsConfigured && (
              <div className="mb-6 rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
                EmailJS is not configured. Add your keys to <code className="font-mono">.env</code>.
              </div>
            )}

            <motion.form
              onSubmit={handleSubmit}
              whileHover={{ boxShadow: '0 30px 60px rgba(59,130,246,0.1)' }}
              className="glass p-10 rounded-3xl space-y-6 relative overflow-hidden"
            >
              {/* Form shimmer on hover */}
              <div className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none skew-x-12" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlowInput label="Name">
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-white/5 dark:bg-white/5 border border-border rounded-2xl focus:outline-none transition-colors text-gray-900 dark:text-white"
                    required
                  />
                </GlowInput>

                <GlowInput label="Email">
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-white/5 dark:bg-white/5 border border-border rounded-2xl focus:outline-none transition-colors text-gray-900 dark:text-white"
                    required
                  />
                </GlowInput>
              </div>

              <GlowInput label="Message">
                <textarea
                  rows="5"
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 bg-white/5 dark:bg-white/5 border border-border rounded-2xl focus:outline-none transition-colors text-gray-900 dark:text-white resize-none"
                  required
                />
              </GlowInput>

              {/* Send button with ripple effect */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !isEmailJsConfigured}
                onClick={handleButtonClick}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59,130,246,0.5)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative w-full py-5 bg-primary text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                {/* Ripple */}
                {ripple.active && (
                  <motion.span
                    className="absolute rounded-full bg-white/30 pointer-events-none"
                    style={{ left: ripple.x - 10, top: ripple.y - 10, width: 20, height: 20 }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 20, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                {/* Button shimmer */}
                <div className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none skew-x-12" />

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      ✅ Message Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          {isEmailJsConfigured ? 'Send Message' : 'EmailJS Not Configured'}
                          <motion.div whileHover={{ x: 4, rotate: -20 }} transition={{ type: 'spring' }}>
                            <FiSend size={20} />
                          </motion.div>
                        </>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
