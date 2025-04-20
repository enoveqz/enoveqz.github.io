"use client"

import type React from "react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  noAnimation?: boolean
}

export function Reveal({ children, className, direction = "up", delay = 0, noAnimation = false }: RevealProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  })

  const directionClasses = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "transition-all duration-700 ease-out",
        noAnimation ? "" : "opacity-0",
        noAnimation ? "" : directionClasses[direction],
        isIntersecting && "opacity-100 translate-y-0 translate-x-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
