import { Float, Text, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "#E2DDB4" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "#F6EFD2" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "#FF3838" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "#002455" });

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="/fonts/bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Let's Race!
          <meshBasicMaterial toneMapped={false} color="#F9F8F0" />
        </Text>
      </Float>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <Floor />
    </group>
  );
}

export function BlockEnd({ position = [0, 0, 0] }) {
  const endModelRef = useRef();
  const endModel = useGLTF("/models/flamingo.glb");

  endModel.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  const animations = useAnimations(endModel.animations, endModelRef);
  console.log(animations);

  useEffect(() => {
    animations.actions["RobotArmature|Dance"]?.play();
  }, [animations]);

  // console.log(endModel);
  // console.log(endModelRef);

  return (
    <group position={position}>
      <Text
        font="/fonts/bebas-neue-v9-latin-regular.woff"
        scale={1}
        position={[0, 2.25, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
        scale={0.3}
      >
        <primitive object={endModel.scene} ref={endModelRef} />
      </RigidBody>
      <Floor />
    </group>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1),
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
      <Floor />
    </group>
  );
}

export function BlockLimbo({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
      <Floor />
    </group>
  );
}

export function BlockLift({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const t = Math.sin(time + timeOffset) + 0.9;
    const y = t > -0.1 ? t : -0.1;

    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={floor2Material}
          scale={[4, 0.2, 4]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockAxe({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
      <Floor />
    </group>
  );
}

function Walls({ length = 1 }) {
  return (
    <RigidBody type="fixed" colliders="cuboid" restitution={0.2} friction={0}>
      <mesh
        position={[2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        castShadow
      />
      <mesh
        position={[-2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        receiveShadow
      />
      <mesh
        position={[0, 0.75, -(length * 4) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[4, 1.5, 0.3]}
        receiveShadow
      />
    </RigidBody>
  );
}

function Floor() {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <CuboidCollider
        type="fixed"
        args={[2, 0.1, 2]}
        position={[0, -0.1, 0]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
}

// function Bounds({ length = 1 }) {
// 	return (
// 			<RigidBody type="fixed" restitution={0.2} friction={0}>
// 				<mesh
// 					position={[2.15, 0.75, -(length * 2) + 2]}
// 					geometry={boxGeometry}
// 					material={wallMaterial}
// 					scale={[0.3, 1.5, 4 * length]}
// 					castShadow
// 				/>
// 				<mesh
// 					position={[-2.15, 0.75, -(length * 2) + 2]}
// 					geometry={boxGeometry}
// 					material={wallMaterial}
// 					scale={[0.3, 1.5, 4 * length]}
// 					receiveShadow
// 				/>
// 				<mesh
// 					position={[0, 0.75, -(length * 4) + 2]}
// 					geometry={boxGeometry}
// 					material={wallMaterial}
// 					scale={[4, 1.5, 0.3]}
// 					receiveShadow
// 				/>
// 				<CuboidCollider
// 					type="fixed"
// 					args={[2, 0.1, 2 * length]}
// 					position={[0, -0.1, -(length * 2) + 2]}
// 					restitution={0.2}
// 					friction={1}
// 				/>
// 			</RigidBody>
// 	);
// }

export function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo, BlockLift],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}

      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Walls length={count + 2} />
    </>
  );
}
