import {
  ContactShadows,
  Environment,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function ButterStick({
  width = 2.2,
  height = 0.5,
  depth = 0.5,
}) {
  return (
    <div className="fixed inset-0 bg-blue-50">
      <Canvas camera={{ position: [2.5, 1.6, 2.5], fov: 45 }}>
        {/* Ambient + key light */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 2]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* <Text 
          color="#FF2400" 
          scale={0.4}
          position={ [ -1, 1, 0 ] }
          rotation-y={ 0.25 }
          font="/InclusiveSans-Regular.ttf"
        >
          BUTTER
        </Text>
        <Text 
          color="#FF2400" 
          scale={0.4}
          position={ [ 1.5, -1, 0 ] }
          rotation-y={ - 0.25 }
        >
          FACE
        </Text> */}

        {/* Butter: Rounded box for nicer edges */}
        <group position={[0, 0.18, 0]}>
          
          {/* <Text scale={ 0.5 }>Butter</Text> */}
          {/* <Text scale={ 0.5 }>Face</Text> */}
          <RoundedBox
            args={[width, height, depth]} // box size
            radius={0.08} // edge rounding
            smoothness={8} // number of segments on the rounding
            castShadow
            receiveShadow
          >
            {/* physical material for a buttery look */}
            <meshPhysicalMaterial
              color={"#ffe36e"} // buttery yellow
              roughness={0.35} // not too shiny
              metalness={0.02}
              clearcoat={0.25} // thin glossy coat
              clearcoatRoughness={0.15}
            />
          </RoundedBox>

          {/* small butter wrapper crease (optional decorative plane) */}
          {/* <mesh rotation={[-0.4, 0, 0]} position={[0, height / 2 + 0.001, 0]}>
            <planeGeometry args={[width * 0.98, depth * 0.98]} />
            <meshStandardMaterial
              color={"#fff7e6"}
              transparent
              opacity={0.12}
              roughness={1}
            />
          </mesh> */}
        </group>

        {/* nice soft contact shadow under the butter */}
        <ContactShadows
          position={[0, -0.02, 0]}
          opacity={0.6}
          width={3}
          height={3}
          blur={2}
          far={1.2}
        />

        {/* environment for reflections (studio preset) */}
        <Environment preset="studio" />

        {/* camera controls so you can rotate/zoom */}
        <OrbitControls
          enablePan={false}
          minPolarAngle={0.6}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}
