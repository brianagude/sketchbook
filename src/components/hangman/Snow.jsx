import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useHangman } from "@/stores/hangman";

export function Snow() {
  const pointsRef = useRef();
  const strikes = useHangman((s) => s.strikes);
  const PARTICLE_COUNT = 2000;
  const intensity = 1 + (strikes * 0.3);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 20; // x
      arr[i * 3 + 1] = Math.random() * 15; // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    
    const pos = pointsRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      
      // Fall speed increases with strikes
      pos[idx + 1] -= 0.03 * intensity;
      
      // Add slight horizontal drift
      pos[idx + 0] += Math.sin(Date.now() * 0.001 + i) * 0.002;
      
      // Reset to top when hitting ground
      if (pos[idx + 1] < 0) {
        pos[idx + 0] = (Math.random() - 0.5) * 20;
        pos[idx + 1] = Math.random() * 5 + 10;
        pos[idx + 2] = (Math.random() - 0.5) * 20;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="white"
        opacity={0.4 + (strikes * 0.1)} // More visible as you lose
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}