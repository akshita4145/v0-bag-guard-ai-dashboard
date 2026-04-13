'use client'

import { useState } from 'react'
import { 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Plane,
  MapPin,
  Users,
  ChevronRight,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { alertsData, type Alert, type RiskLevel } from '@/lib/mock-data'

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

const recommendedActions = [
  {
    id: '1',
    action: 'Reassign 2 staff to Terminal C transfer team',
    priority: 'high',
    impact: 'Reduce transfer delays for 45 bags',
  },
  {
    id: '2',
    action: 'Prioritize bags from delayed inbound flight AA482',
    priority: 'critical',
    impact: 'Prevent 47 potential mishandled bags',
  },
  {
    id: '3',
    action: 'Increase scan verification for Terminal B',
    priority: 'high',
    impact: 'Improve scan rate from 94.2% to 98%+',
  },
  {
    id: '4',
    action: 'Trigger backup routing workflow for weather delays',
    priority: 'moderate',
    impact: 'Handle 8 weather-affected flights efficiently',
  },
]

function AlertCard({ alert }: { alert: Alert }) {
  const config = severityConfig[alert.severity]
  const Icon = config.icon

  return (
    <Card className={cn(
      'bg-card border-border transition-all hover:border-primary/30',
      alert.status === 'critical' && 'border-l-4 border-l-destructive'
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            alert.status === 'critical' && 'bg-destructive/20',
            alert.status === 'active' && 'bg-warning/20',
            alert.status === 'resolved' && 'bg-success/20',
          )}>
            <Icon className={cn('size-5', config.className)} />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
              <Badge variant="outline" className={cn('capitalize shrink-0 ml-2', severityConfig[alert.severity].badgeClass)}>
                {alert.severity}
              </Badge>
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
                <span>{alert.assignedTeam}</span>
              </div>
            </div>

            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">Suggested Intervention</p>
              <p className="text-sm text-foreground">{alert.suggestedIntervention}</p>
            </div>

            {alert.status !== 'resolved' && (
              <div className="flex gap-2 pt-1">
                <Button size="sm" className="h-8">Take Action</Button>
                <Button size="sm" variant="outline" className="h-8">Assign</Button>
                <Button size="sm" variant="ghost" className="h-8">Dismiss</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const criticalAlerts = alertsData.filter(a => a.status === 'critical')
  const activeAlerts = alertsData.filter(a => a.status === 'active')
  const resolvedAlerts = alertsData.filter(a => a.status === 'resolved')

  const getFilteredAlerts = () => {
    switch (activeTab) {
      case 'critical': return criticalAlerts
      case 'active': return activeAlerts
      case 'resolved': return resolvedAlerts
      default: return alertsData
    }
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
                  <p className="text-2xl font-bold text-destructive">{criticalAlerts.length}</p>
                  <p className="text-xs text-muted-foreground">Critical</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertTriangle className="size-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{activeAlerts.length}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle className="size-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{resolvedAlerts.length}</p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs and Alerts */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-secondary">
              <TabsTrigger value="all">All ({alertsData.length})</TabsTrigger>
              <TabsTrigger value="critical">Critical ({criticalAlerts.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeAlerts.length})</TabsTrigger>
              <TabsTrigger value="resolved">Resolved ({resolvedAlerts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="space-y-3 pr-4">
                  {getFilteredAlerts().map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
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
                <CardTitle className="text-base">Recommended Actions</CardTitle>
              </div>
              <CardDescription>AI-suggested interventions based on current alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendedActions.map((action) => (
                  <div 
                    key={action.id} 
                    className="rounded-lg border border-border bg-secondary/30 p-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-medium text-foreground">{action.action}</p>
                      <Badge variant="outline" className={cn(
                        'capitalize shrink-0 text-[10px]',
                        action.priority === 'critical' && 'bg-destructive/20 text-destructive border-destructive/30',
                        action.priority === 'high' && 'bg-warning/20 text-warning-foreground border-warning/30',
                        action.priority === 'moderate' && 'bg-chart-1/20 text-chart-1 border-chart-1/30',
                      )}>
                        {action.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{action.impact}</p>
                    <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                      Apply Action
                      <ChevronRight className="size-3 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
