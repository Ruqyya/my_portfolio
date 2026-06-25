import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Custom cursor with accent ring — desktop only.
 * Adds scale pulse on interactive elements.
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    const onOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor-hover]");
      setHovering(!!target);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden mix-blend-difference md:block"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          opacity: visible ? 1 : 0,
          scale: hovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="h-3 w-3 rounded-full bg-white" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
      >
        <div
          className={`h-10 w-10 rounded-full border-2 border-accent/60 ${hovering ? "cursor-pulse" : ""}`}
        />
      </motion.div>
    </>
  );
}
