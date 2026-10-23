import { useRef, useState } from "react";
import type { Task } from "../../data/case-studies";
import { Browser, Phone } from "./Frames";

// The finished experience, organised by what a user is trying to do. Each task gets its own composition.
export default function TaskShowcase({ tasks }: { tasks: Task[] }) {
  const [on, setOn] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = tasks[on];

  const go = (to: number) => {
    const i = (to + tasks.length) % tasks.length;
    setOn(i);
    tabs.current[i]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(on + 1);
    else if (e.key === "ArrowLeft") go(on - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(tasks.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div role="tablist" aria-label="What a user is trying to do" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 md:mx-0 md:flex-wrap md:px-0">
        {tasks.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`task-tab-${x.id}`}
            aria-selected={i === on}
            aria-controls="task-panel"
            tabIndex={i === on ? 0 : -1}
            onClick={() => setOn(i)}
            className={`h-12 shrink-0 rounded-full border px-6 text-base font-semibold transition-colors ${i === on ? "border-forest bg-forest text-on-forest" : "border-[var(--line-strong)] hover:border-forest hover:text-forest"}`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div id="task-panel" role="tabpanel" aria-labelledby={`task-tab-${t.id}`} className="surface-deep mt-6 rounded-[1.75rem] px-5 py-10 md:px-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="mono text-signal">{String(on + 1).padStart(2, "0")} · {t.label}</p>
            <h3 className="mt-3 text-[clamp(1.8rem,2.8vw,2.5rem)] font-medium leading-[1.1]">{t.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">{t.text}</p>
          </div>

          <div className="lg:col-span-8">
            {t.kind === "single" && (
              <div className="mx-auto max-w-[19rem]">
                <Phone shot={t.shots[0]} />
              </div>
            )}
            {t.kind === "phones" && (
              <div className="grid grid-cols-2 items-end gap-5 md:gap-10">
                {t.shots.map((sh, i) => (
                  <div key={sh.src} className={i === 1 ? "md:translate-y-8" : ""}>
                    <Phone shot={sh} />
                  </div>
                ))}
              </div>
            )}
            {t.kind === "flow" && (
              <ol className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
                {t.shots.map((sh, i) => (
                  <li key={sh.src} className="relative">
                    <Phone shot={sh} />
                    {i < t.shots.length - 1 && (
                      <span aria-hidden className="absolute -right-3 top-[36%] hidden h-px w-6 bg-[var(--brand-cyan)] md:block" />
                    )}
                  </li>
                ))}
              </ol>
            )}
            {t.kind === "wide" && (
              <div className="grid gap-6 md:grid-cols-2">
                <Browser shot={t.shots[0]} />
                <Browser shot={t.shots[1]} />
                <Browser shot={t.shots[2]} className="md:col-span-2" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
