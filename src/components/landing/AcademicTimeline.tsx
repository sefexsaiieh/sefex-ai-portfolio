import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useViewportAnimation } from '../../hooks/useViewportAnimation';
import { timelineCredentials } from '../../data/timeline';
import { TimelineNode } from './TimelineNode';
import { useState } from 'react';

export function AcademicTimeline() {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const { ref, isVisible } = useViewportAnimation({ threshold: 0.3 });
  const [hovered, setHovered] = useState<number | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.6,
      },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: prefersReduced ? 0 : 0.5 },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12"
      aria-label={t('timeline.title')}
    >
      <h2 className="text-center text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mb-8">
        {t('timeline.title')}
      </h2>

      {/* Timeline — responsive grid */}
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
              onHover={setHovered}
              hovered={hovered}
            />

            {/* Connector line (between nodes, not after last) */}
            {index < timelineCredentials.length - 1 && (
              <div
                className="absolute top-[2.35rem] left-[calc(50%+1.25rem)] right-0 h-px bg-gray-200 hidden md:block"
                aria-hidden="true"
                style={
                  prefersReduced
                    ? { width: 'calc(100% - 2.5rem)' }
                    : undefined
                }
              >
                {!prefersReduced && (
                  <motion.div
                    className="h-full bg-accent-400"
                    initial={{ width: 0 }}
                    animate={
                      isVisible ? { width: '100%' } : { width: 0 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.6,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: vertical list fallback for very small screens */}
      <div className="md:hidden mt-6 space-y-4" role="list">
        {timelineCredentials.map((c) => (
          <div
            key={c.year}
            className="flex items-start gap-3 p-2"
            role="listitem"
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                c.highlighted
                  ? 'bg-accent-100 text-accent-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {c.year.slice(-2)}
            </div>
            <div className="min-w-0">
              <p
                className={`text-sm font-semibold ${
                  c.highlighted ? 'text-accent-700' : 'text-gray-800'
                }`}
              >
                {c.degree}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {c.institution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
