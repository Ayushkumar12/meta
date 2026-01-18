"use client";

import { useEffect, useRef, useCallback } from "react";

export interface LayerConfig {
  depth: number; // 0.1 to 2.0
  count: number;
  color: string;
  type: "particle" | "shape" | "node" | "line" | "glow";
  speedMultiplier: number;
}

export const useCanvasParallax = (layers: LayerConfig[]) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number>(0);
  const entitiesRef = useRef<any[]>([]);

  const initEntities = useCallback((width: number, height: number) => {
    entitiesRef.current = layers.map((layer) => {
      return Array.from({ length: layer.count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        layer,
        phase: Math.random() * Math.PI * 2,
      }));
    });
  }, [layers]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initEntities(canvas.width, canvas.height);
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth mouse movement
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;

      entitiesRef.current.forEach((layerEntities, index) => {
        const layer = layers[index];
        ctx.beginPath();
        ctx.fillStyle = layer.color;
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = 0.5;

        layerEntities.forEach((entity: any) => {
          // Parallax calculation
          const scrollOffset = scrollRef.current * layer.speedMultiplier;
          const mouseOffsetX = (mouseRef.current.x - canvas.width / 2) * layer.depth * 0.05;
          const mouseOffsetY = (mouseRef.current.y - canvas.height / 2) * layer.depth * 0.05;

          let drawX = entity.x + mouseOffsetX;
          let drawY = (entity.y - scrollOffset + mouseOffsetY) % canvas.height;
          if (drawY < 0) drawY += canvas.height;

          if (layer.type === "line" && index > 0) {
            // Draw connections to previous layer nodes
            const prevEntity = entitiesRef.current[index - 1][0];
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(prevEntity.x, prevEntity.y);
          } else if (layer.type === "shape") {
            ctx.rect(drawX, drawY, entity.size * 2, entity.size * 2);
          } else {
            ctx.arc(drawX, drawY, entity.size, 0, Math.PI * 2);
          }
        });

        layer.type === "line" ? ctx.stroke() : ctx.fill();
      });

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [layers, initEntities]);

  return canvasRef;
};
