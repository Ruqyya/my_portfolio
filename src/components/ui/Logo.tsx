import { useId } from "react";

// The mark: an "R" drawn like a stethoscope. The bowl is the loop, the leg is the tube, and the foot is the chest piece.
// Healthcare in the letter itself, on the site gradient. Pure SVG, so it scales and recolours without files.
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
      </defs>
      <rect width="64" height="64" rx="17" fill={`url(#${id}-g)`} />
      <rect x="1" y="1" width="62" height="62" rx="16" fill="none" stroke="#ffffff" strokeOpacity="0.16" />
      <path d="M21 51V14h12.5a9.5 9.5 0 0 1 0 19H21" fill="none" stroke="#ffffff" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 33l9.5 11" fill="none" stroke="#ffffff" strokeWidth="5.4" strokeLinecap="round" />
      <circle cx="46" cy="49" r="6.4" fill="#a0f2ed" />
      <circle cx="46" cy="49" r="2.4" fill="#0f5974" />
    </svg>
  );
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark size={compact ? 38 : 44} />
      <span className="serif text-[1.55rem] font-semibold leading-none tracking-tight">
        Ruqyya <em className="font-medium text-forest">Studio</em>
      </span>
    </span>
  );
}
