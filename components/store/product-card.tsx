'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, Zap } from 'lucide-react'
import { useStore } from './store-provider'
import { type Product, formatINR, discountPct } from '@/lib/products'
import { cn } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWishlisted, setQuickView } = useStore()
  const pct = discountPct(product.price, product.compareAt)
  const wished = isWishlisted(product.id)

  return (
    <div className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Link href={`/product/${product.slug}`} aria-label={product.title}>
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={product.hoverImage || '/placeholder.svg'}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {pct && (
            <span className="bg-gold px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-foreground">
              {pct}% Off
            </span>
          )}
          {product.isNew && !pct && (
            <span className="bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
              New In
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-background/85 backdrop-blur transition-colors hover:bg-background"
        >
          <Heart
            className={cn('h-4 w-4', wished ? 'fill-gold text-gold' : 'text-foreground')}
            strokeWidth={1.5}
          />
        </button>

        {/* Express tag */}
        {product.express && (
          <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1 bg-background/85 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-foreground backdrop-blur">
            <Zap className="h-3 w-3 text-gold" strokeWidth={2} /> Express 24h
          </span>
        )}

        {/* Quick view */}
        <button
          type="button"
          onClick={() => setQuickView(product)}
          className="absolute inset-x-3 bottom-3 translate-y-3 bg-primary/95 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground opacity-0 backdrop-blur transition-all duration-300 hover:bg-primary group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2">
            <Eye className="h-3.5 w-3.5" strokeWidth={1.5} /> Quick View
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{product.brand}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm leading-snug text-foreground transition-colors hover:text-gold">{product.title}</h3>
        </Link>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-sm font-medium">{formatINR(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">{formatINR(product.compareAt)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
