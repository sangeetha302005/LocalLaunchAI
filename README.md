# LocalLaunch AI – AI Website Copy Generator for Local Businesses

> **Turn Your Local Business Into Powerful Words**  
> Generate professional, website-ready copy for local businesses in seconds.

---

## 🌐 Live Demo

🚀 **Production Deployed Web App:** [https://locallaunch-ai.surge.sh](https://locallaunch-ai.surge.sh)

Anyone can open this URL in any modern browser on mobile, tablet, or desktop to generate conversion-ready website copy.

---

## 📌 Overview

**LocalLaunch AI** is a production-ready AI SaaS application built specifically for local business owners, freelancers, web designers, and marketing agencies. It transforms raw business details into complete, structured, high-converting website copy in seconds—without requiring copywriting expertise or expensive agency retainers.

Unlike generic AI chat prompts that produce boilerplate phrases, LocalLaunch AI uses an intelligent multi-variable prompt framework to generate tailored Homepage copy, detailed Service breakdowns, and four distinct Call-To-Action (CTA) variations.

---

## ❗ The Problem

Local businesses face significant friction when creating or updating their websites:
- **Generic Copy:** Standard AI outputs and template copy sound interchangeable across different businesses in the same industry.
- **Copywriter Bottlenecks:** Professional copywriters charge between $500 to $3,000+ per website, with delivery times taking weeks.
- **Unstructured Deliverables:** Raw AI chat output lacks clear website page structure (Hero, Value Prop, Service cards, Trust blocks, and action CTAs).
- **Unsupported Claims:** Standard LLMs often fabricate fake certifications, awards, years of experience, or medical guarantees that create compliance risks.

---

## 💡 The Solution

LocalLaunch AI solves this through a dedicated, local-business-first generation engine:
1. **Context-Aware Synthesis:** Tailors every paragraph to the business's exact name, type, neighborhood/city, core services, target audience, and unique selling points (USPs).
2. **Strict Guardrails:** Focuses on realistic benefits and honest customer-centric value propositions without inventing fake claims.
3. **Structured Deliverables:** Generates distinct, modular tabs for **Homepage Copy**, **Services Breakdown**, and **Call-To-Action (CTA)** variations.
4. **Instant Actionability:** Offers one-click copy, inline editing, section-level regeneration, multiple export formats (TXT, Markdown, PDF), and an interactive **Live Website Preview**.

---

## ✨ Features

- **Business Information Input:** Clean, accessible SaaS form accepting Business Name, Business Category dropdown (12+ types), Location, dynamic Service tags, Target Audience description, USPs, Brand Tone selection, and optional extra context.
- **Tone Adaptation Engine:** 7 calibrated brand voice profiles: *Friendly, Professional, Modern, Premium, Confident, Warm,* and *Simple*.
- **Comprehensive Homepage Copy:**
  - *Hero Section:* Compelling Headline (H1), Subheadline, and Primary Action CTA.
  - *Value Proposition:* Clear, persuasive explanation of why customers should choose the business.
  - *About Section:* Authentic local business introduction.
  - *Why Choose Us:* 3 to 5 benefit-focused value points.
  - *Trust & Credibility Section:* Category badge, commitment statement, and verifiable proof points.
- **Individual Services Copy:**
  - Generates dedicated descriptions, bulleted benefit lists, "What to Expect" walkthroughs, and service-specific CTAs for every service entered.
- **4x Conversion CTA Variations:**
  - *Primary Conversion CTA* (high-intent booking)
  - *Direct Contact CTA* (inquiries & questions)
  - *Custom Enquiry CTA* (custom quotations & consultations)
  - *Location & Neighborhood CTA* (walk-in visits & local directions)
- **Inline Editing & Regeneration:** Edit any text directly in place, save modifications, or regenerate individual sections with one click.
- **Interactive Live Website Preview:** View how generated copy looks in a real simulated browser with desktop/mobile viewport toggle and 5 color theme switches (*Indigo, Emerald, Violet, Amber, Rose*).
- **Multiple Export & Save Options:**
  - 📋 One-Click Copy All or Copy by Section
  - 📄 Plain Text (`.txt`) Export
  - 📝 Markdown (`.md`) Export
  - 📑 Formatted PDF (`.pdf`) Document Export via `jsPDF`
  - 💾 Local Storage Project History (Save, Load, and Manage past projects)
- **Modern Responsive SaaS UI:** Indigo/violet gradient aesthetic, smooth transitions, toast alerts, confetti celebrations, accessible forms, and mobile-friendly design.

---

## 🧠 Prompt Framework

LocalLaunch AI structures generation using a multi-factor formula:

$$\text{Website Copy} = f(\text{Business Type}, \text{Location}, \text{Services}, \text{Target Audience}, \text{USPs}, \text{Brand Tone}, \text{Context})$$

### Core Rules:
1. **Audience-Centric Framing:** Addresses the specific pain points and aspirations of the provided target audience.
2. **Hyper-Local Grounding:** Integrates the city/neighborhood to improve local SEO and customer trust.
3. **No Unsupported Claims:** Strictly avoids inventing unauthorized certifications, medical promises, or false experience metrics.
4. **Tone Consistency:** Matches vocabulary, sentence rhythm, and call-to-action urgency to the selected brand voice.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript |
| **Build Tool & Bundler** | Vite 6 |
| **Styling & Design System** | Tailwind CSS v4, Lucide React Icons |
| **PDF Generation** | jsPDF |
| **Delight & Animations** | Canvas-Confetti, CSS Keyframe Animations |
| **Hosting & Deployment** | Surge.sh (Global CDN with HTTPS) |

---

## 📁 Project Structure

```text
locallaunch-ai/
├── public/
│   └── rocket.svg               # App favicon
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar with brand logo & saved count
│   │   ├── HeroSection.tsx      # Main landing hero with key value propositions
│   │   ├── GeneratorForm.tsx    # Clean business input form with validation
│   │   ├── OutputDashboard.tsx  # Multi-tab copy dashboard (Homepage, Services, CTAs)
│   │   ├── LiveWebsitePreview.tsx # Simulated interactive responsive website mockup
│   │   ├── ExamplesGallery.tsx  # 6 industry presets (Salon, Cafe, Clinic, Agency, etc.)
│   │   ├── HowItWorksSection.tsx# 4-step user guide
│   │   ├── PricingSection.tsx   # SaaS pricing tiers & FAQ accordion
│   │   ├── SavedProjectsDrawer.tsx # Browser localStorage saved projects manager
│   │   ├── Toast.tsx            # Floating feedback notifications
│   │   └── Footer.tsx           # SaaS footer with quick navigation links
│   ├── data/
│   │   └── examples.ts          # 6 realistic sample business profiles
│   ├── services/
│   │   └── aiGenerator.ts       # Core prompt framework & generation engine
│   ├── types/
│   │   └── index.ts             # Complete TypeScript interfaces & types
│   ├── utils/
│   │   └── exporter.ts          # TXT, Markdown, and PDF export handlers
│   ├── App.tsx                  # Main application state & coordinator
│   ├── index.css                # Tailwind CSS v4 styling & scrollbar rules
│   └── main.tsx                 # React DOM root entrypoint
├── .env.example                 # Environment variables documentation
├── .gitignore                   # Git ignore specifications
├── index.html                   # HTML template with OpenGraph meta tags
├── package.json                 # Dependencies and npm build scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite configuration with Tailwind plugin
```

---

## ⚙️ Environment Variables

LocalLaunch AI has a built-in neural generation engine and works completely out of the box with zero external configuration.

If you wish to optionally integrate a direct Google Gemini API key, create a `.env` file in the project root:

```bash
# Optional: Google Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

*(Note: Never commit your `.env` file to public repositories. It is included in `.gitignore`.)*

---

## 🚀 Installation & Running Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+ or v10+)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/LocalLaunchAI.git
cd LocalLaunchAI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

The application will start at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```

This compiles TypeScript and builds optimized production bundles into the `dist/` directory.

---

## 🔮 Future Enhancements

1. **Multi-Language Generation:** Generate local business copy in Spanish, French, German, Hindi, and 20+ regional languages.
2. **Direct CMS Publishing:** 1-click publishing integrations for WordPress REST API, Webflow CMS, and Shopify.
3. **SEO Meta Tag Generator:** Automated Title Tags, Meta Descriptions, and Schema.org LocalBusiness JSON-LD markup.
4. **Google Business Profile (GBP) Generator:** Formatted GBP descriptions, weekly update posts, and local service descriptions.

---

## 📄 License

MIT License © 2026 LocalLaunch AI. All rights reserved.
