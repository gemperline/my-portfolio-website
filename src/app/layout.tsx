import './globals.css'
import NavBar from '@/components/NavBar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: {
    icon: '/ag-logo-white-abstract.svg',
  },
  title: 'Adam Gemperline | Software Engineer',
  description:
    'Portfolio of Adam Gemperline, a software engineer specializing in sleek, performant web applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-background dark:bg-white text-text`}
      >
        <NavBar />
        <div className="pt-[50px]">{children}</div>
      </body>
    </html>
  )
}
