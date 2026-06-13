import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 120;
const SYMBOL_COUNT = 12;
const SYMBOLS = ['∑', 'π', 'λ', '∂', '∞', '∫', 'Δ', 'Ω', 'φ', 'θ', '√', '∈'];

interface MathSymbol {
  x: number;
  y: number;
  symbol: string;
  size: number;
  alpha: number;
  speed: number;
  offset: number;
}

export function ParticleNetwork() {
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const symbols = useRef<MathSymbol[]>([]);
  const animationId = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    // Init floating math symbols
    symbols.current = Array.from({ length: SYMBOL_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: Math.random() * 10 + 8,
      alpha: Math.random() * 0.06 + 0.02,
      speed: Math.random() * 0.15 + 0.05,
      offset: Math.random() * 100,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      const parts = particles.current;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < parts.length; j++) {
          const p2 = parts[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const force = (1 - mdist / 150) * 0.03;
          p.vx += (p.x - mx) / mdist * force;
          p.vy += (p.y - my) / mdist * force;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;
      }

      // Draw math symbols
      const time = Date.now() / 1000;
      for (const s of symbols.current) {
        const driftY = Math.sin(time * s.speed + s.offset) * 20;
        ctx.font = `${s.size}px "IBM Plex Mono", monospace`;
        ctx.fillStyle = `rgba(148, 163, 184, ${s.alpha})`;
        ctx.fillText(s.symbol, s.x, s.y + driftY);
      }

      animationId.current = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    animate();

    return () => {
      cancelAnimationFrame(animationId.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
