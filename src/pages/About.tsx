"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowRight, Target, Zap, Users, Award, Sparkles, Code, Cpu, Microscope } from "lucide-react";
import { AboutBackground } from "@/components/sections/AboutBackground";

const STATS = [
  { icon: Users, label: "Global Clients", value: 120, suffix: "+" },
  { icon: Target, label: "Pixels Pushed", value: 45, suffix: "M+" },
  { icon: Zap, label: "Digital Awards", value: 12, suffix: "" },
  { icon: Award, label: "Years in Voids", value: 8, suffix: "+" },
];

const VALUES = [
  {
    title: "Radical Innovation",
    desc: "We don't follow trends; we set them. Constantly exploring the bleeding edge of tech to keep our clients ahead of the curve.",
    icon: Microscope,
    color: "#6c63ff"
  },
  {
    title: "Deep Collaboration",
    desc: "Our clients are our partners. Transparency and integrated workflows ensure every project reflects a shared vision.",
    icon: Cpu,
    color: "#00f5c4"
  },
  {
    title: "Absolute Integrity",
    desc: "Trust is built through honest communication and unwavering commitment to quality. We ship what we promise.",
    icon: Code,
    color: "#ff4d6d"
  }
];


function AnimatedCounter({ end, suffix, active }: { end: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
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

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const staggerFade = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="bg-[#050508] min-h-screen overflow-x-hidden pt-28">
      <SEO
        title="Who We Are | MetaCode - Architects of Digital Excellence"
        description="Learn about MetaCode, our mission to empower brands via digital innovation, and the team driving digital transformation."
        canonical="/about"
      />

      {/* ── Background ── */}
      <AboutBackground />

      <div className="container-lg relative z-10 py-24">
        {/* ── Section 1: Hero Story ── */}
        <section className="mb-48 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl"
          >
            <motion.div custom={0} variants={staggerFade} className="pill mb-10 inline-flex">
              <Sparkles size={12} className="mr-2 animate-pulse" />
              Our Core Identity
            </motion.div>
            <motion.h1 custom={1} variants={staggerFade} className="display-lg text-white mb-12 leading-[0.85]">
              Architecting the <span className="gradient-text">Future</span> of <br />
              <span className="text-white/20">Digital Engagement.</span>
            </motion.h1>
            <motion.p custom={2} variants={staggerFade} className="text-xl md:text-3xl text-white/40 leading-relaxed max-w-3xl">
              MetaCode isn't just an agency — it's a <span className="text-white/80 font-medium">digital solutions provider</span>.
              We exist at the intersection of pixel-level curiosity and world-scale impact.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Section 2: Operational Pulse (Stats) ── */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-48">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={isStatsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] glass hover:border-primary/40 transition-all duration-700 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <stat.icon className="w-10 h-10 text-white/20 mb-10 group-hover:scale-125 group-hover:text-primary transition-all duration-500" />
              <div className="stat-num text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} active={isStatsInView} />
              </div>
              <div className="text-white/20 text-xs font-black tracking-[0.4em] uppercase group-hover:text-white/60 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Section 3: The North Star (Mission/Vision) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-48">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative p-12 lg:p-16 rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 text-primary/5 pointer-events-none">
              <Target size={200} strokeWidth={0.5} className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000" />
            </div>
            <h2 className="text-5xl font-black text-white mb-10 tracking-tighter">North <br /><span className="gradient-text">Star</span></h2>
            <p className="text-white/40 text-xl leading-relaxed relative z-10 max-w-lg">
              To redefine digital ecosystems through <span className="text-white font-medium italic underline underline-offset-8 decoration-primary/30">absolute precision</span>.
              We don't build websites; we craft interactive narratives that solidify brand authority in the cosmic digital void.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative p-12 lg:p-16 rounded-[3rem] bg-gradient-to-bl from-white/[0.03] to-transparent border border-white/[0.06] overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 text-accent/5 pointer-events-none">
              <Sparkles size={200} strokeWidth={0.5} className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000" />
            </div>
            <h2 className="text-5xl font-black text-white mb-10 tracking-tighter">Vortex <br /><span className="text-accent underline decoration-accent/20">Pulse</span></h2>
            <p className="text-white/40 text-xl leading-relaxed relative z-10 max-w-lg">
              To be the catalyst for the next generation of human-digital interaction.
              We envision a web where technology vanishes, leaving only <span className="text-white font-medium">unfiltered emotion</span> and <span className="text-white font-medium">hyper-performance</span> behind.
            </p>
          </motion.div>
        </div>

        {/* ── Section 4: Execution DNA (Values) ── */}
        <div className="mb-48 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="pill mb-10 mx-auto">Foundational DNA</div>
            <h2 className="display-md text-white mb-24 max-w-4xl mx-auto leading-[0.9] tracking-tighter">
              Built on <span className="gradient-text">Absolute</span> Principles.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 relative group overflow-hidden"
              >
                <div className="absolute top-[-20%] right-[-10%] opacity-[0.05] group-hover:opacity-10 transition-opacity duration-500">
                  <v.icon size={150} color={v.color} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed">{v.desc}</p>
                <div className="mt-10 h-1 w-12 bg-primary/20 group-hover:w-full transition-all duration-1000" style={{ background: v.color }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Section 5: The Humans (Team) ── */}
        {/* <div className="mb-48">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-xl">
              <div className="pill mb-8">Force Multipliers</div>
              <h2 className="text-6xl font-black text-white tracking-tighter leading-none mb-6">The Brain Trust.</h2>
              <p className="text-white/30 text-xl font-medium tracking-tight">Meet the entities directing the MetaCode vision.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="group relative h-[600px] rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/[0.08]"
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-4xl font-black text-white mb-2 tracking-tighter translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{m.name}</h3>
                  <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">{m.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative py-32 px-10 rounded-[4rem] bg-[#0d0d14] border border-white/[0.05] overflow-hidden text-center group"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 blur-[100px] transition-opacity duration-1000" />
          <h2 className="display-md text-white mb-14 leading-[0.9] max-w-3xl mx-auto tracking-tighter">
            Elevate into the <br /> <span className="gradient-text">MetaCode Void.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link
              to="/contact"
              className="group relative flex items-center justify-center gap-4 px-12 py-5 bg-primary text-white font-bold rounded-2xl text-[13px] tracking-[0.2em] uppercase overflow-hidden transition-all duration-700 shadow-[0_10px_40px_rgba(108,99,255,0.2)] hover:shadow-[0_20px_60px_rgba(108,99,255,0.4)]"
            >
              <span className="relative z-10">Start Project</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
            <Link
              to="/works"
              className="text-white/40 hover:text-white font-black tracking-[0.3em] uppercase text-[10px] transition-all duration-500"
            >
              View Selected Works
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

