"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "NEURAL INTERFACE",
    category: "AI & ROBOTICS",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    year: "2025",
  },
  {
    title: "QUANTUM CLOUD",
    category: "INFRASTRUCTURE",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    year: "2024",
  },
  {
    title: "CYBERPUNK CITY",
    category: "ARCHITECTURE",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    year: "2025",
  },
  {
    title: "BIO-SYNTHETIC",
    category: "BIOTECH",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&q=80",
    year: "2024",
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinTarget = pinTargetRef.current;
    const scroll = scrollRef.current;
    if (!section || !pinTarget || !scroll) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card-new");
      const scrollAmount = scroll.scrollWidth - window.innerWidth;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTarget,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollAmount + 1000}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      mainTl.to(scroll, {
        x: -scrollAmount,
        ease: "none",
      });

      // Individual Card Parallax & Scale
      cards.forEach((card: any) => {
        gsap.fromTo(
          card.querySelector(".project-img"),
          { scale: 1.4, filter: "grayscale(100%)" },
          {
            scale: 1,
            filter: "grayscale(0%)",
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

        gsap.fromTo(
          card.querySelector(".project-info"),
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTl,
              start: "left 80%",
              end: "left 20%",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-black">
      <div ref={pinTargetRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute top-10 left-10 md:left-20 z-20">
          <h2 className="text-[10vw] font-black text-white/5 leading-none select-none">
            PROJECTS
          </h2>
          <div className="flex items-center gap-4 mt-[-2vw]">
            <div className="w-12 h-[1px] bg-primary" />
            <p className="text-primary font-bold tracking-[0.5em] text-sm uppercase">Our Portfolio</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex h-screen items-center px-[10vw] gap-[5vw] relative z-10">
        {projects.map((p, i) => (
          <div
            key={i}
            className="project-card-new flex-shrink-0 w-[85vw] md:mt-20 md:w-[800px] h-[60vh] md:h-[70vh] relative group overflow-hidden rounded-xl"
          >
            {/* Image Wrapper */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="project-img absolute inset-0 w-full h-full object-cover origin-center"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
            </div>

            {/* Content Overlay */}
            <div className="project-info absolute inset-0 p-10 md:p-20 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-primary font-bold tracking-widest text-sm mb-4 block">
                    {p.category} / {p.year}
                  </span>
                  <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none">
                    {p.title}
                  </h3>
                  <motion.button
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-white group/btn"
                  >
                    <span className="text-sm font-bold tracking-widest uppercase">Explore Project</span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary group-hover/btn:text-black transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </motion.button>
                </div>
                
                <div className="hidden md:block">
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-primary group-hover:border-primary transition-all duration-700">
                    <ExternalLink size={30} />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right" />
          </div>
        ))}

        {/* View All Projects Card */}
        <div className="flex-shrink-0 w-[85vw] md:w-[400px] h-[60vh] md:h-[70vh] flex flex-col items-center justify-center border border-white/5 hover:border-primary/50 transition-colors group cursor-pointer rounded-xl">
          <p className="text-white/20 text-8xl font-black mb-8 group-hover:text-primary transition-colors">
            +
          </p>
          <h3 className="text-2xl font-black text-white mb-4">MORE WORKS</h3>
          <p className="text-gray-500 font-medium">EXPLORE ALL PROJECTS</p>
        </div>
        </div>
      </div>
    </section>
  );
}
