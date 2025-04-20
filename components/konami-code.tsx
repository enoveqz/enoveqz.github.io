"use client"

import { useEffect, useState } from "react"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

export function KonamiCode({ onUnlock }: { onUnlock: () => void }) {
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = [...keys, e.key]
      if (newKeys.length > KONAMI_CODE.length) {
        newKeys.shift()
      }
      setKeys(newKeys)

      const isKonamiCode = newKeys.join(",") === KONAMI_CODE.join(",")
      if (isKonamiCode) {
        onUnlock()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [keys, onUnlock])

  return null
}
