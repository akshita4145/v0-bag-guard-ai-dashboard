'use client'

import { useState } from 'react'
import { FlightCard } from '@/components/flight-operations/flight-card'
import { FlightDetailPanel } from '@/components/flight-operations/flight-detail-panel'
import { flightsData, type Flight } from '@/lib/mock-data'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function FlightOperationsPage() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Flight Operations</h1>
        <p className="text-muted-foreground">
          Monitor flights with operational metrics related to baggage movement.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Flight Grid */}
        <div className="lg:col-span-2">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="grid gap-4 sm:grid-cols-2 pr-4">
              {flightsData.map((flight) => (
                <FlightCard 
                  key={flight.id}
                  flight={flight}
                  onSelect={setSelectedFlight}
                  isSelected={selectedFlight?.id === flight.id}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <FlightDetailPanel flight={selectedFlight} />
          </div>
        </div>
      </div>
    </div>
  )
}
