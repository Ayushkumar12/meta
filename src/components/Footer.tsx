"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.png";

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Works", href: "/works" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Frontend Development", href: "/services/Frontend-Development" },
    { name: "Backend Development", href: "/services/backend-development" },
    { name: "Full Stack Development", href: "/services/full-stack-development" },
    { name: "Mobile App Dev", href: "/services/mobile-app-development" },
    { name: "Web Design", href: "/services/web-design" },
  ],
  social: [
    { name: "GitHub", icon: Github, href: "https://github.com/Meta-Code-1" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/metacode10/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/ayushkumar_112003/" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#050508] overflow-hidden">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.4), rgba(0,245,196,0.3), transparent)" }}
      />

      {/* CTA Banner */}
      <div className="relative border-b border-white/[0.05] py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-[50%] blur-[150px] opacity-[0.07]"
          style={{ background: "radial-gradient(ellipse, #6c63ff, transparent)" }}
        />
        <div className="container-lg relative z-10 text-center">
          <h2
            className="font-black text-white mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
          >
            Let's Create the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6c63ff, #00f5c4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Future
            </span>
            .
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-primary rounded-full text-white font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-glow-primary hover:scale-105 active:scale-95"
          >
            Start a Project
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-lg py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <motion.div
                whileHover={{ rotate: -5, scale: 1.05 }}
                className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 bg-white/5"
              >
                <img src={logo} alt="MetaCode" className="w-full h-full object-cover" />
              </motion.div>
              <span className="text-xl font-bold text-white">
                Meta<span className="text-primary">Code</span>
              </span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Pushing the boundaries of digital experiences through innovative design and cutting-edge technology.
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  <item.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-6">Company</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/35 hover:text-primary transition-colors duration-300 link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-6">Services</h4>
            <ul className="space-y-3.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/35 hover:text-primary transition-colors duration-300 link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/35">
                <MapPin className="text-primary shrink-0 mt-0.5" size={15} />
                <span>Sector-44 Noida, Gautam Budh Nagar 201301</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/35">
                <Phone className="text-primary shrink-0" size={15} />
                <a href="tel:+918800767093" className="hover:text-primary transition-colors">+91 8800767093</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/35">
                <Mail className="text-primary shrink-0" size={15} />
                <a href="mailto:info@metacode.co.in" className="hover:text-primary transition-colors">
                  info@metacode.co.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} MetaCode Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
