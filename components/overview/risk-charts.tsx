'use client'

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { riskTrendData, highRiskTerminalsData, riskSourceData } from '@/lib/mock-data'

const riskTrendConfig = {
  risk: { label: 'Predicted Risk', color: 'var(--chart-1)' },
  baseline: { label: 'Baseline', color: 'var(--color-muted)' },
}

const terminalsConfig = {
  risk: { label: 'Risk Score', color: 'var(--chart-1)' },
  flights: { label: 'Flights', color: 'var(--chart-2)' },
}

const riskSourceConfig = {
  Weather: { label: 'Weather', color: 'var(--chart-1)' },
  'Tight Connections': { label: 'Tight Connections', color: 'var(--chart-2)' },
  'Staffing Shortage': { label: 'Staffing Shortage', color: 'var(--chart-3)' },
  'Scan Gaps': { label: 'Scan Gaps', color: 'var(--chart-4)' },
  'Historical Disruption': { label: 'Historical', color: 'var(--chart-5)' },
  'Routing Complexity': { label: 'Routing', color: 'var(--color-muted)' },
}

export function RiskCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Risk Trend Line Chart */}
      <Card className="bg-card border-border lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Predicted Baggage Risk Over Time</CardTitle>
          <CardDescription>Real-time risk score trend vs baseline</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={riskTrendConfig} className="h-[280px] w-full">
            <LineChart data={riskTrendData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
              <XAxis 
                dataKey="time" 
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
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="baseline"
                stroke="var(--color-muted)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ fill: 'var(--chart-1)', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--chart-1)', strokeWidth: 2, fill: 'var(--background)' }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Risk Source Pie Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Risk Source Breakdown</CardTitle>
          <CardDescription>Contributing factors to current risk</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={riskSourceConfig} className="h-[280px] w-full">
            <PieChart>
              <Pie
                data={riskSourceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {riskSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend 
                layout="vertical" 
                align="right" 
                verticalAlign="middle"
                formatter={(value) => <span className="text-xs text-foreground">{value}</span>}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* High Risk Terminals Bar Chart */}
      <Card className="bg-card border-border lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Highest Risk Terminals</CardTitle>
          <CardDescription>Current risk levels by terminal with flight count</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={terminalsConfig} className="h-[200px] w-full">
            <BarChart data={highRiskTerminalsData} layout="vertical" margin={{ top: 10, right: 30, bottom: 10, left: 80 }}>
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
                dataKey="name" 
                stroke="var(--color-muted-foreground)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={70}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="risk" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
