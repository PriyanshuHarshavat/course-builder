import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  User,
  Clock,
  MessageSquare,
  Brain,
  Shield,
  Activity,
  TrendingUp,
  Calendar,
  Eye,
  AlertTriangle,
  CheckCircle,
  Star,
  Award,
  Target,
  BookOpen,
  Code,
  Zap,
  ExternalLink,
  Download,
  ArrowLeft,
  Settings,
  Flag,
  X,
  PlayCircle,
  PauseCircle,
  RotateCcw
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Main Container
const MonitorContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
  animation: ${fadeIn} 0.6s ease-out;
`;

// Header
const MonitorHeader = styled.div`
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
  gap: 20px;
`;

const StudentAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.color || 'linear-gradient(135deg, #4CAF50, #45a049)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
`;

const StudentInfo = styled.div``;

const StudentName = styled.h1`
  margin: 0;
  font-size: 28px;
`;

const StudentDetails = styled.div`
  font-size: 16px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 5px;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  background: ${props => props.online ? 'rgba(76, 175, 80, 0.2)' : 'rgba(158, 158, 158, 0.2)'};
  font-size: 14px;
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
  text-align: center;
  position: relative;
  
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
  font-size: 28px;
  margin-bottom: 10px;
  color: ${props => props.color || '#fff'};
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const MetricLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

// Activity Timeline
const ActivitySection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TimelineContainer = styled.div`
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

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  animation: ${slideIn} 0.5s ease-out;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TimelineIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${props => 
    props.type === 'chat' ? '#4CAF50' :
    props.type === 'compare' ? '#2196F3' :
    props.type === 'tools' ? '#FF9800' :
    props.type === 'safety' ? '#f44336' :
    '#9C27B0'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineAction = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const TimelineDetails = styled.div`
  font-size: 12px;
  opacity: 0.8;
  line-height: 1.3;
`;

const TimelineTime = styled.div`
  font-size: 11px;
  opacity: 0.7;
  text-align: right;
`;

// Safety Monitoring
const SafetySection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
`;

const SafetyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const SafetyCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
`;

const SafetyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 12px;
`;

const SafetyTitle = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const SafetyStatus = styled.div`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  background: ${props => 
    props.status === 'safe' ? 'rgba(76, 175, 80, 0.2)' :
    props.status === 'warning' ? 'rgba(255, 152, 0, 0.2)' :
    'rgba(244, 67, 54, 0.2)'
  };
  color: ${props => 
    props.status === 'safe' ? '#4CAF50' :
    props.status === 'warning' ? '#FF9800' :
    '#f44336'
  };
`;

const SafetyMetric = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;

const SafetyDescription = styled.div`
  font-size: 12px;
  opacity: 0.8;
  line-height: 1.3;
`;

// Progress Section
const ProgressSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ProgressCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  height: 8px;
  margin: 10px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  background: ${props => props.color || '#4CAF50'};
  height: 100%;
  width: ${props => props.percentage || 0}%;
  border-radius: 10px;
  transition: width 0.3s ease;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Achievement = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const AchievementIcon = styled.div`
  color: #FFD700;
`;

// Generate mock student data
const generateStudentData = (studentId) => {
  const activities = [
    { type: 'chat', action: 'Started AI Chat session', details: 'Discussed machine learning basics for 15 minutes', time: '10:30 AM' },
    { type: 'compare', action: 'Used AI Comparison tool', details: 'Compared OpenAI vs Google responses for "What is AI?"', time: '10:45 AM' },
    { type: 'tools', action: 'Accessed AI Art Generator', details: 'Created 3 educational artwork pieces', time: '11:00 AM' },
    { type: 'safety', action: 'Safety filter triggered', details: 'Attempted inappropriate prompt - automatically blocked', time: '11:15 AM' },
    { type: 'achievement', action: 'Earned new badge', details: 'Completed "AI Explorer" learning path', time: '11:30 AM' },
    { type: 'chat', action: 'Continued AI Chat', details: 'Asked about neural networks and deep learning', time: '11:45 AM' }
  ];
  
  return {
    id: studentId,
    name: 'Emma Rodriguez',
    avatar: 'ER',
    avatarColor: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    isOnline: true,
    currentActivity: 'AI Chat',
    sessionStart: '10:30 AM',
    totalSessionTime: 45,
    activities: activities,
    safety: {
      totalChecks: 127,
      blocked: 2,
      flagged: 5,
      status: 'safe'
    },
    progress: {
      overallCompletion: 78,
      aiBasics: 90,
      ethics: 65,
      programming: 82,
      creativity: 88
    },
    achievements: [
      { name: 'First Steps', icon: '🎯', earned: true },
      { name: 'AI Explorer', icon: '🔍', earned: true },
      { name: 'Code Warrior', icon: '💻', earned: true },
      { name: 'Safety Champion', icon: '🛡️', earned: false },
      { name: 'Creative Mind', icon: '🎨', earned: true }
    ]
  };
};

// Main Component
const StudentMonitor = ({ 
  studentId = 'student-1',
  onBack = () => {},
  onAlert = () => {},
  onIntervention = () => {}
}) => {
  const [student, setStudent] = useState(generateStudentData(studentId));
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  // Live updates
  useEffect(() => {
    if (!isLiveMonitoring) return;
    
    const interval = setInterval(() => {
      setStudent(prev => ({
        ...prev,
        totalSessionTime: prev.totalSessionTime + 1
      }));
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [isLiveMonitoring]);

  const getSafetyStatus = () => {
    const { safety } = student;
    const violationRate = (safety.blocked + safety.flagged) / safety.totalChecks;
    
    if (violationRate < 0.05) return 'safe';
    if (violationRate < 0.15) return 'warning';
    return 'danger';
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <MonitorContainer>
      <MonitorHeader>
        <HeaderLeft>
          <StudentAvatar color={student.avatarColor}>
            {student.avatar}
          </StudentAvatar>
          <StudentInfo>
            <StudentName>{student.name}</StudentName>
            <StudentDetails>
              <StatusIndicator online={student.isOnline}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: student.isOnline ? '#4CAF50' : '#9E9E9E' 
                }} />
                {student.isOnline ? 'Online' : 'Offline'}
              </StatusIndicator>
              <span>Session: {formatTime(student.totalSessionTime)}</span>
              <span>Activity: {student.currentActivity}</span>
            </StudentDetails>
          </StudentInfo>
        </HeaderLeft>
        
        <HeaderControls>
          <ControlButton onClick={onBack}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </ControlButton>
          <ControlButton 
            onClick={() => setIsLiveMonitoring(!isLiveMonitoring)}
            style={{ background: isLiveMonitoring ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 255, 255, 0.2)' }}
          >
            {isLiveMonitoring ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
            {isLiveMonitoring ? 'Pause' : 'Resume'} Live
          </ControlButton>
          <ControlButton>
            <Download size={16} />
            Export Report
          </ControlButton>
        </HeaderControls>
      </MonitorHeader>

      {/* Key Metrics */}
      <MetricsGrid>
        <MetricCard color="#4CAF50">
          <MetricIcon color="#4CAF50">
            <Clock size={28} />
          </MetricIcon>
          <MetricValue>{formatTime(student.totalSessionTime)}</MetricValue>
          <MetricLabel>Session Time</MetricLabel>
        </MetricCard>

        <MetricCard color="#2196F3">
          <MetricIcon color="#2196F3">
            <Activity size={28} />
          </MetricIcon>
          <MetricValue>{student.activities.length}</MetricValue>
          <MetricLabel>AI Interactions</MetricLabel>
        </MetricCard>

        <MetricCard color={getSafetyStatus() === 'safe' ? '#4CAF50' : getSafetyStatus() === 'warning' ? '#FF9800' : '#f44336'}>
          <MetricIcon color={getSafetyStatus() === 'safe' ? '#4CAF50' : getSafetyStatus() === 'warning' ? '#FF9800' : '#f44336'}>
            <Shield size={28} />
          </MetricIcon>
          <MetricValue>{student.safety.blocked + student.safety.flagged}</MetricValue>
          <MetricLabel>Safety Alerts</MetricLabel>
        </MetricCard>

        <MetricCard color="#9C27B0">
          <MetricIcon color="#9C27B0">
            <Target size={28} />
          </MetricIcon>
          <MetricValue>{student.progress.overallCompletion}%</MetricValue>
          <MetricLabel>Progress</MetricLabel>
        </MetricCard>
      </MetricsGrid>

      {/* Activity Timeline */}
      <ActivitySection>
        <SectionHeader>
          <SectionTitle>
            <Activity size={20} />
            Recent Activity Timeline
          </SectionTitle>
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px'
            }}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </SectionHeader>
        
        <TimelineContainer>
          {student.activities.map((activity, index) => (
            <TimelineItem key={index}>
              <TimelineIcon type={activity.type}>
                {activity.type === 'chat' && <MessageSquare size={16} />}
                {activity.type === 'compare' && <Brain size={16} />}
                {activity.type === 'tools' && <ExternalLink size={16} />}
                {activity.type === 'safety' && <Shield size={16} />}
                {activity.type === 'achievement' && <Star size={16} />}
              </TimelineIcon>
              
              <TimelineContent>
                <TimelineAction>{activity.action}</TimelineAction>
                <TimelineDetails>{activity.details}</TimelineDetails>
              </TimelineContent>
              
              <TimelineTime>{activity.time}</TimelineTime>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </ActivitySection>

      {/* Safety & Progress */}
      <ProgressSection>
        {/* Safety Monitoring */}
        <ProgressCard>
          <SectionTitle>
            <Shield size={20} />
            Safety Monitoring
          </SectionTitle>
          
          <SafetyGrid>
            <SafetyCard>
              <SafetyHeader>
                <SafetyTitle>
                  <CheckCircle size={16} />
                  Content Checks
                </SafetyTitle>
                <SafetyStatus status={getSafetyStatus()}>
                  {getSafetyStatus().toUpperCase()}
                </SafetyStatus>
              </SafetyHeader>
              <SafetyMetric>{student.safety.totalChecks}</SafetyMetric>
              <SafetyDescription>
                Total content safety checks performed during all AI interactions
              </SafetyDescription>
            </SafetyCard>
            
            <SafetyCard>
              <SafetyHeader>
                <SafetyTitle>
                  <X size={16} />
                  Blocked Content
                </SafetyTitle>
              </SafetyHeader>
              <SafetyMetric style={{ color: student.safety.blocked > 0 ? '#f44336' : '#4CAF50' }}>
                {student.safety.blocked}
              </SafetyMetric>
              <SafetyDescription>
                Inappropriate content automatically blocked by safety filters
              </SafetyDescription>
            </SafetyCard>
            
            <SafetyCard>
              <SafetyHeader>
                <SafetyTitle>
                  <Flag size={16} />
                  Flagged Items
                </SafetyTitle>
              </SafetyHeader>
              <SafetyMetric style={{ color: student.safety.flagged > 0 ? '#FF9800' : '#4CAF50' }}>
                {student.safety.flagged}
              </SafetyMetric>
              <SafetyDescription>
                Content flagged for teacher review and guidance
              </SafetyDescription>
            </SafetyCard>
          </SafetyGrid>
        </ProgressCard>

        {/* Learning Progress */}
        <ProgressCard>
          <SectionTitle>
            <TrendingUp size={20} />
            Learning Progress
          </SectionTitle>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>AI Basics</span>
              <span>{student.progress.aiBasics}%</span>
            </div>
            <ProgressBar>
              <ProgressFill percentage={student.progress.aiBasics} color="#4CAF50" />
            </ProgressBar>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Ethics & Safety</span>
              <span>{student.progress.ethics}%</span>
            </div>
            <ProgressBar>
              <ProgressFill percentage={student.progress.ethics} color="#2196F3" />
            </ProgressBar>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Programming</span>
              <span>{student.progress.programming}%</span>
            </div>
            <ProgressBar>
              <ProgressFill percentage={student.progress.programming} color="#FF9800" />
            </ProgressBar>
          </div>

          <SectionTitle style={{ fontSize: '16px', marginTop: '20px', marginBottom: '15px' }}>
            <Award size={16} />
            Achievements
          </SectionTitle>
          
          <AchievementsList>
            {student.achievements.map((achievement, index) => (
              <Achievement key={index}>
                <AchievementIcon>
                  {achievement.earned ? achievement.icon : '⚪'}
                </AchievementIcon>
                <span style={{ opacity: achievement.earned ? 1 : 0.5 }}>
                  {achievement.name}
                </span>
                {achievement.earned && <CheckCircle size={16} style={{ color: '#4CAF50' }} />}
              </Achievement>
            ))}
          </AchievementsList>
        </ProgressCard>
      </ProgressSection>
    </MonitorContainer>
  );
};

export default StudentMonitor;