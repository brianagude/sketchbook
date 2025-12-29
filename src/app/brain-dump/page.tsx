"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { StrictMode, Suspense } from "react";
import Lights from "@/components/brain-dump/Lights";
import World from "@/components/brain-dump/World";
import Header from "@/components/Header";

export default function Page() {
  const { bgColor, orbitContorls } = useControls({
    bgColor: "#000000",
    orbitContorls: true,
  });

  return (
    <main className="w-screen h-screen">
      <Header/>
      <StrictMode>
        {/* <Leva theme={levaTheme} /> */}
        <Canvas
          shadows
          camera={{
            position: [0, 10, 10],
          }}
        >
          <color args={[bgColor]} attach="background" />
          <Perf position="top-left" />
          <Lights />
          <Suspense>
            <Physics debug>
              <World />
            </Physics>
          </Suspense>
          <OrbitControls enabled={orbitContorls} makeDefault />
        </Canvas>
      </StrictMode>
    </main>
  );
}
