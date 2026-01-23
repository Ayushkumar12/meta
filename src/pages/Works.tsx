import { projects } from "@/lib/projects";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Works() {
  return (
    <div className="bg-black text-white pt-32 pb-20 min-h-screen">
      <Helmet>
          
        <meta property="title" content="MetaCode | Future Digital Solutions - Premium Tech Agency" />


        <meta property="og:title" content="MetaCode | Future Digital Solutions - Premium Tech Agency"/>

        <meta name="robots" content="index, follow" />

        <meta name="url" content="https://metacode.co.in/works" />

        <meta
          name="identifier-url"
          content="https://metacode.co.in/works "
        />

        <meta name="revisit-after" content="1 days" />

        <meta name="googlebot" content="index, follow" />

        <link
          rel="canonical"
          href="https://metacode.co.in/"
        />

        <meta name="bingbot" content="index, follow" />

        
      </Helmet>
      <div className="container mx-auto px-6">
        <header className="mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-8"
          >
            SELECTED <br />
            <span className="text-primary">WORKS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            A curated collection of digital experiences we've crafted for forward-thinking clients 
            and ambitious brands.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/works/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-8 bg-white/5 border border-white/10 shadow-2xl">
                  <img
                    src={typeof project.image === 'string' ? project.image : (project.image as any).src}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary text-black rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <ArrowUpRight size={32} />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-3 block">
                      {project.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xl font-medium text-white/20 font-mono">
                    {project.year}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-40 text-center py-40 border-t border-white/10">
          <h2 className="text-4xl md:text-6xl font-black mb-12">READY TO START <br /> YOUR PROJECT?</h2>
          <Link 
            to="/contact"
            className="inline-block bg-primary text-black px-12 py-5 rounded-full font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
