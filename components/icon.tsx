"use client"

import { cn } from "@/lib/utils"
import { Briefcase, GraduationCap, Lightbulb, Palette, User2, LayoutDashboard } from "lucide-react"

interface IconProps {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 24, className = "" }: IconProps) {
  const iconMap = {
    education: <GraduationCap size={size} className="text-[#0066cc]" />,
    work: <Briefcase size={size} className="text-[#0066cc]" />,
    internship: <Palette size={size} className="text-[#0066cc]" />,
    healthcare: <User2 size={size} className="text-[#0066cc]" />,
    agriculture: <LayoutDashboard size={size} className="text-[#0066cc]" />,
    school: <Lightbulb size={size} className="text-[#0066cc]" />,
  }

  return <div className={cn("w-8 h-8 flex items-center justify-center", className)}>{iconMap[name] || null}</div>
}
