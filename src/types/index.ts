export type BusinessType =
  | 'Salon'
  | 'Cafe'
  | 'Restaurant'
  | 'Clinic'
  | 'Coaching Institute'
  | 'Agency'
  | 'Gym'
  | 'Spa'
  | 'Dental Clinic'
  | 'Boutique'
  | 'Freelancer'
  | 'Other';

export type BrandTone =
  | 'Friendly'
  | 'Professional'
  | 'Modern'
  | 'Premium'
  | 'Confident'
  | 'Warm'
  | 'Simple';

export interface BusinessInput {
  businessName: string;
  businessType: BusinessType;
  location: string;
  services: string[];
  targetAudience: string;
  usps: string;
  brandTone: BrandTone;
  additionalInfo?: string;
  customApiKey?: string;
}

export interface HeroSectionCopy {
  headline: string;
  subheadline: string;
  primaryCta: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export interface TrustSectionCopy {
  badge: string;
  statement: string;
  proofPoints: string[];
}

export interface HomepageCopy {
  hero: HeroSectionCopy;
  valueProposition: string;
  aboutSection: string;
  whyChooseUs: WhyChooseUsItem[];
  trustSection: TrustSectionCopy;
}

export interface ServiceItemCopy {
  id: string;
  serviceName: string;
  shortDescription: string;
  benefits: string[];
  whatToExpect: string;
  cta: string;
}

export interface CtaVariation {
  type: 'primary' | 'contact' | 'enquiry' | 'location';
  title: string;
  headline: string;
  subtext: string;
  buttonText: string;
}

export interface CtaCopy {
  primaryCta: CtaVariation;
  contactCta: CtaVariation;
  enquiryCta: CtaVariation;
  locationCta: CtaVariation;
}

export interface GeneratedWebsiteCopy {
  id: string;
  timestamp: number;
  input: BusinessInput;
  homepage: HomepageCopy;
  services: ServiceItemCopy[];
  callToAction: CtaCopy;
}

export interface ExamplePreset {
  id: string;
  title: string;
  category: BusinessType;
  badge: string;
  description: string;
  input: BusinessInput;
}
