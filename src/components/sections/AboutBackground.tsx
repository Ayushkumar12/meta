import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, Sphere } from "@react-three/drei";

function ArchitecturalElements() {
    // floating elements don't need viewport for current implementation

    // Create a grid of small, floating spheres or boxes that react to the mouse
    const count = 20;
    const positions = useMemo(() => {
        const p = [];
        for (let i = 0; i < count; i++) {
            p.push({
                pos: [
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 10
                ],
                scale: Math.random() * 0.5 + 0.1,
                speed: Math.random() * 0.5 + 0.2
            });
        }
        return p;
    }, []);

    return (
        <group>
            {positions.map((item, i) => (
                <Float key={i} speed={item.speed} rotationIntensity={1} floatIntensity={2}>
                    <Sphere position={item.pos as any} scale={item.scale}>
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#6c63ff" : "#00f5c4"}
                            emissive={i % 2 === 0 ? "#301934" : "#003b30"}
                            emissiveIntensity={0.5}
                            roughness={0}
                            metalness={1}
                        />
                    </Sphere>
                </Float>
            ))}
        </group>
    );
}

function GridBackground() {
    return (
        <group rotation={[Math.PI / 4, 0, 0]}>
            <gridHelper args={[40, 40, "#1a1a1a", "#0d0d0d"]} position={[0, -5, 0]} />
            <gridHelper args={[40, 40, "#1a1a1a", "#0d0d0d"]} position={[0, 5, 0]} rotation={[Math.PI, 0, 0]} />
        </group>
    );
}

export function AboutBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#6c63ff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00f5c4" />
                <ArchitecturalElements />
                <GridBackground />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
