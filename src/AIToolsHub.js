import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import SafeIframe from './SafeIframe';
import {
  Grid,
  Plus,
  Settings,
  Shield,
  Clock,
  Users,
  BookOpen,
  Star,
  Filter,
  Search,
  ChevronRight,
  ExternalLink,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Brain,
  Code,
  PenTool,
  Image,
  Music,
  Gamepad2,
  Calculator
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const hover = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Main Container
const HubContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
  animation: ${fadeIn} 0.6s ease-out;
`;

// Header Section
const HubHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const HubTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const HubSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 20px;
`;

// Control Panel
const ControlPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'};
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255,255,255,0.25);
    transform: translateY(-1px);
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 8px 15px;
  gap: 10px;
  min-width: 200px;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: white;
  outline: none;
  flex: 1;
  font-size: 14px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

// Tools Grid
const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
`;

const ToolCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    animation: ${hover} 0.6s ease-in-out;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.toolType === 'openai' ? 'linear-gradient(90deg, #10a37f, #1a7f64)' :
                           props.toolType === 'google' ? 'linear-gradient(90deg, #4285f4, #db4437)' :
                           props.toolType === 'huggingface' ? 'linear-gradient(90deg, #ff6b35, #f7931e)' :
                           props.toolType === 'educational' ? 'linear-gradient(90deg, #4CAF50, #45a049)' :
                           props.toolType === 'creative' ? 'linear-gradient(90deg, #9C27B0, #7B1FA2)' :
                           'linear-gradient(90deg, #667eea, #764ba2)'};
  }
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ToolIcon = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ToolBadges = styled.div`
  display: flex;
  gap: 5px;
`;

const Badge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`;

const ToolTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: bold;
`;

const ToolDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
`;

const ToolFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const FeatureTag = styled.span`
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
`;

const ToolActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LaunchButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
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

const ToolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  opacity: 0.8;
`;

// Current Tool View
const CurrentToolView = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const ToolViewHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ToolViewContent = styled.div`
  flex: 1;
  padding: 20px;
`;

// AI Tools Database
const AI_TOOLS_DATABASE = {
  // Educational Programming
  'scratch-ai': {
    id: 'scratch-ai',
    name: 'Scratch for AI',
    description: 'Visual programming environment perfect for learning AI concepts through drag-and-drop coding',
    icon: '🐱',
    category: 'educational',
    toolType: 'educational',
    ageRestriction: '6+',
    safetyLevel: 'high',
    features: ['Visual Programming', 'AI Logic', 'Safe Environment', 'Step-by-step'],
    educationalFocus: 'Programming Logic & AI Basics',
    timeRecommended: 30,
    url: 'https://scratch.mit.edu',
    isActive: true
  },
  
  // AI Model Exploration
  'huggingface-spaces': {
    id: 'huggingface-spaces',
    name: 'AI Model Playground',
    description: 'Explore hundreds of AI models in a safe, educational environment',
    icon: '🤗',
    category: 'exploration',
    toolType: 'huggingface',
    ageRestriction: '8+',
    safetyLevel: 'high',
    features: ['Model Testing', 'Safe Exploration', 'Educational Focus', 'Curated Content'],
    educationalFocus: 'AI Model Understanding',
    timeRecommended: 25,
    url: 'https://huggingface.co/spaces',
    isActive: true
  },
  
  // Creative AI
  'ai-art-generator': {
    id: 'ai-art-generator',
    name: 'AI Art Creator',
    description: 'Create amazing artwork using AI while learning about image generation',
    icon: '🎨',
    category: 'creative',
    toolType: 'creative',
    ageRestriction: '10+',
    safetyLevel: 'moderate',
    features: ['Image Generation', 'Creative Expression', 'Art Education', 'Safe Prompts'],
    educationalFocus: 'AI Creativity & Art',
    timeRecommended: 20,
    url: 'https://www.craiyon.com',
    isActive: true
  },
  
  // Text AI
  'openai-playground': {
    id: 'openai-playground',
    name: 'AI Writing Assistant',
    description: 'Learn about text AI and natural language processing through guided exercises',
    icon: '✍️',
    category: 'text',
    toolType: 'openai',
    ageRestriction: '12+',
    safetyLevel: 'moderate',
    features: ['Text Generation', 'Prompt Engineering', 'Language Learning', 'Guided Practice'],
    educationalFocus: 'Natural Language AI',
    timeRecommended: 35,
    url: 'https://platform.openai.com/playground',
    isActive: false // Requires API key
  },
  
  // Code AI
  'github-copilot-demo': {
    id: 'github-copilot-demo',
    name: 'AI Code Helper',
    description: 'Discover how AI can assist with programming and software development',
    icon: '💻',
    category: 'coding',
    toolType: 'educational',
    ageRestriction: '12+',
    safetyLevel: 'high',
    features: ['Code Completion', 'Programming Help', 'Safe Learning', 'Educational Examples'],
    educationalFocus: 'AI-Assisted Programming',
    timeRecommended: 40,
    url: 'https://github.com/features/copilot',
    isActive: false // Demo only
  },
  
  // AI Chat
  'educational-chatbot': {
    id: 'educational-chatbot',
    name: 'AI Learning Buddy',
    description: 'Chat with an AI designed specifically for educational conversations',
    icon: '🤖',
    category: 'chat',
    toolType: 'educational',
    ageRestriction: '8+',
    safetyLevel: 'high',
    features: ['Educational Chat', 'Safe Conversations', 'Learning Support', 'Age-Appropriate'],
    educationalFocus: 'Conversational AI',
    timeRecommended: 25,
    url: '#', // Internal tool - would use our own chat system
    isActive: true
  }
};

// Main Component
const AIToolsHub = ({ 
  studentAge = '10-11',
  onToolLaunch = () => {},
  onLearningProgress = () => {},
  availableTime = 30 // minutes
}) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTools, setFilteredTools] = useState(Object.values(AI_TOOLS_DATABASE));

  const categories = [
    { id: 'all', label: 'All Tools', icon: <Grid size={16} /> },
    { id: 'educational', label: 'Learning', icon: <BookOpen size={16} /> },
    { id: 'creative', label: 'Creative', icon: <PenTool size={16} /> },
    { id: 'exploration', label: 'Explore', icon: <Brain size={16} /> },
    { id: 'coding', label: 'Coding', icon: <Code size={16} /> },
    { id: 'text', label: 'Writing', icon: <PenTool size={16} /> },
    { id: 'chat', label: 'Chat', icon: <Users size={16} /> }
  ];

  useEffect(() => {
    let filtered = Object.values(AI_TOOLS_DATABASE);
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by age appropriateness
    const ageNum = parseInt(studentAge.split('-')[0]);
    filtered = filtered.filter(tool => {
      const minAge = parseInt(tool.ageRestriction);
      return ageNum >= minAge;
    });
    
    setFilteredTools(filtered);
  }, [activeCategory, searchTerm, studentAge]);

  const handleToolLaunch = (tool) => {
    setSelectedTool(tool);
    onToolLaunch({ tool: tool.name, category: tool.category });
    onLearningProgress({
      type: 'tool_launched',
      tool: tool.name,
      category: tool.category,
      timestamp: new Date()
    });
  };

  const handleToolClose = () => {
    setSelectedTool(null);
    onLearningProgress({
      type: 'tool_closed',
      tool: selectedTool?.name,
      timestamp: new Date()
    });
  };

  const getSafetyIcon = (level) => {
    switch (level) {
      case 'high': return <CheckCircle size={12} style={{ color: '#4CAF50' }} />;
      case 'moderate': return <AlertCircle size={12} style={{ color: '#FF9800' }} />;
      default: return <Shield size={12} style={{ color: '#9E9E9E' }} />;
    }
  };

  if (selectedTool) {
    return (
      <CurrentToolView>
        <ToolViewHeader>
          <div>
            <strong>{selectedTool.name}</strong> - {selectedTool.educationalFocus}
          </div>
          <CloseButton onClick={handleToolClose}>
            ✕ Close Tool
          </CloseButton>
        </ToolViewHeader>
        <ToolViewContent>
          <SafeIframe
            toolId={selectedTool.id}
            studentAge={studentAge}
            sessionTimeLimit={Math.min(selectedTool.timeRecommended, availableTime)}
            onSessionEnd={handleToolClose}
            onLearningProgress={onLearningProgress}
          />
        </ToolViewContent>
      </CurrentToolView>
    );
  }

  return (
    <HubContainer>
      <HubHeader>
        <HubTitle>
          <Brain size={32} />
          AI Tools Learning Hub
          <Star size={32} />
        </HubTitle>
        <HubSubtitle>
          Explore safe, educational AI tools designed for young learners! 🚀
        </HubSubtitle>
      </HubHeader>

      <ControlPanel>
        <FilterSection>
          {categories.map(category => (
            <FilterButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              {category.label}
            </FilterButton>
          ))}
        </FilterSection>
        
        <SearchBar>
          <Search size={16} />
          <SearchInput
            placeholder="Search AI tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </ControlPanel>

      <ToolsGrid>
        {filteredTools.map(tool => (
          <ToolCard key={tool.id} toolType={tool.toolType}>
            <ToolHeader>
              <ToolIcon>{tool.icon}</ToolIcon>
              <ToolBadges>
                <Badge>{tool.ageRestriction}</Badge>
                <Badge style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {getSafetyIcon(tool.safetyLevel)}
                  {tool.safetyLevel}
                </Badge>
              </ToolBadges>
            </ToolHeader>
            
            <ToolTitle>{tool.name}</ToolTitle>
            <ToolDescription>{tool.description}</ToolDescription>
            
            <ToolFeatures>
              {tool.features.slice(0, 3).map((feature, index) => (
                <FeatureTag key={index}>{feature}</FeatureTag>
              ))}
            </ToolFeatures>
            
            <ToolActions>
              <ToolInfo>
                <Clock size={12} />
                {tool.timeRecommended}min
                <span style={{ marginLeft: '8px' }}>{tool.educationalFocus}</span>
              </ToolInfo>
              <LaunchButton
                onClick={() => handleToolLaunch(tool)}
                disabled={!tool.isActive}
              >
                {tool.isActive ? (
                  <>
                    <ExternalLink size={14} />
                    Launch Tool
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Coming Soon
                  </>
                )}
              </LaunchButton>
            </ToolActions>
          </ToolCard>
        ))}
      </ToolsGrid>
      
      {filteredTools.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', opacity: 0.7 }}>
          <Brain size={48} />
          <h3>No tools found</h3>
          <p>Try adjusting your search or category filter</p>
        </div>
      )}
    </HubContainer>
  );
};

export default AIToolsHub;