import type { MarketRate } from '../types'

export const marketRates: MarketRate[] = [
  {
    id: 'pcb',
    material: 'PCB',
    ratePerKg: 198,
    unit: '₹/kg',
    change: 8.6,
    trend: 'up',
    signal: 'Strong demand from recyclers'
  },
  {
    id: 'copper-cable',
    material: 'Copper Cable',
    ratePerKg: 520,
    unit: '₹/kg',
    change: 6.2,
    trend: 'up',
    signal: 'Reflects rising copper scrap price'
  },
  {
    id: 'aluminium',
    material: 'Aluminium',
    ratePerKg: 198,
    unit: '₹/kg',
    change: -1.4,
    trend: 'down',
    signal: 'Slight dip from last week'
  },
  {
    id: 'battery',
    material: 'Battery',
    ratePerKg: 138,
    unit: '₹/kg',
    change: 3.1,
    trend: 'up',
    signal: 'Demand stable at collection hubs'
  }
]
