'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { slugifyCategory } from '@/lib/products'
import { buildWhatsAppLink, buildGeneralInquiryMessage } from '@/lib/whatsapp'

const columns = [
  {
    heading: 'Shop',
    links: [
      { label: 'New In', href: `/category/${slugifyCategory('New In')}` },
      { label: 'Apparel', href: `/category/${slugifyCategory('Apparel')}` },
      { label: 'Leather Goods', href: `/category/${slugifyCategory('Leather Goods')}` },
      { label: 'Swiss Timepieces', href: `/category/${slugifyCategory('Swiss Timepieces')}` },
      { label: 'Sunglasses', href: `/category/${slugifyCategory('Sunglasses')}` },
      { label: 'Sale', href: '/sale' },
    ],
  },
  {
    heading: 'Client Care',
    links: [
      { label: 'Contact Concierge', href: '/contact' },
      { label: 'Shipping & Delivery', href: '/faq' },
      { label: '7-Day Returns', href: '/faq' },
      { label: 'Size Guide', href: '/faq' },
      { label: 'Track Order', href: '/account' },
    ],
  },
  {
    heading: 'The House',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Designers', href: `/category/${slugifyCategory('Designers')}` },
      { label: 'Boutiques', href: '/contact' },
      { label: 'Careers', href: '/contact' },
      { label: 'Sustainability', href: '/about' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1600px] px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl font-bold uppercase tracking-[0.12em]">The Bombay Outfit</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Ultra-luxury contemporary Indian &amp; global menswear. Curated tailoring, Swiss timepieces and fine
              leather, delivered across India.
            </p>
            <div className="mt-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">Join the House List</p>
              <form className="mt-3 flex max-w-sm border border-primary-foreground/30" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-primary-foreground/50"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-gold px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-foreground transition-opacity hover:opacity-90"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <a
              href={buildWhatsAppLink(buildGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-[#25D366] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Chat on WhatsApp
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                {col.heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/80 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-primary-foreground/60">
            &copy; {new Date().getFullYear()} THE BOMBAY OUTFIT. All rights reserved. GST Invoice Available.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-primary-foreground/60">
            <span>Cash on Delivery</span>
            <span>Order via WhatsApp</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
