'use client'

import { useEffect, useState } from 'react'
import { PackageSearch } from 'lucide-react'
import { ProductCard } from './product-card'
import type { Product } from '@/lib/products'

const PAGE_SIZE = 9

export function ProductGrid({
  products,
  onResetFilters,
}: {
  products: Product[]
  onResetFilters?: () => void
}) {
  const [visible, setVisible] = useState(PAGE_SIZE)

  // Reset pagination whenever the underlying filtered/sorted list changes.
  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [products])

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-border px-6 py-24 text-center">
        <PackageSearch className="h-10 w-10 text-muted-foreground" strokeWidth={1} />
        <p className="font-serif text-lg">No products match your filters</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Try adjusting or clearing your filters to see more of the collection.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-2 bg-primary px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Clear Filters
          </button>
        )}
      </div>
    )
  }

  const shown = products.slice(0, visible)
  const hasMore = visible < products.length

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-3">
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Showing {shown.length} of {products.length}
          </p>
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="border border-primary px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
