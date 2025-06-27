import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Trophy,
  Star,
  Zap,
  Target,
  Clock,
  Calendar,
  Award,
  BookOpen,
  Brain,
  Code,
  Shield,
  TrendingUp,
  ChevronRight,
  Play,
  Lock,
  CheckCircle,
  Flame,
  Crown,
  Gem,
  Heart,
  Users,
  Medal
} from 'lucide-react';

// Animations
const sparkleAnimation = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1) rotate(180deg); opacity: 1; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3) translateY(20px); opacity: 0; }
  50% { transform: scale(1.05) translateY(-5px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
`;

const slideIn = keyframes`
  0% { transform: translateX(-20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 107, 107, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.6); }
  100% { box-shadow: 0 0 5px rgba(255, 107, 107, 0.3); }
`;

// Main Container
const DashboardContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  min-height: 100vh;
  padding: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  position: relative;
  overflow-x: hidden;
`;

// Floating Background Elements
const FloatingElement = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${sparkleAnimation} 3s infinite;
  pointer-events: none;
  
  &:nth-child(1) { top: 10%; left: 10%; width: 20px; height: 20px; animation-delay: 0s; }
  &:nth-child(2) { top: 20%; right: 15%; width: 15px; height: 15px; animation-delay: 1s; }
  &:nth-child(3) { bottom: 30%; left: 20%; width: 25px; height: 25px; animation-delay: 2s; }
  &:nth-child(4) { bottom: 10%; right: 10%; width: 18px; height: 18px; animation-delay: 0.5s; }
`;

// Header Section
const WelcomeHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  animation: ${slideIn} 0.8s ease-out;
`;

const WelcomeTitle = styled.h1`
  color: white;
  font-size: 36px;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const StudentName = styled.span`
  background: linear-gradient(45deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
`;

const WelcomeSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin: 0;
`;

// Main Dashboard Grid
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Card Components
const DashboardCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  ${props => css`
    animation: ${bounceIn} 0.6s ease-out;
    animation-delay: ${props.delay || '0s'};
  `}
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  }
  
  ${props => props.featured && css`
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: white;
    animation: ${pulseGlow} 2s infinite;
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 20px;
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.color || 'linear-gradient(135deg, #667eea, #764ba2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 15px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: ${props => props.white ? 'white' : '#2D3436'};
  flex: 1;
`;

const CardValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.color || '#2D3436'};
  margin-bottom: 8px;
`;

const CardLabel = styled.div`
  font-size: 14px;
  color: ${props => props.white ? 'rgba(255,255,255,0.8)' : '#636E72'};
  margin-bottom: 15px;
`;

// Progress Components
const ProgressContainer = styled.div`
  margin-bottom: 15px;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.white ? 'white' : '#2D3436'};
`;

const ProgressBar = styled.div`
  background: ${props => props.white ? 'rgba(255,255,255,0.2)' : '#f1f3f4'};
  border-radius: 10px;
  height: 12px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.gradient || 'linear-gradient(90deg, #4CAF50, #45a049)'};
  border-radius: 10px;
  width: ${props => props.percentage || 0}%;
  transition: width 1s ease;
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

// Badge Components
const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  border-radius: 12px;
  background: ${props => props.earned ? 
    'linear-gradient(135deg, #FFD700, #FFA500)' : 
    'rgba(0,0,0,0.05)'
  };
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }
  
  ${props => props.earned && css`
    animation: ${bounceIn} 0.6s ease-out;
  `}
`;

const BadgeIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  filter: ${props => props.earned ? 'none' : 'grayscale(100%) opacity(0.3)'};
`;

const BadgeName = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  color: ${props => props.earned ? 'white' : '#666'};
`;

// Activity Components
const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 12px;
  background: ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(76, 175, 80, 0.1)';
      case 'current': return 'rgba(255, 193, 7, 0.1)';
      case 'locked': return 'rgba(0, 0, 0, 0.05)';
      default: return 'rgba(0, 0, 0, 0.05)';
    }
  }};
  border: 2px solid ${props => {
    switch(props.status) {
      case 'completed': return '#4CAF50';
      case 'current': return '#FFC107';
      case 'locked': return 'transparent';
      default: return 'transparent';
    }
  }};
  cursor: ${props => props.status === 'locked' ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: ${props => props.status !== 'locked' ? 'translateX(5px)' : 'none'};
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.color || '#667eea'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 12px;
  filter: ${props => props.locked ? 'grayscale(100%) opacity(0.3)' : 'none'};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityName = styled.div`
  font-weight: 600;
  color: ${props => props.locked ? '#999' : '#2D3436'};
  margin-bottom: 4px;
`;

const ActivityMeta = styled.div`
  font-size: 12px;
  color: ${props => props.locked ? '#ccc' : '#666'};
`;

const ActivityAction = styled.div`
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#4CAF50';
      case 'current': return '#FFC107';
      case 'locked': return '#ccc';
      default: return '#667eea';
    }
  }};
`;

// Stats Components
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

// Streak Components
const StreakContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const StreakNumber = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #FF6B6B;
  margin: 0 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const StreakIcon = styled.div`
  font-size: 32px;
  ${props => props.animate && css`
    animation: ${pulseGlow} 1s infinite;
  `}
`;

// Student Dashboard Component
const StudentDashboard = ({ 
  studentData = {
    name: 'Alex',
    level: 3,
    xp: 1250,
    xpToNext: 500,
    streak: 7,
    totalSessions: 12,
    badgesEarned: 8,
    currentCourse: 'AI Ethics Explorer'
  }
}) => {
  const [celebrationVisible, setCelebrationVisible] = useState(false);

  // Mock student progress data
  const mockData = {
    name: studentData.name,
    level: studentData.level,
    xp: studentData.xp,
    xpToNext: studentData.xpToNext,
    xpProgress: Math.round((studentData.xp / (studentData.xp + studentData.xpToNext)) * 100),
    streak: studentData.streak,
    totalSessions: studentData.totalSessions,
    badgesEarned: studentData.badgesEarned,
    currentCourse: studentData.currentCourse,
    
    // Weekly progress
    weeklyProgress: [
      { day: 'Mon', completed: true },
      { day: 'Tue', completed: true },
      { day: 'Wed', completed: true },
      { day: 'Thu', completed: false },
      { day: 'Fri', completed: false },
      { day: 'Sat', completed: false },
      { day: 'Sun', completed: false }
    ],
    
    // Subject progress
    subjects: [
      { name: 'Python Coding', progress: 75, color: 'linear-gradient(90deg, #3776ab, #ffd43b)' },
      { name: 'AI Ethics', progress: 60, color: 'linear-gradient(90deg, #667eea, #764ba2)' },
      { name: 'Logic & Problem Solving', progress: 85, color: 'linear-gradient(90deg, #4CAF50, #45a049)' },
      { name: 'Creativity & Design', progress: 45, color: 'linear-gradient(90deg, #FF6B6B, #FF8E53)' }
    ],
    
    // Badges
    badges: [
      { id: 'first-code', name: 'First Code', icon: '👩‍💻', earned: true },
      { id: 'ethics-champion', name: 'Ethics Champion', icon: '🛡️', earned: true },
      { id: 'problem-solver', name: 'Problem Solver', icon: '🧩', earned: true },
      { id: 'creative-mind', name: 'Creative Mind', icon: '🎨', earned: true },
      { id: 'ai-explorer', name: 'AI Explorer', icon: '🚀', earned: true },
      { id: 'team-player', name: 'Team Player', icon: '🤝', earned: false },
      { id: 'speed-learner', name: 'Speed Learner', icon: '⚡', earned: false },
      { id: 'master-coder', name: 'Master Coder', icon: '👑', earned: false },
      { id: 'ai-innovator', name: 'AI Innovator', icon: '💡', earned: false }
    ],
    
    // Next activities
    activities: [
      {
        id: 'python-variables',
        name: 'Python Variables & Data',
        type: 'Python Lesson',
        status: 'current',
        icon: Code,
        color: 'linear-gradient(135deg, #3776ab, #ffd43b)',
        estimatedTime: '15 min'
      },
      {
        id: 'ai-bias-scenario',
        name: 'AI Bias Ethics Scenario',
        type: 'Ethics Challenge',
        status: 'available',
        icon: Shield,
        color: 'linear-gradient(135deg, #667eea, #764ba2)',
        estimatedTime: '10 min'
      },
      {
        id: 'logic-puzzle',
        name: 'Logic Puzzle Challenge',
        type: 'Problem Solving',
        status: 'available',
        icon: Brain,
        color: 'linear-gradient(135deg, #4CAF50, #45a049)',
        estimatedTime: '12 min'
      },
      {
        id: 'advanced-python',
        name: 'Advanced Python Functions',
        type: 'Python Lesson',
        status: 'locked',
        icon: Code,
        color: 'linear-gradient(135deg, #666, #999)',
        estimatedTime: '20 min'
      }
    ]
  };

  return (
    <DashboardContainer>
      {/* Floating background elements */}
      <FloatingElement />
      <FloatingElement />
      <FloatingElement />
      <FloatingElement />
      
      {/* Welcome Header */}
      <WelcomeHeader>
        <WelcomeTitle>
          <Crown size={40} />
          Welcome back, <StudentName>{mockData.name}</StudentName>!
          <Crown size={40} />
        </WelcomeTitle>
        <WelcomeSubtitle>Ready to continue your AI adventure? 🚀</WelcomeSubtitle>
      </WelcomeHeader>

      {/* Main Dashboard Grid */}
      <DashboardGrid>
        
        {/* Level & XP Card */}
        <DashboardCard featured delay="0.1s">
          <CardHeader>
            <CardIcon color="linear-gradient(135deg, #FFD700, #FFA500)">
              <Star size={24} />
            </CardIcon>
            <CardTitle white>Level {mockData.level}</CardTitle>
          </CardHeader>
          
          <CardValue color="white">{mockData.xp} XP</CardValue>
          <CardLabel white>{mockData.xpToNext} XP to Level {mockData.level + 1}</CardLabel>
          
          <ProgressContainer>
            <ProgressBar white>
              <ProgressFill 
                percentage={mockData.xpProgress}
                gradient="linear-gradient(90deg, #FFD700, #FFA500)"
              />
            </ProgressBar>
          </ProgressContainer>
          
          <div style={{ textAlign: 'center', color: 'white', fontSize: '14px' }}>
            🎯 Keep learning to level up!
          </div>
        </DashboardCard>

        {/* Learning Streak Card */}
        <DashboardCard delay="0.2s">
          <CardHeader>
            <CardIcon color="linear-gradient(135deg, #FF6B6B, #FF8E53)">
              <Flame size={24} />
            </CardIcon>
            <CardTitle>Learning Streak</CardTitle>
          </CardHeader>
          
          <StreakContainer>
            <StreakIcon animate={mockData.streak > 5}>🔥</StreakIcon>
            <StreakNumber>{mockData.streak}</StreakNumber>
            <StreakIcon animate={mockData.streak > 5}>🔥</StreakIcon>
          </StreakContainer>
          
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            {mockData.streak > 5 ? 'Amazing streak! 🌟' : 'Keep it up! 💪'}
          </div>
          
          <StatsGrid>
            <StatItem>
              <StatValue>{mockData.totalSessions}</StatValue>
              <StatLabel>Total Sessions</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{mockData.badgesEarned}</StatValue>
              <StatLabel>Badges Earned</StatLabel>
            </StatItem>
          </StatsGrid>
        </DashboardCard>

        {/* Subject Progress Card */}
        <DashboardCard delay="0.3s">
          <CardHeader>
            <CardIcon color="linear-gradient(135deg, #4ECDC4, #44A08D)">
              <BookOpen size={24} />
            </CardIcon>
            <CardTitle>Subject Progress</CardTitle>
          </CardHeader>
          
          {mockData.subjects.map((subject, index) => (
            <ProgressContainer key={subject.name}>
              <ProgressLabel>
                <span>{subject.name}</span>
                <span>{subject.progress}%</span>
              </ProgressLabel>
              <ProgressBar>
                <ProgressFill 
                  percentage={subject.progress}
                  gradient={subject.color}
                />
              </ProgressBar>
            </ProgressContainer>
          ))}
        </DashboardCard>

        {/* Badges Collection Card */}
        <DashboardCard delay="0.4s">
          <CardHeader>
            <CardIcon color="linear-gradient(135deg, #667eea, #764ba2)">
              <Award size={24} />
            </CardIcon>
            <CardTitle>Badge Collection</CardTitle>
          </CardHeader>
          
          <BadgeGrid>
            {mockData.badges.map((badge) => (
              <BadgeItem 
                key={badge.id} 
                earned={badge.earned}
                title={badge.earned ? `Earned: ${badge.name}` : `Locked: ${badge.name}`}
              >
                <BadgeIcon earned={badge.earned}>{badge.icon}</BadgeIcon>
                <BadgeName earned={badge.earned}>{badge.name}</BadgeName>
              </BadgeItem>
            ))}
          </BadgeGrid>
          
          <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#666' }}>
            {mockData.badges.filter(b => b.earned).length} of {mockData.badges.length} badges earned
          </div>
        </DashboardCard>

        {/* Next Activities Card */}
        <DashboardCard delay="0.5s" style={{ gridColumn: 'span 2' }}>
          <CardHeader>
            <CardIcon color="linear-gradient(135deg, #11998e, #38ef7d)">
              <Target size={24} />
            </CardIcon>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          
          <ActivityList>
            {mockData.activities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <ActivityItem 
                  key={activity.id} 
                  status={activity.status}
                  onClick={() => {
                    if (activity.status !== 'locked') {
                      console.log('Starting activity:', activity.name);
                    }
                  }}
                >
                  <ActivityIcon 
                    color={activity.color} 
                    locked={activity.status === 'locked'}
                  >
                    {activity.status === 'locked' ? <Lock size={20} /> : <IconComponent size={20} />}
                  </ActivityIcon>
                  
                  <ActivityContent>
                    <ActivityName locked={activity.status === 'locked'}>
                      {activity.name}
                    </ActivityName>
                    <ActivityMeta locked={activity.status === 'locked'}>
                      {activity.type} • {activity.estimatedTime}
                    </ActivityMeta>
                  </ActivityContent>
                  
                  <ActivityAction status={activity.status}>
                    {activity.status === 'completed' && <CheckCircle size={20} />}
                    {activity.status === 'current' && <Play size={20} />}
                    {activity.status === 'available' && <ChevronRight size={20} />}
                    {activity.status === 'locked' && <Lock size={20} />}
                  </ActivityAction>
                </ActivityItem>
              );
            })}
          </ActivityList>
        </DashboardCard>

      </DashboardGrid>
    </DashboardContainer>
  );
};

export default StudentDashboard;