import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Route, 
  ChevronRight, 
  Lock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  BookOpen,
  Trophy,
  Target,
  Clock,
  Zap,
  Brain,
  Star
} from 'lucide-react';

const SequencerContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  margin: 16px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
`;

const SequencerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(255,255,255,0.2);
`;

const SequencerTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.1);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
`;

const PathwayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const PathwayCard = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid ${props => props.isActive ? '#4CAF50' : 'rgba(255,255,255,0.2)'};
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  cursor: ${props => props.isLocked ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.isLocked ? 0.6 : 1};
  
  &:hover {
    transform: ${props => props.isLocked ? 'none' : 'translateY(-2px)'};
    border-color: ${props => props.isLocked ? 'rgba(255,255,255,0.2)' : '#4CAF50'};
  }
`;

const PathwayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const PathwayTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PathwayStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  background: ${props => {
    switch(props.status) {
      case 'completed': return '#4CAF50';
      case 'current': return '#FF9800';
      case 'locked': return '#666';
      case 'available': return 'rgba(255,255,255,0.2)';
      default: return 'rgba(255,255,255,0.2)';
    }
  }};
`;

const PathwayMeta = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 12px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
`;

const ProgressFill = styled.div`
  width: ${props => props.percentage || 0}%;
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 4px;
  transition: width 0.6s ease;
`;

const NextStepsSection = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const NextStepsTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const StepIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.color || '#4CAF50'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const StepMeta = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const AdaptiveInsights = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 20px;
`;

const InsightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: 14px;
`;

// Content Sequencing Engine - Core Component
const ContentSequencer = ({ 
  studentId = 'demo-student',
  ageGroup = '10-11',
  yearLevel = 1,
  currentProgress = {},
  onPathwaySelect,
  mode = 'student' // 'student' | 'instructor' | 'franchise'
}) => {
  const [studentProfile, setStudentProfile] = useState({
    id: studentId,
    name: 'Alex Johnson',
    ageGroup,
    yearLevel,
    overallProgress: 35,
    currentPath: 'ai-basics',
    completedActivities: ['welcome', 'ai-basics-quiz', 'python-hello'],
    strugglingAreas: ['loops', 'functions'],
    excellingAreas: ['variables', 'print-statements', 'basic-concepts'],
    preferredLearningStyle: 'visual', // 'visual', 'hands-on', 'analytical'
    engagementLevel: 85,
    attentionSpan: 'high', // 'low', 'medium', 'high'
    helpFrequency: 'moderate' // 'low', 'moderate', 'high'
  });

  const [curriculumPaths, setCurriculumPaths] = useState([
    {
      id: 'ai-basics',
      title: 'AI Fundamentals',
      description: 'Understanding what AI is and how it works',
      yearLevel: 1,
      ageGroups: ['8-9', '10-11'],
      prerequisites: [],
      totalActivities: 6,
      completedActivities: 3,
      estimatedTime: 45, // minutes
      difficulty: 'beginner',
      status: 'current',
      icon: '🧠',
      color: '#4CAF50',
      nextActivity: 'ethics-scenario-basic',
      learningObjectives: [
        'Understand what AI means',
        'Recognize AI in daily life',
        'Learn basic AI terminology',
        'Explore AI safety concepts'
      ]
    },
    {
      id: 'python-foundations',
      title: 'Python Programming Basics',
      description: 'Learn to code with Python for AI',
      yearLevel: 1,
      ageGroups: ['10-11', '12-14'],
      prerequisites: ['ai-basics'],
      totalActivities: 8,
      completedActivities: 2,
      estimatedTime: 60,
      difficulty: 'beginner',
      status: 'available',
      icon: '🐍',
      color: '#3776ab',
      nextActivity: 'python-variables',
      learningObjectives: [
        'Write basic Python commands',
        'Use variables and data types',
        'Create simple programs',
        'Debug common errors'
      ]
    },
    {
      id: 'ai-ethics-intermediate',
      title: 'AI Ethics & Responsibility',
      description: 'Making fair and responsible AI decisions',
      yearLevel: 2,
      ageGroups: ['10-11', '12-14'],
      prerequisites: ['ai-basics', 'python-foundations'],
      totalActivities: 5,
      completedActivities: 0,
      estimatedTime: 40,
      difficulty: 'intermediate',
      status: 'locked',
      icon: '⚖️',
      color: '#FF9800',
      nextActivity: 'bias-detection-game',
      learningObjectives: [
        'Identify bias in AI systems',
        'Design fair AI solutions',
        'Understand AI impact on society',
        'Practice ethical decision-making'
      ]
    },
    {
      id: 'ai-creation-advanced',
      title: 'Building AI Solutions',
      description: 'Create your own AI projects',
      yearLevel: 3,
      ageGroups: ['12-14'],
      prerequisites: ['python-foundations', 'ai-ethics-intermediate'],
      totalActivities: 10,
      completedActivities: 0,
      estimatedTime: 90,
      difficulty: 'advanced',
      status: 'locked',
      icon: '🚀',
      color: '#9C27B0',
      nextActivity: 'ai-project-planning',
      learningObjectives: [
        'Plan AI projects',
        'Build machine learning models',
        'Test and evaluate AI systems',
        'Present AI solutions'
      ]
    }
  ]);

  const [nextSteps, setNextSteps] = useState([]);
  const [adaptiveRecommendations, setAdaptiveRecommendations] = useState([]);

  // Calculate next steps based on student progress
  useEffect(() => {
    const calculateNextSteps = () => {
      const currentPath = curriculumPaths.find(p => p.status === 'current');
      const availablePaths = curriculumPaths.filter(p => p.status === 'available');
      
      const steps = [];
      
      if (currentPath) {
        steps.push({
          id: 'continue-current',
          title: `Continue ${currentPath.title}`,
          description: `Resume "${currentPath.nextActivity}"`,
          type: 'continue',
          priority: 'high',
          estimatedTime: 15,
          color: '#4CAF50',
          icon: <ChevronRight size={16} />
        });
      }
      
      availablePaths.slice(0, 2).forEach(path => {
        steps.push({
          id: `start-${path.id}`,
          title: `Start ${path.title}`,
          description: `Begin with "${path.nextActivity}"`,
          type: 'new',
          priority: 'medium',
          estimatedTime: path.estimatedTime,
          color: path.color,
          icon: <BookOpen size={16} />
        });
      });
      
      // Add review step if struggling areas exist
      if (studentProfile.strugglingAreas.length > 0) {
        steps.push({
          id: 'review-struggling',
          title: 'Review Challenging Topics',
          description: `Focus on: ${studentProfile.strugglingAreas.join(', ')}`,
          type: 'review',
          priority: 'medium',
          estimatedTime: 20,
          color: '#FF9800',
          icon: <Target size={16} />
        });
      }
      
      setNextSteps(steps);
    };
    
    calculateNextSteps();
  }, [curriculumPaths, studentProfile]);

  // Generate adaptive recommendations
  useEffect(() => {
    const generateRecommendations = () => {
      const recommendations = [];
      
      // Performance-based recommendations
      if (studentProfile.engagementLevel > 80) {
        recommendations.push({
          type: 'success',
          icon: <Star size={16} />,
          message: 'High engagement! Consider advanced challenges.',
          action: 'Unlock bonus activities'
        });
      }
      
      if (studentProfile.strugglingAreas.length > 2) {
        recommendations.push({
          type: 'attention',
          icon: <AlertTriangle size={16} />,
          message: 'Multiple challenging areas detected.',
          action: 'Schedule review session'
        });
      }
      
      // Learning style adaptation
      if (studentProfile.preferredLearningStyle === 'visual') {
        recommendations.push({
          type: 'info',
          icon: <Brain size={16} />,
          message: 'Visual learner detected.',
          action: 'Prioritize diagram-based activities'
        });
      }
      
      // Age-appropriate suggestions
      if (studentProfile.ageGroup === '12-14' && studentProfile.overallProgress > 50) {
        recommendations.push({
          type: 'opportunity',
          icon: <Zap size={16} />,
          message: 'Ready for advanced concepts.',
          action: 'Consider Year 2 content'
        });
      }
      
      setAdaptiveRecommendations(recommendations);
    };
    
    generateRecommendations();
  }, [studentProfile]);

  // Get pathway status
  const getPathwayStatus = (path) => {
    const hasPrerequisites = path.prerequisites.every(prereq => 
      studentProfile.completedActivities.some(activity => activity.includes(prereq))
    );
    
    if (!hasPrerequisites) return 'locked';
    if (path.status === 'current') return 'current';
    if (path.completedActivities === path.totalActivities) return 'completed';
    return 'available';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'current': return <Clock size={16} />;
      case 'locked': return <Lock size={16} />;
      case 'available': return <Target size={16} />;
      default: return <Target size={16} />;
    }
  };

  // Handle pathway selection
  const handlePathwaySelect = (pathway) => {
    const status = getPathwayStatus(pathway);
    if (status === 'locked') return;
    
    if (onPathwaySelect) {
      onPathwaySelect(pathway);
    }
    
    console.log('Selected pathway:', pathway.title);
  };

  return (
    <SequencerContainer>
      <SequencerHeader>
        <SequencerTitle>
          <Route size={28} />
          Content Sequencer
          {mode === 'instructor' && ' - Instructor View'}
        </SequencerTitle>
        <StudentInfo>
          <Users size={16} />
          {studentProfile.name} • Age {studentProfile.ageGroup} • Year {studentProfile.yearLevel}
        </StudentInfo>
      </SequencerHeader>

      {/* Learning Pathways */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} />
          Learning Pathways
        </h3>
        
        <PathwayGrid>
          {curriculumPaths.map((pathway) => {
            const status = getPathwayStatus(pathway);
            const isLocked = status === 'locked';
            const progress = Math.round((pathway.completedActivities / pathway.totalActivities) * 100);
            
            return (
              <PathwayCard
                key={pathway.id}
                isActive={status === 'current'}
                isLocked={isLocked}
                onClick={() => handlePathwaySelect(pathway)}
              >
                <PathwayHeader>
                  <PathwayTitle>
                    {pathway.icon} {pathway.title}
                  </PathwayTitle>
                  <PathwayStatus status={status}>
                    {getStatusIcon(status)}
                    {status.toUpperCase()}
                  </PathwayStatus>
                </PathwayHeader>
                
                <PathwayMeta>
                  {pathway.difficulty} • {pathway.estimatedTime}min • {pathway.totalActivities} activities
                </PathwayMeta>
                
                <ProgressBar>
                  <ProgressFill percentage={progress} />
                </ProgressBar>
                
                <div style={{ fontSize: '12px', marginBottom: '12px' }}>
                  Progress: {pathway.completedActivities}/{pathway.totalActivities} ({progress}%)
                </div>
                
                <div style={{ fontSize: '13px', opacity: '0.9' }}>
                  {pathway.description}
                </div>
                
                {!isLocked && (
                  <div style={{ 
                    marginTop: '12px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    color: '#4CAF50'
                  }}>
                    Next: {pathway.nextActivity}
                  </div>
                )}
                
                {isLocked && (
                  <div style={{ 
                    marginTop: '12px', 
                    fontSize: '12px', 
                    opacity: '0.7'
                  }}>
                    Requires: {pathway.prerequisites.join(', ')}
                  </div>
                )}
              </PathwayCard>
            );
          })}
        </PathwayGrid>
      </div>

      {/* Next Steps */}
      <NextStepsSection>
        <NextStepsTitle>
          <ChevronRight size={20} />
          Recommended Next Steps
        </NextStepsTitle>
        
        {nextSteps.map((step, index) => (
          <StepItem key={step.id}>
            <StepIcon color={step.color}>
              {step.icon}
            </StepIcon>
            <StepContent>
              <StepTitle>{step.title}</StepTitle>
              <StepMeta>
                {step.description} • ~{step.estimatedTime} min • {step.priority} priority
              </StepMeta>
            </StepContent>
          </StepItem>
        ))}
      </NextStepsSection>

      {/* Adaptive Insights */}
      {mode === 'instructor' && (
        <AdaptiveInsights>
          <NextStepsTitle>
            <Brain size={20} />
            Adaptive Insights
          </NextStepsTitle>
          
          {adaptiveRecommendations.map((rec, index) => (
            <InsightItem key={index}>
              {rec.icon}
              <div>
                <strong>{rec.message}</strong> {rec.action}
              </div>
            </InsightItem>
          ))}
          
          <div style={{ marginTop: '12px', fontSize: '12px', opacity: '0.8' }}>
            Based on: engagement level ({studentProfile.engagementLevel}%), 
            learning style ({studentProfile.preferredLearningStyle}), 
            progress rate, help frequency
          </div>
        </AdaptiveInsights>
      )}
    </SequencerContainer>
  );
};

export default ContentSequencer;