

# StepReset Landing Page

## Overview
A single-page landing page for "StepReset" — a 30-day fitness transformation protocol in Stepanavan, Armenia. Targeting Armenian software developers (25-35) who want to gift this to their moms (45-60). Design feels like a health-tech product page, not a spa brochure.

## Internationalization
- Copy `translation.json` into the project
- Create a `t()` helper function that reads nested keys (e.g., `t("hero.headline")`) — zero hardcoded strings

## Page Sections (15 total, top to bottom)

1. **Sticky Nav** — Brand name left, single "Reserve a Spot" CTA right (scrolls to form)

2. **Hero** — Large headline, subheadline, description, CTA button, trust line. Typography-driven, no background image.

3. **Problem Section** — Alternate background. Headline, two paragraphs, 4 icon cards (Lucide icons: activity, utensils, shield-off, rotate-ccw)

4. **System Section** — Two-phase cards (Camp + Home) side-by-side on desktop, stacked on mobile. Key metrics in monospace style. Weekly reporting block below. Feels like documentation.

5. **Founder Story** — Brief credibility section. Photo placeholder with caption, bold statement.

6. **How It Works (Dev's Perspective)** — 3 numbered step cards showing minimal dev effort. Callout box with bottom line statement.

7. **"Show This To Your Mom"** — Visually distinct (warm cream background, softer typography). Armenian headline. Letter rendered as a styled card. Highlight cards with icons. Designed to be screenshot-friendly for WhatsApp.

8. **Value Stack** — Grid of 7 core bundles + 9 bonuses. Subtotals, crossed-out grand total, prominent actual price (֏600,000), price context, CTA.

9. **Guarantee Section** — 3 guarantee cards with type badges (84% Refund / Conditional / Unconditional). Bold summary.

10. **Expected Results** — Data-oriented metrics table/cards (weight, steps, blood panel, recipes, support).

11. **Testimonials** — Honest placeholder: "First cohort forming, data coming soon."

12. **FAQ** — Accordion-style, 11 Q&A pairs. CTA at bottom.

13. **Contact Form** — Name + phone only. Spots counter (4 spots left). Success state on submit. All page CTAs scroll here.

14. **Final CTA** — Emotional close. Scrolls back up to form.

15. **Footer** — Minimal: brand, tagline, contact, copyright, location.

## Design System
- **Primary:** Muted forest green (#3D5A47)
- **Background:** Off-white (#FAFAF8)
- **CTA/Accent:** Warm amber (#C4873B)
- **"For Mom" section:** Warm cream (#FFF5EB)
- **Text:** Dark charcoal (#1A1A1A) headlines, medium grey (#4A4A4A) body
- **Typography:** Inter/DM Sans for headlines, clean sans-serif body, warm serif for the "For Mom" letter, monospace for metrics

## Interactions
- All CTA buttons smooth-scroll to contact form
- FAQ accordion expand/collapse
- Subtle fade-in scroll animations
- Form submit shows success message ("We'll call you within 24 hours")
- Mobile-first responsive design

