import { useTranslation } from 'react-i18next';
import { Award, BookOpen, Cpu, Briefcase } from 'lucide-react';

const badges = [
  { key: 'trust_1', icon: Briefcase },
  { key: 'trust_2', icon: BookOpen },
  { key: 'trust_3', icon: Award },
  { key: 'trust_4', icon: Cpu },
];

export function TrustBadges() {
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-wrap justify-center gap-3 px-4 pb-6"
      role="list"
      aria-label="Trust indicators"
    >
      {badges.map(({ key, icon: Icon }, i) => (
        <div
          key={key}
          role="listitem"
          className="badge-pill"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <Icon className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
          <span className="text-slate-300">{t(`hero.${key}`)}</span>
        </div>
      ))}
    </div>
  );
}
