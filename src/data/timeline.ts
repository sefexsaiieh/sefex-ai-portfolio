export interface Credential {
  year: string;
  degree: string;
  institution: string;
  field: string;
  icon: 'graduation' | 'briefcase' | 'ai' | 'certificate' | 'current';
  highlighted?: boolean;
  tooltip: {
    description: string;
    details: string[];
  };
}

export const timelineCredentials: Credential[] = [
  {
    year: '2012',
    degree: 'BSc Statistics',
    institution: 'Case Western Reserve University',
    field: 'Statistics & Data Analysis',
    icon: 'graduation',
    tooltip: {
      description: 'Bachelor of Science in Statistics',
      details: [
        'Case Western Reserve University, Ohio, USA',
        'Foundation in statistical modeling and data analysis',
        'Launched FinTech career upon graduation',
      ],
    },
  },
  {
    year: '2015',
    degree: 'FinTech Career Begins',
    institution: 'Standard Chartered · Maybank · CIMB',
    field: 'Wealth Management Systems',
    icon: 'briefcase',
    tooltip: {
      description: 'Specialised in wealth management and robo-advisory systems across SE Asia',
      details: [
        'Technical Team Lead at Maybank Singapore (2013–2015)',
        'Robo-advisory initiative at Standard Chartered (2015–2017)',
        'Islamic finance wealth systems implementation',
      ],
    },
  },
  {
    year: '2018',
    degree: 'Temenos WealthSuite Expert',
    institution: 'BNP Paribas · Spuerkeess · Alinma',
    field: 'Triple\'A · WealthSuite · MiFID II',
    icon: 'certificate',
    tooltip: {
      description: 'Enterprise-grade Temenos Triple\'A/WealthSuite delivery',
      details: [
        'Triple\'A upgrade & migration for BNP Paribas',
        'Islamic finance-compliant WealthSuite at Alinma Investment Bank',
        'Triple\'A Business Unit Manager at ITSS / Deutscher Bank',
      ],
    },
  },
  {
    year: '2024',
    degree: 'AI Agent Engineering',
    institution: 'TravelOS · Silk Road Platform',
    field: 'DeepSeek · Gemini · Edge Functions',
    icon: 'ai',
    tooltip: {
      description: 'Built 4 production AI agents with real-time orchestration',
      details: [
        'TravelOS: monitoring, planning, storytelling, vision agents',
        'Silk Road: full-stack AI halal marketplace with blockchain',
        'DeepSeek API + Gemini 2.0 Flash + Supabase Edge Functions',
      ],
    },
  },
  {
    year: '2026',
    degree: 'MSc Islamic Finance',
    institution: 'INCEIF — Global University of Islamic Finance',
    field: 'Executive Master\'s (Expected)',
    icon: 'graduation',
    tooltip: {
      description: 'Executive Master\'s in Islamic Finance — expected graduation Jan 2026',
      details: [
        'INCEIF, Malaysia — world\'s premier Islamic finance university',
        'Shariah-compliant investment strategies & risk management',
        'Complements 10+ years of FinTech consulting expertise',
      ],
    },
  },
  {
    year: 'Now',
    degree: 'FinTech AI Expert',
    institution: 'Active · Luxembourg',
    field: 'AI-driven portfolio management · lux|mandate',
    icon: 'current',
    highlighted: true,
    tooltip: {
      description: 'Currently deployed at Spuerkeess Bank Luxembourg via LTIMindtree',
      details: [
        'Leading lux|mandate — AI-driven discretionary portfolio management',
        'Temenos WealthSuite Triple\'A · AI agents · Real-time systems',
        '4-language AI portfolio assistant at sefex.ai',
      ],
    },
  },
];
