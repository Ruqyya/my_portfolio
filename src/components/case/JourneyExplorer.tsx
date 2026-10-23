import { useRef, useState } from "react";
import type { Insight } from "../../data/case-studies";
import { Phone } from "./Frames";

// The journey map, made scannable: pick a stage on the feeling curve, read what she does, thinks, and what hurts,
// then see the screen that answers it. Everything shown is copied from the designer's own journey map.
export default function JourneyExplorer({ stages }: { stages: Insight[] }) {
  const [on, setOn] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = stages[on];
  const W = 600;
  const H = 120;
  const x = (i: number) => 40 + (i * (W - 80)) / (stages.length - 1);
  const y = (lvl: number) => H - 18 - lvl * (H - 36);
  const pts = stages.map((st, i) => [x(i), y(st.feeling?.level ?? 0.5)] as const);
  const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px} ${py}`).join(" ");

  const go = (to: number) => {
    const i = (to + stages.length) % stages.length;
    setOn(i);
    tabs.current[i]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") go(on + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(on - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(stages.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className="rounded-[1.75rem] border border-line bg-paper p-5 md:p-9">
      <p className="mono text-ink-2">Feeling across the journey, read off the journey map</p>
      <div role="tablist" aria-label="Journey stages" onKeyDown={onKey} className="relative mt-4">
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden className="block h-auto w-full overflow-visible">
          <path d={line} fill="none" stroke="var(--mark)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r={i === on ? 9 : 6} fill={i === on ? "var(--forest)" : "var(--paper)"} stroke="var(--forest)" strokeWidth="3" />
          ))}
        </svg>
        <div className="absolute inset-0">
          {stages.map((st, i) => (
            <button
              key={st.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`stage-tab-${i}`}
              aria-selected={i === on}
              aria-controls="stage-panel"
              tabIndex={i === on ? 0 : -1}
              onClick={() => setOn(i)}
              aria-label={`Stage ${i + 1}, ${st.title}`}
              className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${(pts[i][0] / W) * 100}%`, top: `${(pts[i][1] / H) * 100}%` }}
            />
          ))}
        </div>
      </div>
      <ol className="mt-1 grid grid-cols-6 text-center" aria-hidden>
        {stages.map((st, i) => (
          <li key={st.title} className={`px-0.5 text-[0.8rem] leading-tight md:text-base ${i === on ? "font-semibold text-ink" : "text-ink-2"}`}>
            <span className="mono block text-signal">{String(i + 1).padStart(2, "0")}</span>
            <span className="hidden md:block">{st.title}</span>
          </li>
        ))}
      </ol>

      <div id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${on}`} className="mt-10 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1fr_15rem]">
        <div>
          <p className="mono text-signal">Stage {String(on + 1).padStart(2, "0")} · {s.feeling?.label}</p>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight">{s.title}</h3>
          <dl className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            <div>
              <dt className="mono text-ink-2">What she does</dt>
              <dd className="mt-2 text-lg leading-relaxed">{s.doing}</dd>
            </div>
            <div>
              <dt className="mono text-ink-2">What she thinks</dt>
              <dd className="serif mt-2 text-2xl italic leading-snug">“{s.thought}”</dd>
            </div>
            <div className="rounded-2xl bg-[#fdecec] p-5 text-[#7a1d1d]">
              <dt className="mono text-[#7a1d1d]">Pain point</dt>
              <dd className="mt-2 text-lg font-medium leading-snug">{s.text}</dd>
            </div>
            <div className="rounded-2xl bg-[#e4f6ea] p-5 text-[#14532d]">
              <dt className="mono text-[#14532d]">Design response</dt>
              <dd className="mt-2 text-lg font-medium leading-snug">{s.response}</dd>
            </div>
          </dl>
        </div>
        {s.shot && (
          <div className="mx-auto w-full max-w-[15rem] lg:mx-0">
            <Phone shot={s.shot} />
          </div>
        )}
      </div>
    </div>
  );
}
