import type { Project } from "../../data/projects";

export const hasVideo = (p: Project) => Boolean(p.study.preview ?? p.study.video);

// Shows the project's video when one is set in case-studies.ts, otherwise its cover image.
// Videos live in public/videos/ and are referenced as "videos/<file>.mp4".
export default function ProjectMedia({ project, className = "" }: { project: Project; className?: string }) {
  const { video, preview } = project.study;
  const src = preview ?? video;
  if (src) {
    return (
      <video
        src={`${import.meta.env.BASE_URL}${src}`}
        poster={project.coverImage}
        autoPlay
        muted
        loop
        playsInline
        className={`${className.replace("object-cover object-top", "object-contain")} bg-[#0B1220]`}
      />
    );
  }
  return <img src={project.coverImage} alt={project.title} loading="lazy" className={className} />;
}
