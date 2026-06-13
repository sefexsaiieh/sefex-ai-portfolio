import { useTranslation } from 'react-i18next';
import { ExternalLink, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 bg-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Disclaimer banner */}
        <div
          className="mb-6 px-4 py-2 text-xs text-gray-500 bg-gray-50 rounded-lg border border-gray-100 text-center"
          role="complementary"
          aria-label="Disclaimer"
        >
          ⚠️ {t('footer.disclaimer')}
        </div>

        {/* Links */}
        <div className="flex justify-center items-center gap-6">
          <a
            href="https://linkedin.com/in/sefexsaiieh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-accent-600 transition-colors"
            aria-label={t('footer.linkedin')}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            <span>{t('footer.linkedin')}</span>
          </a>
          <a
            href="https://github.com/sefex"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-accent-600 transition-colors"
            aria-label={t('footer.github')}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            <span>{t('footer.github')}</span>
          </a>
          <a
            href="mailto:sefex.saiieh@gmail.com"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-accent-600 transition-colors"
            aria-label={t('footer.email')}
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>{t('footer.email')}</span>
          </a>
        </div>

        <p className="mt-4 text-xs text-center text-gray-400">
          &copy; {new Date().getFullYear()} Sefex Saiieh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
