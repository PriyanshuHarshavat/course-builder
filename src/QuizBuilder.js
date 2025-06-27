import React, { useState } from 'react';
import styled from 'styled-components';
import { Target, Plus, Trash2, CheckCircle, Brain, Zap } from 'lucide-react';

const BuilderContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 25px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  margin: 20px 0;
`;

const BuilderHeader = styled.div`
  text-align: center;
  margin-bottom: 25px;
  
  h2 {
    margin: 0 0 10px 0;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
    font-size: 16px;
  }
`;

const QuizOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;
`;

const OptionGroup = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
`;

const OptionTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 10px;
`;

const QuestionsList = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const QuestionItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  background: #f44336;
  border: none;
  color: white;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const AddButton = styled.button`
  background: #4CAF50;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const OptionsList = styled.div`
  margin-top: 10px;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const CorrectIndicator = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.correct ? '#4CAF50' : 'rgba(255,255,255,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid ${props => props.correct ? '#4CAF50' : 'rgba(255,255,255,0.3)'};
`;

const GenerateButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  color: white;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
`;

// Quiz templates by age group and topic
const quizTemplates = {
  'python-basics': {
    '8-9': [
      {
        question: 'What does the print() command do?',
        options: ['Makes noise 🔊', 'Shows text on screen 📺', 'Prints on paper 🖨️', 'Saves a file 💾'],
        correct: 1,
        explanation: 'print() shows text on the computer screen!'
      },
      {
        question: 'Which symbol starts a comment in Python?',
        options: ['!', '#', '@', '$'],
        correct: 1,
        explanation: 'Comments start with # and help explain your code'
      }
    ],
    '10-11': [
      {
        question: 'What is a variable in Python?',
        options: ['A number that changes', 'A container for storing data', 'A type of loop', 'A function'],
        correct: 1,
        explanation: 'Variables are like containers that hold information'
      },
      {
        question: 'Which of these is the correct way to create a variable?',
        options: ['variable name = value', 'name = value', 'name := value', 'variable = name value'],
        correct: 1,
        explanation: 'Variables are created with: name = value'
      }
    ],
    '12-14': [
      {
        question: 'What is the difference between a list and a tuple in Python?',
        options: ['No difference', 'Lists are mutable, tuples are immutable', 'Tuples are faster', 'Lists use (), tuples use []'],
        correct: 1,
        explanation: 'Lists can be changed (mutable), tuples cannot (immutable)'
      },
      {
        question: 'What does the len() function return?',
        options: ['The type of object', 'The number of items in an object', 'The memory usage', 'The last element'],
        correct: 1,
        explanation: 'len() returns the number of items in lists, strings, etc.'
      }
    ]
  },
  'ai-ethics': {
    '8-9': [
      {
        question: 'What should you do if an AI gives you wrong information?',
        options: ['Always believe it', 'Check with a grown-up or teacher', 'Share it with friends', 'Ignore it'],
        correct: 1,
        explanation: 'Always check important information with adults!'
      }
    ],
    '10-11': [
      {
        question: 'Why is it important to be kind when talking to AI?',
        options: ['AIs have feelings', 'It helps us practice good habits', 'AIs will be mean back', 'It makes them work better'],
        correct: 1,
        explanation: 'Being kind to AI helps us practice good communication habits'
      }
    ],
    '12-14': [
      {
        question: 'What is algorithmic bias?',
        options: ['When AI prefers certain algorithms', 'When AI systems favor certain groups unfairly', 'When AI is too slow', 'When AI uses too much memory'],
        correct: 1,
        explanation: 'Algorithmic bias happens when AI systems treat different groups unfairly'
      }
    ]
  },
  'general-knowledge': {
    '8-9': [
      {
        question: 'What makes computers so fast?',
        options: ['Magic ✨', 'Electricity and tiny switches', 'They drink coffee ☕', 'They have wheels'],
        correct: 1,
        explanation: 'Computers use electricity and millions of tiny switches to work super fast!'
      }
    ],
    '10-11': [
      {
        question: 'What is the internet?',
        options: ['A fishing net', 'A web of connected computers', 'A type of software', 'A computer game'],
        correct: 1,
        explanation: 'The internet connects computers all around the world!'
      }
    ],
    '12-14': [
      {
        question: 'What is machine learning?',
        options: ['Teaching machines to walk', 'AI that improves from experience', 'Programming robots', 'Building computers'],
        correct: 1,
        explanation: 'Machine learning is AI that gets better by learning from data'
      }
    ]
  }
};

const QuizBuilder = ({ onGenerate, ageGroup = '10-11' }) => {
  const [quizTopic, setQuizTopic] = useState('python-basics');
  const [quizTitle, setQuizTitle] = useState('');
  const [customQuestions, setCustomQuestions] = useState([]);
  const [useTemplate, setUseTemplate] = useState(true);

  const addCustomQuestion = () => {
    setCustomQuestions([...customQuestions, {
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      explanation: ''
    }]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...customQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setCustomQuestions(updated);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updated = [...customQuestions];
    updated[questionIndex].options[optionIndex] = value;
    setCustomQuestions(updated);
  };

  const deleteQuestion = (index) => {
    setCustomQuestions(customQuestions.filter((_, i) => i !== index));
  };

  const generateQuiz = () => {
    let questions = [];
    
    if (useTemplate && quizTemplates[quizTopic] && quizTemplates[quizTopic][ageGroup]) {
      questions = [...quizTemplates[quizTopic][ageGroup]];
    }
    
    questions = [...questions, ...customQuestions.filter(q => q.question.trim())];
    
    const quizConfig = {
      title: quizTitle || `${quizTopic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Quiz`,
      questions: questions.map((q, index) => ({
        id: `q_${index + 1}`,
        question: q.question,
        type: 'multiple-choice',
        options: q.options,
        correct: q.correct,
        explanation: q.explanation,
        hint: `Think about what you learned in the lesson!`
      }))
    };
    
    onGenerate(quizConfig);
  };

  return (
    <BuilderContainer>
      <BuilderHeader>
        <h2>
          <Target size={28} />
          Smart Quiz Builder
        </h2>
        <p>Create age-appropriate quizzes automatically</p>
      </BuilderHeader>

      <QuizOptions>
        <OptionGroup>
          <OptionTitle>
            <Brain size={16} />
            Quiz Settings
          </OptionTitle>
          <Input
            placeholder="Quiz Title (optional)"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
          <Select value={quizTopic} onChange={(e) => setQuizTopic(e.target.value)}>
            <option value="python-basics">Python Basics</option>
            <option value="ai-ethics">AI Ethics</option>
            <option value="general-knowledge">Tech Knowledge</option>
          </Select>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={useTemplate}
              onChange={(e) => setUseTemplate(e.target.checked)}
            />
            Include template questions
          </label>
        </OptionGroup>

        <OptionGroup>
          <OptionTitle>
            <CheckCircle size={16} />
            Preview Questions
          </OptionTitle>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            {useTemplate && quizTemplates[quizTopic] && quizTemplates[quizTopic][ageGroup] ? (
              <div>
                <strong>{quizTemplates[quizTopic][ageGroup].length}</strong> template questions + 
                <strong> {customQuestions.length}</strong> custom questions
                <br />
                <span style={{ fontSize: '12px' }}>
                  Template: "{quizTemplates[quizTopic][ageGroup][0]?.question.substring(0, 40)}..."
                </span>
              </div>
            ) : (
              <div><strong>{customQuestions.length}</strong> custom questions</div>
            )}
          </div>
        </OptionGroup>
      </QuizOptions>

      <QuestionsList>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ margin: 0 }}>Custom Questions</h3>
          <AddButton onClick={addCustomQuestion}>
            <Plus size={16} />
            Add Question
          </AddButton>
        </div>

        {customQuestions.map((question, qIndex) => (
          <QuestionItem key={qIndex}>
            <QuestionHeader>
              <h4 style={{ margin: 0 }}>Question {qIndex + 1}</h4>
              <DeleteButton onClick={() => deleteQuestion(qIndex)}>
                <Trash2 size={14} />
              </DeleteButton>
            </QuestionHeader>
            
            <Input
              placeholder="Enter your question..."
              value={question.question}
              onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
            />
            
            <OptionsList>
              {question.options.map((option, oIndex) => (
                <OptionItem key={oIndex}>
                  <CorrectIndicator
                    correct={question.correct === oIndex}
                    onClick={() => updateQuestion(qIndex, 'correct', oIndex)}
                  >
                    {question.correct === oIndex && <CheckCircle size={12} />}
                  </CorrectIndicator>
                  <Input
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    style={{ margin: 0, flex: 1 }}
                  />
                </OptionItem>
              ))}
            </OptionsList>
            
            <Input
              placeholder="Explanation for the correct answer..."
              value={question.explanation}
              onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
              style={{ marginTop: '10px' }}
            />
          </QuestionItem>
        ))}

        {customQuestions.length === 0 && (
          <div style={{ textAlign: 'center', opacity: 0.7, padding: '20px' }}>
            No custom questions yet. Click "Add Question" to create your own!
          </div>
        )}
      </QuestionsList>

      <GenerateButton onClick={generateQuiz}>
        <Zap size={20} />
        Generate Quiz
      </GenerateButton>
    </BuilderContainer>
  );
};

export default QuizBuilder;