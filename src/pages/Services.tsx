"use client";

import { CoreServices } from "@/components/sections/CoreServices";
import { Contact } from "@/components/sections/Contact";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Sparkles, ArrowDown } from "lucide-react";

export default function Services() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <div className="bg-[#050508] relative overflow-hidden">
      <SEO
        title="Services | Premium Technical Expertise by MetaCode"
        description="From full-stack development to creative brand design, discover how MetaCode uses cutting-edge tech to solve modern business problems."
        canonical="/services"
      />

      {/* ── Background Patterns ── */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[5%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[150px]" style={{ background: "radial-gradient(circle, #6c63ff, transparent)" }} />
        <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[130px]" style={{ background: "radial-gradient(circle, #00f5c4, transparent)" }} />
      </div>


      <div className="relative z-10">
        <CoreServices />
      </div>

      <div className="relative z-10 section-padding-lg">
        <Contact />
      </div>
    </div>
  );
}
