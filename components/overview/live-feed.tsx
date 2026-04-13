'use client'

import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { liveFeedItems, type RiskLevel } from '@/lib/mock-data'

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
    icon: Info, 
    className: 'text-chart-1', 
    badgeClass: 'bg-chart-1/20 text-chart-1 border-chart-1/30'
  },
  low: { 
    icon: CheckCircle, 
    className: 'text-success', 
    badgeClass: 'bg-success/20 text-success border-success/30'
  },
}

export function LiveFeed() {
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
            {liveFeedItems.map((item) => {
              const config = severityConfig[item.severity]
              const Icon = config.icon
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary/50"
                >
                  <Icon className={cn('mt-0.5 size-4 shrink-0', config.className)} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-foreground leading-relaxed">{item.message}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn('text-[10px] font-medium capitalize', config.badgeClass)}>
                        {item.severity}
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
