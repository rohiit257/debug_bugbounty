"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Clock, User, Settings, Activity, BarChart3, Bug } from "lucide-react"

type NavItem = {
  href: string
  label: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const items: NavItem[] = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/timeline", label: "Timeline", Icon: Clock },
  { href: "/activity", label: "Activity", Icon: Activity },
  { href: "/leaderboard", label: "Leaderboard", Icon: BarChart3 },
  { href: "/bounties", label: "Bounties", Icon: Bug },
  { href: "/settings", label: "Settings", Icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 h-dvh w-16 border-r border-white/10 bg-black text-white flex flex-col items-center py-4 gap-3"
      aria-label="Sidebar"
    >
      <div className="h-10 w-10 rounded-md grid place-items-center text-sm font-bold border border-white/10 bg-white/5 text-white">
        <div className="flex items-center gap-1">
          <span className="text-white font-mono font-bold">D</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#A7EF9E]">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      </div>
      
      <nav className="mt-2 flex flex-col items-center gap-1">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={
                "group relative flex h-10 w-10 items-center justify-center rounded-md transition-colors " +
                (active
                  ? "bg-[#A7EF9E]/20 text-[#A7EF9E] border border-[#A7EF9E]/30"
                  : "hover:bg-white/5 hover:text-white border border-transparent")
              }
              aria-label={label}
              title={label}
            >
              <Icon className="h-5 w-5" />
              <span className="pointer-events-none absolute left-16 z-10 hidden rounded-md border border-white/10 bg-black px-2 py-1 text-xs text-white shadow-sm group-hover:block">
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}


