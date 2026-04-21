// Mock data for BagGuard AI Dashboard - American Airlines at PHL

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
  { label: 'High-Risk Flights Today', value: 18, change: -15, trend: 'down', description: 'vs. yesterday' },
  { label: 'Bags Flagged for Intervention', value: 634, change: -11, trend: 'down', description: 'vs. avg' },
  { label: 'Avg Predicted Risk', value: '16.8%', change: -4.1, trend: 'down', description: 'vs. last week' },
  { label: 'Est. Cost Avoided', value: '$142K', change: 28, trend: 'up', description: 'this month' },
  { label: 'On-Time Transfer Rate', value: '95.7%', change: 2.8, trend: 'up', description: 'vs. target' },
  { label: 'Active Alerts', value: 9, change: -2, trend: 'down', description: 'requiring action' },
]

// Risk breakdown for pie chart
export const riskSourceData = [
  { name: 'Weather', value: 32, fill: 'var(--chart-1)' },
  { name: 'Tight Connections', value: 26, fill: 'var(--chart-2)' },
  { name: 'Staffing Shortage', value: 16, fill: 'var(--chart-3)' },
  { name: 'Scan Gaps', value: 12, fill: 'var(--chart-4)' },
  { name: 'Historical Disruption', value: 9, fill: 'var(--chart-5)' },
  { name: 'Routing Complexity', value: 5, fill: 'var(--color-muted)' },
]

// Time series data for risk trend
export const riskTrendData = [
  { time: '06:00', risk: 10, baseline: 14 },
  { time: '08:00', risk: 22, baseline: 17 },
  { time: '10:00', risk: 28, baseline: 19 },
  { time: '12:00', risk: 25, baseline: 21 },
  { time: '14:00', risk: 32, baseline: 23 },
  { time: '16:00', risk: 38, baseline: 25 },
  { time: '18:00', risk: 35, baseline: 24 },
  { time: '20:00', risk: 26, baseline: 21 },
  { time: '22:00', risk: 15, baseline: 17 },
]

// High risk flights/terminals bar chart data - PHL Terminals
export const highRiskTerminalsData = [
  { name: 'Terminal B/C', risk: 38, flights: 24 },
  { name: 'Terminal A-West', risk: 34, flights: 18 },
  { name: 'Terminal A-East', risk: 28, flights: 16 },
  { name: 'Terminal F', risk: 22, flights: 12 },
  { name: 'Terminal D/E', risk: 18, flights: 8 },
]

// Live Feed Items - American Airlines specific
export const liveFeedItems: LiveFeedItem[] = [
  { id: '1', message: 'AA1847 flagged: short connection time + weather disruption at CLT', severity: 'critical', timestamp: '2 min ago', flightNumber: 'AA1847' },
  { id: '2', message: 'Terminal B/C transfer risk elevated due to scan delay', severity: 'high', timestamp: '4 min ago' },
  { id: '3', message: '42 bags on AA723 need manual prioritization for DFW connection', severity: 'high', timestamp: '7 min ago', flightNumber: 'AA723' },
  { id: '4', message: 'Staffing issue detected at A-West carousel team', severity: 'moderate', timestamp: '11 min ago' },
  { id: '5', message: 'Weather alert: Thunderstorms over Charlotte - monitoring 6 inbound AA flights', severity: 'high', timestamp: '14 min ago' },
  { id: '6', message: 'AA2156 transfer window expanded - risk reduced to low', severity: 'low', timestamp: '17 min ago', flightNumber: 'AA2156' },
]

// Flights data - All American Airlines flights at PHL
export const flightsData: Flight[] = [
  {
    id: '1',
    flightNumber: 'AA1847',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → CLT',
    origin: 'PHL',
    destination: 'CLT',
    departureTime: '14:30',
    arrivalTime: '16:15',
    transferWindow: '32 min',
    weatherStatus: 'Thunderstorms',
    riskScore: 89,
    riskLevel: 'critical',
    primaryRiskDriver: 'Tight Connection + Weather at CLT',
    recommendedAction: 'Priority handling for 52 connecting bags to MIA/DFW',
    status: 'boarding',
    bagsTotal: 198,
    bagsAtRisk: 52,
    gate: 'B8',
    terminal: 'B/C',
  },
  {
    id: '2',
    flightNumber: 'AA723',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → DFW',
    origin: 'PHL',
    destination: 'DFW',
    departureTime: '15:15',
    arrivalTime: '18:05',
    transferWindow: '38 min',
    weatherStatus: 'Clear',
    riskScore: 74,
    riskLevel: 'high',
    primaryRiskDriver: 'Scan Gap Detected',
    recommendedAction: 'Manual verification required for 42 bags',
    status: 'on-time',
    bagsTotal: 234,
    bagsAtRisk: 42,
    gate: 'C22',
    terminal: 'B/C',
  },
  {
    id: '3',
    flightNumber: 'AA456',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → ORD',
    origin: 'PHL',
    destination: 'ORD',
    departureTime: '16:00',
    arrivalTime: '17:45',
    transferWindow: '52 min',
    weatherStatus: 'Cloudy',
    riskScore: 42,
    riskLevel: 'moderate',
    primaryRiskDriver: 'High Transfer Volume',
    recommendedAction: 'Monitor carousel capacity at ORD',
    status: 'on-time',
    bagsTotal: 212,
    bagsAtRisk: 24,
    gate: 'A12',
    terminal: 'A-East',
  },
  {
    id: '4',
    flightNumber: 'AA1532',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → PHX',
    origin: 'PHL',
    destination: 'PHX',
    departureTime: '14:45',
    arrivalTime: '17:30',
    transferWindow: '58 min',
    weatherStatus: 'Clear',
    riskScore: 26,
    riskLevel: 'low',
    primaryRiskDriver: 'Historical Route Risk',
    recommendedAction: 'Standard monitoring',
    status: 'on-time',
    bagsTotal: 156,
    bagsAtRisk: 9,
    gate: 'B15',
    terminal: 'B/C',
  },
  {
    id: '5',
    flightNumber: 'AA892',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → MIA',
    origin: 'PHL',
    destination: 'MIA',
    departureTime: '15:30',
    arrivalTime: '18:45',
    transferWindow: '35 min',
    weatherStatus: 'Rain',
    riskScore: 71,
    riskLevel: 'high',
    primaryRiskDriver: 'Gate Distance + Weather',
    recommendedAction: 'Pre-position transfer team at MIA',
    status: 'delayed',
    bagsTotal: 178,
    bagsAtRisk: 38,
    gate: 'A5',
    terminal: 'A-West',
  },
  {
    id: '6',
    flightNumber: 'AA2341',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → LAX',
    origin: 'PHL',
    destination: 'LAX',
    departureTime: '13:20',
    arrivalTime: '16:15',
    transferWindow: '48 min',
    weatherStatus: 'Clear',
    riskScore: 31,
    riskLevel: 'moderate',
    primaryRiskDriver: 'Staffing Shortage at LAX',
    recommendedAction: 'Request additional handler coordination',
    status: 'departed',
    bagsTotal: 245,
    bagsAtRisk: 18,
    gate: 'C14',
    terminal: 'B/C',
  },
  {
    id: '7',
    flightNumber: 'AA567',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → BOS',
    origin: 'PHL',
    destination: 'BOS',
    departureTime: '16:45',
    arrivalTime: '18:15',
    transferWindow: '30 min',
    weatherStatus: 'Thunderstorms',
    riskScore: 83,
    riskLevel: 'critical',
    primaryRiskDriver: 'Weather + Tight Connection',
    recommendedAction: 'Consider rebooking connecting passengers',
    status: 'on-time',
    bagsTotal: 142,
    bagsAtRisk: 45,
    gate: 'F18',
    terminal: 'F',
  },
  {
    id: '8',
    flightNumber: 'AA2156',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → SFO',
    origin: 'PHL',
    destination: 'SFO',
    departureTime: '17:00',
    arrivalTime: '20:15',
    transferWindow: '62 min',
    weatherStatus: 'Clear',
    riskScore: 18,
    riskLevel: 'low',
    primaryRiskDriver: 'None Significant',
    recommendedAction: 'Standard processing',
    status: 'on-time',
    bagsTotal: 189,
    bagsAtRisk: 6,
    gate: 'A18',
    terminal: 'A-East',
  },
  {
    id: '9',
    flightNumber: 'AA1089',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → DCA',
    origin: 'PHL',
    destination: 'DCA',
    departureTime: '17:30',
    arrivalTime: '18:30',
    transferWindow: '45 min',
    weatherStatus: 'Clear',
    riskScore: 22,
    riskLevel: 'low',
    primaryRiskDriver: 'None Significant',
    recommendedAction: 'Standard monitoring',
    status: 'on-time',
    bagsTotal: 98,
    bagsAtRisk: 4,
    gate: 'F8',
    terminal: 'F',
  },
  {
    id: '10',
    flightNumber: 'AA3421',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    route: 'PHL → SEA',
    origin: 'PHL',
    destination: 'SEA',
    departureTime: '18:15',
    arrivalTime: '21:30',
    transferWindow: '55 min',
    weatherStatus: 'Cloudy',
    riskScore: 38,
    riskLevel: 'moderate',
    primaryRiskDriver: 'High Volume Period',
    recommendedAction: 'Monitor sortation capacity',
    status: 'on-time',
    bagsTotal: 167,
    bagsAtRisk: 14,
    gate: 'B22',
    terminal: 'B/C',
  },
]

// Alerts data - American Airlines at PHL
export const alertsData: Alert[] = [
  {
    id: '1',
    title: 'Critical Transfer Risk - AA1847 to CLT',
    description: 'Multiple risk factors detected for connecting bags to MIA and DFW',
    relatedFlight: 'AA1847',
    terminal: 'B/C',
    riskDriver: 'Weather + Tight Connection',
    timeDetected: '14:23',
    suggestedIntervention: 'Deploy priority handling team to Gate B8',
    assignedTeam: 'PHL Transfer Team B',
    status: 'critical',
    severity: 'critical',
  },
  {
    id: '2',
    title: 'Scan System Delay - Terminal B/C',
    description: 'Baggage scanning experiencing 7-minute delays in B/C connector',
    terminal: 'B/C',
    riskDriver: 'Equipment Performance',
    timeDetected: '14:18',
    suggestedIntervention: 'Activate backup scanner at B-South junction',
    assignedTeam: 'PHL Maintenance',
    status: 'active',
    severity: 'high',
  },
  {
    id: '3',
    title: 'Weather Impact Alert - Charlotte Hub',
    description: 'Thunderstorms affecting 6 inbound flights from CLT hub',
    riskDriver: 'Weather Disruption',
    timeDetected: '14:05',
    suggestedIntervention: 'Pre-stage resources for delayed CLT arrivals',
    assignedTeam: 'PHL Operations Center',
    status: 'active',
    severity: 'high',
  },
  {
    id: '4',
    title: 'Staffing Gap - A-West Carousel',
    description: 'Below minimum staffing at A-West arrivals carousel',
    terminal: 'A-West',
    riskDriver: 'Resource Constraint',
    timeDetected: '13:45',
    suggestedIntervention: 'Reassign 2 handlers from Terminal F',
    assignedTeam: 'PHL HR Dispatch',
    status: 'active',
    severity: 'moderate',
  },
  {
    id: '5',
    title: 'High Volume Transfer Period',
    description: 'Peak AA hub transfer window approaching (15:30-17:00)',
    riskDriver: 'Volume Pressure',
    timeDetected: '13:30',
    suggestedIntervention: 'Increase B/C sortation capacity by 25%',
    assignedTeam: 'PHL Sortation Team',
    status: 'active',
    severity: 'moderate',
  },
  {
    id: '6',
    title: 'Resolved - Gate Change AA2341',
    description: 'Flight AA2341 gate change handled successfully',
    relatedFlight: 'AA2341',
    terminal: 'B/C',
    riskDriver: 'Gate Reassignment',
    timeDetected: '12:15',
    suggestedIntervention: 'Bags rerouted to new gate C14',
    assignedTeam: 'PHL Ramp Team C',
    status: 'resolved',
    severity: 'low',
  },
]

// Baggage flow stages - PHL specific
export const baggageStages: BaggageStage[] = [
  { name: 'Check-In', bagsProcessed: 3124, bagsDelayed: 14, bagsFlagged: 11, bottleneck: false, scanCompleteness: 99.4 },
  { name: 'TSA Security', bagsProcessed: 3110, bagsDelayed: 28, bagsFlagged: 18, bottleneck: false, scanCompleteness: 98.9 },
  { name: 'Sortation', bagsProcessed: 3082, bagsDelayed: 52, bagsFlagged: 34, bottleneck: true, scanCompleteness: 97.2 },
  { name: 'Loading', bagsProcessed: 3030, bagsDelayed: 38, bagsFlagged: 26, bottleneck: false, scanCompleteness: 98.3 },
  { name: 'Transfer', bagsProcessed: 924, bagsDelayed: 72, bagsFlagged: 48, bottleneck: true, scanCompleteness: 93.8 },
  { name: 'Unloading', bagsProcessed: 2456, bagsDelayed: 21, bagsFlagged: 14, bottleneck: false, scanCompleteness: 99.2 },
  { name: 'Carousel', bagsProcessed: 2435, bagsDelayed: 32, bagsFlagged: 11, bottleneck: false, scanCompleteness: 99.5 },
]

// AI Recommendations - American Airlines at PHL specific
export const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Increase staffing at B/C connector between 3:00-5:30 PM',
    reasoning: 'Historical data shows 38% increase in AA hub transfer volume during this window. Current staffing may cause 15+ min delays.',
    confidence: 94,
    predictedImpact: 'Reduce transfer delays by ~22 minutes for 180+ connecting bags',
    category: 'staffing',
  },
  {
    id: '2',
    title: 'Flag connecting bags from CLT weather-affected arrivals',
    reasoning: '6 inbound AA flights from Charlotte hub affected by thunderstorms. 168 connecting bags at risk of missing transfers.',
    confidence: 91,
    predictedImpact: 'Prevent estimated 54 mishandled bags',
    category: 'routing',
  },
  {
    id: '3',
    title: 'Monitor AA723 due to abnormal scan gap pattern',
    reasoning: 'Detection of 4+ minute gaps between scans indicates potential tracking issue in B/C sortation.',
    confidence: 78,
    predictedImpact: 'Early detection of 15 potentially lost bags',
    category: 'monitoring',
  },
  {
    id: '4',
    title: 'Reallocate baggage carts from F to B/C Terminal',
    reasoning: 'Current cart utilization at 97% in B/C vs 58% in Terminal F during AA peak period.',
    confidence: 86,
    predictedImpact: 'Improve hub transfer throughput by 18%',
    category: 'resource',
  },
  {
    id: '5',
    title: 'Pre-position handlers at Gate B8 for AA1847 departure',
    reasoning: 'Flight has 52 priority bags for CLT connections. Normal staffing insufficient for tight connection window.',
    confidence: 93,
    predictedImpact: 'Reduce processing time by 18 minutes',
    category: 'staffing',
  },
]

// Analytics data - American Airlines at PHL
export const weeklyTrendData = [
  { week: 'Week 1', mishandling: 128, predicted: 148, prevented: 20 },
  { week: 'Week 2', mishandling: 112, predicted: 139, prevented: 27 },
  { week: 'Week 3', mishandling: 98, predicted: 132, prevented: 34 },
  { week: 'Week 4', mishandling: 84, predicted: 126, prevented: 42 },
]

export const costSavingsData = [
  { month: 'Jan', savings: 98000 },
  { month: 'Feb', savings: 112000 },
  { month: 'Mar', savings: 128000 },
  { month: 'Apr', savings: 142000 },
]

export const disruptionDriversData = [
  { driver: 'Weather (CLT Hub)', incidents: 248, percentage: 32 },
  { driver: 'Tight Connections', incidents: 186, percentage: 24 },
  { driver: 'Staffing', incidents: 124, percentage: 16 },
  { driver: 'Equipment', incidents: 98, percentage: 13 },
  { driver: 'Volume', incidents: 78, percentage: 10 },
  { driver: 'Other', incidents: 38, percentage: 5 },
]

export const businessImpactData = {
  compensationPrevented: '$924,000',
  laborHoursSaved: '1,428',
  complaintsAvoided: '967',
  efficiencyGain: '26%',
}
