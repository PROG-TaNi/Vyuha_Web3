'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Search, Settings, Home, FileText, Link, User, ChevronLeft, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '@fontsource/inter'

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContract, setSelectedContract] = useState(null)
  const [selectedCardBounds, setSelectedCardBounds] = useState(null)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  // Sample contract data
  const ongoingContract = {
    id: '1',
    title: 'Website Development Project',
    description: 'Developing a responsive website with modern technologies.',
    status: 'active',
    dateStarted: '2024-01-01',
    details: 'This contract involves the development of a responsive website using React and Next.js. The project includes multiple phases including design, development, testing, and deployment. Working with client ABC Corp to deliver a modern web experience.'
  }

  const pastContracts = [
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'Created a cross-platform mobile application using React Native.',
      status: 'completed',
      dateStarted: '2023-06-01',
      dateEnded: '2023-12-31',
      details: 'Successfully delivered a cross-platform mobile application for iOS and Android. The project included user authentication, real-time data synchronization, and offline capabilities.'
    },
    {
      id: '3',
      title: 'UI/UX Design System',
      description: 'Designed and implemented a comprehensive design system.',
      status: 'completed',
      dateStarted: '2023-03-01',
      dateEnded: '2023-05-31',
      details: 'Created a comprehensive design system including component library, documentation, and implementation guidelines. The system is now used across multiple projects.'
    },
    {
      id: '4',
      title: 'E-commerce Platform',
      description: 'Built a scalable e-commerce platform with payment integration.',
      status: 'completed',
      dateStarted: '2023-01-01',
      dateEnded: '2023-02-28',
      details: 'Developed a full-featured e-commerce platform including product management, shopping cart, and secure payment processing integration.'
    }
  ]

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      fontFamily: 'Inter, sans-serif',
      transition: 'background-color 0.3s, color 0.3s',
    },
    sidebar: {
      width: '240px',
      backgroundColor: isDark ? '#000000' : '#000000',
      color: '#ffffff',
      padding: '24px',
      height: '100vh',
      position: 'fixed',
      overflowY: 'auto',
      left: 0,
      top: 0,
      fontFamily: 'Inter, sans-serif',
      transition: 'background-color 0.3s',
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
      backgroundColor: isDark ? '#000000' : '#000000',
      color: isDark ? '#ffffff' : '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px',
      fontWeight: 600,
      marginLeft: '20px',
      transition: 'background-color 0.3s, color 0.3s',
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
      transition: 'border-color 0.3s',
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
      height: '200px',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
      color: isDark ? '#ffffff' : '#000000',
    },
    cardDescription: {
      color: isDark ? '#a0aec0' : '#6b7280',
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
    },
    detailView: {
      padding: '32px',
    },
    selectedCard: {
      maxWidth: '300px',
      marginBottom: '24px',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: '24px',
      fontSize: '16px',
      transition: 'transform 0.2s ease',
    },
    detailsCard: {
      padding: '40px',
      width: '300px',
      borderRadius: '12px',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      width: '900px',
      height:'200px', // Increased width to full width
      transition: 'all 0.3s ease',
      marginTop: '20px',
    },
    selectedCardInfo: {
      width: '40%',
    },
    dateInfo: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
    },
    dateLabel: {
      fontSize: '14px',
      color: isDark ? '#a0aec0' : '#6b7280',
    },
    dateValue: {
      fontSize: '16px',
      fontWeight: 500,
      color: isDark ? '#ffffff' : '#000000',
    },
    selectedCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
      gap: '24px',
      width: '100%',
      maxWidth: '100%',
    },
    dateGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'flex-end',
      position: 'absolute',
      right: '24px',
      top: '24px',
    },
    dateBox: {
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    startDate: {
      backgroundColor: '#dcfce7',
      color: '#166534',
    },
    endDate: {
      backgroundColor: '#e0e7ff',
      color: '#3730a3',
    },
    darkModeToggle: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: isDark ? '#ffffff' : '#000000',
      fontSize: '24px',
    },
  }

  const handleCardClick = (contract, event) => {
    const mainElement = document.querySelector('main');
    const bounds = event.currentTarget.getBoundingClientRect();
    const mainBounds = mainElement?.getBoundingClientRect();
    
    if (mainBounds) {
      setSelectedCardBounds({
        left: bounds.left - mainBounds.left,
        top: bounds.top - mainBounds.top,
        width: bounds.width,
        height: bounds.height,
      });
    }
    
    setSelectedContract(contract);
  }

  const filterContracts = (contracts, query) => {
    return contracts.filter(contract => 
      contract.title.toLowerCase().includes(query.toLowerCase()) ||
      contract.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (selectedContract) {
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
                { icon: Settings , label: 'Settings' },
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
          <button
            style={styles.darkModeToggle}
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
          <motion.button 
            style={styles.backButton}
            onClick={() => setSelectedContract(null)}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div
              key="selected-contract"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                initial={{ 
                  position: 'absolute',
                  left: selectedCardBounds?.left,
                  top: selectedCardBounds?.top,
                  width: selectedCardBounds?.width,
                  height: selectedCardBounds?.height,
                  opacity: 1,
                  zIndex: 10,
                }}
                animate={{
                  position: 'relative',
                  left: 0,
                  top: 0,
                  width: '40%',
                  height: 'auto',
                  opacity: 1,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div style={{...styles.card, cursor: 'default'}}>
                  <div style={styles.selectedCardHeader}>
                    <div style={styles.selectedCardInfo}>
                      <span style={{
                        ...styles.cardStatus,
                        ...(selectedContract.status === 'active' ? styles.activeStatus : styles.completedStatus)
                      }}>
                        {selectedContract.status === 'active' ? 'Active' : 'Completed'}
                      </span>
                      <h3 style={styles.cardTitle}>{selectedContract.title}</h3>
                      <p style={styles.cardDescription}>{selectedContract.description}</p>
                    </div>
                    <div style={styles.dateGroup}>
                      <div style={{...styles.dateBox, ...styles.startDate}}>
                        <span style={{ fontSize: '12px', opacity: 0.8 }}>Started</span>
                        <span>{selectedContract.dateStarted}</span>
                      </div>
                      {selectedContract.dateEnded && (
                        <div style={{...styles.dateBox, ...styles.endDate}}>
                          <span style={{ fontSize: '12px', opacity: 0.8 }}>Ended</span>
                          <span>{selectedContract.dateEnded}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  style={styles.detailsCard}
                  whileHover={{
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transform: 'translateY(-5px)',
                  }}
                >
                  <h2 style={{...styles.sectionTitle, marginBottom: '16px'}}>Contract Details</h2>
                  <p style={{...styles.cardDescription, fontSize: '16px', lineHeight: '1.6'}}>
                    {selectedContract.details}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    )
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
              { icon: Settings , label: 'Settings' },
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
        <button
          style={styles.darkModeToggle}
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
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

        <AnimatePresence>
          <motion.div
            key="contract-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <section>
              <h2 style={styles.sectionTitle}>ON GOING CONTRACT</h2>
              <motion.div 
                style={{...styles.cardGrid, ...styles.ongoingGrid}}
                layout
              >
                {filterContracts([ongoingContract], searchQuery).map((contract) => (
                  <motion.div 
                    key={contract.id}
                    style={styles.card}
                    onClick={(e) => handleCardClick(contract, e)}
                    whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    transition={{ duration: 0.2 }} // Faster hover effect
                    layout
                  >
                    <span style={{...styles.cardStatus, ...styles.activeStatus}}>Active</span>
                    <h3 style={styles.cardTitle}>{contract.title}</h3>
                    <p style={styles.cardDescription}>{contract.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section>
              <h2 style={styles.sectionTitle}>PAST CONTRACTS</h2>
              <motion.div 
                style={{...styles.cardGrid, ...styles.pastGrid}}
                layout
              >
                {filterContracts(pastContracts, searchQuery).map((contract) => (
                  <motion.div 
                    key={contract.id}
                    style={styles.card}
                    onClick={(e) => handleCardClick(contract, e)}
                    whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    transition={{ duration: 0.2 }} // Faster hover effect
                    layout
                  >
                    <span style={{...styles.cardStatus, ...styles.completedStatus}}>Completed</span>
                    <h3 style={styles.cardTitle}>{contract.title}</h3>
                    <p style={styles.cardDescription}>{contract.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

