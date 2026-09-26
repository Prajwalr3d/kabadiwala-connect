import { NavLink } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/sell', label: 'Sell' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/bids', label: 'Bids' },
  { to: '/lots', label: 'Lots' },
  { to: '/prices', label: 'Prices' },
  { to: '/earnings', label: 'Earnings' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/safety', label: 'Safety' },
  { to: '/voice', label: 'Voice' },
  { to: '/profile', label: 'Profile' }
]

type MobileNavProps = {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  if (!open) return null

  return (
    <div className="mobile-nav-backdrop" onClick={onClose} role="presentation">
      <div className="mobile-nav-panel" onClick={(event) => event.stopPropagation()}>
        <div className="mobile-nav-header">
          <div>
            <p className="eyebrow">Navigate</p>
            <h3>Categories</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close menu">
            ×
          </button>
        </div>

        <nav className="mobile-nav-list">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => cn('mobile-nav-item', isActive && 'mobile-nav-item-active')}
            >
              <span>{label}</span>
              <ArrowRight size={14} />
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
