import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import Car from "./Car"

export default function Experience() {
  const { floorSize } = useControls({
    floorSize: {
      value: { w: 20, h: 0.5, d: 20 },
      step: 0.01,
    },
  });

  return (
    <>
      <Car/>

      {/* floor */}
      <RigidBody type="fixed" restitution={1}>
        <mesh receiveShadow>
          <boxGeometry args={[floorSize.w, floorSize.h, floorSize.d]} />
          <meshStandardMaterial color="lightgreen" />
        </mesh>
      </RigidBody>
    </>
  );
}
