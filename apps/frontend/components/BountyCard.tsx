"use client"

import { BadgeDollarSign, ChevronRight, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

export type Bounty = {
  id: string
  title: string
  company: string
  description?: string
  requirements?: string[]
  rewardUsd: number
  tags?: string[]
  status?: "ongoing" | "new" | "closed"
  postedAt?: string
  applicants?: number
  endsInDays?: number
  difficulty?: "easy" | "medium" | "hard"
  rating?: number
  companyLogo?: string
}

export default function BountyCard({ bounty }: { bounty: Bounty }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(bounty.rewardUsd)

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "new":
        return "bg-[#A7EF9E]/20 text-green-800 border-[#A7EF9E]/40"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300/80 hover:shadow-xl hover:shadow-gray-100/60 dark:border-gray-800/60 dark:bg-gray-950 dark:hover:border-gray-700/80 dark:hover:shadow-gray-900/30">
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A7EF9E] text-sm font-bold text-gray-900 shadow-sm">
                {bounty.company.charAt(0)}
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{bounty.company}</div>
            </div>
            <h3 className="text-base font-semibold leading-tight text-gray-900 transition-colors group-hover:text-gray-700 dark:text-gray-100 dark:group-hover:text-gray-50">{bounty.title}</h3>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-black text-white px-3 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-black/5">
            <BadgeDollarSign className="h-4 w-4" />
            <span>{formatted}</span>
          </div>
        </div>

        {bounty.tags?.length ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {bounty.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#A7EF9E]/20 border border-[#A7EF9E]/30 px-2.5 py-1 text-xs font-medium text-green-900 shadow-sm backdrop-blur-[1px] dark:bg-[#A7EF9E]/25 dark:text-green-300"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
            {bounty.tags.length > 3 && <span className="text-xs text-gray-500">+{bounty.tags.length - 3}</span>}
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{bounty.postedAt ?? "Recently"}</span>
            {typeof bounty.applicants === "number" && <span>{bounty.applicants} applicants</span>}
            {bounty.difficulty && (
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize",
                  bounty.difficulty === "easy" && "border-green-200 bg-green-50 text-green-700",
                  bounty.difficulty === "medium" && "border-yellow-200 bg-yellow-50 text-yellow-700",
                  bounty.difficulty === "hard" && "border-red-200 bg-red-50 text-red-700",
                )}
              >
                {bounty.difficulty}
              </span>
            )}
          </div>

          <button className="group/btn flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:bg-[#A7EF9E] hover:text-gray-900 hover:shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-[#A7EF9E] dark:hover:text-gray-900">
            View
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-[#A7EF9E]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[#A7EF9E]/30 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}
