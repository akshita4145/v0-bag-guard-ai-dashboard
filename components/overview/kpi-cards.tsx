'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { kpiData } from '@/lib/mock-data'

export function KPICards() {
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
                  kpi.trend === 'down' && (kpi.label.includes('Risk') || kpi.label.includes('Flagged') || kpi.label.includes('Alert') ? 'text-success' : 'text-destructive'),
                  kpi.trend === 'neutral' && 'text-muted-foreground'
                )}
              >
                {kpi.trend === 'up' && <TrendingUp className="size-3" />}
                {kpi.trend === 'down' && <TrendingDown className="size-3" />}
                {kpi.trend === 'neutral' && <Minus className="size-3" />}
                <span>{kpi.change > 0 ? '+' : ''}{kpi.change}%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
