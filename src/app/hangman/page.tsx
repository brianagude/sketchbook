"use client";

import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import Interface from "@/components/hangman/Interface";
import Scene from "@/components/hangman/Scene.jsx";

export default function Home() {
  return (
    <main className="fixed inset-0 min-h-screen bg-[#878891]">
      <KeyboardControls
        map={[
          { name: "a", keys: ["a"] },
          { name: "b", keys: ["b"] },
          { name: "c", keys: ["c"] },
          { name: "d", keys: ["d"] },
          { name: "e", keys: ["e"] },
          { name: "f", keys: ["f"] },
          { name: "g", keys: ["g"] },
          { name: "h", keys: ["h"] },
          { name: "i", keys: ["i"] },
          { name: "j", keys: ["j"] },
          { name: "k", keys: ["k"] },
          { name: "l", keys: ["l"] },
          { name: "m", keys: ["m"] },
          { name: "n", keys: ["n"] },
          { name: "o", keys: ["o"] },
          { name: "p", keys: ["p"] },
          { name: "q", keys: ["q"] },
          { name: "r", keys: ["r"] },
          { name: "s", keys: ["s"] },
          { name: "t", keys: ["t"] },
          { name: "u", keys: ["u"] },
          { name: "v", keys: ["v"] },
          { name: "w", keys: ["w"] },
          { name: "x", keys: ["x"] },
          { name: "y", keys: ["y"] },
          { name: "z", keys: ["z"] },
          { name: "space", keys: ["Space"] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            position: [5, 12, 5],
          }}
        >
          <Scene />
        </Canvas>
        <Interface />
      </KeyboardControls>
      <Link
        href="/"
        className="fixed z-10 bottom-4 right-4 text-black hover:underline"
      >
        Home
      </Link>
    </main>
  );
}
