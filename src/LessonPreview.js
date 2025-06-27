import React, { useState } from 'react';
import styled from 'styled-components';
import {
  X,
  Play,
  ChevronRight,
  ChevronLeft,
  Eye,
  Clock,
  Award,
  Star,
  CheckCircle,
  Video,
  FileText,
  Brain,
  Target,
  MessageSquare,
  Shield,
  Code,
  Image,
  Layers,
  Type,
  Columns,
  Square,
  AlertCircle,
  MousePointer
} from 'lucide-react';

const PreviewContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PreviewModal = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 0;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
`;

const PreviewTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const PreviewContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const ComponentsNav = styled.div`
  width: 250px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  overflow-y: auto;
  border-right: 2px solid rgba(255, 255, 255, 0.2);
`;

const NavTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  opacity: 0.9;
`;

const ComponentNavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  background: ${props => props.active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'};
  border: ${props => props.active ? '2px solid rgba(255,255,255,0.4)' : '2px solid transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.15);
  }
`;

const ComponentCounter = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
  margin-left: auto;
`;

const MainPreview = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ComponentPreview = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
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

const VideoPreview = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  border: 2px dashed rgba(255, 255, 255, 0.3);
`;

const TextContent = styled.div`
  line-height: 1.6;
  font-size: 16px;
  white-space: pre-wrap;
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const QuizQuestion = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
`;

const QuestionText = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
`;

const QuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 15px;
`;

const QuizOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  border: ${props => props.correct ? '2px solid #4CAF50' : '2px solid transparent'};
`;

const AIPromptContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
`;

const PromptText = styled.div`
  font-size: 16px;
  margin-bottom: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
`;

const HintsList = styled.div`
  margin-top: 15px;
`;

const HintItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
  font-size: 14px;
  opacity: 0.9;
`;

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
  margin-bottom: 8px;
  font-size: 15px;
`;

const LessonPreview = ({ lesson, onClose }) => {
  const [activeComponent, setActiveComponent] = useState(0);

  console.log('LessonPreview received:', lesson);

  if (!lesson || !lesson.components) {
    console.log('No lesson or components found');
    return null;
  }

  const getComponentIcon = (type) => {
    switch (type) {
      case 'rich-text': return FileText;
      case 'title-header': return Type;
      case 'text-block': return FileText;
      case 'video-block': return Video;
      case 'image-block': return Image;
      case 'two-column': return Columns;
      case 'card-layout': return Square;
      case 'callout-box': return AlertCircle;
      case 'ai-prompt': return Brain;
      case 'quiz-block': return Target;
      case 'button-action': return MousePointer;
      case 'code-block': return Code;
      case 'discussion': return MessageSquare;
      case 'ai-compare': return Layers;
      case 'safety-check': return Shield;
      default: return FileText;
    }
  };

  const renderComponentPreview = (component) => {
    const IconComponent = getComponentIcon(component.type);
    
    switch (component.type) {
      case 'rich-text':
        return (
          <ComponentPreview>
            <ComponentHeader>
              <FileText size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Rich Text</ComponentBadge>
            </ComponentHeader>
            <div style={{
              fontSize: component.config?.fontSize || '16px',
              textAlign: component.config?.textAlign || 'left',
              color: component.config?.textColor || '#000000',
              backgroundColor: component.config?.backgroundColor || 'transparent',
              padding: component.config?.padding || '20px',
              lineHeight: '1.6',
              borderRadius: '8px'
            }}>
              {component.config?.content || 'No content available'}
            </div>
          </ComponentPreview>
        );

      case 'title-header':
        const HeaderTag = component.config?.style === 'h1' ? 'h1' : component.config?.style === 'h2' ? 'h2' : 'h3';
        const fontSize = component.config?.style === 'h1' ? '32px' : component.config?.style === 'h2' ? '24px' : '20px';
        
        return (
          <ComponentPreview>
            <ComponentHeader>
              <Type size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Title & Header</ComponentBadge>
            </ComponentHeader>
            <div style={{ textAlign: component.config?.textAlign || 'center' }}>
              <HeaderTag style={{
                fontSize,
                color: component.config?.textColor || '#2d3748',
                backgroundColor: component.config?.backgroundColor || 'transparent',
                margin: '0 0 10px 0',
                padding: '10px'
              }}>
                {component.config?.title || 'Your Title Here'}
              </HeaderTag>
              {component.config?.subtitle && (
                <p style={{
                  fontSize: '16px',
                  color: component.config?.textColor || '#2d3748',
                  opacity: 0.7,
                  margin: '0'
                }}>
                  {component.config?.subtitle}
                </p>
              )}
            </div>
          </ComponentPreview>
        );

      case 'two-column':
        const leftWidth = component.config?.leftWidth || '50%';
        const rightWidth = `calc(100% - ${leftWidth} - ${component.config?.gap || '20px'})`;
        
        return (
          <ComponentPreview>
            <ComponentHeader>
              <Columns size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Two Column Layout</ComponentBadge>
            </ComponentHeader>
            <div style={{
              display: 'flex',
              gap: component.config?.gap || '20px',
              alignItems: component.config?.verticalAlign || 'top'
            }}>
              <div style={{
                width: leftWidth,
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                lineHeight: '1.6'
              }}>
                {component.config?.leftContent || 'Left column content...'}
              </div>
              <div style={{
                width: rightWidth,
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                lineHeight: '1.6'
              }}>
                {component.config?.rightContent || 'Right column content...'}
              </div>
            </div>
          </ComponentPreview>
        );

      case 'text-block':
        return (
          <ComponentPreview>
            <ComponentHeader>
              <FileText size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Text Content</ComponentBadge>
            </ComponentHeader>
            <TextContent>
              {component.config?.content || 'No content available'}
            </TextContent>
          </ComponentPreview>
        );

      case 'quiz-block':
        return (
          <ComponentPreview>
            <ComponentHeader>
              <Target size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Knowledge Check</ComponentBadge>
            </ComponentHeader>
            <QuizContainer>
              {component.config?.questions?.map((q, index) => (
                <QuizQuestion key={index}>
                  <QuestionText>Question {index + 1}: {q.question}</QuestionText>
                  <QuizOptions>
                    {q.options?.map((option, optIndex) => (
                      <QuizOption key={optIndex} correct={q.correct === optIndex}>
                        <span>{q.correct === optIndex ? '✅' : '⭕'}</span>
                        {option}
                        {q.correct === optIndex && <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#4CAF50' }}>Correct Answer</span>}
                      </QuizOption>
                    ))}
                  </QuizOptions>
                </QuizQuestion>
              )) || <div>No questions configured</div>}
            </QuizContainer>
          </ComponentPreview>
        );

      case 'button-action':
        return (
          <ComponentPreview>
            <ComponentHeader>
              <MousePointer size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Action Button</ComponentBadge>
            </ComponentHeader>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <button style={{
                padding: '14px 28px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                background: component.config?.backgroundColor || '#4299e1',
                color: component.config?.textColor || '#ffffff'
              }}>
                {component.config?.text || 'Click Me'}
              </button>
              <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.7 }}>
                Action: {component.config?.action || 'next-page'}
              </div>
            </div>
          </ComponentPreview>
        );

      case 'card-layout':
        return (
          <ComponentPreview>
            <ComponentHeader>
              <Square size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Card Container</ComponentBadge>
            </ComponentHeader>
            <div style={{
              background: component.config?.backgroundColor || '#f7fafc',
              border: `1px solid ${component.config?.borderColor || '#e2e8f0'}`,
              borderRadius: component.config?.borderRadius || '12px',
              padding: component.config?.padding || '24px',
              margin: '10px 0'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>
                {component.config?.title || 'Card Title'}
              </h4>
              <p style={{ margin: 0, lineHeight: '1.6', color: '#4a5568' }}>
                {component.config?.content || 'Card content goes here...'}
              </p>
            </div>
          </ComponentPreview>
        );

      case 'callout-box':
        const calloutStyles = {
          info: { background: 'rgba(59, 130, 246, 0.1)', border: '#3182ce', icon: 'ℹ️' },
          warning: { background: 'rgba(245, 158, 11, 0.1)', border: '#d69e2e', icon: '⚠️' },
          success: { background: 'rgba(34, 197, 94, 0.1)', border: '#38a169', icon: '✅' },
          error: { background: 'rgba(239, 68, 68, 0.1)', border: '#e53e3e', icon: '❌' }
        };
        const style = calloutStyles[component.config?.type || 'info'];
        
        return (
          <ComponentPreview>
            <ComponentHeader>
              <AlertCircle size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Callout Box</ComponentBadge>
            </ComponentHeader>
            <div style={{
              background: style.background,
              border: `1px solid ${style.border}`,
              borderLeft: `4px solid ${style.border}`,
              borderRadius: '8px',
              padding: '15px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <span style={{ fontSize: '16px' }}>{style.icon}</span>
              <div>
                <h5 style={{ margin: '0 0 8px 0', color: 'white' }}>
                  {component.config?.title || 'Important Note'}
                </h5>
                <p style={{ margin: 0, lineHeight: '1.4', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                  {component.config?.content || 'This is an important piece of information...'}
                </p>
              </div>
            </div>
          </ComponentPreview>
        );
      
      case 'video-block':
        return (
          <ComponentPreview>
            <ComponentHeader>
              <Video size={20} />
              <ComponentTitle>{component.config?.title || component.name}</ComponentTitle>
              <ComponentBadge>Video Lesson</ComponentBadge>
            </ComponentHeader>
            <VideoPreview>
              <Video size={48} style={{ marginBottom: '15px' }} />
              <h4>{component.config?.title || 'Video Title'}</h4>
              <p style={{ opacity: 0.8, marginBottom: '15px' }}>
                {component.config?.description || 'No description available'}
              </p>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>
                URL: {component.config?.url || 'Not specified'}<br/>
                Duration: {component.config?.duration || 'Unknown'} minutes
              </div>
            </VideoPreview>
          </ComponentPreview>
        );
      
      case 'ai-prompt':
        return (
          <ComponentPreview>
            <ComponentHeader>
              <Brain size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>AI Exercise</ComponentBadge>
            </ComponentHeader>
            <AIPromptContainer>
              <PromptText>
                {component.config?.prompt || 'No prompt specified'}
              </PromptText>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ fontSize: '14px' }}>
                  <strong>Expected Length:</strong> {component.config?.expectedLength || 'Not specified'}
                </div>
                <div style={{ fontSize: '14px' }}>
                  <strong>Difficulty:</strong> {component.config?.difficulty || 'Not specified'}
                </div>
              </div>
              {component.config?.hints && component.config.hints.length > 0 && (
                <HintsList>
                  <strong>Hints:</strong>
                  {component.config.hints.map((hint, index) => (
                    <HintItem key={index}>
                      <span>💡</span>
                      {hint}
                    </HintItem>
                  ))}
                </HintsList>
              )}
            </AIPromptContainer>
          </ComponentPreview>
        );
      
      case 'quiz-block':
        return (
          <ComponentPreview>
            <ComponentHeader>
              <Target size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Knowledge Quiz</ComponentBadge>
            </ComponentHeader>
            <QuizContainer>
              {component.config?.questions?.map((q, index) => (
                <QuizQuestion key={index}>
                  <QuestionText>Question {index + 1}: {q.question}</QuestionText>
                  <QuizOptions>
                    {q.options?.map((option, optIndex) => (
                      <QuizOption key={optIndex} correct={q.correct === optIndex}>
                        <span>{q.correct === optIndex ? '✅' : '⭕'}</span>
                        {option}
                        {q.correct === optIndex && <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#4CAF50' }}>Correct Answer</span>}
                      </QuizOption>
                    ))}
                  </QuizOptions>
                </QuizQuestion>
              )) || <div>No questions configured</div>}
            </QuizContainer>
          </ComponentPreview>
        );
      
      case 'safety-check':
        return (
          <ComponentPreview>
            <ComponentHeader>
              <Shield size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>Safety Check</ComponentBadge>
            </ComponentHeader>
            <SafetyContainer>
              <SafetyTitle>
                <Shield size={18} />
                {component.config?.title || 'Safety Reminder'}
              </SafetyTitle>
              <SafetyPoints>
                {component.config?.points?.map((point, index) => (
                  <SafetyPoint key={index}>
                    <span style={{ color: '#4CAF50' }}>✓</span>
                    {point}
                  </SafetyPoint>
                )) || <SafetyPoint>No safety points configured</SafetyPoint>}
              </SafetyPoints>
            </SafetyContainer>
          </ComponentPreview>
        );
      
      default:
        return (
          <ComponentPreview>
            <ComponentHeader>
              <IconComponent size={20} />
              <ComponentTitle>{component.name}</ComponentTitle>
              <ComponentBadge>{component.type}</ComponentBadge>
            </ComponentHeader>
            <div style={{ opacity: 0.7 }}>
              This component type is not yet supported in preview mode.
            </div>
          </ComponentPreview>
        );
    }
  };

  return (
    <PreviewContainer>
      <PreviewModal>
        <PreviewHeader>
          <PreviewTitle>
            <Eye size={24} />
            Lesson Preview: {lesson.title}
          </PreviewTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              {lesson.components.length} components • {lesson.duration} minutes • {lesson.points} points
            </div>
            <CloseButton onClick={onClose}>
              <X size={20} />
            </CloseButton>
          </div>
        </PreviewHeader>
        
        <PreviewContent>
          <ComponentsNav>
            <NavTitle>Lesson Components</NavTitle>
            {lesson.components.map((component, index) => {
              const IconComponent = getComponentIcon(component.type);
              return (
                <ComponentNavItem
                  key={component.id}
                  active={activeComponent === index}
                  onClick={() => setActiveComponent(index)}
                >
                  <IconComponent size={16} />
                  <span style={{ fontSize: '13px', flex: 1 }}>
                    {component.name}
                  </span>
                  <ComponentCounter>{index + 1}</ComponentCounter>
                </ComponentNavItem>
              );
            })}
          </ComponentsNav>
          
          <MainPreview>
            {lesson.components.length > 0 ? (
              renderComponentPreview(lesson.components[activeComponent])
            ) : (
              <div style={{ textAlign: 'center', padding: '50px', opacity: 0.7 }}>
                <Eye size={48} style={{ marginBottom: '20px' }} />
                <h3>No Components Yet</h3>
                <p>Add components to this lesson to see the preview</p>
              </div>
            )}
          </MainPreview>
        </PreviewContent>
      </PreviewModal>
    </PreviewContainer>
  );
};

export default LessonPreview;