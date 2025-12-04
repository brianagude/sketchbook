"use client";

import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import Scene from "@/components/text-wars/Scene.jsx";

export default function Home() {
  return (
    <main className="fixed inset-0 min-h-screen bg-black">
      <div className="fixed z-10 text-black top-0 left-0 w-full p-4">
        <p>start typing...</p>
      </div>
      <KeyboardControls
        map={[
          { name: 'a', keys: ['a'] },
          { name: 'b', keys: ['b'] },
          { name: 'c', keys: ['c'] },
          { name: 'd', keys: ['d'] },
          { name: 'e', keys: ['e'] },
          { name: 'f', keys: ['f'] },
          { name: 'g', keys: ['g'] },
          { name: 'h', keys: ['h'] },
          { name: 'i', keys: ['i'] },
          { name: 'j', keys: ['j'] },
          { name: 'k', keys: ['k'] },
          { name: 'l', keys: ['l'] },
          { name: 'm', keys: ['m'] },
          { name: 'n', keys: ['n'] },
          { name: 'o', keys: ['o'] },
          { name: 'p', keys: ['p'] },
          { name: 'q', keys: ['q'] },
          { name: 'r', keys: ['r'] },
          { name: 's', keys: ['s'] },
          { name: 't', keys: ['t'] },
          { name: 'u', keys: ['u'] },
          { name: 'v', keys: ['v'] },
          { name: 'w', keys: ['w'] },
          { name: 'x', keys: ['x'] },
          { name: 'y', keys: ['y'] },
          { name: 'z', keys: ['z'] },
          { name: 'surprise', keys: ['Space'] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [10, 12, 6],
          }}
        >
          <Scene />
        </Canvas>
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
