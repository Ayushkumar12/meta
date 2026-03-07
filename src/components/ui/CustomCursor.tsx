"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Disable entirely on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

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
        opacity: isHoveringRef.current ? 0 : 1,
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

      // Check for magnetic elements (buttons, links, or marked with 'data-magnetic')
      const magneticElement = target.closest('button, a, .group, .cursor-pointer, [data-magnetic]') as HTMLElement;

      if (magneticElement) {
        isHoveringRef.current = true;

        // Expand follower
        gsap.to(follower, {
          scale: 1.5,
          borderColor: "rgba(0, 212, 255, 1)",
          backgroundColor: "rgba(0, 212, 255, 0.1)",
          duration: 0.3,
          ease: "power2.out"
        });

        // Hide cursor dot
        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.2
        });

      } else {
        isHoveringRef.current = false;

        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          backgroundColor: "#00D4FF",
          duration: 0.3
        });

        gsap.to(follower, {
          scale: 1,
          borderColor: "rgba(0, 212, 255, 0.3)",
          backgroundColor: "transparent",
          duration: 0.3,
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
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-[9998] hidden md:block"
      />
    </>
  );
}

