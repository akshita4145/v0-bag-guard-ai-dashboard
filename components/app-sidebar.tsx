'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShieldAlert,
  Plane,
  Package,
  Bell,
  BarChart3,
  Lightbulb,
  Settings,
  Search,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarInput,
} from '@/components/ui/sidebar'

const navItems = [
  { title: 'Overview', href: '/', icon: LayoutDashboard },
  { title: 'Risk Monitor', href: '/risk-monitor', icon: ShieldAlert },
  { title: 'Flight Operations', href: '/flight-operations', icon: Plane },
  { title: 'Baggage Flow', href: '/baggage-flow', icon: Package },
  { title: 'Alerts', href: '/alerts', icon: Bell },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { title: 'Recommendations', href: '/recommendations', icon: Lightbulb },
  { title: 'Settings', href: '/settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="px-4 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <Package className="size-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-sidebar-foreground">BagGuard</span>
            <span className="text-xs text-primary">AI Platform</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="px-2 pb-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <SidebarInput placeholder="Search..." className="pl-8" />
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium text-sidebar-accent-foreground">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
            <span className="text-xs text-muted-foreground">Operations Manager</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
