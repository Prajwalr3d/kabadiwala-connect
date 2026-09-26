import { ShieldCheck, SlidersHorizontal, Sparkles, UserRound } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export function ProfilePage() {
  const language = useAppStore((state) => state.language)
  const online = useAppStore((state) => state.online)
  const pendingSyncQueue = useAppStore((state) => state.pendingSyncQueue)
  const resetDemoState = useAppStore((state) => state.resetDemoState)

  return (
    <div className="page-shell">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Profile</p>
            <h3>Collector account</h3>
          </div>
        </div>

        <div className="profile-layout">
          <div className="profile-card-highlight">
            <div className="avatar large-avatar">RK</div>
            <div>
              <h3>Riya K.</h3>
              <p>Collection partner • Mumbai</p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="summary-card">
              <span className="muted-label">Language</span>
              <strong>{language.toUpperCase()}</strong>
            </div>
            <div className="summary-card">
              <span className="muted-label">Connection</span>
              <strong>{online ? 'Online' : 'Offline'}</strong>
            </div>
            <div className="summary-card">
              <span className="muted-label">Sync queue</span>
              <strong>{pendingSyncQueue.length} items</strong>
            </div>
            <div className="summary-card">
              <span className="muted-label">Trust score</span>
              <strong>96%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header compact-header">
          <div>
            <p className="eyebrow">Settings</p>
            <h3>Account controls</h3>
          </div>
        </div>

        <div className="settings-list">
          <div className="setting-row">
            <div><UserRound size={16} /> Personal details</div>
            <span>Updated 2 days ago</span>
          </div>
          <div className="setting-row">
            <div><SlidersHorizontal size={16} /> Notification preferences</div>
            <span>Enabled</span>
          </div>
          <div className="setting-row">
            <div><ShieldCheck size={16} /> Verification status</div>
            <span>Verified</span>
          </div>
          <div className="setting-row warning-row">
            <div><Sparkles size={16} /> Demo reset</div>
            <button type="button" className="secondary-cta" onClick={resetDemoState}>Reset demo</button>
          </div>
        </div>
      </section>
    </div>
  )
}
