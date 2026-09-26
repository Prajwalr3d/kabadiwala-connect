import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="page-shell empty-page">
      <div className="empty-state-card">
        <p className="eyebrow">Work in progress</p>
        <h2>{title}</h2>
        <p>
          This route is ready for the next feature pass. The dashboard is the first polished,
          fully interactive page in the app.
        </p>
        <Link to="/dashboard" className="secondary-cta">
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}
