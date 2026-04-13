'use client'

import { 
  Clock, 
  CloudRain, 
  Users, 
  Scan, 
  TrendingUp,
  MapPin,
  AlertTriangle,
  Package
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type Flight, type RiskLevel } from '@/lib/mock-data'

interface RiskDetailDrawerProps {
  flight: Flight | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const riskFactorIcons: Record<string, typeof Clock> = {
  'Tight Connection': Clock,
  'Weather': CloudRain,
  'Staffing': Users,
  'Scan Gap': Scan,
  'Volume': TrendingUp,
  'Gate Distance': MapPin,
}

const severityColors: Record<RiskLevel, string> = {
  low: 'bg-success/20 text-success border-success/30',
  moderate: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  high: 'bg-warning/20 text-warning-foreground border-warning/30',
  critical: 'bg-destructive/20 text-destructive border-destructive/30',
}

const severityDotColors: Record<RiskLevel, string> = {
  low: 'bg-success',
  moderate: 'bg-chart-1',
  high: 'bg-warning',
  critical: 'bg-destructive',
}

// Mock risk factors based on primary risk driver
function getRiskFactors(flight: Flight): { name: string; severity: RiskLevel }[] {
  const factors: { name: string; severity: RiskLevel }[] = []
  
  if (flight.primaryRiskDriver.toLowerCase().includes('connection') || flight.primaryRiskDriver.toLowerCase().includes('tight')) {
    factors.push({ name: 'Tight Connection Window', severity: 'critical' })
  }
  if (flight.primaryRiskDriver.toLowerCase().includes('weather') || flight.weatherStatus !== 'Clear') {
    factors.push({ name: 'Weather Disruption', severity: flight.weatherStatus === 'Thunderstorms' ? 'critical' : 'high' })
  }
  if (flight.primaryRiskDriver.toLowerCase().includes('staffing')) {
    factors.push({ name: 'Staffing Shortage', severity: 'high' })
  }
  if (flight.primaryRiskDriver.toLowerCase().includes('scan')) {
    factors.push({ name: 'Scan Gap Detected', severity: 'high' })
  }
  if (flight.primaryRiskDriver.toLowerCase().includes('volume')) {
    factors.push({ name: 'High Transfer Volume', severity: 'moderate' })
  }
  if (flight.primaryRiskDriver.toLowerCase().includes('gate') || flight.primaryRiskDriver.toLowerCase().includes('distance')) {
    factors.push({ name: 'Gate Distance Issue', severity: 'high' })
  }
  
  // Add some additional moderate/low factors for realism
  if (factors.length < 4) {
    factors.push({ name: 'Historical Route Risk', severity: 'moderate' })
  }
  if (factors.length < 4) {
    factors.push({ name: 'Terminal Congestion', severity: 'low' })
  }
  
  return factors.slice(0, 4)
}

export function RiskDetailDrawer({ flight, open, onOpenChange }: RiskDetailDrawerProps) {
  if (!flight) return null

  const riskFactors = getRiskFactors(flight)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-card border-border overflow-y-auto">
        <SheetHeader className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-lg bg-secondary font-bold text-lg text-foreground">
              {flight.airlineLogo}
            </div>
            <div>
              <SheetTitle className="text-xl">{flight.flightNumber}</SheetTitle>
              <SheetDescription>{flight.airline}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Risk Score Section */}
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Risk Score
            </p>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-foreground">{flight.riskScore}%</span>
              <Badge variant="outline" className={cn('capitalize text-sm px-3 py-1', severityColors[flight.riskLevel])}>
                {flight.riskLevel}
              </Badge>
            </div>
            <Progress 
              value={flight.riskScore} 
              className="mt-3 h-2"
            />
          </div>

          {/* Key Risk Factors */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Key Risk Factors
            </p>
            <div className="space-y-2">
              {riskFactors.map((factor, index) => {
                const IconComponent = Object.entries(riskFactorIcons).find(([key]) => 
                  factor.name.toLowerCase().includes(key.toLowerCase())
                )?.[1] || AlertTriangle

                return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                  >
                    <div className={cn('size-2 rounded-full', severityDotColors[factor.severity])} />
                    <IconComponent className="size-4 text-muted-foreground" />
                    <span className="flex-1 text-sm font-medium text-foreground">{factor.name}</span>
                    <Badge variant="outline" className={cn('capitalize text-xs', severityColors[factor.severity])}>
                      {factor.severity}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Affected Volume */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Affected Volume
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                <Package className="mx-auto size-5 text-muted-foreground mb-2" />
                <p className="text-2xl font-bold text-foreground">{flight.bagsTotal}</p>
                <p className="text-xs text-muted-foreground">Total Bags</p>
              </div>
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-center">
                <AlertTriangle className="mx-auto size-5 text-destructive mb-2" />
                <p className="text-2xl font-bold text-destructive">{flight.bagsAtRisk}</p>
                <p className="text-xs text-muted-foreground">Bags at Risk</p>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Flight Details */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Flight Details
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Route</span>
                <span className="font-medium text-foreground">{flight.route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Departure</span>
                <span className="font-medium text-foreground">{flight.departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Arrival</span>
                <span className="font-medium text-foreground">{flight.arrivalTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transfer Window</span>
                <span className="font-medium text-foreground">{flight.transferWindow}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gate / Terminal</span>
                <span className="font-medium text-foreground">{flight.gate} / {flight.terminal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weather</span>
                <span className="font-medium text-foreground">{flight.weatherStatus}</span>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Recommended Action */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Recommended Action
            </p>
            <p className="text-sm text-foreground bg-primary/10 border border-primary/20 rounded-lg p-3">
              {flight.recommendedAction}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1">Apply Recommendation</Button>
            <Button variant="outline" className="flex-1">Assign Team</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
