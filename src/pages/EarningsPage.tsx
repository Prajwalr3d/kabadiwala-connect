import { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAppStore } from '../store/useAppStore'

const earningsTrend = [
  { month: 'Jan', value: 12100 },
  { month: 'Feb', value: 15800 },
  { month: 'Mar', value: 13680 },
  { month: 'Apr', value: 17000 },
  { month: 'May', value: 18850 },
  { month: 'Jun', value: 20400 },
  { month: 'Jul', value: 22420 },
  { month: 'Aug', value: 24800 },
  { month: 'Sep', value: 28250 }
]

export function EarningsPage() {
  const earnings = useAppStore((state) => state.earnings)
  const transactions = useAppStore((state) => state.transactions)

  const recentEarnings = useMemo(() => transactions.filter((item) => item.type === 'Settlement' || item.type === 'Reward' || item.type === 'Sale').slice(0, 5), [transactions])

  return (
    <div className="page-shell earnings-page">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Earnings</p>
            <h3>Collection performance</h3>
          </div>
        </div>

        <div className="earnings-summary-grid">
          <div className="summary-card">
            <span className="muted-label">Total earnings</span>
            <strong>₹{earnings.total.toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-card">
            <span className="muted-label">This week</span>
            <strong>₹{(earnings.thisWeek ?? 12800).toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-card">
            <span className="muted-label">This month</span>
            <strong>₹{(earnings.thisMonth ?? 28250).toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-card">
            <span className="muted-label">Pending</span>
            <strong>₹{earnings.pending.toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-card">
            <span className="muted-label">Completed payments</span>
            <strong>₹{(earnings.completed ?? 31840).toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header compact-header">
          <div>
            <p className="eyebrow">Trend</p>
            <h3>Earnings graph</h3>
          </div>
        </div>

        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={earningsTrend}>
              <defs>
                <linearGradient id="earningsFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1d6a57" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1d6a57" stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#d9d0c7" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Earnings']} />
              <Area type="monotone" dataKey="value" stroke="#1d6a57" fill="url(#earningsFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header compact-header">
          <div>
            <p className="eyebrow">Recent</p>
            <h3>Recent earnings transactions</h3>
          </div>
        </div>

        <div className="transaction-list">
          {recentEarnings.map((txn) => (
            <div key={txn.id} className="transaction-row">
              <div>
                <strong>{txn.title}</strong>
                <small>{txn.date ?? txn.time}</small>
              </div>
              <div className="transaction-type">{txn.type}</div>
              <div className="transaction-amount">₹{txn.amount.toLocaleString('en-IN')}</div>
              <span className={`status-dot ${txn.status === 'Completed' ? 'winning' : txn.status === 'Pending' ? 'pending' : 'outbid'}`}>{txn.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
