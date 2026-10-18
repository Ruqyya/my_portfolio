import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Activity, ArrowUpRight, LayoutGrid, TrendingUp } from "lucide-react";
import ProjectMedia from "../ui/ProjectMedia";
import { projects } from "../../data/projects";

const SLUGS = [
  "oladoc-homepage-concept-redesign",
  "marham-pk-healthcare-platform-redesign",
  "sehat-kahani-telemedicine-ui-ux-design",
  "telemedicine-healthcare-app-case-study",
];
const stageProjects = SLUGS.map((s) => projects.find((p) => p.slug === s)).filter((p) => p !== undefined);
const SWATCHES = ["#0EA5E9", "#0F172A", "#14B8A6", "#64748B"];

// Depth layer that drifts with the pointer.
function Layer({ mx, my, depth, className = "", children }: { mx: MotionValue<number>; my: MotionValue<number>; depth: number; className?: string; children: React.ReactNode }) {
  const x = useSpring(useTransform(mx, (v) => v * depth), { stiffness: 80, damping: 18 });
  const y = useSpring(useTransform(my, (v) => v * depth), { stiffness: 80, damping: 18 });
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function HeroStage({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [swatch, setSwatch] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const a = setInterval(() => setI((n) => (n + 1) % stageProjects.length), 3600);
    const b = setInterval(() => setSwatch((n) => (n + 1) % SWATCHES.length), 1300);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [reduce]);

  const current = stageProjects[i];
  const upcoming = stageProjects[(i + 1) % stageProjects.length];
  if (!current || !upcoming) return null;

  return (
    <div className="relative mx-auto w-full max-w-[34rem] aspect-[1/1.05]">
      {/* dotted canvas */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[2rem] border border-slate-200/80 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm"
        style={{
          backgroundImage: "radial-gradient(rgba(100,116,139,0.28) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* peeking next project */}
      <Layer mx={mx} my={my} depth={-8} className="absolute inset-x-[12%] top-[16%] h-[58%]">
        <div className="h-full w-full -rotate-3 overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 opacity-70 shadow-lg ring-1 ring-slate-900/10">
          <ProjectMedia project={upcoming} className="h-full w-full object-cover object-top blur-[1.5px]" />
        </div>
      </Layer>

      {/* main browser frame */}
      <Layer mx={mx} my={my} depth={14} className="absolute inset-x-[7%] top-[11%] z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0], rotate: [0, 0.6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="overflow-hidden rounded-2xl bg-slate-900 shadow-2xl shadow-slate-900/25 ring-1 ring-slate-900/15"
          >
            <div className="flex items-center gap-1.5 bg-slate-800 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 h-5 flex-1 rounded-md bg-slate-700/70 px-3 text-[10px] leading-5 text-slate-400 truncate">
                {current.title}
              </span>
            </div>
            <div className="relative aspect-[16/11] bg-slate-100">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <ProjectMedia project={current} className="h-full w-full object-cover object-top" />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </Layer>

      {/* caption + progress */}
      <Layer mx={mx} my={my} depth={6} className="absolute inset-x-[7%] bottom-[7%] z-20">
        <Link
          to={`/work/${current.slug}`}
          className="group flex items-center justify-between gap-3 rounded-2xl glass px-4 py-3 shadow-lg"
        >
          <span className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Now showing · {String(i + 1).padStart(2, "0")}/{String(stageProjects.length).padStart(2, "0")}
            </span>
            <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">{current.title}</span>
          </span>
          <ArrowUpRight size={18} className="shrink-0 text-slate-400 transition-all group-hover:text-[#0EA5E9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <div className="mt-2 flex gap-1.5 px-1">
          {stageProjects.map((p, n) => (
            <span key={p.slug} className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              {n === i && !reduce ? (
                <motion.span
                  key={`bar-${i}`}
                  className="block h-full origin-left bg-[#0EA5E9]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3.6, ease: "linear" }}
                />
              ) : (
                <span className={`block h-full bg-[#0EA5E9] ${n === i ? "" : "opacity-0"}`} />
              )}
            </span>
          ))}
        </div>
      </Layer>

      {/* floating chips */}
      <Layer mx={mx} my={my} depth={26} className="absolute -left-6 top-[2%] z-30">
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-44 rounded-2xl glass p-4 shadow-xl"
        >
          <div className="mb-2 flex items-center gap-2 text-[#0EA5E9]">
            <Activity size={16} />
            <span className="text-xs font-semibold">Patient Vitals</span>
          </div>
          <svg viewBox="0 0 120 30" className="h-6 w-full">
            <motion.polyline
              points="0,15 30,15 36,4 42,26 48,15 60,15 68,15 74,6 80,24 86,15 120,15"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0], pathOffset: [0, 0, 0, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 0.85, 1] }}
            />
          </svg>
        </motion.div>
      </Layer>

      <Layer mx={mx} my={my} depth={30} className="absolute -right-5 top-[44%] z-30">
        <motion.div
          animate={reduce ? undefined : { y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="w-40 rounded-2xl glass p-4 shadow-xl"
        >
          <div className="mb-2 flex items-center gap-2 text-sky-600 dark:text-sky-400">
            <TrendingUp size={16} />
            <span className="text-xs font-semibold">Recovery Rate</span>
          </div>
          <div className="font-display text-xl font-extrabold text-slate-900 dark:text-white">98.5%</div>
        </motion.div>
      </Layer>

      <Layer mx={mx} my={my} depth={22} className="absolute -left-4 bottom-[22%] z-30">
        <motion.div
          animate={reduce ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-40 rounded-2xl glass p-4 shadow-xl"
        >
          <div className="mb-2 flex items-center gap-2 text-[#14B8A6]">
            <LayoutGrid size={16} />
            <span className="text-xs font-semibold">Care Modules</span>
          </div>
          <div className="flex gap-1.5">
            {SWATCHES.map((c, n) => (
              <span
                key={c}
                className={`h-5 w-5 rounded-md transition-all duration-300 ${n === swatch && !reduce ? "scale-125 ring-2 ring-offset-2 ring-sky-400 ring-offset-white dark:ring-offset-slate-800" : ""}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </motion.div>
      </Layer>

      {/* Figma-style cursor that "designs" the stage */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-40"
          initial={{ left: "88%", top: "92%", opacity: 0 }}
          animate={{
            left: ["88%", "14%", "80%", "20%", "88%"],
            top: ["92%", "10%", "50%", "74%", "92%"],
            opacity: 1,
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", opacity: { delay: 2, duration: 0.6 } }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-md">
            <path d="M3 2l7.5 18 2.4-7.1L20 10.5 3 2z" fill="#0EA5E9" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span className="ml-4 -mt-1 inline-block rounded-full rounded-tl-none bg-[#0EA5E9] px-2.5 py-1 text-[10px] font-semibold text-white shadow-md">
            Ruqyya
          </span>
        </motion.div>
      )}
    </div>
  );
}
