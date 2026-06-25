import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import LinkedInIcon from "./LinkedInIcon";
import BehanceIcon from "./BehanceIcon";
import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="font-display text-2xl font-bold text-neutral-900">
            {site.shortName}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-neutral-500">
            {site.role} — {site.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-accent"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon size={18} />
            LinkedIn
          </a>
          <a
            href={site.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-accent"
            aria-label="Behance portfolio"
          >
            <BehanceIcon size={18} />
            Behance
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-accent"
            aria-label="Send email"
          >
            <Mail size={18} />
            {site.email}
          </a>
        </div>

        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
