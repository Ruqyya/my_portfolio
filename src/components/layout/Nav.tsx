import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { MAIL_HREF } from "../../data/contact";

const links = [
  { to: "/#expertise", label: "Expertise" },
  { to: "/#work", label: "Work" },
  { to: "/#experience", label: "Experience" },
  { to: "/#approach", label: "Process" },
  { to: "/#contact", label: "Contact" },
];

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`palette-ivory fixed inset-x-0 top-0 z-50 border-b bg-paper/90 text-ink backdrop-blur-md transition-colors duration-300 ${
        scrolled || open ? "border-line shadow-[0_10px_30px_-22px_rgba(36,60,57,0.35)]" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 md:px-10">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="serif text-2xl font-semibold tracking-tight">Ruqyya</span>
          <span className="mono hidden text-ink-2 sm:inline">Product design</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="link-draw py-2 text-[0.95rem] font-medium">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-ink"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href={MAIL_HREF}
            className="hidden h-11 items-center rounded-full bg-forest px-5 text-sm font-semibold text-on-forest transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Discuss a project
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper px-5 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to} className="border-b border-line">
                <Link to={l.to} className="serif block py-4 text-3xl">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={MAIL_HREF} className="mt-6 inline-flex h-12 items-center rounded-full bg-forest px-6 font-semibold text-on-forest">
            Email me
          </a>
        </div>
      )}
    </header>
  );
}
