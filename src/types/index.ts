export type Language = 'en' | 'hi' | 'mr'

export type MaterialTrend = 'up' | 'down' | 'flat'

export interface MarketRate {
  id: string
  material: string
  ratePerKg: number
  unit: string
  change: number
  trend: MaterialTrend
  signal: string
}

export interface Recycler {
  id: string
  name: string
  kind: string
  distanceKm: number
  rating: number
  trustScore: number
  capacity: string
  responseTime: string
  coordinates: [number, number]
  specialty: string
  locationName: string
  pickupAvailable: boolean
  authorized: boolean
  acceptedMaterials: string[]
  currentBid: number
  pricePerKg: number
  reliability: number
  history: string
  pickupWindow: string
}

export type LotStatus = 'Created' | 'AI Inspected' | 'Bidding Open' | 'Recycler Selected' | 'Pickup Scheduled' | 'Handed Over' | 'Payment Completed'

export interface Lot {
  id: string
  title: string
  material: string
  weightKg: number
  basePrice: number
  currentBid: number
  status: LotStatus
  location: string
  eta: string
  freshness: string
  image?: string | null
  createdAt?: string
  indicativeValue?: number
  selectedRecyclerId?: string
  handoverReference?: string
  pickupScheduledAt?: string
  handoverAt?: string
  paymentAt?: string
}

export interface IndicativePriceEstimate {
  material: string
  weightKg: number
  pricePerKg: number
  indicativeMin: number
  indicativeMax: number
  indicativeValue: number
  freshness: string
  marketTrend: 'Rising' | 'Stable' | 'Cooling'
  confidence: number
  uncertainty: string
  dataFreshness: string
}

export interface Bid {
  id: string
  bidder: string
  amount: number
  when: string
  confidence: string
  status: 'Winning' | 'Pending' | 'Outbid'
  recyclerId?: string
  pricePerKg?: number
  distanceKm?: number
  pickupLabel?: string
  rating?: number
  location?: string
  acceptedMaterials?: string[]
}

export interface Transaction {
  id: string
  title: string
  amount: number
  time: string
  type: 'Pickup' | 'Sale' | 'Settlement' | 'Reward'
  status: 'Completed' | 'Pending' | 'In review'
  lotId?: string
  recycler?: string
  material?: string
  date?: string
}

export interface EarningsSummary {
  total: number
  month: string
  target: number
  paid: number
  pending: number
  thisWeek: number
  thisMonth: number
  completed: number
}

export interface SafetyReminder {
  id: string
  title: string
  description: string
  severity: 'normal' | 'warning' | 'critical'
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  route?: string
}

export type SellWorkflowStep = 'photo' | 'inspection' | 'weight' | 'estimate' | 'create-lot'

export interface InspectionResult {
  material: string
  confidence: number
  visibleCondition: string
  visibleIssues: string[]
  modelVersion: string
  notes: string
}

export interface AppStoreState {
  language: Language
  online: boolean
  pendingSyncQueue: string[]
  notifications: NotificationItem[]
  selectedRecycler: Recycler | null
  lots: Lot[]
  bids: Bid[]
  transactions: Transaction[]
  earnings: EarningsSummary
  marketRates: MarketRate[]
  recyclers: Recycler[]
  safetyReminders: SafetyReminder[]
  sellWorkflowStep: SellWorkflowStep
  sellImage: string | null
  sellInspection: InspectionResult | null
  sellWeight: number | null

  setLanguage: (language: Language) => void
  setOnline: (online: boolean) => void
  queueSyncItem: (label: string) => void
  clearSyncQueue: () => void
  addNotification: (notification: Omit<NotificationItem, 'id' | 'read'> & { id?: string; read?: boolean }) => void
  markNotificationRead: (id: string) => void
  setSelectedRecycler: (id: string) => void
  selectRecyclerForLot: (recyclerId: string, lotId?: string) => void
  addBid: (bid: Bid) => void
  advanceLotStatus: (lotId: string, status: LotStatus) => void
  confirmHandover: (lotId: string) => void
  completePayment: (lotId: string) => void
  setSellWorkflowStep: (step: SellWorkflowStep) => void
  setSellImage: (image: string | null) => void
  setSellInspection: (inspection: InspectionResult | null) => void
  setSellWeight: (weight: number | null) => void
  resetSellWorkflow: () => void
  resetDemoState: () => void
  createLot: (lot: Lot) => void
}
