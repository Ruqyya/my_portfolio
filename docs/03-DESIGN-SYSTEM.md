# 03 · Design system: "Porcelain & Ink"

Tokens live in `src/index.css` (CSS variables, wired into Tailwind v4 through `@theme`). Change a value there and the whole site follows.

## How the palette evolved

1. **Teal & Gold** (first redesign): taken from the Shumaila's London project. Rejected by the owner.
2. **Ivory & Ink**: the owner's starting direction (ivory, midnight ink, deep teal, champagne, stone), tested against two alternatives (a dark-first "Midnight Gallery" and a copper-accented "Stone & Cedar", which failed contrast). Selected.
3. **Porcelain & Ink** (current): a second pass that deepens the palette into four named roles: **midnight ink**, **warm porcelain**, **deep botanical teal** and **restrained champagne**, with better contrast and a third surface so the page has a rhythm instead of two flat tones.

Research note: the Perplexity connector was not available. Web searches returned general trend articles only (warm neutrals replacing cool greys, deep teals read as stable, restrained accents and refined serif type for premium brands), so the palette rests on contrast measurements and side-by-side renders, not on a documented trend.

## Surfaces and rhythm

| Surface | Class | Used for |
|---|---|---|
| Warm porcelain | default / `.sheet-light` | Expertise, More projects, About and process |
| Stone tint | `.surface-tint` | Experience, FAQ (soft teal and champagne wash) |
| Midnight ink | `.surface-deep` | Nav, hero, the three featured projects, contact, footer |
| Botanical teal | `.surface-teal` | Client reviews, the mid-page call to action |

Sections are "sheets": each one slides over the one above with a large rounded top edge (`.sheet`) instead of a straight cut, so the page reads as layered paper rather than stacked bands. Order down the page: ink, porcelain, ink, porcelain, stone, botanical teal, porcelain, stone, ink.

## Colour

| Token | Light | Dark theme | Ink surface | Botanical surface | Use |
|---|---|---|---|---|---|
| `paper` | `#F4F0E8` | `#0D171C` | `#0F1B21` | `#0E4C46` | Background |
| `paper-2` | `#E8E2D6` | `#15242B` | `#1A2A31` | `#145B54` | Frames, tints |
| `ink` | `#0F1B21` | `#F4F0E8` | `#F4F0E8` | `#F4F0E8` | Primary text |
| `ink-2` | `#44545A` | `#A9B7BA` | `#C5D0D2` | `#CFE0DC` | Secondary text |
| `line` | `#D6CFC0` | `#2A3B43` | `#2F434B` | `#2D716A` | Hairlines (decorative) |
| `forest` | `#12594F` | `#6FD0C8` | `#C9AA7A` | `#E4CFA6` | Actions, links, emphasis |
| `on-forest` | `#FFFFFF` | `#0D171C` | `#0F1B21` | `#0E4C46` | Text on action buttons |
| `signal` | `#7F5E33` | `#C9AA7A` | `#C9AA7A` | `#E4CFA6` | Section numbers, labels |

Each featured project also carries its own accent, taken from the project's palette, used only inside its panel: Oladoc orange `#FCA025`, Marham teal `#3CC2B5`, Sehat Kahani lime `#B4DC4A`.

### Measured contrast (WCAG 2.2 AA: 4.5:1 for text, 3:1 for large text and UI)
| Pair | Ratio |
|---|---|
| ink on porcelain | 15.41 |
| ink-2 on porcelain | 6.94 |
| ink-2 on stone | 6.12 |
| botanical teal on porcelain | 7.20 |
| botanical teal on stone | 6.34 |
| white on teal button | 8.18 |
| deepened champagne on porcelain | 5.20 |
| deepened champagne on stone | 4.58 |
| porcelain on midnight ink | 15.41 |
| ink-2 on midnight ink | 11.11 |
| ink-2 on ink surface-2 | 9.39 |
| champagne on midnight ink | 7.93 |
| midnight ink on champagne button | 7.93 |
| porcelain on botanical teal | 8.63 |
| ink-2 on botanical teal | 7.17 |
| ink-2 on botanical surface-2 | 5.78 |
| light champagne on botanical teal | 6.43 |

The per-project accents were chosen for use as large text, buttons and rules on the ink panel; they were not measured as small body text.

## Typography

| Role | Family | Delivery |
|---|---|---|
| Display | Cormorant Garamond, normal and italic, variable weight 400–700 (used at 500) | Self-hosted woff2 (Latin subset), preloaded |
| Body | Hanken Grotesk, variable 400–700 | Self-hosted woff2, preloaded |
| Metadata | IBM Plex Mono 400 and 500, uppercase, 0.08em tracking | Self-hosted woff2 |

Fonts are served from this site (OFL licence), not from Google, which removes a render-blocking request and a third-party call. Metric-matched fallbacks (`size-adjust`) are defined for all three families so nothing jumps while a file loads. Measured layout shift is 0 on the home page.

Scale: hero `clamp(2.9rem, 5.6vw, 5.6rem)`, section headings `clamp(2.5rem, 5.4vw, 4.8rem)`, featured headlines `clamp(2rem, 3.6vw, 3.3rem)`, body 18px at 1.65, labels 12px.

## Components (in `src/components`)

| Component | File | Notes |
|---|---|---|
| Navigation | `layout/Nav.tsx` | Fixed ink bar, five links, "Discuss a project", theme toggle, mobile menu |
| Floating email button | `layout/StickyCta.tsx` | Appears after the hero, hides near Contact |
| Hero | `sections/Hero.tsx` | Headline, value proposition, prefilled-email CTA, proof tiles, a layered stack of real Oladoc Figma screens that responds to three tabs, portrait badge, project marquee |
| Expertise | `sections/Expertise.tsx` | Who I help, what I solve, six evidence-linked capabilities (swipe row on phones) |
| Work | `sections/Work.tsx` | Three featured product stories, more projects, mid-page CTA, archive |
| Experience | `sections/Experience.tsx` | Five roles copied from LinkedIn, education |
| Voices | `sections/Voices.tsx` | Verified client reviews and LinkedIn credentials |
| Approach | `sections/Approach.tsx` | About, eight-step process, how we work together |
| FAQ | `sections/Faq.tsx` | Six questions |
| Contact | `sections/Contact.tsx` | Prefilled email, phone, LinkedIn, Behance |
| Case study page | `pages/ProjectDetail.tsx` | Film, 60-second summary, reading rail, sections shown only when data exists |
| Device frames, before/after, rail | `case/*` | Phone and browser frames, comparison slider, sticky section list |

Featured story panel: label, headline, then four fixed fields (The problem, My role, The key decision, What it delivers), a primary "Read the case study" button and a film link. Layout alternates sides; on phones the product screens come first.

## Motion rules
- Hero text animates transforms only (no opacity), so text paints immediately.
- Hero stack: choosing a tab (or the 4.6 s auto-rotation, which pauses on hover and focus) brings that portal's real screens to the front and the others dim.
- Scroll reveals: 0.7 s, 24 px lift. Silent preview loops play only while visible. `prefers-reduced-motion` shows content immediately and stops rotation and loops.
- No parallax, no scroll-jacking.

## Accessibility rules
- Skip link first; `main` landmark; one `h1` per page; visible focus ring in the action colour.
- Tabs follow the tablist pattern; the before/after slider is a labelled range input; the horizontal expertise row is a focusable, labelled scroll region.
- Meaningful `alt` text on content images. Minimum 44px targets for buttons.
- Videos have controls and a poster. There are no caption tracks yet.

## Maintaining content
- Case studies: `src/data/case-studies.ts` (every field optional; `delivered` describes the design, `measured` is only for sourced numbers).
- Featured projects and their identities: `features` in `src/components/sections/Work.tsx`.
- Site copy and verified proof: `src/data/content.ts` (unverified testimonials and awards are kept under `unverified…` exports and not shown).
- Contact details and the prefilled email: `src/data/contact.ts`.
