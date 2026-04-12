import { motion } from 'framer-motion';

/**
 * SplitText — animates each character with a staggered cascade.
 *
 * ⚠️  Do NOT wrap gradient text with this component — CSS bg-clip-text
 *     cannot clip through child inline-block spans. For gradient headings,
 *     wrap the whole heading in a motion.span with className="text-gradient".
 *
 * Props:
 *   text      {string}  — text to animate
 *   className {string}  — outer wrapper classes (avoid text-gradient here)
 *   charClass {string}  — per-character span classes
 *   delay     {number}  — initial delay in seconds
 *   stagger   {number}  — delay between characters (default 0.03s)
 *   once      {bool}    — only animate once on viewport enter (default true)
 */
export const SplitText = ({
  text,
  className  = '',
  charClass  = '',
  delay      = 0,
  stagger    = 0.03,
  once       = true,
}) => {
  const container = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };

  const charVariant = {
    hidden:  { opacity: 0, y: 28, rotateX: -90, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={`inline-block ${className}`}
      aria-label={text}
      style={{ perspective: 600 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={charVariant}
          className={`inline-block ${charClass}`}
          style={{ whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * GradientHeading — use this for gradient headings with the split-text effect.
 * Avoids the bg-clip-text + inline-block conflict by animating the whole heading
 * as one blurred/faded unit while keeping the gradient intact.
 */
export const GradientHeading = ({
  text,
  className   = '',
  delay       = 0,
  once        = true,
  tag: Tag    = 'h2',
}) => {
  return (
    <motion.span
      className={`text-gradient inline-block ${className}`}
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.span>
  );
};
