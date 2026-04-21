'use client'

import { useState, useEffect } from 'react'
import { 
  Sparkles,
  Users,
  Route,
  Eye,
  Boxes,
  TrendingUp,
  CheckCircle,
  Clock,
  Check,
  UserPlus,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { recommendations, type Recommendation } from '@/lib/mock-data'
import { useActionsState, isRecommendationApplied } from '@/lib/actions-store'
import { useToast } from '@/hooks/use-toast'

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

const teams = [
  'PHL Transfer Team A',
  'PHL Transfer Team B',
  'PHL Ramp Team C',
  'PHL Sortation Team',
  'PHL Operations Center',
  'PHL Maintenance',
]

function RecommendationCard({ rec, onApply, onAssign, onReview }: { 
  rec: Recommendation
  onApply: () => void
  onAssign: () => void
  onReview: () => void
}) {
  const Icon = categoryIcons[rec.category] || Sparkles
  const colorClass = categoryColors[rec.category] || 'bg-primary/20 text-primary'
  const isApplied = isRecommendationApplied(rec.id)
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = async () => {
    setIsApplying(true)
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800))
    onApply()
    setIsApplying(false)
  }

  return (
    <Card className={cn(
      'bg-card border-border transition-all',
      isApplied ? 'border-success/50 bg-success/5' : 'hover:border-primary/30'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-lg',
              isApplied ? 'bg-success/20' : colorClass
            )}>
              {isApplied ? <Check className="size-5 text-success" /> : <Icon className="size-5" />}
            </div>
            <div>
              <CardTitle className="text-base leading-tight">{rec.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant="outline" className="capitalize text-xs bg-secondary/50">
                  {rec.category}
                </Badge>
                {isApplied && (
                  <Badge className="bg-success/20 text-success border-success/30 text-xs">
                    Applied
                  </Badge>
                )}
              </div>
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
        <div className={cn(
          'rounded-lg border p-3',
          isApplied ? 'bg-success/10 border-success/20' : 'bg-success/10 border-success/20'
        )}>
          <p className="text-xs font-medium text-success mb-1">
            {isApplied ? 'Impact Achieved' : 'Predicted Impact'}
          </p>
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
          {isApplied ? (
            <>
              <Button size="sm" className="flex-1 bg-success hover:bg-success/90" disabled>
                <Check className="mr-1.5 size-3.5" />
                Applied
              </Button>
              <Button size="sm" variant="outline" className="flex-1" disabled>
                Assigned
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="sm" 
                className="flex-1" 
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? (
                  <>
                    <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                    Applying...
                  </>
                ) : (
                  'Apply'
                )}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={onAssign}
              >
                <UserPlus className="mr-1.5 size-3.5" />
                Assign Team
              </Button>
              <Button size="sm" variant="ghost" onClick={onReview}>
                Mark Reviewed
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function RecommendationsPage() {
  const { toast } = useToast()
  const actions = useActionsState()
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null)
  const [selectedTeam, setSelectedTeam] = useState('')
  const [appliedCount, setAppliedCount] = useState(12)
  const [pendingCount, setPendingCount] = useState(3)
  
  // Count applied recommendations
  const appliedRecsCount = recommendations.filter(r => isRecommendationApplied(r.id)).length

  // Update counts when actions change
  useEffect(() => {
    setAppliedCount(12 + appliedRecsCount)
    setPendingCount(Math.max(0, 3 - appliedRecsCount))
  }, [appliedRecsCount, actions.data])

  const handleApply = (rec: Recommendation) => {
    actions.applyRecommendation(rec.id, rec.title)
    toast({
      title: 'Recommendation Applied',
      description: `"${rec.title}" has been applied. ${rec.predictedImpact}`,
    })
  }

  const handleOpenAssign = (rec: Recommendation) => {
    setSelectedRec(rec)
    setAssignDialogOpen(true)
  }

  const handleAssign = () => {
    if (selectedRec && selectedTeam) {
      actions.assignRecommendation(selectedRec.id, selectedRec.title, selectedTeam)
      toast({
        title: 'Team Assigned',
        description: `${selectedTeam} has been assigned to: "${selectedRec.title}"`,
      })
      setAssignDialogOpen(false)
      setSelectedRec(null)
      setSelectedTeam('')
    }
  }

  const handleReview = (rec: Recommendation) => {
    actions.markRecommendationReviewed(rec.id, rec.title)
    toast({
      title: 'Marked as Reviewed',
      description: `"${rec.title}" has been marked as reviewed.`,
    })
  }

  // Calculate impact stats based on applied recommendations
  const bagsProtected = 127 + (appliedRecsCount * 18)
  const compensationAvoided = 18.4 + (appliedRecsCount * 2.2)
  const delayReduction = 42 + (appliedRecsCount * 5)
  const efficiencyGain = 15 + (appliedRecsCount * 3)

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
                <p className="text-2xl font-bold text-foreground">
                  {recommendations.length - appliedRecsCount}
                </p>
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
                <p className="text-2xl font-bold text-foreground">{appliedCount}</p>
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
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Active Recommendations</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              rec={rec}
              onApply={() => handleApply(rec)}
              onAssign={() => handleOpenAssign(rec)}
              onReview={() => handleReview(rec)}
            />
          ))}
        </div>
      </div>

      {/* Intervention Impact Summary */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Intervention Impact Summary</CardTitle>
          <CardDescription>
            {appliedRecsCount > 0 
              ? `Impact from ${appliedRecsCount} applied recommendation${appliedRecsCount > 1 ? 's' : ''} + baseline`
              : 'Estimated impact if all recommendations are applied'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="text-3xl font-bold text-success">{bagsProtected}</p>
              <p className="text-sm text-muted-foreground">Bags Saved from Mishandling</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="text-3xl font-bold text-foreground">${compensationAvoided.toFixed(1)}K</p>
              <p className="text-sm text-muted-foreground">Est. Compensation Avoided</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{delayReduction} min</p>
              <p className="text-sm text-muted-foreground">Avg Delay Reduction</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="text-3xl font-bold text-foreground">+{efficiencyGain}%</p>
              <p className="text-sm text-muted-foreground">Transfer Efficiency Gain</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assign Team Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Assign Team</DialogTitle>
            <DialogDescription>
              Select a team to handle this recommendation.
            </DialogDescription>
          </DialogHeader>
          {selectedRec && (
            <div className="space-y-4">
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-sm font-medium text-foreground">{selectedRec.title}</p>
              </div>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedTeam}>
              Assign Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
