import { useId, useState } from "react";
import type { Shot } from "../../data/case-studies";

const base = import.meta.env.BASE_URL;

// Drag, tap or use the arrow keys to compare the original with the redesign.
export default function BeforeAfter({ before, after }: { before: Shot; after: Shot }) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <figure>
      <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl border border-line bg-paper-2 shadow-[0_30px_60px_-30px_rgba(23,36,43,0.45)]">
        <img src={`${base}${after.src}`} alt={after.alt} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={`${base}${before.src}`} alt={before.alt} loading="lazy" className="h-full w-full object-cover object-left-top bg-paper-2" />
        </div>
        <span className="mono absolute left-4 top-4 rounded-full bg-[var(--bezel)]/85 px-3 py-1 text-[#f8fafc]">Before</span>
        <span className="mono absolute right-4 top-4 rounded-full bg-[var(--accent)] px-3 py-1 text-[var(--on-accent)]">After</span>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-[var(--accent)] shadow-lg" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] shadow-xl">↔</span>
        </div>
        <label htmlFor={id} className="sr-only">
          Compare before and after
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mono mt-4 text-ink-2">Drag to compare the original with the redesign</figcaption>
    </figure>
  );
}
