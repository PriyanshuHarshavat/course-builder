import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  BarChart3,
  Users,
  Clock,
  MousePointer,
  Brain,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Target,
  Zap,
  Award,
  BookOpen,
  Palette,
  Code,
  Shield,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Main Container
const DashboardContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
`;

// Header
const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  margin: 8px 0 0 0;
  opacity: 0.9;
  font-size: 16px;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

// Time Range Selector
const TimeRangeSelector = styled.div`
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 12px;
`;

const TimeButton = styled.button`
  background: ${props => props.active ? 'rgba(255,255,255,0.3)' : 'transparent'};
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

// Metrics Grid
const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  position: relative;
  ${css`animation: ${pulse} 3s infinite;`}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || '#fff'};
    border-radius: 15px 15px 0 0;
  }
`;

const MetricIcon = styled.div`
  font-size: 32px;
  color: ${props => props.color || '#fff'};
  margin-bottom: 12px;
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const MetricLabel = styled.div`
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 8px;
`;

const MetricChange = styled.div`
  font-size: 12px;
  color: ${props => props.positive ? '#4CAF50' : '#f44336'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

// Charts Section
const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Detailed Tables
const DetailsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const TableCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 15px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 14px;
  align-items: center;
`;

const TableHeader = styled(TableRow)`
  font-weight: bold;
  background: rgba(255, 255, 255, 0.2);
`;

// Mock analytics data generator
const generateAnalyticsData = (timeRange) => {
  const now = new Date();
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 1;
  
  return {
    overview: {
      totalUsers: 156 + Math.floor(Math.random() * 50),
      totalSessions: 234 + Math.floor(Math.random() * 100),
      avgSessionDuration: '12m 34s',
      totalButtonClicks: 1847 + Math.floor(Math.random() * 500),
      bounceRate: '23%',
      conversionRate: '67%'
    },
    userMetrics: {
      activeUsers: 89 + Math.floor(Math.random() * 30),
      newUsers: 23 + Math.floor(Math.random() * 10),
      returningUsers: 66 + Math.floor(Math.random() * 20),
      userGrowth: '+12%'
    },
    engagement: {
      avgTimePerPage: '3m 45s',
      pagesPerSession: 4.2,
      aiInteractions: 456 + Math.floor(Math.random() * 100),
      projectsCreated: 89 + Math.floor(Math.random() * 30)
    },
    ageGroups: [
      { group: '8-9 years', users: 45, sessions: 78, avgTime: '8m 23s', color: '#4CAF50' },
      { group: '10-11 years', users: 67, sessions: 123, avgTime: '11m 56s', color: '#2196F3' },
      { group: '12-14 years', users: 44, sessions: 89, avgTime: '15m 12s', color: '#FF9800' }
    ],
    topPages: [
      { page: 'AI Generator Comparison', views: 345, time: '5m 23s', clicks: 234 },
      { page: 'Student Dashboard', views: 287, time: '3m 45s', clicks: 156 },
      { page: 'AI Chat Demo', views: 234, time: '4m 12s', clicks: 189 },
      { page: 'Template Gallery', views: 198, time: '2m 56s', clicks: 134 },
      { page: 'Safety Manager', views: 167, time: '1m 34s', clicks: 89 }
    ],
    topButtons: [
      { button: 'Generate AI Response', clicks: 456, page: 'AI Generator', conversion: '78%' },
      { button: 'Complete Lesson', clicks: 234, page: 'Lessons', conversion: '89%' },
      { button: 'Create Project', clicks: 189, page: 'Dashboard', conversion: '67%' },
      { button: 'Start AI Chat', clicks: 167, page: 'AI Chat', conversion: '72%' },
      { button: 'View Progress', clicks: 134, page: 'Progress', conversion: '85%' }
    ],
    franchiseData: [
      { franchise: 'Lincoln Elementary', users: 89, sessions: 145, growth: '+15%' },
      { franchise: 'Roosevelt Middle', users: 67, sessions: 123, growth: '+8%' },
      { franchise: 'Demo School', users: 23, sessions: 34, growth: '+45%' }
    ]
  };
};

// Main Component
const AnalyticsDashboard = ({ 
  userRole = 'teacher',
  franchiseId = 'demo'
}) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      setData(generateAnalyticsData(timeRange));
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  if (isLoading || !data) {
    return (
      <DashboardContainer>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <RefreshCw size={48} />
          <h2>Loading Analytics...</h2>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderLeft>
          <div>
            <Title>
              <BarChart3 size={32} />
              Analytics Dashboard
            </Title>
            <Subtitle>
              Comprehensive insights into student learning patterns and engagement
            </Subtitle>
          </div>
        </HeaderLeft>
        
        <HeaderControls>
          <TimeRangeSelector>
            <TimeButton 
              active={timeRange === '1d'} 
              onClick={() => setTimeRange('1d')}
            >
              Today
            </TimeButton>
            <TimeButton 
              active={timeRange === '7d'} 
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </TimeButton>
            <TimeButton 
              active={timeRange === '30d'} 
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </TimeButton>
          </TimeRangeSelector>
          
          <ControlButton>
            <Filter size={16} />
            Filter
          </ControlButton>
          <ControlButton>
            <Download size={16} />
            Export
          </ControlButton>
          <ControlButton onClick={() => setData(generateAnalyticsData(timeRange))}>
            <RefreshCw size={16} />
            Refresh
          </ControlButton>
        </HeaderControls>
      </DashboardHeader>

      {/* Overview Metrics */}
      <MetricsGrid>
        <MetricCard color="#4CAF50">
          <MetricIcon color="#4CAF50">
            <Users size={32} />
          </MetricIcon>
          <MetricValue>{data.overview.totalUsers}</MetricValue>
          <MetricLabel>Total Users</MetricLabel>
          <MetricChange positive>
            <TrendingUp size={12} />
            {data.userMetrics.userGrowth}
          </MetricChange>
        </MetricCard>

        <MetricCard color="#2196F3">
          <MetricIcon color="#2196F3">
            <Activity size={32} />
          </MetricIcon>
          <MetricValue>{data.overview.totalSessions}</MetricValue>
          <MetricLabel>Total Sessions</MetricLabel>
          <MetricChange positive>
            <TrendingUp size={12} />
            +23%
          </MetricChange>
        </MetricCard>

        <MetricCard color="#FF9800">
          <MetricIcon color="#FF9800">
            <Clock size={32} />
          </MetricIcon>
          <MetricValue>{data.overview.avgSessionDuration}</MetricValue>
          <MetricLabel>Avg Session Duration</MetricLabel>
          <MetricChange positive>
            <TrendingUp size={12} />
            +8%
          </MetricChange>
        </MetricCard>

        <MetricCard color="#9C27B0">
          <MetricIcon color="#9C27B0">
            <MousePointer size={32} />
          </MetricIcon>
          <MetricValue>{data.overview.totalButtonClicks}</MetricValue>
          <MetricLabel>Button Clicks</MetricLabel>
          <MetricChange positive>
            <TrendingUp size={12} />
            +15%
          </MetricChange>
        </MetricCard>

        <MetricCard color="#E91E63">
          <MetricIcon color="#E91E63">
            <Brain size={32} />
          </MetricIcon>
          <MetricValue>{data.engagement.aiInteractions}</MetricValue>
          <MetricLabel>AI Interactions</MetricLabel>
          <MetricChange positive>
            <TrendingUp size={12} />
            +34%
          </MetricChange>
        </MetricCard>

        <MetricCard color="#00BCD4">
          <MetricIcon color="#00BCD4">
            <Award size={32} />
          </MetricIcon>
          <MetricValue>{data.engagement.projectsCreated}</MetricValue>
          <MetricLabel>Projects Created</MetricLabel>
          <MetricChange positive>
            <TrendingUp size={12} />
            +28%
          </MetricChange>
        </MetricCard>
      </MetricsGrid>

      {/* Age Group Analytics */}
      <ChartsSection>
        <ChartCard>
          <ChartHeader>
            <ChartTitle>
              <Users size={20} />
              Usage by Age Group
            </ChartTitle>
          </ChartHeader>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data.ageGroups.map((group, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                padding: '12px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  background: group.color 
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold' }}>{group.group}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    {group.users} users • {group.sessions} sessions • {group.avgTime} avg time
                  </div>
                </div>
                <div style={{ 
                  background: group.color + '20',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {Math.round((group.users / data.overview.totalUsers) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <ChartTitle>
              <Target size={20} />
              Engagement Metrics
            </ChartTitle>
          </ChartHeader>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>Avg Time Per Page</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
                {data.engagement.avgTimePerPage}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>Pages Per Session</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
                {data.engagement.pagesPerSession}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>Bounce Rate</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>
                {data.overview.bounceRate}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>Conversion Rate</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9C27B0' }}>
                {data.overview.conversionRate}
              </div>
            </div>
          </div>
        </ChartCard>
      </ChartsSection>

      {/* Detailed Tables */}
      <DetailsSection>
        <TableCard>
          <ChartHeader>
            <ChartTitle>
              <Eye size={20} />
              Top Pages by Views
            </ChartTitle>
          </ChartHeader>
          
          <Table>
            <TableHeader>
              <div>Page</div>
              <div>Views</div>
              <div>Avg Time</div>
            </TableHeader>
            {data.topPages.map((page, index) => (
              <TableRow key={index}>
                <div>{page.page}</div>
                <div>{page.views}</div>
                <div>{page.time}</div>
              </TableRow>
            ))}
          </Table>
        </TableCard>

        <TableCard>
          <ChartHeader>
            <ChartTitle>
              <MousePointer size={20} />
              Top Button Interactions
            </ChartTitle>
          </ChartHeader>
          
          <Table>
            <TableHeader>
              <div>Button</div>
              <div>Clicks</div>
              <div>Rate</div>
            </TableHeader>
            {data.topButtons.map((button, index) => (
              <TableRow key={index}>
                <div>{button.button}</div>
                <div>{button.clicks}</div>
                <div>{button.conversion}</div>
              </TableRow>
            ))}
          </Table>
        </TableCard>
      </DetailsSection>

      {/* Franchise Level Data (for administrators) */}
      {userRole === 'admin' && (
        <TableCard style={{ marginTop: '25px' }}>
          <ChartHeader>
            <ChartTitle>
              <BookOpen size={20} />
              Franchise Performance
            </ChartTitle>
          </ChartHeader>
          
          <Table>
            <TableHeader>
              <div>Franchise</div>
              <div>Users</div>
              <div>Growth</div>
            </TableHeader>
            {data.franchiseData.map((franchise, index) => (
              <TableRow key={index}>
                <div>{franchise.franchise}</div>
                <div>{franchise.users}</div>
                <div style={{ color: '#4CAF50' }}>{franchise.growth}</div>
              </TableRow>
            ))}
          </Table>
        </TableCard>
      )}
    </DashboardContainer>
  );
};

export default AnalyticsDashboard;