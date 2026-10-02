import type {
  BusinessInput,
  BrandTone,
  HomepageCopy,
  ServiceItemCopy,
  CtaCopy,
  GeneratedWebsiteCopy,
  WhyChooseUsItem,
  HeroSectionCopy,
  CtaVariation,
} from '../types';

/**
 * Prompt Framework:
 * Business Type + Location + Services + Target Audience + USPs + Brand Tone + Additional Info
 * = Business-Specific High-Converting Website Copy
 */

// Helpers for Tone Nuance
function getToneVocabulary(tone: BrandTone) {
  switch (tone) {
    case 'Premium':
      return {
        verb: 'elevate',
        adjective: 'refined',
        promise: 'Curated with meticulous attention to detail and unparalleled craftsmanship.',
        action: 'Reserve Your Experience',
        contact: 'Connect with our concierge team',
      };
    case 'Friendly':
      return {
        verb: 'welcome',
        adjective: 'delightful',
        promise: 'A warm, inviting space where you always feel right at home.',
        action: 'Say Hello & Get Started',
        contact: 'Drop us a line anytime',
      };
    case 'Confident':
      return {
        verb: 'dominate',
        adjective: 'proven',
        promise: 'Direct, measurable results built to outperform your expectations.',
        action: 'Claim Your Advantage',
        contact: 'Speak directly with a specialist',
      };
    case 'Modern':
      return {
        verb: 'transform',
        adjective: 'seamless',
        promise: 'Smarter, cleaner, and built for modern lifestyles.',
        action: 'Experience the Difference',
        contact: 'Reach out to our team',
      };
    case 'Warm':
      return {
        verb: 'cherish',
        adjective: 'heartfelt',
        promise: 'Crafted with genuine passion, thoughtful care, and community spirit.',
        action: 'Join Us Today',
        contact: 'We would love to hear from you',
      };
    case 'Simple':
      return {
        verb: 'simplify',
        adjective: 'straightforward',
        promise: 'No clutter, no confusion—just honest, reliable quality you can count on.',
        action: 'Get Started Now',
        contact: 'Ask us anything',
      };
    case 'Professional':
    default:
      return {
        verb: 'deliver',
        adjective: 'trusted',
        promise: 'Dedicated expertise focused on clarity, consistency, and exceptional standards.',
        action: 'Schedule Your Consultation',
        contact: 'Contact our office today',
      };
  }
}

// Generate Hero Section
export function generateHeroCopy(input: BusinessInput): HeroSectionCopy {
  const { businessName, businessType, location, services, targetAudience, usps, brandTone } = input;
  const primaryService = services[0] || 'Quality Services';
  const secondaryService = services[1] || 'Personalized Care';

  let headline = '';
  let subheadline = '';
  let primaryCta = '';

  switch (brandTone) {
    case 'Premium':
      headline = `${location}'s Premier Destination for ${primaryService} & ${businessType} Excellence`;
      subheadline = `Experience refined care tailored for ${targetAudience}. Featuring ${usps} right here in ${location}.`;
      primaryCta = `Book an Exclusive Session`;
      break;
    case 'Friendly':
      headline = `Feel Right at Home with Exceptional ${primaryService} in ${location}`;
      subheadline = `Welcome to ${businessName}! We make ${businessType.toLowerCase()} easy, comfortable, and personalized for ${targetAudience} with ${usps}.`;
      primaryCta = `Book Your Visit Today`;
      break;
    case 'Confident':
      headline = `High-Impact ${primaryService} Engineered for Real Results in ${location}`;
      subheadline = `${businessName} delivers uncompromising ${businessType.toLowerCase()} solutions for ${targetAudience}. Benefit from ${usps} designed to exceed your benchmarks.`;
      primaryCta = `Get Started with ${businessName}`;
      break;
    case 'Warm':
      headline = `Handcrafted with Care: Your Neighborhood ${businessType} in ${location}`;
      subheadline = `At ${businessName}, we believe every visit should feel special. Tailored for ${targetAudience}, bringing you ${usps} every single day.`;
      primaryCta = `Visit Us in ${location}`;
      break;
    case 'Modern':
      headline = `Next-Generation ${primaryService} & ${secondaryService} in ${location}`;
      subheadline = `A streamlined, contemporary approach to ${businessType.toLowerCase()} built specifically for ${targetAudience}. Enjoy ${usps}.`;
      primaryCta = `Explore Services & Book`;
      break;
    case 'Simple':
      headline = `Honest, Reliable ${primaryService} in ${location}`;
      subheadline = `Straightforward ${businessType.toLowerCase()} for ${targetAudience}. No fuss, no compromises—just ${usps}.`;
      primaryCta = `Book an Appointment`;
      break;
    case 'Professional':
    default:
      headline = `Professional ${primaryService} & Dedicated ${businessType} Care in ${location}`;
      subheadline = `${businessName} provides tailored ${primaryService.toLowerCase()} and ${secondaryService.toLowerCase()} for ${targetAudience}, grounded in ${usps}.`;
      primaryCta = `Schedule an Appointment`;
      break;
  }

  return { headline, subheadline, primaryCta };
}

// Generate Value Proposition
export function generateValueProp(input: BusinessInput): string {
  const { businessName, businessType, location, targetAudience, usps, brandTone } = input;
  const toneData = getToneVocabulary(brandTone);

  return `${businessName} bridges the gap between everyday needs and ${toneData.adjective} standards. While many ${businessType.toLowerCase()} providers in ${location} rely on one-size-fits-all routines, we focus entirely on ${targetAudience}. By combining ${usps} with attentive service, we ${toneData.verb} your experience from start to finish—giving you dependable quality without unnecessary complexity.`;
}

// Generate About Section
export function generateAboutSection(input: BusinessInput): string {
  const { businessName, businessType, location, targetAudience, usps, additionalInfo } = input;
  const extraContext = additionalInfo ? ` ${additionalInfo.trim()}` : '';

  return `Located in the heart of ${location}, ${businessName} was established to bring purposeful, high-standard ${businessType.toLowerCase()} services to our local community. We know that ${targetAudience} need solutions that are transparent, welcoming, and genuinely effective. Our team prioritizes ${usps}, ensuring every interaction is tailored to your individual preferences.${extraContext} Whether you are visiting us for the first time or returning as a regular, our commitment remains constant: authentic care and dependable results.`;
}

// Generate Why Choose Us Points (3 - 5 points)
export function generateWhyChooseUs(input: BusinessInput): WhyChooseUsItem[] {
  const { businessType, location, usps, targetAudience, services } = input;
  const uspPoints = usps.split(',').map((s) => s.trim()).filter(Boolean);

  const items: WhyChooseUsItem[] = [
    {
      title: uspPoints[0] ? `Dedicated ${uspPoints[0]}` : `Hyper-Local Focus in ${location}`,
      description: `Conveniently rooted in ${location}, we provide responsive, accessible ${businessType.toLowerCase()} care designed specifically around the daily routines of ${targetAudience}.`,
    },
    {
      title: uspPoints[1] ? `Customer-First ${uspPoints[1]}` : `Tailored Service Options`,
      description: `Every service—including ${services.slice(0, 2).join(' and ')}—is customized to your unique preferences rather than treated as an assembly-line routine.`,
    },
    {
      title: uspPoints[2] ? `Uncompromising ${uspPoints[2]}` : `Transparent & Dependable Experience`,
      description: `We believe in clear communication, zero hidden surprises, and creating an atmosphere where you can feel confident and supported at every stage.`,
    },
    {
      title: `Curated for ${targetAudience}`,
      description: `From our scheduling to our service execution, every detail is engineered to address the specific priorities and expectations of our core community.`,
    },
  ];

  return items;
}

// Generate Trust Section
export function generateTrustSection(input: BusinessInput): { badge: string; statement: string; proofPoints: string[] } {
  const { businessName, businessType, location, usps } = input;

  return {
    badge: `Trusted Local ${businessType}`,
    statement: `At ${businessName}, we build lasting relationships through consistent delivery, honest recommendations, and genuine neighborhood accountability in ${location}.`,
    proofPoints: [
      `Grounded in ${usps}`,
      `Dedicated one-on-one attention for every client`,
      `Transparent pricing with no hidden charges or forced upsells`,
      `Convenient ${location} presence with easy scheduling`,
    ],
  };
}

// Generate Services Copy
export function generateServicesCopy(input: BusinessInput): ServiceItemCopy[] {
  const { location, brandTone, targetAudience } = input;

  return input.services.map((service, index) => {
    const cleanName = service.trim();
    const id = `service-${index + 1}-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    let shortDescription = '';
    let benefits: string[] = [];
    let whatToExpect = '';
    let cta = '';

    switch (brandTone) {
      case 'Premium':
        shortDescription = `An elevated ${cleanName.toLowerCase()} experience meticulously curated for discerning individuals in ${location}.`;
        benefits = [
          `Personalized consultation addressing your exact specifications`,
          `High-touch execution with premium-grade techniques & materials`,
          `Dedicated attention in a serene, distraction-free environment`,
        ];
        whatToExpect = `A comprehensive consultation upon arrival, seamless one-on-one execution, and bespoke aftercare advice tailored to you.`;
        cta = `Reserve Your ${cleanName}`;
        break;
      case 'Friendly':
        shortDescription = `Relaxed, friendly ${cleanName.toLowerCase()} crafted to leave you feeling refreshed, supported, and completely satisfied.`;
        benefits = [
          `A welcoming, stress-free setting from hello to goodbye`,
          `Attentive staff who listen carefully to what you want`,
          `Practical solutions that fit easily into your everyday routine`,
        ];
        whatToExpect = `A warm greeting, a friendly check-in on your goals, skilled service, and a zero-pressure environment throughout.`;
        cta = `Book ${cleanName} Today`;
        break;
      case 'Confident':
        shortDescription = `Results-driven ${cleanName.toLowerCase()} designed to solve your immediate challenges with high efficiency in ${location}.`;
        benefits = [
          `Focused strategy and execution without wasted time`,
          `Measurable outcomes aligned directly with your priorities`,
          `Clear checkpoints and actionable insights at every stage`,
        ];
        whatToExpect = `Direct objective-setting, high-precision delivery by trained hands, and clear measurable takeaways upon completion.`;
        cta = `Get Started with ${cleanName}`;
        break;
      case 'Warm':
        shortDescription = `Thoughtful, heartfelt ${cleanName.toLowerCase()} prepared with genuine passion for the ${location} community.`;
        benefits = [
          `Comfortable, community-centered atmosphere`,
          `Honest recommendations tailored to your personal comfort`,
          `Reliable quality you can come back to time and again`,
        ];
        whatToExpect = `An inviting welcome, thoughtful care tailored to your pace, and sincere hospitality from our team.`;
        cta = `Experience Our ${cleanName}`;
        break;
      case 'Modern':
        shortDescription = `Contemporary, streamlined ${cleanName.toLowerCase()} blending modern techniques with personalized convenience.`;
        benefits = [
          `Frictionless booking and prompt, on-time service`,
          `Modern methodologies optimized for busy schedules`,
          `Clean, intuitive workflow designed around your lifestyle`,
        ];
        whatToExpect = `Smooth digital or in-person check-in, focused service delivery, and digital-friendly follow-ups.`;
        cta = `Schedule ${cleanName}`;
        break;
      case 'Simple':
        shortDescription = `Straightforward, honest ${cleanName.toLowerCase()} that gets straight to the point with zero unnecessary fluff.`;
        benefits = [
          `No gimmicks, just dependable workmanship`,
          `Transparent terms and direct communication`,
          `Prompt service focused on getting things done right`,
        ];
        whatToExpect = `Simple step-by-step service, no confusing jargon, and reliable results delivered on time.`;
        cta = `Request ${cleanName}`;
        break;
      case 'Professional':
      default:
        shortDescription = `Structured, professional ${cleanName.toLowerCase()} tailored to meet high standards for ${targetAudience} in ${location}.`;
        benefits = [
          `Methodical assessment to understand your exact requirements`,
          `Rigorous quality standards and attentive execution`,
          `Clear documentation, transparent guidance, and reliable follow-through`,
        ];
        whatToExpect = `Initial briefing, structured execution according to established best practices, and a clear summary of next steps.`;
        cta = `Inquire About ${cleanName}`;
        break;
    }

    return {
      id,
      serviceName: cleanName,
      shortDescription,
      benefits,
      whatToExpect,
      cta,
    };
  });
}

// Generate Call to Action Copy Variations
export function generateCtaCopy(input: BusinessInput): CtaCopy {
  const { businessName, businessType, location, brandTone, targetAudience } = input;

  const primary: CtaVariation = {
    type: 'primary',
    title: 'Primary Conversion CTA',
    headline: `Ready to Experience the Best in ${businessType} Care in ${location}?`,
    subtext: `Join satisfied ${targetAudience.toLowerCase()} who trust ${businessName} for consistent, dependable quality.`,
    buttonText: brandTone === 'Premium' ? 'Book Your Priority Slot' : `Schedule an Appointment Today`,
  };

  const contact: CtaVariation = {
    type: 'contact',
    title: 'Direct Contact & Inquiries',
    headline: `Have Questions About Our Services or Pricing?`,
    subtext: `Our friendly team in ${location} is always here to help you choose the right solution for your needs.`,
    buttonText: `Get in Touch with Us`,
  };

  const enquiry: CtaVariation = {
    type: 'enquiry',
    title: 'Custom Estimate & Booking Inquiry',
    headline: `Looking for a Tailored Solution for Your Requirements?`,
    subtext: `Send us a brief message with what you have in mind, and we will get back to you promptly with recommendations.`,
    buttonText: `Send a Free Enquiry`,
  };

  const locationCta: CtaVariation = {
    type: 'location',
    title: 'Local Visit & Neighborhood Invitation',
    headline: `Conveniently Located in ${location} – Visit Us Today`,
    subtext: `Drop by ${businessName} to explore our facility, speak with our team, and see why locals choose us.`,
    buttonText: `Get Directions to ${businessName}`,
  };

  return {
    primaryCta: primary,
    contactCta: contact,
    enquiryCta: enquiry,
    locationCta,
  };
}

/**
 * Direct Gemini API Generator (optional fallback/enhancement if API key provided)
 */
async function callGeminiApi(input: BusinessInput, apiKey: string): Promise<GeneratedWebsiteCopy | null> {
  try {
    const prompt = `You are an expert local business copywriter and conversion strategist for "LocalLaunch AI".
Generate complete, high-converting, website-ready copy for this local business:

Business Name: ${input.businessName}
Business Type: ${input.businessType}
Location: ${input.location}
Services: ${input.services.join(', ')}
Target Audience: ${input.targetAudience}
USPs: ${input.usps}
Brand Tone: ${input.brandTone}
Additional Context: ${input.additionalInfo || 'None'}

CRITICAL RULES:
- Do NOT invent unsupported claims (fake certifications, awards, years of experience, medical guarantees, or customer numbers).
- Tailor every section specifically to the provided business details, location, and tone.
- Produce valid JSON matching this exact structure:
{
  "homepage": {
    "hero": {
      "headline": "...",
      "subheadline": "...",
      "primaryCta": "..."
    },
    "valueProposition": "...",
    "aboutSection": "...",
    "whyChooseUs": [
      { "title": "...", "description": "..." },
      { "title": "...", "description": "..." },
      { "title": "...", "description": "..." },
      { "title": "...", "description": "..." }
    ],
    "trustSection": {
      "badge": "...",
      "statement": "...",
      "proofPoints": ["...", "...", "...", "..."]
    }
  },
  "services": [
    {
      "serviceName": "...",
      "shortDescription": "...",
      "benefits": ["...", "...", "..."],
      "whatToExpect": "...",
      "cta": "..."
    }
  ],
  "callToAction": {
    "primaryCta": { "headline": "...", "subtext": "...", "buttonText": "..." },
    "contactCta": { "headline": "...", "subtext": "...", "buttonText": "..." },
    "enquiryCta": { "headline": "...", "subtext": "...", "buttonText": "..." },
    "locationCta": { "headline": "...", "subtext": "...", "buttonText": "..." }
  }
}
Output ONLY valid JSON. No markdown code blocks, no other text.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn('Gemini API response error:', response.status);
      return null;
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    return {
      id: `ll-${Date.now()}`,
      timestamp: Date.now(),
      input,
      homepage: parsed.homepage,
      services: (parsed.services || []).map((s: any, i: number) => ({
        ...s,
        id: `service-${i + 1}-${(s.serviceName || 'svc').toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      })),
      callToAction: {
        primaryCta: { type: 'primary', title: 'Primary Conversion CTA', ...parsed.callToAction.primaryCta },
        contactCta: { type: 'contact', title: 'Direct Contact & Inquiries', ...parsed.callToAction.contactCta },
        enquiryCta: { type: 'enquiry', title: 'Custom Estimate & Booking Inquiry', ...parsed.callToAction.enquiryCta },
        locationCta: { type: 'location', title: 'Local Visit & Neighborhood Invitation', ...parsed.callToAction.locationCta },
      },
    };
  } catch (err) {
    console.error('Gemini API error, falling back to built-in generator:', err);
    return null;
  }
}

/**
 * Main Generation Entrypoint
 */
export async function generateWebsiteCopy(
  input: BusinessInput,
  onProgress?: (step: string) => void
): Promise<GeneratedWebsiteCopy> {
  onProgress?.('Analyzing business profile & target audience...');
  await new Promise((r) => setTimeout(r, 350));

  onProgress?.('Crafting high-converting hero & value propositions...');
  await new Promise((r) => setTimeout(r, 400));

  const effectiveApiKey =
    input.customApiKey ||
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
    '';

  if (effectiveApiKey && effectiveApiKey.length > 10) {
    onProgress?.('Synthesizing with neural language engine...');
    const apiResult = await callGeminiApi(input, effectiveApiKey);
    if (apiResult) {
      onProgress?.('Polishing and structuring final copy...');
      await new Promise((r) => setTimeout(r, 200));
      return apiResult;
    }
  }

  onProgress?.('Structuring individual service breakdowns...');
  await new Promise((r) => setTimeout(r, 350));

  onProgress?.('Generating tailored Call To Action variations...');
  await new Promise((r) => setTimeout(r, 300));

  const homepage: HomepageCopy = {
    hero: generateHeroCopy(input),
    valueProposition: generateValueProp(input),
    aboutSection: generateAboutSection(input),
    whyChooseUs: generateWhyChooseUs(input),
    trustSection: generateTrustSection(input),
  };

  const services = generateServicesCopy(input);
  const callToAction = generateCtaCopy(input);

  onProgress?.('Finalizing conversion-ready copy...');
  await new Promise((r) => setTimeout(r, 200));

  return {
    id: `ll-${Date.now()}`,
    timestamp: Date.now(),
    input,
    homepage,
    services,
    callToAction,
  };
}
