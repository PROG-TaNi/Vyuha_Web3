'use client'

import { useState } from 'react'

import { MessageCircle, Search,  Home, FileText, Link, User,  } from 'lucide-react'
import '@fontsource/inter'; // Importing Inter font

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      fontFamily: 'Inter, sans-serif', // Setting font family to Inter
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
      fontFamily: 'Inter, sans-serif',
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
      padding: '14px',
      backgroundColor: '#343840',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '24px',
      transition: 'background-color 0.2s, transform 0.2s',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'Inter, sans-serif',
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
      fontFamily: 'Inter, sans-serif',
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
      transition: 'background-color 0.2s, transform 0.2s',
      height: '50px',
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
    },
    main: {
      flex: 1,
      padding: '60px',
      fontFamily: 'Inter, sans-serif',
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '32px',
    },
    searchInput: {
      width: '100%',
      padding: '12px 16px',
      paddingLeft: '40px',
      fontSize: '16px',
      border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
      borderRadius: '8px',
      backgroundColor: 'transparent',
      color: isDark ? '#ffffff' : '#000000',
      outline: 'none',
      fontFamily: 'Inter, sans-serif',
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 600,
      marginBottom: '20px',
      color: isDark ? '#ffffff' : '#000000',
      fontFamily: 'Inter, sans-serif',
    },
    cardGrid: {
      display: 'grid',
      gap: '24px',
      marginBottom: '32px',
    },
    ongoingGrid: {
      gridTemplateColumns: '1fr',
    },
    pastGrid: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    card: {
      padding: '24px',
      borderRadius: '12px',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
      fontFamily: 'Inter, sans-serif',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
    },
    cardDescription: {
      color: '#6b7280',
      fontSize: '14px',
      lineHeight: 1.5,
      fontFamily: 'Inter, sans-serif',
    },
    cardStatus: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: 500,
      marginBottom: '12px',
    },
    activeStatus: {
      backgroundColor: '#dcfce7',
      color: '#166534',
    },
    completedStatus: {
      backgroundColor: '#e0e7ff',
      color: '#3730a3',
    }
  }

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={styles.logoIcon}>V</div>
          <span>Vyuha</span>
        </div>

        <button 
          style={styles.addButton}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2044b4'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#343840'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5v14" />
          </svg>
          Add New
        </button>

          <nav style={styles.navSection}>
          <p style={styles.navLabel}></p>
          <nav style={styles.navSection}>
          <div style={styles.navLabel}>PAGES</div>
          {[
            { icon: Home, label: 'Home' },
            { icon: FileText, label: 'Contract' },
            { icon: Link, label: 'Connect' },
            { icon: User, label: 'Profile' },
            { icon: MessageCircle , label: 'Chat' },
          ].map((item) => (
            <button
              key={item.label}
              style={{
                ...styles.navButton,
                backgroundColor: item.label === 'Contract' ? '#3b82f6' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (item.label !== 'Contract') {
                  e.currentTarget.style.backgroundColor = '#2044b4'
                }
              }}
              onMouseLeave={(e) => {
                if (item.label !== 'Contract') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
        </nav>
      </aside>

      <main style={{...styles.main, marginLeft: '240px'}}>
        <div style={styles.searchContainer}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search contracts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <section>
          <h2 style={styles.sectionTitle}>ON GOING CONTRACT</h2>
          <div style={{...styles.cardGrid, ...styles.ongoingGrid}}>
            <div 
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{...styles.cardStatus, ...styles.activeStatus}}>Active</span>
              <h3 style={styles.cardTitle}>Website Development Project</h3>
              <p style={styles.cardDescription}>
                Developing a responsive website with modern technologies and best practices.
                Duration: 3 months
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={styles.sectionTitle}>PAST CONTRACTS</h2>
          <div style={{...styles.cardGrid, ...styles.pastGrid}}>
            {[
              {
                title: "Mobile App Development",
                description: "Created a cross-platform mobile application using React Native.",
              },
              {
                title: "UI/UX Design System",
                description: "Designed and implemented a comprehensive design system.",
              },
              {
                title: "E-commerce Platform",
                description: "Built a scalable e-commerce platform with payment integration.",
              },
            ].map((contract, index) => (
              <div 
                key={index}
                style={styles.card}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span style={{...styles.cardStatus, ...styles.completedStatus}}>Completed</span>
                <h3 style={styles.cardTitle}>{contract.title}</h3>
                <p style={styles.cardDescription}>{contract.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
