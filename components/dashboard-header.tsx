'use client'

import { CalendarDays, Download, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2" />
        <div className="h-6 w-px bg-border" />
        <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Airport Selector */}
        <Select defaultValue="jfk">
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <MapPin className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Select airport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jfk">JFK - New York</SelectItem>
            <SelectItem value="lax">LAX - Los Angeles</SelectItem>
            <SelectItem value="ord">ORD - Chicago</SelectItem>
            <SelectItem value="atl">ATL - Atlanta</SelectItem>
            <SelectItem value="dfw">DFW - Dallas</SelectItem>
            <SelectItem value="sfo">SFO - San Francisco</SelectItem>
          </SelectContent>
        </Select>

        {/* Date/Time Range */}
        <Select defaultValue="today">
          <SelectTrigger className="w-[160px] bg-secondary border-border">
            <CalendarDays className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        {/* Export Button */}
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export Report
        </Button>
      </div>
    </header>
  )
}
