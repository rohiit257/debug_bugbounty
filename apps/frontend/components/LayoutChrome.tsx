"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"

export default function LayoutChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const hideOn = ["/login"]
  const shouldHide = hideOn.includes(pathname)

  if (shouldHide) {
    return (
      <main className="mx-auto max-w-6xl px-3 py-4">
        {children}
      </main>
    )
  }

  return (
    <>
      <Sidebar />
      <div className="pl-16">
        <Navbar />
        <main className="mx-auto max-w-6xl px-3 py-4">
          {children}
        </main>
      </div>
    </>
  )
}


