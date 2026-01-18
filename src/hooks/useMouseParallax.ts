"use client";

import { useState, useEffect, useCallback } from "react";

export const useMouseParallax = (intensity: number = 5) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = ((clientX / innerWidth) - 0.5) * intensity;
    const y = ((clientY / innerHeight) - 0.5) * -intensity;
    
    setRotation({ x, y });
  }, [intensity]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return rotation;
};
