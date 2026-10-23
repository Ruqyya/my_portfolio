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
      className={`absolute transition-all duration-700 ease-out ${className} ${on ? "z-30 scale-[1.03] brightness-100" : "z-10 scale-100 brightness-[0.72] saturate-[0.85]"}`}
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
    <section id="top" ref={section} onPointerMove={light} className="surface-deep surface-gradient hero-canvas relative z-10 pb-24 pt-28 md:pb-28 md:pt-32">
      <div className="mx-auto grid max-w-[88rem] gap-x-10 gap-y-12 px-5 md:px-10 lg:grid-cols-12">
        <div className="relative z-30 lg:col-span-12">
          <p className="mono text-ink-2">Senior Product Designer · Healthcare &amp; SaaS</p>
          <h1
            aria-label="Making the complex feel effortless."
            className="mt-6 text-[clamp(3.3rem,8.4vw,8.4rem)] font-medium leading-[0.98] tracking-[-0.025em] [word-spacing:0.08em]"
          >
            <span aria-hidden>
              <span className="block"><Words text="Making the complex" start={0.05} /></span>
              <span className="block italic text-forest"><Words text="feel effortless." start={0.3} /></span>
            </span>
          </h1>
        </div>

        <div className="lg:col-span-5">
          <p className="rise max-w-md text-xl text-ink-2" style={{ animationDelay: "0.3s" }}>
            I design healthcare and SaaS products that patients and clinicians trust, turning tangled workflows into clear screens, from
            the first research conversation to production UI.
          </p>

          <div className="rise mt-9" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={MAIL_HREF}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-forest px-8 text-lg font-semibold text-on-forest transition-colors hover:bg-[var(--forest-hover)]"
              >
                <Mail size={20} aria-hidden /> Discuss a project
              </a>
              <a href="#work" className="group inline-flex h-14 items-center gap-2 rounded-full border border-[var(--line-strong)] px-7 text-lg font-semibold transition-colors hover:border-forest hover:text-forest">
                View the work
                <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" aria-hidden />
              </a>
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-2">
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

          {/* Heartbeat line from the LinkedIn banner: draws once, then a pulse travels along it */}
          <svg aria-hidden viewBox="0 0 520 40" className="mt-12 h-10 w-full max-w-[32rem] overflow-visible" fill="none">
            <path className="ecg-line" d="M0 20 H190 l14 -16 l16 32 l14 -26 l10 10 H520" stroke="var(--brand-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
          </svg>
          <dl className="rise mt-3 grid max-w-xl grid-cols-3 gap-4" style={{ animationDelay: "0.5s" }}>
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

        {/* Signature piece: the same booking, seen from three seats. Real Figma screens. */}
        <figure
          className="rise relative z-10 lg:col-span-7 lg:-mt-36"
          style={{ animationDelay: "0.2s" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative mx-auto aspect-[1.12/1] w-full max-w-[40rem] lg:ml-0 lg:mr-[-3vw] lg:max-w-none">
            {/* soft stage */}
            <div aria-hidden className="absolute inset-[6%] rounded-[2rem] bg-white/[0.05] ring-1 ring-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />

            <Layer on={active === 1} className="left-[12%] top-[2%] w-[84%]">
              <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]">
                <div className="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="mono ml-3 text-ink-2">Doctor portal</span>
                </div>
                <img src={img("docdash")} alt="Oladoc doctor portal: the day's appointments and patient queue." width={1600} height={1046} fetchPriority="high" decoding="async" className="block h-auto w-full" />
              </div>
            </Layer>

            <Layer on={active === 2} className="right-0 top-[40%] w-[66%]">
              <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]">
                <div className="flex items-center gap-1.5 border-b border-line bg-paper-2 px-3 py-2" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="mono ml-3 text-ink-2">Front desk</span>
                </div>
                <img src={img("frontdesk")} alt="Oladoc front desk: a live queue with check-in status on every row." width={1600} height={1046} decoding="async" className="block h-auto w-full" />
              </div>
            </Layer>

            <Layer on={active === 0} className="bottom-[1%] left-[2%] w-[27%]">
              <div className="rounded-[1.6rem] bg-[#05080f] p-1.5 shadow-[0_40px_60px_-24px_rgba(0,0,0,0.75)] ring-1 ring-white/15">
                <img src={img("sym")} alt="Oladoc patient app: search by symptom." width={700} height={1515} decoding="async" className="block h-auto w-full rounded-[1.3rem]" />
              </div>
            </Layer>
            <Layer on={active === 0} className="bottom-[-2%] left-[26%] w-[22%]">
              <div className="rounded-[1.4rem] bg-[#05080f] p-1.5 shadow-[0_40px_60px_-24px_rgba(0,0,0,0.75)] ring-1 ring-white/15">
                <img src={img("profile")} alt="Oladoc patient app: doctor profile with verification, rating and fee." width={700} height={1515} decoding="async" className="block h-auto w-full rounded-[1.1rem]" />
              </div>
            </Layer>

            {/* Design-tool cursor that moves to whichever portal is being described */}
            <div aria-hidden className="pointer-events-none absolute z-40 transition-all duration-700 ease-out" style={cursorAt}>
              <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-md">
                <path d="M3 2l7.5 18 2.4-7.1L20 10.5 3 2z" fill="#20d6d2" stroke="#080d19" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span className="ml-4 -mt-1 inline-block whitespace-nowrap rounded-full rounded-tl-none bg-[#20d6d2] px-2.5 py-1 text-[10px] font-semibold text-[#080d19] shadow">Ruqyya</span>
            </div>

            {/* Portrait badge: puts a face next to the work */}
            <div className="absolute -bottom-9 right-0 z-40 flex items-center gap-3 rounded-full border border-line bg-paper py-2 pl-2 pr-5 shadow-xl shadow-black/40 md:right-4">
              <img src={portrait} alt="Portrait of Ruqyya" width={56} height={56} className="h-14 w-14 rounded-full object-cover object-top ring-2 ring-[#20d6d2]" />
              <span className="text-sm leading-tight">
                <span className="serif block text-xl">Ruqyya</span>
                <span className="mono text-ink-2">Lahore · Remote</span>
              </span>
            </div>
          </div>

          <figcaption className="mt-16">
            <p className="mono text-ink-2">Fig. 1 · Oladoc: three seats, one booking</p>
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
            <div id="portal-panel" role="tabpanel" aria-labelledby={`portal-tab-${current.id}`} aria-live="polite" className="mt-5 min-h-[7.5rem]">
              <p className="serif text-2xl leading-snug">{current.text}</p>
            </div>
            <p className="mono mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-ink-2">
              <span>47 screens</span>
              <span>3 portals</span>
              <span>4 journeys</span>
              <Link to="/work/oladoc-healthcare-app-ui-ux-design" className="link-draw inline-flex items-center gap-1 py-1 text-ink">
                Read the case study <ArrowUpRight size={14} />
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
              <span className="text-forest">◆</span>
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
