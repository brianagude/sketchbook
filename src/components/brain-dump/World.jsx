import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const torusRef = useRef();
  const pillRef = useRef();

  useFrame((state, delta) => {
    // state: info about the Three.js environment
    // delta: time spent since the last frame in seconds
    cubeRef.current.rotation.y += delta;
    sphereRef.current.rotation.x += delta;
    sphereRef.current.rotation.y += delta;
    torusRef.current.rotation.y += delta * 0.2;
  });

  const pillJump = () => {
    pillRef.current.applyImpulse({ x: 0, y: 100, z: 0 }, true);
    pillRef.current.applyTorqueImpulse({ x: 0, y: Math.random() * 50 - 25, z: 0 })
  };

  const { boxPosition, spherePosition, torusPosition, floorPositionY, floorSize } = useControls({
    boxPosition: {
      value: { x: -4, y: 5, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    spherePosition: {
      value: { x: 0, y: 5, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    torusPosition: {
      value: { x: 4, y: 5, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    floorSize: {
      value: { w: 20, h: 0.5, d: 20 },
      step: 0.01,
    },
    floorPositionY: {
      value: -0.25,
      step: 0.01,
      min: -5,
      max: 0
    },
    
  });

  return (
    <>
      <RigidBody
        ref={pillRef}
        colliders="hull"
        position={[0, 3, 0]}
        rotation={[0, 0, Math.PI / 2]} // lay on its side
      >
        <mesh castShadow receiveShadow onClick={pillJump}>
          <capsuleGeometry args={[1, 3]} /> 
          <meshStandardMaterial color="yellow"/>
        </mesh>
      </RigidBody>

      <mesh
        ref={cubeRef}
        position={[boxPosition.x, boxPosition.y, boxPosition.z]}
        receiveShadow
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial color="lightgreen" />
      </mesh>

      <mesh
        ref={sphereRef}
        position={[spherePosition.x, spherePosition.y, spherePosition.z]}
        receiveShadow
        castShadow
      >
        <icosahedronGeometry />
        <meshStandardMaterial color="pink" />
      </mesh>
      <mesh
        ref={torusRef}
        position={[torusPosition.x, torusPosition.y, torusPosition.z]}
        receiveShadow
        castShadow
      >
        <torusGeometry />
        <meshStandardMaterial color="lightblue" />
      </mesh>

      <RigidBody type="fixed" position-y={floorPositionY} restitution={1}>
        <mesh receiveShadow>
          <boxGeometry args={[floorSize.w, floorSize.h, floorSize.d]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </RigidBody>
    </>
  );
}
