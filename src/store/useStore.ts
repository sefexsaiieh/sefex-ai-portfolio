import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AgentStatus {
  id: string;
  nameKey: string;
  status: 'idle' | 'working' | 'alert';
  lastAction?: string;
  savings?: number;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  agentId: string;
  message: string;
  type: 'info' | 'anomaly' | 'price_drop' | 'alert';
}

export interface AppState {
  // Chat
  messages: Message[];
  isChatOpen: boolean;
  isChatLoading: boolean;
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  toggleChat: () => void;
  setChatLoading: (loading: boolean) => void;
  clearChat: () => void;

  // Simulation
  agentStatuses: AgentStatus[];
  activityLog: ActivityLog[];
  totalSavings: number;
  anomalyCount: number;
  taskCount: number;
  addActivity: (activity: Omit<ActivityLog, 'id'>) => void;
  updateAgentStatus: (id: string, status: AgentStatus['status'], lastAction?: string) => void;
  resetSimulation: () => void;
  incrementSavings: (amount: number) => void;
  incrementAnomalies: () => void;
  incrementTasks: () => void;
}

const initialAgentStatuses: AgentStatus[] = [
  { id: 'monitoring', nameKey: 'simulation.agent_monitoring', status: 'idle', savings: 0 },
  { id: 'planning', nameKey: 'simulation.agent_planning', status: 'idle' },
];

const initialActivityLog: ActivityLog[] = [
  {
    id: 'init-1',
    timestamp: new Date().toLocaleTimeString(),
    agentId: 'monitoring',
    message: 'Agent monitoring initialised. Tracking 12 active travel itineraries.',
    type: 'info',
  },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Chat state
      messages: [],
      isChatOpen: false,
      isChatLoading: false,

      addMessage: (msg) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...msg,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
          ],
        })),

      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

      setChatLoading: (loading) => set({ isChatLoading: loading }),

      clearChat: () => set({ messages: [] }),

      // Simulation state
      agentStatuses: initialAgentStatuses,
      activityLog: initialActivityLog,
      totalSavings: 1247,
      anomalyCount: 3,
      taskCount: 14,

      addActivity: (activity) =>
        set((state) => ({
          activityLog: [
            ...state.activityLog,
            { ...activity, id: crypto.randomUUID() },
          ].slice(-50), // keep last 50
        })),

      updateAgentStatus: (id, status, lastAction) =>
        set((state) => ({
          agentStatuses: state.agentStatuses.map((a) =>
            a.id === id ? { ...a, status, lastAction } : a
          ),
        })),

      resetSimulation: () =>
        set({
          agentStatuses: initialAgentStatuses,
          activityLog: initialActivityLog,
          totalSavings: 1247,
          anomalyCount: 3,
          taskCount: 14,
        }),

      incrementSavings: (amount) =>
        set((state) => ({ totalSavings: state.totalSavings + amount })),

      incrementAnomalies: () =>
        set((state) => ({ anomalyCount: state.anomalyCount + 1 })),

      incrementTasks: () =>
        set((state) => ({ taskCount: state.taskCount + 1 })),
    }),
    {
      name: 'sefex-ai-store',
      partialize: (state) => ({
        messages: state.messages,
        totalSavings: state.totalSavings,
        anomalyCount: state.anomalyCount,
        taskCount: state.taskCount,
      }),
    }
  )
);
