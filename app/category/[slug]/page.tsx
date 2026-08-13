import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { SiteShell } from '@/components/layout/site-shell'
import { CategoryCollection } from '@/components/store/category-collection'
import { categories, megaMenu, resolveCollection, slugifyCategory } from '@/lib/products'

export function generateStaticParams() {
  return categories.map((c) => ({ slug: slugifyCategory(c) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const collection = resolveCollection(slug)
  if (!collection) return { title: 'Not Found | The Bombay Outfit' }

  return {
    title: `${collection.label} | The Bombay Outfit`,
    description: `Shop ${collection.label} at The Bombay Outfit \u2014 curated menswear, delivered across India.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = resolveCollection(slug)
  if (!collection) notFound()

  const feature = megaMenu[collection.label]?.feature

  return (
    <SiteShell>
      <section className="relative h-[34vh] min-h-[240px] w-full overflow-hidden bg-primary">
        <Image
          src={feature?.image || '/hero-aw-collection.png'}
          alt={collection.label}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative flex h-full flex-col items-center justify-end px-5 pb-10 text-center text-white">
          <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-xs text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
            <span className="text-white">{collection.label}</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">{collection.label}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-8 lg:py-12">
        <CategoryCollection products={collection.items} />
      </div>
    </SiteShell>
  )
}
