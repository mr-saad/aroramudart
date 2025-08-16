import { Environment, Gltf, OrbitControls, Center } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export default function Model({ url }) {
  return (
    <div className="max-w-full aspect-video mb-10 cursor-grab active:cursor-grabbing">
      <Canvas>
        <Environment preset="studio" environmentIntensity={0.5} />
        <OrbitControls rotateSpeed={0.18} enablePan={false} />
        <Center>
          <Gltf scale={0.9} src={url} />
        </Center>
      </Canvas>
    </div>
  )
}
