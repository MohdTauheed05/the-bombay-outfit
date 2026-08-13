import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteShell } from '@/components/layout/site-shell'
import { ProductGallery } from '@/components/store/product-gallery'
import { ProductInfo } from '@/components/store/product-info'
import { RelatedProducts } from '@/components/store/related-products'
import { getProduct, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Product Not Found | The Bombay Outfit' }

  return {
    title: `${product.title} | ${product.brand} | The Bombay Outfit`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="transition-colors hover:text-foreground">
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <span className="truncate text-foreground/80">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.gallery.length > 0 ? product.gallery : [product.image]} title={product.title} />
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="mt-16">
        <RelatedProducts product={product} />
      </div>

      {/* Structured data for pricing/availability */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            brand: product.brand,
            description: product.description,
            image: product.gallery,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: product.price,
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
    </SiteShell>
  )
}
