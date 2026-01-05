import { Helper } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { DirectionalLightHelper } from "three";

export default function Lights() {
  const light = useRef();

  useEffect(()=>{
    // console.log(light.current.shadow.camera)
    // light.current.shadow.camera.left = -20
    // light.current.shadow.camera.right = 20
    // light.current.shadow.camera.top = 20
    // light.current.shadow.camera.bottom = 20
    // light.current.shadow.mapSize.width = 1024
    // light.current.shadow.mapSize.height = 1024
    // console.log(light.current.shadow.camera)
  }, [])

  const {
    directionalLightPosition,
  } = useControls({
    directionalLightPosition: {
      value: { x: 0, y: 7, z: 5 },
      step: 0.01,
      joystick: "invertY",
      label: "Directional Position",
    },
  });
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        intensity={3}
        castShadow
        ref={light}
        position={[
          directionalLightPosition.x,
          directionalLightPosition.y,
          directionalLightPosition.z,
        ]}
        color="white"
      >
      {process.env.NODE_ENV === "development" && (
        <Helper type={DirectionalLightHelper} />
      )}
      </directionalLight>
    </>
  );
}
