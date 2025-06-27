import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Shield, 
  Heart, 
  Brain, 
  Users, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Award,
  BookOpen
} from 'lucide-react';

const ScenarioContainer = styled.div`
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea, #764ba2)'};
  border-radius: 16px;
  padding: 30px;
  color: white;
  margin: 16px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  min-height: 400px;
`;

const ScenarioHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(255,255,255,0.2);
`;

const ScenarioTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const ScenarioSubtitle = styled.div`
  font-size: 14px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StorySection = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
`;

const CharacterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const CharacterAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.color || '#4CAF50'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 3px solid rgba(255,255,255,0.3);
`;

const CharacterInfo = styled.div`
  flex: 1;
`;

const CharacterName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const CharacterRole = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const StoryText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const DilemmaBox = styled.div`
  background: rgba(255,255,255,0.15);
  border-left: 4px solid #FFD700;
  padding: 16px;
  border-radius: 8px;
  font-style: italic;
`;

const ChoicesSection = styled.div`
  margin-bottom: 24px;
`;

const ChoicesTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChoiceButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;
  background: ${props => {
    if (props.selected && props.showResults) {
      return props.isGoodChoice ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)';
    }
    return props.selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)';
  }};
  border: 2px solid ${props => {
    if (props.selected && props.showResults) {
      return props.isGoodChoice ? '#4CAF50' : '#f44336';
    }
    return props.selected ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)';
  }};
  border-radius: 12px;
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s;
  text-align: left;
  font-size: 14px;
  
  &:hover {
    background: ${props => props.disabled ? undefined : 'rgba(255,255,255,0.2)'};
    border-color: ${props => props.disabled ? undefined : 'rgba(255,255,255,0.4)'};
  }
`;

const ChoiceContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ChoiceIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.color || 'rgba(255,255,255,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ChoiceText = styled.div`
  flex: 1;
  font-weight: 500;
`;

const ConsequenceSection = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

const ConsequenceTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ConsequenceText = styled.div`
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const LearningMoment = styled.div`
  background: rgba(255,255,255,0.15);
  border-left: 4px solid #4CAF50;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
`;

const ReflectionSection = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${props => props.variant === 'primary' ? '#4CAF50' : 'rgba(255,255,255,0.2)'};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#45a049' : 'rgba(255,255,255,0.3)'};
    transform: translateY(-1px);
  }
`;

const ReflectionButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  background: ${props => props.selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'};
  border: 2px solid ${props => props.selected ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'};
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  font-size: 13px;
  
  &:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.4);
  }
`;

// Ethics Scenario Component
const EthicsScenario = ({ 
  element, 
  studentId = 'demo-student', 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState('story');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [reflectionAnswers, setReflectionAnswers] = useState({});

  // Default scenario if none provided
  const defaultScenario = {
    id: 'ai-friend-recommendation',
    title: 'AI Friend Recommendation',
    ageGroup: '10-11',
    difficulty: 'beginner',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    
    character: {
      name: 'Alex',
      avatar: '🧑‍💻',
      role: 'AI Helper',
      color: '#4CAF50'
    },
    
    story: {
      setup: "You're using an AI app that helps you find new friends at school. The AI has been watching how you interact and learning about your preferences.",
      situation: "Today, the AI suggests you should be friends with Jamie, but it also says you should avoid Sam because 'people like you usually don't get along with people like Sam.'",
      dilemma: "The AI is making recommendations based on patterns, but is this fair to Sam? What should you do?"
    },
    
    choices: [
      {
        id: 'follow-ai',
        text: "Follow the AI's advice - it's probably right based on data",
        icon: '🤖',
        color: '#2196F3',
        goodChoice: false,
        consequence: {
          immediate: "You avoid Sam and hang out with Jamie instead. Sam notices and feels left out.",
          longTerm: "You miss out on a potentially great friendship. Sam has amazing ideas and could have been a wonderful friend.",
          impact: "Other kids start avoiding Sam too because they see you doing it."
        },
        lesson: "AI can have biases! Just because it found patterns doesn't mean those patterns are fair or right."
      },
      
      {
        id: 'ignore-suggestion',
        text: "Ignore the suggestion and get to know both Jamie and Sam",
        icon: '👥',
        color: '#4CAF50',
        goodChoice: true,
        consequence: {
          immediate: "You decide to meet both Jamie and Sam to form your own opinion.",
          longTerm: "You discover that Sam is actually really funny and shares your love of science. Jamie is nice too!",
          impact: "You help other kids see that the AI's suggestion wasn't fair, and everyone becomes more inclusive."
        },
        lesson: "It's important to make your own decisions about people rather than relying on AI recommendations about relationships."
      },
      
      {
        id: 'question-ai',
        text: "Ask the AI why it made this recommendation",
        icon: '❓',
        color: '#FF9800',
        goodChoice: true,
        consequence: {
          immediate: "The AI explains it's based on 'social patterns' but can't give clear reasons.",
          longTerm: "You realize the AI might be using unfair generalizations. You decide to meet both kids yourself.",
          impact: "You learn to be critical of AI recommendations and teach others to question them too."
        },
        lesson: "Always ask 'why' when AI makes recommendations about people. Understanding the reasoning helps you decide if it's fair."
      }
    ],
    
    reflectionQuestions: [
      {
        id: 'bias-understanding',
        question: "Why might the AI's recommendation about Sam be unfair?",
        type: 'multiple-choice',
        options: [
          "AI doesn't know Sam personally",
          "AI might have learned biased patterns",
          "AI can't understand feelings",
          "All of the above"
        ],
        correct: 3
      },
      {
        id: 'real-world',
        question: "Can you think of a real situation where AI recommendations might not be fair?",
        type: 'text',
        placeholder: "Example: AI suggesting different things for different groups of people..."
      }
    ],
    
    extensionActivity: {
      title: "Design Fair AI",
      description: "How would you design an AI friend-finder that's fair to everyone?",
      prompts: [
        "What information should it use?",
        "What information should it NOT use?",
        "How can it avoid being biased?"
      ]
    }
  };

  const scenario = element?.content || defaultScenario;

  const handleChoiceSelect = (choice) => {
    if (showResults) return;
    setSelectedChoice(choice);
  };

  const handleSubmitChoice = () => {
    if (!selectedChoice) return;
    setShowResults(true);
    setCurrentStep('consequence');
  };

  const handleReflection = () => {
    setCurrentStep('reflection');
  };

  const handleComplete = () => {
    console.log('Completing scenario with reflection answers:', reflectionAnswers);
    if (onComplete) {
      onComplete({
        scenarioId: scenario.id,
        choiceId: selectedChoice?.id,
        wasGoodChoice: selectedChoice?.goodChoice,
        reflectionAnswers,
        completedAt: new Date()
      });
    }
    console.log('Ethics scenario completed:', {
      scenario: scenario.id,
      choice: selectedChoice?.id,
      ethical: selectedChoice?.goodChoice,
      reflections: Object.keys(reflectionAnswers).length
    });
    alert('🎉 Ethics scenario completed! Check the console for details.');
  };

  const handleRestart = () => {
    setCurrentStep('story');
    setSelectedChoice(null);
    setShowResults(false);
    setReflectionAnswers({});
  };

  return (
    <ScenarioContainer gradient={scenario.gradient}>
      <ScenarioHeader>
        <ScenarioTitle>
          <Shield size={28} />
          {scenario.title}
        </ScenarioTitle>
        <ScenarioSubtitle>
          <Brain size={16} />
          AI Ethics • Age {scenario.ageGroup} • {scenario.difficulty}
        </ScenarioSubtitle>
      </ScenarioHeader>

      {/* Story Section */}
      {currentStep === 'story' && (
        <>
          <StorySection>
            <CharacterSection>
              <CharacterAvatar color={scenario.character.color}>
                {scenario.character.avatar}
              </CharacterAvatar>
              <CharacterInfo>
                <CharacterName>{scenario.character.name}</CharacterName>
                <CharacterRole>{scenario.character.role}</CharacterRole>
              </CharacterInfo>
            </CharacterSection>
            
            <StoryText>{scenario.story.setup}</StoryText>
            <StoryText>{scenario.story.situation}</StoryText>
            
            <DilemmaBox>
              <strong>The Dilemma:</strong> {scenario.story.dilemma}
            </DilemmaBox>
          </StorySection>

          <ChoicesSection>
            <ChoicesTitle>
              <MessageSquare size={20} />
              What would you do?
            </ChoicesTitle>
            
            {scenario.choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                selected={selectedChoice?.id === choice.id}
                onClick={() => handleChoiceSelect(choice)}
                showResults={showResults}
                isGoodChoice={choice.goodChoice}
              >
                <ChoiceContent>
                  <ChoiceIcon color={choice.color}>
                    {choice.icon}
                  </ChoiceIcon>
                  <ChoiceText>{choice.text}</ChoiceText>
                  {selectedChoice?.id === choice.id && !showResults && (
                    <CheckCircle size={20} />
                  )}
                </ChoiceContent>
              </ChoiceButton>
            ))}
          </ChoicesSection>

          <ActionButtons>
            <ActionButton 
              variant="primary" 
              onClick={handleSubmitChoice}
              disabled={!selectedChoice}
            >
              Submit Choice
              <ArrowRight size={16} />
            </ActionButton>
          </ActionButtons>
        </>
      )}

      {/* Consequence Section */}
      {currentStep === 'consequence' && selectedChoice && (
        <>
          <ConsequenceSection>
            <ConsequenceTitle>
              {selectedChoice.goodChoice ? <ThumbsUp size={20} /> : <AlertTriangle size={20} />}
              What Happens Next...
            </ConsequenceTitle>
            
            <ConsequenceText>
              <strong>Immediately:</strong> {selectedChoice.consequence.immediate}
            </ConsequenceText>
            
            <ConsequenceText>
              <strong>Later on:</strong> {selectedChoice.consequence.longTerm}
            </ConsequenceText>
            
            <ConsequenceText>
              <strong>Impact on others:</strong> {selectedChoice.consequence.impact}
            </ConsequenceText>
            
            <LearningMoment>
              <strong>💡 Learning Moment:</strong> {selectedChoice.lesson}
            </LearningMoment>
          </ConsequenceSection>

          <ActionButtons>
            <ActionButton variant="primary" onClick={handleReflection}>
              <Lightbulb size={16} />
              Reflect & Learn
            </ActionButton>
            <ActionButton onClick={handleRestart}>
              <RotateCcw size={16} />
              Try Different Choice
            </ActionButton>
          </ActionButtons>
        </>
      )}

      {/* Reflection Section */}
      {currentStep === 'reflection' && (
        <>
          <ReflectionSection>
            <ConsequenceTitle>
              <Brain size={20} />
              Let's Think Deeper
            </ConsequenceTitle>
            
            {scenario.reflectionQuestions.map((question, index) => (
              <div key={question.id} style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '12px', fontWeight: '600' }}>
                  {index + 1}. {question.question}
                </div>
                
                {question.type === 'multiple-choice' && (
                  <div>
                    {question.options.map((option, optIndex) => (
                      <ReflectionButton
                        key={optIndex}
                        selected={reflectionAnswers[question.id] === optIndex}
                        onClick={() => setReflectionAnswers(prev => ({
                          ...prev,
                          [question.id]: optIndex
                        }))}
                      >
                        {option}
                      </ReflectionButton>
                    ))}
                  </div>
                )}
                
                {question.type === 'text' && (
                  <textarea
                    placeholder={question.placeholder}
                    value={reflectionAnswers[question.id] || ''}
                    onChange={(e) => setReflectionAnswers(prev => ({
                      ...prev,
                      [question.id]: e.target.value
                    }))}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      fontSize: '14px',
                      resize: 'vertical',
                      minHeight: '80px',
                      fontFamily: 'inherit',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.6)';
                      e.target.style.background = 'rgba(255,255,255,0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                      e.target.style.background = 'rgba(255,255,255,0.15)';
                    }}
                  />
                )}
              </div>
            ))}
          </ReflectionSection>

          {scenario.extensionActivity && (
            <ReflectionSection>
              <ConsequenceTitle>
                <Award size={20} />
                {scenario.extensionActivity.title}
              </ConsequenceTitle>
              
              <ConsequenceText>{scenario.extensionActivity.description}</ConsequenceText>
              
              {scenario.extensionActivity.prompts.map((prompt, index) => (
                <div key={index} style={{ 
                  marginBottom: '8px', 
                  paddingLeft: '16px', 
                  fontSize: '14px',
                  opacity: '0.9'
                }}>
                  • {prompt}
                </div>
              ))}
            </ReflectionSection>
          )}

          <ActionButtons>
            <ActionButton variant="primary" onClick={handleComplete}>
              <BookOpen size={16} />
              Complete Scenario
            </ActionButton>
            <ActionButton onClick={handleRestart}>
              <RotateCcw size={16} />
              Try Again
            </ActionButton>
          </ActionButtons>
        </>
      )}
    </ScenarioContainer>
  );
};

export default EthicsScenario;