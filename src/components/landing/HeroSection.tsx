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
