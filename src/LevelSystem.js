import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Star,
  Trophy,
  Crown,
  Zap,
  Target,
  Award,
  TrendingUp,
  ChevronUp,
  Gift,
  Sparkles,
  Gem,
  Flame,
  Shield,
  Rocket
} from 'lucide-react';

// Animations
const levelUp = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const xpGain = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
`;

const sparkleFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
  50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 25px rgba(255, 215, 0, 0.8); }
`;

// Level System Container
const LevelSystemContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  position: relative;
  overflow: hidden;
`;

// Level Display
const LevelHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const CurrentLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const LevelNumber = styled.div`
  font-size: 72px;
  font-weight: bold;
  background: linear-gradient(45deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  ${props => props.leveledUp && css`
    animation: ${levelUp} 0.6s ease-in-out;
  `}
`;

const LevelTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  color: #FFD700;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

const LevelDescription = styled.p`
  margin: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
`;

// XP Progress Section
const XPSection = styled.div`
  margin-bottom: 30px;
`;

const XPHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const XPLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const XPNumbers = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
`;

const XPBar = styled.div`
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
`;

const XPFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A, #CDDC39);
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

const XPGainAnimation = styled.div`
  position: absolute;
  top: -30px;
  right: 10px;
  color: #4CAF50;
  font-weight: bold;
  font-size: 18px;
  animation: ${xpGain} 1s ease-out;
  pointer-events: none;
`;

// Level Milestones
const MilestonesSection = styled.div`
  margin-bottom: 30px;
`;

const MilestoneTrack = styled.div`
  position: relative;
  padding: 20px 0;
`;

const MilestoneLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  transform: translateY(-50%);
`;

const MilestoneProgress = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50, #FFD700);
  border-radius: 2px;
  width: ${props => props.percentage || 0}%;
  transform: translateY(-50%);
  transition: width 1s ease;
`;

const MilestoneList = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

const MilestoneItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const MilestoneIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => {
    if (props.completed) return 'linear-gradient(135deg, #4CAF50, #8BC34A)';
    if (props.current) return 'linear-gradient(135deg, #FFD700, #FFA500)';
    return 'rgba(255, 255, 255, 0.2)';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-bottom: 8px;
  border: 3px solid ${props => {
    if (props.completed) return '#4CAF50';
    if (props.current) return '#FFD700';
    return 'rgba(255, 255, 255, 0.3)';
  }};
  
  ${props => props.current && css`
    animation: ${glow} 2s infinite;
  `}
`;

const MilestoneLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: ${props => {
    if (props.completed || props.current) return 'white';
    return 'rgba(255, 255, 255, 0.6)';
  }};
`;

const MilestoneLevel = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2px;
`;

// Level Benefits
const BenefitsSection = styled.div`
  margin-bottom: 30px;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const BenefitCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const BenefitIcon = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

const BenefitTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #FFD700;
`;

const BenefitDescription = styled.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
`;

// Rewards Preview
const RewardsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
`;

const RewardsList = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

const RewardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  min-width: 80px;
`;

const RewardIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const RewardLabel = styled.div`
  font-size: 11px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
`;

// Level definitions
const levelDefinitions = [
  { level: 1, title: 'AI Curious', icon: '👶', xpRequired: 0, description: 'Taking your first steps into AI!', color: '#4CAF50' },
  { level: 2, title: 'Code Explorer', icon: '🔍', xpRequired: 200, description: 'Starting to explore programming!', color: '#2196F3' },
  { level: 3, title: 'Logic Builder', icon: '🧩', xpRequired: 500, description: 'Building logical thinking skills!', color: '#FF9800' },
  { level: 4, title: 'Problem Solver', icon: '🎯', xpRequired: 900, description: 'Solving complex challenges!', color: '#9C27B0' },
  { level: 5, title: 'Ethics Champion', icon: '🛡️', xpRequired: 1400, description: 'Understanding AI ethics deeply!', color: '#E91E63' },
  { level: 6, title: 'Code Ninja', icon: '🥷', xpRequired: 2000, description: 'Mastering programming skills!', color: '#607D8B' },
  { level: 7, title: 'AI Designer', icon: '🎨', xpRequired: 2700, description: 'Creating innovative AI solutions!', color: '#FF5722' },
  { level: 8, title: 'Tech Leader', icon: '👑', xpRequired: 3500, description: 'Leading with technology!', color: '#795548' },
  { level: 9, title: 'Innovation Master', icon: '🚀', xpRequired: 4400, description: 'Pushing boundaries of innovation!', color: '#3F51B5' },
  { level: 10, title: 'AI Wizard', icon: '🧙‍♂️', xpRequired: 5500, description: 'Master of AI magic!', color: '#FFD700' }
];

// Level System Component
const LevelSystem = ({
  studentData = {
    currentLevel: 3,
    currentXP: 750,
    totalXP: 750,
    recentXPGain: 0,
    completedLessons: 12,
    masteredSkills: ['Python Basics', 'AI Ethics'],
    nextRewards: ['New Badge Slot', 'Custom Avatar']
  },
  onLevelUp = () => {},
  showXPGain = false
}) => {
  const [xpGainVisible, setXpGainVisible] = useState(false);
  const [levelUpAnimation, setLevelUpAnimation] = useState(false);

  // Get current level data
  const currentLevelData = levelDefinitions.find(l => l.level === studentData.currentLevel) || levelDefinitions[0];
  const nextLevelData = levelDefinitions.find(l => l.level === studentData.currentLevel + 1);
  
  // Calculate XP progress to next level
  const currentLevelXP = currentLevelData.xpRequired;
  const nextLevelXP = nextLevelData ? nextLevelData.xpRequired : currentLevelXP + 1000;
  const xpInCurrentLevel = studentData.currentXP - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;
  const progressPercentage = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);

  // Calculate milestone progress
  const getMilestoneProgress = () => {
    const totalLevels = levelDefinitions.length;
    const currentProgress = (studentData.currentLevel / totalLevels) * 100;
    return currentProgress;
  };

  // Get level benefits
  const getCurrentLevelBenefits = () => {
    const benefits = [];
    
    if (studentData.currentLevel >= 2) {
      benefits.push({
        icon: '🎨',
        title: 'Avatar Customization',
        description: 'Personalize your learning avatar'
      });
    }
    
    if (studentData.currentLevel >= 3) {
      benefits.push({
        icon: '🏆',
        title: 'Badge Collection',
        description: 'Earn and display achievement badges'
      });
    }
    
    if (studentData.currentLevel >= 4) {
      benefits.push({
        icon: '🎯',
        title: 'Challenge Mode',
        description: 'Unlock advanced challenges'
      });
    }
    
    if (studentData.currentLevel >= 5) {
      benefits.push({
        icon: '👥',
        title: 'Team Projects',
        description: 'Collaborate on group assignments'
      });
    }
    
    return benefits;
  };

  // Show XP gain animation
  useEffect(() => {
    if (showXPGain && studentData.recentXPGain > 0) {
      setXpGainVisible(true);
      setTimeout(() => setXpGainVisible(false), 1000);
    }
  }, [showXPGain, studentData.recentXPGain]);

  // Check for level up
  useEffect(() => {
    if (studentData.currentXP >= nextLevelXP && nextLevelData) {
      setLevelUpAnimation(true);
      onLevelUp(nextLevelData);
      setTimeout(() => setLevelUpAnimation(false), 600);
    }
  }, [studentData.currentXP, nextLevelXP, nextLevelData, onLevelUp]);

  return (
    <LevelSystemContainer>
      {/* XP Gain Animation */}
      {xpGainVisible && (
        <XPGainAnimation>
          +{studentData.recentXPGain} XP
        </XPGainAnimation>
      )}

      {/* Level Header */}
      <LevelHeader>
        <CurrentLevel>
          <div style={{ fontSize: '48px' }}>{currentLevelData.icon}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.8)' }}>Level</span>
              <LevelNumber leveledUp={levelUpAnimation}>
                {studentData.currentLevel}
              </LevelNumber>
            </div>
            <LevelTitle>{currentLevelData.title}</LevelTitle>
          </div>
          <div style={{ fontSize: '48px' }}>{currentLevelData.icon}</div>
        </CurrentLevel>
        <LevelDescription>{currentLevelData.description}</LevelDescription>
      </LevelHeader>

      {/* XP Progress */}
      <XPSection>
        <XPHeader>
          <XPLabel>Experience Points</XPLabel>
          <XPNumbers>
            {studentData.currentXP} / {nextLevelXP} XP
          </XPNumbers>
        </XPHeader>
        
        <XPBar>
          <XPFill percentage={progressPercentage} />
        </XPBar>
        
        <div style={{ 
          textAlign: 'center', 
          fontSize: '14px', 
          color: 'rgba(255,255,255,0.8)' 
        }}>
          {nextLevelData ? 
            `${nextLevelXP - studentData.currentXP} XP until ${nextLevelData.title}` :
            'Maximum level reached!'
          }
        </div>
      </XPSection>

      {/* Level Milestones */}
      <MilestonesSection>
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
          🎯 Learning Journey
        </h3>
        
        <MilestoneTrack>
          <MilestoneLine />
          <MilestoneProgress percentage={getMilestoneProgress()} />
          
          <MilestoneList>
            {[1, 3, 5, 7, 10].map(level => {
              const milestone = levelDefinitions.find(l => l.level === level);
              const isCompleted = studentData.currentLevel > level;
              const isCurrent = studentData.currentLevel === level;
              
              return (
                <MilestoneItem key={level}>
                  <MilestoneIcon 
                    completed={isCompleted}
                    current={isCurrent}
                  >
                    {milestone.icon}
                  </MilestoneIcon>
                  <MilestoneLabel 
                    completed={isCompleted}
                    current={isCurrent}
                  >
                    {milestone.title}
                  </MilestoneLabel>
                  <MilestoneLevel>Level {level}</MilestoneLevel>
                </MilestoneItem>
              );
            })}
          </MilestoneList>
        </MilestoneTrack>
      </MilestonesSection>

      {/* Current Level Benefits */}
      <BenefitsSection>
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
          🎁 Your Current Benefits
        </h3>
        
        <BenefitsGrid>
          {getCurrentLevelBenefits().map((benefit, index) => (
            <BenefitCard key={index}>
              <BenefitIcon>{benefit.icon}</BenefitIcon>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </BenefitsSection>

      {/* Next Level Rewards Preview */}
      {nextLevelData && (
        <RewardsSection>
          <h4 style={{ textAlign: 'center', marginBottom: '15px', color: '#FFD700' }}>
            🎁 Next Level Rewards ({nextLevelData.title})
          </h4>
          
          <RewardsList>
            <RewardItem>
              <RewardIcon>🏆</RewardIcon>
              <RewardLabel>New Badge Slot</RewardLabel>
            </RewardItem>
            <RewardItem>
              <RewardIcon>⭐</RewardIcon>
              <RewardLabel>+50 Bonus XP</RewardLabel>
            </RewardItem>
            <RewardItem>
              <RewardIcon>🎨</RewardIcon>
              <RewardLabel>Avatar Upgrade</RewardLabel>
            </RewardItem>
            <RewardItem>
              <RewardIcon>🔓</RewardIcon>
              <RewardLabel>New Features</RewardLabel>
            </RewardItem>
          </RewardsList>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '15px', 
            fontSize: '14px', 
            color: 'rgba(255,255,255,0.9)' 
          }}>
            Keep learning to unlock these rewards! 🚀
          </div>
        </RewardsSection>
      )}
    </LevelSystemContainer>
  );
};

export default LevelSystem;