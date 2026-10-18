import type { Project } from "../../data/projects";

// Shows the project's video when one is set in case-studies.ts, otherwise its cover image.
// Videos live in public/videos/ and are referenced as "videos/<file>.mp4".
export default function ProjectMedia({ project, className = "" }: { project: Project; className?: string }) {
  const { video } = project.study;
  if (video) {
    return (
      <video
        src={`${import.meta.env.BASE_URL}${video}`}
        poster={project.coverImage}
        autoPlay
        muted
        loop
        playsInline
        className={className}
      />
    );
  }
  return <img src={project.coverImage} alt={project.title} loading="lazy" className={className} />;
}
