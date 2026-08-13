'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { AnnouncementBar } from './announcement-bar'
import { useStore } from '@/components/store/store-provider'
import { categories, megaMenu } from '@/lib/products'
import { cn } from '@/lib/utils'

export function Header() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div
        className={cn(
          'border-b border-border bg-background/95 backdrop-blur transition-shadow',
          scrolled && 'shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_8px_24px_-16px_rgba(0,0,0,0.25)]',
        )}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 lg:px-8">
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <Link href="/" className="select-none">
              <span className="font-serif text-lg font-bold uppercase leading-none tracking-[0.15em] sm:text-xl lg:text-2xl">
                The Bombay Outfit
              </span>
            </Link>
          </div>

          {/* Center: nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {categories.map((cat) => {
              const hasMenu = Boolean(megaMenu[cat])
              return (
                <div key={cat} onMouseEnter={() => setActiveMenu(hasMenu ? cat : null)}>
                  <Link
                    href={cat === 'Sale' ? '/sale' : `/category/${slugify(cat)}`}
                    className={cn(
                      'inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-foreground',
                      cat === 'Sale' && 'text-gold hover:text-gold',
                      activeMenu === cat && 'text-foreground',
                    )}
                  >
                    {cat}
                    {hasMenu && <ChevronDown className="h-3 w-3 opacity-60" strokeWidth={1.5} />}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="hidden text-foreground/80 transition-colors hover:text-foreground sm:block"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative hidden text-foreground/80 transition-colors hover:text-foreground sm:block"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-gold-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label="Shopping bag"
              onClick={() => setCartOpen(true)}
              className="relative text-foreground/80 transition-colors hover:text-foreground"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
            <span className="hidden items-center border-l border-border pl-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground md:inline-flex">
              INR &#8377;
            </span>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {activeMenu && megaMenu[activeMenu] && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full hidden border-b border-border bg-background lg:block"
            >
              <div className="mx-auto grid max-w-[1600px] grid-cols-4 gap-8 px-8 py-10">
                {megaMenu[activeMenu].columns.map((col) => (
                  <div key={col.heading}>
                    <h4 className="mb-4 font-serif text-sm italic text-muted-foreground">{col.heading}</h4>
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link}>
                          <Link
                            href={`/category/${slugify(activeMenu)}`}
                            className="text-[13px] tracking-wide text-foreground/80 transition-colors hover:text-gold"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link href={`/category/${slugify(activeMenu)}`} className="group relative overflow-hidden">
                  <Image
                    src={megaMenu[activeMenu].feature.image || '/placeholder.svg'}
                    alt={megaMenu[activeMenu].feature.label}
                    width={480}
                    height={360}
                    className="h-full min-h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-5">
                    <p className="font-serif text-lg text-white">{megaMenu[activeMenu].feature.label}</p>
                    <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                      {megaMenu[activeMenu].feature.cta}
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 left-0 z-50 flex w-[84%] max-w-sm flex-col bg-background lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-serif text-base font-bold uppercase tracking-[0.15em]">The Bombay Outfit</span>
              <button type="button" aria-label="Close menu" onClick={onClose}>
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={cat === 'Sale' ? '/sale' : `/category/${slugify(cat)}`}
                      onClick={onClose}
                      className={cn(
                        'block border-b border-border/60 py-3.5 text-sm font-medium uppercase tracking-[0.14em]',
                        cat === 'Sale' && 'text-gold',
                      )}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Currency: INR &#8377;</p>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-')
}
