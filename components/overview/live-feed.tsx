'use client'

import { useMemo } from 'react'
import { AlertCircle, AlertTriangle, Info, CheckCircle, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { liveFeedItems, type RiskLevel, type LiveFeedItem } from '@/lib/mock-data'
import { useActionsState, type ActionRecord } from '@/lib/actions-store'

const severityConfig: Record<RiskLevel | 'action', { icon: typeof AlertCircle; className: string; badgeClass: string }> = {
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
    icon: Info, 
    className: 'text-chart-1', 
    badgeClass: 'bg-chart-1/20 text-chart-1 border-chart-1/30'
  },
  low: { 
    icon: CheckCircle, 
    className: 'text-success', 
    badgeClass: 'bg-success/20 text-success border-success/30'
  },
  action: {
    icon: Zap,
    className: 'text-primary',
    badgeClass: 'bg-primary/20 text-primary border-primary/30'
  },
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  if (seconds < 60) return 'Just now'
  if (seconds < 120) return '1 min ago'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  return `${Math.floor(seconds / 3600)} hr ago`
}

function actionToFeedItem(action: ActionRecord): LiveFeedItem & { isAction: true } {
  let message = ''
  switch (action.type) {
    case 'recommendation':
      message = action.action === 'applied' 
        ? `Recommendation applied: ${action.targetTitle}` 
        : action.action === 'assigned'
        ? `Team assigned to: ${action.targetTitle}`
        : `Reviewed: ${action.targetTitle}`
      break
    case 'alert':
      message = action.action === 'resolved'
        ? `Alert resolved: ${action.targetTitle}`
        : action.action === 'assigned'
        ? `Alert assigned to ${action.assignedTeam}: ${action.targetTitle}`
        : `Alert dismissed: ${action.targetTitle}`
      break
    case 'risk':
      message = action.assignedTeam
        ? `Risk mitigation assigned to ${action.assignedTeam}: ${action.targetTitle}`
        : `Risk mitigation applied: ${action.targetTitle}`
      break
    case 'action':
      message = `Quick action applied: ${action.targetTitle}`
      break
  }
  
  return {
    id: action.id,
    message,
    severity: 'low' as RiskLevel,
    timestamp: formatTimeAgo(action.timestamp),
    isAction: true,
  }
}

export function LiveFeed() {
  const { data } = useActionsState()
  
  // Combine action history with static feed items
  const combinedFeed = useMemo(() => {
    const actionItems = (data?.actionHistory || []).map(actionToFeedItem)
    const staticItems = liveFeedItems.map(item => ({ ...item, isAction: false }))
    
    // Interleave action items at the top
    return [...actionItems, ...staticItems].slice(0, 15)
  }, [data?.actionHistory])

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Live Risk Feed</CardTitle>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[360px]">
          <div className="space-y-1 px-4 pb-4">
            {combinedFeed.map((item) => {
              const isActionItem = 'isAction' in item && item.isAction
              const config = isActionItem ? severityConfig.action : severityConfig[item.severity]
              const Icon = config.icon
              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-start gap-3 rounded-lg p-3 transition-colors',
                    isActionItem ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-secondary/50'
                  )}
                >
                  <Icon className={cn('mt-0.5 size-4 shrink-0', config.className)} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-foreground leading-relaxed">{item.message}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn('text-[10px] font-medium capitalize', config.badgeClass)}>
                        {isActionItem ? 'action' : item.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                      {item.flightNumber && (
                        <span className="text-xs font-medium text-primary">{item.flightNumber}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
