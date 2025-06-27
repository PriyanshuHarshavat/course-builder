import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Save,
  Copy,
  Move,
  Type,
  Code,
  HelpCircle,
  Shield,
  Image,
  Play,
  ChevronUp,
  ChevronDown,
  Settings,
  BookOpen,
  Target,
  Clock,
  Users,
  Award,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

// Animations
const slideIn = keyframes`
  0% { transform: translateX(-20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

// Main Container
const LessonBuilderContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  position: relative;
`;

// Header
const BuilderHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const LessonTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const TitleInput = styled.input`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 10px;
  min-width: 300px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  background: ${props => {
    switch(props.variant) {
      case 'primary': return 'linear-gradient(135deg, #4CAF50, #45a049)';
      case 'secondary': return 'linear-gradient(135deg, #2196F3, #1976D2)';
      case 'danger': return 'linear-gradient(135deg, #f44336, #d32f2f)';
      default: return 'rgba(255, 255, 255, 0.2)';
    }
  }};
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
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

// Main Content Area
const BuilderContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  height: calc(100vh - 80px);
  
  @media (max-width: 1200px) {
    grid-template-columns: 250px 1fr;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Left Sidebar - Element Palette
const ElementPalette = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  overflow-y: auto;
`;

const PaletteTitle = styled.h3`
  color: white;
  margin: 0 0 20px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ElementCategory = styled.div`
  margin-bottom: 25px;
`;

const CategoryTitle = styled.h4`
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ElementItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: grab;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  &:active {
    cursor: grabbing;
    transform: scale(0.95);
  }
`;

const ElementIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-weight: 600;
  margin-bottom: 5px;
`;

const ElementDescription = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  line-height: 1.4;
`;

// Center - Lesson Canvas
const LessonCanvas = styled.div`
  background: white;
  padding: 30px;
  overflow-y: auto;
  position: relative;
`;

const CanvasHeader = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
`;

const LessonMetadata = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const MetadataField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MetadataLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MetadataInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const MetadataSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

// Lesson Elements Container
const LessonElements = styled.div`
  min-height: 400px;
  position: relative;
`;

const ElementContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
  animation: ${slideIn} 0.3s ease-out;
  
  ${props => props.isSelected && css`
    outline: 3px solid #667eea;
    outline-offset: 5px;
  `}
`;

const ElementWrapper = styled.div`
  background: ${props => {
    switch(props.type) {
      case 'title': return 'linear-gradient(135deg, #FF6B6B, #FF8E53)';
      case 'text': return '#f8f9fa';
      case 'python-playground': return 'linear-gradient(135deg, #3776ab, #ffd43b)';
      case 'quiz': return 'linear-gradient(135deg, #667eea, #764ba2)';
      case 'ethics': return 'linear-gradient(135deg, #4CAF50, #45a049)';
      case 'image': return 'linear-gradient(135deg, #FF9800, #F57C00)';
      default: return '#ffffff';
    }
  }};
  border-radius: 12px;
  padding: 20px;
  color: ${props => ['title', 'python-playground', 'quiz', 'ethics', 'image'].includes(props.type) ? 'white' : '#333'};
  position: relative;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const ElementControls = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ElementContainer}:hover & {
    opacity: 1;
  }
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
  
  &.danger:hover {
    background: #f44336;
    color: white;
  }
`;

const MoveControls = styled.div`
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ElementContainer}:hover & {
    opacity: 1;
  }
`;

const MoveButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Right Sidebar - Properties Panel
const PropertiesPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  overflow-y: auto;
  
  @media (max-width: 1200px) {
    display: none;
  }
`;

const PanelTitle = styled.h3`
  color: white;
  margin: 0 0 20px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PropertyGroup = styled.div`
  margin-bottom: 25px;
`;

const PropertyLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const PropertyInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const PropertyTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const PropertySelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  
  option {
    background: #333;
    color: white;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

// Empty State
const EmptyCanvas = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #999;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #666;
`;

const EmptyDescription = styled.p`
  margin: 0;
  font-size: 16px;
  color: #999;
  max-width: 400px;
  line-height: 1.5;
`;

// Element Definitions
const elementTypes = {
  content: [
    {
      type: 'title',
      name: 'Title Section',
      icon: <Type size={20} />,
      description: 'Add a lesson title with decorative styling'
    },
    {
      type: 'text',
      name: 'Text Content',
      icon: <BookOpen size={20} />,
      description: 'Rich text content with markdown support'
    },
    {
      type: 'image',
      name: 'Image',
      icon: <Image size={20} />,
      description: 'Add images, diagrams, or illustrations'
    }
  ],
  interactive: [
    {
      type: 'python-playground',
      name: 'Python Code',
      icon: <Code size={20} />,
      description: 'Interactive Python coding environment'
    },
    {
      type: 'quiz',
      name: 'Quiz Question',
      icon: <HelpCircle size={20} />,
      description: 'Multiple choice or short answer questions'
    },
    {
      type: 'ethics',
      name: 'Ethics Scenario',
      icon: <Shield size={20} />,
      description: 'Ethical decision-making scenarios'
    }
  ]
};

// Default element content
const defaultElementContent = {
  title: {
    text: 'New Lesson Title',
    template: 'default',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    align: 'center',
    decoration: '🎯'
  },
  text: {
    text: 'Add your lesson content here. You can use **bold**, *italic*, and other markdown formatting.',
    align: 'left'
  },
  'python-playground': {
    title: 'Python Exercise',
    description: 'Try this coding challenge!',
    code: '# Write your Python code here\nprint("Hello, AI World!")',
    explanation: 'This is a basic Python example.',
    hints: ['Remember to use proper indentation', 'Check your spelling'],
    expectedOutput: 'Hello, AI World!',
    editableAreas: ['print("Hello, AI World!")']
  },
  quiz: {
    question: 'What is artificial intelligence?',
    type: 'multiple-choice',
    options: [
      'Computer programs that can think like humans',
      'Robots that look like people',
      'Very fast calculators',
      'Magic computer spells'
    ],
    correct: 0,
    explanation: 'AI refers to computer systems that can perform tasks that typically require human intelligence.',
    hint: 'Think about what makes humans intelligent!'
  },
  ethics: {
    scenario: 'You discover that an AI system you are using to help with homework has been giving different quality answers to students based on their names. What should you do?',
    choices: [
      'Continue using it since it helps me',
      'Report the bias to a teacher or parent',
      'Tell other students about the problem'
    ],
    correct: 1,
    principle: 'Fairness and equality are important values in AI systems.'
  },
  image: {
    src: '/api/placeholder/400/300',
    alt: 'Lesson illustration',
    caption: 'Add a descriptive caption here',
    width: '100%'
  }
};

// Lesson Builder Component
const LessonBuilder = ({
  initialTemplate = null,
  onSave = () => {},
  onPreview = () => {},
  onClose = () => {}
}) => {
  const [lesson, setLesson] = useState({
    title: initialTemplate?.title || 'New AI Lesson',
    description: initialTemplate?.description || '',
    ageGroup: initialTemplate?.ageGroup || '8-9',
    subject: initialTemplate?.subject || 'Python Programming',
    duration: initialTemplate?.duration || 45,
    difficulty: initialTemplate?.difficulty || 'beginner',
    learningObjectives: initialTemplate?.learningObjectives || ['Students will learn...'],
    elements: initialTemplate?.elements || []
  });

  const [selectedElement, setSelectedElement] = useState(null);
  const [draggedElement, setDraggedElement] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mark as changed when lesson is modified
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [lesson]);

  // Handle drag start from palette
  const handleDragStart = (elementType) => {
    setDraggedElement(elementType);
  };

  // Handle drop on canvas
  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedElement) {
      addElement(draggedElement.type);
      setDraggedElement(null);
    }
  };

  // Add new element
  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type: type,
      content: { ...defaultElementContent[type] }
    };
    
    setLesson(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    
    setSelectedElement(newElement.id);
  };

  // Update element content
  const updateElement = (elementId, newContent) => {
    setLesson(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId 
          ? { ...el, content: { ...el.content, ...newContent } }
          : el
      )
    }));
  };

  // Delete element
  const deleteElement = (elementId) => {
    setLesson(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
    
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  };

  // Move element up/down
  const moveElement = (elementId, direction) => {
    const elements = [...lesson.elements];
    const index = elements.findIndex(el => el.id === elementId);
    
    if (direction === 'up' && index > 0) {
      [elements[index], elements[index - 1]] = [elements[index - 1], elements[index]];
    } else if (direction === 'down' && index < elements.length - 1) {
      [elements[index], elements[index + 1]] = [elements[index + 1], elements[index]];
    }
    
    setLesson(prev => ({ ...prev, elements }));
  };

  // Duplicate element
  const duplicateElement = (elementId) => {
    const element = lesson.elements.find(el => el.id === elementId);
    if (element) {
      const newElement = {
        ...element,
        id: Date.now(),
        content: { ...element.content }
      };
      
      const index = lesson.elements.findIndex(el => el.id === elementId);
      const newElements = [...lesson.elements];
      newElements.splice(index + 1, 0, newElement);
      
      setLesson(prev => ({ ...prev, elements: newElements }));
    }
  };

  // Save lesson
  const handleSave = () => {
    onSave(lesson);
    setHasUnsavedChanges(false);
  };

  // Preview lesson
  const handlePreview = () => {
    onPreview(lesson);
  };

  // Render element in canvas
  const renderElement = (element) => {
    switch (element.type) {
      case 'title':
        return (
          <div style={{ 
            textAlign: element.content.align || 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '20px 0'
          }}>
            {element.content.decoration} {element.content.text} {element.content.decoration}
          </div>
        );
      
      case 'text':
        return (
          <div style={{ 
            textAlign: element.content.align || 'left',
            fontSize: '16px',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            {element.content.text}
          </div>
        );
      
      case 'python-playground':
        return (
          <div>
            <h3 style={{ margin: '0 0 10px 0' }}>{element.content.title}</h3>
            <p style={{ margin: '0 0 15px 0', opacity: 0.9 }}>{element.content.description}</p>
            <div style={{ 
              background: 'rgba(0,0,0,0.2)', 
              padding: '15px', 
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '14px',
              whiteSpace: 'pre-wrap'
            }}>
              {element.content.code}
            </div>
          </div>
        );
      
      case 'quiz':
        return (
          <div>
            <h3 style={{ margin: '0 0 15px 0' }}>{element.content.question}</h3>
            <div style={{ fontSize: '14px' }}>
              {element.content.options?.map((option, index) => (
                <div key={index} style={{ 
                  padding: '8px 12px', 
                  margin: '5px 0',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '6px'
                }}>
                  {String.fromCharCode(65 + index)}. {option}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'ethics':
        return (
          <div>
            <h3 style={{ margin: '0 0 15px 0' }}>Ethics Scenario</h3>
            <p style={{ margin: '0 0 15px 0', fontSize: '16px' }}>{element.content.scenario}</p>
            <div style={{ fontSize: '14px' }}>
              {element.content.choices?.map((choice, index) => (
                <div key={index} style={{ 
                  padding: '8px 12px', 
                  margin: '5px 0',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '6px'
                }}>
                  {index + 1}. {choice}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100%',
              height: '200px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <Image size={48} style={{ opacity: 0.6 }} />
            </div>
            <p style={{ margin: 0, fontSize: '14px', fontStyle: 'italic' }}>
              {element.content.caption}
            </p>
          </div>
        );
      
      default:
        return <div>Unknown element type: {element.type}</div>;
    }
  };

  // Render properties panel for selected element
  const renderPropertiesPanel = () => {
    if (!selectedElement) {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px', color: 'rgba(255,255,255,0.6)' }}>
          <Settings size={48} style={{ marginBottom: '15px' }} />
          <p>Select an element to edit its properties</p>
        </div>
      );
    }

    const element = lesson.elements.find(el => el.id === selectedElement);
    if (!element) return null;

    const updateContent = (field, value) => {
      updateElement(selectedElement, { [field]: value });
    };

    switch (element.type) {
      case 'title':
        return (
          <>
            <PropertyGroup>
              <PropertyLabel>Title Text</PropertyLabel>
              <PropertyInput
                value={element.content.text}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Enter title text"
              />
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Decoration</PropertyLabel>
              <PropertyInput
                value={element.content.decoration}
                onChange={(e) => updateContent('decoration', e.target.value)}
                placeholder="🎯"
              />
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Alignment</PropertyLabel>
              <PropertySelect
                value={element.content.align}
                onChange={(e) => updateContent('align', e.target.value)}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </PropertySelect>
            </PropertyGroup>
          </>
        );

      case 'text':
        return (
          <>
            <PropertyGroup>
              <PropertyLabel>Content</PropertyLabel>
              <PropertyTextarea
                value={element.content.text}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Enter your lesson content here..."
                rows={8}
              />
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Alignment</PropertyLabel>
              <PropertySelect
                value={element.content.align}
                onChange={(e) => updateContent('align', e.target.value)}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </PropertySelect>
            </PropertyGroup>
          </>
        );

      case 'python-playground':
        return (
          <>
            <PropertyGroup>
              <PropertyLabel>Exercise Title</PropertyLabel>
              <PropertyInput
                value={element.content.title}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Exercise title"
              />
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Description</PropertyLabel>
              <PropertyTextarea
                value={element.content.description}
                onChange={(e) => updateContent('description', e.target.value)}
                placeholder="Describe the coding exercise..."
                rows={3}
              />
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Python Code</PropertyLabel>
              <PropertyTextarea
                value={element.content.code}
                onChange={(e) => updateContent('code', e.target.value)}
                placeholder="# Write Python code here..."
                rows={8}
                style={{ fontFamily: 'monospace' }}
              />
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Explanation</PropertyLabel>
              <PropertyTextarea
                value={element.content.explanation}
                onChange={(e) => updateContent('explanation', e.target.value)}
                placeholder="Explain the code..."
                rows={3}
              />
            </PropertyGroup>
          </>
        );

      case 'quiz':
        return (
          <>
            <PropertyGroup>
              <PropertyLabel>Question</PropertyLabel>
              <PropertyTextarea
                value={element.content.question}
                onChange={(e) => updateContent('question', e.target.value)}
                placeholder="Enter your question..."
                rows={3}
              />
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Options</PropertyLabel>
              {element.content.options?.map((option, index) => (
                <PropertyInput
                  key={index}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...element.content.options];
                    newOptions[index] = e.target.value;
                    updateContent('options', newOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  style={{ marginBottom: '8px' }}
                />
              ))}
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Correct Answer</PropertyLabel>
              <PropertySelect
                value={element.content.correct}
                onChange={(e) => updateContent('correct', parseInt(e.target.value))}
              >
                {element.content.options?.map((_, index) => (
                  <option key={index} value={index}>Option {index + 1}</option>
                ))}
              </PropertySelect>
            </PropertyGroup>
            
            <PropertyGroup>
              <PropertyLabel>Explanation</PropertyLabel>
              <PropertyTextarea
                value={element.content.explanation}
                onChange={(e) => updateContent('explanation', e.target.value)}
                placeholder="Explain the correct answer..."
                rows={3}
              />
            </PropertyGroup>
          </>
        );

      default:
        return <div>No properties available for this element type.</div>;
    }
  };

  return (
    <LessonBuilderContainer>
      {/* Header */}
      <BuilderHeader>
        <LessonTitle>
          <BookOpen size={32} />
          <TitleInput
            value={lesson.title}
            onChange={(e) => setLesson(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter lesson title..."
          />
          {hasUnsavedChanges && (
            <span style={{ color: '#FFD700', fontSize: '14px' }}>
              <AlertCircle size={16} style={{ marginRight: '5px' }} />
              Unsaved changes
            </span>
          )}
        </LessonTitle>
        
        <ActionButtons>
          <ActionButton onClick={handlePreview}>
            <Eye size={16} />
            Preview
          </ActionButton>
          <ActionButton variant="primary" onClick={handleSave}>
            <Save size={16} />
            Save Lesson
          </ActionButton>
          <ActionButton onClick={onClose}>
            <X size={16} />
            Close
          </ActionButton>
        </ActionButtons>
      </BuilderHeader>

      {/* Main Content */}
      <BuilderContent>
        {/* Left Sidebar - Element Palette */}
        <ElementPalette>
          <PaletteTitle>
            <Plus size={20} />
            Add Elements
          </PaletteTitle>
          
          {Object.entries(elementTypes).map(([category, elements]) => (
            <ElementCategory key={category}>
              <CategoryTitle>{category}</CategoryTitle>
              {elements.map((elementType) => (
                <ElementItem
                  key={elementType.type}
                  draggable
                  onDragStart={() => handleDragStart(elementType)}
                  onClick={() => addElement(elementType.type)}
                >
                  <ElementIcon>
                    {elementType.icon}
                    {elementType.name}
                  </ElementIcon>
                  <ElementDescription>
                    {elementType.description}
                  </ElementDescription>
                </ElementItem>
              ))}
            </ElementCategory>
          ))}
        </ElementPalette>

        {/* Center - Lesson Canvas */}
        <LessonCanvas
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <CanvasHeader>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '28px', color: '#333' }}>
              {lesson.title}
            </h2>
            
            <LessonMetadata>
              <MetadataField>
                <MetadataLabel>Age Group</MetadataLabel>
                <MetadataSelect
                  value={lesson.ageGroup}
                  onChange={(e) => setLesson(prev => ({ ...prev, ageGroup: e.target.value }))}
                >
                  <option value="8-9">Ages 8-9</option>
                  <option value="10-11">Ages 10-11</option>
                  <option value="12-14">Ages 12-14</option>
                </MetadataSelect>
              </MetadataField>
              
              <MetadataField>
                <MetadataLabel>Subject</MetadataLabel>
                <MetadataSelect
                  value={lesson.subject}
                  onChange={(e) => setLesson(prev => ({ ...prev, subject: e.target.value }))}
                >
                  <option value="Python Programming">Python Programming</option>
                  <option value="AI Ethics">AI Ethics</option>
                  <option value="Logic & Problem Solving">Logic & Problem Solving</option>
                  <option value="Creativity & AI Design">Creativity & AI Design</option>
                </MetadataSelect>
              </MetadataField>
              
              <MetadataField>
                <MetadataLabel>Duration (minutes)</MetadataLabel>
                <MetadataInput
                  type="number"
                  value={lesson.duration}
                  onChange={(e) => setLesson(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  min="15"
                  max="90"
                />
              </MetadataField>
              
              <MetadataField>
                <MetadataLabel>Difficulty</MetadataLabel>
                <MetadataSelect
                  value={lesson.difficulty}
                  onChange={(e) => setLesson(prev => ({ ...prev, difficulty: e.target.value }))}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </MetadataSelect>
              </MetadataField>
            </LessonMetadata>
          </CanvasHeader>

          <LessonElements>
            {lesson.elements.length === 0 ? (
              <EmptyCanvas>
                <EmptyIcon>📝</EmptyIcon>
                <EmptyTitle>Start Building Your Lesson</EmptyTitle>
                <EmptyDescription>
                  Drag elements from the left panel or click on them to add content to your lesson.
                  Create engaging AI education experiences with interactive coding, quizzes, and more!
                </EmptyDescription>
              </EmptyCanvas>
            ) : (
              lesson.elements.map((element, index) => (
                <ElementContainer
                  key={element.id}
                  isSelected={selectedElement === element.id}
                  onClick={() => setSelectedElement(element.id)}
                >
                  <MoveControls>
                    <MoveButton
                      onClick={(e) => {
                        e.stopPropagation();
                        moveElement(element.id, 'up');
                      }}
                      disabled={index === 0}
                    >
                      <ChevronUp size={16} />
                    </MoveButton>
                    <MoveButton
                      onClick={(e) => {
                        e.stopPropagation();
                        moveElement(element.id, 'down');
                      }}
                      disabled={index === lesson.elements.length - 1}
                    >
                      <ChevronDown size={16} />
                    </MoveButton>
                  </MoveControls>
                  
                  <ElementWrapper type={element.type}>
                    <ElementControls>
                      <ControlButton
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateElement(element.id);
                        }}
                        title="Duplicate"
                      >
                        <Copy size={14} />
                      </ControlButton>
                      <ControlButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedElement(element.id);
                        }}
                        title="Edit"
                      >
                        <Edit3 size={14} />
                      </ControlButton>
                      <ControlButton
                        className="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(element.id);
                        }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </ControlButton>
                    </ElementControls>
                    
                    {renderElement(element)}
                  </ElementWrapper>
                </ElementContainer>
              ))
            )}
          </LessonElements>
        </LessonCanvas>

        {/* Right Sidebar - Properties Panel */}
        <PropertiesPanel>
          <PanelTitle>
            <Settings size={20} />
            Properties
          </PanelTitle>
          
          {renderPropertiesPanel()}
        </PropertiesPanel>
      </BuilderContent>
    </LessonBuilderContainer>
  );
};

export default LessonBuilder;