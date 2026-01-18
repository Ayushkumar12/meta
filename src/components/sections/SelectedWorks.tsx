"use client";

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "@/lib/gsap";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";

export function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scroll = scrollRef.current;
    if (!section || !scroll) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card-new");
      const scrollAmount = scroll.scrollWidth - window.innerWidth;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollAmount + 1000}`,
          invalidateOnRefresh: true,
        },
      });

      mainTl.to(scroll, {
        x: -scrollAmount,
        ease: "none",
      });

      cards.forEach((card: any) => {
        const img = card.querySelector(".project-img");
        const info = card.querySelector(".project-info");
        const number = card.querySelector(".project-number");

        // Image Animation
        gsap.fromTo(
          img,
          { scale: 1.2, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTl,
              start: "left 95%",
              end: "left 20%",
              scrub: true,
            },
          }
        );

        // Text Parallax Animation
        gsap.fromTo(
          info,
          { x: 50, opacity: 0 },
          {
            x: -50,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTl,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );

        // Number Parallax
        gsap.fromTo(
          number,
          { x: 50, opacity: 0 },
          {
            x: -85,
            opacity: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTl,
              start: "left 90%",
              end: "right 10%",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050505] overflow-hidden">
      {/* Background Section Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
        <h2 className="text-[30vw] font-black leading-none uppercase">Portfolio</h2>
      </div>

      <div ref={scrollRef} className="flex h-screen items-center px-[10vw] gap-[10vw] relative z-10">
        <div className="flex-shrink-0 w-[60vw] md:w-[35vw] flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-primary" />
            <p className="text-primary font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase">Selected Works</p>
          </div>
          <h2 className="text-4xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            CRAFTING <br /> DIGITAL <br /> <span className="text-primary">MAGIC</span>
          </h2>
        </div>

        {projects.map((p, i) => (
          <div
            key={i}
            className="project-card-new flex-shrink-0 w-[85vw] md:w-[1100px] h-[50vh] md:h-[80vh] relative group"
          >
            {/* Project Number */}
            <span className="project-number absolute -top-10 -left-10 md:-top-20 md:-left-20 text-[10rem] md:text-[30rem] font-black text-white opacity-0 select-none z-0 pointer-events-none">
              0{i + 1}
            </span>

            {/* Image Container */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 bg-white/5">
              <img
                src={typeof p.image === 'string' ? p.image : (p.image as any).src}
                alt={p.title}
                className="project-img absolute inset-0 w-full h-full object-contain md:object-cover transition-transform duration-700 md:group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 md:opacity-80 md:group-hover:opacity-60 transition-opacity duration-500" />
              
              {/* Content Container */}
              <div className="project-info absolute inset-0 flex flex-col justify-end p-6 md:p-16 z-20">
                <div className="overflow-hidden">
                  <span className="text-primary font-bold tracking-[0.4em] text-[10px] md:text-sm mb-2 md:mb-4 block uppercase md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
                    {p.category} — {p.year}
                  </span>
                </div>
                
                <div className="overflow-hidden mb-4 md:mb-8">
                  <h3 className="text-3xl md:text-8xl font-black text-white tracking-tighter uppercase md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {p.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4 md:gap-8 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-200 md:translate-y-4 md:group-hover:translate-y-0">
                  <Link to={`/works/${p.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 md:gap-4 bg-primary text-black px-5 py-3 md:px-8 md:py-4 rounded-full font-bold tracking-widest uppercase text-[10px] md:text-sm"
                    >
                      View Project
                      <ArrowRight size={16} className="md:w-5 md:h-5" />
                    </motion.button>
                  </Link>
                  
                  <div className="hidden md:block w-32 h-[1px] bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Ending Card */}
        <div className="flex-shrink-0 w-[70vw] md:w-[400px] h-[50vh] md:h-[70vh] flex flex-col items-center justify-center text-center">
          <div className="mb-8 relative">
            <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center group cursor-pointer hover:border-primary transition-colors duration-500">
              <ExternalLink className="text-white/20 group-hover:text-primary transition-colors duration-500" size={40} />
            </div>
          </div>
          <h3 className="text-3xl font-black text-white mb-2">HAVE A PROJECT?</h3>
          <p className="text-gray-500 max-w-[250px] mb-8">Let's build something extraordinary together.</p>
          <button className="px-8 py-4 bg-primary text-black font-bold text-sm tracking-widest uppercase rounded-full hover:scale-105 transition-transform">
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
}
