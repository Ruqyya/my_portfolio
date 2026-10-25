import { useId } from "react";
import { GR } from "./grGlyph";

// The owner's GR monogram, as a true vector. Filled with the site's brand gradient (white to soft aqua), so it stays sharp at any size
// and sits straight on the dark nav with no badge.
export function LogoMark({ height = 40, className = "" }: { height?: number; className?: string }) {
  const id = useId();
  return (
    <svg width={height} height={height} viewBox={GR.viewBox} className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${id}-g`} x1="170" y1="170" x2="1080" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#e6fffc" />
          <stop offset="0.8" stopColor="#a0f2ed" />
          <stop offset="1" stopColor="#20d6d2" />
        </linearGradient>
      </defs>
      <path d={GR.d} fill={`url(#${id}-g)`} fillRule="evenodd" />
    </svg>
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
