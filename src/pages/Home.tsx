import { Suspense, lazy } from "react";
import { SEO } from "@/components/SEO";

const ParallaxCanvas = lazy(() => import("@/components/canvas/ParallaxCanvas").then(m => ({ default: m.ParallaxCanvas })));
const Hero = lazy(() => import("@/components/sections/Hero").then(m => ({ default: m.Hero })));
const CoreServices = lazy(() => import("@/components/sections/CoreServices").then(m => ({ default: m.CoreServices })));
const Process = lazy(() => import("@/components/sections/Process").then(m => ({ default: m.Process })));
const WhyChooseUs = lazy(() => import("@/components/sections/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
const WorkMarquee = lazy(() => import("@/components/sections/WorkMarquee").then(m => ({ default: m.WorkMarquee })));
const Contact = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));

import { projects } from "@/lib/projects";

export default function Home() {
  const websiteProjects = projects.filter(p => p.type === "website");
  const graphicsProjects = projects.filter(p => p.type === "graphics");

  return (
    <Suspense fallback={null}>
      <ParallaxCanvas />
      <div className="relative z-10">
      <SEO 
        title="Future Digital Solutions" 
        description="MetaCode is a premier tech agency specializing in high-end web development, creative branding, and innovative digital strategies for global brands."
        canonical="/"
      />
        <Hero />
        <CoreServices />
        <Process />
        <WhyChooseUs />
        
        <section className="bg-[#050505] pt-20">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <h2 className="text-sm md:text-base font-bold tracking-[0.4em] text-primary uppercase mb-6 pl-1">
              Our Work
            </h2>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter">
              PORT<span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">FOLIO</span>
            </h2>
            <div className="mt-8 h-1 w-24 bg-primary rounded-full" />
          </div>

          {websiteProjects.length > 0 && (
            <WorkMarquee projects={websiteProjects} />
          )}
          {graphicsProjects.length > 0 && (
            <WorkMarquee projects={graphicsProjects} reverse isPortrait />
          )}
        </section>

        <Contact />
      </div>
    </Suspense>
  );
}
