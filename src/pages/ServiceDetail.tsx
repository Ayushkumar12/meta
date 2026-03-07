"use client";

import { useParams, Link } from "react-router-dom";
import { services } from "@/lib/services";
import { ArrowLeft, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050508] text-white">
        <h1 className="display-sm mb-6">Service Not Found</h1>
        <Link to="/services" className="pill hover:bg-white/10 transition-colors">
          Back to Services
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-44 pb-24 overflow-hidden">
      <SEO
        title={`${service.title} | MetaCode Services`}
        description={service.longDesc}
        canonical={`/services/${service.slug}`}
      />

      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] opacity-[0.05] blur-[150px] rounded-full"
          style={{ backgroundColor: service.color }}
        />
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
      </div>

      <div className="container-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-16 group text-xs font-bold tracking-widest uppercase"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to All Services
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-10 relative group"
              style={{
                backgroundColor: `${service.color}08`,
                border: `1px solid ${service.color}30`,
                boxShadow: `0 0 40px ${service.color}15`
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icon size={36} color={service.color} strokeWidth={1.5} />
            </div>

            <h1 className="display-md text-white mb-10 leading-[0.95]">
              {service.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? "" : "text-white/20"}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="text-xl text-white/45 leading-relaxed mb-12 max-w-xl">
              {service.longDesc}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-10 py-5 bg-primary rounded-full text-white font-bold text-sm tracking-widest uppercase hover:shadow-glow-primary hover:scale-105 transition-all duration-300 active:scale-95"
              >
                Start a project
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-10 lg:p-14 rounded-[3rem] bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-10 text-white/[0.03] pointer-events-none group-hover:text-white/[0.06] transition-colors duration-700">
              <Sparkles size={160} />
            </div>

            <h2 className="text-2xl font-black text-white mb-10 tracking-tight flex items-center gap-3">
              Key Features
              <div className="h-px flex-1 bg-white/10" />
            </h2>

            <div className="space-y-8 relative z-10">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-5 group/item">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover/item:border-primary/50 group-hover/item:bg-primary/10 transition-all duration-300">
                      <CheckCircle2 size={18} className="text-primary/60 group-hover/item:text-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover/item:text-primary transition-colors duration-300">{feature}</h3>
                    <p className="text-white/35 text-sm leading-relaxed max-w-sm group-hover/item:text-white/50 transition-colors duration-300">
                      Market-leading implementation for {feature.toLowerCase()} optimized for performance and impact.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Glow */}
            <div
              className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] opacity-[0.05] blur-[80px] rounded-full pointer-events-none"
              style={{ backgroundColor: service.color }}
            />
          </motion.div>
        </div>

        {/* ── Related CTA ── */}
        <div className="mt-40 pt-20 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-2xl font-black text-white mb-4">Want to see this in action?</h3>
            <p className="text-white/40">Check out our portfolio to see real-world results we've delivered using our {service.title} expertise.</p>
          </div>
          <Link
            to="/works"
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-primary/40 transition-all duration-300"
          >
            <span className="text-sm font-bold tracking-widest uppercase">View Works</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
