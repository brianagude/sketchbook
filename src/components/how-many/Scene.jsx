"use client";

import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useRef } from "react";
import Model from "./Model.jsx";

export default function Scene() {
  const light = useRef();

  return (
    <Physics debug={false}>
      <ambientLight intensity={1} />
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 4]}
        intensity={4.5}
      />
      <Model />
      <OrbitControls />
    </Physics>
  );
}
