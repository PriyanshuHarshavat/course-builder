import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAnalytics } from './AnalyticsProvider';
import { useGamification } from './GamificationManager';
import { useTheme } from './theme/ThemeProvider';
import ThemeAwareLogo from './components/ThemeAwareLogo';
import ComponentRenderer from './ComponentRenderer';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Award,
  Star,
  Target,
  Brain,
  Send,
  RefreshCw,
  Eye,
  EyeOff,
  Lightbulb,
  Trophy,
  Home,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Video,
  FileText,
  Image,
  Code,
  Shield,
  Layers,
  AlertCircle,
  Sparkles,
  Zap
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

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-10px); }
  70% { transform: translateY(-5px); }
  90% { transform: translateY(-2px); }
`;

const celebration = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(5deg); }
  50% { transform: scale(1.2) rotate(-5deg); }
  75% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

// Main Container
const PlayerContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 0;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
`;

// Course Header
const CourseHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px 30px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CourseInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CourseIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const CourseTitleInfo = styled.div``;

const CourseTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const CourseSubtitle = styled.div`
  font-size: 14px;
  opacity: 0.8;
  margin-top: 4px;
`;

const CourseProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 4px;
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const ProgressText = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

// Main Content
const PlayerContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

// Lesson Navigation Sidebar
const LessonNav = styled.div`
  width: 280px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  overflow-y: auto;
  border-right: 2px solid rgba(255, 255, 255, 0.2);
`;

const NavTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LessonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 8px;
  background: ${props => 
    props.active ? 'rgba(255,255,255,0.2)' : 
    props.completed ? 'rgba(76, 175, 80, 0.2)' : 
    'rgba(255,255,255,0.1)'
  };
  border: ${props => props.active ? '2px solid rgba(255,255,255,0.4)' : '2px solid transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.15);
  }
`;

const LessonIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => 
    props.completed ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.active ? 'linear-gradient(135deg, #2196F3, #1976D2)' :
    'rgba(255,255,255,0.2)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const LessonDetails = styled.div`
  flex: 1;
`;

const LessonTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 2px;
`;

const LessonMeta = styled.div`
  font-size: 11px;
  opacity: 0.8;
`;

// Component Area
const ComponentArea = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ComponentContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  ${css`animation: ${slideIn} 0.4s ease-out;`}
`;

const ComponentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const ComponentTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ComponentBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Text Component
const TextContent = styled.div`
  line-height: 1.8;
  font-size: 16px;
  white-space: pre-wrap;
  
  &.heading {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
  
  &.quote {
    font-style: italic;
    border-left: 4px solid #4CAF50;
    padding-left: 20px;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px 20px;
    border-radius: 8px;
  }
`;

// Video Component
const VideoContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
`;

const VideoPlaceholder = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const VideoTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 18px;
`;

const VideoDescription = styled.p`
  margin: 0;
  opacity: 0.8;
  line-height: 1.6;
`;

// Quiz Component
const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QuestionContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
`;

const QuestionText = styled.h4`
  margin: 0 0 15px 0;
  font-size: 18px;
`;

const QuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QuizOption = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  background: ${props => 
    props.selected && props.correct ? 'rgba(76, 175, 80, 0.3)' :
    props.selected && !props.correct ? 'rgba(244, 67, 54, 0.3)' :
    props.showAnswer && props.correct ? 'rgba(76, 175, 80, 0.2)' :
    'rgba(255, 255, 255, 0.1)'
  };
  border: ${props => 
    props.selected ? '2px solid rgba(255, 255, 255, 0.4)' :
    '2px solid transparent'
  };
  border-radius: 8px;
  cursor: ${props => props.answered ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.answered ? undefined : 'rgba(255, 255, 255, 0.15)'};
  }
`;

const OptionRadio = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.8)' : 'transparent'};
  transition: all 0.3s ease;
`;

const QuizResult = styled.div`
  background: ${props => props.correct ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
  border: ${props => props.correct ? '2px solid #4CAF50' : '2px solid #f44336'};
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

// AI Prompt Component
const AIPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PromptDisplay = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid #4CAF50;
`;

const PromptText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const PromptMeta = styled.div`
  display: flex;
  gap: 20px;
  font-size: 12px;
  opacity: 0.8;
`;

const ResponseArea = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
`;

const ResponseInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const HintsContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
`;

const HintItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  opacity: 0.9;
`;

const HintsToggle = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Safety Component
const SafetyContainer = styled.div`
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  border-radius: 10px;
  padding: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
`;

const SafetyTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SafetyPoints = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SafetyPoint = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 15px;
`;

// Navigation Controls
const NavigationControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.1);
  border-top: 2px solid rgba(255, 255, 255, 0.2);
`;

const NavButton = styled.button`
  background: ${props => 
    props.variant === 'primary' ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.variant === 'secondary' ? 'linear-gradient(135deg, #2196F3, #1976D2)' :
    'rgba(255, 255, 255, 0.2)'
  };
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CompletionReward = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin: 20px 0;
  ${css`animation: ${celebration} 0.8s ease-out;`}
`;

const RewardIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
  ${css`animation: ${bounce} 1s ease-out;`}
`;

const RewardText = styled.h3`
  margin: 0 0 10px 0;
  font-size: 20px;
`;

const RewardSubtext = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 14px;
`;

// Main Course Player Component
const CoursePlayer = ({ course, onExit, studentData }) => {
  const { trackPageView, trackButtonClick, trackEducationalEvent } = useAnalytics();
  const { addXP, addBadge, completeLesson } = useGamification();
  const { theme } = useTheme();
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [completedComponents, setCompletedComponents] = useState(new Set());
  const [componentStates, setComponentStates] = useState({});
  const [showHints, setShowHints] = useState({});
  
  // Calculate progress
  const totalLessons = course?.lessons?.length || 0;
  const totalComponents = course?.lessons?.reduce((total, lesson) => total + lesson.components.length, 0) || 0;
  const completedComponentsCount = completedComponents.size;
  const overallProgress = totalComponents > 0 ? (completedComponentsCount / totalComponents) * 100 : 0;
  
  const currentLesson = course?.lessons?.[currentLessonIndex];
  const currentComponent = currentLesson?.components?.[currentComponentIndex];
  
  // Track course view
  useEffect(() => {
    if (course) {
      trackPageView('course_player', { 
        courseId: course.title?.toLowerCase().replace(/\\s+/g, '-'),
        lessonIndex: currentLessonIndex,
        componentIndex: currentComponentIndex
      });
    }
  }, [course, currentLessonIndex, currentComponentIndex, trackPageView]);
  
  // Navigation functions
  const goToLesson = (lessonIndex) => {
    setCurrentLessonIndex(lessonIndex);
    setCurrentComponentIndex(0);
    trackButtonClick('navigate_lesson', { 
      lessonIndex, 
      lessonTitle: course.lessons[lessonIndex]?.title 
    });
  };
  
  const nextComponent = () => {
    const lesson = course.lessons[currentLessonIndex];
    if (currentComponentIndex < lesson.components.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1);
    } else if (currentLessonIndex < course.lessons.length - 1) {
      // Move to next lesson
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentComponentIndex(0);
    }
    trackButtonClick('next_component');
  };
  
  const previousComponent = () => {
    if (currentComponentIndex > 0) {
      setCurrentComponentIndex(currentComponentIndex - 1);
    } else if (currentLessonIndex > 0) {
      // Move to previous lesson, last component
      const prevLessonIndex = currentLessonIndex - 1;
      const prevLesson = course.lessons[prevLessonIndex];
      setCurrentLessonIndex(prevLessonIndex);
      setCurrentComponentIndex(prevLesson.components.length - 1);
    }
    trackButtonClick('previous_component');
  };
  
  // Component completion
  const completeComponent = (componentId, score = null, responseData = null) => {
    setCompletedComponents(prev => new Set([...prev, componentId]));
    
    // Track educational event
    trackEducationalEvent('component_completed', {
      componentId,
      componentType: currentComponent?.type,
      lessonIndex: currentLessonIndex,
      score,
      responseData
    });
    
    // Award points for component completion
    const basePoints = 10;
    const difficultyMultiplier = course.difficulty === 'beginner' ? 1 : course.difficulty === 'intermediate' ? 1.2 : 1.5;
    const points = Math.round(basePoints * difficultyMultiplier);
    addXP(points, `Completed ${currentComponent?.name}`);
    
    // Check if lesson is complete
    const lesson = course.lessons[currentLessonIndex];
    const lessonComponentIds = lesson.components.map(c => c.id);
    const completedInThisLesson = lessonComponentIds.filter(id => 
      completedComponents.has(id) || id === componentId
    );
    
    if (completedInThisLesson.length === lessonComponentIds.length) {
      completeLessonReward(currentLessonIndex);
    }
  };
  
  const completeLessonReward = (lessonIndex) => {
    const lesson = course.lessons[lessonIndex];
    setCompletedLessons(prev => new Set([...prev, lessonIndex]));
    
    // Award lesson points and badges
    addXP(lesson.points || 50, `Completed lesson: ${lesson.title}`);
    
    if (lesson.badges && lesson.badges.length > 0) {
      lesson.badges.forEach(badgeId => {
        addBadge(badgeId);
      });
    }
    
    completeLesson({
      title: lesson.title,
      difficulty: course.difficulty
    });
    
    trackEducationalEvent('lesson_completed', {
      lessonIndex,
      lessonTitle: lesson.title,
      courseId: course.title?.toLowerCase().replace(/\\s+/g, '-')
    });
  };
  
  // Component state management
  const updateComponentState = (componentId, state) => {
    setComponentStates(prev => ({
      ...prev,
      [componentId]: { ...prev[componentId], ...state }
    }));
  };
  
  const getComponentState = (componentId) => {
    return componentStates[componentId] || {};
  };
  
  // Component renderers
  const renderTextComponent = (component) => (
    <ComponentContainer>
      <ComponentHeader>
        <ComponentTitle>
          <FileText size={20} />
          {component.name}
        </ComponentTitle>
        <ComponentBadge>Reading</ComponentBadge>
      </ComponentHeader>
      <TextContent className={component.config?.formatting || 'paragraph'}>
        {component.config?.content || 'No content available'}
      </TextContent>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <NavButton 
          variant="primary" 
          onClick={() => completeComponent(component.id)}
        >
          <CheckCircle size={16} />
          Mark as Read
        </NavButton>
      </div>
    </ComponentContainer>
  );
  
  const renderVideoComponent = (component) => (
    <ComponentContainer>
      <ComponentHeader>
        <ComponentTitle>
          <Video size={20} />
          {component.config?.title || component.name}
        </ComponentTitle>
        <ComponentBadge>Video Lesson</ComponentBadge>
      </ComponentHeader>
      <VideoContainer>
        <VideoPlaceholder>
          <Video size={48} />
          <VideoTitle>{component.config?.title || 'Video Title'}</VideoTitle>
          <VideoDescription>
            {component.config?.description || 'No description available'}
          </VideoDescription>
          <div style={{ marginTop: '15px', fontSize: '14px', opacity: 0.7 }}>
            {component.config?.url ? (
              <div>
                <p>Video URL: {component.config.url}</p>
                <p>Duration: {component.config.duration || 'Unknown'} minutes</p>
              </div>
            ) : (
              <p>No video URL configured</p>
            )}
          </div>
          <NavButton 
            variant="primary" 
            onClick={() => completeComponent(component.id)}
            style={{ marginTop: '15px' }}
          >
            <CheckCircle size={16} />
            Mark as Watched
          </NavButton>
        </VideoPlaceholder>
      </VideoContainer>
    </ComponentContainer>
  );
  
  const renderQuizComponent = (component) => {
    const state = getComponentState(component.id);
    const { selectedAnswers = {}, submitted = false, score = null } = state;
    
    const handleOptionSelect = (questionIndex, optionIndex) => {
      if (submitted) return;
      
      updateComponentState(component.id, {
        selectedAnswers: {
          ...selectedAnswers,
          [questionIndex]: optionIndex
        }
      });
    };
    
    const submitQuiz = () => {
      const questions = component.config?.questions || [];
      let correctCount = 0;
      
      questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correct) {
          correctCount++;
        }
      });
      
      const score = Math.round((correctCount / questions.length) * 100);
      
      updateComponentState(component.id, {
        submitted: true,
        score
      });
      
      completeComponent(component.id, score, { selectedAnswers, correctCount, totalQuestions: questions.length });
    };
    
    const resetQuiz = () => {
      updateComponentState(component.id, {
        selectedAnswers: {},
        submitted: false,
        score: null
      });
    };
    
    return (
      <ComponentContainer>
        <ComponentHeader>
          <ComponentTitle>
            <Target size={20} />
            {component.name}
          </ComponentTitle>
          <ComponentBadge>Knowledge Quiz</ComponentBadge>
        </ComponentHeader>
        
        <QuizContainer>
          {component.config?.questions?.map((question, qIndex) => (
            <QuestionContainer key={qIndex}>
              <QuestionText>
                Question {qIndex + 1}: {question.question}
              </QuestionText>
              <QuizOptions>
                {question.options?.map((option, oIndex) => (
                  <QuizOption
                    key={oIndex}
                    selected={selectedAnswers[qIndex] === oIndex}
                    correct={question.correct === oIndex}
                    showAnswer={submitted}
                    answered={submitted}
                    onClick={() => handleOptionSelect(qIndex, oIndex)}
                  >
                    <OptionRadio selected={selectedAnswers[qIndex] === oIndex} />
                    {option}
                    {submitted && question.correct === oIndex && (
                      <span style={{ marginLeft: 'auto', color: '#4CAF50' }}>✓ Correct</span>
                    )}
                  </QuizOption>
                ))}
              </QuizOptions>
            </QuestionContainer>
          ))}
          
          {submitted && (
            <QuizResult correct={score >= 70}>
              {score >= 70 ? (
                <>
                  <CheckCircle size={20} />
                  <div>
                    <strong>Great job! Score: {score}%</strong>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>
                      You've mastered this topic!
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle size={20} />
                  <div>
                    <strong>Score: {score}% - Keep practicing!</strong>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>
                      Try again to improve your understanding.
                    </div>
                  </div>
                </>
              )}
            </QuizResult>
          )}
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            {!submitted ? (
              <NavButton 
                variant="primary" 
                onClick={submitQuiz}
                disabled={Object.keys(selectedAnswers).length !== (component.config?.questions?.length || 0)}
              >
                <Send size={16} />
                Submit Quiz
              </NavButton>
            ) : (
              <>
                {score < 70 && (
                  <NavButton onClick={resetQuiz}>
                    <RotateCcw size={16} />
                    Try Again
                  </NavButton>
                )}
                <NavButton variant="primary" onClick={nextComponent}>
                  <ChevronRight size={16} />
                  Continue
                </NavButton>
              </>
            )}
          </div>
        </QuizContainer>
      </ComponentContainer>
    );
  };
  
  const renderAIPromptComponent = (component) => {
    const state = getComponentState(component.id);
    const { response = '', submitted = false, feedback = null } = state;
    const componentHints = component.config?.hints || [];
    const showComponentHints = showHints[component.id] || false;
    
    const handleResponseChange = (value) => {
      updateComponentState(component.id, { response: value });
    };
    
    const submitResponse = () => {
      // Simulate AI feedback based on response length and content
      const wordCount = response.trim().split(/\\s+/).length;
      const expectedLength = component.config?.expectedLength || 'medium';
      
      let score = 0;
      let feedbackText = '';
      
      if (wordCount < 5) {
        score = 30;
        feedbackText = 'Your response is quite short. Try to add more details and creativity!';
      } else if (expectedLength === 'short' && wordCount <= 30) {
        score = 85;
        feedbackText = 'Great concise response! You captured the essence perfectly.';
      } else if (expectedLength === 'medium' && wordCount >= 20 && wordCount <= 100) {
        score = 90;
        feedbackText = 'Excellent response! Good balance of detail and creativity.';
      } else if (expectedLength === 'long' && wordCount >= 50) {
        score = 95;
        feedbackText = 'Fantastic detailed response! Your creativity shines through.';
      } else {
        score = 70;
        feedbackText = 'Good effort! Consider the expected response length for even better results.';
      }
      
      updateComponentState(component.id, {
        submitted: true,
        feedback: { score, text: feedbackText }
      });
      
      completeComponent(component.id, score, { response, wordCount });
    };
    
    const resetResponse = () => {
      updateComponentState(component.id, {
        response: '',
        submitted: false,
        feedback: null
      });
    };
    
    return (
      <ComponentContainer>
        <ComponentHeader>
          <ComponentTitle>
            <Brain size={20} />
            {component.name}
          </ComponentTitle>
          <ComponentBadge>AI Exercise</ComponentBadge>
        </ComponentHeader>
        
        <AIPromptContainer>
          <PromptDisplay>
            <PromptText>{component.config?.prompt || 'No prompt specified'}</PromptText>
            <PromptMeta>
              <div>Expected: {component.config?.expectedLength || 'Medium'} response</div>
              <div>Difficulty: {component.config?.difficulty || 'Beginner'}</div>
            </PromptMeta>
          </PromptDisplay>
          
          <ResponseArea>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Your Creative Response:
            </label>
            <ResponseInput
              value={response}
              onChange={(e) => handleResponseChange(e.target.value)}
              placeholder="Type your creative response here..."
              disabled={submitted}
            />
            
            {componentHints.length > 0 && (
              <div style={{ marginTop: '15px' }}>
                <HintsToggle 
                  onClick={() => setShowHints(prev => ({ ...prev, [component.id]: !showComponentHints }))}
                >
                  {showComponentHints ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showComponentHints ? 'Hide Hints' : 'Show Hints'}
                </HintsToggle>
                
                {showComponentHints && (
                  <HintsContainer>
                    <div style={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Lightbulb size={16} />
                      Helpful Hints:
                    </div>
                    {componentHints.map((hint, index) => (
                      <HintItem key={index}>
                        <span>💡</span>
                        {hint}
                      </HintItem>
                    ))}
                  </HintsContainer>
                )}
              </div>
            )}
          </ResponseArea>
          
          {submitted && feedback && (
            <QuizResult correct={feedback.score >= 70}>
              {feedback.score >= 70 ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <div>
                <strong>Score: {feedback.score}%</strong>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                  {feedback.text}
                </div>
              </div>
            </QuizResult>
          )}
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            {!submitted ? (
              <NavButton 
                variant="primary" 
                onClick={submitResponse}
                disabled={response.trim().length < 5}
              >
                <Send size={16} />
                Submit Response
              </NavButton>
            ) : (
              <>
                <NavButton onClick={resetResponse}>
                  <RotateCcw size={16} />
                  Try Different Response
                </NavButton>
                <NavButton variant="primary" onClick={nextComponent}>
                  <ChevronRight size={16} />
                  Continue
                </NavButton>
              </>
            )}
          </div>
        </AIPromptContainer>
      </ComponentContainer>
    );
  };
  
  const renderSafetyComponent = (component) => (
    <ComponentContainer>
      <ComponentHeader>
        <ComponentTitle>
          <Shield size={20} />
          {component.name}
        </ComponentTitle>
        <ComponentBadge>Safety Reminder</ComponentBadge>
      </ComponentHeader>
      
      <SafetyContainer>
        <SafetyTitle>
          <Shield size={18} />
          {component.config?.title || 'Safety Reminder'}
        </SafetyTitle>
        <SafetyPoints>
          {component.config?.points?.map((point, index) => (
            <SafetyPoint key={index}>
              <span style={{ color: '#4CAF50', fontSize: '18px' }}>✓</span>
              {point}
            </SafetyPoint>
          )) || <SafetyPoint>No safety points configured</SafetyPoint>}
        </SafetyPoints>
      </SafetyContainer>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <NavButton 
          variant="primary" 
          onClick={() => completeComponent(component.id)}
        >
          <CheckCircle size={16} />
          I Understand
        </NavButton>
      </div>
    </ComponentContainer>
  );
  
  const renderComponent = (component) => {
    if (!component) {
      return (
        <ComponentContainer>
          <div style={{ textAlign: 'center', padding: '40px', opacity: 0.7 }}>
            <AlertCircle size={48} style={{ marginBottom: '20px' }} />
            <h3>Component Not Found</h3>
            <p>This component is not configured properly.</p>
          </div>
        </ComponentContainer>
      );
    }
    
    switch (component.type) {
      case 'text-block':
        return renderTextComponent(component);
      case 'video-block':
        return renderVideoComponent(component);
      case 'quiz-block':
        return renderQuizComponent(component);
      case 'ai-prompt':
        return renderAIPromptComponent(component);
      case 'safety-check':
        return renderSafetyComponent(component);
      case 'python-playground':
      case 'content-slide':
      case 'title-header':
      case 'two-column':
      case 'image-block':
      case 'code-block':
      case 'discussion':
      case 'ai-compare':
      case 'gamification':
      case 'button-action':
      case 'card-layout':
      case 'callout-box':
        // Use ComponentRenderer for these component types
        return (
          <ComponentContainer>
            <ComponentRenderer component={component} />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <NavButton 
                variant="primary" 
                onClick={() => completeComponent(component.id)}
              >
                <CheckCircle size={16} />
                Continue
              </NavButton>
            </div>
          </ComponentContainer>
        );
      default:
        return (
          <ComponentContainer>
            <ComponentHeader>
              <ComponentTitle>
                <AlertCircle size={20} />
                {component.name}
              </ComponentTitle>
              <ComponentBadge>{component.type}</ComponentBadge>
            </ComponentHeader>
            <div style={{ textAlign: 'center', padding: '20px', opacity: 0.7 }}>
              This component type ({component.type}) is not yet supported in the course player.
            </div>
          </ComponentContainer>
        );
    }
  };
  
  // Check if course is complete
  const isCourseComplete = completedLessons.size === totalLessons;
  
  if (!course || !course.lessons || course.lessons.length === 0) {
    return (
      <PlayerContainer>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '400px',
          textAlign: 'center',
          opacity: 0.7 
        }}>
          <BookOpen size={64} style={{ marginBottom: '20px' }} />
          <h2>No Course Available</h2>
          <p>This course doesn't have any lessons yet.</p>
          <NavButton onClick={onExit}>
            <Home size={16} />
            Return to Dashboard
          </NavButton>
        </div>
      </PlayerContainer>
    );
  }
  
  return (
    <PlayerContainer>
      {/* Course Header */}
      <CourseHeader>
        <CourseInfo>
          <CourseIcon>
            <ThemeAwareLogo size={24} />
          </CourseIcon>
          <CourseTitleInfo>
            <CourseTitle>{course.title || 'Untitled Course'}</CourseTitle>
            <CourseSubtitle>
              {course.ageGroup} • {course.difficulty} • {totalLessons} lessons
            </CourseSubtitle>
          </CourseTitleInfo>
        </CourseInfo>
        
        <CourseProgress>
          <ProgressBar>
            <ProgressFill progress={overallProgress} />
          </ProgressBar>
          <ProgressText>
            {Math.round(overallProgress)}% Complete
          </ProgressText>
          <NavButton onClick={onExit}>
            <Home size={16} />
            Exit Course
          </NavButton>
        </CourseProgress>
      </CourseHeader>
      
      {/* Main Content */}
      <PlayerContent>
        {/* Lesson Navigation */}
        <LessonNav>
          <NavTitle>
            <BookOpen size={16} />
            Course Lessons
          </NavTitle>
          
          {course.lessons.map((lesson, index) => (
            <LessonItem
              key={lesson.id}
              active={index === currentLessonIndex}
              completed={completedLessons.has(index)}
              onClick={() => goToLesson(index)}
            >
              <LessonIcon 
                completed={completedLessons.has(index)}
                active={index === currentLessonIndex}
              >
                {completedLessons.has(index) ? (
                  <CheckCircle size={16} />
                ) : (
                  index + 1
                )}
              </LessonIcon>
              <LessonDetails>
                <LessonTitle>{lesson.title}</LessonTitle>
                <LessonMeta>
                  {lesson.components.length} components • {lesson.duration}min • {lesson.points}pts
                </LessonMeta>
              </LessonDetails>
            </LessonItem>
          ))}
        </LessonNav>
        
        {/* Component Area */}
        <ComponentArea>
          {isCourseComplete ? (
            <CompletionReward>
              <RewardIcon>🎉</RewardIcon>
              <RewardText>Congratulations!</RewardText>
              <RewardSubtext>
                You've completed the entire course: {course.title}
              </RewardSubtext>
              <div style={{ marginTop: '20px' }}>
                <NavButton variant="primary" onClick={onExit}>
                  <Trophy size={16} />
                  Return to Dashboard
                </NavButton>
              </div>
            </CompletionReward>
          ) : (
            renderComponent(currentComponent)
          )}
        </ComponentArea>
      </PlayerContent>
      
      {/* Navigation Controls */}
      {!isCourseComplete && (
        <NavigationControls>
          <NavButton 
            onClick={previousComponent}
            disabled={currentLessonIndex === 0 && currentComponentIndex === 0}
          >
            <ChevronLeft size={16} />
            Previous
          </NavButton>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '14px', opacity: 0.8 }}>
              Lesson {currentLessonIndex + 1} of {totalLessons} • 
              Component {currentComponentIndex + 1} of {currentLesson?.components.length || 0}
            </span>
          </div>
          
          <NavButton 
            variant="primary"
            onClick={nextComponent}
            disabled={
              currentLessonIndex === totalLessons - 1 && 
              currentComponentIndex === (currentLesson?.components.length || 1) - 1
            }
          >
            Next
            <ChevronRight size={16} />
          </NavButton>
        </NavigationControls>
      )}
    </PlayerContainer>
  );
};

export default CoursePlayer;