import { useId } from "react";
import { CR } from "./crGlyphs";

// The mark: "CR" for Creative Ruqyya, set in bold italic Fraunces. The R overlaps the C, and a thin gap cut around the R
// keeps both letters readable. White C, aqua R. Pure SVG, so it scales without a font file.
export function LogoMark({ height = 40, className = "" }: { height?: number; className?: string }) {
  const id = useId();
  return (
    <svg width={height * CR.aspect} height={height} viewBox={CR.viewBox} className={className} aria-hidden focusable="false">
      <defs>
        <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x="-500" y="-1700" width="5000" height="1900">
          <rect x="-500" y="-1700" width="5000" height="1900" fill="#fff" />
          <path d={CR.r} transform={`translate(${CR.rx} 0)`} fill="#000" stroke="#000" strokeWidth="100" strokeLinejoin="round" />
        </mask>
      </defs>
      <path d={CR.c} fill="#ffffff" mask={`url(#${id}-m)`} />
      <path d={CR.r} transform={`translate(${CR.rx} 0)`} fill="#a0f2ed" />
    </svg>
  );
}

// Logo only, no written name. The accessible name is still "Creative Ruqyya" for screen readers.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center">
      <LogoMark height={compact ? 44 : 52} />
      <span className="sr-only">Creative Ruqyya, home</span>
    </span>
  );
}
