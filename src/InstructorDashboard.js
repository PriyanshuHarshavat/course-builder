import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Play, 
  Pause, 
  RotateCcw,
  Eye,
  MessageCircle,
  TrendingUp,
  Award,
  FileText
} from 'lucide-react';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f7fa;
  font-family: ${props => props.theme.fonts.primary};
`;

const MainPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

const SessionTimer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.1);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
`;

const TimerDisplay = styled.div`
  font-size: 18px;
  color: ${props => props.timeRemaining < 300 ? '#ff6b6b' : 'white'};
`;

const SessionControls = styled.div`
  display: flex;
  gap: 8px;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: ${props => props.variant === 'primary' ? '#4CAF50' : 'rgba(255,255,255,0.1)'};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#45a049' : 'rgba(255,255,255,0.2)'};
  }
`;

const StatsBar = styled.div`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  gap: 32px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color || '#4CAF50'};
  color: white;
`;

const StatContent = styled.div``;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #2D3436;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #636E72;
`;

const StudentsGrid = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  align-content: start;
`;

const StudentCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid ${props => {
    switch(props.status) {
      case 'help': return '#ff6b6b';
      case 'active': return '#4CAF50';
      case 'completed': return '#2196F3';
      case 'stuck': return '#ff9800';
      default: return '#e1e5e9';
    }
  }};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
`;

const StudentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const StudentName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #2D3436;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'help': return '#ffe6e6';
      case 'active': return '#e8f5e8';
      case 'completed': return '#e3f2fd';
      case 'stuck': return '#fff3e0';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'help': return '#d32f2f';
      case 'active': return '#2e7d2e';
      case 'completed': return '#1976d2';
      case 'stuck': return '#f57c00';
      default: return '#666';
    }
  }};
`;

const ProgressSection = styled.div`
  margin-bottom: 12px;
`;

const ProgressLabel = styled.div`
  font-size: 12px;
  color: #636E72;
  margin-bottom: 4px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e1e5e9;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  transition: width 0.3s;
`;

const ActivitySection = styled.div`
  margin-bottom: 12px;
`;

const CurrentActivity = styled.div`
  font-size: 13px;
  color: #2D3436;
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: 11px;
  color: #636E72;
`;

const ActionsSection = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 8px;
  background: ${props => props.variant === 'primary' ? '#667eea' : '#f8f9fa'};
  color: ${props => props.variant === 'primary' ? 'white' : '#636E72'};
  border: 1px solid ${props => props.variant === 'primary' ? '#667eea' : '#e1e5e9'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#5a67d8' : '#e9ecef'};
  }
`;

const SidePanel = styled.div`
  width: 350px;
  background: white;
  border-left: 1px solid #e1e5e9;
  display: flex;
  flex-direction: column;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s;
`;

const SidePanelHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
  background: #f8f9fa;
`;

const SidePanelTitle = styled.h3`
  margin: 0;
  color: #2D3436;
  font-size: 16px;
`;

const SidePanelContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const NotesSection = styled.div`
  margin-bottom: 24px;
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  font-size: 13px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const DetailSection = styled.div`
  margin-bottom: 16px;
`;

const DetailLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #636E72;
  margin-bottom: 6px;
`;

const DetailValue = styled.div`
  font-size: 14px;
  color: #2D3436;
`;

// Mock student data for demonstration
const mockStudents = [
  {
    id: 1,
    name: "Emma Wilson",
    age: 9,
    status: "active",
    progress: 65,
    currentActivity: "Python Basics - Hello AI World",
    timeOnActivity: "8 minutes",
    completedActivities: 3,
    totalActivities: 5,
    lastAction: "Running code",
    notes: "Great with basic concepts, needs help with indentation",
    helpRequested: false,
    timeInSession: 25
  },
  {
    id: 2,
    name: "Marcus Chen",
    age: 12,
    status: "help",
    progress: 45,
    currentActivity: "Ethics Scenario - AI Fairness",
    timeOnActivity: "15 minutes",
    completedActivities: 2,
    totalActivities: 5,
    lastAction: "Requested help",
    notes: "Advanced logical thinking, ask challenging questions",
    helpRequested: true,
    timeInSession: 18
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    age: 8,
    status: "completed",
    progress: 100,
    currentActivity: "Session Complete",
    timeOnActivity: "finished",
    completedActivities: 5,
    totalActivities: 5,
    lastAction: "Completed lesson",
    notes: "Quick learner, ready for advanced content",
    helpRequested: false,
    timeInSession: 45
  },
  {
    id: 4,
    name: "Jake Thompson",
    age: 11,
    status: "stuck",
    progress: 30,
    currentActivity: "Python Loops - Count to 10",
    timeOnActivity: "22 minutes",
    completedActivities: 1,
    totalActivities: 5,
    lastAction: "Multiple errors",
    notes: "Struggles with syntax, encourage experimentation",
    helpRequested: false,
    timeInSession: 35
  },
  {
    id: 5,
    name: "Aisha Patel",
    age: 10,
    status: "active",
    progress: 80,
    currentActivity: "AI Chat Demo - Math Buddy",
    timeOnActivity: "5 minutes",
    completedActivities: 4,
    totalActivities: 5,
    lastAction: "Testing AI responses",
    notes: "Creative problem solver, loves interactive elements",
    helpRequested: false,
    timeInSession: 40
  },
  {
    id: 6,
    name: "David Kim",
    age: 13,
    status: "active",
    progress: 55,
    currentActivity: "Python Variables - AI Names",
    timeOnActivity: "12 minutes",
    completedActivities: 2,
    totalActivities: 4,
    lastAction: "Editing code",
    notes: "Methodical learner, good debugging skills",
    helpRequested: false,
    timeInSession: 30
  }
];

const InstructorDashboard = () => {
  const [students, setStudents] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sessionTime, setSessionTime] = useState(3600); // 60 minutes in seconds
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  // Session timer
  useEffect(() => {
    let interval;
    if (isSessionActive && sessionTime > 0) {
      interval = setInterval(() => {
        setSessionTime(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, sessionTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'help': return <HelpCircle size={16} />;
      case 'active': return <Play size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'stuck': return <AlertCircle size={16} />;
      default: return <Users size={16} />;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'help': return 'Needs Help';
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'stuck': return 'Stuck';
      default: return 'Idle';
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setSidePanelOpen(true);
  };

  const updateStudentNotes = (studentId, notes) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, notes } : student
    ));
  };

  // Calculate stats
  const activeStudents = students.filter(s => s.status === 'active').length;
  const helpRequests = students.filter(s => s.status === 'help').length;
  const completedStudents = students.filter(s => s.status === 'completed').length;
  const averageProgress = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length);

  return (
    <DashboardContainer>
      <MainPanel>
        {/* Header */}
        <Header>
          <HeaderLeft>
            <Users size={24} />
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Instructor Dashboard</h2>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                TrainArama AI Learning Session
              </div>
            </div>
          </HeaderLeft>
          
          <HeaderRight>
            <SessionTimer>
              <Clock size={18} />
              <TimerDisplay timeRemaining={sessionTime}>
                {formatTime(sessionTime)}
              </TimerDisplay>
            </SessionTimer>
            
            <SessionControls>
              <ControlButton
                variant="primary"
                onClick={() => setIsSessionActive(!isSessionActive)}
              >
                {isSessionActive ? <Pause size={14} /> : <Play size={14} />}
                {isSessionActive ? 'Pause' : 'Resume'}
              </ControlButton>
              
              <ControlButton onClick={() => setSessionTime(3600)}>
                <RotateCcw size={14} />
                Reset
              </ControlButton>
            </SessionControls>
          </HeaderRight>
        </Header>

        {/* Stats Bar */}
        <StatsBar>
          <StatItem>
            <StatIcon color="#4CAF50">
              <Users size={16} />
            </StatIcon>
            <StatContent>
              <StatValue>{activeStudents}</StatValue>
              <StatLabel>Active Students</StatLabel>
            </StatContent>
          </StatItem>

          <StatItem>
            <StatIcon color="#ff6b6b">
              <HelpCircle size={16} />
            </StatIcon>
            <StatContent>
              <StatValue>{helpRequests}</StatValue>
              <StatLabel>Help Requests</StatLabel>
            </StatContent>
          </StatItem>

          <StatItem>
            <StatIcon color="#2196F3">
              <CheckCircle size={16} />
            </StatIcon>
            <StatContent>
              <StatValue>{completedStudents}</StatValue>
              <StatLabel>Completed</StatLabel>
            </StatContent>
          </StatItem>

          <StatItem>
            <StatIcon color="#667eea">
              <TrendingUp size={16} />
            </StatIcon>
            <StatContent>
              <StatValue>{averageProgress}%</StatValue>
              <StatLabel>Avg Progress</StatLabel>
            </StatContent>
          </StatItem>
        </StatsBar>

        {/* Students Grid */}
        <StudentsGrid>
          {students.map(student => (
            <StudentCard
              key={student.id}
              status={student.status}
              onClick={() => handleStudentClick(student)}
            >
              <StudentHeader>
                <StudentName>{student.name}</StudentName>
                <StatusIndicator status={student.status}>
                  {getStatusIcon(student.status)}
                  {getStatusLabel(student.status)}
                </StatusIndicator>
              </StudentHeader>

              <ProgressSection>
                <ProgressLabel>
                  Progress: {student.completedActivities}/{student.totalActivities} activities
                </ProgressLabel>
                <ProgressBar>
                  <ProgressFill percentage={student.progress} />
                </ProgressBar>
              </ProgressSection>

              <ActivitySection>
                <CurrentActivity>{student.currentActivity}</CurrentActivity>
                <ActivityTime>
                  {student.timeOnActivity} • Session: {student.timeInSession}min
                </ActivityTime>
              </ActivitySection>

              <ActionsSection>
                <ActionButton variant="primary">
                  <Eye size={12} />
                  View Screen
                </ActionButton>
                <ActionButton>
                  <MessageCircle size={12} />
                  Message
                </ActionButton>
                <ActionButton>
                  <Award size={12} />
                  Badge
                </ActionButton>
              </ActionsSection>
            </StudentCard>
          ))}
        </StudentsGrid>
      </MainPanel>

      {/* Side Panel for Student Details */}
      <SidePanel isOpen={sidePanelOpen}>
        {selectedStudent && (
          <>
            <SidePanelHeader>
              <SidePanelTitle>{selectedStudent.name} Details</SidePanelTitle>
              <button
                onClick={() => setSidePanelOpen(false)}
                style={{
                  float: 'right',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </SidePanelHeader>

            <SidePanelContent>
              <DetailSection>
                <DetailLabel>Current Status</DetailLabel>
                <DetailValue>
                  <StatusIndicator status={selectedStudent.status}>
                    {getStatusIcon(selectedStudent.status)}
                    {getStatusLabel(selectedStudent.status)}
                  </StatusIndicator>
                </DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Age Group</DetailLabel>
                <DetailValue>{selectedStudent.age} years old</DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Session Progress</DetailLabel>
                <DetailValue>
                  {selectedStudent.completedActivities}/{selectedStudent.totalActivities} activities ({selectedStudent.progress}%)
                </DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Current Activity</DetailLabel>
                <DetailValue>{selectedStudent.currentActivity}</DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Time on Current Activity</DetailLabel>
                <DetailValue>{selectedStudent.timeOnActivity}</DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Last Action</DetailLabel>
                <DetailValue>{selectedStudent.lastAction}</DetailValue>
              </DetailSection>

              <NotesSection>
                <DetailLabel>Instructor Notes</DetailLabel>
                <NotesTextarea
                  value={selectedStudent.notes}
                  onChange={(e) => updateStudentNotes(selectedStudent.id, e.target.value)}
                  placeholder="Add notes about this student's progress, behavior, or areas needing attention..."
                />
              </NotesSection>

              <ActionsSection>
                <ActionButton variant="primary" style={{ width: '100%', marginBottom: '8px' }}>
                  <Eye size={14} />
                  View Student Screen
                </ActionButton>
                <ActionButton style={{ width: '100%', marginBottom: '8px' }}>
                  <MessageCircle size={14} />
                  Send Message
                </ActionButton>
                <ActionButton style={{ width: '100%' }}>
                  <FileText size={14} />
                  Generate Report
                </ActionButton>
              </ActionsSection>
            </SidePanelContent>
          </>
        )}
      </SidePanel>
    </DashboardContainer>
  );
};

export default InstructorDashboard;