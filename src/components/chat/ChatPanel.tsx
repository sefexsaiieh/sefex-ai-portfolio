import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Bot } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QuickPrompts } from './QuickPrompts';
import { ErrorFallback } from './ErrorFallback';
import { LoadingSkeleton } from '../common/LoadingSkeleton';
import { CVExportPanel } from '../cv/CVExportPanel';
import { sendChatMessage } from '../../lib/api';

const PROMPT_MAP: Record<string, string> = {
  quick_cv: 'Generate my complete CV',
  quick_architecture: 'Explain your TravelOS AI agent architecture',
  quick_islamic: 'Show Islamic FinTech projects',
  quick_wealthsuite: 'What robo-advisory systems have you deployed?',
  quick_code: 'Give me a code example (Edge Function + DeepSeek)',
  quick_language: 'Respond in Malay / French / Spanish',
};

export function ChatPanel() {
  const { t } = useTranslation();
  const { messages, isChatOpen, isChatLoading, toggleChat, addMessage, setChatLoading } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (!isChatOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { toggleChat(); return; }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
    };
    panel.addEventListener('keydown', handleTab);
    first?.focus();
    return () => panel.removeEventListener('keydown', handleTab);
  }, [isChatOpen, toggleChat]);

  const handleSend = async (message: string) => {
    addMessage({ role: 'user', content: message });
    setChatLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const data = await sendChatMessage({ message, session_id: crypto.randomUUID(), language: navigator.language?.split('-')[0] || 'en' }, controller.signal);
      clearTimeout(timeout);
      if (data.status === 'ok') addMessage({ role: 'assistant', content: data.data!.reply });
      else if (data.status === 'rate_limited') addMessage({ role: 'assistant', content: `⏳ ${data.message}` });
      else addMessage({ role: 'assistant', content: `❌ ${t('chat.error_unavailable')}` });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') addMessage({ role: 'assistant', content: `⏱️ ${t('chat.error_timeout')}` });
      else addMessage({ role: 'assistant', content: `❌ ${t('chat.error_unavailable')}` });
    } finally { setChatLoading(false); }
  };

  const handleQuickPrompt = (key: string) => { const text = PROMPT_MAP[key] || key; void handleSend(text); };

  if (!isChatOpen) return null;

  return (
    <div ref={panelRef} id="chat-panel"
      className="fixed inset-y-0 right-0 w-full max-w-md bg-space-900/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 flex flex-col"
      role="dialog" aria-modal="true" aria-label="AI Chat Assistant">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-space-900/50">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-cyan-400" aria-hidden="true" />
          <span className="font-semibold text-sm text-slate-100">{t('chat.title')}</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full font-medium border border-emerald-500/20">● {t('chat.status_online')}</span>
        </div>
        <button onClick={toggleChat} className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70" aria-label="Close chat">
          <X className="w-5 h-5" />
        </button>
      </div>
      <QuickPrompts onSelect={handleQuickPrompt} disabled={isChatLoading} />
      <div className="flex-1 overflow-y-auto p-3 space-y-4" role="log" aria-live="polite" aria-label="Chat history">
        {messages.length === 0 && !isChatLoading && (
          <div className="text-center py-8">
            <Bot className="w-10 h-10 text-slate-600 mx-auto mb-2" aria-hidden="true" />
            <p className="text-sm text-slate-400">{t('chat.intro_message')}</p>
          </div>
        )}
        {messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        {isChatLoading && <LoadingSkeleton />}
        <div ref={messagesEndRef} />
      </div>
      {/* CV Export Panel — PDF, DOCX, Clipboard buttons */}
      <CVExportPanel />
      <ChatInput onSend={handleSend} disabled={isChatLoading} />
    </div>
  );
}
