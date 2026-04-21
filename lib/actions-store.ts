'use client'

import useSWR from 'swr'

// Types for action history
export interface ActionRecord {
  id: string
  type: 'recommendation' | 'alert' | 'risk' | 'action'
  action: 'applied' | 'dismissed' | 'assigned' | 'resolved' | 'reviewed'
  targetId: string
  targetTitle: string
  timestamp: Date
  assignedTeam?: string
  impact?: string
}

export interface AppliedRecommendation {
  id: string
  appliedAt: Date
  assignedTeam?: string
}

export interface ResolvedAlert {
  id: string
  resolvedAt: Date
  action: 'resolved' | 'dismissed' | 'assigned'
  assignedTeam?: string
}

export interface RiskAction {
  flightId: string
  action: 'applied' | 'assigned'
  appliedAt: Date
  assignedTeam?: string
}

// Global state stored in memory (persists during session)
interface ActionsState {
  appliedRecommendations: Map<string, AppliedRecommendation>
  resolvedAlerts: Map<string, ResolvedAlert>
  riskActions: Map<string, RiskAction>
  actionHistory: ActionRecord[]
  stats: {
    totalActionsToday: number
    bagsProtected: number
    alertsResolved: number
    recommendationsApplied: number
  }
}

let globalState: ActionsState = {
  appliedRecommendations: new Map(),
  resolvedAlerts: new Map(),
  riskActions: new Map(),
  actionHistory: [],
  stats: {
    totalActionsToday: 12, // Start with some baseline
    bagsProtected: 127,
    alertsResolved: 6,
    recommendationsApplied: 12,
  },
}

// Listeners for state updates
const listeners = new Set<() => void>()

function notifyListeners() {
  listeners.forEach((listener) => listener())
}

// Action functions
export function applyRecommendation(id: string, title: string, team?: string): AppliedRecommendation {
  const record: AppliedRecommendation = {
    id,
    appliedAt: new Date(),
    assignedTeam: team,
  }
  globalState.appliedRecommendations.set(id, record)
  
  // Add to history
  globalState.actionHistory.unshift({
    id: `action-${Date.now()}`,
    type: 'recommendation',
    action: 'applied',
    targetId: id,
    targetTitle: title,
    timestamp: new Date(),
    assignedTeam: team,
    impact: '+15-25 bags protected',
  })
  
  // Update stats
  globalState.stats.recommendationsApplied++
  globalState.stats.totalActionsToday++
  globalState.stats.bagsProtected += Math.floor(Math.random() * 20) + 10
  
  notifyListeners()
  return record
}

export function assignRecommendation(id: string, title: string, team: string): AppliedRecommendation {
  const record: AppliedRecommendation = {
    id,
    appliedAt: new Date(),
    assignedTeam: team,
  }
  globalState.appliedRecommendations.set(id, record)
  
  globalState.actionHistory.unshift({
    id: `action-${Date.now()}`,
    type: 'recommendation',
    action: 'assigned',
    targetId: id,
    targetTitle: title,
    timestamp: new Date(),
    assignedTeam: team,
  })
  
  globalState.stats.totalActionsToday++
  notifyListeners()
  return record
}

export function markRecommendationReviewed(id: string, title: string): void {
  globalState.actionHistory.unshift({
    id: `action-${Date.now()}`,
    type: 'recommendation',
    action: 'reviewed',
    targetId: id,
    targetTitle: title,
    timestamp: new Date(),
  })
  
  notifyListeners()
}

export function resolveAlert(id: string, title: string, action: 'resolved' | 'dismissed' | 'assigned', team?: string): ResolvedAlert {
  const record: ResolvedAlert = {
    id,
    resolvedAt: new Date(),
    action,
    assignedTeam: team,
  }
  globalState.resolvedAlerts.set(id, record)
  
  globalState.actionHistory.unshift({
    id: `action-${Date.now()}`,
    type: 'alert',
    action: action,
    targetId: id,
    targetTitle: title,
    timestamp: new Date(),
    assignedTeam: team,
  })
  
  if (action === 'resolved') {
    globalState.stats.alertsResolved++
    globalState.stats.bagsProtected += Math.floor(Math.random() * 15) + 5
  }
  globalState.stats.totalActionsToday++
  
  notifyListeners()
  return record
}

export function applyRiskAction(flightId: string, flightNumber: string, team?: string): RiskAction {
  const record: RiskAction = {
    flightId,
    action: team ? 'assigned' : 'applied',
    appliedAt: new Date(),
    assignedTeam: team,
  }
  globalState.riskActions.set(flightId, record)
  
  globalState.actionHistory.unshift({
    id: `action-${Date.now()}`,
    type: 'risk',
    action: team ? 'assigned' : 'applied',
    targetId: flightId,
    targetTitle: `Risk mitigation for ${flightNumber}`,
    timestamp: new Date(),
    assignedTeam: team,
    impact: 'Risk reduced',
  })
  
  globalState.stats.totalActionsToday++
  globalState.stats.bagsProtected += Math.floor(Math.random() * 25) + 15
  
  notifyListeners()
  return record
}

export function applyQuickAction(action: string, impact: string): void {
  globalState.actionHistory.unshift({
    id: `action-${Date.now()}`,
    type: 'action',
    action: 'applied',
    targetId: `quick-${Date.now()}`,
    targetTitle: action,
    timestamp: new Date(),
    impact: impact,
  })
  
  globalState.stats.totalActionsToday++
  globalState.stats.bagsProtected += Math.floor(Math.random() * 30) + 10
  
  notifyListeners()
}

// Getters
export function isRecommendationApplied(id: string): boolean {
  return globalState.appliedRecommendations.has(id)
}

export function isAlertResolved(id: string): boolean {
  return globalState.resolvedAlerts.has(id)
}

export function getAlertAction(id: string): ResolvedAlert | undefined {
  return globalState.resolvedAlerts.get(id)
}

export function isRiskActionTaken(flightId: string): boolean {
  return globalState.riskActions.has(flightId)
}

export function getRiskAction(flightId: string): RiskAction | undefined {
  return globalState.riskActions.get(flightId)
}

export function getActionHistory(): ActionRecord[] {
  return globalState.actionHistory
}

export function getStats() {
  return globalState.stats
}

// SWR hook for reactive state
export function useActionsState() {
  const { data, mutate } = useSWR('actions-state', () => ({
    appliedRecommendations: Array.from(globalState.appliedRecommendations.entries()),
    resolvedAlerts: Array.from(globalState.resolvedAlerts.entries()),
    riskActions: Array.from(globalState.riskActions.entries()),
    actionHistory: globalState.actionHistory,
    stats: globalState.stats,
  }), {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

  // Subscribe to state changes
  useSWR('actions-listener', null, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    onSuccess: () => {
      const listener = () => mutate()
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  })

  return {
    data,
    mutate,
    // Actions
    applyRecommendation: (id: string, title: string, team?: string) => {
      applyRecommendation(id, title, team)
      mutate()
    },
    assignRecommendation: (id: string, title: string, team: string) => {
      assignRecommendation(id, title, team)
      mutate()
    },
    markRecommendationReviewed: (id: string, title: string) => {
      markRecommendationReviewed(id, title)
      mutate()
    },
    resolveAlert: (id: string, title: string, action: 'resolved' | 'dismissed' | 'assigned', team?: string) => {
      resolveAlert(id, title, action, team)
      mutate()
    },
    applyRiskAction: (flightId: string, flightNumber: string, team?: string) => {
      applyRiskAction(flightId, flightNumber, team)
      mutate()
    },
    applyQuickAction: (action: string, impact: string) => {
      applyQuickAction(action, impact)
      mutate()
    },
    // Getters
    isRecommendationApplied,
    isAlertResolved,
    getAlertAction,
    isRiskActionTaken,
    getRiskAction,
  }
}
