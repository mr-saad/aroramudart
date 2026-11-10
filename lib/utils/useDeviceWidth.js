import { useState, useEffect } from "react"

export default function useDeviceWidth() {
	const [width, setWidth] = useState(0)

	useEffect(() => {
		const listener = () => setWidth(window.innerWidth)
		window.addEventListener("resize", listener)
		listener()
		return () => {
			removeEventListener("resize", listener)
		}
	})

	return width
}