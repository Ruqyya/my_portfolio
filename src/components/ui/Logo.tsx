import { useId } from "react";

// The mark: "CR" for Creative Ruqyya. A bold C ring cradles the R, and a small spark sits in the C's opening ("creative").
// Pure SVG on the site gradient, so it scales and recolours without files.
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${id}-g`} x1="6" y1="4" x2="58" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0a2552" />
          <stop offset="0.55" stopColor="#0f5974" />
          <stop offset="1" stopColor="#159797" />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="14" y1="14" x2="44" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d6fbf8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="17" fill={`url(#${id}-g)`} />
      <rect x="1" y="1" width="62" height="62" rx="16" fill="none" stroke="#ffffff" strokeOpacity="0.16" />
      <path d="M39.5 16.8A17.2 17.2 0 1 0 39.5 47.2" fill="none" stroke={`url(#${id}-c)`} strokeWidth="6" strokeLinecap="round" />
      <path d="M30.5 44V21h6.2a5.9 5.9 0 0 1 0 11.8h-6.2M36.3 32.8 42.2 44" fill="none" stroke="#a0f2ed" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 9.5l1.5 4.2 4.2 1.5-4.2 1.5L50 20.9l-1.5-4.2-4.2-1.5 4.2-1.5z" fill="#ffffff" />
    </svg>
  );
}

// Logo only, no written name. The accessible name is still "Creative Ruqyya" for screen readers.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center">
      <LogoMark size={compact ? 50 : 58} />
      <span className="sr-only">Creative Ruqyya, home</span>
    </span>
  );
}
