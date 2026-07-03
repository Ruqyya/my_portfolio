import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-white dark:bg-[#0F172A] flex flex-col items-center justify-center gap-4"
        >
          <svg viewBox="0 0 200 60" className="w-40 h-12">
            <polyline
              points="0,30 60,30 75,30 85,6 95,54 105,30 120,30 135,30 145,14 155,46 165,30 200,30"
              fill="none"
              stroke="#2563EB"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-[pulse-line_1.4s_ease-in-out_infinite]"
              strokeDasharray="6 8"
            />
          </svg>
          <span className="font-display text-xs tracking-[0.3em] uppercase text-slate-400">
            Loading portfolio
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
