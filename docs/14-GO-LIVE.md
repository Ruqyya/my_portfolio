# 14 · Going live on your own domain

Everything below is already built. Three values and one setting switch it from "works on GitHub Pages" to "fully live".

## 1. Booking link
Create a free Cal.com or Calendly event ("20-minute intro call"). In `src/data/contact.ts` set:
```
export const BOOKING_URL = "https://cal.com/your-name/intro";
```
The "Book a 20-minute call" button then opens your calendar in a new tab. Until then it opens an email already written as a booking request.

## 2. Contact form
Create a free form at formspree.io, copy its URL, and set:
```
export const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
```
The form then posts directly (name, email, company, project type, message) and shows "message sent". It has validation, a hidden spam trap and a clear error if sending fails. Until then it opens the visitor's email app with the message written out, so no enquiry is lost.

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
