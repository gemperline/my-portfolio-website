'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  {
    label: 'Home',
    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  },
  { label: 'Projects', href: '#projects' },
  // { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showName, setShowName] = useState(false)

  useEffect(() => {
    const heroNameEl = document.getElementById('hero-name')
    const navEl = document.querySelector('nav')
  
    if (!heroNameEl || !navEl) return
  
    const onScroll = () => {
      const heroRect = heroNameEl.getBoundingClientRect()
      const navRect = navEl.getBoundingClientRect()
      const heroCenterY = heroRect.top + heroRect.height / 2
      const navCenterY = navRect.top + navRect.height / 2
  
      setShowName(heroCenterY <= navCenterY)
    }
  
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])  

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full fixed top-0 z-50 bg-background border-b border-[#2c2c38]"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Sliding name */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <AnimatePresence>
            {showName && (
              <motion.button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold text-primary select-none cursor-pointer pointer-events-auto"
              >
                Adam Gemperline
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) =>
            item.onClick ? (
              <button
                key={item.label}
                onClick={item.onClick}
                className="text-white hover:text-primary transition select-none cursor-pointer"
              >
                {item.label}
              </button>
            ) : (
              <button
                key={item.href}
                onClick={() => {
                  const el = document.querySelector(item.href!)
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="text-white hover:text-primary transition select-none cursor-pointer"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-background border-t border-[#2c2c38]">
          {navItems.map((item) =>
            item.onClick ? (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick?.()
                  setMobileOpen(false)
                }}
                className="text-white hover:text-primary transition text-left select-none"
              >
                {item.label}
              </button>
            ) : (
              <button
                key={item.href}
                onClick={() => {
                  const el = document.querySelector(item.href!)
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' })
                    setMobileOpen(false)
                  }
                }}
                className="text-white hover:text-primary transition text-left select-none"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </motion.nav>
  )
}
