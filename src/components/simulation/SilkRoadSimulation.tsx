import { useTranslation } from 'react-i18next';
import { Activity, AlertTriangle, TrendingUp, Shield, ShoppingCart, FileCheck } from 'lucide-react';
import { AgentStatusCard } from './AgentStatusCard';
import { useEffect, useRef, useState } from 'react';

interface SilkAgent {
  id: string;
  nameKey: string;
  status: 'idle' | 'working' | 'alert';
  lastAction?: string;
  savings?: number;
}

interface SilkActivity {
  id: string;
  timestamp: string;
  agentId: string;
  message: string;
  type: 'info' | 'compliance' | 'match' | 'alert' | 'trade';
}

const agents: SilkAgent[] = [
  { id: 'certification', nameKey: 'silk.agent_cert', status: 'idle' },
  { id: 'marketplace', nameKey: 'silk.agent_market', status: 'idle' },
  { id: 'supplychain', nameKey: 'silk.agent_supply', status: 'idle' },
  { id: 'assistant', nameKey: 'silk.agent_trade', status: 'idle' },
];

const scenarios: SilkActivity[] = [
  { agentId: 'certification', message: '📜 Halal cert application #A-3842: AI auto-verified 12/15 criteria. Flagged 3 items for manual review (92% confidence).', type: 'compliance', savings: 0 },
  { agentId: 'marketplace', message: '🤝 Supplier match: Malaysian palm oil exporter ↔ EU buyer. Match score 94%. Estimated contract: $2.4M.', type: 'match', savings: 0 },
  { agentId: 'supplychain', message: '🔗 Blockchain verification: Batch #H-7723 (Chicken, Brazil). 14/14 nodes verified. Halal chain intact.', type: 'info', savings: 0 },
  { agentId: 'assistant', message: '💬 Trade query: \"What are the Shariah requirements for seafood imports?\" — AI generated compliant response with 3 references.', type: 'info', savings: 0 },
  { agentId: 'certification', message: '⚠️ Compliance alert: Supplier X ingredient list changed. Re-running AI certification check...', type: 'alert', savings: 0 },
  { agentId: 'marketplace', message: '📈 Demand forecast: Halal cosmetics demand +34% in MENA region. Recommended stock increase for 120 suppliers.', type: 'trade', savings: 0 },
  { agentId: 'supplychain', message: '🚢 Route optimization: Jakarta → Rotterdam via Cape (alternative). Savings: $47K. Delivery: +2 days. AI decision: Accept.', type: 'trade', savings: 47000 },
  { agentId: 'assistant', message: '📊 Market intelligence: Indonesia palm oil prices projected +8% next quarter due to weather patterns. AI advisory sent to 2,400+ traders.', type: 'trade', savings: 0 },
  { agentId: 'certification', message: '✅ Auto-certification complete: New halal cert issued in 6.2 hours (avg manual: 48 hours). 88% faster.', type: 'compliance', savings: 0 },
  { agentId: 'marketplace', message: '🔍 Smart RFQ matching: 14 bidders for \"Organic quinoa 500MT\" RFQ. Top 3 shortlisted by AI with capability scores.', type: 'match', savings: 0 },
  { agentId: 'supplychain', message: '📋 QR verification scan: Product #H-8841 scanned at Rotterdam port. Halal status: VERIFIED. Batch origin: Malaysia.', type: 'info', savings: 0 },
  { agentId: 'certification', message: '🧪 AI document analysis: 85-page supplier audit processed. 3 inconsistencies found. Auto-flagged for human review.', type: 'compliance', savings: 0 },
];

const alertScenarios: SilkActivity[] = [
  { agentId: 'supplychain', message: '🚨 CONTAMINATION ALERT: Batch #H-1123 (Frozen beef, Brazil) — temperature breach detected in transit. AI initiated recall procedure.', type: 'alert', savings: 0 },
  { agentId: 'certification', message: '🔴 COMPLIANCE HOLD: Supplier Y cert expired 2 days ago. AI auto-suspended 47 listings pending re-certification.', type: 'alert', savings: 0 },
  { agentId: 'marketplace', message: '📢 AI ALERT: Counterfeit halal products detected on 3 listings. Catfish DNA found in "100% beef" product. Legal team notified.', type: 'alert', savings: 0 },
];

const tradeScenarios: SilkActivity[] = [
  { agentId: 'marketplace', message: '💰 Trade completed: UAE buyer × Malaysian supplier — $12.8M palm oil deal. AI negotiated 2.3% price improvement.', type: 'trade', savings: 294000 },
  { agentId: 'assistant', message: '📈 AI insight: Shariah-compliant ETF opportunity in Southeast Asian agri-tech. Score: 86/100. Recommended: Watch.', type: 'info', savings: 0 },
  { agentId: 'supplychain', message: '✅ Full supply chain audit complete: 3,847 transactions, 0 violations. AI trust score: 99.2/100.', type: 'compliance', savings: 0 },
];

let scenarioIndex = 0;

export function SilkRoadSimulation() {
  const { t } = useTranslation();
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [agentStatuses, setAgentStatuses] = useState<SilkAgent[]>(agents);
  const [activityLog, setActivityLog] = useState<SilkActivity[]>([
    { id: 'init', timestamp: new Date().toLocaleTimeString(), agentId: 'certification', message: '🟢 Silk Road AI Platform initialised. Monitoring $2.3T halal market.', type: 'info' },
  ]);
  const [metrics, setMetrics] = useState({ certifications: 1247, matches: 8932, trades: 3847, trustScore: 99.2, savings: 12470000 });

  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const scenario = scenarios[scenarioIndex % scenarios.length];
      scenarioIndex++;
      const newActivity: SilkActivity = { id: crypto.randomUUID(), timestamp: new Date().toLocaleTimeString(), ...scenario };
      setActivityLog(prev => [...prev.slice(-30), newActivity]);
      setAgentStatuses(prev => prev.map(a => a.id === scenario.agentId ? { ...a, status: 'working' as const, lastAction: scenario.message.slice(0, 35) + '...' } : a));
      if (scenario.savings > 0) setMetrics(m => ({ ...m, savings: m.savings + scenario.savings }));
      if (scenario.type === 'compliance') setMetrics(m => ({ ...m, certifications: m.certifications + 1 }));
      if (scenario.type === 'match') setMetrics(m => ({ ...m, matches: m.matches + 1 }));
      setTimeout(() => {
        setAgentStatuses(prev => prev.map(a => a.id === scenario.agentId ? { ...a, status: 'idle' as const } : a));
      }, 3000);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [activityLog]);

  const handleTrade = () => {
    for (const s of tradeScenarios) {
      setActivityLog(prev => [...prev.slice(-30), { id: crypto.randomUUID(), timestamp: new Date().toLocaleTimeString(), ...s }]);
      setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'working' as const, lastAction: s.message.slice(0, 35) + '...' } : a));
      if (s.savings > 0) setMetrics(m => ({ ...m, savings: m.savings + s.savings, trades: m.trades + 1 }));
      setTimeout(() => setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'idle' as const } : a)), 3000);
    }
  };

  const handleAlert = () => {
    for (const s of alertScenarios) {
      setActivityLog(prev => [...prev.slice(-30), { id: crypto.randomUUID(), timestamp: new Date().toLocaleTimeString(), ...s }]);
      setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'alert' as const, lastAction: s.message.slice(0, 35) + '...' } : a));
      setTimeout(() => setAgentStatuses(prev => prev.map(a => a.id === s.agentId ? { ...a, status: 'idle' as const } : a)), 5000);
    }
  };

  const handleReset = () => {
    setAgentStatuses(agents);
    setActivityLog([{ id: 'init-r', timestamp: new Date().toLocaleTimeString(), agentId: 'certification', message: '🟢 Silk Road AI Platform reinitialised.', type: 'info' }]);
    setMetrics({ certifications: 1247, matches: 8932, trades: 3847, trustScore: 99.2, savings: 12470000 });
  };

  return (
    <section className="relative z-10 w-full" aria-label="Silk Road Simulation">
      <h2 className="text-center text-xs font-mono font-semibold text-amber-400 uppercase tracking-[0.2em] mb-2">
        🕌 Silk Road — Halal Digital Ecosystem
      </h2>
      <p className="text-center text-xs text-slate-500 mb-6">$2.3 trillion global halal market • AI-powered certification • Blockchain supply chain</p>

      {/* Agent cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-6 mb-4">
        {agentStatuses.map(agent => (
          <div key={agent.id} className={`glass-card p-3 border transition-all duration-500 ${
            agent.status === 'working' ? 'border-amber-500/30 bg-amber-500/[0.04]' :
            agent.status === 'alert' ? 'border-red-500/30 bg-red-500/[0.04]' :
            'border-slate-700/50 bg-white/[0.02]'
          }`} role="status" aria-label={`${agent.nameKey}: ${agent.status}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  agent.status === 'working' ? 'bg-amber-400' :
                  agent.status === 'alert' ? 'bg-red-400' : 'bg-slate-600'
                }`} aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-200">{t(agent.nameKey, agent.nameKey)}</span>
              </div>
              <span className={`text-[10px] font-medium ${
                agent.status === 'working' ? 'text-amber-300' :
                agent.status === 'alert' ? 'text-red-300' : 'text-slate-500'
              }`}>{agent.status === 'idle' ? 'Idle' : agent.status === 'working' ? 'Working' : 'Alert'}</span>
            </div>
            {agent.lastAction && (
              <p className="text-[10px] text-slate-500 truncate mt-1">
                {agent.status === 'alert' ? <AlertTriangle className="w-3 h-3 text-red-400 inline mr-1" aria-hidden="true" /> :
                 <Activity className="w-3 h-3 text-amber-400 inline mr-1" aria-hidden="true" />}
                {agent.lastAction}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap xl:flex-nowrap justify-center gap-3 mb-4 text-xs font-mono" role="status" aria-label="Silk Road Metrics">
        <span className="text-emerald-300/90 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
          <FileCheck className="w-3 h-3 inline mr-1" aria-hidden="true" /> Certs: {metrics.certifications.toLocaleString()}
        </span>
        <span className="text-cyan-300/90 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
          <ShoppingCart className="w-3 h-3 inline mr-1" aria-hidden="true" /> Matches: {metrics.matches.toLocaleString()}
        </span>
        <span className="text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
          <TrendingUp className="w-3 h-3 inline mr-1" aria-hidden="true" /> Trades: {metrics.trades.toLocaleString()}
        </span>
        <span className="text-blue-300/90 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg">
          <Shield className="w-3 h-3 inline mr-1" aria-hidden="true" /> Trust: {metrics.trustScore}/100
        </span>
        <span className="text-purple-300/90 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg">
          💰 Savings: ${(metrics.savings / 1000000).toFixed(1)}M
        </span>
      </div>

      {/* Activity feed */}
      <div ref={logContainerRef} className="h-44 overflow-y-auto mb-4 glass-card p-3 text-xs font-mono space-y-1"
        role="log" aria-live="off" aria-atomic="true" aria-relevant="additions" aria-label="Silk Road activity feed">
        {activityLog.map((log) => (
          <div key={log.id} className="flex items-start gap-2 text-slate-400">
            <span className="text-slate-600 flex-shrink-0">{log.timestamp}</span>
            <span className="flex-shrink-0">
              {log.type === 'compliance' && <FileCheck className="w-3 h-3 text-emerald-400 inline" aria-hidden="true" />}
              {log.type === 'match' && <ShoppingCart className="w-3 h-3 text-cyan-400 inline" aria-hidden="true" />}
              {log.type === 'trade' && <TrendingUp className="w-3 h-3 text-amber-400 inline" aria-hidden="true" />}
              {log.type === 'alert' && <AlertTriangle className="w-3 h-3 text-red-400 inline" aria-hidden="true" />}
              {log.type === 'info' && <Activity className="w-3 h-3 text-blue-400 inline" aria-hidden="true" />}
            </span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button onClick={handleTrade}
          className="px-3.5 py-1.5 text-xs font-medium bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-lg hover:bg-amber-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70">
          💰 Simulate Trade
        </button>
        <button onClick={handleAlert}
          className="px-3.5 py-1.5 text-xs font-medium bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70">
          🚨 Trigger Compliance Alert
        </button>
        <button onClick={handleReset}
          className="px-3.5 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-slate-400 rounded-lg hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70">
          ↺ Reset Demo
        </button>
      </div>
    </section>
  );
}
