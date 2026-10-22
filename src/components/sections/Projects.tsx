import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ProjectMedia, { hasVideo } from "../ui/ProjectMedia";
import { projects, type Project } from "../../data/projects";

const FEATURED_SLUGS = [
  "oladoc-healthcare-app-ui-ux-design",
  "marham-pk-healthcare-platform-redesign",
  "sehat-kahani-telemedicine-ui-ux-design",
  "telemedicine-healthcare-app-case-study",
];
const featured = FEATURED_SLUGS.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => Boolean(p));
const industries = ["All", ...Array.from(new Set(projects.map((p) => p.industry)))];

export default function Projects() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title="Work that moves people."
          description="Four projects in depth, then everything else. Each one opens as a full case study."
        />
        <FeaturedStack />
        <ProjectIndex />
      </div>
    </section>
  );
}

/* ───────── Featured: cards stack as you scroll ───────── */

function FeaturedStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="mt-14 md:mt-20 space-y-6 md:space-y-0">
      {featured.map((p, i) => (
        <FeaturedCard key={p.slug} project={p} i={i} total={featured.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function FeaturedCard({ project, i, total, progress }: { project: Project; i: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const target = 1 - (total - 1 - i) * 0.04;
  const scale = useTransform(progress, [i / total, 1], [1, target]);

  const frameRef = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });

  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const tilt = (e: React.MouseEvent) => {
    if (reduce || !frameRef.current) return;
    const r = frameRef.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const untilt = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      style={{ scale: reduce ? 1 : scale, top: `${88 + i * 22}px`, transformOrigin: "top center" }}
      className="md:sticky md:mb-10"
    >
      <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0B1220] text-white shadow-2xl shadow-slate-900/20">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl opacity-30"
          style={{ background: project.color }}
        />
        <div className="relative grid md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-10 p-6 md:p-10 md:min-h-[480px] items-center">
          <div className="flex flex-col h-full">
            <span className="font-display text-sm font-medium tracking-widest text-slate-400">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span
              className="mt-5 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: project.color }}
            >
              {project.industry} · {project.year}
            </span>
            <h3 className="mt-4 font-display font-extrabold text-2xl md:text-4xl leading-[1.1] tracking-tight">
              {project.title}
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">{project.summary}</p>
            <div className="mt-auto pt-8 flex flex-wrap items-center gap-3">
              <Link
                to={`/work/${project.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-white text-slate-900 font-semibold text-sm px-5 py-3 hover:bg-sky-100 transition-colors"
              >
                View case study
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              {project.behanceUrl && (
                <a
                  href={project.behanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors px-2 py-3"
                >
                  Behance <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>

          <Link to={`/work/${project.slug}`} aria-label={`Open ${project.title}`} className="block [perspective:1200px]">
            <motion.div
              ref={frameRef}
              onMouseMove={tilt}
              onMouseLeave={untilt}
              style={{ rotateX: rx, rotateY: ry }}
              className="rounded-2xl bg-slate-900 ring-1 ring-white/15 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800/80">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
              </div>
              <div className={`relative overflow-hidden bg-slate-100 ${hasVideo(project) ? "aspect-video" : "aspect-[16/10]"}`}>
                <motion.div
                  style={hasVideo(project) ? undefined : { y: reduce ? 0 : imgY, scale: 1.12 }}
                  className="absolute inset-0"
                >
                  <ProjectMedia project={project} className="h-full w-full object-cover object-top" />
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </div>
      </article>
    </motion.div>
  );
}

/* ───────── Index: every project, hover to preview ───────── */

function ProjectIndex() {
  const [filter, setFilter] = useState("All");
  const [hover, setHover] = useState<Project | null>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 28 });
  const sy = useSpring(my, { stiffness: 260, damping: 28 });

  const list = useMemo(() => projects.filter((p) => filter === "All" || p.industry === filter), [filter]);

  return (
    <div className="mt-24 md:mt-32">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-slate-900 dark:text-white">
            All projects <span className="text-slate-400 font-medium">({projects.length})</span>
          </h3>
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter projects">
            {industries.map((ind) => (
              <button
                key={ind}
                role="tab"
                aria-selected={filter === ind}
                onClick={() => setFilter(ind)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === ind ? "text-white dark:text-slate-900" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {filter === ind && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{ind}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <ul
        className="mt-8 border-t border-slate-200 dark:border-slate-700"
        onMouseMove={(e) => {
          mx.set(e.clientX + 28);
          my.set(e.clientY - 120);
        }}
        onMouseLeave={() => setHover(null)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
              onMouseEnter={() => setHover(p)}
              className="border-b border-slate-200 dark:border-slate-700"
            >
              <Link to={`/work/${p.slug}`} className="group flex items-center gap-4 md:gap-8 py-5 md:py-7 transition-transform duration-300 md:hover:translate-x-3">
                <span className="hidden sm:block w-8 font-display text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                <img
                  src={p.coverImage}
                  alt=""
                  loading="lazy"
                  className="md:hidden h-14 w-14 shrink-0 rounded-xl object-cover object-top"
                />
                <span className="flex-1 font-display font-bold text-lg md:text-3xl tracking-tight text-slate-900 dark:text-white group-hover:text-[#0EA5E9] transition-colors">
                  {p.title}
                </span>
                <span className="hidden lg:block text-sm text-slate-500 dark:text-slate-400">{p.tags.filter((t) => t !== "Case Study").slice(0, 2).join(" · ")}</span>
                <span className="hidden sm:block rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {p.industry}
                </span>
                <ArrowUpRight className="shrink-0 text-slate-400 group-hover:text-[#0EA5E9] group-hover:rotate-12 transition-all" size={22} />
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {hover && !reduce && (
          <motion.div
            key="preview"
            aria-hidden
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block h-[220px] w-[330px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={hover.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0"
              >
                <ProjectMedia project={hover} className="h-full w-full object-cover object-top" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
