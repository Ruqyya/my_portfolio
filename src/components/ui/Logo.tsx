const base = import.meta.env.BASE_URL;

// The brand mark supplied by the owner (public/brand/cr-mark.png), unaltered, on a warm ivory badge so it reads on the dark nav.
export function LogoMark({ height = 40, className = "" }: { height?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-xl bg-[#fcfbf7] ${className}`} style={{ padding: height * 0.12 }}>
      <img src={`${base}brand/cr-mark.png`} alt="" aria-hidden width={Math.round(height * 1.13)} height={height} style={{ height, width: "auto" }} decoding="async" />
    </span>
  );
}

// Logo only, no written name. The accessible name is still "Creative Ruqyya" for screen readers.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center">
      <LogoMark height={compact ? 42 : 52} />
      <span className="sr-only">Creative Ruqyya, home</span>
    </span>
  );
}
