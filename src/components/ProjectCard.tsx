'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ProjectCardToolkit } from './ProjectCardToolkit'

export default function ProjectCard({
  title,
  description,
  imagePaths = [],
  isLocked = false,
  toolkitIconsPaths = [],
  tall = false,
  repoUrl,
}: {
  title: string
  description: string
  imagePaths?: string[]
  isLocked?: boolean
  toolkitIconsPaths?: { src: string; label: string }[]
  tall?: boolean
  repoUrl?: string
}) {
  const [currentImage, setCurrentImage] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (hovering && imagePaths.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % imagePaths.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [hovering, imagePaths])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className={`group rounded-xl border border-[#2c2c38] overflow-hidden shadow-md bg-[#1e1e2f] transition-shadow hover:shadow-lg flex flex-col ${tall ? 'row-span-2' : ''}`}
      onMouseEnter={() => {
        setHovering(true)
        if (imagePaths.length > 1) {
          setCurrentImage((prev) => (prev + 1) % imagePaths.length)
        }
      }}
      onMouseLeave={() => {
        setHovering(false)
      }}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden ${tall ? 'aspect-[9/19.5]' : 'h-48'}`}
      >
        <div
          className={`absolute inset-0 bg-gray-700 flex items-center justify-center transform transition-transform duration-500 ${(!imagePaths.length || imagePaths.length === 1) && 'group-hover:scale-105'}`}
        >
          {isLocked ? (
            <Image
              key="privacy-lock-1"
              src="/privacy-lock-white.svg"
              alt="Privacy Lock"
              width={64}
              height={64}
              className="w-30 h-30"
            />
          ) : (
            imagePaths.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Project screenshot ${idx + 1}`}
                fill
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImage ? 'opacity-100' : 'opacity-0'}`}
              />
            ))
          )}
        </div>
      </div>

      <div className="p-6 space-y-3 flex-grow">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center  justify-between px-6 py-4 border-t border-[#2c2c38] bg-[#181825]">
        <div className="w-full text-gray-500 flex items-center space-x-2">
          {isLocked || !repoUrl ? (
            <p className="-z-0 absolute">Reach out for details</p>
          ) : (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -z-0 not-last:text-primary hover:underline font-medium cursor-pointer"
            >
              View Project →
            </a>
          )}
          <div className="w-full flex items-center justify-end">
            <ProjectCardToolkit icons={toolkitIconsPaths} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
