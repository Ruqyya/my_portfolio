import Hero from "../components/sections/Hero";
import BrandsBanner from "../components/sections/BrandsBanner";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Services from "../components/sections/Services";
import Process from "../components/sections/Process";
import Testimonials from "../components/sections/Testimonials";
import Numbers from "../components/sections/Numbers";
import Awards from "../components/sections/Awards";
import Tools from "../components/sections/Tools";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";
import PulseDivider from "../components/ui/PulseDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandsBanner />
      <About />
      <PulseDivider color="#14B8A6" className="max-w-4xl mx-auto opacity-40" />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Process />
      <Numbers />
      <Testimonials />
      <Awards />
      <Tools />
      <FAQ />
      <Contact />
    </>
  );
}
