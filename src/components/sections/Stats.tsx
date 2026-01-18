"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";

const stats = [
  { label: "Projects Completed", value: "250", suffix: "+" },
  { label: "Happy Clients", value: "150", suffix: "+" },
  { label: "Awards Won", value: "45", suffix: "" },
  { label: "Team Members", value: "30", suffix: "+" },
];

export function Stats() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = document.querySelectorAll(".stat-number");
      
      numbers.forEach((num) => {
        const target = parseInt(num.getAttribute("data-value") || "0");
        gsap.to(num, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: num,
            start: "top 90%",
          },
        });
      });

      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 bg-black border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 opacity-20 blur-[100px] rounded-full scale-150" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="stats-container grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-5xl md:text-7xl font-black text-white mb-4 flex justify-center items-baseline">
                <span className="stat-number" data-value={stat.value}>0</span>
                <span className="text-primary text-3xl md:text-4xl ml-1">{stat.suffix}</span>
              </div>
              <p className="text-gray-500 font-bold tracking-widest uppercase text-xs md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
