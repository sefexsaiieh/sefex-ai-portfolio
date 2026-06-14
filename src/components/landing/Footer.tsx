import { useTranslation } from 'react-i18next';
import { Mail, Code2 } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-space-950/80 backdrop-blur-xl" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-center items-center gap-8">
          <a href="https://github.com/sefexsaiieh" target="_blank" rel="noopener noreferrer"
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
