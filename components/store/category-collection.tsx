'use client'

import { useMemo, useState } from 'react'
import { ProductGrid } from './product-grid'
import { SortDropdown, type SortValue } from './sort-dropdown'
import { getRating } from '@/lib/product-meta'
import type { Product } from '@/lib/products'

export function CategoryCollection({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortValue>('featured')

  const sorted = useMemo(() => {
    const list = [...products]
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      case 'newest':
        return list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false))
      case 'popularity':
        return list.sort((a, b) => getRating(b) - getRating(a))
      default:
        return list
    }
  }, [products, sort])

  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-y border-border py-3.5">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {sorted.length} {sorted.length === 1 ? 'Product' : 'Products'}
        </p>
        <SortDropdown value={sort} onChange={setSort} />
      </div>
      <div className="pt-8">
        <ProductGrid products={sorted} />
      </div>
    </div>
  )
}
