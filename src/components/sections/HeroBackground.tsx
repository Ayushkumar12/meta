import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    const { viewport } = useThree();

    // Adjust scale based on viewport width (responsive)
    // On small devices (viewport.width < 5), we use a smaller scale
    const isMobile = viewport.width < 5;
    const sphereScale = isMobile ? 0.8 : 1.2;

    useFrame((state) => {
        if (lightRef.current) {
            const t = state.clock.getElapsedTime();
            lightRef.current.intensity = 0.5 + Math.sin(t * 2) * 0.2;
        }
    });

    return (
        <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
            <group>
                <Sphere ref={meshRef} args={[sphereScale, 128, 128]} scale={1}>
                    <MeshDistortMaterial
                        color="#6c63ff"
                        speed={4}
                        distort={0.35}
                        radius={1}
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#301934"
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.9}
                    />
                </Sphere>
                <pointLight ref={lightRef} position={[0, 0, 0.5]} intensity={0.5} color="#00f5c4" />
            </group>
        </Float>
    );
}

function StarField({ count = 2000 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 30;
            p[i * 3 + 1] = (Math.random() - 0.5) * 30;
            p[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return p;
    }, [count]);

    const pointsRef = useRef<THREE.Points>(null);

    useFrame(() => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0008;
            pointsRef.current.rotation.x += 0.0004;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={points}
                    itemSize={3}
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#ffffff"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export function HeroBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={150} color="#6c63ff" />
                <AnimatedSphere />
                <StarField count={2500} />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
