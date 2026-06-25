import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Project card with hover micro-interactions:
 * scale, image reveal, accent color shift.
 */
export default function ProjectCard({ project, index = 0, layout = "default" }) {
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1",
    default: "",
  };

  const hasImage = !!project.thumbnail;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative ${sizeClasses[project.cardSize] || sizeClasses.default}`}
      data-cursor-hover
    >
      <Link
        to={`/projects/${project.slug}`}
        className="relative block h-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 transition-colors duration-500 hover:border-accent/40"
      >
        {/* Image or typographic fallback */}
        <div
          className={`relative overflow-hidden ${
            project.cardSize === "large"
              ? "aspect-[4/3] md:aspect-auto md:min-h-[480px]"
              : project.cardSize === "medium"
                ? "aspect-[3/4] md:min-h-[520px]"
                : "aspect-[4/3]"
          }`}
        >
          {hasImage ? (
            <>
              <img
                src={project.thumbnail}
                alt={`${project.title} — ${project.category} design preview`}
                width={800}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
            </>
          ) : (
            <div className="flex h-full min-h-[280px] flex-col justify-between bg-neutral-900 p-8 transition-colors duration-500 group-hover:bg-neutral-800">
              <span className="font-display text-6xl font-bold text-neutral-800 transition-colors group-hover:text-accent/20">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="mb-3 inline-block rounded-full border border-neutral-700 px-3 py-1 text-xs tracking-wider text-neutral-400 uppercase">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                  {project.title}
                </h3>
              </div>
            </div>
          )}

          {/* Hover description overlay */}
          <div className="absolute right-0 bottom-0 left-0 translate-y-2 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-neutral-300">{project.description}</p>
          </div>
        </div>

        {/* Card footer — visible on image cards */}
        {hasImage && (
          <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-6">
            <div>
              <span className="mb-2 inline-block rounded-full bg-accent/90 px-3 py-1 text-xs font-medium tracking-wider text-white uppercase">
                {project.category}
              </span>
              <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                {project.title}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight size={18} />
            </div>
          </div>
        )}

        {/* No-image card arrow */}
        {!hasImage && (
          <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-500 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight size={18} />
          </div>
        )}
      </Link>
    </motion.article>
  );
}
