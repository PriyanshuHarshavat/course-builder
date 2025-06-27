import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSafety } from './SafetyProvider';
import {
  Zap,
  Brain,
  Eye,
  RefreshCw,
  Copy,
  Download,
  Settings,
  AlertCircle,
  CheckCircle,
  Loader,
  Lightbulb,
  MessageSquare,
  Image,
  Code,
  PenTool,
  GitCompare,
  Star,
  ThumbsUp,
  ThumbsDown,
  HelpCircle
} from 'lucide-react';

// Animations
const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Main Container
const AILabContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
`;

const LabHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const LabTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const LabSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 20px;
`;

// Prompt Input Section
const PromptSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 25px;
`;

const PromptInputArea = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-end;
  margin-bottom: 15px;
`;

const PromptInput = styled.textarea`
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 15px;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const GenerateButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  cursor: pointer;
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

// Prompt Templates
const PromptTemplates = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const PromptTemplate = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }
`;

// AI Comparison Grid
const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
`;

const AIProviderCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  position: relative;
  min-height: 300px;
  
  ${props => props.isGenerating && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      animation: ${pulse} 2s infinite;
    }
  `}
`;

const ProviderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ProviderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProviderLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  ${props => props.provider === 'openai' && 'background: linear-gradient(135deg, #10a37f, #1a7f64);'}
  ${props => props.provider === 'google' && 'background: linear-gradient(135deg, #4285f4, #db4437);'}
  ${props => props.provider === 'anthropic' && 'background: linear-gradient(135deg, #ff6b35, #f7931e);'}
`;

const ProviderName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const ProviderModel = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  ${props => props.status === 'ready' && 'color: #4CAF50;'}
  ${props => props.status === 'generating' && 'color: #FFC107;'}
  ${props => props.status === 'error' && 'color: #f44336;'}
`;

const ResponseArea = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
  min-height: 150px;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
`;

const ResponseText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  
  ${props => props.isTyping && css`
    overflow: hidden;
    border-right: 2px solid #4CAF50;
    animation: ${typewriter} 2s steps(40, end);
  `}
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  
  svg {
    animation: ${pulse} 1.5s infinite;
  }
`;

const ResponseMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  opacity: 0.8;
`;

const MetricBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 8px;
`;

// Analysis Section
const AnalysisSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
`;

const AnalysisTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 18px;
`;

const ComparisonInsights = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
`;

const InsightCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
`;

const InsightLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InsightText = styled.div`
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.4;
`;

// Mock AI Responses (in a real implementation, these would come from actual APIs)
const mockAIResponses = {
  openai: {
    name: "OpenAI GPT",
    model: "GPT-4",
    logo: "🤖",
    generateResponse: (prompt) => {
      // Simulate OpenAI's style - typically more creative and detailed
      const responses = {
        "Write a story about a robot": "Once upon a time, in a bustling city of tomorrow, there lived a small robot named Zara. Unlike the towering mechanical giants that worked in factories, Zara was designed for one special purpose: to bring joy to children. With her bright LED eyes and cheerful beeping sounds, she would visit the local school every day, teaching kids about friendship and kindness through interactive games and storytelling.",
        "Explain how computers work": "Computers are like incredibly fast, electronic brains that follow instructions called 'code.' Think of a computer as having three main parts: the brain (CPU), memory (RAM), and storage (hard drive). When you click on something, the computer reads the instruction, processes it super quickly, and shows you the result on your screen!",
        "Create a poem about nature": "Whispers of wind through emerald trees,\nSunbeams dancing on morning seas,\nButterflies painting the sky with grace,\nNature's wonder in every place.\n\nFrom tiny seeds to mountains tall,\nLife's magic surrounds us all.",
        "default": "Hello! I'm OpenAI's GPT model. I tend to be creative, detailed, and I love helping with complex questions. I try to provide thorough, well-structured responses with examples and clear explanations."
      };
      return responses[prompt] || responses["default"];
    }
  },
  
  google: {
    name: "Google Gemini",
    model: "Gemini Pro",
    logo: "🔍",
    generateResponse: (prompt) => {
      // Simulate Google's style - typically more factual and structured
      const responses = {
        "Write a story about a robot": "**Robot Story: ROBO-7**\n\nROBO-7 was a service robot in New Tokyo. Primary functions: cleaning, delivery, basic assistance. One day, ROBO-7 encountered a lost child. Using facial recognition and city database access, ROBO-7 quickly located the child's parents. This event triggered new empathy protocols in ROBO-7's neural network, leading to expanded social interaction capabilities.",
        "Explain how computers work": "**Computer Basics:**\n1. **Input**: You provide data (keyboard, mouse)\n2. **Processing**: CPU executes instructions\n3. **Memory**: RAM stores temporary data\n4. **Storage**: Hard drive keeps permanent files\n5. **Output**: Screen displays results\n\nKey fact: Modern computers process billions of operations per second.",
        "Create a poem about nature": "**Nature Elements:**\n\nEarth: soil, rocks, minerals\nWater: rivers, oceans, rain\nAir: oxygen, wind patterns\nLife: plants, animals, ecosystems\n\nConnection: All elements interdependent\nResult: Balanced natural systems",
        "default": "Greetings! I'm Google's Gemini. I focus on providing accurate, well-researched information with clear structure. I excel at factual queries, analysis, and breaking down complex topics into organized formats."
      };
      return responses[prompt] || responses["default"];
    }
  },
  
  anthropic: {
    name: "Claude (Demo)",
    model: "Claude-3",
    logo: "🎭",
    generateResponse: (prompt) => {
      // Simulate Anthropic's style - typically more conversational and ethical
      const responses = {
        "Write a story about a robot": "I'd love to tell you about ARIA, a thoughtful robot! ARIA was designed to help elderly people in a community center. What made ARIA special wasn't just her helpful features, but her ability to truly listen. She would remember Mrs. Chen's favorite tea, help Mr. Rodriguez with his crossword puzzles, and always ask about everyone's grandchildren. ARIA taught us that the best technology doesn't just work efficiently—it cares genuinely.",
        "Explain how computers work": "Great question! Think of a computer like a very organized library. The librarian (CPU) reads your request, finds the right books (data) from the shelves (memory and storage), and brings you exactly what you need. The amazing part? This 'librarian' can handle millions of requests simultaneously and never gets tired! Each part has a special job, working together like a perfectly choreographed team.",
        "Create a poem about nature": "In nature's gentle classroom, we learn\nThat every leaf has lessons to share,\nThat rivers teach us how to flow,\nAnd mountains show us how to care.\n\nThe smallest ant builds with purpose,\nThe mighty oak grows slow and strong—\nIn nature's wisdom, we discover\nWhere we truly belong.",
        "default": "Hello! I'm Claude, created by Anthropic. I aim to be helpful, harmless, and honest. I enjoy thoughtful conversations and try to consider different perspectives. I'm particularly focused on being ethical and considering the impacts of what I say."
      };
      return responses[prompt] || responses["default"];
    }
  }
};

// Main Component
const AIGeneratorComparison = ({ 
  studentAge = '10-11',
  onLearningProgress = () => {}
}) => {
  const { checkTextSafety, monitorSession } = useSafety();
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState({});
  const [generatingStates, setGeneratingStates] = useState({});
  const [selectedComparison, setSelectedComparison] = useState(null);

  const promptTemplates = {
    '8-9': [
      "Write a story about a robot",
      "Describe a magical forest",
      "Explain why the sky is blue",
      "Create a fun song about animals"
    ],
    '10-11': [
      "Write a story about a robot",
      "Explain how computers work",
      "Create a poem about nature",
      "Describe the future of space travel"
    ],
    '12-14': [
      "Explain artificial intelligence in simple terms",
      "Write a creative story about time travel",
      "Analyze the benefits and risks of social media",
      "Describe how climate change affects ecosystems"
    ]
  };

  const currentTemplates = promptTemplates[studentAge] || promptTemplates['10-11'];

  const generateResponses = async () => {
    if (!prompt.trim()) return;
    
    // Safety check the prompt before generating responses
    const safetyResult = checkTextSafety(prompt, 'ai_prompt');
    
    if (!safetyResult.allowed) {
      // Show safety message and suggest alternatives
      setResponses({
        safety: {
          text: `⚠️ This prompt doesn't follow our safety guidelines. ${safetyResult.issues.join(' ')} \n\nTry asking about educational topics like science, coding, art, or storytelling instead!`,
          timestamp: new Date(),
          wordCount: 25,
          responseTime: 0.1
        }
      });
      return;
    }
    
    // Monitor the AI comparison activity
    monitorSession({
      type: 'ai_comparison',
      prompt: prompt,
      timestamp: new Date()
    });
    
    const providers = ['openai', 'google', 'anthropic'];
    setResponses({});
    
    // Set all providers to generating state
    const initialGeneratingStates = {};
    providers.forEach(provider => {
      initialGeneratingStates[provider] = true;
    });
    setGeneratingStates(initialGeneratingStates);

    // Simulate API calls with realistic delays
    providers.forEach((provider, index) => {
      setTimeout(() => {
        const mockResponse = mockAIResponses[provider].generateResponse(prompt);
        
        setResponses(prev => ({
          ...prev,
          [provider]: {
            text: mockResponse,
            timestamp: new Date(),
            wordCount: mockResponse.split(' ').length,
            responseTime: (index + 1) * 0.5 + Math.random() * 1, // Simulate different response times
          }
        }));
        
        setGeneratingStates(prev => ({
          ...prev,
          [provider]: false
        }));
      }, (index + 1) * 1500 + Math.random() * 1000); // Staggered responses
    });

    onLearningProgress({
      type: 'ai_comparison',
      prompt: prompt,
      timestamp: new Date()
    });
  };

  const selectTemplate = (template) => {
    setPrompt(template);
  };

  const getAnalysisInsights = () => {
    if (Object.keys(responses).length < 2) return [];
    
    const insights = [
      {
        label: "Response Style",
        icon: <PenTool size={16} />,
        content: "OpenAI tends to be more creative and detailed, Google focuses on structured facts, and Claude emphasizes helpful conversation."
      },
      {
        label: "Length Variation", 
        icon: <Eye size={16} />,
        content: `Word counts vary: ${Object.entries(responses).map(([provider, data]) => 
          `${mockAIResponses[provider].name}: ${data.wordCount} words`).join(', ')}`
      },
      {
        label: "Speed Comparison",
        icon: <Zap size={16} />,
        content: `Response times differ based on model complexity and server load. Each AI has different processing approaches.`
      },
      {
        label: "Educational Value",
        icon: <Lightbulb size={16} />,
        content: "Different AIs excel at different tasks - some are better for creativity, others for facts, and some for balanced conversation."
      }
    ];
    
    return insights;
  };

  return (
    <AILabContainer>
      <LabHeader>
        <LabTitle>
          <GitCompare size={32} />
          AI Generator Comparison Lab
          <Star size={32} />
        </LabTitle>
        <LabSubtitle>
          Discover how different AI systems respond to the same question! 🚀
        </LabSubtitle>
      </LabHeader>

      <PromptSection>
        <PromptInputArea>
          <PromptInput
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your question or prompt here... Ask about stories, facts, explanations, or anything you're curious about!"
          />
          <GenerateButton 
            onClick={generateResponses}
            disabled={!prompt.trim() || Object.values(generatingStates).some(Boolean)}
          >
            {Object.values(generatingStates).some(Boolean) ? (
              <>
                <Loader size={16} />
                Generating...
              </>
            ) : (
              <>
                <Brain size={16} />
                Compare AIs!
              </>
            )}
          </GenerateButton>
        </PromptInputArea>
        
        <PromptTemplates>
          <span style={{ fontSize: '12px', opacity: 0.8, marginRight: '10px' }}>
            Try these prompts:
          </span>
          {currentTemplates.map((template, index) => (
            <PromptTemplate
              key={index}
              onClick={() => selectTemplate(template)}
            >
              {template}
            </PromptTemplate>
          ))}
        </PromptTemplates>
      </PromptSection>

      <ComparisonGrid>
        {Object.entries(mockAIResponses).map(([provider, config]) => (
          <AIProviderCard key={provider} isGenerating={generatingStates[provider]}>
            <ProviderHeader>
              <ProviderInfo>
                <ProviderLogo provider={provider}>
                  {config.logo}
                </ProviderLogo>
                <div>
                  <ProviderName>{config.name}</ProviderName>
                  <ProviderModel>{config.model}</ProviderModel>
                </div>
              </ProviderInfo>
              <StatusIndicator 
                status={generatingStates[provider] ? 'generating' : responses[provider] ? 'ready' : 'waiting'}
              >
                {generatingStates[provider] ? (
                  <>
                    <Loader size={12} />
                    Thinking...
                  </>
                ) : responses[provider] ? (
                  <>
                    <CheckCircle size={12} />
                    Ready
                  </>
                ) : (
                  <>
                    <AlertCircle size={12} />
                    Waiting
                  </>
                )}
              </StatusIndicator>
            </ProviderHeader>

            <ResponseArea>
              {generatingStates[provider] ? (
                <LoadingSpinner>
                  <Brain size={24} />
                </LoadingSpinner>
              ) : responses[provider] ? (
                <>
                  <ResponseText isTyping={false}>
                    {responses[provider].text}
                  </ResponseText>
                  <ResponseMetrics>
                    <div>
                      <MetricBadge>{responses[provider].wordCount} words</MetricBadge>
                    </div>
                    <div>
                      <MetricBadge>{responses[provider].responseTime.toFixed(1)}s</MetricBadge>
                    </div>
                  </ResponseMetrics>
                </>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%',
                  opacity: 0.5 
                }}>
                  <MessageSquare size={32} />
                  <span style={{ marginLeft: '10px' }}>Ready for your prompt!</span>
                </div>
              )}
            </ResponseArea>
          </AIProviderCard>
        ))}
      </ComparisonGrid>

      {Object.keys(responses).length >= 2 && (
        <AnalysisSection>
          <AnalysisTitle>
            <HelpCircle size={20} />
            What Did We Learn?
          </AnalysisTitle>
          <ComparisonInsights>
            {getAnalysisInsights().map((insight, index) => (
              <InsightCard key={index}>
                <InsightLabel>
                  {insight.icon}
                  {insight.label}
                </InsightLabel>
                <InsightText>{insight.content}</InsightText>
              </InsightCard>
            ))}
          </ComparisonInsights>
        </AnalysisSection>
      )}
    </AILabContainer>
  );
};

export default AIGeneratorComparison;