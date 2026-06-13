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

export function TimelineNode({
  credential,
  index,
  total,
  isVisible,
  onHover,
  hovered,
}: TimelineNodeProps) {
  const Icon = iconMap[credential.icon];
  const isCurrent = credential.highlighted;
  const isLast = index === total - 1;

  return (
    <div
      className="relative flex flex-col items-center"
      role="listitem"
      aria-label={`${credential.year}: ${credential.degree} at ${credential.institution}`}
    >
      {/* Year badge */}
      <time
        className={`text-xs font-mono font-medium mb-1 transition-colors duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isCurrent ? 'text-accent-600' : 'text-gray-500'}`}
        aria-hidden="true"
      >
        {credential.year}
      </time>

      {/* Icon circle */}
      <button
        className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${
          isVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-50'
        } ${
          isCurrent
            ? 'border-accent-500 bg-accent-50 shadow-md shadow-accent-100'
            : 'border-gray-300 bg-white hover:border-accent-300'
        } ${hovered === index ? 'shadow-lg scale-110' : ''}`}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(index)}
        onBlur={() => onHover(null)}
        aria-expanded={hovered === index}
        aria-describedby={hovered === index ? `tooltip-${index}` : undefined}
      >
        <Icon
          className={`w-4 h-4 ${
            isCurrent ? 'text-accent-600' : 'text-gray-500'
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Label */}
      <div
        className={`mt-2 text-center transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <p className={`text-xs font-semibold leading-tight ${
          isCurrent ? 'text-accent-700' : 'text-gray-800'
        }`}>
          {credential.degree}
        </p>
        <p className="text-[10px] text-gray-500 leading-tight mt-0.5 hidden sm:block">
          {credential.institution}
        </p>
      </div>

      {/* Pulse glow for "Now" node */}
      {isCurrent && isVisible && (
        <div
          className="absolute top-[1.65rem] w-10 h-10 rounded-full bg-accent-400/20 animate-pulse"
          aria-hidden="true"
          style={{ animationDuration: '2.5s' }}
        />
      )}

      {/* Tooltip */}
      {hovered === index && (
        <div
          id={`tooltip-${index}`}
          role="tooltip"
          className="absolute z-20 top-full mt-2 w-56 p-3 bg-white border border-gray-200 rounded-lg shadow-lg text-left"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          <p className="text-xs font-semibold text-gray-900 mb-1">
            {credential.degree}
          </p>
          <p className="text-xs text-gray-600 mb-1.5">
            {credential.tooltip.description}
          </p>
          <ul className="text-[11px] text-gray-500 space-y-0.5 list-disc list-inside">
            {credential.tooltip.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
