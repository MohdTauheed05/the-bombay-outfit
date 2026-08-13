'use client'

import Link from 'next/link'
import { Home, Search, Heart, User, ShoppingBag } from 'lucide-react'
import { useStore } from '@/components/store/store-provider'
import { cn } from '@/lib/utils'

export function MobileBottomNav() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-5">
        <Link href="/" className="flex flex-col items-center gap-1 py-2.5 text-foreground/70">
          <Home className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-wider">Home</span>
        </Link>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex flex-col items-center gap-1 py-2.5 text-foreground/70"
        >
          <Search className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-wider">Search</span>
        </button>
        <Link href="/wishlist" className="relative flex flex-col items-center gap-1 py-2.5 text-foreground/70">
          <span className="relative">
            <Heart className="h-5 w-5" strokeWidth={1.5} />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </span>
          <span className="text-[10px] uppercase tracking-wider">Wishlist</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center gap-1 py-2.5 text-foreground/70">
          <User className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-wider">Account</span>
        </Link>
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="relative flex flex-col items-center gap-1 py-2.5 text-foreground/70"
        >
          <span className="relative">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </span>
          <span className="text-[10px] uppercase tracking-wider">Bag</span>
        </button>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-gold-foreground',
      )}
    >
      {children}
    </span>
  )
}
