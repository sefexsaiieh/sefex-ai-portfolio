import { useTranslation } from 'react-i18next';
import { Activity, AlertTriangle, TrendingDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AgentStatusCard } from './AgentStatusCard';
import { useEffect, useRef } from 'react';

const scenarios = [
  { agentId: 'monitoring', message: 'Flight MNL-SIN (Feb 14) dropped 22% ($345 → $269). Rebooking opportunity detected.', type: 'price_drop' as const, savings: 76 },
  { agentId: 'planning', message: 'Optimising itinerary: swapped Hotel A (3 nights) → Hotel B with 15% discount.', type: 'info' as const, savings: 45 },
  { agentId: 'monitoring', message: 'Anomaly detected: Unusual dining spend 3x above normal. Severity: Medium.', type: 'anomaly' as const, savings: 0 },
  { agentId: 'monitoring', message: 'Hotel in Singapore dropped 18%. Rebooking saves $112.', type: 'price_drop' as const, savings: 112 },
  { agentId: 'planning', message: 'Weather alert: Typhoon approaching Tokyo. Adjusting itinerary days 3-5.', type: 'alert' as const, savings: 0 },
  { agentId: 'monitoring', message: 'Currency alert: EUR/USD at 1.12 — favourable for EU bookings.', type: 'info' as const, savings: 0 },
  { agentId: 'monitoring', message: 'Price drop: SIN-BKK flight -12% ($187 → $165).', type: 'price_drop' as const, savings: 22 },
  { agentId: 'planning', message: 'Generated new itinerary with 3 attraction recommendations.', type: 'info' as const, savings: 0 },
  { agentId: 'monitoring', message: 'Safety alert: Sending real-time location to emergency contacts.', type: 'alert' as const, savings: 0 },
  { agentId: 'planning', message: 'Restaurant booking confirmed: 7pm, 4 guests, dietary preferences noted.', type: 'info' as const, savings: 0 },
];

const alertMessages = [
  { agentId: 'monitoring', message: '⚠️ SAFETY ALERT: Unusual location pattern detected. Severity: HIGH. Emergency contacts notified.', type: 'alert' as const, savings: 0 },
  { agentId: 'planning', message: '🚨 SOS mode activated: Nearest embassy and hospital coordinates shared.', type: 'alert' as const, savings: 0 },
  { agentId: 'monitoring', message: '🚑 Medical alert: Traveller reported minor injury. First aid instructions sent.', type: 'alert' as const, savings: 0 },
];

const dropMessages = [
  { agentId: 'monitoring', message: '💥 Price drop: MNL-SIN now $249 (was $345, -28%). Auto-rebooking...', type: 'price_drop' as const, savings: 96 },
  { agentId: 'planning', message: '📉 Rebooking complete: New flight saved $96. Updated itinerary synced.', type: 'info' as const, savings: 0 },
  { agentId: 'monitoring', message: '💰 Total savings this session: $1,343. Tracking 18 itineraries.', type: 'info' as const, savings: 0 },
];

let scenarioIndex = 0;

export function TravelOSSimulation() {
  const { t } = useTranslation();
  const {
    agentStatuses, activityLog, totalSavings, anomalyCount, taskCount,
    addActivity, updateAgentStatus, resetSimulation, incrementSavings,
    incrementAnomalies, incrementTasks,
  } = useStore();

  const logEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const scenario = scenarios[scenarioIndex % scenarios.length];
      scenarioIndex++;
      addActivity({ timestamp: new Date().toLocaleTimeString(), agentId: scenario.agentId, message: scenario.message, type: scenario.type });
      updateAgentStatus(scenario.agentId, 'working', scenario.message.slice(0, 40) + '...');
      incrementTasks();
      if (scenario.savings > 0) incrementSavings(scenario.savings);
      if (scenario.type === 'anomaly') incrementAnomalies();
      setTimeout(() => updateAgentStatus(scenario.agentId, 'idle'), 3000);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [addActivity, updateAgentStatus, incrementTasks, incrementSavings, incrementAnomalies]);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activityLog]);

  return (
    <section className="relative z-10 w-full" aria-label={t('simulation.title')}>
      <h2 className="text-center text-xs font-mono font-semibold text-slate-500 uppercase tracking-[0.2em] mb-6">
        {t('simulation.title')}
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {agentStatuses.map((agent) => <AgentStatusCard key={agent.id} agent={agent} />)}
      </div>

      {/* Metrics */}
      <div className="flex justify-center gap-4 mb-4 text-xs font-mono" role="status" aria-label="Metrics">
        <span className="text-emerald-300/90 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
          💰 {t('simulation.savings')}: ${totalSavings}
        </span>
        <span className="text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
          ⚠️ {t('simulation.anomalies')}: {anomalyCount}
        </span>
        <span className="text-cyan-300/90 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
          ✓ {t('simulation.tasks')}: {taskCount}
        </span>
      </div>

      {/* Activity feed */}
      <div className="h-44 overflow-y-auto mb-4 glass-card p-3 text-xs font-mono space-y-1"
        role="log" aria-live="off" aria-atomic="true" aria-relevant="additions" aria-label="Activity feed">
        {activityLog.map((log) => (
          <div key={log.id} className="flex items-start gap-2 text-slate-400">
            <span className="text-slate-600 flex-shrink-0">{log.timestamp}</span>
            <span className="flex-shrink-0">
              {log.type === 'price_drop' && <TrendingDown className="w-3 h-3 text-emerald-400 inline" aria-hidden="true" />}
              {log.type === 'anomaly' && <AlertTriangle className="w-3 h-3 text-amber-400 inline" aria-hidden="true" />}
              {log.type === 'alert' && <AlertTriangle className="w-3 h-3 text-red-400 inline" aria-hidden="true" />}
              {log.type === 'info' && <Activity className="w-3 h-3 text-cyan-400 inline" aria-hidden="true" />}
            </span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button onClick={() => {
          for (const msg of dropMessages) {
            addActivity({ timestamp: new Date().toLocaleTimeString(), agentId: msg.agentId, message: msg.message, type: msg.type });
            if (msg.savings > 0) incrementSavings(msg.savings);
            incrementTasks();
          }
          updateAgentStatus('monitoring', 'working', 'Price drop detected!');
          setTimeout(() => updateAgentStatus('monitoring', 'idle'), 3000);
        }} className="px-3.5 py-1.5 text-xs font-medium bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70">
          📉 {t('simulation.btn_drop')}
        </button>
        <button onClick={() => {
          for (const msg of alertMessages) {
            addActivity({ timestamp: new Date().toLocaleTimeString(), agentId: msg.agentId, message: msg.message, type: msg.type });
            incrementAnomalies(); incrementTasks();
          }
          updateAgentStatus('monitoring', 'alert', '🚨 Safety alert triggered!');
          setTimeout(() => updateAgentStatus('monitoring', 'idle'), 5000);
        }} className="px-3.5 py-1.5 text-xs font-medium bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70">
          🚨 {t('simulation.btn_alert')}
        </button>
        <button onClick={resetSimulation} className="px-3.5 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-slate-400 rounded-lg hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70">
          ↺ {t('simulation.btn_reset')}
        </button>
      </div>
    </section>
  );
}
