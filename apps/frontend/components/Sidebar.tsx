"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Clock, User, Settings } from "lucide-react"

type NavItem = {
  href: string
  label: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const items: NavItem[] = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/timeline", label: "Timeline", Icon: Clock },
  { href: "/profile", label: "Profile", Icon: User },
  { href: "/settings", label: "Settings", Icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 h-dvh w-16 border-r bg-sidebar text-sidebar-foreground flex flex-col items-center py-4 gap-3"
      aria-label="Sidebar"
    >
      <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground grid place-items-center text-sm font-bold">
        D
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
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")
              }
              aria-label={label}
              title={label}
            >
              <Icon className="h-5 w-5" />
              <span className="pointer-events-none absolute left-16 z-10 hidden rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-sm group-hover:block">
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}


