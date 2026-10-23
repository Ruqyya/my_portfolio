import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, getProject } from "../data/projects";
import Reveal from "../components/ui/Reveal";

const base = import.meta.env.BASE_URL;

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/404" replace />;

  const { study } = project;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const tags = project.tags.filter((t) => t !== "Case Study");
  const meta = [
    { k: "Industry", v: project.industry },
    { k: "Year", v: project.year },
    { k: "Type", v: tags.filter((t) => t !== project.industry).join(", ") },
    { k: "Role", v: study.role },
    { k: "Duration", v: study.duration },
    { k: "Tools", v: study.tools?.join(", ") },
  ].filter((m): m is { k: string; v: string } => Boolean(m.v));

  return (
    <article className="relative z-10 pb-24">
      <div className="surface-deep pb-40 pt-28 md:pb-56 md:pt-36">
      <header className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Link to="/#work" className="link-draw mono inline-flex items-center gap-2 py-2 text-ink-2">
          <ArrowLeft size={14} /> All work
        </Link>
        <p className="mono mt-10 text-signal">
          {String(index + 1).padStart(2, "0")} — {project.industry} · {project.year}
        </p>
        <h1 className="mt-4 max-w-5xl text-[clamp(2.8rem,6.6vw,6.2rem)] font-medium leading-[1.02]">{project.title}</h1>
        {study.summary && <p className="mt-8 max-w-2xl text-xl text-ink-2">{study.summary}</p>}

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k}>
              <dt className="mono text-ink-2">{m.k}</dt>
              <dd className="mt-1 font-semibold">{m.v}</dd>
            </div>
          ))}
        </dl>
      </header>
      </div>

      <Reveal>
        <section aria-label="Project film" className="relative z-20 mx-auto -mt-28 max-w-[88rem] px-5 md:-mt-44 md:px-10">
          <div className="border border-line bg-paper-2 p-2 md:p-4">
            {study.video ? (
              <video
                src={`${base}${study.video}`}
                poster={study.poster ? `${base}${study.poster}` : project.coverImage}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-black"
              >
                <track kind="captions" />
              </video>
            ) : (
              <iframe
                src={`https://www.behance.net/embed/project/${project.id}?ilo0=1`}
                title={`${project.title} on Behance`}
                loading="lazy"
                allowFullScreen
                className="h-[75vh] min-h-[420px] w-full"
              />
            )}
          </div>
          {study.video && <p className="mono mt-3 text-ink-2">Sound on for the full walkthrough.</p>}
        </section>
      </Reveal>

      {study.results && study.results.length > 0 && (
        <section aria-label="At a glance" className="mx-auto mt-16 max-w-[88rem] px-5 md:px-10">
          <dl className="grid gap-8 border-y border-line py-10 sm:grid-cols-3">
            {study.results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse">
                <dt className="mono mt-2 text-ink-2">{r.label}</dt>
                <dd className="serif text-6xl font-medium text-forest md:text-7xl">{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {(study.problem || study.solution || study.outcome) && (
        <div className="mx-auto mt-16 grid max-w-[88rem] gap-12 px-5 md:px-10 lg:grid-cols-3">
          {[
            ["The problem", study.problem],
            ["The solution", study.solution],
            ["The outcome", study.outcome],
          ].map(([t, v]) =>
            v ? (
              <Reveal key={t}>
                <h2 className="text-3xl font-medium">{t}</h2>
                <p className="mt-4 text-ink-2">{v}</p>
              </Reveal>
            ) : null,
          )}
        </div>
      )}

      {project.behanceUrl && (
        <div className="mx-auto mt-14 max-w-[88rem] px-5 md:px-10">
          <a
            href={project.behanceUrl}
            target="_blank"
            rel="noreferrer"
            className="link-draw inline-flex items-center gap-2 py-2 font-semibold text-forest"
          >
            View the full case study on Behance <ExternalLink size={16} />
          </a>
        </div>
      )}

      <div className="mx-auto mt-24 max-w-[88rem] px-5 md:px-10">
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
