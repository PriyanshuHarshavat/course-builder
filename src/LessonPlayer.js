import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Home,
  BookOpen,
  CheckCircle,
  Circle,
  Star,
  Award,
  Clock,
  User,
  Progress,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Settings,
  Volume2,
  VolumeX,
  RotateCcw,
  Flag,
  Heart,
  Share2
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInFromLeft = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
`;

const progressBar = keyframes`
  from { width: 0%; }
  to { width: var(--progress-width); }
`;

// Main Player Container
const PlayerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  display: flex;
  flex-direction: column;
  z-index: 2000;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
`;

// Top Navigation Bar
const TopNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 10;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NavCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  justify-content: center;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CourseTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const LessonTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
`;

// Progress System
const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 15px;
  border-radius: 20px;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 3px;
  transition: width 0.5s ease;
  width: ${props => props.progress}%;
  ${css`animation: ${progressBar} 1s ease-out;`}
`;

const ProgressText = styled.div`
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
`;

// Navigation Controls
const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavButton = styled.button`
  background: ${props => props.variant === 'primary' ? 'rgba(76, 175, 80, 0.8)' : 'rgba(255, 255, 255, 0.2)'};
  border: 2px solid ${props => props.variant === 'primary' ? '#4CAF50' : 'transparent'};
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: bold;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? 'rgba(76, 175, 80, 1)' : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Main Content Area
const ContentArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

// Sidebar Menu
const SidebarMenu = styled.div`
  width: ${props => props.isOpen ? '300px' : '0px'};
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  transition: width 0.3s ease;
  overflow: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  ${props => props.isOpen && css`animation: ${slideInFromLeft} 0.3s ease-out;`}
`;

const SidebarContent = styled.div`
  padding: 20px;
  width: 300px;
  height: 100%;
  overflow-y: auto;
`;

const SidebarTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LessonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LessonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${props => props.isActive ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.isActive ? '#4CAF50' : 'transparent'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
  }
`;

const LessonStatus = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.completed ? '#4CAF50' : 'rgba(255, 255, 255, 0.6)'};
`;

const LessonInfo = styled.div`
  flex: 1;
`;

const LessonName = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 2px;
`;

const LessonMeta = styled.div`
  font-size: 11px;
  opacity: 0.8;
`;

// Lesson Content Display
const LessonContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const ContentHeader = styled.div`
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const ContentBody = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  ${css`animation: ${fadeIn} 0.5s ease-out;`}
`;

// Component Rendering
const ComponentRenderer = styled.div`
  margin-bottom: 30px;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
  animation-delay: ${props => props.index * 0.1}s;
  animation-fill-mode: both;
`;

const ComponentCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
`;

const ComponentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const ComponentTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  flex: 1;
`;

const ComponentBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Bottom Navigation
const BottomNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const BottomLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const BottomCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const BottomRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Achievement System
const AchievementPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #333;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  z-index: 3000;
  ${css`animation: ${bounceIn} 0.8s ease-out;`}
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const AchievementIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const AchievementTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: bold;
`;

const AchievementDescription = styled.p`
  margin: 0;
  font-size: 16px;
  opacity: 0.8;
`;

// Timer System
const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

// Main Component
const LessonPlayer = ({ course, onExit, onComplete }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [completedComponents, setCompletedComponents] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showAchievement, setShowAchievement] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const currentLesson = course.lessons[currentLessonIndex];
  const currentComponent = currentLesson?.components[currentComponentIndex];
  const totalLessons = course.lessons.length;
  const totalComponents = course.lessons.reduce((total, lesson) => total + lesson.components.length, 0);
  const completedCount = completedComponents.size;
  const progressPercentage = totalComponents > 0 ? (completedCount / totalComponents) * 100 : 0;

  // Timer effect
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Calculate total estimated time
  useEffect(() => {
    const total = course.lessons.reduce((sum, lesson) => sum + (lesson.duration || 15), 0);
    setTotalTime(total * 60); // Convert to seconds
  }, [course]);

  // Auto-advance logic
  useEffect(() => {
    if (autoAdvance && isPlaying && currentComponent) {
      const componentDuration = getComponentDuration(currentComponent);
      const timer = setTimeout(() => {
        handleNextComponent();
      }, componentDuration * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentComponentIndex, isPlaying, autoAdvance]);

  const getComponentDuration = (component) => {
    const durations = {
      'text-block': 30,
      'video-block': 60,
      'quiz-block': 45,
      'ai-prompt': 90,
      'image-block': 20,
      default: 30
    };
    return durations[component.type] || durations.default;
  };

  const handlePrevious = () => {
    if (currentComponentIndex > 0) {
      setCurrentComponentIndex(currentComponentIndex - 1);
    } else if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setCurrentComponentIndex(course.lessons[currentLessonIndex - 1].components.length - 1);
    }
  };

  const handleNext = () => {
    handleNextComponent();
  };

  const handleNextComponent = () => {
    // Mark current component as completed
    const componentId = `${currentLessonIndex}-${currentComponentIndex}`;
    setCompletedComponents(prev => new Set([...prev, componentId]));

    if (currentComponentIndex < currentLesson.components.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1);
    } else {
      // Mark lesson as completed
      setCompletedLessons(prev => new Set([...prev, currentLessonIndex]));
      
      // Show achievement for lesson completion
      setShowAchievement({
        icon: '🎉',
        title: 'Lesson Complete!',
        description: `You've finished "${currentLesson.title}"`
      });

      if (currentLessonIndex < totalLessons - 1) {
        // Move to next lesson
        setTimeout(() => {
          setCurrentLessonIndex(currentLessonIndex + 1);
          setCurrentComponentIndex(0);
          setShowAchievement(null);
        }, 2000);
      } else {
        // Course completed
        setTimeout(() => {
          setShowAchievement({
            icon: '🏆',
            title: 'Course Complete!',
            description: 'Congratulations on finishing the entire course!'
          });
          setTimeout(() => {
            onComplete && onComplete();
          }, 3000);
        }, 2000);
      }
    }
  };

  const handleLessonSelect = (lessonIndex) => {
    setCurrentLessonIndex(lessonIndex);
    setCurrentComponentIndex(0);
    setSidebarOpen(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderComponent = (component, index) => {
    if (!component) return null;

    const IconComponent = component.icon || BookOpen;

    return (
      <ComponentRenderer key={component.id} index={index}>
        <ComponentCard>
          <ComponentHeader>
            <IconComponent size={20} />
            <ComponentTitle>{component.name}</ComponentTitle>
            <ComponentBadge>{component.category}</ComponentBadge>
          </ComponentHeader>
          
          {/* Component Content Based on Type */}
          {component.type === 'text-block' && (
            <div style={{ lineHeight: '1.6', fontSize: '16px' }}>
              {component.config?.content || 'No content available'}
            </div>
          )}
          
          {component.type === 'video-block' && (
            <div style={{ 
              background: 'rgba(0,0,0,0.3)', 
              borderRadius: '10px', 
              padding: '20px', 
              textAlign: 'center' 
            }}>
              <Play size={48} style={{ marginBottom: '15px' }} />
              <h4>{component.config?.title || 'Video Content'}</h4>
              <p>{component.config?.description || 'Video description'}</p>
            </div>
          )}
          
          {component.type === 'quiz-block' && (
            <div>
              <h4>Knowledge Check</h4>
              {component.config?.questions?.map((q, qIndex) => (
                <div key={qIndex} style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  padding: '15px', 
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    {q.question}
                  </div>
                  {q.options?.map((option, oIndex) => (
                    <div key={oIndex} style={{ 
                      padding: '8px', 
                      background: q.correct === oIndex ? 'rgba(76,175,80,0.3)' : 'rgba(255,255,255,0.1)',
                      margin: '5px 0',
                      borderRadius: '5px',
                      border: q.correct === oIndex ? '2px solid #4CAF50' : '1px solid transparent'
                    }}>
                      {q.correct === oIndex ? '✅' : '⭕'} {option}
                    </div>
                  ))}
                </div>
              )) || <div>No questions available</div>}
            </div>
          )}
          
          {component.type === 'ai-prompt' && (
            <div>
              <h4>AI Exercise</h4>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '15px', 
                borderRadius: '8px',
                borderLeft: '4px solid #4CAF50'
              }}>
                {component.config?.prompt || 'No prompt available'}
              </div>
              {component.config?.hints && (
                <div style={{ marginTop: '15px' }}>
                  <strong>Hints:</strong>
                  {component.config.hints.map((hint, hIndex) => (
                    <div key={hIndex} style={{ padding: '5px 0', fontSize: '14px' }}>
                      💡 {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ComponentCard>
      </ComponentRenderer>
    );
  };

  return (
    <PlayerContainer>
      {/* Top Navigation */}
      <TopNavBar>
        <NavLeft>
          <NavButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={16} />
            Menu
          </NavButton>
          <div>
            <CourseTitle>{course.title}</CourseTitle>
            <LessonTitle>{currentLesson?.title}</LessonTitle>
          </div>
        </NavLeft>
        
        <NavCenter>
          <ProgressContainer>
            <ProgressText>
              {completedCount}/{totalComponents}
            </ProgressText>
            <ProgressBar>
              <ProgressFill progress={progressPercentage} />
            </ProgressBar>
            <ProgressText>
              {Math.round(progressPercentage)}%
            </ProgressText>
          </ProgressContainer>
        </NavCenter>
        
        <NavRight>
          <TimerDisplay>
            <Clock size={14} />
            {formatTime(elapsedTime)}
          </TimerDisplay>
          <NavButton onClick={() => setFullscreen(!fullscreen)}>
            {fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </NavButton>
          <NavButton onClick={onExit}>
            <X size={16} />
            Exit
          </NavButton>
        </NavRight>
      </TopNavBar>

      <ContentArea>
        {/* Sidebar Menu */}
        <SidebarMenu isOpen={sidebarOpen}>
          <SidebarContent>
            <SidebarTitle>
              <BookOpen size={18} />
              Course Navigation
            </SidebarTitle>
            
            <LessonList>
              {course.lessons.map((lesson, index) => (
                <LessonItem
                  key={lesson.id}
                  isActive={index === currentLessonIndex}
                  onClick={() => handleLessonSelect(index)}
                >
                  <LessonStatus completed={completedLessons.has(index)}>
                    {completedLessons.has(index) ? <CheckCircle size={16} /> : <Circle size={16} />}
                  </LessonStatus>
                  <LessonInfo>
                    <LessonName>{lesson.title}</LessonName>
                    <LessonMeta>
                      {lesson.components.length} components • {lesson.duration || 15} min
                    </LessonMeta>
                  </LessonInfo>
                </LessonItem>
              ))}
            </LessonList>
          </SidebarContent>
        </SidebarMenu>

        {/* Main Content */}
        <LessonContent>
          <ContentHeader>
            <h3 style={{ margin: '0 0 10px 0' }}>{currentLesson?.title}</h3>
            <div style={{ opacity: 0.8, fontSize: '14px' }}>
              Component {currentComponentIndex + 1} of {currentLesson?.components.length || 0}
            </div>
          </ContentHeader>
          
          <ContentBody>
            {currentComponent && renderComponent(currentComponent, currentComponentIndex)}
          </ContentBody>
        </LessonContent>
      </ContentArea>

      {/* Bottom Navigation */}
      <BottomNav>
        <BottomLeft>
          <NavButton 
            onClick={handlePrevious}
            disabled={currentLessonIndex === 0 && currentComponentIndex === 0}
          >
            <ChevronLeft size={16} />
            Previous
          </NavButton>
        </BottomLeft>
        
        <BottomCenter>
          <NavButton onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Play'}
          </NavButton>
          
          <NavButton onClick={() => setAutoAdvance(!autoAdvance)}>
            {autoAdvance ? <SkipForward size={16} /> : <SkipBack size={16} />}
            Auto-Advance: {autoAdvance ? 'On' : 'Off'}
          </NavButton>
        </BottomCenter>
        
        <BottomRight>
          <NavButton 
            variant="primary"
            onClick={handleNext}
            disabled={currentLessonIndex === totalLessons - 1 && 
                     currentComponentIndex === currentLesson?.components.length - 1}
          >
            Next
            <ChevronRight size={16} />
          </NavButton>
        </BottomRight>
      </BottomNav>

      {/* Achievement Popup */}
      {showAchievement && (
        <AchievementPopup>
          <AchievementIcon>{showAchievement.icon}</AchievementIcon>
          <AchievementTitle>{showAchievement.title}</AchievementTitle>
          <AchievementDescription>{showAchievement.description}</AchievementDescription>
        </AchievementPopup>
      )}
    </PlayerContainer>
  );
};

export default LessonPlayer;