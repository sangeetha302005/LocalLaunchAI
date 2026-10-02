import React from 'react';
import { Sparkles, ArrowRight, Layout, CheckCircle, ShieldCheck, Zap, Globe, Layers, Eye } from 'lucide-react';

interface HeroSectionProps {
  onScrollToGenerator: () => void;
  onExploreExamples: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToGenerator,
  onExploreExamples,
}) => {
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] md:w-[900px] md:h-[450px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/15 blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-blue-500/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/15 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-8 shadow-sm backdrop-blur-sm animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span>Turn Your Local Business Into Powerful Words</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-slate-500 dark:text-slate-400 font-normal hidden sm:inline">
            Fast • Conversion-Optimized • Zero Generic Fluff
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          AI Website Copy Generator for{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Local Businesses
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          Create professional, website-ready content for your business in seconds. Enter your services, location, and tone—get ready-to-publish homepage sections, service descriptions, and high-converting CTAs tailored to your market.
        </p>

        {/* Deliverables Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <Layout className="w-4 h-4 text-indigo-500" />
            <span>Complete Homepage Copy</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <Layers className="w-4 h-4 text-purple-500" />
            <span>Detailed Services Breakdown</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <Zap className="w-4 h-4 text-pink-500" />
            <span>4x Conversion CTA Variations</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <Eye className="w-4 h-4 text-emerald-500" />
            <span>Interactive Live Website Preview</span>
          </div>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={onScrollToGenerator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/45 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Generate Website Copy</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreExamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-all"
          >
            <span>See 6 Business Examples</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>No unsupported medical/legal claims</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>100% Tailored to your local market</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-500" />
            <span>Instant export to TXT, MD, PDF & Web</span>
          </div>
        </div>
      </div>
    </section>
  );
};
