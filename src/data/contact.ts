export const EMAIL = "ghulamruqyya@gmail.com";

// ───────── Set these when the domain is live ─────────
// BOOKING_URL: a Calendly or Cal.com link, for example "https://cal.com/your-name/intro-call".
// FORM_ENDPOINT: a Formspree (or similar) form URL, for example "https://formspree.io/f/xxxxxxxx".
// SITE_URL: the public address, used for the sitemap and canonical links (no trailing slash).
// While these are empty, the booking button opens a prefilled email and the form opens the visitor's email app.
export const BOOKING_URL = "";
export const FORM_ENDPOINT = "";
// While true, case pages show a clearly marked "Placeholder" results row (+00% and so on) so the layout can be reviewed.
// Keep it false on the public site: the placeholders are not real results. Real numbers go in each case study's `measured` list.
export const SHOW_PLACEHOLDER_RESULTS = false;
export const SITE_URL = "https://ruqyya.github.io/my_portfolio";

// One prefilled email so a visitor only has to fill in three short lines.
export const MAIL_HREF =
  `mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry from your portfolio")}` +
  `&body=${encodeURIComponent("Hi Ruqyya,\n\nWhat I'm building:\n\nWho it's for:\n\nTimeline:\n\n")}`;

export const BOOK_HREF =
  BOOKING_URL ||
  `mailto:${EMAIL}?subject=${encodeURIComponent("Book a 20-minute intro call")}` +
    `&body=${encodeURIComponent("Hi Ruqyya,\n\nI would like to book a short intro call.\n\nBest days and times (with my time zone):\n\nWhat I'm building:\n\n")}`;
export const BOOK_EXTERNAL = Boolean(BOOKING_URL);

// Results quoted from the owner's LinkedIn experience (linkedin.com/in/ghulamruqyya).
export const proof = [
  { value: "+65%", label: "patient-intake completion", source: "oladoc, 2025" },
  { value: "−50%", label: "first-session drop-off", source: "Appsol360, 2023" },
  { value: "5-star", label: "rating with repeat clients", source: "Fiverr, since 2021" },
];
