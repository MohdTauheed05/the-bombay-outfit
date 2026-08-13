import Image from 'next/image'
import type { Metadata } from 'next'
import { SiteShell } from '@/components/layout/site-shell'
import { CategoryCollection } from '@/components/store/category-collection'
import { discountPct } from '@/lib/products'
import { getAllProducts } from '@/lib/products-firestore'

export const metadata: Metadata = {
  title: 'Sale | The Bombay Outfit',
  description: 'Considered reductions on tailoring, leather, timepieces and accessories at The Bombay Outfit.',
}

export default async function SalePage() {
  const products = await getAllProducts()
  const saleItems = products.filter((p) => discountPct(p.price, p.compareAt) !== null)

  return (
    <SiteShell>
      <section className="relative h-[34vh] min-h-[240px] w-full overflow-hidden bg-primary">
        <Image
          src="/hero-leather-editorial.png"
          alt="Sale"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative flex h-full flex-col items-center justify-end px-5 pb-10 text-center text-white">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">Limited Time</p>
          <h1 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-4xl">The Sale</h1>
          <p className="mt-2 max-w-md text-sm text-white/80">
            Considered reductions across tailoring, leather, timepieces and accessories.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-8 lg:py-12">
        <CategoryCollection products={saleItems} />
      </div>
    </SiteShell>
  )
}
