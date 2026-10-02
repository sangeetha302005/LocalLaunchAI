import React from 'react';
import { ClipboardList, Sparkles, Edit3, Globe2, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const steps = [
    {
      step: '01',
      title: 'Enter Business Details',
      description:
        'Tell LocalLaunch AI about your business name, category, location, services offered, target audience, USPs, and brand tone.',
      icon: ClipboardList,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      step: '02',
      title: 'Generate Website Copy',
      description:
        'Our prompt synthesis engine analyzes every parameter to write cohesive Homepage, Services, and CTA copy tailored specifically to your audience.',
      icon: Sparkles,
      color: 'from-indigo-600 to-purple-600',
    },
    {
      step: '03',
      title: 'Review, Edit & Regenerate',
      description:
        'Easily tweak generated sections inline, regenerate single headlines or descriptions, and see a live interactive preview of how it looks on a real site.',
      icon: Edit3,
      color: 'from-purple-600 to-pink-600',
    },
    {
      step: '04',
      title: 'Use on Your Website',
      description:
        'Copy any section with 1 click, or export the complete copy as Markdown, Plain Text, or formatted PDF ready for WordPress, Webflow, Shopify, or custom code.',
      icon: Globe2,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            How LocalLaunch AI Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            From empty form to high-converting, publish-ready website copy in less than 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 dark:text-slate-800 group-hover:text-indigo-200 dark:group-hover:text-indigo-900 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 dark:text-slate-700 pointer-events-none">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group cursor-pointer"
          >
            <span>Try it now with your business</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
