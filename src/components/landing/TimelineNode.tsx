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
  isActive: boolean;
}

export function TimelineNode({ credential, index, total, isVisible, isActive }: TimelineNodeProps) {
  const Icon = iconMap[credential.icon];
  const isCurrent = credential.highlighted;

  return (
    <div className="relative flex flex-col items-center" role="listitem" aria-label={`${credential.year}: ${credential.degree}`}>
      {/* Year */}
      <time className={`text-xs font-mono font-medium mb-2 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${isActive ? 'text-cyan-300' : isCurrent ? 'text-cyan-400' : 'text-slate-600'}`} aria-hidden="true">
        {credential.year}
      </time>

      {/* Icon circle */}
      <div
        className={`relative z-10 flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        } ${
          isActive
            ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/30 scale-110'
            : isCurrent
              ? 'border-cyan-400/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
              : 'border-slate-700/60 bg-white/5'
        }`}
      >
        <Icon className={`w-4.5 h-4.5 transition-all duration-300 ${isActive ? 'text-cyan-200' : isCurrent ? 'text-cyan-300' : 'text-slate-400'}`} aria-hidden="true" />
      </div>

      {/* Active glow ring */}
      {isActive && (
        <div className="absolute top-[1.7rem] w-11 h-11 rounded-full bg-cyan-400/20 animate-glow-pulse" aria-hidden="true" />
      )}

      {/* Label */}
      <div className={`mt-2.5 text-center transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <p className={`text-xs font-semibold leading-tight transition-colors duration-300 ${isActive ? 'text-cyan-200' : isCurrent ? 'text-cyan-300' : 'text-slate-300'}`}>
          {credential.degree}
        </p>
        <p className="text-[10px] text-slate-600 leading-tight mt-0.5 hidden sm:block">{credential.institution}</p>
      </div>
    </div>
  );
}
