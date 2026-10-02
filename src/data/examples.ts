import type { ExamplePreset } from '../types';

export const EXAMPLE_PRESETS: ExamplePreset[] = [
  {
    id: 'glow-beauty',
    title: 'Glow Beauty Studio',
    category: 'Salon',
    badge: 'Popular',
    description: 'Boutique hair and beauty studio focusing on bespoke styling, organic treatments, and bridal makeovers.',
    input: {
      businessName: 'Glow Beauty Studio',
      businessType: 'Salon',
      location: 'Bengaluru, Indiranagar',
      services: ['Haircut & Styling', 'Organic Hair Spa', 'Custom Facial', 'Bridal Makeup'],
      targetAudience: 'Women aged 18–40 looking for personalized care and relaxing salon experiences',
      usps: 'Experienced senior stylists, ammonia-free cruelty-free products, tranquil aesthetic ambiance',
      brandTone: 'Premium',
      additionalInfo: 'Offers private consultation rooms for bridal parties and bridal trial sessions.'
    }
  },
  {
    id: 'roast-ritual',
    title: 'Roast & Ritual Specialty Cafe',
    category: 'Cafe',
    badge: 'Trendy',
    description: 'Artisanal micro-roastery and cafe known for single-origin brews, fresh sourdough, and cozy work vibes.',
    input: {
      businessName: 'Roast & Ritual Cafe',
      businessType: 'Cafe',
      location: 'Koramangala, Bengaluru',
      services: ['Single-Origin Pour-Overs', 'Artisanal Espresso', 'Fresh Sourdough Bakes', 'Weekend Coffee Workshops'],
      targetAudience: 'Remote workers, coffee connoisseurs, and neighborhood creatives seeking quality brews and quiet corners',
      usps: 'Ethically sourced shade-grown beans, in-house master roaster, high-speed WiFi with comfortable work seating',
      brandTone: 'Warm',
      additionalInfo: 'Pet-friendly patio and seasonal specialty drink menus.'
    }
  },
  {
    id: 'apex-physio',
    title: 'Apex Integrative Physiotherapy',
    category: 'Clinic',
    badge: 'Healthcare',
    description: 'Modern evidence-based physical therapy and sports rehabilitation clinic.',
    input: {
      businessName: 'Apex Integrative Physio',
      businessType: 'Clinic',
      location: 'HSR Layout, Bengaluru',
      services: ['Sports Injury Rehab', 'Posture Correction', 'Post-Op Recovery', 'Dry Needling Therapy'],
      targetAudience: 'Active adults, desk workers suffering from chronic pain, and recreational athletes recovering from injury',
      usps: 'One-on-one 45-minute sessions, evidence-based manual therapy, modern biomechanics equipment',
      brandTone: 'Professional',
      additionalInfo: 'Direct billing with major health insurances and customized home exercise smartphone app plans.'
    }
  },
  {
    id: 'pulse-digital',
    title: 'Pulse Growth Media',
    category: 'Agency',
    badge: 'B2B',
    description: 'Performance marketing and brand identity agency helping regional SMBs scale revenue.',
    input: {
      businessName: 'Pulse Growth Media',
      businessType: 'Agency',
      location: 'MG Road, Bengaluru',
      services: ['Meta & Google Ads Management', 'SEO & Local Search', 'Brand Identity Design', 'Conversion Rate Optimization'],
      targetAudience: 'DTC brands and high-ticket local service businesses wanting predictable lead pipelines',
      usps: 'Transparent ROI dashboard, data-backed creative testing, dedicated growth strategist per client',
      brandTone: 'Confident',
      additionalInfo: 'Monthly rolling contracts with no hidden lock-ins.'
    }
  },
  {
    id: 'iron-haven',
    title: 'Iron Haven Strength Club',
    category: 'Gym',
    badge: 'Fitness',
    description: 'Community-first functional strength, powerlifting, and athletic conditioning gym.',
    input: {
      businessName: 'Iron Haven Strength Club',
      businessType: 'Gym',
      location: 'Whitefield, Bengaluru',
      services: ['Semi-Private Strength Training', 'Open Gym Access', 'Nutrition Coaching', 'Mobility & Recovery Classes'],
      targetAudience: 'Beginner to advanced lifters who value proper form, supportive coaching, and zero toxic gym culture',
      usps: 'Competition-grade calibrated equipment, certified biomechanics coaches, capped membership to eliminate crowding',
      brandTone: 'Modern',
      additionalInfo: 'Complimentary form analysis and body composition screening on sign up.'
    }
  },
  {
    id: 'catalyst-academy',
    title: 'Catalyst STEM Learning Hub',
    category: 'Coaching Institute',
    badge: 'Education',
    description: 'Concept-focused STEM tuition and competitive exam prep institute for secondary students.',
    input: {
      businessName: 'Catalyst STEM Academy',
      businessType: 'Coaching Institute',
      location: 'Jayanagar, Bengaluru',
      services: ['Foundation Mathematics & Science (Grades 8–10)', 'IIT-JEE/NEET Concept Modules', '1-on-1 Doubt Solving', 'Weekly Diagnostic Mock Tests'],
      targetAudience: 'Parents and ambitious students aiming for conceptual clarity, confidence, and top academic scores',
      usps: 'Small batch sizes (max 15 students), visual first-principles pedagogy, comprehensive periodic parent feedback reports',
      brandTone: 'Friendly',
      additionalInfo: 'Hybrid classroom system with recorded lectures available for revision.'
    }
  }
];
