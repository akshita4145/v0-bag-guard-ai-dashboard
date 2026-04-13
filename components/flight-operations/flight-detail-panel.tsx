'use client'

import { 
  Plane, 
  Clock, 
  Package, 
  AlertTriangle, 
  MapPin,
  CloudRain,
  Users,
  ArrowRight,
  CheckCircle,
  Timer
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type Flight, type RiskLevel } from '@/lib/mock-data'

interface FlightDetailPanelProps {
  flight: Flight | null
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

export function FlightDetailPanel({ flight }: FlightDetailPanelProps) {
  if (!flight) {
    return (
      <Card className="bg-card border-border h-full">
        <CardContent className="flex items-center justify-center h-full min-h-[400px]">
          <div className="text-center">
            <Plane className="mx-auto size-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">Select a flight to view details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate mock metrics
  const connectingBags = Math.floor(flight.bagsTotal * 0.35)
  const missedTransferProb = Math.min(95, Math.floor(flight.riskScore * 0.8 + Math.random() * 15))
  const loadCompletion = flight.status === 'departed' ? 100 : flight.status === 'boarding' ? Math.floor(65 + Math.random() * 25) : 0

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-lg bg-secondary font-bold text-lg text-foreground">
              {flight.airlineLogo}
            </div>
            <div>
              <CardTitle className="text-xl">{flight.flightNumber}</CardTitle>
              <p className="text-sm text-muted-foreground">{flight.airline}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn('capitalize', statusColors[flight.status])}>
            {flight.status.replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Route Display */}
        <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{flight.origin}</p>
            <p className="text-xs text-muted-foreground">Origin</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-px w-8 bg-border" />
              <Plane className="size-5 rotate-90" />
              <div className="h-px w-8 bg-border" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Direct</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{flight.destination}</p>
            <p className="text-xs text-muted-foreground">Destination</p>
          </div>
        </div>

        {/* Flight Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-secondary/30 p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-4" />
              <span className="text-xs">Departure</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{flight.departureTime}</p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="size-4" />
              <span className="text-xs">Gate / Terminal</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{flight.gate} / {flight.terminal}</p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CloudRain className="size-4" />
              <span className="text-xs">Weather</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{flight.weatherStatus}</p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Timer className="size-4" />
              <span className="text-xs">Transfer Window</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{flight.transferWindow}</p>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Baggage Metrics */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Baggage Metrics
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Inbound Bags</span>
              </div>
              <span className="font-semibold text-foreground">{flight.bagsTotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRight className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Connecting Bags</span>
              </div>
              <span className="font-semibold text-foreground">{connectingBags}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-warning" />
                <span className="text-sm text-foreground">Bags at Risk</span>
              </div>
              <span className="font-semibold text-warning">{flight.bagsAtRisk}</span>
            </div>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Load Completion */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-foreground">Baggage Load Completion</p>
            <span className="text-sm font-medium text-foreground">{loadCompletion}%</span>
          </div>
          <Progress value={loadCompletion} className="h-2 [&>div]:bg-success" />
        </div>

        {/* Predicted Miss Rate */}
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-foreground">Predicted Missed Transfer</p>
            <Badge variant="outline" className={cn('capitalize', severityColors[flight.riskLevel])}>
              {flight.riskLevel}
            </Badge>
          </div>
          <p className="text-3xl font-bold text-destructive">{missedTransferProb}%</p>
          <p className="text-xs text-muted-foreground mt-1">Probability of bags missing connection</p>
        </div>

        {/* Staff Recommendation */}
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-4 text-primary" />
            <p className="text-sm font-medium text-foreground">Staff Recommendation</p>
          </div>
          <p className="text-sm text-foreground">{flight.recommendedAction}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1">Assign Priority</Button>
          <Button variant="outline" className="flex-1">View Full History</Button>
        </div>
      </CardContent>
    </Card>
  )
}
