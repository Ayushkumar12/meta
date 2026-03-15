"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";
import { Box, Share2, Cloud, Smartphone, Link as LinkIcon, Shield } from "lucide-react";

const services = [
  {
    title: "Frontend Development",
    desc: "Crafting immersive user interfaces with React, Framer Motion, and modern CSS for seamless web experiences.",
    icon: Box,
  },
  {
    title: "Backend Development",
    desc: "Building robust architectures and scalable APIs using Node.js, Express, and high-performance databases.",
    icon: Share2,
  },
  {
    title: "Full Stack Development",
    desc: "Scalable and secure cloud infrastructure.",
    icon: Cloud,
  },
  {
    title: "Mobile",
    desc: "High-performance cross-platform mobile apps.",
    icon: Smartphone,
  },
  {
    title: "Blockchain",
    desc: "Decentralized solutions for a transparent future.",
    icon: LinkIcon,
  },
  {
    title: "Cybersecurity",
    desc: "Protecting your digital assets with advanced security.",
    icon: Shield,
  },
];

const ServiceCard = ({ s, i }: { s: any, i: number }) => {
  const Icon = s.icon;

  return (
    <div
      key={i}
      className="service-card glass p-8 rounded-3xl group hover:border-primary/50 transition-colors"
    >
      <div className="h-40 w-full mb-6 flex items-center justify-center">
        <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-primary/5 transition-all duration-500">
           <div className="w-8 h-8 text-primary group-hover:scale-110 transition-transform">
             <Icon size={32} />
           </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
      <p className="text-gray-400">{s.desc}</p>
    </div>
  );
};

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Pinning effect for the title
      gsap.to(".services-title-wrapper", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 px-4 bg-background overflow-hidden" id="services">
      <div className="services-title-wrapper w-full flex justify-center z-10 mb-24">
        <h2 className="services-title text-4xl md:text-6xl font-black text-center">
          OUR CORE SERVICES
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-20">
        {services.map((s, i) => (
          <ServiceCard key={i} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

