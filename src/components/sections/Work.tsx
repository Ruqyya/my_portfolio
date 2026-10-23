import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import ProjectMedia, { hasVideo } from "../ui/ProjectMedia";
import { projects, getProject, type Project } from "../../data/projects";
import { MAIL_HREF } from "../../data/contact";

const base = import.meta.env.BASE_URL;
const pick = (slug: string) => getProject(slug) as Project;
const src = (p: string) => `${base}${p}`;

/* ───────── Featured: three product stories, each with its own identity ───────── */

interface Feature {
  slug: string;
  n: string;
  accent: string; // taken from the project's own palette
  glow: string;
  headline: string;
  decision: number; // index into study.decisions
  flip?: boolean;
  visual: React.ReactNode;
}

const features: Feature[] = [
  {
    slug: "oladoc-healthcare-app-ui-ux-design",
    n: "01",
    accent: "#FCA025",
    glow: "rgba(70, 68, 190, 0.55)",
    headline: "One booking, seen from three seats.",
    decision: 0,
    visual: (
      <div className="relative aspect-[1.2/1] w-full">
        <div className="absolute right-0 top-[4%] w-[78%] overflow-hidden rounded-xl border border-white/15 bg-paper shadow-[0_50px_80px_-30px_rgba(0,0,0,0.8)]">
          <img src={src("case/oladoc/frontdesk.webp")} alt="Oladoc front desk portal with a live queue." loading="lazy" className="block h-auto w-full" />
        </div>
        <div className="absolute left-[16%] top-[30%] w-[68%] overflow-hidden rounded-xl border border-white/15 bg-paper shadow-[0_50px_80px_-30px_rgba(0,0,0,0.8)]">
          <img src={src("case/oladoc/docdash.webp")} alt="Oladoc doctor portal dashboard." loading="lazy" className="block h-auto w-full" />
        </div>
        {["home", "sym", "profile"].map((n, i) => (
          <div
            key={n}
            className="absolute bottom-0 w-[24%] rounded-[1.5rem] bg-[#0a1418] p-1.5 shadow-[0_40px_60px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/20"
            style={{ left: `${i * 15}%`, transform: `translateY(${i === 1 ? "-6%" : "0"}) rotate(${(i - 1) * 3}deg)`, zIndex: i === 1 ? 5 : 4 }}
          >
            <img src={src(`case/oladoc/${n}.webp`)} alt={`Oladoc patient app, ${n === "sym" ? "search by symptom" : n === "profile" ? "doctor profile" : "home"}.`} loading="lazy" className="block h-auto w-full rounded-[1.2rem]" />
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "marham-pk-healthcare-platform-redesign",
    n: "02",
    accent: "#3CC2B5",
    glow: "rgba(24, 120, 140, 0.55)",
    headline: "A platform people had to trust before they could use it.",
    decision: 3,
    flip: true,
    visual: (
      <div className="relative w-full">
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#eaf1fb] shadow-[0_50px_80px_-30px_rgba(0,0,0,0.8)]">
          <img src={src("case/marham/trio.webp")} alt="The redesigned Marham.pk across a laptop and two phones." loading="lazy" className="block h-auto w-full" />
        </div>
        <figure className="absolute -bottom-6 -left-2 w-[34%] rotate-[-3deg] overflow-hidden rounded-xl border border-white/20 bg-paper shadow-2xl shadow-black/60 md:-left-6">
          <img src={src("case/marham/old_site.webp")} alt="The original Marham.pk before the redesign." loading="lazy" className="block h-auto w-full grayscale" />
          <figcaption className="mono bg-[#0f1b21] px-3 py-1.5 text-[#f4f0e8]">Before</figcaption>
        </figure>
      </div>
    ),
  },
  {
    slug: "sehat-kahani-telemedicine-ui-ux-design",
    n: "03",
    accent: "#B4DC4A",
    glow: "rgba(90, 140, 40, 0.5)",
    headline: "From a health problem to a doctor, with a 60-second promise.",
    decision: 0,
    visual: (
      <div className="relative w-full">
        <div className="overflow-hidden rounded-xl border border-white/15 bg-paper shadow-[0_50px_80px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
          </div>
          <img src={src("case/sehat/home.webp")} alt="The redesigned Sehat Kahani homepage with the 60-second promise." loading="lazy" className="block h-auto w-full" />
        </div>
        <div className="absolute -bottom-8 -right-2 w-[46%] overflow-hidden rounded-xl border border-white/20 bg-paper shadow-2xl shadow-black/60 md:-right-6">
          <img src={src("case/sehat/responsive.webp")} alt="Sehat Kahani layouts for desktop and phone." loading="lazy" className="block h-auto w-full" />
        </div>
      </div>
    ),
  },
];

function FeaturedPanel({ f }: { f: Feature }) {
  const p = pick(f.slug);
  const s = p.study;
  const d = s.decisions?.[f.decision];
  const delivers = (s.delivered ?? []).slice(0, 3);

  return (
    <Reveal>
      <article
        className="relative overflow-hidden rounded-[2rem] border border-line bg-paper-2/40 p-6 md:p-12"
        style={{ ["--acc" as string]: f.accent, background: `radial-gradient(60rem 30rem at ${f.flip ? "0%" : "100%"} 0%, ${f.glow}, transparent 62%), #13232a` }}
      >
        <div className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-14 ${f.flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="lg:col-span-5">
            <p className="mono flex flex-wrap items-center gap-x-3" style={{ color: f.accent }}>
              <span>Case study {f.n}</span>
              <span aria-hidden className="h-px w-6" style={{ background: f.accent }} />
              <span className="text-ink-2">
                {p.industry} · {p.year}
              </span>
            </p>
            <h3 className="mt-5 text-[clamp(2rem,3.6vw,3.3rem)] font-medium leading-[1.05]">
              <Link to={`/work/${p.slug}`} className="link-draw">
                {f.headline}
              </Link>
            </h3>
            <p className="mt-3 text-lg text-ink-2">{p.title}</p>

            <dl className="mt-8 space-y-5 border-t border-line pt-6">
              <div>
                <dt className="mono" style={{ color: f.accent }}>The problem</dt>
                <dd className="mt-1">{s.tldr?.problem}</dd>
              </div>
              <div>
                <dt className="mono" style={{ color: f.accent }}>My role</dt>
                <dd className="mt-1">
                  {s.role}. <span className="text-ink-2">{s.deliverables?.map((x, i) => (i ? x.charAt(0).toLowerCase() + x.slice(1) : x)).join(", ")}.</span>
                </dd>
              </div>
              {d && (
                <div>
                  <dt className="mono" style={{ color: f.accent }}>The key decision</dt>
                  <dd className="mt-1">
                    <span className="serif text-xl">{d.title}.</span> <span className="text-ink-2">{d.text}</span>
                  </dd>
                </div>
              )}
              {delivers.length > 0 && (
                <div>
                  <dt className="mono" style={{ color: f.accent }}>What it delivers</dt>
                  <dd className="mt-2">
                    <ul className="space-y-1.5">
                      {delivers.map((t) => (
                        <li key={t} className="flex gap-3">
                          <span aria-hidden className="mt-[0.75em] h-px w-4 shrink-0" style={{ background: f.accent }} />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Link
                to={`/work/${p.slug}`}
                className="group inline-flex h-14 items-center gap-2 rounded-full px-7 font-semibold text-[#0f1b21] transition-transform hover:-translate-y-0.5"
                style={{ background: f.accent }}
              >
                Read the case study <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              {s.video && (
                <Link to={`/work/${p.slug}#film`} className="link-draw inline-flex items-center gap-2 py-2 font-semibold">
                  <Play size={14} aria-hidden /> Watch the film
                </Link>
              )}
            </div>
          </div>

          <div className="order-first lg:order-none lg:col-span-7">{f.visual}</div>
        </div>
      </article>
    </Reveal>
  );
}

/* ───────── The rest of the work ───────── */

const featuredSlugs = new Set(features.map((f) => f.slug));
const more = projects.filter((p) => !featuredSlugs.has(p.slug) && hasVideo(p));
const archive = projects.filter((p) => !featuredSlugs.has(p.slug) && !hasVideo(p));

function Card({ project, n }: { project: Project; n: number }) {
  return (
    <article className="group">
      <Link to={`/work/${project.slug}`} className="block">
        <div className="border border-line bg-paper-2 p-2 transition-transform duration-500 group-hover:-translate-y-1 md:p-3">
          <div className="aspect-[16/10] overflow-hidden bg-paper-2">
            <ProjectMedia project={project} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
          </div>
        </div>
        <p className="mono mt-4 text-ink-2">
          {String(n).padStart(2, "0")} — {project.industry} · {project.year}
        </p>
        <h3 className="mt-1.5 text-xl font-medium leading-tight md:text-2xl">
          <span className="link-draw">{project.title}</span>
        </h3>
        <p className="mt-2 hidden max-w-md text-ink-2 md:block">{project.summary}</p>
      </Link>
    </article>
  );
}

export default function Work() {
  const [hover, setHover] = useState<Project | null>(null);

  return (
    <>
      {/* Dark gallery: the three flagship stories */}
      <section id="work" className="surface-deep sheet pb-32 pt-24 md:pb-44 md:pt-32">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="02">Selected work</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.4vw,5rem)] font-medium leading-[1.04]">
              Three products, <em className="text-forest">and the thinking behind them.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-ink-2">
              Each story starts with the problem, shows my role and the decision that mattered most, then the design that came out of it.
            </p>
          </Reveal>
          <div className="mt-16 space-y-12 md:mt-20 md:space-y-16">
            {features.map((f) => (
              <FeaturedPanel key={f.slug} f={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Light: more projects, a call to action, and the archive */}
      <section id="more-work" className="sheet sheet-light pb-28 pt-20 md:pb-36 md:pt-28">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          {more.length > 0 && (
            <div>
              <Reveal>
                <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
                  <h3 className="text-3xl font-medium md:text-5xl">More projects</h3>
                  <p className="mono text-ink-2">{more.length} with film</p>
                </div>
              </Reveal>
              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 md:gap-x-8 md:gap-y-14 lg:grid-cols-3">
                {more.map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                    <Card project={p} n={features.length + 1 + i} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <Reveal className="mt-24 md:mt-32">
            <div className="surface-teal flex flex-col gap-6 rounded-2xl px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
              <div>
                <p className="mono text-ink-2">Like what you see?</p>
                <h3 className="mt-2 max-w-xl text-3xl font-medium leading-tight md:text-5xl">
                  Building a healthcare or SaaS product? <em className="text-forest">Let's talk.</em>
                </h3>
              </div>
              <a
                href={MAIL_HREF}
                className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-8 text-lg font-semibold text-on-forest transition-transform hover:-translate-y-0.5"
              >
                Discuss a project <ArrowUpRight size={18} />
              </a>
            </div>
          </Reveal>

          {archive.length > 0 && (
            <div className="mt-24 md:mt-32">
              <Reveal>
                <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
                  <h3 className="text-3xl font-medium md:text-4xl">Archive</h3>
                  <p className="mono text-ink-2">Full case studies on Behance</p>
                </div>
              </Reveal>
              <ul className="relative" onMouseLeave={() => setHover(null)}>
                {archive.map((p, i) => (
                  <li key={p.slug} className="border-b border-line" onMouseEnter={() => setHover(p)} onFocus={() => setHover(p)}>
                    <Link to={`/work/${p.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:gap-8 md:py-7">
                      <span className="mono text-signal">{String(features.length + more.length + 1 + i).padStart(2, "0")}</span>
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
    </>
  );
}
