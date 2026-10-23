import type { Shot } from "../../data/case-studies";

const base = import.meta.env.BASE_URL;
const url = (s: Shot) => `${base}${s.src}`;

// Realistic phone: dark bezel, rounded screen, soft shadow. The screen is the real Figma export.
export function Phone({ shot, className = "" }: { shot: Shot; className?: string }) {
  return (
    <figure className={`group ${className}`}>
      <div className="mx-auto w-full max-w-[15rem] rounded-[2.1rem] bg-[var(--bezel)] p-[7px] shadow-[0_30px_50px_-24px_rgba(23,36,43,0.55)] ring-1 ring-black/20 transition-transform duration-500 group-hover:-translate-y-1.5">
        <img
          src={url(shot)}
          alt={shot.alt}
          loading="lazy"
          decoding="async"
          style={{ aspectRatio: "1170 / 2532" }}
          className="block w-full rounded-[1.65rem] bg-paper-2 object-cover"
        />
      </div>
      {shot.caption && <figcaption className="mono mt-4 text-center text-ink-2">{shot.caption}</figcaption>}
    </figure>
  );
}

// Browser window for desktop screens and film stills.
export function Browser({ shot, className = "", ratio }: { shot: Shot; className?: string; ratio?: string }) {
  return (
    <figure className={`group ${className}`}>
      <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_30px_60px_-30px_rgba(23,36,43,0.45)] transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-center gap-1.5 border-b border-line bg-paper-2 px-4 py-2.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <img
          src={url(shot)}
          alt={shot.alt}
          loading="lazy"
          decoding="async"
          style={ratio ? { aspectRatio: ratio } : undefined}
          className="block h-auto w-full bg-paper-2 object-cover"
        />
      </div>
      {shot.caption && <figcaption className="mono mt-4 text-ink-2">{shot.caption}</figcaption>}
    </figure>
  );
}
