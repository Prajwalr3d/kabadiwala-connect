import type { Bid, Recycler } from '../types'

export const compareBids = (bids: Bid[], material: string) => {
  return bids
    .map((bid) => {
      const priceWeight = 0.38
      const distanceWeight = 0.22
      const matchWeight = 0.25
      const reliabilityWeight = 0.15

      const priceScore = Math.min(1, bid.amount / 5000)
      const distanceScore = bid.distanceKm ? Math.max(0, 1 - bid.distanceKm / 25) : 0.5
      const matchScore = bid.acceptedMaterials?.some((item) => item.toLowerCase().includes(material.toLowerCase())) ? 1 : 0.7
      const reliabilityScore = bid.rating ? bid.rating / 5 : 0.8

      return {
        ...bid,
        comparisonScore:
          priceScore * priceWeight +
          distanceScore * distanceWeight +
          matchScore * matchWeight +
          reliabilityScore * reliabilityWeight
      }
    })
    .sort((a, b) => b.comparisonScore - a.comparisonScore)
}

export const createNewBid = (recyclers: Recycler[], currentBidAmount: number): Bid => {
  const baseRecycler = recyclers[Math.floor(Math.random() * recyclers.length)]
  const nextAmount = Math.max(currentBidAmount + 40, Math.round(baseRecycler.currentBid + (Math.random() * 120 - 20)))

  return {
    id: `bid-${Date.now()}`,
    bidder: baseRecycler.name,
    amount: nextAmount,
    when: 'Just now',
    confidence: 'New bid',
    status: 'Pending',
    recyclerId: baseRecycler.id,
    pricePerKg: Math.round((nextAmount / 15) * 10) / 10,
    distanceKm: Number(baseRecycler.distanceKm.toFixed(1)),
    pickupLabel: baseRecycler.pickupWindow,
    rating: baseRecycler.rating,
    location: baseRecycler.locationName,
    acceptedMaterials: baseRecycler.acceptedMaterials
  }
}
