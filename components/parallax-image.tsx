"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export function ParallaxImage({ src, alt, className = "", speed = 0.1 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const { top, height } = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Berechne, wie weit das Element im Viewport ist (0 bis 1)
      const viewportPosition = 1 - (top + height) / (windowHeight + height)

      // Begrenzen Sie den Bereich auf 0-1
      const normalizedPosition = Math.max(0, Math.min(1, viewportPosition))

      // Berechne den Offset basierend auf der Position und der Geschwindigkeit
      // Verwende einen kleineren Multiplikator, um den Effekt subtiler zu machen
      const maxOffset = height * 0.2 // Maximal 20% der Höhe verschieben
      setOffset(normalizedPosition * maxOffset * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial ausführen

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  )
}
