import React, { useState, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Plus, Eye, Edit3, FileText, HelpCircle, Trash2, Play, ChevronUp, ChevronDown, MessageCircle, Image, Shield, Palette, Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

// TrainArama Theme (same as before)
const TrainAramaTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#F5F7FA',
    text: '#2D3436',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    white: '#FFFFFF'
  },
  fonts: {
    primary: '"Comic Sans MS", cursive, sans-serif',
    heading: 'bold, clean sans-serif',
    body: 'regular sans-serif'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '20px',
    round: '50%'
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.1)',
    md: '0 4px 15px rgba(0,0,0,0.1)',
    lg: '0 8px 25px rgba(0,0,0,0.15)'
  }
};

// Styled Components (keeping previous ones and adding new)
const AppContainer = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #FFE5B4, #FFCCCB, #E0E6FF);
  font-family: ${props => props.theme.fonts.primary};
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 24px;
  box-shadow: ${props => props.theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
`;

const TrainIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary};
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '🚂';
    font-size: 24px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: rgba(255,255,255,0.8);
    border-radius: 50%;
    animation: steam 2s ease-in-out infinite;
  }
  
  @keyframes steam {
    0% { opacity: 0.8; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const LogoMain = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const LogoSub = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.primary};
  font-weight: normal;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ModeButton = styled.button`
  padding: 12px 20px;
  border-radius: 25px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${props => props.theme.fonts.primary};
  
  ${props => props.active ? `
    background: ${props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  ` : `
    background: rgba(255,255,255,0.2);
    color: white;
    &:hover {
      background: rgba(255,255,255,0.3);
      transform: translateY(-1px);
    }
  `}
`;

const MainContent = styled.div`
  display: flex;
  height: calc(100vh - 80px);
`;

const Sidebar = styled.div`
  width: 320px;
  background: white;
  border-right: 2px solid ${props => props.theme.colors.secondary};
  padding: 24px;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.md};
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin: 20px 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 2px solid ${props => props.theme.colors.secondary};
  padding-bottom: 8px;
`;

const ComponentGrid = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 24px;
`;

const ComponentButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 2px solid ${props => props.theme.colors.secondary};
  background: linear-gradient(135deg, #f8f9ff, #ffffff);
  cursor: pointer;
  transition: all 0.3s;
  font-family: ${props => props.theme.fonts.primary};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
    background: linear-gradient(135deg, #fff5f5, #ffffff);
  }
`;

const ComponentIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`;

const ComponentName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

// NEW: Template Gallery Styles
const TemplateGrid = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
`;

const TemplateCard = styled.button`
  width: 100%;
  padding: 0;
  border: 2px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const TemplatePreview = styled.div`
  height: 80px;
  background: ${props => props.gradient};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

const TemplateName = styled.div`
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  background: #f8f9ff;
`;

// NEW: Template Category Navigation
const CategoryTabs = styled.div`
  display: flex;
  background: #f8f9ff;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
`;

const CategoryTab = styled.button`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : 'rgba(255, 107, 107, 0.1)'};
  }
`;

// Content Management Styles
const ContentManagerButton = styled.button`
  padding: 8px 16px;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 6px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255,255,255,0.3);
  }
`;

const LessonMetadataDisplay = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  border: 1px solid rgba(255,255,255,0.2);
`;

const MetadataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  color: rgba(255,255,255,0.9);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusBadge = styled.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  background: ${props => {
    switch(props.status) {
      case 'draft': return '#FFA500';
      case 'published': return '#4CAF50';
      case 'archived': return '#757575';
      default: return '#FFA500';
    }
  }};
  color: white;
`;

const VersionTag = styled.span`
  background: rgba(255,255,255,0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
`;

// Content Management Modal
const ContentModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
`;

// NEW: Rich Text Editor Styles
const RichTextToolbar = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #ddd;
  flex-wrap: wrap;
`;

const ToolbarButton = styled.button`
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: ${props => props.active ? '#FF6B6B' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? '#FF5252' : '#f0f0f0'};
  }
`;

const ToolbarSelect = styled.select`
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  font-size: 12px;
`;

const ToolbarColorInput = styled.input`
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const RichTextArea = styled.div`
  min-height: 200px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 0 0 8px 8px;
  background: white;
  outline: none;
  font-family: ${props => props.theme.fonts.primary};
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

// All styled components moved to the top section to avoid duplicates

// Canvas and other existing styles remain the same
const Canvas = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const CanvasContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  min-height: 600px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: ${props => props.theme.colors.text};
  opacity: 0.7;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const LessonCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  margin: 20px 0;
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
  animation: slideInUp 0.6s ease-out;
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  transition: all 0.3s;
  position: relative;
  
  &:hover {
    border-color: ${props => props.theme.colors.secondary};
    transform: translateY(-4px);
    box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ResizeHandle = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${props => props.theme.colors.primary};
  border: 2px solid white;
  border-radius: 50%;
  cursor: ${props => props.cursor};
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.2s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #f8f9ff, #ffffff);
`;

const CardControls = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const ControlButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: white;
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const EditButton = styled(ControlButton)`
  background: ${props => props.theme.colors.secondary};
`;

const DeleteButton = styled(ControlButton)`
  background: ${props => props.theme.colors.error};
`;

const MoveButton = styled(ControlButton)`
  background: ${props => props.theme.colors.success};
`;

// Component Styles
const TitleComponent = styled.div`
  background: ${props => props.gradient || 'linear-gradient(135deg, #FF6B6B, #4ECDC4)'};
  color: white;
  text-align: ${props => props.align || 'center'};
  padding: ${props => props.padding || '40px 30px'};
  position: relative;
`;

const TextComponent = styled.div`
  padding: 30px;
  font-size: 18px;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  position: relative;
`;

// Title Templates Configuration
const titleTemplates = [
  {
    id: 'welcome-aboard',
    name: 'Welcome Aboard',
    gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
    align: 'center',
    padding: '40px 30px',
    decoration: '🚂',
    style: 'classic'
  },
  {
    id: 'detective-academy',
    name: 'Detective Academy',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    align: 'center',
    padding: '50px 30px',
    decoration: '🕵️',
    style: 'mystery'
  },
  {
    id: 'adventure-express',
    name: 'Adventure Express',
    gradient: 'linear-gradient(45deg, #FFD93D, #FFA502)',
    align: 'left',
    padding: '40px 50px',
    decoration: '🗺️',
    style: 'adventure'
  },
  {
    id: 'learning-station',
    name: 'Learning Station',
    gradient: 'linear-gradient(135deg, #A8E6CF, #88D8C0)',
    align: 'center',
    padding: '45px 30px',
    decoration: '📚',
    style: 'academic'
  },
  {
    id: 'future-express',
    name: 'Future Express',
    gradient: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
    align: 'right',
    padding: '40px 50px',
    decoration: '🚀',
    style: 'futuristic'
  }
];

// Quiz Templates Configuration
const quizTemplates = [
  // Multiple Choice (existing)
  {
    id: 'ai-basics-mc',
    name: 'AI Basics (Multiple Choice)',
    description: 'Test understanding of AI fundamentals',
    type: 'multiple-choice',
    gradient: 'linear-gradient(135deg, #A8E6CF, #88D8C0)',
    icon: '🧠',
    question: 'What is AI (Artificial Intelligence)?',
    options: [
      'A robot that looks like a human',
      'A computer program that can think and learn like humans',
      'A video game character',
      'A type of smartphone'
    ],
    correct: 1,
    explanation: 'AI is computer software that can think, learn, and make decisions similar to how humans do!'
  },
  
  // True/False
  {
    id: 'ai-safety-tf',
    name: 'AI Safety (True/False)',
    description: 'Quick facts about AI safety',
    type: 'true-false',
    gradient: 'linear-gradient(135deg, #FFB6C1, #FF69B4)',
    icon: '🛡️',
    question: 'AI is always 100% accurate and never makes mistakes.',
    correct: false,
    explanation: 'AI can make mistakes! That\'s why we need humans to check AI\'s work and think critically.'
  },
  
  // Multiple Select
  {
    id: 'ai-uses-ms',
    name: 'AI Uses (Multiple Select)',
    description: 'Select all correct AI applications',
    type: 'multiple-select',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    icon: '🕵️',
    question: 'Which of these are helpful ways AI is used? (Select all that apply)',
    options: [
      'Helping doctors diagnose diseases',
      'Translating languages',
      'Predicting weather',
      'Reading people\'s private thoughts',
      'Helping with homework',
      'Replacing all human jobs'
    ],
    correct: [0, 1, 2, 4], // indices of correct answers
    explanation: 'AI helps with medical diagnosis, translation, weather prediction, and learning - but it can\'t read minds or replace all humans!'
  },
  
  // Text Input
  {
    id: 'ai-definition-text',
    name: 'AI Definition (Text Input)',
    description: 'Type the answer',
    type: 'text-input',
    gradient: 'linear-gradient(135deg, #FFD93D, #FFA502)',
    icon: '✏️',
    question: 'What does "AI" stand for? (Type your answer)',
    correctAnswers: ['artificial intelligence', 'ai', 'artificial intelligence'], // multiple acceptable answers
    explanation: 'AI stands for Artificial Intelligence - computer systems that can think and learn!'
  },
  
  // Fill in the Blanks
  {
    id: 'ai-blanks',
    name: 'AI Learning (Fill Blanks)',
    description: 'Complete the sentence',
    type: 'fill-blanks',
    gradient: 'linear-gradient(135deg, #98D8C8, #6DB5B8)',
    icon: '📝',
    question: 'AI learns by looking at lots of _____ and finding _____ in them.',
    blanks: [
      { id: 0, correctAnswers: ['data', 'information', 'examples'] },
      { id: 1, correctAnswers: ['patterns', 'trends', 'similarities'] }
    ],
    explanation: 'AI learns by analyzing large amounts of data to find patterns - just like how you learn by seeing many examples!'
  },
  
  // Additional Multiple Choice
  {
    id: 'ai-ethics-mc',
    name: 'AI Ethics (Multiple Choice)',
    description: 'Understand fairness and AI',
    type: 'multiple-choice',
    gradient: 'linear-gradient(135deg, #E0BBE4, #C39BD3)',
    icon: '⚖️',
    question: 'What does it mean for AI to be "fair"?',
    options: [
      'AI should only help rich people',
      'AI should treat all people equally and kindly',
      'AI should be free for everyone',
      'AI should work really fast'
    ],
    correct: 1,
    explanation: 'Fair AI treats everyone equally regardless of their background, race, or where they come from!'
  }
];

// Python Playground Templates - 3-Year Progression
const pythonTemplates = [
  // YEAR 1 (Ages 8-9): AI Discovery - Foundation & Wonder
  {
    id: 'y1-hello-ai',
    name: 'Hello AI World',
    yearLevel: 1,
    ageGroup: '8-9',
    track: 'discovery',
    difficulty: 'beginner',
    icon: '👋',
    gradient: 'linear-gradient(135deg, #FFB6C1, #87CEEB)',
    description: 'Your first AI conversation!',
    explanation: 'AI can talk to us through code! Let\'s make AI say hello.',
    code: `# This is your first AI program!
ai_name = "Buddy"
student_name = "Alex"

print(f"Hello {student_name}! I'm {ai_name}, your AI friend!")
print("Welcome to the amazing world of AI!")
print("🤖 I can help you learn so many cool things!")`,
    expectedOutput: `Hello Alex! I'm Buddy, your AI friend!
Welcome to the amazing world of AI!
🤖 I can help you learn so many cool things!`,
    learningObjectives: ['Understanding AI can communicate', 'Basic print statements', 'Variables store information'],
    gamificationTriggers: ['first_code_run', 'ai_introduction_complete'],
    editableFields: ['ai_name', 'student_name']
  },
  
  {
    id: 'y1-ai-pet',
    name: 'Create Your AI Pet',
    yearLevel: 1,
    ageGroup: '8-9',
    track: 'discovery',
    difficulty: 'beginner',
    icon: '🐕',
    gradient: 'linear-gradient(135deg, #98FB98, #FFB6C1)',
    description: 'Design your own AI pet!',
    explanation: 'AI can have different personalities. Let\'s create an AI pet with its own traits!',
    code: `# Create your AI pet
pet_type = "robot dog"
pet_name = "Spark"
pet_sound = "beep-woof"
pet_favorite_activity = "playing fetch with data"

print(f"Meet {pet_name}, the {pet_type}!")
print(f"{pet_name} says: {pet_sound}!")
print(f"Favorite activity: {pet_favorite_activity}")
print("🎾 Your AI pet is ready to play!")`,
    expectedOutput: `Meet Spark, the robot dog!
Spark says: beep-woof!
Favorite activity: playing fetch with data
🎾 Your AI pet is ready to play!`,
    learningObjectives: ['AI has characteristics', 'Customizing variables', 'String formatting'],
    gamificationTriggers: ['pet_created', 'creativity_badge'],
    editableFields: ['pet_type', 'pet_name', 'pet_sound', 'pet_favorite_activity']
  },

  // YEAR 2 (Ages 10-11): AI Understanding - How & Why  
  {
    id: 'y2-pattern-detector',
    name: 'AI Pattern Detective',
    yearLevel: 2,
    ageGroup: '10-11',
    track: 'understanding', 
    difficulty: 'intermediate',
    icon: '🔍',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    description: 'Teach AI to find patterns in data!',
    explanation: 'AI learns by finding patterns. Let\'s build an AI that can detect patterns in sequences!',
    code: `# AI Pattern Detective
def ai_find_pattern(sequence):
    print(f"🤖 AI analyzing: {sequence}")
    
    # Check for alternating pattern
    if len(sequence) >= 4:
        if sequence[0] == sequence[2] and sequence[1] == sequence[3]:
            return f"Pattern found: {sequence[0]}-{sequence[1]} repeats!"
        elif all(x == sequence[0] for x in sequence):
            return f"Pattern found: All items are {sequence[0]}!"
    
    return "No clear pattern detected. AI is still learning!"

# Test the AI with different data
test_data = ["red", "blue", "red", "blue"]
result = ai_find_pattern(test_data)
print(result)

# Try changing the data to test different patterns!
test_data2 = ["cat", "cat", "cat", "cat"]
result2 = ai_find_pattern(test_data2)
print(result2)`,
    expectedOutput: `🤖 AI analyzing: ['red', 'blue', 'red', 'blue']
Pattern found: red-blue repeats!
🤖 AI analyzing: ['cat', 'cat', 'cat', 'cat']
Pattern found: All items are cat!`,
    learningObjectives: ['Pattern recognition', 'Functions in Python', 'Conditional logic', 'How AI processes data'],
    gamificationTriggers: ['pattern_master', 'logic_builder'],
    editableFields: ['test_data', 'test_data2'],
    prerequisites: ['y1-hello-ai', 'y1-ai-pet']
  },

  // YEAR 3 (Ages 12-14): AI Creation - Building & Ethics
  {
    id: 'y3-fair-ai-classifier',
    name: 'Build Fair AI Classifier',
    yearLevel: 3,
    ageGroup: '12-14',
    track: 'creation',
    difficulty: 'advanced',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
    description: 'Create an AI that makes fair decisions!',
    explanation: 'Real AI systems need to be fair to everyone. Let\'s build an AI classifier that checks for bias!',
    code: `# Fair AI Classifier
class FairAIClassifier:
    def __init__(self):
        self.decisions = []
        self.bias_check = True
    
    def classify_student(self, student_data):
        # Extract relevant features (grades, effort)
        grade_score = student_data['grades']
        effort_score = student_data['effort']
        
        # Fair classification based on merit only
        total_score = (grade_score + effort_score) / 2
        
        if total_score >= 85:
            decision = "Honor Roll"
        elif total_score >= 70:
            decision = "Good Standing"
        else:
            decision = "Needs Support"
        
        # Record decision for bias analysis
        self.decisions.append({
            'student': student_data['name'],
            'decision': decision,
            'score': total_score
        })
        
        return decision
    
    def check_for_bias(self):
        print("🔍 Checking for bias in AI decisions...")
        print(f"Total decisions made: {len(self.decisions)}")
        # In real AI, we'd check for unfair patterns
        print("✅ This AI uses only grades and effort - that's fair!")
        return True

# Test our Fair AI
ai_classifier = FairAIClassifier()

# Test students with different backgrounds but same merit
students = [
    {'name': 'Alex', 'grades': 88, 'effort': 92},
    {'name': 'Sam', 'grades': 76, 'effort': 80},
    {'name': 'Jordan', 'grades': 65, 'effort': 70}
]

print("🤖 Fair AI Classifier Results:")
for student in students:
    result = ai_classifier.classify_student(student)
    print(f"{student['name']}: {result}")

print()
ai_classifier.check_for_bias()`,
    expectedOutput: `🤖 Fair AI Classifier Results:
Alex: Honor Roll
Sam: Good Standing
Jordan: Needs Support

🔍 Checking for bias in AI decisions...
Total decisions made: 3
✅ This AI uses only grades and effort - that's fair!`,
    learningObjectives: ['AI ethics and fairness', 'Object-oriented programming', 'Bias detection', 'Building responsible AI'],
    gamificationTriggers: ['ethics_champion', 'ai_builder', 'fairness_advocate'],
    editableFields: ['students'],
    prerequisites: ['y2-pattern-detector', 'understanding-bias-module']
  }
];

const TrainAramaCourseBuilder = () => {
  const [mode, setMode] = useState('builder');
  const [courseElements, setCourseElements] = useState([]);
  const [editingElement, setEditingElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [resizing, setResizing] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  
  // Content Management States
  const [contentMode, setContentMode] = useState('creator'); // 'creator' | 'franchise'
  const [activeTemplateCategory, setActiveTemplateCategory] = useState('titles'); // 'titles' | 'python' | 'quizzes' | 'components'
  const [showContentManager, setShowContentManager] = useState(false);
  const [currentLesson, setCurrentLesson] = useState({
    id: null,
    title: 'New AI Lesson',
    ageGroup: '8-9',
    yearLevel: 1,
    module: 'ai-basics',
    version: '1.0.0',
    status: 'draft', // 'draft' | 'published' | 'archived'
    lastModified: new Date(),
    gamificationTriggers: [],
    prerequisites: [],
    learningObjectives: []
  });
  const [lessonMetadata, setLessonMetadata] = useState({
    estimatedTime: 30,
    difficulty: 'beginner',
    topics: ['artificial-intelligence'],
    assessmentType: 'interactive'
  });

// Regular AI Components (excluding basic title slide)
  const elementTypes = [
    { id: 'text', name: 'Text Block', icon: FileText, color: 'linear-gradient(135deg, #4ECDC4, #44A08D)' },
    { id: 'python-playground', name: 'Python AI Playground', icon: Play, color: 'linear-gradient(135deg, #3776ab, #ffd43b)' },
    { id: 'ai-chat', name: 'AI Chat Demo', icon: MessageCircle, color: 'linear-gradient(135deg, #FFD93D, #FFA502)' },
    { id: 'quiz', name: 'Quiz Question', icon: HelpCircle, color: 'linear-gradient(135deg, #A8E6CF, #88D8C0)' },
    { id: 'ethics', name: 'Ethics Scenario', icon: Shield, color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'image', name: 'Image Display', icon: Image, color: 'linear-gradient(135deg, #FF8E9B, #FF6B9D)' }
  ];

  const addElement = (type) => {
    const newElement = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type)
    };
    setCourseElements([...courseElements, newElement]);
  };

const addTitleTemplate = (template) => {
    // Remove existing title slide if any
    const withoutTitle = courseElements.filter(el => el.type !== 'title');
    
    const newTitleElement = {
      id: Date.now().toString(),
      type: 'title',
      content: {
        title: '🚂 Welcome Aboard, AI Detective!',
        subtitle: 'Your learning journey starts here!',
        template: template.id,
        gradient: template.gradient,
        align: template.align,
        padding: template.padding,
        decoration: template.decoration,
        style: template.style
      }
    };
    
    // Add title at the beginning
    setCourseElements([newTitleElement, ...withoutTitle]);
  };

const addQuizTemplate = (template) => {
    const newQuizElement = {
      id: Date.now().toString(),
      type: 'quiz',
      content: {
        template: template.id,
        question: template.question,
        options: template.options,
        correct: template.correct,
        explanation: template.explanation,
        gradient: template.gradient,
        icon: template.icon,
        style: template.name
      }
    };
    
    setCourseElements([...courseElements, newQuizElement]);
  };

  const addPythonTemplate = (template) => {
    const newPythonElement = {
      id: Date.now().toString(),
      type: 'python-playground',
      content: {
        template: template.id,
        title: template.name,
        yearLevel: template.yearLevel,
        ageGroup: template.ageGroup,
        track: template.track,
        difficulty: template.difficulty,
        explanation: template.explanation,
        code: template.code,
        expectedOutput: template.expectedOutput,
        learningObjectives: template.learningObjectives,
        gamificationTriggers: template.gamificationTriggers,
        editableFields: template.editableFields,
        prerequisites: template.prerequisites || [],
        gradient: template.gradient,
        icon: template.icon
      }
    };
    
    setCourseElements([...courseElements, newPythonElement]);
  };

const getDefaultContent = (type) => {
    switch (type) {
      case 'text':
        return { 
          content: '<h2>🧠 All Aboard the AI Learning Train!</h2><p>AI stands for <strong>Artificial Intelligence</strong>. Think of AI like a really smart computer friend!</p>',
          fontSize: '18px',
          textAlign: 'left',
          color: '#2D3436'
        };
      case 'python-playground':
        return {
          template: 'custom',
          title: 'Custom Python Playground',
          yearLevel: 1,
          ageGroup: '8-9',
          track: 'discovery',
          difficulty: 'beginner',
          explanation: 'Write your own Python code to explore AI concepts!',
          code: `# Your Python AI playground
print("Hello, AI Explorer!")
print("🤖 Ready to learn Python and AI!")`,
          expectedOutput: `Hello, AI Explorer!
🤖 Ready to learn Python and AI!`,
          learningObjectives: ['Basic Python syntax', 'Print statements'],
          gamificationTriggers: [],
          editableFields: [],
          prerequisites: []
        };
      case 'ai-chat':
        return { 
          title: '🚂 Meet Your AI Conductor!', 
          description: 'Try asking some math questions!',
          personality: 'math-buddy'
        };
      case 'quiz':
        return {
          question: 'What did we learn about AI today?',
          options: [
            'AI is perfect and never makes mistakes',
            'AI can make mistakes, so we need detectives to check its work',
            'AI is scary and we shouldn\'t use it',
            'AI is just for video games'
          ],
          correct: 1
        };
      case 'ethics':
        return {
          scenario: 'What if AI suggests something mean about someone?',
          choices: ['Agree with AI', 'Tell AI that\'s not fair or kind', 'Just ignore it'],
          correct: 1,
          principle: 'Be Kind'
        };
      case 'image':
        return { caption: 'Learning illustration', alt: 'Educational image' };
      default:
        return {};
    }
  };

  const moveElement = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= courseElements.length) return;

    const newElements = [...courseElements];
    [newElements[index], newElements[newIndex]] = [newElements[newIndex], newElements[index]];
    setCourseElements(newElements);
  };

  const updateElement = (id, newContent) => {
    setCourseElements(courseElements.map(el =>
      el.id === id ? { ...el, content: newContent } : el
    ));
    setEditingElement(null);
  };

  const deleteElement = (id) => {
    setCourseElements(courseElements.filter(el => el.id !== id));
    setSelectedElement(null);
  };

const selectElement = (element) => {
    setSelectedElement(selectedElement?.id === element.id ? null : element);
  };

  const startResize = (e, direction, element) => {
    e.stopPropagation();
    e.preventDefault();
    
    setResizing({ direction, elementId: element.id });
    setDragStart({ x: e.clientX, y: e.clientY });
    
    // Get current element size
    const currentWidth = element.content.width || '100%';
    const currentHeight = element.content.height || 'auto';
    
    // Convert percentage/auto to pixels for calculation
    const elementDiv = document.getElementById(`element-${element.id}`);
    if (elementDiv) {
      const rect = elementDiv.getBoundingClientRect();
      setOriginalSize({ 
        width: rect.width, 
        height: rect.height 
      });
    }
    
    // Add mouse move and up listeners
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

const handleResize = React.useCallback((e) => {
    if (!resizing) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    let newWidth = originalSize.width;
    let newHeight = originalSize.height;
    
    // Calculate new dimensions based on resize direction
    switch (resizing.direction) {
      case 'se': // Southeast corner
        newWidth = Math.max(100, originalSize.width + deltaX);
        newHeight = Math.max(50, originalSize.height + deltaY);
        break;
      case 'sw': // Southwest corner
        newWidth = Math.max(100, originalSize.width - deltaX);
        newHeight = Math.max(50, originalSize.height + deltaY);
        break;
      case 'ne': // Northeast corner
        newWidth = Math.max(100, originalSize.width + deltaX);
        newHeight = Math.max(50, originalSize.height - deltaY);
        break;
      case 'nw': // Northwest corner
        newWidth = Math.max(100, originalSize.width - deltaX);
        newHeight = Math.max(50, originalSize.height - deltaY);
        break;
      case 'e': // East edge
        newWidth = Math.max(100, originalSize.width + deltaX);
        break;
      case 'w': // West edge
        newWidth = Math.max(100, originalSize.width - deltaX);
        break;
      case 's': // South edge
        newHeight = Math.max(50, originalSize.height + deltaY);
        break;
      case 'n': // North edge
        newHeight = Math.max(50, originalSize.height - deltaY);
        break;
      default:
        break;
    }
    
    // Update the element
    setCourseElements(elements => 
      elements.map(el => 
        el.id === resizing.elementId 
          ? {
              ...el,
              content: {
                ...el.content,
                width: `${newWidth}px`,
                height: `${newHeight}px`
              }
            }
          : el
      )
    );
  }, [resizing, dragStart, originalSize]);

  const stopResize = () => {
    setResizing(null);
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

const renderBuilderElement = (element, index) => (
    <LessonCard 
      key={element.id} 
      id={`element-${element.id}`}
      selected={selectedElement?.id === element.id}
      onClick={() => selectElement(element)}
    >
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {React.createElement(
            elementTypes.find(t => t.id === element.type)?.icon || FileText,
            { size: 20, color: '#FF6B6B' }
          )}
          <span style={{ fontWeight: '600', fontSize: '16px' }}>
            {element.type === 'title' ? `Title: ${element.content.template || 'Custom'}` : element.type.toUpperCase()}
          </span>
        </div>
        <CardControls>
          <MoveButton
            onClick={(e) => { e.stopPropagation(); moveElement(index, 'up'); }}
            disabled={index === 0}
            title="Move Up"
          >
            <ChevronUp size={16} />
          </MoveButton>
          <MoveButton
            onClick={(e) => { e.stopPropagation(); moveElement(index, 'down'); }}
            disabled={index === courseElements.length - 1}
            title="Move Down"
          >
            <ChevronDown size={16} />
          </MoveButton>
          <EditButton
            onClick={(e) => { e.stopPropagation(); setEditingElement(element); }}
            title="Edit"
          >
            <Edit3 size={16} />
          </EditButton>
          <DeleteButton
            onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
            title="Delete"
          >
            <Trash2 size={16} />
          </DeleteButton>
        </CardControls>
      </CardHeader>
      
      {/* Size Display */}
      {selectedElement?.id === element.id && (
        <div style={{
          position: 'absolute',
          top: '-25px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#FF6B6B',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 10
        }}>
          {element.content.width || 'auto'} × {element.content.height || 'auto'}
        </div>
      )}
      
      <ElementPreview element={element} />
      
      {/* Draggable Resize Handles */}
      {selectedElement?.id === element.id && (
        <>
          {/* Corner handles */}
          <ResizeHandle 
            style={{ top: -6, left: -6 }} 
            cursor="nw-resize" 
            visible={true}
            onMouseDown={(e) => startResize(e, 'nw', element)}
          />
          <ResizeHandle 
            style={{ top: -6, right: -6 }} 
            cursor="ne-resize" 
            visible={true}
            onMouseDown={(e) => startResize(e, 'ne', element)}
          />
          <ResizeHandle 
            style={{ bottom: -6, left: -6 }} 
            cursor="sw-resize" 
            visible={true}
            onMouseDown={(e) => startResize(e, 'sw', element)}
          />
          <ResizeHandle 
            style={{ bottom: -6, right: -6 }} 
            cursor="se-resize" 
            visible={true}
            onMouseDown={(e) => startResize(e, 'se', element)}
          />
          
          {/* Edge handles */}
          <ResizeHandle 
            style={{ top: -6, left: '50%', transform: 'translateX(-50%)' }} 
            cursor="n-resize" 
            visible={true}
            onMouseDown={(e) => startResize(e, 'n', element)}
          />
          <ResizeHandle 
            style={{ bottom: -6, left: '50%', transform: 'translateX(-50%)' }} 
            cursor="s-resize" 
            visible={true}
            onMouseDown={(e) => startResize(e, 's', element)}
          />
          <ResizeHandle 
            style={{ top: '50%', left: -6, transform: 'translateY(-50%)' }} 
            cursor="w-resize" 
            visible={true}
            onMouseDown={(e) => startResize(e, 'w', element)}
          />
          <ResizeHandle 
            style={{ top: '50%', right: -6, transform: 'translateY(-50%)' }} 
            cursor="e-resize" 
            visible={true}
            onMouseDown={(e) => startResize(e, 'e', element)}
          />
        </>
      )}
    </LessonCard>
  );

  const renderPreviewElement = (element) => (
    <LessonCard key={element.id}>
      <ElementPreview element={element} />
    </LessonCard>
  );

  return (
    <ThemeProvider theme={TrainAramaTheme}>
      <AppContainer>
        <Header>
          <HeaderContent>
            <LogoSection>
              <Logo>
                <TrainIcon />
                <LogoText>
                  <LogoMain>TRAINARAMA</LogoMain>
                  <LogoSub>learning center</LogoSub>
                </LogoText>
              </Logo>
              <div style={{ color: 'rgba(255,255,255,0.8)', marginLeft: '20px', fontSize: '16px' }}>
                AI Lesson Builder
              </div>
            </LogoSection>
            <ButtonGroup>
              <ModeButton
                active={mode === 'builder'}
                onClick={() => setMode('builder')}
              >
                <Edit3 size={16} />
                Builder
              </ModeButton>
              <ModeButton
                active={mode === 'preview'}
                onClick={() => setMode('preview')}
              >
                <Eye size={16} />
                Preview
              </ModeButton>
            </ButtonGroup>
          </HeaderContent>
        </Header>

        <MainContent>
          {mode === 'builder' ? (
            <>
              <Sidebar>
                <SectionTitle>
                  🎨 Template Library
                </SectionTitle>
                
                {/* Category Navigation */}
                <CategoryTabs>
                  <CategoryTab 
                    active={activeTemplateCategory === 'titles'}
                    onClick={() => setActiveTemplateCategory('titles')}
                  >
                    📋 Titles
                  </CategoryTab>
                  <CategoryTab 
                    active={activeTemplateCategory === 'python'}
                    onClick={() => setActiveTemplateCategory('python')}
                  >
                    🐍 Python
                  </CategoryTab>
                  <CategoryTab 
                    active={activeTemplateCategory === 'quizzes'}
                    onClick={() => setActiveTemplateCategory('quizzes')}
                  >
                    🧩 Quizzes
                  </CategoryTab>
                  <CategoryTab 
                    active={activeTemplateCategory === 'components'}
                    onClick={() => setActiveTemplateCategory('components')}
                  >
                    📦 Components
                  </CategoryTab>
                </CategoryTabs>

                {/* Title Templates */}
                {activeTemplateCategory === 'titles' && (
                  <>
                    <SectionTitle>
                      📋 Title Slides
                    </SectionTitle>
                <TemplateGrid>
                  {titleTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      onClick={() => addTitleTemplate(template)}
                      title={`Add ${template.name} title slide`}
                    >
                      <TemplatePreview gradient={template.gradient}>
                        <div style={{ textAlign: template.align }}>
                          {template.decoration} {template.name}
                        </div>
                      </TemplatePreview>
                      <TemplateName>{template.name}</TemplateName>
                    </TemplateCard>
                  ))}
                </TemplateGrid>
                  </>
                )}

                {/* Python AI Playground Templates */}
                {activeTemplateCategory === 'python' && (
                  <>
                    <SectionTitle>
                      🐍 Python AI Playground
                    </SectionTitle>
                <TemplateGrid>
                  {pythonTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      onClick={() => addPythonTemplate(template)}
                      title={`Add ${template.name} - Year ${template.yearLevel}`}
                    >
                      <TemplatePreview gradient={template.gradient}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                            {template.icon}
                          </div>
                          <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '2px' }}>
                            Year {template.yearLevel} • {template.ageGroup}
                          </div>
                          <div style={{ fontSize: '9px', opacity: 0.9 }}>
                            {template.track}
                          </div>
                        </div>
                      </TemplatePreview>
                      <TemplateName>{template.name}</TemplateName>
                    </TemplateCard>
                  ))}
                </TemplateGrid>
                  </>
                )}

                {/* Quiz Templates Section */}
                {activeTemplateCategory === 'quizzes' && (
                  <>
                    <SectionTitle>
                      🧩 Quiz Templates
                    </SectionTitle>
                <TemplateGrid>
                  {quizTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      onClick={() => addQuizTemplate(template)}
                      title={`Add ${template.name}`}
                    >
                      <TemplatePreview gradient={template.gradient}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', marginBottom: '4px' }}>
                            {template.icon}
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: 'bold' }}>
                            {template.name}
                          </div>
                        </div>
                      </TemplatePreview>
                      <TemplateName>{template.description}</TemplateName>
                    </TemplateCard>
                  ))}
                </TemplateGrid>
                  </>
                )}

                {/* Regular Components Section */}
                {activeTemplateCategory === 'components' && (
                  <>
                    <SectionTitle>
                      📦 Other Components
                    </SectionTitle>
                    <ComponentGrid>
                      {elementTypes.map((type) => (
                        <ComponentButton
                          key={type.id}
                          onClick={() => addElement(type.id)}
                        >
                          <ComponentIcon color={type.color}>
                            <type.icon size={20} />
                          </ComponentIcon>
                          <ComponentName>{type.name}</ComponentName>
                        </ComponentButton>
                      ))}
                    </ComponentGrid>
                  </>
                )}
              </Sidebar>

              <Canvas>
                <CanvasContent>
                  {courseElements.length === 0 ? (
                    <EmptyState>
                      <EmptyIcon>🚂</EmptyIcon>
                      <h3>Start Your AI Learning Journey!</h3>
                      <p>Choose a title template and add components to build your lesson</p>
                    </EmptyState>
                  ) : (
                    courseElements.map((element, index) => renderBuilderElement(element, index))
                  )}
                </CanvasContent>
              </Canvas>
            </>
          ) : (
            <Canvas>
              <CanvasContent>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '32px', color: '#2D3436', marginBottom: '8px' }}>
                    🚂 AI Learning Preview
                  </h2>
                  <p style={{ color: '#636E72', fontSize: '18px' }}>
                    This is how students will see your lesson
                  </p>
                </div>
                {courseElements.length === 0 ? (
                  <EmptyState>
                    <EmptyIcon>👁️</EmptyIcon>
                    <h3>No Content Yet</h3>
                    <p>Add some components in builder mode to see your lesson preview</p>
                  </EmptyState>
                ) : (
                  courseElements.map(renderPreviewElement)
                )}
              </CanvasContent>
            </Canvas>
          )}
        </MainContent>

        {/* Content Management Button */}
        <ContentManagerButton
          onClick={() => setShowContentManager(true)}
          title="Content Management Dashboard"
        >
          📊 Content Manager
        </ContentManagerButton>

        {/* Content Management Modal */}
        {showContentManager && (
          <ContentModal onClick={() => setShowContentManager(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, color: '#2D3436' }}>📊 Content Management Dashboard</h2>
                <button 
                  onClick={() => setShowContentManager(false)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '24px', 
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  ✕
                </button>
              </div>
              
              {/* Current Lesson Metadata */}
              <LessonMetadataDisplay>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, color: '#2D3436' }}>Current Lesson: {currentLesson.title}</h3>
                  <div>
                    <StatusBadge status={currentLesson.status}>
                      {currentLesson.status.toUpperCase()}
                    </StatusBadge>
                    <VersionTag>v{currentLesson.version}</VersionTag>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                  <div>
                    <strong>Target Age:</strong> {currentLesson.ageGroup} years old<br/>
                    <strong>Year Level:</strong> Year {currentLesson.yearLevel}<br/>
                    <strong>Module:</strong> {currentLesson.module}<br/>
                    <strong>Difficulty:</strong> {lessonMetadata.difficulty}
                  </div>
                  <div>
                    <strong>Est. Time:</strong> {lessonMetadata.estimatedTime} minutes<br/>
                    <strong>Assessment:</strong> {lessonMetadata.assessmentType}<br/>
                    <strong>Last Modified:</strong> {currentLesson.lastModified.toLocaleDateString()}<br/>
                    <strong>Elements:</strong> {courseElements.length} components
                  </div>
                </div>
              </LessonMetadataDisplay>

              {/* Franchise Architecture Overview */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ color: '#2D3436', marginBottom: '16px' }}>🏢 Franchise Architecture Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  
                  {/* Content Management */}
                  <div style={{ padding: '16px', background: '#f8f9ff', borderRadius: '8px', border: '1px solid #e0e6ff' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#667eea' }}>📚 Content Management</h4>
                    <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '13px', lineHeight: '1.6' }}>
                      <li>Version control & rollback</li>
                      <li>A/B testing framework</li>
                      <li>Content approval workflows</li>
                      <li>Multi-language support</li>
                    </ul>
                  </div>

                  {/* Gamification System */}
                  <div style={{ padding: '16px', background: '#fff8e1', borderRadius: '8px', border: '1px solid #ffe0b3' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#f57c00' }}>🎮 Gamification Engine</h4>
                    <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '13px', lineHeight: '1.6' }}>
                      <li>Progress tracking system</li>
                      <li>Badge & achievement system</li>
                      <li>Leaderboards per franchise</li>
                      <li>Adaptive difficulty scaling</li>
                    </ul>
                  </div>

                  {/* Analytics Dashboard */}
                  <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '8px', border: '1px solid #e1bee7' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#8e24aa' }}>📊 Analytics & Reporting</h4>
                    <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '13px', lineHeight: '1.6' }}>
                      <li>Student engagement metrics</li>
                      <li>Learning outcome tracking</li>
                      <li>Franchise performance data</li>
                      <li>Curriculum effectiveness analysis</li>
                    </ul>
                  </div>

                  {/* AI Integration */}
                  <div style={{ padding: '16px', background: '#e8f5e8', borderRadius: '8px', border: '1px solid #c8e6c9' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#2e7d2e' }}>🤖 AI Integration</h4>
                    <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '13px', lineHeight: '1.6' }}>
                      <li>Personalized learning paths</li>
                      <li>Intelligent tutoring system</li>
                      <li>Automated assessment grading</li>
                      <li>Content recommendation engine</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Learning Objectives & Prerequisites */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ color: '#2D3436', marginBottom: '8px' }}>🎯 Learning Objectives</h4>
                  <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', fontSize: '13px' }}>
                    {currentLesson.learningObjectives.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        {currentLesson.learningObjectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    ) : (
                      <em style={{ color: '#666' }}>No learning objectives set</em>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 style={{ color: '#2D3436', marginBottom: '8px' }}>📋 Prerequisites</h4>
                  <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', fontSize: '13px' }}>
                    {currentLesson.prerequisites.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        {currentLesson.prerequisites.map((prereq, i) => (
                          <li key={i}>{prereq}</li>
                        ))}
                      </ul>
                    ) : (
                      <em style={{ color: '#666' }}>No prerequisites required</em>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', padding: '16px', background: '#f0f8ff', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#1565c0' }}>
                  <strong>🚀 This architecture supports:</strong> Multi-tenant franchise management, 
                  centralized content updates, localized customization, and comprehensive learning analytics.
                </p>
              </div>
            </ModalContent>
          </ContentModal>
        )}

        {editingElement && (
          <RichEditModal
            element={editingElement}
            onSave={(content) => updateElement(editingElement.id, content)}
            onClose={() => setEditingElement(null)}
          />
        )}
      </AppContainer>
    </ThemeProvider>
  );
};

// Enhanced Element Preview with Template Support
const ElementPreview = ({ element }) => {
  switch (element.type) {
case 'title':
      return (
        <div style={{
          width: element.content.width || '100%',
          height: element.content.height || 'auto',
          margin: '0 auto'
        }}>
          <TitleComponent 
            gradient={element.content.gradient}
            align={element.content.align}
            padding={element.content.padding}
          >
            <div style={{ position: 'relative' }}>
              {element.content.decoration && (
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                  {element.content.decoration}
                </div>
              )}
              <h1 style={{ 
                fontSize: element.content.titleSize || '28px', 
                marginBottom: '10px', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                margin: '0 0 10px 0'
              }}>
                {element.content.title}
              </h1>
              <p style={{ 
                fontSize: '16px', 
                opacity: 0.9, 
                margin: 0 
              }}>
                {element.content.subtitle}
              </p>
            </div>
          </TitleComponent>
        </div>
      );
case 'text':
      return (
        <div style={{
          width: element.content.width || '100%',
          height: element.content.height || 'auto',
          margin: '0 auto'
        }}>
          <TextComponent>
            <div 
              dangerouslySetInnerHTML={{ __html: element.content.content }} 
              style={{
                fontSize: element.content.fontSize || '18px',
                textAlign: element.content.textAlign || 'left',
                color: element.content.color || '#2D3436'
              }}
            />
          </TextComponent>
        </div>
      );
    case 'python-playground':
      return (
        <div style={{
          width: element.content.width || '100%',
          height: element.content.height || 'auto',
          margin: '0 auto'
        }}>
          <div style={{
            background: element.content.gradient || 'linear-gradient(135deg, #3776ab, #ffd43b)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            {/* Header */}
            <div style={{
              background: 'rgba(0,0,0,0.1)',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '24px' }}>{element.content.icon}</div>
                <div>
                  <h3 style={{ 
                    margin: 0, 
                    color: 'white', 
                    fontSize: '18px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}>
                    {element.content.title}
                  </h3>
                  <div style={{ 
                    fontSize: '12px', 
                    color: 'rgba(255,255,255,0.8)',
                    marginTop: '2px'
                  }}>
                    Year {element.content.yearLevel} • {element.content.ageGroup} • {element.content.difficulty}
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div style={{
              padding: '16px 20px',
              background: 'rgba(255,255,255,0.1)',
              color: 'white'
            }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                {element.content.explanation}
              </p>
            </div>

            {/* Code Editor Preview */}
            <div style={{
              display: 'flex',
              height: '300px'
            }}>
              {/* Code Section */}
              <div style={{
                flex: 1,
                background: '#1e1e1e',
                padding: '16px',
                overflow: 'auto'
              }}>
                <div style={{
                  color: '#4CAF50',
                  fontSize: '12px',
                  marginBottom: '8px',
                  fontFamily: 'monospace'
                }}>
                  # Python Code:
                </div>
                <pre style={{
                  margin: 0,
                  color: '#f8f8f2',
                  fontSize: '13px',
                  fontFamily: 'Monaco, Consolas, monospace',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-wrap'
                }}>
                  {element.content.code}
                </pre>
              </div>

              {/* Output Section */}
              <div style={{
                flex: 1,
                background: '#0f0f0f',
                padding: '16px',
                borderLeft: '1px solid #333'
              }}>
                <div style={{
                  color: '#FFD700',
                  fontSize: '12px',
                  marginBottom: '8px',
                  fontFamily: 'monospace'
                }}>
                  # Output:
                </div>
                <pre style={{
                  margin: 0,
                  color: '#00ff00',
                  fontSize: '13px',
                  fontFamily: 'Monaco, Consolas, monospace',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-wrap'
                }}>
                  {element.content.expectedOutput}
                </pre>
              </div>
            </div>

            {/* Learning Objectives */}
            {element.content.learningObjectives && element.content.learningObjectives.length > 0 && (
              <div style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.05)',
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  🎯 Learning Goals:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {element.content.learningObjectives.map((objective, index) => (
                    <span key={index} style={{
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px'
                    }}>
                      {objective}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {element.content.prerequisites && element.content.prerequisites.length > 0 && (
              <div style={{
                padding: '8px 20px',
                background: 'rgba(255,255,255,0.05)',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.7)'
              }}>
                📚 Prerequisites: {element.content.prerequisites.join(', ')}
              </div>
            )}
          </div>
        </div>
      );
    case 'ai-chat':
      return (
        <div style={{
          background: 'linear-gradient(135deg, #FFD93D, #FFA502)',
          padding: '30px',
          textAlign: 'center',
          color: '#2D3436'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{element.content.title}</h3>
          <p style={{ marginBottom: '15px' }}>{element.content.description}</p>
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', color: '#2D3436' }}>
            🤖 AI Chat Interface - {element.content.personality}
          </div>
        </div>
      );
case 'quiz':
      return (
        <div style={{
          background: element.content.gradient || 'linear-gradient(135deg, #A8E6CF, #88D8C0)',
          padding: '30px',
          color: '#2D3436'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>
            {element.content.icon || '❓'} {element.content.question}
          </h3>
          <div style={{ textAlign: 'left' }}>
            {element.content.options.map((option, index) => (
              <div key={index} style={{ 
                margin: '8px 0', 
                padding: '12px', 
                background: 'rgba(255,255,255,0.3)', 
                borderRadius: '8px',
                border: index === element.content.correct ? '2px solid #4CAF50' : '1px solid rgba(255,255,255,0.5)',
                fontWeight: index === element.content.correct ? 'bold' : 'normal'
              }}>
                {index === element.content.correct ? '✅' : '◯'} {option}
              </div>
            ))}
          </div>
          {element.content.explanation && (
            <div style={{ 
              marginTop: '15px', 
              padding: '12px', 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: '8px',
              borderLeft: '4px solid #4CAF50'
            }}>
              <strong>💡 Explanation:</strong> {element.content.explanation}
            </div>
          )}
          {element.content.template && (
            <div style={{ 
              marginTop: '10px', 
              fontSize: '12px', 
              opacity: 0.8,
              fontStyle: 'italic'
            }}>
              Template: {element.content.style}
            </div>
          )}
        </div>
      );
    case 'ethics':
      return (
        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          padding: '30px'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>🤔 Ethics Scenario</h3>
          <p style={{ marginBottom: '15px' }}>{element.content.scenario}</p>
          <div style={{ textAlign: 'left' }}>
            {element.content.choices.map((choice, index) => (
              <div key={index} style={{ margin: '8px 0', padding: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>
                {index === element.content.correct ? '✅' : '◯'} {choice}
              </div>
            ))}
          </div>
          <p style={{ marginTop: '15px', fontSize: '14px', opacity: 0.9 }}>
            💡 Principle: {element.content.principle}
          </p>
        </div>
      );
    case 'image':
      return (
        <div style={{ padding: '30px', textAlign: 'center' }}>
          <div style={{ 
            background: '#f0f0f0', 
            borderRadius: '12px', 
            padding: '40px', 
            color: '#666',
            border: '2px dashed #ccc'
          }}>
            <Image size={48} style={{ marginBottom: '16px' }} />
            <p>Image Placeholder</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>{element.content.caption}</p>
          </div>
        </div>
      );
    default:
      return <div style={{ padding: '20px' }}>Unknown element type</div>;
  }
};

// Rich Text Editor Modal
const RichEditModal = ({ element, onSave, onClose }) => {
  const [editedElement, setEditedElement] = useState(element);
  const textAreaRef = useRef(null);

  // Rich text formatting functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    if (textAreaRef.current) {
      setEditedElement({
        ...editedElement,
        content: {
          ...editedElement.content,
          content: textAreaRef.current.innerHTML
        }
      });
    }
  };

  const handleColorChange = (color) => {
    formatText('foreColor', color);
  };

  const handleFontSizeChange = (size) => {
    formatText('fontSize', size);
  };

  const handleHeadingChange = (tag) => {
    formatText('formatBlock', tag);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#2D3436' }}>
          🚂 Edit {editedElement.type === 'title' ? `${editedElement.content.template || 'Title'}` : editedElement.type.charAt(0).toUpperCase() + editedElement.type.slice(1)} Component
        </h3>
        
{editedElement.type === 'title' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Template:</label>
              <select 
                value={editedElement.content.template || ''}
                onChange={(e) => {
                  const selectedTemplate = titleTemplates.find(t => t.id === e.target.value);
                  if (selectedTemplate) {
                    setEditedElement({
                      ...editedElement,
                      content: {
                        ...editedElement.content,
                        template: selectedTemplate.id,
                        gradient: selectedTemplate.gradient,
                        align: selectedTemplate.align,
                        padding: selectedTemplate.padding,
                        decoration: selectedTemplate.decoration,
                        style: selectedTemplate.style
                      }
                    });
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">Custom</option>
                {titleTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Styling Controls */}
            <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ marginRight: '8px', fontSize: '14px' }}>Title Size:</label>
                <select 
                  value={editedElement.content.titleSize || '28px'}
                  onChange={(e) => setEditedElement({
                    ...editedElement,
                    content: { ...editedElement.content, titleSize: e.target.value }
                  })}
                  style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="20px">Small (20px)</option>
                  <option value="24px">Medium (24px)</option>
                  <option value="28px">Large (28px)</option>
                  <option value="32px">Extra Large (32px)</option>
                  <option value="36px">Huge (36px)</option>
                </select>
              </div>
              
              <div>
                <label style={{ marginRight: '8px', fontSize: '14px' }}>Text Align:</label>
                <select 
                  value={editedElement.content.align || 'center'}
                  onChange={(e) => setEditedElement({
                    ...editedElement,
                    content: { ...editedElement.content, align: e.target.value }
                  })}
                  style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              
              <div>
                <label style={{ marginRight: '8px', fontSize: '14px' }}>Background:</label>
                <input
                  type="text"
                  value={editedElement.content.gradient || ''}
                  onChange={(e) => setEditedElement({
                    ...editedElement,
                    content: { ...editedElement.content, gradient: e.target.value }
                  })}
                  placeholder="e.g., linear-gradient(135deg, #FF6B6B, #4ECDC4)"
                  style={{ width: '200px', padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Title:</label>
              <input
                type="text"
                value={editedElement.content.title || ''}
                onChange={(e) => setEditedElement({
                  ...editedElement,
                  content: { ...editedElement.content, title: e.target.value }
                })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Subtitle:</label>
              <input
                type="text"
                value={editedElement.content.subtitle || ''}
                onChange={(e) => setEditedElement({
                  ...editedElement,
                  content: { ...editedElement.content, subtitle: e.target.value }
                })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>

            {/* Size Controls */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Element Size:</label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div>
                  <label style={{ marginRight: '8px', fontSize: '14px' }}>Width:</label>
                  <select 
                    value={editedElement.content.width || '100%'}
                    onChange={(e) => setEditedElement({
                      ...editedElement,
                      content: { ...editedElement.content, width: e.target.value }
                    })}
                    style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="100%">Full Width</option>
                    <option value="80%">80% Width</option>
                    <option value="60%">60% Width</option>
                    <option value="50%">Half Width</option>
                    <option value="300px">Small (300px)</option>
                    <option value="500px">Medium (500px)</option>
                    <option value="700px">Large (700px)</option>
                  </select>
                </div>
                <div>
                  <label style={{ marginRight: '8px', fontSize: '14px' }}>Height:</label>
                  <select 
                    value={editedElement.content.height || 'auto'}
                    onChange={(e) => setEditedElement({
                      ...editedElement,
                      content: { ...editedElement.content, height: e.target.value }
                    })}
                    style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="auto">Auto Height</option>
                    <option value="200px">Small (200px)</option>
                    <option value="300px">Medium (300px)</option>
                    <option value="400px">Large (400px)</option>
                    <option value="500px">Extra Large (500px)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

{editedElement.type === 'text' && (
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Content:</label>
            
            {/* Simple Controls */}
            <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ marginRight: '8px', fontSize: '14px' }}>Font Size:</label>
                <select 
                  value={editedElement.content.fontSize || '18px'}
                  onChange={(e) => setEditedElement({
                    ...editedElement,
                    content: { ...editedElement.content, fontSize: e.target.value }
                  })}
                  style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="12px">Small (12px)</option>
                  <option value="14px">Small+ (14px)</option>
                  <option value="16px">Medium (16px)</option>
                  <option value="18px">Regular (18px)</option>
                  <option value="20px">Large (20px)</option>
                  <option value="24px">Extra Large (24px)</option>
                  <option value="28px">Huge (28px)</option>
                </select>
              </div>
              
              <div>
                <label style={{ marginRight: '8px', fontSize: '14px' }}>Text Align:</label>
                <select 
                  value={editedElement.content.textAlign || 'left'}
                  onChange={(e) => setEditedElement({
                    ...editedElement,
                    content: { ...editedElement.content, textAlign: e.target.value }
                  })}
                  style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
              
              <div>
                <label style={{ marginRight: '8px', fontSize: '14px' }}>Text Color:</label>
                <input
                  type="color"
                  value={editedElement.content.color || '#2D3436'}
                  onChange={(e) => setEditedElement({
                    ...editedElement,
                    content: { ...editedElement.content, color: e.target.value }
                  })}
                  style={{ width: '40px', height: '30px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                />
              </div>
            </div>
            
            {/* HTML Content Editor */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>HTML Content:</label>
              <textarea
                value={editedElement.content.content || ''}
                onChange={(e) => setEditedElement({
                  ...editedElement,
                  content: { ...editedElement.content, content: e.target.value }
                })}
                rows={10}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'monospace'
                }}
                placeholder="Enter HTML content here... Example: <h2>Title</h2><p>Your text here</p>"
              />
            </div>
            
{/* Size Controls */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Element Size:</label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div>
                  <label style={{ marginRight: '8px', fontSize: '14px' }}>Width:</label>
                  <select 
                    value={editedElement.content.width || '100%'}
                    onChange={(e) => setEditedElement({
                      ...editedElement,
                      content: { ...editedElement.content, width: e.target.value }
                    })}
                    style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="100%">Full Width</option>
                    <option value="80%">80% Width</option>
                    <option value="60%">60% Width</option>
                    <option value="50%">Half Width</option>
                    <option value="300px">Small (300px)</option>
                    <option value="500px">Medium (500px)</option>
                    <option value="700px">Large (700px)</option>
                  </select>
                </div>
                <div>
                  <label style={{ marginRight: '8px', fontSize: '14px' }}>Height:</label>
                  <select 
                    value={editedElement.content.height || 'auto'}
                    onChange={(e) => setEditedElement({
                      ...editedElement,
                      content: { ...editedElement.content, height: e.target.value }
                    })}
                    style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  >
                    <option value="auto">Auto Height</option>
                    <option value="200px">Small (200px)</option>
                    <option value="300px">Medium (300px)</option>
                    <option value="400px">Large (400px)</option>
                    <option value="500px">Extra Large (500px)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Preview:</label>
              <div 
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '12px',
                  backgroundColor: '#f9f9f9',
                  minHeight: '100px',
                  fontSize: editedElement.content.fontSize || '18px',
                  textAlign: editedElement.content.textAlign || 'left',
                  color: editedElement.content.color || '#2D3436',
                  width: editedElement.content.width || '100%',
                  height: editedElement.content.height || 'auto'
                }}
                dangerouslySetInnerHTML={{ __html: editedElement.content.content || '<p>Preview will appear here...</p>' }}
              />
            </div>
          </div>
        )}

{editedElement.type === 'quiz' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Quiz Template:</label>
              <select 
                value={editedElement.content.template || ''}
                onChange={(e) => {
                  const selectedTemplate = quizTemplates.find(t => t.id === e.target.value);
                  if (selectedTemplate) {
                    setEditedElement({
                      ...editedElement,
                      content: {
                        ...editedElement.content,
                        template: selectedTemplate.id,
                        question: selectedTemplate.question,
                        options: selectedTemplate.options,
                        correct: selectedTemplate.correct,
                        explanation: selectedTemplate.explanation,
                        gradient: selectedTemplate.gradient,
                        icon: selectedTemplate.icon,
                        style: selectedTemplate.name
                      }
                    });
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">Custom Quiz</option>
                {quizTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.icon} {template.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Question:</label>
              <input
                type="text"
                value={editedElement.content.question || ''}
                onChange={(e) => setEditedElement({
                  ...editedElement,
                  content: { ...editedElement.content, question: e.target.value }
                })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Quiz Icon:</label>
              <input
                type="text"
                value={editedElement.content.icon || '❓'}
                onChange={(e) => setEditedElement({
                  ...editedElement,
                  content: { ...editedElement.content, icon: e.target.value }
                })}
                placeholder="Enter emoji (e.g., 🧠, 🛡️, 🕵️)"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>

            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Options:</label>
            {editedElement.content.options?.map((option, index) => (
              <div key={index} style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...editedElement.content.options];
                    newOptions[index] = e.target.value;
                    setEditedElement({
                      ...editedElement,
                      content: { ...editedElement.content, options: newOptions }
                    });
                  }}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input
                    type="radio"
                    checked={editedElement.content.correct === index}
                    onChange={() => setEditedElement({
                      ...editedElement,
                      content: { ...editedElement.content, correct: index }
                    })}
                  />
                  Correct
                </label>
              </div>
            ))}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Explanation (Optional):</label>
              <textarea
                value={editedElement.content.explanation || ''}
                onChange={(e) => setEditedElement({
                  ...editedElement,
                  content: { ...editedElement.content, explanation: e.target.value }
                })}
                rows={3}
                placeholder="Explain why this is the correct answer..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        )}

        {(editedElement.type === 'ai-chat' || editedElement.type === 'ethics' || editedElement.type === 'image') && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Configuration:</label>
            <textarea
              value={JSON.stringify(editedElement.content, null, 2)}
              onChange={(e) => {
                try {
                  const newContent = JSON.parse(e.target.value);
                  setEditedElement({
                    ...editedElement,
                    content: newContent
                  });
                } catch {}
              }}
              rows={8}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
            />
          </div>
        )}
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => onSave(editedElement.content)}
            style={{
              padding: '12px 24px',
              background: '#FF6B6B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            💾 Save Changes
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              background: '#ccc',
              color: '#666',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainAramaCourseBuilder;