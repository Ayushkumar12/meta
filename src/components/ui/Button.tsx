"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
}

export function Button({ children, className, onClick, variant = "primary" }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-8 py-4 rounded-full font-bold transition-all relative overflow-hidden group",
        variant === "primary" && "bg-primary text-background",
        variant === "secondary" && "bg-secondary text-white",
        variant === "outline" && "border-2 border-primary text-primary hover:bg-primary hover:text-background",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      />
    </motion.button>
  );
}
