# Mundo — Official Website

> **“Starting at NUST. Building towards a more connected transport experience for Zimbabwe.”**

Welcome to the static web application for **Mundo**, an early-stage, student-centred digital transport mobility initiative based in Bulawayo, Zimbabwe.

---

## 1. Project Overview

**Mundo** is exploring how to make daily university student travel simpler and more convenient by introducing digital commuter payment workflows through a familiar WhatsApp messaging channel, coupled with a planned prepaid transit wallet.

This website serves to:
- Introduce **Mundo** and explain the planned service concept.
- Clarify the three-stage vision: **Phase 1: NUST** $\rightarrow$ **Phase 2: Bulawayo** $\rightarrow$ **Phase 3: Zimbabwe**.
- Engage students and transport providers to co-create and register expressions of interest.
- Provide transparent, accurate answers to common questions regarding current prototype status, pending approvals, and privacy standards.

---

## 2. Brand Identity & Design System

- **Brand Name**: **Mundo**
- **Brand Logo**: The official multi-colored Mundo silhouette emblem with custom script typography, preserved in high resolution (`assets/mundo-logo.png`).
- **Typography**: **Roboto Bold** (`font-weight: 700` and `font-weight: 900` for headings) loaded directly from Google Fonts for maximum legibility and bold visual impact.
- **Palette**: Deep forest green (`#064e3b`), deep night pine (`#022c22`), vibrant lime / emerald accent (`#10b981`), dark charcoal text (`#0f172a`), and warm off-white surfaces (`#f8fafc`).
- **Static-First Architecture**: Pure HTML5, modern CSS3, and vanilla JavaScript with zero runtime dependencies.

---

## 3. Directory Structure

```
whatsapp-mobility-system/website/
├── index.html                   # Main single-page application (Mundo)
├── 404.html                     # Branded accessible error page
├── robots.txt                   # Crawler indexing instructions
├── sitemap.xml                  # Search engine XML sitemap
├── package.json                 # Local running scripts
├── README.md                    # Documentation & deployment guide
├── assets/
│   ├── favicon.png              # Mundo vector/high-res favicon
│   ├── favicon.svg              # SVG backup favicon
│   ├── mundo-logo.png           # Official Mundo logo (transparent background)
│   ├── mundo-logo-badge.png     # Official Mundo logo badge (dark padded background)
│   ├── hero-mockup.svg          # Illustrative WhatsApp chat interface mockup with Mundo bot
│   └── images/
│       ├── nust-campus-students.jpg # Authentic campus student photography
│       └── bulawayo-transit.jpg     # Authentic Bulawayo commuter transit scene
├── css/
│   ├── style.css                # Design system tokens, Roboto bold typography scale & base resets
│   ├── components.css           # Modular component styling (header, hero, cards, forms)
│   └── animations.css           # Keyframe transitions & reduced motion overrides
└── js/
    ├── app.js                   # Header scroll, mobile drawer, scrollspy, modal logic
    ├── accordion.js             # Accessible FAQ accordion with WAI-ARIA arrow navigation
    └── form.js                  # Expression of interest validation & local data storage
```

---

## 4. How to Run Locally

```bash
cd whatsapp-mobility-system/website

# Using Node / NPX
npm start
# or: npx -y serve . -l 8080

# Or using Python 3
python3 -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 5. Deployment Guide

- **Cloudflare Pages**: Connect repository, set build output directory to `whatsapp-mobility-system/website`.
- **GitHub Pages**: Serve directly from the `whatsapp-mobility-system/website` directory.
- **Netlify**: Deploy using `npx -y netlify-cli deploy --dir=whatsapp-mobility-system/website --prod`.

---

## 6. License & Credits

Built with care for the student commuter community in Bulawayo, Zimbabwe.
All branding, visual assets, and UI components are copyright © 2026 Mundo Team.
