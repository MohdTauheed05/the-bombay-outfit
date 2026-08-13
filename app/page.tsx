import Link from 'next/link'
import Image from 'next/image'
import { SiteShell } from '@/components/layout/site-shell'
import { Hero } from '@/components/home/hero'
import { BrandMarquee } from '@/components/home/brand-marquee'
import { ProductCarousel } from '@/components/home/product-carousel'
import { getAllProducts } from '@/lib/products-firestore'

const EDITS = [
  { label: 'The Tailoring Edit', image: '/edit-tailoring.png', category: 'Apparel' },
  { label: 'Fine Leather', image: '/edit-leather.png', category: 'Leather Goods' },
  { label: 'Swiss Precision', image: '/edit-timepieces.png', category: 'Swiss Timepieces' },
  { label: 'Statement Eyewear', image: '/edit-accessories.png', category: 'Sunglasses' },
]

export default async function Page() {
  const products = await getAllProducts()
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8)
  const bestsellers = products.filter((p) => !p.isNew).slice(0, 8)

  return (
    <SiteShell>
      <Hero />
      <BrandMarquee />

      <ProductCarousel
        eyebrow="Fresh Off The Runway"
        title="New Arrivals"
        href="/shop"
        products={newArrivals.length > 0 ? newArrivals : products.slice(0, 8)}
      />

      <section className="mx-auto max-w-[1600px] px-5 py-4 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {EDITS.map((edit) => (
            <Link
              key={edit.label}
              href={`/shop?category=${encodeURIComponent(edit.category)}`}
              className="group relative aspect-[3/4] overflow-hidden bg-muted"
            >
              <Image
                src={edit.image || '/placeholder.svg'}
                alt={edit.label}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-5">
                <p className="font-serif text-lg text-white">{edit.label}</p>
                <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProductCarousel
        eyebrow="Most Coveted"
        title="Bestsellers"
        href="/shop"
        products={bestsellers.length > 0 ? bestsellers : products.slice(8, 16)}
      />
    </SiteShell>
  )
}
