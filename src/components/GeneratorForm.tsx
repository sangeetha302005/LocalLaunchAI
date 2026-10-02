import React, { useState, useEffect } from 'react';
import type { BusinessInput, BusinessType, BrandTone } from '../types';
import {
  Sparkles,
  Building2,
  MapPin,
  ListPlus,
  Users,
  Award,
  Sliders,
  FileText,
  AlertCircle,
  RotateCcw,
  Plus,
  X,
  Loader2,
  Key,
} from 'lucide-react';

interface GeneratorFormProps {
  initialInput?: BusinessInput;
  onGenerate: (input: BusinessInput) => void;
  isLoading: boolean;
  loadingStep: string;
}

const BUSINESS_TYPES: BusinessType[] = [
  'Salon',
  'Cafe',
  'Restaurant',
  'Clinic',
  'Coaching Institute',
  'Agency',
  'Gym',
  'Spa',
  'Dental Clinic',
  'Boutique',
  'Freelancer',
  'Other',
];

const BRAND_TONES: { tone: BrandTone; label: string; desc: string }[] = [
  { tone: 'Friendly', label: 'Friendly', desc: 'Warm, conversational & approachable' },
  { tone: 'Professional', label: 'Professional', desc: 'Authoritative, clear & trustworthy' },
  { tone: 'Modern', label: 'Modern', desc: 'Sleek, tech-forward & streamlined' },
  { tone: 'Premium', label: 'Premium', desc: 'Exclusive, elegant & high-end' },
  { tone: 'Confident', label: 'Confident', desc: 'Bold, results-focused & decisive' },
  { tone: 'Warm', label: 'Warm', desc: 'Cozy, heartfelt & community-focused' },
  { tone: 'Simple', label: 'Simple', desc: 'Direct, clear & jargon-free' },
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  initialInput,
  onGenerate,
  isLoading,
  loadingStep,
}) => {
  const [businessName, setBusinessName] = useState(initialInput?.businessName || '');
  const [businessType, setBusinessType] = useState<BusinessType>(initialInput?.businessType || 'Salon');
  const [location, setLocation] = useState(initialInput?.location || '');
  const [services, setServices] = useState<string[]>(initialInput?.services || ['Haircut & Styling', 'Facial', 'Bridal Makeup']);
  const [serviceInput, setServiceInput] = useState('');
  const [targetAudience, setTargetAudience] = useState(initialInput?.targetAudience || '');
  const [usps, setUsps] = useState(initialInput?.usps || '');
  const [brandTone, setBrandTone] = useState<BrandTone>(initialInput?.brandTone || 'Premium');
  const [additionalInfo, setAdditionalInfo] = useState(initialInput?.additionalInfo || '');
  const [customApiKey, setCustomApiKey] = useState(initialInput?.customApiKey || '');
  const [showApiKeyField, setShowApiKeyField] = useState(false);

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialInput) {
      setBusinessName(initialInput.businessName);
      setBusinessType(initialInput.businessType);
      setLocation(initialInput.location);
      setServices(initialInput.services);
      setTargetAudience(initialInput.targetAudience);
      setUsps(initialInput.usps);
      setBrandTone(initialInput.brandTone);
      setAdditionalInfo(initialInput.additionalInfo || '');
      setCustomApiKey(initialInput.customApiKey || '');
      setErrors({});
    }
  }, [initialInput]);

  const handleAddService = () => {
    if (!serviceInput.trim()) return;

    // Handle comma-separated input
    const parts = serviceInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated = Array.from(new Set([...services, ...parts]));
    setServices(updated);
    setServiceInput('');
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: '' }));
    }
  };

  const handleServiceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddService();
    }
  };

  const handleRemoveService = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!businessName.trim()) {
      newErrors.businessName = 'Business name is required.';
    }
    if (!location.trim()) {
      newErrors.location = 'Location (city/neighborhood) is required.';
    }
    if (services.length === 0 && !serviceInput.trim()) {
      newErrors.services = 'Please add at least one service or offering.';
    }
    if (!targetAudience.trim()) {
      newErrors.targetAudience = 'Please describe your target audience.';
    }
    if (!usps.trim()) {
      newErrors.usps = 'Please specify unique selling points or key advantages.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let currentServices = [...services];
    if (serviceInput.trim()) {
      const parts = serviceInput
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      currentServices = Array.from(new Set([...currentServices, ...parts]));
      setServices(currentServices);
      setServiceInput('');
    }

    if (!validate()) {
      const firstError = document.querySelector('.form-error-item');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const payload: BusinessInput = {
      businessName: businessName.trim(),
      businessType,
      location: location.trim(),
      services: currentServices,
      targetAudience: targetAudience.trim(),
      usps: usps.trim(),
      brandTone,
      additionalInfo: additionalInfo.trim() || undefined,
      customApiKey: customApiKey.trim() || undefined,
    };

    onGenerate(payload);
  };

  const handleReset = () => {
    setBusinessName('');
    setBusinessType('Salon');
    setLocation('');
    setServices([]);
    setServiceInput('');
    setTargetAudience('');
    setUsps('');
    setBrandTone('Professional');
    setAdditionalInfo('');
    setErrors({});
  };

  return (
    <section id="generator" className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-indigo-500/5 p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle Form Accent Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Form Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-1">
                <Sparkles className="w-4 h-4" />
                <span>AI Copy Generator Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Enter Your Business Details
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Every field directly customizes your generated website copy.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Clear all fields"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Form</span>
              </button>
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Business Name & Business Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className={errors.businessName ? 'form-error-item' : ''}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Business Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                      if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: '' }));
                    }}
                    placeholder="e.g. Glow Beauty Studio"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/50 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                      errors.businessName
                        ? 'border-rose-400 focus:ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                </div>
                {errors.businessName && (
                  <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.businessName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Business Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                >
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Location & Target Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className={errors.location ? 'form-error-item' : ''}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Location / City <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                    }}
                    placeholder="e.g. Bengaluru, Indiranagar"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/50 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                      errors.location
                        ? 'border-rose-400 focus:ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                </div>
                {errors.location && (
                  <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.location}
                  </p>
                )}
              </div>

              <div className={errors.targetAudience ? 'form-error-item' : ''}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Target Audience <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => {
                      setTargetAudience(e.target.value);
                      if (errors.targetAudience) setErrors((prev) => ({ ...prev, targetAudience: '' }));
                    }}
                    placeholder="e.g. Women aged 18–40, busy professionals"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/50 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                      errors.targetAudience
                        ? 'border-rose-400 focus:ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                </div>
                {errors.targetAudience && (
                  <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.targetAudience}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Services (Dynamic Tags Input) */}
            <div className={errors.services ? 'form-error-item' : ''}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Services Offered <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  Press Enter or comma to add multiple services
                </span>
              </div>

              {/* Service Tags Container */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                <div className="flex flex-wrap gap-2 mb-2">
                  {services.map((svc, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800 animate-in fade-in"
                    >
                      <span>{svc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                        className="hover:text-rose-500 focus:outline-none"
                        aria-label={`Remove ${svc}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <ListPlus className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={serviceInput}
                      onChange={(e) => setServiceInput(e.target.value)}
                      onKeyDown={handleServiceKeyDown}
                      placeholder="Type service (e.g. Haircut, Hair Colour, Bridal Makeup) & press Enter"
                      className="w-full pl-8 pr-3 py-1.5 text-sm bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-600 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {errors.services && (
                <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.services}
                </p>
              )}
            </div>

            {/* Row 4: Unique Selling Points (USPs) */}
            <div className={errors.usps ? 'form-error-item' : ''}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Unique Selling Points (USPs) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 text-slate-400 pointer-events-none">
                  <Award className="w-4 h-4" />
                </div>
                <textarea
                  rows={2}
                  value={usps}
                  onChange={(e) => {
                    setUsps(e.target.value);
                    if (errors.usps) setErrors((prev) => ({ ...prev, usps: '' }));
                  }}
                  placeholder="e.g. Experienced staff, premium organic products, relaxing aesthetic environment, zero wait times"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/50 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    errors.usps
                      ? 'border-rose-400 focus:ring-rose-500/20'
                      : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
              {errors.usps && (
                <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.usps}
                </p>
              )}
            </div>

            {/* Row 5: Brand Tone Selection */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Brand Tone</span>
                </label>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  Selected: {brandTone}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {BRAND_TONES.map((item) => {
                  const isSelected = brandTone === item.tone;
                  return (
                    <button
                      key={item.tone}
                      type="button"
                      onClick={() => setBrandTone(item.tone)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-900 dark:text-indigo-200 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs flex items-center justify-between">
                        <span>{item.label}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-tight line-clamp-2">
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 6: Optional Additional Information */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Additional Business Context <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 text-slate-400 pointer-events-none">
                  <FileText className="w-4 h-4" />
                </div>
                <textarea
                  rows={2}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="e.g. Free parking available, weekend workshops, pet-friendly outdoor seating, emergency appointments..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Optional Custom Gemini API Key Collapsible */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowApiKeyField(!showApiKeyField)}
                className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{showApiKeyField ? 'Hide API Settings' : 'Advanced: Add Custom Gemini API Key (Optional)'}</span>
              </button>

              {showApiKeyField && (
                <div className="mt-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    LocalLaunch AI has a built-in neural generation engine and works 100% out of the box. You can optionally supply a custom Google Gemini API key if desired.
                  </p>
                  <input
                    type="password"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              )}
            </div>

            {/* Loading Indicator or Submit Button */}
            <div className="pt-4">
              {isLoading ? (
                <div className="w-full py-4 px-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex flex-col items-center justify-center gap-3 animate-in fade-in">
                  <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Custom Website Copy...</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium text-center">
                    {loadingStep || 'Crafting tailored headlines, service descriptions, and CTAs...'}
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                  <span>✨ Generate Website Copy</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
