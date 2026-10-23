# 04 · Quality report, known limits, and how to deploy

Measured on 23 Oct 2026 against a local production build (`vite preview`), Chrome headless, Lighthouse with its default simulated throttling. Local numbers are a guide; re-measure after deploying.

## Lighthouse (Midnight & Cyan build, branch `signature`, 24 Oct 2026, local production build)

| Page | Device | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Home | Mobile | 83 | 100 | 100 | 100 | 4.4 s | 0 | 20 ms |
| Home | Desktop | 95 | 100 | 100 | 100 | 1.5 s | 0 | 0 ms |
| Oladoc case study | Mobile | 93 | 100 | 100 | 100 | 3.1 s | 0 | 10 ms |
| Oladoc case study | Desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |

Colour-contrast audit: 0 failures in all four runs. Home mobile performance is still below 90: the page is client-rendered, so first paint waits for the JavaScript (about 79 KB gzipped). Pre-rendering at build time would fix it and was not done.

Device checks this pass (puppeteer, phone 390, tablet 820, desktop 1440): no horizontal overflow and no broken images on home (all three), Oladoc (phone), Marham (tablet), Sehat Kahani (desktop) and Coffee (phone); no JavaScript errors; the only failed requests were cancelled video downloads. The decision explorer was driven by keyboard (ArrowDown moved focus and selection together).

Not done: screen-reader testing, real-device touch testing, a keyboard walk-through of every control, captions, reduced-motion screenshots, the mobile menu opened in a test.

## Responsive checks
Run with puppeteer-core driving the installed Chrome at real device sizes (phone 390×844 at 2× pixel density with touch, tablet 820×1180, desktop 1440×900), scrolling the whole page so scroll reveals fire, then checking horizontal overflow, broken images, console errors and failed requests, and saving full-page screenshots.

| Page | Phone | Tablet | Desktop |
|---|---|---|---|
| Home | no overflow, no broken images | no overflow, no broken images | no overflow, no broken images |
| Oladoc case study | no overflow, no broken images | not run | no overflow, no broken images |
| Marham case study | not run | no overflow, no broken images | no overflow, no broken images |
| Zental case study | no overflow, no broken images | not run | not run |
| Sehat Kahani case study | not run | no overflow, no broken images | not run |
| Coffee (Behance-only page) | no overflow, no broken images | not run | not run |

The only failed requests were the browser cancelling video downloads when a video scrolled out of view or was paused, which is normal. No JavaScript errors were logged. Earlier checks at 320 and 1920 px found no overflow on the home page and the Oladoc page.

Screenshots of the final render are in `docs/screens/`.

## Accessibility checks performed
- Lighthouse accessibility 100 (home page, mobile and desktop).
- Contrast ratios computed for every text colour pair in both themes (see design system).
- One `h1` per page, skip link is the first focusable element, no positive `tabindex`, every image has an `alt` attribute, external links use `rel="noreferrer"`.
- All in-page anchors (`#work`, `#approach`, `#experience`, `#contact`) have matching targets.

**Not done:** screen reader testing (NVDA, VoiceOver, TalkBack); a manual keyboard walk-through of every control; touch testing on real devices; captions or transcripts for the project videos; an automated audit of the project pages.

## Functional checks performed
- Hero tabs switch the highlighted region and caption; auto-rotation runs and pauses.
- Theme toggle works and persists; dark mode renders.
- Project pages play the full film with controls; Oladoc's old URL redirects to the current one.
- All ten full films and posters load.
- Scroll reveals complete for every section when scrolled through (verified after a false alarm caused by the preview pane being hidden).

**Not done:** clicking every external link live (LinkedIn, Behance); a test of every project page; the mobile menu was built and the toggle verified in code but not opened in a browser test.

## Known limitations and decisions
- **No contact form.** There is no backend, and the brief asked for no non-functional forms. Contact is by direct links.
- **No "Book a call" link.** It needs a booking URL you have not supplied.
- **Four signature interactions were not built** (chapters, before/after, decision explorer, research-to-impact) because the real material does not exist yet. See `02-AUDIT-AND-DIRECTION.md`.
- **Unverified content, kept as you supplied it:** the named testimonials, awards, certifications, employers (Meridian Health, Northwind Digital, Aster Systems), and the figures "6+ years", "120+ projects", "60+ clients", "18 awards", "98%" (the last four are still held in `content.ts`, but the redesign only shows "6+ years"). A hiring manager can check these. Adding a link, photo or LinkedIn reference to each testimonial would help.
- **Case studies are films, not written studies.** There are no invented metrics. When you have real research, outcomes or numbers, add them in `src/data/case-studies.ts` and they appear on the project page.
- **Google Fonts** are loaded from Google's servers. Self-hosting would improve privacy and speed but needs a new dependency decision.
- **Direct links to project pages** return HTTP 404 on GitHub Pages (the page still loads for visitors). Search engines may not index them. A host with rewrite rules (Netlify, Vercel, Cloudflare Pages) or a custom domain would fix it.
- **Removed dependencies:** framer-motion, react-intersection-observer, react-countup, swiper, @fontsource/inter. None were used after the redesign.
- **Third-party Behance embeds** (for the five projects with no film yet) cannot be audited or styled.

## Preview locally
```bash
cd D:\Projects\my_portfolio
npm ci
npx vite              # development server
```

## Build
```bash
npx tsc -b
npx vite build        # output in dist/
npx vite preview      # serve the production build at http://localhost:4173/my_portfolio/
```
(`npm run build` also runs a Behance fetch before building. On this Windows setup that step can crash at exit; the two commands above skip it. Behance data in `src/data/behance-projects.json` is only refreshed by that step.)

## Deploy to GitHub Pages
The existing workflow (`.github/workflows/deploy.yml`) builds and publishes whenever `main` is pushed.

1. Review this branch (`redesign`) locally.
2. Open a pull request into `main`, or merge it yourself.
3. Pushing to `main` deploys in about two minutes.
4. Hard-refresh (Ctrl+F5) to skip the cached old version.

To go back: revert the merge commit on `main` and push.

## Adding a project film
1. Put the video in `public/videos/` and make a small silent preview (`ffmpeg -an -vf scale=1280:720 -crf 31`), a poster JPG and a cover JPG.
2. Add an entry keyed by the project slug in `src/data/case-studies.ts` with `video`, `preview`, `poster`, `cover` and `summary`.
3. Add real details when you have them: `role`, `duration`, `tools`, `problem`, `solution`, `outcome`, `results`. Only filled fields are shown.

## Before / after
| | Before | After |
|---|---|---|
| Look | Blue-teal SaaS template, glass cards, heartbeat graphics | Warm editorial paper, serif display type, forest green and one annotation colour |
| Headline | "Designing Digital Products That People Love" | "Healthcare software, designed for the patient, the doctor and the front desk." |
| Hero | Floating chips and a mock phone | A real Oladoc figure with three portals you can step through |
| Projects | Identical cards | One lead, offset pairs, grid, archive; real films |
| Case studies | Generic generated text | Real film, cover and only facts from the work |
| Contact | Form that sent nothing | Direct email, phone, LinkedIn, Behance |
| Mobile Lighthouse performance | Not measured on the old site (the first build of the redesign scored 57) | 82 |
| Accessibility | Unaudited | Lighthouse 100 |
