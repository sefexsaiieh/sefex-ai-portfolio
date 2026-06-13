import { useTranslation } from 'react-i18next';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../../store/useStore';

interface ChatMessageProps { message: Message; }

export function ChatMessage({ message }: ChatMessageProps) {
  const { t } = useTranslation();
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`} role="listitem">
      <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${isUser ? 'bg-cyan-500/20' : 'bg-white/5'}`} aria-hidden="true">
        {isUser ? <User className="w-4 h-4 text-cyan-300" /> : <Bot className="w-4 h-4 text-slate-400" />}
      </div>
      <div className={`flex-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
          isUser ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 text-slate-100 rounded-tr-sm' : 'bg-white/5 border border-white/[0.06] text-slate-300 rounded-tl-sm'
        }`}>
          {isUser ? <p className="whitespace-pre-wrap">{message.content}</p> : <div className="prose prose-sm max-w-none prose-invert prose-headings:text-slate-100 prose-a:text-cyan-300"><ReactMarkdown>{message.content}</ReactMarkdown></div>}
        </div>
        {!isUser && <p className="mt-1 text-[10px] text-slate-600 italic">⚠️ {t('chat.disclaimer')}</p>}
      </div>
    </div>
  );
}
