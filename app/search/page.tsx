'use client'

import { Suspense, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { ProductGrid } from '@/components/store/product-grid'
import { useProducts } from '@/lib/use-products'
import { categories, megaMenu } from '@/lib/products'

function SearchPageInner() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const { products, loading } = useProducts()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.colorway.toLowerCase().includes(q),
    )
  }, [query, products])

  const suggestedCategories = categories.filter((c) => megaMenu[c])

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-8 lg:py-12">
        <div className="mb-8 max-w-xl">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Search</p>
          <div className="flex items-center gap-3 border-b border-primary pb-3">
            <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands or categories"
              className="w-full bg-transparent font-serif text-lg outline-none placeholder:text-muted-foreground/70"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
                <X className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : query.trim() ? (
          <>
            <p className="mb-6 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
            </p>

            {results.length > 0 ? (
              <ProductGrid products={results} />
            ) : (
              <div className="flex flex-col items-center gap-8 border border-dashed border-border px-6 py-20 text-center">
                <div>
                  <p className="font-serif text-xl">No results for &ldquo;{query}&rdquo;</p>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Try a different search term, or explore one of our curated collections below.
                  </p>
                </div>

                <div className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                  {suggestedCategories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/shop?category=${encodeURIComponent(cat)}`}
                      className="group relative aspect-[3/4] overflow-hidden bg-muted"
                    >
                      <Image
                        src={megaMenu[cat].feature.image || '/placeholder.svg'}
                        alt={cat}
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3">
                        <span className="text-xs font-medium uppercase tracking-[0.1em] text-white">{cat}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <p className="font-serif text-xl">Search The Bombay Outfit</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Find tailoring, timepieces, leather goods and accessories by name, brand or category.
            </p>
          </div>
        )}
      </div>
    </SiteShell>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  )
}
