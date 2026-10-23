import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const base = import.meta.env.BASE_URL;

// Regions measured on the Oladoc cover image (percent of width/height).
const portals = [
  {
    id: "patient",
    label: "Patient app",
    box: { x: 6.5, y: 41, w: 21, h: 57 },
    text: "Search by symptom, see verified cardiologists nearby, and book a slot.",
  },
  {
    id: "doctor",
    label: "Doctor portal",
    box: { x: 28.5, y: 40, w: 32, h: 33 },
    text: "Today's appointments, the patient queue and quick actions in one morning view.",
  },
  {
    id: "desk",
    label: "Front desk",
    box: { x: 62, y: 40, w: 32.5, h: 33 },
    text: "A live queue with check-in status, and a fast way to register a walk-in.",
  },
] as const;

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

export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % portals.length), 4200);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const current = portals[active];

  return (
    <section id="top" className="surface-deep relative z-10 pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="mono flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-2">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-forest" aria-hidden /> Open to new projects
            </span>
            <span aria-hidden className="hidden h-px w-8 bg-line sm:block" />
            <span>Senior Product Designer · Healthcare &amp; SaaS UX</span>
          </p>

          <h1
            aria-label="Healthcare software, designed for the patient, the doctor and the front desk."
            className="mt-8 text-[clamp(3rem,7.2vw,6.8rem)] font-medium leading-[1.02]"
          >
            <span aria-hidden>
              <Words text="Healthcare software, designed for" start={0.05} />
              <Words text="the patient, the doctor and the front desk." start={0.3} className="italic text-forest" />
            </span>
          </h1>

          <p className="rise mt-8 max-w-xl text-lg text-ink-2" style={{ animationDelay: "0.3s" }}>
            I'm Ruqyya. I design patient apps, clinician portals and clinic websites for healthcare and SaaS teams, from the first
            research conversation to the last screen.
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: "0.4s" }}>
            <a
              href="#work"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-forest px-7 font-semibold text-on-forest transition-transform hover:-translate-y-0.5"
            >
              Explore selected work
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href="#approach" className="link-draw py-2 font-semibold">
              About my approach
            </a>
            <a href="#contact" className="link-draw py-2 font-semibold">
              Get in touch
            </a>
          </div>
        </div>

        {/* Signature piece: walk through the three rooms of one real product */}
        <figure
          className="rise lg:col-span-5 lg:mt-10"
          style={{ animationDelay: "0.2s" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative -rotate-1 border border-line bg-paper-2 p-3 shadow-[0_30px_60px_-30px_rgba(20,32,28,0.45)] md:p-4">
            <div className="relative overflow-hidden">
              <img
                src={`${base}videos/oladoc-cover.jpg`}
                alt="Oladoc, designed end to end: a patient app, a doctor portal and a front desk screen shown side by side."
                width={1200}
                height={938}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full"
              />
              {portals.map((p, i) => (
                <div
                  key={p.id}
                  aria-hidden
                  className="pointer-events-none absolute transition-all duration-500"
                  style={{
                    left: `${p.box.x}%`,
                    top: `${p.box.y}%`,
                    width: `${p.box.w}%`,
                    height: `${p.box.h}%`,
                    outline: i === active ? "2px solid var(--signal)" : "2px solid transparent",
                    outlineOffset: "4px",
                    background: i === active ? "transparent" : "color-mix(in srgb, var(--paper) 50%, transparent)",
                  }}
                />
              ))}
            </div>
          </div>

          <figcaption className="mt-6">
            <p className="mono text-ink-2">Fig. 1 · Oladoc, three portals, one product</p>
            <div role="tablist" aria-label="Portals in the Oladoc project" className="mt-4 flex flex-wrap gap-2">
              {portals.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  type="button"
                  id={`portal-tab-${p.id}`}
                  aria-selected={i === active}
                  aria-controls="portal-panel"
                  onClick={() => setActive(i)}
                  className={`h-11 rounded-full border px-5 text-sm font-semibold transition-colors ${
                    i === active ? "border-signal text-signal" : "border-line text-ink-2 hover:border-ink hover:text-ink"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div id="portal-panel" role="tabpanel" aria-labelledby={`portal-tab-${current.id}`} aria-live="polite" className="mt-5 min-h-[4.5rem]">
              <p className="serif text-xl leading-snug">{current.text}</p>
            </div>
            <p className="mono mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-ink-2">
              <span>47 screens</span>
              <span>3 portals</span>
              <span>4 journeys</span>
              <Link to="/work/oladoc-healthcare-app-ui-ux-design" className="link-draw inline-flex items-center gap-1 py-1 text-ink">
                Read the project <ArrowUpRight size={14} />
              </Link>
            </p>
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto mt-20 max-w-[88rem] border-y border-line px-5 py-5 md:mt-24 md:px-10">
        <p className="mono flex flex-wrap items-center gap-x-8 gap-y-2 text-ink-2">
          <span>5+ years</span>
          <span>Healthcare UX</span>
          <span>SaaS platforms</span>
          <span>Design systems</span>
          <span>Remote worldwide</span>
        </p>
      </div>
    </section>
  );
}
