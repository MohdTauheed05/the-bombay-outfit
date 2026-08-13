import { brandMarquee } from '@/lib/products'

export function BrandMarquee() {
  const items = [...brandMarquee, ...brandMarquee]
  return (
    <section className="border-y border-border bg-background py-5">
      <div className="group relative overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-14 whitespace-nowrap">
          {items.map((brand, i) => (
            <span
              key={brand + i}
              className="font-serif text-lg italic tracking-wide text-muted-foreground/70 transition-colors hover:text-foreground sm:text-xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
