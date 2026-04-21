import { KPICards } from '@/components/overview/kpi-cards'
import { RiskCharts } from '@/components/overview/risk-charts'
import { LiveFeed } from '@/components/overview/live-feed'

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            American Airlines PHL Hub Operations
          </h1>
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
            Live
          </span>
        </div>
        <p className="text-muted-foreground text-pretty max-w-2xl">
          Predict and prevent baggage disruption across Philadelphia hub operations. Real-time monitoring of AA flights, transfers, and handling workflows.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <KPICards />

      {/* System Risk Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">System Risk Overview</h2>
        <div className="grid gap-4 xl:grid-cols-4">
          <div className="xl:col-span-3">
            <RiskCharts />
          </div>
          <div className="xl:col-span-1">
            <LiveFeed />
          </div>
        </div>
      </div>
    </div>
  )
}
