const base = import.meta.env.BASE_URL;

// The brand mark supplied by the owner (GR in a ring). Its shape is unchanged; it is recoloured with the site's own
// brand gradient (white to soft aqua) by using the artwork as a mask, so it sits straight on the dark nav with no badge.
// public/brand/gr-mark-alpha.png is the same artwork as a transparency mask.
export function LogoMark({ height = 40, className = "" }: { height?: number; className?: string }) {
  const url = `url(${base}brand/gr-mark-alpha.png)`;
  return (
    <span
      aria-hidden
      className={`inline-block ${className}`}
      style={{
        height,
        width: height,
        background: "linear-gradient(120deg, #ffffff 0%, #e6fffc 45%, #a0f2ed 80%, #20d6d2 100%)",
        WebkitMask: `${url} center / contain no-repeat`,
        mask: `${url} center / contain no-repeat`,
      }}
    />
  );
}

// Logo only, no written name. The accessible name is still "Ghulam Ruqyya" for screen readers.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center">
      <LogoMark height={compact ? 46 : 54} />
      <span className="sr-only">Ghulam Ruqyya, home</span>
    </span>
  );
}
