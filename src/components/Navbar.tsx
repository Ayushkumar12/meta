"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "../assets/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Works", href: "/works" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 30);
    setHidden(y > lastY.current && y > 120);
    lastY.current = y;
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled
          ? "py-3 bg-[rgba(5,5,8,0.85)] backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_0_60px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-lg mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-white/5"
          >
            <img src={logo} alt="MetaCode" className="w-full h-full object-cover" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-white">
            Meta<span className="text-primary">Code</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
                  active ? "text-white" : "text-white/50 hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="group flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-full bg-primary text-white transition-all duration-300 hover:shadow-glow-primary hover:scale-105 active:scale-95"
          >
            <span>Start Project</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[rgba(5,5,8,0.97)] backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center justify-between py-3.5 text-lg font-semibold border-b border-white/[0.05] transition-colors",
                      location.pathname === link.href ? "text-primary" : "text-white/70"
                    )}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={18} className="text-white/20" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="mt-4"
              >
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white font-bold rounded-xl text-sm tracking-wide"
                >
                  Start a Project
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
