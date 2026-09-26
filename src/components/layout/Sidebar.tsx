import { BarChart3, BriefcaseBusiness, CircleDollarSign, FileText, House, MapPinned, MessageSquareText, ShieldCheck, ShoppingCart, Users, WalletCards } from 'lucide-react'
import { MadhubaniPattern } from '../art/MadhubaniPattern'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'

const navItems = [
	{ to: '/dashboard', label: 'Dashboard', icon: House },
	{ to: '/sell', label: 'Sell', icon: ShoppingCart },
	{ to: '/marketplace', label: 'Marketplace', icon: BriefcaseBusiness },
	{ to: '/bids', label: 'Bids', icon: CircleDollarSign },
	{ to: '/lots', label: 'Lots', icon: FileText },
	{ to: '/prices', label: 'Prices', icon: BarChart3 },
	{ to: '/earnings', label: 'Earnings', icon: WalletCards },
	{ to: '/transactions', label: 'Transactions', icon: MapPinned },
	{ to: '/safety', label: 'Safety', icon: ShieldCheck },
	{ to: '/voice', label: 'Voice', icon: MessageSquareText },
	{ to: '/profile', label: 'Profile', icon: Users }
]

export function Sidebar() {
	return (
		<aside className="sidebar-shell">
			<div className="brand-block">
				<div className="brand-mark">KC</div>
				<div>
					<p className="eyebrow">Kabadiwala</p>
					<h2>Connect</h2>
				</div>
			</div>

			<nav className="sidebar-nav" aria-label="Sidebar navigation">
				{navItems.map(({ to, label, icon: Icon }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							cn('nav-item', isActive && 'nav-item-active')
						}
					>
						<Icon size={18} />
						<span>{label}</span>
					</NavLink>
				))}
			</nav>

			<div className="sidebar-footer">
				<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<MadhubaniPattern />
					<div>
						<div className="tiny-pill">
							<span className="dot dot-online" />
							Live pickup network
						</div>
						<div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Local partners • Trusted</div>
					</div>
				</div>
			</div>
		</aside>
	)
}
