import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import ProjectMedia, { hasVideo } from "../ui/ProjectMedia";
import { projects, getProject, type Project } from "../../data/projects";

const pick = (slug: string) => getProject(slug) as Project;

const lead = pick("oladoc-healthcare-app-ui-ux-design");
const pairA = [pick("marham-pk-healthcare-platform-redesign"), pick("shumaila-s-london-clinic-website-redesign")];
const pairB = [pick("sehat-kahani-telemedicine-ui-ux-design"), pick("zental-dental-luxury-website-ui-ux")];
const used = new Set([lead, ...pairA, ...pairB].map((p) => p.slug));
const more = projects.filter((p) => !used.has(p.slug) && hasVideo(p));
const archive = projects.filter((p) => !used.has(p.slug) && !hasVideo(p));

const label = (p: Project, n: number) => `${String(n).padStart(2, "0")} — ${p.industry} · ${p.year}`;

function Frame({ project, ratio = "aspect-[16/10]" }: { project: Project; ratio?: string }) {
  return (
    <div className="border border-line bg-paper-2 p-2 transition-transform duration-500 group-hover:-translate-y-1 md:p-3">
      <div className={`${ratio} overflow-hidden bg-paper-2`}>
        <ProjectMedia project={project} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
    </div>
  );
}

function Card({ project, n, size = "md", className = "" }: { project: Project; n: number; size?: "md" | "sm"; className?: string }) {
  return (
    <article className={`group ${className}`}>
      <Link to={`/work/${project.slug}`} className="block">
        <Frame project={project} />
        <p className="mono mt-5 text-ink-2">{label(project, n)}</p>
        <h3 className={`mt-2 font-medium leading-tight ${size === "sm" ? "text-2xl" : "text-3xl md:text-4xl"}`}>
          <span className="link-draw">{project.title}</span>
        </h3>
        <p className="mt-3 max-w-md text-ink-2">{project.summary}</p>
        <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
          View project <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </Link>
    </article>
  );
}

export default function Work() {
  const [hover, setHover] = useState<Project | null>(null);

  return (
    <section id="work" className="relative z-10 pt-28 md:pt-40">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <Eyebrow n="01">Selected work</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.6vw,5rem)] font-medium leading-[1.05]">
            Real products for <em className="text-forest">clinics, hospitals and the people</em> who walk into them.
          </h2>
        </Reveal>

        {/* 1 · Lead project, full width */}
        <Reveal className="mt-16 md:mt-24">
          <article className="group grid gap-8 lg:grid-cols-12 lg:items-end">
            <Link to={`/work/${lead.slug}`} className="block lg:col-span-8" aria-label={lead.title}>
              <Frame project={lead} ratio="aspect-video" />
            </Link>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="mono text-ink-2">{label(lead, 1)}</p>
              <h3 className="mt-3 text-4xl font-medium leading-[1.05] md:text-5xl">
                <Link to={`/work/${lead.slug}`} className="link-draw">
                  {lead.title}
                </Link>
              </h3>
              <p className="mt-4 text-ink-2">{lead.summary}</p>
              <Link to={`/work/${lead.slug}`} className="mt-6 inline-flex h-12 items-center gap-2 rounded-full border border-ink px-6 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper">
                Watch the project <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        </Reveal>

        {/* 2 · Asymmetric pairs */}
        <div className="mt-24 grid gap-x-10 gap-y-20 md:mt-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-7"><Card project={pairA[0]} n={2} /></Reveal>
          <Reveal className="lg:col-span-5 lg:mt-40"><Card project={pairA[1]} n={3} /></Reveal>
          <Reveal className="lg:col-span-5 lg:-mt-12"><Card project={pairB[0]} n={4} /></Reveal>
          <Reveal className="lg:col-span-7 lg:mt-24"><Card project={pairB[1]} n={5} /></Reveal>
        </div>

        {/* 3 · More films */}
        {more.length > 0 && (
          <div className="mt-28 md:mt-40">
            <Reveal>
              <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
                <h3 className="text-3xl font-medium md:text-4xl">More projects</h3>
                <p className="mono text-ink-2">{more.length} with film</p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <Card project={p} n={6 + i} size="sm" />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* 4 · Archive index */}
        {archive.length > 0 && (
          <div className="mt-28 md:mt-40">
            <Reveal>
              <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
                <h3 className="text-3xl font-medium md:text-4xl">Archive</h3>
                <p className="mono text-ink-2">Full case studies on Behance</p>
              </div>
            </Reveal>
            <ul className="relative" onMouseLeave={() => setHover(null)}>
              {archive.map((p, i) => (
                <li key={p.slug} className="border-b border-line" onMouseEnter={() => setHover(p)} onFocus={() => setHover(p)}>
                  <Link to={`/work/${p.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:gap-8 md:py-8">
                    <span className="mono text-signal">{String(6 + more.length + i).padStart(2, "0")}</span>
                    <span className="serif text-2xl font-medium transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">{p.title}</span>
                    <span className="mono hidden text-ink-2 sm:block">{p.industry}</span>
                  </Link>
                </li>
              ))}
              {hover && (
                <img
                  aria-hidden
                  alt=""
                  src={hover.coverImage}
                  className="pointer-events-none absolute right-0 top-1/2 z-20 hidden w-72 -translate-y-1/2 border border-line bg-paper-2 p-2 shadow-xl lg:block"
                />
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
