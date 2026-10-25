// After the Vite build: give every project its own HTML file so direct links return HTTP 200 (GitHub Pages
// answers 404 for client-side routes) and each page has its own title, description and share image text.
// Also rewrites sitemap.xml from the real project list. Run automatically by `npm run build` (npm "postbuild").
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const contactSrc = fs.readFileSync(path.join(root, "src/data/contact.ts"), "utf8");
const SITE = (/SITE_URL\s*=\s*"([^"]+)"/.exec(contactSrc)?.[1] ?? "https://ruqyya.github.io/my_portfolio").replace(/\/$/, "");

const { projects } = JSON.parse(fs.readFileSync(path.join(root, "src/data/behance-projects.json"), "utf8"));
// The address in index.html is the GitHub Pages one; swap in SITE_URL so a custom domain needs only one edit.
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8").split("https://ruqyya.github.io/my_portfolio").join(SITE);
fs.writeFileSync(path.join(dist, "index.html"), template);
fs.writeFileSync(path.join(dist, "404.html"), template);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setMeta = (html, attr, name, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`), `$1${esc(value)}$2`);

let written = 0;
for (const p of projects) {
  const title = `${p.title} · Ghulam Ruqyya`;
  const desc = `${p.title}: a ${p.industry.toLowerCase()} case study by Ghulam Ruqyya, Senior Product Designer for healthcare and SaaS.`;
  const url = `${SITE}/work/${p.slug}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", desc);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", desc);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", desc);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  const dir = path.join(dist, "work", p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  written++;
}

const urls = [`${SITE}/`, ...projects.map((p) => `${SITE}/work/${p.slug}`)];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u, i) => `  <url><loc>${u}</loc>${i === 0 ? "<priority>1.0</priority>" : ""}</url>`).join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`postbuild: ${written} project pages, sitemap with ${urls.length} urls`);
