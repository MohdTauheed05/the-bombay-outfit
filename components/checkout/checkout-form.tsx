'use client'

import { useState, type FormEvent } from 'react'
import { ChevronRight, MessageCircle, Wallet } from 'lucide-react'
import { formatINR } from '@/lib/products'
import { cn } from '@/lib/utils'

export type ShippingMethodId = 'standard' | 'express' | 'same-day'

export const SHIPPING_METHODS: { id: ShippingMethodId; label: string; price: number; eta: string }[] = [
  { id: 'standard', label: 'Standard Shipping', price: 0, eta: '3\u20136 business days' },
  { id: 'express', label: 'Express Shipping', price: 499, eta: '1\u20132 business days' },
  { id: 'same-day', label: 'Same-Day Delivery', price: 999, eta: 'Mumbai & Delhi \u2014 delivered today' },
]

export type ContactInfo = { email: string; phone: string }
export type ShippingAddress = {
  fullName: string
  address1: string
  address2: string
  city: string
  state: string
  pincode: string
}

const inputClass =
  'w-full border border-border bg-background px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary'
const labelClass = 'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input className={inputClass} {...props} />
    </label>
  )
}

function StepHeading({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-primary text-xs font-semibold">
        {n}
      </span>
      <h2 className="font-serif text-lg font-bold">{title}</h2>
    </div>
  )
}

export function CheckoutForm({
  shippingMethod,
  onShippingMethodChange,
  onSubmit,
  submitting,
}: {
  shippingMethod: ShippingMethodId
  onShippingMethodChange: (id: ShippingMethodId) => void
  onSubmit: (data: { contact: ContactInfo; address: ShippingAddress }) => void
  submitting: boolean
}) {
  const [contact, setContact] = useState<ContactInfo>({ email: '', phone: '' })
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({ contact, address })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Step 1: Contact */}
      <section>
        <StepHeading n={1} title="Contact Information" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Email Address"
            type="email"
            required
            placeholder="you@example.com"
            value={contact.email}
            onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
          />
          <Field
            label="Phone Number"
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={contact.phone}
            onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
          />
        </div>
      </section>

      {/* Step 2: Shipping Address */}
      <section>
        <StepHeading n={2} title="Shipping Address" />
        <div className="grid gap-4">
          <Field
            label="Full Name"
            required
            placeholder="Full name"
            value={address.fullName}
            onChange={(e) => setAddress((a) => ({ ...a, fullName: e.target.value }))}
          />
          <Field
            label="Address Line 1"
            required
            placeholder="Flat, house no., building"
            value={address.address1}
            onChange={(e) => setAddress((a) => ({ ...a, address1: e.target.value }))}
          />
          <Field
            label="Address Line 2 (Optional)"
            placeholder="Area, street, landmark"
            value={address.address2}
            onChange={(e) => setAddress((a) => ({ ...a, address2: e.target.value }))}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="City"
              required
              placeholder="Mumbai"
              value={address.city}
              onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
            />
            <Field
              label="State"
              required
              placeholder="Maharashtra"
              value={address.state}
              onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))}
            />
            <Field
              label="PIN Code"
              required
              inputMode="numeric"
              pattern="[0-9]{6}"
              placeholder="400001"
              value={address.pincode}
              onChange={(e) => setAddress((a) => ({ ...a, pincode: e.target.value }))}
            />
          </div>
        </div>
      </section>

      {/* Step 3: Shipping Method */}
      <section>
        <StepHeading n={3} title="Shipping Method" />
        <div className="space-y-2.5">
          {SHIPPING_METHODS.map((m) => (
            <label
              key={m.id}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-4 border px-4 py-3.5 transition-colors',
                shippingMethod === m.id ? 'border-primary' : 'border-border hover:border-primary/50',
              )}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping-method"
                  checked={shippingMethod === m.id}
                  onChange={() => onShippingMethodChange(m.id)}
                  className="h-4 w-4 accent-primary"
                />
                <span>
                  <span className="block text-sm font-medium">{m.label}</span>
                  <span className="block text-xs text-muted-foreground">{m.eta}</span>
                </span>
              </span>
              <span className="text-sm font-medium">{m.price === 0 ? 'Free' : formatINR(m.price)}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Step 4: Payment */}
      <section>
        <StepHeading n={4} title="Payment" />
        <div className="flex items-start gap-3 border border-gold/40 bg-gold/5 px-4 py-4">
          <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-medium">Cash on Delivery</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pay in cash when your order arrives. No online payment required — you&apos;ll confirm the final
              order details over WhatsApp before it ships.
            </p>
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={submitting}
        className="group flex w-full items-center justify-center gap-2 bg-[#25D366] py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
        {submitting ? 'Opening WhatsApp\u2026' : 'Complete Order on WhatsApp'}
        {!submitting && (
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        )}
      </button>
    </form>
  )
}
