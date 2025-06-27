import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Flame,
  Calendar,
  Target,
  Clock,
  Star,
  Trophy,
  Award,
  TrendingUp,
  Zap,
  CheckCircle,
  X,
  Gift,
  Crown,
  Gem,
  Medal,
  Heart,
  ThumbsUp
} from 'lucide-react';

// Animations
const flameFlicker = keyframes`
  0%, 100% { transform: scale(1) rotate(-2deg); opacity: 1; }
  25% { transform: scale(1.1) rotate(2deg); opacity: 0.9; }
  50% { transform: scale(1.05) rotate(-1deg); opacity: 1; }
  75% { transform: scale(1.08) rotate(1deg); opacity: 0.95; }
`;

const streakGlow = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 107, 107, 0.5); }
  50% { box-shadow: 0 0 25px rgba(255, 107, 107, 0.8); }
  100% { box-shadow: 0 0 10px rgba(255, 107, 107, 0.5); }
`;

const numberCountUp = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const slideInUp = keyframes`
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0, -30px, 0); }
  70% { transform: translate3d(0, -15px, 0); }
  90% { transform: translate3d(0, -4px, 0); }
`;

const sparkleFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
  50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
`;

// Main Container
const StreakContainer = styled.div`
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FF6B35 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

// Header Section
const StreakHeader = styled.div`
  text-align: center;
  margin-bottom: 25px;
  position: relative;
`;

const StreakTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const StreakSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
`;

// Main Streak Display
const MainStreakDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  gap: 20px;
  position: relative;
`;

const StreakNumber = styled.div`
  font-size: 72px;
  font-weight: bold;
  color: #FFD700;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
  animation: ${props => props.animate ? numberCountUp : 'none'} 0.6s ease-out;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
    z-index: -1;
  }
`;

const StreakFlame = styled.div`
  font-size: 64px;
  animation: ${flameFlicker} 2s infinite;
  filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.6));
  
  ${props => props.mega && css`
    font-size: 80px;
    animation: ${flameFlicker} 1s infinite, ${streakGlow} 2s infinite;
  `}
`;

const StreakLabel = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

const StreakMilestone = styled.div`
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
`;

// Calendar Grid
const CalendarSection = styled.div`
  margin-bottom: 25px;
`;

const CalendarTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 10px;
`;

const CalendarDay = styled.div`
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
  
  background: ${props => {
    if (props.completed) return 'rgba(76, 175, 80, 0.8)';
    if (props.today) return 'rgba(255, 215, 0, 0.3)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  
  border: 2px solid ${props => {
    if (props.today) return '#FFD700';
    if (props.completed) return '#4CAF50';
    return 'transparent';
  }};
  
  color: ${props => {
    if (props.completed || props.today) return 'white';
    return 'rgba(255, 255, 255, 0.6)';
  }};
  
  ${props => props.completed && css`
    animation: ${slideInUp} 0.4s ease-out;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.4);
  `}
  
  ${props => props.today && css`
    animation: ${streakGlow} 2s infinite;
  `}
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 10px;
    background: ${props => props.completed ? 
      'linear-gradient(45deg, #4CAF50, #8BC34A)' : 
      'transparent'
    };
    z-index: -1;
    opacity: ${props => props.completed ? 0.3 : 0};
  }
`;

const CalendarLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LegendDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color || '#4CAF50'};
`;

// Stats Section
const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #FFD700;
  margin-bottom: 5px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
`;

const StatIcon = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
`;

// Milestones Section
const MilestonesSection = styled.div`
  margin-bottom: 20px;
`;

const MilestoneTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const MilestoneList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MilestoneItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
  
  ${props => props.achieved && css`
    background: rgba(76, 175, 80, 0.3);
    border: 1px solid rgba(76, 175, 80, 0.5);
  `}
  
  ${props => props.current && css`
    background: rgba(255, 215, 0, 0.2);
    border: 1px solid rgba(255, 215, 0, 0.4);
    animation: ${streakGlow} 3s infinite;
  `}
`;

const MilestoneIcon = styled.div`
  font-size: 24px;
  margin-right: 12px;
  filter: ${props => props.achieved ? 'none' : 'grayscale(80%)'};
  opacity: ${props => props.achieved ? 1 : 0.6};
`;

const MilestoneContent = styled.div`
  flex: 1;
`;

const MilestoneName = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  color: ${props => props.achieved ? '#4CAF50' : 'white'};
`;

const MilestoneDescription = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

const MilestoneProgress = styled.div`
  font-size: 12px;
  color: #FFD700;
  font-weight: 600;
`;

// Motivational Messages
const MotivationalSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
`;

const MotivationalMessage = styled.p`
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  line-height: 1.4;
`;

const MotivationalTip = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
`;

// Floating Sparkles
const FloatingSparkle = styled.div`
  position: absolute;
  color: #FFD700;
  font-size: 16px;
  animation: ${sparkleFloat} 3s infinite;
  pointer-events: none;
  opacity: 0.7;
  
  &:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
  &:nth-child(2) { top: 20%; right: 15%; animation-delay: 1s; }
  &:nth-child(3) { bottom: 20%; left: 20%; animation-delay: 2s; }
  &:nth-child(4) { bottom: 30%; right: 10%; animation-delay: 0.5s; }
`;

// Streak Tracker Component
const StreakTracker = ({
  studentData = {
    currentStreak: 7,
    longestStreak: 12,
    totalDays: 25,
    weeklyGoal: 5,
    thisWeekDays: 3,
    streakStartDate: '2024-01-01'
  },
  onStreakMilestone = () => {},
  showCelebration = false
}) => {
  const [animateNumber, setAnimateNumber] = useState(false);
  const [currentWeekData, setCurrentWeekData] = useState([]);

  // Streak milestones
  const milestones = [
    { days: 3, name: 'Getting Started', icon: '🌱', reward: 'Consistency Badge', achieved: studentData.currentStreak >= 3 },
    { days: 7, name: 'Week Warrior', icon: '⚡', reward: '+100 Bonus XP', achieved: studentData.currentStreak >= 7 },
    { days: 14, name: 'Two Week Champion', icon: '🏆', reward: 'Dedication Medal', achieved: studentData.currentStreak >= 14 },
    { days: 30, name: 'Monthly Master', icon: '👑', reward: 'Crown Avatar', achieved: studentData.currentStreak >= 30 },
    { days: 50, name: 'Unstoppable Force', icon: '💎', reward: 'Diamond Badge', achieved: studentData.currentStreak >= 50 },
    { days: 100, name: 'Legend Status', icon: '🌟', reward: 'Hall of Fame', achieved: studentData.currentStreak >= 100 }
  ];

  // Generate current week data
  useEffect(() => {
    const today = new Date();
    const weekData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      weekData.push({
        date: date,
        day: date.getDate(),
        dayName: date.toLocaleDateString('en', { weekday: 'short' }),
        completed: i < studentData.currentStreak,
        today: i === 0
      });
    }
    
    setCurrentWeekData(weekData);
  }, [studentData.currentStreak]);

  // Animate number on streak increase
  useEffect(() => {
    if (studentData.currentStreak > 0) {
      setAnimateNumber(true);
      setTimeout(() => setAnimateNumber(false), 600);
    }
  }, [studentData.currentStreak]);

  // Get motivational message based on streak
  const getMotivationalMessage = () => {
    const streak = studentData.currentStreak;
    
    if (streak === 0) {
      return {
        message: "Ready to start your learning journey? 🚀",
        tip: "Complete one lesson today to start your streak!"
      };
    } else if (streak < 3) {
      return {
        message: "Great start! You're building momentum! 💪",
        tip: "Keep going! Consistency is the key to success."
      };
    } else if (streak < 7) {
      return {
        message: "Amazing! You're developing a great habit! ⭐",
        tip: "You're almost at your first weekly milestone!"
      };
    } else if (streak < 14) {
      return {
        message: "Outstanding! You're a learning champion! 🏆",
        tip: "Your dedication is truly inspiring!"
      };
    } else if (streak < 30) {
      return {
        message: "Incredible! You're unstoppable! 🔥",
        tip: "You're on your way to legendary status!"
      };
    } else {
      return {
        message: "LEGENDARY! You're an absolute inspiration! 🌟",
        tip: "Your consistency is helping you master AI!"
      };
    }
  };

  const motivational = getMotivationalMessage();
  const nextMilestone = milestones.find(m => !m.achieved);
  const daysToNext = nextMilestone ? nextMilestone.days - studentData.currentStreak : 0;

  return (
    <StreakContainer>
      {/* Floating Sparkles */}
      <FloatingSparkle>✨</FloatingSparkle>
      <FloatingSparkle>⭐</FloatingSparkle>
      <FloatingSparkle>💫</FloatingSparkle>
      <FloatingSparkle>🌟</FloatingSparkle>
      
      {/* Header */}
      <StreakHeader>
        <StreakTitle>
          <Flame size={28} />
          Learning Streak
          <Flame size={28} />
        </StreakTitle>
        <StreakSubtitle>
          Keep the fire burning! Learn something every day 🔥
        </StreakSubtitle>
      </StreakHeader>

      {/* Main Streak Display */}
      <MainStreakDisplay>
        <StreakFlame mega={studentData.currentStreak >= 7}>
          🔥
        </StreakFlame>
        <div style={{ textAlign: 'center' }}>
          <StreakNumber animate={animateNumber}>
            {studentData.currentStreak}
          </StreakNumber>
          <StreakLabel>
            {studentData.currentStreak === 1 ? 'Day' : 'Days'}
          </StreakLabel>
          {nextMilestone && (
            <StreakMilestone>
              {daysToNext} days to {nextMilestone.name}
            </StreakMilestone>
          )}
        </div>
        <StreakFlame mega={studentData.currentStreak >= 7}>
          🔥
        </StreakFlame>
      </MainStreakDisplay>

      {/* Calendar */}
      <CalendarSection>
        <CalendarTitle>
          <Calendar size={18} />
          This Week
        </CalendarTitle>
        <CalendarGrid>
          {currentWeekData.map((day, index) => (
            <CalendarDay
              key={index}
              completed={day.completed}
              today={day.today}
              title={`${day.dayName} ${day.day}`}
            >
              {day.day}
            </CalendarDay>
          ))}
        </CalendarGrid>
        <CalendarLegend>
          <LegendItem>
            <LegendDot color="#4CAF50" />
            Completed
          </LegendItem>
          <LegendItem>
            <LegendDot color="#FFD700" />
            Today
          </LegendItem>
          <LegendItem>
            <LegendDot color="rgba(255,255,255,0.2)" />
            Upcoming
          </LegendItem>
        </CalendarLegend>
      </CalendarSection>

      {/* Stats */}
      <StatsSection>
        <StatCard>
          <StatIcon>📊</StatIcon>
          <StatValue>{studentData.totalDays}</StatValue>
          <StatLabel>Total Days</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>🏆</StatIcon>
          <StatValue>{studentData.longestStreak}</StatValue>
          <StatLabel>Best Streak</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>🎯</StatIcon>
          <StatValue>{studentData.thisWeekDays}/{studentData.weeklyGoal}</StatValue>
          <StatLabel>Weekly Goal</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>⚡</StatIcon>
          <StatValue>{Math.round((studentData.thisWeekDays / studentData.weeklyGoal) * 100)}%</StatValue>
          <StatLabel>Week Progress</StatLabel>
        </StatCard>
      </StatsSection>

      {/* Milestones */}
      <MilestonesSection>
        <MilestoneTitle>
          <Trophy size={18} />
          Streak Milestones
        </MilestoneTitle>
        <MilestoneList>
          {milestones.slice(0, 4).map((milestone, index) => (
            <MilestoneItem
              key={index}
              achieved={milestone.achieved}
              current={!milestone.achieved && milestone === nextMilestone}
            >
              <MilestoneIcon achieved={milestone.achieved}>
                {milestone.icon}
              </MilestoneIcon>
              <MilestoneContent>
                <MilestoneName achieved={milestone.achieved}>
                  {milestone.name}
                </MilestoneName>
                <MilestoneDescription>
                  {milestone.days} days • {milestone.reward}
                </MilestoneDescription>
              </MilestoneContent>
              {milestone.achieved ? (
                <CheckCircle size={20} color="#4CAF50" />
              ) : milestone === nextMilestone ? (
                <MilestoneProgress>
                  {daysToNext} to go
                </MilestoneProgress>
              ) : (
                <Target size={20} style={{ opacity: 0.5 }} />
              )}
            </MilestoneItem>
          ))}
        </MilestoneList>
      </MilestonesSection>

      {/* Motivational Section */}
      <MotivationalSection>
        <MotivationalMessage>
          {motivational.message}
        </MotivationalMessage>
        <MotivationalTip>
          💡 {motivational.tip}
        </MotivationalTip>
      </MotivationalSection>
    </StreakContainer>
  );
};

export default StreakTracker;