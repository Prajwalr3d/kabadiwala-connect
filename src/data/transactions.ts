import type { Transaction } from '../types'

export const transactions: Transaction[] = [
  {
    id: 'txn-1',
    title: 'Pickup from Andheri',
    amount: 8450,
    time: 'Today, 09:40 AM',
    type: 'Pickup',
    status: 'Completed'
  },
  {
    id: 'txn-2',
    title: 'Copper sale settlement',
    amount: 18620,
    time: 'Yesterday',
    type: 'Settlement',
    status: 'Completed'
  },
  {
    id: 'txn-3',
    title: 'Recycler reward payout',
    amount: 1200,
    time: 'Mon, 04:15 PM',
    type: 'Reward',
    status: 'Pending'
  },
  {
    id: 'txn-4',
    title: 'Cabin fan collection',
    amount: 3400,
    time: 'Sun, 11:00 AM',
    type: 'Pickup',
    status: 'In review'
  }
]
