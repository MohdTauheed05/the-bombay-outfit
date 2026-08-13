import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { verifyAdminRequest } from '@/lib/verify-admin'
import { products as staticProducts } from '@/lib/products'

export async function POST(request: Request) {
  const admin = await verifyAdminRequest(request)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const existing = await adminDb.collection('products').limit(1).get()
  if (!existing.empty) {
    return NextResponse.json(
      { error: 'Products already exist in Firestore. Seed skipped to avoid duplicates.' },
      { status: 409 },
    )
  }

  const batch = adminDb.batch()
  for (const p of staticProducts) {
    const ref = adminDb.collection('products').doc()
    batch.set(ref, {
      slug: p.slug,
      brand: p.brand,
      title: p.title,
      category: p.category,
      price: p.price,
      compareAt: p.compareAt ?? null,
      image: p.image,
      hoverImage: p.hoverImage,
      gallery: p.gallery,
      sizes: p.sizes,
      express: p.express,
      isNew: p.isNew ?? false,
      colorway: p.colorway,
      description: p.description,
      fabric: p.fabric,
      designerProfile: p.designerProfile,
      createdAt: new Date().toISOString(),
    })
  }
  await batch.commit()

  return NextResponse.json({ seeded: staticProducts.length })
}
