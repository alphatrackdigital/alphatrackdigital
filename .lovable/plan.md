

## AlphaTrack Digital — Full Website (React SPA)

### Overview
Convert the AlphaTrack Digital website from standalone HTML templates into a polished, component-based React application with consistent design system, shared layout, and routing across all pages.

---

### Design System & Brand Foundation
- **Dark theme** (#080808 background) with ATD green (#3ECF8E) and cyan (#00AFEF) accents
- **Roobert font** as primary (self-hosted WOFF2), Plus Jakarta Sans as fallback
- Glass/frosted effects, subtle grain texture overlays, green glow accents
- Consistent card style: rounded-2xl/3xl borders with white/10 borders, translucent backgrounds
- Hover micro-interactions (lift, border glow)

---

### Shared Components
- **Sticky Header** — glassmorphism nav bar with logo, nav links (Home, About, Services, Blog, Contact), "Book a Call" CTA button, mobile hamburger menu
- **Footer** — 4-column layout with logo, description, useful links, contact info (Accra | Lagos)
- **Breadcrumb** component for service pages
- **CTA Section** — reusable "Book a Call" banner
- **Service Tier Card** — reusable pricing/tier component
- **FAQ Accordion** — expandable question/answer component

---

### Pages (8 total)

#### 1. Home Page *(new — designed to match)*
- Hero section with bold headline, description, and dual CTAs
- Services overview cards linking to individual service pages
- Social proof / trust signals
- Final CTA section

#### 2. About Us *(new — designed to match)*
- Company mission and story
- What makes ATD different (measurement-first approach)
- Team or values section
- CTA to book a call

#### 3. Services Hub *(new — designed to match)*
- Overview of all services with card grid
- Each card links to its dedicated service page
- Designed to easily add new service cards later

#### 4. Contact Us *(new — designed to match)*
- Contact information (phone, email, locations)
- Simple contact form (static — no backend submission)
- Map or location reference

#### 5. Conversion Tracking & Measurement *(from uploaded template)*
- Full conversion from HTML: hero, micro-audit, problem/solution sections, before/after comparison, pricing tiers, FAQ, CTAs
- SVG tracking architecture diagram preserved

#### 6. Marketing Automation & CRM *(from uploaded template)*
- Full conversion from HTML: hero, problem section, 4-step framework, 3 pricing tiers, FAQ accordion, CTAs

#### 7. Book a Call *(from uploaded template)*
- Hero with breadcrumb, two-column layout
- Left: positioning copy, "what to expect" cards, ideal client checklist
- Right: Brevo Meetings embed placeholder (ready for iframe swap)
- Reassurance bar

#### 8. Book a Call — Thank You *(from uploaded template)*
- Confirmation card with checkmark animation
- "What happens next" step list (01/02/03)
- CTAs to explore services or return home
- noindex meta tag for SEO

---

### Routing
| Path | Page |
|------|------|
| `/` | Home |
| `/about-us` | About Us |
| `/service` | Services Hub |
| `/service/conversion-tracking` | Conversion Tracking |
| `/service/marketing-automation` | Marketing Automation |
| `/contact-us` | Contact Us |
| `/book-a-call` | Book a Call |
| `/book-a-call/thank-you` | Thank You |

---

### Technical Approach
- React Router for all navigation (SPA with no page reloads)
- Shared `Layout` component wrapping header + footer around all pages
- Tailwind config extended with ATD brand colors, shadows, and gradients
- Roobert font loaded via CSS `@font-face` (you'll upload the WOFF2 files)
- Fully responsive (mobile-first), matching the uploaded templates' breakpoints
- Accessible: focus rings, skip links, reduced-motion support, semantic HTML
- No backend needed — all static content, external links for Brevo/forms

