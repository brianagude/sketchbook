"use client";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import Experience from "@/components/Experience.jsx";
import Interface from "@/components/Interface.jsx";

export default function Page() {
  return (
    <main className="fixed inset-0 min-h-screen bg-[#bdedfc]">
      <div className="fixed z-10 text-black top-0 left-0 w-full p-4">
        <p>mini project as part of my <a href="https://threejs-journey.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">three js journey</a></p>
      </div>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6],
          }}
        >
          <Experience />
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
