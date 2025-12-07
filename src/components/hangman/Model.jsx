"use client";

import { Text3D, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Snow } from "@/components/hangman/Snow";
import { useHangman } from "@/stores/hangman";

export default function Model() {
  const keys = useKeyboardControls((state) => state);
  const phase = useHangman((s) => s.phase);
  const restart = useHangman((s) => s.restart);
  const end = useHangman((s) => s.end);
  const strikes = useHangman((s) => s.strikes);
  const maxStrikes = useHangman((s) => s.maxStrikes);
  const addGuess = useHangman((s) => s.addGuess);
  const droppedLetters = useHangman((s) => s.droppedLetters);
  const addDroppedLetter = useHangman((s) => s.addDroppedLetter);

  // Track which keys were already pressed to prevent duplicates
  const pressedKeys = useRef(new Set());

  useEffect(() => {
    if (keys.space && (phase === "playing" || phase === "ended" || phase === "won")) {
      restart();
    }
  }, [keys.space, phase, restart]);

  useEffect(() => {
    if (strikes >= maxStrikes && phase === "playing") {
      end();
    }
  }, [strikes, maxStrikes, phase, end]);

  // Handle letter key presses
  useEffect(() => {
    Object.keys(keyToLetter).forEach((key) => {
      const isPressed = keys[key];
      const wasPressed = pressedKeys.current.has(key);

      if (isPressed && !wasPressed) {
        pressedKeys.current.add(key);
        
        const letter = keyToLetter[key];
        
        const newLetter = {
          id: `${Date.now()}-${Math.random()}`,
          letter: letter,
          position: [Math.random() * 10 - 5, 10, Math.random() * 10 - 5],
        };
        addDroppedLetter(newLetter);
        
        addGuess(key);
      }
      
      if (!isPressed && wasPressed) {
        pressedKeys.current.delete(key);
      }
    });
  }, [keys, addGuess, addDroppedLetter]);

  return (
    <>
      {droppedLetters.map((item) => (
        <Letter key={item.id} position={item.position} letter={item.letter} />
      ))}

      {phase === "ended" && (
        <Letter position={[-3, 15, 2]} letter="YOU LOSE" />
      )}
      
      {phase === "won" && (
        <Letter position={[-2.5, 15, 2]} letter="YOU WIN!" />
      )}

      <Snow />

      <RigidBody type="fixed" position-y={-0.25} restitution={1} friction={0.7}>
        <mesh receiveShadow>
          <boxGeometry args={[20, 0.5, 20]} />
          <meshStandardMaterial
            color="#FFFAFA"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </RigidBody>
    </>
  );
}

const keyToLetter = {
  a: "A", b: "B", c: "C", d: "D", e: "E", f: "F", g: "G",
  h: "H", i: "I", j: "J", k: "K", l: "L", m: "M", n: "N",
  o: "O", p: "P", q: "Q", r: "R", s: "S", t: "T", u: "U",
  v: "V", w: "W", x: "X", y: "Y", z: "Z",
};

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