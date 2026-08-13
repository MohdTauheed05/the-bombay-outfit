import { ProductCarousel } from '@/components/home/product-carousel'
import { getAllProducts } from '@/lib/products-firestore'
import type { Product } from '@/lib/products'

export async function RelatedProducts({ product }: { product: Product }) {
  const products = await getAllProducts()
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 8)

  const fallback = related.length > 0 ? related : products.filter((p) => p.id !== product.id).slice(0, 8)

  if (fallback.length === 0) return null

  return (
    <div className="border-t border-border">
      <ProductCarousel
        eyebrow="You May Also Like"
        title="Complete The Look"
        href={`/shop?category=${encodeURIComponent(product.category)}`}
        products={fallback}
      />
    </div>
  )
}
