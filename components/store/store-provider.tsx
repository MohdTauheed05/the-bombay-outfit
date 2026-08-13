'use client'

import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '@/lib/products'

export type CartItem = {
  product: Product
  size: string
  qty: number
}

type UIState = {
  cartOpen: boolean
  searchOpen: boolean
  quickView: Product | null
}

type StoreContextValue = {
  cart: CartItem[]
  wishlist: string[]
  ui: UIState
  addToCart: (product: Product, size: string, qty?: number) => void
  removeFromCart: (id: string, size: string) => void
  updateQty: (id: string, size: string, qty: number) => void
  clearCart: () => void
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setQuickView: (product: Product | null) => void
  cartCount: number
  subtotal: number
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [ui, setUI] = useState<UIState>({ cartOpen: false, searchOpen: false, quickView: null })

  const addToCart = useCallback((product: Product, size: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...prev, { product, size, qty }]
    })
    setUI((s) => ({ ...s, cartOpen: true, quickView: null }))
  }, [])

  const removeFromCart = useCallback((id: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.product.id === id && i.size === size)))
  }, [])

  const updateQty = useCallback((id: string, size: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist])

  const setCartOpen = useCallback((open: boolean) => setUI((s) => ({ ...s, cartOpen: open })), [])
  const setSearchOpen = useCallback((open: boolean) => setUI((s) => ({ ...s, searchOpen: open })), [])
  const setQuickView = useCallback((product: Product | null) => setUI((s) => ({ ...s, quickView: product })), [])

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart])
  const subtotal = useMemo(() => cart.reduce((n, i) => n + i.product.price * i.qty, 0), [cart])

  const value: StoreContextValue = {
    cart,
    wishlist,
    ui,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    isWishlisted,
    setCartOpen,
    setSearchOpen,
    setQuickView,
    cartCount,
    subtotal,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
