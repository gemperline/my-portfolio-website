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

  // after first render, store all label widths
  useEffect(() => {
    const widths = labelRefs.current.map((el) => el?.offsetWidth ?? 0)
    setLabelWidths(widths)
  }, [icons])

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
            className="flex items-center overflow-hidden z-10 bg-[#181825] rounded basis-[24px]"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              flexBasis: isHovered
                ? `${baseWidth + spacing + labelWidth}px`
                : `${baseWidth}px`,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-6 flex items-center justify-center shrink-0">
              <Image src={src} alt={label} width={24} height={24} />
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
