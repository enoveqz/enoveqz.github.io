"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface CompanyIconProps {
  name: string
  className?: string
  size?: number
}

// Mapping von Unternehmensnamen zu Icon-URLs
const companyIcons = {
  hfg: "/placeholder.svg?height=40&width=40", // HfG Schwäbisch Gmünd
  bosch: "/placeholder.svg?height=40&width=40", // Bosch
  simple: "/placeholder.svg?height=40&width=40", // Simple GmbH
  mercedes: "/placeholder.svg?height=40&width=40", // Mercedes Benz
  ib: "/placeholder.svg?height=40&width=40", // IB International Bund
  georgenschule: "/placeholder.svg?height=40&width=40", // Freie Georgenschule
}

export function CompanyIcon({ name, className, size = 24 }: CompanyIconProps) {
  const iconUrl = companyIcons[name.toLowerCase()] || "/placeholder.svg?height=40&width=40"

  return (
    <div
      className={cn("relative inline-block rounded-full overflow-hidden bg-white", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={iconUrl || "/placeholder.svg"}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  )
}
