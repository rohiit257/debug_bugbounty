"use client"

import Link from "next/link"
import { Menu, Bell } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const wallet = (session as any)?.user?.wallet || (session as any)?.user?.id
  const display = wallet ? `${wallet.slice(0, 6)}…${wallet.slice(-4)}` : undefined
  

  return (
    <header className="sticky top-0 z-40 h-12 border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60 shadow-sm">
      <div className="mx-auto flex h-full w-full items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm font-semibold tracking-tight text-white">
            <span className="inline-flex items-center gap-2">
              <span className="h-5 w-5 rounded-md" style={{ backgroundColor: '#A7EF9E' }} />
              <span className="bg-gradient-to-r from-white to-[#A7EF9E] bg-clip-text text-transparent">Debug Bounty</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/5 text-white" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          {status === 'authenticated' && display ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white shadow-sm backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: '#A7EF9E' }} />
              <span className="font-mono">{display}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="ml-1 rounded px-1 hover:bg-white/10"
                title="Sign out"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link href="/login" className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-white/10">
              <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: '#A7EF9E' }} />
              <span>Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}


