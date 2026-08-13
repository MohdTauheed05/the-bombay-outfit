'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { ProductGrid } from '@/components/store/product-grid'
import { useStore } from '@/components/store/store-provider'
import { products } from '@/lib/products'

export default function WishlistPage() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-8 lg:py-12">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Saved For Later</p>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">Your Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-border px-6 py-24 text-center">
            <Heart className="h-10 w-10 text-muted-foreground" strokeWidth={1} />
            <p className="font-serif text-lg">Your wishlist is empty</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Tap the heart icon on any product to save it here for later.
            </p>
            <Link
              href="/shop"
              className="mt-2 bg-primary px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </SiteShell>
  )
}
