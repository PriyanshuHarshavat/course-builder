import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Trophy,
  Crown,
  Medal,
  Star,
  Zap,
  Target,
  Users,
  TrendingUp,
  Award,
  Flame,
  Brain,
  Code,
  Shield,
  Heart,
  Gem,
  ChevronUp,
  ChevronDown,
  Filter,
  Calendar,
  Clock
} from 'lucide-react';

// Animations
const slideInFromLeft = keyframes`
  0% { transform: translateX(-50px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const podiumRise = keyframes`
  0% { transform: translateY(100px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const crownSpin = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
`;

const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const rankPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Main Container
const LeaderboardContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 600px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

// Header Section
const LeaderboardHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const LeaderboardTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const LeaderboardSubtitle = styled.p`
  margin: 0 0 20px 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
`;

// Filter Tabs
const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'};
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }
  
  ${props => props.active && css`
    box-shadow: 0 4px 15px rgba(255,255,255,0.2);
  `}
`;

// Podium Section
const PodiumSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 20px;
  margin-bottom: 40px;
  padding: 0 20px;
`;

const PodiumPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: ${podiumRise} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
`;

const PodiumAvatar = styled.div`
  width: ${props => props.size || '80px'};
  height: ${props => props.size || '80px'};
  border-radius: 50%;
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea, #764ba2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.fontSize || '32px'};
  margin-bottom: 10px;
  border: ${props => props.rank === 1 ? '4px solid #FFD700' : props.rank === 2 ? '3px solid #C0C0C0' : '2px solid #CD7F32'};
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  position: relative;
  
  ${props => props.rank === 1 && css`
    animation: ${rankPulse} 2s infinite;
  `}
`;

const PodiumCrown = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  animation: ${crownSpin} 3s infinite;
`;

const PodiumName = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  text-align: center;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PodiumScore = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${props => {
    switch(props.rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return 'white';
    }
  }};
  margin-bottom: 10px;
`;

const PodiumBase = styled.div`
  width: ${props => props.width || '80px'};
  height: ${props => props.height || '60px'};
  background: ${props => {
    switch(props.rank) {
      case 1: return 'linear-gradient(135deg, #FFD700, #FFA500)';
      case 2: return 'linear-gradient(135deg, #C0C0C0, #A8A8A8)';
      case 3: return 'linear-gradient(135deg, #CD7F32, #B8860B)';
      default: return 'linear-gradient(135deg, #667eea, #764ba2)';
    }
  }};
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  position: relative;
  
  ${props => props.rank === 1 && css`
    background-size: 200% auto;
    animation: ${goldShimmer} 3s linear infinite;
  `}
`;

const PodiumRank = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
`;

// Leaderboard List
const LeaderboardList = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr auto auto;
  gap: 15px;
  padding: 0 15px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
`;

const LeaderboardItem = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr auto auto;
  gap: 15px;
  padding: 15px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: ${slideInFromLeft} 0.6s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
  
  ${props => props.isCurrentUser && css`
    background: rgba(255, 215, 0, 0.2);
    border: 2px solid rgba(255, 215, 0, 0.4);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
  `}
`;

const RankBadge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => {
    if (props.rank <= 3) {
      switch(props.rank) {
        case 1: return 'linear-gradient(135deg, #FFD700, #FFA500)';
        case 2: return 'linear-gradient(135deg, #C0C0C0, #A8A8A8)';
        case 3: return 'linear-gradient(135deg, #CD7F32, #B8860B)';
        default: return 'linear-gradient(135deg, #667eea, #764ba2)';
      }
    }
    return 'rgba(255, 255, 255, 0.2)';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  position: relative;
  
  ${props => props.rank <= 3 && css`
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  `}
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PlayerAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea, #764ba2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const PlayerDetails = styled.div`
  flex: 1;
`;

const PlayerName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
  color: ${props => props.isCurrentUser ? '#FFD700' : 'white'};
`;

const PlayerLevel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ScoreDisplay = styled.div`
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  color: #FFD700;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${props => {
    if (props.trend === 'up') return '#4CAF50';
    if (props.trend === 'down') return '#FF6B6B';
    return '#FFC107';
  }};
`;

// Stats Section
const StatsSection = styled.div`
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const StatIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #FFD700;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
`;

// Leaderboard Component
const Leaderboard = ({
  currentUserId = 'user1',
  timeframe = 'weekly',
  category = 'xp'
}) => {
  const [activeFilter, setActiveFilter] = useState(timeframe);
  const [activeCategory, setActiveCategory] = useState(category);
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Mock leaderboard data
  const mockData = {
    weekly: {
      xp: [
        { id: 'user3', name: 'Sarah Chen', level: 5, xp: 2450, avatar: '👩‍💻', trend: 'up', change: '+150' },
        { id: 'user1', name: 'Alex Rivera', level: 4, xp: 2200, avatar: '🧑‍🎓', trend: 'up', change: '+120' },
        { id: 'user5', name: 'Maya Patel', level: 4, xp: 2180, avatar: '👧', trend: 'same', change: '+95' },
        { id: 'user2', name: 'Jordan Kim', level: 3, xp: 1950, avatar: '🧑‍🚀', trend: 'down', change: '+80' },
        { id: 'user4', name: 'Zoe Martinez', level: 3, xp: 1890, avatar: '👩‍🔬', trend: 'up', change: '+110' },
        { id: 'user6', name: 'Ryan Foster', level: 3, xp: 1820, avatar: '👦', trend: 'up', change: '+75' },
        { id: 'user7', name: 'Emma Wilson', level: 2, xp: 1650, avatar: '👩‍🎨', trend: 'same', change: '+60' },
        { id: 'user8', name: 'Liam Brown', level: 2, xp: 1520, avatar: '🧑‍💼', trend: 'up', change: '+45' }
      ],
      badges: [
        { id: 'user2', name: 'Jordan Kim', level: 3, score: 12, avatar: '🧑‍🚀', trend: 'up', change: '+3' },
        { id: 'user1', name: 'Alex Rivera', level: 4, score: 11, avatar: '🧑‍🎓', trend: 'same', change: '+2' },
        { id: 'user3', name: 'Sarah Chen', level: 5, score: 10, avatar: '👩‍💻', trend: 'up', change: '+2' }
      ],
      streak: [
        { id: 'user4', name: 'Zoe Martinez', level: 3, score: 14, avatar: '👩‍🔬', trend: 'up', change: '+2' },
        { id: 'user1', name: 'Alex Rivera', level: 4, score: 12, avatar: '🧑‍🎓', trend: 'up', change: '+1' },
        { id: 'user6', name: 'Ryan Foster', level: 3, score: 9, avatar: '👦', trend: 'same', change: '+1' }
      ]
    }
  };

  // Filter options
  const timeFilters = [
    { id: 'daily', label: 'Today', icon: <Clock size={16} /> },
    { id: 'weekly', label: 'This Week', icon: <Calendar size={16} /> },
    { id: 'monthly', label: 'This Month', icon: <TrendingUp size={16} /> },
    { id: 'alltime', label: 'All Time', icon: <Trophy size={16} /> }
  ];

  const categoryFilters = [
    { id: 'xp', label: 'Experience', icon: <Zap size={16} /> },
    { id: 'badges', label: 'Badges', icon: <Medal size={16} /> },
    { id: 'streak', label: 'Streak', icon: <Flame size={16} /> },
    { id: 'lessons', label: 'Lessons', icon: <Brain size={16} /> }
  ];

  // Load leaderboard data
  useEffect(() => {
    const data = mockData[activeFilter]?.[activeCategory] || mockData.weekly.xp;
    setLeaderboardData(data);
  }, [activeFilter, activeCategory]);

  // Get user rank
  const getUserRank = () => {
    const userIndex = leaderboardData.findIndex(user => user.id === currentUserId);
    return userIndex !== -1 ? userIndex + 1 : null;
  };

  // Get score label
  const getScoreLabel = () => {
    switch(activeCategory) {
      case 'xp': return 'XP';
      case 'badges': return 'Badges';
      case 'streak': return 'Days';
      case 'lessons': return 'Lessons';
      default: return 'Score';
    }
  };

  // Get trend icon
  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <ChevronUp size={14} />;
      case 'down': return <ChevronDown size={14} />;
      default: return null;
    }
  };

  const topThree = leaderboardData.slice(0, 3);
  const rest = leaderboardData.slice(3);
  const userRank = getUserRank();

  return (
    <LeaderboardContainer>
      {/* Header */}
      <LeaderboardHeader>
        <LeaderboardTitle>
          <Trophy size={32} />
          Leaderboard
          <Crown size={32} />
        </LeaderboardTitle>
        <LeaderboardSubtitle>
          See how you stack up against other AI learners! 🚀
        </LeaderboardSubtitle>

        {/* Filters */}
        <FilterTabs>
          {timeFilters.map(filter => (
            <FilterTab
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.icon}
              {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>

        <FilterTabs>
          {categoryFilters.map(filter => (
            <FilterTab
              key={filter.id}
              active={activeCategory === filter.id}
              onClick={() => setActiveCategory(filter.id)}
            >
              {filter.icon}
              {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>
      </LeaderboardHeader>

      {/* Podium */}
      {topThree.length >= 3 && (
        <PodiumSection>
          {/* Second Place */}
          <PodiumPlace delay="0.2s">
            <PodiumAvatar
              size="60px"
              fontSize="24px"
              rank={2}
              gradient="linear-gradient(135deg, #C0C0C0, #A8A8A8)"
            >
              {topThree[1]?.avatar}
            </PodiumAvatar>
            <PodiumName>{topThree[1]?.name}</PodiumName>
            <PodiumScore rank={2}>
              {topThree[1]?.xp || topThree[1]?.score} {getScoreLabel()}
            </PodiumScore>
            <PodiumBase rank={2} width="70px" height="50px">
              <PodiumRank>2</PodiumRank>
            </PodiumBase>
          </PodiumPlace>

          {/* First Place */}
          <PodiumPlace delay="0s">
            <PodiumAvatar
              size="80px"
              fontSize="32px"
              rank={1}
              gradient="linear-gradient(135deg, #FFD700, #FFA500)"
            >
              <PodiumCrown>👑</PodiumCrown>
              {topThree[0]?.avatar}
            </PodiumAvatar>
            <PodiumName>{topThree[0]?.name}</PodiumName>
            <PodiumScore rank={1}>
              {topThree[0]?.xp || topThree[0]?.score} {getScoreLabel()}
            </PodiumScore>
            <PodiumBase rank={1} width="90px" height="70px">
              <PodiumRank>1</PodiumRank>
            </PodiumBase>
          </PodiumPlace>

          {/* Third Place */}
          <PodiumPlace delay="0.4s">
            <PodiumAvatar
              size="60px"
              fontSize="24px"
              rank={3}
              gradient="linear-gradient(135deg, #CD7F32, #B8860B)"
            >
              {topThree[2]?.avatar}
            </PodiumAvatar>
            <PodiumName>{topThree[2]?.name}</PodiumName>
            <PodiumScore rank={3}>
              {topThree[2]?.xp || topThree[2]?.score} {getScoreLabel()}
            </PodiumScore>
            <PodiumBase rank={3} width="70px" height="40px">
              <PodiumRank>3</PodiumRank>
            </PodiumBase>
          </PodiumPlace>
        </PodiumSection>
      )}

      {/* Full Leaderboard */}
      <LeaderboardList>
        <ListHeader>
          <div>Rank</div>
          <div>Player</div>
          <div>Trend</div>
          <div>{getScoreLabel()}</div>
        </ListHeader>

        {leaderboardData.map((player, index) => (
          <LeaderboardItem
            key={player.id}
            delay={`${index * 0.1}s`}
            isCurrentUser={player.id === currentUserId}
          >
            <RankBadge rank={index + 1}>
              {index + 1 <= 3 ? (
                index + 1 === 1 ? '🥇' :
                index + 1 === 2 ? '🥈' : '🥉'
              ) : (
                index + 1
              )}
            </RankBadge>

            <PlayerInfo>
              <PlayerAvatar>{player.avatar}</PlayerAvatar>
              <PlayerDetails>
                <PlayerName isCurrentUser={player.id === currentUserId}>
                  {player.name}
                  {player.id === currentUserId && ' (You)'}
                </PlayerName>
                <PlayerLevel>
                  <Star size={12} />
                  Level {player.level}
                </PlayerLevel>
              </PlayerDetails>
            </PlayerInfo>

            <TrendIndicator trend={player.trend}>
              {getTrendIcon(player.trend)}
              {player.change}
            </TrendIndicator>

            <ScoreDisplay>
              <span>{player.xp || player.score}</span>
            </ScoreDisplay>
          </LeaderboardItem>
        ))}
      </LeaderboardList>

      {/* Stats */}
      <StatsSection>
        <StatsGrid>
          <StatCard>
            <StatIcon>🎯</StatIcon>
            <StatValue>{userRank || '--'}</StatValue>
            <StatLabel>Your Rank</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>👥</StatIcon>
            <StatValue>{leaderboardData.length}</StatValue>
            <StatLabel>Total Players</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>📈</StatIcon>
            <StatValue>
              {leaderboardData.find(p => p.id === currentUserId)?.change || '+0'}
            </StatValue>
            <StatLabel>Weekly Change</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>🏆</StatIcon>
            <StatValue>
              {userRank && userRank <= 10 ? 'Top 10' : 'Rising'}
            </StatValue>
            <StatLabel>Status</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>
    </LeaderboardContainer>
  );
};

export default Leaderboard;