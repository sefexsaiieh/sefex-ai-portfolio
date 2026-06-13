import { useTranslation } from 'react-i18next';
import { Sparkles, MessageSquare } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center text-center px-4 py-16 md:py-24">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-accent-800 bg-accent-50 rounded-full border border-accent-200">
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        <span>AI-Powered Portfolio</span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 font-serif">
        {t('hero.title')}
      </h1>
      <p className="mt-3 text-xl md:text-2xl font-medium text-accent-700">
        {t('hero.subtitle')}
      </p>
      <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
        {t('hero.tagline')}
      </p>

      <button
        onClick={onCtaClick}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-accent-600 hover:bg-accent-700 rounded-xl shadow-lg shadow-accent-200 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
        aria-label={t('hero.cta')}
        aria-controls="chat-panel"
      >
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
        {t('hero.cta')}
      </button>
    </section>
  );
}
