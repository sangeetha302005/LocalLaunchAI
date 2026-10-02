import React, { useState } from 'react';
import type { GeneratedWebsiteCopy } from '../types';
import {
  Monitor,
  Smartphone,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';

interface LiveWebsitePreviewProps {
  copyData: GeneratedWebsiteCopy;
}

type PreviewTheme = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose';

export const LiveWebsitePreview: React.FC<LiveWebsitePreviewProps> = ({ copyData }) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [theme, setTheme] = useState<PreviewTheme>('indigo');

  const { input, homepage, services, callToAction } = copyData;

  const themeStyles = {
    indigo: {
      accentBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      accentText: 'text-indigo-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      heroGradient: 'from-indigo-50 via-white to-purple-50',
      cardBorder: 'hover:border-indigo-300',
      ctaBanner: 'bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white',
    },
    emerald: {
      accentBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      accentText: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      heroGradient: 'from-emerald-50 via-white to-teal-50',
      cardBorder: 'hover:border-emerald-300',
      ctaBanner: 'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white',
    },
    violet: {
      accentBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      accentText: 'text-purple-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      heroGradient: 'from-purple-50 via-white to-pink-50',
      cardBorder: 'hover:border-purple-300',
      ctaBanner: 'bg-gradient-to-r from-purple-950 via-purple-900 to-pink-950 text-white',
    },
    amber: {
      accentBg: 'bg-amber-600 hover:bg-amber-700 text-white',
      accentText: 'text-amber-600',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      heroGradient: 'from-amber-50/60 via-white to-orange-50/60',
      cardBorder: 'hover:border-amber-300',
      ctaBanner: 'bg-gradient-to-r from-amber-950 via-amber-900 to-slate-900 text-white',
    },
    rose: {
      accentBg: 'bg-rose-600 hover:bg-rose-700 text-white',
      accentText: 'text-rose-600',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      heroGradient: 'from-rose-50 via-white to-pink-50',
      cardBorder: 'hover:border-rose-300',
      ctaBanner: 'bg-gradient-to-r from-rose-950 via-rose-900 to-slate-900 text-white',
    },
  }[theme];

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-100 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Preview Viewport:
          </span>
          <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                device === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                device === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Color Theme:
          </span>
          <div className="flex items-center gap-1.5">
            {(['indigo', 'emerald', 'violet', 'amber', 'rose'] as PreviewTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-6 h-6 rounded-full border-2 transition-transform capitalize cursor-pointer ${
                  theme === t ? 'scale-125 ring-2 ring-indigo-400 border-white' : 'border-transparent opacity-70 hover:opacity-100'
                } ${
                  t === 'indigo'
                    ? 'bg-indigo-600'
                    : t === 'emerald'
                    ? 'bg-emerald-600'
                    : t === 'violet'
                    ? 'bg-purple-600'
                    : t === 'amber'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                title={`Theme: ${t}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Browser Mockup Window */}
      <div className="flex justify-center transition-all duration-300">
        <div
          className={`bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-300/80 overflow-hidden transition-all duration-300 ${
            device === 'desktop' ? 'w-full max-w-5xl' : 'w-full max-w-[390px]'
          }`}
        >
          {/* Simulated Browser Frame Bar */}
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-sm mx-4 bg-white px-3 py-1 rounded-md text-[11px] text-slate-500 border border-slate-200 flex items-center justify-center gap-1 font-mono truncate">
              <span className="text-slate-400">https://</span>
              <span className="font-semibold text-slate-700">
                {input.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
              </span>
            </div>

            <div className="text-[10px] text-slate-400 font-medium hidden sm:block">
              {device === 'desktop' ? '1280 × 800' : '390 × 844'}
            </div>
          </div>

          {/* Website Content Area */}
          <div className="max-h-[720px] overflow-y-auto">
            {/* Website Mockup Navbar */}
            <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  {input.businessName.charAt(0)}
                </div>
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {input.businessName}
                </span>
              </div>

              {device === 'desktop' && (
                <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
                  <span className="hover:text-slate-900 cursor-pointer">Services</span>
                  <span className="hover:text-slate-900 cursor-pointer">About Us</span>
                  <span className="hover:text-slate-900 cursor-pointer">Why Choose Us</span>
                  <span className="hover:text-slate-900 cursor-pointer">Contact</span>
                </div>
              )}

              <button className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${themeStyles.accentBg}`}>
                {homepage.hero.primaryCta}
              </button>
            </header>

            {/* Simulated Hero Section */}
            <section className={`px-6 py-12 sm:py-16 text-center bg-gradient-to-b ${themeStyles.heroGradient} border-b border-slate-100`}>
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{input.location}</span>
                  <span className="text-slate-300">•</span>
                  <span className={themeStyles.accentText}>{input.businessType}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {homepage.hero.headline}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  {homepage.hero.subheadline}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button className={`px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 ${themeStyles.accentBg}`}>
                    <span>{homepage.hero.primaryCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="px-5 py-3 rounded-xl text-sm font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all">
                    {callToAction.contactCta.buttonText}
                  </button>
                </div>
              </div>
            </section>

            {/* Value Proposition Strip */}
            <section className="px-6 py-10 bg-slate-50 border-b border-slate-100">
              <div className="max-w-3xl mx-auto text-center space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Value Proposition
                </span>
                <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed italic">
                  "{homepage.valueProposition}"
                </p>
              </div>
            </section>

            {/* Services Grid */}
            <section className="px-6 py-12 bg-white">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Our Services
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Tailored Offerings in {input.location}
                  </h2>
                </div>

                <div className={`grid gap-5 ${device === 'desktop' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {services.map((svc) => (
                    <div
                      key={svc.id}
                      className={`p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between transition-all ${themeStyles.cardBorder}`}
                    >
                      <div>
                        <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                          <span>{svc.serviceName}</span>
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        </h3>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          {svc.shortDescription}
                        </p>

                        <div className="space-y-1 mb-4">
                          {svc.benefits.map((b, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-medium">
                          {svc.whatToExpect}
                        </span>
                        <button className={`text-xs font-bold ${themeStyles.accentText} hover:underline shrink-0 ml-2`}>
                          {svc.cta} →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About & Trust Section */}
            <section className="px-6 py-12 bg-slate-50 border-t border-slate-100">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    About {input.businessName}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Dedicated {input.businessType} Care in {input.location}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {homepage.aboutSection}
                  </p>
                </div>

                {/* Trust Card */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-xs uppercase text-slate-800">
                      {homepage.trustSection.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {homepage.trustSection.statement}
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {homepage.trustSection.proofPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Why Choose Us 4-Cards */}
            <section className="px-6 py-12 bg-white border-t border-slate-100">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Why Choose {input.businessName}?
                  </h2>
                </div>

                <div className={`grid gap-4 ${device === 'desktop' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {homepage.whyChooseUs.map((w, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{w.title}</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed pl-5">
                        {w.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA Banner */}
            <section className={`px-6 py-12 text-center ${themeStyles.ctaBanner}`}>
              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-xl sm:text-2xl font-black">
                  {callToAction.primaryCta.headline}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200">
                  {callToAction.primaryCta.subtext}
                </p>
                <div className="pt-2">
                  <button className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-xl transition-all">
                    {callToAction.primaryCta.buttonText}
                  </button>
                </div>
              </div>
            </section>

            {/* Mockup Footer */}
            <footer className="px-6 py-6 bg-slate-900 text-slate-400 text-[11px] text-center border-t border-slate-800">
              <p>© {new Date().getFullYear()} {input.businessName}. All rights reserved. • {input.location}</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
