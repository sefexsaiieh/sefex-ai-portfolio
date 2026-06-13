import { motion } from 'framer-motion';

interface TimelineConnectorProps {
  isVisible: boolean;
}

export function TimelineConnector({ isVisible }: TimelineConnectorProps) {
  return (
    <svg
      className="absolute top-[2.35rem] left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-px"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke="#d1d5db"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isVisible
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </svg>
  );
}
