import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAnalytics } from './AnalyticsProvider';
import { useUnsavedWork } from './UnsavedWorkProvider';
import LessonPreview from './LessonPreview';
import DragDropPageBuilder from './DragDropPageBuilder';
import LessonPlayer from './LessonPlayer';
import ThemeAwareLogo from './components/ThemeAwareLogo';
import TemplateGallery from './TemplateGallery';
import ComponentEditor from './ComponentEditor';
import ComponentRenderer from './ComponentRenderer';
import ComponentLibraryBrowser from './ComponentLibraryBrowser';
import {
  BookOpen,
  Plus,
  Edit3,
  Save,
  Eye,
  Settings,
  Target,
  Brain,
  Tag,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Share2,
  Trash2,
  Star,
  AlertCircle,
  Image,
  Video,
  FileText,
  Type,
  Columns,
  Square,
  MousePointer,
  Layout
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

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
`;

// Main Container
const BuilderContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 800px;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
`;

// Header
const BuilderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const BuilderIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  ${css`animation: ${glow} 3s infinite;`}
`;

const HeaderInfo = styled.div``;

const BuilderTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BuilderSubtitle = styled.p`
  margin: 8px 0 0 0;
  opacity: 0.9;
  font-size: 16px;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  background: ${props => 
    props.variant === 'primary' ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.variant === 'secondary' ? 'linear-gradient(135deg, #2196F3, #1976D2)' :
    props.variant === 'warning' ? 'linear-gradient(135deg, #FF9800, #F57C00)' :
    props.variant === 'danger' ? 'linear-gradient(135deg, #f44336, #d32f2f)' :
    props.size === 'small' ? 'linear-gradient(135deg, #6c757d, #495057)' :
    'rgba(255, 255, 255, 0.2)'
  };
  border: ${props => props.size === 'small' ? '1px solid #dee2e6' : 'none'};
  color: ${props => props.size === 'small' ? 'white' : 'white'};
  padding: ${props => props.size === 'small' ? '6px 12px' : '10px 16px'};
  border-radius: ${props => props.size === 'small' ? '6px' : '10px'};
  cursor: pointer;
  font-size: ${props => props.size === 'small' ? '12px' : '14px'};
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: ${props => props.size === 'small' ? '6px' : '8px'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    background: ${props => 
      props.variant === 'primary' ? 'linear-gradient(135deg, #45a049, #4CAF50)' :
      props.variant === 'secondary' ? 'linear-gradient(135deg, #1976D2, #2196F3)' :
      props.variant === 'warning' ? 'linear-gradient(135deg, #F57C00, #FF9800)' :
      props.variant === 'danger' ? 'linear-gradient(135deg, #d32f2f, #f44336)' :
      props.size === 'small' ? 'linear-gradient(135deg, #495057, #343a40)' :
      'rgba(255, 255, 255, 0.3)'
    };
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// New Improved Layout
const BuilderLayout = styled.div`
  display: flex;
  gap: 0;
  height: calc(100vh - 180px);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
`;

// Tabbed Sidebar
const TabbedSidebar = styled.div`
  width: ${props => props.collapsed ? '60px' : '400px'};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  min-width: ${props => props.collapsed ? '60px' : '400px'};
  position: relative;
`;

const SidebarTabs = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const SidebarTab = styled.button`
  flex: 1;
  padding: 15px 8px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  border: none;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 12px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: ${props => props.collapsed ? '10px' : '20px'};
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const CollapseButton = styled.button`
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }
`;

// Main Content Area
const MainContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
`;

const ContentTabs = styled.div`
  display: flex;
  background: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
  padding: 0 20px;
`;

const ContentTab = styled.button`
  padding: 15px 25px;
  background: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#333' : '#666'};
  font-size: 14px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  border-bottom: 3px solid ${props => props.active ? '#4CAF50' : 'transparent'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #333;
    background: rgba(255, 255, 255, 0.7);
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: white;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
`;

// Form Components
const CourseForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  opacity: 0.9;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
  }
  
  option {
    background: #333;
    color: white;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const TagChip = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #ff6b6b;
  }
`;

// Component Library
const ComponentLibrary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ComponentItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

// Lesson Grid
const LessonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const LessonCard = styled.div`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4CAF50;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }
`;

const LessonTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
`;

const LessonMeta = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
`;

const AddLessonCard = styled.div`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 40px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: white;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }
`;

// Lesson Editor Components
const LessonEditor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const LessonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
`;

const LessonHeaderLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const LessonHeaderRight = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const LessonTitleInput = styled.input`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  border: 2px solid transparent;
  background: transparent;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    background: white;
  }
`;

const LessonMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
`;

const MetaField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MetaLabel = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetaInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const ComponentsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ComponentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ComponentCard = styled.div`
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4CAF50;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
`;

const ComponentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ComponentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const ComponentName = styled.h4`
  margin: 0;
  color: #333;
  font-size: 16px;
`;

const ComponentType = styled.span`
  background: #e9ecef;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ComponentActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ComponentContent = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
`;

const CourseBuilder = () => {
  const { trackPageView, trackButtonClick, trackEducationalEvent } = useAnalytics();
  const { markAsUnsaved, markAsSaved } = useUnsavedWork();
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    ageGroup: '10-11',
    difficulty: 'beginner',
    estimatedDuration: '30',
    tags: [],
    category: 'ai-basics',
    isPublished: false,
    version: '1.0.0'
  });
  
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [editingComponent, setEditingComponent] = useState(null);
  const [previewingLesson, setPreviewingLesson] = useState(null);
  const [showComponentBrowser, setShowComponentBrowser] = useState(false);
  const [browserComponentType, setBrowserComponentType] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [saveStatus, setSaveStatus] = useState('saved');
  const [builderMode, setBuilderMode] = useState('linear');
  const [showLessonPlayer, setShowLessonPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState('course-info');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mainContentTab, setMainContentTab] = useState('lessons');

  // Track page view
  useEffect(() => {
    trackPageView('course_builder', { userRole: 'teacher' });
  }, [trackPageView]);

  // Component library
  const componentLibrary = [
    { id: 'rich-text', name: 'Rich Text Block', icon: FileText, category: 'content', description: 'Formatted text with styling options' },
    { id: 'title-header', name: 'Title & Header', icon: Type, category: 'content', description: 'Eye-catching titles and section headers' },
    { id: 'content-slide', name: 'Content Slide', icon: Layout, category: 'content', description: 'Image/video with text in flexible layouts' },
    { id: 'image-block', name: 'Image & Media', icon: Image, category: 'media', description: 'Images, galleries, and visual content' },
    { id: 'video-block', name: 'Video Player', icon: Video, category: 'media', description: 'Embedded videos and multimedia' },
    { id: 'two-column', name: 'Two Column Layout', icon: Columns, category: 'layout', description: 'Side-by-side content sections' },
    { id: 'card-layout', name: 'Card Container', icon: Square, category: 'layout', description: 'Organized content in card format' },
    { id: 'callout-box', name: 'Callout Box', icon: AlertCircle, category: 'layout', description: 'Highlighted information blocks' },
    { id: 'python-playground', name: 'Python Playground', icon: Brain, category: 'interactive', description: 'Interactive Python coding environment' },
    { id: 'ai-prompt', name: 'AI Exercise', icon: Brain, category: 'interactive', description: 'Creative AI prompting activities' },
    { id: 'quiz-block', name: 'Knowledge Check', icon: Target, category: 'assessment', description: 'Interactive quizzes and assessments' },
    { id: 'button-action', name: 'Action Button', icon: MousePointer, category: 'interactive', description: 'Clickable buttons and links' }
  ];

  // Add lesson
  const addLesson = () => {
    const newLesson = {
      id: `lesson_${Date.now()}`,
      title: `Lesson ${lessons.length + 1}`,
      duration: 15,
      points: 10,
      components: []
    };
    setLessons([...lessons, newLesson]);
    setSelectedLesson(newLesson);
    setMainContentTab('lessons');
  };

  // Add component to lesson
  const addComponentToLesson = (component) => {
    if (!selectedLesson) {
      addLesson();
      return;
    }

    // For components with pre-built libraries, open the browser
    const libraryComponents = ['python-playground', 'quiz-block', 'content-slide'];
    if (libraryComponents.includes(component.id)) {
      setBrowserComponentType(component.id);
      setShowComponentBrowser(true);
      return;
    }

    // For other components, add directly with default config
    const newComponent = {
      id: `component_${Date.now()}`,
      type: component.id,
      name: component.name,
      icon: component.icon,
      category: component.category,
      config: getDefaultConfig(component.id)
    };

    const updatedLesson = {
      ...selectedLesson,
      components: [...selectedLesson.components, newComponent]
    };

    setLessons(lessons.map(l => l.id === selectedLesson.id ? updatedLesson : l));
    setSelectedLesson(updatedLesson);
    markAsUnsaved('your course');
  };

  // Handle module selection from library browser
  const handleModuleSelection = (moduleConfig) => {
    if (!selectedLesson || !browserComponentType) return;

    const componentInfo = componentLibrary
      .find(comp => comp.id === browserComponentType);

    const newComponent = {
      id: `component_${Date.now()}`,
      type: browserComponentType,
      name: componentInfo?.name || 'Component',
      icon: componentInfo?.icon || '📝',
      category: componentInfo?.category || 'content',
      config: moduleConfig
    };

    const updatedLesson = {
      ...selectedLesson,
      components: [...selectedLesson.components, newComponent]
    };

    setLessons(lessons.map(l => l.id === selectedLesson.id ? updatedLesson : l));
    setSelectedLesson(updatedLesson);
    setShowComponentBrowser(false);
    setBrowserComponentType(null);
    markAsUnsaved('your course');
  };

  // Get default config for component type
  const getDefaultConfig = (type) => {
    switch (type) {
      case 'rich-text':
        return { content: 'Enter your text content here...' };
      case 'title-header':
        return { title: 'Your Title Here', level: 'h2' };
      case 'two-column':
        return { 
          leftType: 'text',
          leftContent: 'Enter content for the left column...',
          rightType: 'text', 
          rightContent: 'Enter content for the right column...',
          layout: '50-50'
        };
      case 'content-slide':
        return { 
          layout: 'image-right',
          mediaType: 'image',
          imageUrl: '',
          imageCaption: '',
          videoUrl: '',
          videoTitle: '',
          title: 'Your Slide Title',
          content: 'Add your slide content here. This is perfect for explaining concepts with supporting visuals.',
          backgroundColor: '#ffffff',
          theme: 'default'
        };
      case 'image-block':
        return { url: '', alt: 'Image description', caption: '' };
      case 'python-playground':
        return { 
          title: 'Python Exercise',
          description: 'Interactive Python coding exercise',
          code: `# Python Exercise\nprint("Hello, World!")`,
          explanation: 'Try running this code and see what happens!',
          hints: ['Run the code by clicking the play button', 'Try changing the message'],
          expectedOutput: 'Hello, World!',
          editableAreas: []
        };
      default:
        return {};
    }
  };

  // Update course data with unsaved tracking
  const updateCourseData = (updates) => {
    setCourseData({ ...courseData, ...updates });
    markAsUnsaved('your course');
  };

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!courseData.tags.includes(tagInput.trim())) {
        updateCourseData({
          tags: [...courseData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    updateCourseData({
      tags: courseData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Update lesson
  const updateLesson = (lessonId, updates) => {
    setLessons(lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, ...updates } : lesson
    ));
    if (selectedLesson && selectedLesson.id === lessonId) {
      setSelectedLesson({ ...selectedLesson, ...updates });
    }
    markAsUnsaved('your course');
  };

  // Delete component
  const deleteComponent = (lessonId, componentId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      const updatedComponents = lesson.components.filter(comp => comp.id !== componentId);
      updateLesson(lessonId, { components: updatedComponents });
    }
  };

  // Delete lesson
  const deleteLesson = (lessonId) => {
    const updatedLessons = lessons.filter(lesson => lesson.id !== lessonId);
    setLessons(updatedLessons);
    
    // If we deleted the selected lesson, select the first available lesson or clear selection
    if (selectedLesson && selectedLesson.id === lessonId) {
      if (updatedLessons.length > 0) {
        setSelectedLesson(updatedLessons[0]);
      } else {
        setSelectedLesson(null);
        setMainContentTab('course-overview');
      }
    }
    
    markAsUnsaved('your course');
  };

  // Move lesson up/down
  const moveLessonUp = (lessonId) => {
    const lessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
    if (lessonIndex > 0) {
      const newLessons = [...lessons];
      [newLessons[lessonIndex - 1], newLessons[lessonIndex]] = 
        [newLessons[lessonIndex], newLessons[lessonIndex - 1]];
      setLessons(newLessons);
      markAsUnsaved('your course');
    }
  };

  const moveLessonDown = (lessonId) => {
    const lessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
    if (lessonIndex < lessons.length - 1) {
      const newLessons = [...lessons];
      [newLessons[lessonIndex], newLessons[lessonIndex + 1]] = 
        [newLessons[lessonIndex + 1], newLessons[lessonIndex]];
      setLessons(newLessons);
      markAsUnsaved('your course');
    }
  };

  // Delete entire course
  const deleteCourse = () => {
    if (window.confirm('Are you sure you want to delete this entire course? This action cannot be undone.')) {
      // Reset everything to initial state
      setCourseData({
        title: '',
        description: '',
        ageGroup: '8-9',
        difficulty: 'beginner',
        estimatedDuration: 30,
        tags: [],
        isPublished: false
      });
      setLessons([]);
      setSelectedLesson(null);
      setMainContentTab('course-overview');
      markAsUnsaved('your course');
      alert('Course deleted successfully!');
    }
  };

  // Update component
  const updateComponent = (lessonId, componentId, updates) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      const updatedComponents = lesson.components.map(comp =>
        comp.id === componentId ? { ...comp, ...updates } : comp
      );
      updateLesson(lessonId, { components: updatedComponents });
    }
  };

  // Get component content preview
  const getComponentPreview = (component) => {
    switch (component.type) {
      case 'rich-text':
        return component.config?.content || 'No content';
      case 'title-header':
        return component.config?.title || 'No title';
      case 'image-block':
        return component.config?.caption || component.config?.alt || 'Image component';
      case 'ai-prompt':
        return component.config?.prompt || 'AI exercise';
      case 'quiz-block':
        return `Quiz with ${component.config?.questions?.length || 0} questions`;
      default:
        return `${component.type} component`;
    }
  };

  // Save course
  const saveCourse = async () => {
    setSaveStatus('saving');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const courseToSave = {
        ...courseData,
        lessons,
        lastModified: new Date().toISOString()
      };
      
      const existingCourses = JSON.parse(localStorage.getItem('trainarama_created_courses') || '[]');
      const courseIndex = existingCourses.findIndex(c => c.id === courseToSave.id);
      
      if (courseIndex >= 0) {
        existingCourses[courseIndex] = courseToSave;
      } else {
        courseToSave.id = `course_${Date.now()}`;
        existingCourses.push(courseToSave);
      }
      
      localStorage.setItem('trainarama_created_courses', JSON.stringify(existingCourses));
      setSaveStatus('saved');
      markAsSaved();
      
      trackEducationalEvent('course_saved', {
        courseId: courseData.title.toLowerCase().replace(/\s+/g, '-'),
        lessonCount: lessons.length,
        ageGroup: courseData.ageGroup,
        difficulty: courseData.difficulty
      });
      
    } catch (error) {
      console.error('Error saving course:', error);
      setSaveStatus('error');
    }
  };

  // Publish course
  const publishCourse = () => {
    if (lessons.length === 0) {
      alert('Please add at least one lesson before publishing.');
      return;
    }
    
    setCourseData({ ...courseData, isPublished: true });
    trackEducationalEvent('course_published', {
      courseId: courseData.title.toLowerCase().replace(/\s+/g, '-'),
      ageGroup: courseData.ageGroup,
      lessonCount: lessons.length
    });
    alert('Course published successfully! 🎉');
  };

  return (
    <BuilderContainer>
      <BuilderHeader>
        <HeaderLeft>
          <BuilderIcon>
            <Edit3 size={28} />
          </BuilderIcon>
          <HeaderInfo>
            <BuilderTitle>
              <ThemeAwareLogo size={24} />
              Course Builder
            </BuilderTitle>
            <BuilderSubtitle>
              Create engaging AI education courses with full customization
            </BuilderSubtitle>
          </HeaderInfo>
        </HeaderLeft>
        
        <HeaderControls>
          <ControlButton 
            variant={builderMode === 'drag-drop' ? 'primary' : 'secondary'}
            onClick={() => setBuilderMode(builderMode === 'linear' ? 'drag-drop' : 'linear')}
            title="Toggle between linear and drag-drop builders"
          >
            <Layout size={16} />
            {builderMode === 'linear' ? 'PowerPoint Mode' : 'Linear Mode'}
          </ControlButton>
          <ControlButton onClick={saveCourse} disabled={saveStatus === 'saving'}>
            <Save size={16} />
            {saveStatus === 'saving' ? 'Saving...' : 'Save Course'}
          </ControlButton>
          <ControlButton variant="primary" onClick={publishCourse}>
            <Share2 size={16} />
            Publish Course
          </ControlButton>
          {lessons.length > 0 && (
            <ControlButton 
              variant="secondary" 
              onClick={() => setShowLessonPlayer(true)}
              style={{ background: 'linear-gradient(135deg, #4CAF50, #45a049)' }}
            >
              <Play size={16} />
              Play Course
            </ControlButton>
          )}
          <ControlButton 
            variant="danger" 
            onClick={deleteCourse}
            style={{ background: 'linear-gradient(135deg, #f44336, #d32f2f)' }}
            title="Delete entire course"
          >
            <Trash2 size={16} />
            Delete Course
          </ControlButton>
        </HeaderControls>
      </BuilderHeader>
      
      <BuilderLayout>
        {/* New Tabbed Sidebar */}
        <TabbedSidebar collapsed={sidebarCollapsed}>
          <CollapseButton onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </CollapseButton>
          
          {!sidebarCollapsed && (
            <>
              <SidebarTabs>
                <SidebarTab 
                  active={activeTab === 'course-info'} 
                  onClick={() => setActiveTab('course-info')}
                >
                  <Settings size={16} />
                  Course Info
                </SidebarTab>
                <SidebarTab 
                  active={activeTab === 'components'} 
                  onClick={() => setActiveTab('components')}
                >
                  <Plus size={16} />
                  Components
                </SidebarTab>
              </SidebarTabs>
              
              <SidebarContent>
                {activeTab === 'course-info' && (
                  <div>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '20px' }}>
                      Course Information
                    </h3>
                    <CourseForm>
                      <InputGroup>
                        <InputLabel>Course Title</InputLabel>
                        <Input
                          value={courseData.title}
                          onChange={(e) => updateCourseData({ title: e.target.value })}
                          placeholder="My Amazing AI Course"
                        />
                      </InputGroup>
                      
                      <InputGroup>
                        <InputLabel>Description</InputLabel>
                        <TextArea
                          value={courseData.description}
                          onChange={(e) => updateCourseData({ description: e.target.value })}
                          placeholder="Describe what students will learn..."
                        />
                      </InputGroup>
                      
                      <InputGroup>
                        <InputLabel>Age Group</InputLabel>
                        <Select
                          value={courseData.ageGroup}
                          onChange={(e) => updateCourseData({ ageGroup: e.target.value })}
                        >
                          <option value="8-9">8-9 years (Elementary)</option>
                          <option value="10-11">10-11 years (Middle)</option>
                          <option value="12-14">12-14 years (Advanced)</option>
                        </Select>
                      </InputGroup>
                      
                      <InputGroup>
                        <InputLabel>Difficulty Level</InputLabel>
                        <Select
                          value={courseData.difficulty}
                          onChange={(e) => updateCourseData({ difficulty: e.target.value })}
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </Select>
                      </InputGroup>
                      
                      <InputGroup>
                        <InputLabel>Estimated Duration (minutes)</InputLabel>
                        <Input
                          type="number"
                          value={courseData.estimatedDuration}
                          onChange={(e) => updateCourseData({ estimatedDuration: e.target.value })}
                          placeholder="30"
                        />
                      </InputGroup>
                      
                      <InputGroup>
                        <InputLabel>Tags</InputLabel>
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleTagInput}
                          placeholder="Add tags (press Enter)"
                        />
                        <TagsContainer>
                          {courseData.tags.map((tag, index) => (
                            <TagChip key={index}>
                              <Tag size={12} />
                              {tag}
                              <RemoveTag onClick={() => removeTag(tag)}>×</RemoveTag>
                            </TagChip>
                          ))}
                        </TagsContainer>
                      </InputGroup>
                    </CourseForm>
                  </div>
                )}
                
                {activeTab === 'components' && (
                  <div>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '20px' }}>
                      Content Components
                    </h3>
                    <ComponentLibrary>
                      {['content', 'media', 'layout', 'interactive', 'assessment'].map(category => {
                        const categoryComponents = componentLibrary.filter(comp => comp.category === category);
                        if (categoryComponents.length === 0) return null;
                        
                        return (
                          <div key={category} style={{ marginBottom: '20px' }}>
                            <div style={{
                              fontSize: '11px',
                              fontWeight: 'bold',
                              color: 'rgba(255,255,255,0.7)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              marginBottom: '8px',
                              paddingLeft: '4px'
                            }}>
                              {category}
                            </div>
                            {categoryComponents.map((component) => {
                              const IconComponent = component.icon;
                              return (
                                <ComponentItem
                                  key={component.id}
                                  onClick={() => addComponentToLesson(component)}
                                  title={component.description}
                                >
                                  <IconComponent size={16} />
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{ fontWeight: '500' }}>{component.name}</span>
                                    <span style={{ fontSize: '11px', opacity: 0.7 }}>
                                      {component.description}
                                    </span>
                                  </div>
                                </ComponentItem>
                              );
                            })}
                          </div>
                        );
                      })}
                    </ComponentLibrary>
                  </div>
                )}
              </SidebarContent>
            </>
          )}
        </TabbedSidebar>
        
        {/* Main Content Area */}
        <MainContentArea>
          <ContentTabs>
            <ContentTab 
              active={mainContentTab === 'lessons'} 
              onClick={() => setMainContentTab('lessons')}
            >
              <BookOpen size={16} />
              Lessons ({lessons.length})
            </ContentTab>
            <ContentTab 
              active={mainContentTab === 'templates'} 
              onClick={() => setMainContentTab('templates')}
            >
              <Star size={16} />
              Template Gallery
            </ContentTab>
            {selectedLesson && (
              <ContentTab 
                active={mainContentTab === 'edit-lesson'} 
                onClick={() => setMainContentTab('edit-lesson')}
              >
                <Edit3 size={16} />
                Edit: {selectedLesson.title}
              </ContentTab>
            )}
            {builderMode === 'drag-drop' && selectedLesson && (
              <ContentTab 
                active={mainContentTab === 'builder'} 
                onClick={() => setMainContentTab('builder')}
              >
                <Layout size={16} />
                PowerPoint Builder
              </ContentTab>
            )}
          </ContentTabs>
          
          <ContentArea>
            {mainContentTab === 'lessons' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ margin: 0, color: '#333' }}>Course Lessons</h2>
                  <ControlButton onClick={addLesson}>
                    <Plus size={16} />
                    Add New Lesson
                  </ControlButton>
                </div>
                
                {lessons.length === 0 ? (
                  <AddLessonCard onClick={addLesson}>
                    <Plus size={48} />
                    <h3>Create Your First Lesson</h3>
                    <p>Start building your course by adding lessons with interactive components</p>
                  </AddLessonCard>
                ) : (
                  <LessonGrid>
                    {lessons.map((lesson, index) => (
                      <LessonCard 
                        key={lesson.id}
                        onClick={() => {
                          setSelectedLesson(lesson);
                          setMainContentTab('edit-lesson');
                        }}
                        style={{ 
                          borderColor: selectedLesson?.id === lesson.id ? '#4CAF50' : '#e9ecef',
                          backgroundColor: selectedLesson?.id === lesson.id ? '#f8fff8' : '#f8f9fa'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <LessonTitle>
                              {index + 1}. {lesson.title}
                            </LessonTitle>
                            <LessonMeta>
                              {lesson.components.length} components • {lesson.duration} min • {lesson.points} pts
                            </LessonMeta>
                          </div>
                          <div style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <ControlButton 
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveLessonUp(lesson.id);
                                }}
                                disabled={index === 0}
                                title="Move lesson up"
                              >
                                <ChevronUp size={12} />
                              </ControlButton>
                              <ControlButton 
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveLessonDown(lesson.id);
                                }}
                                disabled={index === lessons.length - 1}
                                title="Move lesson down"
                              >
                                <ChevronDown size={12} />
                              </ControlButton>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {builderMode === 'drag-drop' && (
                                <ControlButton 
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedLesson(lesson);
                                    setMainContentTab('builder');
                                  }}
                                  title="Edit in PowerPoint mode"
                                >
                                  <Layout size={12} />
                                </ControlButton>
                              )}
                              <ControlButton 
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewingLesson(lesson);
                                }}
                                title="Preview lesson"
                              >
                                <Eye size={12} />
                              </ControlButton>
                              <ControlButton 
                                size="small"
                                variant="danger"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm(`Are you sure you want to delete "${lesson.title}"?`)) {
                                    deleteLesson(lesson.id);
                                  }
                                }}
                                title="Delete lesson"
                              >
                                <Trash2 size={12} />
                              </ControlButton>
                            </div>
                          </div>
                        </div>
                        
                        {lesson.components.length > 0 && (
                          <div style={{ marginTop: '15px' }}>
                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Components:</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {lesson.components.slice(0, 4).map((comp, idx) => {
                                const IconComponent = comp.icon || FileText;
                                return (
                                  <div key={idx} style={{
                                    background: '#e9ecef',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}>
                                    <IconComponent size={12} />
                                    {comp.type}
                                  </div>
                                );
                              })}
                              {lesson.components.length > 4 && (
                                <div style={{
                                  background: '#dee2e6',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '11px'
                                }}>
                                  +{lesson.components.length - 4} more
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </LessonCard>
                    ))}
                    
                    <AddLessonCard onClick={addLesson}>
                      <Plus size={32} />
                      <div>Add New Lesson</div>
                    </AddLessonCard>
                  </LessonGrid>
                )}
              </div>
            )}
            
            {mainContentTab === 'templates' && (
              <TemplateGallery 
                onImportTemplate={(template) => {
                  // Convert template to lesson format with proper component configurations
                  const convertTemplateElement = (element, index) => {
                    const componentLibraryItem = componentLibrary.find(c => c.id === element.type);
                    const baseComponent = {
                      id: `component_${Date.now()}_${index}`,
                      type: element.type,
                      name: componentLibraryItem?.name || element.type.replace('-', ' '),
                      icon: componentLibraryItem?.icon || FileText,
                      category: componentLibraryItem?.category || 'content'
                    };

                    // Convert template element content to proper component config
                    switch (element.type) {
                      case 'title':
                      case 'title-header':
                        return {
                          ...baseComponent,
                          type: 'title-header',
                          config: {
                            title: element.content?.text || element.content || 'Your Title Here',
                            subtitle: element.content?.subtitle || '',
                            level: element.content?.level || 'h1',
                            align: element.content?.align || 'center',
                            theme: element.content?.gradient ? 'gradient' : (element.content?.theme || 'default')
                          }
                        };

                      case 'text':
                      case 'text-block':
                        return {
                          ...baseComponent,
                          type: 'text-block',
                          config: {
                            content: element.content?.text || element.content || 'Enter your content here...',
                            formatting: element.content?.formatting || 'paragraph'
                          }
                        };

                      case 'python-playground':
                        return {
                          ...baseComponent,
                          type: 'python-playground',
                          config: {
                            title: element.content?.title || 'Python Exercise',
                            description: element.content?.description || 'Interactive Python coding exercise',
                            code: element.content?.code || `# Python Exercise\nprint("Hello, World!")`,
                            explanation: element.content?.explanation || 'Try running this code and see what happens!',
                            hints: element.content?.hints || ['Run the code by clicking the play button', 'Try changing the message'],
                            expectedOutput: element.content?.expectedOutput || 'Hello, World!',
                            editableAreas: element.content?.editableAreas || []
                          }
                        };

                      case 'video':
                      case 'video-block':
                        return {
                          ...baseComponent,
                          type: 'video-block',
                          config: {
                            title: element.content?.title || 'Video Lesson',
                            description: element.content?.description || 'Educational video content',
                            url: element.content?.url || '',
                            duration: element.content?.duration || 5,
                            videoType: 'youtube'
                          }
                        };

                      case 'quiz':
                      case 'quiz-block':
                        return {
                          ...baseComponent,
                          type: 'quiz-block',
                          config: {
                            questions: element.content?.questions || [{
                              question: element.content?.question || 'Sample question?',
                              type: element.content?.type || 'multiple-choice',
                              options: element.content?.options || ['Option A', 'Option B', 'Option C', 'Option D'],
                              correct: element.content?.correct || 0,
                              explanation: element.content?.explanation || '',
                              hint: element.content?.hint || ''
                            }]
                          }
                        };

                      case 'ai-prompt':
                        return {
                          ...baseComponent,
                          config: {
                            prompt: element.content?.prompt || 'Create something interesting...',
                            expectedLength: element.content?.expectedLength || 'medium',
                            difficulty: element.content?.difficulty || 'beginner',
                            hints: element.content?.hints || []
                          }
                        };

                      case 'two-column':
                        return {
                          ...baseComponent,
                          config: {
                            leftType: 'text',
                            leftContent: element.content?.leftContent || 'Left column content...',
                            rightType: 'text',
                            rightContent: element.content?.rightContent || 'Right column content...',
                            layout: element.content?.layout || '50-50'
                          }
                        };

                      case 'image':
                      case 'image-block':
                        return {
                          ...baseComponent,
                          type: 'content-slide',
                          config: {
                            title: element.content?.title || 'Image with Text',
                            content: element.content?.description || 'Add your description here...',
                            layout: 'image-right',
                            mediaType: 'image',
                            imageUrl: element.content?.url || '',
                            imageCaption: element.content?.caption || '',
                            backgroundColor: '#ffffff',
                            theme: 'default'
                          }
                        };

                      default:
                        return {
                          ...baseComponent,
                          config: getDefaultConfig(element.type)
                        };
                    }
                  };

                  const newLesson = {
                    id: `lesson_${Date.now()}`,
                    title: template.title,
                    duration: template.duration || 15,
                    points: 10,
                    components: template.elements?.map(convertTemplateElement) || []
                  };
                  
                  setLessons([...lessons, newLesson]);
                  setSelectedLesson(newLesson);
                  setMainContentTab('lessons');
                  alert(`Template "${template.title}" imported successfully!`);
                }}
              />
            )}
            
            {mainContentTab === 'edit-lesson' && selectedLesson && (
              <LessonEditor>
                <LessonHeader>
                  <LessonHeaderLeft>
                    <LessonTitleInput
                      value={selectedLesson.title}
                      onChange={(e) => updateLesson(selectedLesson.id, { title: e.target.value })}
                      placeholder="Lesson Title"
                    />
                    <LessonMetaGrid>
                      <MetaField>
                        <MetaLabel>Duration (minutes)</MetaLabel>
                        <MetaInput
                          type="number"
                          value={selectedLesson.duration || 15}
                          onChange={(e) => updateLesson(selectedLesson.id, { duration: parseInt(e.target.value) || 15 })}
                        />
                      </MetaField>
                      <MetaField>
                        <MetaLabel>Points</MetaLabel>
                        <MetaInput
                          type="number"
                          value={selectedLesson.points || 10}
                          onChange={(e) => updateLesson(selectedLesson.id, { points: parseInt(e.target.value) || 10 })}
                        />
                      </MetaField>
                      <MetaField>
                        <MetaLabel>Difficulty</MetaLabel>
                        <select
                          value={selectedLesson.difficulty || 'beginner'}
                          onChange={(e) => updateLesson(selectedLesson.id, { difficulty: e.target.value })}
                          style={{
                            padding: '8px 12px',
                            border: '2px solid #e9ecef',
                            borderRadius: '6px',
                            fontSize: '14px',
                            background: 'white'
                          }}
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </MetaField>
                    </LessonMetaGrid>
                  </LessonHeaderLeft>
                  <LessonHeaderRight>
                    <ControlButton onClick={() => setPreviewingLesson(selectedLesson)}>
                      <Eye size={16} />
                      Preview
                    </ControlButton>
                    {builderMode === 'drag-drop' && (
                      <ControlButton onClick={() => setMainContentTab('builder')}>
                        <Layout size={16} />
                        PowerPoint Mode
                      </ControlButton>
                    )}
                    <ControlButton 
                      variant="danger"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${selectedLesson.title}"?`)) {
                          deleteLesson(selectedLesson.id);
                        }
                      }}
                      title="Delete this lesson"
                    >
                      <Trash2 size={16} />
                      Delete
                    </ControlButton>
                  </LessonHeaderRight>
                </LessonHeader>

                <ComponentsSection>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <SectionTitle>
                      <Square size={20} />
                      Lesson Components ({selectedLesson.components?.length || 0})
                    </SectionTitle>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <ControlButton 
                        variant="secondary"
                        onClick={() => setActiveTab('components')}
                      >
                        <Plus size={16} />
                        Add Component
                      </ControlButton>
                    </div>
                  </div>

                  {!selectedLesson.components || selectedLesson.components.length === 0 ? (
                    <EmptyState>
                      <Square size={48} style={{ marginBottom: '15px', opacity: 0.3 }} />
                      <h3>No Components Yet</h3>
                      <p>Start building your lesson by adding components from the sidebar.</p>
                      <ControlButton 
                        onClick={() => setActiveTab('components')}
                        style={{ marginTop: '15px' }}
                      >
                        <Plus size={16} />
                        Browse Components
                      </ControlButton>
                    </EmptyState>
                  ) : (
                    <ComponentsList>
                      {selectedLesson.components.map((component, index) => {
                        const IconComponent = component.icon || FileText;
                        return (
                          <ComponentCard key={component.id}>
                            <ComponentHeader>
                              <ComponentInfo>
                                <IconComponent size={20} />
                                <div>
                                  <ComponentName>{component.name}</ComponentName>
                                  <ComponentType>{component.type}</ComponentType>
                                </div>
                              </ComponentInfo>
                              <ComponentActions>
                                <ControlButton 
                                  size="small"
                                  onClick={() => setEditingComponent(component)}
                                >
                                  <Edit3 size={14} />
                                  Edit
                                </ControlButton>
                                <ControlButton 
                                  size="small"
                                  variant="danger"
                                  onClick={() => {
                                    if (window.confirm('Delete this component?')) {
                                      deleteComponent(selectedLesson.id, component.id);
                                    }
                                  }}
                                >
                                  <Trash2 size={14} />
                                </ControlButton>
                              </ComponentActions>
                            </ComponentHeader>
                            <ComponentContent>
                              <ComponentRenderer component={component} />
                            </ComponentContent>
                          </ComponentCard>
                        );
                      })}
                    </ComponentsList>
                  )}
                </ComponentsSection>
              </LessonEditor>
            )}
            
            {mainContentTab === 'builder' && selectedLesson && builderMode === 'drag-drop' && (
              <DragDropPageBuilder
                initialData={selectedLesson}
                onSave={(pageData) => {
                  const updatedLesson = {
                    ...selectedLesson,
                    components: pageData.components.map(comp => ({
                      id: comp.id,
                      type: comp.type,
                      name: comp.content || comp.type,
                      icon: componentLibrary.find(c => c.id === comp.type)?.icon || FileText,
                      category: componentLibrary.find(c => c.id === comp.type)?.category || 'content',
                      config: {
                        content: comp.content,
                        x: comp.x,
                        y: comp.y,
                        width: comp.width,
                        height: comp.height,
                        backgroundColor: comp.backgroundColor,
                        textColor: comp.textColor,
                        position: 'absolute'
                      }
                    }))
                  };
                  
                  setLessons(lessons.map(l => l.id === selectedLesson.id ? updatedLesson : l));
                  setSelectedLesson(updatedLesson);
                }}
              />
            )}
          </ContentArea>
        </MainContentArea>
      </BuilderLayout>
      
      {/* Lesson Preview Modal */}
      {previewingLesson && (
        <LessonPreview
          lesson={previewingLesson}
          onClose={() => setPreviewingLesson(null)}
        />
      )}
      
      {/* Lesson Player Modal */}
      {showLessonPlayer && lessons.length > 0 && (
        <LessonPlayer
          course={{
            title: courseData.title || 'Course Preview',
            description: courseData.description,
            lessons: lessons.map(lesson => ({
              id: lesson.id,
              title: lesson.title,
              duration: lesson.duration || 15,
              components: lesson.components.map(comp => ({
                id: comp.id,
                type: comp.type,
                name: comp.name || comp.type.replace('-', ' '),
                category: comp.category,
                icon: componentLibrary.find(c => c.id === comp.type)?.icon,
                config: comp.config
              }))
            }))
          }}
          onExit={() => setShowLessonPlayer(false)}
          onComplete={() => {
            setShowLessonPlayer(false);
            alert('🎉 Course completed! Amazing work!');
          }}
        />
      )}
      
      {/* Component Editor Modal */}
      {editingComponent && (
        <ComponentEditor
          component={editingComponent}
          onSave={(updatedComponent) => {
            updateComponent(selectedLesson.id, editingComponent.id, updatedComponent);
            setEditingComponent(null);
          }}
          onClose={() => setEditingComponent(null)}
        />
      )}
      
      {/* Component Library Browser Modal */}
      {showComponentBrowser && (
        <ComponentLibraryBrowser
          componentType={browserComponentType}
          onSelectModule={handleModuleSelection}
          onClose={() => {
            setShowComponentBrowser(false);
            setBrowserComponentType(null);
          }}
        />
      )}
    </BuilderContainer>
  );
};

export default CourseBuilder;