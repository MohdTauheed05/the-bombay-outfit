'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, ShoppingBag } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { useStore } from '@/components/store/store-provider'
import { CheckoutForm, SHIPPING_METHODS, type ShippingMethodId, type ContactInfo, type ShippingAddress } from '@/components/checkout/checkout-form'
import { OrderSummary } from '@/components/checkout/order-summary'
import { formatINR } from '@/lib/products'
import { buildWhatsAppLink, buildCartOrderMessage } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

function generateOrderNumber() {
  const rand = Math.floor(100000 + Math.random() * 900000)
  return `TBO-${rand}`
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, subtotal, clearCart } = useStore()
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>('standard')
  const [submitting, setSubmitting] = useState(false)
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false)

  const shippingCost = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.price ?? 0
  const estimatedTotal = subtotal + shippingCost

  const handleSubmit = (data: { contact: ContactInfo; address: ShippingAddress }) => {
    if (cart.length === 0) return
    setSubmitting(true)

    const orderNumber = generateOrderNumber()
    const etaDays = shippingMethod === 'same-day' ? 0 : shippingMethod === 'express' ? 2 : 5
    const deliveryDate = new Date(Date.now() + etaDays * 86400000).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })

    const shippingLabel = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.label ?? 'Standard Shipping'
    const fullAddress = [data.address.address1, data.address.address2, data.address.city, data.address.state, data.address.pincode]
      .filter(Boolean)
      .join(', ')

    const order = {
      orderNumber,
      deliveryDate,
      shippingMethod,
      itemCount: cart.reduce((n, i) => n + i.qty, 0),
      total: estimatedTotal,
      items: cart.map((i) => ({
        title: i.product.title,
        brand: i.product.brand,
        image: i.product.image,
        size: i.size,
        qty: i.qty,
        price: i.product.price,
      })),
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tbo-last-order', JSON.stringify(order))
    }

    const message = buildCartOrderMessage({
      cart,
      subtotal,
      shippingLabel,
      shippingCost,
      total: estimatedTotal,
      contactName: data.address.fullName,
      phone: data.contact.phone,
      address: fullAddress,
    })
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')

    clearCart()
    router.push(`/checkout/success?order=${orderNumber}`)
  }

  if (cart.length === 0) {
    return (
      <SiteShell>
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-center gap-4 px-5 py-24 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" strokeWidth={1} />
          <p className="font-serif text-xl">Your bag is empty</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Add something from the collection before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="mt-2 bg-primary px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground"
          >
            Continue Shopping
          </Link>
        </div>
      </SiteShell>
    )
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-8 lg:py-12">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Secure Checkout</p>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">Checkout</h1>
        </div>

        {/* Mobile order summary accordion */}
        <div className="mb-6 border border-border lg:hidden">
          <button
            type="button"
            onClick={() => setMobileSummaryOpen((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3.5"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              {mobileSummaryOpen ? 'Hide' : 'Show'} Order Summary
            </span>
            <span className="flex items-center gap-3">
              <span className="text-sm font-medium">{formatINR(estimatedTotal)}</span>
              <ChevronDown className={cn('h-4 w-4 transition-transform', mobileSummaryOpen && 'rotate-180')} strokeWidth={1.5} />
            </span>
          </button>
          {mobileSummaryOpen && (
            <div className="border-t border-border">
              <OrderSummary shippingMethod={shippingMethod} />
            </div>
          )}
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          <div>
            <CheckoutForm
              shippingMethod={shippingMethod}
              onShippingMethodChange={setShippingMethod}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <OrderSummary shippingMethod={shippingMethod} />
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
