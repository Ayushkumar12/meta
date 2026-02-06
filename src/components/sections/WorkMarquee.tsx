import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface WorkMarqueeProps {
  projects: any[];
  title?: string;
  reverse?: boolean;
  isPortrait?: boolean;
}

export function WorkMarquee({ projects, title, reverse = false, isPortrait = false }: WorkMarqueeProps) {
  // Duplicate projects to create seamless loop
  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];

  return (
    <section className={`py-10 bg-[#050505] overflow-hidden`}>
      {title && (
        <div className="container mx-auto px-6 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-primary" />
            <p className="text-primary font-bold tracking-[0.5em] text-sm uppercase">{title}</p>
          </div>
        </div>
      )}

      <div className="relative flex">
        <motion.div
          className="flex whitespace-nowrap gap-8 py-4"
          animate={{
            x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedProjects.map((project, index) => (
            <Link
              key={`${project.id}-${index}`}
              to={`/works/${project.slug}`}
              className={`relative group ${
                isPortrait 
                  ? "w-[250px] md:w-[350px] aspect-[3/4]" 
                  : "w-[300px] md:w-[450px] aspect-video"
              } rounded-2xl overflow-hidden flex-shrink-0`}
            >
              <img
                src={typeof project.image === 'string' ? project.image : (project.image as any).src}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter">
                    {project.title}
                  </h3>
                  <p className="text-primary text-xs font-bold tracking-widest uppercase mt-2">
                    {project.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
