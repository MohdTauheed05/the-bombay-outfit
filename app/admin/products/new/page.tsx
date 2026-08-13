'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { AdminGuard } from '@/components/admin/admin-guard'
import { AdminNav } from '@/components/admin/admin-nav'
import { ProductForm, serializeProductForm, type ProductFormValues } from '@/components/admin/product-form'
import { useAuth } from '@/lib/auth-context'

function NewProductContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (values: ProductFormValues) => {
    if (!user) return
    setError(null)
    const idToken = await user.getIdToken()
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
      body: JSON.stringify(serializeProductForm(values)),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Failed to create product.')
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
        <h1 className="mb-8 font-serif text-2xl font-bold">Add Product</h1>
        <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" error={error} />
      </div>
    </div>
  )
}

export default function NewProductPage() {
  return (
    <AdminGuard>
      <NewProductContent />
    </AdminGuard>
  )
}
