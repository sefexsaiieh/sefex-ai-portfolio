import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileDown, Clipboard, FileText, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function CVExportPanel() {
  const { t } = useTranslation();
  const { addMessage, setChatLoading } = useStore();
  const [loading, setLoading] = useState<'pdf' | 'docx' | null>(null);

  const handleGenerateCV = useCallback(() => {
    addMessage({ role: 'user', content: 'Generate my complete CV' });
    setChatLoading(true);
    setTimeout(() => {
      addMessage({ role: 'assistant', content: `# Sefex Saiieh — FinTech AI Consultant

**Location:** Luxembourg | **Email:** sefex.saiieh@gmail.com | **Phone:** +352 661 374 571

## Professional Summary
Results-oriented financial technology consultant with 10+ years of experience in AI-powered solutions for financial services, portfolio management, robo-advisory, and wealth management systems.

## Core Expertise
- **FinTech Strategy** — Islamic finance principles, AI-driven solutions
- **Robo-Advisory** — AI/ML personalised investment advice, automated portfolio management
- **Wealth Management Systems** — Temenos WealthSuite/Triple'A, regulatory compliance
- **Islamic Finance** — Shariah-compliant strategies, INCEIF Executive Master's (Jan 2026)
- **Project Leadership** — Cross-functional teams, C-suite stakeholders

## Professional Experience
**Principal Consultant** — LTIMindtree / Spuerkeess Bank (Current)
*AI-driven discretionary portfolio management on Temenos WealthSuite Triple'A*

**Temenos WealthSuite Consultant** (2020-2023)
*Alinma Bank (Islamic finance), BNP Paribas (Triple'A upgrade), EuroBank Cyprus*

**Triple'A Business Unit Manager** — ITSS / Deutscher Bank (2017-2019)

**Independent Consultant** — Standard Chartered Singapore (2015-2017)

**Technical Team Lead** — Maybank Singapore (2013-2015)

## Education
- B.Sc. Statistics — Case Western Reserve University (2012)
- Executive Master's in Islamic Finance — INCEIF University Malaysia (Expected Jan 2026)

## Certifications
- Temenos Triple'A WealthSuite Plus Bronze
- Temenos Triple'A Project Management & Implementation
- Temenos Triple'A Troubleshooting/Run-the-Bank
- The Data Scientist's Toolbox — Johns Hopkins University

## Languages
- English (Fluent) | Malay/Indonesian (Native) | French (Beginner/A1)

---
*Generated on ${new Date().toISOString().split('.')[0]} UTC*
⚠️ AI-generated — verify via LinkedIn

📥 **Use the buttons below to download as PDF or DOCX** ⬇️` });
      setChatLoading(false);
    }, 800);
  }, [addMessage, setChatLoading]);

  const handleDownloadPdf = useCallback(async () => {
    setLoading('pdf');
    try {
      const { downloadCvPdf } = await import('../../lib/cvExport');
      downloadCvPdf();
    } finally { setLoading(null); }
  }, []);

  const handleDownloadDocx = useCallback(async () => {
    setLoading('docx');
    try {
      const { downloadCvDocx } = await import('../../lib/cvExport');
      await downloadCvDocx();
    } finally { setLoading(null); }
  }, []);

  return (
    <div className="flex flex-wrap gap-2 px-3 py-2 border-t border-white/5" role="group" aria-label="CV export options">
      <button onClick={handleGenerateCV}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition-all"
        aria-label="Generate CV">
        <FileText className="w-3.5 h-3.5" aria-hidden="true" /> {t('chat.quick_cv')}
      </button>
      <button onClick={handleDownloadPdf} disabled={loading !== null}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
        aria-label={t('cv.download_pdf')}>
        {loading === 'pdf' ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" /> : <FileDown className="w-3.5 h-3.5" aria-hidden="true" />}
        {t('cv.download_pdf')}
      </button>
      <button onClick={handleDownloadDocx} disabled={loading !== null}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
        aria-label="Download DOCX">
        {loading === 'docx' ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" /> : <FileText className="w-3.5 h-3.5" aria-hidden="true" />}
        DOCX
      </button>
      <button onClick={() => { void navigator.clipboard.writeText(`Sefex Saiieh - FinTech AI Consultant\nLocation: Luxembourg | Email: sefex.saiieh@gmail.com\n\nSummary: 10+ years in AI-powered FinTech solutions.\n\nCurrent: Principal Consultant @ LTIMindtree, leading lux|mandate at Spuerkeess Bank`); }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
        aria-label={t('cv.copy_clipboard')}>
        <Clipboard className="w-3.5 h-3.5" aria-hidden="true" /> {t('cv.copy_clipboard')}
      </button>
    </div>
  );
}
