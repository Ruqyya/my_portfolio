# 02 · Audit of the previous site, and the creative direction

## Audit of the site before the redesign

Inspected live at https://ruqyya.github.io/my_portfolio/ and in the repository (React 19, Vite, Tailwind 4, Framer Motion, React Router, GitHub Pages deploy).

| Area | Finding | Decision |
|---|---|---|
| First impression | Blue/teal SaaS template: blue-and-white, glass cards, heartbeat line, floating chips. Looks like many healthcare landing pages. | **Redesigned** |
| Positioning | "Designing Digital Products That People Love" is generic; healthcare and SaaS only appear below. | **Rewritten** to the three-user statement from the Oladoc work |
| Projects | Identical card grid, auto-generated summaries. | **Redesigned** as an editorial showcase |
| Case studies | Earlier version used invented personas, competitors and durations. | **Removed.** Replaced with real films, covers and only facts that appear in the work |
| Contact | Form had no backend and showed a fake "Message sent". | **Removed.** Direct email, phone, LinkedIn, Behance |
| Proof | Testimonials, awards, counters and employers are supplied by the owner and could not be verified by me. | **Retained as supplied** (owner confirmed they are real). Flagged below |
| SEO | Canonical pointed at another domain; missing share image; sitemap listed non-existent pages. | **Fixed** |
| Accessibility | Small tap targets, low-contrast greys, invalid list markup. | **Fixed** (Lighthouse accessibility 100 on the home page) |
| Performance | Heavy animation library, blocking loader, large bundle. | **Improved** (see quality report) |
| Mobile | Worked, but long and repetitive. | **Rebuilt** mobile-first |

### Retained
All projects, films, covers, experience history, services, process, FAQ, testimonials, awards, certifications, contact details, portrait.

### Introduced
Editorial layout, the "three portals" hero figure, video-first project pages, light and dark themes, skip link, reduced-motion handling, a real design system.

### Removed
Fake contact form, loader screen, glass cards, heartbeat graphics, floating chips, counters animation, duplicate tools section, the Behance-style auto-generated case-study text.

## Three concepts

### A · Margin Notes (selected, then re-coloured as "Teal & Gold")
- **Note:** the first build used a warm bone-paper and forest-green palette. After review, the owner asked for the colour theme of the Shumaila's London project, so the palette and display font were replaced (see `03-DESIGN-SYSTEM.md`). The layout, interactions and structure of this concept are unchanged.
- **Philosophy:** A designer's working notebook. The page is calm and editorial; the work is annotated like a marked-up proof.
- **Personality:** Calm, precise, editorial, a little wry.
- **Colour (current):** Deep teal surfaces with a soft gold accent, over pale mint paper. Gold is the action and emphasis colour on teal; teal is the action colour on mint.
- **Type (current):** Cormorant Garamond (display serif, italic for emphasis), Hanken Grotesk (body), IBM Plex Mono (labels).
- **Layout:** 12-column, asymmetric pairs, generous whitespace, hairline rules, numbered sections.
- **Hero:** Headline plus a real Oladoc figure with three portals that can be explored.
- **Project showcase:** One full-width lead, offset pairs, then a grid and a typographic archive.
- **Case study:** Film first, facts from the work, next-project link.
- **Motion:** Short, transform-led reveals; underline draw; outline hand-offs between regions. Nothing loops except the hero tab rotation, which pauses on hover and focus.
- **Mobile:** Single column; large serif type; tabs wrap.
- **Why it suits a healthcare designer:** Trust through restraint and legibility, without clinical clichés.
- **Difference from the ten researched:** Warm light palette, serif display, and a navigable multi-user figure; most researched sites use dark or neutral sans layouts with stat rows.

### B · Light Table
- **Philosophy:** Projects as slides on a lightbox in a dark room.
- **Look:** Charcoal background, film-frame borders, monospace captions, amber accent.
- **Risk:** It is the "dark background, big headline, card grid" pattern the owner wants to avoid.

### C · Ward Round
- **Philosophy:** The visitor walks a hospital corridor: patient room, doctor's office, front desk. Horizontal scroll journey through the whole portfolio.
- **Risk:** Horizontal scroll-jacking is hard to make accessible, fragile on mobile, and costly to maintain.

### Evaluation

| Criterion | A Margin Notes | B Light Table | C Ward Round |
|---|---|---|---|
| Originality | High | Low–medium | Very high |
| Credibility | High | Medium | Medium |
| Usability | High | High | Low–medium |
| Accessibility | High | Medium (dark theme contrast care) | Low |
| Maintainability | High | High | Low |
| Recruiter appeal | High | Medium | Unknown, risky |

**Choice: A**, with one idea borrowed from C (the three rooms) used as a single contained interaction instead of the whole structure. This is not the safest layout available, but it is the strongest balance of originality and trust. C is the more daring option and would be the better portfolio only if it could be built fully accessibly.

## Signature interactions

| Idea | Status |
|---|---|
| **Three portals figure (hero)** | **Built.** Real Oladoc cover, three regions measured on the image, keyboard-operable tabs, auto-rotation pauses on hover and focus, caption text taken from what the cover shows |
| Case-study navigation / chapters | **Not built.** I have no verified timestamps for the video scenes |
| Before-and-after comparison | **Not built.** No paired before/after assets exist |
| Design decision explorer | **Not built.** No verified alternatives-considered content |
| Research-to-impact visualisation | **Not built.** No verified research findings or metrics |

These four need real material from the owner; building them with invented content would break the "never invent" rule.
