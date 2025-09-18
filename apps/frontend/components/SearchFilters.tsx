"use client"

import { Search, Filter, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export type Filters = {
  query: string
  tags: string[]
  minReward: number
  maxReward: number
  difficulty: string[]
  status: string[]
}

interface SearchFiltersProps {
  onSearch: (filters: Filters) => void
  variant?: "onDark" | "onGreen" | "default"
}

const popularTags = ["Solidity", "Next.js", "React", "Node.js", "Python", "Go", "Rust", "TypeScript"]
const difficulties = ["easy", "medium", "hard"]
const statuses = ["new", "ongoing", "closed"]

export default function SearchFilters({ onSearch, variant = "default" }: SearchFiltersProps) {
  const [query, setQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [minReward, setMinReward] = useState(0)
  const [maxReward, setMaxReward] = useState(50000)
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = () => {
    onSearch({
      query,
      tags: selectedTags,
      minReward,
      maxReward,
      difficulty: selectedDifficulties,
      status: selectedStatuses,
    })
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const clearFilters = () => {
    setQuery("")
    setSelectedTags([])
    setMinReward(0)
    setMaxReward(50000)
    setSelectedDifficulties([])
    setSelectedStatuses([])
  }

  const getInputStyles = () => {
    switch (variant) {
      case "onDark":
        return "bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/15"
      case "onGreen":
        return "bg-white/90 border-black/10 text-black placeholder:text-black/60 focus:border-black/20"
      default:
        return "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-gray-300"
    }
  }

  const getButtonStyles = () => {
    switch (variant) {
      case "onDark":
        return "bg-white text-gray-900 hover:bg-gray-100"
      case "onGreen":
        return "bg-white text-gray-900 hover:bg-gray-100"
      default:
        return "bg-white text-gray-900 hover:bg-gray-100 border border-gray-200"
    }
  }

  const getFilterButtonStyles = () => {
    switch (variant) {
      case "onDark":
        return "text-white/80 hover:text-white hover:bg-white/10"
      case "onGreen":
        return "bg-white text-gray-900 hover:bg-gray-100 border border-gray-200"
      default:
        return "bg-white text-gray-900 hover:bg-gray-100 border border-gray-200"
    }
  }

  const getWrapperStyles = () => {
    switch (variant) {
      case "onGreen":
        return "rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
      case "onDark":
        return ""
      default:
        return ""
    }
  }

  return (
    <div className={cn("w-full space-y-4", getWrapperStyles())}>
      {/* Main Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bounties, companies, or technologies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${getInputStyles()}`}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${getFilterButtonStyles()}`}
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>

        <button
          onClick={handleSearch}
          className={`rounded-xl px-6 py-3 text-sm font-medium transition-colors ${getButtonStyles()}`}
        >
          Search
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="rounded-xl border border-gray-200/60 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800/60 dark:bg-gray-900/50">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          </div>

          <div className="space-y-6">
            {/* Tags */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">Technologies</label>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-[#A7EF9E] text-gray-900"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Reward Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Min Reward ($)
                </label>
                <input
                  type="number"
                  value={minReward}
                  onChange={(e) => setMinReward(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-gray-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Max Reward ($)
                </label>
                <input
                  type="number"
                  value={maxReward}
                  onChange={(e) => setMaxReward(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-gray-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Difficulty & Status */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <label key={difficulty} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedDifficulties.includes(difficulty)}
                        onChange={() => toggleDifficulty(difficulty)}
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                      />
                      <span className="text-xs capitalize text-gray-700 dark:text-gray-300">{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">Status</label>
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <label key={status} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => toggleStatus(status)}
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                      />
                      <span className="text-xs capitalize text-gray-700 dark:text-gray-300">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
