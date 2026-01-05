"use client";

import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import { StrictMode, Suspense } from "react";
import Header from "@/components/Header";
import Lights from "@/components/playground/Lights";
import World from "@/components/playground/World";

export default function Page() {
  const { bgColor } = useControls({
    bgColor: "skyblue",
  });

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
  ];

  return (
    <main className="w-screen h-screen">
      <Header mode="dark" />
      <Leva 
        collapsed 
        hidden
       />
      <StrictMode>
        <KeyboardControls map={keyboardMap}>
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [2.5, 4, 6],
            }}
          >
            <color args={[bgColor]} attach="background" />
            {process.env.NODE_ENV === "development" && (
              <Perf position="top-left" />
            )}
            <Lights />
            <Suspense>
              <Physics debug={false}>
                <World />
              </Physics>
            </Suspense>
            <OrbitControls makeDefault />
          </Canvas>
        </KeyboardControls>
      </StrictMode>
    </main>
  );
}
