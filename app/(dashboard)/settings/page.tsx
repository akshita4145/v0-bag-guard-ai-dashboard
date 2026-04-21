'use client'

import { useState } from 'react'
import { 
  Building2, 
  Bell, 
  Sliders, 
  Sparkles, 
  Link2,
  Plane,
  CloudRain,
  Scan,
  Users,
  Save,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export default function SettingsPage() {
  const [riskSensitivity, setRiskSensitivity] = useState([65])
  const [alertThreshold, setAlertThreshold] = useState([50])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure platform preferences and integration settings.
          </p>
        </div>
        <Button className="gap-2">
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Airport & Airline Configuration */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="size-5 text-muted-foreground" />
              <CardTitle className="text-base">Airport Configuration</CardTitle>
            </div>
            <CardDescription>American Airlines PHL Hub Operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Airport</Label>
              <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2.5 border border-border">
                <span className="text-sm font-medium text-foreground">PHL - Philadelphia International Airport</span>
              </div>
              <p className="text-xs text-muted-foreground">Fixed for American Airlines hub operations</p>
            </div>
            <div className="space-y-2">
              <Label>Monitored Terminals</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">A-East</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">A-West</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">B/C</Badge>
                <Badge variant="outline" className="bg-secondary text-muted-foreground border-border">D/E</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">F</Badge>
              </div>
              <p className="text-xs text-muted-foreground">AA operates primarily from A, B/C, and F terminals</p>
            </div>
            <div className="space-y-2">
              <Label>Time Zone</Label>
              <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2.5 border border-border">
                <span className="text-sm font-medium text-foreground">Eastern Time (ET) - UTC-5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert Thresholds */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sliders className="size-5 text-muted-foreground" />
              <CardTitle className="text-base">Alert Thresholds</CardTitle>
            </div>
            <CardDescription>Configure when alerts are triggered</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Alert Trigger Threshold</Label>
                <span className="text-sm font-medium text-foreground">{alertThreshold[0]}%</span>
              </div>
              <Slider
                value={alertThreshold}
                onValueChange={setAlertThreshold}
                max={100}
                min={20}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Alerts will trigger when risk score exceeds this threshold
              </p>
            </div>
            <Separator className="bg-border" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Risk Sensitivity</Label>
                <span className="text-sm font-medium text-foreground">{riskSensitivity[0]}%</span>
              </div>
              <Slider
                value={riskSensitivity}
                onValueChange={setRiskSensitivity}
                max={100}
                min={20}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher sensitivity detects more potential issues but may increase false positives
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="size-5 text-muted-foreground" />
              <CardTitle className="text-base">Notification Preferences</CardTitle>
            </div>
            <CardDescription>Control how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Critical Alerts</Label>
                <p className="text-xs text-muted-foreground">Immediate notifications for critical issues</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>High Risk Warnings</Label>
                <p className="text-xs text-muted-foreground">Notifications for high-risk flights</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Summary</Label>
                <p className="text-xs text-muted-foreground">End-of-day performance report</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-muted-foreground" />
              <CardTitle className="text-base">AI Recommendation Toggles</CardTitle>
            </div>
            <CardDescription>Control AI-powered features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Recommendations</Label>
                <p className="text-xs text-muted-foreground">Generate recommendations automatically</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Predictive Alerts</Label>
                <p className="text-xs text-muted-foreground">Alert before issues occur</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Smart Routing</Label>
                <p className="text-xs text-muted-foreground">AI-optimized baggage routing suggestions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Staffing Suggestions</Label>
                <p className="text-xs text-muted-foreground">AI-powered staffing recommendations</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link2 className="size-5 text-muted-foreground" />
              <CardTitle className="text-base">Integration Settings</CardTitle>
            </div>
            <CardDescription>American Airlines systems and external data sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/20">
                    <Plane className="size-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">AA Flight Data API</p>
                    <p className="text-xs text-muted-foreground">American Airlines real-time operations</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success/20 text-success border-success/30">Connected</Badge>
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/20">
                    <CloudRain className="size-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Weather Feeds</p>
                    <p className="text-xs text-muted-foreground">NOAA weather data integration</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success/20 text-success border-success/30">Connected</Badge>
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/20">
                    <Scan className="size-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">PHL Baggage Handling</p>
                    <p className="text-xs text-muted-foreground">PHL BHS scan data integration</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success/20 text-success border-success/30">Connected</Badge>
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Users className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Staffing Systems</p>
                    <p className="text-xs text-muted-foreground">Workforce management</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-muted text-muted-foreground border-border">Not Connected</Badge>
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
