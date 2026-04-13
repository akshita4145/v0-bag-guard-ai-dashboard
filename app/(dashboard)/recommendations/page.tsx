'use client'

import { 
  Sparkles,
  Users,
  Route,
  Eye,
  Boxes,
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { recommendations } from '@/lib/mock-data'

const categoryIcons: Record<string, typeof Users> = {
  staffing: Users,
  routing: Route,
  monitoring: Eye,
  resource: Boxes,
}

const categoryColors: Record<string, string> = {
  staffing: 'bg-chart-1/20 text-chart-1',
  routing: 'bg-chart-2/20 text-chart-2',
  monitoring: 'bg-chart-3/20 text-chart-3',
  resource: 'bg-chart-4/20 text-chart-4',
}

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Recommendations</h1>
          <p className="text-muted-foreground">
            Intelligent suggestions to optimize baggage handling operations.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1">
            <Sparkles className="size-4 text-primary" />
            <span className="font-medium text-primary">AI Powered</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
                <Sparkles className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Recommendations</p>
                <p className="text-2xl font-bold text-foreground">{recommendations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-success/20">
                <CheckCircle className="size-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Applied Today</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-chart-1/20">
                <TrendingUp className="size-5 text-chart-1" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Confidence</p>
                <p className="text-2xl font-bold text-foreground">86%</p>
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
                <p className="text-xs text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Active Recommendations</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((rec) => {
            const Icon = categoryIcons[rec.category] || Sparkles
            const colorClass = categoryColors[rec.category] || 'bg-primary/20 text-primary'
            
            return (
              <Card key={rec.id} className="bg-card border-border hover:border-primary/30 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', colorClass)}>
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base leading-tight">{rec.title}</CardTitle>
                        <Badge variant="outline" className="mt-1.5 capitalize text-xs bg-secondary/50">
                          {rec.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="size-3 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">AI Confidence</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{rec.confidence}%</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Reasoning */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Reasoning</p>
                    <p className="text-sm text-foreground">{rec.reasoning}</p>
                  </div>

                  {/* Predicted Impact */}
                  <div className="rounded-lg bg-success/10 border border-success/20 p-3">
                    <p className="text-xs font-medium text-success mb-1">Predicted Impact</p>
                    <p className="text-sm font-medium text-foreground">{rec.predictedImpact}</p>
                  </div>

                  {/* Confidence Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Confidence Score</span>
                      <span className={cn(
                        'font-medium',
                        rec.confidence >= 85 ? 'text-success' : rec.confidence >= 70 ? 'text-chart-1' : 'text-warning'
                      )}>{rec.confidence}%</span>
                    </div>
                    <Progress 
                      value={rec.confidence} 
                      className={cn(
                        'h-1.5',
                        rec.confidence >= 85 ? '[&>div]:bg-success' : rec.confidence >= 70 ? '[&>div]:bg-chart-1' : '[&>div]:bg-warning'
                      )}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="flex-1">Apply</Button>
                    <Button size="sm" variant="outline" className="flex-1">Assign Team</Button>
                    <Button size="sm" variant="ghost">Mark Reviewed</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Intervention Impact Summary */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Intervention Impact Summary</CardTitle>
          <CardDescription>Estimated impact if all recommendations are applied</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="text-3xl font-bold text-success">127</p>
              <p className="text-sm text-muted-foreground">Bags Saved from Mishandling</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="text-3xl font-bold text-foreground">$18.4K</p>
              <p className="text-sm text-muted-foreground">Est. Compensation Avoided</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="text-3xl font-bold text-foreground">42 min</p>
              <p className="text-sm text-muted-foreground">Avg Delay Reduction</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="text-3xl font-bold text-foreground">+15%</p>
              <p className="text-sm text-muted-foreground">Transfer Efficiency Gain</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
