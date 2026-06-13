import { useTranslation } from 'react-i18next';
import { Activity, AlertTriangle } from 'lucide-react';
import type { AgentStatus } from '../../store/useStore';

interface AgentStatusCardProps {
  agent: AgentStatus;
}

const statusConfig = {
  idle: { ring: 'border-gray-300', bg: 'bg-gray-50', dot: 'bg-gray-400' },
  working: { ring: 'border-accent-400', bg: 'bg-accent-50', dot: 'bg-accent-500' },
  alert: { ring: 'border-red-400', bg: 'bg-red-50', dot: 'bg-red-500' },
} as const;

export function AgentStatusCard({ agent }: AgentStatusCardProps) {
  const { t } = useTranslation();
  const cfg = statusConfig[agent.status];

  return (
    <div
      className={`p-3 rounded-lg border ${cfg.ring} ${cfg.bg} transition-colors duration-300`}
      role="status"
      aria-label={`${t(agent.nameKey)}: ${t(`simulation.status_${agent.status}`)}`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} aria-hidden="true" />
          <span className="text-xs font-semibold text-gray-800">{t(agent.nameKey)}</span>
        </div>
        <span className={`text-[10px] font-medium ${
          agent.status === 'alert' ? 'text-red-600' : 'text-gray-400'
        }`}>
          {t(`simulation.status_${agent.status}`)}
        </span>
      </div>
      {agent.lastAction && (
        <p className="text-[10px] text-gray-500 truncate mt-1">
          {agent.status === 'alert' ? (
            <AlertTriangle className="w-3 h-3 text-red-400 inline mr-1" aria-hidden="true" />
          ) : (
            <Activity className="w-3 h-3 text-gray-400 inline mr-1" aria-hidden="true" />
          )}
          {agent.lastAction}
        </p>
      )}
    </div>
  );
}
