'use client'

import { useState, useMemo } from 'react'
import { 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Plane,
  MapPin,
  Users,
  ChevronRight,
  Zap,
  Check,
  Loader2,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
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
import { alertsData, type Alert, type RiskLevel } from '@/lib/mock-data'
import { useActionsState, isAlertResolved, getAlertAction } from '@/lib/actions-store'
import { useToast } from '@/hooks/use-toast'

const severityConfig: Record<RiskLevel, { icon: typeof AlertCircle; className: string; badgeClass: string }> = {
  critical: { 
    icon: AlertCircle, 
    className: 'text-destructive', 
    badgeClass: 'bg-destructive/20 text-destructive border-destructive/30'
  },
  high: { 
    icon: AlertTriangle, 
    className: 'text-warning', 
    badgeClass: 'bg-warning/20 text-warning-foreground border-warning/30'
  },
  moderate: { 
    icon: Clock, 
    className: 'text-chart-1', 
    badgeClass: 'bg-chart-1/20 text-chart-1 border-chart-1/30'
  },
  low: { 
    icon: CheckCircle, 
    className: 'text-success', 
    badgeClass: 'bg-success/20 text-success border-success/30'
  },
}

const teams = [
  'PHL Transfer Team A',
  'PHL Transfer Team B',
  'PHL Ramp Team C',
  'PHL Sortation Team',
  'PHL Operations Center',
  'PHL Maintenance',
  'PHL HR Dispatch',
]

interface QuickAction {
  id: string
  action: string
  priority: 'critical' | 'high' | 'moderate'
  impact: string
  applied?: boolean
}

function AlertCard({ 
  alert, 
  onTakeAction, 
  onAssign, 
  onDismiss 
}: { 
  alert: Alert
  onTakeAction: () => void
  onAssign: () => void
  onDismiss: () => void
}) {
  const isResolved = isAlertResolved(alert.id)
  const actionTaken = getAlertAction(alert.id)
  const resolvedByAction = isResolved || alert.status === 'resolved'
  const config = severityConfig[alert.severity]
  const Icon = resolvedByAction ? CheckCircle : config.icon
  const [isProcessing, setIsProcessing] = useState(false)

  const handleTakeAction = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    onTakeAction()
    setIsProcessing(false)
  }

  return (
    <Card className={cn(
      'bg-card border-border transition-all',
      resolvedByAction && 'border-success/30 bg-success/5 opacity-75',
      !resolvedByAction && alert.status === 'critical' && 'border-l-4 border-l-destructive',
      !resolvedByAction && 'hover:border-primary/30'
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            resolvedByAction ? 'bg-success/20' : alert.status === 'critical' ? 'bg-destructive/20' : alert.status === 'active' ? 'bg-warning/20' : 'bg-success/20',
          )}>
            <Icon className={cn('size-5', resolvedByAction ? 'text-success' : config.className)} />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                {resolvedByAction && (
                  <Badge className="bg-success/20 text-success border-success/30">
                    {actionTaken?.action === 'assigned' ? 'Assigned' : actionTaken?.action === 'dismissed' ? 'Dismissed' : 'Resolved'}
                  </Badge>
                )}
                <Badge variant="outline" className={cn('capitalize', severityConfig[alert.severity].badgeClass)}>
                  {alert.severity}
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {alert.relatedFlight && (
                <div className="flex items-center gap-1">
                  <Plane className="size-3" />
                  <span>{alert.relatedFlight}</span>
                </div>
              )}
              {alert.terminal && (
                <div className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  <span>Terminal {alert.terminal}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>{alert.timeDetected}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="size-3" />
                <span>{actionTaken?.assignedTeam || alert.assignedTeam}</span>
              </div>
            </div>

            <div className={cn(
              'rounded-lg p-3',
              resolvedByAction ? 'bg-success/10 border border-success/20' : 'bg-secondary/50'
            )}>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                {resolvedByAction ? 'Action Taken' : 'Suggested Intervention'}
              </p>
              <p className="text-sm text-foreground">{alert.suggestedIntervention}</p>
            </div>

            {!resolvedByAction && (
              <div className="flex gap-2 pt-1">
                <Button 
                  size="sm" 
                  className="h-8" 
                  onClick={handleTakeAction}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Take Action'
                  )}
                </Button>
                <Button size="sm" variant="outline" className="h-8" onClick={onAssign}>
                  Assign
                </Button>
                <Button size="sm" variant="ghost" className="h-8" onClick={onDismiss}>
                  Dismiss
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AlertsPage() {
  const { toast } = useToast()
  const actions = useActionsState()
  const [activeTab, setActiveTab] = useState('all')
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [selectedTeam, setSelectedTeam] = useState('')
  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    {
      id: '1',
      action: 'Reassign 2 staff to Terminal B/C transfer team',
      priority: 'high',
      impact: 'Reduce transfer delays for 45 bags',
    },
    {
      id: '2',
      action: 'Prioritize bags from delayed inbound AA1847',
      priority: 'critical',
      impact: 'Prevent 47 potential mishandled bags',
    },
    {
      id: '3',
      action: 'Increase scan verification for Terminal B/C',
      priority: 'high',
      impact: 'Improve scan rate from 94.2% to 98%+',
    },
    {
      id: '4',
      action: 'Trigger backup routing workflow for weather delays',
      priority: 'moderate',
      impact: 'Handle 8 weather-affected flights efficiently',
    },
  ])

  // Compute alert counts considering resolved actions
  const alertCounts = useMemo(() => {
    let critical = 0
    let active = 0
    let resolved = 0
    
    alertsData.forEach(a => {
      const wasResolved = isAlertResolved(a.id)
      if (wasResolved || a.status === 'resolved') {
        resolved++
      } else if (a.status === 'critical') {
        critical++
      } else if (a.status === 'active') {
        active++
      }
    })
    
    return { critical, active, resolved, total: alertsData.length }
  }, [actions.data])

  const getFilteredAlerts = () => {
    return alertsData.filter(alert => {
      const wasResolved = isAlertResolved(alert.id)
      const effectiveStatus = wasResolved ? 'resolved' : alert.status
      
      switch (activeTab) {
        case 'critical': return effectiveStatus === 'critical'
        case 'active': return effectiveStatus === 'active'
        case 'resolved': return effectiveStatus === 'resolved'
        default: return true
      }
    })
  }

  const handleTakeAction = (alert: Alert) => {
    actions.resolveAlert(alert.id, alert.title, 'resolved')
    toast({
      title: 'Alert Resolved',
      description: `"${alert.title}" has been resolved. Intervention applied.`,
    })
  }

  const handleOpenAssign = (alert: Alert) => {
    setSelectedAlert(alert)
    setAssignDialogOpen(true)
  }

  const handleAssign = () => {
    if (selectedAlert && selectedTeam) {
      actions.resolveAlert(selectedAlert.id, selectedAlert.title, 'assigned', selectedTeam)
      toast({
        title: 'Team Assigned',
        description: `${selectedTeam} has been assigned to handle: "${selectedAlert.title}"`,
      })
      setAssignDialogOpen(false)
      setSelectedAlert(null)
      setSelectedTeam('')
    }
  }

  const handleDismiss = (alert: Alert) => {
    actions.resolveAlert(alert.id, alert.title, 'dismissed')
    toast({
      title: 'Alert Dismissed',
      description: `"${alert.title}" has been dismissed.`,
    })
  }

  const handleQuickAction = (action: QuickAction) => {
    actions.applyQuickAction(action.action, action.impact)
    setQuickActions(prev => prev.map(a => 
      a.id === action.id ? { ...a, applied: true } : a
    ))
    toast({
      title: 'Action Applied',
      description: `${action.impact}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Alerts</h1>
        <p className="text-muted-foreground">
          Monitor and respond to operational alerts across the baggage handling system.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Alerts List */}
        <div className="xl:col-span-2 space-y-4">
          {/* Alert Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className="size-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold text-destructive">{alertCounts.critical}</p>
                  <p className="text-xs text-muted-foreground">Critical</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertTriangle className="size-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{alertCounts.active}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle className="size-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{alertCounts.resolved}</p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs and Alerts */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-secondary">
              <TabsTrigger value="all">All ({alertCounts.total})</TabsTrigger>
              <TabsTrigger value="critical">Critical ({alertCounts.critical})</TabsTrigger>
              <TabsTrigger value="active">Active ({alertCounts.active})</TabsTrigger>
              <TabsTrigger value="resolved">Resolved ({alertCounts.resolved})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="space-y-3 pr-4">
                  {getFilteredAlerts().map((alert) => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert}
                      onTakeAction={() => handleTakeAction(alert)}
                      onAssign={() => handleOpenAssign(alert)}
                      onDismiss={() => handleDismiss(alert)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended Actions */}
        <div className="xl:col-span-1">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="size-5 text-primary" />
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </div>
              <CardDescription>AI-suggested interventions based on current alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <div 
                    key={action.id} 
                    className={cn(
                      'rounded-lg border p-3 transition-colors',
                      action.applied 
                        ? 'border-success/30 bg-success/10' 
                        : 'border-border bg-secondary/30 hover:bg-secondary/50'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-medium text-foreground">{action.action}</p>
                      {action.applied ? (
                        <Badge className="bg-success/20 text-success border-success/30 shrink-0 text-[10px]">
                          Applied
                        </Badge>
                      ) : (
                        <Badge variant="outline" className={cn(
                          'capitalize shrink-0 text-[10px]',
                          action.priority === 'critical' && 'bg-destructive/20 text-destructive border-destructive/30',
                          action.priority === 'high' && 'bg-warning/20 text-warning-foreground border-warning/30',
                          action.priority === 'moderate' && 'bg-chart-1/20 text-chart-1 border-chart-1/30',
                        )}>
                          {action.priority}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{action.impact}</p>
                    {action.applied ? (
                      <Button size="sm" variant="outline" className="w-full h-7 text-xs" disabled>
                        <Check className="size-3 mr-1" />
                        Action Applied
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full h-7 text-xs"
                        onClick={() => handleQuickAction(action)}
                      >
                        Apply Action
                        <ChevronRight className="size-3 ml-1" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assign Team Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Assign Team</DialogTitle>
            <DialogDescription>
              Select a team to handle this alert.
            </DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4">
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-sm font-medium text-foreground">{selectedAlert.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedAlert.description}</p>
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
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedTeam}>
              Assign Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
