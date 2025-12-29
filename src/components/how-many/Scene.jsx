"use client";

import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useRef } from "react";
import Model from "./Model.jsx";

export default function Scene() {
  const light = useRef();

  return (
    <Physics debug={false}>
      <ambientLight intensity={1} />
      <Environment
        files="/env-maps/artist_workshop_4k.hdr"
        background
      />
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 4]}
        intensity={4.5}
      />
      <Model />
      <PerspectiveCamera makeDefault position={[20, 0, 20]} />
      <OrbitControls target={[0, 5, 0]} enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.5} />
    </Physics>
  );
}
