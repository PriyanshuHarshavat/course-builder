import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Users,
  Shield,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  MessageSquare,
  Brain,
  ExternalLink,
  Download,
  RefreshCw,
  Search,
  Filter,
  Settings,
  Bell,
  BellOff,
  Star,
  Award,
  Flag,
  X,
  Plus,
  Minus,
  BookOpen,
  Code,
  Zap,
  Target,
  Crown,
  Flame
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Main Container
const DashboardContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
  animation: ${fadeIn} 0.6s ease-out;
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

const HeaderTitle = styled.h1`
  font-size: 28px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderSubtitle = styled.p`
  margin: 5px 0 0 0;
  font-size: 16px;
  opacity: 0.9;
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
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  ${props => props.active && css`
    background: rgba(255, 255, 255, 0.3);
  `}
`;

// Quick Stats Grid
const QuickStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-3px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => 
      props.type === 'students' ? '#4CAF50' :
      props.type === 'safety' ? '#FF9800' :
      props.type === 'activity' ? '#2196F3' :
      props.type === 'achievement' ? '#9C27B0' :
      '#fff'
    };
  }
`;

const StatIcon = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
  color: ${props => 
    props.type === 'students' ? '#4CAF50' :
    props.type === 'safety' ? '#FF9800' :
    props.type === 'activity' ? '#2196F3' :
    props.type === 'achievement' ? '#9C27B0' :
    '#fff'
  };
  
  ${props => props.alert && css`
    animation: ${pulse} 2s infinite;
  `}
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
`;

const StatTrend = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${props => props.positive ? '#4CAF50' : props.negative ? '#f44336' : '#fff'};
`;

// Main Content Area
const ContentArea = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

// Student Activity Panel
const ActivityPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 20px;
  gap: 15px;
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const FilterControls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const FilterSelect = styled.select`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  
  option {
    background: #333;
    color: white;
  }
`;

// Student List
const StudentList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`;

const StudentCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StudentAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${props => props.color || 'linear-gradient(135deg, #4CAF50, #45a049)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

const StudentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const StudentName = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
`;

const StudentStatus = styled.div`
  font-size: 12px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StudentMetrics = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Metric = styled.div`
  text-align: center;
  font-size: 11px;
`;

const MetricValue = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: ${props => 
    props.type === 'safety' && props.value > 0 ? '#f44336' :
    props.type === 'activity' ? '#4CAF50' :
    props.type === 'progress' ? '#2196F3' :
    '#fff'
  };
`;

const MetricLabel = styled.div`
  opacity: 0.8;
  margin-top: 2px;
`;

// Alerts Panel
const AlertsPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const AlertsList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const AlertCard = styled.div`
  background: ${props => 
    props.severity === 'high' ? 'rgba(244, 67, 54, 0.2)' :
    props.severity === 'medium' ? 'rgba(255, 152, 0, 0.2)' :
    'rgba(33, 150, 243, 0.2)'
  };
  border-left: 4px solid ${props => 
    props.severity === 'high' ? '#f44336' :
    props.severity === 'medium' ? '#FF9800' :
    '#2196F3'
  };
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  font-size: 13px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const AlertType = styled.div`
  font-weight: bold;
  color: ${props => 
    props.severity === 'high' ? '#f44336' :
    props.severity === 'medium' ? '#FF9800' :
    '#2196F3'
  };
`;

const AlertTime = styled.div`
  font-size: 11px;
  opacity: 0.8;
`;

const AlertMessage = styled.div`
  line-height: 1.4;
  margin-bottom: 8px;
`;

const AlertActions = styled.div`
  display: flex;
  gap: 8px;
`;

const AlertButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Analytics Section
const AnalyticsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ChartCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const ChartTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ChartPlaceholder = styled.div`
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
`;

// Mock Data Generator
const generateMockStudentData = () => {
  const names = [
    'Emma Rodriguez', 'Liam Chen', 'Sofia Patel', 'Noah Williams', 'Ava Johnson',
    'Ethan Brown', 'Isabella Davis', 'Mason Garcia', 'Mia Wilson', 'Lucas Martinez',
    'Charlotte Taylor', 'Benjamin Lee', 'Amelia Anderson', 'Jacob Thompson', 'Harper White'
  ];
  
  const avatarColors = [
    'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    'linear-gradient(135deg, #4ECDC4, #44A08D)', 
    'linear-gradient(135deg, #45B7D1, #96C93D)',
    'linear-gradient(135deg, #96C93D, #f093fb)',
    'linear-gradient(135deg, #4facfe, #00f2fe)'
  ];
  
  return names.map((name, index) => ({
    id: index + 1,
    name,
    avatar: name.split(' ').map(n => n[0]).join(''),
    avatarColor: avatarColors[index % avatarColors.length],
    isOnline: Math.random() > 0.3,
    currentActivity: Math.random() > 0.5 ? 'AI Chat' : Math.random() > 0.5 ? 'AI Compare' : 'AI Tools',
    sessionTime: Math.floor(Math.random() * 45) + 5,
    safetyViolations: Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0,
    aiInteractions: Math.floor(Math.random() * 25) + 5,
    progressScore: Math.floor(Math.random() * 100) + 1,
    lastActive: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString()
  }));
};

const generateMockAlerts = () => {
  const alertTypes = [
    {
      type: 'Safety Violation',
      severity: 'high',
      message: 'Student attempted to share personal information',
      student: 'Emma Rodriguez',
      action: 'Content blocked automatically'
    },
    {
      type: 'Extended Session',
      severity: 'medium', 
      message: 'Student has been active for over 45 minutes',
      student: 'Liam Chen',
      action: 'Break reminder sent'
    },
    {
      type: 'Achievement Unlocked',
      severity: 'low',
      message: 'Student completed AI Ethics module',
      student: 'Sofia Patel',
      action: 'Badge awarded'
    },
    {
      type: 'Inappropriate Content',
      severity: 'high',
      message: 'AI prompt contained blocked keywords',
      student: 'Noah Williams', 
      action: 'Content filtered and logged'
    },
    {
      type: 'New Tool Access',
      severity: 'medium',
      message: 'Student accessed AI Art Generator for first time',
      student: 'Ava Johnson',
      action: 'Supervision recommended'
    }
  ];
  
  return alertTypes.map((alert, index) => ({
    id: index + 1,
    ...alert,
    timestamp: new Date(Date.now() - Math.random() * 7200000),
    dismissed: false
  }));
};

// Main Component
const TeacherDashboard = ({ 
  classId = 'class-2024-ai',
  onStudentSelect = () => {},
  onAlertAction = () => {},
  onExportData = () => {}
}) => {
  const [students, setStudents] = useState(generateMockStudentData());
  const [alerts, setAlerts] = useState(generateMockAlerts());
  const [activeView, setActiveView] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Auto-refresh data
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setStudents(prev => prev.map(student => ({
        ...student,
        sessionTime: student.isOnline ? student.sessionTime + 1 : student.sessionTime,
        lastActive: student.isOnline ? new Date().toLocaleTimeString() : student.lastActive
      })));
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    onAlertAction({ type: 'dismiss', alertId });
  };

  const getQuickStats = () => {
    const activeStudents = students.filter(s => s.isOnline).length;
    const totalSafetyViolations = students.reduce((sum, s) => sum + s.safetyViolations, 0);
    const totalInteractions = students.reduce((sum, s) => sum + s.aiInteractions, 0);
    const avgProgress = Math.round(students.reduce((sum, s) => sum + s.progressScore, 0) / students.length);
    
    return {
      activeStudents,
      totalStudents: students.length,
      safetyViolations: totalSafetyViolations,
      aiInteractions: totalInteractions,
      avgProgress
    };
  };

  const stats = getQuickStats();
  const filteredStudents = filterStatus === 'all' ? students : 
                          filterStatus === 'online' ? students.filter(s => s.isOnline) :
                          filterStatus === 'offline' ? students.filter(s => !s.isOnline) :
                          students.filter(s => s.safetyViolations > 0);

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderLeft>
          <div>
            <HeaderTitle>
              <Users size={32} />
              Teacher Dashboard
              <Crown size={32} />
            </HeaderTitle>
            <HeaderSubtitle>
              Monitor student AI learning progress and safety • Class: AI Explorers 2024
            </HeaderSubtitle>
          </div>
        </HeaderLeft>
        
        <HeaderControls>
          <ControlButton 
            active={notificationsEnabled}
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            {notificationsEnabled ? <Bell size={16} /> : <BellOff size={16} />}
            Alerts
          </ControlButton>
          <ControlButton 
            active={autoRefresh}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw size={16} />
            Auto-Refresh
          </ControlButton>
          <ControlButton onClick={onExportData}>
            <Download size={16} />
            Export
          </ControlButton>
        </HeaderControls>
      </DashboardHeader>

      {/* Quick Stats */}
      <QuickStatsGrid>
        <StatCard type="students">
          <StatIcon type="students">
            <Users size={32} />
          </StatIcon>
          <StatValue>{stats.activeStudents}/{stats.totalStudents}</StatValue>
          <StatLabel>Active Students</StatLabel>
          <StatTrend positive={stats.activeStudents > stats.totalStudents * 0.7}>
            <TrendingUp size={12} />
            {Math.round(stats.activeStudents/stats.totalStudents*100)}% online
          </StatTrend>
        </StatCard>

        <StatCard type="safety">
          <StatIcon type="safety" alert={stats.safetyViolations > 5}>
            <Shield size={32} />
          </StatIcon>
          <StatValue>{stats.safetyViolations}</StatValue>
          <StatLabel>Safety Alerts</StatLabel>
          <StatTrend negative={stats.safetyViolations > 0}>
            {stats.safetyViolations > 0 ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
            {stats.safetyViolations === 0 ? 'All Clear' : 'Needs Attention'}
          </StatTrend>
        </StatCard>

        <StatCard type="activity">
          <StatIcon type="activity">
            <Activity size={32} />
          </StatIcon>
          <StatValue>{stats.aiInteractions}</StatValue>
          <StatLabel>AI Interactions</StatLabel>
          <StatTrend positive>
            <TrendingUp size={12} />
            High engagement
          </StatTrend>
        </StatCard>

        <StatCard type="achievement">
          <StatIcon type="achievement">
            <Target size={32} />
          </StatIcon>
          <StatValue>{stats.avgProgress}%</StatValue>
          <StatLabel>Avg Progress</StatLabel>
          <StatTrend positive={stats.avgProgress > 75}>
            <Star size={12} />
            {stats.avgProgress > 75 ? 'Excellent' : 'Good progress'}
          </StatTrend>
        </StatCard>
      </QuickStatsGrid>

      <ContentArea>
        {/* Student Activity Panel */}
        <ActivityPanel>
          <PanelHeader>
            <PanelTitle>
              <Activity size={20} />
              Live Student Activity
            </PanelTitle>
            <FilterControls>
              <FilterSelect 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Students</option>
                <option value="online">Online Only</option>
                <option value="offline">Offline</option>
                <option value="alerts">With Alerts</option>
              </FilterSelect>
            </FilterControls>
          </PanelHeader>
          
          <StudentList>
            {filteredStudents.map(student => (
              <StudentCard key={student.id} onClick={() => onStudentSelect(student)}>
                <StudentAvatar color={student.avatarColor}>
                  {student.avatar}
                </StudentAvatar>
                
                <StudentInfo>
                  <StudentName>{student.name}</StudentName>
                  <StudentStatus>
                    {student.isOnline ? (
                      <>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50' }} />
                        {student.currentActivity} • {student.sessionTime}m
                      </>
                    ) : (
                      <>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9E9E9E' }} />
                        Last active: {student.lastActive}
                      </>
                    )}
                  </StudentStatus>
                </StudentInfo>
                
                <StudentMetrics>
                  <Metric>
                    <MetricValue type="safety" value={student.safetyViolations}>
                      {student.safetyViolations}
                    </MetricValue>
                    <MetricLabel>Alerts</MetricLabel>
                  </Metric>
                  <Metric>
                    <MetricValue type="activity">
                      {student.aiInteractions}
                    </MetricValue>
                    <MetricLabel>AI Uses</MetricLabel>
                  </Metric>
                  <Metric>
                    <MetricValue type="progress">
                      {student.progressScore}%
                    </MetricValue>
                    <MetricLabel>Progress</MetricLabel>
                  </Metric>
                </StudentMetrics>
              </StudentCard>
            ))}
          </StudentList>
        </ActivityPanel>

        {/* Alerts Panel */}
        <AlertsPanel>
          <PanelHeader>
            <PanelTitle>
              <AlertTriangle size={20} />
              Recent Alerts ({alerts.length})
            </PanelTitle>
          </PanelHeader>
          
          <AlertsList>
            {alerts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', opacity: 0.7 }}>
                <CheckCircle size={48} />
                <p style={{ margin: '15px 0 0 0' }}>No alerts! Everything looks good.</p>
              </div>
            ) : (
              alerts.map(alert => (
                <AlertCard key={alert.id} severity={alert.severity}>
                  <AlertHeader>
                    <AlertType severity={alert.severity}>
                      {alert.type}
                    </AlertType>
                    <AlertTime>
                      {alert.timestamp.toLocaleTimeString()}
                    </AlertTime>
                  </AlertHeader>
                  
                  <AlertMessage>
                    <strong>{alert.student}:</strong> {alert.message}
                  </AlertMessage>
                  
                  <div style={{ fontSize: '11px', opacity: '0.8', marginBottom: '8px' }}>
                    Action taken: {alert.action}
                  </div>
                  
                  <AlertActions>
                    <AlertButton onClick={() => dismissAlert(alert.id)}>
                      Dismiss
                    </AlertButton>
                    <AlertButton onClick={() => onStudentSelect({ name: alert.student })}>
                      View Student
                    </AlertButton>
                  </AlertActions>
                </AlertCard>
              ))
            )}
          </AlertsList>
        </AlertsPanel>
      </ContentArea>

      {/* Analytics Section */}
      <AnalyticsSection>
        <PanelHeader>
          <PanelTitle>
            <BarChart3 size={20} />
            Class Analytics & Insights
          </PanelTitle>
        </PanelHeader>
        
        <AnalyticsGrid>
          <ChartCard>
            <ChartTitle>
              <Clock size={16} />
              Daily Activity
            </ChartTitle>
            <ChartPlaceholder>
              📊 Activity timeline chart would display here
            </ChartPlaceholder>
          </ChartCard>
          
          <ChartCard>
            <ChartTitle>
              <PieChart size={16} />
              AI Tool Usage
            </ChartTitle>
            <ChartPlaceholder>
              🥧 Tool usage breakdown chart would display here
            </ChartPlaceholder>
          </ChartCard>
          
          <ChartCard>
            <ChartTitle>
              <TrendingUp size={16} />
              Progress Trends
            </ChartTitle>
            <ChartPlaceholder>
              📈 Student progress trends would display here
            </ChartPlaceholder>
          </ChartCard>
        </AnalyticsGrid>
      </AnalyticsSection>
    </DashboardContainer>
  );
};

export default TeacherDashboard;