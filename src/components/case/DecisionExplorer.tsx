import { useRef, useState } from "react";
import type { Decision } from "../../data/case-studies";
import { Browser, Phone } from "./Frames";

// Annotated decision explorer: pick a decision, see the choice and the real screens that carry it.
// Tabs follow the WAI-ARIA tablist pattern (arrow keys, Home and End) and the panel is plain content, so it works with a keyboard, touch and no motion.
export default function DecisionExplorer({ decisions }: { decisions: Decision[] }) {
  const [on, setOn] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const d = decisions[on];

  const move = (to: number) => {
    const i = (to + decisions.length) % decisions.length;
    setOn(i);
    tabs.current[i]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") move(on + 1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") move(on - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(decisions.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div
        role="tablist"
        aria-label="Design decisions"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {decisions.map((x, i) => (
          <button
            key={x.title}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`decision-tab-${i}`}
            aria-selected={i === on}
            aria-controls="decision-panel"
            tabIndex={i === on ? 0 : -1}
            onClick={() => setOn(i)}
            className={`flex shrink-0 items-baseline gap-3 rounded-2xl border px-5 py-4 text-left transition-colors lg:shrink ${
              i === on ? "border-forest bg-paper-2" : "border-line hover:border-[var(--line-strong)]"
            }`}
          >
            <span className={`mono ${i === on ? "text-signal" : "text-ink-2"}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className="serif max-w-[16rem] text-lg leading-snug lg:max-w-none lg:text-xl">{x.title}</span>
          </button>
        ))}
      </div>

      <div id="decision-panel" role="tabpanel" aria-labelledby={`decision-tab-${on}`} className="lg:col-span-8">
        <h3 className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-medium leading-tight">{d.title}</h3>
        <p className="mt-3 max-w-2xl text-lg text-ink-2">{d.text}</p>
        {d.shots && d.shots.length > 0 && (
          <div className="surface-stage mt-8 rounded-[1.6rem] p-5 md:p-8">
            <div className={`grid gap-6 ${d.kind === "phone" ? "grid-cols-2 md:grid-cols-4" : d.shots.length > 1 ? "md:grid-cols-2" : ""}`}>
              {d.shots.map((sh) =>
                d.kind === "phone" ? <Phone key={sh.src} shot={sh} /> : <Browser key={sh.src} shot={sh} className={d.shots!.length === 3 && sh === d.shots![2] ? "md:col-span-2" : ""} />,
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
