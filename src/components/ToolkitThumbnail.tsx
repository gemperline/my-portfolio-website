// components/ToolkitThumbnail.tsx
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

export function ToolkitThumbnail({
  src,
  label,
}: {
  src: string
  label: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const isAnimatingRef = useRef(false)

  const animationDuration = 600 // ms

  const handleMouseEnter = () => {
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    setIsHovered(true)

    setTimeout(() => {
      setIsHovered(false)
      isAnimatingRef.current = false
    }, animationDuration)
  }

  return (
    <motion.div
      className="flex items-center overflow-hidden z-10 bg-[#25181f] rounded basis-[24px]"
      onMouseEnter={handleMouseEnter}
      animate={{
        flexGrow: isHovered ? 1 : 0,
      }}
      transition={{ duration: animationDuration / 1000 }}
    >
      {/* Icon */}
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        <Image src={src} alt={label} width={24} height={24} />
      </div>

      {/* Label */}
      <div
        className={`ml-2 whitespace-nowrap text-sm text-white transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {label}
      </div>
    </motion.div>
  )
}
