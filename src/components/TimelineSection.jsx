import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ExternalLink } from 'lucide-react';
import { getTimeline } from '../services/timelineService';

function TimelineCardItem({ item, index }) {
  const isEven = index % 2 === 0;
  const isEducation = item.type === 'education' || item.type === 'Education';
  const Icon = isEducation ? GraduationCap : Briefcase;
  
  const shadowColor = isEducation ? 'rgba(168,85,247,0.6)' : 'rgba(59,130,246,0.6)';
  const activeBorderColor = isEducation ? 'rgba(168,85,247,0.8)' : 'rgba(59,130,246,0.8)';
  const iconTextColorClass = isEducation ? "text-purple-400" : "text-blue-400";
  
  const gradientDesktopClass = isEven 
    ? `bg-gradient-to-l ${isEducation ? 'from-purple-500 via-pink-500/50' : 'from-blue-500 via-cyan-500/50'} to-transparent` 
    : `bg-gradient-to-r ${isEducation ? 'from-purple-500 via-pink-500/50' : 'from-blue-500 via-cyan-500/50'} to-transparent`;
    
  const gradientMobileClass = `bg-gradient-to-r ${isEducation ? 'from-purple-500 via-pink-500/50' : 'from-blue-500 via-cyan-500/50'} to-transparent`;

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 25 });

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <div className="relative flex flex-col md:flex-row items-center md:justify-between w-full">
      <div className={`hidden md:block w-5/12 ${!isEven ? 'order-1' : 'order-3'}`}></div>

      {/* Desktop Line */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0, y: "-50%" }}
        whileInView={{ opacity: 1, scaleX: 1, y: "-50%" }}
        viewport={{ margin: "10000px 0px -50% 0px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`hidden md:block absolute top-1/2 h-[8px] z-0 origin-${isEven ? 'right' : 'left'} ${isEven ? 'right-1/2 w-[calc(8.33%+4rem)]' : 'left-1/2 w-[calc(8.33%+4rem)]'} ${gradientDesktopClass}`}
        style={{ boxShadow: `0 0 12px ${shadowColor}` }}
      />
      
      {/* Mobile Line */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0, y: "-50%" }}
        whileInView={{ opacity: 1, scaleX: 1, y: "-50%" }}
        viewport={{ margin: "10000px 0px -50% 0px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`origin-left hidden sm:block md:hidden absolute top-1/2 left-6 w-14 h-[8px] z-0 ${gradientMobileClass}`} 
        style={{ boxShadow: `0 0 12px ${shadowColor}` }}
      />

      {/* Animated Pulse Icon */}
      <motion.div 
        initial={{ x: "-50%", y: "-50%", boxShadow: "0 0 0px rgba(0,0,0,0)", borderColor: "rgba(255,255,255,0.1)", scale: 0.8 }}
        whileInView={{ 
          x: "-50%", y: "-50%",
          boxShadow: [`0 0 10px ${shadowColor}`, `0 0 25px ${shadowColor}`, `0 0 10px ${shadowColor}`], 
          borderColor: activeBorderColor, 
          scale: 1 
        }}
        viewport={{ margin: "10000px 0px -50% 0px" }}
        transition={{ 
          duration: 0.3, 
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
        }}
        className="absolute top-1/2 left-6 md:left-1/2 flex items-center justify-center w-12 h-12 rounded-full glass border-2 z-20 md:order-2 hidden sm:flex bg-background"
      >
        <Icon className={`w-5 h-5 ${iconTextColorClass}`} />
      </motion.div>

      {/* 3D Tilt Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`w-full sm:pl-20 md:pl-0 md:w-5/12 ${isEven ? 'md:pr-16 order-1' : 'md:pl-16 order-3'}`}
      >
        <motion.div 
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          className="glass p-8 rounded-3xl relative group overflow-hidden border border-white/5 hover:border-primary/40 transition-colors duration-300 bg-background/50 backdrop-blur-xl text-center"
        >
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl ${
            isEven ? 'bg-gradient-to-bl' : 'bg-gradient-to-br'
          } ${isEducation ? 'from-purple-500/10' : 'from-blue-500/10'} to-transparent`} />
          
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-opacity-10 border text-sm font-medium backdrop-blur-sm ${
              isEducation ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
            }`}>
              <Calendar className="w-4 h-4" />
              {item.date}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {item.title}
          </h3>
          <h4 className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-4">
            {item.organization}
          </h4>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">
            {item.description}
          </p>

          {item.document_url && (
            <div className="mt-6 flex justify-center">
              <a 
                href={item.document_url} 
                target="_blank" 
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm border hover:-translate-y-1 ${
                  isEducation 
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                }`}
              >
                View Document <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export const TimelineSection = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimeline()
      .then(data => {
        setTimelineData(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!loading && timelineData.length === 0) return null;

  return (
    <section id="experience" ref={containerRef} className="py-24 px-6 relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient inline-block">Education & Experience</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A chronological timeline of my professional journey and academic background.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Spine Base */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[8px] bg-white/10 -translate-x-1/2 rounded-full hidden sm:block"></div>
          
          {/* Animated Spine */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[8px] origin-top hidden sm:block rounded-full overflow-hidden z-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            style={{ x: "-50%", scaleY }}
          >
            <motion.div 
              className="absolute inset-0 w-full"
              style={{
                backgroundImage: "linear-gradient(to bottom, #3b82f6 0%, #a855f7 33%, #06b6d4 66%, #3b82f6 100%)",
                backgroundSize: "100% 300%"
              }}
              animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineCardItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
