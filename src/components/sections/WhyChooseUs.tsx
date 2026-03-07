"use client";

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Globe, CheckCircle2, ArrowUpRight } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Ultra Fast Performance",
    desc: "Every line of code is optimized for maximum speed, ensuring sub-1s load times and smooth 60fps interactions.",
    color: "#6c63ff",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade security protocols and best practices integrated from day one to protect your data and users.",
    color: "#00f5c4",
  },
  {
    icon: Globe,
    title: "Global Scalability",
    desc: "Infrastructure designed to grow with your business — from 100 to 10 million users without changes.",
    color: "#6c63ff",
  },
  {
    icon: CheckCircle2,
    title: "Award-Winning Quality",
    desc: "Obsessive attention to detail, design system discipline, and commitment to excellence in every pixel.",
    color: "#00f5c4",
  },
];

const counters = [
  { end: 20, suffix: "+", label: "Projects Shipped" },
  { end: 98, suffix: "%", label: "Client Satisfaction" },
  { end: 2, suffix: "+ yrs", label: "Studio Experience" },
  { end: 3, suffix: "×", label: "Avg ROI Delivered" },
];

function AnimatedCounter({ end, suffix, active }: { end: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, end]);
  return <>{count}{suffix}</>;
}

export function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const countersInView = useInView(countersRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={containerRef}
      className="relative section-padding-lg overflow-hidden bg-[#050508]"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        />
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[160px]"
          style={{ background: "radial-gradient(circle, #6c63ff, transparent)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[140px]"
          style={{ background: "radial-gradient(circle, #00f5c4, transparent)" }}
        />
      </div>

      <div className="container-lg relative z-10">
        {/* Top Grid: Header + Counters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill mb-6">Why MetaCode</div>
            <h2 className="display-md text-white mb-8">
              Redefining the{" "}
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #6c63ff, #00f5c4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                digital standard
              </span>
            </h2>
            <p className="text-lg text-white/40 leading-relaxed mb-10 max-w-lg">
              We don't just build{" "}
              <Link to="/services/web-design" className="text-white/70 hover:text-primary transition-colors underline-offset-2">
                websites
              </Link>
              ; we craft{" "}
              <Link to="/works" className="text-white/70 hover:text-primary transition-colors">
                immersive digital experiences
              </Link>{" "}
              that drive real growth. Our approach combines strategic thinking with world-class execution.
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/10 text-sm font-semibold text-white/60 hover:border-primary/40 hover:text-white transition-all duration-300"
            >
              Meet the Team
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </Link>
          </motion.div>

          {/* Right: Counters */}
          <motion.div
            ref={countersRef}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-5"
          >
            {counters.map((c, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] group hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(108,99,255,0.06), transparent 70%)" }}
                />
                <p
                  className="stat-num text-4xl md:text-5xl font-black mb-2"
                  style={{
                    background: "linear-gradient(135deg, #fff 50%, rgba(255,255,255,0.35))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <AnimatedCounter end={c.end} suffix={c.suffix} active={countersInView} />
                </p>
                <p className="text-xs text-white/35 font-medium tracking-wide uppercase">{c.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-400 overflow-hidden"
            >
              {/* Card glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 100%, ${benefit.color}08, transparent 60%)` }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-400 group-hover:scale-110"
                style={{
                  backgroundColor: `${benefit.color}12`,
                  border: `1px solid ${benefit.color}30`,
                  boxShadow: `0 0 20px ${benefit.color}15`,
                }}
              >
                <benefit.icon
                  size={22}
                  style={{ color: benefit.color }}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-base font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-sm text-white/35 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                {benefit.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-600 ease-out"
                style={{ backgroundColor: benefit.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
