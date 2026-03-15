"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Code2, 
  Globe2, 
  Smartphone, 
  Palette, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Contact } from "@/components/sections/Contact";
import { services } from "@/lib/services";
import gsap from "@/lib/gsap";

const PROCESS_STEPS = [
  {
    title: "Discovery & Strategy",
    desc: "We dive deep into your business goals, user needs, and market landscape to define a winning roadmap.",
    icon: Globe2,
    color: "#6c63ff"
  },
  {
    title: "Design & Prototyping",
    desc: "Translating ideas into high-fidelity wireframes and interactive prototypes that prioritize user experience.",
    icon: Palette,
    color: "#00f5c4"
  },
  {
    title: "Development & Testing",
    desc: "Writing clean, scalable code using the latest tech stacks, with robust QA at every single step.",
    icon: Code2,
    color: "#3b82f6"
  },
  {
    title: "Deployment & Growth",
    desc: "Launching your product to the world and providing the data-driven insights needed for continuous scaling.",
    icon: BarChart3,
    color: "#f59e0b"
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 20%",
          end: "bottom 80%",
          scrub: 1
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050508] relative overflow-hidden text-white">
      <SEO
        title="Services | MetaCode - Premium Digital Engineering"
        description="Explore our specialized services in Web & App Development, UI/UX Design, and Scalable Backend Architecture."
        canonical="/services"
      />

      {/* ── Background Elements ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
      </div>

      {/* ── Hero Section ── */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 z-10"
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Our Expertise</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-[1.1]"
          >
            Engineering the <br />
            <span className="bg-gradient-to-r from-primary via-[#a855f7] to-secondary bg-clip-text text-transparent">
              Digital Future
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            We transform complex business challenges into elegant digital solutions with precision engineering and world-class design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
            <div className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-bold flex items-center gap-4">
              <span className="flex items-center gap-2"><Zap size={16} className="text-yellow-400" /> Fast</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-green-400" /> Secure</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-2"><Layers size={16} className="text-blue-400" /> Scalable</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating background decorations */}
        <div className="absolute top-[20%] left-[5%] animate-float pointer-events-none">
          <Code2 size={40} className="text-white/5" />
        </div>
        <div className="absolute bottom-[20%] right-[10%] animate-float-delayed pointer-events-none">
          <Smartphone size={32} className="text-white/5" />
        </div>
      </section>

      {/* ── Services Detailed Grid ── */}
      <section className="relative z-10 py-24 bg-[#08080c]/50">
        <div className="container-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="process-section relative z-10 py-32 overflow-hidden">
        <div className="container-lg">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6">How We <span className="text-primary italic font-serif">Work</span></h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Our proven methodology ensures your vision is delivered with uncompromising quality at every stage.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-white/5 hidden lg:block" />
            <div className="process-line absolute left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary to-secondary hidden lg:block" />

            <div className="space-y-24">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row items-center gap-12 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end px-6">
                    <motion.div 
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`max-w-md ${idx % 2 === 1 ? 'text-left lg:mr-auto' : 'text-left lg:ml-auto'}`}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                        <step.icon size={32} style={{ color: step.color }} />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                      <p className="text-white/50 leading-relaxed text-lg">{step.desc}</p>
                    </motion.div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white/10 border-4 border-[#050508] relative z-20">
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center relative group"
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-[40px]" style={{ backgroundColor: `${step.color}20` }} />
                      <div className="text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                        0{idx + 1}
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section (Optional but good) ── */}
      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="container-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-16 text-center">Frequently Asked <span className="text-secondary">Questions</span></h2>
            <div className="space-y-6">
              {[
                { q: "How long does a typical project take?", a: "Project timelines vary depending on scope, but a standard corporate website usually takes 4-6 weeks, while complex applications take 3-6 months." },
                { q: "Do you offer post-launch support?", a: "Yes, we provide maintenance packages that include security updates, performance monitoring, and priority bug fixes." },
                { q: "Can you work with my existing team?", a: "Absolutely. We often integrate with in-house teams as specialized technical partners or staff augmentation." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-default"
                >
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item.q}
                  </h4>
                  <p className="text-white/50 leading-relaxed pl-5">
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Footer is usually in App.tsx layout, but if not, Contact adds CTA */}
      <div className="relative z-10 mt-12 mb-24">
        <Contact />
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 overflow-hidden">
        {/* Glow effect */}
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: service.color }}
        />
        
        <div className="relative z-10">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}30` }}
          >
            <service.icon size={32} style={{ color: service.color }} />
          </div>

          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
          
          <p className="text-white/40 leading-relaxed mb-8 min-h-[80px]">
            {service.desc}
          </p>

          <ul className="space-y-3 mb-10">
            {service.features.slice(0, 3).map((feature: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                {feature}
              </li>
            ))}
          </ul>

          <Link 
            to={`/services/${service.slug}`} 
            className="inline-flex items-center gap-2 font-bold text-sm tracking-widest uppercase text-white group-hover:gap-4 transition-all"
          >
            Learn More <ArrowRight size={16} className="text-primary" />
          </Link>
        </div>

        {/* Diagonal lines decoration */}
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <line x1="0" y1="100" x2="100" y2="0" strokeWidth="2" />
            <line x1="20" y1="100" x2="100" y2="20" strokeWidth="2" />
            <line x1="40" y1="100" x2="100" y2="40" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
