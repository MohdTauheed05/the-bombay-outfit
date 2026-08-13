'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Tag, X } from 'lucide-react'
import { useStore } from '@/components/store/store-provider'
import { formatINR } from '@/lib/products'
import { SHIPPING_METHODS, type ShippingMethodId } from './checkout-form'

export function OrderSummary({ shippingMethod }: { shippingMethod: ShippingMethodId }) {
  const { cart, updateQty, removeFromCart, subtotal } = useStore()
  const [promo, setPromo] = useState('')
  const [applied, setApplied] = useState(false)
  const [promoError, setPromoError] = useState(false)

  const shipping = useMemo(
    () => SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.price ?? 0,
    [shippingMethod],
  )
  const discount = applied ? Math.round(subtotal * 0.1) : 0
  // Prices are GST-inclusive; shown separately here as an estimate for transparency.
  const estimatedGst = Math.round((subtotal - discount) * (18 / 118))
  const total = subtotal - discount + shipping

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'BOMBAY10') {
      setApplied(true)
      setPromoError(false)
    } else {
      setPromoError(true)
    }
  }

  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border p-5">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em]">Order Summary</h2>
      </div>

      <div className="max-h-[360px] overflow-y-auto px-5">
        {cart.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Your bag is empty.</p>
        ) : (
          <ul className="divide-y divide-border">
            {cart.map((item) => (
              <li key={item.product.id + item.size} className="flex gap-3.5 py-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted">
                  <Image src={item.product.image || '/placeholder.svg'} alt={item.product.title} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {item.product.brand}
                  </p>
                  <p className="truncate text-sm">{item.product.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Size: {item.size}</p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                        className="px-2 py-1 hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                      <span className="min-w-7 text-center text-xs">{item.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                        className="px-2 py-1 hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    </div>
                    <span className="text-sm font-medium">{formatINR(item.product.price * item.qty)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() => removeFromCart(item.product.id, item.size)}
                  className="self-start text-muted-foreground transition-colors hover:text-destructive"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-border p-5">
        <div className="flex">
          <div className="flex flex-1 items-center gap-2 border border-border px-3">
            <Tag className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              value={promo}
              onChange={(e) => {
                setPromo(e.target.value)
                setPromoError(false)
              }}
              placeholder="Promo code"
              className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          <button
            type="button"
            onClick={applyPromo}
            className="shrink-0 bg-primary px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
          >
            Apply
          </button>
        </div>
        {applied && <p className="mt-2 text-xs text-gold">BOMBAY10 applied &mdash; 10% off your order.</p>}
        {promoError && <p className="mt-2 text-xs text-destructive">Invalid or expired promo code.</p>}

        <dl className="mt-5 space-y-1.5 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>{formatINR(subtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-gold">
              <dt>Discount (BOMBAY10)</dt>
              <dd>-{formatINR(discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className={shipping === 0 ? 'text-gold' : undefined}>{shipping === 0 ? 'Free' : formatINR(shipping)}</dd>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <dt>Estimated GST (included)</dt>
            <dd>{formatINR(estimatedGst)}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-2.5 text-base font-medium">
            <dt>Total</dt>
            <dd>{formatINR(total)}</dd>
          </div>
        </dl>
        <p className="mt-1 text-[11px] text-muted-foreground">Inclusive of all taxes.</p>
      </div>
    </div>
  )
}
