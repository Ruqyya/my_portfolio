import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { MAIL_HREF, proof } from "../../data/contact";
import portrait from "../../assets/ruqqya_img.png";

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

// Real projects, shown as a moving credit line under the hero.
const credits = ["Oladoc", "Marham.pk", "Shumaila's London", "Sehat Kahani", "Zental", "Goddard Veterinary", "Mint Dental", "Victoria Road Dental", "Bond Vet", "Lumina Dental"];

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
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % portals.length), 4200);
    return () => clearInterval(t);
  }, [reduce, paused]);

  // A soft light follows the pointer: one CSS variable update, no React re-render.
  const light = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !section.current) return;
    const r = section.current.getBoundingClientRect();
    section.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    section.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const current = portals[active];
  const cursor = { left: `${current.box.x + current.box.w - 6}%`, top: `${current.box.y + current.box.h - 8}%` };

  return (
    <section id="top" ref={section} onPointerMove={light} className="surface-deep hero-canvas relative z-10 pt-28 md:pt-32">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="mono text-ink-2">Senior Product Designer · Healthcare &amp; SaaS UX</p>

          <h1
            aria-label="Healthcare software, designed for the patient, the doctor and the front desk."
            className="mt-6 text-[clamp(2.8rem,5.5vw,5.4rem)] font-medium leading-[1.02]"
          >
            <span aria-hidden>
              <Words text="Healthcare software, designed for" start={0.05} />
              <Words text="the patient, the doctor and the front desk." start={0.3} className="italic text-forest" />
            </span>
          </h1>

          <p className="rise mt-8 max-w-xl text-lg text-ink-2" style={{ animationDelay: "0.3s" }}>
            I design patient apps, clinician portals and clinic websites for healthcare and SaaS teams, from the first research
            conversation to the last screen.
          </p>

          {/* Conversion block: one clear primary action, one low-commitment alternative, then reassurance */}
          <div className="rise mt-10" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={MAIL_HREF}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-forest px-7 font-semibold text-on-forest shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
              >
                <Mail size={18} aria-hidden /> Email me about your project
              </a>
              <a href="#work" className="group inline-flex items-center gap-2 py-2 font-semibold">
                <span className="link-draw">See the work</span>
                <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-2">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" aria-hidden />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest" aria-hidden />
                </span>
                Open to new projects
              </span>
              <span>Replies within one business day</span>
              <span>Remote, any time zone</span>
            </p>
          </div>

          {/* Proof, quoted from LinkedIn */}
          <dl className="rise mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-6" style={{ animationDelay: "0.5s" }}>
            {proof.map((p) => (
              <div key={p.value} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs leading-snug text-ink-2 sm:text-sm">
                  {p.label}
                  <span className="mono mt-1 block normal-case tracking-normal opacity-80">{p.source}</span>
                </dt>
                <dd className="serif text-4xl font-medium text-forest sm:text-5xl">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Signature piece: walk through the three rooms of one real product */}
        <figure
          className="rise lg:col-span-5 lg:mt-6"
          style={{ animationDelay: "0.2s" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative">
            <div className="relative -rotate-1 border border-line bg-paper-2 p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] md:p-4">
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
                {/* Design-tool cursor that moves to whichever portal is being described */}
                <div aria-hidden className="pointer-events-none absolute z-10 transition-all duration-700 ease-out" style={cursor}>
                  <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-md">
                    <path d="M3 2l7.5 18 2.4-7.1L20 10.5 3 2z" fill="#f5dc95" stroke="#0a464e" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <span className="ml-4 -mt-1 inline-block whitespace-nowrap rounded-full rounded-tl-none bg-[#f5dc95] px-2.5 py-1 text-[10px] font-semibold text-[#0a464e] shadow">
                    Ruqyya
                  </span>
                </div>
              </div>
            </div>

            {/* Portrait badge: puts a face next to the work */}
            <div className="absolute -bottom-7 -left-3 flex items-center gap-3 rounded-full border border-line bg-paper py-2 pl-2 pr-5 shadow-xl shadow-black/30 md:-left-6">
              <img
                src={portrait}
                alt="Portrait of Ruqyya"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover object-top ring-2 ring-[#f5dc95]"
              />
              <span className="text-sm leading-tight">
                <span className="serif block text-xl">Ruqyya</span>
                <span className="mono text-ink-2">Lahore · Remote</span>
              </span>
            </div>
          </div>

          <figcaption className="mt-14">
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
            <p className="mono mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-ink-2">
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

      {/* Moving credit line of real projects */}
      <div className="relative mt-20 overflow-hidden border-y border-line py-5 md:mt-24" aria-label="Projects I have designed">
        <div className="marquee flex w-max items-center gap-10 whitespace-nowrap" aria-hidden>
          {[...credits, ...credits].map((c, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="serif text-2xl text-ink md:text-3xl">{c}</span>
              <span className="text-forest">✦</span>
            </span>
          ))}
        </div>
        <ul className="sr-only">
          {credits.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
