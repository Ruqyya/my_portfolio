import { useEffect, useState } from "react";

export interface RailItem {
  id: string;
  label: string;
}

// Sticky reading rail: shows where you are in the case study and lets you jump between sections.
export default function SectionRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  if (items.length < 3) return null;
  const index = Math.max(0, items.findIndex((i) => i.id === active));
  const pct = items.length > 1 ? (index / (items.length - 1)) * 100 : 0;

  return (
    <nav aria-label="Case study sections" className="sticky top-24 hidden self-start lg:block">
      <p className="mono mb-4 text-ink-2">In this project</p>
      <div className="relative border-l border-line pl-5">
        <span aria-hidden className="absolute -left-px top-0 w-px bg-signal transition-[height] duration-500" style={{ height: `${pct}%` }} />
        <ol className="space-y-3">
          {items.map((i, n) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={i.id === active ? "true" : undefined}
                className={`flex items-baseline gap-3 py-1 text-sm transition-colors ${i.id === active ? "font-semibold text-ink" : "text-ink-2 hover:text-ink"}`}
              >
                <span className="mono text-signal">{String(n + 1).padStart(2, "0")}</span>
                {i.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
