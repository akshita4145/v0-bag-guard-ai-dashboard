'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useActionsState } from '@/lib/actions-store'

export function KPICards() {
  const { data } = useActionsState()
  const stats = data?.stats || {
    totalActionsToday: 12,
    bagsProtected: 127,
    alertsResolved: 6,
    recommendationsApplied: 12,
  }

  // Calculate dynamic KPI data based on actions taken
  const kpiData = [
    { 
      label: 'High-Risk Flights Today', 
      value: Math.max(0, 18 - Math.floor(stats.recommendationsApplied / 3)), 
      change: -15 - Math.floor(stats.recommendationsApplied * 2), 
      trend: 'down' as const, 
      description: 'vs. yesterday' 
    },
    { 
      label: 'Bags Protected', 
      value: stats.bagsProtected, 
      change: Math.floor((stats.bagsProtected - 127) / 127 * 100) + 11, 
      trend: 'up' as const, 
      description: 'interventions today' 
    },
    { 
      label: 'Avg Predicted Risk', 
      value: `${Math.max(8, 16.8 - stats.recommendationsApplied * 0.5).toFixed(1)}%`, 
      change: -4.1 - stats.recommendationsApplied * 0.3, 
      trend: 'down' as const, 
      description: 'vs. last week' 
    },
    { 
      label: 'Est. Cost Avoided', 
      value: `$${(142 + Math.floor(stats.bagsProtected * 0.15)).toFixed(0)}K`, 
      change: 28 + Math.floor(stats.totalActionsToday * 0.5), 
      trend: 'up' as const, 
      description: 'this month' 
    },
    { 
      label: 'On-Time Transfer Rate', 
      value: `${Math.min(99.5, 95.7 + stats.recommendationsApplied * 0.2).toFixed(1)}%`, 
      change: 2.8 + stats.recommendationsApplied * 0.1, 
      trend: 'up' as const, 
      description: 'vs. target' 
    },
    { 
      label: 'Actions Today', 
      value: stats.totalActionsToday, 
      change: Math.floor((stats.totalActionsToday - 12) / 12 * 100), 
      trend: stats.totalActionsToday > 12 ? 'up' as const : 'neutral' as const, 
      description: 'interventions applied' 
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {kpiData.map((kpi) => (
        <Card key={kpi.label} className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {kpi.label}
            </p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <div
                className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  kpi.trend === 'up' && 'text-success',
                  kpi.trend === 'down' && (kpi.label.includes('Risk') || kpi.label.includes('High-Risk') ? 'text-success' : 'text-destructive'),
                  kpi.trend === 'neutral' && 'text-muted-foreground'
                )}
              >
                {kpi.trend === 'up' && <TrendingUp className="size-3" />}
                {kpi.trend === 'down' && <TrendingDown className="size-3" />}
                {kpi.trend === 'neutral' && <Minus className="size-3" />}
                <span>{kpi.change > 0 ? '+' : ''}{typeof kpi.change === 'number' ? kpi.change.toFixed(1) : kpi.change}%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
