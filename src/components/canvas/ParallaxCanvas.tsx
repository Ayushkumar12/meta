"use client";

import { useEffect, useRef } from "react";
import { ParticleSystem } from "@/lib/canvas";

export function ParallaxCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<ParticleSystem | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (systemRef.current) {
        systemRef.current.resize(canvas.width, canvas.height);
      } else {
        systemRef.current = new ParticleSystem(ctx, canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (systemRef.current) {
        systemRef.current.draw(
          window.scrollY,
          mouseRef.current.x,
          mouseRef.current.y
        );
      }
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-none opacity-80"
    />
  );
}
