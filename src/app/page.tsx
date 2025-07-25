'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import ProjectCard from '@/components/ProjectCard'

export default function Home() {
  const [isClicked, setIsClicked] = useState(false)
  const [emailClicked, setEmailClicked] = useState(false)

  useEffect(() => {
    if (isClicked) {
      const timeout = setTimeout(() => {
        setIsClicked(false)
      }, 3000)

      return () => clearTimeout(timeout) // Cleanup on unmount
    }
  }, [isClicked])

  return (
    <>
      <main className="relative min-h-screen flex items-center justify-center bg-background text-text px-4 overflow-hidden">
        <div className="absolute -top-100 -right-100 w-[60rem] h-[60rem] bg-gradient-to-br from-purple-500/40 to-[#8800ff]/30 opacity-25 rounded-full blur-[120px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center space-y-6"
        >
          <h1
            id="hero-name"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight select-none"
          >
            Hey, I&rsquo;m{' '}
            <span className="text-primary select-all">Adam Gemperline</span>
          </h1>

          {/* marker div below is needed for NavBar name trigger on scroll */}
          <div id="name-marker" className="h-[1px] w-full" />
          <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto select-none">
            I&rsquo;m a software engineer who builds modern, elegant apps using
            clean code, smart design, and a bit of flair.
          </p>

          <div className="relative inline-block h-[50px] w-[180px]">
            {isClicked && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <ConfettiExplosion
                  force={0.6}
                  duration={1600}
                  particleCount={20}
                  width={300}
                  colors={['#7f5af0', '#ffffff', '#17e71c', '#0317fc']}
                />
              </div>
            )}

            <motion.button
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: isClicked ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => {
                e.preventDefault()
                setIsClicked(true)
                setTimeout(() => {
                  const el = document.getElementById('projects')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }, 400)

                setTimeout(() => {
                  setIsClicked(false)
                }, 2000)
              }}
              className={`group relative inline-block w-full h-full px-6 py-3 text-white font-medium rounded-lg overflow-hidden bg-primary hover:bg-background transition-colors duration-300 cursor-pointer ${
                isClicked ? 'invisible' : 'visible'
              }`}
            >
              <span className="relative z-10 select-none cursor-pointer">
                View My Work
              </span>
              <span className="absolute left-0 top-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:delay-0" />
              <span className="absolute right-0 top-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full group-hover:delay-75" />
              <span className="absolute right-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:delay-150" />
              <span className="absolute left-0 bottom-0 w-0.5 h-0 bg-white transition-all duration-300 group-hover:h-full group-hover:delay-[225ms]" />
            </motion.button>
          </div>
        </motion.div>
      </main>

      <section
        id="projects"
        className="min-h-screen flex flex-col items-center justify-center bg-[#1e1e2f] text-white px-4 py-20 space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">My Projects</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Here&rsquo;s a few things I&rsquo;ve worked on recently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          <ProjectCard
            title="This Website"
            description="My personal site to showcase my work, style, and creativity."
            imagePaths={['/this-website.png']}
            toolkitIconsPaths={[
              '/nextjs-icon-white-filled.svg',
              '/typescript-def.svg',
              '/tailwindcss.svg',
            ]}
          />
          <ProjectCard
            title="Luxury Furniture Store"
            description="A masterpiece in progress. Mobile-first, sleek e-commerce site with a reusable design."
            imagePaths={[
              '/furniture-store-mobile-landing.png',
              '/furniture-store-mobile-products.png',
              '/furniture-store-mobile-product.png',
            ]}
            tall={true}
            toolkitIconsPaths={[
              '/nextjs-icon-white-filled.svg',
              '/typescript-def.svg',
              '/nestjs.svg',
              '/postgresql.svg',
            ]}
          />
          <ProjectCard
            title="Modular AI Agent Infrastructure"
            description="A modular platform for deploying, tasking, and managing multi-agentic workforces."
            isLocked={true}
          />
          <ProjectCard
            title="Healthcare Staffing Platform"
            description="Helped an industry leader streamline staffing through a robust, automated web platform."
            isLocked={true}
          />
          <ProjectCard
            title="Social Media App"
            description="A social media platform for connecting with friends and sharing content"
            imagePaths={['/social-home.png']}
            toolkitIconsPaths={[
              '/react-icon.svg',
              '/nodejs.svg',
              '/firebase.png',
            ]}
          />
        </div>
      </section>

      {/* Contact section */}
      <section
        id="contact"
        className="min-h-[50vh] flex flex-col items-center justify-center bg-background text-white px-4 py-20 space-y-6 border-t border-[#2c2c38]"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Get in Touch
        </h2>
        <p className="text-gray-400 text-center max-w-lg">
          Have a project in mind, or just want to say hi? Shoot me an email!
        </p>

        <button
          onClick={() => {
            navigator.clipboard.writeText('adamgemperline@gmail.com')
            setEmailClicked(true)
            setTimeout(() => setEmailClicked(false), 2000)
          }}
          className="text-primary font-medium hover:underline focus:outline-none transition cursor-pointer"
        >
          adamgemperline@gmail.com
        </button>

        <p className="text-sm text-gray-500">{`${emailClicked ? 'Copied!' : 'Click to copy'}`}</p>
      </section>
    </>
  )
}
