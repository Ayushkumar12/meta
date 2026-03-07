"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface WorkMarqueeProps {
  projects: any[];
  title?: string;
  reverse?: boolean;
  isPortrait?: boolean;
}

export function WorkMarquee({ projects, title, reverse = false, isPortrait = false }: WorkMarqueeProps) {
  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <div
      ref={containerRef}
      className="py-6 bg-[#050508] overflow-hidden relative"
    >
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="flex gap-5"
        style={{
          width: "max-content",
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${projects.length * 10}s linear infinite`,
        }}
      >
        {duplicatedProjects.map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            to={`/works/${project.slug}`}
            className={`relative group shrink-0 rounded-2xl overflow-hidden ${isPortrait
                ? "w-[240px] md:w-[320px] aspect-[3/4]"
                : "w-[320px] md:w-[480px] aspect-video"
              }`}
          >
            <img
              src={typeof project.image === "string" ? project.image : (project.image as any).src}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            {/* Hover Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
              <p className="label-sm text-primary mb-1">{project.category}</p>
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-bold tracking-tight">{project.title}</h3>
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <ArrowUpRight size={16} className="text-white" />
                </div>
              </div>
            </div>
            {/* Border on hover */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/30 transition-colors duration-400" />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
