'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Star, Heart, Minus, Plus, Zap, Truck, ShieldCheck, ChevronDown, Check } from 'lucide-react'
import { useStore } from './store-provider'
import { type Product, formatINR, discountPct } from '@/lib/products'
import { getRating, getReviewCount, getStock, getSpecifications, getReviews } from '@/lib/product-meta'
import { cn } from '@/lib/utils'

function StarRating({ rating, size = 'h-3.5 w-3.5' }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= Math.round(rating)
        return (
          <Star
            key={i}
            className={cn(size, filled ? 'fill-gold text-gold' : 'text-border')}
            strokeWidth={1.5}
          />
        )
      })}
    </div>
  )
}

function AccordionSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">{title}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')}
          strokeWidth={1.5}
        />
      </button>
      {open && <div className="pb-5 text-sm leading-relaxed text-muted-foreground">{children}</div>}
    </div>
  )
}

export function ProductInfo({ product }: { product: Product }) {
  const router = useRouter()
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const [size, setSize] = useState<string>(product.sizes.length === 1 ? product.sizes[0] : '')
  const [qty, setQty] = useState(1)

  const pct = discountPct(product.price, product.compareAt)
  const rating = getRating(product)
  const reviewCount = getReviewCount(product)
  const stock = getStock(product)
  const specs = getSpecifications(product)
  const reviews = getReviews(product)
  const wished = isWishlisted(product.id)
  const isOneSize = product.sizes[0] === 'One Size'
  const needsSize = !isOneSize && !size

  const handleAddToCart = () => {
    if (needsSize || !stock.inStock) return
    addToCart(product, size || 'One Size', qty)
  }

  const handleBuyNow = () => {
    if (needsSize || !stock.inStock) return
    addToCart(product, size || 'One Size', qty)
    router.push('/checkout')
  }

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</p>
      <h1 className="mt-1.5 font-serif text-2xl font-bold leading-tight sm:text-3xl">{product.title}</h1>

      <div className="mt-3 flex items-center gap-2.5">
        <StarRating rating={rating} />
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} &middot; {reviewCount} Reviews
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-xl font-medium">{formatINR(product.price)}</span>
        {product.compareAt && (
          <>
            <span className="text-sm text-muted-foreground line-through">{formatINR(product.compareAt)}</span>
            {pct && (
              <span className="bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-foreground">
                {pct}% Off
              </span>
            )}
          </>
        )}
      </div>

      {/* Stock badge */}
      <div className="mt-3">
        {stock.inStock ? (
          stock.lowStock ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" /> Only {stock.count} left in stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80">
              <Check className="h-3.5 w-3.5 text-gold" strokeWidth={2} /> In Stock
            </span>
          )
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /> Out of Stock
          </span>
        )}
        {product.express && stock.inStock && (
          <span className="ml-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.08em] text-foreground/80">
            <Zap className="h-3.5 w-3.5 text-gold" strokeWidth={2} /> Express 24h Delivery
          </span>
        )}
      </div>

      {/* Colour (single colourway) */}
      <div className="mt-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
          Colour: <span className="font-normal normal-case text-muted-foreground">{product.colorway}</span>
        </p>
        <span className="inline-flex h-9 w-9 items-center justify-center border-2 border-primary p-0.5">
          <span className="h-full w-full bg-foreground" aria-hidden />
        </span>
      </div>

      {/* Size */}
      {!isOneSize && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">Select Size</p>
            <button type="button" className="text-[11px] text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  'min-w-12 border px-3 py-2.5 text-xs tracking-wide transition-colors',
                  size === s
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mt-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em]">Quantity</p>
        <div className="inline-flex items-center border border-border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3.5 py-2.5 hover:bg-muted"
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
          <span className="min-w-10 text-center text-sm">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="px-3.5 py-2.5 hover:bg-muted"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-7 flex gap-3">
        <button
          type="button"
          disabled={needsSize || !stock.inStock}
          onClick={handleAddToCart}
          className="flex-1 bg-primary py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!stock.inStock ? 'Out of Stock' : needsSize ? 'Select a Size' : 'Add to Bag'}
        </button>
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={() => toggleWishlist(product.id)}
          className="flex w-14 items-center justify-center border border-border transition-colors hover:border-primary"
        >
          <Heart className={cn('h-4 w-4', wished ? 'fill-gold text-gold' : 'text-foreground')} strokeWidth={1.5} />
        </button>
      </div>
      <button
        type="button"
        disabled={needsSize || !stock.inStock}
        onClick={handleBuyNow}
        className="mt-3 w-full border border-primary py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        Buy Now
      </button>

      <div className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
        Secure Razorpay / UPI checkout &middot; 7-day returns
      </div>

      {/* Accordion */}
      <div className="mt-10 border-t border-border">
        <AccordionSection title="Description" defaultOpen>
          <p>{product.description}</p>
        </AccordionSection>

        <AccordionSection title="Specifications">
          <dl className="space-y-2.5">
            {specs.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 border-b border-border/60 pb-2 text-sm">
                <dt className="text-foreground/70">{row.label}</dt>
                <dd className="text-right text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </AccordionSection>

        <AccordionSection title="Shipping & Returns">
          <ul className="space-y-3">
            <li className="flex gap-3">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span>
                {product.express
                  ? 'Express same-day delivery in Mumbai & Delhi; 2\u20134 business days nationwide.'
                  : 'Delivered in 3\u20136 business days nationwide.'}{' '}
                Free shipping on all orders.
              </span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span>7-day hassle-free returns and exchanges. Items must be unworn with original tags attached.</span>
            </li>
          </ul>
        </AccordionSection>

        <AccordionSection title={`Customer Reviews (${reviewCount})`}>
          <div className="space-y-5">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border/60 pb-5 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <StarRating rating={review.rating} size="h-3 w-3" />
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">{review.title}</p>
                <p className="mt-1 text-sm">{review.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {review.author}
                  {review.verified && <span className="ml-2 text-gold">Verified Purchase</span>}
                </p>
              </div>
            ))}
          </div>
        </AccordionSection>
      </div>
    </div>
  )
}
