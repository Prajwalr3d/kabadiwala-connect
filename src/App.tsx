import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { SellEwastePage } from './pages/SellEwastePage'
import { MarketplacePage } from './pages/MarketplacePage'
import { BidsPage } from './pages/BidsPage'
import { LotsPage } from './pages/LotsPage'
import { EarningsPage } from './pages/EarningsPage'
import { TransactionsPage } from './pages/TransactionsPage'
import { SafetyPage } from './pages/SafetyPage'
import { VoicePage } from './pages/VoicePage'
import { ProfilePage } from './pages/ProfilePage'
import 'leaflet/dist/leaflet.css'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sell" element={<SellEwastePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/bids" element={<BidsPage />} />
          <Route path="/lots" element={<LotsPage />} />
          <Route path="/prices" element={<PlaceholderPage title="Prices" />} />
          <Route path="/earnings" element={<EarningsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/voice" element={<VoicePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
