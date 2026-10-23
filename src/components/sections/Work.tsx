import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import ProjectMedia, { hasVideo } from "../ui/ProjectMedia";
import BeforeAfter from "../case/BeforeAfter";
import { projects, getProject, type Project } from "../../data/projects";
import { MAIL_HREF, proof } from "../../data/contact";

const base = import.meta.env.BASE_URL;
const pick = (slug: string) => getProject(slug) as Project;
const src = (p: string) => `${base}${p}`;

/* ───────── Featured: three product stories, each laid out differently ───────── */

const OLADOC = "oladoc-healthcare-app-ui-ux-design";
const MARHAM = "marham-pk-healthcare-platform-redesign";
const SEHAT = "sehat-kahani-telemedicine-ui-ux-design";

// Pieces every story shares. Text comes from the case-study data, so the card and the page never disagree.
function useStory(slug: string, decision: number) {
  const p = pick(slug);
  const s = p.study;
  return {
    p,
    s,
    d: s.decisions?.[decision],
    role: `${s.role}. ${s.deliverables?.map((x, i) => (i ? x.charAt(0).toLowerCase() + x.slice(1) : x)).join(", ")}.`,
    delivers: (s.delivered ?? []).slice(0, 3),
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return <dt className="mono text-signal">{children}</dt>;
}

function Actions({ p, accent, hasFilm }: { p: Project; accent: string; hasFilm: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
      <Link
        to={`/work/${p.slug}`}
        className="group inline-flex h-14 items-center gap-2 rounded-full px-8 text-lg font-semibold text-[var(--on-accent)] transition-transform hover:-translate-y-0.5"
        style={{ background: accent }}
      >
        Read the case study <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
      {hasFilm && (
        <Link to={`/work/${p.slug}#film`} className="link-draw inline-flex items-center gap-2 py-2 text-lg font-semibold">
          <Play size={16} aria-hidden /> Watch the summary
        </Link>
      )}
    </div>
  );
}

function Stage({ children, accent, className = "" }: { children: React.ReactNode; accent: string; className?: string }) {
  return (
    <div className={`surface-stage relative rounded-[1.75rem] ${className}`}>
      <span aria-hidden className="absolute left-0 top-10 h-16 w-1 rounded-r-full" style={{ background: accent }} />
      {children}
    </div>
  );
}

/* 01 · Oladoc: the stage comes first, wide, with the story laid out underneath in four columns */
function OladocStory() {
  const { p, s, d, role, delivers } = useStory(OLADOC, 0);
  const accent = "#FCA025";
  const lead = proof[0];
  return (
    <Reveal>
      <article className="rounded-[2rem] border border-line bg-paper p-5 md:p-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mono flex flex-wrap items-center gap-x-3 text-signal">
              <span>Case study 01</span>
              <span aria-hidden className="h-px w-8" style={{ background: accent }} />
              <span className="text-ink-2">{p.industry} · {p.year}</span>
            </p>
            <h3 className="mt-5 text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[1.02]">
              <Link to={`/work/${p.slug}`} className="link-draw">One booking, seen from <em className="text-forest">three seats.</em></Link>
            </h3>
          </div>
          <p className="text-xl leading-relaxed text-ink-2 lg:col-span-4">{p.title}. {s.summary}</p>
        </div>

        <Stage accent={accent} className="mt-10 px-4 pb-12 pt-8 md:px-14 md:pb-20 md:pt-14">
          <div className="relative mx-auto aspect-[1.02/1] w-full max-w-[64rem] md:aspect-[1.55/1]">
            <div className="absolute right-0 top-0 hidden w-[66%] overflow-hidden rounded-xl border border-white/15 bg-paper shadow-[0_50px_80px_-30px_rgba(36,60,57,0.26)] md:block">
              <img src={src("case/oladoc/frontdesk.webp")} alt="Oladoc front desk portal with a live queue." loading="lazy" width={1600} height={1046} className="block h-auto w-full" />
            </div>
            <div className="absolute left-0 top-0 w-full overflow-hidden rounded-xl border border-white/15 bg-paper shadow-[0_50px_80px_-30px_rgba(36,60,57,0.26)] md:left-[18%] md:top-[20%] md:w-[62%]">
              <img src={src("case/oladoc/docdash.webp")} alt="Oladoc doctor portal dashboard." loading="lazy" width={1600} height={1046} className="block h-auto w-full" />
            </div>
            {["home", "sym", "profile"].map((n, i) => (
              <div
                key={n}
                className={`absolute bottom-0 w-[30%] rounded-[1.3rem] bg-[var(--bezel)] p-1 shadow-[0_40px_60px_-24px_rgba(36,60,57,0.26)] ring-1 ring-white/20 md:w-[19%] md:rounded-[1.6rem] md:p-1.5 ${["left-[2%] md:left-0", "left-[34%] md:left-[12%]", "left-[66%] md:left-[24%]"][i]}`}
                style={{ transform: `translateY(${i === 1 ? "-5%" : "0"}) rotate(${(i - 1) * 3}deg)`, zIndex: i === 1 ? 5 : 4 }}
              >
                <img src={src(`case/oladoc/${n}.webp`)} alt={`Oladoc patient app, ${n === "sym" ? "search by symptom" : n === "profile" ? "doctor profile" : "home"}.`} loading="lazy" width={700} height={1515} className="block h-auto w-full rounded-[1rem] md:rounded-[1.25rem]" />
              </div>
            ))}
          </div>
        </Stage>

        <dl className="mt-12 grid gap-x-10 gap-y-8 border-t border-line pt-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Label>The problem</Label>
            <dd className="mt-2 text-lg leading-relaxed">{s.tldr?.problem}</dd>
          </div>
          <div>
            <Label>My role</Label>
            <dd className="mt-2 text-lg leading-relaxed">{role}</dd>
          </div>
          {d && (
            <div>
              <Label>The key decision</Label>
              <dd className="mt-2 text-lg leading-relaxed">
                <span className="serif block text-2xl leading-snug">{d.title}.</span>
                <span className="mt-1 block text-ink-2">{d.text}</span>
              </dd>
            </div>
          )}
          <div>
            <Label>What it delivers</Label>
            <dd className="mt-2">
              <ul className="space-y-2 text-lg leading-snug">
                {delivers.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0" style={{ background: accent }} />
                    {t}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="flex items-baseline gap-4">
            <span className="serif text-5xl text-forest md:text-6xl">{lead.value}</span>
            <span className="max-w-[18rem] leading-snug text-ink-2">
              {lead.label}
              <span className="mono mt-1 block normal-case tracking-normal">Reported on my LinkedIn</span>
            </span>
          </p>
          <Actions p={p} accent={accent} hasFilm={Boolean(s.video)} />
        </div>
      </article>
    </Reveal>
  );
}

/* 02 · Marham: a real before and after you can drag, with the story beside it */
function MarhamStory() {
  const { p, s, d, role, delivers } = useStory(MARHAM, 3);
  const accent = "#3CC2B5";
  return (
    <Reveal>
      <article className="rounded-[2rem] border border-line bg-paper p-5 md:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="mono flex flex-wrap items-center gap-x-3 text-signal">
              <span>Case study 02</span>
              <span aria-hidden className="h-px w-8" style={{ background: accent }} />
              <span className="text-ink-2">{p.industry} · {p.year}</span>
            </p>
            <h3 className="mt-5 text-[clamp(2.2rem,4vw,3.8rem)] font-medium leading-[1.04]">
              <Link to={`/work/${p.slug}`} className="link-draw">A platform people had to <em className="text-forest">trust</em> before they could use it.</Link>
            </h3>
            <p className="mt-4 text-xl text-ink-2">{p.title}</p>

            <dl className="mt-8 space-y-6 border-t border-line pt-7">
              <div>
                <Label>The problem</Label>
                <dd className="mt-2 text-lg leading-relaxed">{s.tldr?.problem}</dd>
              </div>
              <div>
                <Label>My role</Label>
                <dd className="mt-2 text-lg leading-relaxed">{role}</dd>
              </div>
              {d && (
                <div>
                  <Label>The key decision</Label>
                  <dd className="mt-2 text-lg leading-relaxed">
                    <span className="serif text-2xl">{d.title}.</span> <span className="text-ink-2">{d.text}</span>
                  </dd>
                </div>
              )}
            </dl>
            <ul className="mt-7 flex flex-wrap gap-2">
              {delivers.map((t) => (
                <li key={t} className="rounded-full border border-line px-4 py-2 text-base">{t}</li>
              ))}
            </ul>
            <div className="mt-9">
              <Actions p={p} accent={accent} hasFilm={Boolean(s.video)} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Stage accent={accent} className="p-5 md:p-9">
              {s.before && s.after ? (
                <BeforeAfter before={s.before} after={s.after} />
              ) : (
                <img src={src("case/marham/trio.webp")} alt="The redesigned Marham.pk across a laptop and two phones." loading="lazy" className="block h-auto w-full rounded-xl" />
              )}
            </Stage>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* 03 · Sehat Kahani: led by the decision, with a big screen and the responsive set */
function SehatStory() {
  const { p, s, d, role, delivers } = useStory(SEHAT, 0);
  const accent = "#B4DC4A";
  return (
    <Reveal>
      <article className="rounded-[2rem] border border-line bg-paper p-5 md:p-12">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:col-span-7">
            <Stage accent={accent} className="px-5 pb-14 pt-9 md:px-10 md:pb-16 md:pt-12">
              <div className="relative">
                <div className="overflow-hidden rounded-xl border border-white/15 bg-paper shadow-[0_50px_80px_-30px_rgba(36,60,57,0.26)]">
                  <div className="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-line" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  </div>
                  <img src={src("case/sehat/home.webp")} alt="The redesigned Sehat Kahani homepage with the 60-second promise." loading="lazy" className="block h-auto w-full" />
                </div>
                <div className="absolute -bottom-12 -right-1 w-[50%] overflow-hidden rounded-xl border border-white/20 bg-paper shadow-2xl shadow-[#243c39]/20 md:-right-5">
                  <img src={src("case/sehat/responsive.webp")} alt="Sehat Kahani layouts for desktop and phone." loading="lazy" className="block h-auto w-full" />
                </div>
              </div>
            </Stage>
          </div>

          <div className="lg:col-span-5">
            <p className="mono flex flex-wrap items-center gap-x-3 text-signal">
              <span>Case study 03</span>
              <span aria-hidden className="h-px w-8" style={{ background: accent }} />
              <span className="text-ink-2">{p.industry} · {p.year}</span>
            </p>
            <h3 className="mt-5 text-[clamp(2.2rem,4vw,3.8rem)] font-medium leading-[1.04]">
              <Link to={`/work/${p.slug}`} className="link-draw">From a health problem to a doctor, with a <em className="text-forest whitespace-nowrap">60‑second</em> promise.</Link>
            </h3>
            <p className="mt-4 text-xl text-ink-2">{p.title}</p>

            {d && (
              <blockquote className="mt-8 border-l-2 pl-6" style={{ borderColor: accent }}>
                <p className="mono text-signal">The key decision</p>
                <p className="serif mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-snug">{d.title}.</p>
                <p className="mt-2 text-lg leading-relaxed text-ink-2">{d.text}</p>
              </blockquote>
            )}

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <Label>The problem</Label>
                <dd className="mt-2 text-lg leading-relaxed">{s.tldr?.problem}</dd>
              </div>
              <div>
                <Label>My role</Label>
                <dd className="mt-2 text-lg leading-relaxed">{role}</dd>
              </div>
            </dl>
            <ul className="mt-7 space-y-2 text-lg">
              {delivers.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0" style={{ background: accent }} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Actions p={p} accent={accent} hasFilm={Boolean(s.video)} />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ───────── The rest of the work: a curated gallery ───────── */

const featuredSlugs = new Set([OLADOC, MARHAM, SEHAT]);
const more = projects.filter((p) => !featuredSlugs.has(p.slug) && hasVideo(p));
const archive = projects.filter((p) => !featuredSlugs.has(p.slug) && !hasVideo(p));

// Wide cards open and close the gallery; three-up cards sit in the middle.
const wide = (i: number) => i < 2 || i >= more.length - 2;

function GalleryCard({ project, n, big }: { project: Project; n: number; big: boolean }) {
  return (
    <article className="group h-full">
      <Link to={`/work/${project.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-[var(--bezel)] ring-1 ring-black/5">
          <div className="aspect-video">
            <ProjectMedia project={project} className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045]" />
          </div>
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[var(--bezel)]/90 to-transparent px-5 pb-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="mono text-white">View case study</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)]"><ArrowUpRight size={18} aria-hidden /></span>
          </span>
        </div>
        <div className="mt-5 flex items-baseline gap-4">
          <span className="mono text-signal">{String(n).padStart(2, "0")}</span>
          <p className="mono text-ink-2">{project.industry} · {project.year}</p>
        </div>
        <h3 className={`mt-2 font-medium leading-[1.12] ${big ? "text-[clamp(1.7rem,2.6vw,2.5rem)]" : "text-[clamp(1.5rem,2vw,1.9rem)]"}`}>
          <span className="link-draw">{project.title}</span>
        </h3>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-2">{project.summary}</p>
      </Link>
    </article>
  );
}

export default function Work() {
  const [hover, setHover] = useState<Project | null>(null);

  return (
    <>
      {/* Bright gallery: the three flagship stories, each on a midnight stage */}
      <section id="work" className="surface-tint sheet pb-32 pt-24 md:pb-44 md:pt-32">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="02">Selected work</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.6rem,5.6vw,5.2rem)] font-medium leading-[1.04]">
              Three products, <em className="text-forest">and the thinking behind them.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-2">
              Each story starts with the problem, shows my role and the decision that mattered most, then the design that came out of it.
            </p>
          </Reveal>
          <div className="mt-16 space-y-10 md:mt-20 md:space-y-14">
            <OladocStory />
            <MarhamStory />
            <SehatStory />
          </div>
        </div>
      </section>

      {/* Light: the curated gallery, a call to action, and the archive */}
      <section id="more-work" className="sheet sheet-light pb-28 pt-20 md:pb-36 md:pt-28">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          {more.length > 0 && (
            <div>
              <Reveal>
                <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
                  <h3 className="text-[clamp(2.4rem,4.6vw,4.2rem)] font-medium leading-none">More <em className="text-forest">projects</em></h3>
                  <p className="max-w-md text-lg text-ink-2">{more.length} more clinic, vet and dental websites, each with a film.</p>
                </div>
              </Reveal>
              <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-6 md:gap-y-16">
                {more.map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 3) * 0.06} className={wide(i) ? "md:col-span-3" : "md:col-span-2"}>
                    <GalleryCard project={p} n={3 + 1 + i} big={wide(i)} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <Reveal className="mt-24 md:mt-32">
            <div className="surface-teal flex flex-col gap-6 rounded-[2rem] px-6 py-10 md:flex-row md:items-center md:justify-between md:px-14 md:py-14">
              <div>
                <p className="mono text-ink-2">Like what you see?</p>
                <h3 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.6rem)] font-medium leading-[1.05]">
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
                      <span className="mono text-signal">{String(3 + more.length + 1 + i).padStart(2, "0")}</span>
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
