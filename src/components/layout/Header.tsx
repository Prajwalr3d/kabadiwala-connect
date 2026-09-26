import { Bell, ChevronDown, Globe, PanelLeftClose, Wifi, WifiOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { cn } from '../../lib/utils'

type HeaderProps = {
  onMobileMenuToggle?: () => void
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const language = useAppStore((s) => s.language)
  const online = useAppStore((s) => s.online)
  const notifications = useAppStore((s) => s.notifications)
  const setLanguage = useAppStore((s) => s.setLanguage)
  const setOnline = useAppStore((s) => s.setOnline)
  const markNotificationRead = useAppStore((s) => s.markNotificationRead)

  const unreadCount = notifications?.filter((item) => !item.read).length ?? 0

  const onLanguageCycle = () => {
    const nextLanguage = language === 'en' ? 'hi' : language === 'hi' ? 'mr' : 'en'
    setLanguage(nextLanguage)
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="icon-button mobile-menu-button"
          onClick={onMobileMenuToggle}
          aria-label="Open navigation"
        >
          <PanelLeftClose size={18} />
        </button>

        <div className="page-title-block">
          <p className="eyebrow">Today</p>
          <h1>Kabadiwala Connect</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <button type="button" className="language-select" onClick={onLanguageCycle} aria-label="Toggle language">
          <Globe size={16} />
          <span>{language.toUpperCase()}</span>
          <ChevronDown size={14} />
        </button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          className="icon-button notification-button"
          aria-label="Notifications"
          onClick={() => notifications.filter((item) => !item.read).forEach((item) => markNotificationRead(item.id))}
        >
          <Bell size={17} />
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </motion.button>

        <button type="button" className={cn('status-pill', online ? 'status-online' : 'status-offline')} onClick={() => setOnline(!online)}>
          {online ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{online ? 'Online' : 'Offline'}</span>
        </button>

        <button type="button" className="profile-chip">
          <div className="avatar">RK</div>
          <div className="profile-meta">
            <strong>Riya</strong>
            <span>Collector</span>
          </div>
        </button>
      </div>
    </header>
  )
}
