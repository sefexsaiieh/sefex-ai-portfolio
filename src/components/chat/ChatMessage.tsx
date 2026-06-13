import { useTranslation } from 'react-i18next';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../../store/useStore';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { t } = useTranslation();
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
      role="listitem"
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-accent-100' : 'bg-gray-100'
        }`}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="w-4 h-4 text-accent-600" />
        ) : (
          <Bot className="w-4 h-4 text-gray-600" />
        )}
      </div>

      <div
        className={`flex-1 max-w-[80%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`px-3 py-2 rounded-lg text-sm leading-relaxed ${
            isUser
              ? 'bg-accent-600 text-white rounded-tr-sm'
              : 'bg-gray-100 text-gray-800 rounded-tl-sm'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-a:text-accent-600">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Disclaimer on AI messages */}
        {!isUser && (
          <p className="mt-1 text-[10px] text-gray-400 italic">
            ⚠️ {t('chat.disclaimer')}
          </p>
        )}
      </div>
    </div>
  );
}
