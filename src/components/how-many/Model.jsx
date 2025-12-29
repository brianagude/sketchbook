"use client";

import { useTexture } from "@react-three/drei";
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

  const palette = ['#F2BAC9', '#F1D302', '#5DB7DE', '#CC5803', '#134611']

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
        // const color = new THREE.Color(
        //   Math.random(),
        //   Math.random(),
        //   Math.random(),
        // );
        // marbleRef.current.setColorAt(i, color);
        marbleRef.current.setColorAt(i, new THREE.Color(palette[Math.floor(Math.random() * palette.length)]))
      }
      marbleRef.current.instanceColor.needsUpdate = true;
    }
  }, [marblesCount]);

  // Floor texture map
  const floorTexture = useTexture(
    {
      map: '/textures/wood_table_arm_1k.jpg',
      displacementMap: '/textures/wood_table_arm_1k.jpg',
      normalMap: '/textures/wood_table_arm_1k.jpg',
      roughnessMap: '/textures/wood_table_arm_1k.jpg',
      aoMap: '/textures/wood_table_arm_1k.jpg',
      metalnessMap: '/textures/wood_table_arm_1k.jpg',
    },
    (textures) => {
      Object.values(textures).forEach((texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        texture.colorSpace = THREE.SRGBColorSpace;
      });
    }
  );

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
          <meshPhysicalMaterial transmission={0.9} thickness={0.5} roughness={0.05} />
          {/* <meshStandardMaterial transparent opacity={0.9} roughness={0.05} metalness={0.5} /> */}

        </instancedMesh>
      </InstancedRigidBodies>

      {/* Container */}
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
        {/* Back wall */}
        <mesh position={[0, 0, -wallLength / 2]}>
          {/* <planeGeometry args={[wallLength, wallHeight]} /> */}
          {/* <meshStandardMaterial transparent opacity={0.3} color="white" side={2} /> */}
          <boxGeometry args={[wallLength, wallHeight, 0.1]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.15}
            roughness={0.05}
            metalness={0}
            side={2}
            color="white"
          />

          {/* <meshPhysicalMaterial 
            transmission={1} 
            thickness={0.05} 
            roughness={0.1}
            side={2}
            color="white"
          /> */}
        </mesh>

        {/* Front wall */}
        <mesh position={[0, 0, wallLength / 2]}>
          <boxGeometry args={[wallLength, wallHeight, 0.1]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.15}
            roughness={0.05}
            metalness={0}
            side={2}
            color="white"
          />
        </mesh>

        {/* Left wall */}
        <mesh position={[-wallLength / 2, 0, 0]} rotation-y={Math.PI / 2}>
          <boxGeometry args={[wallLength, wallHeight, 0.1]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.15}
            roughness={0.05}
            metalness={0}
            side={2}
            color="white"
          />
        </mesh>

        {/* Right wall */}
        <mesh position={[wallLength / 2, 0, 0]} rotation-y={Math.PI / 2}>
          <boxGeometry args={[wallLength, wallHeight, 0.1]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.15}
            roughness={0.05}
            metalness={0}
            side={2}
            color="white"
          />
        </mesh>
      </RigidBody>

      {/* floor */}
      <RigidBody type="fixed" position-y={-0.25} restitution={1} friction={0.7}>
        <mesh receiveShadow>
          <boxGeometry args={[40, 0.5, 40]} />
          <meshStandardMaterial 
            {...floorTexture}
            displacementScale={0}
            color="#3d2817"
          />
        </mesh>
      </RigidBody>
    </>
  );
}