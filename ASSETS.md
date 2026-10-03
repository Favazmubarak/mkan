# MKAN Concept — Asset Manifest & Replacement Ledger

This document tracks all visual assets used across the MKAN Concept web platform. Every asset is strictly decoupled from component code via [`src/config/assets.ts`](src/config/assets.ts).

To replace any visual asset, drop the replacement image in `/public/images/` using the specified filename and aspect ratio, or update [`src/config/assets.ts`](src/config/assets.ts).

---

## 1. Global & Brand Elements

| Key | File Path | Aspect Ratio | Dimensions | Role / Usage | Status / Source |
| :--- | :--- | :--- | :--- | :--- | :--- |
| — | `/public/images/mkan-logo.svg` | Vector | Scale-to-fit | Organization logo in structured metadata | Used by search and social metadata; the visible site header and footer use text-only branding. |

---

## 2. Home Page Assets

| Key | File Path | Target Aspect | Resolution | Section | Mood & Content Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `heroBg` | `/public/images/hero-bg.jpg` | `16:9` | 1920×1080 | **Hero** | Illuminated luxury architectural corridor at dusk with deep plum atmosphere and glowing floor reflections. |
| `aboutInterior` | `/public/images/about-interior.jpg` | `4:3` | 800×600 | **About MKAN** | Refined atmospheric lounge with warm sculptural lighting and curved furniture. |
| `expertise.events` | `/public/images/expertise-events.jpg` | `2:3` | 600×900 | **Expertise 01** | Curated high-end institutional and corporate gala event with arched lighting. |
| `expertise.exhibitions` | `/public/images/expertise-exhibitions.jpg` | `2:3` | 600×900 | **Expertise 02** | Architectural exhibition structure with illuminated white arches. |
| `expertise.workshops` | `/public/images/expertise-workshops.jpg` | `2:3` | 600×900 | **Expertise 03** | Intimate masterclass setting with bespoke centerpiece lighting. |
| `expertise.activations` | `/public/images/expertise-activations.jpg` | `2:3` | 600×900 | **Expertise 04** | Luxury retail pop-up and experiential pavilion with glowing frames. |
| `expertise.consultancy` | `/public/images/expertise-consultancy.jpg` | `2:3` | 600×900 | **Expertise 05** | Executive strategy boardroom setting with ambient lighting. |
| `method.concept` | `/public/images/method-concept.jpg` | `4:3` | 400×300 | **Method 01** | Strategic sketches, blueprints and ideation material. |
| `method.development` | `/public/images/method-development.jpg` | `4:3` | 400×300 | **Method 02** | Experiential layout development and materials planning. |
| `method.curation` | `/public/images/method-curation.jpg` | `4:3` | 400×300 | **Method 03** | Sculptural elements and sensory curation items. |
| `method.production` | `/public/images/method-production.jpg` | `4:3` | 400×300 | **Method 04** | On-site staging, lighting and logistics execution. |
| `method.reporting` | `/public/images/method-reporting.jpg` | `4:3` | 400×300 | **Method 05** | Strategic post-event evaluation portfolio. |
| `experiences.ramadanFair` | `/public/images/experience-ramadan-fair.jpg` | `4:3` | 800×600 | **Selected Experiences** | Ramadan Fair flagship cultural pavilion with terracotta arches. |
| `experiences.corporateEvents` | `/public/images/experience-corporate.jpg` | `4:3` | 800×600 | **Selected Experiences** | Institutional corporate gala dinner with golden glow. |
| `experiences.luxuryActivation` | `/public/images/experience-luxury-activation.jpg` | `4:3` | 800×600 | **Selected Experiences** | High-end luxury activation with illuminated geometric columns. |
| `experiences.privateEngagement` | `/public/images/experience-private.jpg` | `4:3` | 800×600 | **Selected Experiences** | Exclusive private VIP engagement with bespoke tablescaping. |
| `builtForBrands` | `/public/images/built-for-brands.jpg` | `4:5` | 800×1000 | **Built for Brands** | Arched architectural portal framing an olive tree. |
| `impactBg` | `/public/images/impact-bg.jpg` | `21:9` | 1920×800 | **Impact Banner** | Atmospheric evening courtyard with candlelit tables. |
| `contactArch` | `/public/images/contact-arch.jpg` | `4:5` | 800×1100 | **Contact** | Arched illuminated architectural portal with crystal water curtain. |

---

## 3. Inner Page Assets

| Key | File Path | Target Aspect | Resolution | Page / Section | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `aboutUsSplit` | `/public/images/about-split.jpg` | `3:4` | 900×1200 | **About Us** | Monolithic architectural interior with serene natural lighting. |
| *Services Panels* | Reuses `expertise.*` | `16:10` | 1200×750 | **Services Tabs** | High-resolution backdrops corresponding to each service category. |
| *Experiences Masonry* | Reuses `experiences.*` | `4:3` / `16:9` | Multi | **Experiences** | Expanded showcase grid for full portfolio filtering. |

---

## 4. Performance & Weight Budget Guidelines

- **Hero Images**: Target compressed WebP/AVIF $< 250\text{ KB}$ with `priority` & `fetchpriority="high"`.
- **Card & Thumbnail Images**: Target $< 120\text{ KB}$ with native lazy-loading and responsive `sizes` attribute.
- **Client Logos & Icons**: Pure inline SVG or optimized `.svg` assets $< 10\text{ KB}$.
