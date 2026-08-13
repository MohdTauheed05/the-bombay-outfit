'use client'

import { useState, type FormEvent } from 'react'
import type { Product } from '@/lib/products'

const inputClass =
  'w-full border border-border bg-background px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary'
const labelClass = 'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'

export type ProductFormValues = {
  slug: string
  brand: string
  title: string
  category: string
  price: string
  compareAt: string
  image: string
  hoverImage: string
  gallery: string
  sizes: string
  express: boolean
  isNew: boolean
  colorway: string
  description: string
  fabric: string
  designerProfile: string
}

function toFormValues(p?: Partial<Product>): ProductFormValues {
  return {
    slug: p?.slug ?? '',
    brand: p?.brand ?? '',
    title: p?.title ?? '',
    category: p?.category ?? '',
    price: p?.price?.toString() ?? '',
    compareAt: p?.compareAt?.toString() ?? '',
    image: p?.image ?? '',
    hoverImage: p?.hoverImage ?? '',
    gallery: p?.gallery?.join('\n') ?? '',
    sizes: p?.sizes?.join(', ') ?? '',
    express: p?.express ?? false,
    isNew: p?.isNew ?? false,
    colorway: p?.colorway ?? '',
    description: p?.description ?? '',
    fabric: p?.fabric ?? '',
    designerProfile: p?.designerProfile ?? '',
  }
}

/** Converts form state into the payload shape the admin API routes expect. */
export function serializeProductForm(values: ProductFormValues) {
  return {
    slug: values.slug.trim(),
    brand: values.brand.trim(),
    title: values.title.trim(),
    category: values.category,
    price: Number(values.price),
    compareAt: values.compareAt ? Number(values.compareAt) : null,
    image: values.image.trim(),
    hoverImage: values.hoverImage.trim() || values.image.trim(),
    gallery: values.gallery.split('\n').map((s) => s.trim()).filter(Boolean),
    sizes: values.sizes.split(',').map((s) => s.trim()).filter(Boolean),
    express: values.express,
    isNew: values.isNew,
    colorway: values.colorway.trim(),
    description: values.description.trim(),
    fabric: values.fabric.trim(),
    designerProfile: values.designerProfile.trim(),
  }
}

const CATEGORIES = ['Apparel', 'Leather Goods', 'Swiss Timepieces', 'Sunglasses', 'Grooming']

export function ProductForm({
  initial,
  onSubmit,
  submitLabel,
  error,
}: {
  initial?: Partial<Product>
  onSubmit: (values: ProductFormValues) => Promise<void>
  submitLabel: string
  error?: string | null
}) {
  const [values, setValues] = useState<ProductFormValues>(toFormValues(initial))
  const [submitting, setSubmitting] = useState(false)

  const set = <K extends keyof ProductFormValues>(key: K, val: ProductFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit(values)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Title</span>
          <input required value={values.title} onChange={(e) => set('title', e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Brand</span>
          <input required value={values.brand} onChange={(e) => set('brand', e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Slug (URL)</span>
          <input
            required
            value={values.slug}
            onChange={(e) => set('slug', e.target.value)}
            placeholder="e.g. navy-wool-blazer"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Category</span>
          <select required value={values.category} onChange={(e) => set('category', e.target.value)} className={inputClass}>
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelClass}>Price (INR)</span>
          <input
            required
            type="number"
            min="0"
            value={values.price}
            onChange={(e) => set('price', e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Compare-at Price (optional, for Sale)</span>
          <input
            type="number"
            min="0"
            value={values.compareAt}
            onChange={(e) => set('compareAt', e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Main Image URL</span>
          <input required value={values.image} onChange={(e) => set('image', e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Hover Image URL</span>
          <input value={values.hoverImage} onChange={(e) => set('hoverImage', e.target.value)} className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Gallery Image URLs (one per line)</span>
        <textarea
          rows={3}
          value={values.gallery}
          onChange={(e) => set('gallery', e.target.value)}
          className={inputClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Sizes (comma separated)</span>
          <input
            value={values.sizes}
            onChange={(e) => set('sizes', e.target.value)}
            placeholder="S, M, L, XL"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Colorway</span>
          <input value={values.colorway} onChange={(e) => set('colorway', e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Fabric / Material</span>
          <input value={values.fabric} onChange={(e) => set('fabric', e.target.value)} className={inputClass} />
        </label>
        <div className="flex items-end gap-6 pb-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.isNew}
              onChange={(e) => set('isNew', e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            New In
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.express}
              onChange={(e) => set('express', e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            Express 24h
          </label>
        </div>
      </div>

      <label className="block">
        <span className={labelClass}>Description</span>
        <textarea
          rows={4}
          value={values.description}
          onChange={(e) => set('description', e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Designer Profile</span>
        <textarea
          rows={3}
          value={values.designerProfile}
          onChange={(e) => set('designerProfile', e.target.value)}
          className={inputClass}
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? 'Saving\u2026' : submitLabel}
      </button>
    </form>
  )
}
