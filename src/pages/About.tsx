"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SEO } from "@/components/SEO";
import { 
  Target, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  Command,
  History,
  Compass,
  Globe,
  Code,
  Flame,
  MousePointer2
} from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div ref={containerRef} className="bg-[#050508] min-h-screen text-white pt-32 pb-40 selection:bg-primary/30 overflow-x-hidden">
      <SEO
        title="The Collective | MetaCode - Digital Craftsmanship"
        description="MetaCode is a studio of digital architects, engineers, and dreamers. We don't just build software; we architect the future of human-digital interaction."
        canonical="/about"
      />

      <div className="container-lg relative z-10">
        {/* --- Hero Section: The Statement --- */}
        <section className="min-h-[70vh] flex flex-col justify-center mb-32 relative">
          <motion.div
            style={{ y: heroY, opacity }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-6xl"
          >
            <motion.div variants={fadeInUp} className="pill mb-12 flex items-center gap-2 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Architecting the Invisible
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="display-xl mb-12 tracking-[-0.05em]"
            >
              WE ARE <br />
              <span className="gradient-text-warm font-serif italic font-light">DIGITAL</span> <br />
              <span className="text-white">CRAFTSMEN.</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8 items-start">
              <p className="text-xl md:text-3xl text-white/50 leading-tight max-w-2xl font-light">
                MetaCode is a high-performance digital studio. We exist at the intersection of <span className="text-white font-medium">uncompromising logic</span> and <span className="text-white font-medium">boundless creativity</span>.
              </p>
              <div className="md:pt-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-surface-2 flex items-center justify-center text-[10px] font-bold text-primary/60">
                      0{i}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 mt-4">Entities in Orbit</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="absolute bottom-0 right-0 hidden lg:block"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 vertical-text rotate-180">Scroll to Explore</span>
              <div className="h-24 w-px bg-gradient-to-t from-primary to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* --- The Ethos: Our Core Philosophy --- */}
        <section className="mb-64">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-none">
                  THE <span className="text-primary">ETHOS</span> <br /> OF IMPACT.
                </h2>
                <div className="space-y-6 text-lg text-white/40 leading-relaxed font-medium">
                  <p>
                    We believe that the digital landscape is cluttered with noise. Our mission is to cut through the static with <span className="text-white italic">precision-engineered</span> solutions.
                  </p>
                  <p>
                    Every line of code is a brushstroke. Every interface is a gateway. We don't just build tools; we build experiences that define the brands of tomorrow.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Absolute Precision",
                  desc: "We obsess over the invisible. The 1px gap, the 10ms delay—these are our enemies.",
                  icon: Target,
                  glow: "group-hover:text-blue-400"
                },
                {
                  title: "Hyper-Evolution",
                  desc: "Tomorrow's tech is today's standard. We stay at the bleeding edge so you don't have to.",
                  icon: Flame,
                  glow: "group-hover:text-orange-500"
                },
                {
                  title: "Deep Integration",
                  desc: "We aren't just vendors; we are partners. Your goals are our obsessive focus.",
                  icon: Cpu,
                  glow: "group-hover:text-purple-500"
                },
                {
                  title: "Radical Simplicity",
                  desc: "Complexity is easy. Simplicity is hard. We do the hard work of making things easy.",
                  icon: Command,
                  glow: "group-hover:text-cyan-400"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 spotlight-card"
                >
                  <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 w-fit mb-6 transition-colors duration-500 ${item.glow}`}>
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- The Manifesto: Big Typography --- */}
        <section className="mb-64 py-32 relative">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-5xl mx-auto px-6"
          >
            <h2 className="display-lg tracking-tight mb-16 leading-[0.85]">
              "CODE IS <span className="gradient-text italic">POETRY</span> <br /> 
              DESIGN IS <span className="text-white/20">TRUTH."</span>
            </h2>
            <div className="flex flex-col items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center animate-bounce">
                <MousePointer2 size={16} className="text-primary" />
              </div>
              <p className="label-sm text-primary/60">Our Founding Belief</p>
            </div>
          </motion.div>
        </section>

        {/* --- The Blueprint: Our Process --- */}
        <section className="mb-64">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-xl">
              <div className="pill mb-6">Execution Strategy</div>
              <h2 className="display-md tracking-tighter">THE BLUEPRINT.</h2>
            </div>
            <p className="text-white/30 text-lg md:text-xl font-medium max-w-md md:text-right">
              Methodical, transparent, and ruthlessly efficient. 
              How we turn sparks into digital fire.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/5 rounded-[3rem] overflow-hidden">
            {[
              {
                step: "01",
                title: "IMMERSION",
                desc: "We don't start with code. We start with 'Why'. Understanding your ecosystem is our first priority.",
                icon: Compass,
                tag: "Discovery Phase"
              },
              {
                step: "02",
                title: "FORGING",
                desc: "This is where logic meets art. Rapid prototyping and visual iteration to capture the soul of the product.",
                icon: Layers,
                tag: "Design & UX"
              },
              {
                step: "03",
                title: "DEPLOYMENT",
                desc: "No stone unturned. Rigorous testing and optimization for a launch that doesn't just work—it dominates.",
                icon: Zap,
                tag: "Scale & Launch"
              }
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-700"
              >
                <div className="flex items-center justify-between mb-12">
                  <span className="text-5xl font-black text-white/5 italic font-serif group-hover:text-primary/20 transition-colors uppercase tracking-widest">{p.step}</span>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-primary/40 group-hover:text-primary transition-colors">{p.tag}</p>
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tighter group-hover:translate-x-2 transition-transform duration-500">{p.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium mb-10">{p.desc}</p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-fit group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                  <p.icon size={20} className="text-white/50 group-hover:text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Global Presence: Interactive Grid --- */}
        <section className="mb-40 text-center">
          <div className="inline-block p-12 rounded-[4rem] bg-surface border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <Globe size={40} className="mx-auto text-primary mb-8 animate-spin-slow" />
            <h2 className="text-4xl font-black tracking-tight mb-4">WORLDWIDE OPS.</h2>
            <p className="text-white/30 text-lg font-medium max-w-md mx-auto mb-8">
              Based in India, operating globally. We bridges timezones to deliver excellence wherever you are.
            </p>
            <div className="flex justify-center gap-12 font-black italic text-primary/20 text-5xl select-none group-hover:text-primary/40 transition-colors">
              <span>NYC</span>
              <span>DXB</span>
              <span>LND</span>
              <span>DEL</span>
            </div>
          </div>
        </section>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-accent/5 blur-[150px] rounded-full animate-pulse-glow delay-1000" />
        
        {/* Subtle Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{ 
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>
    </div>
  );
}
