import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useViewportAnimation } from '../../hooks/useViewportAnimation';
import { timelineCredentials } from '../../data/timeline';
import { TimelineNode } from './TimelineNode';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';

const INTERVAL_MS = 4000;

export function AcademicTimeline() {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const { ref, isVisible } = useViewportAnimation({ threshold: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % timelineCredentials.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    // Reset the auto-play timer on manual click
    if (timerRef.current) clearInterval(timerRef.current);
    if (!prefersReduced && isVisible) {
      timerRef.current = setInterval(advance, INTERVAL_MS);
    }
  }, [advance, prefersReduced, isVisible]);

  // Auto-play
  useEffect(() => {
    if (prefersReduced || !isVisible) return;
    timerRef.current = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(timerRef.current);
  }, [advance, prefersReduced, isVisible]);

  const active = timelineCredentials[activeIndex];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.5 } },
  };
  const nodeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      className="relative z-10 w-full max-w-5xl mx-auto px-4"
      aria-label={t('timeline.title')}
    >
      <h2 className="text-center text-xs font-mono font-semibold text-slate-500 uppercase tracking-[0.2em] mb-10">
        {t('timeline.title')}
      </h2>

      {/* Timeline nodes */}
      <motion.div
        className="relative grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 items-start mb-10"
        role="list"
        variants={!prefersReduced ? containerVariants : undefined}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {timelineCredentials.map((credential, index) => (
          <motion.button
            key={credential.year}
            onClick={() => goTo(index)}
            className="relative flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-space-950 rounded-xl p-1"
            variants={!prefersReduced ? nodeVariants : undefined}
            style={prefersReduced ? { opacity: 1, transform: 'none' } : undefined}
            aria-label={`${credential.year}: ${credential.degree} — click for details`}
            aria-current={index === activeIndex ? 'step' : undefined}
          >
            <TimelineNode
              credential={credential}
              index={index}
              total={timelineCredentials.length}
              isVisible={prefersReduced || isVisible}
              isActive={index === activeIndex}
            />

            {/* Connector line */}
            {index < timelineCredentials.length - 1 && (
              <div className="absolute top-[2.35rem] left-[calc(50%+1.25rem)] right-0 h-px hidden md:block pointer-events-none" aria-hidden="true">
                {!prefersReduced && (
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500/40 to-blue-500/20"
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.5, ease: 'easeInOut' }}
                  />
                )}
              </div>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* === DEDICATED TOOLTIP / CREDENTIAL DETAIL AREA === */}
      <div className="glass-card mx-auto max-w-2xl p-5 md:p-6 min-h-[140px] flex flex-col justify-center" role="status" aria-live="polite" aria-label={`Credential details: ${active.degree}`}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-cyan-300" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <time className="text-xs font-mono font-semibold text-cyan-400">{active.year}</time>
              <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                {active.icon === 'current' ? 'Active' : 'Milestone'}
              </span>
            </div>

            <h3 className="text-base font-semibold text-slate-100">{active.degree}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{active.institution}</p>

            <p className="text-sm text-slate-300 mt-3 leading-relaxed">{active.tooltip.description}</p>

            <ul className="mt-2 space-y-1">
              {active.tooltip.details.map((detail, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">▸</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button onClick={() => goTo((activeIndex - 1 + timelineCredentials.length) % timelineCredentials.length)}
          className="p-1.5 text-slate-500 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded-lg"
          aria-label="Previous credential">
          <ChevronLeft className="w-4 h-4" />
        </button>
        {timelineCredentials.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${
              i === activeIndex ? 'bg-cyan-400 w-4' : 'bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Go to credential ${i + 1}`}
          />
        ))}
        <button onClick={() => goTo((activeIndex + 1) % timelineCredentials.length)}
          className="p-1.5 text-slate-500 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded-lg"
          aria-label="Next credential">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile fallback (list view) */}
      <div className="md:hidden mt-8 space-y-3" role="list">
        {timelineCredentials.map((c) => (
          <button key={c.year} onClick={() => goTo(timelineCredentials.indexOf(c))}
            className={`w-full glass-card flex items-center gap-3 p-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${
              timelineCredentials.indexOf(c) === activeIndex ? 'border-cyan-500/40 bg-cyan-500/5' : ''
            }`}
            role="listitem">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
              c.highlighted ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-white/5 text-slate-500'
            }`}>
              {c.year.slice(-2)}
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-semibold ${c.highlighted ? 'text-cyan-300' : 'text-slate-200'}`}>{c.degree}</p>
              <p className="text-xs text-slate-500 truncate">{c.institution}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
