import { BatteryCharging, Cable, Cpu, ShieldAlert, Volume2 } from 'lucide-react'

const guidance = [
  {
    title: 'Batteries',
    danger: 'High risk',
    icon: BatteryCharging,
    doList: ['Keep in a sealed container', 'Store away from heat', 'Use insulated gloves'],
    dontList: ['Do not puncture', 'Do not stack with metals', 'Do not leave in sunlight'],
    explanation: 'Battery packs can leak, short, or ignite if damaged or compressed.'
  },
  {
    title: 'CRT',
    danger: 'Glass hazard',
    icon: Cpu,
    doList: ['Handle with a flat surface', 'Wear cut-resistant gloves', 'Keep upright'],
    dontList: ['Do not carry by the neck', 'Do not hit or shake', 'Do not stack heavily'],
    explanation: 'CRT units contain leaded glass and can shatter if handled awkwardly.'
  },
  {
    title: 'PCB',
    danger: 'Electrical risk',
    icon: Cpu,
    doList: ['Separate from liquids', 'Use anti-static gloves', 'Keep on dry trays'],
    dontList: ['Do not bend or scrape', 'Do not touch exposed contacts', 'Do not mix with general scrap'],
    explanation: 'Printed circuit boards include embedded components and residual charge.'
  },
  {
    title: 'Cables',
    danger: 'Cut risk',
    icon: Cable,
    doList: ['Coil neatly', 'Check for exposed copper', 'Seal sharp ends'],
    dontList: ['Do not pull by wire', 'Do not leave loose ends', 'Do not store with heavy equipment'],
    explanation: 'Copper cables can cut skin and hide exposed conductors.'
  }
]

export function SafetyPage() {
  return (
    <div className="page-shell safety-page">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Safety center</p>
            <h3>Handling guidance</h3>
          </div>
        </div>

        <div className="safety-grid">
          {guidance.map(({ title, danger, icon: Icon, doList, dontList, explanation }) => (
            <article key={title} className="safety-card">
              <div className="safety-title-row">
                <div className="safety-icon-wrap"><Icon size={20} /></div>
                <div>
                  <h4>{title}</h4>
                  <span className="danger-pill">{danger}</span>
                </div>
              </div>

              <p className="safety-explainer">{explanation}</p>

              <div className="safety-list-block">
                <strong>DO</strong>
                <ul>
                  {doList.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div className="safety-list-block">
                <strong>DON'T</strong>
                <ul>
                  {dontList.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <button type="button" className="secondary-cta audio-button">
                <Volume2 size={14} /> Audio alert
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel safety-panel">
        <div className="panel-header compact-header">
          <div>
            <p className="eyebrow">Checklist</p>
            <h3>Site safety notes</h3>
          </div>
          <ShieldAlert size={16} />
        </div>

        <div className="safety-list">
          <div className="safety-item">
            <strong>Insulated gloves</strong>
            <p>Required for handling battery packs, circuit boards, and cable bundles.</p>
          </div>
          <div className="safety-item">
            <strong>Ventilated storage</strong>
            <p>Store e-waste in dry, shaded areas away from ignition sources.</p>
          </div>
          <div className="safety-item">
            <strong>Handwritten lot tags</strong>
            <p>Attach labels with material type, weight, and collector ID before dispatch.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
