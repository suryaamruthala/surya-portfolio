import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const cursorDot  = useRef(null);
  const isHovering = useRef(false);
  const [visible,  setVisible]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot tracks instantly
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 });

  // Ring lags behind (elastic trailing effect)
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.8 });

  // Only mount on pointer:fine (non-touch) devices
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mq.matches);

    if (!mq.matches) return; // Do nothing on touch devices

    const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [data-cursor]';

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        setHovering(true);
        isHovering.current = true;
      }
    };

    const onLeave = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest?.(INTERACTIVE)) {
        setHovering(false);
        isHovering.current = false;
      }
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp   = () => setClicking(false);
    const onMouseOut  = () => setVisible(false);
    const onMouseIn   = () => setVisible(true);

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mouseup',    onMouseUp);
    window.addEventListener('mouseleave', onMouseOut);
    window.addEventListener('mouseenter', onMouseIn);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout',  onLeave);

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mouseup',    onMouseUp);
      window.removeEventListener('mouseleave', onMouseOut);
      window.removeEventListener('mouseenter', onMouseIn);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        ref={cursorDot}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:  hovering ? 44 : clicking ? 18 : 32,
          height: hovering ? 44 : clicking ? 18 : 32,
          borderColor: hovering
            ? 'rgba(59,130,246,0.9)'
            : 'rgba(255,255,255,0.5)',
          boxShadow: hovering
            ? '0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.2)'
            : '0 0 8px rgba(255,255,255,0.1)',
          backgroundColor: hovering ? 'rgba(59,130,246,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-2"
      />

      {/* Inner dot — snaps immediately */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:  clicking ? 3 : hovering ? 6 : 5,
          height: clicking ? 3 : hovering ? 6 : 5,
          backgroundColor: hovering ? '#3b82f6' : '#ffffff',
          boxShadow: hovering
            ? '0 0 12px 3px rgba(59,130,246,0.8)'
            : '0 0 6px 1px rgba(255,255,255,0.6)',
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
      />
    </>
  );
};
