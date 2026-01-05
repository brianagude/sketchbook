import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Car() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const carRef = useRef();
  const car = useGLTF("/models/jeep.glb");

  console.log('car: ', car);

  // Add a ref outside useFrame to track rolling distance consistently
  const rollRef = useRef(0);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const impulseStrength = 15 * delta;
    const torqueStrength = 2 * delta;
    const tireRotateStrength = 10 * delta;
    const maxSteerAngle = Math.PI / 8;

    // 1. Calculate Car Angle
    const rotation = carRef.current.rotation();
    const carQuaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const carEuler = new THREE.Euler().setFromQuaternion(carQuaternion, 'YXZ');
    const angle = carEuler.y;

    // 2. Physics (Impulse and Torque)
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    if (forward) {
      impulse.x = Math.sin(angle) * impulseStrength;
      impulse.z = Math.cos(angle) * impulseStrength;
    } else if (backward) {
      impulse.x = -Math.sin(angle) * impulseStrength;
      impulse.z = -Math.cos(angle) * impulseStrength;
    }

    if (rightward) torque.y -= torqueStrength;
    if (leftward) torque.y += torqueStrength;

    carRef.current.applyImpulse(impulse);
    carRef.current.applyTorqueImpulse(torque);

    // 3. Visual Wheel Logic (The Wobble Fix)
    if (forward) rollRef.current += tireRotateStrength;
    if (backward) rollRef.current -= tireRotateStrength;

    const steerAngle = rightward ? -maxSteerAngle : leftward ? maxSteerAngle : 0;

    const frontWheels = [car.nodes.Wheel_FD, car.nodes.Wheel_FP];
    const backWheels = [car.nodes.Wheel_BD, car.nodes.Wheel_BP];

    // FRONT WHEELS: Need Steer (Y/Z) AND Roll (X)
    frontWheels.forEach((wheel) => {
      // We reset and re-apply to prevent rotation "drift"
      wheel.rotation.set(0, 0, 0); 
      wheel.rotateY(steerAngle);  // 1. Turn the wheel left/right
      wheel.rotateX(rollRef.current); // 2. Spin the wheel on its NEW local axis
    });

    // BACK WHEELS: Only need Roll (X)
    backWheels.forEach((wheel) => {
      wheel.rotation.set(0, 0, 0);
      wheel.rotateX(rollRef.current);
    });
  });

  useEffect(() => {
    car.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [car]);

  return (
    <RigidBody 
      ref={carRef} 
      canSleep={false} 
      colliders="hull"
      linearDamping={1}
      angularDamping={0.5}
    >
      <primitive object={car.scene} />
    </RigidBody>
  );
}
