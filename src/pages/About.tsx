import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <SEO
          title="About Us"
          description="We're a team of passionate creators, developers, and strategists dedicated to pushing the boundaries of what's possible in the digital realm."
          canonical="/about"
        />
        {/* Hero Section */}
        <div className="max-w-4xl mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8"
          >
            We are <span className="text-primary">MetaCode</span>.
            <br />
            Architects of Digital Excellence.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-white/60 leading-relaxed"
          >
            We're a team of passionate creators, developers, and strategists
            dedicated to pushing the boundaries of what's possible in the digital realm.
            Explore our <Link to="/services" className="text-primary hover:underline">digital services</Link> or view our <Link to="/works" className="text-primary hover:underline">featured works</Link>.
          </motion.p>
        </div>

        {/* Stats/Features */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-32">
          {[
            { icon: Users, label: "Happy Clients", value: "200+" },
            { icon: Target, label: "Projects Completed", value: "500+" },
            { icon: Zap, label: "Design Awards", value: "25+" },
            { icon: Award, label: "Years Experience", value: "10+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group"
            >
              <stat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div> */}

        {/* Mission/Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              To empower brands through innovative <Link to="/services" className="text-primary hover:underline">digital solutions</Link> that drive
              meaningful engagement and sustainable growth. We believe in the power
              of design and technology to transform businesses and lives.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              To be the global leader in <Link to="/works" className="text-white hover:text-white transition-colors">digital innovation</Link>, setting new standards
              for creativity, efficiency, and impact in every project we undertake.
              We strive for excellence in everything we do.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-3xl font-bold mb-12 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Constantly exploring new ideas and technologies to stay ahead of the curve."
              },
              {
                title: "Collaboration",
                description: "Working closely with our clients to ensure their vision is brought to life."
              },
              {
                title: "Integrity",
                description: "Building trust through transparency, honesty, and ethical practices."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-10 rounded-3xl bg-white/5 border border-white/10"
              >
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-white/50">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* CTA Section */}
        <div className="mt-32 text-center py-20 border-t border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to transform your digital presence?</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="group flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:scale-105 transition-all"
            >
              Start a Project
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="text-white/60 hover:text-white font-semibold tracking-wider flex items-center gap-2 transition-colors"
            >
              Our Expertise
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
