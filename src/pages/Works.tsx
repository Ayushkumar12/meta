import { projects } from "@/lib/projects";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useState } from "react";

export default function Works() {
  const [activeTab, setActiveTab] = useState<"website" | "graphics">("website");

  const filteredProjects = projects.filter(
    (project) => (project as any).type === activeTab
  );

  return (
    <div className="bg-black text-white pt-32 pb-20 min-h-screen">
      <SEO 
        title="Works" 
        description="A curated collection of digital experiences we've crafted for forward-thinking clients and ambitious brands." 
        canonical="/works"
      />
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
            and ambitious brands. Each project is powered by our <Link to="/services" className="text-primary hover:underline">core services</Link>.
          </motion.p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-24">
          <div className="inline-flex bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("website")}
              className={`px-8 py-3 rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-500 relative ${
                activeTab === "website" ? "text-black" : "text-white/60 hover:text-white"
              }`}
            >
              <span className="relative z-10">Website Works</span>
              {activeTab === "website" && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("graphics")}
              className={`px-8 py-3 rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-500 relative ${
                activeTab === "graphics" ? "text-black" : "text-white/60 hover:text-white"
              }`}
            >
              <span className="relative z-10">Graphics Design</span>
              {activeTab === "graphics" && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        <motion.div 
          layout
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isGraphics = project.type === "graphics";
              const CardContent = (
                <>
                  <div className={`relative ${isGraphics ? 'aspect-[3/4]' : 'aspect-[16/10]'} w-[250px] md:w-[450px] overflow-hidden rounded-3xl mb-8 bg-white/5 border border-white/10 shadow-2xl`}>
                    <img
                      src={typeof project.image === 'string' ? project.image : (project.image as any).src}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {!isGraphics && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-20 h-20 bg-primary text-black rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                          <ArrowUpRight size={32} />
                        </div>
                      </div>
                    )}
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
                </>
              );

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  {isGraphics ? (
                    <div className="block cursor-default">
                      {CardContent}
                    </div>
                  ) : (
                    <Link to={`/works/${project.slug}`} className="block">
                      {CardContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

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
