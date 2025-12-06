"use client";

import { Text3D, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";
import * as THREE from 'three';

function Letter(props) {
  return (
    <RigidBody position={props.position}>
  <Text3D
    font="/fonts/krona_one_reg.json"
    size={1}
    height={0.5}
    curveSegments={12}
    bevelEnabled
    bevelThickness={0.02}
    bevelSize={0.02}
    bevelOffset={0}
    bevelSegments={5}
    receiveShadow
    castShadow
  >
    {props.letter}
    <meshPhysicalMaterial
      color="#e0f2ff"
      roughness={0.05}
      metalness={0}
      transmission={1}
      thickness={1}
      ior={1.31}
      transparent={true}
      opacity={1}
      clearcoat={1}
      clearcoatRoughness={0.1}
      iridescence={0.5}
      iridescenceIOR={1.3}
      iridescenceThicknessRange={[100, 400]}
    />
  </Text3D>
</RigidBody>
  );
}

export default function Model() {
  const [droppedLetters, setDroppedLetters] = useState([]);
  const keys = useKeyboardControls((state) => state);
  
// const 
  const keyToLetter = {
    a: 'A', b: 'B', c: 'C', d: 'D', e: 'E', f: 'F', g: 'G', h: 'H',
    i: 'I', j: 'J', k: 'K', l: 'L', m: 'M', n: 'N', o: 'O', p: 'P',
    q: 'Q', r: 'R', s: 'S', t: 'T', u: 'U', v: 'V', w: 'W', x: 'X',
    y: 'Y', z: 'Z', surprise: 'get boba!'
  };

  useEffect(() => {
    Object.keys(keyToLetter).forEach(key => {
      if (keys[key]) {
        // const currentColor = new THREE.Color([1, Math.random() * 100, Math.random() * 100 + 100])

        const newLetter = {
          id: Date.now() + Math.random(),
          letter: keyToLetter[key],
          position: [Math.random() * 20 - 10, 10, Math.random() * 20 - 10],
          // color
        };
        setDroppedLetters(prev => [...prev, newLetter]);
      }
    });
  }, [keys]);

  return (
    <>
      {droppedLetters.map(item => (
        <Letter 
          key={item.id} 
          position={item.position} 
          letter={item.letter} 
        />
      ))}

      {/* floor */}
      <RigidBody type="fixed" position-y={-0.25} restitution={1} friction={0.7}>
        <mesh receiveShadow>
          <boxGeometry args={[20, 0.5, 20]} />
          <meshStandardMaterial 
            color="#0f172a" 
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </RigidBody>
    </>
  );
}
