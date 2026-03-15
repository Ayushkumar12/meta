import { SEO } from "@/components/SEO";
import { ParallaxCanvas } from "@/components/canvas/ParallaxCanvas";
import { Hero } from "@/components/sections/Hero";
import { CoreServices } from "@/components/sections/CoreServices";
import { Process } from "@/components/sections/Process";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { WorkMarquee } from "@/components/sections/WorkMarquee";
import { Contact } from "@/components/sections/Contact";
import { useState, useEffect } from "react";
import { projectApi, Project } from "@/lib/api";

export default function Home() {
  const [apiProjects, setApiProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    projectApi.getAll()
      .then((res) => setApiProjects(res.projects))
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const allProjects = apiProjects.map(p => ({ ...p, id: p._id }));

  const websiteProjects = allProjects.filter(p => p.type === "website");
  const graphicsProjects = allProjects.filter(p => p.type === "graphics");
  const socialMediaProjects = allProjects.filter(p => p.type === "social_media");

  return (
    <>
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

        {/* ── Portfolio Section ── */}
        <section className="bg-[#050508] section-padding overflow-hidden">
          <div className="container-lg mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="pill mb-5">Our Work</div>
                <h2
                  className="font-black text-white"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", lineHeight: 0.9, letterSpacing: "-0.035em" }}
                >
                  PORT
                  <span
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.18) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    FOLIO
                  </span>
                </h2>
              </div>
              <a
                href="/works"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-primary transition-colors mb-2 md:mb-0 shrink-0"
              >
                View All Projects
                <div className="w-7 h-7 rounded-full border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            </div>
            <div className="mt-8 h-px" style={{ background: "linear-gradient(90deg, rgba(108,99,255,0.4), rgba(0,245,196,0.3), transparent)" }} />
          </div>

          {websiteProjects.length > 0 && (
            <WorkMarquee projects={websiteProjects} />
          )}
          {graphicsProjects.length > 0 && (
            <WorkMarquee projects={graphicsProjects} reverse isPortrait />
          )}
          {socialMediaProjects.length > 0 && (
            <WorkMarquee projects={socialMediaProjects} />
          )}
        </section>

        <Contact />
      </div>
    </>
  );
}
