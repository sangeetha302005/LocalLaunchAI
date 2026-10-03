import streamlit as st
import json
import time
import streamlit.components.v1 as components

st.set_page_config(
    page_title="LocalLaunch AI – AI Website Copy Generator for Local Businesses",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Custom CSS for modern SaaS aesthetic
st.markdown(
    """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    
    .main-header {
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 2.8rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        margin-bottom: 0.2rem;
    }
    
    .badge {
        display: inline-block;
        padding: 0.35rem 0.85rem;
        border-radius: 9999px;
        background-color: #eef2ff;
        color: #4f46e5;
        font-size: 0.8rem;
        font-weight: 700;
        border: 1px solid #c7d2fe;
        margin-bottom: 1rem;
    }
    
    .feature-card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        margin-bottom: 1.25rem;
    }
    
    .service-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
        padding: 1.25rem;
        margin-bottom: 1rem;
    }
    
    .cta-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
        padding: 1.25rem;
        margin-bottom: 1rem;
    }

    .stButton>button {
        border-radius: 0.75rem;
        font-weight: 600;
        transition: all 0.2s;
    }
    
    .primary-btn>button {
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important;
        color: white !important;
        border: none !important;
        padding: 0.75rem 1.5rem !important;
        font-size: 1.1rem !important;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# Example Presets Data
EXAMPLES = {
    "💇‍♀️ Salon (Glow Beauty Studio)": {
        "name": "Glow Beauty Studio",
        "type": "Salon",
        "location": "Bengaluru, Indiranagar",
        "services": "Haircut & Styling, Organic Hair Spa, Custom Facial, Bridal Makeup",
        "target": "Women aged 18–40 looking for personalized care and relaxing salon experiences",
        "usps": "Experienced senior stylists, ammonia-free cruelty-free products, tranquil aesthetic ambiance",
        "tone": "Premium",
        "info": "Offers private consultation rooms for bridal parties.",
    },
    "☕ Cafe (Roast & Ritual Cafe)": {
        "name": "Roast & Ritual Cafe",
        "type": "Cafe",
        "location": "Koramangala, Bengaluru",
        "services": "Single-Origin Pour-Overs, Artisanal Espresso, Fresh Sourdough Bakes, Weekend Coffee Workshops",
        "target": "Remote workers, coffee connoisseurs, and neighborhood creatives seeking quality brews and quiet corners",
        "usps": "Ethically sourced shade-grown beans, in-house master roaster, high-speed WiFi with comfortable work seating",
        "tone": "Warm",
        "info": "Pet-friendly outdoor patio and seasonal specialty drinks.",
    },
    "🏥 Clinic (Apex Physiotherapy)": {
        "name": "Apex Integrative Physio",
        "type": "Clinic",
        "location": "HSR Layout, Bengaluru",
        "services": "Sports Injury Rehab, Posture Correction, Post-Op Recovery, Dry Needling Therapy",
        "target": "Active adults, desk workers suffering from chronic pain, and recreational athletes recovering from injury",
        "usps": "One-on-one 45-minute sessions, evidence-based manual therapy, modern biomechanics equipment",
        "tone": "Professional",
        "info": "Direct billing with major health insurances.",
    },
    "🚀 Agency (Pulse Growth Media)": {
        "name": "Pulse Growth Media",
        "type": "Agency",
        "location": "MG Road, Bengaluru",
        "services": "Meta & Google Ads Management, SEO & Local Search, Brand Identity Design, Conversion Rate Optimization",
        "target": "DTC brands and high-ticket local service businesses wanting predictable lead pipelines",
        "usps": "Transparent ROI dashboard, data-backed creative testing, dedicated growth strategist per client",
        "tone": "Confident",
        "info": "Monthly rolling contracts with no hidden lock-ins.",
    },
    "🏋️ Gym (Iron Haven Strength Club)": {
        "name": "Iron Haven Strength Club",
        "type": "Gym",
        "location": "Whitefield, Bengaluru",
        "services": "Semi-Private Strength Training, Open Gym Access, Nutrition Coaching, Mobility & Recovery Classes",
        "target": "Beginner to advanced lifters who value proper form, supportive coaching, and zero toxic gym culture",
        "usps": "Competition-grade calibrated equipment, certified biomechanics coaches, capped membership to eliminate crowding",
        "tone": "Modern",
        "info": "Complimentary form analysis and body composition screening on sign up.",
    },
    "📚 Coaching (Catalyst STEM Academy)": {
        "name": "Catalyst STEM Academy",
        "type": "Coaching Institute",
        "location": "Jayanagar, Bengaluru",
        "services": "Foundation Mathematics & Science, IIT-JEE/NEET Concept Modules, 1-on-1 Doubt Solving, Weekly Diagnostic Tests",
        "target": "Parents and ambitious students aiming for conceptual clarity, confidence, and top academic scores",
        "usps": "Small batch sizes (max 15 students), visual first-principles pedagogy, comprehensive periodic parent feedback reports",
        "tone": "Friendly",
        "info": "Hybrid classroom system with recorded lectures available for revision.",
    },
}

# Prompt Synthesis Engine
def generate_copy(name, b_type, location, services_str, target, usps, tone, info=""):
    services = [s.strip() for s in services_str.split(",") if s.strip()]
    primary_svc = services[0] if services else "Quality Services"
    secondary_svc = services[1] if len(services) > 1 else "Tailored Care"

    # Tone vocabulary
    tone_map = {
        "Premium": ("elevate", "refined", "Reserve Your Exclusive Experience"),
        "Friendly": ("welcome", "delightful", "Say Hello & Book Your Visit"),
        "Confident": ("maximize", "proven", "Claim Your Advantage"),
        "Modern": ("transform", "streamlined", "Experience the Difference"),
        "Warm": ("cherish", "heartfelt", "Join Our Community Today"),
        "Simple": ("simplify", "honest", "Get Started Now"),
        "Professional": ("deliver", "trusted", "Schedule Your Consultation"),
    }
    verb, adj, default_cta = tone_map.get(tone, ("deliver", "trusted", "Book an Appointment"))

    # Hero
    headline = f"{location}'s Trusted Destination for {primary_svc} & {b_type} Excellence" if tone != "Premium" else f"{location}'s Premier Destination for {primary_svc} & {b_type} Excellence"
    subheadline = f"{name} provides tailored {primary_svc.lower()} crafted specifically for {target.lower()}. Experience {usps.lower()} right here in {location}."
    primary_cta = default_cta

    # Value Prop
    value_prop = f"{name} bridges the gap between everyday needs and {adj} standards. While many {b_type.lower()} options in {location} rely on generic routines, we focus entirely on {target.lower()}. By pairing {usps.lower()} with attentive customer care, we {verb} your experience from start to finish."

    # About
    extra = f" {info.strip()}" if info.strip() else ""
    about = f"Located in {location}, {name} was established to bring purposeful, high-standard {b_type.lower()} services to our local community. We understand that {target.lower()} value transparent and dependable results. Our team prioritizes {usps.lower()}, ensuring every visit is tailored to your individual needs.{extra} Whether you are a first-time visitor or a returning client, our dedication remains consistent."

    # Why Choose Us
    usp_items = [u.strip() for u in usps.split(",") if u.strip()]
    why_choose = [
        {"title": f"Dedicated to {location}", "desc": f"Conveniently rooted in {location}, providing responsive and accessible {b_type.lower()} care."},
        {"title": f"Tailored {primary_svc}", "desc": f"Every service is customized to your personal preferences rather than treated as a routine."},
        {"title": f"Rooted in {usp_items[0] if usp_items else 'Excellence'}", "desc": "Clear communication, zero hidden surprises, and dependable quality at every stage."},
        {"title": f"Designed for {target}", "desc": "Every detail of our facility and service execution is built around the daily expectations of our community."},
    ]

    # Trust
    trust = {
        "badge": f"Verified Local {b_type}",
        "statement": f"At {name}, we build lasting trust through consistent quality, honest service, and local accountability in {location}.",
        "proof_points": [
            f"Grounded in {usps}",
            "Dedicated one-on-one attention for every client",
            "Transparent terms with zero hidden fees",
            f"Convenient {location} presence with easy scheduling",
        ],
    }

    # Services
    service_copies = []
    for s in services:
        service_copies.append({
            "name": s,
            "desc": f"Dedicated {s.lower()} crafted to deliver consistent, dependable satisfaction for {target.lower()} in {location}.",
            "benefits": [
                "Personalized consultation addressing your exact requirements",
                f"Attentive execution utilizing {usps.split(',')[0].strip() if usps else 'quality standards'}",
                "Dependable results in a comfortable setting",
            ],
            "what_to_expect": "A clear initial walkthrough, careful execution by trained hands, and post-service recommendations.",
            "cta": f"Book {s} Today",
        })

    # CTAs
    ctas = {
        "primary": {
            "title": "Primary Conversion CTA",
            "headline": f"Ready to Experience the Best in {b_type} Care in {location}?",
            "subtext": f"Join satisfied {target.lower()} who trust {name} for consistent, reliable quality.",
            "button": primary_cta,
        },
        "contact": {
            "title": "Direct Contact & Inquiries",
            "headline": f"Have Questions About Our Services or Scheduling?",
            "subtext": f"Our team in {location} is always here to help you find the perfect solution for your needs.",
            "button": "Get in Touch with Us",
        },
        "enquiry": {
            "title": "Custom Estimate & Booking Inquiry",
            "headline": "Looking for a Customized Solution for Your Requirements?",
            "subtext": "Send us a brief inquiry, and we will get back to you promptly with tailored recommendations.",
            "button": "Send a Free Enquiry",
        },
        "location": {
            "title": "Neighborhood Visit & Directions",
            "headline": f"Conveniently Located in {location} – Visit Us Today",
            "subtext": f"Drop by {name} to see our facility, meet our staff, and experience our services firsthand.",
            "button": f"Get Directions to {name}",
        },
    }

    return {
        "name": name,
        "type": b_type,
        "location": location,
        "tone": tone,
        "target": target,
        "hero": {"headline": headline, "subheadline": subheadline, "cta": primary_cta},
        "value_prop": value_prop,
        "about": about,
        "why_choose": why_choose,
        "trust": trust,
        "services": service_copies,
        "ctas": ctas,
    }

# App Layout
st.markdown('<div class="badge">🚀 LocalLaunch AI • Turn Your Local Business Into Powerful Words</div>', unsafe_allow_html=True)
st.markdown('<div class="main-header">AI Website Copy Generator for Local Businesses</div>', unsafe_allow_html=True)
st.markdown(
    "Generate professional, conversion-optimized, website-ready copy for any local business in seconds. "
    "Produces structured **Homepage copy**, **Service breakdowns**, and **Call-To-Action (CTA) variations**."
)
st.divider()

# Quick Presets Selector
st.markdown("##### ⚡ Or choose a ready-to-test business preset:")
preset_cols = st.columns(len(EXAMPLES))
selected_preset_key = None

for i, (p_title, p_data) in enumerate(EXAMPLES.items()):
    if preset_cols[i].button(p_title, use_container_width=True):
        st.session_state["form_name"] = p_data["name"]
        st.session_state["form_type"] = p_data["type"]
        st.session_state["form_loc"] = p_data["location"]
        st.session_state["form_services"] = p_data["services"]
        st.session_state["form_target"] = p_data["target"]
        st.session_state["form_usps"] = p_data["usps"]
        st.session_state["form_tone"] = p_data["tone"]
        st.session_state["form_info"] = p_data["info"]

# Form inputs
with st.container():
    st.markdown("### 📝 Enter Business Details")
    
    col1, col2 = st.columns(2)
    with col1:
        name = st.text_input(
            "Business Name*",
            value=st.session_state.get("form_name", "Glow Beauty Studio"),
            placeholder="e.g. Glow Beauty Studio",
        )
        location = st.text_input(
            "Location (City / Area)*",
            value=st.session_state.get("form_loc", "Bengaluru, Indiranagar"),
            placeholder="e.g. Bengaluru, Indiranagar",
        )
        services = st.text_area(
            "Services Offered (Comma-separated)*",
            value=st.session_state.get("form_services", "Haircut & Styling, Organic Hair Spa, Custom Facial, Bridal Makeup"),
            placeholder="e.g. Haircut & Styling, Custom Facial, Bridal Makeup",
            height=90,
        )
    
    with col2:
        business_types = [
            "Salon", "Cafe", "Restaurant", "Clinic", "Coaching Institute",
            "Agency", "Gym", "Spa", "Dental Clinic", "Boutique", "Freelancer", "Other"
        ]
        curr_type = st.session_state.get("form_type", "Salon")
        type_idx = business_types.index(curr_type) if curr_type in business_types else 0
        b_type = st.selectbox("Business Category*", business_types, index=type_idx)

        tones = ["Friendly", "Professional", "Modern", "Premium", "Confident", "Warm", "Simple"]
        curr_tone = st.session_state.get("form_tone", "Premium")
        tone_idx = tones.index(curr_tone) if curr_tone in tones else 0
        brand_tone = st.selectbox("Brand Tone*", tones, index=tone_idx)

        target_audience = st.text_input(
            "Target Audience*",
            value=st.session_state.get("form_target", "Women aged 18–40 looking for personalized care"),
            placeholder="e.g. Women aged 18–40, busy professionals",
        )

    usps = st.text_input(
        "Unique Selling Points (USPs)*",
        value=st.session_state.get("form_usps", "Experienced senior stylists, ammonia-free cruelty-free products, relaxing aesthetic ambiance"),
        placeholder="e.g. Experienced staff, premium organic products, zero wait times",
    )

    additional_info = st.text_input(
        "Additional Business Context (Optional)",
        value=st.session_state.get("form_info", "Offers private consultation rooms for bridal parties."),
        placeholder="e.g. Free parking available, weekend appointments",
    )

    generate_btn = st.button("✨ Generate Website Copy", type="primary", use_container_width=True)

# Processing & Output
if generate_btn or "generated_copy" in st.session_state:
    if generate_btn:
        if not name or not location or not services or not target_audience or not usps:
            st.error("Please fill in all required fields marked with *.")
        else:
            with st.spinner("Analyzing business profile & generating tailored website copy..."):
                time.sleep(0.6)
                copy_result = generate_copy(name, b_type, location, services, target_audience, usps, brand_tone, additional_info)
                st.session_state["generated_copy"] = copy_result
                st.toast("Website copy generated successfully!", icon="🎉")

    if "generated_copy" in st.session_state:
        res = st.session_state["generated_copy"]
        st.success(f"Generated complete website copy for **{res['name']}** ({res['type']} in {res['location']})")

        # Tabs
        tab1, tab2, tab3, tab4 = st.tabs([
            "🏠 1. Homepage Copy",
            "📋 2. Services Breakdown",
            "⚡ 3. Call To Action (CTAs)",
            "🌐 4. Live Website Preview"
        ])

        # TAB 1: HOMEPAGE
        with tab1:
            st.markdown("#### Hero Section")
            st.code(
                f"Headline (H1): {res['hero']['headline']}\n\n"
                f"Subheadline: {res['hero']['subheadline']}\n\n"
                f"Primary CTA Button: [{res['hero']['cta']}]",
                language="markdown",
            )

            st.markdown("#### Value Proposition")
            st.info(res['value_prop'])

            st.markdown("#### About Section")
            st.write(res['about'])

            st.markdown("#### Why Choose Us (Benefit Points)")
            why_cols = st.columns(2)
            for idx, w in enumerate(res['why_choose']):
                with why_cols[idx % 2]:
                    st.markdown(f"**{idx+1}. {w['title']}**\n\n{w['desc']}")

            st.markdown("#### Trust & Credibility")
            st.markdown(f"**Badge:** `{res['trust']['badge']}`")
            st.markdown(f"_{res['trust']['statement']}_")
            for pt in res['trust']['proof_points']:
                st.markdown(f"- ⭐ {pt}")

        # TAB 2: SERVICES
        with tab2:
            st.markdown(f"#### Individual Breakdown ({len(res['services'])} Services)")
            for idx, svc in enumerate(res['services']):
                with st.expander(f"📌 Service #{idx+1}: {svc['name']}", expanded=True):
                    st.markdown(f"**Description:** {svc['desc']}")
                    st.markdown("**Key Benefits:**")
                    for b in svc['benefits']:
                        st.markdown(f"- ✅ {b}")
                    st.markdown(f"**What to Expect:** {svc['what_to_expect']}")
                    st.markdown(f"**CTA Label:** `[{svc['cta']}]`")

        # TAB 3: CTAS
        with tab3:
            st.markdown("#### 4x Call To Action Variations")
            cta_cols = st.columns(2)
            for i, (k, cta) in enumerate(res['ctas'].items()):
                with cta_cols[i % 2]:
                    with st.container(border=True):
                        st.markdown(f"**{cta['title']}**")
                        st.markdown(f"### {cta['headline']}")
                        st.caption(cta['subtext'])
                        st.button(f"🔘 {cta['button']}", key=f"cta_btn_{k}", disabled=True)

        # TAB 4: LIVE PREVIEW
        with tab4:
            st.markdown("#### Simulated Live Business Website Mockup")
            preview_html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f1f5f9; }}
                    .browser {{ max-width: 900px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; }}
                    .browser-bar {{ background: #e2e8f0; padding: 10px 15px; display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; font-family: monospace; }}
                    .dot {{ width: 10px; height: 10px; border-radius: 50%; display: inline-block; }}
                    .hero {{ padding: 50px 30px; text-align: center; background: linear-gradient(180deg, #eef2ff 0%, #ffffff 100%); }}
                    .hero h1 {{ font-size: 28px; color: #0f172a; margin-bottom: 12px; }}
                    .hero p {{ font-size: 16px; color: #475569; max-width: 650px; margin: 0 auto 20px auto; line-height: 1.5; }}
                    .btn {{ background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block; }}
                    .section {{ padding: 35px 30px; }}
                    .grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; }}
                    .card {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; }}
                    .footer {{ background: #0f172a; color: #94a3b8; padding: 20px; text-align: center; font-size: 12px; }}
                </style>
            </head>
            <body>
                <div class="browser">
                    <div class="browser-bar">
                        <span class="dot" style="background:#f87171;"></span>
                        <span class="dot" style="background:#fbbf24;"></span>
                        <span class="dot" style="background:#34d399;"></span>
                        <span style="margin-left: 10px;">https://{res['name'].lower().replace(' ', '')}.com</span>
                    </div>
                    <div class="hero">
                        <span style="background:#e0e7ff; color:#4338ca; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                            {res['type']} • {res['location']}
                        </span>
                        <h1>{res['hero']['headline']}</h1>
                        <p>{res['hero']['subheadline']}</p>
                        <a href="#" class="btn">{res['hero']['cta']}</a>
                    </div>
                    <div class="section" style="background: #f8fafc; text-align: center; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
                        <h3 style="font-size: 13px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Value Proposition</h3>
                        <p style="font-style: italic; color: #334155; max-width: 700px; margin: 0 auto;">"{res['value_prop']}"</p>
                    </div>
                    <div class="section">
                        <h2 style="font-size: 20px; color: #0f172a; text-align: center;">Our Services in {res['location']}</h2>
                        <div class="grid">
                            {''.join([f'<div class="card"><h4 style="margin:0 0 5px 0; color:#1e293b;">{s["name"]}</h4><p style="font-size:12px; color:#64748b; margin:0 0 8px 0;">{s["desc"]}</p><span style="font-size:11px; font-weight:bold; color:#4f46e5;">{s["cta"]} →</span></div>' for s in res['services']])}
                        </div>
                    </div>
                    <div class="footer">
                        © 2026 {res['name']} • {res['location']} • All Rights Reserved.
                    </div>
                </div>
            </body>
            </html>
            """
            components.html(preview_html, height=650, scrolling=True)

        # Download & Export
        st.divider()
        st.markdown("##### 📥 Export Generated Copy")

        text_content = f"====================================\nLOCALLAUNCH AI – WEBSITE COPY\nBusiness: {res['name']} ({res['type']})\nLocation: {res['location']}\nTone: {res['tone']}\n====================================\n\n"
        text_content += f"--- 1. HOMEPAGE COPY ---\nHeadline: {res['hero']['headline']}\nSubheadline: {res['hero']['subheadline']}\nPrimary CTA: {res['hero']['cta']}\n\n"
        text_content += f"Value Proposition:\n{res['value_prop']}\n\nAbout:\n{res['about']}\n\n"
        text_content += f"--- 2. SERVICES ---\n"
        for s in res['services']:
            text_content += f"Service: {s['name']}\nDescription: {s['desc']}\nCTA: {s['cta']}\n\n"
        text_content += f"--- 3. CTAS ---\nPrimary CTA: {res['ctas']['primary']['headline']} [{res['ctas']['primary']['button']}]\n"

        col_dl1, col_dl2 = st.columns(2)
        with col_dl1:
            st.download_button(
                "📄 Download as Plain Text (.txt)",
                data=text_content,
                file_name=f"{res['name'].lower().replace(' ', '_')}_copy.txt",
                mime="text/plain",
                use_container_width=True,
            )
        with col_dl2:
            st.download_button(
                "📝 Download as Markdown (.md)",
                data=text_content,
                file_name=f"{res['name'].lower().replace(' ', '_')}_copy.md",
                mime="text/markdown",
                use_container_width=True,
            )

st.divider()
st.caption("© 2026 LocalLaunch AI. Built for local businesses worldwide.")
