import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Gem, Hand, Leaf, ShieldCheck, Star } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'

export const metadata: Metadata = {
  title: 'Our Story | The Bombay Outfit',
  description:
    'The Bombay Outfit is a house of considered menswear \u2014 tailoring, Swiss timepieces and fine leather, curated for the modern Indian gentleman.',
}

const TIMELINE = [
  {
    year: '2016',
    title: 'A Boutique in Colaba',
    body: 'The Bombay Outfit opens its first showroom in South Mumbai, curating a handful of Italian and Indian tailoring houses for a discerning local clientele.',
  },
  {
    year: '2019',
    title: 'The Leather Atelier',
    body: 'We partner with small-batch leather ateliers across Europe and India, bringing full-grain briefcases, belts and footwear into the house.',
  },
  {
    year: '2021',
    title: 'Swiss Timepieces Arrive',
    body: 'An exclusive partnership with independent Swiss maisons brings limited-run mechanical watches to the collection for the first time.',
  },
  {
    year: '2023',
    title: 'Express, Nationwide',
    body: 'Same-day delivery launches in Mumbai and Delhi, with two-day express shipping introduced across the rest of India.',
  },
  {
    year: 'Today',
    title: 'A House, Online',
    body: 'The Bombay Outfit brings its full curated collection online \u2014 the same standard of craft, service and discretion, wherever you are.',
  },
]

const VALUES = [
  {
    icon: Hand,
    title: 'Handcrafted',
    body: 'Every piece is made by artisans and ateliers who prize precision over volume.',
  },
  {
    icon: Gem,
    title: 'Considered Curation',
    body: 'We work with a small number of houses whose standards match our own \u2014 nothing more.',
  },
  {
    icon: Leaf,
    title: 'Built to Last',
    body: 'Natural materials, honest construction and pieces designed to be worn for decades.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Service',
    body: 'A dedicated concierge team, transparent returns and secure checkout on every order.',
  },
]

const GALLERY = [
  { src: '/edit-tailoring.png', label: 'The Tailoring Atelier' },
  { src: '/edit-leather.png', label: 'Leather Goods, Hand-Finished' },
  { src: '/edit-timepieces.png', label: 'Swiss Precision' },
  { src: '/edit-accessories.png', label: 'Considered Accessories' },
]

const TESTIMONIALS = [
  {
    quote:
      'The suit I ordered fit better out of the box than anything I have had made before. The service afterward was just as impressive.',
    author: 'Aryan Kapoor',
    role: 'Mumbai',
  },
  {
    quote:
      'From the packaging to the piece itself, everything feels considered. My chronograph arrived a day earlier than promised.',
    author: 'Devansh Oberoi',
    role: 'Delhi',
  },
  {
    quote:
      'I have bought three jackets from The Bombay Outfit now. The leather only gets better with age, exactly as they said it would.',
    author: 'Rishabh Malhotra',
    role: 'Bengaluru',
  },
]

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative h-[56vh] min-h-[420px] w-full overflow-hidden bg-primary">
        <Image
          src="/hero-leather-editorial.png"
          alt="The Bombay Outfit atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative flex h-full flex-col items-center justify-end px-5 pb-16 text-center text-white">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">Est. 2016 &middot; Mumbai</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">Our Story</h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80">
            A house built on craft, discretion and an unwavering standard of quality \u2014 for the modern gentleman.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-5 py-16 lg:py-24">
        <div className="mb-12 text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Our Journey</p>
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">From Boutique to House</h2>
        </div>
        <ol className="relative space-y-10 border-l border-border pl-8">
          {TIMELINE.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-gold" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{item.year}</p>
              <h3 className="mt-1.5 font-serif text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mb-12 text-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">What We Stand For</p>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">Our Values</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="border border-border bg-background p-6">
                <v.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.1em]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Inside The House</p>
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">Craft in Every Detail</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GALLERY.map((g) => (
            <div key={g.label} className="group relative aspect-[3/4] overflow-hidden bg-muted">
              <Image
                src={g.src}
                alt={g.label}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
                <span className="text-xs font-medium uppercase tracking-[0.1em] text-white">{g.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mb-12 text-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">In Their Words</p>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">Customer Testimonials</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="border border-primary-foreground/15 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/60">
                  {t.author} &middot; {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 text-center lg:px-8 lg:py-24">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">Discover the Collection</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Explore tailoring, timepieces, leather and accessories, curated with the same standard since day one.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block bg-primary px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Shop Now
        </Link>
      </section>
    </SiteShell>
  )
}
