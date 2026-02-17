"use client";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "premium",
      });

      gsap.to(containerRef.current, {
        scale: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      <div className="z-10 max-w-5xl pt-20 w-full px-4">
        <h1
          ref={textRef}
          className="hero-title flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9vw] sm:text-7xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
        >
          {"REVOLUTIONIZING THE DIGITAL FUTURE".split(" ").map((word, i) => (
            <span key={i} className="text-glitch" data-text={word}>
              {word}
            </span>
          ))}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto px-4 leading-relaxed">
          Crafting <Link to="/works" className="text-white hover:text-primary transition-colors">digital experiences</Link>, <Link to="/services" className="text-primary hover:underline">high-performance solutions</Link>, and <Link to="/services/full-stack-development" className="text-white hover:text-primary transition-colors">custom software</Link> for forward-thinking brands.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto">
          <Link to="/contact">
            <Button variant="primary" className="w-full sm:w-auto">Start a Project</Button>
          </Link>
          <Link to="/works">
            <Button variant="outline" className="w-full sm:w-auto">Our Work</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
