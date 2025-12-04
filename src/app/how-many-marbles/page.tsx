"use client";

// import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import Interface from "@/components/how-many/Interface";
import Scene from "@/components/how-many/Scene.jsx";

export default function Home() {
  return (
    <main className="fixed inset-0 min-h-screen bg-[#bdedfc]">
      {/* <div className="fixed z-10 text-black top-0 left-0 w-full p-4">
        <p>how many marbles are in the jar?</p>
      </div> */}

      {/* <KeyboardControls
        map={[
          { name: "zero", keys: ["0"] },
          { name: "one", keys: ["1"] },
          { name: "two", keys: ["2"] },
          { name: "three", keys: ["3"] },
          { name: "four", keys: ["4"] },
          { name: "five", keys: ["5"] },
          { name: "six", keys: ["6"] },
          { name: "seven", keys: ["7"] },
          { name: "eight", keys: ["8"] },
          { name: "nine", keys: ["9"] },
          { name: "enter", keys: ["Enter"] },
          { name: "delete", keys: ["Backspace"] },
        ]}
      > */}
      <Interface />
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
      {/* </KeyboardControls> */}

      <Link
        href="/"
        className="fixed z-10 bottom-4 right-4 text-black hover:underline"
      >
        Home
      </Link>
    </main>
  );
}
