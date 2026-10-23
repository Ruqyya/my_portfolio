import DecisionExplorer from "../components/case/DecisionExplorer";
import DecisionRecords from "../components/case/DecisionRecords";
import JourneyExplorer from "../components/case/JourneyExplorer";
import TaskShowcase from "../components/case/TaskShowcase";
import OutcomesPanel from "../components/case/OutcomesPanel";
import { useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, Mail } from "lucide-react";
import { projects, getProject } from "../data/projects";
import { MAIL_HREF } from "../data/contact";
import Reveal from "../components/ui/Reveal";
import Eyebrow from "../components/ui/Eyebrow";
import { Browser, Phone } from "../components/case/Frames";
import BeforeAfter from "../components/case/BeforeAfter";
import SectionRail, { type RailItem } from "../components/case/SectionRail";

const base = import.meta.env.BASE_URL;

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.08]">{children}</h2>;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!project) return;
    const prev = document.title;
    document.title = `${project.study.identifier ?? project.title} · Creative Ruqyya`;
    return () => {
      document.title = prev;
    };
  }, [project]);

  const s = project?.study;

  const rail: RailItem[] = useMemo(() => {
    if (!s) return [];
    const r: RailItem[] = [{ id: "overview", label: "Overview" }];
    if (s.problem) r.push({ id: "problem", label: "The problem" });
    if (s.users) r.push({ id: "users", label: "Users" });
    if (s.research) r.push({ id: "research", label: "Research" });
    if (s.decisions?.length) r.push({ id: "decisions", label: "Design decisions" });
    if (s.tradeoffs?.length) r.push({ id: "tradeoffs", label: "Trade-offs" });
    if (s.flow) r.push({ id: "flow", label: "The journey" });
    if (s.before && s.after) r.push({ id: "before-after", label: "Before and after" });
    if (s.stills?.length || s.features?.length || s.tasks?.length) r.push({ id: "screens", label: s.tasks?.length ? "The solution" : "The final design" });
    if (s.system) r.push({ id: "system", label: "Design system" });
    if (s.validation) r.push({ id: "validation", label: "Validation" });
    if (s.delivered || s.measured || s.outcomes) r.push({ id: "impact", label: s.outcomes ? "Outcomes and reflection" : "What it delivers" });
    if (s.lessons?.length) r.push({ id: "lessons", label: "Lessons learned" });
    if (s.shows?.length) r.push({ id: "shows", label: "What this shows" });
    return r;
  }, [s]);

  if (!project || !s) return <Navigate to="/404" replace />;

  const num = (id: string) => String(rail.findIndex((r) => r.id === id) + 1).padStart(2, "0");
  const index = projects.findIndex((p) => p.slug === project.slug);
  const withFilm = projects.filter((p) => p.study.video);
  const at = withFilm.findIndex((p) => p.slug === project.slug);
  const next = at >= 0 ? withFilm[(at + 1) % withFilm.length] : projects[(index + 1) % projects.length];
  const tags = project.tags.filter((t) => t !== "Case Study" && t !== project.industry);
  const glance = [
    { k: "Industry", v: project.industry },
    { k: "Year", v: project.year },
    { k: "My role", v: s.role },
    { k: "Platforms", v: s.platforms?.join(" · ") },
    { k: "Deliverables", v: s.deliverables?.join(", ") },
    { k: "Type", v: !s.role ? tags.join(", ") : undefined },
  ].filter((m): m is { k: string; v: string } => Boolean(m.v));

  return (
    <article className="relative z-10 pb-24">
      {/* Header band */}
      <div className="palette-ivory surface-hero pb-40 pt-28 md:pb-56 md:pt-36">
        <header className="mx-auto max-w-[88rem] px-5 md:px-10">
          <div className={s.heroShots ? "grid items-center gap-12 lg:grid-cols-12" : ""}>
            <div className={s.heroShots ? "lg:col-span-7" : ""}>
            <Link to="/#work" className="link-draw mono inline-flex items-center gap-2 py-2 text-ink-2">
              <ArrowLeft size={14} /> All work
            </Link>
            <p className="mono mt-10 text-signal">
              {s.identifier ?? `Case study — ${project.industry} · ${project.year}`}
            </p>
            <h1 className={`mt-4 max-w-5xl font-medium ${s.headline ? "text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.06]" : "text-[clamp(2.8rem,6.6vw,6.2rem)] leading-[1.02]"}`}>{s.headline ?? project.title}</h1>
            {s.summary && <p className="mt-8 max-w-2xl text-xl text-ink-2">{s.summary}</p>}
  
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={MAIL_HREF} className="inline-flex h-14 items-center gap-3 rounded-full bg-forest px-7 font-semibold text-on-forest transition-transform hover:-translate-y-0.5">
                <Mail size={18} aria-hidden /> Discuss a similar project
              </a>
              <a href={s.research ? "#research" : s.tasks || s.stills ? "#screens" : "#film"} className="link-draw py-2 text-lg font-semibold">
                {s.research ? "Explore the design process ↓" : s.tasks || s.stills ? "See the final experience ↓" : "Watch the project summary ↓"}
              </a>
            </div>
  
              </div>
            {s.heroShots && (
              <div aria-hidden className="relative mx-auto aspect-[1.08/1] w-full max-w-[34rem] lg:col-span-5">
                <div className="absolute inset-[5%] rounded-[2rem] bg-[#ece9e0] ring-1 ring-[var(--line)]" />
                <img src={`${base}${s.heroShots[0].src}`} alt="" width={1600} height={1046} fetchPriority="high" className="absolute right-0 top-0 w-[88%] rounded-xl border border-white/15 shadow-[0_40px_70px_-30px_rgba(36,60,57,0.26)]" />
                <img src={`${base}${s.heroShots[1].src}`} alt="" width={1600} height={1046} loading="lazy" decoding="async" className="absolute bottom-[6%] right-[-2%] w-[56%] rounded-xl border border-white/15 shadow-[0_40px_70px_-30px_rgba(36,60,57,0.26)]" />
                {[2, 3].map((n, i) => (
                  <img key={n} src={`${base}${s.heroShots![n].src}`} alt="" width={700} height={1515} loading="lazy" decoding="async" className="absolute bottom-0 w-[24%] rounded-[1.4rem] border-[5px] border-[var(--bezel)] shadow-[0_30px_50px_-20px_rgba(36,60,57,0.26)]" style={{ left: `${i * 17}%`, transform: `rotate(${i ? 3 : -3}deg)` }} />
                ))}
              </div>
            )}
          </div>

          {s.overview ? (
            <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {s.overview.map((o) => (
                <div key={o.k} className="bg-paper p-6 md:p-7">
                  <dt className="mono text-signal">{o.k}</dt>
                  <dd className="mt-2 text-lg leading-snug text-ink">{o.v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 md:grid-cols-4 lg:grid-cols-5">
              {glance.map((m) => (
                <div key={m.k}>
                  <dt className="mono text-ink-2">{m.k}</dt>
                  <dd className="mt-1 font-semibold">{m.v}</dd>
                </div>
              ))}
            </dl>
            )}
        </header>
      </div>

      {/* Film */}
      <Reveal>
        <section id="film" aria-label="Project summary video" className="relative z-20 mx-auto -mt-28 max-w-[88rem] px-5 md:-mt-44 md:px-10">
          <div className="rounded-xl border border-line bg-paper p-2 shadow-[0_40px_80px_-30px_rgba(36,60,57,0.26)] md:p-3">
            {s.video ? (
              <video
                src={`${base}${s.video}`}
                poster={s.poster ? `${base}${s.poster}` : project.coverImage}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full rounded-md bg-black"
              >
                <track kind="captions" />
              </video>
            ) : (
              <iframe
                src={`https://www.behance.net/embed/project/${project.id}?ilo0=1`}
                title={`${project.title} on Behance`}
                loading="lazy"
                allowFullScreen
                className="h-[75vh] min-h-[420px] w-full rounded-md"
              />
            )}
          </div>
          {s.video && (
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <p className="mono text-ink-2">Animated project summary, about a minute. Sound on.</p>
              {s.research && (s.tasks || s.stills) && (
                <a href="#screens" className="link-draw mono py-1 text-signal">See the final experience ↓</a>
              )}
            </div>
          )}
        </section>
      </Reveal>

      {/* 60-second summary */}
      {s.tldr && !s.overview && (
        <section id="overview" className="mx-auto mt-20 max-w-[88rem] scroll-mt-24 px-5 md:px-10">
          <Reveal>
            <Eyebrow n="00">The 60-second version</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {[
              ["The problem", s.tldr.problem],
              ["What I did", s.tldr.approach],
              ["What it delivers", s.tldr.result],
            ].map(([t, v], i) => (
              <Reveal key={t} delay={i * 0.06} className="bg-paper p-7 md:p-9">
                <p className="mono text-signal">{t}</p>
                <p className="serif mt-4 text-[1.55rem] leading-snug">{v}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Story with reading rail */}
      <div className="mx-auto mt-24 grid max-w-[88rem] grid-cols-[minmax(0,1fr)] gap-12 px-5 md:px-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <SectionRail items={rail} />

        <div className="min-w-0 space-y-28 md:space-y-36">
          {/* Context */}
          {s.context && (
            <section aria-label="Context" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("overview")}>The client and the product</Eyebrow>
                <p className="serif mt-5 max-w-3xl text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug">{s.context.text}</p>
                {s.context.facts && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.context.facts.map((f) => (
                      <li key={f} className="rounded-full border border-line px-4 py-1.5 text-base text-ink-2">{f}</li>
                    ))}
                  </ul>
                )}
                {s.context.note && <p className="mono mt-4 text-ink-2">{s.context.note}</p>}
              </Reveal>
            </section>
          )}

          {/* Problem */}
          {s.problem && (
            <section id="problem" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("problem")}>The problem</Eyebrow>
                <H2>{s.problem.headline}</H2>
              </Reveal>
              <ul className="mt-10 grid gap-5 sm:grid-cols-2">
                {s.problem.points.map((p, i) => (
                  <li key={p.title}>
                    <Reveal delay={i * 0.05} className="h-full rounded-xl border border-line bg-paper-2/60 p-6 transition-transform duration-300 hover:-translate-y-1">
                      <span className="mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-3 text-[1.7rem] font-medium leading-tight">{p.title}</h3>
                      {p.text && <p className="mt-3 text-lg leading-relaxed text-ink-2">{p.text}</p>}
                    </Reveal>
                  </li>
                ))}
              </ul>
              {s.problem.why && (
                <Reveal className="mt-10">
                  <p className="surface-stage serif rounded-[1.75rem] p-7 text-[clamp(1.35rem,2.2vw,1.8rem)] leading-snug md:p-10">{s.problem.why}</p>
                </Reveal>
              )}
            </section>
          )}

          {/* Users */}
          {s.users && (
            <section id="users" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("users")}>Who it is for</Eyebrow>
                {s.users.text && <H2>{s.users.text}</H2>}
              </Reveal>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {s.users.people.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.05} className={`rounded-xl border border-line p-6 ${p.quote ? "surface-stage md:col-span-3" : "bg-paper-2/60"}`}>
                    {p.tag && <p className={`mono text-signal`}>{p.tag}</p>}
                    <h3 className="mt-2 text-2xl font-medium">{p.name}</h3>
                    {p.quote && <p className="serif mt-4 max-w-3xl text-[clamp(1.4rem,2.4vw,2rem)] italic leading-snug">“{p.quote}”</p>}
                    {p.items && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.items.map((it) => (
                          <li key={it} className="rounded-full border border-line px-3 py-1 text-base text-ink-2">{it}</li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Research */}
          {s.research && (
            <section id="research" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("research")}>Research into design</Eyebrow>
                {s.research.text && <H2>{s.research.text}</H2>}
              </Reveal>
              {s.research.documented && (
                <Reveal className="mt-10 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-line p-6">
                    <p className="mono text-signal">Documented in the project files</p>
                    <ul className="mt-3 space-y-2 text-lg leading-snug">
                      {s.research.documented.map((t) => (
                        <li key={t} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-forest" aria-hidden />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-dashed border-[var(--line-strong)] p-6">
                    <p className="mono text-ink-2">Not documented, so not claimed</p>
                    <ul className="mt-3 space-y-2 text-lg leading-snug text-ink-2">
                      {(s.research.notDocumented ?? []).map((t) => (
                        <li key={t} className="flex gap-3"><span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-[var(--line-strong)]" />{t}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
              {s.research.documented && s.research.insights && (
                <Reveal className="mt-8">
                  <JourneyExplorer stages={s.research.insights} />
                </Reveal>
              )}
              {!s.research.documented && s.research.insights && (
                <ol className="mt-10 grid gap-5 md:grid-cols-2">
                  {s.research.insights.map((ins, i) => (
                    <li key={ins.title}>
                      <Reveal delay={(i % 2) * 0.06} className="h-full rounded-xl border border-line bg-paper-2/60 p-6 md:p-7">
                        <p className="mono text-signal">Stage {String(i + 1).padStart(2, "0")}</p>
                        <h3 className="mt-2 text-3xl font-medium">{ins.title}</h3>
                        {ins.thought && <p className="serif mt-3 text-xl italic text-ink-2">“{ins.thought}”</p>}
                        {ins.text && (
                          <div className="mt-5 border-l-2 border-signal pl-4">
                            <p className="mono text-signal">Pain point</p>
                            <p className="mt-1">{ins.text}</p>
                          </div>
                        )}
                        {ins.response && (
                          <div className="mt-4 border-l-2 border-forest pl-4">
                            <p className="mono text-forest">Design response</p>
                            <p className="mt-1">{ins.response}</p>
                          </div>
                        )}
                      </Reveal>
                    </li>
                  ))}
                </ol>
              )}
              {s.research.shot && (
                <Reveal className="mt-10">
                  {s.research.documented ? (
                    <a href={`${base}${s.research.shot.src}`} target="_blank" rel="noreferrer" className="group block">
                      <Browser shot={s.research.shot} />
                      <span className="link-draw mono mt-3 inline-block py-1 text-signal">Open the full journey map in a new tab ↗</span>
                    </a>
                  ) : (
                    <Browser shot={s.research.shot} />
                  )}
                </Reveal>
              )}
            </section>
          )}

          {/* Decisions */}
          {s.decisions && s.decisions.length > 0 && (
            <section id="decisions" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("decisions")}>Design decisions</Eyebrow>
                <H2>{s.decisions.some((x) => x.record) ? "Five decisions, with the reasoning behind each." : "What I decided, and what it looks like."}</H2>
              </Reveal>
              {s.decisions.some((x) => x.record) ? (
                <div className="mt-14">
                  <DecisionRecords decisions={s.decisions} />
                </div>
              ) : s.decisions.filter((x) => x.shots?.length).length >= 2 ? (
                <Reveal className="mt-12">
                  <DecisionExplorer decisions={s.decisions} />
                </Reveal>
              ) : (
                <ol className="mt-12">
                  {s.decisions.map((d, i) => (
                    <li key={d.title} className={d.shots?.length ? "pb-20" : "pb-10"}>
                      <Reveal>
                        <div className="flex items-baseline gap-4">
                          <span className="serif text-5xl text-signal md:text-6xl">{String(i + 1).padStart(2, "0")}</span>
                          <div>
                            <h3 className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-medium leading-tight">{d.title}</h3>
                            <p className="mt-2 max-w-2xl text-ink-2">{d.text}</p>
                          </div>
                        </div>
                      </Reveal>
                      {d.shots && d.shots.length > 0 && (
                        <Reveal delay={0.05} className={`mt-8 grid gap-6 ${d.kind === "phone" ? "grid-cols-2 md:grid-cols-4" : d.shots.length > 1 ? "md:grid-cols-2" : ""}`}>
                          {d.shots.map((sh) =>
                            d.kind === "phone" ? <Phone key={sh.src} shot={sh} /> : <Browser key={sh.src} shot={sh} className={d.shots!.length === 3 && sh === d.shots![2] ? "md:col-span-2" : ""} />,
                          )}
                        </Reveal>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </section>
          )}

          {/* Trade-offs: only with real material */}
          {s.tradeoffs && s.tradeoffs.length > 0 && (
            <section id="tradeoffs" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("tradeoffs")}>Trade-offs</Eyebrow>
                <H2>What I weighed, and what I gave up.</H2>
              </Reveal>
              <ul className="mt-10 grid gap-4 md:grid-cols-2">
                {s.tradeoffs.map((t) => (
                  <li key={t.title} className="rounded-xl border border-line p-6">
                    <p className="serif text-2xl">{t.title}</p>
                    <p className="mt-2 text-ink-2">{t.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Flow */}
          {s.flow && (
            <section id="flow" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("flow")}>The journey</Eyebrow>
                <H2>{s.flow.title}</H2>
              </Reveal>
              <ol className="mt-10 grid gap-0 border-y border-line md:grid-flow-col md:auto-cols-fr">
                {s.flow.steps.map((st, i) => (
                  <li key={st.label} className="relative border-b border-line py-6 md:border-b-0 md:border-r md:px-6 md:last:border-r-0 md:first:pl-0">
                    <span className="mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <p className="serif mt-2 text-2xl">{st.label}</p>
                    {st.text && <p className="mt-1 text-base text-ink-2">{st.text}</p>}
                  </li>
                ))}
              </ol>
              {s.flow.shot && (
                <Reveal className="mt-10">
                  <a href={`${base}${s.flow.shot.src}`} target="_blank" rel="noreferrer" className="block">
                    <Browser shot={s.flow.shot} />
                    <span className="link-draw mono mt-3 inline-block py-1 text-signal">Open the information architecture at full size ↗</span>
                  </a>
                </Reveal>
              )}
            </section>
          )}

          {/* Before / after */}
          {s.before && s.after && (
            <section id="before-after" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("before-after")}>Before and after</Eyebrow>
                <H2>The same platform, redesigned.</H2>
              </Reveal>
              <Reveal className="mt-10">
                <BeforeAfter before={s.before} after={s.after} />
              </Reveal>
            </section>
          )}

          {/* Final design */}
          {(s.stills?.length || s.features?.length || s.tasks?.length) && (
            <section id="screens" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("screens")}>The final design</Eyebrow>
                <H2>{s.tasks ? "What a patient, a doctor and the front desk can do." : "What the finished experience includes."}</H2>
              </Reveal>
              {s.tasks && (
                <Reveal className="mt-10">
                  <TaskShowcase tasks={s.tasks} />
                </Reveal>
              )}
              {s.stills && s.stills.length > 0 && (
                <div className="mt-10 grid gap-6">
                  {s.stills.map((sh) => (
                    <Reveal key={sh.src}>
                      <Browser shot={sh} ratio="16 / 9" />
                    </Reveal>
                  ))}
                </div>
              )}
              {s.features && (
                <ul className="mt-12 grid gap-x-10 border-t border-line sm:grid-cols-2">
                  {s.features.map((f, i) => (
                    <li key={f.title} className="border-b border-line">
                      <Reveal delay={(i % 4) * 0.04} className="flex gap-4 py-5">
                        <span className="mono pt-1.5 text-signal">{String(i + 1).padStart(2, "0")}</span>
                        <span>
                          <span className="serif block text-2xl">{f.title}</span>
                          {f.text && <span className="mt-1 block text-base text-ink-2">{f.text}</span>}
                        </span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
              {s.imageNote && <p className="mono mt-6 text-ink-2">{s.imageNote}</p>}
            </section>
          )}

          {/* Design system */}
          {s.system && (
            <section id="system" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("system")}>Design system</Eyebrow>
                <H2>One system, carried across the whole product.</H2>
                {s.system.type && <p className="mono mt-4 text-ink-2">Type: {s.system.type}</p>}
              </Reveal>
              <Reveal className="mt-10">
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {s.system.palette.map((c) => (
                    <li key={c.hex}>
                      <span className="block h-24 rounded-lg border border-line" style={{ background: c.hex }} />
                      <p className="mt-3 font-semibold">{c.name}</p>
                      <p className="mono text-ink-2">{c.hex}</p>
                    </li>
                  ))}
                </ul>
                {s.system.notes && (
                  <ul className="mt-8 space-y-2 text-ink-2">
                    {s.system.notes.map((n) => (
                      <li key={n} className="flex gap-3"><span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-signal" />{n}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
              {s.system.shot && (
                <Reveal className="mt-10">
                  <a href={`${base}${s.system.shot.src}`} target="_blank" rel="noreferrer" className="group relative block max-h-[34rem] overflow-hidden rounded-2xl border border-line bg-paper-2">
                    <img src={`${base}${s.system.shot.src}`} alt={s.system.shot.alt} loading="lazy" className="mx-auto block w-full max-w-[34rem] object-top" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--paper)] to-transparent px-6 pb-5 pt-24">
                      <span className="link-draw mono py-1 text-signal">Open the full design system board ↗</span>
                    </span>
                  </a>
                </Reveal>
              )}
            </section>
          )}

          {/* Validation and iteration */}
          {s.validation && (
            <section id="validation" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("validation")}>Validation and iteration</Eyebrow>
                <H2>How it was tested, and what changed.</H2>
                {s.validation.text && <p className="mt-6 max-w-2xl text-xl text-ink-2">{s.validation.text}</p>}
              </Reveal>
              {s.validation.items && (
                <ul className="mt-10 grid gap-4 md:grid-cols-2">
                  {s.validation.items.map((t) => (
                    <li key={t.title} className="rounded-xl border border-line p-6">
                      <p className="serif text-2xl">{t.title}</p>
                      {t.thought && <p className="mt-2 text-ink-2"><span className="mono text-signal">Found </span>{t.thought}</p>}
                      {t.response && <p className="mt-2"><span className="mono text-signal">Changed </span>{t.response}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Impact */}
          {(s.delivered || s.measured || s.outcomes) && (
            <section id="impact" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("impact")}>{s.outcomes ? "Outcomes and reflection" : "What it delivers"}</Eyebrow>
                <H2>{s.outcomes ? "What is proven, what is intended, and what I learned." : "The finished design, in short."}</H2>
              </Reveal>
              {s.outcomes && (
                <>
                  <Reveal className="mt-10">
                    <OutcomesPanel o={s.outcomes} />
                  </Reveal>
                  <Reveal className="mt-14">
                    <p className="mono text-signal">5 · Reflection</p>
                    <ul className="mt-4 divide-y divide-line border-y border-line">
                      {s.outcomes.reflection.map((t) => (
                        <li key={t} className="serif py-6 text-[clamp(1.4rem,2.3vw,1.9rem)] leading-snug">{t}</li>
                      ))}
                    </ul>
                  </Reveal>
                </>
              )}
              {s.measured && s.measured.length > 0 && (
                <dl className="mt-10 grid gap-8 border-y border-line py-8 sm:grid-cols-3">
                  {s.measured.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse">
                      <dt className="mono mt-2 text-ink-2">{m.label} · {m.source}</dt>
                      <dd className="serif text-6xl text-forest">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {s.delivered && !s.outcomes && (
                <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                  {s.delivered.map((d, i) => (
                    <li key={d}>
                      <Reveal delay={i * 0.05} className="flex items-start gap-4 rounded-xl border border-line p-5">
                        <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest text-on-forest"><Check size={16} aria-hidden /></span>
                        <span className="serif text-2xl leading-snug">{d}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Lessons */}
          {s.lessons && s.lessons.length > 0 && (
            <section id="lessons" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("lessons")}>Lessons learned</Eyebrow>
              </Reveal>
              <ul className="mt-8 border-t border-line">
                {s.lessons.map((t) => (
                  <li key={t} className="serif border-b border-line py-6 text-[clamp(1.4rem,2.4vw,2rem)] leading-snug">{t}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Skills, each tied to evidence on the page */}
          {s.signals && (
            <section id="shows" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("shows")}>What this shows about my work</Eyebrow>
                <H2>Where each skill shows up in this project.</H2>
              </Reveal>
              <ul className="mt-10 grid gap-4 md:grid-cols-2">
                {s.signals.map((g) => (
                  <li key={g.skill}>
                    <Reveal className="h-full rounded-2xl border border-line p-6">
                      <p className="serif text-2xl">{g.skill}</p>
                      <p className="mt-2 text-lg leading-relaxed text-ink-2">{g.evidence}</p>
                      {g.to && <a href={`#${g.to}`} className="link-draw mono mt-4 inline-block py-1 text-signal">See it on this page ↓</a>}
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* What this shows */}
          {!s.signals && s.shows && s.shows.length > 0 && (
            <section id="shows" className="scroll-mt-24">
              <Reveal>
                <Eyebrow n={num("shows")}>What this shows about my work</Eyebrow>
              </Reveal>
              <ul className="mt-8 border-t border-line">
                {s.shows.map((t, i) => (
                  <li key={t} className="border-b border-line">
                    <Reveal delay={i * 0.05} className="flex items-baseline gap-5 py-6">
                      <span className="mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                      <span className="serif text-[clamp(1.4rem,2.4vw,2rem)] leading-snug">{t}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Closing call to action */}
      <div className="mx-auto mt-28 max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <div className="surface-deep flex flex-col gap-6 rounded-sm px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-14">
            <div>
              <p className="mono text-ink-2">Working on something similar?</p>
              <h2 className="mt-2 max-w-2xl text-[clamp(2rem,4vw,3.4rem)] font-medium leading-tight">
                Let's solve your <em className="text-forest">product challenge.</em>
              </h2>
            </div>
            <a href={MAIL_HREF} className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-7 font-semibold text-on-forest transition-transform hover:-translate-y-0.5">
              Discuss a project <ArrowUpRight size={18} />
            </a>
          </div>
        </Reveal>
        {project.behanceUrl && (
          <p className="mt-6">
            <a href={project.behanceUrl} target="_blank" rel="noreferrer" className="link-draw inline-flex items-center gap-2 py-2 font-semibold text-forest">
              View the full case study on Behance <ExternalLink size={16} />
            </a>
          </p>
        )}
      </div>

      {/* Next project */}
      <div className="mx-auto mt-16 max-w-[88rem] px-5 md:px-10">
        <Link to={`/work/${next.slug}`} className="group block border-y border-ink py-10 transition-colors hover:bg-paper-2">
          <p className="mono text-ink-2">Next project</p>
          <p className="mt-3 flex items-center justify-between gap-6">
            <span className="serif text-[clamp(1.8rem,4.5vw,4rem)] font-medium leading-tight">{next.title}</span>
            <ArrowUpRight size={40} className="shrink-0 text-signal transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </p>
        </Link>
      </div>
    </article>
  );
}
