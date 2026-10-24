import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { MAIL_HREF, proof } from "../../data/contact";
import { projects } from "../../data/projects";
import portrait from "../../assets/ruqqya_img.png";

const base = import.meta.env.BASE_URL;
const img = (n: string) => `${base}case/oladoc/${n}.webp`;

// The three "rooms" of the Oladoc product. Each one brings its real Figma screens to the front.
const portals = [
  {
    id: "patient",
    label: "Patient app",
    text: "Search by symptom, see verified cardiologists nearby, and book a slot.",
  },
  {
    id: "doctor",
    label: "Doctor portal",
    text: "Today's appointments, the patient queue and quick actions in one morning view.",
  },
  {
    id: "desk",
    label: "Front desk",
    text: "A live queue with check-in status, and a fast way to register a walk-in.",
  },
] as const;

// What the card beside the screens says for each room: the same booking from three seats (all taken from the screens).
const toasts = [
  { icon: "♥", title: "Chest pain → Cardiologist", sub: "124 verified doctors nearby" },
  { icon: "✓", title: "New booking, 5:30 PM", sub: "Ayesha Rahman · clinic visit" },
  { icon: "→", title: "Ayesha arrived", sub: "Check in, then send to Dr. Khan" },
];

// x%, y%, delay, size: fixed so the layout never shifts
const sparkles: [number, number, number, number][] = [[8, 18, 0, 10], [37, 12, 2.1, 12], [58, 30, 1.8, 10], [74, 62, 0.3, 12], [91, 78, 2.4, 10], [22, 70, 1.2, 9]];

const cycle = ["clear.", "human.", "effortless.", "trusted."];

// Real projects with a film, shown as a drifting strip of covers under the hero.
const strip = projects.filter((p) => p.study.video);
// Small WebP thumbnails (public/strip) so the strip stays light; falls back to the full cover.
const thumb = (p: (typeof projects)[number]) => (p.study.cover ? `${base}strip/${p.study.cover.replace(/^videos\//, "").replace(/-cover\.jpg$/, "")}.webp` : p.coverImage);

function Words({ text, start, className = "" }: { text: string; start: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em]">
          <span className="word-rise" style={{ animationDelay: `${start + i * 0.07}s` }}>
            {w}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(q.matches);
    const on = () => setReduce(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return reduce;
}

// One layer in the screen stack. `on` lifts it to the front; the others recede.
function Layer({ on, className, depth = 0, children }: { on: boolean; className: string; depth?: number; children: React.ReactNode }) {
  return (
    <div
      className={`absolute ${className} ${on ? "z-30 scale-[1.03] brightness-100" : "z-10 scale-100 saturate-[0.7]"}`}
      style={{
        transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
        transition: "scale 0.7s ease-out, filter 0.7s ease-out, transform 0.35s ease-out",
      }}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % portals.length), 4600);
    return () => clearInterval(t);
  }, [reduce, paused]);

  // A soft light follows the pointer: one CSS variable update, no React re-render.
  const light = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !section.current) return;
    const r = section.current.getBoundingClientRect();
    section.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    section.current.style.setProperty("--my", `${e.clientY - r.top}px`);
    section.current.style.setProperty("--px", `${(e.clientX - r.left) / r.width - 0.5}`);
    section.current.style.setProperty("--py", `${(e.clientY - r.top) / r.height - 0.5}`);
    section.current.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`);
    section.current.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 5}deg`);
  };

  const current = portals[active];
  // The two CTAs lean toward the pointer a little, then settle back.
  const lean = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.12}px, ${(e.clientY - r.top - r.height / 2) * 0.2}px)`;
  };
  const settle = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "";
  };
  // The design-tool cursor sits on the active layer
  const cursorAt = [
    { left: "17%", top: "52%" },
    { left: "78%", top: "30%" },
    { left: "88%", top: "70%" },
  ][active];

  return (
    <section
      id="top"
      ref={section}
      onPointerMove={light}
      onPointerLeave={() => section.current && ["--rx", "--ry"].forEach((k) => section.current!.style.setProperty(k, "0deg"))}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="surface-deep surface-hero hero-canvas relative z-10 pb-20 pt-28 md:pb-24 md:pt-32"
    >
      {/* Shine: slow aurora glows, a light sweep and a few twinkling points. Decorative only. */}
      <div aria-hidden className="hero-fx pointer-events-none">
        <span className="aurora aurora-a" />
        <span className="aurora aurora-b" />
        <span className="aurora aurora-c" />
        <span className="light-sweep" />
        {sparkles.map(([x, y, d, s2], i) => (
          <span key={i} className="sparkle" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s`, width: s2, height: s2 }} />
        ))}
      </div>
      <div className="mx-auto grid max-w-[88rem] gap-x-10 gap-y-14 px-5 md:px-10 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-12 lg:items-center">
        <div className="relative z-30 lg:col-span-6">
          <p className="mono flex items-center gap-3 text-ink-2">
            <span aria-hidden className="rule-champagne h-px w-10" />
            Senior Product Designer · Healthcare &amp; SaaS
          </p>
          <h1
            aria-label="Healthcare products that feel clear, human, effortless and trusted."
            className="mt-6 text-[clamp(3rem,6.4vw,6.6rem)] font-medium leading-[1] tracking-[-0.03em]"
          >
            <span aria-hidden>
              <span className="block"><Words text="Healthcare" start={0.05} /></span>
              <span className="block"><Words text="products that" start={0.2} /></span>
              <span className="block"><Words text="feel" start={0.35} /> <span className="cycle-box italic">
                {cycle.map((w, i) => (
                  <span key={w} className="cycle-word" style={{ animationDelay: `${i * 2.4}s` }}>{w}</span>
                ))}
                <span className="cycle-sizer">effortless.</span>
              </span></span>
            </span>
          </h1>

          <p className="rise mt-7 max-w-md text-xl leading-snug text-ink-2" style={{ animationDelay: "0.3s" }}>
            Product design for healthcare and SaaS teams, from research to shipped UI.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.4s" }}>
            <a
              href="#work"
              onPointerMove={lean}
              onPointerLeave={settle}
              className="magnetic group inline-flex h-14 items-center gap-3 rounded-full bg-forest px-8 text-lg font-semibold text-on-forest transition-colors hover:bg-[var(--forest-hover)]"
            >
              Explore My Work
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href={MAIL_HREF}
              onPointerMove={lean}
              onPointerLeave={settle}
              className="magnetic inline-flex h-14 items-center gap-3 rounded-full border border-[var(--line-strong)] px-8 text-lg font-semibold transition-colors hover:border-forest hover:text-forest"
            >
              <Mail size={20} aria-hidden /> Discuss a Project
            </a>
          </div>
          <p className="rise mt-6 inline-flex items-center gap-2 text-base text-ink-2" style={{ animationDelay: "0.5s" }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" aria-hidden />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" aria-hidden />
            </span>
            Open to new projects · Remote, any time zone
          </p>
        </div>

        {/* The same booking, seen from three seats. Real Oladoc Figma screens; the stack tilts with the pointer and the tabs bring each room forward. */}
        <figure className="rise relative z-10 lg:col-span-6" style={{ animationDelay: "0.2s" }}>
          <div className="hero-tilt relative mx-auto aspect-[1.04/1] w-full max-w-[40rem]">
            <span aria-hidden className="sonar absolute -inset-6 rounded-[3rem]" />
            <span aria-hidden className="sonar sonar-b absolute -inset-6 rounded-[3rem]" />
            <div aria-hidden className="absolute inset-0 rounded-[2rem] stage-gradient" />

            <Layer on={active === 1} className="left-[10%] top-[8%] w-[78%]" depth={-18}>
              <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_30px_50px_-26px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="mono ml-3 text-ink-2">Doctor portal</span>
                </div>
                <img src={img("docdash")} alt="Oladoc doctor portal: the day's appointments and patient queue." width={1600} height={1046} fetchPriority="high" decoding="async" className="block h-auto w-full" />
              </div>
            </Layer>

            <Layer on={active === 2} className="right-[5%] top-[47%] w-[60%]" depth={-34}>
              <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_30px_50px_-26px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="mono ml-3 text-ink-2">Front desk</span>
                </div>
                <img src={img("frontdesk")} alt="Oladoc front desk: a live queue with check-in status on every row." width={1600} height={1046} decoding="async" className="block h-auto w-full" />
              </div>
            </Layer>

            <Layer on={active === 0} className="bottom-[1%] left-[1%] w-[28%]" depth={-52}>
              <div className="rounded-[1.6rem] bg-[var(--bezel)] p-1.5 shadow-[0_30px_50px_-26px_rgba(0,0,0,0.6)]">
                <img src={img("sym")} alt="Oladoc patient app: search by symptom." width={700} height={1515} decoding="async" className="block h-auto w-full rounded-[1.3rem]" />
              </div>
            </Layer>
            <Layer on={active === 0} className="bottom-[-2%] left-[27%] w-[23%]" depth={-64}>
              <div className="rounded-[1.4rem] bg-[var(--bezel)] p-1.5 shadow-[0_30px_50px_-26px_rgba(0,0,0,0.6)]">
                <img src={img("profile")} alt="Oladoc patient app: doctor profile with verification, rating and fee." width={700} height={1515} decoding="async" className="block h-auto w-full rounded-[1.1rem]" />
              </div>
            </Layer>

            {/* One booking, narrated: the card changes with the room that is in front */}
            <div key={active} aria-hidden className="toast-in absolute -left-4 -top-6 z-40 hidden w-[17.5rem] items-center gap-3 rounded-2xl bg-[#f7fafc] py-3 pl-3 pr-5 text-[#0a2552] shadow-2xl sm:flex">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0f5974] text-lg text-white">{toasts[active].icon}</span>
              <span className="text-[0.95rem] font-semibold leading-tight">
                {toasts[active].title}
                <span className="block text-sm font-normal text-[#475569]">{toasts[active].sub}</span>
              </span>
            </div>
            <span aria-hidden className="hero-float hero-float-b absolute right-[6%] -top-6 z-40 hidden items-center gap-2 rounded-full bg-[#f7fafc] px-4 py-2 text-base font-semibold text-[#0a2552] shadow-xl sm:inline-flex">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-[#0f5974] text-[11px] text-white">3</span> portals · 47 screens
            </span>

            {/* Design-tool cursor that moves to whichever portal is being described */}
            <div aria-hidden className="pointer-events-none absolute z-40 transition-all duration-700 ease-out" style={cursorAt}>
              <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-sm">
                <path d="M3 2l7.5 18 2.4-7.1L20 10.5 3 2z" fill="var(--accent)" stroke="var(--paper)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span className="ml-4 -mt-1 inline-block whitespace-nowrap rounded-full rounded-tl-none bg-[var(--accent)] px-2.5 py-1 text-[11px] font-semibold text-[var(--on-accent)] shadow-sm">Ruqyya</span>
            </div>

            {/* Portrait badge */}
            <div className="absolute -bottom-9 right-0 z-40 flex items-center gap-3 rounded-full border border-line bg-paper py-2 pl-2 pr-5 shadow-[0_16px_30px_-18px_rgba(0,0,0,0.5)] md:right-2">
              <span className="portrait-disc h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--paper)]"><img src={portrait} alt="Portrait of Ruqyya" width={56} height={56} className="h-full w-full object-cover object-top" /></span>
              <span className="text-base leading-tight">
                <span className="serif block text-xl">Ruqyya</span>
                <span className="mono text-ink-2">Lahore · Remote</span>
              </span>
            </div>
          </div>

          <figcaption className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div role="tablist" aria-label="Portals in the Oladoc project" className="flex flex-wrap gap-2">
              {portals.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  type="button"
                  id={`portal-tab-${p.id}`}
                  aria-selected={i === active}
                  aria-controls="portal-panel"
                  onClick={() => setActive(i)}
                  className={`h-11 rounded-full border px-5 text-base font-semibold transition-colors ${
                    i === active ? "border-forest bg-paper-2 text-forest" : "border-line text-ink-2 hover:border-forest hover:text-forest"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <Link to="/work/oladoc-healthcare-app-ui-ux-design" className="link-draw mono inline-flex items-center gap-1 py-1 text-signal">
              Oladoc case study <ArrowUpRight size={14} />
            </Link>
            <p id="portal-panel" role="tabpanel" aria-labelledby={`portal-tab-${current.id}`} aria-live="polite" className="sr-only">{current.text}</p>
          </figcaption>
        </figure>
      </div>

      {/* Proof: three figures taken from LinkedIn */}
      <div className="relative z-30 mx-auto mt-16 max-w-[88rem] px-5 md:mt-20 md:px-10">
        <div aria-hidden className="flex items-center">
          <span className="ecg-rule h-0.5 rounded-full" style={{ flexGrow: 30 }} />
          <svg viewBox="0 0 72 40" className="h-10 w-[4.5rem] shrink-0 overflow-visible" fill="none">
            <path className="ecg-line" d="M0 20 H12 l10 -16 l12 32 l12 -26 l8 10 H72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
          </svg>
          <span className="ecg-rule h-0.5 rounded-full" style={{ flexGrow: 70 }} />
        </div>
        <dl className="rise mt-6 grid grid-cols-3 gap-4 md:gap-10" style={{ animationDelay: "0.5s" }}>
          {proof.map((p) => (
            <div key={p.value} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm leading-snug text-ink-2 md:text-lg">
                {p.label}
                <span className="mono mt-1 hidden normal-case tracking-normal md:block">{p.source}</span>
              </dt>
              <dd className="serif text-[clamp(2.4rem,6vw,5rem)] font-medium leading-none text-forest">{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Film strip of real projects: covers drift past, each one links to its case study */}
      <div className="relative mt-16 overflow-hidden py-2 md:mt-20" aria-label="Selected projects">
        <div className="marquee marquee-fast flex w-max items-center gap-5 px-3">
          {[...strip, ...strip].map((p, i) => (
            <Link
              key={`${p.slug}-${i}`}
              to={`/work/${p.slug}`}
              tabIndex={i >= strip.length ? -1 : 0}
              aria-hidden={i >= strip.length}
              className="group relative block h-40 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15 transition-transform duration-500 hover:-translate-y-1 md:h-56"
            >
              <img src={thumb(p)} alt={i >= strip.length ? "" : `${p.title}, cover`} loading="lazy" className="h-full w-auto object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a2552]/90 to-transparent px-4 pb-3 pt-10 text-base font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {p.title.replace(/ (Website|UI\/UX|Case Study|Redesign|Design|App).*$/i, "")}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <a href="#expertise" className="scroll-cue mono absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-2 md:flex" aria-label="Scroll to the next section">
        Scroll
        <span aria-hidden className="scroll-line h-8 w-px bg-[var(--accent)]" />
      </a>
    </section>
  );
}
