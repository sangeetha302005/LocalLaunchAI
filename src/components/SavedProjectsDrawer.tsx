import React from 'react';
import type { GeneratedWebsiteCopy } from '../types';
import { X, Trash2, ArrowUpRight, Clock, Building2, MapPin, Download } from 'lucide-react';
import { exportAsPdf } from '../utils/exporter';

interface SavedProjectsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProjects: GeneratedWebsiteCopy[];
  onLoadProject: (project: GeneratedWebsiteCopy) => void;
  onDeleteProject: (id: string) => void;
}

export const SavedProjectsDrawer: React.FC<SavedProjectsDrawerProps> = ({
  isOpen,
  onClose,
  savedProjects,
  onLoadProject,
  onDeleteProject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Saved Copy Projects
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {savedProjects.length} {savedProjects.length === 1 ? 'project' : 'projects'} saved locally
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProjects.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  No Saved Projects Yet
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Generate website copy for any business and click "Save Project" to store it here for future reference.
                </p>
              </div>
            ) : (
              savedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {proj.input.businessName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <span>{proj.input.businessType}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3 text-rose-500" />
                        <span>{proj.input.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                    "{proj.homepage.hero.headline}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(proj.timestamp).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => exportAsPdf(proj)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-md text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        title="Export as PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onLoadProject(proj);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all cursor-pointer"
                      >
                        <span>Load</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
