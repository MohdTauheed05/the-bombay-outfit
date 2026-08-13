'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, Loader2 } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { ProductGrid } from '@/components/store/product-grid'
import { FilterSidebar, MobileFilterDrawer, emptyFilters, type ShopFilters } from '@/components/store/filter-sidebar'
import { SortDropdown, type SortValue } from '@/components/store/sort-dropdown'
import { useProducts } from '@/lib/use-products'
import { getRating, getStock } from '@/lib/product-meta'

function useBounds(allProducts: { price: number }[]) {
  return useMemo(() => {
    if (allProducts.length === 0) return { min: 0, max: 100000 }
    const prices = allProducts.map((p) => p.price)
    return { min: 0, max: Math.ceil(Math.max(...prices) / 1000) * 1000 }
  }, [allProducts])
}

function ShopPageInner() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category')
  const { products: allProducts, loading } = useProducts()
  const bounds = useBounds(allProducts)

  const categories = useMemo(
    () => Array.from(new Set(allProducts.map((p) => p.category))).sort(),
    [allProducts],
  )

  const [filters, setFilters] = useState<ShopFilters>(() => emptyFilters({ min: 0, max: 100000 }))
  const [initialized, setInitialized] = useState(false)

  if (!initialized && allProducts.length > 0) {
    const base = emptyFilters(bounds)
    if (initialCategory) {
      const match = categories.find((c) => c.toLowerCase() === initialCategory.toLowerCase())
      if (match) base.categories = [match]
    }
    setFilters(base)
    setInitialized(true)
  }

  const [sort, setSort] = useState<SortValue>('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false
      if (filters.availableOnly && !getStock(p).inStock) return false
      return true
    })

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'newest':
        list = [...list].sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false))
        break
      case 'popularity':
        list = [...list].sort((a, b) => getRating(b) - getRating(a))
        break
      default:
        break
    }
    return list
  }, [allProducts, filters, sort])

  const reset = () => setFilters(emptyFilters(bounds))

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-8 lg:py-12">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">The Collection</p>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">Shop All</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Tailoring, Swiss timepieces, fine leather and considered accessories, curated for the modern gentleman.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 border-y border-border py-3.5">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} /> Filters
                {(filters.categories.length > 0 || filters.availableOnly) && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground">
                    {filters.categories.length + (filters.availableOnly ? 1 : 0)}
                  </span>
                )}
              </button>
              <p className="hidden text-xs uppercase tracking-[0.14em] text-muted-foreground lg:block">
                {filtered.length} {filtered.length === 1 ? 'Product' : 'Products'}
              </p>
              <div className="ml-auto">
                <SortDropdown value={sort} onChange={setSort} />
              </div>
            </div>

            <div className="flex gap-10 pt-8">
              <FilterSidebar filters={filters} onChange={setFilters} categories={categories} bounds={bounds} onReset={reset} />

              <div className="min-w-0 flex-1">
                <ProductGrid products={filtered} onResetFilters={reset} />
              </div>
            </div>
          </>
        )}
      </div>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        resultCount={filtered.length}
        filters={filters}
        onChange={setFilters}
        categories={categories}
        bounds={bounds}
        onReset={reset}
      />
    </SiteShell>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageInner />
    </Suspense>
  )
}
