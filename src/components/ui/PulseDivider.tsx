interface PulseDividerProps {
  className?: string;
  color?: string;
}

// Signature motif: an EKG-style pulse line that threads through the page,
// nodding to the designer's healthcare specialty while reading as a precise,
// data-driven divider between sections — never purely decorative.
export default function PulseDivider({ className = "", color = "#2563EB" }: PulseDividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-10 md:h-14"
      >
        <polyline
          points="0,30 260,30 300,30 320,8 340,52 360,30 400,30 440,30 460,14 480,46 500,30 540,30 900,30 920,10 940,50 960,30 1200,30"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 10"
          className="animate-[pulse-line_2.4s_ease-in-out_infinite] opacity-70"
        />
      </svg>
    </div>
  );
}
