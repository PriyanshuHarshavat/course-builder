import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BookOpen, Users, Play, Trophy, GraduationCap, UserCheck, Shield, Heart } from 'lucide-react';
import IntegratedDemo from './IntegratedDemo';

// TrainArama Theme
const TrainAramaTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#F5F7FA',
    text: '#2D3436',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    white: '#FFFFFF'
  },
  fonts: {
    primary: '"Comic Sans MS", cursive, sans-serif',
    heading: 'bold, clean sans-serif',
    body: 'regular sans-serif'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '20px',
    round: '50%'
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.1)',
    md: '0 4px 15px rgba(0,0,0,0.1)',
    lg: '0 8px 30px rgba(0,0,0,0.15)'
  }
};

// App Container
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: ${props => props.theme.fonts.primary};
`;

// Welcome Screen
const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  color: white;
`;

const WelcomeTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  gap: 20px;
`;

const WelcomeSubtitle = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  line-height: 1.4;
`;

const LoginCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  max-width: 800px;
  width: 100%;
  margin-bottom: 40px;
`;

const LoginCard = styled.div`
  background: ${props => {
    const gradients = {
      0: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      1: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)', 
      2: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
      3: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'
    };
    return gradients[props.index] || gradients[0];
  }};
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: white;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-bottom: 20px;
`;

const CardFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const CardFeature = styled.li`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '✨';
    font-size: 12px;
  }
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  color: white;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    background: linear-gradient(135deg, #45a049, #4CAF50);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
`;

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('login');

  const loginOptions = [
    {
      icon: <GraduationCap size={48} />,
      title: 'Student',
      role: 'student',
      description: 'Access lessons, quizzes, and track your progress'
    },
    {
      icon: <UserCheck size={48} />,
      title: 'Teacher',
      role: 'teacher',
      description: 'Create courses, manage students, and track performance'
    },
    {
      icon: <Shield size={48} />,
      title: 'Admin',
      role: 'admin',
      description: 'Platform management and system configuration'
    },
    {
      icon: <Heart size={48} />,
      title: 'Parent',
      role: 'parent',
      description: 'Monitor child progress and access reports'
    }
  ];

  const handleRoleSelection = (role) => {
    localStorage.setItem('trainarama_user_role', role);
    setCurrentView('demo');
  };

  if (currentView === 'demo') {
    return (
      <ThemeProvider theme={TrainAramaTheme}>
        <IntegratedDemo onReturnHome={() => setCurrentView('login')} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={TrainAramaTheme}>
      <AppContainer>
        <WelcomeScreen>
          <WelcomeTitle>
            <BookOpen size={64} />
            TrainArama AI Education
            <Trophy size={64} />
          </WelcomeTitle>
          
          <WelcomeSubtitle>
            Welcome! Please select your role to access the platform
          </WelcomeSubtitle>

          <LoginCards>
            {loginOptions.map((option, index) => (
              <LoginCard 
                key={index}
                index={index}
                onClick={() => handleRoleSelection(option.role)}
              >
                <CardIcon>{option.icon}</CardIcon>
                <CardTitle>{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </LoginCard>
            ))}
          </LoginCards>

          <div style={{ 
            marginTop: '20px', 
            fontSize: '14px', 
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            Choose your role to access the appropriate tools and features for the TrainArama AI Education Platform
          </div>
        </WelcomeScreen>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;