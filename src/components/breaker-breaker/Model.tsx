"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Model() {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const floor1Material = new THREE.MeshStandardMaterial({ color: "light" });
  const boxMaterial = new THREE.MeshStandardMaterial({ color: "pink" });

  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;

    // console.log(state)
  });

  return (
    <>
      <mesh ref={meshRef} geometry={boxGeometry} material={boxMaterial} />
      <mesh position={[0, -0.1, 0]} scale={[4, 0.2, 4]}>
        <boxGeometry />
        <meshStandardMaterial color="lightgreen" />
      </mesh>
    </>
  );
}
