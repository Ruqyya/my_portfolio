import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import PulseDivider from "../components/ui/PulseDivider";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
      <span className="font-display font-extrabold text-8xl md:text-9xl text-gradient mb-4">404</span>
      <PulseDivider className="max-w-xs mb-6" color="#7C3AED" />
      <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-3">Page not found</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
      >
        <Home size={16} /> Back to home
      </Link>
    </div>
  );
}
