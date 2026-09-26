import type { Bid } from '../types'

export const bids: Bid[] = [
  {
    id: 'bid-1',
    bidder: 'GreenCycle Recycling',
    amount: 4500,
    when: '8 mins ago',
    confidence: 'High fit',
    status: 'Winning',
    recyclerId: 'recycler-1',
    pricePerKg: 300,
    distanceKm: 3.8,
    pickupLabel: 'Pickup today',
    rating: 4.9,
    location: 'Andheri East',
    acceptedMaterials: ['PCB', 'Copper', 'Batteries']
  },
  {
    id: 'bid-2',
    bidder: 'EcoRecover',
    amount: 4620,
    when: '16 mins ago',
    confidence: 'Strong bid',
    status: 'Pending',
    recyclerId: 'recycler-2',
    pricePerKg: 308,
    distanceKm: 8.7,
    pickupLabel: 'Pickup today',
    rating: 4.6,
    location: 'Powai',
    acceptedMaterials: ['PCB', 'Mix Electronics', 'Lamps']
  },
  {
    id: 'bid-3',
    bidder: 'Maharashtra E-Recycle',
    amount: 4550,
    when: '31 mins ago',
    confidence: 'Competitive',
    status: 'Outbid',
    recyclerId: 'recycler-3',
    pricePerKg: 303,
    distanceKm: 16.2,
    pickupLabel: 'Pickup tomorrow',
    rating: 4.9,
    location: 'Bhandup',
    acceptedMaterials: ['PCB', 'Batteries', 'Circuit Boards']
  },
  {
    id: 'bid-4',
    bidder: 'Aarav Metals',
    amount: 4700,
    when: '2 mins ago',
    confidence: 'Best offer',
    status: 'Pending',
    recyclerId: 'recycler-5',
    pricePerKg: 313,
    distanceKm: 12.4,
    pickupLabel: 'Pickup tomorrow',
    rating: 4.8,
    location: 'Goregaon East',
    acceptedMaterials: ['Copper', 'PCB', 'Mixed Metals']
  }
]
