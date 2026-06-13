import { useTranslation } from 'react-i18next';
import { ExternalLink, Mail, Code2 } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-space-950/80 backdrop-blur-xl" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6 px-4 py-2.5 text-xs text-slate-500 bg-white/[0.03] rounded-xl border border-white/[0.06] text-center" role="complementary" aria-label="Disclaimer">
          ⚠️ {t('footer.disclaimer')}
        </div>
        <div className="flex justify-center items-center gap-8">
          <a href="https://linkedin.com/in/sefexsaiieh" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors group" aria-label={t('footer.linkedin')}>
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>{t('footer.linkedin')}</span>
          </a>
          <a href="https://github.com/sefex" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors group" aria-label={t('footer.github')}>
            <Code2 className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>{t('footer.github')}</span>
          </a>
          <a href="mailto:sefex.saiieh@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors group" aria-label={t('footer.email')}>
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>{t('footer.email')}</span>
          </a>
        </div>
        <p className="mt-6 text-xs text-center text-slate-600">&copy; {new Date().getFullYear()} Sefex Saiieh.</p>
      </div>
    </footer>
  );
}
