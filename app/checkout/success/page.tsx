'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Truck, Package, Copy, Check } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { formatINR } from '@/lib/products'

type StoredOrder = {
  orderNumber: string
  deliveryDate: string
  shippingMethod: string
  itemCount: number
  total: number
  items: { title: string; brand: string; image: string; size: string; qty: number; price: number }[]
}

function SuccessPageInner() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const [order, setOrder] = useState<StoredOrder | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = sessionStorage.getItem('tbo-last-order')
    if (raw) {
      try {
        setOrder(JSON.parse(raw))
      } catch {
        setOrder(null)
      }
    }
  }, [])

  const displayOrderNumber = order?.orderNumber ?? orderNumber ?? 'TBO-000000'

  const copyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(displayOrderNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard unavailable — ignore silently.
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-5 py-16 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
            <CheckCircle2 className="h-9 w-9 text-gold" strokeWidth={1.5} />
          </span>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Order Confirmed</p>
          <h1 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-4xl">Thank You for Your Order</h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            A confirmation has been sent to your email. Our concierge team will keep you updated as your order is
            prepared and shipped.
          </p>

          <button
            type="button"
            onClick={copyOrderNumber}
            className="mt-6 inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm transition-colors hover:border-primary"
          >
            Order No.{' '}
            <span className="font-medium tracking-wide text-foreground">{displayOrderNumber}</span>
            {copied ? (
              <Check className="h-4 w-4 text-gold" strokeWidth={1.5} />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
            )}
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 border border-border p-5">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Estimated Delivery
              </p>
              <p className="mt-1 text-sm font-medium">{order?.deliveryDate ?? 'Within 3\u20136 business days'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-border p-5">
            <Package className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Items</p>
              <p className="mt-1 text-sm font-medium">{order?.itemCount ?? '\u2014'} item(s) in this order</p>
            </div>
          </div>
        </div>

        {order && order.items.length > 0 && (
          <div className="mt-10 border border-border">
            <div className="border-b border-border p-5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em]">Order Summary</h2>
            </div>
            <ul className="divide-y divide-border px-5">
              {order.items.map((item, i) => (
                <li key={i} className="flex gap-4 py-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted">
                    <Image src={item.image || '/placeholder.svg'} alt={item.title} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {item.brand}
                    </p>
                    <p className="text-sm">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Size: {item.size} &middot; Qty: {item.qty}
                    </p>
                  </div>
                  <span className="self-center text-sm font-medium">{formatINR(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-border p-5 text-base font-medium">
              <span>Total Paid</span>
              <span>{formatINR(order.total)}</span>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="flex-1 bg-primary py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 border border-border py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:border-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </SiteShell>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessPageInner />
    </Suspense>
  )
}
