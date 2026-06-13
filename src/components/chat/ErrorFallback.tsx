import { useTranslation } from 'react-i18next';
import { AlertTriangle, Mail } from 'lucide-react';

interface ErrorFallbackProps { message: string; onDismiss?: () => void; }

export function ErrorFallback({ message, onDismiss }: ErrorFallbackProps) {
  const { t } = useTranslation();
  return (
    <div className="mx-3 my-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl" role="alert">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-red-200">{message}</p>
          <a href="mailto:sefex.saiieh@gmail.com" className="inline-flex items-center gap-1 mt-1.5 text-xs text-red-300 hover:text-red-200 underline">
            <Mail className="w-3 h-3" aria-hidden="true" /> sefex.saiieh@gmail.com
          </a>
        </div>
        {onDismiss && <button onClick={onDismiss} className="text-xs text-red-400 hover:text-red-200 flex-shrink-0" aria-label="Dismiss error">✕</button>}
      </div>
    </div>
  );
}
