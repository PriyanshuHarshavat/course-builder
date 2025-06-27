import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PythonExerciseBuilder from './PythonExerciseBuilder';
import AIPythonGenerator from './AIPythonGenerator';
import QuizBuilder from './QuizBuilder';
import AIQuizGenerator from './AIQuizGenerator';
import AIContentSlideBuilder from './AIContentSlideBuilder';
import AIExerciseBuilder from './AIExerciseBuilder';
import {
  Save,
  X,
  Eye,
  Code,
  Type,
  Video,
  Image,
  Brain,
  Target,
  MessageSquare,
  Shield,
  Award,
  Plus,
  Trash2,
  Move,
  Settings,
  Upload,
  Link,
  Play,
  FileText,
  List,
  CheckCircle,
  Edit3,
  Layers
} from 'lucide-react';

// Editor Container
const EditorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const EditorModal = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const EditorTitle = styled.h2`
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
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const EditorContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  opacity: 0.9;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  option {
    background: #333;
    color: white;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
`;

const Button = styled.button`
  background: ${props => 
    props.variant === 'primary' ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.variant === 'secondary' ? 'linear-gradient(135deg, #2196F3, #1976D2)' :
    props.variant === 'danger' ? 'linear-gradient(135deg, #f44336, #d32f2f)' :
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

const PreviewContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-top: 15px;
`;

const PreviewTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuestionItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const QuestionText = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 15px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  
  &.correct {
    color: #4CAF50;
    font-weight: bold;
  }
`;

const HintsList = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 10px;
  margin-top: 10px;
`;

const HintItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
  font-size: 13px;
`;

const BuilderToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;

const ToggleButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'rgba(255, 255, 255, 0.2)'};
  border: 2px solid ${props => props.active ? '#4CAF50' : 'rgba(255, 255, 255, 0.3)'};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-1px);
  }
`;

// Component Editor Main Component
const ComponentEditor = ({ component, onSave, onClose }) => {
  const [config, setConfig] = useState(component?.config || {});
  const [showPreview, setShowPreview] = useState(false);
  const [useAIBuilder, setUseAIBuilder] = useState(true);

  useEffect(() => {
    if (component?.config) {
      setConfig(component.config);
    }
  }, [component]);

  const handleSave = () => {
    console.log('Saving component with config:', config);
    console.log('Full component being saved:', { ...component, config });
    onSave({ ...component, config });
  };

  const updateConfig = (key, value) => {
    console.log('Updating config:', key, '=', value);
    setConfig(prev => {
      const newConfig = { ...prev, [key]: value };
      console.log('New config after update:', newConfig);
      return newConfig;
    });
  };

  const getComponentIcon = (type) => {
    switch (type) {
      case 'text-block': return FileText;
      case 'title-header': return Type;
      case 'content-slide': return Layers;
      case 'two-column': return Layers;
      case 'video-block': return Video;
      case 'image-block': return Image;
      case 'python-playground': return Brain;
      case 'ai-prompt': return Brain;
      case 'quiz-block': return Target;
      case 'code-block': return Code;
      case 'discussion': return MessageSquare;
      case 'ai-compare': return Layers;
      case 'safety-check': return Shield;
      case 'gamification': return Award;
      default: return Settings;
    }
  };

  const renderTextBlockEditor = () => (
    <>
      <FormGroup>
        <Label>Content</Label>
        <TextArea
          value={config.content || ''}
          onChange={(e) => updateConfig('content', e.target.value)}
          placeholder="Enter your lesson content here..."
          rows={8}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Formatting Style</Label>
        <Select
          value={config.formatting || 'paragraph'}
          onChange={(e) => updateConfig('formatting', e.target.value)}
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading">Heading</option>
          <option value="bullet-list">Bullet List</option>
          <option value="numbered-list">Numbered List</option>
          <option value="quote">Quote</option>
        </Select>
      </FormGroup>
    </>
  );

  const renderTitleHeaderEditor = () => (
    <>
      <FormGroup>
        <Label>Title Text</Label>
        <Input
          value={config.title || ''}
          onChange={(e) => updateConfig('title', e.target.value)}
          placeholder="Enter your title here..."
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Subtitle (Optional)</Label>
        <Input
          value={config.subtitle || ''}
          onChange={(e) => updateConfig('subtitle', e.target.value)}
          placeholder="Enter subtitle..."
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Header Level</Label>
        <Select
          value={config.level || 'h1'}
          onChange={(e) => updateConfig('level', e.target.value)}
        >
          <option value="h1">Large Header (H1)</option>
          <option value="h2">Medium Header (H2)</option>
          <option value="h3">Small Header (H3)</option>
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label>Text Alignment</Label>
        <Select
          value={config.align || 'center'}
          onChange={(e) => updateConfig('align', e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label>Color Theme</Label>
        <Select
          value={config.theme || 'default'}
          onChange={(e) => updateConfig('theme', e.target.value)}
        >
          <option value="default">Default</option>
          <option value="primary">Primary Blue</option>
          <option value="success">Success Green</option>
          <option value="warning">Warning Orange</option>
          <option value="danger">Danger Red</option>
          <option value="gradient">Rainbow Gradient</option>
        </Select>
      </FormGroup>
    </>
  );

  const renderContentSlideEditor = () => (
    <>
      <BuilderToggle>
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Builder Mode:</span>
        <ToggleButton
          active={useAIBuilder}
          onClick={() => setUseAIBuilder(true)}
        >
          🤖 AI Generator
        </ToggleButton>
        <ToggleButton
          active={!useAIBuilder}
          onClick={() => setUseAIBuilder(false)}
        >
          📝 Manual Builder
        </ToggleButton>
      </BuilderToggle>
      
      {useAIBuilder ? (
        <AIContentSlideBuilder
          onGenerate={(slideConfig) => {
            console.log('Content slide generated:', slideConfig);
            console.log('Current config before slide update:', config);
            
            // Force a clean config update
            setConfig(prevConfig => {
              const newConfig = { ...slideConfig };
              console.log('Setting new slide config:', newConfig);
              return newConfig;
            });
          }}
          onClose={() => {}}
        />
      ) : (
        <>
          <FormGroup>
            <Label>Slide Title</Label>
            <Input
              value={config.title || ''}
              onChange={(e) => updateConfig('title', e.target.value)}
              placeholder="Enter slide title..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Slide Content</Label>
            <TextArea
              value={config.content || ''}
              onChange={(e) => updateConfig('content', e.target.value)}
              placeholder="Add your slide content here..."
              rows={6}
            />
          </FormGroup>

          <FormGroup>
            <Label>Layout Style</Label>
            <Select
              value={config.layout || 'image-right'}
              onChange={(e) => updateConfig('layout', e.target.value)}
            >
              <option value="image-right">Image Right, Text Left</option>
              <option value="image-left">Image Left, Text Right</option>
              <option value="image-top">Image Top, Text Bottom</option>
              <option value="image-bottom">Text Top, Image Bottom</option>
              <option value="image-background">Image Background with Text Overlay</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Media Type</Label>
            <Select
              value={config.mediaType || 'image'}
              onChange={(e) => updateConfig('mediaType', e.target.value)}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </Select>
          </FormGroup>

          {config.mediaType === 'image' && (
            <>
              <FormGroup>
                <Label>Image URL</Label>
                <Input
                  value={config.imageUrl || ''}
                  onChange={(e) => updateConfig('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </FormGroup>
              <FormGroup>
                <Label>Image Caption (Optional)</Label>
                <Input
                  value={config.imageCaption || ''}
                  onChange={(e) => updateConfig('imageCaption', e.target.value)}
                  placeholder="Image description..."
                />
              </FormGroup>
            </>
          )}

          {config.mediaType === 'video' && (
            <>
              <FormGroup>
                <Label>Video URL</Label>
                <Input
                  value={config.videoUrl || ''}
                  onChange={(e) => updateConfig('videoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </FormGroup>
              <FormGroup>
                <Label>Video Title (Optional)</Label>
                <Input
                  value={config.videoTitle || ''}
                  onChange={(e) => updateConfig('videoTitle', e.target.value)}
                  placeholder="Video title..."
                />
              </FormGroup>
            </>
          )}

          <FormGroup>
            <Label>Background Color</Label>
            <Select
              value={config.backgroundColor || '#ffffff'}
              onChange={(e) => updateConfig('backgroundColor', e.target.value)}
            >
              <option value="#ffffff">White</option>
              <option value="#f8f9fa">Light Gray</option>
              <option value="#e3f2fd">Light Blue</option>
              <option value="#f3e5f5">Light Purple</option>
              <option value="#e8f5e8">Light Green</option>
              <option value="#fff3e0">Light Orange</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Text Theme</Label>
            <Select
              value={config.theme || 'default'}
              onChange={(e) => updateConfig('theme', e.target.value)}
            >
              <option value="default">Default</option>
              <option value="minimal">Minimal</option>
              <option value="bold">Bold & Modern</option>
              <option value="elegant">Elegant</option>
            </Select>
          </FormGroup>
        </>
      )}
    </>
  );

  const renderTwoColumnEditor = () => (
    <>
      <FormGroup>
        <Label>Left Column Type</Label>
        <Select
          value={config.leftType || 'text'}
          onChange={(e) => updateConfig('leftType', e.target.value)}
        >
          <option value="text">Text Content</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </Select>
      </FormGroup>

      {config.leftType === 'text' && (
        <FormGroup>
          <Label>Left Column Content</Label>
          <TextArea
            value={config.leftContent || ''}
            onChange={(e) => updateConfig('leftContent', e.target.value)}
            placeholder="Enter content for the left column..."
            rows={6}
          />
        </FormGroup>
      )}

      {config.leftType === 'image' && (
        <>
          <FormGroup>
            <Label>Left Column Image URL</Label>
            <Input
              value={config.leftImageUrl || ''}
              onChange={(e) => updateConfig('leftImageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </FormGroup>
          <FormGroup>
            <Label>Image Caption</Label>
            <Input
              value={config.leftImageCaption || ''}
              onChange={(e) => updateConfig('leftImageCaption', e.target.value)}
              placeholder="Image description..."
            />
          </FormGroup>
        </>
      )}

      {config.leftType === 'video' && (
        <>
          <FormGroup>
            <Label>Left Column Video URL</Label>
            <Input
              value={config.leftVideoUrl || ''}
              onChange={(e) => updateConfig('leftVideoUrl', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </FormGroup>
          <FormGroup>
            <Label>Video Title</Label>
            <Input
              value={config.leftVideoTitle || ''}
              onChange={(e) => updateConfig('leftVideoTitle', e.target.value)}
              placeholder="Video title..."
            />
          </FormGroup>
        </>
      )}

      <FormGroup>
        <Label>Right Column Type</Label>
        <Select
          value={config.rightType || 'text'}
          onChange={(e) => updateConfig('rightType', e.target.value)}
        >
          <option value="text">Text Content</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </Select>
      </FormGroup>

      {config.rightType === 'text' && (
        <FormGroup>
          <Label>Right Column Content</Label>
          <TextArea
            value={config.rightContent || ''}
            onChange={(e) => updateConfig('rightContent', e.target.value)}
            placeholder="Enter content for the right column..."
            rows={6}
          />
        </FormGroup>
      )}

      {config.rightType === 'image' && (
        <>
          <FormGroup>
            <Label>Right Column Image URL</Label>
            <Input
              value={config.rightImageUrl || ''}
              onChange={(e) => updateConfig('rightImageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </FormGroup>
          <FormGroup>
            <Label>Image Caption</Label>
            <Input
              value={config.rightImageCaption || ''}
              onChange={(e) => updateConfig('rightImageCaption', e.target.value)}
              placeholder="Image description..."
            />
          </FormGroup>
        </>
      )}

      {config.rightType === 'video' && (
        <>
          <FormGroup>
            <Label>Right Column Video URL</Label>
            <Input
              value={config.rightVideoUrl || ''}
              onChange={(e) => updateConfig('rightVideoUrl', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </FormGroup>
          <FormGroup>
            <Label>Video Title</Label>
            <Input
              value={config.rightVideoTitle || ''}
              onChange={(e) => updateConfig('rightVideoTitle', e.target.value)}
              placeholder="Video title..."
            />
          </FormGroup>
        </>
      )}

      <FormGroup>
        <Label>Column Layout</Label>
        <Select
          value={config.layout || '50-50'}
          onChange={(e) => updateConfig('layout', e.target.value)}
        >
          <option value="50-50">Equal Columns (50/50)</option>
          <option value="60-40">Left Larger (60/40)</option>
          <option value="40-60">Right Larger (40/60)</option>
          <option value="70-30">Left Much Larger (70/30)</option>
          <option value="30-70">Right Much Larger (30/70)</option>
        </Select>
      </FormGroup>
    </>
  );

  const renderVideoBlockEditor = () => (
    <>
      <FormGroup>
        <Label>Video Title</Label>
        <Input
          value={config.title || ''}
          onChange={(e) => updateConfig('title', e.target.value)}
          placeholder="Enter video title..."
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Video URL</Label>
        <Input
          type="url"
          value={config.url || ''}
          onChange={(e) => updateConfig('url', e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Description</Label>
        <TextArea
          value={config.description || ''}
          onChange={(e) => updateConfig('description', e.target.value)}
          placeholder="Describe what students will learn from this video..."
          rows={4}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Video Type</Label>
        <Select
          value={config.videoType || 'youtube'}
          onChange={(e) => updateConfig('videoType', e.target.value)}
        >
          <option value="youtube">YouTube</option>
          <option value="vimeo">Vimeo</option>
          <option value="direct">Direct Link</option>
          <option value="upload">Upload File</option>
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label>Duration (minutes)</Label>
        <Input
          type="number"
          value={config.duration || ''}
          onChange={(e) => updateConfig('duration', e.target.value)}
          placeholder="5"
        />
      </FormGroup>
    </>
  );

  const renderAIPromptEditor = () => (
    <AIExerciseBuilder
      onGenerate={(exerciseConfig) => {
        console.log('AI exercise generated:', exerciseConfig);
        console.log('Current config before exercise update:', config);
        
        // Force a clean config update
        setConfig(prevConfig => {
          const newConfig = { ...exerciseConfig };
          console.log('Setting new exercise config:', newConfig);
          return newConfig;
        });
      }}
      onClose={() => {}}
    />
  );

  const renderQuizEditor = () => (
    <>
      <BuilderToggle>
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Builder Mode:</span>
        <ToggleButton
          active={useAIBuilder}
          onClick={() => setUseAIBuilder(true)}
        >
          🤖 AI Generator
        </ToggleButton>
        <ToggleButton
          active={!useAIBuilder}
          onClick={() => setUseAIBuilder(false)}
        >
          📝 Template Builder
        </ToggleButton>
      </BuilderToggle>
      
      {useAIBuilder ? (
        <AIQuizGenerator
          onGenerate={(quizConfig) => {
            console.log('Quiz generated:', quizConfig);
            console.log('Current config before quiz update:', config);
            
            // Force a clean config update
            setConfig(prevConfig => {
              const newConfig = { ...quizConfig };
              console.log('Setting new quiz config:', newConfig);
              return newConfig;
            });
          }}
          onClose={() => {}}
        />
      ) : (
        <QuizBuilder
          onGenerate={(quizConfig) => {
            setConfig(quizConfig);
          }}
          ageGroup="10-11" // TODO: Get from course context
        />
      )}
    </>
  );

  const renderPythonPlaygroundEditor = () => (
    <AIPythonGenerator
      onGenerate={(exerciseConfig) => {
        console.log('Python exercise generated:', exerciseConfig);
        console.log('Current config before update:', config);
        
        // Force a clean config update
        setConfig(prevConfig => {
          const newConfig = { ...exerciseConfig };
          console.log('Setting new config:', newConfig);
          return newConfig;
        });
      }}
      onClose={() => {}}
    />
  );

  const renderSafetyCheckEditor = () => (
    <>
      <FormGroup>
        <Label>Safety Title</Label>
        <Input
          value={config.title || ''}
          onChange={(e) => updateConfig('title', e.target.value)}
          placeholder="Remember: Stay Safe Online!"
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Safety Points (one per line)</Label>
        <TextArea
          value={config.points ? config.points.join('\n') : ''}
          onChange={(e) => updateConfig('points', e.target.value.split('\n').filter(p => p.trim()))}
          placeholder="Never share personal information&#10;Ask an adult if unsure&#10;Be kind to others"
          rows={6}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Safety Level</Label>
        <Select
          value={config.level || 'reminder'}
          onChange={(e) => updateConfig('level', e.target.value)}
        >
          <option value="reminder">Friendly Reminder</option>
          <option value="warning">Important Warning</option>
          <option value="critical">Critical Safety Alert</option>
        </Select>
      </FormGroup>
    </>
  );

  const renderActionButtonEditor = () => (
    <>
      <FormGroup>
        <Label>Button Text</Label>
        <Input
          value={config.text || ''}
          onChange={(e) => updateConfig('text', e.target.value)}
          placeholder="Enter button text..."
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Button Action</Label>
        <Select
          value={config.actionType || 'none'}
          onChange={(e) => updateConfig('actionType', e.target.value)}
        >
          <option value="none">No Action</option>
          <option value="link">Open Link</option>
          <option value="next-lesson">Next Lesson</option>
          <option value="complete-lesson">Complete Lesson</option>
          <option value="show-message">Show Message</option>
        </Select>
      </FormGroup>
      
      {config.actionType === 'link' && (
        <FormGroup>
          <Label>Link URL</Label>
          <Input
            value={config.actionUrl || ''}
            onChange={(e) => updateConfig('actionUrl', e.target.value)}
            placeholder="https://example.com"
          />
        </FormGroup>
      )}
      
      {config.actionType === 'show-message' && (
        <FormGroup>
          <Label>Message to Show</Label>
          <TextArea
            value={config.actionMessage || ''}
            onChange={(e) => updateConfig('actionMessage', e.target.value)}
            placeholder="Enter message to display when button is clicked..."
            rows={3}
          />
        </FormGroup>
      )}
      
      <FormGroup>
        <Label>Button Style</Label>
        <Select
          value={config.buttonStyle || 'primary'}
          onChange={(e) => updateConfig('buttonStyle', e.target.value)}
        >
          <option value="primary">Primary (Green)</option>
          <option value="secondary">Secondary (Blue)</option>
          <option value="success">Success (Bright Green)</option>
          <option value="warning">Warning (Orange)</option>
          <option value="danger">Danger (Red)</option>
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label>Button Icon</Label>
        <Select
          value={config.icon || '▶️'}
          onChange={(e) => updateConfig('icon', e.target.value)}
        >
          <option value="▶️">▶️ Play</option>
          <option value="✓">✓ Check</option>
          <option value="→">→ Arrow</option>
          <option value="🎯">🎯 Target</option>
          <option value="⭐">⭐ Star</option>
          <option value="🚀">🚀 Rocket</option>
          <option value="💡">💡 Lightbulb</option>
          <option value="📝">📝 Note</option>
          <option value="🔗">🔗 Link</option>
          <option value="">No Icon</option>
        </Select>
      </FormGroup>
    </>
  );

  const renderEditor = () => {
    switch (component?.type) {
      case 'text-block':
        return renderTextBlockEditor();
      case 'title-header':
        return renderTitleHeaderEditor();
      case 'content-slide':
        return renderContentSlideEditor();
      case 'two-column':
        return renderTwoColumnEditor();
      case 'video-block':
        return renderVideoBlockEditor();
      case 'python-playground':
        return renderPythonPlaygroundEditor();
      case 'ai-prompt':
        return renderAIPromptEditor();
      case 'quiz-block':
        return renderQuizEditor();
      case 'safety-check':
        return renderSafetyCheckEditor();
      case 'button-action':
        return renderActionButtonEditor();
      default:
        return (
          <FormGroup>
            <Label>Configuration</Label>
            <TextArea
              value={JSON.stringify(config, null, 2)}
              onChange={(e) => {
                try {
                  setConfig(JSON.parse(e.target.value));
                } catch (e) {
                  // Invalid JSON, ignore
                }
              }}
              placeholder="Component configuration JSON..."
              rows={8}
            />
          </FormGroup>
        );
    }
  };

  const renderPreview = () => {
    switch (component?.type) {
      case 'text-block':
        return (
          <div>
            <h4>Text Content Preview</h4>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '15px', 
              borderRadius: '8px',
              whiteSpace: 'pre-wrap'
            }}>
              {config.content || 'No content entered yet...'}
            </div>
          </div>
        );
      
      case 'title-header':
        return (
          <div>
            <h4>Title Header Preview</h4>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '20px', 
              borderRadius: '8px',
              textAlign: config.align || 'center'
            }}>
              {React.createElement(
                config.level || 'h1',
                {
                  style: {
                    margin: 0,
                    marginBottom: config.subtitle ? '10px' : 0,
                    color: config.theme === 'primary' ? '#2196F3' :
                           config.theme === 'success' ? '#4CAF50' :
                           config.theme === 'warning' ? '#FF9800' :
                           config.theme === 'danger' ? '#f44336' :
                           config.theme === 'gradient' ? 'transparent' : 'white',
                    background: config.theme === 'gradient' ? 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)' : 'none',
                    WebkitBackgroundClip: config.theme === 'gradient' ? 'text' : 'none',
                    backgroundClip: config.theme === 'gradient' ? 'text' : 'none'
                  }
                },
                config.title || 'Enter your title...'
              )}
              {config.subtitle && (
                <p style={{ 
                  margin: 0, 
                  opacity: 0.8, 
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)'
                }}>
                  {config.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      
      case 'two-column':
        const getGridColumns = () => {
          switch(config.layout) {
            case '60-40': return '60% 40%';
            case '40-60': return '40% 60%';
            case '70-30': return '70% 30%';
            case '30-70': return '30% 70%';
            default: return '50% 50%';
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
                        marginBottom: '10px'
                      }} 
                    />
                  ) : (
                    <div style={{
                      background: '#f0f0f0',
                      border: '2px dashed #ccc',
                      borderRadius: '8px',
                      padding: '40px 20px',
                      color: '#666',
                      marginBottom: '10px'
                    }}>
                      📷 Image placeholder
                    </div>
                  )}
                  {imageCaption && (
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
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
                      padding: '20px',
                      color: 'white',
                      marginBottom: '10px'
                    }}>
                      🎥 {videoTitle || 'Video Player'}
                      <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                        {videoUrl}
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      background: '#f0f0f0',
                      border: '2px dashed #ccc',
                      borderRadius: '8px',
                      padding: '40px 20px',
                      color: '#666',
                      marginBottom: '10px'
                    }}>
                      🎥 Video placeholder
                    </div>
                  )}
                </div>
              );
            default: // text
              return (
                <div style={{ 
                  padding: '10px',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap'
                }}>
                  {content || 'Click to add content...'}
                </div>
              );
          }
        };
        
        return (
          <div>
            <h4>Two Column Layout Preview</h4>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '20px', 
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: getGridColumns(),
              gap: '20px',
              minHeight: '200px'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '10px' }}>
                  Left Column ({config.leftType || 'text'})
                </div>
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
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '10px' }}>
                  Right Column ({config.rightType || 'text'})
                </div>
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
          </div>
        );
      
      case 'content-slide':
        const getSlideLayout = () => {
          const isVertical = ['image-top', 'image-bottom'].includes(config.layout);
          const isBackground = config.layout === 'image-background';
          
          return {
            display: isBackground ? 'relative' : (isVertical ? 'block' : 'grid'),
            gridTemplateColumns: isVertical ? '1fr' : 
              (config.layout === 'image-left' ? '40% 60%' : '60% 40%'),
            gap: isVertical ? '15px' : '20px',
            background: config.backgroundColor || '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            minHeight: '200px'
          };
        };
        
        const renderSlideMedia = () => {
          if (config.mediaType === 'video' && config.videoUrl) {
            return (
              <div style={{
                background: '#000',
                borderRadius: '6px',
                padding: '20px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎥</div>
                <div style={{ fontWeight: 'bold' }}>{config.videoTitle || 'Video'}</div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>Click to play</div>
              </div>
            );
          } else if (config.imageUrl) {
            return (
              <div style={{ textAlign: 'center' }}>
                <img 
                  src={config.imageUrl} 
                  alt={config.imageCaption} 
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto', 
                    borderRadius: '6px' 
                  }} 
                />
                {config.imageCaption && (
                  <p style={{ fontSize: '12px', margin: '5px 0 0', fontStyle: 'italic' }}>
                    {config.imageCaption}
                  </p>
                )}
              </div>
            );
          } else {
            return (
              <div style={{
                background: '#f0f0f0',
                border: '2px dashed #ccc',
                borderRadius: '6px',
                padding: '40px 20px',
                textAlign: 'center',
                color: '#666'
              }}>
                {config.mediaType === 'video' ? '🎥' : '📷'} Add {config.mediaType}
              </div>
            );
          }
        };
        
        const renderSlideText = () => (
          <div style={{ 
            padding: '15px',
            color: config.layout === 'image-background' ? 'white' : '#333'
          }}>
            <h3 style={{ 
              margin: '0 0 10px 0', 
              fontSize: '20px',
              textShadow: config.layout === 'image-background' ? '1px 1px 2px rgba(0,0,0,0.7)' : 'none'
            }}>
              {config.title || 'Slide Title'}
            </h3>
            <p style={{ 
              margin: 0, 
              lineHeight: '1.6',
              textShadow: config.layout === 'image-background' ? '1px 1px 2px rgba(0,0,0,0.7)' : 'none'
            }}>
              {config.content || 'Add your slide content...'}
            </p>
          </div>
        );
        
        return (
          <div>
            <h4>Content Slide Preview</h4>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '15px', 
              borderRadius: '8px'
            }}>
              <div style={getSlideLayout()}>
                {config.layout === 'image-background' ? (
                  <div style={{ position: 'relative' }}>
                    <div style={{ opacity: 0.7 }}>{renderSlideMedia()}</div>
                    <div style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.4)'
                    }}>
                      {renderSlideText()}
                    </div>
                  </div>
                ) : (
                  <>
                    {(config.layout === 'image-left' || config.layout === 'image-top') && renderSlideMedia()}
                    {renderSlideText()}
                    {(config.layout === 'image-right' || config.layout === 'image-bottom') && renderSlideMedia()}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'video-block':
        return (
          <div>
            <h4>Video Lesson Preview</h4>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px' }}>
              <h5>{config.title || 'Untitled Video'}</h5>
              <p>{config.description || 'No description'}</p>
              <div style={{ fontSize: '12px', opacity: '0.8' }}>
                URL: {config.url || 'No URL provided'} | Duration: {config.duration || 'Unknown'} minutes
              </div>
            </div>
          </div>
        );
      
      case 'python-playground':
        return (
          <div>
            <h4>Python Playground Preview</h4>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🐍 {config.title || 'Python Exercise'}
              </div>
              <div style={{ fontSize: '14px', marginBottom: '10px', opacity: '0.9' }}>
                {config.description || 'Interactive Python coding exercise'}
              </div>
              <div style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                padding: '10px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginBottom: '10px',
                whiteSpace: 'pre-wrap',
                maxHeight: '150px',
                overflow: 'auto'
              }}>
                {config.code || '# No code entered yet...'}
              </div>
              {config.explanation && (
                <div style={{ fontSize: '12px', opacity: '0.8', marginBottom: '8px' }}>
                  💡 {config.explanation}
                </div>
              )}
              {config.hints && config.hints.length > 0 && (
                <div style={{ fontSize: '12px', opacity: '0.7' }}>
                  🔍 {config.hints.length} hint{config.hints.length !== 1 ? 's' : ''} available
                </div>
              )}
            </div>
          </div>
        );
      
      case 'ai-prompt':
        return (
          <div>
            <h4>AI Prompt Exercise Preview</h4>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                {config.prompt || 'No prompt entered...'}
              </div>
              <div style={{ fontSize: '12px', opacity: '0.8', marginBottom: '10px' }}>
                Expected: {config.expectedLength} response | Difficulty: {config.difficulty}
              </div>
              {config.hints && config.hints.length > 0 && (
                <HintsList>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Hints:</div>
                  {config.hints.map((hint, index) => (
                    <HintItem key={index}>
                      <span>💡</span>
                      {hint}
                    </HintItem>
                  ))}
                </HintsList>
              )}
            </div>
          </div>
        );
      
      case 'quiz-block':
        return (
          <div>
            <h4>Quiz Preview</h4>
            {config.questions && config.questions.map((q, index) => (
              <div key={index} style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
                <QuestionText>Q{index + 1}: {q.question}</QuestionText>
                <OptionsList>
                  {q.options && q.options.map((option, optIndex) => (
                    <Option key={optIndex} className={q.correct === optIndex ? 'correct' : ''}>
                      <span>{q.correct === optIndex ? '✓' : '○'}</span>
                      {option}
                    </Option>
                  ))}
                </OptionsList>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div>
            <h4>Component Preview</h4>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        );
    }
  };

  if (!component) return null;

  const IconComponent = getComponentIcon(component.type);

  return (
    <EditorContainer>
      <EditorModal>
        <EditorHeader>
          <EditorTitle>
            <IconComponent size={24} />
            Edit {component.name}
          </EditorTitle>
          <CloseButton onClick={onClose}>
            <X size={16} />
          </CloseButton>
        </EditorHeader>
        
        <EditorContent>
          {renderEditor()}
          
          {showPreview && (
            <PreviewContainer>
              <PreviewTitle>
                <Eye size={16} />
                Preview
              </PreviewTitle>
              {renderPreview()}
            </PreviewContainer>
          )}
        </EditorContent>
        
        <ButtonGroup>
          <Button onClick={() => setShowPreview(!showPreview)}>
            <Eye size={16} />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            <Save size={16} />
            Save Component
          </Button>
        </ButtonGroup>
      </EditorModal>
    </EditorContainer>
  );
};

export default ComponentEditor;