"use client"
import { useEffect, useState } from "react"
import BountyCard, { type Bounty } from "@/components/BountyCard"
import SearchFilters, { type Filters } from "@/components/SearchFilters"

const ongoing: Bounty[] = [
  {
    id: "1",
    title: "Audit smart contract v2",
    company: "ChainLabs",
    rewardUsd: 7500,
    tags: ["Solidity", "EVM"],
    status: "ongoing",
    postedAt: "Today",
  },
  {
    id: "2",
    title: "Frontend XSS sweep",
    company: "OpenPay",
    rewardUsd: 3000,
    tags: ["Next.js", "XSS"],
    status: "ongoing",
    postedAt: "1d ago",
  },
]

const newOpps: Bounty[] = [
  {
    id: "3",
    title: "API auth hardening",
    company: "DataHive",
    rewardUsd: 2200,
    tags: ["Express", "JWT"],
    status: "new",
    postedAt: "2h ago",
  },
  {
    id: "4",
    title: "Wallet connect flow QA",
    company: "DeFiHub",
    rewardUsd: 1800,
    tags: ["wagmi", "RainbowKit"],
    status: "new",
    postedAt: "5h ago",
  },
  {
    id: "5",
    title: "SQLi surface pass",
    company: "Shoply",
    rewardUsd: 1600,
    tags: ["Prisma", "SQL"],
    status: "new",
    postedAt: "8h ago",
  },
]

const topPaying: Bounty[] = [
  {
    id: "6",
    title: "L2 bridge review",
    company: "LayerX",
    rewardUsd: 20000,
    tags: ["Bridges", "Security"],
    postedAt: "3d ago",
  },
  {
    id: "7",
    title: "ZK circuit validation",
    company: "ZeroWorks",
    rewardUsd: 15000,
    tags: ["zkSNARKs", "Circom"],
    postedAt: "1w ago",
  },
]

export default function Page() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])
  function handleSearch(filters: Filters) {
    // Integrate your backend API here
    console.log("search:", filters)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="mb-4 bg-gradient-to-r from-white via-zinc-200 to-[#A7EF9E] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl font-mono">
              Security Bounties
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-zinc-400 font-mono">
              Discover high-impact security opportunities, connect with leading companies, and earn rewards for your
              expertise.
            </p>

            <div className="mx-auto max-w-3xl">
              <SearchFilters onSearch={handleSearch} variant="onDark" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Ongoing Bounties</h2>
              <p className="mt-2 text-zinc-400">
                Active security programs currently accepting submissions
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ongoing.map((bounty, index) => (
                <div
                  key={bounty.id}
                  className={`transform transition duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <BountyCard bounty={bounty} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">New Opportunities</h2>
              <p className="mt-2 text-zinc-400">Fresh bounties posted in the last 24 hours</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newOpps.map((bounty, index) => (
                <div
                  key={bounty.id}
                  className={`transform transition duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <BountyCard bounty={bounty} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Top Paying Programs</h2>
              <p className="mt-2 text-zinc-400">High-value bounties with substantial rewards</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topPaying.map((bounty, index) => (
                <div
                  key={bounty.id}
                  className={`transform transition duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <BountyCard bounty={bounty} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
