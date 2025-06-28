import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GamificationProvider, GamificationDashboard, useGamification, useQuickActions } from './GamificationManager';
import { AnalyticsProvider, useAnalytics, useButtonTracking } from './AnalyticsProvider';
import { UnsavedWorkProvider, useUnsavedWork } from './UnsavedWorkProvider';
import AnalyticsDashboard from './AnalyticsDashboard';
import StudentDashboard from './StudentDashboard';
import TemplateGallery from './TemplateGallery';
import LessonBuilder from './LessonBuilder';
import AIChatDemo from './AIChatDemo';
import AIGeneratorComparison from './AIGeneratorComparison';
import AIToolsHub from './AIToolsHub';
import SafetyManager from './SafetyManager';
import { SafetyProvider, SafetyAlerts } from './SafetyProvider';
import TeacherDashboard from './TeacherDashboard';
import StudentMonitor from './StudentMonitor';
import ParentPortal from './ParentPortal';
import ProjectViewer from './ProjectViewer';
import ParentAuth from './ParentAuth';
import PromptingLessons from './PromptingLessons';
import CourseBuilder from './CourseBuilder';
import CourseLibrary from './CourseLibrary';
import BrandManager from './BrandManager';
import AzureBrandManager from './AzureBrandManager';
import { CustomThemeProvider } from './theme/ThemeProvider';
import ThemeAwareLogo from './components/ThemeAwareLogo';
import {
  Home,
  Trophy,
  BookOpen,
  Settings,
  User,
  Play,
  Target,
  Flame,
  Medal,
  Crown,
  ChevronRight,
  Plus,
  MessageCircle,
  GitCompare,
  ExternalLink,
  Shield,
  Users,
  Heart,
  BarChart3,
  Edit3,
  Palette,
  Brain
} from 'lucide-react';

// Main App Container
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Comic Sans MS', cursive, sans-serif;
  display: flex;
`;

// Sidebar Navigation
const Sidebar = styled.div`
  width: 300px;
  background: linear-gradient(180deg, 
    rgba(15, 23, 42, 0.98) 0%,
    rgba(30, 41, 59, 0.95) 50%,
    rgba(51, 65, 85, 0.98) 100%
  );
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 90;
  box-shadow: 4px 0 32px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0.1;
    z-index: -1;
  }
`;

// Top Header (logo and user info)
const TopHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  padding: 12px 30px 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 0;
  min-height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

// Sidebar Header (Brand Section)
const SidebarHeader = styled.div`
  padding: 30px 24px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%);
    animation: pulse 4s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.1); opacity: 0.1; }
  }
`;

const BrandLogo = styled.div`
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 12px;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const BrandTagline = styled.div`
  font-size: 13px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  position: relative;
  z-index: 2;
`;

// Sidebar Navigation
const SidebarNav = styled.div`
  flex: 1;
  padding: 30px 0 24px 0;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(148, 163, 184, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(148, 163, 184, 0.5);
    }
  }
`;

const NavSection = styled.div`
  margin-bottom: 32px;
`;

const NavSectionTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: rgba(148, 163, 184, 0.8);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 0 24px 12px 24px;
  margin-bottom: 8px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 24px;
    right: 24px;
    height: 1px;
    background: linear-gradient(90deg, rgba(148, 163, 184, 0.3) 0%, transparent 100%);
  }
`;

const NavItem = styled.button`
  width: 100%;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'transparent'
  };
  border: none;
  color: ${props => props.active ? 'white' : 'rgba(226, 232, 240, 0.9)'};
  padding: 14px 24px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 2px 12px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => props.active 
      ? 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)' 
      : 'transparent'
    };
    border-radius: 0 2px 2px 0;
    transition: all 0.3s ease;
  }
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'rgba(148, 163, 184, 0.1)'
    };
    transform: translateX(4px);
    box-shadow: ${props => props.active 
      ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
      : '0 4px 12px rgba(0, 0, 0, 0.1)'
    };
  }
  
  svg {
    opacity: ${props => props.active ? '1' : '0.7'};
    transition: all 0.3s ease;
  }
  
  &:hover svg {
    opacity: 1;
    transform: scale(1.1);
  }
`;

// Sidebar Footer (Role Switcher)
const SidebarFooter = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  background: linear-gradient(180deg, 
    rgba(15, 23, 42, 0.8) 0%, 
    rgba(30, 41, 59, 0.9) 100%
  );
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 24px;
    right: 24px;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(148, 163, 184, 0.4) 50%, 
      transparent 100%
    );
  }
`;

const RoleSwitcherTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: rgba(148, 163, 184, 0.8);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '👥';
    font-size: 14px;
  }
`;

// Main Content Area
const MainContentArea = styled.div`
  flex: 1;
  margin-left: 300px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: white;
`;

const RoleSwitch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RoleButton = styled.button`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'rgba(148, 163, 184, 0.1)'
  };
  border: ${props => props.active 
    ? '2px solid rgba(102, 126, 234, 0.4)' 
    : '2px solid rgba(148, 163, 184, 0.2)'
  };
  color: ${props => props.active ? 'white' : 'rgba(226, 232, 240, 0.9)'};
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  margin-bottom: 8px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.active 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)' 
      : 'transparent'
    };
    transition: all 0.3s ease;
  }
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)' 
      : 'rgba(148, 163, 184, 0.15)'
    };
    border-color: ${props => props.active 
      ? 'rgba(124, 58, 237, 0.6)' 
      : 'rgba(148, 163, 184, 0.3)'
    };
    transform: translateY(-2px);
    box-shadow: ${props => props.active 
      ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
      : '0 4px 12px rgba(0, 0, 0, 0.15)'
    };
  }
  
  span {
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  &:hover span {
    transform: scale(1.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

// Main Content Area
const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.05);
`;

// Landing Page Styles
const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: white;
  padding: 40px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const LandingHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  z-index: 2;
`;

const LandingLogo = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const LandingTagline = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const LandingSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  max-width: 600px;
  line-height: 1.6;
  margin: 0 auto;
`;

const RoleSelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  z-index: 2;
`;

const RoleCard = styled.button`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
`;

const RoleIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  
  ${RoleCard}:hover & {
    transform: scale(1.1);
  }
`;

const RoleTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const RoleDescription = styled.p`
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const RoleFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
`;

const RoleFeature = styled.li`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &::before {
    content: '✨';
    font-size: 12px;
  }
`;

// Quick Actions Panel
const QuickActionsPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
`;

const QuickActionsTitle = styled.h3`
  margin: 0 0 15px 0;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const QuickActionButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  color: white;
  padding: 15px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Landing Page Component
const LandingPage = ({ onRoleSelect }) => {
  const { trackButtonClick } = useAnalytics();
  
  const roles = [
    {
      id: 'student',
      icon: '👨‍🎓',
      title: 'Student',
      description: 'Learn AI concepts through interactive courses and hands-on activities',
      features: ['Take AI courses', 'Chat with AI assistants', 'Earn achievements', 'Track your progress']
    },
    {
      id: 'teacher',
      title: 'Teacher',
      icon: '👩‍🏫',
      description: 'Create engaging AI curricula and monitor student progress',
      features: ['Build custom courses', 'Monitor students', 'View analytics', 'Manage classroom']
    },
    {
      id: 'parent',
      title: 'Parent',
      icon: '👨‍👩‍👧',
      description: 'Monitor your child\'s learning journey and achievements',
      features: ['View child progress', 'See achievements', 'Monitor activity', 'Support learning']
    },
    {
      id: 'admin',
      title: 'Administrator',
      icon: '⚙️',
      description: 'Manage the platform, customize branding, and oversee system operations',
      features: ['System analytics', 'Brand management', 'User management', 'Safety controls']
    }
  ];

  const selectRole = (roleId) => {
    localStorage.setItem('trainarama_user_role', roleId);
    localStorage.setItem('trainarama_current_tab', 'dashboard');
    trackButtonClick('role_selected', { roleId });
    if (onRoleSelect) {
      onRoleSelect(roleId);
    }
  };

  return (
    <LandingContainer>
      <LandingHeader>
        <LandingLogo>
          <ThemeAwareLogo size={64} showText={true} />
        </LandingLogo>
        <LandingTagline>Welcome to TrainArama AI Education</LandingTagline>
        <LandingSubtitle>
          Choose your role to access personalized learning and teaching tools designed for AI education
        </LandingSubtitle>
      </LandingHeader>

      <RoleSelectionGrid>
        {roles.map((role) => (
          <RoleCard key={role.id} onClick={() => selectRole(role.id)}>
            <RoleIcon>{role.icon}</RoleIcon>
            <RoleTitle>{role.title}</RoleTitle>
            <RoleDescription>{role.description}</RoleDescription>
            <RoleFeatures>
              {role.features.map((feature, index) => (
                <RoleFeature key={index}>{feature}</RoleFeature>
              ))}
            </RoleFeatures>
          </RoleCard>
        ))}
      </RoleSelectionGrid>
    </LandingContainer>
  );
};

// Demo Actions Component
const DemoActions = () => {
  const { studentData } = useGamification();
  const {
    onLessonComplete,
    onQuizComplete,
    onCodeComplete,
    onEthicsComplete,
    onCustomXP,
    onCustomBadge
  } = useQuickActions();

  const [actionCooldown, setActionCooldown] = useState({});

  const executeAction = (actionKey, actionFn, cooldownTime = 2000) => {
    if (actionCooldown[actionKey]) return;
    
    actionFn();
    
    setActionCooldown(prev => ({ ...prev, [actionKey]: true }));
    setTimeout(() => {
      setActionCooldown(prev => ({ ...prev, [actionKey]: false }));
    }, cooldownTime);
  };

  return (
    <QuickActionsPanel>
      <QuickActionsTitle>
        <Target size={20} />
        Quick Demo Actions
      </QuickActionsTitle>
      <QuickActionsGrid>
        <QuickActionButton
          onClick={() => executeAction('lesson', () => onLessonComplete({
            title: 'Python Basics',
            difficulty: 'beginner'
          }))}
          disabled={actionCooldown.lesson}
        >
          <BookOpen size={16} />
          Complete Lesson (+50 XP)
        </QuickActionButton>

        <QuickActionButton
          onClick={() => executeAction('quiz', () => onQuizComplete(5, 5))}
          disabled={actionCooldown.quiz}
          style={{ background: 'linear-gradient(135deg, #FF9800, #F57C00)' }}
        >
          <Trophy size={16} />
          Perfect Quiz (+75 XP)
        </QuickActionButton>

        <QuickActionButton
          onClick={() => executeAction('code', () => onCodeComplete({
            name: 'Hello World',
            difficulty: 'beginner',
            isFirstCode: studentData.lessonsCompleted === 0
          }))}
          disabled={actionCooldown.code}
          style={{ background: 'linear-gradient(135deg, #2196F3, #1976D2)' }}
        >
          <Play size={16} />
          Code Challenge (+75 XP)
        </QuickActionButton>

        <QuickActionButton
          onClick={() => executeAction('ethics', () => onEthicsComplete({
            name: 'AI Fairness'
          }))}
          disabled={actionCooldown.ethics}
          style={{ background: 'linear-gradient(135deg, #9C27B0, #7B1FA2)' }}
        >
          <Medal size={16} />
          Ethics Scenario (+40 XP)
        </QuickActionButton>

        <QuickActionButton
          onClick={() => executeAction('xp', () => onCustomXP(100, 'demo bonus'))}
          disabled={actionCooldown.xp}
          style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
        >
          <Flame size={16} />
          Bonus XP (+100)
        </QuickActionButton>

        <QuickActionButton
          onClick={() => executeAction('badge', () => onCustomBadge('quick-learner'))}
          disabled={actionCooldown.badge}
          style={{ background: 'linear-gradient(135deg, #E91E63, #C2185B)' }}
        >
          <Crown size={16} />
          Award Badge
        </QuickActionButton>
      </QuickActionsGrid>
    </QuickActionsPanel>
  );
};

// Analytics-enabled inner component
const IntegratedDemoInner = ({ onReturnHome }) => {
  const { trackPageView, trackButtonClick, initUser } = useAnalytics();
  const trackButton = useButtonTracking();
  const { confirmNavigation } = useUnsavedWork();
  const [currentTab, setCurrentTab] = useState(() => {
    // Persist current tab selection across browser refreshes
    return localStorage.getItem('trainarama_current_tab') || 'dashboard';
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [userRole, setUserRole] = useState(() => {
    // Start with no role selected - user must choose from landing page
    return localStorage.getItem('trainarama_user_role') || null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes
  const [studentData] = useState({
    id: 'demo-student',
    name: 'Alex Rivera',
    level: 3,
    currentXP: 750,
    totalXP: 750,
    currentStreak: 5,
    longestStreak: 8,
    lessonsCompleted: 12,
    badgesEarned: ['first-lesson', 'hello-world', 'streak-3'],
    weeklyGoal: 5,
    thisWeekDays: 3
  });

  // Initialize analytics user when role changes
  useEffect(() => {
    if (userRole) {
      const ageGroup = studentData.level <= 2 ? '8-9' : studentData.level <= 5 ? '10-11' : '12-14';
      initUser({
        hashedUserId: `user_${studentData.id}`,
        role: userRole,
        ageGroup: ageGroup,
        franchiseId: 'demo-franchise'
      });
    }
  }, [userRole, initUser, studentData]);

  // Sync userRole changes to localStorage
  useEffect(() => {
    if (userRole) {
      localStorage.setItem('trainarama_user_role', userRole);
    } else {
      localStorage.removeItem('trainarama_user_role');
    }
  }, [userRole]);

  // Track page views when tab changes
  useEffect(() => {
    trackPageView(currentTab, { userRole, ageGroup: studentData.level <= 2 ? '8-9' : studentData.level <= 5 ? '10-11' : '12-14' });
  }, [currentTab, userRole, trackPageView, studentData.level]);

  const getTabsForRole = (role) => {
    if (role === 'student') {
      return [
        { id: 'dashboard', label: 'Home', icon: Home },
        { id: 'course-library', label: 'Courses', icon: BookOpen },
        { id: 'prompting', label: 'AI Training', icon: Brain },
        { id: 'ai-chat', label: 'AI Assistant', icon: MessageCircle },
        { id: 'progress', label: 'My Progress', icon: Target },
        { id: 'badges', label: 'Achievements', icon: Medal }
      ];
    }

    if (role === 'teacher') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'course-library', label: 'My Courses', icon: BookOpen },
        { id: 'course-builder', label: 'Course Builder', icon: Edit3 },
        { id: 'teacher', label: 'Students', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
      ];
    }

    if (role === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'analytics', label: 'System Analytics', icon: BarChart3 },
        { id: 'brand-manager', label: 'Brand Settings', icon: Palette },
        { id: 'safety', label: 'Safety & Moderation', icon: Shield },
        { id: 'course-library', label: 'All Courses', icon: BookOpen },
        { id: 'teacher', label: 'User Management', icon: Users }
      ];
    }

    if (role === 'parent') {
      return [
        { id: 'parent-dashboard', label: 'My Child', icon: Heart },
        { id: 'progress', label: 'Progress', icon: Target },
        { id: 'achievements', label: 'Achievements', icon: Medal }
      ];
    }

    return [];
  };

  const tabs = getTabsForRole(userRole);
  
  // Debug: Log current role and tabs
  console.log('Current user role:', userRole);
  console.log('Available tabs:', tabs.map(t => t.label));

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentTab('lessons');
  };

  const handleTemplateImport = (template) => {
    console.log('Importing template:', template.title);
    // In a real app, this would import the template and start a lesson
    setSelectedTemplate(template);
    setCurrentTab('lessons');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <StudentDashboard studentData={studentData} />;
      
      case 'lessons':
        return selectedTemplate ? (
          <LessonBuilder 
            initialTemplate={selectedTemplate}
            onSave={(lesson) => {
              console.log('Lesson saved:', lesson);
              // Here you would typically save to backend
              alert('Lesson saved successfully! 🎉');
            }}
            onPreview={(lesson) => {
              console.log('Previewing lesson:', lesson);
              // Here you would show lesson preview
              alert('Lesson preview coming soon! 👀');
            }}
            onClose={() => {
              setSelectedTemplate(null);
            }}
          />
        ) : (
          <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
            <BookOpen size={64} style={{ marginBottom: '20px', opacity: 0.5 }} />
            <h2>Select a template to start a lesson</h2>
            <p>Go to Templates to choose a lesson template</p>
          </div>
        );
      
      case 'prompting':
        return (
          <PromptingLessons 
            studentAge={studentData.level <= 2 ? '8-9' : studentData.level <= 5 ? '10-11' : '12-14'}
            onLearningProgress={(data) => {
              console.log('Prompting progress:', data);
              // Here you could trigger gamification rewards for prompt engineering skills
            }}
          />
        );
      
      case 'templates':
        return (
          <TemplateGallery 
            onTemplateSelect={handleTemplateSelect}
            onImportTemplate={handleTemplateImport}
          />
        );
      
      case 'ai-chat':
        return (
          <AIChatDemo 
            studentAge={studentData.level <= 2 ? '8-9' : studentData.level <= 5 ? '10-11' : '12-14'}
            onEngagementUpdate={(data) => {
              console.log('Chat engagement:', data);
              // Here you could trigger gamification rewards for chat interactions
            }}
          />
        );
      
      case 'ai-compare':
        return (
          <AIGeneratorComparison 
            studentAge={studentData.level <= 2 ? '8-9' : studentData.level <= 5 ? '10-11' : '12-14'}
            onLearningProgress={(data) => {
              console.log('AI comparison learning:', data);
              // Here you could trigger gamification rewards for comparison activities
            }}
          />
        );
      
      case 'ai-tools':
        return (
          <AIToolsHub 
            studentAge={studentData.level <= 2 ? '8-9' : studentData.level <= 5 ? '10-11' : '12-14'}
            onToolLaunch={(data) => {
              console.log('AI tool launched:', data);
              // Here you could trigger gamification rewards for tool usage
            }}
            onLearningProgress={(data) => {
              console.log('AI tools learning:', data);
              // Track learning progress and engagement
            }}
          />
        );
      
      case 'safety':
        return (
          <SafetyManager 
            studentAge={studentData.level <= 2 ? '8-9' : studentData.level <= 5 ? '10-11' : '12-14'}
            onConfigChange={(config) => {
              console.log('Safety config updated:', config);
              // Here you could save safety configuration
            }}
            onModerationAction={(action) => {
              console.log('Moderation action:', action);
              // Here you could log moderation actions
            }}
          />
        );
      
      case 'teacher':
        return selectedStudent ? (
          <StudentMonitor 
            studentId={selectedStudent.id || 'demo-student'}
            onBack={() => setSelectedStudent(null)}
            onAlert={(alert) => {
              console.log('Teacher alert:', alert);
              // Here you could trigger safety alerts or interventions
            }}
            onIntervention={(action) => {
              console.log('Teacher intervention:', action);
              // Here you could log teacher interventions
            }}
          />
        ) : (
          <TeacherDashboard 
            classId="demo-class-2024"
            onStudentSelect={(student) => {
              console.log('Selected student:', student);
              setSelectedStudent(student);
            }}
            onAlertAction={(action) => {
              console.log('Alert action:', action);
              // Here you could handle alert dismissals or actions
            }}
            onExportData={() => {
              console.log('Exporting teacher dashboard data');
              // Here you could export analytics and reports
            }}
          />
        );
      
      case 'course-library':
        return (
          <CourseLibrary 
            userRole={userRole}
            studentData={studentData}
            onCreateCourse={() => {
              setCurrentTab('course-builder');
              localStorage.setItem('trainarama_current_tab', 'course-builder');
            }}
          />
        );
      
      case 'course-builder':
        return <CourseBuilder />;
      
      case 'brand-manager':
        return <BrandManager />;
      
      case 'azure-brand-manager':
        return <AzureBrandManager />;
      
      case 'analytics':
        return <AnalyticsDashboard userRole={userRole} franchiseId="demo-franchise" />;
      
      case 'parent-dashboard':
        return selectedProject ? (
          <ProjectViewer 
            projectId={selectedProject.id || 1}
            onBack={() => setSelectedProject(null)}
            onLove={(data) => {
              console.log('Parent loved project:', data);
            }}
            onShare={(project) => {
              console.log('Parent shared project:', project);
            }}
          />
        ) : (
          <ParentPortal 
            childId="alex-rivera"
            onProjectView={(project) => {
              console.log('Parent viewing project:', project);
              setSelectedProject(project);
            }}
            onSettingsUpdate={(settings) => {
              console.log('Parent updated settings:', settings);
            }}
          />
        );
      
      case 'achievements':
        return <GamificationDashboard showComponent="badges" studentId={studentData.id} />;
      
      case 'progress':
        return <GamificationDashboard showComponent="level" studentId={studentData.id} />;
      
      case 'badges':
        return <GamificationDashboard showComponent="badges" studentId={studentData.id} />;
      
      case 'streak':
        return <GamificationDashboard showComponent="streak" studentId={studentData.id} />;
      
      case 'leaderboard':
        return <GamificationDashboard showComponent="leaderboard" studentId={studentData.id} />;
      
      default:
        return <StudentDashboard studentData={studentData} />;
    }
  };

  const getNavSections = (role) => {
    if (role === 'student') {
      return [
        {
          title: 'Learning',
          items: [
            { id: 'dashboard', label: 'Home', icon: Home },
            { id: 'course-library', label: 'Courses', icon: BookOpen },
            { id: 'prompting', label: 'AI Training', icon: Brain },
            { id: 'ai-chat', label: 'AI Assistant', icon: MessageCircle }
          ]
        },
        {
          title: 'Progress',
          items: [
            { id: 'progress', label: 'My Progress', icon: Target },
            { id: 'badges', label: 'Achievements', icon: Medal }
          ]
        }
      ];
    }

    if (role === 'teacher') {
      return [
        {
          title: 'Teaching',
          items: [
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'course-library', label: 'My Courses', icon: BookOpen },
            { id: 'course-builder', label: 'Course Builder', icon: Edit3 }
          ]
        },
        {
          title: 'Management',
          items: [
            { id: 'teacher', label: 'Students', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ]
        }
      ];
    }

    if (role === 'admin') {
      return [
        {
          title: 'System',
          items: [
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'analytics', label: 'System Analytics', icon: BarChart3 }
          ]
        },
        {
          title: 'Settings',
          items: [
            { id: 'brand-manager', label: 'Brand Settings', icon: Palette },
            { id: 'azure-brand-manager', label: 'Azure Storage', icon: Upload },
            { id: 'safety', label: 'Safety & Moderation', icon: Shield }
          ]
        },
        {
          title: 'Content',
          items: [
            { id: 'course-library', label: 'All Courses', icon: BookOpen },
            { id: 'teacher', label: 'User Management', icon: Users }
          ]
        }
      ];
    }

    if (role === 'parent') {
      return [
        {
          title: 'My Child',
          items: [
            { id: 'parent-dashboard', label: 'Overview', icon: Heart },
            { id: 'progress', label: 'Progress', icon: Target },
            { id: 'achievements', label: 'Achievements', icon: Medal }
          ]
        }
      ];
    }

    return [];
  };

  const navSections = getNavSections(userRole);

  // Show landing page if no role is selected
  if (!userRole) {
    return (
      <SafetyProvider 
        studentAge="general"
        config={{ strictMode: true, educationalBoost: true }}
      >
        <GamificationProvider studentId={studentData.id} initialData={studentData}>
          <SafetyAlerts />
          <LandingPage onRoleSelect={setUserRole} />
        </GamificationProvider>
      </SafetyProvider>
    );
  }

  return (
    <SafetyProvider 
      studentAge={studentData.level <= 2 ? '8-9' : studentData.level <= 5 ? '10-11' : '12-14'}
      config={{ strictMode: true, educationalBoost: true }}
    >
      <GamificationProvider studentId={studentData.id} initialData={studentData}>
        <SafetyAlerts />
        <AppContainer>
          {/* Sidebar Navigation */}
          <Sidebar>
            {/* Navigation Sections */}
            <SidebarNav>
              {navSections.map((section, sectionIndex) => (
                <NavSection key={sectionIndex}>
                  <NavSectionTitle>{section.title}</NavSectionTitle>
                  {section.items.map(item => {
                    const IconComponent = item.icon;
                    return (
                      <NavItem
                        key={item.id}
                        active={currentTab === item.id}
                        {...trackButton(`nav_item_${item.id}`, {
                          originalOnClick: () => {
                            setCurrentTab(item.id);
                            localStorage.setItem('trainarama_current_tab', item.id);
                            trackButtonClick('navigation_item', { 
                              itemId: item.id, 
                              itemLabel: item.label, 
                              previousTab: currentTab,
                              userRole 
                            });
                          }
                        })}
                      >
                        <IconComponent size={18} />
                        {item.label}
                      </NavItem>
                    );
                  })}
                </NavSection>
              ))}
            </SidebarNav>

            {/* Home Button */}
            <SidebarFooter>
              <RoleSwitcherTitle>Navigation</RoleSwitcherTitle>
              <RoleSwitch>
                <RoleButton 
                  {...trackButton('home_button', {
                    originalOnClick: () => {
                      confirmNavigation(() => {
                        localStorage.removeItem('trainarama_user_role');
                        localStorage.removeItem('trainarama_current_tab');
                        trackButtonClick('return_home', { previousRole: userRole });
                        if (onReturnHome) {
                          onReturnHome();
                        } else {
                          setUserRole(null);
                          setCurrentTab('dashboard');
                        }
                      }, 'your current session');
                    }
                  })}
                >
                  <span>🏠</span>
                  Return to Home
                </RoleButton>
              </RoleSwitch>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content Area */}
          <MainContentArea>
            {/* Top Header - Logo and User Info */}
            <TopHeader>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                paddingLeft: '20px'
              }}>
                <ThemeAwareLogo size={28} showText={true} />
                <span style={{ fontSize: '16px', fontWeight: '600', opacity: 0.9 }}>
                  AI Education Platform
                </span>
              </div>
              
              <UserInfo>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{studentData.name}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>Level {studentData.level}</div>
                </div>
                <UserAvatar>🧑‍🎓</UserAvatar>
              </UserInfo>
            </TopHeader>

            {/* Main Content */}
            <MainContent>
              {/* Demo Actions (only show on dashboard) */}
              {currentTab === 'dashboard' && userRole === 'student' && <DemoActions />}
              
              {/* Current Tab Content */}
              {renderContent()}
            </MainContent>
          </MainContentArea>
        </AppContainer>
      </GamificationProvider>
    </SafetyProvider>
  );
};

// Main component with Analytics Provider
const IntegratedDemo = ({ onReturnHome }) => {
  return (
    <CustomThemeProvider>
      <UnsavedWorkProvider>
        <AnalyticsProvider>
          <IntegratedDemoInner onReturnHome={onReturnHome} />
        </AnalyticsProvider>
      </UnsavedWorkProvider>
    </CustomThemeProvider>
  );
};

export default IntegratedDemo;