"use client";

import { useParams, Link } from "react-router-dom";
import { projects } from "@/lib/projects";
import { ArrowLeft, ExternalLink, Sparkles, MoveRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SEO } from "@/components/SEO";
import { useRef } from "react";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050508] text-white">
        <h1 className="display-sm mb-6 uppercase">Project Not Found</h1>
        <Link to="/works" className="pill hover:bg-white/10 transition-colors">
          Back to Works
        </Link>
      </div>
    );
  }

  const imageSrc = typeof project.image === 'string' ? project.image : (project.image as any).src;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050508] text-white overflow-hidden pb-40">
      <SEO
        title={`${project.title} | MetaCode Portfolio`}
        description={project.description}
        canonical={`/works/${project.slug}`}
        ogImage={imageSrc}
      />

      {/* ── Hero Image Section ── */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/20 to-transparent" />
        </motion.div>

        <div className="container-lg relative h-full flex flex-col justify-end pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="pill bg-primary/20 text-primary border-primary/20 backdrop-blur-md">
                {project.category}
              </span>
              <span className="text-white/40 font-bold tracking-[0.3em] uppercase text-[10px]">
                PROJECT · {project.year}
              </span>
            </div>
            <h1 className="display-xl text-white mb-8 leading-[0.8] tracking-tighter">
              {project.title.toUpperCase()}
            </h1>
            <div className="flex flex-wrap items-center gap-8 mt-12">
              {project.link !== "#" && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold tracking-widest uppercase text-xs"
                >
                  Visit Site
                  <ExternalLink size={16} />
                </motion.a>
              )}
              <Link
                to="/works"
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-bold tracking-widest uppercase text-xs"
              >
                <ArrowLeft size={16} />
                Back to Gallery
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] font-black tracking-[0.4em] uppercase">DETAILS</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>

      {/* ── Content Section ── */}
      <div className="container-lg pt-32">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Main Info */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold tracking-[0.4em] text-primary uppercase mb-10 flex items-center gap-3">
                <div className="h-px w-10 bg-primary/30" />
                Overview
              </h2>
              <div className="prose prose-invert prose-2xl max-w-none text-white/60 leading-relaxed font-light mb-20 italic">
                "{project.description}"
              </div>

              <h2 className="text-4xl font-black text-white mb-10 tracking-tight">Project Narrative</h2>
              <div className="prose prose-invert prose-lg max-w-none text-white/40 leading-relaxed space-y-6">
                <p>{project.longDescription || "A deep dive into the technical and creative journey of building this masterpiece. From initial wireframes to high-fidelity implementation, we focused on user agency and brand narrative."}</p>
                <p>We implemented a robust architecture using {project.stack?.join(', ') || 'modern industry standards'}, ensuring that the final product was not only visually stunning but technically resilient and fast.</p>
              </div>
            </motion.div>
          </div>

          {/* Metadata Sidebar */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-40 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.06] backdrop-blur-md"
            >
              <h3 className="text-xs font-bold tracking-[0.4em] text-white/30 uppercase mb-10">Project Intelligence</h3>

              <div className="space-y-10">
                <div>
                  <h4 className="text-[10px] font-bold text-primary tracking-widest uppercase mb-3">CLIENT</h4>
                  <p className="text-xl font-bold text-white">{project.client}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-primary tracking-widest uppercase mb-3">DISCIPLINE</h4>
                  <p className="text-xl font-bold text-white">{project.role}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-primary tracking-widest uppercase mb-3">YEAR</h4>
                  <p className="text-xl font-bold text-white">{project.year}</p>
                </div>
                {project.stack && project.stack.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-primary tracking-widest uppercase mb-6">TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map(tech => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-10 border-t border-white/10">
                <Link
                  to="/contact"
                  className="group flex items-center justify-between gap-4 text-white/30 hover:text-primary transition-all duration-300"
                >
                  <span className="text-xs font-bold tracking-widest uppercase">Start Similar</span>
                  <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Footer Navigation ── */}
        <div className="mt-40 pt-20 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div>
            <h3 className="display-sm text-white/20 leading-none mb-4">NEXT LEGEND</h3>
            <p className="text-white/40 font-medium">Ready to see more of what we build?</p>
          </div>
          <Link
            to="/works"
            className="group flex items-center gap-6 p-2 pr-10 rounded-full border border-white/10 hover:border-primary/40 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <MoveRight size={24} className="text-white/20 group-hover:text-primary transition-colors" />
            </div>
            <div>
              <span className="block text-[10px] font-black tracking-[0.4em] text-white/20 uppercase mb-1">Navigation</span>
              <span className="block text-sm font-bold text-white tracking-widest uppercase">All Projects</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Ambient background glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}
