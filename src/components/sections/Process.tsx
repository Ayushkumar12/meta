"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";

const steps = [
  {
    id: "01",
    title: "Discovery",
    desc: "We dive deep into your vision, target audience, and market goals to build a solid foundation. This initial phase involves thorough research and stakeholder interviews to ensure we're aligned with your business objectives.",
    color: "#00f2ff",
  },
  {
    id: "02",
    title: "Strategy",
    desc: "Crafting a tailored roadmap that combines innovation with practical execution strategies. We define the user journey, information architecture, and technical stack to ensure a robust and scalable final product.",
    color: "#7000ff",
  },
  {
    id: "03",
    title: "Development",
    desc: "Bringing concepts to life using cutting-edge technologies and pixel-perfect precision. Our developers write clean, maintainable code while our designers ensure every interaction is intuitive and visually stunning.",
    color: "#00f2ff",
  },
  {
    id: "04",
    title: "Delivery",
    desc: "Rigorous testing followed by a seamless launch and ongoing optimization for success. We don't just launch and leave; we monitor performance and provide continuous support to ensure your digital solution thrives.",
    color: "#7000ff",
  },
];

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      });

      // Line Animation
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 90%",
        },
      });

      // Steps Animation
      gsap.from(".process-step", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={titleRef} className="mb-20 md:mb-32">
          <p className="text-primary font-bold tracking-[0.5em] text-sm uppercase mb-4">Our Methodology</p>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">PROCESS</span>
          </h2>
          <div ref={lineRef} className="mt-8 h-[1px] w-full bg-white/10 origin-left" />
        </div>

        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {steps.map((step) => (
            <div key={step.id} className="process-step group relative">
              <div className="mb-8 relative">
                <span className="text-8xl font-black text-white/5 group-hover:text-primary/10 transition-colors duration-500">
                  {step.id}
                </span>
                <div 
                  className="absolute bottom-4 left-0 w-8 h-8 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: step.color }}
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {step.desc}
              </p>
              
              {/* Animated Connector (Desktop) */}
              <div className="hidden lg:block absolute top-12 -right-6 w-12 h-[1px] bg-gradient-to-r from-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
