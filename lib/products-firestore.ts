import { collection, doc, getDoc, getDocs, query, where, limit as fsLimit, type DocumentData } from 'firebase/firestore'
import { db } from './firebase'
import type { Product } from './products'

const PRODUCTS_COLLECTION = 'products'

function docToProduct(id: string, data: DocumentData): Product {
  return {
    id,
    slug: data.slug,
    brand: data.brand,
    title: data.title,
    category: data.category,
    price: data.price,
    compareAt: data.compareAt ?? undefined,
    image: data.image,
    hoverImage: data.hoverImage,
    gallery: data.gallery ?? [],
    sizes: data.sizes ?? [],
    express: !!data.express,
    isNew: data.isNew ?? undefined,
    colorway: data.colorway,
    description: data.description,
    fabric: data.fabric,
    designerProfile: data.designerProfile,
  }
}

/** Fetches every product in the catalog. Public read — allowed by Firestore rules. */
export async function getAllProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, PRODUCTS_COLLECTION))
  return snap.docs.map((d) => docToProduct(d.id, d.data()))
}

/** Fetches a single product by its Firestore document id. */
export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, PRODUCTS_COLLECTION, id))
  if (!snap.exists()) return null
  return docToProduct(snap.id, snap.data())
}

/** Fetches a single product by its storefront URL slug. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, PRODUCTS_COLLECTION), where('slug', '==', slug), fsLimit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return docToProduct(d.id, d.data())
}
