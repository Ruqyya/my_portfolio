import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug, getAdjacentProjects } from "../data/projects";

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <article className="pt-28 pb-24 md:pt-36 md:pb-32">
      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>

          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-medium tracking-wider text-accent uppercase">
            {project.category}
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-neutral-600">
            {project.excerpt}
          </p>
        </motion.div>

        {/* Meta block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-12 grid gap-6 border-y border-neutral-200 py-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <p className="mb-1 text-xs tracking-wider text-neutral-400 uppercase">
              Client
            </p>
            <p className="font-medium text-neutral-900">{project.client}</p>
          </div>
          <div>
            <p className="mb-1 text-xs tracking-wider text-neutral-400 uppercase">
              Deliverables
            </p>
            <p className="font-medium text-neutral-900">
              {project.deliverables.join(", ")}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs tracking-wider text-neutral-400 uppercase">
              Tools Used
            </p>
            <p className="font-medium text-neutral-900">
              {project.tools.join(", ")}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs tracking-wider text-neutral-400 uppercase">
              Year
            </p>
            <p className="font-medium text-neutral-900">{project.year}</p>
          </div>
        </motion.div>
      </header>

      {/* Gallery */}
      {project.gallery.length > 0 ? (
        <section className="mt-16 space-y-8 md:mt-24 md:space-y-12">
          {project.gallery.map((image, i) => (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`mx-auto px-6 lg:px-8 ${
                i % 2 === 1 ? "md:pr-24" : "md:pl-24"
              }`}
            >
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full object-cover"
                />
              </div>
            </motion.figure>
          ))}
        </section>
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-7xl px-6 lg:px-8"
        >
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
            <p className="max-w-md text-neutral-500">
              Case study imagery coming soon. Add images to{" "}
              <code className="rounded bg-neutral-200 px-1.5 py-0.5 text-sm">
                public/images/projects/
              </code>{" "}
              and update the gallery in{" "}
              <code className="rounded bg-neutral-200 px-1.5 py-0.5 text-sm">
                projects.js
              </code>
              .
            </p>
          </div>
        </motion.section>
      )}

      {/* Process / reflection */}
      <section className="mx-auto mt-20 max-w-3xl px-6 md:mt-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 font-display text-2xl font-bold text-neutral-900 md:text-3xl">
            Process & Reflection
          </h2>
          {project.process.split("\n\n").map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mb-4 text-base leading-relaxed text-neutral-600"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </section>

      {/* Prev / Next navigation */}
      <nav className="mx-auto mt-20 max-w-7xl border-t border-neutral-200 px-6 pt-12 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="group flex items-center gap-3 text-neutral-600 transition-colors hover:text-accent"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              <div>
                <p className="text-xs tracking-wider text-neutral-400 uppercase">
                  Previous
                </p>
                <p className="font-display font-semibold text-neutral-900 group-hover:text-accent">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="group flex items-center gap-3 text-right text-neutral-600 transition-colors hover:text-accent"
            >
              <div>
                <p className="text-xs tracking-wider text-neutral-400 uppercase">
                  Next
                </p>
                <p className="font-display font-semibold text-neutral-900 group-hover:text-accent">
                  {next.title}
                </p>
              </div>
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <Link
              to="/projects"
              className="text-sm font-semibold tracking-wide text-accent uppercase"
            >
              More Projects →
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
