import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Award,
  Star,
  Trophy,
  Crown,
  Zap,
  Shield,
  Target,
  Heart,
  Brain,
  Code,
  Users,
  Clock,
  BookOpen,
  Gem,
  Flame,
  Medal,
  CheckCircle,
  Lock,
  X
} from 'lucide-react';

// Animations
const badgeEarn = keyframes`
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const celebrate = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-5px) rotate(-5deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
`;

// Badge System Container
const BadgeSystemContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  position: relative;
  overflow: hidden;
`;

// Badge Categories
const CategoryTabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const CategoryTab = styled.button`
  padding: 12px 20px;
  border-radius: 25px;
  border: none;
  background: ${props => props.active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }
`;

// Badge Grid
const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
`;

// Individual Badge Card
const BadgeCard = styled.div`
  background: ${props => props.earned ? 
    'linear-gradient(135deg, #FFD700, #FFA500)' : 
    'rgba(255,255,255,0.1)'
  };
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  ${props => props.earned && css`
    animation: ${props.newlyEarned ? badgeEarn : 'none'} 0.6s ease-out;
    &:hover {
      animation: ${celebrate} 0.6s ease-in-out;
    }
  `}
  
  ${props => props.featured && css`
    animation: ${glow} 2s infinite;
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  
  ${props => !props.earned && css`
    filter: grayscale(100%);
    opacity: 0.6;
  `}
`;

const BadgeIconContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const BadgeIconMain = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.earned ? 
    'linear-gradient(135deg, #FF6B6B, #FF8E53)' : 
    'rgba(255,255,255,0.2)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 32px;
  position: relative;
  
  ${props => props.earned && css`
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.4);
  `}
`;

const BadgeSparkle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: #FFD700;
  border-radius: 50%;
  ${css`
    animation: ${sparkle} 2s infinite;
  `}
  
  &:nth-child(1) { top: 10%; right: 15%; animation-delay: 0s; }
  &:nth-child(2) { top: 20%; left: 10%; animation-delay: 0.5s; }
  &:nth-child(3) { bottom: 15%; right: 20%; animation-delay: 1s; }
  &:nth-child(4) { bottom: 10%; left: 15%; animation-delay: 1.5s; }
`;

const BadgeName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.earned ? 'white' : 'rgba(255,255,255,0.7)'};
`;

const BadgeDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 12px;
  color: ${props => props.earned ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'};
  line-height: 1.4;
`;

const BadgeProgress = styled.div`
  font-size: 11px;
  color: ${props => props.earned ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)'};
  margin-bottom: 8px;
`;

const BadgeProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const BadgeProgressFill = styled.div`
  height: 100%;
  background: ${props => props.earned ? '#4CAF50' : '#FFC107'};
  width: ${props => props.percentage || 0}%;
  transition: width 0.6s ease;
`;

const BadgeDate = styled.div`
  font-size: 10px;
  color: rgba(255,255,255,0.7);
  font-style: italic;
`;

// Badge Detail Modal
const BadgeModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const BadgeModalContent = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  color: white;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(255,255,255,0.3);
  }
`;

// Stats Section
const BadgeStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
`;

const StatCard = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 15px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #FFD700;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.8);
`;

// Badge System Data
const badgeDefinitions = {
  'learning': [
    {
      id: 'first-lesson',
      name: 'First Steps',
      icon: '👶',
      description: 'Complete your very first lesson',
      requirement: 'Complete 1 lesson',
      category: 'learning',
      rarity: 'common',
      xpReward: 50
    },
    {
      id: 'quick-learner',
      name: 'Quick Learner',
      icon: '⚡',
      description: 'Complete a lesson in under 10 minutes',
      requirement: 'Fast completion time',
      category: 'learning',
      rarity: 'uncommon',
      xpReward: 100
    },
    {
      id: 'knowledge-seeker',
      name: 'Knowledge Seeker',
      icon: '📚',
      description: 'Complete 10 lessons',
      requirement: 'Complete 10 lessons',
      category: 'learning',
      rarity: 'rare',
      xpReward: 200
    },
    {
      id: 'scholar',
      name: 'Scholar',
      icon: '🎓',
      description: 'Complete 25 lessons with 90%+ average',
      requirement: 'High performance learning',
      category: 'learning',
      rarity: 'epic',
      xpReward: 500
    }
  ],
  'coding': [
    {
      id: 'hello-world',
      name: 'Hello World',
      icon: '👋',
      description: 'Write your first Python program',
      requirement: 'Complete first Python lesson',
      category: 'coding',
      rarity: 'common',
      xpReward: 75
    },
    {
      id: 'bug-squasher',
      name: 'Bug Squasher',
      icon: '🐛',
      description: 'Fix 5 code errors successfully',
      requirement: 'Debug 5 programs',
      category: 'coding',
      rarity: 'uncommon',
      xpReward: 150
    },
    {
      id: 'code-ninja',
      name: 'Code Ninja',
      icon: '🥷',
      description: 'Write 100 lines of Python code',
      requirement: 'Code volume achievement',
      category: 'coding',
      rarity: 'rare',
      xpReward: 300
    },
    {
      id: 'python-master',
      name: 'Python Master',
      icon: '🐍',
      description: 'Master all Python fundamentals',
      requirement: 'Complete all Python modules',
      category: 'coding',
      rarity: 'legendary',
      xpReward: 1000
    }
  ],
  'ethics': [
    {
      id: 'moral-compass',
      name: 'Moral Compass',
      icon: '🧭',
      description: 'Complete your first ethics scenario',
      requirement: 'Complete 1 ethics scenario',
      category: 'ethics',
      rarity: 'common',
      xpReward: 100
    },
    {
      id: 'fair-thinker',
      name: 'Fair Thinker',
      icon: '⚖️',
      description: 'Make 5 ethical choices correctly',
      requirement: 'Consistent ethical reasoning',
      category: 'ethics',
      rarity: 'uncommon',
      xpReward: 200
    },
    {
      id: 'ethics-champion',
      name: 'Ethics Champion',
      icon: '🛡️',
      description: 'Complete all age-appropriate ethics scenarios',
      requirement: 'Complete all ethics content',
      category: 'ethics',
      rarity: 'epic',
      xpReward: 750
    }
  ],
  'social': [
    {
      id: 'helpful-friend',
      name: 'Helpful Friend',
      icon: '🤝',
      description: 'Help a classmate with their code',
      requirement: 'Peer assistance',
      category: 'social',
      rarity: 'uncommon',
      xpReward: 125
    },
    {
      id: 'team-player',
      name: 'Team Player',
      icon: '👥',
      description: 'Participate in 3 group activities',
      requirement: 'Collaboration',
      category: 'social',
      rarity: 'rare',
      xpReward: 250
    }
  ],
  'consistency': [
    {
      id: 'daily-learner',
      name: 'Daily Learner',
      icon: '📅',
      description: 'Learn 3 days in a row',
      requirement: '3-day streak',
      category: 'consistency',
      rarity: 'common',
      xpReward: 100
    },
    {
      id: 'week-warrior',
      name: 'Week Warrior',
      icon: '🔥',
      description: 'Maintain a 7-day learning streak',
      requirement: '7-day streak',
      category: 'consistency',
      rarity: 'rare',
      xpReward: 300
    },
    {
      id: 'unstoppable',
      name: 'Unstoppable',
      icon: '💎',
      description: 'Maintain a 30-day learning streak',
      requirement: '30-day streak',
      category: 'consistency',
      rarity: 'legendary',
      xpReward: 1500
    }
  ]
};

// Badge System Component
const BadgeSystem = ({ 
  studentData = {
    earnedBadges: ['first-lesson', 'hello-world', 'moral-compass', 'daily-learner'],
    badgeProgress: {
      'quick-learner': { current: 3, total: 5 },
      'knowledge-seeker': { current: 7, total: 10 },
      'bug-squasher': { current: 2, total: 5 }
    },
    totalXP: 1250,
    badgesEarned: 8,
    lessonsCompleted: 12,
    streakDays: 7
  },
  onBadgeEarned = () => {}
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [newlyEarnedBadges, setNewlyEarnedBadges] = useState([]);

  // Flatten all badges
  const allBadges = Object.values(badgeDefinitions).flat();
  
  // Filter badges by category
  const filteredBadges = activeCategory === 'all' 
    ? allBadges 
    : allBadges.filter(badge => badge.category === activeCategory);

  // Calculate badge statistics
  const earnedCount = studentData.earnedBadges?.length || 0;
  const totalCount = allBadges.length;
  const completionRate = Math.round((earnedCount / totalCount) * 100);

  // Get rarity counts
  const earnedBadges = studentData.earnedBadges || [];
  const rarityCounts = {
    common: allBadges.filter(b => b.rarity === 'common' && earnedBadges.includes(b.id)).length,
    uncommon: allBadges.filter(b => b.rarity === 'uncommon' && earnedBadges.includes(b.id)).length,
    rare: allBadges.filter(b => b.rarity === 'rare' && earnedBadges.includes(b.id)).length,
    epic: allBadges.filter(b => b.rarity === 'epic' && earnedBadges.includes(b.id)).length,
    legendary: allBadges.filter(b => b.rarity === 'legendary' && earnedBadges.includes(b.id)).length
  };

  // Handle badge click
  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
  };

  // Close modal
  const closeModal = () => {
    setSelectedBadge(null);
  };

  // Check if badge is earned
  const isBadgeEarned = (badgeId) => {
    return earnedBadges.includes(badgeId);
  };

  // Get badge progress
  const getBadgeProgress = (badgeId) => {
    return studentData.badgeProgress?.[badgeId] || { current: 0, total: 1 };
  };

  // Calculate progress percentage
  const getProgressPercentage = (badgeId) => {
    if (isBadgeEarned(badgeId)) return 100;
    const progress = getBadgeProgress(badgeId);
    return Math.round((progress.current / progress.total) * 100);
  };

  return (
    <BadgeSystemContainer>
      <h2 style={{ margin: '0 0 20px 0', textAlign: 'center', fontSize: '28px' }}>
        🏆 Badge Collection
      </h2>

      {/* Badge Statistics */}
      <BadgeStats>
        <StatCard>
          <StatValue>{earnedCount}</StatValue>
          <StatLabel>Badges Earned</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{completionRate}%</StatValue>
          <StatLabel>Collection Rate</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{rarityCounts.legendary + rarityCounts.epic}</StatValue>
          <StatLabel>Rare Badges</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{Math.round(studentData.totalXP / 100)}</StatValue>
          <StatLabel>Badge XP x100</StatLabel>
        </StatCard>
      </BadgeStats>

      {/* Category Tabs */}
      <CategoryTabs>
        <CategoryTab 
          active={activeCategory === 'all'} 
          onClick={() => setActiveCategory('all')}
        >
          🌟 All Badges
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'learning'} 
          onClick={() => setActiveCategory('learning')}
        >
          📚 Learning
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'coding'} 
          onClick={() => setActiveCategory('coding')}
        >
          💻 Coding
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'ethics'} 
          onClick={() => setActiveCategory('ethics')}
        >
          🛡️ Ethics
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'social'} 
          onClick={() => setActiveCategory('social')}
        >
          🤝 Social
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'consistency'} 
          onClick={() => setActiveCategory('consistency')}
        >
          🔥 Consistency
        </CategoryTab>
      </CategoryTabs>

      {/* Badge Grid */}
      <BadgeGrid>
        {filteredBadges.map((badge) => {
          const isEarned = isBadgeEarned(badge.id);
          const progress = getBadgeProgress(badge.id);
          const progressPercentage = getProgressPercentage(badge.id);
          
          return (
            <BadgeCard
              key={badge.id}
              earned={isEarned}
              newlyEarned={newlyEarnedBadges.includes(badge.id)}
              onClick={() => handleBadgeClick(badge)}
            >
              <BadgeIconContainer>
                <BadgeIconMain earned={isEarned}>
                  {badge.icon}
                  {isEarned && (
                    <>
                      <BadgeSparkle />
                      <BadgeSparkle />
                      <BadgeSparkle />
                      <BadgeSparkle />
                    </>
                  )}
                </BadgeIconMain>
              </BadgeIconContainer>
              
              <BadgeName earned={isEarned}>{badge.name}</BadgeName>
              <BadgeDescription earned={isEarned}>
                {badge.description}
              </BadgeDescription>
              
              {!isEarned && (
                <>
                  <BadgeProgress earned={isEarned}>
                    {progress.current} / {progress.total}
                  </BadgeProgress>
                  <BadgeProgressBar>
                    <BadgeProgressFill 
                      percentage={progressPercentage}
                      earned={isEarned}
                    />
                  </BadgeProgressBar>
                </>
              )}
              
              {isEarned && (
                <BadgeDate>
                  Earned: {new Date().toLocaleDateString()}
                </BadgeDate>
              )}
              
              <div style={{ 
                fontSize: '10px', 
                marginTop: '8px', 
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}>
                {badge.rarity || 'common'} • +{badge.xpReward || 0} XP
              </div>
            </BadgeCard>
          );
        })}
      </BadgeGrid>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <BadgeModal onClick={closeModal}>
          <BadgeModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <X size={16} />
            </CloseButton>
            
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>
              {selectedBadge.icon}
            </div>
            
            <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
              {selectedBadge.name}
            </h2>
            
            <p style={{ 
              fontSize: '16px', 
              marginBottom: '20px', 
              color: 'rgba(255,255,255,0.9)' 
            }}>
              {selectedBadge.description}
            </p>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '15px', 
              borderRadius: '12px', 
              marginBottom: '20px' 
            }}>
              <strong>Requirement:</strong> {selectedBadge.requirement || 'Complete activities to earn this badge'}
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.8)'
            }}>
              <span>Rarity: <strong>{(selectedBadge.rarity || 'common').toUpperCase()}</strong></span>
              <span>XP Reward: <strong>+{selectedBadge.xpReward || 0}</strong></span>
            </div>
            
            {isBadgeEarned(selectedBadge.id) ? (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: 'rgba(76, 175, 80, 0.3)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <CheckCircle size={20} />
                <strong>Badge Earned!</strong>
              </div>
            ) : (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: 'rgba(255, 193, 7, 0.3)', 
                borderRadius: '12px' 
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Progress: {getBadgeProgress(selectedBadge.id).current} / {getBadgeProgress(selectedBadge.id).total}</strong>
                </div>
                <BadgeProgressBar>
                  <BadgeProgressFill 
                    percentage={getProgressPercentage(selectedBadge.id)}
                  />
                </BadgeProgressBar>
              </div>
            )}
          </BadgeModalContent>
        </BadgeModal>
      )}
    </BadgeSystemContainer>
  );
};

export default BadgeSystem;