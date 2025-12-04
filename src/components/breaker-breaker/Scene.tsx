"use client";

import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useRef } from "react";
import Model from "./Model.tsx";

export default function Scene() {
  const light = useRef();

  return (
    <Physics debug>
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <Model />
      <OrbitControls />
    </Physics>
  );
}
