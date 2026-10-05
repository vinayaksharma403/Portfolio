"use client";

import { Canvas } from "@react-three/fiber";
import { Model } from "./Astronaut";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function AstronautScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full">
      <Canvas>
        <Model
          scale={1.75}
          rotation={[0.75, Math.PI - 0.45, -0.8]}
          position={[1.5, -0.9, 1]}
        />

        <OrbitControls
          minDistance={4}
          maxDistance={8}
          minPolarAngle={0.6}
          maxPolarAngle={2.4}
          minAzimuthAngle={-0.8}
          maxAzimuthAngle={1}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}