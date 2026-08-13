'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Heart, Package, ShieldCheck, User } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'

const inputClass =
  'w-full border border-border bg-background px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary'
const labelClass = 'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'

export default function AccountPage() {
  const [mode, setMode] = useState<'sign-in' | 'create'>('sign-in')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-5 py-12 lg:py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Your House Account</p>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">Account</h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Auth form */}
          <div className="border border-border p-6 sm:p-8">
            <div className="mb-6 flex border-b border-border">
              <button
                type="button"
                onClick={() => setMode('sign-in')}
                className={`flex-1 border-b-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  mode === 'sign-in' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('create')}
                className={`flex-1 border-b-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  mode === 'create' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'create' && (
                <label className="block">
                  <span className={labelClass}>Full Name</span>
                  <input type="text" required placeholder="Your name" className={inputClass} />
                </label>
              )}
              <label className="block">
                <span className={labelClass}>Email Address</span>
                <input type="email" required placeholder="you@example.com" className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Password</span>
                <input type="password" required placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" className={inputClass} />
              </label>

              <button
                type="submit"
                className="w-full bg-primary py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                {mode === 'sign-in' ? 'Sign In' : 'Create Account'}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} /> Secure &amp; encrypted
              </p>
            </form>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <Link
              href="/wishlist"
              className="flex items-center gap-4 border border-border p-5 transition-colors hover:border-primary"
            >
              <Heart className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium">Your Wishlist</p>
                <p className="text-xs text-muted-foreground">Products you&apos;ve saved for later</p>
              </div>
            </Link>
            <div className="flex items-center gap-4 border border-border p-5">
              <Package className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium">Order History</p>
                <p className="text-xs text-muted-foreground">Sign in to view and track your orders</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-border p-5">
              <User className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium">Profile &amp; Addresses</p>
                <p className="text-xs text-muted-foreground">Manage your details and saved addresses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
