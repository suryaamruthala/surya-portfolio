import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCertifications } from '../services/certificationsService';
import { FiAward, FiExternalLink, FiCalendar, FiX, FiEye, FiFileText, FiCheckCircle } from 'react-icons/fi';

const PALETTE = [
  { ring: 'ring-blue-400/40',   grad: 'from-blue-500/30 to-cyan-500/20',    letter: 'text-blue-300' },
  { ring: 'ring-purple-400/40', grad: 'from-purple-500/30 to-pink-500/20',   letter: 'text-purple-300' },
  { ring: 'ring-orange-400/40', grad: 'from-orange-500/30 to-yellow-400/20', letter: 'text-orange-300' },
  { ring: 'ring-emerald-400/40',grad: 'from-emerald-500/30 to-green-400/20', letter: 'text-emerald-300' },
  { ring: 'ring-indigo-400/40', grad: 'from-indigo-500/30 to-blue-400/20',   letter: 'text-indigo-300' },
  { ring: 'ring-rose-400/40',   grad: 'from-rose-500/30 to-orange-400/20',   letter: 'text-rose-300' },
];

const isImage = (url) => url && /\.(png|jpg|jpeg|gif|webp|svg)(\?|$)/i.test(url);
const isPdf   = (url) => url && /\.pdf(\?|$)/i.test(url);

const IssuerAvatar = ({ issuer, logoUrl }) => {
  const { ring, grad, letter } = PALETTE[(issuer?.charCodeAt(0) ?? 0) % PALETTE.length];
  return (
    <div className={`w-12 h-12 flex-shrink-0 rounded-full ring-2 ${ring} bg-gradient-to-br ${grad} flex items-center justify-center overflow-hidden`}>
      {logoUrl
        ? <img src={logoUrl} alt={issuer} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }}/>
        : <span className={`text-lg font-black ${letter}`}>{issuer?.charAt(0).toUpperCase() ?? '?'}</span>
      }
    </div>
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
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0d1117] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-white/[0.03] flex-shrink-0">
            <IssuerAvatar issuer={cert.issuer} logoUrl={cert.issuer_logo_url} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary truncate">{cert.issuer}</p>
              <h3 className="text-base font-bold text-white truncate">{cert.title}</h3>
            </div>
            <div className="flex gap-2">
              <a href={url} target="_blank" rel="noreferrer"
                className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors" title="Open in new tab">
                <FiExternalLink size={16}/>
              </a>
              <button onClick={onClose} className="p-2 rounded-xl bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                <FiX size={16}/>
              </button>
            </div>
          </div>

          {/* Modal body */}
          <div className="flex-1 overflow-auto flex items-center justify-center bg-black/20 p-4">
            {isImage(url) ? (
              <img src={url} alt={cert.title} className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-xl border border-white/10"/>
            ) : isPdf(url) ? (
              <iframe src={url} title={cert.title} className="w-full rounded-xl border border-white/10" style={{ height: '68vh' }}/>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <FiFileText size={40} className="mx-auto mb-3 opacity-30"/>
                <a href={url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1.5 justify-center text-sm">
                  <FiExternalLink size={14}/> Open credential
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Main section ── */
export const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected]   = useState(null);

  useEffect(() => {
    getCertifications()
      .then(data => { setCertifications(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"/>
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"/>
      <div className="absolute left-0 bottom-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"/>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section heading */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-gradient inline-block">Certifications</h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">Professionally validated expertise across platforms and institutions.</p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => {
            const hasFile = isImage(cert.credential_url) || isPdf(cert.credential_url);
            const hasUrl  = !!cert.credential_url;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.45, delay: i * 0.07 }}
              >
                <div className="group relative glass rounded-2xl p-5 border border-white/5 hover:border-primary/25 transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(59,130,246,0.18)] flex flex-col gap-4 overflow-hidden">

                  {/* ── Row 1: avatar + text + actions ── */}
                  <div className="flex items-center gap-3">
                    <IssuerAvatar issuer={cert.issuer} logoUrl={cert.issuer_logo_url}/>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 capitalize">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 truncate font-medium">{cert.issuer}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {hasFile && (
                        <button onClick={() => setSelected(cert)} title="Preview"
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                          <FiEye size={14}/>
                        </button>
                      )}
                      {hasUrl && (
                        <a href={cert.credential_url} target="_blank" rel="noreferrer" title="Open credential"
                          className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-primary/10 hover:text-primary transition-colors">
                          <FiExternalLink size={14}/>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ── Row 2: credential preview strip (compact) ── */}
                  {isImage(cert.credential_url) && (
                    <button onClick={() => setSelected(cert)}
                      className="w-full rounded-xl overflow-hidden border border-white/8 hover:border-primary/30 transition-colors cursor-zoom-in">
                      <img src={cert.credential_url} alt={cert.title}
                        className="w-full object-cover max-h-32 group-hover:scale-[1.02] transition-transform duration-500"/>
                    </button>
                  )}

                  {isPdf(cert.credential_url) && (
                    <button onClick={() => setSelected(cert)}
                      className="flex items-center gap-2.5 px-3.5 py-2 bg-red-500/8 border border-red-500/15 text-red-400 rounded-xl hover:bg-red-500/15 transition-colors text-xs font-semibold w-fit">
                      <FiFileText size={13}/> View PDF Certificate
                    </button>
                  )}

                  {/* ── Row 3: footer ── */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                      <FiCalendar size={11} className="text-primary/50 flex-shrink-0"/>
                      <span>{new Date(cert.issue_date).toLocaleDateString('en-US', { year:'numeric', month:'short' })}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-emerald-500 font-semibold">
                      <FiCheckCircle size={11}/>
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* decorative icon */}
                  <div className="absolute right-4 bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
                    <FiAward size={52}/>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selected && <Viewer cert={selected} onClose={() => setSelected(null)}/>}
    </section>
  );
};
