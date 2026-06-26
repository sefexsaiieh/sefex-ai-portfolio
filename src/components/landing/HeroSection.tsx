import { useTranslation } from 'react-i18next';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroSectionProps {
  onCtaClick: () => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Subtle algorithmic / math symbols that drift in the background
const ALGO_SYMBOLS = [
  { char: '∑', x: 5, y: 20, size: 26, drift: 22, delay: 0 },
  { char: 'O(n)', x: 15, y: 55, size: 13, drift: 28, delay: 2.5 },
  { char: 'λ', x: 88, y: 35, size: 24, drift: 25, delay: 1.2 },
  { char: 'Δ', x: 75, y: 70, size: 22, drift: 30, delay: 3.8 },
  { char: '∫', x: 92, y: 15, size: 28, drift: 26, delay: 4.1 },
  { char: '∞', x: 50, y: 85, size: 18, drift: 24, delay: 2.0 },
  { char: 'π', x: 10, y: 80, size: 20, drift: 29, delay: 5.3 },
  { char: 'O(log n)', x: 82, y: 60, size: 11, drift: 32, delay: 1.8 },
  { char: '→', x: 35, y: 30, size: 16, drift: 27, delay: 3.2 },
  { char: 'Θ', x: 62, y: 45, size: 18, drift: 31, delay: 0.7 },
  { char: '{ }', x: 42, y: 75, size: 14, drift: 26, delay: 4.5 },
  { char: '∀', x: 28, y: 50, size: 16, drift: 28, delay: 2.8 },
  { char: '∂', x: 68, y: 25, size: 20, drift: 24, delay: 1.5 },
  { char: 'Ω', x: 18, y: 65, size: 18, drift: 30, delay: 3.6 },
  { char: '⊥', x: 55, y: 15, size: 16, drift: 27, delay: 0.3 },
  { char: '√', x: 45, y: 90, size: 22, drift: 33, delay: 5.0 },
  { char: 'φ', x: 95, y: 50, size: 18, drift: 25, delay: 2.2 },
  { char: '≈', x: 22, y: 40, size: 14, drift: 29, delay: 4.8 },
  { char: '[ ]', x: 72, y: 80, size: 12, drift: 28, delay: 1.1 },
  { char: '∇', x: 32, y: 70, size: 16, drift: 31, delay: 3.4 },
  { char: '∈', x: 85, y: 90, size: 14, drift: 26, delay: 0.9 },
  { char: 'O(1)', x: 48, y: 60, size: 11, drift: 30, delay: 4.3 },
  { char: 'α', x: 8, y: 45, size: 14, drift: 27, delay: 2.7 },
  { char: '≠', x: 65, y: 55, size: 14, drift: 32, delay: 1.6 },
  { char: '⇒', x: 40, y: 20, size: 15, drift: 26, delay: 3.9 },
  { char: 'n!', x: 58, y: 35, size: 13, drift: 29, delay: 0.5 },
  { char: '0 1', x: 78, y: 45, size: 11, drift: 28, delay: 5.5 },
  { char: '</>', x: 25, y: 85, size: 12, drift: 31, delay: 2.4 },
  { char: '⌈⌉', x: 52, y: 72, size: 13, drift: 27, delay: 3.7 },
  { char: 'O(n²)', x: 12, y: 30, size: 11, drift: 33, delay: 1.9 },
];

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const { t } = useTranslation();
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const prefersReduced = useReducedMotion();

  // Typewriter effect on tagline (only if not reduced motion)
  useEffect(() => {
    if (prefersReduced) return;
    const el = taglineRef.current;
    if (!el) return;
    const text = el.textContent || '';
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  // Skip stagger animation when user prefers reduced motion
  const anim = prefersReduced
    ? { initial: 'visible' as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, animate: 'visible' as const };

  return (
    <section className="relative flex flex-col items-center text-center px-4 pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
      {/* Background hero gradient glow */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" aria-hidden="true" />

      {/* Algorithmic / math symbols floating in background */}
      {!prefersReduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          {ALGO_SYMBOLS.map((sym, i) => (
            <span
              key={i}
              className="absolute font-mono"
              style={{
                left: `${sym.x}%`,
                top: `${sym.y}%`,
                fontSize: `${sym.size}px`,
                color: '#94a3b8',
                opacity: 0.025,
                animation: `math-drift ${sym.drift}s ease-in-out ${sym.delay}s infinite`,
                willChange: 'transform',
              }}
            >
              {sym.char}
            </span>
          ))}
        </div>
      )}

      {/* Subtle top accent glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        {...anim}
        className="relative flex flex-col items-center"
      >
        {/* Badge pill: AI-Powered Portfolio */}
        <motion.div
          variants={itemVariants}
          className="badge-pill mb-6"
        >
          <Sparkles className="w-3 h-3" aria-hidden="true" />
          <span>AI-Powered Portfolio</span>
        </motion.div>

        {/* Name — vibrant gradient */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display text-gradient-vibrant"
        >
          {t('hero.title')}
        </motion.h1>

        {/* Subtitle — accent gradient */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-2xl md:text-3xl font-semibold text-gradient-accent"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Tagline — typewriter */}
        <motion.p
          variants={itemVariants}
          ref={taglineRef}
          className="mt-6 max-w-3xl text-lg text-slate-400 leading-relaxed font-light"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* CTA button */}
        <motion.div variants={itemVariants} className="mt-10">
          <button
            onClick={onCtaClick}
            className="glow-button inline-flex items-center gap-3 px-8 py-3.5 text-base font-semibold text-white rounded-xl z-10 group"
            aria-label={t('hero.cta')}
            aria-controls="chat-panel"
          >
            <span className="relative z-10 flex items-center gap-3">
              <BrainCircuit
                className="w-5 h-5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12"
                aria-hidden="true"
                style={{
                  animation: prefersReduced
                    ? 'none'
                    : 'brainPulse 2.5s ease-in-out infinite',
                }}
              />
              <span>{t('hero.cta')}</span>
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-space-950 pointer-events-none" />
    </section>
  );
}
