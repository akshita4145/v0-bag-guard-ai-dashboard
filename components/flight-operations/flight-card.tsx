'use client'

import { Plane, Clock, Package, AlertTriangle, Users, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { type Flight, type RiskLevel } from '@/lib/mock-data'

interface FlightCardProps {
  flight: Flight
  onSelect: (flight: Flight) => void
  isSelected: boolean
}

const severityColors: Record<RiskLevel, string> = {
  low: 'bg-success/20 text-success border-success/30',
  moderate: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  high: 'bg-warning/20 text-warning-foreground border-warning/30',
  critical: 'bg-destructive/20 text-destructive border-destructive/30',
}

const statusColors: Record<string, string> = {
  'on-time': 'bg-success/20 text-success border-success/30',
  'delayed': 'bg-destructive/20 text-destructive border-destructive/30',
  'boarding': 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  'departed': 'bg-muted text-muted-foreground border-border',
  'arrived': 'bg-muted text-muted-foreground border-border',
}

export function FlightCard({ flight, onSelect, isSelected }: FlightCardProps) {
  return (
    <Card 
      className={cn(
        'bg-card border-border cursor-pointer transition-all hover:border-primary/50',
        isSelected && 'border-primary ring-1 ring-primary'
      )}
      onClick={() => onSelect(flight)}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-secondary font-bold text-sm text-foreground">
              {flight.airlineLogo}
            </div>
            <div>
              <p className="font-semibold text-foreground">{flight.flightNumber}</p>
              <p className="text-xs text-muted-foreground">{flight.airline}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn('capitalize text-xs', statusColors[flight.status])}>
            {flight.status.replace('-', ' ')}
          </Badge>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="font-medium text-foreground">{flight.origin}</span>
          <Plane className="size-4 text-muted-foreground rotate-90" />
          <span className="font-medium text-foreground">{flight.destination}</span>
          <span className="text-muted-foreground ml-auto">{flight.departureTime}</span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2 text-sm">
            <Package className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium text-foreground">{flight.bagsTotal}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="size-4 text-warning" />
            <span className="text-muted-foreground">At Risk:</span>
            <span className="font-medium text-warning">{flight.bagsAtRisk}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Transfer:</span>
            <span className="font-medium text-foreground">{flight.transferWindow}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Gate:</span>
            <span className="font-medium text-foreground">{flight.gate}</span>
          </div>
        </div>

        {/* Risk Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Risk Score</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{flight.riskScore}%</span>
              <Badge variant="outline" className={cn('capitalize text-[10px]', severityColors[flight.riskLevel])}>
                {flight.riskLevel}
              </Badge>
            </div>
          </div>
          <Progress 
            value={flight.riskScore} 
            className={cn(
              'h-1.5',
              flight.riskLevel === 'low' && '[&>div]:bg-success',
              flight.riskLevel === 'moderate' && '[&>div]:bg-chart-1',
              flight.riskLevel === 'high' && '[&>div]:bg-warning',
              flight.riskLevel === 'critical' && '[&>div]:bg-destructive',
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
