const base = import.meta.env.BASE_URL;

// The brand mark supplied by the owner (the "CR" ligature). Its shape is unchanged; it is recoloured with the site's own
// brand gradient (white to soft aqua to cyan) by using the artwork as a mask, so it sits straight on the dark nav with no badge.
// public/brand/cr-mark-alpha.png is the same artwork as a transparency mask.
export function LogoMark({ height = 40, className = "" }: { height?: number; className?: string }) {
  const url = `url(${base}brand/cr-mark-alpha.png)`;
  return (
    <span
      aria-hidden
      className={`inline-block ${className}`}
      style={{
        height,
        width: Math.round(height * 1.13),
        background: "linear-gradient(100deg, #ffffff 0%, #e6fffc 40%, #a0f2ed 70%, #20d6d2 100%)",
        WebkitMask: `${url} center / contain no-repeat`,
        mask: `${url} center / contain no-repeat`,
      }}
    />
  );
}

// Logo only, no written name. The accessible name is still "Creative Ruqyya" for screen readers.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center">
      <LogoMark height={compact ? 48 : 58} />
      <span className="sr-only">Creative Ruqyya, home</span>
    </span>
  );
}
