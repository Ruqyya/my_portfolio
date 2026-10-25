# 14 · Going live on your own domain

Everything below is already built. Three values and one setting switch it from "works on GitHub Pages" to "fully live".

## 1. Booking link
Create a free Cal.com or Calendly event ("15-minute intro call"). In `src/data/contact.ts` set:
```
export const BOOKING_URL = "https://cal.com/your-name/intro";
```
The "Book a 15-minute call" button then opens your calendar in a new tab. Until then it opens an email already written as a booking request.

## 2. Contact form
Create a free form at formspree.io, copy its URL, and set:
```
export const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
```
The form then posts directly (name, email, company, project type, message) and shows "message sent". It has validation, a hidden spam trap and a clear error if sending fails. If the endpoint is ever left empty, it falls back to opening the visitor's email app with the message written out, so no enquiry is lost. Connected to Formspree form maeeqyqr; the first real submission may trigger a Formspree confirmation email to you.

## 3. Domain
1. Buy the domain. In the repository settings (Pages) add it as the custom domain, and add the DNS records GitHub shows.
2. In `vite.config.ts` change `base: '/my_portfolio/'` to `base: '/'`.
3. In `src/data/contact.ts` set `SITE_URL = "https://yourdomain.com"`. The build rewrites the canonical link, share tags, sitemap and robots file from that one value.
4. Push to `main`.

## Already done for launch
- Every case study has its own HTML page (title, description, share tags), so direct links return HTTP 200 and search engines can index them. This was a known issue on GitHub Pages and is fixed by the build (`scripts/postbuild.mjs`).
- Sitemap and robots file are generated from the real project list.
- The "View on Behance" links point to your newest Behance pages.
- A "More on Behance" gallery shows six more projects chosen for product and SaaS relevance, and links to all your projects.

## Still needs you (cannot be written for you)
Measured results with a method, trade-offs and lessons for the other nine projects, real testimonials with sources, video captions or transcripts, and content for the Behance-only pages. See `docs/05` and `docs/07`.

## Brand name and logo (24 Oct 2026)
Site name is **Ghulam Ruqyya** (decided 25 Oct 2026), used in titles, share tags, search data, the footer and the About caption. Logo: your GR ring monogram as a true vector (`public/brand/gr-monogram.svg`, plus `src/components/ui/grGlyph.ts` for the site), filled with the brand gradient (white to aqua) on dark. It is sharp at any size. Favicon: `public/favicon.svg` and `public/favicon.png`; share image: `public/og-image.png`.

## Results slots (placeholders)
Each case study can show a row of three measured results. Real numbers go in that project's `measured` list in `src/data/case-studies.ts` (`{ value: "+42%", label: "task completion", source: "how it was measured" }`). To review the layout with dummy values, set `SHOW_PLACEHOLDER_RESULTS = true` in `src/data/contact.ts`; the row then shows "+00%" style placeholders, marked "Placeholder". Keep it `false` on the public site: placeholders are not results, and invented numbers could be checked and disproved by a client.

## Domain: ghulamruqyya.online (prepared 26 Oct 2026, branch `domain`)
Already changed in code: `base: '/'` in `vite.config.ts`, `SITE_URL` in `src/data/contact.ts`, `public/CNAME`, `public/robots.txt`. The build, canonical links, share tags and sitemap all use the new address. Tested at the root path on a local server: no overflow, no broken images.

**DNS records to add at your domain registrar** (the domain did not exist in DNS when checked on 26 Oct, so it may need to be registered or its nameservers set first):
| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | ruqyya.github.io |

**Order matters:** add the DNS records first, wait until `ghulamruqyya.online` resolves (usually 10 to 60 minutes, sometimes a day), then merge `domain` into `main` and set the custom domain in GitHub Pages (Settings, Pages) and tick Enforce HTTPS. If the code goes live before DNS works, the old address stops working.
