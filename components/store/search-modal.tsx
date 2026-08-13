'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react'
import { useStore } from './store-provider'
import { useProducts } from '@/lib/use-products'
import { formatINR } from '@/lib/products'
import { cn } from '@/lib/utils'

const SUGGESTIONS = ['Tailored Suits', 'Chronographs', 'Leather Sneakers', 'Kurta Sets', 'Sunglasses']
const DEBOUNCE_MS = 200

export function SearchModal() {
  const { ui, setSearchOpen } = useStore()
  const { products } = useProducts()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ui.searchOpen) {
      setQuery('')
      setDebouncedQuery('')
      setHighlighted(0)
    }
  }, [ui.searchOpen])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return []
    const q = debouncedQuery.toLowerCase()
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
      .slice(0, 6)
  }, [debouncedQuery, products])

  // Rows a person can move through with arrow keys: each result, plus a
  // trailing "view all results" row when there's an active query.
  const rowCount = results.length + (debouncedQuery.trim() ? 1 : 0)

  useEffect(() => {
    setHighlighted(0)
  }, [debouncedQuery])

  const goToFullResults = useCallback(() => {
    if (!query.trim()) return
    setSearchOpen(false)
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }, [query, router, setSearchOpen])

  const goToProduct = useCallback(
    (slug: string) => {
      setSearchOpen(false)
      router.push(`/product/${slug}`)
    },
    [router, setSearchOpen],
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchOpen(false)
      return
    }
    if (rowCount === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => (h + 1) % rowCount)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => (h - 1 + rowCount) % rowCount)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlighted < results.length) {
        goToProduct(results[highlighted].slug)
      } else {
        goToFullResults()
      }
    }
  }

  return (
    <AnimatePresence>
      {ui.searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-[60] bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-0 z-[61] bg-background"
          >
            <div className="mx-auto max-w-3xl px-5 py-8">
              <div className="flex items-center gap-3 border-b border-primary pb-3">
                <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for products, brands or categories"
                  role="combobox"
                  aria-expanded={rowCount > 0}
                  className="w-full bg-transparent font-serif text-lg outline-none placeholder:text-muted-foreground/70 sm:text-xl"
                />
                <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              {!query.trim() && (
                <div className="mt-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Trending Searches
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setQuery(s)
                          inputRef.current?.focus()
                        }}
                        className="border border-border px-3 py-1.5 text-xs tracking-wide transition-colors hover:border-primary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && (
                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      No results for &ldquo;{debouncedQuery}&rdquo;
                    </p>
                  ) : (
                    <ul className="divide-y divide-border">
                      {results.map((p, i) => (
                        <li key={p.id}>
                          <Link
                            href={`/product/${p.slug}`}
                            onClick={() => setSearchOpen(false)}
                            onMouseEnter={() => setHighlighted(i)}
                            className={cn(
                              'flex items-center gap-4 py-3 transition-colors',
                              highlighted === i ? 'bg-muted/60' : 'hover:bg-muted/60',
                            )}
                          >
                            <Image
                              src={p.image || '/placeholder.svg'}
                              alt={p.title}
                              width={56}
                              height={72}
                              className="h-18 w-14 object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                {p.brand}
                              </p>
                              <p className="truncate text-sm">{p.title}</p>
                            </div>
                            <span className="text-sm font-medium">{formatINR(p.price)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {results.length > 0 && (
                    <button
                      type="button"
                      onClick={goToFullResults}
                      onMouseEnter={() => setHighlighted(results.length)}
                      className={cn(
                        'mt-1 flex w-full items-center justify-between border-t border-border py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.14em]',
                        highlighted === results.length && 'text-gold',
                      )}
                    >
                      <span className="inline-flex items-center gap-2">
                        View all results for &ldquo;{query}&rdquo;
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                      <span className="hidden items-center gap-1 text-[10px] font-normal normal-case tracking-normal text-muted-foreground sm:inline-flex">
                        <CornerDownLeft className="h-3 w-3" strokeWidth={1.5} /> Enter
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
