import React from 'react';
import { EXAMPLE_PRESETS } from '../data/examples';
import type { ExamplePreset } from '../types';
import { Sparkles, MapPin, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ExamplesGalleryProps {
  onSelectExample: (example: ExamplePreset) => void;
}

export const ExamplesGallery: React.FC<ExamplesGalleryProps> = ({ onSelectExample }) => {
  return (
    <section id="examples" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
            Real-World Presets
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            See LocalLaunch AI in Action Across Industries
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Explore 6 ready-made business profiles. Click any card to instantly load its details into the generator and preview tailored website copy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAMPLE_PRESETS.map((ex) => (
            <div
              key={ex.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200/60 dark:border-indigo-800/60">
                    {ex.category}
                  </span>
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {ex.badge}
                  </span>
                </div>

                {/* Business Name */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  {ex.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{ex.input.location}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    Tone: {ex.input.brandTone}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                  {ex.description}
                </p>

                {/* Services List */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Key Services:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ex.input.services.slice(0, 3).map((s, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md font-medium"
                      >
                        <Tag className="w-2.5 h-2.5 text-slate-400" />
                        {s}
                      </span>
                    ))}
                    {ex.input.services.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md font-medium">
                        +{ex.input.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectExample(ex)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all group-hover:shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Load & Generate Copy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
