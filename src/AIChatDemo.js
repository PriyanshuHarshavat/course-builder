import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSafety } from './SafetyProvider';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Lightbulb,
  Code,
  Heart,
  Zap,
  Star,
  PlayCircle,
  BookOpen,
  HelpCircle,
  Sparkles,
  Brain,
  Settings,
  Volume2,
  VolumeX,
  RotateCcw,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

// Animations
const typing = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const messageSlideIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const botPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Main Container
const ChatContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: white;
  position: relative;
`;

// Header
const ChatHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AIAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  animation: ${botPulse} 2s infinite;
`;

const TitleText = styled.div`
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }
  p {
    margin: 5px 0 0 0;
    font-size: 12px;
    opacity: 0.8;
  }
`;

const ChatControls = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Messages Area
const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
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

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: ${messageSlideIn} 0.5s ease-out;
  
  ${props => props.isUser && css`
    flex-direction: row-reverse;
  `}
`;

const MessageAvatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  
  ${props => props.isUser ? css`
    background: linear-gradient(135deg, #4ECDC4, #44A08D);
  ` : css`
    background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  `}
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
  
  ${props => props.isUser ? css`
    background: rgba(255, 255, 255, 0.2);
    margin-left: auto;
  ` : css`
    background: rgba(255, 255, 255, 0.1);
    margin-right: auto;
  `}
`;

const MessageText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: ${props => props.hasActions ? '10px' : '0'};
`;

const MessageActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`;

const CodeBlock = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 12px;
  margin: 8px 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  overflow-x: auto;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${messageSlideIn} 0.5s ease-out;
`;

const TypingDots = styled.div`
  display: flex;
  gap: 4px;
  
  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    animation: ${typing} 1.5s infinite;
    
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

// Input Area
const InputArea = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const InputContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 20px;
  font-family: inherit;
  font-size: 14px;
  resize: none;
  min-height: 20px;
  max-height: 100px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
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

const QuickActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const QuickActionButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }
`;

// AI Knowledge Base
const createAIKnowledgeBase = (ageGroup) => {
  const commonResponses = {
    greetings: [
      "Hi there! I'm Ada, your AI learning buddy! 🤖✨",
      "Hello! Ready to explore the amazing world of AI together? 🚀",
      "Hey! I'm so excited to learn about artificial intelligence with you! 🎉"
    ],
    
    encouragement: [
      "You're doing fantastic! Keep asking great questions! 🌟",
      "Wow, you're such a curious learner! I love it! 💫",
      "That's an excellent question! You're thinking like a real AI scientist! 🧠"
    ],
    
    needHelp: [
      "I'm here to help! What would you like to know about AI? 🤔",
      "No worries! Learning AI can be tricky. What's puzzling you? 💭",
      "Let's figure this out together! What concept would you like me to explain? 🔍"
    ]
  };

  const ageSpecificContent = {
    '8-9': {
      topics: {
        whatIsAI: "AI is like giving computers a brain! 🧠 Just like how you learn to recognize your friends, AI learns to recognize patterns and make decisions. It's like having a very smart robot friend!",
        
        howAILearns: "AI learns just like you do - through practice! 📚 When you practice riding a bike, you get better. AI practices with lots of examples until it gets really good at tasks!",
        
        aiExamples: "AI is everywhere! It helps Siri understand what you say 🗣️, helps Netflix pick movies you might like 🎬, and even helps cars drive safely 🚗!",
        
        programming: "Programming is like giving instructions to a computer! 💻 It's like telling your friend how to make a sandwich - you need to be very clear and specific!",
        
        pythonBasics: "Python is a programming language that's super friendly! 🐍 It's called Python because the person who made it liked a funny TV show called Monty Python!"
      },
      
      codeExamples: {
        helloWorld: `# This is how we say hello in Python!
print("Hello, I'm learning AI!")
print("AI is awesome! 🤖")`,
        
        variables: `# Variables are like boxes that store things
my_name = "Alex"
my_age = 8
favorite_color = "blue"

print("Hi, I'm " + my_name)
print("I am " + str(my_age) + " years old")`
      }
    },
    
    '10-11': {
      topics: {
        whatIsAI: "Artificial Intelligence is computer software that can perform tasks that typically require human intelligence - like understanding language, recognizing images, and making decisions! 🤖",
        
        machineLearning: "Machine Learning is how AI gets smarter! Instead of programming every possible answer, we show AI lots of examples and let it figure out patterns. It's like teaching by example! 📊",
        
        algorithms: "An algorithm is like a recipe for solving problems! 📝 Just like a cookie recipe tells you steps to make cookies, algorithms tell computers steps to solve problems.",
        
        dataScience: "Data Science is like being a detective with numbers! 🕵️‍♀️ We collect information (data) and use math and computers to find interesting patterns and answers.",
        
        aiEthics: "AI Ethics is about making sure AI is fair and helpful to everyone! ⚖️ We need to think about how AI affects people and make sure it's used responsibly."
      },
      
      codeExamples: {
        functions: `# Functions help us organize our code!
def greet_student(name, age):
    print(f"Hello {name}!")
    print(f"You're {age} years old - perfect for learning AI!")
    
greet_student("Alex", 10)`,
        
        aiDecision: `# Simple AI decision making
def weather_ai(temperature, is_raining):
    if is_raining:
        return "Take an umbrella! ☔"
    elif temperature > 25:
        return "Perfect weather for playing outside! ☀️"
    else:
        return "Maybe wear a jacket! 🧥"
        
advice = weather_ai(22, False)
print(advice)`
      }
    },
    
    '12-14': {
      topics: {
        whatIsAI: "Artificial Intelligence encompasses machine learning, deep learning, natural language processing, and computer vision - enabling computers to perform cognitive tasks traditionally requiring human intelligence. 🧠💻",
        
        neuralNetworks: "Neural networks are inspired by how our brains work! They have layers of connected nodes (like neurons) that process information and learn patterns from data. 🧬",
        
        deepLearning: "Deep Learning uses neural networks with many layers to solve complex problems like image recognition and language translation. It's like having multiple levels of understanding! 🏗️",
        
        aiApplications: "AI powers search engines, recommendation systems, autonomous vehicles, medical diagnosis, financial trading, and much more! It's transforming every industry. 🌍",
        
        futureOfAI: "AI will likely impact jobs, healthcare, education, and society in profound ways. Understanding AI ethics and responsible development is crucial for our future! 🚀"
      },
      
      codeExamples: {
        dataAnalysis: `# Simple data analysis with AI concepts
import random

# Simulate student performance data
students = ['Alice', 'Bob', 'Carol', 'David', 'Eve']
scores = [random.randint(70, 100) for _ in range(5)]

# AI-like analysis
def analyze_performance(names, scores):
    avg_score = sum(scores) / len(scores)
    top_performer = names[scores.index(max(scores))]
    
    print(f"Class average: {avg_score:.1f}")
    print(f"Top performer: {top_performer}")
    
    # Predict who might need help
    for name, score in zip(names, scores):
        if score < avg_score - 10:
            print(f"{name} might benefit from extra support")

analyze_performance(students, scores)`,
        
        simpleML: `# Basic pattern recognition concept
def simple_classifier(features):
    # Simple rule-based AI (like early machine learning)
    score = 0
    
    if features['study_hours'] > 5:
        score += 30
    if features['attendance'] > 0.9:
        score += 40
    if features['participation'] > 7:
        score += 30
        
    if score > 70:
        return "Likely to succeed! 🌟"
    else:
        return "Might need extra support 💪"

student_data = {
    'study_hours': 6,
    'attendance': 0.95,
    'participation': 8
}

prediction = simple_classifier(student_data)
print(f"AI Prediction: {prediction}")`
      }
    }
  };

  return {
    ...commonResponses,
    ...ageSpecificContent[ageGroup]
  };
};

// AI Chat Demo Component
const AIChatDemo = ({ 
  studentAge = '10-11',
  onComplete = () => {},
  onEngagementUpdate = () => {}
}) => {
  const { checkTextSafety, monitorSession } = useSafety();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiPersonality, setAiPersonality] = useState('friendly');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);
  const messagesEndRef = useRef(null);
  
  const knowledgeBase = createAIKnowledgeBase(studentAge);
  
  useEffect(() => {
    // Welcome message
    setTimeout(() => {
      addAIMessage(knowledgeBase.greetings[0], {
        actions: ['What is AI?', 'Show me code!', 'AI examples', 'How does AI learn?']
      });
    }, 1000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text, isUser = false, options = {}) => {
    const newMessage = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date(),
      ...options
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (isUser) {
      setConversationContext(prev => [...prev.slice(-10), text]); // Keep last 10 exchanges
    }
  };

  const addAIMessage = (text, options = {}) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, false, options);
      onEngagementUpdate({ type: 'ai_response', content: text });
    }, 1000 + Math.random() * 1000); // Simulate thinking time
  };

  const processUserMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Determine response based on message content
    let response = '';
    let actions = [];
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
      actions = ['What is AI?', 'Show me Python!', 'AI in real life'];
      
    } else if (lowerMessage.includes('what is ai') || lowerMessage.includes('artificial intelligence')) {
      response = knowledgeBase.topics.whatIsAI;
      actions = ['How does AI learn?', 'Show me examples', 'Can I make AI?'];
      
    } else if (lowerMessage.includes('how') && 
        (lowerMessage.includes('learn') || lowerMessage.includes('ai learn'))) {
      response = knowledgeBase.topics.howAILearns || knowledgeBase.topics.machineLearning;
      actions = ['Show me code!', 'More examples', 'What about ethics?'];
      
    } else if (lowerMessage.includes('example') || lowerMessage.includes('real life')) {
      response = knowledgeBase.topics.aiExamples;
      actions = ['How do I start coding?', 'Tell me about data', 'AI ethics'];
      
    } else if (lowerMessage.includes('code') || lowerMessage.includes('python') || lowerMessage.includes('programming')) {
      response = knowledgeBase.topics.programming || knowledgeBase.topics.pythonBasics;
      
      // Add code example based on age
      const codeExample = studentAge === '8-9' ? 
        knowledgeBase.codeExamples.helloWorld :
        studentAge === '10-11' ?
        knowledgeBase.codeExamples.functions :
        knowledgeBase.codeExamples.dataAnalysis;
        
      response += `\n\nHere's a fun example to try:\n\`\`\`python\n${codeExample}\n\`\`\``;
      actions = ['Explain this code', 'More examples', 'What\'s next?'];
      
    } else if (lowerMessage.includes('ethics') || lowerMessage.includes('fair') || lowerMessage.includes('responsible')) {
      response = knowledgeBase.topics.aiEthics || "AI ethics is super important! We need to make sure AI is fair, safe, and helpful to everyone. Think about how AI decisions might affect different people! 🤔⚖️";
      actions = ['Why does this matter?', 'Real examples', 'How can I help?'];
      
    } else if (lowerMessage.includes('help') || lowerMessage.includes('confused') || lowerMessage.includes('don\'t understand')) {
      response = knowledgeBase.needHelp[Math.floor(Math.random() * knowledgeBase.needHelp.length)];
      actions = ['Start with basics', 'Show simple examples', 'Ask specific question'];
      
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('awesome') || lowerMessage.includes('cool')) {
      response = knowledgeBase.encouragement[Math.floor(Math.random() * knowledgeBase.encouragement.length)];
      actions = ['Learn more!', 'Try coding', 'Ask another question'];
      
    } else {
      // Default response with context awareness
      response = "That's a great question! Let me think about that... 🤔\n\n";
      
      if (lowerMessage.includes('future') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
        response += "AI is creating lots of exciting new jobs! AI engineers, data scientists, robot designers, and AI ethics experts are all growing careers. The key is to start learning now! 🚀";
        actions = ['What skills do I need?', 'Show me AI jobs', 'How to start?'];
      } else if (lowerMessage.includes('scary') || lowerMessage.includes('dangerous') || lowerMessage.includes('bad')) {
        response += "It's normal to have concerns about AI! The important thing is that humans like you are learning about AI so we can guide it to be helpful and safe. You're part of the solution! 💪";
        actions = ['How to stay safe?', 'AI ethics', 'Positive examples'];
      } else {
        response += "I love your curiosity! Could you tell me more about what you're interested in? I can help with AI concepts, programming, or real-world examples!";
        actions = ['AI basics', 'Programming help', 'Real examples', 'Ethics questions'];
      }
    }
    
    addAIMessage(response, { actions });
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      // Safety check the message before sending
      const safetyResult = checkTextSafety(currentMessage, 'chat_input');
      
      if (!safetyResult.allowed) {
        // Show safety message instead of sending inappropriate content
        addMessage("I can't respond to that message as it doesn't follow our safety guidelines. Let's keep our conversation educational and fun! 😊", false, {
          actions: ['Tell me about AI', 'Ask a learning question', 'Try a different topic']
        });
        setCurrentMessage('');
        return;
      }
      
      // Monitor session activity
      monitorSession({ 
        type: 'chat_message', 
        content: currentMessage,
        timestamp: new Date()
      });
      
      addMessage(currentMessage, true);
      onEngagementUpdate({ type: 'user_message', content: currentMessage });
      
      const userMessage = currentMessage;
      setCurrentMessage('');
      
      // Process AI response
      setTimeout(() => {
        processUserMessage(userMessage);
      }, 500);
    }
  };

  const handleQuickAction = (action) => {
    setCurrentMessage(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setConversationContext([]);
    setTimeout(() => {
      addAIMessage(knowledgeBase.greetings[0], {
        actions: ['What is AI?', 'Show me code!', 'AI examples', 'How does AI learn?']
      });
    }, 500);
  };

  const formatMessage = (text) => {
    // Handle code blocks
    const parts = text.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const [language, ...codeLines] = part.split('\n');
        const code = codeLines.join('\n');
        return (
          <CodeBlock key={index}>
            <div style={{ color: '#4CAF50', fontSize: '10px', marginBottom: '8px' }}>
              {language.toUpperCase()}
            </div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
          </CodeBlock>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const quickActionSuggestions = [
    { text: 'What is AI?', icon: <Brain size={14} /> },
    { text: 'Show me Python code!', icon: <Code size={14} /> },
    { text: 'AI in real life', icon: <Sparkles size={14} /> },
    { text: 'How does AI learn?', icon: <BookOpen size={14} /> },
    { text: 'AI ethics', icon: <Heart size={14} /> }
  ];

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>
          <AIAvatar>🤖</AIAvatar>
          <TitleText>
            <h2>Ada - Your AI Learning Buddy</h2>
            <p>Ask me anything about artificial intelligence!</p>
          </TitleText>
        </ChatTitle>
        
        <ChatControls>
          <ControlButton 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            title="Toggle voice"
          >
            {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </ControlButton>
          <ControlButton onClick={resetConversation} title="Reset conversation">
            <RotateCcw size={16} />
          </ControlButton>
          <ControlButton title="Settings">
            <Settings size={16} />
          </ControlButton>
        </ChatControls>
      </ChatHeader>

      <MessagesArea>
        {messages.map((message) => (
          <Message key={message.id} isUser={message.isUser}>
            <MessageAvatar isUser={message.isUser}>
              {message.isUser ? <User size={16} /> : <Bot size={16} />}
            </MessageAvatar>
            <MessageBubble isUser={message.isUser}>
              <MessageText hasActions={message.actions?.length > 0}>
                {formatMessage(message.text)}
              </MessageText>
              
              {message.actions && (
                <MessageActions>
                  {message.actions.map((action, index) => (
                    <ActionButton
                      key={index}
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </ActionButton>
                  ))}
                </MessageActions>
              )}
            </MessageBubble>
          </Message>
        ))}
        
        {isTyping && (
          <TypingIndicator>
            <MessageAvatar>
              <Bot size={16} />
            </MessageAvatar>
            <MessageBubble>
              <TypingDots>
                <span></span>
                <span></span>
                <span></span>
              </TypingDots>
            </MessageBubble>
          </TypingIndicator>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesArea>

      <InputArea>
        <InputContainer>
          <MessageInput
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about AI, programming, or anything else! 🤖"
            rows={1}
          />
          <SendButton 
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isTyping}
          >
            <Send size={16} />
          </SendButton>
        </InputContainer>
        
        <QuickActions>
          {quickActionSuggestions.map((suggestion, index) => (
            <QuickActionButton
              key={index}
              onClick={() => handleQuickAction(suggestion.text)}
            >
              {suggestion.icon}
              {suggestion.text}
            </QuickActionButton>
          ))}
        </QuickActions>
      </InputArea>
    </ChatContainer>
  );
};

export default AIChatDemo;