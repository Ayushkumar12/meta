"use client";

import { projects } from "@/lib/projects";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Filter } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useState, useRef } from "react";

export default function Works() {
  const [activeTab, setActiveTab] = useState<"website" | "graphics" | "social_media">("website");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(
    (project) => (project as any).type === activeTab
  );

  return (
    <div ref={containerRef} className="bg-[#050508] text-white pt-44 pb-24 min-h-screen overflow-hidden">
      <SEO
        title="Works | Portfolio of Digital Masterpieces by MetaCode"
        description="Explore our curated collection of high-performance websites and stunning graphic designs crafted for ambitious global brands."
        canonical="/works"
      />

      {/* ── Background Patterns ── */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[150px]" style={{ background: "radial-gradient(circle, #6c63ff, transparent)" }} />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[130px]" style={{ background: "radial-gradient(circle, #00f5c4, transparent)" }} />
      </div>

      <div className="container-lg relative z-10">
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill mb-8">
              <Sparkles size={12} className="mr-1" />
              Our Showcase
            </div>
            <h1 className="display-lg font-black tracking-tighter mb-10 leading-[0.9]">
              Selected <br />
              <span className="gradient-text">Works.</span>
            </h1>
            <p className="text-xl text-white/45 max-w-2xl leading-relaxed">
              A curated collection of digital experiences we've crafted for forward-thinking clients
              and ambitious brands. Each project is a testament to our commitment to <Link to="/services" className="text-white/70 hover:text-primary transition-colors underline underline-offset-4 decoration-white/10">architectural excellence</Link>.
            </p>
          </motion.div>
        </header>

        {/* ── Filtering Tabs ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-24 border-b border-white/[0.05] pb-10">
          <div className="flex items-center gap-4 text-white/30">
            <Filter size={16} />
            <span className="text-xs font-bold tracking-widest uppercase">FILTER PROJECTS</span>
          </div>

          <div className="inline-flex bg-white/[0.03] p-1.5 rounded-full border border-white/[0.06] backdrop-blur-md">
            {[
              { id: "website", label: "Web Applications" },
              { id: "graphics", label: "Creative Design" },
              { id: "social_media", label: "Social Media" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 ${activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white/60"
                  }`}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Projects Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isGraphics = project.type !== "website";
              const isSocialMedia = project.type === "social_media";

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  {isSocialMedia ? (
                    <a
                      href={project.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group cursor-pointer"
                    >
                      <div className="relative aspect-[4/5] md:aspect-video w-full overflow-hidden rounded-[2.5rem] mb-8 bg-white/[0.02] border border-white/[0.06] transition-all duration-700 group-hover:border-[#E1306C]/50 group-hover:scale-[1.01] shadow-lg">
                        <img
                          src={typeof project.image === 'string' ? project.image : (project.image as any)?.src}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Hover Interaction */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F56040] flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-[0_0_30px_rgba(225,48,108,0.5)]">
                            <ArrowUpRight size={24} className="text-white" />
                          </div>
                        </div>

                        {/* Content inside Overlay */}
                        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="flex gap-2">
                            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest text-white uppercase">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 flex justify-between items-start">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#833AB4] group-hover:via-[#FD1D1D] group-hover:to-[#F56040] transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-white/30 text-sm font-bold tracking-widest uppercase mb-2">
                            {project.year} · {project.category}
                          </p>
                          {project.description && (
                            <p className="text-white/50 text-sm leading-relaxed line-clamp-2 max-w-md">
                              {project.description}
                            </p>
                          )}
                        </div>
                        <div className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-[#E1306C]/50 transition-all duration-500">
                          <ArrowUpRight size={20} className="text-white group-hover:text-[#E1306C] transition-colors" />
                        </div>
                      </div>
                    </a>
                  ) : (
                    <Link
                      to={isGraphics ? "#" : `/works/${project.slug}`}
                      className={`block ${isGraphics ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className={`relative ${isGraphics ? 'aspect-[4/5]' : 'aspect-video'} w-full overflow-hidden rounded-[2.5rem] mb-10 bg-white/[0.02] border border-white/[0.06] transition-all duration-700 group-hover:border-primary/30 group-hover:scale-[1.01]`}>
                        <img
                          src={typeof project.image === 'string' ? project.image : (project.image as any).src}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Hover Interaction */}
                        {!isGraphics && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-glow-primary">
                              <ArrowUpRight size={24} className="text-white" />
                            </div>
                          </div>
                        )}

                        {/* Content inside Overlay */}
                        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="flex gap-2">
                            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest text-primary uppercase">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 flex justify-between items-start">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-white/30 text-sm font-bold tracking-widest uppercase">
                            {project.year} · {project.category}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-primary/50 transition-all duration-500">
                          <ArrowUpRight size={20} className="text-white group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-40 relative py-32 px-10 rounded-[3rem] bg-[#0d0d14] border border-white/[0.05] overflow-hidden text-center"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/20 blur-[130px] rounded-[50%] pointer-events-none" />

          <h2 className="display-md text-white mb-12 leading-[1]">Ready to Start <br /> <span className="gradient-text">Your Legend?</span></h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 px-10 py-5 bg-primary rounded-full text-white font-bold text-sm tracking-widest uppercase hover:shadow-glow-primary hover:scale-105 transition-all duration-300 active:scale-95"
          >
            Get in touch
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
