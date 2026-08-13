import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { verifyAdminRequest } from '@/lib/verify-admin'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdminRequest(request)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const update: Record<string, unknown> = {}
  const fields = [
    'slug', 'brand', 'title', 'category', 'image', 'hoverImage',
    'colorway', 'description', 'fabric', 'designerProfile',
  ] as const
  for (const f of fields) {
    if (body[f] !== undefined) update[f] = body[f]
  }
  if (body.price !== undefined) update.price = Number(body.price)
  if (body.compareAt !== undefined) update.compareAt = body.compareAt ? Number(body.compareAt) : null
  if (body.gallery !== undefined) update.gallery = Array.isArray(body.gallery) ? body.gallery : []
  if (body.sizes !== undefined) update.sizes = Array.isArray(body.sizes) ? body.sizes : []
  if (body.express !== undefined) update.express = !!body.express
  if (body.isNew !== undefined) update.isNew = !!body.isNew
  update.updatedAt = new Date().toISOString()

  await adminDb.collection('products').doc(id).update(update)

  return NextResponse.json({ ok: true })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdminRequest(request)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  await adminDb.collection('products').doc(id).delete()

  return NextResponse.json({ ok: true })
}
