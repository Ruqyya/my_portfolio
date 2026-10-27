import { useRef, useState } from "react";
import { Compass, FlaskConical, MousePointerClick, PackageCheck, PenTool, RefreshCw, SearchCheck, Target } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { process } from "../../data/content";
import portrait from "../../assets/ruqyya-portrait.webp";

// Eight steps in four phases. Wording of each step comes from the owner's own process list (content.ts).
const icons = [Compass, SearchCheck, Target, PenTool, MousePointerClick, FlaskConical, RefreshCw, PackageCheck];
const phases = [
  { name: "Understand", from: 0, to: 2 },
  { name: "Design", from: 3, to: 4 },
  { name: "Validate", from: 5, to: 6 },
  { name: "Hand off", from: 7, to: 7 },
];
const facts = [
  ["Focus", "Clinical tools and SaaS platforms"],
  ["Starts with", "The people who use the screen"],
  ["Hands off", "Specs, design system, prototypes"],
];

export default function Approach() {
  const [on, setOn] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = process[on];
  const Icon = icons[on];

  const go = (to: number) => {
    const i = (to + process.length) % process.length;
    setOn(i);
    tabs.current[i]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") go(on + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(on - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(process.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <section id="approach" className="surface-tint sheet pb-28 pt-24 md:pb-36 md:pt-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Eyebrow n="04">About</Eyebrow>
            <figure className="mt-8 max-w-xs">
              <div className="portrait-disc overflow-hidden rounded-t-[999px]">
                <img src={portrait} alt="Portrait of Ruqyya" width={320} height={480} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
              </div>
              <figcaption className="mono mt-4 text-ink-2">Ghulam Ruqyya · Lahore, Pakistan</figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.06]">
                I start with the people who will use the screen, and <em className="text-forest">work outward from there.</em>
              </h2>
              <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt className="mono text-signal">{k}</dt>
                    <dd className="mt-1.5 text-lg leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* How a project runs: pick a step */}
        <Reveal className="mt-20 md:mt-28">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
            <h3 className="text-[clamp(2rem,3.4vw,3rem)] font-medium leading-none">How a project <em className="text-forest">runs</em></h3>
            <p className="mono hidden text-ink-2 sm:block">8 steps · 4 phases</p>
          </div>

          <div className="mt-8 hidden grid-cols-8 gap-2 md:grid" aria-hidden>
            {phases.map((p) => (
              <div key={p.name} className="text-center" style={{ gridColumn: `${p.from + 1} / ${p.to + 2}` }}>
                <p className="mono text-ink-2">{p.name}</p>
                <span className="mt-2 block h-0.5 rounded-full bg-[var(--accent)] opacity-60" />
              </div>
            ))}
          </div>

          <div
            role="tablist"
            aria-label="How a project runs"
            onKeyDown={onKey}
            className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-5 md:grid md:grid-cols-8 md:overflow-visible md:px-0 md:pb-0"
          >
            {process.map((s, i) => {
              const I = icons[i];
              const active = i === on;
              return (
                <button
                  key={s.step}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`step-tab-${i}`}
                  aria-selected={active}
                  aria-controls="step-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setOn(i)}
                  className={`group flex min-w-[6.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition-colors md:min-w-0 ${
                    active ? "border-forest bg-forest text-on-forest" : "border-line bg-paper hover:border-forest"
                  }`}
                >
                  <I size={24} strokeWidth={1.75} aria-hidden />
                  <span className="text-base font-semibold leading-tight">{s.step}</span>
                  <span className={`mono ${active ? "text-on-forest" : "text-ink-2"}`}>{String(i + 1).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>

          <div
            id="step-panel"
            role="tabpanel"
            aria-labelledby={`step-tab-${on}`}
            aria-live="polite"
            className="mt-5 flex min-h-[7rem] items-center gap-5 rounded-2xl border border-line bg-paper p-6 md:p-8"
          >
            <span aria-hidden className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-paper-2 text-forest sm:grid">
              <Icon size={28} strokeWidth={1.75} />
            </span>
            <p className="serif text-[clamp(1.4rem,2.3vw,2rem)] leading-snug">
              <span className="text-forest">{step.step}.</span> {step.description}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
