import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { MadhubaniCorner } from '../components/art/MadhubaniCorner'
import { MadhubaniPattern } from '../components/art/MadhubaniPattern'
import { useAppStore } from '../store/useAppStore'
import { inspectWasteImage } from '../services/inspectionService'
import { estimateIndicativePrice } from '../services/priceService'

const weightSchema = z.object({
  weightKg: z.preprocess((v) => {
    if (typeof v === 'string') {
      const parsed = v.trim() === '' ? NaN : Number(v)
      return Number.isNaN(parsed) ? v : parsed
    }
    return v
  }, z.number().min(0.1, 'Weight must be greater than 0').max(5000, 'Please enter a realistic weight'))
})

type WeightForm = z.infer<typeof weightSchema>

export function SellEwastePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const sellWorkflowStep = useAppStore((state) => state.sellWorkflowStep)
  const setSellWorkflowStep = useAppStore((state) => state.setSellWorkflowStep)
  const sellImage = useAppStore((state) => state.sellImage)
  const setSellImage = useAppStore((state) => state.setSellImage)
  const setSellInspection = useAppStore((state) => state.setSellInspection)
  const sellInspection = useAppStore((state) => state.sellInspection)
  const sellWeight = useAppStore((state) => state.sellWeight)
  const setSellWeight = useAppStore((state) => state.setSellWeight)
  const createLot = useAppStore((state) => state.createLot)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [estimate, setEstimate] = useState<ReturnType<typeof estimateIndicativePrice> | null>(null)

  const { register, handleSubmit, formState } = useForm<WeightForm>({ resolver: zodResolver(weightSchema) as any, mode: 'onChange' })

  const onPickFile = (file?: File) => {
    setError(null)
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setSellImage(String(reader.result))
    }
    reader.onerror = () => setError('Could not read image')
    reader.readAsDataURL(file)
  }

  const onSelectFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }
    onPickFile(file)
  }

  const useDemoImage = () => {
    setSellImage('/src/assets/hero.png')
  }

  const startInspection = async (forceLow = false) => {
    setError(null)
    if (!sellImage) {
      setError('Please add a photo to continue')
      return
    }
    setProcessing(true)
    setSellWorkflowStep('inspection')
    try {
      const result = await inspectWasteImage(sellImage, { forceLowConfidence: forceLow })
      setSellInspection(result)
      if (forceLow) {
        setEstimate(null)
      }
    } catch (err) {
      setError('Inspection failed — try again')
    } finally {
      setProcessing(false)
    }
  }

  const onRemovePhoto = () => {
    setSellImage(null)
    setSellInspection(null)
    setEstimate(null)
    setSellWorkflowStep('photo')
  }

  const onBackFromWeight = () => {
    setSellWorkflowStep('inspection')
  }

  const onSubmitWeight = (data: WeightForm) => {
    setSellWeight(data.weightKg)
    const nextEstimate = estimateIndicativePrice(sellInspection?.material ?? 'PCB / Computer Board', data.weightKg)
    setEstimate(nextEstimate)
    setSellWorkflowStep('estimate')
  }

  const onCreateLot = () => {
    if (!sellInspection || sellWeight == null) {
      setError('Inspection and weight are required before creating a lot.')
      return
    }

    const estimated = estimate ?? estimateIndicativePrice(sellInspection.material, sellWeight)
    const lotId = `KC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 100).padStart(4, '0')}`
    const lotTitle = `${sellInspection.material} collection lot`

    createLot({
      id: lotId,
      title: lotTitle,
      material: sellInspection.material,
      weightKg: sellWeight,
      basePrice: Math.round(estimated.indicativeMin * 0.9),
      currentBid: estimated.indicativeValue,
      status: 'Bidding Open',
      location: 'Andheri East',
      eta: 'Today, 6:30 PM',
      freshness: 'New lot from seller',
      image: sellImage,
      createdAt: new Date().toISOString(),
      indicativeValue: estimated.indicativeValue
    })

    setSellWorkflowStep('create-lot')
  }

  return (
    <div className="page-shell sell-page">
      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Sell E-waste</p>
            <h3>Create a collection lot</h3>
          </div>
          <div className="tiny-pill">
            Step:
            <strong style={{ marginLeft: 8 }}>{sellWorkflowStep.toUpperCase()}</strong>
          </div>
        </div>

        <div className="sell-flow">
          <div className="sell-left">
            <div className="progress-strip">
              <div className={`step ${sellWorkflowStep === 'photo' ? 'active' : ''}`}>1. Photo</div>
              <div className={`step ${sellWorkflowStep === 'inspection' ? 'active' : ''}`}>2. Inspection</div>
              <div className={`step ${sellWorkflowStep === 'weight' ? 'active' : ''}`}>3. Weight</div>
              <div className={`step ${sellWorkflowStep === 'estimate' ? 'active' : ''}`}>4. Estimate</div>
              <div className={`step ${sellWorkflowStep === 'create-lot' ? 'active' : ''}`}>5. Create Lot</div>
            </div>

            {sellWorkflowStep === 'photo' && (
              <div className="upload-area">
                {!sellImage ? (
                  <div className="upload-empty">
                    <MadhubaniPattern className="hero-pattern" />
                    <p className="eyebrow">Add a photo of the e-waste</p>
                    <h3>Upload or take a photo</h3>
                    <p className="muted">Use a clear, well-lit photo. Only visible features are inspected.</p>

                    <div className="upload-actions">
                      <button className="primary-cta" onClick={() => fileInputRef.current?.click()}>
                        Upload Photo
                      </button>

                      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={onSelectFile} />

                      <button className="secondary-cta" onClick={useDemoImage}>Use Demo Image</button>
                    </div>
                  </div>
                ) : (
                  <div className="upload-preview">
                    <div className="image-frame">
                      <img src={sellImage} alt="Selected" />
                    </div>

                    <div className="preview-actions">
                      <button className="secondary-cta" onClick={() => fileInputRef.current?.click()}>Replace Photo</button>
                      <button className="text-link" onClick={onRemovePhoto}>Remove Photo</button>
                      <div style={{ flex: 1 }} />
                      <button className="primary-cta" onClick={() => startInspection(false)} disabled={processing}>
                        {processing ? 'Inspecting…' : 'Continue'}
                      </button>
                    </div>

                    <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={onSelectFile} />
                  </div>
                )}
                {error && <div className="form-error">{error}</div>}
              </div>
            )}

            {sellWorkflowStep === 'inspection' && (
              <div className="inspection-area">
                {processing && (
                  <div className="processing">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="processing-stage">
                      <strong>Analyzing image…</strong>
                      <p className="muted">Applying visual inspection model (demo)</p>
                    </motion.div>
                    <div className="processing-steps">
                      <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="dot" />
                      <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.3 }} className="dot" />
                      <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} className="dot" />
                    </div>
                  </div>
                )}

                {!processing && sellInspection && (
                  <div className="inspection-result">
                    <div className="result-header">
                      <div>
                        <p className="eyebrow">AI-assisted inspection</p>
                        <h3>{sellInspection.material}</h3>
                      </div>
                      <div className="confidence">
                        <div className="confidence-number">{sellInspection.confidence}%</div>
                        <div className="confidence-meta">{sellInspection.confidence >= 85 ? 'High confidence' : sellInspection.confidence >= 70 ? 'Moderate confidence' : 'Low confidence'}</div>
                      </div>
                    </div>

                    <div className="inspection-body">
                      <div className="inspection-left">
                        <div className="image-frame small">
                          <img src={sellImage ?? '/src/assets/hero.png'} alt="inspection" />
                        </div>

                        <div className="inspection-notes">
                          <strong>Visible condition:</strong>
                          <p>{sellInspection.visibleCondition}</p>

                          <strong>Visible issues:</strong>
                          <ul>
                            {sellInspection.visibleIssues.map((it, idx) => (
                              <li key={idx}>{it}</li>
                            ))}
                          </ul>

                          <p className="muted small">Model: {sellInspection.modelVersion} — simulated result</p>
                        </div>
                      </div>

                      <div className="inspection-right">
                        <div className="important">
                          <MadhubaniCorner className="safety-corner" tone="gold" />
                          <div>
                            <strong>Important</strong>
                            <p>Only visible characteristics are assessed. Internal or hidden condition cannot be determined from this image.</p>
                            <p className="muted small">This is AI-assisted inspection, not a guaranteed or complete evaluation.</p>
                          </div>
                        </div>

                        {sellInspection.confidence < 70 ? (
                          <div className="low-confidence">
                            <strong>Low confidence — manual verification recommended.</strong>
                            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                              <button className="secondary-cta" onClick={() => { onRemovePhoto(); }}>Retake Photo</button>
                              <button className="text-link" onClick={() => startInspection(false)}>Try again</button>
                            </div>
                          </div>
                        ) : (
                          <div className="next-step">
                            <button className="primary-cta" onClick={() => setSellWorkflowStep('weight')}>Enter weight</button>
                            <button className="text-link" onClick={() => { setSellWorkflowStep('photo'); }}>Back</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {!processing && !sellInspection && (
                  <div className="inspection-empty">
                    <p className="muted">No inspection completed yet.</p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                      <button className="primary-cta" onClick={() => startInspection(false)}>Run inspection</button>
                      <button className="secondary-cta" onClick={() => startInspection(true)}>Run low-confidence demo</button>
                      <button className="text-link" onClick={() => setSellWorkflowStep('photo')}>Back</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {sellWorkflowStep === 'weight' && (
              <div className="weight-area">
                <div className="weight-left">
                  <p className="eyebrow">Enter weight</p>
                  <h3>Measured weight (kg)</h3>
                  <p className="muted">Use a scale for accurate weight. This value will be used for price estimation.</p>

                  <form onSubmit={handleSubmit(onSubmitWeight)}>
                    <div className="weight-input">
                      <input
                        inputMode="decimal"
                        {...register('weightKg', { valueAsNumber: true })}
                        placeholder="e.g. 15"
                        className="large-input"
                      />
                      {formState.errors.weightKg && <div className="form-error">{String(formState.errors.weightKg.message)}</div>}
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                      <button type="button" className="secondary-cta" onClick={onBackFromWeight}>Back</button>
                      <button type="submit" className="primary-cta">Continue</button>
                    </div>
                  </form>
                </div>

                <div className="weight-right">
                  <div className="image-frame small">
                    <img src={sellImage ?? '/src/assets/hero.png'} alt="selected" />
                  </div>
                  <div className="muted small">Visible condition: {sellInspection?.visibleCondition ?? '—'}</div>
                  <div style={{ marginTop: 12 }}>
                    <Link to="/dashboard" className="text-link">Cancel and return</Link>
                  </div>
                </div>
              </div>
            )}

            {sellWorkflowStep === 'estimate' && (
              <div className="estimate-area">
                <div className="empty-state-card">
                  <p className="eyebrow">Indicative estimate</p>
                  <h2>AI-assisted price intelligence</h2>
                  <p className="muted">Material + weight analysed with simulated XGBoost pricing logic.</p>

                  {estimate ? (
                    <div className="estimate-card">
                      <div className="price-row">
                        <span className="eyebrow">Indicative value</span>
                        <strong>₹{estimate.indicativeValue.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="price-row small-row">
                        <span>Estimated range</span>
                        <strong>₹{estimate.indicativeMin.toLocaleString('en-IN')}–₹{estimate.indicativeMax.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="price-row small-row">
                        <span>Price/kg</span>
                        <strong>₹{estimate.pricePerKg.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="price-row small-row">
                        <span>Market trend</span>
                        <strong>{estimate.marketTrend}</strong>
                      </div>
                      <div className="price-row small-row">
                        <span>Data freshness</span>
                        <strong>{estimate.dataFreshness}</strong>
                      </div>
                      <div className="price-row small-row">
                        <span>Confidence</span>
                        <strong>{estimate.confidence}%</strong>
                      </div>
                      <p className="muted small" style={{ marginTop: 12 }}>{estimate.uncertainty}</p>
                    </div>
                  ) : (
                    <p className="muted">No estimate available yet.</p>
                  )}

                  <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button className="primary-cta" onClick={onCreateLot}>Create Lot</button>
                    <button className="secondary-cta" onClick={() => setSellWorkflowStep('weight')}>Back</button>
                  </div>
                </div>
              </div>
            )}

            {sellWorkflowStep === 'create-lot' && (
              <div className="estimate-area">
                <div className="empty-state-card">
                  <p className="eyebrow">Lot created</p>
                  <h2>Collection lot is now live</h2>
                  <p className="muted">A new lot has been added to the marketplace and will appear in dashboard activity.</p>
                  <div style={{ marginTop: 16 }}>
                    <Link to="/dashboard" className="primary-cta">Return to Dashboard</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="sell-right">
            <div className="panel">
              <MadhubaniCorner className="safety-corner" tone="green" />
              <h4>AI inspection (demo)</h4>
              <p className="muted small">This inspection is simulated for demo purposes (modelVersion: YOLO11n-demo).</p>

              <div style={{ marginTop: 12 }}>
                <strong>Tips for a good photo</strong>
                <ul className="muted">
                  <li>Place the item on a plain background</li>
                  <li>Avoid heavy shadows</li>
                  <li>Include close-up of visible defects</li>
                </ul>
              </div>
            </div>

            <div className="panel" style={{ marginTop: 12 }}>
              <h4>Recent inspection</h4>
              {sellInspection ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{sellInspection.material}</strong>
                    <span className="muted small">{sellInspection.modelVersion}</span>
                  </div>
                  <div style={{ marginTop: 8 }} className="muted small">Confidence: {sellInspection.confidence}%</div>
                </div>
              ) : (
                <div className="muted">No inspection yet</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
