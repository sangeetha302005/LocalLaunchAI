import React from 'react';
import { Rocket, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                LocalLaunch<span className="text-indigo-400">.AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Turn your local business into powerful words. Generate conversion-optimized homepage copy, service breakdowns, and CTA variations in seconds.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Production-Ready Local SaaS Architecture</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Copy Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('examples')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Business Examples
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Categories
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['Salons', 'Cafes', 'Clinics', 'Agencies', 'Gyms', 'Coaching', 'Spas', 'Dentists', 'Boutiques'].map(
                (cat) => (
                  <span
                    key={cat}
                    className="px-2 py-1 bg-slate-800 text-slate-300 rounded-md border border-slate-700/60"
                  >
                    {cat}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LocalLaunch AI. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" />
            <span>for local businesses worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
