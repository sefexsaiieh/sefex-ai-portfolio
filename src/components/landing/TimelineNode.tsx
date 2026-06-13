import { GraduationCap, Briefcase, Cpu, Award, Target } from 'lucide-react';
import type { Credential } from '../../data/timeline';

const iconMap = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  ai: Cpu,
  certificate: Award,
  current: Target,
} as const;

interface TimelineNodeProps {
  credential: Credential;
  index: number;
  total: number;
  isVisible: boolean;
  onHover: (index: number | null) => void;
  hovered: number | null;
}

export function TimelineNode({ credential, index, total, isVisible, onHover, hovered }: TimelineNodeProps) {
  const Icon = iconMap[credential.icon];
  const isCurrent = credential.highlighted;
  const isLast = index === total - 1;
  const showTooltip = hovered === index;

  return (
    <div className="relative flex flex-col items-center" role="listitem" aria-label={`${credential.year}: ${credential.degree}`}>
      <time className={`text-xs font-mono font-medium mb-2 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${isCurrent ? 'text-cyan-400' : 'text-slate-600'}`} aria-hidden="true">
        {credential.year}
      </time>

      <button
        className={`relative z-10 flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-space-950 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        } ${
          isCurrent
            ? 'border-cyan-400/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
            : 'border-slate-700/60 bg-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/5'
        } ${showTooltip ? 'scale-110' : ''}`}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(index)}
        onBlur={() => onHover(null)}
        aria-expanded={showTooltip}
        aria-describedby={showTooltip ? `tooltip-${index}` : undefined}
      >
        <Icon className={`w-4.5 h-4.5 ${isCurrent ? 'text-cyan-300' : 'text-slate-400'}`} aria-hidden="true" />
      </button>

      {/* Label below node */}
      <div className={`mt-2.5 text-center transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <p className={`text-xs font-semibold leading-tight ${isCurrent ? 'text-cyan-300' : 'text-slate-300'}`}>
          {credential.degree}
        </p>
        <p className="text-[10px] text-slate-600 leading-tight mt-0.5 hidden sm:block">{credential.institution}</p>
      </div>

      {/* Pulse glow for "Now" */}
      {isCurrent && isVisible && (
        <div className="absolute top-[1.7rem] w-11 h-11 rounded-full bg-cyan-400/10 animate-glow-pulse" aria-hidden="true" />
      )}

      {/* Tooltip — renders ABOVE the node to avoid overlapping sections below */}
      {showTooltip && (
        <div
          id={`tooltip-${index}`}
          role="tooltip"
          className="absolute z-20 bottom-full mb-2 w-56 p-3 rounded-xl border border-white/10 backdrop-blur-xl text-left"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(15, 23, 42, 0.95)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 20px rgba(6,182,212,0.1)',
          }}
        >
          <p className="text-xs font-semibold text-cyan-300 mb-1">{credential.degree}</p>
          <p className="text-xs text-slate-400 mb-1.5">{credential.tooltip.description}</p>
          <ul className="text-[11px] text-slate-500 space-y-0.5 list-disc list-inside">
            {credential.tooltip.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
