import { useTranslation } from 'react-i18next';
import { Activity, AlertTriangle } from 'lucide-react';
import type { AgentStatus } from '../../store/useStore';

interface AgentStatusCardProps {
  agent: AgentStatus;
}

const statusConfig = {
  idle: { ring: 'border-slate-700/50', bg: 'bg-white/[0.02]', dot: 'bg-slate-600', text: 'text-slate-500' },
  working: { ring: 'border-cyan-500/30', bg: 'bg-cyan-500/[0.04]', dot: 'bg-cyan-400', text: 'text-cyan-300' },
  alert: { ring: 'border-red-500/30', bg: 'bg-red-500/[0.04]', dot: 'bg-red-400', text: 'text-red-300' },
} as const;

export function AgentStatusCard({ agent }: AgentStatusCardProps) {
  const { t } = useTranslation();
  const cfg = statusConfig[agent.status];

  return (
    <div className={`glass-card p-3 border ${cfg.ring} ${cfg.bg} transition-all duration-500`}
      role="status"
      aria-label={`${t(agent.nameKey)}: ${t(`simulation.status_${agent.status}`)}`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} aria-hidden="true" />
          <span className="text-xs font-semibold text-slate-200">{t(agent.nameKey)}</span>
        </div>
        <span className={`text-[10px] font-medium ${cfg.text}`}>
          {t(`simulation.status_${agent.status}`)}
        </span>
      </div>
      {agent.lastAction && (
        <p className="text-[10px] text-slate-500 truncate mt-1">
          {agent.status === 'alert' ? (
            <AlertTriangle className="w-3 h-3 text-red-400 inline mr-1" aria-hidden="true" />
          ) : (
            <Activity className="w-3 h-3 text-slate-500 inline mr-1" aria-hidden="true" />
          )}
          {agent.lastAction}
        </p>
      )}
    </div>
  );
}
