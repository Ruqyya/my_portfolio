import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { MAIL_HREF, proof } from "../../data/contact";
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

// One layer in the screen stack. `on` lifts it to the front; the others recede.
function Layer({ on, className, children }: { on: boolean; className: string; children: React.ReactNode }) {
  return (
    <div
      className={`absolute transition-all duration-700 ease-out ${className} ${on ? "z-30 scale-[1.03] brightness-100" : "z-10 scale-100 saturate-[0.7]"}`}
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
  };

  const current = portals[active];
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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="surface-deep surface-hero hero-canvas relative z-10 pb-24 pt-28 md:pb-28 md:pt-36"
    >
      <div className="mx-auto grid max-w-[88rem] gap-x-12 gap-y-16 px-5 md:px-10 lg:grid-cols-12 lg:items-center">
        <div className="relative z-30 lg:col-span-7">
          <p className="mono flex items-center gap-3 text-ink-2"><span aria-hidden className="rule-champagne h-px w-10" />Senior Product Designer · Healthcare &amp; SaaS</p>
          <h1
            aria-label="Complex healthcare products. Clearer human experiences."
            className="mt-6 text-[clamp(2.7rem,5.7vw,6rem)] font-medium leading-[1.02] tracking-[-0.025em]"
          >
            <span aria-hidden>
              <span className="block"><Words text="Complex healthcare products." start={0.05} /></span>
              <span className="block italic text-forest"><Words text="Clearer human experiences." start={0.3} /></span>
            </span>
          </h1>

          <p className="rise mt-8 max-w-xl text-xl leading-relaxed text-ink-2" style={{ animationDelay: "0.3s" }}>
            I help healthcare and SaaS teams turn complicated workflows into clear, accessible products, from the first research
            conversation to production-ready UI.
          </p>

          <div className="rise mt-10" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-forest px-8 text-lg font-semibold text-on-forest transition-colors hover:bg-[var(--forest-hover)]"
              >
                Explore My Work
                <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" aria-hidden />
              </a>
              <a
                href={MAIL_HREF}
                className="inline-flex h-14 items-center gap-3 rounded-full border border-[var(--line-strong)] px-8 text-lg font-semibold transition-colors hover:border-forest hover:text-forest"
              >
                <Mail size={20} aria-hidden /> Discuss a Project
              </a>
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-ink-2">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" aria-hidden />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" aria-hidden />
                </span>
                Open to new projects
              </span>
              <span>Replies within one business day</span>
              <span>Remote, any time zone</span>
            </p>
          </div>
        </div>

        {/* The same booking, seen from three seats. Real Oladoc Figma screens; the tabs bring each room forward. */}
        <figure className="rise relative z-10 lg:col-span-5" style={{ animationDelay: "0.2s" }}>
          <div className="relative mx-auto aspect-[1.04/1] w-full max-w-[36rem]">
            <div aria-hidden className="absolute inset-0 rounded-[2rem] stage-gradient" />

            <Layer on={active === 1} className="left-[10%] top-[8%] w-[78%]">
              <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_30px_50px_-26px_rgba(36,60,57,0.35)]">
                <div className="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="mono ml-3 text-ink-2">Doctor portal</span>
                </div>
                <img src={img("docdash")} alt="Oladoc doctor portal: the day's appointments and patient queue." width={1600} height={1046} fetchPriority="high" decoding="async" className="block h-auto w-full" />
              </div>
            </Layer>

            <Layer on={active === 2} className="right-[5%] top-[47%] w-[60%]">
              <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_30px_50px_-26px_rgba(36,60,57,0.35)]">
                <div className="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="mono ml-3 text-ink-2">Front desk</span>
                </div>
                <img src={img("frontdesk")} alt="Oladoc front desk: a live queue with check-in status on every row." width={1600} height={1046} decoding="async" className="block h-auto w-full" />
              </div>
            </Layer>

            <Layer on={active === 0} className="bottom-[1%] left-[1%] w-[28%]">
              <div className="rounded-[1.6rem] bg-[var(--bezel)] p-1.5 shadow-[0_30px_50px_-26px_rgba(36,60,57,0.4)]">
                <img src={img("sym")} alt="Oladoc patient app: search by symptom." width={700} height={1515} decoding="async" className="block h-auto w-full rounded-[1.3rem]" />
              </div>
            </Layer>
            <Layer on={active === 0} className="bottom-[-2%] left-[27%] w-[23%]">
              <div className="rounded-[1.4rem] bg-[var(--bezel)] p-1.5 shadow-[0_30px_50px_-26px_rgba(36,60,57,0.4)]">
                <img src={img("profile")} alt="Oladoc patient app: doctor profile with verification, rating and fee." width={700} height={1515} decoding="async" className="block h-auto w-full rounded-[1.1rem]" />
              </div>
            </Layer>

            {/* Design-tool cursor that moves to whichever portal is being described */}
            <div aria-hidden className="pointer-events-none absolute z-40 transition-all duration-700 ease-out" style={cursorAt}>
              <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-sm">
                <path d="M3 2l7.5 18 2.4-7.1L20 10.5 3 2z" fill="var(--accent)" stroke="var(--paper)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span className="ml-4 -mt-1 inline-block whitespace-nowrap rounded-full rounded-tl-none bg-[var(--accent)] px-2.5 py-1 text-[11px] font-semibold text-[var(--on-accent)] shadow-sm">Ruqyya</span>
            </div>

            {/* Portrait badge: puts a face next to the work */}
            <div className="absolute -bottom-9 right-0 z-40 flex items-center gap-3 rounded-full border border-line bg-paper py-2 pl-2 pr-5 shadow-[0_16px_30px_-18px_rgba(36,60,57,0.4)] md:right-2">
              <span className="portrait-disc h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--paper)]"><img src={portrait} alt="Portrait of Ruqyya" width={56} height={56} className="h-full w-full object-cover object-top" /></span>
              <span className="text-base leading-tight">
                <span className="serif block text-xl">Ruqyya</span>
                <span className="mono text-ink-2">Lahore · Remote</span>
              </span>
            </div>
          </div>

          <figcaption className="mt-16">
            <p className="mono text-ink-2">Oladoc: three seats, one booking</p>
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
                  className={`h-11 rounded-full border px-5 text-base font-semibold transition-colors ${
                    i === active ? "border-forest bg-paper-2 text-forest" : "border-line text-ink-2 hover:border-forest hover:text-forest"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div id="portal-panel" role="tabpanel" aria-labelledby={`portal-tab-${current.id}`} aria-live="polite" className="mt-5 min-h-[5.5rem]">
              <p className="serif text-2xl leading-snug">{current.text}</p>
            </div>
            <Link to="/work/oladoc-healthcare-app-ui-ux-design" className="link-draw mono inline-flex items-center gap-1 py-1 text-signal">
              Read the Oladoc case study <ArrowUpRight size={14} />
            </Link>
          </figcaption>
        </figure>

        {/* Proof strip: a line from the LinkedIn banner runs the full width and ends in three figures taken from LinkedIn */}
        <div className="relative z-30 lg:col-span-12">
          <div aria-hidden className="flex items-center">
            <span className="ecg-rule h-0.5 rounded-full" style={{ flexGrow: 30 }} />
            <svg viewBox="0 0 72 40" className="h-10 w-[4.5rem] shrink-0 overflow-visible" fill="none">
              <path className="ecg-line" d="M0 20 H12 l10 -16 l12 32 l12 -26 l8 10 H72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
            </svg>
            <span className="ecg-rule h-0.5 rounded-full" style={{ flexGrow: 70 }} />
          </div>
          <dl className="rise mt-8 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3" style={{ animationDelay: "0.5s" }}>
            {proof.map((p) => (
              <div key={p.value} className="flex flex-col-reverse">
                <dt className="mt-2 text-base leading-snug text-ink-2 sm:text-lg">
                  {p.label}
                  <span className="mono mt-1 block normal-case tracking-normal">{p.source}</span>
                </dt>
                <dd className="serif text-5xl font-medium text-forest md:text-6xl">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Moving credit line of real projects */}
      <div className="relative mt-20 overflow-hidden border-y border-line py-5 md:mt-24" aria-label="Projects I have designed">
        <div className="marquee flex w-max items-center gap-10 whitespace-nowrap" aria-hidden>
          {[...credits, ...credits].map((c, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="serif text-2xl text-ink md:text-3xl">{c}</span>
              <span className="champagne">◆</span>
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
