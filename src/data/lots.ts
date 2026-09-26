import type { Lot } from '../types'

export const lots: Lot[] = [
  {
    id: 'lot-101',
    title: 'Mixed motherboard units',
    material: 'PCB',
    weightKg: 46,
    basePrice: 7200,
    currentBid: 8800,
    status: 'Bidding Open',
    location: 'Andheri East',
    eta: 'Today, 5:30 PM',
    freshness: 'High value / verified'
  },
  {
    id: 'lot-102',
    title: 'Recovered copper bundles',
    material: 'Copper Cable',
    weightKg: 32,
    basePrice: 12400,
    currentBid: 14650,
    status: 'Recycler Selected',
    location: 'Mulund West',
    eta: 'Tomorrow, 11:00 AM',
    freshness: 'Fresh collection'
  },
  {
    id: 'lot-103',
    title: 'Aluminium sheet scrap',
    material: 'Aluminium',
    weightKg: 58,
    basePrice: 9100,
    currentBid: 10350,
    status: 'AI Inspected',
    location: 'Bandra',
    eta: 'Today, 7:10 PM',
    freshness: 'Clean material'
  }
]
