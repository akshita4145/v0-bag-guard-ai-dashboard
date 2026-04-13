'use client'

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Users,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { weeklyTrendData, costSavingsData, disruptionDriversData, businessImpactData } from '@/lib/mock-data'

const trendConfig = {
  mishandling: { label: 'Actual Mishandled', color: 'var(--chart-1)' },
  predicted: { label: 'Predicted (No Action)', color: 'var(--color-muted)' },
  prevented: { label: 'Prevented', color: 'var(--color-success)' },
}

const savingsConfig = {
  savings: { label: 'Cost Savings', color: 'var(--chart-2)' },
}

const driversConfig = {
  incidents: { label: 'Incidents', color: 'var(--chart-1)' },
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Deep insights into baggage handling performance and business impact.
        </p>
      </div>

      {/* Business Impact Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Business Impact</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-success/20 to-success/5 border-success/20">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Compensation Prevented
                  </p>
                  <p className="text-3xl font-bold text-foreground">{businessImpactData.compensationPrevented}</p>
                  <p className="text-xs text-success mt-1">This quarter</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-success/20">
                  <DollarSign className="size-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-1/20 to-chart-1/5 border-chart-1/20">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Labor Hours Saved
                  </p>
                  <p className="text-3xl font-bold text-foreground">{businessImpactData.laborHoursSaved}</p>
                  <p className="text-xs text-chart-1 mt-1">This quarter</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-chart-1/20">
                  <Clock className="size-5 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-2/20 to-chart-2/5 border-chart-2/20">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Complaints Avoided
                  </p>
                  <p className="text-3xl font-bold text-foreground">{businessImpactData.complaintsAvoided}</p>
                  <p className="text-xs text-chart-2 mt-1">Estimated</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-chart-2/20">
                  <Users className="size-5 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Efficiency Gain
                  </p>
                  <p className="text-3xl font-bold text-foreground">{businessImpactData.efficiencyGain}</p>
                  <p className="text-xs text-primary mt-1">vs. baseline</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
                  <Zap className="size-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Mishandling Trend */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Mishandling Risk Trend</CardTitle>
            <CardDescription>Weekly comparison: actual vs predicted without intervention</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendConfig} className="h-[300px] w-full">
              <LineChart data={weeklyTrendData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
                <XAxis 
                  dataKey="week" 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  name="Predicted (No Action)"
                  stroke="var(--color-muted)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="mishandling"
                  name="Actual Mishandled"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--chart-1)', strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Cost Savings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Estimated Cost Savings</CardTitle>
            <CardDescription>Monthly savings from proactive interventions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={savingsConfig} className="h-[300px] w-full">
              <BarChart data={costSavingsData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}K`}
                />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => `$${Number(value).toLocaleString()}`} />} />
                <Bar dataKey="savings" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Top Disruption Drivers */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Top Disruption Drivers</CardTitle>
            <CardDescription>Most common causes of baggage risk this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={driversConfig} className="h-[300px] w-full">
              <BarChart data={disruptionDriversData} layout="vertical" margin={{ top: 10, right: 30, bottom: 10, left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  type="category" 
                  dataKey="driver" 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={90}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="incidents" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Performance Metrics</CardTitle>
            <CardDescription>Key operational performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Target className="size-4" />
                  <span className="text-xs font-medium">Avg Response Time</span>
                </div>
                <p className="text-2xl font-bold text-foreground">4.2 min</p>
                <p className="text-xs text-success">-18% vs last month</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <TrendingDown className="size-4" />
                  <span className="text-xs font-medium">Risk Reduction</span>
                </div>
                <p className="text-2xl font-bold text-foreground">31%</p>
                <p className="text-xs text-success">vs. pre-deployment</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <CheckCircle className="size-4" />
                  <span className="text-xs font-medium">Prediction Accuracy</span>
                </div>
                <p className="text-2xl font-bold text-foreground">94.7%</p>
                <p className="text-xs text-muted-foreground">30-day rolling</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <AlertTriangle className="size-4" />
                  <span className="text-xs font-medium">False Positive Rate</span>
                </div>
                <p className="text-2xl font-bold text-foreground">3.2%</p>
                <p className="text-xs text-success">-0.8% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
