import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BEHANCE_USERNAME = "ghulamruqyya";
const OUTPUT = path.resolve(__dirname, "../src/data/behance-projects.json");

function inferIndustry(name) {
  const title = name.toLowerCase();

  if (/stock|trading|fintech|finance|bank|crypto/.test(title)) return "Fintech";
  if (/platform|saas|dashboard/.test(title)) return "SaaS";
  if (/\bapp\b|mobile|ios|android|scanner|qr code/.test(title) && !/website|landing|web design/.test(title)) {
    return "Mobile App";
  }
  if (/dental|dentist/.test(title)) return "Dental";
  if (/veterinary|\bvet\b|bondvet|goddard/.test(title)) return "Veterinary";
  if (/telemedicine|marham|oladoc|sehat|medical|health|clinic|doctor|hospital/.test(title)) {
    return "Healthcare";
  }
  if (/website|landing|web|mockup|figma design/.test(title)) return "Web Design";
  if (/coffee|food|restaurant/.test(title)) return "Food & Beverage";
  if (/e-?commerce|shop|store/.test(title)) return "E-Commerce";

  return "Product Design";
}

function inferTags(name, industry) {
  const tags = new Set([industry]);
  const title = name.toLowerCase();

  if (/ui\/?ux|ux|ui/.test(title)) tags.add("UI/UX");
  if (/health|clinic|medical|telemedicine/.test(title)) tags.add("Healthcare");
  if (/dental/.test(title)) tags.add("Dental");
  if (/veterinary|\bvet\b/.test(title)) tags.add("Veterinary");
  if (/mobile|\bapp\b|ios|android/.test(title)) tags.add("Mobile");
  if (/website|landing|web/.test(title)) tags.add("Web Design");
  if (/platform|saas|dashboard/.test(title)) tags.add("SaaS");
  if (/figma/.test(title)) tags.add("Figma");
  if (/case study/.test(title)) tags.add("Case Study");
  if (/redesign/.test(title)) tags.add("Redesign");

  return [...tags].slice(0, 5);
}

function rgbToHex({ r, g, b }) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function pickCover(covers) {
  if (!covers) return "";

  const available = covers.allAvailable ?? [];
  if (available.length) {
    const preferred =
      available.find((c) => c.type === "JPG" && c.width === 808) ??
      available.find((c) => c.type === "JPG" && c.width === 404) ??
      available.find((c) => c.type === "JPG" && !c.width) ??
      available.find((c) => c.width === 808) ??
      available[0];
    return preferred?.url ?? "";
  }

  const sized =
    covers.size_max_808 ??
    covers.size_808 ??
    covers.size_404 ??
    covers.size_202 ??
    Object.values(covers).find((v) => v && typeof v === "object" && "url" in v);

  return sized?.url ?? "";
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeProject(project) {
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
}

function collectServiceExamples(data) {
  const services = data?.profileServices?.freelanceServices ?? [];
  const examples = [];

  for (const service of services) {
    for (const example of service.examples ?? []) {
      if (example?.id && example?.name && example?.url) {
        examples.push(example);
      }
    }
  }

  return examples;
}

async function fetchProfilePage() {
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

  return JSON.parse(match[1]);
}

async function fetchBehanceProjects() {
  const data = await fetchProfilePage();
  const profileProjects = data?.profile?.activeSection?.work?.profileProjects ?? [];
  const serviceExamples = collectServiceExamples(data);

  const merged = new Map();
  for (const project of [...profileProjects, ...serviceExamples]) {
    if (project?.id && project?.name) {
      merged.set(project.id, project);
    }
  }

  return [...merged.values()]
    .map(normalizeProject)
    .sort((a, b) => Number(b.year) - Number(a.year) || a.title.localeCompare(b.title));
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
  console.log("Categories:", [...new Set(projects.map((p) => p.industry))].join(", "));
}

main().catch((err) => {
  console.error(err.message);
  if (fs.existsSync(OUTPUT)) {
    console.warn("Keeping existing behance-projects.json");
    process.exit(0);
  }
  process.exit(1);
});
