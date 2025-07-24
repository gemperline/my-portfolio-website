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
    if (!heroNameEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowName(!entry.isIntersecting)
      },
      { root: null, threshold: 1.0 }
    )

    observer.observe(heroNameEl)

    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full fixed top-0 z-50 bg-background border-b border-[#2c2c38]"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Sliding name */}
        <div className="w-[180px]">
          <AnimatePresence>
            <div className="h-[24px] overflow-hidden flex items-center">
              <motion.button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
                initial={false}
                animate={{
                  opacity: showName ? 1 : 0,
                  y: showName ? 0 : 10,
                }}
                transition={{ duration: 0.4 }}
                className="text-xl font-bold text-primary select-none cursor-pointer"
              >
                Adam Gemperline
              </motion.button>
            </div>
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
