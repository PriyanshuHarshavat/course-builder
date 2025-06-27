import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Save,
  X,
  Eye,
  Type,
  Image,
  Video,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Upload,
  Link,
  Settings,
  Columns,
  Square,
  AlertCircle,
  MousePointer,
  Plus,
  Trash2,
  Target
} from 'lucide-react';

// Editor Container
const EditorContainer = styled.div`
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
  padding: 20px;
`;

const EditorModal = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  width: 90%;
  max-width: 1000px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
`;

const EditorTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const EditorContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const PropertiesPanel = styled.div`
  width: 300px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`;

const PreviewPanel = styled.div`
  flex: 1;
  background: white;
  margin: 20px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PreviewHeader = styled.div`
  background: #f7fafc;
  padding: 15px 20px;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PreviewContent = styled.div`
  flex: 1;
  padding: 30px;
  color: #2d3748;
  font-family: 'Inter', sans-serif;
  overflow-y: auto;
  background: white;
`;

const PropertyGroup = styled.div`
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
`;

const PropertyTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
  }
  
  option {
    background: #4a5568;
    color: white;
  }
`;

const ColorPicker = styled.input`
  width: 60px;
  height: 35px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
  }
`;

const Button = styled.button`
  background: ${props => 
    props.variant === 'primary' ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.variant === 'secondary' ? 'rgba(255, 255, 255, 0.2)' :
    'rgba(255, 255, 255, 0.1)'
  };
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    background: ${props => 
      props.variant === 'primary' ? 'linear-gradient(135deg, #45a049, #4CAF50)' :
      props.variant === 'secondary' ? 'rgba(255, 255, 255, 0.3)' :
      'rgba(255, 255, 255, 0.2)'
    };
  }
`;

const ToolbarGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const ToolbarButton = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const RichContentEditor = ({ component, onSave, onClose }) => {
  const [config, setConfig] = useState(component.config);
  const [activeTab, setActiveTab] = useState('properties');

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave({ ...component, config });
  };

  const renderPropertyEditor = () => {
    switch (component.type) {
      case 'rich-text':
        return (
          <>
            <PropertyGroup>
              <PropertyTitle>
                <Type size={16} />
                Text Content
              </PropertyTitle>
              <FormGroup>
                <Label>Content</Label>
                <TextArea
                  value={config.content || ''}
                  onChange={(e) => updateConfig('content', e.target.value)}
                  placeholder="Enter your rich content here..."
                  rows="8"
                />
              </FormGroup>
            </PropertyGroup>

            <PropertyGroup>
              <PropertyTitle>
                <Palette size={16} />
                Styling
              </PropertyTitle>
              <FormGroup>
                <Label>Font Size</Label>
                <Select
                  value={config.fontSize || '16px'}
                  onChange={(e) => updateConfig('fontSize', e.target.value)}
                >
                  <option value="12px">Small (12px)</option>
                  <option value="14px">Normal (14px)</option>
                  <option value="16px">Medium (16px)</option>
                  <option value="18px">Large (18px)</option>
                  <option value="24px">X-Large (24px)</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Text Alignment</Label>
                <ToolbarGroup>
                  <ToolbarButton 
                    active={config.textAlign === 'left'}
                    onClick={() => updateConfig('textAlign', 'left')}
                  >
                    <AlignLeft size={16} />
                  </ToolbarButton>
                  <ToolbarButton 
                    active={config.textAlign === 'center'}
                    onClick={() => updateConfig('textAlign', 'center')}
                  >
                    <AlignCenter size={16} />
                  </ToolbarButton>
                  <ToolbarButton 
                    active={config.textAlign === 'right'}
                    onClick={() => updateConfig('textAlign', 'right')}
                  >
                    <AlignRight size={16} />
                  </ToolbarButton>
                </ToolbarGroup>
              </FormGroup>
              <FormGroup>
                <Label>Text Color</Label>
                <ColorPicker
                  type="color"
                  value={config.textColor || '#000000'}
                  onChange={(e) => updateConfig('textColor', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Background Color</Label>
                <ColorPicker
                  type="color"
                  value={config.backgroundColor || '#ffffff'}
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                />
              </FormGroup>
            </PropertyGroup>
          </>
        );

      case 'title-header':
        return (
          <>
            <PropertyGroup>
              <PropertyTitle>
                <Type size={16} />
                Header Content
              </PropertyTitle>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  value={config.title || ''}
                  onChange={(e) => updateConfig('title', e.target.value)}
                  placeholder="Your Title Here"
                />
              </FormGroup>
              <FormGroup>
                <Label>Subtitle (Optional)</Label>
                <Input
                  value={config.subtitle || ''}
                  onChange={(e) => updateConfig('subtitle', e.target.value)}
                  placeholder="Optional subtitle"
                />
              </FormGroup>
              <FormGroup>
                <Label>Header Style</Label>
                <Select
                  value={config.style || 'h1'}
                  onChange={(e) => updateConfig('style', e.target.value)}
                >
                  <option value="h1">Large Title (H1)</option>
                  <option value="h2">Medium Title (H2)</option>
                  <option value="h3">Small Title (H3)</option>
                </Select>
              </FormGroup>
            </PropertyGroup>

            <PropertyGroup>
              <PropertyTitle>
                <Palette size={16} />
                Styling
              </PropertyTitle>
              <FormGroup>
                <Label>Text Alignment</Label>
                <ToolbarGroup>
                  <ToolbarButton 
                    active={config.textAlign === 'left'}
                    onClick={() => updateConfig('textAlign', 'left')}
                  >
                    <AlignLeft size={16} />
                  </ToolbarButton>
                  <ToolbarButton 
                    active={config.textAlign === 'center'}
                    onClick={() => updateConfig('textAlign', 'center')}
                  >
                    <AlignCenter size={16} />
                  </ToolbarButton>
                  <ToolbarButton 
                    active={config.textAlign === 'right'}
                    onClick={() => updateConfig('textAlign', 'right')}
                  >
                    <AlignRight size={16} />
                  </ToolbarButton>
                </ToolbarGroup>
              </FormGroup>
              <FormGroup>
                <Label>Text Color</Label>
                <ColorPicker
                  type="color"
                  value={config.textColor || '#2d3748'}
                  onChange={(e) => updateConfig('textColor', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Background Color</Label>
                <ColorPicker
                  type="color"
                  value={config.backgroundColor || 'transparent'}
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                />
              </FormGroup>
            </PropertyGroup>
          </>
        );

      case 'image-block':
        return (
          <>
            <PropertyGroup>
              <PropertyTitle>
                <Image size={16} />
                Image Settings
              </PropertyTitle>
              <FormGroup>
                <Label>Image URL</Label>
                <Input
                  value={config.imageUrl || ''}
                  onChange={(e) => updateConfig('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </FormGroup>
              <FormGroup>
                <Label>Caption</Label>
                <Input
                  value={config.caption || ''}
                  onChange={(e) => updateConfig('caption', e.target.value)}
                  placeholder="Image caption"
                />
              </FormGroup>
              <FormGroup>
                <Label>Alt Text (Accessibility)</Label>
                <Input
                  value={config.altText || ''}
                  onChange={(e) => updateConfig('altText', e.target.value)}
                  placeholder="Descriptive text for screen readers"
                />
              </FormGroup>
            </PropertyGroup>

            <PropertyGroup>
              <PropertyTitle>
                <Settings size={16} />
                Layout
              </PropertyTitle>
              <FormGroup>
                <Label>Alignment</Label>
                <Select
                  value={config.layout || 'center'}
                  onChange={(e) => updateConfig('layout', e.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="full">Full Width</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Width</Label>
                <Select
                  value={config.width || '100%'}
                  onChange={(e) => updateConfig('width', e.target.value)}
                >
                  <option value="50%">Small (50%)</option>
                  <option value="75%">Medium (75%)</option>
                  <option value="100%">Large (100%)</option>
                </Select>
              </FormGroup>
            </PropertyGroup>
          </>
        );

      case 'two-column':
        return (
          <>
            <PropertyGroup>
              <PropertyTitle>
                <Columns size={16} />
                Column Content
              </PropertyTitle>
              <FormGroup>
                <Label>Left Column</Label>
                <TextArea
                  value={config.leftContent || ''}
                  onChange={(e) => updateConfig('leftContent', e.target.value)}
                  placeholder="Left column content..."
                  rows="4"
                />
              </FormGroup>
              <FormGroup>
                <Label>Right Column</Label>
                <TextArea
                  value={config.rightContent || ''}
                  onChange={(e) => updateConfig('rightContent', e.target.value)}
                  placeholder="Right column content..."
                  rows="4"
                />
              </FormGroup>
            </PropertyGroup>

            <PropertyGroup>
              <PropertyTitle>
                <Settings size={16} />
                Layout Settings
              </PropertyTitle>
              <FormGroup>
                <Label>Left Column Width</Label>
                <Select
                  value={config.leftWidth || '50%'}
                  onChange={(e) => updateConfig('leftWidth', e.target.value)}
                >
                  <option value="30%">30%</option>
                  <option value="40%">40%</option>
                  <option value="50%">50%</option>
                  <option value="60%">60%</option>
                  <option value="70%">70%</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Column Gap</Label>
                <Select
                  value={config.gap || '20px'}
                  onChange={(e) => updateConfig('gap', e.target.value)}
                >
                  <option value="10px">Small (10px)</option>
                  <option value="20px">Medium (20px)</option>
                  <option value="30px">Large (30px)</option>
                  <option value="40px">X-Large (40px)</option>
                </Select>
              </FormGroup>
            </PropertyGroup>
          </>
        );

      case 'quiz-block':
        return (
          <>
            <PropertyGroup>
              <PropertyTitle>
                <Target size={16} />
                Quiz Questions
              </PropertyTitle>
              {(config.questions || []).map((question, index) => (
                <div key={index} style={{ marginBottom: '20px', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <FormGroup>
                    <Label>Question {index + 1}</Label>
                    <Input
                      value={question.question || ''}
                      onChange={(e) => {
                        const newQuestions = [...(config.questions || [])];
                        newQuestions[index] = { ...question, question: e.target.value };
                        updateConfig('questions', newQuestions);
                      }}
                      placeholder="Enter your question..."
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Answer Options</Label>
                    {(question.options || []).map((option, optIndex) => (
                      <div key={optIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newQuestions = [...(config.questions || [])];
                            const newOptions = [...(question.options || [])];
                            newOptions[optIndex] = e.target.value;
                            newQuestions[index] = { ...question, options: newOptions };
                            updateConfig('questions', newQuestions);
                          }}
                          placeholder={`Option ${optIndex + 1}`}
                        />
                        <ToolbarButton 
                          active={question.correct === optIndex}
                          onClick={() => {
                            const newQuestions = [...(config.questions || [])];
                            newQuestions[index] = { ...question, correct: optIndex };
                            updateConfig('questions', newQuestions);
                          }}
                        >
                          ✓
                        </ToolbarButton>
                      </div>
                    ))}
                    <Button 
                      onClick={() => {
                        const newQuestions = [...(config.questions || [])];
                        const newOptions = [...(question.options || []), ''];
                        newQuestions[index] = { ...question, options: newOptions };
                        updateConfig('questions', newQuestions);
                      }}
                      style={{ marginTop: '8px', fontSize: '12px', padding: '6px 12px' }}
                    >
                      Add Option
                    </Button>
                  </FormGroup>
                </div>
              ))}
              <Button 
                variant="primary"
                onClick={() => {
                  const newQuestions = [...(config.questions || []), {
                    question: '',
                    options: ['', ''],
                    correct: 0
                  }];
                  updateConfig('questions', newQuestions);
                }}
              >
                Add Question
              </Button>
            </PropertyGroup>
          </>
        );

      case 'button-action':
        return (
          <>
            <PropertyGroup>
              <PropertyTitle>
                <MousePointer size={16} />
                Button Settings
              </PropertyTitle>
              <FormGroup>
                <Label>Button Text</Label>
                <Input
                  value={config.text || ''}
                  onChange={(e) => updateConfig('text', e.target.value)}
                  placeholder="Click Me"
                />
              </FormGroup>
              <FormGroup>
                <Label>Action</Label>
                <Select
                  value={config.action || 'next-page'}
                  onChange={(e) => updateConfig('action', e.target.value)}
                >
                  <option value="next-page">Go to Next Page</option>
                  <option value="prev-page">Go to Previous Page</option>
                  <option value="external-link">Open External Link</option>
                  <option value="submit">Submit Form</option>
                </Select>
              </FormGroup>
              {config.action === 'external-link' && (
                <FormGroup>
                  <Label>Link URL</Label>
                  <Input
                    value={config.url || ''}
                    onChange={(e) => updateConfig('url', e.target.value)}
                    placeholder="https://example.com"
                  />
                </FormGroup>
              )}
            </PropertyGroup>

            <PropertyGroup>
              <PropertyTitle>
                <Palette size={16} />
                Button Styling
              </PropertyTitle>
              <FormGroup>
                <Label>Button Style</Label>
                <Select
                  value={config.style || 'primary'}
                  onChange={(e) => updateConfig('style', e.target.value)}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                  <option value="ghost">Ghost</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Size</Label>
                <Select
                  value={config.size || 'medium'}
                  onChange={(e) => updateConfig('size', e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Background Color</Label>
                <ColorPicker
                  type="color"
                  value={config.backgroundColor || '#4299e1'}
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Text Color</Label>
                <ColorPicker
                  type="color"
                  value={config.textColor || '#ffffff'}
                  onChange={(e) => updateConfig('textColor', e.target.value)}
                />
              </FormGroup>
            </PropertyGroup>
          </>
        );

      case 'card-layout':
        return (
          <>
            <PropertyGroup>
              <PropertyTitle>
                <Square size={16} />
                Card Content
              </PropertyTitle>
              <FormGroup>
                <Label>Card Title</Label>
                <Input
                  value={config.title || ''}
                  onChange={(e) => updateConfig('title', e.target.value)}
                  placeholder="Card Title"
                />
              </FormGroup>
              <FormGroup>
                <Label>Card Content</Label>
                <TextArea
                  value={config.content || ''}
                  onChange={(e) => updateConfig('content', e.target.value)}
                  placeholder="Card content goes here..."
                  rows="6"
                />
              </FormGroup>
            </PropertyGroup>

            <PropertyGroup>
              <PropertyTitle>
                <Palette size={16} />
                Card Styling
              </PropertyTitle>
              <FormGroup>
                <Label>Background Color</Label>
                <ColorPicker
                  type="color"
                  value={config.backgroundColor || '#f7fafc'}
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Border Color</Label>
                <ColorPicker
                  type="color"
                  value={config.borderColor || '#e2e8f0'}
                  onChange={(e) => updateConfig('borderColor', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Border Radius</Label>
                <Select
                  value={config.borderRadius || '12px'}
                  onChange={(e) => updateConfig('borderRadius', e.target.value)}
                >
                  <option value="0px">None</option>
                  <option value="6px">Small</option>
                  <option value="12px">Medium</option>
                  <option value="18px">Large</option>
                  <option value="24px">X-Large</option>
                </Select>
              </FormGroup>
            </PropertyGroup>
          </>
        );

      case 'callout-box':
        return (
          <>
            <PropertyGroup>
              <PropertyTitle>
                <AlertCircle size={16} />
                Callout Content
              </PropertyTitle>
              <FormGroup>
                <Label>Type</Label>
                <Select
                  value={config.type || 'info'}
                  onChange={(e) => updateConfig('type', e.target.value)}
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  value={config.title || ''}
                  onChange={(e) => updateConfig('title', e.target.value)}
                  placeholder="Important Note"
                />
              </FormGroup>
              <FormGroup>
                <Label>Content</Label>
                <TextArea
                  value={config.content || ''}
                  onChange={(e) => updateConfig('content', e.target.value)}
                  placeholder="This is an important piece of information..."
                  rows="4"
                />
              </FormGroup>
            </PropertyGroup>
          </>
        );

      default:
        return (
          <PropertyGroup>
            <PropertyTitle>
              <Settings size={16} />
              Component Settings
            </PropertyTitle>
            <p style={{ opacity: 0.7, fontSize: '14px' }}>
              Advanced editor for {component.name} coming soon!
            </p>
          </PropertyGroup>
        );
    }
  };

  const renderPreview = () => {
    switch (component.type) {
      case 'rich-text':
        return (
          <div style={{
            fontSize: config.fontSize || '16px',
            textAlign: config.textAlign || 'left',
            color: config.textColor || '#000000',
            backgroundColor: config.backgroundColor || 'transparent',
            padding: config.padding || '20px',
            lineHeight: '1.6',
            borderRadius: '8px'
          }}>
            {config.content || 'Enter your rich content here...'}
          </div>
        );

      case 'title-header':
        const HeaderTag = config.style === 'h1' ? 'h1' : config.style === 'h2' ? 'h2' : 'h3';
        const fontSize = config.style === 'h1' ? '32px' : config.style === 'h2' ? '24px' : '20px';
        
        return (
          <div style={{ textAlign: config.textAlign || 'center' }}>
            <HeaderTag style={{
              fontSize,
              color: config.textColor || '#2d3748',
              backgroundColor: config.backgroundColor || 'transparent',
              margin: '0 0 10px 0',
              padding: '10px'
            }}>
              {config.title || 'Your Title Here'}
            </HeaderTag>
            {config.subtitle && (
              <p style={{
                fontSize: '16px',
                color: config.textColor || '#2d3748',
                opacity: 0.7,
                margin: '0'
              }}>
                {config.subtitle}
              </p>
            )}
          </div>
        );

      case 'image-block':
        return (
          <div style={{ textAlign: config.layout || 'center' }}>
            {config.imageUrl ? (
              <div>
                <img 
                  src={config.imageUrl} 
                  alt={config.altText || 'Image'}
                  style={{
                    width: config.width || '100%',
                    height: 'auto',
                    borderRadius: config.borderRadius || '8px',
                    maxWidth: '100%'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div style={{ display: 'none', padding: '40px', background: '#f7fafc', borderRadius: '8px', border: '2px dashed #cbd5e0' }}>
                  <Image size={48} style={{ margin: '0 auto 10px', display: 'block', opacity: 0.5 }} />
                  <p style={{ margin: 0, textAlign: 'center', color: '#718096' }}>Image could not be loaded</p>
                </div>
                {config.caption && (
                  <p style={{
                    fontSize: '14px',
                    color: '#718096',
                    marginTop: '10px',
                    fontStyle: 'italic'
                  }}>
                    {config.caption}
                  </p>
                )}
              </div>
            ) : (
              <div style={{ padding: '40px', background: '#f7fafc', borderRadius: '8px', border: '2px dashed #cbd5e0' }}>
                <Image size={48} style={{ margin: '0 auto 10px', display: 'block', opacity: 0.5 }} />
                <p style={{ margin: 0, textAlign: 'center', color: '#718096' }}>Add an image URL to see preview</p>
              </div>
            )}
          </div>
        );

      case 'two-column':
        const leftWidth = config.leftWidth || '50%';
        const rightWidth = `calc(100% - ${leftWidth} - ${config.gap || '20px'})`;
        
        return (
          <div style={{
            display: 'flex',
            gap: config.gap || '20px',
            alignItems: config.verticalAlign || 'top'
          }}>
            <div style={{
              width: leftWidth,
              padding: '15px',
              background: '#f7fafc',
              borderRadius: '8px',
              lineHeight: '1.6'
            }}>
              {config.leftContent || 'Left column content...'}
            </div>
            <div style={{
              width: rightWidth,
              padding: '15px',
              background: '#f7fafc',
              borderRadius: '8px',
              lineHeight: '1.6'
            }}>
              {config.rightContent || 'Right column content...'}
            </div>
          </div>
        );

      case 'quiz-block':
        return (
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#2d3748' }}>Knowledge Check</h3>
            {(config.questions || []).map((question, index) => (
              <div key={index} style={{ 
                marginBottom: '20px', 
                padding: '20px', 
                background: '#f7fafc', 
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#2d3748' }}>
                  {question.question || `Question ${index + 1}`}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(question.options || []).map((option, optIndex) => (
                    <div 
                      key={optIndex} 
                      style={{
                        padding: '10px 15px',
                        background: question.correct === optIndex ? '#c6f6d5' : '#ffffff',
                        border: `2px solid ${question.correct === optIndex ? '#38a169' : '#e2e8f0'}`,
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: question.correct === optIndex ? '#38a169' : '#e2e8f0',
                        color: question.correct === optIndex ? 'white' : '#718096',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {question.correct === optIndex ? '✓' : String.fromCharCode(65 + optIndex)}
                      </span>
                      {option || `Option ${optIndex + 1}`}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'button-action':
        const buttonSizes = { small: '12px 20px', medium: '14px 28px', large: '16px 36px' };
        const buttonStyles = {
          primary: { background: config.backgroundColor || '#4299e1', color: config.textColor || '#ffffff' },
          secondary: { background: '#e2e8f0', color: '#2d3748' },
          outline: { background: 'transparent', color: config.backgroundColor || '#4299e1', border: `2px solid ${config.backgroundColor || '#4299e1'}` },
          ghost: { background: 'transparent', color: config.backgroundColor || '#4299e1' }
        };
        
        return (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <button style={{
              padding: buttonSizes[config.size || 'medium'],
              borderRadius: '8px',
              border: 'none',
              fontSize: config.size === 'small' ? '14px' : config.size === 'large' ? '18px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ...buttonStyles[config.style || 'primary']
            }}>
              {config.text || 'Click Me'}
            </button>
          </div>
        );

      case 'card-layout':
        return (
          <div style={{
            background: config.backgroundColor || '#f7fafc',
            border: `1px solid ${config.borderColor || '#e2e8f0'}`,
            borderRadius: config.borderRadius || '12px',
            padding: config.padding || '24px',
            margin: '20px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#2d3748' }}>
              {config.title || 'Card Title'}
            </h3>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#4a5568' }}>
              {config.content || 'Card content goes here...'}
            </p>
          </div>
        );

      case 'callout-box':
        const calloutStyles = {
          info: { background: '#ebf8ff', border: '#3182ce', icon: 'ℹ️' },
          warning: { background: '#fffbeb', border: '#d69e2e', icon: '⚠️' },
          success: { background: '#f0fff4', border: '#38a169', icon: '✅' },
          error: { background: '#fed7d7', border: '#e53e3e', icon: '❌' }
        };
        const style = calloutStyles[config.type || 'info'];
        
        return (
          <div style={{
            background: style.background,
            border: `1px solid ${style.border}`,
            borderLeft: `4px solid ${style.border}`,
            borderRadius: '8px',
            padding: '20px',
            margin: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '15px'
          }}>
            <span style={{ fontSize: '20px' }}>{style.icon}</span>
            <div>
              <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>
                {config.title || 'Important Note'}
              </h4>
              <p style={{ margin: 0, lineHeight: '1.6', color: '#4a5568' }}>
                {config.content || 'This is an important piece of information...'}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
            <Settings size={48} style={{ margin: '0 auto 15px', display: 'block', opacity: 0.5 }} />
            <h3 style={{ margin: '0 0 10px 0', color: '#4a5568' }}>Preview for {component.name}</h3>
            <p style={{ margin: 0 }}>Live preview coming soon for this component type!</p>
          </div>
        );
    }
  };

  return (
    <EditorContainer>
      <EditorModal>
        <EditorHeader>
          <EditorTitle>
            <Settings size={20} />
            Edit {component.name}
          </EditorTitle>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="primary" onClick={handleSave}>
              <Save size={16} />
              Save Changes
            </Button>
            <Button onClick={onClose}>
              <X size={16} />
              Cancel
            </Button>
          </div>
        </EditorHeader>

        <EditorContent>
          <PropertiesPanel>
            {renderPropertyEditor()}
          </PropertiesPanel>

          <PreviewPanel>
            <PreviewHeader>
              <Eye size={16} />
              Live Preview
            </PreviewHeader>
            <PreviewContent>
              {renderPreview()}
            </PreviewContent>
          </PreviewPanel>
        </EditorContent>
      </EditorModal>
    </EditorContainer>
  );
};

export default RichContentEditor;