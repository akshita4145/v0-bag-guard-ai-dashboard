'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RiskTable } from '@/components/risk-monitor/risk-table'

const airlines = [
  { value: 'all', label: 'All Airlines' },
  { value: 'American Airlines', label: 'American Airlines' },
  { value: 'Delta Air Lines', label: 'Delta Air Lines' },
  { value: 'United Airlines', label: 'United Airlines' },
  { value: 'Southwest Airlines', label: 'Southwest Airlines' },
  { value: 'JetBlue Airways', label: 'JetBlue Airways' },
  { value: 'Alaska Airlines', label: 'Alaska Airlines' },
]

const terminals = [
  { value: 'all', label: 'All Terminals' },
  { value: 'A', label: 'Terminal A' },
  { value: 'B', label: 'Terminal B' },
  { value: 'C', label: 'Terminal C' },
  { value: 'D', label: 'Terminal D' },
  { value: 'E', label: 'Terminal E' },
]

const riskLevels = [
  { value: 'all', label: 'All Risk Levels' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'low', label: 'Low' },
]

const weatherImpact = [
  { value: 'all', label: 'All Weather' },
  { value: 'impacted', label: 'Weather Impacted' },
  { value: 'clear', label: 'Clear Weather' },
]

export default function RiskMonitorPage() {
  const [filters, setFilters] = useState({
    airline: 'all',
    terminal: 'all',
    riskLevel: 'all',
    weatherImpact: 'all',
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      airline: 'all',
      terminal: 'all',
      riskLevel: 'all',
      weatherImpact: 'all',
    })
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Risk Monitor</h1>
        <p className="text-muted-foreground">
          Track high-risk operational items and intervene before baggage is mishandled.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="size-4" />
          <span>Filters:</span>
        </div>

        <Select value={filters.airline} onValueChange={(v) => handleFilterChange('airline', v)}>
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <SelectValue placeholder="Select airline" />
          </SelectTrigger>
          <SelectContent>
            {airlines.map((airline) => (
              <SelectItem key={airline.value} value={airline.value}>
                {airline.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.terminal} onValueChange={(v) => handleFilterChange('terminal', v)}>
          <SelectTrigger className="w-[160px] bg-secondary border-border">
            <SelectValue placeholder="Select terminal" />
          </SelectTrigger>
          <SelectContent>
            {terminals.map((terminal) => (
              <SelectItem key={terminal.value} value={terminal.value}>
                {terminal.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.riskLevel} onValueChange={(v) => handleFilterChange('riskLevel', v)}>
          <SelectTrigger className="w-[160px] bg-secondary border-border">
            <SelectValue placeholder="Risk level" />
          </SelectTrigger>
          <SelectContent>
            {riskLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.weatherImpact} onValueChange={(v) => handleFilterChange('weatherImpact', v)}>
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <SelectValue placeholder="Weather impact" />
          </SelectTrigger>
          <SelectContent>
            {weatherImpact.map((weather) => (
              <SelectItem key={weather.value} value={weather.value}>
                {weather.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
            Clear filters
          </Button>
        )}
      </div>

      {/* Risk Table */}
      <RiskTable filters={filters} />
    </div>
  )
}
