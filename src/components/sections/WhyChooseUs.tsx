"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";
import { CheckCircle2, Zap, Shield, Globe } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Ultra Fast Performance",
    desc: "We optimize every line of code for maximum speed and efficiency, ensuring lightning-fast load times.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade security protocols integrated from day one to protect your data and users.",
  },
  {
    icon: Globe,
    title: "Global Scalability",
    desc: "Infrastructure designed to grow with your business, handling millions of users without a hitch.",
  },
  {
    icon: CheckCircle2,
    title: "Award Winning Quality",
    desc: "Our attention to detail and commitment to excellence is what sets us apart from the rest.",
  },
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".benefit-card", {
        x: (i) => i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".benefits-grid",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-primary font-bold tracking-[0.5em] text-sm uppercase mb-6">Why MetaCode</p>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
              REDEFINING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">DIGITAL STANDARD</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-xl">
              We don't just build websites; we create immersive digital experiences that drive growth and push technological boundaries.
            </p>
            
            <div className="flex gap-4">
              <div className="h-1 w-20 bg-primary rounded-full" />
              <div className="h-1 w-8 bg-white/10 rounded-full" />
              <div className="h-1 w-4 bg-white/10 rounded-full" />
            </div>
          </div>

          <div className="benefits-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <div 
                key={i} 
                className="benefit-card p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-colors duration-500 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                  <benefit.icon size={24} className="text-primary group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
