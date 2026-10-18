import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { stats } from "../../data/content";
import Magnetic from "../ui/Magnetic";
import HeroStage from "./HeroStage";

function WordReveal({ text, start, className = "" }: { text: string; start: number; className?: string }) {
  return (
    <span className={className} aria-hidden>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: start + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Figma-style selection that "picks" the key phrase once the headline has landed.
function SelectionBox() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const handle = "absolute h-2 w-2 border border-sky-500 bg-white";
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5 }}
      className="pointer-events-none absolute -inset-x-3 -inset-y-1 hidden sm:block border border-sky-500/80"
    >
      <span className={`${handle} -left-1 -top-1`} />
      <span className={`${handle} -right-1 -top-1`} />
      <span className={`${handle} -left-1 -bottom-1`} />
      <span className={`${handle} -right-1 -bottom-1`} />
      <motion.span
        initial={{ x: 90, y: 70, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-7 -right-2 flex items-start"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M3 2l7.5 18 2.4-7.1L20 10.5 3 2z" fill="#0EA5E9" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className="ml-2 mt-3 rounded-full rounded-tl-none bg-[#0EA5E9] px-2 py-0.5 font-sans text-[10px] font-semibold tracking-normal text-white">
          Ruqyya
        </span>
      </motion.span>
    </motion.span>
  );
}

function StatCount({ end, suffix }: { end: number; suffix: string }) {
  return <span>{end}{suffix}</span>;
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mx.set((e.clientX - rect.left - rect.width / 2) / rect.width);
      my.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, [mx, my]);
  const b1x = useTransform(mx, (v) => v * -40);
  const b1y = useTransform(my, (v) => v * -40);
  const b2x = useTransform(mx, (v) => v * 40);
  const b2y = useTransform(my, (v) => v * 40);
  const b3x = useTransform(mx, (v) => v * 28);
  const b3y = useTransform(my, (v) => v * 28);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg pt-24 pb-16"
    >
      {/* Ambient animated gradient blobs */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-[#0EA5E9]/20 blur-3xl"
        style={{ x: b1x, y: b1y }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-[#0F172A]/20 blur-3xl"
        style={{ x: b2x, y: b2y }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-[#14B8A6]/15 blur-3xl"
        style={{ x: b3x, y: b3y }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
            Available for new projects
          </motion.span>

          <h1
            aria-label="Designing Digital Products That People Love."
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-[4.2rem] leading-[1.05] tracking-tight text-slate-900 dark:text-white"
          >
            <WordReveal text="Designing Digital Products" start={0.1} />{" "}
            <span className="relative block w-fit">
              <WordReveal text="That People Love." start={0.45} className="text-sky-500 dark:text-sky-400" />
              <SelectionBox />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-9 text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed"
          >
            I help Healthcare and SaaS companies build intuitive, scalable, and
            human-centered digital experiences through strategic product design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-6 py-3.5 hover:opacity-90 transition-all"
              >
                View Portfolio
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-6 py-3.5 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
              >
                Contact Me
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
                  <StatCount end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative hidden lg:block">
          <HeroStage mx={mx} my={my} />
        </div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative mx-auto mt-10 text-slate-400 hover:text-[#0EA5E9] transition-colors"
        aria-label="Scroll to about section"
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
