'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { AdminGuard } from '@/components/admin/admin-guard'
import { AdminNav } from '@/components/admin/admin-nav'
import { ProductForm, serializeProductForm, type ProductFormValues } from '@/components/admin/product-form'
import { useAuth } from '@/lib/auth-context'
import { getProductById } from '@/lib/products-firestore'
import type { Product } from '@/lib/products'

function EditProductContent({ id }: { id: string }) {
  const { user } = useAuth()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getProductById(id).then((p) => {
      if (!p) setNotFound(true)
      else setProduct(p)
      setLoading(false)
    })
  }, [id])

  const handleSubmit = async (values: ProductFormValues) => {
    if (!user) return
    setError(null)
    const idToken = await user.getIdToken()
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
      body: JSON.stringify(serializeProductForm(values)),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Failed to update product.')
      return
    }
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <AdminNav />
      <div className="mx-auto max-w-3xl px-5 py-10">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Back to Products
        </Link>
        <h1 className="mb-8 font-serif text-2xl font-bold">Edit Product</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : notFound ? (
          <p className="text-sm text-muted-foreground">Product not found.</p>
        ) : (
          <ProductForm initial={product!} onSubmit={handleSubmit} submitLabel="Save Changes" error={error} />
        )}
      </div>
    </div>
  )
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <AdminGuard>
      <EditProductContent id={id} />
    </AdminGuard>
  )
}
