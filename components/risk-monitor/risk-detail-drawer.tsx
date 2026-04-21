'use client'

import { useState } from 'react'
import { 
  Clock, 
  CloudRain, 
  Users, 
  Scan, 
  TrendingUp,
  MapPin,
  AlertTriangle,
  Package,
  Check,
  Loader2,
  UserPlus
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
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
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type Flight, type RiskLevel } from '@/lib/mock-data'
import { useActionsState, isRiskActionTaken, getRiskAction } from '@/lib/actions-store'
import { useToast } from '@/hooks/use-toast'

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

const teams = [
  'PHL Transfer Team A',
  'PHL Transfer Team B',
  'PHL Ramp Team C',
  'PHL Sortation Team',
  'PHL Operations Center',
]

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
  const { toast } = useToast()
  const actions = useActionsState()
  const [isApplying, setIsApplying] = useState(false)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState('')
  
  if (!flight) return null

  const riskFactors = getRiskFactors(flight)
  const actionTaken = isRiskActionTaken(flight.id)
  const actionDetails = getRiskAction(flight.id)

  const handleApplyRecommendation = async () => {
    setIsApplying(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    actions.applyRiskAction(flight.id, flight.flightNumber)
    toast({
      title: 'Recommendation Applied',
      description: `Risk mitigation for ${flight.flightNumber} has been applied. ${flight.bagsAtRisk} bags protected.`,
    })
    setIsApplying(false)
  }

  const handleAssignTeam = () => {
    if (selectedTeam) {
      actions.applyRiskAction(flight.id, flight.flightNumber, selectedTeam)
      toast({
        title: 'Team Assigned',
        description: `${selectedTeam} has been assigned to handle ${flight.flightNumber} risk mitigation.`,
      })
      setAssignDialogOpen(false)
      setSelectedTeam('')
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[400px] sm:w-[540px] bg-card border-border overflow-y-auto">
          <SheetHeader className="space-y-1">
            <div className="flex items-center gap-3">
              <div className={cn(
                'flex size-12 items-center justify-center rounded-lg font-bold text-lg',
                actionTaken ? 'bg-success/20 text-success' : 'bg-secondary text-foreground'
              )}>
                {actionTaken ? <Check className="size-6" /> : flight.airlineLogo}
              </div>
              <div>
                <SheetTitle className="text-xl flex items-center gap-2">
                  {flight.flightNumber}
                  {actionTaken && (
                    <Badge className="bg-success/20 text-success border-success/30">
                      {actionDetails?.assignedTeam ? 'Assigned' : 'Mitigated'}
                    </Badge>
                  )}
                </SheetTitle>
                <SheetDescription>{flight.airline}</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Risk Score Section */}
            <div className={cn(
              'rounded-lg border p-4',
              actionTaken ? 'border-success/30 bg-success/10' : 'border-border bg-secondary/50'
            )}>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {actionTaken ? 'Risk Mitigated' : 'Risk Score'}
              </p>
              <div className="flex items-center justify-between">
                <span className={cn(
                  'text-4xl font-bold',
                  actionTaken ? 'text-success line-through opacity-50' : 'text-foreground'
                )}>
                  {flight.riskScore}%
                </span>
                {actionTaken ? (
                  <Badge className="bg-success/20 text-success border-success/30 text-sm px-3 py-1">
                    Protected
                  </Badge>
                ) : (
                  <Badge variant="outline" className={cn('capitalize text-sm px-3 py-1', severityColors[flight.riskLevel])}>
                    {flight.riskLevel}
                  </Badge>
                )}
              </div>
              <Progress 
                value={actionTaken ? 15 : flight.riskScore} 
                className={cn('mt-3 h-2', actionTaken && '[&>div]:bg-success')}
              />
              {actionTaken && (
                <p className="text-xs text-success mt-2">
                  Risk reduced from {flight.riskScore}% to ~15% after intervention
                </p>
              )}
            </div>

            {/* Key Risk Factors */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {actionTaken ? 'Addressed Risk Factors' : 'Key Risk Factors'}
              </p>
              <div className="space-y-2">
                {riskFactors.map((factor, index) => {
                  const IconComponent = Object.entries(riskFactorIcons).find(([key]) => 
                    factor.name.toLowerCase().includes(key.toLowerCase())
                  )?.[1] || AlertTriangle

                  return (
                    <div 
                      key={index}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border p-3',
                        actionTaken ? 'border-success/20 bg-success/5' : 'border-border bg-secondary/30'
                      )}
                    >
                      <div className={cn(
                        'size-2 rounded-full',
                        actionTaken ? 'bg-success' : severityDotColors[factor.severity]
                      )} />
                      <IconComponent className={cn(
                        'size-4',
                        actionTaken ? 'text-success' : 'text-muted-foreground'
                      )} />
                      <span className={cn(
                        'flex-1 text-sm font-medium',
                        actionTaken ? 'text-muted-foreground line-through' : 'text-foreground'
                      )}>
                        {factor.name}
                      </span>
                      <Badge variant="outline" className={cn(
                        'capitalize text-xs',
                        actionTaken ? 'bg-success/20 text-success border-success/30' : severityColors[factor.severity]
                      )}>
                        {actionTaken ? 'resolved' : factor.severity}
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
                {actionTaken ? 'Protected Volume' : 'Affected Volume'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                  <Package className="mx-auto size-5 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold text-foreground">{flight.bagsTotal}</p>
                  <p className="text-xs text-muted-foreground">Total Bags</p>
                </div>
                <div className={cn(
                  'rounded-lg border p-4 text-center',
                  actionTaken ? 'border-success/30 bg-success/10' : 'border-destructive/30 bg-destructive/10'
                )}>
                  {actionTaken ? (
                    <Check className="mx-auto size-5 text-success mb-2" />
                  ) : (
                    <AlertTriangle className="mx-auto size-5 text-destructive mb-2" />
                  )}
                  <p className={cn(
                    'text-2xl font-bold',
                    actionTaken ? 'text-success' : 'text-destructive'
                  )}>
                    {actionTaken ? flight.bagsAtRisk : flight.bagsAtRisk}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {actionTaken ? 'Bags Protected' : 'Bags at Risk'}
                  </p>
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
                {actionTaken && actionDetails?.assignedTeam && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned Team</span>
                    <span className="font-medium text-success">{actionDetails.assignedTeam}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Recommended Action */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {actionTaken ? 'Action Taken' : 'Recommended Action'}
              </p>
              <p className={cn(
                'text-sm rounded-lg border p-3',
                actionTaken 
                  ? 'text-foreground bg-success/10 border-success/20' 
                  : 'text-foreground bg-primary/10 border-primary/20'
              )}>
                {flight.recommendedAction}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              {actionTaken ? (
                <>
                  <Button className="flex-1 bg-success hover:bg-success/90" disabled>
                    <Check className="mr-1.5 size-4" />
                    Action Applied
                  </Button>
                  <Button variant="outline" className="flex-1" disabled>
                    {actionDetails?.assignedTeam || 'Team Assigned'}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    className="flex-1" 
                    onClick={handleApplyRecommendation}
                    disabled={isApplying}
                  >
                    {isApplying ? (
                      <>
                        <Loader2 className="mr-1.5 size-4 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      'Apply Recommendation'
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setAssignDialogOpen(true)}
                  >
                    <UserPlus className="mr-1.5 size-4" />
                    Assign Team
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Assign Team Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Assign Team to {flight?.flightNumber}</DialogTitle>
            <DialogDescription>
              Select a team to handle risk mitigation for this flight.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-sm font-medium text-foreground">{flight?.recommendedAction}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {flight?.bagsAtRisk} bags at risk on {flight?.route}
              </p>
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
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
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
