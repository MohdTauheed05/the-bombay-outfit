'use client'

import { useMemo, useState } from 'react'
import { Search, ChevronDown, X } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { cn } from '@/lib/utils'

type Faq = { id: string; category: 'Shipping' | 'Returns' | 'Payment' | 'Account Management'; q: string; a: string }

const FAQS: Faq[] = [
  {
    id: 'ship-1',
    category: 'Shipping',
    q: 'How fast is delivery?',
    a: 'We offer same-day express delivery in Mumbai and Delhi on eligible items, and standard nationwide shipping of 3\u20136 business days elsewhere. Delivery estimates are shown at checkout before you pay.',
  },
  {
    id: 'ship-2',
    category: 'Shipping',
    q: 'Do you ship internationally?',
    a: 'Currently we ship only within India. We are working on international shipping and will announce it via our newsletter once available.',
  },
  {
    id: 'ship-3',
    category: 'Shipping',
    q: 'How can I track my order?',
    a: 'Once your order ships, you will receive a tracking link by email and SMS. You can also track your order anytime from your Account page.',
  },
  {
    id: 'ret-1',
    category: 'Returns',
    q: 'What is your returns policy?',
    a: 'We offer 7-day hassle-free returns and exchanges from the date of delivery. Items must be unworn, unwashed and have all original tags attached.',
  },
  {
    id: 'ret-2',
    category: 'Returns',
    q: 'How do I start a return?',
    a: 'Go to Account > Orders, select the item you would like to return, and choose a reason. We will arrange a free pickup within 2\u20133 business days.',
  },
  {
    id: 'ret-3',
    category: 'Returns',
    q: 'When will I get my refund?',
    a: 'Refunds are processed within 5\u20137 business days of us receiving the returned item, back to your original payment method.',
  },
  {
    id: 'pay-1',
    category: 'Payment',
    q: 'What payment methods do you accept?',
    a: 'We currently accept Cash on Delivery only. Place your order via WhatsApp and pay in cash when it arrives at your door \u2014 no online payment is required.',
  },
  {
    id: 'pay-2',
    category: 'Payment',
    q: 'How do I place an order?',
    a: 'Tap "Order via WhatsApp" on any product, or "Complete Order on WhatsApp" at checkout. We\u2019ll confirm your order details with you directly over WhatsApp.',
  },
  {
    id: 'pay-3',
    category: 'Payment',
    q: 'Can I get a GST invoice?',
    a: 'Yes. Add your GSTIN at checkout or in your shopping bag before placing the order, and a GST-compliant tax invoice will be emailed with your confirmation.',
  },
  {
    id: 'acc-1',
    category: 'Account Management',
    q: 'Do I need an account to place an order?',
    a: 'No, you can check out as a guest. Creating an account lets you track orders, save addresses and build a wishlist for future visits.',
  },
  {
    id: 'acc-2',
    category: 'Account Management',
    q: 'How do I reset my password?',
    a: 'Select "Forgot password" on the sign-in screen and we will email you a secure link to set a new one. Links expire after 30 minutes for your security.',
  },
  {
    id: 'acc-3',
    category: 'Account Management',
    q: 'How do I update my saved address or phone number?',
    a: 'Go to Account > Profile to update your contact details, or Account > Addresses to add, edit or remove a delivery address.',
  },
]

const CATEGORIES: Faq['category'][] = ['Shipping', 'Returns', 'Payment', 'Account Management']

export default function FaqPage() {
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return FAQS
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  }, [query])

  const grouped = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      category: cat,
      items: filtered.filter((f) => f.category === cat),
    })).filter((g) => g.items.length > 0)
  }, [filtered])

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-12 lg:py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Support</p>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Everything you need to know about shipping, returns, payment and your account.
          </p>
        </div>

        <div className="mb-10 flex items-center gap-3 border-b border-primary pb-3">
          <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQs\u2026"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground/70"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
              <X className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {grouped.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No FAQs match &ldquo;{query}&rdquo;. Try a different search, or{' '}
            <a href="/contact" className="text-foreground underline underline-offset-4 hover:text-gold">
              contact our concierge team
            </a>
            .
          </p>
        ) : (
          <div className="space-y-10">
            {grouped.map((group) => (
              <div key={group.category}>
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {group.category}
                </h2>
                <div className="border-t border-border">
                  {group.items.map((faq) => {
                    const open = openId === faq.id
                    return (
                      <div key={faq.id} className="border-b border-border">
                        <button
                          type="button"
                          onClick={() => setOpenId(open ? null : faq.id)}
                          className="flex w-full items-center justify-between gap-4 py-4 text-left"
                          aria-expanded={open}
                        >
                          <span className="text-sm font-medium">{faq.q}</span>
                          <ChevronDown
                            className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')}
                            strokeWidth={1.5}
                          />
                        </button>
                        {open && (
                          <p className="pb-4 pr-8 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  )
}
