import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "../../data/projects";
import Reveal from "./Reveal";

export default function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={`/work/${project.slug}`}
        className="group relative flex flex-col h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
      >
        <div
          className="relative h-56 flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}55)` }}
        >
          <span
            className="font-display font-extrabold text-6xl opacity-20 group-hover:scale-110 transition-transform duration-500"
            style={{ color: project.color }}
          >
            {project.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
          <span className="absolute top-4 left-4 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
            {project.industry}
          </span>
          <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div className="flex-1 flex flex-col p-6">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-1.5">
            {project.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {project.summary}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium rounded-full px-2.5 py-1 bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] inline-flex items-center gap-1">
              Case Study <ArrowUpRight size={12} />
            </span>
            <span className="text-xs text-slate-400 inline-flex items-center gap-1">
              Behance <ExternalLink size={12} />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
