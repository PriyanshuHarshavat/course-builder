import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useSession } from './SessionManager';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  BookOpen, 
  Users,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const ProgressContainer = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
  padding: 24px;
  margin: 16px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(255,255,255,0.3);
`;

const ProgressTitle = styled.h2`
  margin: 0;
  color: #2D3436;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TimeRemaining = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.timeLeft < 300 ? '#ff6b6b' : '#4CAF50'};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 18px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-left: 4px solid ${props => props.color || '#4CAF50'};
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const MetricIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.color || '#4CAF50'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const MetricValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #2D3436;
  margin-bottom: 4px;
`;

const MetricLabel = styled.div`
  font-size: 14px;
  color: #636E72;
  margin-bottom: 8px;
`;

const MetricChange = styled.div`
  font-size: 12px;
  color: ${props => props.positive ? '#4CAF50' : '#ff6b6b'};
  font-weight: 600;
`;

const ProgressSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #2D3436;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActivityProgressBar = styled.div`
  background: #f1f3f4;
  border-radius: 8px;
  height: 12px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 8px;
  width: ${props => props.percentage || 0}%;
  transition: width 0.6s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f4;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityInfo = styled.div`
  flex: 1;
`;

const ActivityName = styled.div`
  font-weight: 600;
  color: #2D3436;
  margin-bottom: 4px;
`;

const ActivityMeta = styled.div`
  font-size: 12px;
  color: #636E72;
`;

const ActivityStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'completed': return '#e8f5e8';
      case 'in-progress': return '#fff3e0';
      case 'not-started': return '#f5f5f5';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#2e7d2e';
      case 'in-progress': return '#f57c00';
      case 'not-started': return '#666';
      default: return '#666';
    }
  }};
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background: #5a67d8;
    transform: translateY(-1px);
  }
`;

// Progress Tracking System - Core Component
const ProgressTracker = ({ 
  studentId = 'demo-student', 
  sessionId = 'session-' + Date.now(),
  ageGroup = '10-11',
  mode = 'student' // 'student' | 'instructor' | 'franchise'
}) => {
  const [sessionData, setSessionData] = useState({
    startTime: new Date(),
    duration: 3600, // 60 minutes
    timeLeft: 3600,
    activitiesCompleted: 0,
    totalActivities: 6,
    currentActivity: 'Welcome & Setup',
    score: 0,
    badgesEarned: 0,
    helpRequests: 0,
    isActive: true
  });

  const [progressMetrics, setProgressMetrics] = useState({
    overallProgress: 25,
    pythonProgress: 40,
    quizProgress: 60,
    ethicsProgress: 20,
    comprehensionScore: 78,
    engagementLevel: 85,
    timeEfficiency: 92,
    collaborationScore: 70
  });

  const [activities, setActivities] = useState([
    {
      id: 'welcome',
      name: 'Welcome & Introduction to AI',
      type: 'title',
      timeSpent: 180, // 3 minutes
      maxTime: 300, // 5 minutes
      score: 100,
      status: 'completed',
      difficulty: 'beginner'
    },
    {
      id: 'ai-basics-quiz',
      name: 'AI Basics Quiz',
      type: 'quiz',
      timeSpent: 240, // 4 minutes
      maxTime: 600, // 10 minutes
      score: 85,
      status: 'completed',
      difficulty: 'beginner'
    },
    {
      id: 'python-hello',
      name: 'Python: Hello AI World',
      type: 'python',
      timeSpent: 420, // 7 minutes
      maxTime: 900, // 15 minutes
      score: 95,
      status: 'in-progress',
      difficulty: 'beginner'
    },
    {
      id: 'ethics-scenario',
      name: 'AI Ethics: Fairness Scenario',
      type: 'ethics',
      timeSpent: 0,
      maxTime: 600, // 10 minutes
      score: null,
      status: 'not-started',
      difficulty: 'intermediate'
    },
    {
      id: 'ai-pet-creation',
      name: 'Create Your AI Pet',
      type: 'python',
      timeSpent: 0,
      maxTime: 1200, // 20 minutes
      score: null,
      status: 'not-started',
      difficulty: 'intermediate'
    },
    {
      id: 'final-quiz',
      name: 'Session Wrap-up Quiz',
      type: 'quiz',
      timeSpent: 0,
      maxTime: 600, // 10 minutes
      score: null,
      status: 'not-started',
      difficulty: 'beginner'
    }
  ]);

  // Session timer
  useEffect(() => {
    let interval;
    if (sessionData.isActive && sessionData.timeLeft > 0) {
      interval = setInterval(() => {
        setSessionData(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionData.isActive, sessionData.timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const calculateProgress = (timeSpent, maxTime) => {
    return Math.min((timeSpent / maxTime) * 100, 100);
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={14} />;
      case 'in-progress': return <Clock size={14} />;
      case 'not-started': return <AlertCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  // Export progress report
  const exportReport = () => {
    const reportData = {
      student: studentId,
      session: sessionId,
      ageGroup,
      date: new Date().toISOString(),
      sessionData,
      progressMetrics,
      activities: activities.map(a => ({
        name: a.name,
        type: a.type,
        timeSpent: a.timeSpent,
        score: a.score,
        status: a.status,
        efficiency: Math.round((a.timeSpent / a.maxTime) * 100)
      }))
    };
    
    console.log('Progress Report Generated:', reportData);
    // In real implementation, this would generate PDF/CSV download
    alert('Progress report generated! Check console for details.');
  };

  return (
    <ProgressContainer>
      <ProgressHeader>
        <ProgressTitle>
          <TrendingUp size={28} />
          Progress Tracking
          {mode === 'instructor' && ' - Instructor View'}
          {mode === 'franchise' && ' - Franchise Analytics'}
        </ProgressTitle>
        <TimeRemaining timeLeft={sessionData.timeLeft}>
          <Clock size={20} />
          {formatTime(sessionData.timeLeft)}
        </TimeRemaining>
      </ProgressHeader>

      {/* Key Metrics */}
      <MetricsGrid>
        <MetricCard color="#4CAF50">
          <MetricIcon color="#4CAF50">
            <Target size={24} />
          </MetricIcon>
          <MetricValue>{sessionData.activitiesCompleted}/{sessionData.totalActivities}</MetricValue>
          <MetricLabel>Activities Completed</MetricLabel>
          <MetricChange positive>+{sessionData.activitiesCompleted} this session</MetricChange>
        </MetricCard>

        <MetricCard color="#2196F3">
          <MetricIcon color="#2196F3">
            <BarChart3 size={24} />
          </MetricIcon>
          <MetricValue>{progressMetrics.comprehensionScore}%</MetricValue>
          <MetricLabel>Comprehension Score</MetricLabel>
          <MetricChange positive>+12% from last session</MetricChange>
        </MetricCard>

        <MetricCard color="#FF9800">
          <MetricIcon color="#FF9800">
            <Award size={24} />
          </MetricIcon>
          <MetricValue>{sessionData.badgesEarned}</MetricValue>
          <MetricLabel>Badges Earned</MetricLabel>
          <MetricChange positive>+{sessionData.badgesEarned} today</MetricChange>
        </MetricCard>

        <MetricCard color="#9C27B0">
          <MetricIcon color="#9C27B0">
            <BookOpen size={24} />
          </MetricIcon>
          <MetricValue>{progressMetrics.engagementLevel}%</MetricValue>
          <MetricLabel>Engagement Level</MetricLabel>
          <MetricChange positive>Above average</MetricChange>
        </MetricCard>
      </MetricsGrid>

      {/* Current Session Activities */}
      <ProgressSection>
        <SectionTitle>
          <Clock size={20} />
          Current Session Progress
          <ExportButton onClick={exportReport} style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '12px' }}>
            <Download size={14} />
            Export Report
          </ExportButton>
        </SectionTitle>
        
        {activities.map((activity) => (
          <ActivityItem key={activity.id}>
            <ActivityInfo>
              <ActivityName>{activity.name}</ActivityName>
              <ActivityMeta>
                {activity.type.toUpperCase()} • {activity.difficulty} • 
                Time: {Math.floor(activity.timeSpent / 60)}m / {Math.floor(activity.maxTime / 60)}m
                {activity.score && ` • Score: ${activity.score}%`}
              </ActivityMeta>
              <ActivityProgressBar>
                <ProgressFill percentage={calculateProgress(activity.timeSpent, activity.maxTime)} />
              </ActivityProgressBar>
            </ActivityInfo>
            <ActivityStatus status={activity.status}>
              {getStatusIcon(activity.status)}
              {activity.status.replace('-', ' ').toUpperCase()}
            </ActivityStatus>
          </ActivityItem>
        ))}
      </ProgressSection>

      {/* Performance Breakdown */}
      <ProgressSection>
        <SectionTitle>
          <BarChart3 size={20} />
          Performance Breakdown
        </SectionTitle>
        
        <MetricsGrid>
          <div>
            <MetricLabel>Python Coding</MetricLabel>
            <ActivityProgressBar>
              <ProgressFill percentage={progressMetrics.pythonProgress} />
            </ActivityProgressBar>
            <div style={{ fontSize: '12px', color: '#636E72', marginTop: '4px' }}>
              {progressMetrics.pythonProgress}% Complete
            </div>
          </div>
          
          <div>
            <MetricLabel>Quiz Performance</MetricLabel>
            <ActivityProgressBar>
              <ProgressFill percentage={progressMetrics.quizProgress} />
            </ActivityProgressBar>
            <div style={{ fontSize: '12px', color: '#636E72', marginTop: '4px' }}>
              {progressMetrics.quizProgress}% Average Score
            </div>
          </div>
          
          <div>
            <MetricLabel>Ethics Understanding</MetricLabel>
            <ActivityProgressBar>
              <ProgressFill percentage={progressMetrics.ethicsProgress} />
            </ActivityProgressBar>
            <div style={{ fontSize: '12px', color: '#636E72', marginTop: '4px' }}>
              {progressMetrics.ethicsProgress}% Progress
            </div>
          </div>
          
          <div>
            <MetricLabel>Time Efficiency</MetricLabel>
            <ActivityProgressBar>
              <ProgressFill percentage={progressMetrics.timeEfficiency} />
            </ActivityProgressBar>
            <div style={{ fontSize: '12px', color: '#636E72', marginTop: '4px' }}>
              {progressMetrics.timeEfficiency}% Efficient
            </div>
          </div>
        </MetricsGrid>
      </ProgressSection>

      {mode === 'instructor' && (
        <ProgressSection>
          <SectionTitle>
            <Users size={20} />
            Instructor Insights
          </SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
              <strong>Recommendation:</strong> Student is excelling at Python. Consider advanced challenges.
            </div>
            <div style={{ padding: '12px', background: '#fff3e0', borderRadius: '8px' }}>
              <strong>Watch:</strong> Ethics section needs more time. Plan discussion.
            </div>
            <div style={{ padding: '12px', background: '#e8f5e8', borderRadius: '8px' }}>
              <strong>Success:</strong> High engagement and comprehension scores!
            </div>
          </div>
        </ProgressSection>
      )}
    </ProgressContainer>
  );
};

export default ProgressTracker;