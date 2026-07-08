import { motion } from "framer-motion";

const brands = [
  "Oladoc",
  "Marham.pk",
  "BondVet",
  "Goddard",
  "Lumina",
  "Mint Dental",
  "Sehat Kahani",
  "Shumaila's",
  "Medical & Clinic",
  "Zental"
];

export default function BrandsBanner() {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/30 py-8 md:py-10 border-b border-slate-200 dark:border-slate-800 overflow-hidden flex items-center relative">
      <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-slate-50 dark:from-[#0F172A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-slate-50 dark:from-[#0F172A] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-12 md:gap-24 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-33.333333%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <div key={i} className="text-2xl md:text-4xl font-display font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-widest">
            {brand}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
