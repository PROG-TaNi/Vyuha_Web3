'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Chart from 'chart.js/auto';

const LinearChart = ({ data, color, label, isDarkMode }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.name),
        datasets: [{
          label: label,
          data: data.map(d => d.value),
          borderColor: color,
          backgroundColor: color + '20',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: isDarkMode ? '#94a3b8' : '#64748b',
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              color: isDarkMode ? '#94a3b8' : '#64748b',
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            titleColor: isDarkMode ? '#ffffff' : '#000000',
            bodyColor: isDarkMode ? '#94a3b8' : '#64748b',
            borderColor: isDarkMode ? '#2d3748' : '#e2e8f0',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}`;
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: false,
        },
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, color, label, isDarkMode]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '200px' }} />;
};

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("teams")
  const [viewMode, setViewMode] = useState('grid')
  const [chartData, setChartData] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const generateChartData = (tab) => {
    const baseData = [
      { name: 'Jan', value: Math.floor(Math.random() * 100) },
      { name: 'Feb', value: Math.floor(Math.random() * 100) },
      { name: 'Mar', value: Math.floor(Math.random() * 100) },
      { name: 'Apr', value: Math.floor(Math.random() * 100) },
      { name: 'May', value: Math.floor(Math.random() * 100) },
      { name: 'Jun', value: Math.floor(Math.random() * 100) },
    ];

    switch (tab.toLowerCase()) {
      case 'profiles':
        return baseData.map(item => ({ ...item, value: item.value * 1.2 }));
      case 'projects':
        return baseData.map(item => ({ ...item, value: item.value * 0.8 }));
      case 'works':
        return baseData.map(item => ({ ...item, value: item.value * 1.5 }));
      case 'teams':
        return baseData.map(item => ({ ...item, value: item.value * 0.6 }));
      case 'network':
        return baseData.map(item => ({ ...item, value: item.value * 1.1 }));
      case 'activity':
        return baseData.map(item => ({ ...item, value: item.value * 0.9 }));
      default:
        return baseData;
    }
  };

  const getChartColor = (tab) => {
    switch (tab.toLowerCase()) {
      case 'profiles':
        return '#FF6384';
      case 'projects':
        return '#36A2EB';
      case 'works':
        return '#FFCE56';
      case 'teams':
        return '#4BC0C0';
      case 'network':
        return '#9966FF';
      case 'activity':
        return '#FF9F40';
      default:
        return '#FF6384';
    }
  };

  useEffect(() => {
    setMounted(true);
    const date = new Date();
    setCurrentDate(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
    setChartData(generateChartData('Teams'));
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', isDarkMode)
      document.body.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#ffffff'
      document.body.style.color = isDarkMode ? '#ffffff' : '#000000'
    }
  }, [isDarkMode, mounted])

  const handleProfileImageClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setProfileImage(e.target.result)
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const teamMembers = [
    { initials: "IM", name: "Iron Man", role: "Genius, Billionaire, Playboy, Philanthropist" },
    { initials: "CA", name: "Captain America", role: "Super Soldier, Enhanced Strength & Agility" },
    { initials: "T", name: "Thor", role: "God of Thunder, Control of Lightning, Immortality" },
    { initials: "BW", name: "Black Widow", role: "Expert Martial Artist, Espionage, Enhanced Reflexes" },
    { initials: "H", name: "Hawkeye", role: "Master Archer, Precision Shooting, Tactical Genius" },
    { initials: "BP", name: "Black Panther", role: "Enhanced Strength, Speed, Vibranium Suit" },
    { initials: "H", name: "Hulk", role: "Super Strength, Regeneration, Enhanced Durability" },
    { initials: "SW", name: "Scarlet Witch", role: "Reality Warping, Telekinesis, Chaos Magic" },
    { initials: "V", name: "Vision", role: "Superhuman Strength, Density Manipulation, Mind Stone Power" }
  ]

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Pixel Crafters",
      description: "Crafting digital experiences for the world",
      skills: ["UI", "DevOps"],
      rating: 5,
      members: ["A", "B", "C"],
      joined: true
    },
    {
      id: 2,
      name: "Code Masters", 
      description: "Coding the future, one line at a time",
      skills: ["Dev", "AI", "Cloud"],
      rating: 5,
      members: ["A", "B", "C"],
      joined: true
    },
    {
      id: 3,
      name: "Market Mavericks",
      description: "Navigating markets with strategic solutions", 
      skills: ["Marketing", "Brand"],
      rating: 4.5,
      members: ["A", "B", "C", "D"],
      joined: false
    }
  ])

  const handleTeamJoin = (teamId) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, joined: !team.joined } : team
    ))
  }

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
      marginLeft: '280px',
      marginTop:'0.1px',
      flex: 1,
      padding: '24px',
      width: 'calc(100% - 260px)',
      borderRadius: '50px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      padding: '24px',
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      borderBottom: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: 600,
      marginBottom: '4px',
    },
    breadcrumb: {
      display: 'flex',
      gap: '8px',
      color: isDarkMode ? '#94a3b8' : '#64748b',
      fontSize: '14px',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    headerActions: {
      display: 'flex',
      gap: '12px',
    },
    profileSection: {
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '32px',
      position: 'relative',
      zIndex: 2,
    },
    profileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    profileInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
    },
    avatar: {
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#2d3748' : '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 600,
      cursor: 'pointer',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    profileDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    profileName: {
      fontSize: '24px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    verifiedBadge: {
      color: '#3b82f6',
    },
    profileMeta: {
      display: 'flex',
      gap: '16px',
      color: isDarkMode ? '#94a3b8' : '#64748b',
    },
    tabs: {
      display: 'flex',
      borderBottom: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
      position: 'relative',
      width: '100%',
    },
    tab: {
      padding: '12px 24px',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '2px solid transparent',
      color: isDarkMode ? '#94a3b8' : '#64748b',
      cursor: 'pointer',
    },
    activeTab: {
      color: isDarkMode ? '#ffffff' : '#000000',
      borderBottomColor: '#3b82f6',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '24px',
    },
    teamMembersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '48px',
    },
    memberCard: {
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      transition: 'all 0.2s',
    },
    memberInitials: {
      width: '48px',
      height: '48px',
      borderRadius: '8px',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: 600,
    },
    memberInfo: {
      flex: 1,
    },
    memberName: {
      fontWeight: 600,
      marginBottom: '4px',
    },
    memberRole: {
      fontSize: '14px',
      color: isDarkMode ? '#94a3b8' : '#64748b',
    },
    teamsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    teamsGrid: {
      display: 'grid',
      gridTemplateColumns: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
      gap: '24px',
    },
    teamCard: {
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      transition: 'all 0.2s',
      display: viewMode === 'list' ? 'flex' : 'block',
      alignItems: viewMode === 'list' ? 'center' : 'stretch',
      gap: viewMode === 'list' ? '24px' : '0',
    },
    teamIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '8px',
      backgroundColor: isDarkMode ? '#2d3748' : '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: viewMode === 'list' ? '0' : '16px',
      fontSize: '24px',
      flexShrink: 0,
    },
    teamContent: {
      flex: 1,
    },
    teamName: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
    },
    teamDescription: {
      fontSize: '14px',
      color: isDarkMode ? '#94a3b8' : '#64748b',
      marginBottom: '16px',
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '16px',
    },
    skillBadge: {
      padding: '4px 12px',
      backgroundColor: isDarkMode ? '#2d3748' : '#f3f4f6',
      borderRadius: '16px',
      fontSize: '12px',
    },
    starRating: {
      display: 'flex',
      gap: '4px',
      color: '#fbbf24',
      marginBottom: '16px',
    },
    teamFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    memberAvatars: {
      display: 'flex',
      marginLeft: '-8px',
    },
    memberAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#2d3748' : '#f3f4f6',
      color: isDarkMode ? '#ffffff' : '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 600,
      border: `2px solid ${isDarkMode ? '#1e293b' : '#ffffff'}`,
      marginLeft: '-8px',
    },
    connectButton: {
      padding: '8px 16px',
      backgroundColor: isConnected ? '#22c55e' : isDarkMode ? '#1e293b' : '#ffffff',
      color: isConnected ? '#ffffff' : (isDarkMode ? '#ffffff' : '#000000'),
      border: isConnected ? 'none' : `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    joinButton: {
      padding: '8px 16px',
      backgroundColor: '#000000',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    joinedButton: {
      padding: '8px 16px',
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    popup: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    mainContent: {
      marginTop: openDropdown ? '90px' : '0',
      transition: 'margin-top 0.5s ease-in-out',
    },
    dropdownWrapper: {
      position: 'relative',
      marginBottom: openDropdown ? '100px' : '0',
      transition: 'margin-bottom 0.5s ease-in-out',
    },
    chartContainer: {
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      borderRadius: '0 0 12px 12px',
      padding: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
  }

  if (!mounted) return null

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={styles.logoIcon}>V</div>
          <span>Vyuha</span>
        </div>

        <button 
          style={styles.addButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e40af'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#343840'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          + Add New
        </button>

        <div style={styles.navSection}>
          <div style={styles.navLabel}>PAGES</div>
          {['🏠 Home', '📄 Contract', '🔗 Connect', '👤 Public Profile', '🔒 Authentication'].map((item, index) => (
            <button 
              key={index}
              style={styles.navButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0f4ac5'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onClick={() => setActivePopup(item.toLowerCase().replace(/\s/g, ''))}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>Profile</h1>
            <div style={styles.breadcrumb}>
              <span>Home</span>
              <span>/</span>
              <span>Public Profile</span>
            </div>
          </div>
          <div style={styles.headerActions}>
            <button style={styles.button}>📤 Export</button>
            <button style={styles.button}>{currentDate} </button>
            <button style={styles.button} onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <div style={styles.dropdownWrapper}>
          <div style={styles.profileSection}>
            <div style={styles.profileHeader}>
              <div style={styles.profileInfo}>
                <div 
                  style={{
                    ...styles.avatar,
                    ...(profileImage ? { backgroundImage: `url(${profileImage})` } : {}),
                  }}
                  onClick={handleProfileImageClick}
                >
                  {!profileImage && 'TN'}
                </div>
                <div style={styles.profileDetails}>
                  <div style={styles.profileName}>
                    Tarush Nigam
                    <span style={styles.verifiedBadge}></span>
                  </div>
                  <div style={styles.profileMeta}>
                    <span>📍VJTI</span>
                    <span>    🗃️Inheritance</span>
                    <span>    📧ironman3000@avengers.com</span>
                  </div>
                </div>
              </div>
              <button 
                style={styles.connectButton}
                onClick={() => setIsConnected(!isConnected)}
              >
                {isConnected ? 'Connected' : 'Connect'}
              </button>
            </div>

            <div style={styles.tabs}>
              {['Profiles', 'Projects', 'Works', 'Teams', 'Network', 'Activity'].map((tab) => (
                <div key={tab}>
                  <button
                    style={{
                      ...styles.tab,
                      ...(activeTab === tab.toLowerCase() ? styles.activeTab : {})
                    }}
                    onClick={() => {
                      setActiveTab(tab.toLowerCase());
                      setOpenDropdown(openDropdown === tab.toLowerCase() ? null : tab.toLowerCase());
                    }}
                  >
                    {tab}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <AnimatePresence>
            {openDropdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                style={styles.chartContainer}
              >
                <LinearChart 
                  data={generateChartData(openDropdown)} 
                  color={getChartColor(openDropdown)}
                  label={openDropdown}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div style={styles.mainContent}>
          <h2 style={styles.sectionTitle}>Team Members ( Pixel Crafters )</h2>

          <div style={styles.teamMembersGrid}>
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                style={styles.memberCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={styles.memberInitials}>{member.initials}</div>
                <div style={styles.memberInfo}>
                  <div style={styles.memberName}>{member.name}</div>
                  <div style={styles.memberRole}>{member.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.teamsHeader}>
            <h2 style={styles.sectionTitle}>Teams</h2>
            <div style={styles.headerActions}>
              <button 
                style={{
                  ...styles.button,
                  backgroundColor: viewMode === 'grid' ? (isDarkMode ? '#2d3748' : '#e2e8f0') : 'transparent'
                }}
                onClick={() => setViewMode('grid')}
              >
                ▦
              </button>
              <button 
                style={{
                  ...styles.button,
                  backgroundColor: viewMode === 'list' ? (isDarkMode ? '#2d3748' : '#e2e8f0') : 'transparent'
                }}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>
          </div>

          <div style={styles.teamsGrid}>
            {teams.map((team) => (
              <div 
                key={team.id} 
                style={styles.teamCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={styles.teamIcon}>👥</div>
                <div style={styles.teamContent}>
                  <h3 style={styles.teamName}>{team.name}</h3>
                  <p style={styles.teamDescription}>{team.description}</p>
                  <div style={styles.skillsContainer}>
                    {team.skills.map((skill) => (
                      <span key={skill} style={styles.skillBadge}>{skill}</span>
                    ))}
                  </div>
                  <div style={styles.starRating}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < team.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <div style={styles.teamFooter}>
                    <div style={styles.memberAvatars}>
                      {team.members.map((member, i) => (
                        <div key={i} style={styles.memberAvatar}>{member}</div>
                      ))}
                    </div>
                    <button
                      style={team.joined ? styles.joinedButton : styles.joinButton}
                      onClick={() => handleTeamJoin(team.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.9'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                    >
                      {team.joined ? 'Joined' : 'Join'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
