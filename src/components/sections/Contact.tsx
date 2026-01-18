"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Send, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-content", {
        opacity: 0,
        y: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
    }, 2000);
  };

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full flex-grow">
        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8">LET'S BUILD SOMETHING GREAT</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-md">
              Have a visionary project in mind? Our team is ready to bring your most ambitious ideas to life.
            </p>

            <div className="flex gap-6">
              {[
                { Icon: Github, href: "https://github.com/Meta-Code-1" },
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Instagram, href: "https://instagram.com" }
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: "#00D4FF" }}
                  className="w-12 h-12 glass rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="glass p-10 rounded-3xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {formState !== "success" ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-bold tracking-widest uppercase text-gray-400">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold tracking-widest uppercase text-gray-400">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold tracking-widest uppercase text-gray-400">Message</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <Button
                    className="w-full"
                    variant="primary"
                    onClick={() => { }} // Form handled by onSubmit
                  >
                    {formState === "submitting" ? "SENDING..." : "SEND MESSAGE"}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4">
                    <Send size={40} />
                  </div>
                  <h3 className="text-3xl font-black">MESSAGE SENT!</h3>
                  <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setFormState("idle")}>
                    Send Another
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  );
}
