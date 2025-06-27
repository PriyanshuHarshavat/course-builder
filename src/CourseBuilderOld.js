import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAnalytics } from './AnalyticsProvider';
import { useTheme } from './theme/ThemeProvider';
import RichContentEditor from './RichContentEditor';
import LessonPreview from './LessonPreview';
import DragDropPageBuilder from './DragDropPageBuilder';
import LessonPlayer from './LessonPlayer';
import ThemeAwareLogo from './components/ThemeAwareLogo';
import ThemeAwareIcon from './components/ThemeAwareIcon';
import {
  BookOpen,
  Plus,
  Edit3,
  Save,
  Eye,
  Settings,
  Users,
  Target,
  Award,
  Zap,
  Brain,
  Palette,
  Code,
  MessageSquare,
  Shield,
  Clock,
  Calendar,
  Tag,
  Search,
  Filter,
  Upload,
  Download,
  Share2,
  Copy,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Layers,
  Grid,
  List,
  Image,
  Video,
  FileText,
  Lightbulb,
  Trophy,
  Flame,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
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

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
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
    'rgba(255, 255, 255, 0.2)'
  };
  border: none;
  color: white;
  padding: 10px 16px;
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

// Main Layout - New Improved Design
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
  width: ${props => props.collapsed ? '60px' : '380px'};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  min-width: ${props => props.collapsed ? '60px' : '380px'};
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

// Main Content Area - Much Larger
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

// Sidebar
const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
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

const SidebarSection = styled.div`
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

// Course Info Form
const CourseForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputLabel = styled.label`
  font-size: 13px;
  font-weight: bold;
  opacity: 0.9;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  color: white;
  padding: 10px 12px;
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
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
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
  padding: 10px 12px;
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

// Tags System
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const TagChip = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TagInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 12px;
  width: 100px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
  }
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  
  &:hover {
    color: white;
  }
`;

// Component Library
const ComponentLibrary = styled.div`
  display: grid;
  gap: 8px;
`;

const ComponentItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 13px;
  margin-bottom: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
  
  &:active {
    cursor: grabbing;
  }
`;

// Main Editor
const EditorArea = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`;


// Lesson Canvas
const LessonCanvas = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  min-height: 400px;
  padding: 20px;
  position: relative;
`;

// Page Flow Section
const PageFlowSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
`;

const FlowTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
`;

const PageFlowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
  
  &::-webkit-scrollbar {
    height: 6px;
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

const PageCard = styled.div`
  background: ${props => props.selected ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'rgba(255, 255, 255, 0.15)'};
  border: 2px solid ${props => props.selected ? '#4CAF50' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 12px;
  padding: 15px;
  min-width: 180px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.selected ? '#4CAF50' : 'rgba(255, 255, 255, 0.5)'};
    background: ${props => props.selected ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const PageNumber = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

const PageTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;
`;

const PageMeta = styled.div`
  font-size: 12px;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ArrowIcon = styled.div`
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const AddPageButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 2px dashed rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  padding: 15px;
  min-width: 180px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }
`;

const SelectedPageEditor = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
`;

const EditorTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const EditorControls = styled.div`
  display: flex;
  gap: 8px;
`;

const DropZone = styled.div`
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  
  &.drag-over {
    border-color: #4CAF50;
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
  }
`;

const LessonBlock = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  position: relative;
  ${css`animation: ${slideIn} 0.3s ease-out;`}
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 10px;
  gap: 10px;
`;

const BlockTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const BlockControls = styled.div`
  display: flex;
  gap: 4px;
`;

const BlockButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Properties Panel
const PropertiesPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  overflow-y: auto;
`;

const PropertyGroup = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PropertyTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

// Gamification Designer
const GamificationDesigner = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
`;

const PointsConfig = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const BadgeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 10px;
`;

const BadgeOption = styled.div`
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.selected ? 'rgba(255, 255, 255, 0.5)' : 'transparent'};
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

// Analytics Preview
const AnalyticsPreview = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
`;

const AnalyticsCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 10px;
  text-align: center;
`;

const AnalyticsValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.color || '#fff'};
`;

const AnalyticsLabel = styled.div`
  font-size: 11px;
  opacity: 0.8;
  margin-top: 2px;
`;

// Course Builder Main Component
const CourseBuilder = () => {
  const { trackPageView, trackButtonClick, trackEducationalEvent } = useAnalytics();
  const { theme } = useTheme();
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
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editingComponent, setEditingComponent] = useState(null);
  const [previewingLesson, setPreviewingLesson] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, error
  const [builderMode, setBuilderMode] = useState('linear'); // linear, drag-drop
  const [showLessonPlayer, setShowLessonPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState('course-info'); // course-info, lessons, templates
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Track page view
  useEffect(() => {
    trackPageView('course_builder', { userRole: 'teacher' });
  }, [trackPageView]);
  
  // Enhanced component library for professional content creation
  const componentLibrary = [
    // Content Components
    { id: 'rich-text', name: 'Rich Text Block', icon: FileText, category: 'content', description: 'Formatted text with styling options' },
    { id: 'title-header', name: 'Title & Header', icon: Type, category: 'content', description: 'Eye-catching titles and section headers' },
    { id: 'image-block', name: 'Image & Media', icon: Image, category: 'media', description: 'Images, galleries, and visual content' },
    { id: 'video-block', name: 'Video Player', icon: Video, category: 'media', description: 'Embedded videos and multimedia' },
    
    // Layout Components
    { id: 'two-column', name: 'Two Column Layout', icon: Columns, category: 'layout', description: 'Side-by-side content sections' },
    { id: 'card-layout', name: 'Card Container', icon: Square, category: 'layout', description: 'Organized content in card format' },
    { id: 'callout-box', name: 'Callout Box', icon: AlertCircle, category: 'layout', description: 'Highlighted information blocks' },
    
    // Interactive Components
    { id: 'ai-prompt', name: 'AI Exercise', icon: Brain, category: 'interactive', description: 'Creative AI prompting activities' },
    { id: 'quiz-block', name: 'Knowledge Check', icon: Target, category: 'assessment', description: 'Interactive quizzes and assessments' },
    { id: 'button-action', name: 'Action Button', icon: MousePointer, category: 'interactive', description: 'Clickable buttons and links' }
  ];
  
  // Gamification presets
  const gamificationPresets = {
    beginner: { basePoints: 25, multiplier: 1.0, badges: ['first-lesson', 'quick-learner', 'curiosity-champion'] },
    intermediate: { basePoints: 50, multiplier: 1.2, badges: ['problem-solver', 'logic-master', 'perseverance-pro'] },
    advanced: { basePoints: 75, multiplier: 1.5, badges: ['innovation-master', 'coding-wizard', 'tech-pioneer'] }
  };
  
  // Badge options
  const badgeOptions = [
    { id: 'first-lesson', emoji: '🎯', name: 'First Lesson' },
    { id: 'quick-learner', emoji: '⚡', name: 'Quick Learner' },
    { id: 'creative-mind', emoji: '🎨', name: 'Creative Mind' },
    { id: 'problem-solver', emoji: '🧩', name: 'Problem Solver' },
    { id: 'ai-explorer', emoji: '🤖', name: 'AI Explorer' },
    { id: 'safety-champion', emoji: '🛡️', name: 'Safety Champion' },
    { id: 'collaboration-star', emoji: '⭐', name: 'Collaboration Star' },
    { id: 'innovation-master', emoji: '🚀', name: 'Innovation Master' },
    
    // Additional badges
    { id: 'coding-wizard', emoji: '🧙‍♂️', name: 'Coding Wizard' },
    { id: 'data-detective', emoji: '🔍', name: 'Data Detective' },
    { id: 'future-builder', emoji: '🏗️', name: 'Future Builder' },
    { id: 'tech-pioneer', emoji: '🌟', name: 'Tech Pioneer' },
    { id: 'digital-citizen', emoji: '🌐', name: 'Digital Citizen' },
    { id: 'logic-master', emoji: '🧠', name: 'Logic Master' },
    { id: 'algorithm-ace', emoji: '⚙️', name: 'Algorithm Ace' },
    { id: 'ethics-expert', emoji: '⚖️', name: 'Ethics Expert' },
    { id: 'helper-hero', emoji: '🦸‍♀️', name: 'Helper Hero' },
    { id: 'curiosity-champion', emoji: '🔬', name: 'Curiosity Champion' },
    { id: 'perseverance-pro', emoji: '💪', name: 'Perseverance Pro' },
    { id: 'teamwork-titan', emoji: '🤝', name: 'Teamwork Titan' }
  ];
  
  // Add new lesson
  const addLesson = () => {
    const newLesson = {
      id: `lesson_${Date.now()}`,
      title: `Page ${lessons.length + 1}`,
      components: [],
      duration: 15,
      points: gamificationPresets[courseData.difficulty].basePoints,
      badges: [],
      order: lessons.length
    };
    const updatedLessons = [...lessons, newLesson];
    setLessons(updatedLessons);
    setSelectedLesson(newLesson);
    
    trackButtonClick('add_lesson', { 
      lessonCount: updatedLessons.length,
      courseTitle: courseData.title 
    });
  };
  
  // Add component to lesson
  const addComponentToLesson = (componentType) => {
    if (!selectedLesson) return;
    
    const newComponent = {
      id: `component_${Date.now()}`,
      type: componentType.id,
      name: componentType.name,
      icon: componentType.icon,
      category: componentType.category,
      config: getDefaultConfig(componentType.id),
      order: selectedLesson.components.length
    };
    
    const updatedLessons = lessons.map(lesson => 
      lesson.id === selectedLesson.id 
        ? { ...lesson, components: [...lesson.components, newComponent] }
        : lesson
    );
    
    setLessons(updatedLessons);
    setSelectedLesson({ ...selectedLesson, components: [...selectedLesson.components, newComponent] });
    setSelectedComponent(newComponent);
    
    trackButtonClick('add_component', { 
      componentType: componentType.id, 
      lessonId: selectedLesson.id 
    });
  };
  
  // Edit component
  const editComponent = (component) => {
    setEditingComponent(component);
    trackButtonClick('edit_component', { 
      componentType: component.type, 
      componentId: component.id 
    });
  };
  
  // Save component after editing
  const saveComponent = (updatedComponent) => {
    const updatedLessons = lessons.map(lesson => ({
      ...lesson,
      components: lesson.components.map(comp => 
        comp.id === updatedComponent.id ? updatedComponent : comp
      )
    }));
    
    setLessons(updatedLessons);
    
    // Update selected lesson if it contains this component
    if (selectedLesson && selectedLesson.components.some(c => c.id === updatedComponent.id)) {
      setSelectedLesson({
        ...selectedLesson,
        components: selectedLesson.components.map(comp => 
          comp.id === updatedComponent.id ? updatedComponent : comp
        )
      });
    }
    
    setEditingComponent(null);
    trackButtonClick('save_component', { 
      componentType: updatedComponent.type, 
      componentId: updatedComponent.id 
    });
  };
  
  // Delete component
  const deleteComponent = (componentId) => {
    if (!selectedLesson) return;
    
    const updatedLessons = lessons.map(lesson => 
      lesson.id === selectedLesson.id 
        ? { 
            ...lesson, 
            components: lesson.components.filter(comp => comp.id !== componentId) 
          }
        : lesson
    );
    
    setLessons(updatedLessons);
    setSelectedLesson({
      ...selectedLesson,
      components: selectedLesson.components.filter(comp => comp.id !== componentId)
    });
    
    if (selectedComponent && selectedComponent.id === componentId) {
      setSelectedComponent(null);
    }
    
    trackButtonClick('delete_component', { componentId });
  };
  
  // Duplicate component
  const duplicateComponent = (component) => {
    if (!selectedLesson) return;
    
    const duplicatedComponent = {
      ...component,
      id: `component_${Date.now()}`,
      name: `${component.name} (Copy)`,
      order: selectedLesson.components.length
    };
    
    const updatedLessons = lessons.map(lesson => 
      lesson.id === selectedLesson.id 
        ? { ...lesson, components: [...lesson.components, duplicatedComponent] }
        : lesson
    );
    
    setLessons(updatedLessons);
    setSelectedLesson({ 
      ...selectedLesson, 
      components: [...selectedLesson.components, duplicatedComponent] 
    });
    
    trackButtonClick('duplicate_component', { 
      componentType: component.type, 
      originalId: component.id,
      newId: duplicatedComponent.id 
    });
  };
  
  // Get default configuration for component types
  const getDefaultConfig = (componentType) => {
    switch (componentType) {
      case 'rich-text':
        return { 
          content: 'Enter your rich content here...', 
          fontSize: '16px',
          fontWeight: 'normal',
          textAlign: 'left',
          backgroundColor: 'transparent',
          textColor: '#000000',
          padding: '20px'
        };
      case 'title-header':
        return { 
          title: 'Your Title Here', 
          subtitle: 'Optional subtitle',
          style: 'h1',
          textAlign: 'center',
          textColor: '#2d3748',
          backgroundColor: 'transparent'
        };
      case 'image-block':
        return { 
          imageUrl: '', 
          caption: 'Image caption',
          altText: 'Descriptive text',
          layout: 'center',
          width: '100%',
          borderRadius: '8px'
        };
      case 'video-block':
        return { 
          url: '', 
          title: 'Video Title', 
          description: 'Video description',
          autoplay: false,
          controls: true
        };
      case 'two-column':
        return {
          leftContent: 'Left column content...',
          rightContent: 'Right column content...',
          leftWidth: '50%',
          gap: '20px',
          verticalAlign: 'top'
        };
      case 'card-layout':
        return {
          title: 'Card Title',
          content: 'Card content goes here...',
          backgroundColor: '#f7fafc',
          borderColor: '#e2e8f0',
          borderRadius: '12px',
          padding: '24px'
        };
      case 'callout-box':
        return {
          type: 'info',
          title: 'Important Note',
          content: 'This is an important piece of information...',
          icon: 'info',
          backgroundColor: '#ebf8ff',
          borderColor: '#3182ce'
        };
      case 'ai-prompt':
        return { 
          prompt: 'Create a story about a friendly robot...',
          expectedLength: 'short',
          difficulty: courseData.difficulty,
          hints: ['Think about the robot\'s personality', 'What makes them friendly?']
        };
      case 'quiz-block':
        return {
          questions: [{
            question: 'What did you learn?',
            type: 'multiple-choice',
            options: ['Option A', 'Option B', 'Option C'],
            correct: 0
          }]
        };
      case 'button-action':
        return {
          text: 'Click Me',
          action: 'next-page',
          style: 'primary',
          size: 'medium',
          backgroundColor: '#4299e1',
          textColor: '#ffffff'
        };
      default:
        return {};
    }
  };
  
  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!courseData.tags.includes(tagInput.trim())) {
        setCourseData({
          ...courseData,
          tags: [...courseData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };
  
  // Remove tag
  const removeTag = (tagToRemove) => {
    setCourseData({
      ...courseData,
      tags: courseData.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  // Save course
  const saveCourse = async () => {
    setSaveStatus('saving');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const courseToSave = {
        ...courseData,
        lessons,
        lastModified: new Date().toISOString(),
        analytics: {
          estimatedCompletionTime: lessons.reduce((total, lesson) => total + lesson.duration, 0),
          totalComponents: lessons.reduce((total, lesson) => total + lesson.components.length, 0),
          totalPoints: lessons.reduce((total, lesson) => total + lesson.points, 0)
        }
      };
      
      console.log('Course saved:', courseToSave);
      
      // Save to localStorage for CourseLibrary
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
  
  // Preview course
  const previewCourse = () => {
    setPreviewMode(!previewMode);
    trackButtonClick('preview_course', { 
      courseTitle: courseData.title,
      lessonCount: lessons.length 
    });
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
          <ControlButton variant="secondary" onClick={previewCourse}>
            <Eye size={16} />
            {previewMode ? 'Edit Mode' : 'Preview'}
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
                <SidebarTab 
                  active={activeTab === 'templates'} 
                  onClick={() => setActiveTab('templates')}
                >
                  <BookOpen size={16} />
                  Templates
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
                          onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                          placeholder="My Amazing AI Course"
                        />
                      </InputGroup>
                      
                      <InputGroup>
                        <InputLabel>Description</InputLabel>
                        <TextArea
                          value={courseData.description}
                          onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                          placeholder="Describe what students will learn..."
                        />
                      </InputGroup>
                      
                      <InputGroup>
                        <InputLabel>Age Group</InputLabel>
                        <Select
                          value={courseData.ageGroup}
                          onChange={(e) => setCourseData({ ...courseData, ageGroup: e.target.value })}
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
                          onChange={(e) => setCourseData({ ...courseData, difficulty: e.target.value })}
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
                          onChange={(e) => setCourseData({ ...courseData, estimatedDuration: e.target.value })}
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
          <SidebarSection>
            <SectionTitle>
              <Settings size={16} />
              Course Information
            </SectionTitle>
            <CourseForm>
              <InputGroup>
                <InputLabel>Course Title</InputLabel>
                <Input
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  placeholder="My Amazing AI Course"
                />
              </InputGroup>
              
              <InputGroup>
                <InputLabel>Description</InputLabel>
                <TextArea
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  placeholder="Describe what students will learn..."
                />
              </InputGroup>
              
              <InputGroup>
                <InputLabel>Age Group</InputLabel>
                <Select
                  value={courseData.ageGroup}
                  onChange={(e) => setCourseData({ ...courseData, ageGroup: e.target.value })}
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
                  onChange={(e) => setCourseData({ ...courseData, difficulty: e.target.value })}
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
                  onChange={(e) => setCourseData({ ...courseData, estimatedDuration: e.target.value })}
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
          </SidebarSection>
          
          <SidebarSection>
            <SectionTitle>
              <Plus size={16} />
              Content Components
            </SectionTitle>
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
          </SidebarSection>
        </Sidebar>
        
        {/* Main Editor Area */}
        <EditorArea>
          {/* Page Flow Section */}
          <PageFlowSection>
            <FlowTitle>
              <ArrowRight size={20} />
              Course Pages Flow
            </FlowTitle>
            <PageFlowContainer>
              {lessons.map((lesson, index) => (
                <React.Fragment key={lesson.id}>
                  <PageCard 
                    selected={selectedLesson?.id === lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <PageNumber>{index + 1}</PageNumber>
                    <PageTitle>{lesson.title}</PageTitle>
                    <PageMeta>
                      <div>{lesson.components.length} components</div>
                      <div>{lesson.duration} min • {lesson.points} pts</div>
                    </PageMeta>
                  </PageCard>
                  {index < lessons.length - 1 && (
                    <ArrowIcon>→</ArrowIcon>
                  )}
                </React.Fragment>
              ))}
              
              <AddPageButton onClick={addLesson}>
                <Plus size={24} />
                <div>Add New Page</div>
              </AddPageButton>
            </PageFlowContainer>
          </PageFlowSection>

          {/* Conditional Editor Based on Builder Mode */}
          {builderMode === 'drag-drop' ? (
            // PowerPoint-style Drag & Drop Builder
            selectedLesson ? (
              <DragDropPageBuilder
                initialData={selectedLesson}
                onSave={(pageData) => {
                  // Convert drag-drop format back to lesson format
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
                      },
                      order: 0
                    }))
                  };
                  
                  const updatedLessons = lessons.map(lesson => 
                    lesson.id === selectedLesson.id ? updatedLesson : lesson
                  );
                  setLessons(updatedLessons);
                  setSelectedLesson(updatedLesson);
                }}
              />
            ) : (
              <DropZone>
                <Layout size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
                <h3>Choose a Page for PowerPoint Builder</h3>
                <p>Select a page from the flow above or create a new page to start using the drag & drop builder</p>
              </DropZone>
            )
          ) : (
            // Traditional Linear Builder
            selectedLesson ? (
              <SelectedPageEditor>
                <EditorHeader>
                  <EditorTitle>
                    <Edit3 size={20} />
                    Editing: {selectedLesson.title}
                  </EditorTitle>
                  <EditorControls>
                    <ControlButton 
                      variant="secondary"
                      onClick={() => {
                        console.log('Preview clicked for lesson:', selectedLesson);
                        setPreviewingLesson(selectedLesson);
                      }}
                    >
                      <Eye size={16} />
                      Preview Page
                    </ControlButton>
                    <ControlButton 
                      onClick={() => {
                        const updatedTitle = prompt('Page title:', selectedLesson.title);
                        if (updatedTitle) {
                          const updatedLessons = lessons.map(lesson => 
                            lesson.id === selectedLesson.id 
                              ? { ...lesson, title: updatedTitle }
                              : lesson
                          );
                          setLessons(updatedLessons);
                          setSelectedLesson({ ...selectedLesson, title: updatedTitle });
                        }
                      }}
                    >
                      <Edit3 size={16} />
                      Rename
                    </ControlButton>
                  </EditorControls>
                </EditorHeader>

                {selectedLesson.components.length === 0 ? (
                  <DropZone>
                    <BookOpen size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
                    <h3>Start Building This Page</h3>
                    <p>Click on components from the left sidebar to add them to this page</p>
                  </DropZone>
                ) : (
                  <LessonCanvas>
                    {selectedLesson.components.map((component, componentIndex) => {
                      const IconComponent = component.icon;
                      return (
                        <LessonBlock key={component.id}>
                          <BlockHeader>
                            <BlockTitle>
                              <IconComponent size={16} />
                              {component.name}
                            </BlockTitle>
                            <BlockControls>
                              <BlockButton 
                                onClick={() => editComponent(component)}
                                title="Edit component"
                              >
                                <Edit3 size={12} />
                              </BlockButton>
                              <BlockButton 
                                onClick={() => duplicateComponent(component)}
                                title="Duplicate component"
                              >
                                <Copy size={12} />
                              </BlockButton>
                              <BlockButton 
                                onClick={() => deleteComponent(component.id)}
                                title="Delete component"
                              >
                                <Trash2 size={12} />
                              </BlockButton>
                            </BlockControls>
                          </BlockHeader>
                          <div style={{ 
                            fontSize: '14px', 
                            opacity: 0.8,
                            padding: '8px 0'
                          }}>
                            {component.type === 'text-block' && component.config?.content && (
                              <div>{component.config.content.substring(0, 100)}...</div>
                            )}
                            {component.type === 'ai-prompt' && component.config?.prompt && (
                              <div>Prompt: {component.config.prompt.substring(0, 80)}...</div>
                            )}
                            {component.type === 'quiz-block' && component.config?.questions && (
                              <div>{component.config.questions.length} question(s)</div>
                            )}
                            {component.type === 'video-block' && (
                              <div>Video: {component.config?.title || 'Untitled'}</div>
                            )}
                          </div>
                        </LessonBlock>
                      );
                    })}
                  </LessonCanvas>
                )}
              </SelectedPageEditor>
            ) : (
              <DropZone>
                <ArrowRight size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
                <h3>Choose a Page to Edit</h3>
                <p>Select a page from the flow above or create a new page to start building your course</p>
              </DropZone>
            )
          )}
        </EditorArea>
        
        {/* Right Properties Panel */}
        <PropertiesPanel>
          <PropertyGroup>
            <PropertyTitle>
              <Award size={16} />
              Gamification Designer
            </PropertyTitle>
            <GamificationDesigner>
              <div style={{ marginBottom: '12px' }}>
                <InputLabel>Points per Lesson</InputLabel>
                <PointsConfig>
                  <span style={{ fontSize: '12px' }}>Base Points:</span>
                  <Input
                    type="number"
                    value={selectedLesson ? selectedLesson.points : gamificationPresets[courseData.difficulty].basePoints}
                    onChange={(e) => {
                      if (selectedLesson) {
                        const updatedLessons = lessons.map(lesson => 
                          lesson.id === selectedLesson.id 
                            ? { ...lesson, points: parseInt(e.target.value) }
                            : lesson
                        );
                        setLessons(updatedLessons);
                        setSelectedLesson({ ...selectedLesson, points: parseInt(e.target.value) });
                      }
                    }}
                    style={{ padding: '4px 8px', fontSize: '12px' }}
                  />
                </PointsConfig>
              </div>
              
              <div>
                <InputLabel>Available Badges</InputLabel>
                <BadgeSelector>
                  {badgeOptions.map((badge) => (
                    <BadgeOption
                      key={badge.id}
                      selected={selectedLesson && selectedLesson.badges.includes(badge.id)}
                      onClick={() => {
                        if (selectedLesson) {
                          const badges = selectedLesson.badges.includes(badge.id)
                            ? selectedLesson.badges.filter(b => b !== badge.id)
                            : [...selectedLesson.badges, badge.id];
                          
                          const updatedLessons = lessons.map(lesson => 
                            lesson.id === selectedLesson.id 
                              ? { ...lesson, badges }
                              : lesson
                          );
                          setLessons(updatedLessons);
                          setSelectedLesson({ ...selectedLesson, badges });
                        }
                      }}
                      title={badge.name}
                    >
                      {badge.emoji}
                    </BadgeOption>
                  ))}
                </BadgeSelector>
              </div>
            </GamificationDesigner>
          </PropertyGroup>
          
          <PropertyGroup>
            <PropertyTitle>
              <BarChart3 size={16} />
              Analytics Preview
            </PropertyTitle>
            <AnalyticsPreview>
              <AnalyticsGrid>
                <AnalyticsCard>
                  <AnalyticsValue color="#4CAF50">{lessons.length}</AnalyticsValue>
                  <AnalyticsLabel>Total Lessons</AnalyticsLabel>
                </AnalyticsCard>
                <AnalyticsCard>
                  <AnalyticsValue color="#2196F3">
                    {lessons.reduce((total, lesson) => total + lesson.components.length, 0)}
                  </AnalyticsValue>
                  <AnalyticsLabel>Components</AnalyticsLabel>
                </AnalyticsCard>
                <AnalyticsCard>
                  <AnalyticsValue color="#FF9800">
                    {lessons.reduce((total, lesson) => total + lesson.duration, 0)}m
                  </AnalyticsValue>
                  <AnalyticsLabel>Est. Duration</AnalyticsLabel>
                </AnalyticsCard>
                <AnalyticsCard>
                  <AnalyticsValue color="#9C27B0">
                    {lessons.reduce((total, lesson) => total + lesson.points, 0)}
                  </AnalyticsValue>
                  <AnalyticsLabel>Total Points</AnalyticsLabel>
                </AnalyticsCard>
              </AnalyticsGrid>
              
              <div style={{ marginTop: '12px', fontSize: '11px', opacity: 0.8 }}>
                Target Age: {courseData.ageGroup} • Difficulty: {courseData.difficulty}
              </div>
            </AnalyticsPreview>
          </PropertyGroup>
          
          {selectedComponent && (
            <PropertyGroup>
              <PropertyTitle>
                <Settings size={16} />
                Component Settings
              </PropertyTitle>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '12px', 
                borderRadius: '8px',
                fontSize: '12px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  {selectedComponent.name}
                </div>
                <div style={{ opacity: 0.8 }}>
                  Category: {selectedComponent.category}
                </div>
                <div style={{ 
                  marginTop: '8px', 
                  padding: '8px', 
                  background: 'rgba(255,255,255,0.1)', 
                  borderRadius: '4px' 
                }}>
                  Component configuration panel would appear here for detailed editing.
                </div>
              </div>
            </PropertyGroup>
          )}
        </PropertiesPanel>
      </BuilderLayout>
      
      {/* Rich Content Editor Modal */}
      {editingComponent && (
        <RichContentEditor
          component={editingComponent}
          onSave={saveComponent}
          onClose={() => setEditingComponent(null)}
        />
      )}
      
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
    </BuilderContainer>
  );
};

export default CourseBuilder;