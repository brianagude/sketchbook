"use client";

import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import Interface from "@/components/how-many/Interface";
import Scene from "@/components/how-many/Scene.jsx";

export default function Home() {
  return (
    <main className="fixed inset-0 min-h-screen bg-[#bdedfc]">
      <Interface />
      <Canvas
        shadows
        camera={{
          position: [10, 25, 10]
        }}
      >
        <Scene />
      </Canvas>
      <Link
        href="/"
        className="fixed z-10 bottom-4 right-4 text-black hover:underline"
      >
        Home
      </Link>
    </main>
  );
}