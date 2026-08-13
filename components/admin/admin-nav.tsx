'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, ExternalLink } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export function AdminNav() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/admin/login')
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/admin" className="font-serif text-lg font-bold">
          The Bombay Outfit <span className="text-gold">Admin</span>
        </Link>
        <div className="flex items-center gap-5">
          {user?.email && <span className="hidden text-xs text-muted-foreground sm:inline">{user.email}</span>}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
          >
            View Site <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign Out <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  )
}
