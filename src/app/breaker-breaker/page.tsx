"use client";

import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import Scene from "@/components/breaker-breaker/Scene";

export default function Home() {
  return (
    <main className="fixed inset-0 min-h-screen bg-[#bdedfc]">
      <div className="fixed z-10 text-black top-0 left-0 w-full p-4">
        <p>you are a ball and your job is to break things.</p>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
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
