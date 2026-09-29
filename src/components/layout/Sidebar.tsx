import { BarChart3, BriefcaseBusiness, CircleDollarSign, FileText, House, MapPinned, MapPin, MessageSquareText, ShieldCheck, ShoppingCart, Users, WalletCards } from 'lucide-react'
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
				<div className="network-card">
					<div className="network-icon">
						<MapPin size={14} />
					</div>
					<div className="network-copy">
						<div className="tiny-pill">
							<span className="dot dot-online" />
							Live pickup network
						</div>
						<div className="network-subtext">Local partners · Trusted</div>
					</div>
				</div>
			</div>
		</aside>
	)
}
