'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, Moon, Sun, Home, FileText, Link, User, Settings, MessageCircle, Send, Bitcoin } from 'lucide-react'
import '@fontsource/inter'

export default function MessageCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [isFading, setIsFading] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const chatAreaRef = useRef(null)

  const [people] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
    { id: 5, name: 'Eva' },
    { id: 6, name: 'Frank' },
    { id: 7, name: 'Grace' },
    { id: 8, name: 'Hank' },
    { id: 9, name: 'Ivy' },
    { id: 10, name: 'Jack' },
  ])

  const styles = {
    container: {
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      fontFamily: 'Inter, sans-serif',
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
      transition: 'background-color 0.2s',
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
      transition: 'background-color 0.2s',
      height: '50px',
      fontSize: '16px',
    },
    main: {
      flex: 1,
      padding: '55px',
      marginLeft: '260px',
      transition: 'opacity 0.3s ease-in-out',
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
    },
    searchInput: {
      width: 'calc(100% - 40px)',
      padding: '12px 16px',
      paddingLeft: '40px',
      fontSize: '16px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      color: isDarkMode ? '#ffffff' : '#000000',
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
    toggleButton: {
      marginLeft: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 600,
      marginBottom: '20px',
    },
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    card: {
      padding: '16px',
      borderRadius: '12px',
      backgroundColor: isDarkMode ? '#1e293b' : '#f9fafb',
      border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardAvatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#3b82f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '20px',
      fontWeight: 600,
    },
    cardName: {
      fontSize: '18px',
      fontWeight: 600,
    },
    chatBox: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 110px)',
      backgroundColor: isDarkMode ? '#1e293b' : '#f9fafb',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    chatHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
    },
    chatAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3b82f6',
      fontSize: '18px',
      fontWeight: 600,
      marginRight: '12px',
    },
    chatName: {
      fontSize: '18px',
      fontWeight: 600,
    },
    closeButton: {
      marginLeft: 'auto',
      background: 'none',
      border: 'none',
      color: '#ffffff',
      cursor: 'pointer',
      fontSize: '16px',
    },
    chatArea: {
      flex: 1,
      padding: '16px',
      overflowY: 'auto',
    },
    message: {
      maxWidth: 'calc(100% - 40px)',
      padding: '8px 12px',
      borderRadius: '12px',
      marginBottom: '8px',
      wordWrap: 'break-word',
    },
    sentMessage: {
      backgroundColor: '#8b5cf6',
      color: '#ffffff',
      alignSelf: 'flex-end',
      marginLeft: '40px',
    },
    receivedMessage: {
      backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
      color: isDarkMode ? '#ffffff' : '#000000',
      alignSelf: 'flex-start',
    },
    inputArea: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      borderTop: '1px solid #e2e8f0',
    },
    input: {
      flex: 1,
      padding: '8px 12px',
      fontSize: '16px',
      border: '1px solid #e2e8f0',
      borderRadius: '20px',
      marginRight: '8px',
      backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    iconButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '4px',
    },
    sendButton: {
      backgroundColor: '#10B981',
    },
    bitcoinButton: {
      backgroundColor: '#8B5CF6',
    },
  }

  const handlePersonClick = (person) => {
    setIsFading(true)
    setTimeout(() => {
      setSelectedPerson(person)
      setIsFading(false)
    }, 300)
  }

  const handleCloseChat = () => {
    setIsFading(true)
    setTimeout(() => {
      setSelectedPerson(null)
      setMessages([])
      setIsFading(false)
    }, 300)
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sent: true }])
      setInputMessage('')
    
      // Simulate a received message after a short delay
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'This is a reply', sent: false }])
      }, 1000)
    }
  }

  const handleBitcoinClick = () => {
    // Placeholder for Bitcoin-related functionality
    console.log('Bitcoin button clicked')
  }

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            height: 100%;
            width: 100%;
          }
        `}
      </style>
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
            + Add New
          </button>

          <nav style={styles.navSection}>
            <div style={styles.navLabel}>PAGES</div>
            {[
              { icon: Home, label: 'Home' },
              { icon: FileText, label: 'Contract' },
              { icon: Link, label: 'Connect' },
              { icon: User, label: 'Profile' },
              { icon: MessageCircle, label: 'Chat' },
              { icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.label}
                style={{
                  ...styles.navButton,
                  backgroundColor: item.label === 'Chat' ? '#3b82f6' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (item.label !== 'Chat') {
                    e.currentTarget.style.backgroundColor = '#2044b4'
                  }
                }}
                onMouseLeave={(e) => {
                  if (item.label !== 'Chat') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main style={{...styles.main, opacity: isFading ? 0 : 1}}>
          {selectedPerson ? (
            <div style={styles.chatBox}>
              <div style={styles.chatHeader}>
                <div style={styles.chatAvatar}>{selectedPerson.name.charAt(0)}</div>
                <div style={styles.chatName}>{selectedPerson.name}</div>
                <button style={styles.closeButton} onClick={handleCloseChat}>
                  ×
                </button>
              </div>
              <div style={styles.chatArea} ref={chatAreaRef}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.message,
                      ...(message.sent ? styles.sentMessage : styles.receivedMessage),
                    }}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <div style={styles.inputArea}>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                />
                <button 
                  style={{...styles.iconButton, ...styles.sendButton}} 
                  onClick={handleSendMessage}
                >
                  <Send size={20} color="#ffffff" />
                </button>
                <button 
                  style={{...styles.iconButton, ...styles.bitcoinButton}} 
                  onClick={handleBitcoinClick}
                >
                  <Bitcoin size={20} color="#ffffff" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={styles.searchContainer}>
                <Search size={20} style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
                <button 
                  style={styles.toggleButton}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <h2 style={styles.sectionTitle}>Message Center</h2>
              <div style={styles.cardContainer}>
                {people.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase())).map(person => (
                  <div
                    key={person.id}
                    style={styles.card}
                    onClick={() => handlePersonClick(person)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={styles.cardAvatar}>{person.name.charAt(0)}</div>
                    <div style={styles.cardName}>{person.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}

