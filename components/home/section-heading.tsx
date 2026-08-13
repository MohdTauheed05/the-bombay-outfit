import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = 'View All',
}: {
  eyebrow?: string
  title: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
        )}
        <h2 className="font-serif text-2xl font-bold leading-tight text-balance sm:text-3xl lg:text-4xl">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-foreground sm:inline-flex"
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  )
}
