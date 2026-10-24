import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { BOOK_HREF, bookProps } from "../../data/contact";

// Appears once the visitor has scrolled past the hero and stays out of the way of the contact section.
export default function StickyCta() {
  const [past, setPast] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setPast(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [pathname]);

  useEffect(() => {
    setAtContact(false);
    let io: IntersectionObserver | undefined;
    const timer = setInterval(() => {
      const el = document.getElementById("contact");
      if (!el) return;
      clearInterval(timer);
      io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { threshold: 0.15 });
      io.observe(el);
    }, 300);
    return () => {
      clearInterval(timer);
      io?.disconnect();
    };
  }, [pathname]);

  const show = past && !atContact;

  return (
    <a
      href={BOOK_HREF}
      {...bookProps}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-4 left-4 right-4 z-40 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--on-accent)] shadow-xl shadow-[#243c39]/20 transition-all duration-500 sm:left-auto sm:right-6 sm:w-auto ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <CalendarCheck size={18} aria-hidden /> Book a 15-minute call
    </a>
  );
}
