"use client";

import { Text3D, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";
import { Snow } from "@/components/hangman/Snow";
import { useHangman } from "@/stores/hangman";

export default function Model() {
  const keys = useKeyboardControls((state) => state);
  const phase = useHangman((s) => s.phase);
  const start = useHangman((s) => s.start);
  const end = useHangman((s) => s.end);
  const strikes = useHangman((s) => s.strikes);
  const guesses = useHangman((s) => s.guesses);
  const increaseStrikes = useHangman((s) => s.increaseStrikes);
  const word = useHangman((s) => s.word);
  const addGuess = useHangman((s) => s.addGuess);
  const droppedLetters = useHangman((s) => s.droppedLetters);
  const addDroppedLetters = useHangman((s) => s.addDroppedLetters);

  useEffect(() => {
    if (phase === "ready") {
      start();
    }

    if (strikes === 5) {
      end();
    }
  }, [phase, strikes]);

  useEffect(() => {
    if (phase !== "ended") {
      Object.keys(keyToLetter).forEach((key) => {
        if (keys[key] && !guesses.includes(key)) {
          const letter = keyToLetter[key];

          const newLetter = {
            id: Date.now() + Math.random(),
            letter: letter,
            position: [Math.random() * 10 - 5, 10, Math.random() * 10 - 5],
          };

          addGuess(key);
          addDroppedLetters(newLetter);

          if (!word.includes(letter)) {
            increaseStrikes();
          }
        }
      });
    }
  }, [keys, word, phase]);

  return (
    <>
      {droppedLetters.map((item) => (
        <Letter key={item.id} position={item.position} letter={item.letter} />
      ))}

      <Snow/>

      {/* floor */}
      <RigidBody type="fixed" position-y={-0.25} restitution={1} friction={0.7}>
        <mesh receiveShadow>
          <boxGeometry args={[20, 0.5, 20]} />
          <meshStandardMaterial
            color="#FFFAFA"
            // color="#0f172a"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </RigidBody>
    </>
  );
}

const keyToLetter = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E",
  f: "F",
  g: "G",
  h: "H",
  i: "I",
  j: "J",
  k: "K",
  l: "L",
  m: "M",
  n: "N",
  o: "O",
  p: "P",
  q: "Q",
  r: "R",
  s: "S",
  t: "T",
  u: "U",
  v: "V",
  w: "W",
  x: "X",
  y: "Y",
  z: "Z",
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
