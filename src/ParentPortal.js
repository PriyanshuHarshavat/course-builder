import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Heart,
  Star,
  Trophy,
  Clock,
  Calendar,
  TrendingUp,
  BookOpen,
  Brain,
  Palette,
  Code,
  Shield,
  Award,
  Target,
  Activity,
  Download,
  Share2,
  Eye,
  MessageCircle,
  Settings,
  Bell,
  BellOff,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Image,
  FileText,
  Music,
  Video,
  Sparkles,
  Zap,
  Users,
  Home
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

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-10px); }
  70% { transform: translateY(-5px); }
  90% { transform: translateY(-2px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
`;

// Main Container
const PortalContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
  animation: ${fadeIn} 0.6s ease-out;
`;

// Header
const PortalHeader = styled.div`
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

const ChildAvatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${props => props.color || 'linear-gradient(135deg, #FF6B6B, #FF8E53)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  animation: ${glow} 3s infinite;
`;

const ChildInfo = styled.div``;

const ChildName = styled.h1`
  margin: 0;
  font-size: 32px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChildDetails = styled.div`
  font-size: 16px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 8px;
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
  padding: 12px 16px;
  border-radius: 12px;
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

// Quick Stats
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
  }
  
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

const StatIcon = styled.div`
  font-size: 36px;
  margin-bottom: 12px;
  color: ${props => props.color || '#fff'};
  animation: ${props => props.celebrating ? bounce : 'none'} 1s ease-in-out;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
`;

const StatProgress = styled.div`
  font-size: 12px;
  color: ${props => props.color || '#4CAF50'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
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

// Projects Gallery
const ProjectsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  max-height: 500px;
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

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
`;

const ProjectThumbnail = styled.div`
  width: 100%;
  height: 120px;
  background: ${props => props.background || 'linear-gradient(135deg, #FF6B6B, #FF8E53)'};
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  position: relative;
  overflow: hidden;
  
  ${props => props.isNew && css`
    &::after {
      content: 'NEW!';
      position: absolute;
      top: 8px;
      right: 8px;
      background: #4CAF50;
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: bold;
    }
  `}
`;

const ProjectTitle = styled.div`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 14px;
`;

const ProjectInfo = styled.div`
  font-size: 12px;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectType = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
`;

// Recent Activity
const ActivitySection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const ActivityList = styled.div`
  max-height: 400px;
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

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  animation: ${slideIn} 0.5s ease-out;
`;

const ActivityIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${props => props.color || '#4CAF50'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 14px;
`;

const ActivityDescription = styled.div`
  font-size: 12px;
  opacity: 0.8;
  line-height: 1.3;
`;

const ActivityTime = styled.div`
  font-size: 11px;
  opacity: 0.7;
  text-align: right;
`;

// Progress Section
const ProgressSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ProgressCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ProgressTitle = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProgressPercentage = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.color || '#4CAF50'};
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
  transition: width 0.8s ease;
`;

const ProgressDetails = styled.div`
  font-size: 12px;
  opacity: 0.8;
  line-height: 1.4;
`;

// Generate mock data
const generateChildData = () => {
  const projects = [
    {
      id: 1,
      title: "My Robot Friend",
      type: "AI Art",
      thumbnail: "🤖",
      background: "linear-gradient(135deg, #4CAF50, #45a049)",
      date: "2 days ago",
      isNew: true,
      description: "Created a colorful robot using AI art generator"
    },
    {
      id: 2,
      title: "Ocean Adventure Story",
      type: "AI Writing",
      thumbnail: "🌊",
      background: "linear-gradient(135deg, #2196F3, #1976D2)",
      date: "1 week ago",
      isNew: false,
      description: "Collaborated with AI to write an underwater adventure"
    },
    {
      id: 3,
      title: "Dancing Pixels",
      type: "Creative Code",
      thumbnail: "💃",
      background: "linear-gradient(135deg, #9C27B0, #7B1FA2)",
      date: "1 week ago",
      isNew: false,
      description: "Programmed animated dancing characters"
    },
    {
      id: 4,
      title: "Space Cat Explorer",
      type: "AI Art",
      thumbnail: "🐱‍🚀",
      background: "linear-gradient(135deg, #FF9800, #F57C00)",
      date: "2 weeks ago",
      isNew: false,
      description: "AI-generated artwork of cats exploring space"
    },
    {
      id: 5,
      title: "Magic Forest Poem",
      type: "AI Writing",
      thumbnail: "🌲",
      background: "linear-gradient(135deg, #4CAF50, #388E3C)",
      date: "2 weeks ago",
      isNew: false,
      description: "Wrote a magical poem about enchanted forests"
    },
    {
      id: 6,
      title: "Bouncing Rainbow",
      type: "Creative Code",
      thumbnail: "🌈",
      background: "linear-gradient(135deg, #E91E63, #C2185B)",
      date: "3 weeks ago",
      isNew: false,
      description: "Coded a bouncing rainbow animation"
    }
  ];

  const activities = [
    {
      type: "project",
      title: "Created 'My Robot Friend'",
      description: "Used AI Art Generator to create a colorful robot character with blue circuits and friendly eyes",
      time: "2 hours ago",
      color: "#4CAF50",
      icon: <Palette size={16} />
    },
    {
      type: "achievement",
      title: "Earned 'Creative Explorer' Badge",
      description: "Completed 5 creative AI projects using different tools and techniques",
      time: "1 day ago",
      color: "#FFD700",
      icon: <Award size={16} />
    },
    {
      type: "learning",
      title: "Completed AI Ethics Module",
      description: "Learned about responsible AI use and how to create safe, positive content",
      time: "2 days ago",
      color: "#2196F3",
      icon: <Shield size={16} />
    },
    {
      type: "collaboration",
      title: "Helped classmate with coding",
      description: "Shared knowledge about AI art generation with Emma during group project time",
      time: "3 days ago",
      color: "#9C27B0",
      icon: <Users size={16} />
    },
    {
      type: "exploration",
      title: "Discovered AI Music Tools",
      description: "Explored different AI music generators and created a short melody",
      time: "1 week ago",
      color: "#FF9800",
      icon: <Music size={16} />
    }
  ];

  return {
    name: "Alex Rivera",
    avatar: "AR",
    avatarColor: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
    grade: "5th Grade",
    teacher: "Ms. Johnson",
    school: "Lincoln Elementary",
    totalProjects: projects.length,
    newProjects: projects.filter(p => p.isNew).length,
    totalTime: "47 hours",
    weeklyGoal: 5,
    thisWeekHours: 3,
    streak: 7,
    longestStreak: 12,
    projects,
    activities,
    progress: {
      aiBasics: 92,
      creativity: 88,
      programming: 76,
      ethics: 94,
      collaboration: 82
    },
    achievements: [
      { name: "First Steps", icon: "🎯", earned: true },
      { name: "Creative Explorer", icon: "🎨", earned: true },
      { name: "Code Warrior", icon: "💻", earned: true },
      { name: "AI Ethics Champion", icon: "🛡️", earned: true },
      { name: "Team Player", icon: "🤝", earned: true },
      { name: "Innovation Master", icon: "🚀", earned: false }
    ]
  };
};

// Main Component
const ParentPortal = ({ 
  childId = 'alex-rivera',
  onProjectView = () => {},
  onSettingsUpdate = () => {}
}) => {
  const [childData, setChildData] = useState(generateChildData());
  const [selectedProject, setSelectedProject] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [viewMode, setViewMode] = useState('overview');

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onProjectView(project);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 75) return '#8BC34A';
    if (percentage >= 60) return '#FFC107';
    if (percentage >= 40) return '#FF9800';
    return '#f44336';
  };

  return (
    <PortalContainer>
      <PortalHeader>
        <HeaderLeft>
          <ChildAvatar color={childData.avatarColor}>
            {childData.avatar}
          </ChildAvatar>
          <ChildInfo>
            <ChildName>
              {childData.name}
              <Heart size={24} style={{ color: '#FF6B6B' }} />
            </ChildName>
            <ChildDetails>
              <span>{childData.grade} • {childData.teacher}</span>
              <span>•</span>
              <span>{childData.school}</span>
              <span>•</span>
              <span>{childData.streak} day learning streak! 🔥</span>
            </ChildDetails>
          </ChildInfo>
        </HeaderLeft>
        
        <HeaderControls>
          <ControlButton 
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            style={{ background: notificationsEnabled ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 255, 255, 0.2)' }}
          >
            {notificationsEnabled ? <Bell size={16} /> : <BellOff size={16} />}
            Updates
          </ControlButton>
          <ControlButton>
            <Download size={16} />
            Export Report
          </ControlButton>
          <ControlButton>
            <Share2 size={16} />
            Share Progress
          </ControlButton>
        </HeaderControls>
      </PortalHeader>

      {/* Quick Stats */}
      <StatsGrid>
        <StatCard color="#4CAF50">
          <StatIcon color="#4CAF50" celebrating={childData.newProjects > 0}>
            <Palette size={36} />
          </StatIcon>
          <StatValue>{childData.totalProjects}</StatValue>
          <StatLabel>AI Projects Created</StatLabel>
          <StatProgress color="#4CAF50">
            <Sparkles size={12} />
            {childData.newProjects} new this week!
          </StatProgress>
        </StatCard>

        <StatCard color="#2196F3">
          <StatIcon color="#2196F3">
            <Clock size={36} />
          </StatIcon>
          <StatValue>{childData.totalTime}</StatValue>
          <StatLabel>Learning Time</StatLabel>
          <StatProgress color="#2196F3">
            <TrendingUp size={12} />
            {childData.thisWeekHours}/{childData.weeklyGoal} hours this week
          </StatProgress>
        </StatCard>

        <StatCard color="#FF9800">
          <StatIcon color="#FF9800">
            <Trophy size={36} />
          </StatIcon>
          <StatValue>{childData.achievements.filter(a => a.earned).length}</StatValue>
          <StatLabel>Badges Earned</StatLabel>
          <StatProgress color="#FF9800">
            <Award size={12} />
            1 more to unlock Innovation Master!
          </StatProgress>
        </StatCard>

        <StatCard color="#9C27B0">
          <StatIcon color="#9C27B0">
            <Target size={36} />
          </StatIcon>
          <StatValue>{Math.round(Object.values(childData.progress).reduce((a, b) => a + b, 0) / Object.values(childData.progress).length)}%</StatValue>
          <StatLabel>Overall Progress</StatLabel>
          <StatProgress color="#9C27B0">
            <Star size={12} />
            Excellent progress!
          </StatProgress>
        </StatCard>
      </StatsGrid>

      <ContentArea>
        {/* Projects Gallery */}
        <ProjectsSection>
          <SectionHeader>
            <SectionTitle>
              <Sparkles size={24} />
              {childData.name}'s AI Creations
            </SectionTitle>
            <ControlButton>
              <Eye size={16} />
              View All
            </ControlButton>
          </SectionHeader>
          
          <ProjectsGrid>
            {childData.projects.map(project => (
              <ProjectCard key={project.id} onClick={() => handleProjectClick(project)}>
                <ProjectThumbnail 
                  background={project.background}
                  isNew={project.isNew}
                >
                  {project.thumbnail}
                </ProjectThumbnail>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectInfo>
                  <ProjectType>{project.type}</ProjectType>
                  <span>{project.date}</span>
                </ProjectInfo>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </ProjectsSection>

        {/* Recent Activity */}
        <ActivitySection>
          <SectionHeader>
            <SectionTitle>
              <Activity size={20} />
              Recent Activity
            </SectionTitle>
          </SectionHeader>
          
          <ActivityList>
            {childData.activities.map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityIcon color={activity.color}>
                  {activity.icon}
                </ActivityIcon>
                
                <ActivityContent>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityDescription>{activity.description}</ActivityDescription>
                </ActivityContent>
                
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityItem>
            ))}
          </ActivityList>
        </ActivitySection>
      </ContentArea>

      {/* Learning Progress */}
      <ProgressSection>
        <SectionHeader>
          <SectionTitle>
            <TrendingUp size={24} />
            Learning Progress & Skills
          </SectionTitle>
        </SectionHeader>
        
        <ProgressGrid>
          <ProgressCard>
            <ProgressHeader>
              <ProgressTitle>
                <Brain size={18} />
                AI Fundamentals
              </ProgressTitle>
              <ProgressPercentage color={getProgressColor(childData.progress.aiBasics)}>
                {childData.progress.aiBasics}%
              </ProgressPercentage>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill 
                percentage={childData.progress.aiBasics} 
                color={getProgressColor(childData.progress.aiBasics)} 
              />
            </ProgressBar>
            <ProgressDetails>
              Excellent understanding of AI concepts, machine learning basics, and how different AI systems work. Ready for advanced topics!
            </ProgressDetails>
          </ProgressCard>

          <ProgressCard>
            <ProgressHeader>
              <ProgressTitle>
                <Palette size={18} />
                Creative AI Use
              </ProgressTitle>
              <ProgressPercentage color={getProgressColor(childData.progress.creativity)}>
                {childData.progress.creativity}%
              </ProgressPercentage>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill 
                percentage={childData.progress.creativity} 
                color={getProgressColor(childData.progress.creativity)} 
              />
            </ProgressBar>
            <ProgressDetails>
              Shows great creativity in AI art generation, storytelling, and multimedia projects. Loves experimenting with different styles.
            </ProgressDetails>
          </ProgressCard>

          <ProgressCard>
            <ProgressHeader>
              <ProgressTitle>
                <Code size={18} />
                Programming Skills
              </ProgressTitle>
              <ProgressPercentage color={getProgressColor(childData.progress.programming)}>
                {childData.progress.programming}%
              </ProgressPercentage>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill 
                percentage={childData.progress.programming} 
                color={getProgressColor(childData.progress.programming)} 
              />
            </ProgressBar>
            <ProgressDetails>
              Good progress in visual programming and basic coding concepts. Starting to understand how AI algorithms work.
            </ProgressDetails>
          </ProgressCard>

          <ProgressCard>
            <ProgressHeader>
              <ProgressTitle>
                <Shield size={18} />
                Digital Ethics
              </ProgressTitle>
              <ProgressPercentage color={getProgressColor(childData.progress.ethics)}>
                {childData.progress.ethics}%
              </ProgressPercentage>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill 
                percentage={childData.progress.ethics} 
                color={getProgressColor(childData.progress.ethics)} 
              />
            </ProgressBar>
            <ProgressDetails>
              Outstanding awareness of AI safety, responsible use, and digital citizenship. Sets a great example for classmates.
            </ProgressDetails>
          </ProgressCard>

          <ProgressCard>
            <ProgressHeader>
              <ProgressTitle>
                <Users size={18} />
                Collaboration
              </ProgressTitle>
              <ProgressPercentage color={getProgressColor(childData.progress.collaboration)}>
                {childData.progress.collaboration}%
              </ProgressPercentage>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill 
                percentage={childData.progress.collaboration} 
                color={getProgressColor(childData.progress.collaboration)} 
              />
            </ProgressBar>
            <ProgressDetails>
              Great team player! Helps classmates, shares knowledge, and works well in group AI projects.
            </ProgressDetails>
          </ProgressCard>

          <ProgressCard>
            <ProgressHeader>
              <ProgressTitle>
                <Star size={18} />
                Achievements
              </ProgressTitle>
              <ProgressPercentage color="#FFD700">
                {childData.achievements.filter(a => a.earned).length}/{childData.achievements.length}
              </ProgressPercentage>
            </ProgressHeader>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px' }}>
              {childData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    background: achievement.earned ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    fontSize: '12px',
                    opacity: achievement.earned ? 1 : 0.5
                  }}
                >
                  <span>{achievement.icon}</span>
                  <span>{achievement.name}</span>
                </div>
              ))}
            </div>
          </ProgressCard>
        </ProgressGrid>
      </ProgressSection>
    </PortalContainer>
  );
};

export default ParentPortal;