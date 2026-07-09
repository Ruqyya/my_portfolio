import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { projects, getProject } from "../data/projects";
import Reveal from "../components/ui/Reveal";
import PulseDivider from "../components/ui/PulseDivider";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/404" replace />;

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="pt-28 md:pt-36 pb-24">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-5 mb-6">
            <Link to="/#work" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0EA5E9]">
              <ArrowLeft size={15} /> Back to work
            </Link>
            <span
              className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md"
              style={{ backgroundColor: project.color }}
            >
              {project.industry} · {project.year}
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            {project.title}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
            <Meta label="Role" value={project.role} />
            <Meta label="Duration" value={project.duration} />
            <Meta label="Tools" value={project.tools.join(", ")} />
            <Meta label="Industry" value={project.industry} />
          </div>
        </Reveal>
      </header>

      {/* Hero visual */}
      <Reveal delay={0.15}>
        <div className="max-w-5xl mx-auto mt-14 px-5 md:px-8">
          {project.coverImage ? (
            <ProjectImage src={project.coverImage} alt={project.title} />
          ) : (
            <div
              className="rounded-3xl aspect-[16/10] flex items-center justify-center border border-slate-200 dark:border-slate-700"
              style={{ background: `linear-gradient(135deg, ${project.color}18, ${project.color}45)` }}
            >
              <span className="font-display font-extrabold text-8xl opacity-20" style={{ color: project.color }}>
                {project.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
            </div>
          )}
        </div>
      </Reveal>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 mt-16 grid sm:grid-cols-3 gap-5">
        {project.results.map((r, i) => (
          <Reveal key={r.label} delay={i * 0.06}>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 text-center">
              <div className="font-display font-extrabold text-3xl" style={{ color: project.color }}>{r.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-5 md:px-8 mt-20 space-y-20">
        <Block title="Overview" text={project.overview} />

        <Block title="The Challenge" text={project.challenge} />

        <Section title="Problem & Solution">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-6">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-2">Problem</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{project.problem}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-6">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-2">Solution</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </Section>

        <Section title="Research">
          <ul className="space-y-3">
            {project.research.map((r) => (
              <li key={r} className="flex gap-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: project.color }} />
                {r}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Competitor Analysis">
          <div className="space-y-3">
            {project.competitors.map((c) => (
              <div key={c.name} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <p className="font-display font-semibold text-sm text-slate-900 dark:text-white">{c.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.note}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="User Personas">
          <div className="grid sm:grid-cols-2 gap-5">
            {project.personas.map((p) => (
              <div key={p.name} className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-6">
                <p className="font-display font-bold text-sm text-slate-900 dark:text-white">{p.name}</p>
                <p className="text-xs text-slate-400 mb-3">{p.role}</p>
                <p className="text-xs font-semibold text-[#14B8A6] mb-1">Goal</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{p.goal}</p>
                <p className="text-xs font-semibold text-[#0F172A] mb-1">Frustration</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{p.frustration}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Wireframes">
          <ul className="space-y-3">
            {project.wireframeNotes.map((w) => (
              <li key={w} className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">— {w}</li>
            ))}
          </ul>
        </Section>

        <Section title="High Fidelity Designs">
          {project.coverImage ? (
            <ProjectImage src={project.coverImage} alt={`${project.title} high-fidelity design`} />
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              High-fidelity screens are available on the full Behance case study.
            </p>
          )}
        </Section>

        <Section title="Design System">
          <ul className="space-y-3">
            {project.designSystemNotes.map((d) => (
              <li key={d} className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">— {d}</li>
            ))}
          </ul>
        </Section>

        <Section title="Prototype">
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            An interactive Figma prototype connected every core flow end-to-end, used both in usability
            testing sessions and in stakeholder walkthroughs ahead of development handoff.
          </p>
        </Section>

        <Section title="Testing">
          <ul className="space-y-3">
            {project.testingNotes.map((t) => (
              <li key={t} className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">— {t}</li>
            ))}
          </ul>
        </Section>

        <Block title="Final Outcome" text={project.outcome} />
        <Block title="Lessons Learned" text={project.lessons} />

        <Section title="Gallery">
          {project.coverImage ? (
            <ProjectImage src={project.coverImage} alt={`${project.title} gallery preview`} />
          ) : null}
          <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
            Full project screens and process are on Behance.
          </p>
        </Section>

        <div>
          <a
            href={project.behanceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0EA5E9] hover:underline"
          >
            View full case study on Behance <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <PulseDivider className="max-w-3xl mx-auto mt-20 opacity-40" color={project.color} />

      {/* Next project */}
      <div className="max-w-3xl mx-auto px-5 md:px-8 mt-10">
        <Link
          to={`/work/${next.slug}`}
          className="group flex items-center justify-between rounded-3xl border border-slate-200 dark:border-slate-700 p-8 hover:border-[#0EA5E9] transition-colors"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Next project</span>
            <h3 className="font-display font-bold text-xl md:text-2xl text-slate-900 dark:text-white mt-1">{next.title}</h3>
          </div>
          <ArrowRight className="text-slate-400 group-hover:translate-x-1 group-hover:text-[#0EA5E9] transition-all" />
        </Link>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</p>
    </div>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <Reveal>
      <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-4">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{text}</p>
    </Reveal>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-6">{title}</h2>
      {children}
    </Reveal>
  );
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-6">
      <div className="flex items-center justify-center min-h-[220px] md:min-h-[320px]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="max-w-full max-h-[420px] w-auto h-auto object-contain rounded-xl"
        />
      </div>
    </div>
  );
}
