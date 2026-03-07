"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Discovery",
    desc: "We dive deep into your vision, target audience, and market goals. Thorough stakeholder interviews and market research build a solid foundation for everything that follows.",
    color: "#6c63ff",
    icon: "🔍",
  },
  {
    id: "02",
    title: "Strategy",
    desc: "A tailored roadmap combining innovation with practical execution. We define user journeys, architecture, and tech stack to ensure a scalable, performant product.",
    color: "#00f5c4",
    icon: "⚡",
  },
  {
    id: "03",
    title: "Development",
    desc: "Concepts come to life with cutting-edge technologies and pixel-perfect precision. Clean, maintainable code paired with intuitive, visually stunning interactions.",
    color: "#6c63ff",
    icon: "💻",
  },
  {
    id: "04",
    title: "Delivery",
    desc: "Rigorous testing, seamless launch, and ongoing optimization. We monitor performance and provide continuous support to ensure your product thrives and scales.",
    color: "#00f5c4",
    icon: "🚀",
  },
];

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={containerRef}
      className="relative section-padding-lg overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050508 0%, #08080f 50%, #050508 100%)" }}
    >
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #6c63ff, transparent)" }}
        />
      </div>

      <div className="container-lg relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 text-center"
        >
          <div className="pill mx-auto mb-6 w-fit">Our Methodology</div>
          <h2 className="display-lg text-white mb-6">
            The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6c63ff, #00f5c4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Process
            </span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
            Four battle-tested phases that transform your idea into a market-ready digital product.
          </p>
        </motion.div>

        {/* Steps: Desktop Horizontal / Mobile Vertical */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
          <motion.div
            className="hidden lg:block absolute top-[52px] left-0 h-px z-0"
            style={{ background: "linear-gradient(90deg, #6c63ff, #00f5c4)" }}
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Step Number Node */}
                <div className="relative flex items-center lg:flex-col lg:items-start gap-5 lg:gap-0 mb-0 lg:mb-8">
                  <div
                    className="relative flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[#050508] border-2 shrink-0 z-10 transition-all duration-500 group-hover:scale-110"
                    style={{ borderColor: step.color, boxShadow: `0 0 20px ${step.color}30` }}
                  >
                    <span className="text-xl">{step.icon}</span>
                    {/* Ripple */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ripple"
                      style={{ border: `2px solid ${step.color}` }}
                    />
                  </div>

                  {/* Mobile connector */}
                  <div className="lg:hidden flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                </div>

                {/* Content Card */}
                <div className="mt-0 lg:mt-0 p-7 rounded-2xl bg-white/[0.025] border border-white/[0.06] group-hover:border-white/[0.12] group-hover:bg-white/[0.04] transition-all duration-400 ml-0 relative overflow-hidden">
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 0% 0%, ${step.color}10, transparent 70%)` }}
                  />

                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-xs font-black font-mono tracking-widest"
                      style={{ color: step.color }}
                    >
                      {step.id}
                    </span>
                    <span
                      className="text-4xl font-black font-mono"
                      style={{ color: "rgba(255,255,255,0.03)", lineHeight: 1 }}
                    >
                      {step.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                    {step.desc}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                    style={{ backgroundColor: step.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/25 text-sm">
            Average project timeline:{" "}
            <span className="text-white/50 font-semibold">4–12 weeks</span> depending on scope.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
