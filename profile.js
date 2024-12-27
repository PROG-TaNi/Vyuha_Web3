'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, Star, Plus, Search, Activity, Clock, CheckCircle, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LineChart, 
  BarChart,
  RadialBarChart,
  RadarChart,
  AreaChart,
  PieChart,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [activeTab, setActiveTab] = useState('info')

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

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
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
    },
    logoIcon: {
      width: '70px',
      height: '70px',
      backgroundColor: '#ffffff',
      color: '#000000',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px',
      fontWeight: 600,
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    main: {
      marginLeft: '240px',
      padding: '40px',
      width: 'calc(100% - 240px)',
    },
    profileSection: {
      marginBottom: '32px',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      marginBottom: '24px',
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: isDark ? '#1e293b' : '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: 600,
      cursor: 'pointer',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `2px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    profileName: {
      fontSize: '24px',
      fontWeight: 600,
    },
    profileDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginBottom: '32px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px',
    },
    statCard: {
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: isDark ? '#94a3b8' : '#64748b',
      marginBottom: '12px',
      padding: '16px',
      borderRadius: '8px',
      transition: 'all 0.2s',
      cursor: 'pointer',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
    },
    rating: {
      display: 'flex',
      gap: '4px',
      color: '#fbbf24',
    },
    graphsGrid: {
      display: 'grid',
      gap: '24px',
    },
    graphRow: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
    },
    graphCard: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    },
    graphContent: {
      flex: 1,
    },
    graphDetails: {
      flex: 1,
      padding: '0 16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }

  // Sample data for graphs
  const lineData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 120 },
    { name: 'Mar', value: 170 },
    { name: 'Apr', value: 140 },
    { name: 'May', value: 200 },
    { name: 'Jun', value: 180 },
  ]

  const barData = [
    { name: 'Mon', value: 10 },
    { name: 'Tue', value: 20 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 25 },
    { name: 'Fri', value: 18 },
    { name: 'Sat', value: 30 },
    { name: 'Sun', value: 5 },
  ]

  const radialData = [
    { name: 'Coding', value: 80 },
    { name: 'Design', value: 65 },
    { name: 'Marketing', value: 45 },
    { name: 'Sales', value: 70 },
  ]

  const radarData = [
    { name: 'Attack', value: 80 },
    { name: 'Defense', value: 70 },
    { name: 'Speed', value: 85 },
    { name: 'Power', value: 75 },
    { name: 'Technique', value: 90 },
  ]

  const areaData = [
    { name: 'Q1', value: 200 },
    { name: 'Q2', value: 300 },
    { name: 'Q3', value: 400 },
    { name: 'Q4', value: 500 },
  ]

  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={styles.logoIcon}>V</div>
          <span style={{ fontSize: '24px', fontWeight: 600 }}>Vyuha</span>
        </div>

        <button 
          style={styles.addButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#343840'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <Plus size={20} />
          Add New
        </button>

        <nav>
          {['🏠 Home', '📄 Contract', '🔗 Connect', '👤 Profile', '🔒 Auth'].map((item) => (
            <button
              key={item}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: item === '👤 Profile' ? '#3b82f6' : 'transparent',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                textAlign: 'left',
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (item !== '👤 Profile') {
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (item !== '👤 Profile') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main style={styles.main}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={styles.profileHeader}>
              <div 
                style={{
                  ...styles.avatar,
                  ...(profileImage ? { backgroundImage: `url(${profileImage})` } : {}),
                }}
                onClick={handleProfileImageClick}
              >
                {!profileImage && 'T'}
              </div>
              <div style={styles.profileInfo}>
                <h2 style={styles.profileName}>Tarush Nigam</h2>
                <div style={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#fbbf24" />
                  ))}
                </div>
                <div style={{...styles.profileDetail, color: '#4ade80'}}>5 years of work experience</div>
                <div style={{...styles.profileDetail, color: '#60a5fa'}}>Professional Guitarist</div>
                <div style={{...styles.profileDetail, color: '#f472b6'}}>
                  <Info size={16} />
                  <span>Passionate musician and tech enthusiast</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <CardContent className="pt-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Contact Information</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <Mail size={20} />
                    <span>tarush.nigam@example.com</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Phone size={20} />
                    <span>+91 98765 43210</span>
                  </div>
                  <div style={styles.infoItem}>
                    <MapPin size={20} />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Activity size={20} />
                    <span>Active since Jan 2024</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="stats">
                <div style={styles.statsGrid}>
                  <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Past Records</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">Completed projects</p>
                    </CardContent>
                  </Card>
                  <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Current Account</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹45,231</div>
                      <p className="text-xs text-muted-foreground">Balance</p>
                    </CardContent>
                  </Card>
                  <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">7</div>
                      <p className="text-xs text-muted-foreground">Transactions</p>
                    </CardContent>
                  </Card>
                  <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Completed</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">129</div>
                      <p className="text-xs text-muted-foreground">Transactions</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* New Graphs Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Performance Graphs</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={styles.graphsGrid}>
              {/* Row 1 */}
              <div style={styles.graphRow}>
                <Card style={styles.graphCard}>
                  <div style={styles.graphContent}>
                    <CardHeader>
                      <CardTitle>Monthly Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{
                        data: {
                          label: 'Progress',
                          color: 'hsl(var(--chart-1))',
                        }
                      }} className="h-[200px]">
                        <LineChart
                          data={lineData}
                          dataKey="value"
                          nameKey="name"
                          strokeWidth={2}
                          dot={true}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </ChartContainer>
                    </CardContent>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Linear Graph</h4>
                    <p>Shows the monthly progress over time. The upward trend indicates consistent improvement in performance.</p>
                  </div>
                </Card>
              </div>

              {/* Row 2 */}
              <div style={styles.graphRow}>
                <Card style={styles.graphCard}>
                  <div style={styles.graphContent}>
                    <CardHeader>
                      <CardTitle>Skill Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{
                        data: {
                          label: 'Skill Level',
                          color: 'hsl(var(--chart-2))',
                        }
                      }} className="h-[200px]">
                        <RadialBarChart
                          data={radialData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius="30%"
                          outerRadius="80%"
                          startAngle={90}
                          endAngle={-270}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </ChartContainer>
                    </CardContent>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Radial Graph</h4>
                    <p>Illustrates the distribution of skills across different areas. The length of each bar represents the proficiency level in that skill.</p>
                  </div>
                </Card>
              </div>

              {/* Row 3 */}
              <div style={styles.graphRow}>
                <Card style={styles.graphCard}>
                  <div style={styles.graphContent}>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{
                        data: {
                          label: 'Performance',
                          color: 'hsl(var(--chart-3))',
                        }
                      }} className="h-[200px]">
                        <RadarChart
                          data={radarData}
                          dataKey="value"
                          nameKey="name"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </ChartContainer>
                    </CardContent>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Radar Graph</h4>
                    <p>Displays performance across multiple dimensions. Each spoke represents a different metric, allowing for a comprehensive view of overall performance.</p>
                  </div>
                </Card>
              </div>

              {/* Row 4 */}
              <div style={styles.graphRow}>
                <Card style={styles.graphCard}>
                  <div style={styles.graphContent}>
                    <CardHeader>
                      <CardTitle>Weekly Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{
                        data: {
                          label: 'Activity',
                          color: 'hsl(var(--chart-4))',
                        }
                      }} className="h-[200px]">
                        <BarChart
                          data={barData}
                          dataKey="value"
                          nameKey="name"
                          radius={[4, 4, 0, 0]}
                          style={{ opacity: 0.8, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '4px 4px' }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </ChartContainer>
                    </CardContent>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Dotted Bar Graph</h4>
                    <p>Shows activity levels for each day of the week. The dotted background adds a unique visual element to the traditional bar chart.</p>
                  </div>
                </Card>
              </div>

              {/* Additional graphs */}
              <div style={styles.graphRow}>
                <Card style={styles.graphCard}>
                  <div style={styles.graphContent}>
                    <CardHeader>
                      <CardTitle>Quarterly Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{
                        data: {
                          label: 'Performance',
                          color: 'hsl(var(--chart-5))',
                        }
                      }} className="h-[200px]">
                        <AreaChart
                          data={areaData}
                          dataKey="value"
                          nameKey="name"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </ChartContainer>
                    </CardContent>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Area Graph</h4>
                    <p>Visualizes the quarterly performance trend. The filled area under the line emphasizes the cumulative nature of the data.</p>
                  </div>
                </Card>
                <Card style={styles.graphCard}>
                  <div style={styles.graphContent}>
                    <CardHeader>
                      <CardTitle>Task Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{
                        data: {
                          label: 'Tasks',
                          color: 'hsl(var(--chart-6))',
                        }
                      }} className="h-[200px]">
                        <PieChart
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </ChartContainer>
                    </CardContent>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Pie Chart</h4>
                    <p>Represents the distribution of tasks across different categories. Each slice of the pie corresponds to a proportion of the total workload.</p>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

