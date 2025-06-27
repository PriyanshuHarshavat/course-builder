import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAnalytics } from './AnalyticsProvider';
import {
  BookOpen,
  Target,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Star,
  Trophy,
  Brain,
  Wand2,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  Award,
  Eye,
  Edit3,
  Send,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Shield,
  RefreshCw
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

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-10px); }
  70% { transform: translateY(-5px); }
  90% { transform: translateY(-2px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
`;

// Main Container
const LessonsContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
`;

// Header
const LessonHeader = styled.div`
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

const LessonIcon = styled.div`
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

const LessonInfo = styled.div``; 

const LessonTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LessonSubtitle = styled.p`
  margin: 8px 0 0 0;
  opacity: 0.9;
  font-size: 16px;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Progress Indicator
const ProgressTracker = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 25px;
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ProgressTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProgressStats = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  opacity: 0.9;
`;

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  height: 8px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  height: 100%;
  width: ${props => props.percentage || 0}%;
  border-radius: 10px;
  transition: width 0.8s ease;
`;

const LessonSteps = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Step = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => 
    props.completed ? '#4CAF50' : 
    props.current ? '#FFD700' : 
    'rgba(255, 255, 255, 0.3)'
  };
  border: 2px solid ${props => 
    props.current ? '#FFD700' : 'transparent'
  };
  transition: all 0.3s ease;
  ${props => props.current && css`animation: ${pulse} 2s infinite;`}
`;

// Lesson Content
const LessonContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

// Tutorial Section
const TutorialSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TutorialContent = styled.div`
  ${css`animation: ${slideIn} 0.5s ease-out;`}
`;

const ExampleBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid ${props => props.type === 'good' ? '#4CAF50' : props.type === 'bad' ? '#f44336' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 12px;
  padding: 15px;
  margin: 15px 0;
`;

const ExampleLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.type === 'good' ? '#4CAF50' : props.type === 'bad' ? '#f44336' : '#FFD700'};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ExampleText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 8px;
  font-family: monospace;
`;

const TipBox = styled.div`
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #333;
  border-radius: 12px;
  padding: 15px;
  margin: 15px 0;
  font-weight: bold;
`;

// Practice Section
const PracticeSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const PromptInput = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  color: white;
  padding: 15px;
  border-radius: 12px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin: 15px 0;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: ${props => 
    props.variant === 'primary' ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.variant === 'secondary' ? 'linear-gradient(135deg, #2196F3, #1976D2)' :
    props.variant === 'warning' ? 'linear-gradient(135deg, #FF9800, #F57C00)' :
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

// Feedback Section
const FeedbackSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-top: 25px;
  ${css`animation: ${slideIn} 0.5s ease-out;`}
`;

const FeedbackCard = styled.div`
  background: ${props => 
    props.type === 'success' ? 'rgba(76, 175, 80, 0.2)' :
    props.type === 'warning' ? 'rgba(255, 152, 0, 0.2)' :
    props.type === 'error' ? 'rgba(244, 67, 54, 0.2)' :
    'rgba(255, 255, 255, 0.1)'
  };
  border: 2px solid ${props => 
    props.type === 'success' ? '#4CAF50' :
    props.type === 'warning' ? '#FF9800' :
    props.type === 'error' ? '#f44336' :
    'rgba(255, 255, 255, 0.3)'
  };
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
`;

const FeedbackHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const FeedbackContent = styled.div`
  font-size: 14px;
  line-height: 1.4;
`;

const SuggestionsList = styled.ul`
  margin: 10px 0;
  padding-left: 20px;
`;

const SuggestionItem = styled.li`
  margin: 5px 0;
  font-size: 13px;
`;

// Navigation
const LessonNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const NavButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Lesson curriculum data
const LESSON_CURRICULUM = {
  '8-9': [
    {
      id: 'basics-8-9',
      title: 'What is a Prompt?',
      subtitle: 'Learn the basics of talking to AI',
      objective: 'Understand what a prompt is and how to write simple, clear instructions',
      examples: {
        good: [
          { prompt: 'Draw a happy cat playing with a ball', explanation: 'Clear, specific, and describes what we want' },
          { prompt: 'Tell me a short story about a friendly dragon', explanation: 'Gives clear instructions and describes the character' }
        ],
        bad: [
          { prompt: 'Draw something', explanation: 'Too vague - AI doesn\'t know what to draw' },
          { prompt: 'Story', explanation: 'Not enough information - what kind of story?' }
        ]
      },
      tips: [
        'Be specific about what you want',
        'Use describing words (happy, big, colorful)',
        'Ask for one thing at a time'
      ],
      practice: 'Try writing a prompt asking the AI to draw your favorite animal doing something fun!'
    },
    {
      id: 'describing-8-9', 
      title: 'Using Describing Words',
      subtitle: 'Make your prompts more colorful and detailed',
      objective: 'Learn to use adjectives and descriptive language to get better AI responses',
      examples: {
        good: [
          { prompt: 'Create a picture of a huge, purple dinosaur eating green leaves in a sunny forest', explanation: 'Uses lots of describing words: huge, purple, green, sunny' },
          { prompt: 'Write a funny story about a tiny mouse who loves to dance', explanation: 'Describes the character (tiny mouse) and what makes it special (loves to dance)' }
        ],
        bad: [
          { prompt: 'Make a dinosaur', explanation: 'Missing describing words - what does the dinosaur look like?' },
          { prompt: 'Story about a mouse', explanation: 'What kind of mouse? What does it do?' }
        ]
      },
      tips: [
        'Use color words (red, blue, sparkly)',
        'Use size words (big, tiny, enormous)', 
        'Use feeling words (happy, excited, calm)'
      ],
      practice: 'Write a prompt describing your dream playground using at least 3 describing words!'
    }
  ],
  '10-11': [
    {
      id: 'structure-10-11',
      title: 'Prompt Structure',
      subtitle: 'Building well-organized prompts',
      objective: 'Learn how to structure prompts with context, task, and desired outcome',
      examples: {
        good: [
          { prompt: 'You are a helpful science teacher. Explain how rainbows form using simple words that a 5th grader can understand. Include why we see different colors.', explanation: 'Sets role (science teacher), gives clear task (explain rainbows), specifies audience (5th grader)' },
          { prompt: 'Create a short poem about friendship that rhymes and has 4 lines. Make it cheerful and positive.', explanation: 'Clear format (4-line rhyming poem), topic (friendship), and tone (cheerful)' }
        ],
        bad: [
          { prompt: 'Tell me about rainbows', explanation: 'Too simple, no context about who\'s asking or how detailed the answer should be' },
          { prompt: 'Write a poem', explanation: 'No topic, length, or style specified' }
        ]
      },
      tips: [
        'Start with who the AI should be (teacher, artist, storyteller)',
        'Be clear about what you want the AI to do',
        'Specify how long or detailed the response should be'
      ],
      practice: 'Write a prompt asking the AI to be a chef and explain how to make your favorite sandwich!'
    },
    {
      id: 'iteration-10-11',
      title: 'Improving Your Prompts',
      subtitle: 'Making prompts better through practice',
      objective: 'Learn how to refine and improve prompts based on AI responses',
      examples: {
        good: [
          { prompt: 'First try: "Write a story about space"', explanation: 'Starting point - basic idea' },
          { prompt: 'Improved: "Write a 2-paragraph adventure story about two kids who discover a friendly alien spaceship in their backyard. Make it exciting but not scary."', explanation: 'Added length, characters, setting, tone, and age-appropriateness' }
        ],
        bad: [
          { prompt: 'Giving up after first try if the result isn\'t perfect', explanation: 'Prompting is a skill that improves with practice!' }
        ]
      },
      tips: [
        'If the AI response is too long, ask for it to be shorter',
        'If it\'s too simple, ask for more details',
        'If it\'s not what you wanted, be more specific about what you do want'
      ],
      practice: 'Start with a simple prompt, then improve it by adding more specific details!'
    }
  ],
  '12-14': [
    {
      id: 'advanced-techniques-12-14',
      title: 'Advanced Prompting Techniques',
      subtitle: 'Master prompt engineering strategies',
      objective: 'Learn sophisticated techniques like few-shot learning, chain-of-thought, and role-playing',
      examples: {
        good: [
          { prompt: 'You are an expert marine biologist. Using chain-of-thought reasoning, explain step-by-step how ocean pollution affects the food chain, starting with microplastics and ending with large marine mammals.', explanation: 'Uses role-playing (marine biologist) and chain-of-thought reasoning for complex topics' },
          { prompt: 'Here are examples of haikus:\n\nCherry blossoms fall\nSoft petals on morning breeze\nSpring\'s gentle goodbye\n\nNow write a haiku about technology following the same 5-7-5 syllable pattern.', explanation: 'Uses few-shot learning by providing an example before asking for similar output' }
        ],
        bad: [
          { prompt: 'Explain ocean pollution', explanation: 'Too broad and doesn\'t leverage advanced techniques for deeper understanding' }
        ]
      },
      tips: [
        'Use examples to show the AI exactly what format you want',
        'Ask the AI to "think step-by-step" for complex problems',
        'Give the AI a specific role or expertise to draw from'
      ],
      practice: 'Create a prompt that uses an example and asks the AI to think step-by-step about solving a math word problem!'
    },
    {
      id: 'ethics-bias-12-14',
      title: 'Understanding AI Limitations',
      subtitle: 'Critical thinking about AI responses',
      objective: 'Learn to identify potential biases, fact-check AI responses, and use AI responsibly',
      examples: {
        good: [
          { prompt: 'Generate three different perspectives on renewable energy - one from an environmental scientist, one from an economist, and one from a traditional energy worker. Include potential biases each might have.', explanation: 'Actively seeks multiple viewpoints and acknowledges potential biases' },
          { prompt: 'Explain the causes of World War I, but remind me to fact-check important dates and events you mention using reliable historical sources.', explanation: 'Asks for information while acknowledging the need for verification' }
        ],
        bad: [
          { prompt: 'Tell me the absolute truth about climate change', explanation: 'Assumes AI responses are always completely accurate and unbiased' }
        ]
      },
      tips: [
        'Always fact-check important information from AI',
        'Ask for multiple perspectives on controversial topics',
        'Be aware that AI can reflect biases from its training data'
      ],
      practice: 'Write a prompt about a current event that asks for multiple viewpoints and includes a reminder to verify facts!'
    }
  ]
};

// Feedback analysis system
const analyzePrompt = (prompt, ageGroup, lessonId) => {
  const feedback = {
    score: 0,
    type: 'neutral',
    message: '',
    suggestions: []
  };

  const wordCount = prompt.trim().split(/\s+/).length;
  const hasSpecifics = /\b(big|small|red|blue|happy|sad|funny|scary|beautiful|colorful|huge|tiny)\b/i.test(prompt);
  const hasRole = /\b(you are|act as|pretend to be|as a)\b/i.test(prompt);
  const hasStructure = prompt.includes('.') || prompt.includes(',') || prompt.includes(';');
  
  // Basic checks for all ages
  if (prompt.length < 10) {
    feedback.type = 'error';
    feedback.message = 'Your prompt is too short! Try adding more details.';
    feedback.suggestions.push('Add more describing words');
    feedback.suggestions.push('Explain what you want more clearly');
    feedback.score = 20;
    return feedback;
  }

  // Age-specific analysis
  if (ageGroup === '8-9') {
    feedback.score = 50; // Base score
    
    if (hasSpecifics) {
      feedback.score += 25;
      feedback.suggestions.push('Great job using describing words!');
    } else {
      feedback.suggestions.push('Try adding describing words like colors, sizes, or feelings');
    }
    
    if (wordCount >= 8) {
      feedback.score += 15;
    } else {
      feedback.suggestions.push('Try making your prompt a bit longer with more details');
    }
    
    if (prompt.toLowerCase().includes('please') || prompt.toLowerCase().includes('thank you')) {
      feedback.score += 10;
      feedback.suggestions.push('Nice manners!');
    }
    
  } else if (ageGroup === '10-11') {
    feedback.score = 40; // Base score
    
    if (hasRole) {
      feedback.score += 20;
      feedback.suggestions.push('Excellent! You gave the AI a role to play');
    } else {
      feedback.suggestions.push('Try starting with "You are a..." to give the AI a role');
    }
    
    if (hasStructure) {
      feedback.score += 20;
    } else {
      feedback.suggestions.push('Break your prompt into parts using punctuation');
    }
    
    if (wordCount >= 15) {
      feedback.score += 20;
    } else {
      feedback.suggestions.push('Add more details about what you want');
    }
    
  } else if (ageGroup === '12-14') {
    feedback.score = 30; // Base score
    
    if (hasRole) {
      feedback.score += 15;
    } else {
      feedback.suggestions.push('Consider giving the AI expertise or a specific role');
    }
    
    if (prompt.includes('step-by-step') || prompt.includes('think through') || prompt.includes('reasoning')) {
      feedback.score += 25;
      feedback.suggestions.push('Great use of chain-of-thought prompting!');
    } else {
      feedback.suggestions.push('Try asking the AI to think step-by-step for complex topics');
    }
    
    if (prompt.includes('example') || prompt.includes('like this') || prompt.includes('format')) {
      feedback.score += 20;
      feedback.suggestions.push('Nice use of examples to guide the AI!');
    } else {
      feedback.suggestions.push('Consider providing an example of what you want');
    }
    
    if (wordCount >= 25) {
      feedback.score += 10;
    } else {
      feedback.suggestions.push('More detailed prompts often get better results');
    }
  }

  // Set feedback type based on score
  if (feedback.score >= 80) {
    feedback.type = 'success';
    feedback.message = 'Excellent prompt! You\'re becoming a great prompt engineer! 🌟';
  } else if (feedback.score >= 60) {
    feedback.type = 'success';
    feedback.message = 'Good prompt! You\'re on the right track! 👍';
  } else if (feedback.score >= 40) {
    feedback.type = 'warning';
    feedback.message = 'Nice try! Here are some ways to make it even better:';
  } else {
    feedback.type = 'warning';
    feedback.message = 'Keep practicing! Here are some tips to improve:';
  }

  return feedback;
};

// Main Component
const PromptingLessons = ({ 
  studentAge = '10-11',
  onLearningProgress = () => {}
}) => {
  const { trackEducationalEvent, trackAIInteraction } = useAnalytics();
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [lessonsCompleted, setLessonsCompleted] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [showTips, setShowTips] = useState(false);

  const lessons = LESSON_CURRICULUM[studentAge] || LESSON_CURRICULUM['10-11'];
  const currentLesson = lessons[currentLessonIndex];
  const progress = ((lessonsCompleted.length + (feedback && feedback.score >= 60 ? 1 : 0)) / lessons.length) * 100;

  useEffect(() => {
    trackEducationalEvent('lesson_started', {
      lessonId: currentLesson.id,
      lessonTitle: currentLesson.title,
      ageGroup: studentAge
    });
  }, [currentLessonIndex, currentLesson.id, currentLesson.title, studentAge, trackEducationalEvent]);

  const handleAnalyzePrompt = () => {
    if (!userPrompt.trim()) return;
    
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    const analysis = analyzePrompt(userPrompt, studentAge, currentLesson.id);
    setFeedback(analysis);
    
    trackAIInteraction('prompt_analyzed', {
      promptLength: userPrompt.length,
      wordCount: userPrompt.trim().split(/\s+/).length,
      score: analysis.score,
      ageGroup: studentAge,
      lessonId: currentLesson.id,
      attempt: newAttempts
    });

    // Track learning progress
    onLearningProgress({
      type: 'prompt_practice',
      lessonId: currentLesson.id,
      score: analysis.score,
      attempts: newAttempts
    });
  };

  const handleNextLesson = () => {
    // Mark lesson as completed if score is good enough
    if (feedback && feedback.score >= 60) {
      const newCompleted = [...lessonsCompleted, currentLesson.id];
      setLessonsCompleted(newCompleted);
      
      trackEducationalEvent('lesson_completed', {
        lessonId: currentLesson.id,
        score: feedback.score,
        attempts: attempts,
        ageGroup: studentAge
      });
    }
    
    // Allow navigation to next lesson regardless of score (for exploration)
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setUserPrompt('');
      setFeedback(null);
      setAttempts(0);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setUserPrompt('');
      setFeedback(null);
      setAttempts(0);
    }
  };

  const handleTryAgain = () => {
    setUserPrompt('');
    setFeedback(null);
  };

  return (
    <LessonsContainer>
      <LessonHeader>
        <HeaderLeft>
          <LessonIcon>
            <Wand2 />
          </LessonIcon>
          <LessonInfo>
            <LessonTitle>
              <Brain size={24} />
              {currentLesson.title}
            </LessonTitle>
            <LessonSubtitle>{currentLesson.subtitle}</LessonSubtitle>
          </LessonInfo>
        </HeaderLeft>
        
        <HeaderControls>
          <ControlButton onClick={() => setShowTips(!showTips)}>
            <Lightbulb size={16} />
            {showTips ? 'Hide Tips' : 'Show Tips'}
          </ControlButton>
          <ControlButton onClick={handleTryAgain}>
            <RotateCcw size={16} />
            Reset
          </ControlButton>
        </HeaderControls>
      </LessonHeader>

      {/* Progress Tracker */}
      <ProgressTracker>
        <ProgressHeader>
          <ProgressTitle>
            <Target size={18} />
            Your Progress
          </ProgressTitle>
          <ProgressStats>
            <span>Lesson {currentLessonIndex + 1} of {lessons.length}</span>
            <span>•</span>
            <span>{lessonsCompleted.length} completed</span>
            <span>•</span>
            <span>{attempts} attempts</span>
          </ProgressStats>
        </ProgressHeader>
        <ProgressBar>
          <ProgressFill percentage={progress} />
        </ProgressBar>
        <LessonSteps>
          {lessons.map((_, index) => (
            <Step 
              key={index}
              completed={lessonsCompleted.includes(lessons[index].id)}
              current={index === currentLessonIndex}
            />
          ))}
        </LessonSteps>
      </ProgressTracker>

      {/* Main Lesson Content */}
      <LessonContent>
        {/* Tutorial Section */}
        <TutorialSection>
          <SectionHeader>
            <SectionTitle>
              <BookOpen size={20} />
              Learn: {currentLesson.objective}
            </SectionTitle>
          </SectionHeader>
          
          <TutorialContent>
            {/* Good Examples */}
            <h4>✅ Good Examples:</h4>
            {currentLesson.examples.good.map((example, index) => (
              <ExampleBox key={index} type="good">
                <ExampleLabel type="good">
                  <CheckCircle size={14} />
                  Good Prompt
                </ExampleLabel>
                <ExampleText>"{example.prompt}"</ExampleText>
                <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>
                  💡 {example.explanation}
                </div>
              </ExampleBox>
            ))}
            
            {/* Bad Examples */}
            <h4>❌ Examples to Avoid:</h4>
            {currentLesson.examples.bad.map((example, index) => (
              <ExampleBox key={index} type="bad">
                <ExampleLabel type="bad">
                  <AlertCircle size={14} />
                  Needs Improvement
                </ExampleLabel>
                <ExampleText>"{example.prompt}"</ExampleText>
                <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>
                  ⚠️ {example.explanation}
                </div>
              </ExampleBox>
            ))}

            {/* Tips */}
            {showTips && (
              <TipBox>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Lightbulb size={16} />
                  <strong>Tips for Success:</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {currentLesson.tips.map((tip, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>{tip}</li>
                  ))}
                </ul>
              </TipBox>
            )}
          </TutorialContent>
        </TutorialSection>

        {/* Practice Section */}
        <PracticeSection>
          <SectionHeader>
            <SectionTitle>
              <Edit3 size={20} />
              Practice Time!
            </SectionTitle>
          </SectionHeader>
          
          <div style={{ marginBottom: '15px', fontSize: '14px' }}>
            <strong>Your Challenge:</strong> {currentLesson.practice}
          </div>
          
          <PromptInput
            placeholder="Write your prompt here... Be creative and specific!"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          
          <ActionButtons>
            <ActionButton 
              variant="primary" 
              onClick={handleAnalyzePrompt}
              disabled={!userPrompt.trim()}
            >
              <Send size={16} />
              Analyze My Prompt
            </ActionButton>
            
            <ActionButton onClick={handleTryAgain}>
              <RefreshCw size={16} />
              Clear & Try Again
            </ActionButton>
            
            {currentLessonIndex < lessons.length - 1 && (
              <ActionButton 
                variant="secondary"
                onClick={handleNextLesson}
              >
                <ArrowRight size={16} />
                Skip to Next Lesson
              </ActionButton>
            )}
          </ActionButtons>
        </PracticeSection>
      </LessonContent>

      {/* Feedback Section */}
      {feedback && (
        <FeedbackSection>
          <SectionTitle>
            <Award size={20} />
            Your Prompt Analysis
          </SectionTitle>
          
          <FeedbackCard type={feedback.type}>
            <FeedbackHeader>
              {feedback.type === 'success' ? <CheckCircle size={18} /> : 
               feedback.type === 'warning' ? <AlertCircle size={18} /> : 
               <Brain size={18} />}
              Score: {feedback.score}/100
            </FeedbackHeader>
            <FeedbackContent>
              <strong>{feedback.message}</strong>
              {feedback.suggestions.length > 0 && (
                <SuggestionsList>
                  {feedback.suggestions.map((suggestion, index) => (
                    <SuggestionItem key={index}>{suggestion}</SuggestionItem>
                  ))}
                </SuggestionsList>
              )}
            </FeedbackContent>
          </FeedbackCard>
        </FeedbackSection>
      )}

      {/* Navigation */}
      <LessonNavigation>
        <NavButton 
          onClick={handlePreviousLesson}
          disabled={currentLessonIndex === 0}
        >
          <ArrowLeft size={16} />
          Previous Lesson
        </NavButton>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {feedback && feedback.score >= 60 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4CAF50' }}>
              <Trophy size={20} />
              <span>Lesson Complete! Great job! ⭐</span>
            </div>
          ) : (
            <div style={{ fontSize: '14px', opacity: 0.8, textAlign: 'center' }}>
              💡 Try writing a prompt above to practice, then navigate between lessons!
              <br />
              <span style={{ fontSize: '12px' }}>
                Lesson {currentLessonIndex + 1} of {lessons.length} • Age Group: {studentAge}
              </span>
            </div>
          )}
        </div>
        
        <NavButton 
          onClick={handleNextLesson}
          disabled={currentLessonIndex === lessons.length - 1}
          style={{ 
            background: feedback && feedback.score >= 60 ? 
              'linear-gradient(135deg, #4CAF50, #45a049)' : 
              'linear-gradient(135deg, #667eea, #764ba2)'
          }}
        >
          {currentLessonIndex === lessons.length - 1 ? 'Course Complete!' : 'Next Lesson'}
          {currentLessonIndex < lessons.length - 1 && <ArrowRight size={16} />}
        </NavButton>
      </LessonNavigation>
    </LessonsContainer>
  );
};

export default PromptingLessons;