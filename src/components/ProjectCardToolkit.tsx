import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

export function ProjectCardToolkit({
  icons,
}: {
  icons: { src: string; label: string }[]
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [labelWidths, setLabelWidths] = useState<number[]>([])
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])
  const animatingIcons = useRef<Set<number>>(new Set())

  // --- Prevent hydration mismatch ---
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted) {
      const widths = labelRefs.current.map((el) => el?.offsetWidth ?? 0)
      setLabelWidths(widths)
    }
  }, [icons, hasMounted])

  // --- Skip rendering on server ---
  if (!hasMounted) return null

  const handleMouseEnter = (idx: number) => {
    if (animatingIcons.current.has(idx)) return

    animatingIcons.current.add(idx)
    setHoveredIndex(idx)

    setTimeout(() => {
      animatingIcons.current.delete(idx)
    }, 300)
  }

  return (
    <div className="flex gap-2">
      {icons.map(({ src, label }, idx) => {
        const isHovered = hoveredIndex === idx
        const labelWidth = labelWidths[idx] ?? 0
        const baseWidth = 24
        const spacing = 8

        return (
          <motion.div
            key={idx}
            className="flex items-center overflow-hidden z-10 rounded basis-[24px] bg-[#25181f]"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              flexBasis: isHovered
                ? `${baseWidth + spacing + labelWidth}px`
                : `${baseWidth}px`,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-6 h-6 shrink-0">
              <Image
                src={src}
                alt={label}
                fill
                className="object-contain"
                sizes="24px"
              />
            </div>

            <div
              ref={(el) => {
                labelRefs.current[idx] = el
              }}
              className={`ml-2 whitespace-nowrap text-sm text-white select-none transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {label}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
