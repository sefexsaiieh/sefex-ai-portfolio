import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, AlertTriangle, Shield, Server, Cpu, Scale, Lock } from 'lucide-react';

interface BankAgent {
  id: string;
  name: string;
  status: 'idle' | 'working' | 'alert';
  lastAction?: string;
}

interface BankActivity {
  id: string;
  timestamp: string;
  agentId: string;
  message: string;
  type: 'info' | 'anomaly' | 'decision' | 'audit' | 'alert';
}

const agents: BankAgent[] = [
  { id: 'monitor', name: 'System Monitor', status: 'idle' },
  { id: 'decision', name: 'AI Decision Engine', status: 'idle' },
  { id: 'anomaly', name: 'Anomaly Detector', status: 'idle' },
  { id: 'compliance', name: 'Compliance Auditor', status: 'idle' },
];

const scenarios: BankActivity[] = [
  { agentId: 'monitor', message: '📡 System A → B: Payment batch #PB-8821 routed (92ms). 1,247 transactions, $3.2M. Status: SETTLED.', type: 'info' },
  { agentId: 'anomaly', message: '🔍 6-D metric scan complete: 0 anomalies across 12,847 transactions. Baseline: normal.', type: 'info' },
  { agentId: 'decision', message: '🧠 Phi-4-mini decision: Route System C → B batch via secondary channel. Confidence: 87%. Latency savings: 140ms.', type: 'decision' },
  { agentId: 'compliance', message: '📋 DORA compliance check: 47/47 controls passed. Audit log timestamped and sealed (SHA-256).', type: 'audit' },
  { agentId: 'monitor', message: '🔁 System C multicast event: Market data update → A,B. 2.4MB in 8ms. 100% delivery confirmed.', type: 'info' },
  { agentId: 'anomaly', message: '⚠️ Anomaly detected: System B response time +340ms above baseline (p95). Severity: LOW. Auto-escalated.', type: 'anomaly' },
  { agentId: 'decision', message: '🤖 AI recommendation: Throttle System B non-critical traffic by 20% for 15min to recover latency SLA.', type: 'decision' },
  { agentId: 'compliance', message: '🔐 mTLS certificate rotation: 3 certs renewed (Systems A, B, C). Next rotation: +30 days.', type: 'audit' },
  { agentId: 'monitor', message: '📊 Event lifecycle: RECEIVED → VALIDATED → ROUTED → QUEUED → EXECUTED → SETTLED → ARCHIVED (avg: 47ms).', type: 'info' },
  { agentId: 'anomaly', message: '📈 ML model retrained on 24h window: 847K events. Drift: 0.3% (within threshold). Model version: v2.4.1.', type: 'info' },
  { agentId: 'decision', message: '✅ AI-routed decision accepted: Batch #PB-8821 executed. Settlement confirmed. Audit trail updated.', type: 'decision' },
  { agentId: 'compliance', message: '🇪🇺 GDPR right-to-deletion request: Processed 14 records in 2.3s (SLA: 72h). Compliant.', type: 'audit' },
];

const alertScenarios: BankActivity[] = [
  { agentId: 'anomaly', message: '🚨 CRITICAL: System C → A latency spike (2.4s, threshold: 500ms). 47 transactions queued. AI initiating circuit breaker.', type: 'alert' },
  { agentId: 'decision', message: '🔴 AI OVERRIDE: Circuit breaker opened on System C → A channel. Traffic rerouted via B. Human operator notified.', type: 'alert' },
  { agentId: 'compliance', message: '⚠️ NIS2 compliance event: Unauthorized access attempt detected on admin console. Connection blocked. Audit logged.', type: 'alert' },
  { agentId: 'monitor', message: '🚨 Security alert: mTLS handshake failure on System B endpoint Certificate pinned. Incident #INC-8842 opened.', type: 'alert' },
];

const recoveryScenarios: BankActivity[] = [
  { agentId: 'monitor', message: '✅ Circuit breaker closed. System C → A latency normalized (89ms). Traffic restored. 0 data loss.', type: 'info' },
  { agentId: 'anomaly', message: '📊 Post-incident analysis: Root cause identified (System C NIC buffer overflow). Recommendation: firmware update.', type: 'decision' },
  { agentId: 'compliance', message: '📋 Incident #INC-8842 report generated. 16-page PDF with full timeline. AI-signed audit seal applied.', type: 'audit' },
];

let scenarioIndex = 0;

export function BankingOrchestratorSimulation() {
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [agentStatuses, setAgentStatuses] = useState<BankAgent[]>(agents);
  const [activityLog, setActivityLog] = useState<BankActivity[]>([
    { id: 'init', timestamp: new Date().toLocaleTimeString(), agentId: 'compliance', message: '🟢 Banking Orchestrator initialised. 3 systems connected. EU-compliant mode: ACTIVE.', type: 'audit' },
  ]);
  const [metrics, setMetrics] = useState({ eventsTracked: 12847, decisions: 342, anomalies: 0, uptime: 99.97, slaCompliance: 99.89 });
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const s = scenarios[scenarioIndex % scenarios.length];
      scenarioIndex++;
      const newActivity: BankActivity = { id: crypto.randomUUID(), timestamp: new Date().toLocaleTimeString(), ...s };
      setActivityLog(prev => [...prev.slice(-30), newActivity]);
      setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'working' as const, lastAction: s.message.slice(0, 35) + '...' } : a));
      setMetrics(m => ({ ...m, eventsTracked: m.eventsTracked + 1 }));
      if (s.type === 'decision') setMetrics(m => ({ ...m, decisions: m.decisions + 1 }));
      if (s.type === 'anomaly') setMetrics(m => ({ ...m, anomalies: m.anomalies + 1 }));
      setTimeout(() => setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'idle' as const } : a)), 3000);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [activityLog]);

  const handleIncident = () => {
    for (const s of alertScenarios) {
      setActivityLog(prev => [...prev.slice(-30), { id: crypto.randomUUID(), timestamp: new Date().toLocaleTimeString(), ...s }]);
      setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'alert' as const, lastAction: s.message.slice(0, 35) + '...' } : a));
      setMetrics(m => ({ ...m, anomalies: m.anomalies + 1 }));
      setTimeout(() => setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'idle' as const } : a)), 5000);
    }
  };

  const handleRecover = () => {
    for (const s of recoveryScenarios) {
      setActivityLog(prev => [...prev.slice(-30), { id: crypto.randomUUID(), timestamp: new Date().toLocaleTimeString(), ...s }]);
      setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'working' as const, lastAction: s.message.slice(0, 35) + '...' } : a));
      setMetrics(m => ({ ...m, decisions: m.decisions + 1 }));
      setTimeout(() => setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'idle' as const } : a)), 3000);
    }
  };

  const handleReset = () => {
    setAgentStatuses(agents);
    setActivityLog([{ id: 'init-r', timestamp: new Date().toLocaleTimeString(), agentId: 'compliance', message: '🟢 Banking Orchestrator reinitialised.', type: 'audit' }]);
    setMetrics({ eventsTracked: 12847, decisions: 342, anomalies: 0, uptime: 99.97, slaCompliance: 99.89 });
  };

  return (
    <section className="relative z-10 w-full" aria-label="Banking Orchestrator Simulation">
      <h2 className="text-center text-xs font-mono font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-2">
        🏦 Banking Orchestrator — Air-Gapped Multi-System Monitor
      </h2>
      <p className="text-center text-xs text-slate-500 mb-6">EU-compliant • Air-gapped • Phi-4-mini AI • Real-time event lifecycle</p>

      {/* Agent cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-6 mb-4">
        {agentStatuses.map(agent => (
          <div key={agent.id} className={`glass-card p-3 border transition-all duration-500 ${agent.status === 'working' ? 'border-indigo-500/30 bg-indigo-500/[0.04]' : agent.status === 'alert' ? 'border-red-500/30 bg-red-500/[0.04]' : 'border-slate-700/50 bg-white/[0.02]'}`}
            role="status" aria-label={`${agent.name}: ${agent.status}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${agent.status === 'working' ? 'bg-indigo-400' : agent.status === 'alert' ? 'bg-red-400' : 'bg-slate-600'}`} aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-200">{agent.name}</span>
              </div>
              <span className={`text-[10px] font-medium ${agent.status === 'working' ? 'text-indigo-300' : agent.status === 'alert' ? 'text-red-300' : 'text-slate-500'}`}>
                {agent.status === 'idle' ? 'Idle' : agent.status === 'working' ? 'Working' : 'Alert'}
              </span>
            </div>
            {agent.lastAction && (
              <p className="text-[10px] text-slate-500 truncate mt-1">
                {agent.status === 'alert' ? <AlertTriangle className="w-3 h-3 text-red-400 inline mr-1" /> : <Activity className="w-3 h-3 text-indigo-400 inline mr-1" />}
                {agent.lastAction}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap xl:flex-nowrap justify-center gap-3 mb-4 text-xs font-mono" role="status" aria-label="Banking Metrics">
        <span className="text-indigo-300/90 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
          <Server className="w-3 h-3 inline mr-1" /> Events: {metrics.eventsTracked.toLocaleString()}
        </span>
        <span className="text-violet-300/90 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-lg">
          <Cpu className="w-3 h-3 inline mr-1" /> AI Decisions: {metrics.decisions}
        </span>
        <span className="text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
          <AlertTriangle className="w-3 h-3 inline mr-1" /> Anomalies: {metrics.anomalies}
        </span>
        <span className="text-emerald-300/90 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
          <Shield className="w-3 h-3 inline mr-1" /> Uptime: {metrics.uptime}%
        </span>
        <span className="text-blue-300/90 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg">
          <Scale className="w-3 h-3 inline mr-1" /> SLA: {metrics.slaCompliance}%
        </span>
      </div>

      {/* Activity feed */}
      <div ref={logContainerRef} className="h-44 overflow-y-auto mb-4 glass-card p-3 text-xs font-mono space-y-1"
        role="log" aria-live="off" aria-atomic="true" aria-relevant="additions" aria-label="Banking activity feed">
        {activityLog.map(log => (
          <div key={log.id} className="flex items-start gap-2 text-slate-400">
            <span className="text-slate-600 flex-shrink-0">{log.timestamp}</span>
            <span className="flex-shrink-0">
              {log.type === 'decision' && <Cpu className="w-3 h-3 text-violet-400 inline" />}
              {log.type === 'anomaly' && <AlertTriangle className="w-3 h-3 text-amber-400 inline" />}
              {log.type === 'audit' && <Lock className="w-3 h-3 text-emerald-400 inline" />}
              {log.type === 'alert' && <AlertTriangle className="w-3 h-3 text-red-400 inline" />}
              {log.type === 'info' && <Activity className="w-3 h-3 text-indigo-400 inline" />}
            </span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button onClick={handleIncident}
          className="px-3.5 py-1.5 text-xs font-medium bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70">
          🚨 Trigger Incident
        </button>
        <button onClick={handleRecover}
          className="px-3.5 py-1.5 text-xs font-medium bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-lg hover:bg-indigo-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70">
          🔄 AI Auto-Recover
        </button>
        <button onClick={handleReset}
          className="px-3.5 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-slate-400 rounded-lg hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70">
          ↺ Reset Demo
        </button>
      </div>
    </section>
  );
}
