import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FileDown, Clipboard, FileText } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function CVExportPanel() {
  const { t } = useTranslation();
  const { addMessage, setChatLoading } = useStore();

  const handleGenerateCV = useCallback(() => {
    addMessage({ role: 'user', content: 'Generate my complete CV' });
    setChatLoading(true);

    // Simulate AI response for now (will be replaced by Edge Function call)
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: `# Sefex Saiieh — FinTech AI Consultant

**Location:** Luxembourg | **Email:** sefex.saiieh@gmail.com

## Summary
Results-oriented financial technology consultant with 10+ years of experience in AI-powered solutions for financial services, portfolio management, and wealth management systems.

## Core Expertise
- **FinTech Strategy** — Islamic finance principles, AI-driven solutions
- **Robo-Advisory** — AI/ML personalised investment advice
- **Wealth Management** — Temenos WealthSuite/Triple'A
- **Islamic Finance** — INCEIF Executive Master's (Jan 2026)
- **Project Leadership** — Cross-functional teams, C-suite stakeholders

## Experience
**Principal Consultant** — LTIMindtree / Spuerkeess Bank (Current)
*Leading lux|mandate: AI-driven discretionary portfolio management*

**Temenos WealthSuite Consultant** (2020-2023)
*Alinma Bank (Islamic finance), BNP Paribas (Triple'A upgrade), EuroBank Cyprus*

**Triple'A Business Unit Manager** — ITSS / Deutscher Bank (2017-2019)

**Independent Consultant** — Standard Chartered Singapore (2015-2017)

**Technical Team Lead** — Maybank Singapore (2013-2015)

## Education
- **BSc Statistics** — Case Western Reserve University (2012)
- **Executive Master's Islamic Finance** — INCEIF (Expected Jan 2026)

## AI Projects
- **TravelOS**: 4 AI agents (Monitoring, Planning, Storytelling, Vision)
- **Silk Road**: Full-stack AI halal marketplace with blockchain

---
*Generated on ${new Date().toISOString().split('.')[0]} UTC*
⚠️ AI-generated — verify via LinkedIn`,
      });
      setChatLoading(false);
    }, 800);
  }, [addMessage, setChatLoading]);

  const handleCopyCV = useCallback(() => {
    const text = `Sefex Saiieh - FinTech AI Consultant\nLocation: Luxembourg | Email: sefex.saiieh@gmail.com\n\nSummary: 10+ years in AI-powered FinTech solutions, portfolio management, robo-advisory, and wealth management systems.\n\nCore Expertise: FinTech Strategy, Robo-Advisory, Wealth Management Systems, Islamic Finance, Project Leadership\n\nCurrent: Principal Consultant @ LTIMindtree, leading lux|mandate at Spuerkeess Bank Luxembourg`;
    void navigator.clipboard.writeText(text);
  }, []);

  return (
    <div className="flex flex-wrap gap-2 px-3 py-2" role="group" aria-label="CV export options">
      <button
        onClick={handleGenerateCV}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent-700 bg-accent-50 border border-accent-200 rounded-lg hover:bg-accent-100 transition-colors"
        aria-label="Generate CV"
      >
        <FileText className="w-3.5 h-3.5" aria-hidden="true" />
        {t('chat.quick_cv')}
      </button>
      <button
        onClick={handleCopyCV}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={t('cv.copy_clipboard')}
      >
        <Clipboard className="w-3.5 h-3.5" aria-hidden="true" />
        {t('cv.copy_clipboard')}
      </button>
      <button
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={t('cv.download_pdf')}
      >
        <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
        {t('cv.download_pdf')}
      </button>
    </div>
  );
}
