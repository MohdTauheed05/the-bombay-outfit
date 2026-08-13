import type { ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { MobileBottomNav } from './mobile-bottom-nav'
import { SearchModal } from '@/components/store/search-modal'
import { CartDrawer } from '@/components/store/cart-drawer'
import { QuickView } from '@/components/store/quick-view'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <SearchModal />
      <CartDrawer />
      <QuickView />
    </div>
  )
}
