# 03 · Design system: "Teal & Gold"

The palette comes from the Shumaila's London project cover: deep teal ground, a brighter teal glow, a soft gold accent and pale mint paper. Sampled values: teal `#0A464E`, glow `#1B8C96`, gold `#F5DC95`, mint `#E9F4F4`.

Tokens live in `src/index.css` (CSS variables, wired into Tailwind v4 through `@theme`). Change a value there and the whole site follows.

## Surfaces
- **Paper (default):** pale mint in the light theme, near-black teal in the dark theme. Used for Work, Approach, Experience and FAQ.
- **Deep (`.surface-deep`):** deep teal with a soft teal glow in the top-right corner. Used for the navigation, hero, testimonials, contact, footer and the top of every project page. It looks the same in both themes. Inside it the action colour becomes gold.

## Colour

| Token | Light | Dark | Deep surface | Use |
|---|---|---|---|---|
| `paper` | `#F2F8F8` | `#061E22` | `#0A464E` | Background |
| `paper-2` | `#E2EFEF` | `#0B2C32` | `#0E5660` | Frames, hover surfaces |
| `ink` | `#0A2F34` | `#E6F2F2` | `#FFFFFF` | Primary text |
| `ink-2` | `#3D5F64` | `#9BBDC0` | `#B9D9DB` | Secondary text |
| `line` | `#BBD3D5` | `#1C474D` | `#2F7780` | Hairlines (decorative) |
| `forest` | `#0E6A72` | `#4DC6CC` | `#F5DC95` | Actions, links, emphasis |
| `on-forest` | `#FFFFFF` | `#04262B` | `#0A464E` | Text on action buttons |
| `signal` | `#8A6414` | `#F5DC95` | `#F5DC95` | Section numbers, active state |

Rule: one action colour (teal on paper, gold on deep teal) and one annotation colour (gold). Annotation is never used for body text blocks.

### Measured contrast (WCAG 2.2 AA needs 4.5:1 for text, 3:1 for large text and UI)
| Pair | Ratio |
|---|---|
| ink on paper (light) | 13.31 |
| ink-2 on paper (light) | 6.48 |
| ink-2 on paper-2 (light) | 5.90 |
| forest on paper (light) | 5.89 |
| forest on paper-2 (light) | 5.36 |
| on-forest on forest (light) | 6.32 |
| signal on paper (light) | 5.00 |
| ink on paper (dark) | 15.08 |
| ink-2 on paper (dark) | 8.58 |
| ink-2 on paper-2 (dark) | 7.34 |
| forest on paper (dark) | 8.45 |
| signal on paper (dark) | 12.79 |
| white on deep teal | 10.51 |
| ink-2 on deep teal | 7.01 |
| ink-2 on deep paper-2 | 5.56 |
| gold on deep teal | 7.78 |
| deep teal on gold (buttons) | 7.78 |

The brighter teal `#1B8C96` from the cover is used only as a faint glow far from text, because white on it is 4.01 and light grey text on it is 2.67. `line` is decorative only and never carries information on its own.

## Typography

| Role | Family | Fallbacks |
|---|---|---|
| Display | Cormorant Garamond 400–700 plus italic, used at weight 500 (the serif used on the Shumaila's cover) | metric-matched Georgia / Times New Roman, then serif |
| Body | Hanken Grotesk 400–700 | system UI sans |
| Metadata | IBM Plex Mono 400–500, uppercase, 0.08em tracking | system monospace |

The display fallbacks use `size-adjust`, measured against Cormorant Garamond for upright and italic separately (Georgia 88.1% / 79.6%, Times New Roman 96.9% / 89.3%), so the page does not jump when the web font loads (measured layout shift 0.017 on mobile, 0.005 on desktop).

Scale (fluid with `clamp`):
- Hero headline `clamp(3rem, 7.2vw, 6.8rem)`, line height 1.02, weight 500, emphasis in italic gold.
- Section headline `clamp(2.3rem, 5vw, 4.3rem)`, line height 1.08.
- Contact headline `clamp(3rem, 8vw, 7.4rem)`, line height 1.
- Body 17px, line height 1.6. Lead paragraphs 18–20px.
- Mono labels 12px.
- Text width: body copy capped around 36–42rem.

## Layout

- Container: `max-w-[88rem]`, side padding 20px (mobile) and 40px (md and up).
- Grid: 12 columns from `lg` (1024px). Gaps 32–40px.
- Section rhythm: top padding 112px (mobile) / 160–176px (md and up); no section backgrounds, rules do the separating.
- Breakpoints: Tailwind defaults (640, 768, 1024, 1280).
- Frames: 1px `line` border, `paper-2` mat, 8–16px padding, square corners. The portrait uses an arch (`rounded-t-full`). Pills are used only for buttons and tabs.
- Image ratios: 16:9 for lead films, 16:10 for cards and posters.
- Depth: one soft shadow on the hero figure only; hover lifts of 4px.

## Components (in `src/components`)

| Component | File | Notes |
|---|---|---|
| Navigation | `layout/Nav.tsx` | Fixed, blurs on scroll, theme toggle, mobile menu with `aria-expanded` |
| Footer | `layout/Footer.tsx` | |
| Eyebrow | `ui/Eyebrow.tsx` | Numbered section label |
| Reveal | `ui/Reveal.tsx` | Scroll reveal via IntersectionObserver and CSS |
| ProjectMedia | `ui/ProjectMedia.tsx` | Silent preview loop that plays only while visible; poster for reduced motion |
| Hero + three portals | `sections/Hero.tsx` | Tabs, auto-rotation, pause on hover/focus |
| Work | `sections/Work.tsx` | Lead, offset pairs, grid, archive with hover preview |
| Approach | `sections/Approach.tsx` | Portrait, philosophy, eight-step process |
| Experience and Capabilities | `sections/Experience.tsx` | Timeline and service list |
| Voices | `sections/Voices.tsx` | Featured quotes, other reviews, awards, certifications |
| FAQ | `sections/Faq.tsx` | Native `<details>` |
| Contact | `sections/Contact.tsx` | Direct links only |
| Project page | `pages/ProjectDetail.tsx` | Film, facts, optional narrative blocks |

Links: underline draws in on hover (`link-draw`). Buttons: forest fill for the primary action; outlined for secondary; minimum height 44px.

## Motion rules
- Hero text and figure animate transforms only (no opacity), so text paints immediately.
- Scroll reveals: 0.7s ease-out-expo, 24px lift, staggered by at most 0.1s.
- Nothing autoplays with sound. Preview loops are silent and pause off-screen.
- `prefers-reduced-motion`: reveals show immediately, loops show the poster, hero rotation is off, global transitions shortened.
- No parallax, no cursor effects, no scroll-jacking.

## Accessibility rules
- Skip link first in the tab order; `main` landmark; one `h1` per page.
- Visible 2px focus ring in `forest` with 3px offset.
- Tabs follow the tablist pattern (`role`, `aria-selected`, `aria-controls`); the caption is a polite live region.
- Meaningful `alt` text on content images; decorative images empty.
- Minimum 44px targets for buttons and nav controls.
- Videos on project pages have controls and a poster; there is no caption track yet (see quality report).

## Maintaining content
- Project data: `src/data/behance-projects.json` (slugs, covers) plus `src/data/case-studies.ts` (summary, video, preview, poster, cover, optional role, duration, tools, problem, solution, outcome, results).
- Site copy: `src/data/content.ts` (experience, services, process, testimonials, awards, FAQ).
