import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getCertifications } from '../services/certificationsService';
import { FiAward, FiExternalLink, FiCalendar, FiX, FiEye, FiFileText, FiCheckCircle, FiShield } from 'react-icons/fi';

const PALETTE = [
  { ring: 'ring-blue-400/40',    grad: 'from-blue-500/30 to-cyan-500/20',    letter: 'text-blue-300',    glow: 'rgba(59,130,246,0.4)' },
  { ring: 'ring-purple-400/40',  grad: 'from-purple-500/30 to-pink-500/20',  letter: 'text-purple-300',  glow: 'rgba(168,85,247,0.4)' },
  { ring: 'ring-orange-400/40',  grad: 'from-orange-500/30 to-yellow-400/20', letter: 'text-orange-300', glow: 'rgba(249,115,22,0.4)' },
  { ring: 'ring-emerald-400/40', grad: 'from-emerald-500/30 to-green-400/20', letter: 'text-emerald-300', glow: 'rgba(16,185,129,0.4)' },
  { ring: 'ring-indigo-400/40',  grad: 'from-indigo-500/30 to-blue-400/20',  letter: 'text-indigo-300',  glow: 'rgba(99,102,241,0.4)' },
  { ring: 'ring-rose-400/40',    grad: 'from-rose-500/30 to-orange-400/20',  letter: 'text-rose-300',    glow: 'rgba(244,63,94,0.4)' },
];

const isImage = (url) => url && /\.(png|jpg|jpeg|gif|webp|svg)(\?|$)/i.test(url);
const isPdf   = (url) => url && /\.pdf(\?|$)/i.test(url);

const IssuerAvatar = ({ issuer, logoUrl }) => {
  const { ring, grad, letter } = PALETTE[(issuer?.charCodeAt(0) ?? 0) % PALETTE.length];
  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.4 }}
      className={`w-12 h-12 flex-shrink-0 rounded-full ring-2 ${ring} bg-gradient-to-br ${grad} flex items-center justify-center overflow-hidden`}
    >
      {logoUrl
        ? <img src={logoUrl} alt={issuer} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
        : <span className={`text-lg font-black ${letter}`}>{issuer?.charAt(0).toUpperCase() ?? '?'}</span>
      }
    </motion.div>
  );
};

/* ── Full-screen credential viewer ── */
const Viewer = ({ cert, onClose }) => {
  const url = cert.credential_url;
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0d1117] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-white/[0.03] flex-shrink-0">
            <IssuerAvatar issuer={cert.issuer} logoUrl={cert.issuer_logo_url} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary truncate">{cert.issuer}</p>
              <h3 className="text-base font-bold text-white truncate">{cert.title}</h3>
            </div>
            <div className="flex gap-2">
              <motion.a
                href={url} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(59,130,246,1)', color: 'white' }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-primary/10 text-primary transition-colors"
                title="Open in new tab"
              >
                <FiExternalLink size={16} />
              </motion.a>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, rotate: 90 }}
                className="p-2 rounded-xl bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <FiX size={16} />
              </motion.button>
            </div>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center bg-black/20 p-4">
            {isImage(url) ? (
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={url} alt={cert.title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-xl border border-white/10"
              />
            ) : isPdf(url) ? (
              <iframe src={url} title={cert.title} className="w-full rounded-xl border border-white/10" style={{ height: '68vh' }} />
            ) : (
              <div className="text-center py-16 text-gray-500">
                <FiFileText size={40} className="mx-auto mb-3 opacity-30" />
                <a href={url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1.5 justify-center text-sm">
                  <FiExternalLink size={14} /> Open credential
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Cert Card with 3D tilt ── */
function CertCard({ cert, index, onPreview }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-30, 30], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-6, 6]), { stiffness: 300, damping: 25 });
  const glowX = useTransform(x, [-80, 80], [0, 100]);
  const glowY = useTransform(y, [-30, 30], [0, 100]);
  const hasFile = isImage(cert.credential_url) || isPdf(cert.credential_url);
  const hasUrl  = !!cert.credential_url;
  const { glow } = PALETTE[(cert.issuer?.charCodeAt(0) ?? 0) % PALETTE.length];

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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      className="group relative glass rounded-2xl p-5 border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
    >
      {/* Mouse-tracking spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glow} 0%, transparent 65%)` }}
      />
      {/* Shimmer sweep */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none skew-x-12" />

      {/* Row 1: avatar + text + actions */}
      <div className="flex items-center gap-3 relative z-10">
        <IssuerAvatar issuer={cert.issuer} logoUrl={cert.issuer_logo_url} />
        <div className="flex-1 min-w-0">
          <motion.h3
            className="text-sm font-bold leading-tight line-clamp-2 capitalize transition-colors"
            whileHover={{ color: '#3b82f6' }}
          >
            {cert.title}
          </motion.h3>
          <p className="text-xs text-gray-400 mt-0.5 truncate font-medium">{cert.issuer}</p>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {hasFile && (
            <motion.button
              onClick={() => onPreview(cert)}
              whileHover={{ scale: 1.15, backgroundColor: 'rgba(59,130,246,1)', color: 'white' }}
              whileTap={{ scale: 0.9 }}
              title="Preview"
              className="p-1.5 rounded-lg bg-primary/10 text-primary transition-colors"
            >
              <FiEye size={14} />
            </motion.button>
          )}
          {hasUrl && (
            <motion.a
              href={cert.credential_url} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              title="Open credential"
              className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-primary transition-colors"
            >
              <FiExternalLink size={14} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Image preview strip */}
      {isImage(cert.credential_url) && (
        <motion.button
          onClick={() => onPreview(cert)}
          whileHover={{ scale: 1.01 }}
          className="w-full rounded-xl overflow-hidden border border-white/8 hover:border-primary/30 transition-colors cursor-zoom-in relative z-10"
        >
          <img
            src={cert.credential_url} alt={cert.title}
            className="w-full object-cover max-h-32 group-hover:scale-[1.03] transition-transform duration-500"
          />
        </motion.button>
      )}

      {isPdf(cert.credential_url) && (
        <motion.button
          onClick={() => onPreview(cert)}
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 px-3.5 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors text-xs font-semibold w-fit relative z-10"
        >
          <FiFileText size={13} /> View PDF Certificate
        </motion.button>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto relative z-10">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <FiCalendar size={11} className="text-primary/50 flex-shrink-0" />
          <span>{new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1 text-xs text-emerald-500 font-semibold"
        >
          <FiCheckCircle size={11} />
          <span>Verified</span>
        </motion.div>
      </div>

      {/* Decorative bg icon */}
      <div className="absolute right-4 bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
        <FiShield size={52} />
      </div>
    </motion.div>
  );
}

export const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getCertifications()
      .then(data => {
        const sorted = (data || []).sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date));
        setCertifications(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute right-0 top-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 9, repeat: Infinity, delay: 2 }}
        className="absolute left-0 bottom-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-gradient inline-block">Certifications</h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">Professionally validated expertise across platforms and institutions.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative glass rounded-3xl border-4 border-white/20 ring-4 ring-primary/60 shadow-[0_0_60px_-10px_rgba(59,130,246,0.7)] overflow-hidden"
        >
          {/* Subtle background glow inside container */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
          
          <div className="max-h-[650px] overflow-y-auto p-6 md:p-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {certifications.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} onPreview={setSelected} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {selected && <Viewer cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};
