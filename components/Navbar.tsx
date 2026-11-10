'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, BookOpen } from 'lucide-react'
import { siteConfig } from '@/site.config'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Buying Guides', href: '/guides' },
    { label: 'Products', href: '/products' },
    { label: 'How We Choose', href: '/editorial-policy' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl">{siteConfig.logoEmoji}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">{siteConfig.name}</span>
              <span className="text-xs text-gray-500">Practical buying guides</span>
            </div>
          </Link>

          <div className="hidden items-center space-x-7 md:flex">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-gray-700 transition hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/guides" className="btn-primary flex items-center space-x-2 text-sm">
              <BookOpen className="h-4 w-4" />
              <span>Buying guides</span>
            </Link>
          </div>

          <button className="md:hidden" aria-label="Open navigation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className="py-2 font-medium text-gray-700 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link href="/guides" className="btn-primary mt-2 flex items-center justify-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <BookOpen className="h-4 w-4" /> Browse buying guides
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
