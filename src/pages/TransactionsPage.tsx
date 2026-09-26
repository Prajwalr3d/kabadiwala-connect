import { useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'

const filterOptions = ['All', 'Completed', 'Pending', 'Review'] as const

type FilterName = typeof filterOptions[number]

export function TransactionsPage() {
  const transactions = useAppStore((state) => state.transactions)
  const [filter, setFilter] = useState<FilterName>('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return transactions
    if (filter === 'Completed') return transactions.filter((item) => item.status === 'Completed')
    if (filter === 'Pending') return transactions.filter((item) => item.status === 'Pending')
    return transactions.filter((item) => item.status === 'In review')
  }, [filter, transactions])

  return (
    <div className="page-shell transactions-page">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Transactions</p>
            <h3>Ledger history</h3>
          </div>
        </div>

        <div className="filter-row">
          {filterOptions.map((value) => (
            <button
              key={value}
              type="button"
              className={`filter-chip ${filter === value ? 'active' : ''}`}
              onClick={() => setFilter(value)}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="transaction-list">
          {filtered.map((txn) => (
            <div key={txn.id} className="transaction-row detail-row">
              <div>
                <strong>{txn.title}</strong>
                <small>{txn.date ?? txn.time}</small>
              </div>
              <div className="transaction-meta">
                <span>{txn.lotId ?? 'LOT-NA'}</span>
                <span>{txn.recycler ?? 'GreenCycle Recycling'}</span>
                <span>{txn.material ?? 'PCB'}</span>
              </div>
              <div className="transaction-amount">₹{txn.amount.toLocaleString('en-IN')}</div>
              <span className={`status-dot ${txn.status === 'Completed' ? 'winning' : txn.status === 'Pending' ? 'pending' : 'outbid'}`}>{txn.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel anomaly-panel">
        <div className="panel-header compact-header">
          <div>
            <p className="eyebrow">Review signal</p>
            <h3>Anomalous pattern</h3>
          </div>
        </div>

        <div className="anomaly-box">
          <div className="alert-tag">Unusual transaction pattern</div>
          <strong>Review recommended</strong>
          <p>Price is unusually high compared with recent transactions.</p>
          <small>This is a review signal, not a fraud verdict.</small>
        </div>
      </section>
    </div>
  )
}
