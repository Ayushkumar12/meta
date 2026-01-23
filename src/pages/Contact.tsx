import { Contact as ContactSection } from "@/components/sections/Contact";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <div className="bg-black pt-20">
      <Helmet>
          
        <meta property="title" content="MetaCode | Future Digital Solutions - Premium Tech Agency" />


        <meta property="og:title" content="MetaCode | Future Digital Solutions - Premium Tech Agency"/>

        <meta name="robots" content="index, follow" />

        <meta name="url" content="https://metacode.co.in/contact" />

        <meta
          name="identifier-url"
          content="https://metacode.co.in/contact "
        />

        <meta name="revisit-after" content="1 days" />

        <meta name="googlebot" content="index, follow" />

        <link
          rel="canonical"
          href="https://metacode.co.in/"
        />

        <meta name="bingbot" content="index, follow" />

        
      </Helmet>
      <div className="container mx-auto px-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-sm md:text-base font-bold tracking-[0.4em] text-primary uppercase mb-6">
            Get in touch
          </h1>
          <h2 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8">
            LET'S START A <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40">
              CONVERSATION
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-16">
            Whether you have a specific project in mind or just want to explore possibilities, 
            we're here to help you navigate the digital landscape.
          </p>
        </motion.div>
      </div>
      
      <ContactSection />
    </div>
  );
}
