import React, { useState } from 'react';
import type { GeneratedWebsiteCopy } from '../types';
import {
  Copy,
  Check,
  Edit2,
  RotateCw,
  Download,
  FileText,
  FileCode,
  BookmarkPlus,
  Layout,
  Layers,
  Zap,
  Eye,
  MapPin,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { LiveWebsitePreview } from './LiveWebsitePreview';
import { formatCopyAsText, formatCopyAsMarkdown, downloadFile, exportAsPdf } from '../utils/exporter';
import {
  generateHeroCopy,
  generateValueProp,
  generateAboutSection,
  generateWhyChooseUs,
  generateTrustSection,
  generateServicesCopy,
  generateCtaCopy,
} from '../services/aiGenerator';

interface OutputDashboardProps {
  data: GeneratedWebsiteCopy;
  onUpdateData: (updated: GeneratedWebsiteCopy) => void;
  onSaveProject: (data: GeneratedWebsiteCopy) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

type TabType = 'homepage' | 'services' | 'cta' | 'preview';

export const OutputDashboard: React.FC<OutputDashboardProps> = ({
  data,
  onUpdateData,
  onSaveProject,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('homepage');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Edit states for individual sections
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  // Micro-loading states for single section regenerations
  const [regeneratingKey, setRegeneratingKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, keyName: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    onShowToast(`Copied ${label} to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedKey((prev) => (prev === keyName ? null : prev));
    }, 2000);
  };

  const handleCopyAll = () => {
    const fullText = formatCopyAsText(data);
    copyToClipboard(fullText, 'all-content', 'complete website copy');
  };

  const handleExportTxt = () => {
    const text = formatCopyAsText(data);
    const filename = `${data.input.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-copy.txt`;
    downloadFile(text, filename, 'text/plain;charset=utf-8');
    onShowToast('Exported as Plain Text (.txt)', 'success');
  };

  const handleExportMarkdown = () => {
    const md = formatCopyAsMarkdown(data);
    const filename = `${data.input.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-copy.md`;
    downloadFile(md, filename, 'text/markdown;charset=utf-8');
    onShowToast('Exported as Markdown (.md)', 'success');
  };

  const handleExportPdf = () => {
    exportAsPdf(data);
    onShowToast('Exported as formatted PDF Document', 'success');
  };

  // Section level regenerations
  const handleRegenerateHero = async () => {
    setRegeneratingKey('hero');
    await new Promise((r) => setTimeout(r, 400));
    const newHero = generateHeroCopy(data.input);
    onUpdateData({
      ...data,
      homepage: {
        ...data.homepage,
        hero: newHero,
      },
    });
    setRegeneratingKey(null);
    onShowToast('Regenerated Hero section!', 'info');
  };

  const handleRegenerateValueProp = async () => {
    setRegeneratingKey('valueProp');
    await new Promise((r) => setTimeout(r, 400));
    const newVp = generateValueProp(data.input);
    onUpdateData({
      ...data,
      homepage: {
        ...data.homepage,
        valueProposition: newVp,
      },
    });
    setRegeneratingKey(null);
    onShowToast('Regenerated Value Proposition!', 'info');
  };

  const handleRegenerateAbout = async () => {
    setRegeneratingKey('about');
    await new Promise((r) => setTimeout(r, 400));
    const newAbout = generateAboutSection(data.input);
    onUpdateData({
      ...data,
      homepage: {
        ...data.homepage,
        aboutSection: newAbout,
      },
    });
    setRegeneratingKey(null);
    onShowToast('Regenerated About section!', 'info');
  };

  const handleRegenerateWhyChoose = async () => {
    setRegeneratingKey('whyChoose');
    await new Promise((r) => setTimeout(r, 400));
    const newItems = generateWhyChooseUs(data.input);
    onUpdateData({
      ...data,
      homepage: {
        ...data.homepage,
        whyChooseUs: newItems,
      },
    });
    setRegeneratingKey(null);
    onShowToast('Regenerated Why Choose Us points!', 'info');
  };

  const handleRegenerateTrust = async () => {
    setRegeneratingKey('trust');
    await new Promise((r) => setTimeout(r, 400));
    const newTrust = generateTrustSection(data.input);
    onUpdateData({
      ...data,
      homepage: {
        ...data.homepage,
        trustSection: newTrust,
      },
    });
    setRegeneratingKey(null);
    onShowToast('Regenerated Trust & Credibility messaging!', 'info');
  };

  const handleRegenerateAllServices = async () => {
    setRegeneratingKey('allServices');
    await new Promise((r) => setTimeout(r, 450));
    const newServices = generateServicesCopy(data.input);
    onUpdateData({
      ...data,
      services: newServices,
    });
    setRegeneratingKey(null);
    onShowToast('Regenerated all service descriptions!', 'info');
  };

  const handleRegenerateCtas = async () => {
    setRegeneratingKey('ctas');
    await new Promise((r) => setTimeout(r, 400));
    const newCtas = generateCtaCopy(data.input);
    onUpdateData({
      ...data,
      callToAction: newCtas,
    });
    setRegeneratingKey(null);
    onShowToast('Regenerated CTA variations!', 'info');
  };

  return (
    <section id="output-dashboard" className="py-12 md:py-16 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Output Header Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-indigo-500/5 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {data.input.businessName}
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-200 dark:border-purple-800">
                  {data.input.businessType}
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  {data.input.location}
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-lg">
                  Tone: {data.input.brandTone}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Generated Website Copy Dashboard
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Website-ready content tailored to your target audience and location. Ready to copy, edit, or export.
              </p>
            </div>

            {/* Quick Export & Actions Toolbar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleCopyAll}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer"
              >
                {copiedKey === 'all-content' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied All!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy All Content</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExportPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                title="Download as PDF"
              >
                <Download className="w-4 h-4 text-rose-500" />
                <span>PDF</span>
              </button>

              <button
                onClick={handleExportTxt}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                title="Download as Plain Text"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                <span>TXT</span>
              </button>

              <button
                onClick={handleExportMarkdown}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                title="Download as Markdown"
              >
                <FileCode className="w-4 h-4 text-purple-500" />
                <span>MD</span>
              </button>

              <button
                onClick={() => onSaveProject(data)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer"
                title="Save this project to browser storage"
              >
                <BookmarkPlus className="w-4 h-4 text-emerald-600" />
                <span>Save Project</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 pt-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('homepage')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'homepage'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>1. Homepage Copy</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>2. Services Copy</span>
              <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-current rounded-full">
                {data.services.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('cta')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'cta'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>3. Call To Action (CTAs)</span>
              <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-current rounded-full">
                4 Variations
              </span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>✨ Live Website Preview</span>
            </button>
          </div>
        </div>

        {/* TAB 1: HOMEPAGE COPY */}
        {activeTab === 'homepage' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Card 1: Hero Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Hero Section Copy
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRegenerateHero}
                    disabled={regeneratingKey === 'hero'}
                    className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Regenerate Hero section"
                  >
                    <RotateCw className={`w-4 h-4 ${regeneratingKey === 'hero' ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => {
                      const text = `Headline: ${data.homepage.hero.headline}\nSubheadline: ${data.homepage.hero.subheadline}\nPrimary CTA: ${data.homepage.hero.primaryCta}`;
                      copyToClipboard(text, 'hero', 'Hero section');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedKey === 'hero' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'hero' ? 'Copied' : 'Copy Section'}</span>
                  </button>
                </div>
              </div>

              {/* Hero Content Block */}
              <div className="space-y-4">
                {/* Headline */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Headline (H1):
                  </span>
                  {editingKey === 'hero-headline' ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editValues['hero-headline'] ?? data.homepage.hero.headline}
                        onChange={(e) => setEditValues({ ...editValues, 'hero-headline': e.target.value })}
                        className="flex-1 p-2.5 text-sm bg-slate-50 dark:bg-slate-800 border rounded-lg"
                      />
                      <button
                        onClick={() => {
                          onUpdateData({
                            ...data,
                            homepage: {
                              ...data.homepage,
                              hero: { ...data.homepage.hero, headline: editValues['hero-headline'] || data.homepage.hero.headline },
                            },
                          });
                          setEditingKey(null);
                        }}
                        className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="group relative flex items-start justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800">
                      <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {data.homepage.hero.headline}
                      </p>
                      <button
                        onClick={() => {
                          setEditingKey('hero-headline');
                          setEditValues({ 'hero-headline': data.homepage.hero.headline });
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-indigo-600 transition-opacity ml-2 cursor-pointer"
                        title="Edit headline"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Subheadline */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Subheadline:
                  </span>
                  {editingKey === 'hero-subheadline' ? (
                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        value={editValues['hero-subheadline'] ?? data.homepage.hero.subheadline}
                        onChange={(e) => setEditValues({ ...editValues, 'hero-subheadline': e.target.value })}
                        className="flex-1 p-2.5 text-sm bg-slate-50 dark:bg-slate-800 border rounded-lg"
                      />
                      <button
                        onClick={() => {
                          onUpdateData({
                            ...data,
                            homepage: {
                              ...data.homepage,
                              hero: { ...data.homepage.hero, subheadline: editValues['hero-subheadline'] || data.homepage.hero.subheadline },
                            },
                          });
                          setEditingKey(null);
                        }}
                        className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg self-start"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="group relative flex items-start justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800">
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {data.homepage.hero.subheadline}
                      </p>
                      <button
                        onClick={() => {
                          setEditingKey('hero-subheadline');
                          setEditValues({ 'hero-subheadline': data.homepage.hero.subheadline });
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-indigo-600 transition-opacity ml-2 cursor-pointer"
                        title="Edit subheadline"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Primary CTA */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Primary CTA Button Text:
                  </span>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 rounded-xl border border-indigo-200 dark:border-indigo-800 font-bold text-sm">
                    <span>[ {data.homepage.hero.primaryCta} ]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Value Proposition */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Value Proposition
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRegenerateValueProp}
                    disabled={regeneratingKey === 'valueProp'}
                    className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Regenerate Value Prop"
                  >
                    <RotateCw className={`w-4 h-4 ${regeneratingKey === 'valueProp' ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(data.homepage.valueProposition, 'valueProp', 'Value Proposition')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedKey === 'valueProp' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'valueProp' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {editingKey === 'valueProp' ? (
                <div className="space-y-2">
                  <textarea
                    rows={4}
                    value={editValues['valueProp'] ?? data.homepage.valueProposition}
                    onChange={(e) => setEditValues({ ...editValues, valueProp: e.target.value })}
                    className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingKey(null)}
                      className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onUpdateData({
                          ...data,
                          homepage: { ...data.homepage, valueProposition: editValues['valueProp'] || data.homepage.valueProposition },
                        });
                        setEditingKey(null);
                      }}
                      className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group relative p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {data.homepage.valueProposition}
                  </p>
                  <button
                    onClick={() => {
                      setEditingKey('valueProp');
                      setEditValues({ valueProp: data.homepage.valueProposition });
                    }}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-indigo-600 transition-opacity cursor-pointer"
                    title="Edit text"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Card 3: About Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    About Section Copy
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRegenerateAbout}
                    disabled={regeneratingKey === 'about'}
                    className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Regenerate About section"
                  >
                    <RotateCw className={`w-4 h-4 ${regeneratingKey === 'about' ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(data.homepage.aboutSection, 'about', 'About section')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedKey === 'about' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'about' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {editingKey === 'about' ? (
                <div className="space-y-2">
                  <textarea
                    rows={4}
                    value={editValues['about'] ?? data.homepage.aboutSection}
                    onChange={(e) => setEditValues({ ...editValues, about: e.target.value })}
                    className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingKey(null)}
                      className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onUpdateData({
                          ...data,
                          homepage: { ...data.homepage, aboutSection: editValues['about'] || data.homepage.aboutSection },
                        });
                        setEditingKey(null);
                      }}
                      className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group relative p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {data.homepage.aboutSection}
                  </p>
                  <button
                    onClick={() => {
                      setEditingKey('about');
                      setEditValues({ about: data.homepage.aboutSection });
                    }}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-indigo-600 transition-opacity cursor-pointer"
                    title="Edit text"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Card 4: Why Choose Us (3-5 benefit-focused points) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                    4
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Why Choose Us (Benefit Points)
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRegenerateWhyChoose}
                    disabled={regeneratingKey === 'whyChoose'}
                    className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Regenerate points"
                  >
                    <RotateCw className={`w-4 h-4 ${regeneratingKey === 'whyChoose' ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => {
                      const text = data.homepage.whyChooseUs
                        .map((w, i) => `${i + 1}. ${w.title}\n${w.description}`)
                        .join('\n\n');
                      copyToClipboard(text, 'whyChoose', 'Why Choose Us points');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedKey === 'whyChoose' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'whyChoose' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.homepage.whyChooseUs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 5: Trust Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                    5
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Trust & Credibility Messaging
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRegenerateTrust}
                    disabled={regeneratingKey === 'trust'}
                    className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Regenerate Trust section"
                  >
                    <RotateCw className={`w-4 h-4 ${regeneratingKey === 'trust' ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => {
                      const text = `Badge: ${data.homepage.trustSection.badge}\nStatement: ${data.homepage.trustSection.statement}\nProof Points:\n${data.homepage.trustSection.proofPoints.map((p) => `- ${p}`).join('\n')}`;
                      copyToClipboard(text, 'trust', 'Trust section');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedKey === 'trust' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'trust' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800">
                    {data.homepage.trustSection.badge}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {data.homepage.trustSection.statement}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {data.homepage.trustSection.proofPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg"
                    >
                      <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES COPY */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Individual Service Breakdown ({data.services.length} Services)
                </h3>
                <p className="text-xs text-slate-500">
                  Generated with benefit points, what to expect, and tailored CTAs for each offering.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRegenerateAllServices}
                  disabled={regeneratingKey === 'allServices'}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${regeneratingKey === 'allServices' ? 'animate-spin' : ''}`} />
                  <span>Regenerate All Services</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {service.serviceName}
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          const text = `${service.serviceName}\n\nDescription: ${service.shortDescription}\n\nBenefits:\n${service.benefits.map((b) => `- ${b}`).join('\n')}\n\nWhat to Expect: ${service.whatToExpect}\nCTA: ${service.cta}`;
                          copyToClipboard(text, service.id, service.serviceName);
                        }}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Copy service copy"
                      >
                        {copiedKey === service.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Key Benefits */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        Key Benefits:
                      </span>
                      {service.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* What to Expect */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        What to Expect:
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {service.whatToExpect}
                      </p>
                    </div>
                  </div>

                  {/* CTA Tag */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      CTA: [ {service.cta} ]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CALL TO ACTION (CTA) VARIATIONS */}
        {activeTab === 'cta' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Call To Action (CTA) Variations
                </h3>
                <p className="text-xs text-slate-500">
                  Multiple tested conversion hooks aligned with your brand tone and customer intent.
                </p>
              </div>

              <button
                onClick={handleRegenerateCtas}
                disabled={regeneratingKey === 'ctas'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCw className={`w-3.5 h-3.5 ${regeneratingKey === 'ctas' ? 'animate-spin' : ''}`} />
                <span>Regenerate CTAs</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { key: 'primary', label: '1. Primary Conversion CTA', data: data.callToAction.primaryCta },
                { key: 'contact', label: '2. Direct Contact CTA', data: data.callToAction.contactCta },
                { key: 'enquiry', label: '3. Custom Enquiry CTA', data: data.callToAction.enquiryCta },
                { key: 'location', label: '4. Location & Visit CTA', data: data.callToAction.locationCta },
              ].map((item) => (
                <div
                  key={item.key}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <button
                        onClick={() => {
                          const text = `Headline: ${item.data.headline}\nSubtext: ${item.data.subtext}\nButton: ${item.data.buttonText}`;
                          copyToClipboard(text, `cta-${item.key}`, item.label);
                        }}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Copy CTA"
                      >
                        {copiedKey === `cta-${item.key}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {item.data.headline}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                      {item.data.subtext}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Recommended Button Label:</span>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-xl font-bold text-xs border border-indigo-200 dark:border-indigo-800">
                      <span>{item.data.buttonText}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LIVE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="animate-in fade-in duration-300">
            <LiveWebsitePreview copyData={data} />
          </div>
        )}
      </div>
    </section>
  );
};
