"use client";

import { Canvas } from "@react-three/fiber";
import Header from "@/components/Header";
import Interface from "@/components/how-many/Interface";
import Scene from "@/components/how-many/Scene.jsx";

export default function Home() {
  return (
    <main className="fixed inset-0 min-h-screen bg-[#bdedfc]">
      <Header mode={'dark'} />
      <Interface />
      <Canvas
        shadows
        camera={{
          position: [10, 25, 10],
        }}
      >
        <Scene />
      </Canvas>
    </main>
  );
}
