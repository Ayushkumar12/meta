"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Instagram, Mail, CheckCircle, Send } from "lucide-react";
import { contactApi } from "@/lib/api";

const socials = [
  { Icon: Github, href: "https://github.com/Meta-Code-1", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/metacode10/", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com/ayushkumar_112003/", label: "Instagram" },
  { Icon: Mail, href: "mailto:info@metacode.co.in", label: "Email" },
];

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const formDataWeb3 = new FormData(e.currentTarget);
    formDataWeb3.append("access_key", "7d3307ab-a315-408f-b2a7-820ad6226450");

    try {
      await Promise.all([
        contactApi.submit({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formDataWeb3
        })
      ]);

      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormState("idle");
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative section-padding-lg overflow-hidden bg-[#050508]"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-[50%] opacity-[0.06] blur-[200px]"
          style={{ background: "radial-gradient(ellipse, #6c63ff, transparent 70%)" }}
        />
        <div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00f5c4, transparent)" }}
        />
      </div>

      <div className="container-lg relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill mb-8">Get in Touch</div>
            <h2 className="display-md text-white mb-6 leading-[0.95]">
              Let's build{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6c63ff, #00f5c4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                something
              </span>
              <br />
              great together.
            </h2>
            <p className="text-lg text-white/40 leading-relaxed mb-10 max-w-md">
              Have a{" "}
              <Link to="/works" className="text-white/70 hover:text-primary transition-colors">
                visionary project
              </Link>{" "}
              in mind? Our team is ready to bring your most ambitious ideas to life — fast.
            </p>

            {/* Contact Info */}
            <div className="space-y-5 mb-12">
              {[
                { label: "Email", value: "info@metacode.co.in", href: "mailto:info@metacode.co.in" },
                { label: "Phone", value: "+91 8800767093", href: "tel:+918800767093" },
                { label: "Location", value: "Sector-44, Noida, India", href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="label-sm text-white/25 w-20 shrink-0 pt-px">{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/60 hover:text-primary transition-colors font-medium link-underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white/60 font-medium">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 hover:bg-primary/[0.06] transition-all duration-300"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative p-8 md:p-10 rounded-3xl bg-white/[0.025] border border-white/[0.07] overflow-hidden">
              {/* Card glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-60"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.07), transparent 60%)" }}
              />

              <AnimatePresence mode="wait">
                {formState !== "success" ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    onSubmit={handleSubmit}
                    className="relative z-10 space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="label-sm text-white/30 block">Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="form-input"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="label-sm text-white/30 block">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-input"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="label-sm text-white/30 block">Your Project</label>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="form-input resize-none"
                        placeholder="Tell us about your project, timeline, and goals..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={formState === "submitting"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-primary text-white font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 disabled:opacity-60 hover:shadow-glow-primary"
                    >
                      <span className="relative z-10">
                        {formState === "submitting" ? "Sending..." : "Send Message"}
                      </span>
                      <Send
                        size={15}
                        className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                      {/* Shimmer */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </motion.button>

                    <p className="text-xs text-white/20 text-center">
                      We'll respond within 24 hours. No spam, ever.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 text-center py-12 space-y-5"
                  >
                    <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                      <CheckCircle size={36} className="text-accent" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Message Sent!</h3>
                    <p className="text-white/40 max-w-xs mx-auto">
                      We got your message and will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-white/10 text-sm text-white/50 hover:text-white hover:border-white/20 transition-all duration-300"
                    >
                      Send Another
                      <ArrowUpRight size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
