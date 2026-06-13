import { useTranslation } from 'react-i18next';
import { Sparkles, MessageSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const { t } = useTranslation();
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section className="relative flex flex-col items-center text-center px-4 pt-28 pb-12 md:pt-36 md:pb-16">
      {/* Badge */}
      <div className="badge-pill mb-6 animate-float">
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        <span>AI-Powered Portfolio</span>
      </div>

      {/* Name */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display">
        <span className="text-gradient">{t('hero.title')}</span>
      </h1>

      {/* Subtitle with gradient accent */}
      <p className="mt-4 text-2xl md:text-3xl font-semibold text-gradient-accent">
        {t('hero.subtitle')}
      </p>

      {/* Tagline with typing effect */}
      <p
        ref={taglineRef}
        className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed font-light"
      >
        {t('hero.tagline')}
      </p>

      {/* CTA */}
      <button
        onClick={onCtaClick}
        className="glow-button mt-10 inline-flex items-center gap-2.5 px-8 py-3.5 text-base font-semibold text-white rounded-xl z-10"
        aria-label={t('hero.cta')}
        aria-controls="chat-panel"
      >
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
        <span className="relative z-10">{t('hero.cta')}</span>
      </button>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-space-950 pointer-events-none" />
    </section>
  );
}
