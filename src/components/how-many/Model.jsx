"use client";

import {
  CuboidCollider,
  InstancedRigidBodies,
  RigidBody,
} from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
// import { useGuessStore } from "@/stores/guessGame";

export default function Model() {
  const marbleRef = useRef();
  const rigidBodyRef = useRef();

  const wallThickness = 0.1;
  const wallHeight = 5;
  const wallLength = 5;
  const marbleRadius = wallLength / 20;
  // const marblesInJar = 0;
  // const marblesInJar = useGuessStore((state) => state.increaseTotalMarbles);
  // const totalMarblesCount = useGuessStore((state) => state.totalMarbles)
  
  // const min = 400;
  // const max = 1200;
  // const marblesCount = Math.floor(Math.random() * (max - min + 1)) + min;
  const marblesCount = 2000;

  const marbles = useMemo(() => {
    const instances = [];

    for (let i = 0; i < marblesCount; i++) {
      instances.push({
        key: `instance_${i}`,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }
    return instances;
  }, []);

  // const calculateBalls = () => {
  //   // marblesInJar = 0;
    
  //   if (marbleRef.current) {
  //     const matrix = new THREE.Matrix4();
  //     const position = new THREE.Vector3();

  //     for (let i = 0; i < marblesCount; i++) {
  //       marbleRef.current.getMatrixAt(i, matrix);
  //       position.setFromMatrixPosition(matrix);
  //       // console.log(`Marble ${i}:`, position.x, position.y, position.z);

  //       if (
  //         Math.abs(position.x) < wallLength / 2 &&
  //         position.y > 0 &&
  //         Math.abs(position.z) < wallLength / 2
  //       ) {
  //         marblesInJar()
  //       }
  //     }
  //     console.log(totalMarblesCount);
  //   }
  // };

  useEffect(() => {
    // console.log(marbleRef.current)
    if (marbleRef.current) {
      for (let i = 0; i < marblesCount; i++) {
        const color = new THREE.Color(
          Math.random(), // r
          Math.random(), // g
          Math.random(), //b
        );
        marbleRef.current.setColorAt(i, color);
      }
      marbleRef.current.instanceColor.needsUpdate = true;
    }
  }, []);

  return (
    <>
      {/* marbles */}
      <InstancedRigidBodies
        instances={marbles}
        colliders="ball"
        ref={rigidBodyRef}
        // restitution={1}
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

      {/* Button */}
      {/* <RigidBody type="fixed">
        <mesh
          position={[5, 0.01, 0]}
          rotation-x={-Math.PI / 2}
          onClick={calculateBalls}
        >
          <planeGeometry args={[2, 3]} />
          <meshStandardMaterial color="red" side={2} />
        </mesh>
      </RigidBody> */}

      {/* Container */}
      <RigidBody
        colliders={false}
        mass={1}
        type="fixed"
        position-y={wallHeight / 2}
      >
        {/* back wall */}
        <CuboidCollider
          args={[wallLength / 2, wallHeight / 2, wallThickness / 2]}
          position={[0, 0, -wallLength / 2 + wallThickness / 2]}
        />
        {/* front wall */}
        <CuboidCollider
          args={[wallLength / 2, wallHeight / 2, wallThickness / 2]}
          position={[0, 0, wallLength / 2 - wallThickness / 2]}
        />
        {/* left wall */}
        <CuboidCollider
          args={[wallThickness / 2, wallHeight / 2, wallLength / 2]}
          position={[-wallLength / 2 + wallThickness / 2, 0, 0]}
        />
        {/* right wall */}
        <CuboidCollider
          args={[wallThickness / 2, wallHeight / 2, wallLength / 2]}
          position={[wallLength / 2 - wallThickness / 2, 0, 0]}
        />

        <mesh position={[0.01, 0, -wallLength / 2 + wallThickness / 2]}>
          <planeGeometry args={[wallLength, wallHeight]} />
          <meshStandardMaterial
            transparent
            opacity={0.3}
            color="white"
            side={2}
          />
        </mesh>

        <mesh position={[0.01, 0, wallLength / 2 + wallThickness / 2]}>
          <planeGeometry args={[wallLength, wallHeight]} />
          <meshStandardMaterial
            transparent
            opacity={0.3}
            color="white"
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
            color="white"
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
            color="white"
            side={2}
          />
        </mesh>

        <mesh
          position={[0, -wallHeight / 2 + 0.01, 0]}
          rotation-x={Math.PI / 2}
        >
          <planeGeometry args={[wallLength, wallHeight]} />
          <meshStandardMaterial
            transparent
            opacity={0.3}
            color="white"
            side={2}
          />
        </mesh>
      </RigidBody>

      {/* floor */}
      <RigidBody 
        type="fixed" 
        position-y={-0.25} 
        restitution={1}
				friction={0.7}
      >
        <mesh receiveShadow>
          <boxGeometry args={[20, 0.5, 20]} />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </RigidBody>
    </>
  );
}
