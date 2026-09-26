import { useMemo, useState } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { MapPin, ShieldCheck, Truck, Star, Filter, ArrowUpDown, Sparkles } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { defaultMatchWeights, filterRecyclers, sortRecyclers, computeBestMatchScore } from '../services/recyclerService'
import type { RecyclerSort } from '../services/recyclerService'

const materialOptions = ['All materials', 'PCB', 'Copper', 'Battery', 'Electronics', 'Aluminium']
const LeafletMapContainer = MapContainer as any
const LeafletTileLayer = TileLayer as any
const LeafletCircleMarker = CircleMarker as any
const LeafletPopup = Popup as any

export function MarketplacePage() {
  const lots = useAppStore((state) => state.lots)
  const recyclers = useAppStore((state) => state.recyclers)
  const selectedRecycler = useAppStore((state) => state.selectedRecycler)
  const selectRecyclerForLot = useAppStore((state) => state.selectRecyclerForLot)

  const activeLot = lots[0]
  const [material, setMaterial] = useState(activeLot?.material ?? 'PCB')
  const [maxDistance, setMaxDistance] = useState(25)
  const [pickupOnly, setPickupOnly] = useState(false)
  const [authorizedOnly, setAuthorizedOnly] = useState(true)
  const [sortBy, setSortBy] = useState<RecyclerSort>('best-match')

  const filteredRecyclers = useMemo(() => {
    const list = filterRecyclers(recyclers, {
      material,
      maxDistance,
      pickupOnly,
      authorizedOnly
    })

    return sortRecyclers(list, sortBy, activeLot?.material ?? material)
  }, [activeLot, authorizedOnly, material, maxDistance, pickupOnly, recyclers, sortBy])

  const bestMatchRecycler = useMemo(() => {
    if (!filteredRecyclers.length) return null
    return [...filteredRecyclers].sort((a, b) => {
      return computeBestMatchScore(b, activeLot?.material ?? material, defaultMatchWeights) - computeBestMatchScore(a, activeLot?.material ?? material, defaultMatchWeights)
    })[0]
  }, [activeLot, filteredRecyclers, material])

  const highestBidRecycler = useMemo(() => {
    if (!filteredRecyclers.length) return null
    return [...filteredRecyclers].sort((a, b) => b.currentBid - a.currentBid)[0]
  }, [filteredRecyclers])

  const mapCenter: [number, number] = useMemo(() => {
    if (filteredRecyclers.length) {
      const first = filteredRecyclers[0]
      return first.coordinates
    }
    return [19.076, 72.877]
  }, [filteredRecyclers])

  const onSelectRecycler = (recyclerId: string) => {
    selectRecyclerForLot(recyclerId, activeLot?.id)
  }

  const renderRecyclerCard = (recycler: any) => (
    <article key={recycler.id} className={`recycler-card-card ${selectedRecycler?.id === recycler.id ? 'selected' : ''}`}>
      <div className="recycler-topline">
        <div>
          <div className="recycler-name-row">
            <h4>{recycler.name}</h4>
            {recycler.authorized ? (
              <span className="auth-pill authorized"><ShieldCheck size={12} /> Authorized</span>
            ) : (
              <span className="auth-pill pending">Unverified</span>
            )}
          </div>
          <p className="muted-text">{recycler.kind}</p>
        </div>
        <div className="rating-badge"><Star size={12} /> {recycler.rating}</div>
      </div>

      <div className="market-stats-grid">
        <div><span>Distance</span><strong>{recycler.distanceKm} km</strong></div>
        <div><span>Current bid</span><strong>₹{recycler.currentBid.toLocaleString('en-IN')}</strong></div>
        <div><span>Price/kg</span><strong>₹{recycler.pricePerKg}</strong></div>
        <div><span>Pickup</span><strong>{recycler.pickupAvailable ? recycler.pickupWindow : 'Not available'}</strong></div>
      </div>

      <div className="recycler-details">
        <span><MapPin size={12} /> {recycler.locationName}</span>
        <span><Truck size={12} /> {recycler.responseTime}</span>
      </div>

      <div className="material-list">
        {recycler.acceptedMaterials.map((materialName: string) => (
          <span key={materialName}>{materialName}</span>
        ))}
      </div>

      <div className="recycler-history-row">
        <div>
          <small>Reliability</small>
          <strong>{recycler.reliability}%</strong>
        </div>
        <div>
          <small>History</small>
          <strong>{recycler.history}</strong>
        </div>
      </div>

      <div className="recycler-actions">
        <button type="button" className="secondary-cta" onClick={() => onSelectRecycler(recycler.id)}>
          Select recycler
        </button>
      </div>
    </article>
  )

  return (
    <div className="page-shell marketplace-page">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Recycler marketplace</p>
            <h3>Live recycler bids and matches</h3>
          </div>
          <span className="tiny-pill"><Sparkles size={12} /> Demo logic</span>
        </div>

        <div className="marketplace-header-summary">
          <div className="summary-tile">
            <span>Active lot</span>
            <strong>{activeLot?.material ?? 'PCB'} / {activeLot?.weightKg ?? 15} kg</strong>
          </div>
          <div className="summary-tile">
            <span>Highest bid</span>
            <strong>₹{(highestBidRecycler?.currentBid ?? 0).toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-tile">
            <span>Best match</span>
            <strong>{bestMatchRecycler ? bestMatchRecycler.name : 'No match'}</strong>
          </div>
        </div>
      </section>

      <section className="marketplace-layout">
        <div className="panel filters-panel">
          <div className="panel-header compact-header">
            <div>
              <p className="eyebrow">Filters</p>
              <h3>Refine recycler options</h3>
            </div>
            <Filter size={16} />
          </div>

          <div className="filter-grid">
            <label>
              <span>Material</span>
              <select value={material} onChange={(event) => setMaterial(event.target.value)}>
                {materialOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Distance</span>
              <input type="range" min={5} max={30} value={maxDistance} onChange={(event) => setMaxDistance(Number(event.target.value))} />
              <small>Up to {maxDistance} km</small>
            </label>

            <label className="checkbox-row">
              <input type="checkbox" checked={pickupOnly} onChange={() => setPickupOnly(!pickupOnly)} />
              Pickup available
            </label>

            <label className="checkbox-row">
              <input type="checkbox" checked={authorizedOnly} onChange={() => setAuthorizedOnly(!authorizedOnly)} />
              Authorized only
            </label>
          </div>

          <div className="sort-block">
            <div className="sort-label"><ArrowUpDown size={14} /> Sort by</div>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as RecyclerSort)}>
              <option value="highest-bid">Highest Bid</option>
              <option value="best-match">Best Match</option>
              <option value="nearest">Nearest</option>
              <option value="fastest-pickup">Fastest Pickup</option>
              <option value="highest-rated">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="panel map-panel">
          <div className="panel-header compact-header">
            <div>
              <p className="eyebrow">Map view</p>
              <h3>Recycler coverage</h3>
            </div>
            <MapPin size={16} />
          </div>

          <div className="map-shell">
            <LeafletMapContainer center={mapCenter} zoom={11} scrollWheelZoom className="leaflet-map">
              <LeafletTileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filteredRecyclers.map((recycler) => (
                <LeafletCircleMarker key={recycler.id} center={recycler.coordinates} radius={10} pathOptions={{ color: recycler.authorized ? '#1b5e4d' : '#b16343', fillColor: recycler.authorized ? '#1b5e4d' : '#b16343', fillOpacity: 0.8 }}>
                  <LeafletPopup>
                    <div className="popup-card">
                      <strong>{recycler.name}</strong>
                      <span>{recycler.distanceKm} km away</span>
                      <span>₹{recycler.currentBid.toLocaleString('en-IN')} bid</span>
                    </div>
                  </LeafletPopup>
                </LeafletCircleMarker>
              ))}
            </LeafletMapContainer>
          </div>
        </div>
      </section>

      <section className="panel card-grid-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Authorized recyclers</p>
            <h3>Matched listings</h3>
          </div>
        </div>

        <div className="recycler-card-grid">
          {filteredRecyclers.length ? (
            filteredRecyclers.map((recycler) => renderRecyclerCard(recycler))
          ) : (
            <div className="empty-state-card compact-empty">
              <p className="eyebrow">No results</p>
              <h3>Adjust your filters</h3>
              <p>Try widening the distance or showing all results.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
