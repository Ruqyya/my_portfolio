# Creative Ruqyya — Senior UI/UX Designer Portfolio

A production-ready static portfolio site for **Ghulam Ruqyya**, Senior UI/UX Designer specializing in healthcare and e-commerce.

Built with React 18, Vite, Tailwind CSS, Framer Motion, and React Router (HashRouter for GitHub Pages compatibility).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/     # Reusable UI (Navbar, ProjectCard, etc.)
├── data/
│   ├── site.js     # Bio, experience, skills, contact info
│   └── projects.js # All portfolio projects (single source of truth)
├── pages/          # Route-level pages
└── index.css       # Tailwind directives + custom keyframes
public/
└── images/projects/  # Project screenshots organized by slug folder
```

## Adding a New Project

1. **Add images** to `public/images/projects/your-project-slug/`

2. **Add an entry** to the array in `src/data/projects.js`:

```js
{
  id: "your-project-slug",
  slug: "your-project-slug",
  title: "Project Title",
  category: "Healthcare",           // Primary category (shown on card)
  categories: ["Healthcare", "SaaS"], // All filter categories
  featured: true,                   // Show on home page?
  year: "2026",
  client: "Client Name",            // Use "Personal Project" if none
  deliverables: ["UI Design", "Prototypes"],
  tools: ["Figma", "Maze"],
  thumbnail: "/images/projects/your-project-slug/cover.png",
  cardSize: "large",                // "large" | "medium" | "small" | "default"
  description: "One-line for card hover",
  excerpt: "One-line for case study header",
  process: "First-person case study paragraph(s). Use \\n\\n for paragraph breaks.",
  gallery: [
    {
      src: "/images/projects/your-project-slug/screen-1.png",
      alt: "Descriptive alt text for accessibility",
      width: 1290,
      height: 2796,
    },
  ],
}
```

3. Save — the project automatically appears on the Projects page and (if `featured: true`) the Home page.

## Updating Resume / Bio Content

Edit `src/data/site.js` — this file contains:

- Name, role, tagline, summary
- Skills, tools, certifications
- Work experience timeline
- Education
- Contact info (email, LinkedIn, location)

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. Preview locally:

```bash
npm run preview
```

## Deploying

### GitHub Pages

1. Push the repo to GitHub
2. Run `npm run build`
3. Deploy the `dist/` folder (e.g. using `gh-pages` branch or GitHub Actions)
4. HashRouter is already configured — no server-side routing needed

### Netlify

1. Connect your repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. No redirects needed (HashRouter handles routing)

## Design Notes

- **Accent color:** Electric orange (`#FF4D00`) — change in `src/index.css` under `@theme`
- **Fonts:** Space Grotesk (headlines) + Inter (body) via Google Fonts
- **Custom cursor:** Desktop only, automatically disabled on touch devices
- **Contact page:** Primary CTA links to LinkedIn profile (not email)

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | UI framework & build tool |
| Tailwind CSS v4 | Styling |
| React Router (HashRouter) | Client-side routing |
| Framer Motion | Animations & page transitions |
| lucide-react | Icons |
