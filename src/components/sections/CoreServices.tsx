"use client";

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import gsap from "@/lib/gsap";
import { services } from "@/lib/services";
import { ArrowUpRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function CoreServices() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Parallax title on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll<HTMLElement>(".service-card");
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative section-padding bg-[#050508] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div
          className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[150px]"
          style={{ background: "radial-gradient(circle, #6c63ff, transparent)" }}
        />
        <div
          className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00f5c4, transparent)" }}
        />
      </div>

      <div className="container-lg relative z-10">
        {/* Header */}
        <div ref={titleRef} className="mb-12 md:mb-16 max-w-3xl">
          <div className="pill mb-6">Our Expertise</div>
          <h2 className="display-lg text-white mb-6">
            Services that{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6c63ff, #00f5c4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              move the needle
            </span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl leading-relaxed">
            From concept to launch — we build scalable, high-performance digital products that convert users into loyal customers.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const isFeatured = i === 0; // Make first card span 2 cols on lg
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={`service-card spotlight-card group relative rounded-3xl overflow-hidden cursor-pointer ${isFeatured ? "lg:col-span-2" : ""
                  }`}
                style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
              >
                {/* Card BG */}
                <div className="absolute inset-0 bg-white/[0.025] rounded-3xl transition-all duration-500 group-hover:bg-white/[0.04]" />
                {/* Border */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}20, transparent) border-box`,
                    border: `1px solid ${service.color}40`,
                  }}
                />
                <div className="absolute inset-0 rounded-3xl border border-white/[0.06]" />

                {/* Spotlight */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), ${service.color}12, transparent 50%)`,
                  }}
                />

                {/* Content */}
                <div className={`relative z-10 p-8 md:p-10 ${isFeatured ? "md:flex md:items-end md:gap-12 md:min-h-[280px]" : "min-h-[240px] flex flex-col justify-between"}`}>
                  {/* Top section */}
                  <div className={isFeatured ? "flex-1" : ""}>
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{
                          backgroundColor: `${service.color}12`,
                          border: `1px solid ${service.color}30`,
                          boxShadow: `0 0 24px ${service.color}20`,
                        }}
                      >
                        <Icon size={26} color={service.color} strokeWidth={1.5} />
                      </div>
                      <span
                        className="text-5xl font-black font-mono transition-colors duration-500"
                        style={{ color: "rgba(255,255,255,0.05)" }}
                      >
                        {service.id}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/40 leading-relaxed text-sm md:text-base group-hover:text-white/55 transition-colors duration-300">
                      {isFeatured ? service.desc : service.desc.substring(0, 100) + "..."}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className={isFeatured ? "shrink-0" : "mt-8"}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors duration-300"
                    >
                      <span>Explore Service</span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 group-hover/btn:border-primary/50 group-hover/btn:bg-primary/10 transition-all duration-300"
                      >
                        <ArrowUpRight size={13} className="group-hover/btn:text-primary transition-colors" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ backgroundColor: service.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-white/[0.06]"
        >
          <p className="text-white/40 text-sm max-w-md text-center sm:text-left">
            Not sure which service fits your needs?{" "}
            <Link to="/contact" className="text-primary hover:underline underline-offset-4">
              Let's talk
            </Link>{" "}
            — we'll figure out the best approach together.
          </p>
          <Link
            to="/services"
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-sm font-semibold text-white/60 hover:border-primary/40 hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            View All Services
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
