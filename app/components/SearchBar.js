"use client"

import { Input } from "@/components/ui/input"

export default function SearchBar({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className="mb-6">
      <Input type="text" onChange={handleSearch} placeholder="Search projections..." className="w-full" />
    </div>
  )
}

