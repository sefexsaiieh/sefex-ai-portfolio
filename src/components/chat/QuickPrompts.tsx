import { useTranslation } from 'react-i18next';

const prompts = [
  'quick_cv',
  'quick_architecture',
  'quick_islamic',
  'quick_wealthsuite',
  'quick_code',
  'quick_language',
] as const;

interface QuickPromptsProps {
  onSelect: (promptKey: string) => void;
  disabled?: boolean;
}

export function QuickPrompts({ onSelect, disabled }: QuickPromptsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-1.5 p-3 border-b border-gray-100" role="group" aria-label="Quick prompts">
      {prompts.map((key) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          disabled={disabled}
          className="text-xs px-2.5 py-1.5 bg-gray-50 hover:bg-accent-50 text-gray-700 hover:text-accent-700 border border-gray-200 hover:border-accent-200 rounded-full transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        >
          {t(`chat.${key}`)}
        </button>
      ))}
    </div>
  );
}
