'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { AdminGuard } from '@/components/admin/admin-guard'
import { AdminNav } from '@/components/admin/admin-nav'
import { useAuth } from '@/lib/auth-context'
import { getAllProducts } from '@/lib/products-firestore'
import { formatINR, type Product } from '@/lib/products'

function DashboardContent() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [seeding, setSeeding] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const data = await getAllProducts()
    setProducts(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async (id: string, title: string) => {
    if (!user) return
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return
    setBusyId(id)
    try {
      const idToken = await user.getIdToken()
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      })
      if (!res.ok) throw new Error('Delete failed')
      await load()
    } catch {
      setMessage('Failed to delete product.')
    } finally {
      setBusyId(null)
    }
  }

  const handleSeed = async () => {
    if (!user) return
    setSeeding(true)
    setMessage(null)
    try {
      const idToken = await user.getIdToken()
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error || 'Seed failed.')
      } else {
        setMessage(`Seeded ${data.seeded} products.`)
        await load()
      }
    } catch {
      setMessage('Seed failed.')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold">Products</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {loading ? 'Loading\u2026' : `${products.length} product${products.length === 1 ? '' : 's'} in Firestore`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {products.length === 0 && !loading && (
              <button
                type="button"
                onClick={handleSeed}
                disabled={seeding}
                className="border border-primary px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
              >
                {seeding ? 'Seeding\u2026' : 'Seed Starter Catalog'}
              </button>
            )}
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Add Product
            </Link>
          </div>
        </div>

        {message && <p className="mb-4 text-sm text-muted-foreground">{message}</p>}

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="border border-dashed border-border px-6 py-20 text-center">
            <p className="font-serif text-lg">No products yet</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Seed the starter catalog above, or add your first product manually.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-border bg-background">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="flex items-center gap-3 px-4 py-3">
                      <div className="relative h-12 w-9 shrink-0 overflow-hidden bg-muted">
                        <Image src={p.image || '/placeholder.svg'} alt={p.title} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3">{formatINR(p.price)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          aria-label={`Edit ${p.title}`}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" strokeWidth={1.5} />
                        </Link>
                        <button
                          type="button"
                          aria-label={`Delete ${p.title}`}
                          onClick={() => handleDelete(p.id, p.title)}
                          disabled={busyId === p.id}
                          className="text-muted-foreground transition-colors hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  )
}
