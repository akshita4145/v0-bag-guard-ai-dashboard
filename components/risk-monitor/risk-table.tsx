'use client'

import { useState } from 'react'
import { CloudRain, Sun, Cloud, CloudLightning, ChevronRight } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { flightsData, type Flight, type RiskLevel } from '@/lib/mock-data'
import { RiskDetailDrawer } from './risk-detail-drawer'

const severityColors: Record<RiskLevel, string> = {
  low: 'bg-success/20 text-success border-success/30',
  moderate: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  high: 'bg-warning/20 text-warning-foreground border-warning/30',
  critical: 'bg-destructive/20 text-destructive border-destructive/30',
}

const progressColors: Record<RiskLevel, string> = {
  low: '[&>div]:bg-success',
  moderate: '[&>div]:bg-chart-1',
  high: '[&>div]:bg-warning',
  critical: '[&>div]:bg-destructive',
}

const statusColors: Record<string, string> = {
  'on-time': 'bg-success/20 text-success border-success/30',
  'delayed': 'bg-destructive/20 text-destructive border-destructive/30',
  'boarding': 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  'departed': 'bg-muted text-muted-foreground border-border',
  'arrived': 'bg-muted text-muted-foreground border-border',
}

const weatherIcons: Record<string, typeof Sun> = {
  'Clear': Sun,
  'Cloudy': Cloud,
  'Rain': CloudRain,
  'Thunderstorms': CloudLightning,
}

interface RiskTableProps {
  filters: {
    airline: string
    terminal: string
    riskLevel: string
    weatherImpact: string
  }
}

export function RiskTable({ filters }: RiskTableProps) {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filteredFlights = flightsData.filter((flight) => {
    if (filters.airline !== 'all' && flight.airline !== filters.airline) return false
    if (filters.terminal !== 'all' && flight.terminal !== filters.terminal) return false
    if (filters.riskLevel !== 'all' && flight.riskLevel !== filters.riskLevel) return false
    if (filters.weatherImpact !== 'all') {
      if (filters.weatherImpact === 'impacted' && flight.weatherStatus === 'Clear') return false
      if (filters.weatherImpact === 'clear' && flight.weatherStatus !== 'Clear') return false
    }
    return true
  })

  const handleRowClick = (flight: Flight) => {
    setSelectedFlight(flight)
    setDrawerOpen(true)
  }

  return (
    <>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Flight</TableHead>
              <TableHead className="text-muted-foreground font-medium">Route</TableHead>
              <TableHead className="text-muted-foreground font-medium">Time</TableHead>
              <TableHead className="text-muted-foreground font-medium">Transfer</TableHead>
              <TableHead className="text-muted-foreground font-medium">Weather</TableHead>
              <TableHead className="text-muted-foreground font-medium">Risk Score</TableHead>
              <TableHead className="text-muted-foreground font-medium">Risk Driver</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlights.map((flight) => {
              const WeatherIcon = weatherIcons[flight.weatherStatus] || Cloud
              return (
                <TableRow 
                  key={flight.id} 
                  className="border-border cursor-pointer transition-colors hover:bg-secondary/50"
                  onClick={() => handleRowClick(flight)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-md bg-secondary font-semibold text-sm text-foreground">
                        {flight.airlineLogo}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{flight.flightNumber}</p>
                        <p className="text-xs text-muted-foreground">{flight.airline}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">{flight.route}</span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="text-foreground">{flight.departureTime}</p>
                      <p className="text-xs text-muted-foreground">to {flight.arrivalTime}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{flight.transferWindow}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <WeatherIcon className={cn(
                        'size-4',
                        flight.weatherStatus === 'Clear' && 'text-success',
                        flight.weatherStatus === 'Cloudy' && 'text-muted-foreground',
                        flight.weatherStatus === 'Rain' && 'text-chart-1',
                        flight.weatherStatus === 'Thunderstorms' && 'text-destructive',
                      )} />
                      <span className="text-sm text-foreground">{flight.weatherStatus}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <Progress 
                        value={flight.riskScore} 
                        className={cn('h-2 w-16', progressColors[flight.riskLevel])}
                      />
                      <span className="text-sm font-medium text-foreground">{flight.riskScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground max-w-[180px] truncate block">
                      {flight.primaryRiskDriver}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('capitalize text-xs', statusColors[flight.status])}>
                      {flight.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="size-8">
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <RiskDetailDrawer 
        flight={selectedFlight}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  )
}
