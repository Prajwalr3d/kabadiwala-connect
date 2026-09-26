import type { Recycler } from '../types'

export type RecyclerFilter = {
  material: string
  maxDistance: number
  pickupOnly: boolean
  authorizedOnly: boolean
}

export type RecyclerSort = 'highest-bid' | 'best-match' | 'nearest' | 'fastest-pickup' | 'highest-rated'

export type MatchWeights = {
  price: number
  distance: number
  material: number
  pickup: number
  reliability: number
}

export const defaultMatchWeights: MatchWeights = {
  price: 0.3,
  distance: 0.25,
  material: 0.2,
  pickup: 0.15,
  reliability: 0.1
}

export function computeBestMatchScore(recycler: Recycler, material: string, weights: MatchWeights = defaultMatchWeights) {
  const priceScore = Math.min(1, recycler.currentBid / 5000)
  const distanceScore = Math.max(0, 1 - recycler.distanceKm / 25)
  const materialScore = recycler.acceptedMaterials.some((item) => item.toLowerCase().includes(material.toLowerCase())) ? 1 : 0.55
  const pickupScore = recycler.pickupAvailable ? 1 : 0.35
  const reliabilityScore = recycler.reliability / 100

  return (
    priceScore * weights.price +
    distanceScore * weights.distance +
    materialScore * weights.material +
    pickupScore * weights.pickup +
    reliabilityScore * weights.reliability
  )
}

export function sortRecyclers(recyclers: Recycler[], sortBy: RecyclerSort, preferredMaterial: string) {
  const list = [...recyclers]

  switch (sortBy) {
    case 'highest-bid':
      return list.sort((a, b) => b.currentBid - a.currentBid)
    case 'best-match':
      return list.sort((a, b) => {
        const aScore = computeBestMatchScore(a, preferredMaterial)
        const bScore = computeBestMatchScore(b, preferredMaterial)
        return bScore - aScore
      })
    case 'nearest':
      return list.sort((a, b) => a.distanceKm - b.distanceKm)
    case 'fastest-pickup':
      return list.sort((a, b) => {
        const aPickup = a.pickupAvailable ? 1 : 0
        const bPickup = b.pickupAvailable ? 1 : 0
        return bPickup - aPickup || a.responseTime.localeCompare(b.responseTime)
      })
    case 'highest-rated':
      return list.sort((a, b) => b.rating - a.rating)
    default:
      return list
  }
}

export function filterRecyclers(recyclers: Recycler[], filters: RecyclerFilter) {
  return recyclers.filter((recycler) => {
    const matchesMaterial =
      filters.material === 'All materials' ||
      recycler.acceptedMaterials.some((item) => item.toLowerCase().includes(filters.material.toLowerCase()))

    const matchesDistance = recycler.distanceKm <= filters.maxDistance
    const matchesPickup = !filters.pickupOnly || recycler.pickupAvailable
    const matchesAuthorization = !filters.authorizedOnly || recycler.authorized

    return matchesMaterial && matchesDistance && matchesPickup && matchesAuthorization
  })
}
