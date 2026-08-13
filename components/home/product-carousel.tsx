'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/store/product-card'
import { SectionHeading } from './section-heading'
import type { Product } from '@/lib/products'

export function ProductCarousel({
  eyebrow,
  title,
  href,
  products,
}: {
  eyebrow?: string
  title: string
  href?: string
  products: Product[]
}) {
  const scroller = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-14 lg:px-8 lg:py-20">
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <SectionHeading eyebrow={eyebrow} title={title} href={href} />
        </div>
        <div className="mb-8 hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-primary"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-primary"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 lg:mx-0 lg:px-0"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[64%] shrink-0 snap-start sm:w-[38%] lg:w-[23.5%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
