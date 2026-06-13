import { useTranslation } from 'react-i18next';
const prompts = ['quick_cv','quick_architecture','quick_islamic','quick_wealthsuite','quick_code','quick_language'] as const;

interface QuickPromptsProps { onSelect: (promptKey: string) => void; disabled?: boolean; }

export function QuickPrompts({ onSelect, disabled }: QuickPromptsProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap gap-1.5 p-3 border-b border-white/5" role="group" aria-label="Quick prompts">
      {prompts.map((key) => (
        <button key={key} onClick={() => onSelect(key)} disabled={disabled}
          className="text-xs px-2.5 py-1.5 bg-white/[0.03] hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 border border-white/[0.06] hover:border-cyan-500/30 rounded-full transition-all disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70">
          {t(`chat.${key}`)}
        </button>
      ))}
    </div>
  );
}
