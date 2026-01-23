import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <Helmet>
          
        <meta property="title" content="MetaCode | Future Digital Solutions - Premium Tech Agency" />


        <meta property="og:title" content="MetaCode | Future Digital Solutions - Premium Tech Agency"/>

        <meta name="robots" content="index, follow" />

        <meta name="url" content="https://metacode.co.in/about" />

        <meta
          name="identifier-url"
          content="https://metacode.co.in/about"
        />

        <meta name="revisit-after" content="1 days" />

        <meta name="googlebot" content="index, follow" />

        <link
          rel="canonical"
          href="https://metacode.co.in/"
        />

        <meta name="bingbot" content="index, follow" />

        
      </Helmet>
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
              To empower brands through innovative digital solutions that drive
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
              To be the global leader in digital innovation, setting new standards
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
      </div>
    </div>
  );
}
