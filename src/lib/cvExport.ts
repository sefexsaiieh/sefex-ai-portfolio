import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

// Reconstruct CV text from canonical data
const cvData = {
  name: 'Sefex Saiieh',
  location: 'Luxembourg',
  email: 'sefex.saiieh@gmail.com',
  phone: '+352 661 374 571',
  citizenship: 'Malaysian / Blue Card (Luxembourg)',
  summary: 'Results-oriented financial technology consultant with 10+ years of experience specializing in AI-powered solutions for financial services, portfolio management, robo-advisory, and wealth management systems.',
  expertise: [
    'FinTech Strategy — Islamic finance principles, AI-driven solutions',
    'Robo-Advisory — AI/ML personalised investment advice, automated portfolio management',
    'Wealth Management Systems — Temenos WealthSuite/Triple\'A, regulatory compliance',
    'Islamic Finance — Shariah-compliant strategies, INCEIF Executive Master\'s (Jan 2026)',
    'Project Leadership — Cross-functional teams, C-suite stakeholders',
  ],
  experience: [
    'Principal Consultant, LTIMindtree S.A. Luxembourg (Current)\n  Spuerkeess Bank — lux|mandate: AI-driven discretionary portfolio management on Temenos WealthSuite Triple\'A',
    'Temenos WealthSuite Independent Consultant (2020-2023)\n  Alinma Investment Bank (Islamic finance), BNP Paribas (Triple\'A upgrade), EuroBank Cyprus',
    'Triple\'A Business Unit Manager, ITSS Luxembourg (2017-2019)\n  Deutscher Bank Belgium — wealth management, MiFID II compliance',
    'Independent Fintech Consultant (2015-2017)\n  Standard Chartered Bank Singapore — Robo-advisory on Temenos WealthSuite',
    'Technical Team Lead, Maybank Singapore (2013-2015)\n  Global private wealth systems, Islamic finance features',
  ],
  education: [
    'B.Sc. Statistics, Case Western Reserve University (2012)',
    'Executive Master\'s in Islamic Finance, INCEIF University Malaysia (Expected Jan 2026)',
  ],
  certifications: [
    'Temenos Triple\'A WealthSuite Plus Bronze',
    'Temenos Triple\'A Project Management & Implementation',
    'Temenos Triple\'A Troubleshooting/Run-the-Bank',
    'The Data Scientist\'s Toolbox — Johns Hopkins University',
  ],
  languages: ['English (Fluent)', 'Malay/Indonesian (Native)', 'French (Beginner/A1)'],
};

export function downloadCvPdf() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = 210;
  const margin = 20;
  let y = 20;

  const addLine = (text: string, size = 11, bold = false, color = '#1e293b') => {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(color);
    doc.text(text, margin, y);
    y += size * 0.45;
  };

  const addWrapped = (text: string, size = 10, indent = 0) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#475569');
    const lines = doc.splitTextToSize(text, pageW - margin * 2 - indent);
    for (const line of lines) {
      if (y > 280) { doc.addPage(); y = 20; }
      doc.text(line, margin + indent, y);
      y += size * 0.4;
    }
  };

  const checkPage = () => { if (y > 270) { doc.addPage(); y = 20; } };

  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#0f172a');
  doc.text(cvData.name, margin, y);
  y += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#64748b');
  doc.text(`${cvData.location} | ${cvData.email} | ${cvData.phone}`, margin, y);
  y += 12;

  // Summary
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#0f172a');
  doc.text('Professional Summary', margin, y);
  y += 5;
  addWrapped(cvData.summary, 10);
  y += 4;
  checkPage();

  // Core Expertise
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#0f172a');
  doc.text('Core Expertise', margin, y);
  y += 5;
  for (const exp of cvData.expertise) {
    addWrapped(`• ${exp}`, 10, 4);
  }
  y += 4;
  checkPage();

  // Experience
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#0f172a');
  doc.text('Professional Experience', margin, y);
  y += 5;
  for (const exp of cvData.experience) {
    checkPage();
    const parts = exp.split('\n  ');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#1e293b');
    const wrappedTitle = doc.splitTextToSize(parts[0], pageW - margin * 2);
    doc.text(wrappedTitle, margin, y);
    y += 10 * 0.4 * wrappedTitle.length + 1;
    if (parts[1]) {
      addWrapped(parts[1], 9, 4);
    }
    y += 2;
  }
  checkPage();

  // Education
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#0f172a');
  doc.text('Education', margin, y);
  y += 5;
  for (const edu of cvData.education) {
    addWrapped(`• ${edu}`, 10, 4);
  }
  y += 4;
  checkPage();

  // Certifications
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#0f172a');
  doc.text('Certifications', margin, y);
  y += 5;
  for (const cert of cvData.certifications) {
    addWrapped(`• ${cert}`, 10, 4);
  }
  y += 4;
  checkPage();

  // Languages
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#0f172a');
  doc.text('Languages', margin, y);
  y += 5;
  for (const lang of cvData.languages) {
    addWrapped(`• ${lang}`, 10, 4);
  }

  doc.save('Sefex_Saiieh_CV.pdf');
}

export async function downloadCvDocx() {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: cvData.name, bold: true, size: 32, font: 'Calibri' }),
          ],
        }),
        new Paragraph({
          spacing: { after: 300 },
          children: [
            new TextRun({ text: `${cvData.location} | ${cvData.email} | ${cvData.phone}`, size: 20, color: '64748b', font: 'Calibri' }),
          ],
        }),
        // Summary
        new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: 'Professional Summary', bold: true, size: 26, font: 'Calibri' })] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: cvData.summary, size: 21, color: '475569', font: 'Calibri' })] }),
        // Core Expertise
        new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: 'Core Expertise', bold: true, size: 26, font: 'Calibri' })] }),
        ...cvData.expertise.map(e => new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: `• ${e}`, size: 21, color: '475569', font: 'Calibri' })] })),
        // Experience
        new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: 'Professional Experience', bold: true, size: 26, font: 'Calibri' })] }),
        ...cvData.experience.flatMap(exp => {
          const parts = exp.split('\n  ');
          return [
            new Paragraph({ spacing: { before: 100, after: 40 }, children: [new TextRun({ text: parts[0], bold: true, size: 22, font: 'Calibri' })] }),
            ...(parts[1] ? [new Paragraph({ spacing: { after: 100 }, indent: { left: 400 }, children: [new TextRun({ text: parts[1], size: 20, color: '475569', font: 'Calibri' })] })] : []),
          ];
        }),
        // Education
        new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: 'Education', bold: true, size: 26, font: 'Calibri' })] }),
        ...cvData.education.map(e => new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: `• ${e}`, size: 21, color: '475569', font: 'Calibri' })] })),
        // Certifications
        new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: 'Certifications', bold: true, size: 26, font: 'Calibri' })] }),
        ...cvData.certifications.map(c => new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: `• ${c}`, size: 21, color: '475569', font: 'Calibri' })] })),
        // Languages
        new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: 'Languages', bold: true, size: 26, font: 'Calibri' })] }),
        ...cvData.languages.map(l => new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: `• ${l}`, size: 21, color: '475569', font: 'Calibri' })] })),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'Sefex_Saiieh_CV.docx');
}
