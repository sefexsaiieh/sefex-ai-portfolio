import { lazy, Suspense, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HeroSection } from './components/landing/HeroSection';
import { TrustBadges } from './components/landing/TrustBadges';
import { AcademicTimeline } from './components/landing/AcademicTimeline';
import { Footer } from './components/landing/Footer';
import { TravelOSSimulation } from './components/simulation/TravelOSSimulation';
import { ParticleNetwork } from './components/landing/ParticleNetwork';
import { useStore } from './store/useStore';

const ChatPanel = lazy(() =>
  import('./components/chat/ChatPanel').then((m) => ({ default: m.ChatPanel }))
);

function App() {
  const { isChatOpen, toggleChat } = useStore();
  const [chatLoaded, setChatLoaded] = useState(false);
  const [tooltipActive, setTooltipActive] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const root = document.getElementById('html-root');
    if (root) {
      const lang = i18n.language?.split('-')[0] || 'en';
      root.setAttribute('lang', lang);
    }
  }, [i18n.language]);

  const handleCtaClick = () => {
    setChatLoaded(true);
    toggleChat();
  };

  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 flex flex-col overflow-x-hidden">
      {/* Particle network background */}
      <ParticleNetwork />

      {/* Background gradient orbs */}
      <div className="fixed top-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent blur-[120px] pointer-events-none z-0" aria-hidden="true" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-indigo-500/10 via-purple-500/5 to-transparent blur-[100px] pointer-events-none z-0" aria-hidden="true" />

      {/* Language selector */}
      <nav className="fixed top-4 right-4 z-40 flex gap-1.5" aria-label="Language selector">
        {['EN', 'MS', 'FR', 'ES'].map((lang) => (
          <button
            key={lang}
            onClick={() => i18n.changeLanguage(lang.toLowerCase())}
            className="text-[11px] font-mono font-medium px-2 py-1 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-400/70"
            aria-label={`Switch language to ${lang}`}
            aria-pressed={i18n.language?.toUpperCase() === lang}
          >
            {lang}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main id="main-content" className="relative z-10 flex-1">
        <HeroSection onCtaClick={handleCtaClick} />
        <TrustBadges />
        <div className="glow-line mx-auto max-w-xl mb-8" />
        <AcademicTimeline onTooltipActive={setTooltipActive} />
        <div className={`max-w-4xl mx-auto px-4 pb-16 ${tooltipActive ? "pt-36" : "pt-16"} transition-all duration-300`}>
          <TravelOSSimulation />
        </div>
      </main>

      <Footer />

      {chatLoaded && (
        <Suspense
          fallback={
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-space-900/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 flex items-center justify-center">
              <div className="skeleton-shimmer w-32 h-4 rounded" role="status" aria-label="Loading chat" />
            </div>
          }
        >
          <ChatPanel />
        </Suspense>
      )}
    </div>
  );
}

export default App;
