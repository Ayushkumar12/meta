import { Contact as ContactSection } from "@/components/sections/Contact";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

export default function Contact() {
  return (
    <div className="bg-black pt-20">
      <SEO 
        title="Contact Us" 
        description="Get in touch with MetaCode for your next digital project. We're ready to help you build something amazing." 
        canonical="/contact"
      />
      <div className="container mx-auto px-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm md:text-base font-bold tracking-[0.4em] text-primary uppercase mb-6">
            Get in touch
          </h2>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8">
            LET'S START A <br />
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/40 inline-block"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              CONVERSATION
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            Whether you have a specific project in mind or just want to explore possibilities, 
            we're here to help you navigate the digital landscape.
          </p>
          <div className="mb-16">
            <Link to="/about" className="text-primary hover:underline font-semibold tracking-wider">
              Learn more about us
            </Link>
          </div>
        </motion.div>
      </div>
      
      <ContactSection />
    </div>
  );
}
