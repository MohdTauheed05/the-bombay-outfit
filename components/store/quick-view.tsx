'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart, Zap } from 'lucide-react'
import { useStore } from './store-provider'
import { formatINR, discountPct } from '@/lib/products'
import { cn } from '@/lib/utils'

export function QuickView() {
  const { ui, setQuickView, addToCart, toggleWishlist, isWishlisted } = useStore()
  const product = ui.quickView
  const [size, setSize] = useState<string>('')
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    if (product) {
      setSize(product.sizes.length === 1 ? product.sizes[0] : '')
      setActiveImg(0)
    }
  }, [product])

  const pct = product ? discountPct(product.price, product.compareAt) : null

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 z-[70] bg-black/50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Quick View
              </span>
              <button type="button" aria-label="Close quick view" onClick={() => setQuickView(null)}>
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="relative aspect-[3/4] bg-muted">
                <Image
                  src={product.gallery[activeImg] || product.image}
                  alt={product.title}
                  fill
                  sizes="448px"
                  className="object-cover"
                />
                {pct && (
                  <span className="absolute left-4 top-4 bg-gold px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-foreground">
                    {pct}% Off
                  </span>
                )}
              </div>
              {product.gallery.length > 1 && (
                <div className="flex gap-2 px-5 pt-3">
                  {product.gallery.map((g, i) => (
                    <button
                      key={g + i}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      className={cn(
                        'relative h-16 w-12 overflow-hidden border',
                        activeImg === i ? 'border-primary' : 'border-border',
                      )}
                    >
                      <Image src={g || '/placeholder.svg'} alt="" fill sizes="48px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="px-5 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {product.brand}
                </p>
                <h2 className="mt-1 font-serif text-xl leading-tight">{product.title}</h2>
                <div className="mt-2 flex items-center gap-2.5">
                  <span className="text-lg font-medium">{formatINR(product.price)}</span>
                  {product.compareAt && (
                    <span className="text-sm text-muted-foreground line-through">{formatINR(product.compareAt)}</span>
                  )}
                </div>
                {product.express && (
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-foreground">
                    <Zap className="h-3.5 w-3.5 text-gold" strokeWidth={2} /> Express 24h Delivery
                  </span>
                )}

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

                {product.sizes[0] !== 'One Size' && (
                  <div className="mt-6">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em]">Select Size</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSize(s)}
                          className={cn(
                            'min-w-11 border px-3 py-2 text-xs tracking-wide transition-colors',
                            size === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary',
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-border p-5">
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={product.sizes[0] !== 'One Size' && !size}
                  onClick={() => addToCart(product, size || 'One Size')}
                  className="flex-1 bg-primary py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {product.sizes[0] !== 'One Size' && !size ? 'Select a Size' : 'Add to Bag'}
                </button>
                <button
                  type="button"
                  aria-label="Add to wishlist"
                  onClick={() => toggleWishlist(product.id)}
                  className="flex w-12 items-center justify-center border border-border transition-colors hover:border-primary"
                >
                  <Heart
                    className={cn('h-4 w-4', isWishlisted(product.id) ? 'fill-gold text-gold' : 'text-foreground')}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
              <Link
                href={`/product/${product.slug}`}
                onClick={() => setQuickView(null)}
                className="mt-3 block text-center text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                View Full Details
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
