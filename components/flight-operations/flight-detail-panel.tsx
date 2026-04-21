'use client'

import { useState } from 'react'
import { 
  Plane, 
  Clock, 
  Package, 
  AlertTriangle, 
  MapPin,
  CloudRain,
  Users,
  ArrowRight,
  Timer,
  Check,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { type Flight, type RiskLevel } from '@/lib/mock-data'
import { useActionsState, isRiskActionTaken, getRiskAction } from '@/lib/actions-store'
import { useToast } from '@/hooks/use-toast'

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

const teams = [
  'PHL Transfer Team A',
  'PHL Transfer Team B',
  'PHL Ramp Team C',
  'PHL Sortation Team',
  'PHL Operations Center',
]

export function FlightDetailPanel({ flight }: FlightDetailPanelProps) {
  const { toast } = useToast()
  const actions = useActionsState()
  const [isAssigning, setIsAssigning] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState('')

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

  const actionTaken = isRiskActionTaken(flight.id)
  const actionDetails = getRiskAction(flight.id)

  // Calculate mock metrics
  const connectingBags = Math.floor(flight.bagsTotal * 0.35)
  const missedTransferProb = actionTaken 
    ? Math.max(5, Math.floor(flight.riskScore * 0.15))
    : Math.min(95, Math.floor(flight.riskScore * 0.8 + Math.random() * 15))
  const loadCompletion = flight.status === 'departed' ? 100 : flight.status === 'boarding' ? Math.floor(65 + Math.random() * 25) : 0

  const handleAssignPriority = async () => {
    setIsAssigning(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    actions.applyRiskAction(flight.id, flight.flightNumber)
    toast({
      title: 'Priority Assigned',
      description: `${flight.flightNumber} has been marked as priority. ${flight.bagsAtRisk} bags will receive expedited handling.`,
    })
    setIsAssigning(false)
  }

  const handleAssignTeam = () => {
    if (selectedTeam) {
      actions.applyRiskAction(flight.id, flight.flightNumber, selectedTeam)
      toast({
        title: 'Team Assigned',
        description: `${selectedTeam} assigned to ${flight.flightNumber}. Notification sent.`,
      })
      setDialogOpen(false)
      setSelectedTeam('')
    }
  }

  return (
    <>
      <Card className={cn(
        'bg-card border-border h-full',
        actionTaken && 'border-success/30'
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                'flex size-12 items-center justify-center rounded-lg font-bold text-lg',
                actionTaken ? 'bg-success/20 text-success' : 'bg-secondary text-foreground'
              )}>
                {actionTaken ? <Check className="size-6" /> : flight.airlineLogo}
              </div>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {flight.flightNumber}
                  {actionTaken && (
                    <Badge className="bg-success/20 text-success border-success/30 text-xs">
                      Priority
                    </Badge>
                  )}
                </CardTitle>
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
                  {actionTaken ? (
                    <Check className="size-4 text-success" />
                  ) : (
                    <AlertTriangle className="size-4 text-warning" />
                  )}
                  <span className="text-sm text-foreground">
                    {actionTaken ? 'Bags Protected' : 'Bags at Risk'}
                  </span>
                </div>
                <span className={cn('font-semibold', actionTaken ? 'text-success' : 'text-warning')}>
                  {flight.bagsAtRisk}
                </span>
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
          <div className={cn(
            'rounded-lg border p-4',
            actionTaken ? 'border-success/30 bg-success/10' : 'border-destructive/30 bg-destructive/10'
          )}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-foreground">
                {actionTaken ? 'Risk After Intervention' : 'Predicted Missed Transfer'}
              </p>
              <Badge variant="outline" className={cn(
                'capitalize',
                actionTaken ? 'bg-success/20 text-success border-success/30' : severityColors[flight.riskLevel]
              )}>
                {actionTaken ? 'mitigated' : flight.riskLevel}
              </Badge>
            </div>
            <p className={cn('text-3xl font-bold', actionTaken ? 'text-success' : 'text-destructive')}>
              {missedTransferProb}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {actionTaken 
                ? `Reduced from ${flight.riskScore}% after priority handling`
                : 'Probability of bags missing connection'
              }
            </p>
          </div>

          {/* Staff Recommendation */}
          <div className={cn(
            'rounded-lg border p-4',
            actionTaken ? 'border-success/20 bg-success/5' : 'border-primary/30 bg-primary/10'
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Users className={cn('size-4', actionTaken ? 'text-success' : 'text-primary')} />
              <p className="text-sm font-medium text-foreground">
                {actionTaken ? 'Action Taken' : 'Staff Recommendation'}
              </p>
            </div>
            <p className="text-sm text-foreground">{flight.recommendedAction}</p>
            {actionTaken && actionDetails?.assignedTeam && (
              <p className="text-xs text-success mt-2">
                Assigned to: {actionDetails.assignedTeam}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {actionTaken ? (
              <>
                <Button className="flex-1 bg-success hover:bg-success/90" disabled>
                  <Check className="mr-1.5 size-4" />
                  Priority Assigned
                </Button>
                <Button variant="outline" className="flex-1" disabled>
                  {actionDetails?.assignedTeam || 'Team Notified'}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="flex-1" 
                  onClick={handleAssignPriority}
                  disabled={isAssigning}
                >
                  {isAssigning ? (
                    <>
                      <Loader2 className="mr-1.5 size-4 animate-spin" />
                      Assigning...
                    </>
                  ) : (
                    'Assign Priority'
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setDialogOpen(true)}
                >
                  Assign Team
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assign Team Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Assign Team to {flight?.flightNumber}</DialogTitle>
            <DialogDescription>
              Select a team to handle baggage operations for this flight.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-sm font-medium text-foreground">
                {flight?.route} - {flight?.bagsAtRisk} bags at risk
              </p>
              <p className="text-xs text-muted-foreground mt-1">{flight?.recommendedAction}</p>
            </div>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>{team}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignTeam} disabled={!selectedTeam}>
              Assign Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
