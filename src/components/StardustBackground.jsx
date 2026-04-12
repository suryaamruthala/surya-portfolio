import { useEffect, useRef } from 'react';

export const StardustBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const isDark = () => document.documentElement.classList.contains('dark');

    // ── 8-color palette ─────────────────────────────────────────────
    const PALETTE = [
      [59,  130, 246],   // blue
      [139, 92,  246],   // purple
      [6,   182, 212],   // cyan
      [236, 72,  153],   // pink
      [250, 204, 21],    // gold
      [52,  211, 153],   // emerald
      [251, 113, 133],   // rose
      [167, 139, 250],   // violet
    ];

    const pickColors = (count = 2) => {
      const shuffled = [...PALETTE].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    };

    // ── Ambient dust ────────────────────────────────────────────────
    const makeAmbient = () => ({
      type:    'ambient',
      x:       Math.random() * W,
      y:       Math.random() * H,
      r:       Math.random() * 2.4 + 0.8,
      alpha:   Math.random() * 0.75 + 0.25,
      vx:      (Math.random() - 0.5) * 1.6,     // fast horizontal drift
      vy:      -(Math.random() * 1.8 + 0.55),   // fast upward float
      fade:    Math.random() < 0.5 ? 1 : -1,
      fadeSpd: Math.random() * 0.004 + 0.002,
      colors:  pickColors(2 + (Math.random() < 0.3 ? 1 : 0)),
      twinkle: Math.random() * Math.PI * 2,
    });

    // ── Cursor trail ────────────────────────────────────────────────
    const makeTrail = (mx, my) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.8 + 0.6;
      return {
        type:    'trail',
        x:       mx + (Math.random() - 0.5) * 10,
        y:       my + (Math.random() - 0.5) * 10,
        r:       Math.random() * 2.5 + 1.0,
        alpha:   Math.random() * 0.85 + 0.25,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed - 0.6,
        decay:   Math.random() * 0.025 + 0.012,
        colors:  pickColors(3),
        twinkle: 0,
        gravity: 0.045,
      };
    };

    // ── Shooting star ───────────────────────────────────────────────
    const makeShooting = () => {
      // Always travels diagonally downward-right with a slight variance
      const angle  = (Math.random() * 30 + 15) * (Math.PI / 180); // 15–45°
      const speed  = Math.random() * 14 + 10;   // fast!
      const length = Math.random() * 180 + 80;  // tail length
      const colors = pickColors(2);
      return {
        type:    'shooting',
        x:       Math.random() * W * 0.7,        // start from left 70% of screen
        y:       Math.random() * H * 0.4,        // start from top 40%
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed,
        len:     length,
        alpha:   0,                              // fade in from 0
        phase:   'fadein',                       // fadein → alive → fadeout → done
        colors,
        life:    0,
        maxLife: Math.floor(Math.random() * 25 + 20), // frames alive at full alpha
      };
    };

    // Spawn schedule for shooting stars
    let nextShootingIn = Math.random() * 180 + 60; // first one in 60-240 frames
    let frame = 0;

    const AMBIENT_COUNT = Math.min(280, Math.floor((W * H) / 5000));
    const particles = Array.from({ length: AMBIENT_COUNT }, makeAmbient);

    // ── Mouse tracking ───────────────────────────────────────────────
    let mouseX = -999, mouseY = -999;
    let lastX  = -999, lastY  = -999;

    const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Draw multi-gradient dust particle ───────────────────────────
    const drawParticle = (p, alpha, glowRadius) => {
      const c0 = p.colors[0], c1 = p.colors[1], c2 = p.colors[2] || p.colors[0];
      const [r0,g0,b0] = c0, [r1,g1,b1] = c1, [r2,g2,b2] = c2;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
      grad.addColorStop(0,    `rgba(${r0},${g0},${b0},${alpha})`);
      grad.addColorStop(0.40, `rgba(${r1},${g1},${b1},${alpha * 0.55})`);
      grad.addColorStop(0.75, `rgba(${r2},${g2},${b2},${alpha * 0.20})`);
      grad.addColorStop(1,    `rgba(${r2},${g2},${b2},0)`);
      ctx.beginPath(); ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();

      const core = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      core.addColorStop(0,   `rgba(255,255,255,${Math.min(1, alpha * 1.8)})`);
      core.addColorStop(0.4, `rgba(${r0},${g0},${b0},${Math.min(1, alpha * 1.4)})`);
      core.addColorStop(1,   `rgba(${r1},${g1},${b1},0)`);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = core; ctx.fill();
    };

    // ── Draw shooting star ──────────────────────────────────────────
    const drawShooting = (s) => {
      const tailX = s.x - s.vx / Math.hypot(s.vx, s.vy) * s.len;
      const tailY = s.y - s.vy / Math.hypot(s.vx, s.vy) * s.len;

      const [r0,g0,b0] = s.colors[0];
      const [r1,g1,b1] = s.colors[1];

      // Tail gradient: head bright, tail transparent
      const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0,    `rgba(${r0},${g0},${b0},0)`);
      grad.addColorStop(0.5,  `rgba(${r1},${g1},${b1},${s.alpha * 0.4})`);
      grad.addColorStop(0.85, `rgba(255,255,255,${s.alpha * 0.9})`);
      grad.addColorStop(1,    `rgba(255,255,255,${s.alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 2;
      ctx.lineCap     = 'round';
      ctx.stroke();

      // Glowing head
      const headGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 8);
      headGrad.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
      headGrad.addColorStop(0.4, `rgba(${r0},${g0},${b0},${s.alpha * 0.7})`);
      headGrad.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);
      ctx.beginPath(); ctx.arc(s.x, s.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = headGrad; ctx.fill();
    };

    // ── Main loop ────────────────────────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const dark = isDark();
      frame++;

      // ── Spawn shooting stars on schedule ──
      nextShootingIn--;
      if (nextShootingIn <= 0) {
        // Spawn 1-2 at once occasionally
        particles.push(makeShooting());
        if (Math.random() < 0.3) particles.push(makeShooting());
        nextShootingIn = Math.random() * 220 + 80; // wait 80-300 frames for next
      }

      // ── Spawn cursor trail ──
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 4 && mouseX > 0) {
        const count = Math.min(8, Math.floor(dist / 5) + 2);
        for (let i = 0; i < count; i++) particles.push(makeTrail(mouseX, mouseY));
        lastX = mouseX; lastY = mouseY;
      }

      // ── Update & draw ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.type === 'ambient') {
          p.twinkle += 0.022;
          const pulse = 0.5 + 0.5 * Math.sin(p.twinkle);
          p.alpha += p.fadeSpd * p.fade;
          if (p.alpha >= 0.75 || p.alpha <= 0.05) p.fade *= -1;
          p.x += p.vx; p.y += p.vy;
          if (p.y < -5)    p.y = H + 5;
          if (p.x < -5)    p.x = W + 5;
          if (p.x > W + 5) p.x = -5;

          const alpha = dark
            ? p.alpha * (0.65 + 0.35 * pulse)
            : p.alpha * 0.90 * (0.65 + 0.35 * pulse);
          drawParticle(p, alpha, p.r * 7);

        } else if (p.type === 'trail') {
          p.vy += p.gravity;
          p.vx *= 0.97; p.vy *= 0.97;
          p.x += p.vx; p.y += p.vy;
          p.alpha -= p.decay;
          p.r    *= 0.97;
          if (p.alpha <= 0.01 || p.r < 0.15) { particles.splice(i, 1); continue; }
          drawParticle(p, dark ? p.alpha : p.alpha * 0.85, p.r * 7);

        } else if (p.type === 'shooting') {
          // Phase machine: fadein → alive → fadeout → remove
          if (p.phase === 'fadein') {
            p.alpha = Math.min(1, p.alpha + 0.08);
            if (p.alpha >= 1) p.phase = 'alive';
          } else if (p.phase === 'alive') {
            p.life++;
            if (p.life >= p.maxLife) p.phase = 'fadeout';
          } else {
            p.alpha = Math.max(0, p.alpha - 0.06);
            if (p.alpha <= 0) { particles.splice(i, 1); continue; }
          }
          p.x += p.vx;
          p.y += p.vy;
          // Remove if fully off screen
          if (p.x > W + 100 || p.y > H + 100) { particles.splice(i, 1); continue; }
          drawShooting(p);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: 'normal', opacity: 1 }}
      aria-hidden="true"
    />
  );
};
