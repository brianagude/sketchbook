import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState} from "react";
import * as THREE from "three";

export default function Car() {
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10),
  );
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const carRef = useRef();
  const car = useGLTF("/models/jeep.glb");

  console.log('car: ', car);

  const reset = () => {
    carRef.current.setTranslation({ x: 0, y: 1, z: 0 });
    carRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    carRef.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  const rollRef = useRef(0);

  useFrame((state, delta) => {
    console.log(carRef)
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

    // // Make camera follow car
    // const carPosition = carRef.current.translation(); // Get car's position from RigidBody
    // state.camera.position.set(
    //   carPosition.x,
    //   carPosition.y + 4,  // Height above car
    //   carPosition.z + 6  // Distance behind car
    // );
    
    // // Make camera look at car
    // state.camera.lookAt(carPosition.x, carPosition.y, carPosition.z);

    /**
     * Camera
     */
      const carPosition = carRef.current.translation();

      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(carPosition);
      cameraPosition.z += 2;
      cameraPosition.y += 2;
      cameraPosition.x += 5;

      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(carPosition);
      cameraTarget.y += 0.3;

      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);
      if (carPosition.y < -6) reset();
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
      angularDamping={1}
    >
      <primitive object={car.scene} />
    </RigidBody>
  );
}
