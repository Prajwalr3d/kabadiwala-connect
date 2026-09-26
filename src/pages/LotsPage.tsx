import { useMemo, useState } from 'react'
import { CheckCircle2, MapPin, PackageCheck, Truck } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const lotTimeline = ['Created', 'AI Inspected', 'Bidding Open', 'Recycler Selected', 'Pickup Scheduled', 'Handed Over', 'Payment Completed']

export function LotsPage() {
  const lots = useAppStore((state) => state.lots)
  const selectedRecycler = useAppStore((state) => state.selectedRecycler)
  const advanceLotStatus = useAppStore((state) => state.advanceLotStatus)
  const confirmHandover = useAppStore((state) => state.confirmHandover)
  const completePayment = useAppStore((state) => state.completePayment)

  const activeLot = lots[0]
  const [handoverNote, setHandoverNote] = useState<string | null>(null)

  const currentStepIndex = useMemo(() => {
    if (!activeLot) return 0
    return lotTimeline.indexOf(activeLot.status)
  }, [activeLot])

  const onAdvance = () => {
    if (!activeLot) return
    const nextStatus = lotTimeline[Math.min(currentStepIndex + 1, lotTimeline.length - 1)] as any
    advanceLotStatus(activeLot.id, nextStatus)
  }

  const onConfirmHandover = () => {
    if (!activeLot) return
    confirmHandover(activeLot.id)
    setHandoverNote(`Handover reference: HC-${activeLot.id.slice(-4)}-${Date.now().toString().slice(-4)}`)
  }

  const onCompletePayment = () => {
    if (!activeLot) return
    completePayment(activeLot.id)
  }

  return (
    <div className="page-shell lots-page">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Lot tracking</p>
            <h3>Collection lifecycle</h3>
          </div>
          <button type="button" className="primary-cta" onClick={onAdvance}>Advance status</button>
        </div>

        <div className="lot-detail-grid">
          <div className="summary-card">
            <span className="muted-label">Lot ID</span>
            <strong>{activeLot?.id ?? 'LOT #KC-2026-0187'}</strong>
          </div>
          <div className="summary-card">
            <span className="muted-label">Material</span>
            <strong>{activeLot?.material ?? 'PCB / Computer Boards'}</strong>
          </div>
          <div className="summary-card">
            <span className="muted-label">Weight</span>
            <strong>{activeLot?.weightKg ?? 15} kg</strong>
          </div>
          <div className="summary-card">
            <span className="muted-label">AI indicative value</span>
            <strong>₹{(activeLot?.indicativeValue ?? 4200).toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-card wide-card">
            <span className="muted-label">Selected recycler</span>
            <strong>{selectedRecycler?.name ?? 'Awaiting recycler selection'}</strong>
          </div>
          <div className="summary-card wide-card">
            <span className="muted-label">Current status</span>
            <strong>{activeLot?.status ?? 'Bidding Open'}</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header compact-header">
          <div>
            <p className="eyebrow">Timeline</p>
            <h3>Progress stages</h3>
          </div>
          <PackageCheck size={16} />
        </div>

        <div className="timeline">
          {lotTimeline.map((stage, index) => (
            <div key={stage} className={`timeline-step ${index <= currentStepIndex ? 'completed' : ''}`}>
              <div className="timeline-dot" />
              <div className="timeline-copy">
                <strong>{stage}</strong>
                {index === currentStepIndex && <small>Current step</small>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel handover-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Digital handover</p>
            <h3>Confirm collection transfer</h3>
          </div>
        </div>

        <div className="handover-card">
          <div className="handover-meta-row">
            <span><PackageCheck size={14} /> {activeLot?.id ?? 'LOT #KC-2026-0187'}</span>
            <span><Truck size={14} /> {selectedRecycler?.name ?? 'Recycler not assigned'}</span>
          </div>
          <div className="handover-meta-row">
            <span>{activeLot?.material ?? 'PCB'} · {activeLot?.weightKg ?? 15} kg</span>
            <span>{new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
          </div>
          <div className="handover-meta-row">
            <span><MapPin size={14} /> Andheri East</span>
            <span>Ref: {handoverNote ? handoverNote.split(': ')[1] : 'HR-2026-1284'}</span>
          </div>

          <div className="detail-action-row">
            <button type="button" className="primary-cta" onClick={onConfirmHandover}>
              Confirm Handover
            </button>
            <button type="button" className="secondary-cta" onClick={onCompletePayment}>
              Complete Payment
            </button>
          </div>

          {handoverNote && <div className="success-strip"><CheckCircle2 size={14} /> {handoverNote}</div>}
        </div>
      </section>
    </div>
  )
}
