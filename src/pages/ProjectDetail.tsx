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

  const { study } = project;
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const meta = [
    { label: "Role", value: study.role },
    { label: "Duration", value: study.duration },
    { label: "Tools", value: study.tools?.join(", ") },
    { label: "Industry", value: project.industry },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  return (
    <article className="pt-28 md:pt-36 pb-24">
      <header className="max-w-4xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-5 mb-6">
            <Link to="/#work" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0EA5E9] py-2">
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
          {study.summary && (
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">{study.summary}</p>
          )}
        </Reveal>

        {meta.length > 0 && (
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
              {meta.map((m) => (
                <Meta key={m.label} label={m.label} value={m.value} />
              ))}
            </div>
          </Reveal>
        )}
      </header>

      <Reveal delay={0.15}>
        <div className="max-w-5xl mx-auto mt-12 px-5 md:px-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900">
            <iframe
              src={`https://www.behance.net/embed/project/${project.id}?ilo0=1`}
              title={`${project.title} on Behance`}
              loading="lazy"
              allowFullScreen
              className="w-full h-[70vh] min-h-[420px]"
            />
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Not loading?{" "}
            <a href={project.behanceUrl} target="_blank" rel="noreferrer" className="text-[#0EA5E9] hover:underline">
              Open the full case study on Behance
            </a>
            .
          </p>
        </div>
      </Reveal>

      {study.results && study.results.length > 0 && (
        <div className="max-w-4xl mx-auto px-5 md:px-8 mt-16 grid sm:grid-cols-3 gap-5">
          {study.results.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 text-center">
                <div className="font-display font-extrabold text-3xl" style={{ color: project.color }}>{r.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-5 md:px-8 mt-16 space-y-14">
        {study.problem && <Block title="The problem" text={study.problem} />}
        {study.solution && <Block title="The solution" text={study.solution} />}
        {study.outcome && <Block title="The outcome" text={study.outcome} />}

        <a
          href={project.behanceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0EA5E9] hover:underline py-2"
        >
          View full case study on Behance <ExternalLink size={14} />
        </a>
      </div>

      <PulseDivider className="max-w-3xl mx-auto mt-20 opacity-40" color={project.color} />

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
