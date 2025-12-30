import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Model from "./Model.jsx";

export default function Scene() {
  return (
    <Physics debug={false}>
      <ambientLight />
      <Environment
        files="/env-maps/mud_road_puresky_4k.hdr"
        background
      />
      <directionalLight
        castShadow
        position={[4, 4, 4]}
        intensity={4.5}
      />
      <Model />
      {/* <OrbitControls /> */}
    </Physics>
  );
}