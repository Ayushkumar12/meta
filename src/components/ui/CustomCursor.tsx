"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Set initial state
    gsap.set([cursor, follower], { opacity: 0 });

    const moveCursor = (e: MouseEvent) => {
      // Small dot follows immediately
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        duration: 0.1,
        ease: "power2.out"
      });

      // Larger ring follows with delay
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .group, .cursor-pointer');
      
      if (isInteractive) {
        gsap.to(cursor, {
          scale: 4,
          backgroundColor: "rgba(0, 212, 255, 0.2)",
          duration: 0.3
        });
        gsap.to(follower, {
          scale: 1.5,
          borderColor: "rgba(0, 212, 255, 1)",
          duration: 0.3
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#00D4FF",
          duration: 0.3
        });
        gsap.to(follower, {
          scale: 1,
          borderColor: "rgba(0, 212, 255, 0.3)",
          duration: 0.3
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-[9998]"
      />
    </>
  );
}
