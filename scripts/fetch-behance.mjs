import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BEHANCE_USERNAME = "ghulamruqyya";
const OUTPUT = path.resolve(__dirname, "../src/data/behance-projects.json");

function inferIndustry(name) {
  const title = name.toLowerCase();
  if (/health|clinic|medical|telemedicine|marham|oladoc|sehat|doctor|hospital|veterinary|vet|dental|dental/.test(title)) {
    return "Healthcare";
  }
  if (/stock|trading|fintech|finance|bank/.test(title)) return "Fintech";
  if (/coffee|food|restaurant/.test(title)) return "Food & Beverage";
  if (/mobile app|ios|android/.test(title)) return "Mobile App";
  if (/website|landing|web/.test(title)) return "Web Design";
  return "Product Design";
}

function inferTags(name, industry) {
  const tags = new Set([industry]);
  const title = name.toLowerCase();
  if (/ui\/?ux|ux|ui/.test(title)) tags.add("UI/UX");
  if (/health|clinic|medical|dental|vet|telemedicine/.test(title)) tags.add("Healthcare");
  if (/mobile|app|ios|android/.test(title)) tags.add("Mobile");
  if (/website|landing|web/.test(title)) tags.add("Web Design");
  if (/figma/.test(title)) tags.add("Figma");
  if (/case study/.test(title)) tags.add("Case Study");
  if (/dashboard/.test(title)) tags.add("Dashboard");
  if (/saas/.test(title)) tags.add("SaaS");
  return [...tags].slice(0, 4);
}

function rgbToHex({ r, g, b }) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function pickCover(covers) {
  const available = covers?.allAvailable ?? [];
  const preferred =
    available.find((c) => c.width === 808) ??
    available.find((c) => c.width === 404) ??
    available.find((c) => c.type === "JPG") ??
    available[0];
  return preferred?.url ?? "";
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fetchBehanceProjects() {
  const url = `https://www.behance.net/${BEHANCE_USERNAME}/projects`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; PortfolioBuild/1.0)",
      Accept: "text/html",
    },
  });

  if (!res.ok) {
    throw new Error(`Behance request failed: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();
  const match = html.match(/<script type="application\/json" id="beconfig-store_state">([\s\S]*?)<\/script>/);
  if (!match) {
    throw new Error("Could not find Behance project data in profile page");
  }

  const data = JSON.parse(match[1]);
  const rawProjects = data?.profile?.activeSection?.work?.profileProjects ?? [];

  return rawProjects.map((project) => {
    const industry = inferIndustry(project.name);
    const publishedYear = project.publishedOn
      ? new Date(project.publishedOn * 1000).getFullYear().toString()
      : new Date().getFullYear().toString();

    return {
      id: project.id,
      slug: slugify(project.name),
      title: project.name,
      industry,
      year: publishedYear,
      summary: `${project.name} — a ${industry.toLowerCase()} UI/UX project by Creative Ruqyya.`,
      coverImage: pickCover(project.covers),
      behanceUrl: project.url,
      color: project.colors ? rgbToHex(project.colors) : "#2563EB",
      tags: inferTags(project.name, industry),
      views: project.stats?.views?.all ?? 0,
      appreciations: project.stats?.appreciations?.all ?? 0,
    };
  });
}

async function main() {
  console.log(`Fetching Behance projects for ${BEHANCE_USERNAME}...`);
  const projects = await fetchBehanceProjects();
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(
    OUTPUT,
    JSON.stringify({ fetchedAt: new Date().toISOString(), username: BEHANCE_USERNAME, projects }, null, 2),
  );
  console.log(`Saved ${projects.length} projects to ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err.message);
  if (fs.existsSync(OUTPUT)) {
    console.warn("Keeping existing behance-projects.json");
    process.exit(0);
  }
  process.exit(1);
});
