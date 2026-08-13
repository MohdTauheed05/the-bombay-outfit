import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { verifyAdminRequest } from '@/lib/verify-admin'

const REQUIRED_FIELDS = ['slug', 'brand', 'title', 'category', 'price', 'image', 'hoverImage'] as const

export async function POST(request: Request) {
  const admin = await verifyAdminRequest(request)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  for (const field of REQUIRED_FIELDS) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
    }
  }

  const docRef = await adminDb.collection('products').add({
    slug: body.slug,
    brand: body.brand,
    title: body.title,
    category: body.category,
    price: Number(body.price),
    compareAt: body.compareAt ? Number(body.compareAt) : null,
    image: body.image,
    hoverImage: body.hoverImage,
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    sizes: Array.isArray(body.sizes) ? body.sizes : [],
    express: !!body.express,
    isNew: !!body.isNew,
    colorway: body.colorway || '',
    description: body.description || '',
    fabric: body.fabric || '',
    designerProfile: body.designerProfile || '',
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({ id: docRef.id }, { status: 201 })
}
