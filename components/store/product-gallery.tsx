'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const frameRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const frame = frameRef.current
    if (!frame) return
    const rect = frame.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOrigin(`${x}% ${y}%`)
  }

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div
        ref={frameRef}
        className="relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden bg-muted"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[active] || '/placeholder.svg'}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 ease-out"
          style={{
            transform: zoom ? 'scale(1.9)' : 'scale(1)',
            transformOrigin: origin,
          }}
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2.5 sm:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'relative aspect-[3/4] overflow-hidden border transition-colors',
                active === i ? 'border-primary' : 'border-border hover:border-primary/50',
              )}
            >
              <Image src={img || '/placeholder.svg'} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
