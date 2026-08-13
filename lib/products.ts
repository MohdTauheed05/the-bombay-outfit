export type Product = {
  id: string
  slug: string
  brand: string
  title: string
  category: string
  price: number
  compareAt?: number
  image: string
  hoverImage: string
  gallery: string[]
  sizes: string[]
  express: boolean
  isNew?: boolean
  colorway: string
  description: string
  fabric: string
  designerProfile: string
}

export function formatINR(value: number): string {
  return '\u20B9' + value.toLocaleString('en-IN')
}

export function discountPct(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null
  return Math.round(((compareAt - price) / compareAt) * 100)
}

const APPAREL_SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const SHOE_SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
const ONE_SIZE = ['One Size']

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'noir-double-breasted-wool-suit',
    brand: 'Sartoria Milano',
    title: 'Noir Double-Breasted Wool Suit',
    category: 'Apparel',
    price: 149900,
    compareAt: 199000,
    image: '/product-suit.png',
    hoverImage: '/edit-tailoring.png',
    gallery: ['/product-suit.png', '/edit-tailoring.png', '/hero-aw-collection.png'],
    sizes: APPAREL_SIZES,
    express: true,
    isNew: true,
    colorway: 'Deep Noir',
    description:
      'A masterfully cut double-breasted silhouette in pure Italian wool. Structured shoulders, a peak lapel and a tapered waist deliver an authoritative, red-carpet-ready line.',
    fabric: '100% Super 150s Italian wool. Dry clean only. Rest on a broad wooden hanger between wears.',
    designerProfile:
      'Sartoria Milano is a house of master tailors blending Milanese precision with contemporary Indian occasion dressing.',
  },
  {
    id: 'p2',
    slug: 'ivory-silk-embroidered-kurta-set',
    brand: 'Raghavendra Rathore',
    title: 'Ivory Silk Embroidered Kurta Set',
    category: 'Apparel',
    price: 84500,
    compareAt: 112000,
    image: '/product-kurta.png',
    hoverImage: '/hero-aw-collection.png',
    gallery: ['/product-kurta.png', '/hero-aw-collection.png'],
    sizes: APPAREL_SIZES,
    express: true,
    isNew: true,
    colorway: 'Ivory',
    description:
      'An heirloom-worthy silk kurta set with tonal thread embroidery, tailored for weddings and celebrations. Comes with matching churidar.',
    fabric: 'Pure mulberry silk with hand-finished embroidery. Dry clean only.',
    designerProfile:
      'Raghavendra Rathore is synonymous with regal Indian tailoring, reviving royal Jodhpur craftsmanship for the modern gentleman.',
  },
  {
    id: 'p3',
    slug: 'obsidian-leather-biker-jacket',
    brand: 'Maison Cuir',
    title: 'Obsidian Leather Biker Jacket',
    category: 'Apparel',
    price: 96000,
    image: '/product-jacket.png',
    hoverImage: '/edit-leather.png',
    gallery: ['/product-jacket.png', '/edit-leather.png'],
    sizes: APPAREL_SIZES,
    express: false,
    isNew: true,
    colorway: 'Obsidian Black',
    description:
      'A sculpted biker jacket in buttery full-grain lambskin with asymmetric zip and quilted shoulders. An enduring symbol of understated rebellion.',
    fabric: 'Full-grain lambskin leather, viscose lining. Wipe with a soft dry cloth; condition seasonally.',
    designerProfile:
      'Maison Cuir crafts leather goods in small ateliers, prizing patina, hand-stitching and lifelong wear.',
  },
  {
    id: 'p4',
    slug: 'alba-minimalist-leather-sneakers',
    brand: 'Corvari',
    title: 'Alba Minimalist Leather Sneakers',
    category: 'Apparel',
    price: 42500,
    compareAt: 56000,
    image: '/product-sneakers.png',
    hoverImage: '/edit-accessories.png',
    gallery: ['/product-sneakers.png', '/edit-accessories.png'],
    sizes: SHOE_SIZES,
    express: true,
    colorway: 'Optic White',
    description:
      'Clean, low-profile sneakers in supple Italian calfskin on a cup sole. The quiet-luxury answer to everyday footwear.',
    fabric: 'Italian calfskin upper, leather lining, rubber cup sole. Protect with leather spray.',
    designerProfile:
      'Corvari is a Tuscan footwear label celebrated for hand-dyed leathers and impeccably clean construction.',
  },
  {
    id: 'p5',
    slug: 'meridian-swiss-chronograph',
    brand: 'Aureus Genève',
    title: 'Meridian Swiss Automatic Chronograph',
    category: 'Swiss Timepieces',
    price: 349000,
    compareAt: 420000,
    image: '/product-watch.png',
    hoverImage: '/edit-timepieces.png',
    gallery: ['/product-watch.png', '/edit-timepieces.png'],
    sizes: ONE_SIZE,
    express: true,
    isNew: true,
    colorway: 'Black / Steel',
    description:
      'A Swiss-made automatic chronograph with a sunburst black dial, sapphire crystal and 100m water resistance. Precision engineered to be handed down.',
    fabric: 'Stainless steel case and bracelet, sapphire crystal, automatic movement. Service every 4-5 years.',
    designerProfile:
      'Aureus Genève is an independent Swiss maison producing limited-run mechanical watches with in-house calibres.',
  },
  {
    id: 'p6',
    slug: 'eclipse-acetate-sunglasses',
    brand: 'Vero Ottica',
    title: 'Eclipse Acetate Sunglasses',
    category: 'Sunglasses',
    price: 28900,
    image: '/product-sunglasses.png',
    hoverImage: '/edit-accessories.png',
    gallery: ['/product-sunglasses.png', '/edit-accessories.png'],
    sizes: ONE_SIZE,
    express: true,
    colorway: 'Gloss Black',
    description:
      'Bold squared frames hand-cut from Italian acetate with polarised lenses and 100% UV protection. Confident and timeless.',
    fabric: 'Italian acetate frame, CR-39 polarised lenses. Store in the supplied hard case.',
    designerProfile:
      'Vero Ottica hand-finishes every frame in Cadore, Italy, the historic heartland of luxury eyewear.',
  },
  {
    id: 'p7',
    slug: 'envoy-leather-briefcase',
    brand: 'Maison Cuir',
    title: 'Envoy Full-Grain Leather Briefcase',
    category: 'Leather Goods',
    price: 118000,
    compareAt: 145000,
    image: '/product-bag.png',
    hoverImage: '/edit-leather.png',
    gallery: ['/product-bag.png', '/edit-leather.png'],
    sizes: ONE_SIZE,
    express: false,
    isNew: true,
    colorway: 'Espresso Black',
    description:
      'A structured briefcase in vegetable-tanned full-grain leather with brass hardware and a padded laptop sleeve. Built to age beautifully.',
    fabric: 'Vegetable-tanned full-grain leather, brass fittings. Condition with leather balm every few months.',
    designerProfile:
      'Maison Cuir crafts leather goods in small ateliers, prizing patina, hand-stitching and lifelong wear.',
  },
  {
    id: 'p8',
    slug: 'the-ritual-grooming-collection',
    brand: 'Bombay Apothecary',
    title: 'The Ritual Grooming Collection',
    category: 'Grooming',
    price: 12900,
    compareAt: 16500,
    image: '/product-grooming.png',
    hoverImage: '/edit-accessories.png',
    gallery: ['/product-grooming.png', '/edit-accessories.png'],
    sizes: ONE_SIZE,
    express: true,
    colorway: 'Amber & Cedar',
    description:
      'A complete daily grooming ritual — cleanser, serum, beard oil and balm — formulated with vetiver, cedar and Kashmiri saffron.',
    fabric: 'Paraben-free, cruelty-free formulations in recyclable amber glass. Store away from direct sunlight.',
    designerProfile:
      'Bombay Apothecary blends Ayurvedic botanicals with modern dermatological science, handmade in small batches.',
  },
  {
    id: 'p9',
    slug: 'onyx-tuxedo-dinner-jacket',
    brand: 'Sartoria Milano',
    title: 'Onyx Tuxedo Dinner Jacket',
    category: 'Apparel',
    price: 132000,
    image: '/hero-aw-collection.png',
    hoverImage: '/product-suit.png',
    gallery: ['/hero-aw-collection.png', '/product-suit.png'],
    sizes: APPAREL_SIZES,
    express: true,
    colorway: 'Onyx',
    description:
      'A satin-lapel dinner jacket cut for black-tie occasions. Impeccably lined and lightly structured for effortless movement.',
    fabric: '100% wool with silk satin lapel. Dry clean only.',
    designerProfile:
      'Sartoria Milano is a house of master tailors blending Milanese precision with contemporary Indian occasion dressing.',
  },
  {
    id: 'p10',
    slug: 'heritage-monk-strap-shoes',
    brand: 'Corvari',
    title: 'Heritage Double Monk Strap Shoes',
    category: 'Apparel',
    price: 54000,
    compareAt: 68000,
    image: '/edit-leather.png',
    hoverImage: '/product-sneakers.png',
    gallery: ['/edit-leather.png', '/product-sneakers.png'],
    sizes: SHOE_SIZES,
    express: false,
    colorway: 'Dark Oak',
    description:
      'Goodyear-welted double monk straps in hand-patinated calf leather. A distinguished alternative to the classic Oxford.',
    fabric: 'Hand-patinated calf leather, leather sole. Use shoe trees and rotate wear.',
    designerProfile:
      'Corvari is a Tuscan footwear label celebrated for hand-dyed leathers and impeccably clean construction.',
  },
  {
    id: 'p11',
    slug: 'sovereign-gold-cufflink-set',
    brand: 'Aureus Genève',
    title: 'Sovereign Gold-Tone Cufflink Set',
    category: 'Leather Goods',
    price: 34500,
    image: '/edit-accessories.png',
    hoverImage: '/product-sunglasses.png',
    gallery: ['/edit-accessories.png', '/product-sunglasses.png'],
    sizes: ONE_SIZE,
    express: true,
    isNew: true,
    colorway: 'Brushed Gold',
    description:
      'Weighted cufflinks with a brushed gold-tone finish and onyx inlay, presented in a lacquered gift box.',
    fabric: 'Rhodium base with gold-tone plating and onyx inlay. Keep dry; polish with a soft cloth.',
    designerProfile:
      'Aureus Genève is an independent Swiss maison producing limited-run mechanical watches and fine accessories.',
  },
  {
    id: 'p12',
    slug: 'midnight-cashmere-overcoat',
    brand: 'Raghavendra Rathore',
    title: 'Midnight Cashmere Overcoat',
    category: 'Apparel',
    price: 168000,
    compareAt: 210000,
    image: '/hero-leather-editorial.png',
    hoverImage: '/edit-tailoring.png',
    gallery: ['/hero-leather-editorial.png', '/edit-tailoring.png'],
    sizes: APPAREL_SIZES,
    express: true,
    isNew: true,
    colorway: 'Midnight',
    description:
      'A single-breasted overcoat in pure cashmere with a clean notch lapel and a fluid, elongating drape. Winter luxury, distilled.',
    fabric: '100% cashmere, cupro lining. Dry clean only; store in a breathable garment bag.',
    designerProfile:
      'Raghavendra Rathore is synonymous with regal Indian tailoring, reviving royal Jodhpur craftsmanship for the modern gentleman.',
  },
]

export const categories = [
  'New In',
  'Apparel',
  'Leather Goods',
  'Swiss Timepieces',
  'Sunglasses',
  'Grooming',
  'Designers',
  'Sale',
]

export const megaMenu: Record<string, { columns: { heading: string; links: string[] }[]; feature: { image: string; label: string; cta: string } }> = {
  Apparel: {
    columns: [
      { heading: 'Tailoring', links: ['Tailored Suits', 'Dinner Jackets', 'Blazers', 'Trousers'] },
      { heading: 'Indian Wear', links: ['Kurta Sets', 'Bandhgalas', 'Sherwanis', 'Nehru Jackets'] },
      { heading: 'Outerwear', links: ['Overcoats', 'Leather Jackets', 'Knitwear', 'Shirts'] },
    ],
    feature: { image: '/edit-tailoring.png', label: 'The Tailoring Edit', cta: 'Shop Now' },
  },
  'Leather Goods': {
    columns: [
      { heading: 'Bags', links: ['Briefcases', 'Weekenders', 'Backpacks', 'Sling Bags'] },
      { heading: 'Small Leather', links: ['Wallets', 'Card Holders', 'Belts', 'Cufflinks'] },
      { heading: 'Footwear', links: ['Leather Sneakers', 'Monk Straps', 'Oxfords', 'Loafers'] },
    ],
    feature: { image: '/edit-leather.png', label: 'Fine Leather', cta: 'Discover' },
  },
  'Swiss Timepieces': {
    columns: [
      { heading: 'Complications', links: ['Chronographs', 'Automatics', 'GMT', 'Skeleton'] },
      { heading: 'By Style', links: ['Dress Watches', 'Sports Watches', 'Diver', 'Minimalist'] },
      { heading: 'Straps', links: ['Steel Bracelets', 'Leather Straps', 'Rubber', 'Boxes & Care'] },
    ],
    feature: { image: '/edit-timepieces.png', label: 'Swiss Precision', cta: 'Explore' },
  },
  Sunglasses: {
    columns: [
      { heading: 'Shapes', links: ['Square', 'Aviator', 'Round', 'Wayfarer'] },
      { heading: 'Materials', links: ['Acetate', 'Titanium', 'Polarised', 'Limited Edition'] },
    ],
    feature: { image: '/edit-accessories.png', label: 'Statement Eyewear', cta: 'Shop Now' },
  },
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function slugifyCategory(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-')
}

/**
 * Resolves a URL slug (e.g. "leather-goods") to a named collection of
 * products. Covers real product categories plus the virtual collections
 * shown in the header ("New In", "Sale", "Designers").
 */
export function resolveCollection(slug: string): { label: string; items: Product[] } | null {
  return resolveCollectionFromList(products, slug)
}

/**
 * Same resolution logic as resolveCollection, but operates on a caller-supplied
 * product list. Use this when the list came from Firestore rather than the
 * static seed array.
 */
export function resolveCollectionFromList(list: Product[], slug: string): { label: string; items: Product[] } | null {
  const match = categories.find((c) => slugifyCategory(c) === slug)
  if (!match) return null

  if (match === 'New In') {
    return { label: match, items: list.filter((p) => p.isNew) }
  }
  if (match === 'Sale') {
    return { label: match, items: list.filter((p) => discountPct(p.price, p.compareAt) !== null) }
  }
  if (match === 'Designers') {
    return { label: match, items: [...list].sort((a, b) => a.brand.localeCompare(b.brand)) }
  }
  return { label: match, items: list.filter((p) => p.category === match) }
}

export const brandMarquee = [
  'SARTORIA MILANO',
  'RAGHAVENDRA RATHORE',
  'AUREUS GENÈVE',
  'MAISON CUIR',
  'CORVARI',
  'VERO OTTICA',
  'BOMBAY APOTHECARY',
]
