import { useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, CircleDollarSign, Gauge, MapPin, ShoppingCart, Sparkles, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { compareBids, createNewBid } from '../services/biddingService'

export function BidsPage() {
  const lots = useAppStore((state) => state.lots)
  const bids = useAppStore((state) => state.bids)
  const recyclers = useAppStore((state) => state.recyclers)
  const selectedRecycler = useAppStore((state) => state.selectedRecycler)
  const addBid = useAppStore((state) => state.addBid)
  const selectRecyclerForLot = useAppStore((state) => state.selectRecyclerForLot)

  const activeLot = lots[0]
  const [selectedBidId, setSelectedBidId] = useState<string>(bids[0]?.id ?? '')
  const [comparisonOpen, setComparisonOpen] = useState(true)
  const [confirmation, setConfirmation] = useState<string | null>(null)

  const rankedBids = useMemo(() => compareBids(bids, activeLot?.material ?? 'PCB'), [activeLot, bids])
  const selectedBid = rankedBids.find((bid) => bid.id === selectedBidId) ?? rankedBids[0]

  const onNewBidReceived = () => {
    const generated = createNewBid(recyclers, activeLot?.currentBid ?? 4500)
    addBid(generated)
    setSelectedBidId(generated.id)
    setComparisonOpen(true)
  }

  const onAcceptBid = (bidId: string) => {
    const targetBid = bids.find((bid) => bid.id === bidId) ?? rankedBids.find((bid) => bid.id === bidId)
    if (!targetBid?.recyclerId) return

    selectRecyclerForLot(targetBid.recyclerId, activeLot?.id)
    setConfirmation('Recycler selected successfully')
  }

  const selectedRecyclerLabel = selectedRecycler ? `${selectedRecycler.name} · ${selectedRecycler.distanceKm} km` : 'Awaiting selection'

  return (
    <div className="page-shell bids-page">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Bidding</p>
            <h3>Current offers for active lot</h3>
          </div>
          <button type="button" className="secondary-cta" onClick={onNewBidReceived}>
            <Sparkles size={15} /> New Bid Received
          </button>
        </div>

        <div className="lot-summary-strip">
          <div>
            <span className="muted-label">Lot</span>
            <strong>{activeLot?.id ?? 'LOT #KC-2026-0187'}</strong>
          </div>
          <div>
            <span className="muted-label">Material</span>
            <strong>{activeLot?.material ?? 'PCB / Computer Boards'}</strong>
          </div>
          <div>
            <span className="muted-label">Weight</span>
            <strong>{activeLot?.weightKg ?? 15} kg</strong>
          </div>
          <div>
            <span className="muted-label">Indicative value</span>
            <strong>₹{(activeLot?.indicativeValue ?? 4200).toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </section>

      <section className="bids-layout">
        <div className="panel bids-list-panel">
          <div className="panel-header compact-header">
            <div>
              <p className="eyebrow">Live bids</p>
              <h3>Recycler offers</h3>
            </div>
            <span className="tiny-pill"><CircleDollarSign size={12} /> {rankedBids.length} active</span>
          </div>

          <div className="bid-rows">
            {rankedBids.map((bid) => (
              <button
                type="button"
                key={bid.id}
                className={`bid-row ${selectedBidId === bid.id ? 'selected' : ''}`}
                onClick={() => setSelectedBidId(bid.id)}
              >
                <div className="bid-headline">
                  <strong>{bid.bidder}</strong>
                  <span className="status-badge success">{bid.status}</span>
                </div>
                <div className="bid-price-line">
                  <span className="large-price">₹{bid.amount.toLocaleString('en-IN')}</span>
                  <small>{bid.confidence}</small>
                </div>
                <div className="bid-meta-grid">
                  <span>₹{bid.pricePerKg ?? 0}/kg</span>
                  <span>{bid.distanceKm ?? 0} km</span>
                  <span>{bid.pickupLabel ?? 'Pickup today'}</span>
                  <span>★ {bid.rating ?? 4.8}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel bid-comparison-panel">
          {comparisonOpen ? (
            <>
              <div className="panel-header compact-header">
                <div>
                  <p className="eyebrow">Compare bids</p>
                  <h3>HIGHEST BID vs BEST MATCH</h3>
                </div>
                <button type="button" className="icon-button" onClick={() => setComparisonOpen(false)} aria-label="Close comparison">
                  <X size={16} />
                </button>
              </div>

              <div className="comparison-grid">
                <div className="comparison-card highlight">
                  <span className="muted-label">Highest Bid</span>
                  <strong>₹{Math.max(...rankedBids.map((bid) => bid.amount)).toLocaleString('en-IN')}</strong>
                  <small>{rankedBids.find((bid) => bid.amount === Math.max(...rankedBids.map((item) => item.amount)))?.bidder}</small>
                </div>
                <div className="comparison-card">
                  <span className="muted-label">Best Match</span>
                  <strong>₹{selectedBid?.amount.toLocaleString('en-IN')}</strong>
                  <small>{selectedBid?.bidder}</small>
                </div>
              </div>

              {selectedBid && (
                <div className="selected-bid-detail">
                  <div className="selected-bid-top">
                    <div>
                      <p className="eyebrow">Selected offer</p>
                      <h3>{selectedBid.bidder}</h3>
                    </div>
                    <span className="status-badge warning">{selectedBid.confidence}</span>
                  </div>

                  <div className="detail-pill-list">
                    <span><CircleDollarSign size={13} /> ₹{selectedBid.amount.toLocaleString('en-IN')}</span>
                    <span><MapPin size={13} /> {selectedBid.distanceKm ?? 0} km</span>
                    <span><ShoppingCart size={13} /> {selectedBid.pickupLabel ?? 'Pickup today'}</span>
                    <span><Gauge size={13} /> ★ {selectedBid.rating ?? 4.8}</span>
                  </div>

                  <div className="detail-action-row">
                    <button type="button" className="primary-cta" onClick={() => onAcceptBid(selectedBid.id)}>
                      Accept recycler
                      <ArrowRight size={15} />
                    </button>
                    <button type="button" className="secondary-cta" onClick={() => setComparisonOpen(false)}>
                      Close comparison
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="comparison-closed">
              <p className="eyebrow">Bid comparison closed</p>
              <h3>Comparison view hidden</h3>
              <button type="button" className="primary-cta" onClick={() => setComparisonOpen(true)}>
                Reopen comparison
              </button>
            </div>
          )}

          {confirmation && (
            <div className="confirmation-box">
              <CheckCircle2 size={18} />
              <div>
                <strong>{confirmation}</strong>
                <span>Schedule Pickup</span>
              </div>
            </div>
          )}

          <div className="selection-status-box">
            <span className="muted-label">Current selection</span>
            <strong>{selectedRecyclerLabel}</strong>
          </div>
        </div>
      </section>
    </div>
  )
}
