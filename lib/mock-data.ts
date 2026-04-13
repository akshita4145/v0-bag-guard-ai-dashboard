// Mock data for BagGuard AI Dashboard

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical'

export interface Flight {
  id: string
  flightNumber: string
  airline: string
  airlineLogo: string
  route: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  transferWindow: string
  weatherStatus: string
  riskScore: number
  riskLevel: RiskLevel
  primaryRiskDriver: string
  recommendedAction: string
  status: 'on-time' | 'delayed' | 'boarding' | 'departed' | 'arrived'
  bagsTotal: number
  bagsAtRisk: number
  gate: string
  terminal: string
}

export interface Alert {
  id: string
  title: string
  description: string
  relatedFlight?: string
  terminal?: string
  riskDriver: string
  timeDetected: string
  suggestedIntervention: string
  assignedTeam: string
  status: 'critical' | 'active' | 'resolved'
  severity: RiskLevel
}

export interface RiskFactor {
  name: string
  severity: RiskLevel
  percentage: number
}

export interface KPIData {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'neutral'
  description: string
}

export interface LiveFeedItem {
  id: string
  message: string
  severity: RiskLevel
  timestamp: string
  flightNumber?: string
}

export interface BaggageStage {
  name: string
  bagsProcessed: number
  bagsDelayed: number
  bagsFlagged: number
  bottleneck: boolean
  scanCompleteness: number
}

export interface Recommendation {
  id: string
  title: string
  reasoning: string
  confidence: number
  predictedImpact: string
  category: 'staffing' | 'routing' | 'monitoring' | 'resource'
}

// KPI Summary Data
export const kpiData: KPIData[] = [
  { label: 'High-Risk Flights Today', value: 23, change: -12, trend: 'down', description: 'vs. yesterday' },
  { label: 'Bags Flagged for Intervention', value: 847, change: -8, trend: 'down', description: 'vs. avg' },
  { label: 'Avg Predicted Risk', value: '18.4%', change: -3.2, trend: 'down', description: 'vs. last week' },
  { label: 'Est. Cost Avoided', value: '$127K', change: 24, trend: 'up', description: 'this month' },
  { label: 'On-Time Transfer Rate', value: '94.2%', change: 2.1, trend: 'up', description: 'vs. target' },
  { label: 'Active Alerts', value: 12, change: 0, trend: 'neutral', description: 'requiring action' },
]

// Risk breakdown for pie chart
export const riskSourceData = [
  { name: 'Weather', value: 28, fill: 'var(--chart-1)' },
  { name: 'Tight Connections', value: 24, fill: 'var(--chart-2)' },
  { name: 'Staffing Shortage', value: 18, fill: 'var(--chart-3)' },
  { name: 'Scan Gaps', value: 14, fill: 'var(--chart-4)' },
  { name: 'Historical Disruption', value: 10, fill: 'var(--chart-5)' },
  { name: 'Routing Complexity', value: 6, fill: 'var(--color-muted)' },
]

// Time series data for risk trend
export const riskTrendData = [
  { time: '06:00', risk: 12, baseline: 15 },
  { time: '08:00', risk: 24, baseline: 18 },
  { time: '10:00', risk: 31, baseline: 20 },
  { time: '12:00', risk: 28, baseline: 22 },
  { time: '14:00', risk: 35, baseline: 24 },
  { time: '16:00', risk: 42, baseline: 26 },
  { time: '18:00', risk: 38, baseline: 25 },
  { time: '20:00', risk: 29, baseline: 22 },
  { time: '22:00', risk: 18, baseline: 18 },
]

// High risk flights/terminals bar chart data
export const highRiskTerminalsData = [
  { name: 'Terminal B', risk: 42, flights: 18 },
  { name: 'Terminal C', risk: 38, flights: 14 },
  { name: 'Terminal A', risk: 31, flights: 22 },
  { name: 'Terminal D', risk: 24, flights: 12 },
  { name: 'Terminal E', risk: 18, flights: 8 },
]

// Live Feed Items
export const liveFeedItems: LiveFeedItem[] = [
  { id: '1', message: 'Flight AA482 flagged: short connection time + weather disruption', severity: 'critical', timestamp: '2 min ago', flightNumber: 'AA482' },
  { id: '2', message: 'Terminal B transfer risk elevated due to scan delay', severity: 'high', timestamp: '5 min ago' },
  { id: '3', message: '36 bags on Flight DL219 need manual prioritization', severity: 'high', timestamp: '8 min ago', flightNumber: 'DL219' },
  { id: '4', message: 'Staffing issue detected at inbound carousel team', severity: 'moderate', timestamp: '12 min ago' },
  { id: '5', message: 'Weather alert: Thunderstorms approaching - monitoring 8 flights', severity: 'high', timestamp: '15 min ago' },
  { id: '6', message: 'Flight UA892 transfer window expanded - risk reduced', severity: 'low', timestamp: '18 min ago', flightNumber: 'UA892' },
]

// Flights data
export const flightsData: Flight[] = [
  {
    id: '1',
    flightNumber: 'AA482',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'DFW → JFK',
    origin: 'DFW',
    destination: 'JFK',
    departureTime: '14:30',
    arrivalTime: '18:45',
    transferWindow: '35 min',
    weatherStatus: 'Thunderstorms',
    riskScore: 87,
    riskLevel: 'critical',
    primaryRiskDriver: 'Tight Connection + Weather',
    recommendedAction: 'Priority handling for 47 connecting bags',
    status: 'boarding',
    bagsTotal: 186,
    bagsAtRisk: 47,
    gate: 'B22',
    terminal: 'B',
  },
  {
    id: '2',
    flightNumber: 'DL219',
    airline: 'Delta Air Lines',
    airlineLogo: 'DL',
    route: 'ATL → LAX',
    origin: 'ATL',
    destination: 'LAX',
    departureTime: '15:15',
    arrivalTime: '17:30',
    transferWindow: '45 min',
    weatherStatus: 'Clear',
    riskScore: 72,
    riskLevel: 'high',
    primaryRiskDriver: 'Scan Gap Detected',
    recommendedAction: 'Manual verification required for 36 bags',
    status: 'on-time',
    bagsTotal: 224,
    bagsAtRisk: 36,
    gate: 'C14',
    terminal: 'C',
  },
  {
    id: '3',
    flightNumber: 'UA892',
    airline: 'United Airlines',
    airlineLogo: 'UA',
    route: 'ORD → SFO',
    origin: 'ORD',
    destination: 'SFO',
    departureTime: '16:00',
    arrivalTime: '18:15',
    transferWindow: '55 min',
    weatherStatus: 'Cloudy',
    riskScore: 45,
    riskLevel: 'moderate',
    primaryRiskDriver: 'High Transfer Volume',
    recommendedAction: 'Monitor carousel capacity',
    status: 'on-time',
    bagsTotal: 198,
    bagsAtRisk: 22,
    gate: 'A8',
    terminal: 'A',
  },
  {
    id: '4',
    flightNumber: 'SW1247',
    airline: 'Southwest Airlines',
    airlineLogo: 'WN',
    route: 'PHX → DEN',
    origin: 'PHX',
    destination: 'DEN',
    departureTime: '14:45',
    arrivalTime: '17:50',
    transferWindow: '60 min',
    weatherStatus: 'Clear',
    riskScore: 28,
    riskLevel: 'low',
    primaryRiskDriver: 'Historical Route Risk',
    recommendedAction: 'Standard monitoring',
    status: 'on-time',
    bagsTotal: 143,
    bagsAtRisk: 8,
    gate: 'D6',
    terminal: 'D',
  },
  {
    id: '5',
    flightNumber: 'B6445',
    airline: 'JetBlue Airways',
    airlineLogo: 'B6',
    route: 'BOS → FLL',
    origin: 'BOS',
    destination: 'FLL',
    departureTime: '15:30',
    arrivalTime: '19:15',
    transferWindow: '40 min',
    weatherStatus: 'Rain',
    riskScore: 68,
    riskLevel: 'high',
    primaryRiskDriver: 'Gate Distance + Weather',
    recommendedAction: 'Pre-position transfer team',
    status: 'delayed',
    bagsTotal: 167,
    bagsAtRisk: 31,
    gate: 'B18',
    terminal: 'B',
  },
  {
    id: '6',
    flightNumber: 'AS234',
    airline: 'Alaska Airlines',
    airlineLogo: 'AS',
    route: 'SEA → SAN',
    origin: 'SEA',
    destination: 'SAN',
    departureTime: '13:20',
    arrivalTime: '16:05',
    transferWindow: '50 min',
    weatherStatus: 'Clear',
    riskScore: 34,
    riskLevel: 'moderate',
    primaryRiskDriver: 'Staffing Shortage',
    recommendedAction: 'Request additional handler',
    status: 'departed',
    bagsTotal: 132,
    bagsAtRisk: 14,
    gate: 'C22',
    terminal: 'C',
  },
  {
    id: '7',
    flightNumber: 'F9876',
    airline: 'Frontier Airlines',
    airlineLogo: 'F9',
    route: 'MCO → PHL',
    origin: 'MCO',
    destination: 'PHL',
    departureTime: '16:45',
    arrivalTime: '19:30',
    transferWindow: '35 min',
    weatherStatus: 'Thunderstorms',
    riskScore: 81,
    riskLevel: 'critical',
    primaryRiskDriver: 'Weather + Tight Connection',
    recommendedAction: 'Rebook connecting passengers',
    status: 'on-time',
    bagsTotal: 156,
    bagsAtRisk: 42,
    gate: 'E12',
    terminal: 'E',
  },
  {
    id: '8',
    flightNumber: 'NK512',
    airline: 'Spirit Airlines',
    airlineLogo: 'NK',
    route: 'FLL → DTW',
    origin: 'FLL',
    destination: 'DTW',
    departureTime: '17:00',
    arrivalTime: '20:15',
    transferWindow: '65 min',
    weatherStatus: 'Clear',
    riskScore: 19,
    riskLevel: 'low',
    primaryRiskDriver: 'None Significant',
    recommendedAction: 'Standard processing',
    status: 'on-time',
    bagsTotal: 178,
    bagsAtRisk: 5,
    gate: 'A15',
    terminal: 'A',
  },
]

// Alerts data
export const alertsData: Alert[] = [
  {
    id: '1',
    title: 'Critical Transfer Risk - Flight AA482',
    description: 'Multiple risk factors detected for connecting bags',
    relatedFlight: 'AA482',
    terminal: 'B',
    riskDriver: 'Weather + Tight Connection',
    timeDetected: '14:23',
    suggestedIntervention: 'Deploy priority handling team to Gate B22',
    assignedTeam: 'Transfer Team B',
    status: 'critical',
    severity: 'critical',
  },
  {
    id: '2',
    title: 'Scan System Delay - Terminal B',
    description: 'Baggage scanning experiencing 8-minute delays',
    terminal: 'B',
    riskDriver: 'Equipment Performance',
    timeDetected: '14:18',
    suggestedIntervention: 'Activate backup scanner at B-South',
    assignedTeam: 'Maintenance',
    status: 'active',
    severity: 'high',
  },
  {
    id: '3',
    title: 'Weather Impact Alert',
    description: 'Thunderstorms affecting 8 inbound flights',
    riskDriver: 'Weather Disruption',
    timeDetected: '14:05',
    suggestedIntervention: 'Pre-stage resources for delayed arrivals',
    assignedTeam: 'Operations Center',
    status: 'active',
    severity: 'high',
  },
  {
    id: '4',
    title: 'Staffing Gap - Carousel Team',
    description: 'Below minimum staffing at arrivals carousel',
    terminal: 'C',
    riskDriver: 'Resource Constraint',
    timeDetected: '13:45',
    suggestedIntervention: 'Reassign 2 handlers from Terminal A',
    assignedTeam: 'HR Dispatch',
    status: 'active',
    severity: 'moderate',
  },
  {
    id: '5',
    title: 'High Volume Transfer Period',
    description: 'Peak transfer window approaching (15:30-16:30)',
    riskDriver: 'Volume Pressure',
    timeDetected: '13:30',
    suggestedIntervention: 'Increase sortation capacity by 20%',
    assignedTeam: 'Sortation Team',
    status: 'active',
    severity: 'moderate',
  },
  {
    id: '6',
    title: 'Resolved - Gate Change Impact',
    description: 'Flight DL445 gate change handled successfully',
    relatedFlight: 'DL445',
    terminal: 'A',
    riskDriver: 'Gate Reassignment',
    timeDetected: '12:15',
    suggestedIntervention: 'Bags rerouted to new location',
    assignedTeam: 'Ramp Team A',
    status: 'resolved',
    severity: 'low',
  },
]

// Baggage flow stages
export const baggageStages: BaggageStage[] = [
  { name: 'Check-In', bagsProcessed: 2847, bagsDelayed: 12, bagsFlagged: 8, bottleneck: false, scanCompleteness: 99.2 },
  { name: 'Security', bagsProcessed: 2835, bagsDelayed: 24, bagsFlagged: 15, bottleneck: false, scanCompleteness: 98.8 },
  { name: 'Sortation', bagsProcessed: 2811, bagsDelayed: 45, bagsFlagged: 28, bottleneck: true, scanCompleteness: 97.4 },
  { name: 'Loading', bagsProcessed: 2766, bagsDelayed: 32, bagsFlagged: 22, bottleneck: false, scanCompleteness: 98.1 },
  { name: 'Transfer', bagsProcessed: 847, bagsDelayed: 67, bagsFlagged: 41, bottleneck: true, scanCompleteness: 94.2 },
  { name: 'Unloading', bagsProcessed: 2234, bagsDelayed: 18, bagsFlagged: 12, bottleneck: false, scanCompleteness: 99.1 },
  { name: 'Carousel', bagsProcessed: 2216, bagsDelayed: 28, bagsFlagged: 9, bottleneck: false, scanCompleteness: 99.6 },
]

// AI Recommendations
export const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Increase staffing near Terminal A between 5:00–7:00 PM',
    reasoning: 'Historical data shows 34% increase in transfer volume during this window. Current staffing levels may cause delays.',
    confidence: 92,
    predictedImpact: 'Reduce transfer delays by ~18 minutes for 120+ bags',
    category: 'staffing',
  },
  {
    id: '2',
    title: 'Flag connecting bags from weather-affected arrivals for priority sortation',
    reasoning: '8 inbound flights affected by thunderstorms. 156 connecting bags at risk of missing transfers.',
    confidence: 88,
    predictedImpact: 'Prevent estimated 47 mishandled bags',
    category: 'routing',
  },
  {
    id: '3',
    title: 'Monitor Flight UA310 due to abnormal scan gap pattern',
    reasoning: 'Detection of 3+ minute gaps between scans indicates potential tracking issue.',
    confidence: 76,
    predictedImpact: 'Early detection of 12 potentially lost bags',
    category: 'monitoring',
  },
  {
    id: '4',
    title: 'Reallocate baggage cart resources to Terminal B',
    reasoning: 'Current cart utilization at 95% in Terminal B vs 62% in Terminal D.',
    confidence: 84,
    predictedImpact: 'Improve transfer throughput by 15%',
    category: 'resource',
  },
  {
    id: '5',
    title: 'Pre-position handlers at Gate C14 for DL219 arrival',
    reasoning: 'Flight has 36 bags requiring manual verification. Normal staffing insufficient.',
    confidence: 91,
    predictedImpact: 'Reduce processing time by 22 minutes',
    category: 'staffing',
  },
]

// Analytics data
export const weeklyTrendData = [
  { week: 'Week 1', mishandling: 142, predicted: 156, prevented: 14 },
  { week: 'Week 2', mishandling: 128, predicted: 149, prevented: 21 },
  { week: 'Week 3', mishandling: 115, predicted: 141, prevented: 26 },
  { week: 'Week 4', mishandling: 98, predicted: 134, prevented: 36 },
]

export const costSavingsData = [
  { month: 'Jan', savings: 89000 },
  { month: 'Feb', savings: 102000 },
  { month: 'Mar', savings: 118000 },
  { month: 'Apr', savings: 127000 },
]

export const disruptionDriversData = [
  { driver: 'Weather', incidents: 234, percentage: 28 },
  { driver: 'Tight Connections', incidents: 198, percentage: 24 },
  { driver: 'Staffing', incidents: 145, percentage: 18 },
  { driver: 'Equipment', incidents: 112, percentage: 14 },
  { driver: 'Volume', incidents: 89, percentage: 11 },
  { driver: 'Other', incidents: 42, percentage: 5 },
]

export const businessImpactData = {
  compensationPrevented: '$847,000',
  laborHoursSaved: '1,247',
  complaintsAvoided: '892',
  efficiencyGain: '23%',
}
