"use client";

import { useRef, useEffect } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Jonathan Wright",
    role: "CEO, TechNexus",
    content: "The level of technical expertise and creative vision they brought to our project was unmatched. They didn't just build a website; they created an experience.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=jonathan"
  },
  {
    name: "Amara Okoro",
    role: "Director of Marketing, Stellar Global",
    content: "Working with MetaCode. was a game-changer for our digital presence. Their attention to detail and innovative approach helped us reach our conversion goals ahead of schedule.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=amara"
  },
  {
    name: "David Miller",
    role: "Founder, GreenWave",
    content: "Exceptional design and seamless performance. They truly understand how to bridge the gap between complex technology and user-friendly interfaces.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=david"
  }
];

export function ClientFeedback() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Small delay to ensure previous sections (like pinned ones) have settled
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      gsap.fromTo(".feedback-card", 
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(".feedback-header", 
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="feedback-header text-center mb-20">
          <h2 className="text-sm md:text-base font-bold tracking-[0.4em] text-primary uppercase mb-6">
            Testimonials
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            CLIENT <span className="text-transparent border-text">FEEDBACK</span>
          </h3>
          <div className="mt-8 h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="feedback-card group relative p-8 md:p-10 bg-surface border border-white/10 rounded-[2rem] hover:bg-white/[0.1] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <div className="absolute top-8 right-8 text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                <Quote size={40} />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
