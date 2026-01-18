import { ClientFeedback } from "@/components/sections/ClientFeedback";
import { Contact } from "@/components/sections/Contact";
import { motion } from "framer-motion";

export default function Feedback() {
  return (
    <div className="bg-black pt-20">
      <div className="container mx-auto px-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-sm md:text-base font-bold tracking-[0.4em] text-primary uppercase mb-6">
            Kind Words
          </h1>
          <h2 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8">
            WHAT OUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40">
              CLIENTS SAY
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-16">
            We measure our success by the success of our clients. Here's what some of them 
             have to say about their experience working with us.
          </p>
        </motion.div>
      </div>
      
      <ClientFeedback />
      
      <div className="pb-20">
        <Contact />
      </div>
    </div>
  );
}
