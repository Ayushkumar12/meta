import { CoreServices } from "@/components/sections/CoreServices";
import { Contact } from "@/components/sections/Contact";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

export default function Services() {
  return (
    <div className="bg-black pt-20">
      <div className="container mx-auto px-6 pt-20 text-center">
        <SEO 
          title="Services" 
          description="We combine strategy, design, and technology to help brands and businesses deliver exceptional digital experiences." 
          canonical="/services"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm md:text-base font-bold tracking-[0.4em] text-primary uppercase mb-6">
            Everything we do
          </h2>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8">
            DIGITAL SOLUTIONS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40">
              FOR MODERN PROBLEMS
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            We combine strategy, design, and technology to help brands and businesses 
            deliver exceptional digital experiences.
          </p>
          <div className="mb-16">
            <Link to="/works" className="text-primary hover:underline font-semibold tracking-wider">
              Explore Our Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
      
      <CoreServices />
      
      <div className="pb-20">
        <Contact />
      </div>
    </div>
  );
}
