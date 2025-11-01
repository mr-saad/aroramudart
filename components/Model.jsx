import { Environment, Gltf, OrbitControls, Center } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export default function Model({ url, setShow3d }) {
  return (
    <div className="inset-0 p-5 bg-black/20 fixed z-3">
      <svg
        onClick={() => {
          setShow3d(false)
        }}
        className="absolute right-10 top-10 z-4 border cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
      <div className="w-full h-full cursor-grab active:cursor-grabbing bg-white border border-black/10 shadow">
        <Canvas>
          <Environment preset="studio" environmentIntensity={0.5} />
          <OrbitControls rotateSpeed={0.18} enablePan={false} />
          <Center>
            <Gltf scale={0.9} src={url} />
          </Center>
        </Canvas>
      </div>
    </div>
  )
}
