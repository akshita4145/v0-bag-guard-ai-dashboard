'use client'

import { 
  CheckCircle2,
  ShieldCheck,
  ArrowRightLeft,
  Plane,
  RefreshCw,
  PackageOpen,
  Luggage,
  ChevronRight,
  AlertTriangle,
  Package,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { baggageStages } from '@/lib/mock-data'

const stageIcons = [
  CheckCircle2,
  ShieldCheck,
  ArrowRightLeft,
  Plane,
  RefreshCw,
  PackageOpen,
  Luggage,
]

export default function BaggageFlowPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Baggage Flow</h1>
        <p className="text-muted-foreground">
          Visualize the complete baggage journey from check-in to carousel delivery.
        </p>
      </div>

      {/* Pipeline Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Real-Time Pipeline Status</CardTitle>
          <CardDescription>Current baggage processing across all stages</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Flow Pipeline */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-border hidden lg:block" />
            
            {/* Stages */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {baggageStages.map((stage, index) => {
                const Icon = stageIcons[index]
                const isBottleneck = stage.bottleneck
                
                return (
                  <div key={stage.name} className="relative">
                    {/* Stage Card */}
                    <div className={cn(
                      'rounded-lg border p-4 text-center transition-all',
                      isBottleneck 
                        ? 'border-warning bg-warning/10' 
                        : 'border-border bg-secondary/30'
                    )}>
                      {/* Icon */}
                      <div className={cn(
                        'mx-auto mb-3 flex size-10 items-center justify-center rounded-full',
                        isBottleneck 
                          ? 'bg-warning/20 text-warning' 
                          : 'bg-primary/20 text-primary'
                      )}>
                        <Icon className="size-5" />
                      </div>
                      
                      {/* Stage Name */}
                      <p className="text-sm font-semibold text-foreground mb-2">{stage.name}</p>
                      
                      {/* Bottleneck Badge */}
                      {isBottleneck && (
                        <Badge variant="outline" className="mb-2 bg-warning/20 text-warning-foreground border-warning/30 text-[10px]">
                          Bottleneck
                        </Badge>
                      )}
                      
                      {/* Metrics */}
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Processed</span>
                          <span className="font-medium text-foreground">{stage.bagsProcessed.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Delayed</span>
                          <span className={cn(
                            'font-medium',
                            stage.bagsDelayed > 30 ? 'text-warning' : 'text-foreground'
                          )}>{stage.bagsDelayed}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Flagged</span>
                          <span className={cn(
                            'font-medium',
                            stage.bagsFlagged > 20 ? 'text-destructive' : 'text-foreground'
                          )}>{stage.bagsFlagged}</span>
                        </div>
                      </div>
                      
                      {/* Scan Completeness */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Scan</span>
                          <span className={cn(
                            'font-medium',
                            stage.scanCompleteness < 96 ? 'text-warning' : 'text-success'
                          )}>{stage.scanCompleteness}%</span>
                        </div>
                        <Progress 
                          value={stage.scanCompleteness} 
                          className={cn(
                            'h-1',
                            stage.scanCompleteness < 96 ? '[&>div]:bg-warning' : '[&>div]:bg-success'
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Connector Arrow (hidden on last item) */}
                    {index < baggageStages.length - 1 && (
                      <ChevronRight className="absolute -right-2.5 top-12 size-5 text-muted-foreground hidden lg:block z-10 bg-background" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
                <Package className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total In System</p>
                <p className="text-2xl font-bold text-foreground">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-warning/20">
                <Clock className="size-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Currently Delayed</p>
                <p className="text-2xl font-bold text-foreground">226</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/20">
                <AlertTriangle className="size-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Flagged for Review</p>
                <p className="text-2xl font-bold text-foreground">135</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-success/20">
                <CheckCircle2 className="size-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Scan Rate</p>
                <p className="text-2xl font-bold text-foreground">98.1%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stage Breakdown */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Stage Performance Details</CardTitle>
          <CardDescription>Detailed metrics for each processing stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stage</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Bags Processed</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Delayed</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Flagged</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Scan Rate</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {baggageStages.map((stage, index) => {
                  const Icon = stageIcons[index]
                  return (
                    <tr key={stage.name} className="border-b border-border last:border-0 hover:bg-secondary/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'flex size-8 items-center justify-center rounded-md',
                            stage.bottleneck ? 'bg-warning/20 text-warning' : 'bg-secondary text-muted-foreground'
                          )}>
                            <Icon className="size-4" />
                          </div>
                          <span className="font-medium text-foreground">{stage.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-foreground">
                        {stage.bagsProcessed.toLocaleString()}
                      </td>
                      <td className={cn(
                        'py-3 px-4 text-right font-medium',
                        stage.bagsDelayed > 30 ? 'text-warning' : 'text-foreground'
                      )}>
                        {stage.bagsDelayed}
                      </td>
                      <td className={cn(
                        'py-3 px-4 text-right font-medium',
                        stage.bagsFlagged > 20 ? 'text-destructive' : 'text-foreground'
                      )}>
                        {stage.bagsFlagged}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={cn(
                          'font-medium',
                          stage.scanCompleteness < 96 ? 'text-warning' : 'text-success'
                        )}>{stage.scanCompleteness}%</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {stage.bottleneck ? (
                          <Badge variant="outline" className="bg-warning/20 text-warning-foreground border-warning/30">
                            Bottleneck
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                            Normal
                          </Badge>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
