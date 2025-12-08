"use client";

import {
  CuboidCollider,
  InstancedRigidBodies,
  RigidBody,
} from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useGuessStore } from "@/stores/guessGame";

export default function Model() {
  const marbleRef = useRef();
  const rigidBodyRef = useRef();
  const setActualCount = useGuessStore((s) => s.setActualCount);

  const wallThickness = 0.1;
  const wallHeight = 13;
  const wallLength = 13;
  const marbleRadius = wallLength / 20;

  // Generate random count once
  const marblesCount = useMemo(() => {
    const min = 400;
    const max = 1200;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  // Generate marble positions once
  const marbles = useMemo(() => {
    const instances = [];
    for (let i = 0; i < marblesCount; i++) {
      instances.push({
        key: `instance_${i}`,
        position: [
          (Math.random() - 0.5) * 4, // Smaller spread to fit in jar
          6 + i * 0.2,
          (Math.random() - 0.5) * 4,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }
    return instances;
  }, [marblesCount]);

  // Set the actual count in the store once
  useEffect(() => {
    setActualCount(marblesCount);
  }, [marblesCount, setActualCount]);

  // Set random colors
  useEffect(() => {
    if (marbleRef.current) {
      for (let i = 0; i < marblesCount; i++) {
        const color = new THREE.Color(
          Math.random(),
          Math.random(),
          Math.random()
        );
        marbleRef.current.setColorAt(i, color);
      }
      marbleRef.current.instanceColor.needsUpdate = true;
    }
  }, [marblesCount]);

  return (
    <>
      {/* marbles */}
      <InstancedRigidBodies
        instances={marbles}
        colliders="ball"
        ref={rigidBodyRef}
      >
        <instancedMesh
          castShadow
          receiveShadow
          args={[null, null, marblesCount]}
          ref={marbleRef}
        >
          <sphereGeometry args={[marbleRadius, 32, 16]} />
          <meshStandardMaterial roughness={0} metalness={0.5} />
        </instancedMesh>
      </InstancedRigidBodies>

      {/* Container - same as yours */}
      <RigidBody
        colliders={false}
        mass={1}
        type="fixed"
        position-y={wallHeight / 2}
      >
        <CuboidCollider
          args={[wallLength / 2, wallHeight / 2, wallThickness / 2]}
          position={[0, 0, -wallLength / 2 + wallThickness / 2]}
        />
        <CuboidCollider
          args={[wallLength / 2, wallHeight / 2, wallThickness / 2]}
          position={[0, 0, wallLength / 2 - wallThickness / 2]}
        />
        <CuboidCollider
          args={[wallThickness / 2, wallHeight / 2, wallLength / 2]}
          position={[-wallLength / 2 + wallThickness / 2, 0, 0]}
        />
        <CuboidCollider
          args={[wallThickness / 2, wallHeight / 2, wallLength / 2]}
          position={[wallLength / 2 - wallThickness / 2, 0, 0]}
        />

        {/* Visual walls */}
        <mesh position={[0, 0, -wallLength / 2 + wallThickness / 2]}>
          <planeGeometry args={[wallLength, wallHeight]} />
          <meshStandardMaterial
            transparent
            opacity={0.3}
            color="pink"
            side={2}
          />
        </mesh>
        <mesh position={[0, 0, wallLength / 2 + wallThickness / 2]}>
          <planeGeometry args={[wallLength, wallHeight]} />
          <meshStandardMaterial
            transparent
            opacity={0.3}
            color="orange"
            side={2}
          />
        </mesh>
        <mesh
          position={[-wallLength / 2 + wallThickness / 2, 0, 0]}
          rotation-y={Math.PI / 2}
        >
          <planeGeometry args={[wallLength, wallHeight]} />
          <meshStandardMaterial
            transparent
            opacity={0.3}
            color="green"
            side={2}
          />
        </mesh>
        <mesh
          position={[wallLength / 2 + wallThickness / 2, 0, 0]}
          rotation-y={Math.PI / 2}
        >
          <planeGeometry args={[wallLength, wallHeight]} />
          <meshStandardMaterial
            transparent
            opacity={0.3}
            color="blue"
            side={2}
          />
        </mesh>
        <mesh
          position={[0, -wallHeight / 2 + 0.01, 0]}
          rotation-x={Math.PI / 2}
        >
          <planeGeometry args={[wallLength, wallLength]} />
          <meshStandardMaterial
            transparent
            opacity={0.3}
            color="white"
            side={2}
          />
        </mesh>
      </RigidBody>

      {/* floor */}
      <RigidBody type="fixed" position-y={-0.25} restitution={1} friction={0.7}>
        <mesh receiveShadow>
          <boxGeometry args={[40, 2, 40]} />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </RigidBody>
    </>
  );
}