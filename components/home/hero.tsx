'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const slides = [
  {
    image: '/hero-aw-collection.png',
    eyebrow: 'Autumn / Winter 2026',
    title: "The Tailored Man",
    subtitle: 'Sculpted silhouettes and Italian wool for the modern Indian gentleman.',
    cta: 'Explore Collection',
    href: '/shop?category=Apparel',
    align: 'left' as const,
  },
  {
    image: '/hero-leather-editorial.png',
    eyebrow: 'The Leather Chapter',
    title: 'Crafted to Endure',
    subtitle: 'Full-grain leather and precision hardware, made to age with you.',
    cta: 'Discover Leather',
    href: '/shop?category=Leather%20Goods',
    align: 'right' as const,
  },
]

export function Hero() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [])

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next])

  const slide = slides[index]

  return (
    <section className="relative h-[72vh] min-h-[520px] w-full overflow-hidden bg-primary lg:h-[86vh]">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image || '/placeholder.svg'}
            alt={slide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-center px-6 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className={slide.align === 'right' ? 'ml-auto max-w-xl text-right' : 'max-w-xl'}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">{slide.eyebrow}</p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.05] text-white text-balance sm:text-5xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 sm:text-base lg:ml-0 lg:mr-0">
              {slide.subtitle}
            </p>
            <Link
              href={slide.href}
              className={`group mt-8 inline-flex items-center gap-2 bg-background px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-gold hover:text-gold-foreground ${
                slide.align === 'right' ? 'ml-auto' : ''
              }`}
            >
              {slide.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-0.5 transition-all duration-300 ${
              i === index ? 'w-10 bg-gold' : 'w-6 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
