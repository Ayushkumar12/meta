"use client";

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import { services } from "@/lib/services";

export function CoreServices() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Background Canvas Animation (Subtle Particle Flow)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const particleCount = 40; // Reduced for cleaner look
    const connectionDistance = 140;

    const handleResize = () => {
      width = canvas.width = containerRef.current?.offsetWidth || window.innerWidth;
      height = canvas.height = containerRef.current?.offsetHeight || window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
        this.color = "rgba(255, 255, 255, 0.15)";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((a, i) => {
        a.update();
        a.draw();

        // Simple connections
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP ScrollTrigger Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Animations
      mm.add("(min-width: 1024px)", () => {
        // 1. Header Parallax (Moves slightly slower than scroll)
        gsap.to(titleRef.current, {
          y: -100,
          opacity: 1, // Ensure visibility
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // 2. Column-based Staggered Parallax
        // Reset positions first
        gsap.set(cardsRef.current, { y: 100, opacity: 0 });

        // Entrance Animation
        ScrollTrigger.batch(cardsRef.current, {
          start: "top 85%",
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.15,
              ease: "power4.out",
              overwrite: true
            });
          },
        });

        // Parallax Scrub
        const parallaxCards = cardsRef.current.filter(Boolean);

        // Mid Column (index 1) - Moves slightly down (slower scroll) relative to others
        if (parallaxCards[1]) {
          gsap.to(parallaxCards[1], {
            y: 50, // Pushes down slightly as we scroll
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        // Outer Columns (index 0, 2) - Move up slightly (faster scroll)
        if (parallaxCards[0]) {
          gsap.to(parallaxCards[0], {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (parallaxCards[2]) {
          gsap.to(parallaxCards[2], {
            y: -120, // Move up even faster
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });

      // Mobile/Tablet Animations (Simple Fade Up)
      mm.add("(max-width: 1023px)", () => {
        gsap.from(cardsRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Custom mouse tracking for card hover gradients
    const cards = document.querySelectorAll(".group");
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 lg:py-48 bg-[#030303] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-20">

        {/* Header */}
        <div ref={titleRef} className="mb-20 md:mb-32 text-center md:text-left">
          <h1 className="text-sm md:text-base font-bold tracking-[0.4em] text-primary uppercase mb-6 pl-1">
            Our Expertise
          </h1>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter">
            CORE <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
              SERVICES
            </span>
          </h2>
          <div className="mt-8 h-1 w-24 bg-primary md:mx-0 mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group relative"
              >
                <div className="relative overflow-hidden p-8 md:p-10 h-full bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-2xl hover:shadow-primary/10">

                  {/* Hover Gradient Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.color}15, transparent 40%)` }}
                  />

                  {/* Header: Icon + ID */}
                  <div className="flex justify-between items-start mb-12">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        backgroundColor: `${service.color}10`,
                        border: `1px solid ${service.color}40`,
                        boxShadow: `0 0 20px ${service.color}20`
                      }}
                    >
                      <Icon size={32} color={service.color} strokeWidth={1.5} />
                    </div>
                    <span className="text-5xl font-bold text-white/[0.1] group-hover:text-white/[0.2] transition-colors duration-500 font-mono">
                      {service.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-6 group-hover:translate-x-2 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg mb-8">
                      {service.desc}
                    </p>

                    {/* Animated Footer Link */}
                    <Link to={`/services/${service.slug}`} className="flex items-center text-sm font-semibold text-white/60 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                      <span className="mr-3 tracking-widest uppercase">Explore</span>
                      <div className="h-[1px] w-12 bg-white/20 group-hover:w-20 group-hover:bg-primary transition-all duration-300" />
                    </Link>
                  </div>

                  {/* Bottom Line Color */}
                  <div
                    className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                    style={{ backgroundColor: service.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
