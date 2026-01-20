import { Environment, Gltf, OrbitControls, Center } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { X } from "lucide-react"

export default function Model({ url, setShow3d }) {
  return (
    <div className="inset-0 p-5 bg-black/20 fixed z-3">
      <X
        className="absolute z-4 right-8 top-8"
        onClick={() => {
          setShow3d(false)
        }}
      />
      <div className="w-full h-full cursor-grab active:cursor-grabbing bg-white border border-black/10 shadow">
        <Canvas>
          <Environment preset="studio" environmentIntensity={0.5} />
          <OrbitControls enablePan={false} />
          <Center>
            <Gltf scale={0.9} src={url} />
          </Center>
        </Canvas>
      </div>
    </div>
  )
}
