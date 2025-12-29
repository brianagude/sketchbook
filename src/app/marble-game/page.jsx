"use client";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Header from "@/components/Header";
import Experience from "@/components/marble-game/Experience.jsx";
import Interface from "@/components/marble-game/Interface.jsx";

export default function Page() {
  return (
    <>
      <Header mode={'dark'}/>
      <main className="fixed inset-0 min-h-screen bg-[#050E3C]">
        {/* <div className="fixed z-10 text-black top-0 left-0 w-full p-4">
          <p>
            based on the marble game from my{" "}
            <a
              href="https://threejs-journey.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              three js journey
            </a>
          </p>
        </div> */}
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
      </main>
    </>
  );
}
