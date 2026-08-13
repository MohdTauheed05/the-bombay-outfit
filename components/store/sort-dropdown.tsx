'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SortValue = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'popularity'

const OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export function SortDropdown({
  value,
  onChange,
}: {
  value: SortValue
  onChange: (value: SortValue) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0]

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-primary"
      >
        Sort: <span className="text-muted-foreground">{current.label}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} strokeWidth={1.5} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-20 mt-2 w-56 border border-border bg-background py-1 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]"
        >
          {OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt.value}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center justify-between px-4 py-2.5 text-left text-[13px] tracking-wide transition-colors hover:bg-muted',
                  value === opt.value && 'text-primary font-medium',
                )}
              >
                {opt.label}
                {value === opt.value && <Check className="h-3.5 w-3.5" strokeWidth={1.5} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
