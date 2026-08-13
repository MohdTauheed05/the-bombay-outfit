import type { Product } from './products'

/**
 * Deterministic pseudo-random helpers derived from a product's id.
 * The catalog (lib/products.ts) doesn't carry rating/stock data, so we
 * derive stable, hydration-safe values from the id instead of storing
 * mock fields on the product record itself.
 */
function hash(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h << 5) - h + id.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function getRating(product: Product): number {
  const h = hash(product.id)
  // 4.1 - 4.9
  return Math.round((4.1 + (h % 9) / 10) * 10) / 10
}

export function getReviewCount(product: Product): number {
  const h = hash(product.id + 'reviews')
  return 18 + (h % 210)
}

export function getStock(product: Product): { inStock: boolean; count: number; lowStock: boolean } {
  const h = hash(product.id + 'stock')
  const count = h % 26
  return { inStock: count > 0, count, lowStock: count > 0 && count <= 4 }
}

export const SIZE_GUIDE_NOTE =
  'Runs true to size. If between sizes, we recommend sizing up for a relaxed fit.'

export const SPECIFICATIONS_FALLBACK = [
  { label: 'Country of Origin', value: 'Imported' },
  { label: 'Care', value: 'See fabric & care notes' },
  { label: 'SKU', value: 'Generated at checkout' },
]

export function getSpecifications(product: Product): { label: string; value: string }[] {
  return [
    { label: 'Brand', value: product.brand },
    { label: 'Category', value: product.category },
    { label: 'Colourway', value: product.colorway },
    { label: 'Material & Care', value: product.fabric },
    { label: 'Country of Origin', value: 'Imported' },
    { label: 'Available Sizes', value: product.sizes.join(', ') },
  ]
}

export type Review = {
  id: string
  author: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
}

const REVIEW_AUTHORS = ['Arjun M.', 'Kabir S.', 'Rohan V.', 'Aditya K.', 'Vikram R.', 'Nikhil T.', 'Rahul D.']
const REVIEW_TITLES = [
  'Exceptional quality',
  'Worth every rupee',
  'Fits perfectly',
  'Better than expected',
  'A new favourite',
  'Impeccable craftsmanship',
]
const REVIEW_BODIES = [
  'The construction and finish are exactly what you would hope for at this price point. Delivery was prompt and the packaging felt premium from the moment it arrived.',
  'Have owned this for a few weeks now and it has held up beautifully. True to size and the material feels substantial without being heavy.',
  'Bought this for a wedding and received so many compliments. The attention to detail on the finishing is genuinely impressive.',
  'Customer service helped me pick the right size and it arrived a day early. Couldn\u2019t be happier with the purchase.',
]

export function getReviews(product: Product): Review[] {
  const h = hash(product.id + 'reviewlist')
  const count = 3 + (h % 3)
  return Array.from({ length: count }).map((_, i) => {
    const seed = hash(product.id + 'r' + i)
    return {
      id: `${product.id}-review-${i}`,
      author: REVIEW_AUTHORS[seed % REVIEW_AUTHORS.length],
      rating: 4 + (seed % 2),
      title: REVIEW_TITLES[seed % REVIEW_TITLES.length],
      body: REVIEW_BODIES[seed % REVIEW_BODIES.length],
      date: new Date(Date.now() - (seed % 90) * 86400000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      verified: seed % 4 !== 0,
    }
  })
}
