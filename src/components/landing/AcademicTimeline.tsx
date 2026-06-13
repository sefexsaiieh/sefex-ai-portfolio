import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useViewportAnimation } from '../../hooks/useViewportAnimation';
import { timelineCredentials } from '../../data/timeline';
import { TimelineNode } from './TimelineNode';
import { useState } from 'react';

interface AcademicTimelineProps { onTooltipActive?: (active: boolean) => void; }

export function AcademicTimeline({ onTooltipActive }: AcademicTimelineProps) {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const { ref, isVisible } = useViewportAnimation({ threshold: 0.2 });
  const [hovered, setHovered] = useState<number | null>(null);
  const handleHover = (index: number | null) => {
    setHovered(index);
    onTooltipActive?.(index !== null);
  };

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
      className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 md:py-16"
      aria-label={t('timeline.title')}
    >
      <h2 className="text-center text-xs font-mono font-semibold text-slate-500 uppercase tracking-[0.2em] mb-10">
        {t('timeline.title')}
      </h2>

      <motion.div
        className="relative grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 items-start"
        role="list"
        variants={!prefersReduced ? containerVariants : undefined}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {timelineCredentials.map((credential, index) => (
          <motion.div
            key={credential.year}
            className="relative flex flex-col items-center"
            variants={!prefersReduced ? nodeVariants : undefined}
            style={prefersReduced ? { opacity: 1, transform: 'none' } : undefined}
          >
            <TimelineNode
              credential={credential}
              index={index}
              total={timelineCredentials.length}
              isVisible={prefersReduced || isVisible}
              onHover={handleHover}
              hovered={hovered}
            />

            {index < timelineCredentials.length - 1 && (
              <div
                className="absolute top-[2.35rem] left-[calc(50%+1.25rem)] right-0 h-px hidden md:block"
                aria-hidden="true"
              >
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
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile fallback */}
      <div className="md:hidden mt-8 space-y-3" role="list">
        {timelineCredentials.map((c) => (
          <div key={c.year} className="glass-card flex items-center gap-3 p-3" role="listitem">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
              c.highlighted ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-white/5 text-slate-500'
            }`}>
              {c.year.slice(-2)}
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-semibold ${c.highlighted ? 'text-cyan-300' : 'text-slate-200'}`}>
                {c.degree}
              </p>
              <p className="text-xs text-slate-500 truncate">{c.institution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
