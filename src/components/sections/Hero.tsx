"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { HeroBackground } from "./HeroBackground";

const HEADLINE_WORDS = ["Build.", "Design.", "Launch."];
const STATS = [
  { value: "10+", label: "Projects Live" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "2×", label: "Avg. Traffic Growth" },
];


export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx((i) => (i + 1) % HEADLINE_WORDS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const staggerFade = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 + 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  // Parallax transforms for content
  const transformX = useTransform(springX, (val) => (val - 500) * 0.02);
  const transformY = useTransform(springY, (val) => (val - 500) * 0.02);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#050508]"
    >
      {/* ── 3D Background ── */}
      <HeroBackground />

      {/* ── Ambient Glows ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-[0.15] blur-[150px]"
          style={{ background: "radial-gradient(circle, #6c63ff, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00f5c4, transparent 70%)" }}
        />
      </div>


      {/* ── Background Text ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.h1
          style={{ x: transformX, y: transformY }}
          className="display-xl font-black tracking-tighter opacity-[0.03] scale-150 select-none whitespace-nowrap text-white"
        >
          METACODE
        </motion.h1>
      </div>

      {/* ── Main Content ── */}
      <motion.div
        style={{ x: transformX, y: transformY }}
        className="relative z-10 max-w-6xl w-full px-6 pt-28 pb-10"
      >
        {/* Badge */}
        <motion.div
          custom={0}
          variants={staggerFade}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-8"
        >
        </motion.div>

        {/* Headline */}
        <motion.div
          custom={1}
          variants={staggerFade}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="display-xl font-black text-white tracking-tighter select-none leading-[0.85]">
            Visionary{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 50, rotateX: -90, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, rotateX: 90, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block gradient-text drop-shadow-[0_0_15px_rgba(108,99,255,0.3)]"
                style={{
                  perspective: "1000px",
                }}
              >
                {HEADLINE_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </h1>
          <p className="mt-4 text-sm md:text-base font-bold tracking-[0.6em] text-white/20 uppercase">
            Transforming Pixels into Reality
          </p>
        </motion.div>

        {/* Sub */}
        <motion.p
          custom={2}
          variants={staggerFade}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed mb-12"
        >
          MetaCode crafts immersive{" "}
          <span className="text-white/90 font-medium">high-end web experiences</span>,{" "}
          <span className="text-white/90 font-medium">next-gen solutions</span>, and{" "}
          <span className="text-white/90 font-medium">ultra-premium brand identities</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={staggerFade}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Primary Button: Magnet Glow */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              to="/contact"
              className="group relative flex items-center justify-center gap-4 px-12 py-5 bg-primary text-white font-bold rounded-2xl text-[13px] tracking-[0.2em] uppercase overflow-hidden transition-all duration-700 shadow-[0_10px_40px_rgba(108,99,255,0.25)] hover:shadow-[0_20px_60px_rgba(108,99,255,0.45)]"
            >
              {/* Background Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out" />

              {/* Animated Glow Spread */}
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 blur-[20px] transition-opacity duration-500 -z-10" />

              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">Launch Project</span>
              <div className="relative z-10 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                <ArrowUpRight
                  size={14}
                  className="text-white group-hover:text-primary transition-colors duration-500"
                />
              </div>
            </Link>
          </motion.div>

          {/* Secondary Button: Glass Reveal */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              to="/works"
              className="group relative flex items-center justify-center gap-4 px-12 py-5 rounded-2xl text-[13px] font-bold uppercase tracking-[0.2em] text-white/70 border border-white/10 glass hover:border-primary/40 hover:text-white transition-all duration-700 overflow-hidden"
            >
              {/* Hover Background Reveal */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/20 transition-all duration-500">
                <Play size={10} className="ml-1 text-primary group-hover:scale-125 transition-transform" />
              </div>
              <span className="relative z-10">View Portfolio</span>

              {/* Corner Borders */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/0 group-hover:border-primary/60 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/0 group-hover:border-accent/60 transition-all duration-500" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          variants={staggerFade}
          initial="hidden"
          animate="visible"
          className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center group">
              <p
                className="text-2xl md:text-3xl font-black stat-num mb-1 transition-transform duration-500 group-hover:-translate-y-2"
                style={{
                  background: "linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.3))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </p>
              <p className="text-[9px] text-white/50 uppercase font-black tracking-[0.3em]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050508] to-transparent z-20" />
    </section>
  );
}
