import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const sanitised = input.trim().slice(0, 2000);
      if (!sanitised) return;
      onSend(sanitised);
      setInput('');
    },
    [input, onSend]
  );

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3 border-t border-gray-200 bg-white">
      <div className="flex-1 relative">
        <label htmlFor="chat-input" className="sr-only">
          {t('chat.placeholder')}
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 2000))}
          placeholder={t('chat.placeholder')}
          disabled={disabled}
          maxLength={2000}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          aria-describedby="chat-char-limit"
        />
        <span id="chat-char-limit" className="absolute right-2 bottom-1.5 text-[10px] text-gray-400">
          {input.length}/2000
        </span>
      </div>
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="flex items-center justify-center w-9 h-9 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        aria-label="Send message"
      >
        {disabled ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
