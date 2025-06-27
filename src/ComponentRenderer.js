import React from 'react';
import styled from 'styled-components';
import { Play, Pause, Volume2, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';
import PythonPlayground from './PythonPlayground';

// Component Renderer Container
const ComponentContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: white;
`;

// Title Header Component
const TitleHeaderComponent = styled.div`
  text-align: ${props => props.align || 'center'};
  padding: 30px 20px;
  background: ${props => {
    switch(props.theme) {
      case 'primary': return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
      case 'success': return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
      case 'warning': return 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)';
      case 'danger': return 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
      case 'gradient': return 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)';
      default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  }};
  color: white;
  
  h1, h2, h3 {
    margin: 0;
    margin-bottom: ${props => props.subtitle ? '10px' : '0'};
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
  
  .subtitle {
    opacity: 0.9;
    font-size: 16px;
    margin: 0;
  }
`;

// Text Block Component
const TextBlockComponent = styled.div`
  padding: 25px;
  line-height: 1.6;
  color: #333;
  
  &.paragraph {
    font-size: 16px;
  }
  
  &.heading {
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
  }
  
  &.bullet-list ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  
  &.numbered-list ol {
    list-style-type: decimal;
    padding-left: 20px;
  }
  
  &.quote {
    font-style: italic;
    border-left: 4px solid #4CAF50;
    padding-left: 20px;
    background: #f8f9fa;
    margin: 10px 0;
  }
`;

// Two Column Layout Component
const TwoColumnComponent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 25px;
  min-height: 200px;
`;

const ColumnArea = styled.div`
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
  text-align: center;
  
  &:hover {
    border-color: #4CAF50;
    background: #f0fff0;
  }
`;

// Video Player Component
const VideoPlayerComponent = styled.div`
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px;
  position: relative;
`;

const VideoArea = styled.div`
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
`;

const VideoControls = styled.div`
  background: rgba(0,0,0,0.8);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
  
  .play-button {
    background: #4CAF50;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .progress-bar {
    flex: 1;
    height: 4px;
    background: #555;
    border-radius: 2px;
    overflow: hidden;
    
    .progress {
      height: 100%;
      width: 30%;
      background: #4CAF50;
    }
  }
  
  .time {
    font-size: 12px;
    color: #ccc;
  }
`;

// Card Layout Component
const CardLayoutComponent = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  }
  
  .card-header {
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .card-content {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }
`;

// Callout Box Component
const CalloutBoxComponent = styled.div`
  margin: 20px;
  border-radius: 12px;
  overflow: hidden;
  border-left: 6px solid #4CAF50;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const CalloutHeader = styled.div`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
`;

const CalloutContent = styled.div`
  background: #f8fff8;
  padding: 20px;
  color: #333;
  line-height: 1.6;
`;

// AI Prompt Component
const AIPromptComponent = styled.div`
  margin: 20px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const AIPromptHeader = styled.div`
  padding: 20px;
  text-align: center;
  
  .icon {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .difficulty {
    font-size: 12px;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const AIPromptContent = styled.div`
  background: rgba(255,255,255,0.1);
  padding: 20px;
  
  .prompt-text {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .hints {
    font-size: 14px;
    opacity: 0.9;
    
    .hint-item {
      margin: 8px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

// Quiz Component
const QuizComponent = styled.div`
  margin: 20px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  border: 2px solid #e0e0e0;
`;

const QuizHeader = styled.div`
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  color: white;
  padding: 20px;
  text-align: center;
  
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .meta {
    font-size: 14px;
    opacity: 0.9;
  }
`;

const QuizQuestion = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  
  .question-text {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
  }
  
  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    background: #f8f9fa;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #e3f2fd;
    }
    
    &.correct {
      background: #e8f5e8;
      border: 1px solid #4CAF50;
      
      .radio {
        background: #4CAF50;
        border-color: #4CAF50;
      }
    }
    
    .radio {
      width: 16px;
      height: 16px;
      border: 2px solid #ddd;
      border-radius: 50%;
      background: white;
    }
  }
`;

// Action Button Component
const ActionButtonComponent = styled.div`
  padding: 20px;
  text-align: center;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border: none;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
`;

// Main Component Renderer
const ComponentRenderer = ({ component }) => {
  const config = component.config || {};
  
  switch (component.type) {
    case 'title-header':
      const HeaderTag = config.level || 'h2';
      return (
        <ComponentContainer>
          <TitleHeaderComponent align={config.align} theme={config.theme} subtitle={config.subtitle}>
            <HeaderTag>{config.title || 'Your Title Here'}</HeaderTag>
            {config.subtitle && <p className="subtitle">{config.subtitle}</p>}
          </TitleHeaderComponent>
        </ComponentContainer>
      );
      
    case 'rich-text':
    case 'text-block':
      return (
        <ComponentContainer>
          <TextBlockComponent className={config.formatting || 'paragraph'}>
            {config.formatting === 'bullet-list' ? (
              <ul>
                {(config.content || 'Your content here...').split('\n').map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : config.formatting === 'numbered-list' ? (
              <ol>
                {(config.content || 'Your content here...').split('\n').map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ol>
            ) : (
              <div style={{ whiteSpace: 'pre-wrap' }}>{config.content || 'Your content here...'}</div>
            )}
          </TextBlockComponent>
        </ComponentContainer>
      );
      
    case 'two-column':
      const getGridTemplate = () => {
        switch(config.layout) {
          case '60-40': return '60% 40%';
          case '40-60': return '40% 60%';
          case '70-30': return '70% 30%';
          case '30-70': return '30% 70%';
          default: return '1fr 1fr';
        }
      };
      
      const renderColumnContent = (type, content, imageUrl, imageCaption, videoUrl, videoTitle) => {
        switch(type) {
          case 'image':
            return (
              <div style={{ textAlign: 'center' }}>
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={imageCaption || 'Column image'} 
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto', 
                      borderRadius: '8px',
                      marginBottom: imageCaption ? '10px' : '0'
                    }} 
                  />
                ) : (
                  <div style={{
                    background: '#f8f9fa',
                    border: '2px dashed #dee2e6',
                    borderRadius: '8px',
                    padding: '40px 20px',
                    color: '#666',
                    marginBottom: '0'
                  }}>
                    📷 Add Image
                  </div>
                )}
                {imageCaption && (
                  <p style={{ fontSize: '14px', color: '#666', margin: 0, fontStyle: 'italic' }}>
                    {imageCaption}
                  </p>
                )}
              </div>
            );
          case 'video':
            return (
              <div style={{ textAlign: 'center' }}>
                {videoUrl ? (
                  <div style={{
                    background: '#000',
                    borderRadius: '8px',
                    padding: '30px 20px',
                    color: 'white',
                    marginBottom: videoTitle ? '10px' : '0'
                  }}>
                    <Play size={48} style={{ marginBottom: '10px' }} />
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                      {videoTitle || 'Video'}
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                      Click to play
                    </div>
                  </div>
                ) : (
                  <div style={{
                    background: '#f8f9fa',
                    border: '2px dashed #dee2e6',
                    borderRadius: '8px',
                    padding: '40px 20px',
                    color: '#666'
                  }}>
                    🎥 Add Video
                  </div>
                )}
              </div>
            );
          default: // text
            return (
              <div style={{ 
                padding: '15px',
                color: '#333',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                fontSize: '16px'
              }}>
                {content || 'Add your content here...'}
              </div>
            );
        }
      };
      
      return (
        <ComponentContainer>
          <div style={{
            display: 'grid',
            gridTemplateColumns: getGridTemplate(),
            gap: '30px',
            padding: '25px',
            minHeight: '200px'
          }}>
            <div style={{
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              overflow: 'hidden'
            }}>
              {renderColumnContent(
                config.leftType,
                config.leftContent,
                config.leftImageUrl,
                config.leftImageCaption,
                config.leftVideoUrl,
                config.leftVideoTitle
              )}
            </div>
            
            <div style={{
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              overflow: 'hidden'
            }}>
              {renderColumnContent(
                config.rightType,
                config.rightContent,
                config.rightImageUrl,
                config.rightImageCaption,
                config.rightVideoUrl,
                config.rightVideoTitle
              )}
            </div>
          </div>
        </ComponentContainer>
      );
      
    case 'content-slide':
      // Debug the content slide config
      console.log('=== CONTENT SLIDE RENDER ===');
      console.log('Full component object:', component);
      console.log('Component config:', config);
      console.log('Config properties:', Object.keys(config));
      console.log('Config.title:', config.title);
      console.log('Config.content:', config.content);
      console.log('Config.layout:', config.layout);
      console.log('=== END CONTENT SLIDE DEBUG ===');
      
      const getSlideLayoutStyle = () => {
        const isVertical = ['image-top', 'image-bottom'].includes(config.layout);
        const isBackground = config.layout === 'image-background';
        
        if (isBackground) {
          return {
            position: 'relative',
            minHeight: '300px',
            background: config.backgroundColor || '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden'
          };
        }
        
        return {
          display: isVertical ? 'flex' : 'grid',
          flexDirection: isVertical ? 'column' : undefined,
          gridTemplateColumns: isVertical ? undefined : 
            (config.layout === 'image-left' ? '40% 60%' : '60% 40%'),
          gap: '20px',
          background: config.backgroundColor || '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          minHeight: '250px'
        };
      };
      
      const renderContentSlideMedia = () => {
        if (config.mediaType === 'video' && config.videoUrl) {
          return (
            <div style={{
              background: '#000',
              borderRadius: '8px',
              padding: '30px 20px',
              color: 'white',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Play size={48} style={{ marginBottom: '15px' }} />
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                {config.videoTitle || 'Video Player'}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>
                Click to play video
              </div>
            </div>
          );
        } else if (config.imageUrl) {
          return (
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <img 
                src={config.imageUrl} 
                alt={config.imageCaption || 'Slide image'} 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }} 
              />
              {config.imageCaption && (
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666', 
                  margin: '10px 0 0', 
                  fontStyle: 'italic' 
                }}>
                  {config.imageCaption}
                </p>
              )}
            </div>
          );
        } else {
          return (
            <div style={{
              background: '#f8f9fa',
              border: '2px dashed #dee2e6',
              borderRadius: '8px',
              padding: '40px 20px',
              textAlign: 'center',
              color: '#666',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                {config.mediaType === 'video' ? '🎥' : '📷'}
              </div>
              <div>Add {config.mediaType}</div>
            </div>
          );
        }
      };
      
      const renderContentSlideText = () => (
        <div style={{ 
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: config.layout === 'image-background' ? 'white' : '#333'
        }}>
          <h2 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '28px',
            fontWeight: 'bold',
            textShadow: config.layout === 'image-background' ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none'
          }}>
            {config.title || 'Your Slide Title'}
          </h2>
          <div style={{ 
            fontSize: '16px',
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
            textShadow: config.layout === 'image-background' ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none'
          }}>
            {config.content || 'Add your slide content here. This is perfect for explaining concepts with supporting visuals.'}
          </div>
        </div>
      );
      
      return (
        <ComponentContainer>
          <div style={getSlideLayoutStyle()}>
            {config.layout === 'image-background' ? (
              <>
                <div style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.3
                }}>
                  {renderContentSlideMedia()}
                </div>
                <div style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {renderContentSlideText()}
                </div>
              </>
            ) : (
              <>
                {(config.layout === 'image-left' || config.layout === 'image-top') && renderContentSlideMedia()}
                {renderContentSlideText()}
                {(config.layout === 'image-right' || config.layout === 'image-bottom') && renderContentSlideMedia()}
              </>
            )}
          </div>
        </ComponentContainer>
      );
      
    case 'video-block':
      return (
        <ComponentContainer>
          <VideoPlayerComponent>
            <VideoArea>
              <Play size={64} />
            </VideoArea>
            <VideoControls>
              <button className="play-button">
                <Play size={16} />
                Play
              </button>
              <div className="progress-bar">
                <div className="progress"></div>
              </div>
              <span className="time">2:34 / 8:42</span>
              <Volume2 size={16} />
            </VideoControls>
            {config.title && (
              <div style={{ padding: '15px', background: 'rgba(0,0,0,0.7)', color: 'white' }}>
                <strong>{config.title}</strong>
                {config.description && <p style={{ margin: '5px 0 0', fontSize: '14px', opacity: 0.9 }}>{config.description}</p>}
              </div>
            )}
          </VideoPlayerComponent>
        </ComponentContainer>
      );
      
    case 'card-layout':
      return (
        <ComponentContainer>
          <CardLayoutComponent>
            <Card>
              <div className="card-header">Card Title 1</div>
              <div className="card-content">This is sample content for the first card. You can add any content here.</div>
            </Card>
            <Card>
              <div className="card-header">Card Title 2</div>
              <div className="card-content">This is sample content for the second card. Cards automatically adjust their size.</div>
            </Card>
            <Card>
              <div className="card-header">Card Title 3</div>
              <div className="card-content">This is sample content for the third card. Perfect for organizing information.</div>
            </Card>
          </CardLayoutComponent>
        </ComponentContainer>
      );
      
    case 'callout-box':
      return (
        <ComponentContainer>
          <CalloutBoxComponent>
            <CalloutHeader>
              <Lightbulb size={20} />
              Important Information
            </CalloutHeader>
            <CalloutContent>
              This is a callout box that highlights important information. You can use it to draw attention to key points, tips, or warnings in your lesson.
            </CalloutContent>
          </CalloutBoxComponent>
        </ComponentContainer>
      );
      
    case 'ai-prompt':
      return (
        <ComponentContainer>
          <AIPromptComponent>
            <AIPromptHeader>
              <div className="icon">🤖</div>
              <div className="title">AI Creative Exercise</div>
              <div className="difficulty">{config.difficulty || 'Beginner'} Level</div>
            </AIPromptHeader>
            <AIPromptContent>
              <div className="prompt-text">
                {config.prompt || 'Create a story about a friendly robot who helps children learn about AI...'}
              </div>
              {config.hints && config.hints.length > 0 && (
                <div className="hints">
                  <strong>💡 Hints:</strong>
                  {config.hints.map((hint, i) => (
                    <div key={i} className="hint-item">
                      <span>•</span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </AIPromptContent>
          </AIPromptComponent>
        </ComponentContainer>
      );
      
    case 'quiz-block':
      const questions = config.questions || [{
        question: 'What is artificial intelligence?',
        type: 'multiple-choice',
        options: ['A computer program', 'A robot', 'A way for computers to think like humans', 'A video game'],
        correct: 2
      }];
      
      const renderQuestionOptions = (q, index) => {
        switch(q.type) {
          case 'true-false':
            return (
              <div className="options">
                <div className={`option ${q.correct === true ? 'correct' : ''}`}>
                  <div className="radio"></div>
                  <span>True</span>
                  {q.correct === true && <CheckCircle size={16} style={{ marginLeft: 'auto', color: '#4CAF50' }} />}
                </div>
                <div className={`option ${q.correct === false ? 'correct' : ''}`}>
                  <div className="radio"></div>
                  <span>False</span>
                  {q.correct === false && <CheckCircle size={16} style={{ marginLeft: 'auto', color: '#4CAF50' }} />}
                </div>
              </div>
            );
          case 'text-input':
            return (
              <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px', marginTop: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Type your answer here..." 
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  disabled
                />
                {q.correctAnswers && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                    💡 Correct answers: {Array.isArray(q.correctAnswers) ? q.correctAnswers.join(', ') : q.correctAnswers}
                  </div>
                )}
              </div>
            );
          case 'fill-blanks':
            const questionText = q.question.split('_____');
            return (
              <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px', marginTop: '10px' }}>
                <div style={{ lineHeight: '2', fontSize: '16px' }}>
                  {questionText.map((part, i) => (
                    <span key={i}>
                      {part}
                      {i < questionText.length - 1 && (
                        <input 
                          type="text" 
                          style={{
                            display: 'inline-block',
                            width: '100px',
                            padding: '4px 8px',
                            margin: '0 4px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            textAlign: 'center',
                            fontSize: '14px'
                          }}
                          disabled
                        />
                      )}
                    </span>
                  ))}
                </div>
                {q.blanks && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                    💡 Answers: {q.blanks.join(', ')}
                  </div>
                )}
              </div>
            );
          case 'multiple-select':
            return (
              <div className="options">
                {q.options && q.options.map((option, optIndex) => {
                  const isCorrect = Array.isArray(q.correctAnswers) ? q.correctAnswers.includes(optIndex) : q.correctAnswers === optIndex;
                  return (
                    <div key={optIndex} className={`option ${isCorrect ? 'correct' : ''}`}>
                      <div className="checkbox" style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #ddd',
                        borderRadius: '3px',
                        background: isCorrect ? '#4CAF50' : 'white',
                        borderColor: isCorrect ? '#4CAF50' : '#ddd'
                      }}></div>
                      <span>{option}</span>
                      {isCorrect && <CheckCircle size={16} style={{ marginLeft: 'auto', color: '#4CAF50' }} />}
                    </div>
                  );
                })}
              </div>
            );
          default: // multiple-choice
            return (
              <div className="options">
                {q.options && q.options.map((option, optIndex) => (
                  <div key={optIndex} className={`option ${q.correct === optIndex ? 'correct' : ''}`}>
                    <div className="radio"></div>
                    <span>{option}</span>
                    {q.correct === optIndex && <CheckCircle size={16} style={{ marginLeft: 'auto', color: '#4CAF50' }} />}
                  </div>
                ))}
              </div>
            );
        }
      };
      
      return (
        <ComponentContainer>
          <QuizComponent>
            <QuizHeader>
              <div className="title">Knowledge Check</div>
              <div className="meta">{questions.length} question{questions.length !== 1 ? 's' : ''} • Multiple Types</div>
            </QuizHeader>
            {questions.map((q, index) => (
              <QuizQuestion key={index}>
                <div className="question-text">
                  Q{index + 1}: {q.question}
                  <span style={{ 
                    fontSize: '11px', 
                    color: '#666', 
                    marginLeft: '10px',
                    padding: '2px 6px',
                    background: '#f0f0f0',
                    borderRadius: '10px'
                  }}>
                    {q.type?.replace('-', ' ') || 'multiple choice'}
                  </span>
                </div>
                {renderQuestionOptions(q, index)}
                {q.explanation && (
                  <div style={{ 
                    marginTop: '10px', 
                    padding: '10px', 
                    background: '#e8f5e8', 
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#2d5016',
                    borderLeft: '3px solid #4CAF50'
                  }}>
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </QuizQuestion>
            ))}
          </QuizComponent>
        </ComponentContainer>
      );
      
    case 'button-action':
      const getButtonStyle = () => {
        switch(config.buttonStyle) {
          case 'secondary': return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
          case 'success': return 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)';
          case 'warning': return 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)';
          case 'danger': return 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
          default: return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        }
      };

      const handleButtonClick = () => {
        switch(config.actionType) {
          case 'link':
            if (config.actionUrl) {
              window.open(config.actionUrl, '_blank');
            }
            break;
          case 'show-message':
            if (config.actionMessage) {
              alert(config.actionMessage);
            }
            break;
          case 'next-lesson':
            console.log('Next lesson functionality would be implemented here');
            break;
          case 'complete-lesson':
            console.log('Complete lesson functionality would be implemented here');
            break;
          default:
            console.log('Button clicked but no action configured');
        }
      };

      return (
        <ComponentContainer>
          <ActionButtonComponent>
            <ActionButton 
              style={{ background: getButtonStyle() }}
              onClick={handleButtonClick}
            >
              {config.icon && <span>{config.icon}</span>}
              {config.text || 'Click Me!'}
            </ActionButton>
          </ActionButtonComponent>
        </ComponentContainer>
      );
      
    case 'python-playground':
      // Debug the config
      console.log('=== PYTHON PLAYGROUND RENDER ===');
      console.log('Full component object:', component);
      console.log('Component config:', config);
      console.log('Config properties:', Object.keys(config));
      console.log('Config.title:', config.title);
      console.log('Config.code:', config.code);
      console.log('=== END DEBUG ===');
      
      // Convert config to the format expected by PythonPlayground
      const playgroundElement = {
        content: {
          title: config.title || 'Python Exercise',
          description: config.description || 'Interactive Python coding exercise',
          explanation: config.explanation || 'Write and run Python code in this interactive environment.',
          code: config.code || '# Python Exercise\nprint("Hello, World!")',
          expectedOutput: config.expectedOutput || null,
          difficulty: config.difficulty || 'beginner',
          ageGroup: config.ageGroup || '10-11',
          yearLevel: config.yearLevel || 1,
          icon: '🐍',
          learningObjectives: config.hints || [],
          prerequisites: config.prerequisites || [],
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          template: config.template || null,
          outputType: config.outputType || 'fuzzy'
        }
      };
      
      return (
        <ComponentContainer>
          <PythonPlayground 
            key={`python-${JSON.stringify(config)}`}
            element={playgroundElement}
            studentId="course-builder-student"
            onComplete={(assessment) => {
              console.log('Python exercise completed:', assessment);
            }}
          />
        </ComponentContainer>
      );
      
    default:
      return (
        <ComponentContainer>
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            <AlertCircle size={48} style={{ marginBottom: '15px' }} />
            <div>Component type "{component.type}" not found</div>
            <div style={{ fontSize: '12px', marginTop: '10px' }}>
              This component needs a visual template
            </div>
          </div>
        </ComponentContainer>
      );
  }
};

export default ComponentRenderer;