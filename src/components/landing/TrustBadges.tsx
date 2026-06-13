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
      className="flex flex-wrap justify-center gap-3 px-4 pb-8"
      role="list"
      aria-label="Trust indicators"
    >
      {badges.map(({ key, icon: Icon }) => (
        <div
          key={key}
          role="listitem"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm"
        >
          <Icon className="w-4 h-4 text-accent-500" aria-hidden="true" />
          <span>{t(`hero.${key}`)}</span>
        </div>
      ))}
    </div>
  );
}
