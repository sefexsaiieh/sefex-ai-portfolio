import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps { onSend: (message: string) => void; disabled?: boolean; }

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const sanitised = input.trim().slice(0, 2000);
    if (!sanitised) return;
    onSend(sanitised);
    setInput('');
  }, [input, onSend]);

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3 border-t border-white/5 bg-space-900/50">
      <div className="flex-1 relative">
        <label htmlFor="chat-input" className="sr-only">{t('chat.placeholder')}</label>
        <input id="chat-input" type="text" value={input} onChange={(e) => setInput(e.target.value.slice(0, 2000))}
          placeholder={t('chat.placeholder')} disabled={disabled} maxLength={2000}
          className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent disabled:opacity-50 transition-all"
          aria-describedby="chat-char-limit" />
        <span id="chat-char-limit" className="absolute right-2.5 bottom-1.5 text-[10px] text-slate-600">{input.length}/2000</span>
      </div>
      <button type="submit" disabled={disabled || !input.trim()}
        className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70">
        {disabled ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Send className="w-4 h-4" aria-hidden="true" />}
      </button>
    </form>
  );
}
