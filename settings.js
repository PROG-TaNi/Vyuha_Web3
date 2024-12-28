'use client'

import { useState, ChangeEvent } from 'react'
import * as Lucide from 'lucide-react'

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activePage, setActivePage] = useState('Settings')
  const [settingsState, setSettingsState] = useState({
    darkMode: false,
    pushNotifications: true,
    autoTranslation: false,
    privacyMode: false,
    twoFactor: false,
    mobileNotifications: true,
    emailNotifications: true,
    onlineStatus: true,
  })
  const [profilePic, setProfilePic] = useState('TN')
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    setSettingsState(prev => ({ ...prev, darkMode: !prev.darkMode }))
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const navigation = [
    { name: 'Home', icon: 'Home' },
    { name: 'Contract', icon: 'FileText' },
    { name: 'Connect', icon: 'Link2' },
    { name: 'Profile', icon: 'User' },
    { name: 'Chat', icon: 'MessageCircle' },
    { name: 'Settings', icon: 'Settings' },
  ]

  const settingsOptions = [
    { icon: 'Moon', label: 'Dark Mode', id: 'darkMode', action: toggleDarkMode },
    { icon: 'Bell', label: 'Push Notifications', id: 'pushNotifications' },
    { icon: 'Globe', label: 'Enable Auto-Translation', id: 'autoTranslation' },
    { icon: 'Shield', label: 'Enhanced Privacy Mode', id: 'privacyMode' },
    { icon: 'Key', label: 'Two-Factor Authentication', id: 'twoFactor' },
    { icon: 'Smartphone', label: 'Mobile Notifications', id: 'mobileNotifications' },
    { icon: 'Mail', label: 'Email Notifications', id: 'emailNotifications' },
    { icon: 'Eye', label: 'Show Online Status', id: 'onlineStatus' },
  ]

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    sidebar: {
      width: '240px',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '24px',
      height: '100vh',
      position: 'fixed',
      overflowY: 'auto',
      left: 0,
      top: 0,
    },
    sidebarLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '24px',
      fontSize: '30px',
      fontWeight: 600,
    },
    logoIcon: {
      width: '70px',
      height: '70px',
      backgroundColor: '#000000',
      color: '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px',
      fontWeight: 600,
      marginLeft: '20px',
    },
    addButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#343840',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '24px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    addButtonHover: {
      backgroundColor: '#4a5568',
    },
    navSection: {
      marginBottom: '24px',
    },
    navLabel: {
      fontSize: '12px',
      color: '#6b7280',
      marginBottom: '12px',
      fontWeight: 600,
      letterSpacing: '10px',
    },
    navButton: {
      width: '100%',
      padding: '10px 12px',
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px',
      transition: 'all 0.2s',
      height: '50px',
      fontSize: '16px',
    },
    navButtonHover: {
      backgroundColor: '#4a5568',
    },
    activeNavButton: {
      backgroundColor: '#4F46E5',
    },
    main: {
      marginLeft: '240px',
      padding: '24px',
      flex: 1,
    },
    settingsCard: {
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    profileCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: isDarkMode ? '#2d3748' : '#f3f4f6',
      borderRadius: '8px',
    },
    avatar: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: '#4F46E5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '24px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s, background-image 0.2s',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    avatarHover: {
      backgroundColor: '#5a67d8',
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    profileName: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    profileEmail: {
      fontSize: '14px',
      color: isDarkMode ? '#a0aec0' : '#6b7280',
    },
    settingItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    settingLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    switch: {
      position: 'relative',
      display: 'inline-block',
      width: '44px',
      height: '24px',
    },
    switchInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    switchSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: '0.4s',
      borderRadius: '24px',
    },
    switchSliderChecked: {
      backgroundColor: '#4F46E5',
    },
    switchSliderBefore: {
      position: 'absolute',
      content: '""',
      height: '20px',
      width: '20px',
      left: '2px',
      bottom: '2px',
      backgroundColor: 'white',
      transition: '0.4s',
      borderRadius: '50%',
    },
    switchSliderCheckedBefore: {
      transform: 'translateX(20px)',
    },
    accountActions: {
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid #e5e7eb',
    },
    button: {
      width: '100%',
      padding: '10px',
      marginBottom: '8px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.2s',
    },
    addAccountButton: {
      backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    addAccountButtonHover: {
      backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
    },
    signOutButton: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
    },
    signOutButtonHover: {
      backgroundColor: '#dc2626',
    },
  }

  const handleToggle = (id: string) => {
    setSettingsState(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleProfilePicUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePicUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={styles.logoIcon}>V</div>
          <span>Vyuha</span>
        </div>
        <button 
          style={styles.addButton}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.addButtonHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.addButton)}
        >
          <Lucide.Plus size={20} />
          Add New
        </button>
        <nav style={styles.navSection}>
          <div style={styles.navLabel}>PAGES</div>
          {navigation.map((item) => {
            const Icon = Lucide[item.icon]
            return (
              <button
                key={item.name}
                style={{
                  ...styles.navButton,
                  ...(activePage === item.name ? styles.activeNavButton : {}),
                }}
                onMouseEnter={(e) => {
                  if (activePage !== item.name) {
                    Object.assign(e.currentTarget.style, styles.navButtonHover)
                  }
                }}
                onMouseLeave={(e) => {
                  if (activePage !== item.name) {
                    Object.assign(e.currentTarget.style, styles.navButton)
                  }
                }}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={20} />
                {item.name}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Settings</h1>
        <div style={styles.settingsCard}>
          {/* Profile Card */}
          <div style={styles.profileCard}>
            <div 
              style={{
                ...styles.avatar,
                ...(profilePicUrl ? { backgroundImage: `url(${profilePicUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
              }}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.avatarHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.avatar)}
              onClick={() => document.getElementById('profile-pic-upload')?.click()}
            >
              {!profilePicUrl && profilePic}
              <input
                type="file"
                id="profile-pic-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfilePicUpload}
              />
            </div>
            <div style={styles.profileInfo}>
              <div style={styles.profileName}>Tarush Nigam</div>
              <div style={styles.profileEmail}>tarush@example.com</div>
            </div>
          </div>

          {settingsOptions.map((option) => {
            const Icon = Lucide[option.icon]
            return (
              <div key={option.id} style={styles.settingItem}>
                <div style={styles.settingLabel}>
                  <Icon size={20} />
                  <label htmlFor={option.id}>{option.label}</label>
                </div>
                <label style={styles.switch}>
                  <input
                    type="checkbox"
                    id={option.id}
                    style={styles.switchInput}
                    checked={settingsState[option.id]}
                    onChange={() => option.action ? option.action() : handleToggle(option.id)}
                  />
                  <span
                    style={{
                      ...styles.switchSlider,
                      ...(settingsState[option.id] ? styles.switchSliderChecked : {}),
                    }}
                  >
                    <span
                      style={{
                        ...styles.switchSliderBefore,
                        ...(settingsState[option.id] ? styles.switchSliderCheckedBefore : {}),
                      }}
                    />
                  </span>
                </label>
              </div>
            )
          })}

          {/* Account Actions */}
          <div style={styles.accountActions}>
            <button 
              style={{ ...styles.button, ...styles.addAccountButton }}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, { ...styles.button, ...styles.addAccountButton, ...styles.addAccountButtonHover })}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { ...styles.button, ...styles.addAccountButton })}
            >
              <Lucide.UserPlus size={16} />
              Add Another Account
            </button>
            <button 
              style={{ ...styles.button, ...styles.signOutButton }}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, { ...styles.button, ...styles.signOutButton, ...styles.signOutButtonHover })}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { ...styles.button, ...styles.signOutButton })}
            >
              <Lucide.LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

