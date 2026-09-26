import { create } from 'zustand'
import { bids } from '../data/bids'
import { earnings } from '../data/earnings'
import { lots } from '../data/lots'
import { marketRates } from '../data/prices'
import { recyclers } from '../data/recyclers'
import { safetyReminders } from '../data/safety'
import { transactions } from '../data/transactions'
import type { AppStoreState, LotStatus } from '../types'

export const useAppStore = create<AppStoreState>((set) => ({
  language: 'en',
  online: true,
  pendingSyncQueue: [],
  notifications: [
    {
      id: 'n1',
      title: 'Bid accepted',
      message: 'Aarav Metals has matched your quote for mixed PCB lots.',
      time: '2 mins ago',
      read: false
    },
    {
      id: 'n2',
      title: 'Pickup assigned',
      message: 'GreenLoop Recycling will collect 46 kg from Andheri East today.',
      time: '18 mins ago',
      read: true
    },
    {
      id: 'n3',
      title: 'Market update',
      message: 'Copper rates are trending upward by 6.2% this week.',
      time: '1 hour ago',
      read: false
    }
  ],
  selectedRecycler: recyclers[0],
  lots,
  bids,
  transactions,
  earnings,
  marketRates,
  recyclers,
  safetyReminders,
  sellWorkflowStep: 'photo',
  sellImage: null,
  sellInspection: null,
  sellWeight: null,

  setLanguage: (language) => set({ language }),
  setOnline: (online) => set({ online }),
  queueSyncItem: (label) =>
    set((state) => ({
      pendingSyncQueue: [...state.pendingSyncQueue, label]
    })),
  clearSyncQueue: () => set({ pendingSyncQueue: [] }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          id: notification.id ?? `n-${Date.now()}`,
          title: notification.title,
          message: notification.message,
          time: notification.time,
          read: notification.read ?? false,
          route: notification.route
        },
        ...state.notifications
      ]
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    })),
  setSelectedRecycler: (id) =>
    set((state) => ({
      selectedRecycler: state.recyclers.find((recycler) => recycler.id === id) ?? null
    })),
  selectRecyclerForLot: (recyclerId, lotId) =>
    set((state) => {
      const recycler = state.recyclers.find((item) => item.id === recyclerId) ?? null
      const selectedLotId = lotId ?? state.lots[0]?.id ?? null

      return {
        selectedRecycler: recycler,
        lots: state.lots.map((lot) =>
          lot.id === selectedLotId
            ? { ...lot, status: 'Recycler Selected', currentBid: recycler?.currentBid ?? lot.currentBid }
            : lot
        )
      }
    }),
  addBid: (bid) =>
    set((state) => ({
      bids: [bid, ...state.bids]
    })),
  advanceLotStatus: (lotId, status) =>
    set((state) => ({
      lots: state.lots.map((lot) =>
        lot.id === lotId ? { ...lot, status: status as LotStatus } : lot
      )
    })),
  confirmHandover: (lotId) =>
    set((state) => ({
      lots: state.lots.map((lot) =>
        lot.id === lotId
          ? {
              ...lot,
              status: 'Handed Over',
              handoverReference: `HC-${lot.id.slice(-4)}-${Date.now().toString().slice(-4)}`,
              handoverAt: new Date().toISOString()
            }
          : lot
      )
    })),
  completePayment: (lotId) =>
    set((state) => ({
      lots: state.lots.map((lot) =>
        lot.id === lotId
          ? {
              ...lot,
              status: 'Payment Completed',
              paymentAt: new Date().toISOString()
            }
          : lot
      ),
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: 'Payment completed',
          message: `Settlement for ${lotId} has been recorded and sent for reconciliation.`,
          time: 'Just now',
          read: false,
          route: '/earnings'
        },
        ...state.notifications
      ],
      transactions: [
        {
          id: `txn-${Date.now()}`,
          title: 'Settlement cleared',
          amount: state.lots.find((lot) => lot.id === lotId)?.currentBid ?? 0,
          time: 'Just now',
          type: 'Settlement',
          status: 'Completed',
          lotId,
          recycler: state.selectedRecycler?.name ?? 'GreenLoop Recycling',
          material: state.lots.find((lot) => lot.id === lotId)?.material ?? 'PCB',
          date: new Date().toISOString().slice(0, 10)
        },
        ...state.transactions
      ]
    })),
  setSellWorkflowStep: (step) => set({ sellWorkflowStep: step }),
  setSellImage: (image) => set({ sellImage: image }),
  setSellInspection: (inspection) => set({ sellInspection: inspection }),
  setSellWeight: (weight) => set({ sellWeight: weight }),
  resetSellWorkflow: () =>
    set({
      sellWorkflowStep: 'photo',
      sellImage: null,
      sellInspection: null,
      sellWeight: null
    }),
  resetDemoState: () =>
    set(() => ({
      language: 'en',
      online: true,
      pendingSyncQueue: [],
      notifications: [
        {
          id: 'n1',
          title: 'Bid accepted',
          message: 'Aarav Metals has matched your quote for mixed PCB lots.',
          time: '2 mins ago',
          read: false
        },
        {
          id: 'n2',
          title: 'Pickup assigned',
          message: 'GreenLoop Recycling will collect 46 kg from Andheri East today.',
          time: '18 mins ago',
          read: true
        },
        {
          id: 'n3',
          title: 'Market update',
          message: 'Copper rates are trending upward by 6.2% this week.',
          time: '1 hour ago',
          read: false
        }
      ],
      selectedRecycler: recyclers[0],
      lots,
      bids,
      transactions,
      earnings,
      marketRates,
      recyclers,
      safetyReminders,
      sellWorkflowStep: 'photo',
      sellImage: null,
      sellInspection: null,
      sellWeight: null
    })),
  createLot: (lot) =>
    set((state) => ({
      lots: [lot, ...state.lots],
      bids: [
        {
          id: `bid-${Date.now()}`,
          bidder: 'Market Pool',
          amount: lot.currentBid,
          when: 'Just now',
          confidence: 'Opening bid',
          status: 'Pending',
          recyclerId: state.selectedRecycler?.id,
          pricePerKg: Number((lot.currentBid / Math.max(lot.weightKg, 1)).toFixed(1)),
          distanceKm: state.selectedRecycler?.distanceKm ?? 7.2,
          pickupLabel: state.selectedRecycler?.pickupWindow ?? 'Pickup today',
          rating: state.selectedRecycler?.rating ?? 4.8,
          location: state.selectedRecycler?.locationName ?? 'Andheri East',
          acceptedMaterials: state.selectedRecycler?.acceptedMaterials ?? [lot.material]
        },
        ...state.bids
      ]
    }))
}))
