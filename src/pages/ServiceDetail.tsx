import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { services } from "@/lib/services";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".animate-up", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".feature-item", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link to="/services" className="text-primary hover:underline">
          Back to Services
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-32 pb-20">
    <Helmet>
      <meta property="title" content={`MetaCode | ${service.title} - Premium Tech Agency`} />
      <meta property="og:title" content={`MetaCode | ${service.title} - Premium Tech Agency`} />
      <meta name="robots" content="index, follow" />
      <meta name="url" content={`https://metacode.co.in/services/${service.slug}`} />
      <meta
        name="identifier-url"
        content={`https://metacode.co.in/services/${service.slug}`}
      />
      <meta name="revisit-after" content="1 days" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href="https://metacode.co.in/" />

      <meta name="bingbot" content="index, follow" />
    </Helmet>
      <div className="container mx-auto px-6">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 animate-up"
              style={{
                backgroundColor: `${service.color}10`,
                border: `1px solid ${service.color}40`,
                boxShadow: `0 0 30px ${service.color}20`
              }}
            >
              <Icon size={40} color={service.color} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight animate-up">
              {service.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "text-primary" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <p className="text-xl text-white/60 leading-relaxed mb-12 animate-up max-w-xl">
              {service.longDesc}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-black px-10 py-5 rounded-full font-bold tracking-widest uppercase text-sm animate-up shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              Start Your Project
            </motion.button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm animate-up">
            <h2 className="text-2xl font-bold mb-8">What we offer</h2>
            <div className="space-y-6 features-grid">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 feature-item">
                  <div className="mt-1">
                    <CheckCircle2 size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{feature}</h3>
                    <p className="text-white/40 text-sm">
                      We provide top-tier {feature.toLowerCase()} tailored to your specific business needs.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div 
          className="fixed top-1/2 right-0 w-[500px] h-[500px] opacity-10 blur-[150px] rounded-full pointer-events-none -z-10"
          style={{ backgroundColor: service.color }}
        />
      </div>
    </div>
  );
}
