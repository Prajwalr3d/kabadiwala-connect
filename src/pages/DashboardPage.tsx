import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, ChevronRight, MapPin, ShieldAlert, Sparkles, TrendingUp, Truck, Wallet } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const trendData = [
  { name: 'Mon', value: 132 },
  { name: 'Tue', value: 148 },
  { name: 'Wed', value: 160 },
  { name: 'Thu', value: 154 },
  { name: 'Fri', value: 174 },
  { name: 'Sat', value: 188 },
  { name: 'Sun', value: 196 }
]

const marketBoardTrend = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 136 },
  { name: 'Wed', value: 142 },
  { name: 'Thu', value: 138 },
  { name: 'Fri', value: 154 },
  { name: 'Sat', value: 168 },
  { name: 'Sun', value: 182 }
]

const marketBoardItems = [
  { material: 'PCB / Circuit Boards', price: 420, change: 6.2, trend: 'up' },
  { material: 'Copper', price: 680, change: 3.8, trend: 'up' },
  { material: 'Aluminium', price: 145, change: 1.4, trend: 'up' },
  { material: 'Mixed E-Waste', price: 82, change: 0.8, trend: 'down' }
] as const

export function DashboardPage() {
  const marketRates = useAppStore((s) => s.marketRates)
  const lots = useAppStore((s) => s.lots)
  const bids = useAppStore((s) => s.bids)
  const transactions = useAppStore((s) => s.transactions)
  const earnings = useAppStore((s) => s.earnings)
  const recyclers = useAppStore((s) => s.recyclers)
  const safetyReminders = useAppStore((s) => s.safetyReminders) || []

  const activeLot = lots[0]
  const selectedRecycler = recyclers[0]
  const monthGoalProgress = Math.min((earnings.total / earnings.target) * 100, 100)

  return (
    <div className="page-shell dashboard-page">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="hero-panel">
        <div className="hero-art-illustration">
          <div className="hero-network">
            <div className="network-header">
              <div className="network-icon-badge">
                <MapPin size={16} />
              </div>
              <span className="tiny-tag compact-tag">Your recycling network</span>
            </div>

            <div className="network-main">
              <h3>Live pickup network</h3>
              <p>3 trusted partners nearby</p>
            </div>

            <div className="network-meta">
              <div className="network-meta-item">
                <Truck size={14} />
                <span>Pickup available</span>
              </div>
              <div className="network-meta-item">
                <BadgeCheck size={14} />
                <span>Local partners · Trusted</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-content hero-content-ivory">
          <div className="hero-badge">
            <Sparkles size={14} />
            Earnings pulse: +12.4%
          </div>
          <h2>Namaste, Riya.</h2>
          <p>
            Turn your e-waste into better value — a trusted marketplace grounded in local
            knowledge and craftsmanship.
          </p>

          <div className="cta-row">
            <Link to="/sell" className="primary-cta">
              Sell E-waste
              <ArrowRight size={18} />
            </Link>
            <Link to="/marketplace" className="secondary-cta">
              Find Recycler
            </Link>
          </div>
        </div>
      </motion.section>

      <section className="dashboard-grid">
        <div className="content-stack">
          <div className="panel market-board-panel">
            <div className="panel-header market-board-header">
              <div>
                <p className="eyebrow">Today’s market</p>
                <h3>Today’s market</h3>
              </div>
              <Link to="/marketplace" className="text-link">
                View price board <ChevronRight size={14} />
              </Link>
            </div>

            <p className="market-subtitle">Indicative local rates · Updated today</p>

            <div className="market-board-list">
              {marketBoardItems.map((item) => (
                <div key={item.material} className="market-row">
                  <div className="market-row-name">
                    <span className="material-dot" aria-hidden="true" />
                    <span>{item.material}</span>
                  </div>

                  <div className="market-row-price">
                    <strong>₹{item.price.toLocaleString('en-IN')}/kg</strong>
                    <span className={`trend-pill ${item.trend}`}>
                      {item.trend === 'up' ? '↑' : '↓'} {item.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="market-chart-card">
              <div className="market-chart-meta">Market trend</div>
              <div className="mini-chart-wrap">
                <ResponsiveContainer width="100%" height={110}>
                  <AreaChart data={marketBoardTrend}>
                    <defs>
                      <linearGradient id="marketBoardFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#174F3D" stopOpacity={0.22} />
                        <stop offset="100%" stopColor="#174F3D" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#174F3D" strokeWidth={2.5} fill="url(#marketBoardFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="panel rates-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Market snapshot</p>
                <h3>Today’s indicative market rates</h3>
              </div>
              <button type="button" className="text-link">
                Open price board <ChevronRight size={14} />
              </button>
            </div>

            <div className="rate-grid">
              {marketRates.map((rate) => (
                <motion.article key={rate.id} whileHover={{ y: -3 }} className="rate-card">
                  <div className="rate-topline">
                    <span>{rate.material}</span>
                    <span className={`trend-pill ${rate.trend}`}>{rate.change > 0 ? '+' : ''}{rate.change}%</span>
                  </div>
                  <div className="rate-value">
                    ₹{rate.ratePerKg.toLocaleString('en-IN')}
                    <small>/{rate.unit.replace('₹/', '')}</small>
                  </div>
                  <p>{rate.signal}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="panel chart-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Earnings trend</p>
                <h3>Price movement</h3>
              </div>
              <div className="trend-meta">
                <TrendingUp size={16} />
                +18.2% this week
              </div>
            </div>

            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#d27d4a" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#d27d4a" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e3d5c4" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#b35c35" fill="url(#areaFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel lot-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Live lot</p>
                <h3>{activeLot.title}</h3>
              </div>
              <span className="status-badge success">{activeLot.status}</span>
            </div>

            <div className="lot-meta">
              <span>{activeLot.material}</span>
              <span>{activeLot.location}</span>
            </div>

            <div className="price-stack">
              <div>
                <label>Current bid</label>
                <strong>₹{activeLot.currentBid.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <label>Weight</label>
                <strong>{activeLot.weightKg} kg</strong>
              </div>
            </div>

            <div className="lot-footer">
              <div>
                <Truck size={14} />
                <span>{activeLot.eta}</span>
              </div>
              <span>{activeLot.freshness}</span>
            </div>
          </div>
        </div>

        <div className="side-stack">
          <div className="panel bid-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Top bids</p>
                <h3>Market demand</h3>
              </div>
              <button type="button" className="text-link">
                View all <ChevronRight size={14} />
              </button>
            </div>

            <div className="bid-list">
              {bids.map((bid) => (
                <div key={bid.id} className="bid-item">
                  <div className="bid-head">
                    <strong>{bid.bidder}</strong>
                    <span className={`status-dot ${bid.status.toLowerCase()}`}>{bid.status}</span>
                  </div>
                  <div className="bid-info">
                    <span>₹{bid.amount.toLocaleString('en-IN')}</span>
                    <span>{bid.when}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel earnings-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">This month</p>
                <h3>Monthly earnings</h3>
              </div>
              <Wallet size={16} />
            </div>

            <div className="money-ring">
              <div className="ring-inner">
                <div>
                  <strong>{Math.round(monthGoalProgress)}%</strong>
                  <span>Goal</span>
                </div>
              </div>
            </div>

            <div className="earning-stats">
              <div>
                <label>Collected</label>
                <strong>₹{earnings.total.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <label>Pending</label>
                <strong>₹{earnings.pending.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          <div className="panel recycler-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Nearby recycler</p>
                <h3>{selectedRecycler.name}</h3>
              </div>
              <BadgeCheck size={16} />
            </div>

            <div className="recycler-card">
              <div className="recycler-card-header">
                <div>
                  <span className="tiny-tag">{selectedRecycler.kind}</span>
                  <strong>{selectedRecycler.distanceKm} km away</strong>
                </div>
                <span className="star-rating">★ {selectedRecycler.rating}</span>
              </div>

              <div className="recycler-meta">
                <span>Trust score: {selectedRecycler.trustScore}%</span>
                <span>{selectedRecycler.capacity}</span>
              </div>

              <button type="button" className="secondary-cta full-width">
                Book collection
              </button>
            </div>
          </div>

          <div className="panel safety-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Safety reminder</p>
                <h3>Checklist</h3>
              </div>
              <ShieldAlert size={16} />
            </div>

            <div className="safety-list">
              {safetyReminders.map((item) => (
                <div key={item.id} className="safety-item">
                  <div className="safety-icon" aria-hidden="true">
                    <ShieldAlert size={16} />
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="panel transactions-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Recent activity</p>
            <h3>Transactions</h3>
          </div>
          <Link to="/transactions" className="text-link">
            Open ledger <ChevronRight size={14} />
          </Link>
        </div>

        <div className="transaction-table">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-row">
              <div className="transaction-main">
                <strong>{transaction.title}</strong>
                <small>{transaction.time}</small>
              </div>

              <div className="transaction-amount-block">
                <span className="transaction-type">{transaction.type}</span>
                <strong className="transaction-amount">₹{transaction.amount.toLocaleString('en-IN')}</strong>
              </div>

              <span className={`status-badge ${transaction.status === 'Completed' ? 'success' : transaction.status === 'Pending' ? 'warning' : 'neutral'}`}>
                {transaction.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
