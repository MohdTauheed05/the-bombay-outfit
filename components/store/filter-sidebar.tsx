'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, RotateCcw } from 'lucide-react'
import { formatINR } from '@/lib/products'
import { cn } from '@/lib/utils'

export type ShopFilters = {
  categories: string[]
  minPrice: number
  maxPrice: number
  availableOnly: boolean
}

export function emptyFilters(bounds: { min: number; max: number }): ShopFilters {
  return { categories: [], minPrice: bounds.min, maxPrice: bounds.max, availableOnly: false }
}

function FilterContent({
  filters,
  onChange,
  categories,
  bounds,
  onReset,
}: {
  filters: ShopFilters
  onChange: (next: ShopFilters) => void
  categories: string[]
  bounds: { min: number; max: number }
  onReset: () => void
}) {
  const toggleCategory = (cat: string) => {
    onChange({
      ...filters,
      categories: filters.categories.includes(cat)
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    })
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.minPrice > bounds.min ||
    filters.maxPrice < bounds.max ||
    filters.availableOnly

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" strokeWidth={1.5} /> Reset
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Category</p>
        <ul className="space-y-2.5">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="h-4 w-4 shrink-0 accent-primary"
                />
                <span className="text-foreground/90">{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price range */}
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Price Range
        </p>
        <div className="space-y-3">
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={1000}
            value={filters.maxPrice}
            onChange={(e) => {
              const next = Number(e.target.value)
              onChange({ ...filters, maxPrice: Math.max(next, filters.minPrice) })
            }}
            className="w-full accent-primary"
            aria-label="Maximum price"
          />
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-[10px] uppercase tracking-wide text-muted-foreground">Min</label>
              <input
                type="number"
                min={bounds.min}
                max={filters.maxPrice}
                value={filters.minPrice}
                onChange={(e) =>
                  onChange({ ...filters, minPrice: Math.min(Number(e.target.value) || 0, filters.maxPrice) })
                }
                className="w-full border border-border px-2.5 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <span className="mt-4 text-muted-foreground">&ndash;</span>
            <div className="flex-1">
              <label className="mb-1 block text-[10px] uppercase tracking-wide text-muted-foreground">Max</label>
              <input
                type="number"
                min={filters.minPrice}
                max={bounds.max}
                value={filters.maxPrice}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    maxPrice: Math.max(Number(e.target.value) || 0, filters.minPrice),
                  })
                }
                className="w-full border border-border px-2.5 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatINR(filters.minPrice)} &ndash; {formatINR(filters.maxPrice)}
          </p>
        </div>
      </div>

      {/* Availability */}
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Availability
        </p>
        <button
          type="button"
          onClick={() => onChange({ ...filters, availableOnly: !filters.availableOnly })}
          className="flex w-full items-center justify-between border border-border px-3 py-3 text-left"
        >
          <span className="text-sm">In Stock Only</span>
          <span
            className={cn(
              'relative h-5 w-9 shrink-0 rounded-full transition-colors',
              filters.availableOnly ? 'bg-primary' : 'bg-muted-foreground/40',
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-4 w-4 rounded-full bg-background transition-transform',
                filters.availableOnly ? 'left-0.5 translate-x-4' : 'left-0.5',
              )}
            />
          </span>
        </button>
      </div>
    </div>
  )
}

export function FilterSidebar(props: {
  filters: ShopFilters
  onChange: (next: ShopFilters) => void
  categories: string[]
  bounds: { min: number; max: number }
  onReset: () => void
}) {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-28">
        <FilterContent {...props} />
      </div>
    </aside>
  )
}

export function MobileFilterDrawer({
  open,
  onClose,
  resultCount,
  ...props
}: {
  open: boolean
  onClose: () => void
  resultCount: number
  filters: ShopFilters
  onChange: (next: ShopFilters) => void
  categories: string[]
  bounds: { min: number; max: number }
  onReset: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/50 lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 left-0 z-[71] flex w-[86%] max-w-sm flex-col bg-background lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">Filters</span>
              <button type="button" aria-label="Close filters" onClick={onClose}>
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <FilterContent {...props} />
            </div>
            <div className="border-t border-border p-5">
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-primary py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Show {resultCount} {resultCount === 1 ? 'Result' : 'Results'}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
