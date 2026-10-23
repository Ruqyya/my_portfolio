import { useState } from "react";
import type { Shot } from "../../data/case-studies";

const base = import.meta.env.BASE_URL;

// A screenshot with numbered callouts and a matching legend. The markers are decoration; the legend is the accessible text.
export default function Annotated({ shot, kind, className = "", stack = false }: { shot: Shot; kind: "phone" | "wide"; className?: string; stack?: boolean }) {
  const [on, setOn] = useState<number | null>(null);
  const notes = shot.notes ?? [];
  const phone = kind === "phone";

  return (
    <figure className={`grid items-center gap-8 ${phone && !stack ? "md:grid-cols-[minmax(0,19rem)_1fr]" : ""} ${className}`}>
      <div className={`relative mx-auto w-full ${phone ? (stack ? "max-w-[17rem]" : "max-w-[19rem]") : ""}`}>
        <div className={phone ? "rounded-[2.4rem] bg-[var(--bezel)] p-2 shadow-[0_40px_70px_-28px_rgba(36,60,57,0.26)] ring-1 ring-white/20" : "overflow-hidden rounded-xl border border-white/15 shadow-[0_40px_70px_-28px_rgba(36,60,57,0.26)]"}>
          <img
            src={`${base}${shot.src}`}
            alt={shot.alt}
            loading="lazy"
            decoding="async"
            className={`block w-full ${phone ? "rounded-[1.9rem]" : "h-auto"}`}
            style={phone ? { aspectRatio: "700 / 1515" } : undefined}
          />
        </div>
        {notes.map((n, i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[var(--paper)] bg-[var(--accent)] text-sm font-bold text-[var(--on-accent)] shadow-lg transition-transform ${on === i ? "scale-125" : ""}`}
            style={{ left: `${phone ? 3.4 + (n.x / 100) * 93.2 : n.x}%`, top: `${phone ? 1.3 + n.y * 0.974 : n.y}%` }}
          >
            {i + 1}
          </span>
        ))}
      </div>

      {notes.length > 0 && (
        <figcaption className={stack || !phone ? "mt-2" : ""}>
          <p className="mono text-ink-2">What to look at</p>
          <ol className="mt-4 space-y-3">
            {notes.map((n, i) => (
              <li key={i} onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(null)} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--on-accent)]">{i + 1}</span>
                <span className="text-lg leading-snug">{n.text}</span>
              </li>
            ))}
          </ol>
        </figcaption>
      )}
    </figure>
  );
}
