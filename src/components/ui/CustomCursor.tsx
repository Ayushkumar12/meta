"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isStuckRef = useRef(false);

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
        opacity: isStuckRef.current ? 0 : 1,
        duration: 0.1,
        ease: "power2.out"
      });

      // If stuck, don't move the follower with mouse (it's fixed to the element)
      if (isStuckRef.current) return;

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
        isStuckRef.current = true;

        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Move follower to center of element
        gsap.to(follower, {
          x: centerX,
          y: centerY,
          scale: 1.5,
          borderColor: "rgba(0, 212, 255, 1)",
          borderRadius: "50%",
          duration: 0.3,
          ease: "back.out(1.7)"
        });

        // Hide cursor dot
        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.2
        });

      } else {
        isStuckRef.current = false;

        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          backgroundColor: "#00D4FF",
          duration: 0.3
        });

        gsap.to(follower, {
          scale: 1,
          borderColor: "rgba(0, 212, 255, 0.3)",
          duration: 0.3,
        });
      }
    };

    // Magnetic pull effect on mouse move over active elements needs separate logic
    // But for now, let's keep it simple: Expand ring on hover.

    // We already have `handleHover` for `mouseover`. 
    // Let's just enhance the `mouseover` part. The "magnetic" stickiness is complex to add without per-element listeners.
    // So let's just make the visual feedback stronger.

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
        className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-[9998] transition-transform duration-100 ease-out"
      />
    </>
  );
}
