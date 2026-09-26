import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  return (
    <div className="app-shell">
      
      <Sidebar />
      <div className="content-panel">
        <Header onMobileMenuToggle={() => setMobileNavOpen((value) => !value)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </div>
  )
}
