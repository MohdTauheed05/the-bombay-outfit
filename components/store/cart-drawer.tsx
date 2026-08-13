'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, Tag, ShieldCheck } from 'lucide-react'
import { useStore } from './store-provider'
import { formatINR } from '@/lib/products'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { ui, setCartOpen, cart, updateQty, removeFromCart, subtotal } = useStore()
  const [promo, setPromo] = useState('')
  const [applied, setApplied] = useState(false)
  const [gst, setGst] = useState(false)

  const discount = applied ? Math.round(subtotal * 0.1) : 0
  const shipping = 0
  const total = subtotal - discount

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'BOMBAY10') setApplied(true)
  }

  return (
    <AnimatePresence>
      {ui.cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-black/50"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em]">
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} /> Shopping Bag
              </span>
              <button type="button" aria-label="Close bag" onClick={() => setCartOpen(false)}>
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" strokeWidth={1} />
                <p className="font-serif text-lg">Your bag is empty</p>
                <p className="text-sm text-muted-foreground">Discover our latest arrivals and curated edits.</p>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-2 bg-primary px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  <ul className="divide-y divide-border">
                    {cart.map((item) => (
                      <li key={item.product.id + item.size} className="flex gap-4 py-4">
                        <Image
                          src={item.product.image || '/placeholder.svg'}
                          alt={item.product.title}
                          width={80}
                          height={106}
                          className="h-[106px] w-20 shrink-0 object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
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
                                className="px-2 py-1.5 hover:bg-muted"
                              >
                                <Minus className="h-3 w-3" strokeWidth={1.5} />
                              </button>
                              <span className="min-w-8 text-center text-sm">{item.qty}</span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                                className="px-2 py-1.5 hover:bg-muted"
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
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Promo */}
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="flex">
                      <div className="flex flex-1 items-center gap-2 border border-border px-3">
                        <Tag className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                        <input
                          value={promo}
                          onChange={(e) => setPromo(e.target.value)}
                          placeholder="Promo code (BOMBAY10)"
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
                    {applied && (
                      <p className="mt-2 text-xs text-gold">BOMBAY10 applied — 10% off your order.</p>
                    )}
                  </div>

                  {/* GST toggle */}
                  <button
                    type="button"
                    onClick={() => setGst((v) => !v)}
                    className="mt-3 flex w-full items-center justify-between border border-border px-3 py-3 text-left"
                  >
                    <span className="text-sm">Add GSTIN for Tax Invoice</span>
                    <span
                      className={cn(
                        'relative h-5 w-9 rounded-full transition-colors',
                        gst ? 'bg-primary' : 'bg-muted-foreground/40',
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-0.5 h-4 w-4 rounded-full bg-background transition-transform',
                          gst ? 'left-0.5 translate-x-4' : 'left-0.5',
                        )}
                      />
                    </span>
                  </button>
                  {gst && (
                    <input
                      placeholder="Enter GSTIN"
                      className="mt-2 w-full border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  )}
                </div>

                {/* Summary */}
                <div className="border-t border-border p-5">
                  <dl className="space-y-1.5 text-sm">
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
                      <dd className="text-gold">Free</dd>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2.5 text-base font-medium">
                      <dt>Total</dt>
                      <dd>{formatINR(total)}</dd>
                    </div>
                  </dl>
                  <p className="mt-1 text-[11px] text-muted-foreground">Inclusive of all taxes.</p>
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 block bg-primary py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Proceed to Checkout
                  </Link>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} /> Secure Razorpay / UPI Checkout
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
