import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import StickyCta from "./components/layout/StickyCta";
import Hero from "./components/sections/Hero";
import NotFound from "./pages/NotFound";

const Expertise = lazy(() => import("./components/sections/Expertise"));
const Work = lazy(() => import("./components/sections/Work"));
const Approach = lazy(() => import("./components/sections/Approach"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Voices = lazy(() => import("./components/sections/Voices"));
const Faq = lazy(() => import("./components/sections/Faq"));
const Contact = lazy(() => import("./components/sections/Contact"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Expertise />
        <Work />
        <Experience />
        <Voices />
        <Approach />
        <Faq />
        <Contact />
      </Suspense>
    </>
  );
}

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    // Sections load lazily, so retry briefly until the target exists.
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.querySelector(location.hash);
      if (el || ++tries > 30) {
        clearInterval(timer);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    return () => clearInterval(timer);
  }, [location]);
  return null;
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <ScrollToHash />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/work/oladoc-homepage-concept-redesign" element={<Navigate to="/work/oladoc-healthcare-app-ui-ux-design" replace />} />
          <Route
            path="/work/:slug"
            element={
              <Suspense fallback={<div className="min-h-screen" />}>
                <ProjectDetail />
              </Suspense>
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}
