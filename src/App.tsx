import { lazy, Suspense, useState } from 'react';
import { HeroSection } from './components/landing/HeroSection';
import { TrustBadges } from './components/landing/TrustBadges';
import { AcademicTimeline } from './components/landing/AcademicTimeline';
import { Footer } from './components/landing/Footer';
import { TravelOSSimulation } from './components/simulation/TravelOSSimulation';
import { useStore } from './store/useStore';

// Lazy-load the chat panel
const ChatPanel = lazy(() =>
  import('./components/chat/ChatPanel').then((m) => ({ default: m.ChatPanel }))
);

function App() {
  const { isChatOpen, toggleChat } = useStore();
  const [chatLoaded, setChatLoaded] = useState(false);

  const handleCtaClick = () => {
    setChatLoaded(true);
    toggleChat();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Language selector */}
      <div className="fixed top-4 right-4 z-40 flex gap-1">
        {['EN', 'MS', 'FR', 'ES'].map((lang) => (
          <button
            key={lang}
            onClick={() => {
              const i18n = (window as any).__i18n;
              if (i18n) i18n.changeLanguage(lang.toLowerCase());
            }}
            className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded text-gray-400 hover:text-accent-600 hover:bg-accent-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            aria-label={`Switch language to ${lang}`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <HeroSection onCtaClick={handleCtaClick} />

        {/* Trust badges */}
        <TrustBadges />

        {/* Academic Timeline */}
        <AcademicTimeline />

        {/* TravelOS Simulation (MV1) */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <TravelOSSimulation />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat panel (lazy-loaded) */}
      {chatLoaded && (
        <Suspense
          fallback={
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-gray-200 shadow-2xl z-50 flex items-center justify-center">
              <div className="skeleton-shimmer w-32 h-4 rounded" />
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
