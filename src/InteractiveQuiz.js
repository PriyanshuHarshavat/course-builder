import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import assessmentEngine from './AssessmentEngine';

const QuizContainer = styled.div`
  background: ${props => props.gradient || 'linear-gradient(135deg, #A8E6CF, #88D8C0)'};
  border-radius: 12px;
  padding: 30px;
  color: #2D3436;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  margin: 0 auto;
  position: relative;
`;

const QuizHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const QuizTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuizProgress = styled.div`
  font-size: 12px;
  background: rgba(255,255,255,0.3);
  padding: 4px 8px;
  border-radius: 12px;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${props => {
    if (props.showResults) {
      if (props.isCorrect) return 'rgba(76, 175, 80, 0.3)';
      if (props.isSelected && !props.isCorrect) return 'rgba(244, 67, 54, 0.3)';
      return 'rgba(255,255,255,0.2)';
    }
    return props.isSelected ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)';
  }};
  border: ${props => {
    if (props.showResults) {
      if (props.isCorrect) return '2px solid #4CAF50';
      if (props.isSelected && !props.isCorrect) return '2px solid #f44336';
      return '1px solid rgba(255,255,255,0.3)';
    }
    return props.isSelected ? '2px solid #2D3436' : '1px solid rgba(255,255,255,0.3)';
  }};
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  color: #2D3436;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
  
  &:hover {
    background: ${props => props.disabled ? undefined : 'rgba(255,255,255,0.4)'};
  }
`;

const OptionIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    if (props.showResults) {
      if (props.isCorrect) return '#4CAF50';
      if (props.isSelected && !props.isCorrect) return '#f44336';
      return '#ddd';
    }
    return props.isSelected ? '#2D3436' : '#ddd';
  }};
  color: white;
  font-weight: bold;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: #2D3436;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  margin-top: 16px;
  
  &:hover {
    background: ${props => props.disabled ? '#2D3436' : '#1a1a1a'};
  }
  
  &:disabled {
    opacity: 0.6;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: rgba(255,255,255,0.2);
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const FeedbackMessage = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #667eea;
  color: white;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  animation: bounceIn 0.6s ease-out;
  
  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: ${props => props.variant === 'primary' ? '#4CAF50' : 'rgba(255,255,255,0.3)'};
  color: ${props => props.variant === 'primary' ? 'white' : '#2D3436'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#45a049' : 'rgba(255,255,255,0.4)'};
  }
`;

const InteractiveQuiz = ({ element, studentId = 'demo-student', onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeStarted, setTimeStarted] = useState(null);

  useEffect(() => {
    setTimeStarted(new Date());
    // Initialize student in assessment engine
    assessmentEngine.initializeStudent(studentId, element.content.ageGroup || '10-11', element.content.yearLevel || 1);
  }, [studentId, element.content.ageGroup, element.content.yearLevel]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (showResults) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmit = () => {
    if (showResults) return;

    const timeCompleted = new Date();
    const timeSpent = Math.round((timeCompleted - timeStarted) / 1000); // seconds

    // Prepare quiz data for assessment
    const quizData = {
      id: element.content.template || 'custom-quiz',
      type: element.content.quizType || 'multiple-choice',
      questions: [
        {
          text: element.content.question,
          options: element.content.options,
          correctAnswer: element.content.correct,
          explanation: element.content.explanation,
          correctFeedback: "Excellent! You understood this concept perfectly! 🎉",
          incorrectFeedback: "Good try! Let's review this concept together. 🤔"
        }
      ],
      passingScore: 70,
      ageGroup: element.content.ageGroup || '10-11',
      difficulty: element.content.difficulty || 'beginner'
    };

    // Convert selectedAnswers to array format expected by assessment engine
    const studentAnswers = [selectedAnswers[0]];

    // Assess the quiz
    const assessmentResults = assessmentEngine.assessQuiz(studentId, quizData, studentAnswers);
    assessmentResults.timeSpent = timeSpent;

    setResults(assessmentResults);
    setShowResults(true);

    // Notify parent component if callback provided
    if (onComplete) {
      onComplete(assessmentResults);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setResults(null);
    setTimeStarted(new Date());
  };

  const isAnswerSelected = selectedAnswers[currentQuestion] !== undefined;
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <QuizContainer 
      gradient={element.content.gradient}
      width={element.content.width}
      height={element.content.height}
    >
      <QuizHeader>
        <QuizTitle>
          {element.content.icon || '❓'} Quiz Challenge
        </QuizTitle>
        <QuizProgress>
          Question 1 of 1
        </QuizProgress>
      </QuizHeader>

      <QuestionContainer>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.4' }}>
          {element.content.question}
        </h4>

        <OptionsContainer>
          {element.content.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === element.content.correct;
            
            return (
              <OptionButton
                key={index}
                isSelected={isSelected}
                isCorrect={isCorrect}
                showResults={showResults}
                disabled={showResults}
                onClick={() => handleAnswerSelect(0, index)}
              >
                <OptionIcon
                  isSelected={isSelected}
                  isCorrect={isCorrect}
                  showResults={showResults}
                >
                  {showResults ? (
                    isCorrect ? <CheckCircle size={12} /> : 
                    isSelected && !isCorrect ? <XCircle size={12} /> : 
                    String.fromCharCode(65 + index)
                  ) : (
                    isSelected ? '✓' : String.fromCharCode(65 + index)
                  )}
                </OptionIcon>
                {option}
              </OptionButton>
            );
          })}
        </OptionsContainer>

        {!showResults && (
          <SubmitButton
            onClick={handleSubmit}
            disabled={!isAnswerSelected}
          >
            Submit Answer
            <ArrowRight size={16} />
          </SubmitButton>
        )}
      </QuestionContainer>

      {showResults && results && (
        <ResultsContainer>
          <ScoreDisplay>
            {results.passed ? (
              <CheckCircle size={20} color="#4CAF50" />
            ) : (
              <XCircle size={20} color="#ff6b6b" />
            )}
            Score: {results.score}% {results.passed ? '(Passed!)' : '(Try Again!)'}
          </ScoreDisplay>

          {results.feedback.map((message, index) => (
            <FeedbackMessage key={index}>
              {message}
            </FeedbackMessage>
          ))}

          {element.content.explanation && (
            <div style={{ 
              marginTop: '12px',
              padding: '12px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '6px',
              fontSize: '13px'
            }}>
              <strong>💡 Explanation:</strong> {element.content.explanation}
            </div>
          )}

          {results.badgesEarned && results.badgesEarned.length > 0 && (
            <BadgeContainer>
              {results.badgesEarned.map((badge, index) => (
                <Badge key={index}>
                  <Award size={12} />
                  {badge.name}
                </Badge>
              ))}
            </BadgeContainer>
          )}

          <ActionButtons>
            <ActionButton onClick={handleRetry}>
              <RotateCcw size={12} />
              Try Again
            </ActionButton>
            {results.passed && (
              <ActionButton variant="primary">
                <ArrowRight size={12} />
                Continue Learning
              </ActionButton>
            )}
          </ActionButtons>
        </ResultsContainer>
      )}
    </QuizContainer>
  );
};

export default InteractiveQuiz;