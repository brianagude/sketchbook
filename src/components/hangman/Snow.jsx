import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { useHangman } from "@/stores/hangman";

export function Snow() {
  const pointsRef = useRef();

  const strikes = useHangman((s) => s.strikes);
  const snowCount = useHangman((s) => s.snowCount);
  const increaseSnowCount = useHangman((s) => s.increaseSnowCount);

  const positions = useMemo(() => {
    const arr = new Float32Array(snowCount * 3);
    for (let i = 0; i < snowCount; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 20; // x
      arr[i * 3 + 1] = Math.random() * 10 + 5; // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return arr;
  }, [snowCount]);

  // Animate snow falling
  useFrame(() => {
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < snowCount; i++) {
      pos[i * 3 + 1] -= 0.05;

      if (pos[i * 3 + 1] < 0) {
        pos[i * 3 + 1] = Math.random() * 10 + 5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(()=> {
    increaseSnowCount()
  }, [strikes])

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="white"
        opacity={0.5}
        size={0.1}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}
