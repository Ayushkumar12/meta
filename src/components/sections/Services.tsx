"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const services = [
  {
    title: "Frontend Development",
    desc: "Crafting immersive user interfaces with React, Framer Motion, and modern CSS for seamless web experiences.",
    icon: BoxIcon,
  },
  {
    title: "Backend Development",
    desc: "Building robust architectures and scalable APIs using Node.js, Express, and high-performance databases.",
    icon: NeuralIcon,
  },
  {
    title: "Full Stack Development",
    desc: "Scalable and secure cloud infrastructure.",
    icon: CloudIcon,
  },
  {
    title: "Mobile",
    desc: "High-performance cross-platform mobile apps.",
    icon: MobileIcon,
  },
  {
    title: "Blockchain",
    desc: "Decentralized solutions for a transparent future.",
    icon: ChainIcon,
  },
  {
    title: "Cybersecurity",
    desc: "Protecting your digital assets with advanced security.",
    icon: ShieldIcon,
  },
];

function BoxIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime();
      meshRef.current.rotation.y = state.clock.getElapsedTime();
    }
  });
  return (
    <Box ref={meshRef} args={[1, 1, 1]}>
      <meshStandardMaterial color="#00D4FF" wireframe />
    </Box>
  );
}

function NeuralIcon() {
  return (
    <Sphere args={[1, 32, 32]}>
      <MeshDistortMaterial
        color="#FF6B6B"
        speed={5}
        distort={0.5}
        radius={1}
      />
    </Sphere>
  );
}

function CloudIcon() {
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[0.8, 16, 16]}>
        <meshStandardMaterial color="#ffffff" wireframe opacity={0.5} transparent />
      </Sphere>
    </Float>
  );
}

function MobileIcon() {
  return (
    <Box args={[0.6, 1.2, 0.1]}>
      <meshStandardMaterial color="#00D4FF" />
    </Box>
  );
}

function ChainIcon() {
  return (
    <Box args={[0.5, 0.5, 0.5]}>
      <meshStandardMaterial color="#FF6B6B" wireframe />
    </Box>
  );
}

function ShieldIcon() {
  return (
    <Sphere args={[0.7, 4, 4]}>
      <meshStandardMaterial color="#ffffff" wireframe />
    </Sphere>
  );
}

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Pinning effect for the title
      gsap.to(".services-title-wrapper", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 px-4 bg-background overflow-hidden">
      <div className="services-title-wrapper w-full flex justify-center z-10 mb-24">
        <h2 className="services-title text-4xl md:text-6xl font-black text-center">
          OUR CORE SERVICES
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-20">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="service-card glass p-8 rounded-3xl group hover:border-primary/50 transition-colors"
            >
              <div className="h-40 w-full mb-6">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Icon />
                </Canvas>
              </div>
              <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
