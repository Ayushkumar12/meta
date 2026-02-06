import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { projects } from "@/lib/projects";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".animate-up", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".project-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/works" className="text-primary hover:underline">
          Back to Works
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-12 group animate-up"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Works
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden mb-6">
              <span className="text-primary font-bold tracking-[0.4em] text-sm block uppercase animate-up">
                {project.category} — {project.year}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter animate-up">
              {project.title.toUpperCase()}
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-12 animate-up max-w-xl">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-4 animate-up">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-primary text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(0,212,255,0.3)]"
              >
                Live Preview
                <ExternalLink size={18} />
              </motion.a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-[2rem] overflow-hidden project-image shadow-2xl">
            <img
              src={typeof project.image === 'string' ? project.image : (project.image as any).src}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20 border-y border-white/10 mb-20">
          <div className="animate-up">
            <h3 className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">Client</h3>
            <p className="text-xl font-medium">{project.client}</p>
          </div>
          <div className="animate-up">
            <h3 className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">Role</h3>
            <p className="text-xl font-medium">{project.role}</p>
          </div>
          <div className="animate-up">
            <h3 className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">Year</h3>
            <p className="text-xl font-medium">{project.year}</p>
          </div>
          <div className="animate-up">
            <h3 className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/60">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="max-w-4xl mx-auto py-20">
          <h2 className="text-4xl font-bold mb-12 animate-up">Project Overview</h2>
          <div className="prose prose-invert prose-lg max-w-none text-white/60 leading-relaxed animate-up">
            <p>{project.longDescription}</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div 
          className="fixed top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"
        />
        <div 
          className="fixed bottom-0 left-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10"
        />
      </div>
    </div>
  );
}
