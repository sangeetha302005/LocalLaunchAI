import { jsPDF } from 'jspdf';
import type { GeneratedWebsiteCopy } from '../types';

export function formatCopyAsText(data: GeneratedWebsiteCopy): string {
  const { input, homepage, services, callToAction } = data;

  const lines: string[] = [];

  lines.push(`=======================================================`);
  lines.push(`LOCALLAUNCH AI – GENERATED WEBSITE COPY`);
  lines.push(`Business: ${input.businessName} (${input.businessType})`);
  lines.push(`Location: ${input.location}`);
  lines.push(`Brand Tone: ${input.brandTone}`);
  lines.push(`Generated On: ${new Date(data.timestamp).toLocaleString()}`);
  lines.push(`=======================================================\n`);

  lines.push(`--- 1. HOMEPAGE COPY ---\n`);
  lines.push(`[HERO SECTION]`);
  lines.push(`Headline: ${homepage.hero.headline}`);
  lines.push(`Subheadline: ${homepage.hero.subheadline}`);
  lines.push(`Primary CTA Button: ${homepage.hero.primaryCta}\n`);

  lines.push(`[VALUE PROPOSITION]`);
  lines.push(`${homepage.valueProposition}\n`);

  lines.push(`[ABOUT SECTION]`);
  lines.push(`${homepage.aboutSection}\n`);

  lines.push(`[WHY CHOOSE US]`);
  homepage.whyChooseUs.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.title}`);
    lines.push(`   ${item.description}`);
  });
  lines.push('');

  lines.push(`[TRUST & CREDIBILITY]`);
  lines.push(`Badge: ${homepage.trustSection.badge}`);
  lines.push(`Statement: ${homepage.trustSection.statement}`);
  lines.push(`Proof Points:`);
  homepage.trustSection.proofPoints.forEach((pt) => lines.push(` • ${pt}`));
  lines.push('\n');

  lines.push(`--- 2. SERVICES COPY ---\n`);
  services.forEach((service, index) => {
    lines.push(`Service #${index + 1}: ${service.serviceName}`);
    lines.push(`Description: ${service.shortDescription}`);
    lines.push(`Key Benefits:`);
    service.benefits.forEach((b) => lines.push(` • ${b}`));
    lines.push(`What to Expect: ${service.whatToExpect}`);
    lines.push(`Service CTA: ${service.cta}`);
    lines.push('--------------------------------------------------');
  });
  lines.push('\n');

  lines.push(`--- 3. CALL TO ACTION (CTA) VARIATIONS ---\n`);
  lines.push(`[1. Primary Conversion CTA]`);
  lines.push(`Headline: ${callToAction.primaryCta.headline}`);
  lines.push(`Subtext: ${callToAction.primaryCta.subtext}`);
  lines.push(`Button: ${callToAction.primaryCta.buttonText}\n`);

  lines.push(`[2. Direct Contact CTA]`);
  lines.push(`Headline: ${callToAction.contactCta.headline}`);
  lines.push(`Subtext: ${callToAction.contactCta.subtext}`);
  lines.push(`Button: ${callToAction.contactCta.buttonText}\n`);

  lines.push(`[3. Custom Enquiry CTA]`);
  lines.push(`Headline: ${callToAction.enquiryCta.headline}`);
  lines.push(`Subtext: ${callToAction.enquiryCta.subtext}`);
  lines.push(`Button: ${callToAction.enquiryCta.buttonText}\n`);

  lines.push(`[4. Location & Visit CTA]`);
  lines.push(`Headline: ${callToAction.locationCta.headline}`);
  lines.push(`Subtext: ${callToAction.locationCta.subtext}`);
  lines.push(`Button: ${callToAction.locationCta.buttonText}\n`);

  lines.push(`=======================================================`);
  lines.push(`Generated with LocalLaunch AI – Turn Your Local Business Into Powerful Words`);

  return lines.join('\n');
}

export function formatCopyAsMarkdown(data: GeneratedWebsiteCopy): string {
  const { input, homepage, services, callToAction } = data;

  let md = `# LocalLaunch AI – Website Copy for ${input.businessName}\n\n`;
  md += `**Business Type:** ${input.businessType}  \n`;
  md += `**Location:** ${input.location}  \n`;
  md += `**Brand Tone:** ${input.brandTone}  \n`;
  md += `**Target Audience:** ${input.targetAudience}  \n\n`;
  md += `---\n\n`;

  md += `## 1. Homepage Copy\n\n`;
  md += `### Hero Section\n`;
  md += `* **Headline:** ${homepage.hero.headline}\n`;
  md += `* **Subheadline:** ${homepage.hero.subheadline}\n`;
  md += `* **Primary CTA:** \`${homepage.hero.primaryCta}\`\n\n`;

  md += `### Value Proposition\n`;
  md += `> ${homepage.valueProposition}\n\n`;

  md += `### About Section\n`;
  md += `${homepage.aboutSection}\n\n`;

  md += `### Why Choose Us\n`;
  homepage.whyChooseUs.forEach((item) => {
    md += `* **${item.title}:** ${item.description}\n`;
  });
  md += `\n`;

  md += `### Trust & Credibility\n`;
  md += `**${homepage.trustSection.badge}**  \n`;
  md += `${homepage.trustSection.statement}\n\n`;
  homepage.trustSection.proofPoints.forEach((pt) => {
    md += `- ${pt}\n`;
  });
  md += `\n---\n\n`;

  md += `## 2. Services Copy\n\n`;
  services.forEach((service) => {
    md += `### ${service.serviceName}\n`;
    md += `${service.shortDescription}\n\n`;
    md += `**Key Benefits:**\n`;
    service.benefits.forEach((b) => {
      md += `- ${b}\n`;
    });
    md += `\n**What to Expect:** ${service.whatToExpect}\n\n`;
    md += `**CTA:** \`${service.cta}\`\n\n`;
  });

  md += `---\n\n`;
  md += `## 3. Call To Action (CTA) Variations\n\n`;

  const ctas = [
    { label: 'Primary Conversion CTA', ...callToAction.primaryCta },
    { label: 'Contact CTA', ...callToAction.contactCta },
    { label: 'Enquiry CTA', ...callToAction.enquiryCta },
    { label: 'Location CTA', ...callToAction.locationCta },
  ];

  ctas.forEach((cta) => {
    md += `### ${cta.label}\n`;
    md += `* **Headline:** ${cta.headline}\n`;
    md += `* **Subtext:** ${cta.subtext}\n`;
    md += `* **Button Label:** \`${cta.buttonText}\`\n\n`;
  });

  return md;
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportAsPdf(data: GeneratedWebsiteCopy) {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - margin * 2;
  let cursorY = 45;

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      cursorY = 45;
    }
  };

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(79, 70, 229); // Indigo
  doc.text('LocalLaunch AI', margin, cursorY);
  cursorY += 20;

  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.text(`Website Copy for ${data.input.businessName} (${data.input.businessType})`, margin, cursorY);
  cursorY += 16;
  doc.text(`Location: ${data.input.location} | Tone: ${data.input.brandTone}`, margin, cursorY);
  cursorY += 25;

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 20;

  // Section 1: Homepage
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('1. HOMEPAGE COPY', margin, cursorY);
  cursorY += 18;

  // Hero Headline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(79, 70, 229);
  doc.text('Hero Headline:', margin, cursorY);
  cursorY += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const heroLines = doc.splitTextToSize(data.homepage.hero.headline, maxLineWidth);
  checkPageBreak(heroLines.length * 12);
  doc.text(heroLines, margin, cursorY);
  cursorY += heroLines.length * 12 + 10;

  // Value Prop
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.text('Value Proposition:', margin, cursorY);
  cursorY += 14;
  doc.setFont('helvetica', 'normal');
  const vpLines = doc.splitTextToSize(data.homepage.valueProposition, maxLineWidth);
  checkPageBreak(vpLines.length * 12);
  doc.text(vpLines, margin, cursorY);
  cursorY += vpLines.length * 12 + 15;

  // About
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.text('About Section:', margin, cursorY);
  cursorY += 14;
  doc.setFont('helvetica', 'normal');
  const aboutLines = doc.splitTextToSize(data.homepage.aboutSection, maxLineWidth);
  checkPageBreak(aboutLines.length * 12);
  doc.text(aboutLines, margin, cursorY);
  cursorY += aboutLines.length * 12 + 20;

  // Section 2: Services
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('2. SERVICES COPY', margin, cursorY);
  cursorY += 18;

  data.services.forEach((s) => {
    checkPageBreak(45);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(79, 70, 229);
    doc.text(s.serviceName, margin, cursorY);
    cursorY += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const descLines = doc.splitTextToSize(s.shortDescription, maxLineWidth);
    checkPageBreak(descLines.length * 12);
    doc.text(descLines, margin, cursorY);
    cursorY += descLines.length * 12 + 8;

    s.benefits.forEach((b) => {
      checkPageBreak(14);
      const bLines = doc.splitTextToSize(`• ${b}`, maxLineWidth - 10);
      doc.text(bLines, margin + 10, cursorY);
      cursorY += bLines.length * 12;
    });
    cursorY += 10;
  });

  // Section 3: CTAs
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('3. CALL TO ACTION (CTA) VARIATIONS', margin, cursorY);
  cursorY += 18;

  const ctaList = [
    data.callToAction.primaryCta,
    data.callToAction.contactCta,
    data.callToAction.enquiryCta,
    data.callToAction.locationCta,
  ];

  ctaList.forEach((cta) => {
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229);
    doc.text(cta.title, margin, cursorY);
    cursorY += 12;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(`Headline: ${cta.headline}`, margin, cursorY);
    cursorY += 12;
    doc.text(`Button: [ ${cta.buttonText} ]`, margin, cursorY);
    cursorY += 14;
  });

  const safeFilename = `${data.input.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-website-copy.pdf`;
  doc.save(safeFilename);
}
