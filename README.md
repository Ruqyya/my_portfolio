# Creative Ruqyya — Product Designer Portfolio

A premium, production-ready portfolio website built with React 19, Vite, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To build for production:

```bash
npm run build
npm run preview
```

## Stack

- **React 19 + TypeScript + Vite** — app shell and tooling
- **Tailwind CSS v4** — styling via the official Vite plugin (`@tailwindcss/vite`), design tokens defined in `src/index.css`
- **Framer Motion** — scroll reveals, page transitions, micro-interactions
- **React Router** — routing for the homepage and individual case-study pages (`/work/:slug`)
- **Swiper.js** — testimonials carousel
- **React CountUp** + **react-intersection-observer** — animated, scroll-triggered stat counters
- **Lucide React** — icon set
- **@fontsource/inter** — self-hosted Inter font (no external font requests)

## Structure

```
src/
  components/
    layout/     Navbar, Footer, ScrollProgressBar, BackToTop, PageLoader
    sections/   Hero, About, Skills, Projects, Experience, Services,
                Process, Testimonials, Numbers, Awards, Tools, FAQ, Contact
    ui/         Reveal, SectionHeading, ProjectCard, PulseDivider
  pages/        Home, ProjectDetail, NotFound
  data/         projects.ts, content.ts — all site copy lives here
  context/      ThemeContext (dark/light mode, persisted to localStorage)
  hooks/        useScrollProgress
public/
  favicon.svg, robots.txt, sitemap.xml
```

## Design notes

- Color palette, dark mode background, and typography follow the brief exactly
  (`#2563EB` / `#7C3AED` / `#14B8A6` on white, `#0F172A` dark background, Inter for
  both display and body text).
- The signature visual motif is a pulse/EKG line (`PulseDivider`) that threads
  through section breaks — a nod to the designer's healthcare specialty that
  also reads as a precise, data-driven divider rather than pure decoration.
- All 8 case studies (`src/data/projects.ts`) include problem, solution, role,
  duration, tools, results, research notes, personas, competitor analysis,
  and a "next project" link — edit this file to swap in real project content
  and imagery.
- Swap the placeholder gradient blocks in the hero and case-study pages for
  real photography/screenshots by dropping images into `src/assets` and
  updating the relevant components.
- Dark mode toggle lives in the navbar and persists via `localStorage`.

## Editing content

Nearly everything text-based (stats, skills, services, testimonials, FAQs,
experience, awards, tools) lives in `src/data/content.ts`. Case studies live
in `src/data/projects.ts`. No content is hardcoded inside components.
