import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ExamplesGallery } from './components/ExamplesGallery';
import { GeneratorForm } from './components/GeneratorForm';
import { OutputDashboard } from './components/OutputDashboard';
import { SavedProjectsDrawer } from './components/SavedProjectsDrawer';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import type { BusinessInput, GeneratedWebsiteCopy, ExamplePreset } from './types';
import { generateWebsiteCopy } from './services/aiGenerator';
import { EXAMPLE_PRESETS } from './data/examples';

const STORAGE_KEY = 'locallaunch_saved_projects';

export const App: React.FC = () => {
  const [currentInput, setCurrentInput] = useState<BusinessInput>(EXAMPLE_PRESETS[0].input);
  const [generatedData, setGeneratedData] = useState<GeneratedWebsiteCopy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [savedProjects, setSavedProjects] = useState<GeneratedWebsiteCopy[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Load saved projects on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedProjects(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading saved projects:', e);
    }
  }, []);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fireCelebration = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'],
      });
    } catch {
      // ignore
    }
  };

  const handleGenerate = async (input: BusinessInput) => {
    setIsLoading(true);
    setCurrentInput(input);

    try {
      const result = await generateWebsiteCopy(input, (step) => {
        setLoadingStep(step);
      });

      setGeneratedData(result);
      setIsLoading(false);
      fireCelebration();
      addToast(`Generated tailored website copy for ${input.businessName}!`, 'success');

      setTimeout(() => {
        const dashboard = document.getElementById('output-dashboard');
        dashboard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      setIsLoading(false);
      addToast(err?.message || 'Failed to generate website copy. Please try again.', 'error');
    }
  };

  const handleSelectExample = async (example: ExamplePreset) => {
    setCurrentInput(example.input);
    addToast(`Loaded preset for ${example.title}`, 'info');

    // Auto generate for immediate feedback
    handleGenerate(example.input);
  };

  const handleSaveProject = (data: GeneratedWebsiteCopy) => {
    try {
      const exists = savedProjects.some((p) => p.id === data.id);
      let updated: GeneratedWebsiteCopy[];

      if (exists) {
        updated = savedProjects.map((p) => (p.id === data.id ? data : p));
      } else {
        updated = [data, ...savedProjects];
      }

      setSavedProjects(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      addToast(`Saved "${data.input.businessName}" to projects!`, 'success');
    } catch {
      addToast('Failed to save project to local storage.', 'error');
    }
  };

  const handleDeleteProject = (id: string) => {
    const updated = savedProjects.filter((p) => p.id !== id);
    setSavedProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    addToast('Deleted project from saved list.', 'info');
  };

  const handleLoadProject = (project: GeneratedWebsiteCopy) => {
    setCurrentInput(project.input);
    setGeneratedData(project);
    addToast(`Loaded "${project.input.businessName}"`, 'info');
    setTimeout(() => {
      const dashboard = document.getElementById('output-dashboard');
      dashboard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notifications Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Saved Projects Drawer Modal */}
      <SavedProjectsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProjects={savedProjects}
        onLoadProject={handleLoadProject}
        onDeleteProject={handleDeleteProject}
      />

      {/* Navigation Bar */}
      <Navbar
        onNavigate={handleNavigate}
        savedCount={savedProjects.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onScrollToGenerator={() => handleNavigate('generator')}
          onExploreExamples={() => handleNavigate('examples')}
        />

        {/* Generator Form Section */}
        <GeneratorForm
          initialInput={currentInput}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          loadingStep={loadingStep}
        />

        {/* Generated Copy Output Dashboard */}
        {generatedData && (
          <OutputDashboard
            data={generatedData}
            onUpdateData={(updated) => setGeneratedData(updated)}
            onSaveProject={handleSaveProject}
            onShowToast={addToast}
          />
        )}

        {/* How It Works Section */}
        <HowItWorksSection onGetStarted={() => handleNavigate('generator')} />

        {/* 6 Real-world Business Examples Gallery */}
        <ExamplesGallery onSelectExample={handleSelectExample} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
