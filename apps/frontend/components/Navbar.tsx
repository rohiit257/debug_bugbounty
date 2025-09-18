"use client"

import Link from "next/link"
import { Menu, Bell } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const wallet = (session as any)?.user?.wallet || (session as any)?.user?.id
  const display = wallet ? `${wallet.slice(0, 6)}…${wallet.slice(-4)}` : undefined

  return (
    <header className="sticky top-0 z-40 h-12 border-b border-white/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm dark:bg-black/40">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            <span className="inline-flex items-center gap-2">
              <span className="h-5 w-5 rounded-md" style={{ backgroundColor: '#A7EF9E' }} />
              Debug Bounty
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          {status === 'authenticated' && display ? (
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-white text-black shadow-sm dark:bg-black dark:text-white">
              <span className="inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: '#A7EF9E' }} />
              <span className="font-mono">{display}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="ml-1 rounded px-1 hover:bg-accent"
                title="Sign out"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link href="/login" className="inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-medium bg-white text-black shadow-sm hover:bg-gray-50 dark:bg-black dark:text-white">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}


