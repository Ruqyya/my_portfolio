import { useEffect, useRef } from "react";
import type { Project } from "../../data/projects";

export const hasVideo = (p: Project) => Boolean(p.study.preview ?? p.study.video);

const base = import.meta.env.BASE_URL;

// Plays the project's silent preview loop only while it is on screen, and shows the
// poster still for visitors who prefer reduced motion. Falls back to the cover image.
export default function ProjectMedia({ project, className = "" }: { project: Project; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { preview, video, poster } = project.study;
  const src = preview ?? video;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => undefined);
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, src]);

  if (src) {
    return (
      <video
        ref={ref}
        src={`${base}${src}`}
        poster={poster ? `${base}${poster}` : project.coverImage}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${project.title}, preview`}
        className={className}
      />
    );
  }
  return <img src={project.coverImage} alt={project.title} loading="lazy" className={className} />;
}
