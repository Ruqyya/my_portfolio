import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Activity, LayoutGrid, TrendingUp } from "lucide-react";
import { useCountUp } from "react-countup";
import { stats } from "../../data/content";

function StatCount({ id, end, suffix }: { id: string; end: number; suffix: string }) {
  useCountUp({
    ref: id,
    end,
    duration: 2,
    suffix,
    enableScrollSpy: true,
    scrollSpyOnce: true,
  });

  return <span id={id} />;
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg pt-24 pb-16"
    >
      {/* Ambient animated gradient blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-[#0EA5E9]/20 blur-3xl"
        style={{ transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)` }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-[#0F172A]/20 blur-3xl"
        style={{ transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)` }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-[#14B8A6]/15 blur-3xl"
        style={{ transform: `translate(${mouse.x * 14}px, ${mouse.y * 14}px)` }}
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
            Available for new projects — Q3 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-[4.2rem] leading-[1.05] tracking-tight text-slate-900 dark:text-white"
          >
            Designing Digital Products{" "}
            <span className="text-sky-500 dark:text-sky-400">That People Love.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed"
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
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-6 py-3.5 hover:opacity-90 transition-all"
            >
              View Portfolio
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-6 py-3.5 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              Contact Me
            </a>
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
                  <StatCount
                    id={`hero-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                    end={s.value}
                    suffix={s.suffix}
                  />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br from-[#0EA5E9] via-[#0F172A] to-[#14B8A6] p-[3px]"
            style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)` }}
          >
            <div className="w-full h-full rounded-[2.4rem] bg-slate-100 dark:bg-slate-800/80 flex flex-col items-center justify-center p-6 overflow-hidden relative">
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 300 380" preserveAspectRatio="none">
                <path d="M0,190 L50,190 L75,100 L125,280 L175,80 L225,240 L250,190 L300,190" fill="none" stroke="#14B8A6" strokeWidth="4" />
              </svg>
              
              <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700/50 p-4 z-10 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <Activity size={20} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Sarah Jenkins</div>
                      <div className="text-xs text-slate-500">Patient • ID: 8392</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full uppercase">
                    Stable
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Heart Rate</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-slate-800 dark:text-white">72</span>
                      <span className="text-[10px] text-slate-400">bpm</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Blood Press.</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-slate-800 dark:text-white">120/80</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#0EA5E9]"
                      animate={{ width: ["40%", "75%", "40%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#14B8A6]"
                      animate={{ width: ["60%", "90%", "60%"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 w-full h-16 relative z-10 flex items-center justify-center">
                 <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                    <motion.path
                      d="M0,30 Q25,0 50,30 T100,30 T150,30 T200,30"
                      fill="none"
                      stroke="url(#grad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      animate={{ d: ["M0,30 Q25,0 50,30 T100,30 T150,30 T200,30", "M0,30 Q25,60 50,30 T100,30 T150,30 T200,30", "M0,30 Q25,0 50,30 T100,30 T150,30 T200,30"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0EA5E9" />
                        <stop offset="100%" stopColor="#14B8A6" />
                      </linearGradient>
                    </defs>
                 </svg>
              </div>
            </div>
          </motion.div>

          {/* Floating UI cards */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-10 glass rounded-2xl p-4 shadow-xl w-44"
          >
            <div className="flex items-center gap-2 text-[#0EA5E9] mb-2">
              <Activity size={16} />
              <span className="text-xs font-semibold">Patient Vitals</span>
            </div>
            <svg viewBox="0 0 120 30" className="w-full h-6">
              <polyline
                points="0,15 30,15 36,4 42,26 48,15 60,15 68,15 74,6 80,24 86,15 120,15"
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-6 -right-8 z-20 glass rounded-2xl p-4 shadow-xl w-40"
          >
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mb-2">
              <TrendingUp size={16} />
              <span className="text-xs font-semibold">Recovery Rate</span>
            </div>
            <div className="font-display font-extrabold text-xl text-slate-900 dark:text-white">98.5%</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 left-2 glass rounded-2xl p-4 shadow-xl w-40"
          >
            <div className="flex items-center gap-2 text-[#14B8A6] mb-2">
              <LayoutGrid size={16} />
              <span className="text-xs font-semibold">Care Modules</span>
            </div>
            <div className="flex gap-1.5">
              {["#0EA5E9", "#0F172A", "#14B8A6", "#64748B"].map((c) => (
                <span key={c} className="w-5 h-5 rounded-md" style={{ backgroundColor: c }} />
              ))}
            </div>
          </motion.div>
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
