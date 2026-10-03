# MKAN CONCEPT — Comprehensive 360° Technical & Security Audit Report

> **Audit Branch**: `audit/full-review`  
> **Starting Backup Branch**: `backup/pre-audit`  
> **Date**: October 3, 2026  
> **Roles Active**: Senior Full-Stack Engineer, Security Engineer, QA Automation Engineer, Performance/A11y/SEO Specialist  
> **Final Verdict**: **READY FOR PRODUCTION (WITH PRE-FLIGHT CHECKLIST)**

---

## 1. Executive Summary & Inventory Baseline

### 1.1 Architecture Overview
MKAN Concept is an ultra-luxury digital flagship and Studio Management CMS built with:
* **Framework**: Next.js 16.3.7 (App Router with Turbopack, React 19.2.8)
* **Styling**: Tailwind CSS v4 with custom luxury design tokens
* **Animations**: GSAP 3.15.0 + `@gsap/react` + Lenis Smooth Scroll (with strict `prefers-reduced-motion` compliance)
* **Database & CMS**: MongoDB Atlas via Mongoose 9.10.3 with connection pooling & zero-downtime static seed fallback
* **Authentication**: Custom zero-trust session management (bcrypt salt-12, SHA-256 hashed tokens, 7-day TTL, brute-force IP rate-limiting & account lockout)
* **Media Pipeline**: Sharp 0.35.5 (auto-orientation, Lanczos3 4K downscaling, WebP q90 compression, 16×16 blur placeholder) + Cloudflare R2 / Local Disk fallback
* **Email System**: Resend API SDK + fallback to MongoDB Studio Inbox

---

### 1.2 Route & Endpoint Inventory

| Path | Type | Auth Required | Purpose / Notes |
| :--- | :--- | :--- | :--- |
| `/` | Page (Static/ISR) | Public | Main single-page flagship website |
| `/privacy` | Page (Static) | Public | Privacy and personal data processing policy |
| `/_not-found` & `/not-found` | Page (Client) | Public | Custom luxury-branded 404 error page |
| `/sitemap.xml` | Route Handler | Public | Dynamic XML sitemap for search indexing |
| `/robots.txt` | Route Handler | Public | Crawler instructions and sitemap link (Disallows `/admin`) |
| `/admin/login` | Page (Client) | Public (Rate-limited) | Studio management authentication portal |
| `/admin` | Page (Dynamic) | **Admin Session** | Unified Instagram-style Studio Management Console |
| `/admin/media` | Page (Dynamic) | **Admin Session** | Alias redirect to `/admin` |
| `/admin/messages` | Page (Dynamic) | **Admin Session** | Alias redirect to `/admin` |
| `/admin/method` | Page (Dynamic) | **Admin Session** | Alias redirect to `/admin` |
| `/admin/projects` | Page (Dynamic) | **Admin Session** | Alias redirect to `/admin` |
| `/admin/sections` | Page (Dynamic) | **Admin Session** | Alias redirect to `/admin` |
| `/admin/services` | Page (Dynamic) | **Admin Session** | Alias redirect to `/admin` |
| `/admin/settings` | Page (Dynamic) | **Admin Session** | Alias redirect to `/admin` |

---

### 1.3 Server Actions & Security Assertion Map

| Server Action | Target File | Authorization Guard | Input Sanitization & Validation |
| :--- | :--- | :--- | :--- |
| `submitContactInquiry` | `src/app/actions/contact.ts` | Public (Rate-Limited: 5/hr) | Honeypot trap, regex email, length bounds, HTML entity escaping |
| `loginAdminAction` | `src/app/actions/auth.ts` | Public (Rate-Limited: 10/15m) | Max byte length check, lockout, bcrypt compare |
| `logoutAdminAction` | `src/app/actions/auth.ts` | Cookie session | Token hash deletion in DB, cookie clear |
| `upsertProjectAction` | `src/app/actions/projects.ts` | **`requireAdmin()`** | Category enum, ObjectId check, URL scheme validator, slug sanitizer |
| `deleteProjectAction` | `src/app/actions/projects.ts` | **`requireAdmin()`** | ObjectId validation |
| `toggleProjectHomeAction`| `src/app/actions/projects.ts` | **`requireAdmin()`** | ObjectId validation, boolean assertion |
| `saveSectionDraftAction` | `src/app/actions/sections.ts` | **`requireAdmin()`** | Section key whitelist, 64KB JSON size cap |
| `publishSectionAction` | `src/app/actions/sections.ts` | **`requireAdmin()`** | Section key whitelist, instant ISR revalidation |
| `revertSectionAction` | `src/app/actions/sections.ts` | **`requireAdmin()`** | Section key whitelist, rollback buffer restore |
| `publishAllSectionsAction`| `src/app/actions/sections.ts` | **`requireAdmin()`** | Locale regex check, bulk update |
| `uploadMediaAction` | `src/app/actions/media.ts` | **`requireAdmin()`** | MIME type check, 4MB cap, Sharp buffer verification |
| `resetSlotToDefaultAction`| `src/app/actions/media.ts` | **`requireAdmin()`** | Slot key regex pattern |
| `updateMediaAltAction` | `src/app/actions/media.ts` | **`requireAdmin()`** | Alt text length cap (300 chars) |
| `toggleMessageReadAction`| `src/app/actions/messages.ts` | **`requireAdmin()`** | ObjectId check, enum status |
| `setMessageRepliedAction`| `src/app/actions/messages.ts` | **`requireAdmin()`** | ObjectId check, boolean assertion |
| `deleteMessageAction` | `src/app/actions/messages.ts` | **`requireAdmin()`** | ObjectId check |
| `exportMessagesCsvAction`| `src/app/actions/messages.ts` | **`requireAdmin()`** | Limit 5000 records, Formula Injection sanitization |

---

## 2. Master Findings & Remediation Ledger

| ID | Severity | Area | File & Line | Evidence / Finding | Resolution / Commit | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | **Medium** | Security | `src/app/actions/messages.ts` | CSV export was vulnerable to formula injection (CWE-1236) | Sanitized cell values starting with `=,+,-,@,\t,\r` by prefixing with `'` | ✅ **Fixed** (`3585409`) |
| **SEC-02** | **Low** | Security / SEO | `src/app/robots.ts` | `robots.ts` did not explicitly disallow `/admin` from web crawlers | Added explicit `disallow: ["/admin/", "/admin"]` | ✅ **Fixed** (`3585409`) |
| **SEC-03** | **Low** | Security | `src/proxy.ts` | Missing `Permissions-Policy`, HSTS, and `X-DNS-Prefetch-Control` | Hardened security headers globally in proxy/middleware | ✅ **Fixed** (`3585409`) |
| **CODE-01**| **Low** | Dead Code | `src/components/Section.tsx` | Unused component file not imported or rendered anywhere | Removed dead component file | ✅ **Fixed** (`911ce8c`) |
| **CODE-02**| **Low** | DX / Git | `.gitignore` | `.env*` pattern inadvertently masked `.env.example` | Added `!.env.example` exception in `.gitignore` | ✅ **Fixed** (`911ce8c`) |
| **CODE-03**| **Low** | Dead Assets | `public/uploads/*.webp` | 14 test image uploads tracked in git history | Removed test images, created `.gitkeep`, ignored `/public/uploads/*` | ✅ **Fixed** (`911ce8c`) |
| **UX-01**  | **Medium** | Resiliency | `src/app/not-found.tsx` | Missing custom branded 404 error page | Implemented luxury-styled 404 page matching brand palette | ✅ **Fixed** (`1be607c`) |
| **UX-02**  | **Medium** | Resiliency | `src/app/error.tsx` & `global-error.tsx` | Missing error boundaries in App Router | Added application and studio error boundaries with retry mechanisms | ✅ **Fixed** (`1be607c`) |
| **QA-01**  | **High** | Quality Assurance | `package.json` | No automated test runner or test suites configured | Added native TypeScript test runner with 12 automated unit/integration tests | ✅ **Fixed** (`93b3b3a`) |
| **DX-01**  | **Low** | CI / Automation | `.github/workflows/ci.yml` | Missing continuous integration quality pipeline | Added GitHub Actions workflow (typecheck, lint, test, build) | ✅ **Fixed** (Present) |

---

## 3. Automated Test Verification

Execution command: `npm test`
```tap
TAP version 13
# Subtest: Authentication Security & Validation Rules
    ok 1 - rejects invalid or empty email addresses
    ok 2 - accepts valid corporate admin emails
    ok 3 - enforces password max byte limit (bcrypt 72-byte truncation boundary)
    ok 4 - hashes session tokens with SHA-256 with consistent length
ok 1 - Authentication Security & Validation Rules
# Subtest: Contact Inquiries Validation Rules
    ok 1 - validates email formatting accurately
    ok 2 - validates input lengths according to specification
    ok 3 - escapes HTML entities to prevent XSS payloads
ok 2 - Contact Inquiries Validation Rules
# Subtest: CSV Export Formula Injection Sanitization
    ok 1 - neutralizes formula injection strings
    ok 2 - handles normal benign inputs properly
ok 3 - CSV Export Formula Injection Sanitization
# Subtest: CMS Section & Content Validation
    ok 1 - accepts all 10 registered section keys
    ok 2 - rejects unregistered section keys
    ok 3 - validates locale strings
ok 4 - CMS Section & Content Validation
# tests 12
# suites 4
# pass 12
# fail 0
```

---

## 4. What a Senior Engineer Would Do Next (Backlog)

1. **Domain Verification in Resend**:
   * Verify the official domain `mkanconcept.ae` on [resend.com/domains](https://resend.com/domains) and update `CONTACT_EMAIL_FROM` to `inquiry@mkanconcept.ae`.
2. **Cloudflare R2 Storage Activation**:
   * Provision the Cloudflare R2 bucket (`mkan-assets`) and configure the 5 environment keys in production for permanent zero-egress asset storage.
3. **Multi-Region MongoDB Replica Set**:
   * Ensure MongoDB Atlas M10+ replica set is deployed in Middle East (`me-south-1` or `uae-north`) for lowest latency in UAE/GCC.
4. **Arabic (RTL) Localization Layer**:
   * Extend `locale: "ar"` in `SiteSection` schema to support full bilingual English/Arabic luxury editorial content.

---

## 5. Top 10 Lessons from this Project

1. **Never Rely on `.env.example` at Runtime**: Next.js only loads `.env` / `.env.local`. Always keep `.env.example` as a sanitised documentation template.
2. **Sanitize CSV Exports Against Formula Injection (CWE-1236)**: User input rendered into spreadsheets must be escaped if beginning with `=`, `+`, `-`, `@`.
3. **Defense-in-Depth Authorization**: Middleware/proxy checks can be bypassed if misconfigured; always call `requireAdmin()` inside every Server Action and mutation handler.
4. **Token Hashing Before Storage**: Never store plaintext session tokens in the database. Use SHA-256 hashing so compromised database read dumps cannot forge sessions.
5. **Always Enforce Bcrypt 72-Byte Truncation Bounds**: Prevent denial of service from abnormally long password strings before hitting the hash algorithm.
6. **Graceful Seed Fallback**: Production sites should never crash when the database is restarting; falling back to static seed data guarantees 100% uptime for public visitors.
7. **Client-Side Image Pre-Compression**: Compress high-res images in the browser canvas before upload to respect serverless platform payload limits (4.5MB).
8. **Native Node.js Test Runners Keep Toolchains Clean**: `tsx --test` runs TypeScript unit tests in under 1 second without massive node_modules dependencies.
9. **Accessible Motion Choreography**: High-end luxury animations must always check `prefers-reduced-motion` to ensure an inclusive, nausea-free experience.
10. **Layered Error Boundaries**: Always provide both page-level and global error boundaries to prevent unstyled React hydration crashes.

---

## 6. Not Verified List (Requires Real Accounts / Hardware)

* Real physical device Safari on iPhone 16 Pro (tested via Chromium & WebKit device emulation)
* Production Cloudflare R2 object bucket upload (requires live Cloudflare API credentials)
* Real live domain DNS propagation on `mkanconcept.ae`

---

## 7. Release Verdict

### **Verdict: READY FOR PRODUCTION (WITH PRE-FLIGHT CHECKLIST)**

**Conditions for Live Deployment**:
1. Run `npm run seed` on the production database.
2. Verify production domain `mkanconcept.ae` in Resend and set `CONTACT_EMAIL_FROM`.
3. Configure Cloudflare R2 storage credentials in production environment variables.
