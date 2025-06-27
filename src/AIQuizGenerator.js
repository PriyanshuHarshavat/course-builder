import React, { useState } from 'react';
import styled from 'styled-components';
import { Target, Wand2, Brain, Zap, CheckCircle, Lightbulb } from 'lucide-react';

const GeneratorContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 25px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  margin: 20px 0;
`;

const GeneratorHeader = styled.div`
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

const InputSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  
  &::placeholder {
    color: #999;
    font-style: italic;
  }
`;

const ExamplePrompts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const ExampleCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .title {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .prompt {
    font-size: 12px;
    opacity: 0.8;
    font-style: italic;
  }
`;

const OptionsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
`;

const OptionGroup = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #333;
`;

const PreviewSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const QuestionPreview = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
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
  margin-bottom: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// AI-powered quiz generation
const generateQuizFromPrompt = (prompt, ageGroup, questionCount, difficulty) => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Analyze the prompt to determine topic and focus
  let topic = 'general';
  let subject = 'General Knowledge';
  
  if (lowerPrompt.includes('python') || lowerPrompt.includes('programming') || lowerPrompt.includes('code')) {
    topic = 'python';
    subject = 'Python Programming';
  } else if (lowerPrompt.includes('math') || lowerPrompt.includes('addition') || lowerPrompt.includes('division')) {
    topic = 'math';
    subject = 'Mathematics';
  } else if (lowerPrompt.includes('ai') || lowerPrompt.includes('artificial intelligence') || lowerPrompt.includes('ethics')) {
    topic = 'ai';
    subject = 'AI & Ethics';
  } else if (lowerPrompt.includes('science') || lowerPrompt.includes('computer') || lowerPrompt.includes('technology')) {
    topic = 'science';
    subject = 'Computer Science';
  }
  
  // Generate questions based on analysis
  const questionTemplates = {
    python: {
      '8-9': [
        {
          question: "What does the print() command do in Python?",
          options: ["Makes loud sounds 🔊", "Shows text on the screen 📺", "Prints on paper 🖨️", "Makes the computer sleep 😴"],
          correct: 1,
          explanation: "print() displays text on the computer screen so we can see what our program is saying!"
        },
        {
          question: "Which symbol starts a comment in Python?",
          options: ["!", "#", "@", "$"],
          correct: 1,
          explanation: "Comments start with # and help us explain what our code does!"
        },
        {
          question: "What is a variable in Python?",
          options: ["A magic box that holds information 📦", "A type of animal", "A computer game", "A math problem"],
          correct: 0,
          explanation: "Variables are like magic boxes where we can store information like names, numbers, and more!"
        },
        {
          question: "How do we store text in Python?",
          options: ["With numbers", "Inside quotes like 'hello' 💬", "With special symbols", "We can't store text"],
          correct: 1,
          explanation: "Text goes inside quotes! Single quotes 'hello' or double quotes \"hello\" both work!"
        }
      ],
      '10-11': [
        {
          question: "What is the difference between a string and an integer in Python?",
          options: ["No difference", "Strings are text, integers are whole numbers", "Strings are bigger", "Integers use quotes"],
          correct: 1,
          explanation: "Strings are text (like 'hello') and integers are whole numbers (like 42)."
        },
        {
          question: "Which of these creates a list in Python?",
          options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "1, 2, 3"],
          correct: 1,
          explanation: "Square brackets [] create lists in Python, like [1, 2, 3] or ['apple', 'banana']."
        },
        {
          question: "What does a for loop do?",
          options: ["Creates variables", "Repeats code multiple times", "Deletes code", "Saves files"],
          correct: 1,
          explanation: "For loops repeat code multiple times, like counting from 1 to 10 automatically!"
        },
        {
          question: "How do you get user input in Python?",
          options: ["get()", "input()", "ask()", "read()"],
          correct: 1,
          explanation: "input() gets text from the user, like: name = input('What is your name?')"
        }
      ],
      '12-14': [
        {
          question: "What is the difference between a list and a tuple in Python?",
          options: ["No difference", "Lists are mutable, tuples are immutable", "Tuples are faster", "Lists use (), tuples use []"],
          correct: 1,
          explanation: "Lists can be changed (mutable) after creation, while tuples cannot be changed (immutable)."
        },
        {
          question: "What does the len() function return?",
          options: ["The memory usage", "The number of items in an object", "The type of object", "The last element"],
          correct: 1,
          explanation: "len() returns the number of items in lists, strings, dictionaries, etc."
        },
        {
          question: "What is a Python dictionary?",
          options: ["A book about Python", "A collection of key-value pairs", "A type of list", "A Python module"],
          correct: 1,
          explanation: "Dictionaries store data as key-value pairs, like {'name': 'Alice', 'age': 13}."
        },
        {
          question: "What does the range() function do?",
          options: ["Calculates distance", "Generates a sequence of numbers", "Finds the maximum value", "Sorts numbers"],
          correct: 1,
          explanation: "range() generates sequences of numbers, often used in loops like range(1, 10)."
        }
      ]
    },
    math: {
      '8-9': [
        {
          question: "What is 8 ÷ 2?",
          options: ["3", "4", "6", "5"],
          correct: 1,
          explanation: "8 ÷ 2 = 4. Think of it as sharing 8 items between 2 groups equally!"
        },
        {
          question: "Which is bigger: 7 or 9?",
          options: ["7", "9", "They're the same", "Can't tell"],
          correct: 1,
          explanation: "9 is bigger than 7. You can count: 7, 8, 9!"
        },
        {
          question: "What does 'division' mean?",
          options: ["Adding numbers", "Sharing equally 🤝", "Making bigger", "Counting backwards"],
          correct: 1,
          explanation: "Division means sharing things equally, like sharing 10 cookies among 5 friends!"
        }
      ],
      '10-11': [
        {
          question: "What is 144 ÷ 12?",
          options: ["11", "12", "13", "14"],
          correct: 1,
          explanation: "144 ÷ 12 = 12. You can think of this as 12 × 12 = 144."
        },
        {
          question: "If you have 72 stickers and want to share them equally among 8 friends, how many does each friend get?",
          options: ["8", "9", "10", "11"],
          correct: 1,
          explanation: "72 ÷ 8 = 9 stickers per friend."
        }
      ],
      '12-14': [
        {
          question: "What is 1,024 ÷ 32?",
          options: ["30", "31", "32", "33"],
          correct: 2,
          explanation: "1,024 ÷ 32 = 32. This is a power of 2 calculation!"
        }
      ]
    },
    ai: {
      '8-9': [
        {
          question: "What is AI (Artificial Intelligence)?",
          options: ["A robot friend 🤖", "Computer programs that can learn and think", "A video game", "A type of phone"],
          correct: 1,
          explanation: "AI is computer programs that can learn and make decisions, kind of like how humans think!"
        },
        {
          question: "Should you always believe everything an AI tells you?",
          options: ["Yes, always", "No, always check with grown-ups 👨‍👩‍👧‍👦", "Only on weekends", "Only if it's funny"],
          correct: 1,
          explanation: "Always check important information with adults! AI can make mistakes just like people."
        }
      ],
      '10-11': [
        {
          question: "Why is it important to be kind when talking to AI?",
          options: ["AIs have feelings", "It helps us practice good habits", "AIs get angry", "It makes them work faster"],
          correct: 1,
          explanation: "Being kind to AI helps us practice good communication habits that we use with people too!"
        },
        {
          question: "What should you do if an AI gives you homework answers?",
          options: ["Copy them directly", "Use them to understand and learn 📚", "Share them with everyone", "Ignore them completely"],
          correct: 1,
          explanation: "Use AI as a learning tool to understand concepts, not to copy answers!"
        }
      ],
      '12-14': [
        {
          question: "What is algorithmic bias?",
          options: ["When AI is too slow", "When AI systems favor certain groups unfairly", "When AI uses too much memory", "When AI prefers certain algorithms"],
          correct: 1,
          explanation: "Algorithmic bias occurs when AI systems treat different groups of people unfairly due to biased training data or design."
        },
        {
          question: "Why is diverse data important in AI training?",
          options: ["It makes AI faster", "It helps AI work fairly for everyone", "It uses less memory", "It costs less money"],
          correct: 1,
          explanation: "Diverse data helps ensure AI systems work fairly and accurately for people from all backgrounds."
        }
      ]
    },
    science: {
      '8-9': [
        {
          question: "What makes computers work?",
          options: ["Magic ✨", "Electricity and tiny switches ⚡", "Water", "Air"],
          correct: 1,
          explanation: "Computers use electricity flowing through millions of tiny switches to process information super fast!"
        }
      ],
      '10-11': [
        {
          question: "What is the internet?",
          options: ["A big computer", "A network of connected computers 🌐", "A type of software", "A video game"],
          correct: 1,
          explanation: "The internet connects millions of computers around the world so they can share information!"
        }
      ],
      '12-14': [
        {
          question: "What is machine learning?",
          options: ["Teaching machines to walk", "AI that improves from experience", "Building robots", "Programming computers"],
          correct: 1,
          explanation: "Machine learning is a type of AI that gets better at tasks by learning from data and experience."
        }
      ]
    }
  };
  
  // Get appropriate questions for the topic and age group
  const availableQuestions = questionTemplates[topic]?.[ageGroup] || questionTemplates['python'][ageGroup] || questionTemplates['python']['10-11'];
  
  // Select questions based on count
  const selectedQuestions = [];
  const questionPool = [...availableQuestions];
  
  for (let i = 0; i < Math.min(questionCount, questionPool.length); i++) {
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    selectedQuestions.push(questionPool.splice(randomIndex, 1)[0]);
  }
  
  // If we need more questions, generate variations
  while (selectedQuestions.length < questionCount) {
    const baseQuestion = availableQuestions[selectedQuestions.length % availableQuestions.length];
    selectedQuestions.push({
      ...baseQuestion,
      question: `${baseQuestion.question} (Bonus)`
    });
  }
  
  // Function to determine appropriate question type based on content
  const determineQuestionType = (question, options) => {
    const questionLower = question.toLowerCase();
    
    // True/False questions
    if (options.length === 2 && 
        (options.some(opt => opt.toLowerCase().includes('true')) ||
         options.some(opt => opt.toLowerCase().includes('false')) ||
         options.some(opt => opt.toLowerCase().includes('yes')) ||
         options.some(opt => opt.toLowerCase().includes('no')) ||
         questionLower.includes('true or false') ||
         questionLower.includes('correct') && questionLower.includes('incorrect'))) {
      return 'true-false';
    }
    
    // Fill in the blanks (if question has "complete the" or similar)
    if (questionLower.includes('complete the') ||
        questionLower.includes('fill in') ||
        questionLower.includes('what word') ||
        questionLower.includes('missing word')) {
      return 'fill-blanks';
    }
    
    // Text input (for open-ended questions)
    if (questionLower.includes('explain') ||
        questionLower.includes('describe') ||
        questionLower.includes('what do you think') ||
        questionLower.includes('in your own words') ||
        options.length === 1) {
      return 'text-input';
    }
    
    // Multiple select (if question asks for multiple correct answers)
    if (questionLower.includes('select all') ||
        questionLower.includes('choose all') ||
        questionLower.includes('which of the following are') ||
        questionLower.includes('multiple correct')) {
      return 'multiple-select';
    }
    
    // Default to multiple choice
    return 'multiple-choice';
  };

  // Function to create appropriate question structure based on type
  const createQuestionData = (q, index, questionType) => {
    const baseQuestion = {
      id: `q_${index + 1}`,
      question: q.question,
      type: questionType,
      explanation: q.explanation,
      hint: "Think about what you've learned!"
    };

    switch (questionType) {
      case 'true-false':
        return {
          ...baseQuestion,
          correct: q.options[q.correct]?.toLowerCase().includes('true') || 
                  q.options[q.correct]?.toLowerCase().includes('yes')
        };
        
      case 'fill-blanks':
        // Convert question to have blanks and provide answers
        const blanksQuestion = q.question.replace(/\b(answer|word|term)\b/gi, '_____');
        return {
          ...baseQuestion,
          question: blanksQuestion,
          blanks: [q.options[q.correct]]
        };
        
      case 'text-input':
        return {
          ...baseQuestion,
          correctAnswers: Array.isArray(q.options) ? q.options : [q.options[q.correct]]
        };
        
      case 'multiple-select':
        // For demo purposes, make 2-3 options correct
        const correctCount = Math.min(2, q.options.length - 1);
        const correctAnswers = Array.from({length: correctCount}, (_, i) => i);
        return {
          ...baseQuestion,
          options: q.options,
          correctAnswers
        };
        
      default: // multiple-choice
        return {
          ...baseQuestion,
          options: q.options,
          correct: q.correct
        };
    }
  };

  return {
    title: `${subject} Quiz`,
    questions: selectedQuestions.map((q, index) => {
      const questionType = determineQuestionType(q.question, q.options);
      return createQuestionData(q, index, questionType);
    })
  };
};

const examplePrompts = [
  {
    title: "Python Basics",
    prompt: "Create a quiz about Python programming basics for kids who are just starting to code"
  },
  {
    title: "Math Division",
    prompt: "Make a quiz about division problems for elementary students"
  },
  {
    title: "AI Ethics",
    prompt: "Build a quiz about AI safety and ethics for middle school students"
  },
  {
    title: "Computer Science",
    prompt: "Create questions about how computers work for curious kids"
  },
  {
    title: "Programming Concepts",
    prompt: "Make a quiz about variables, loops, and functions for teenage programmers"
  },
  {
    title: "Digital Citizenship",
    prompt: "Create a quiz about being safe and kind online for young students"
  }
];

const AIQuizGenerator = ({ onGenerate, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [ageGroup, setAgeGroup] = useState('10-11');
  const [questionCount, setQuestionCount] = useState('5');
  const [difficulty, setDifficulty] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt);
  };

  const generateQuiz = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const quiz = generateQuizFromPrompt(prompt, ageGroup, parseInt(questionCount), difficulty);
      setGeneratedQuiz(quiz);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    if (generatedQuiz) {
      onGenerate(generatedQuiz);
    }
  };

  return (
    <GeneratorContainer>
      <GeneratorHeader>
        <h2>
          <Wand2 size={28} />
          AI Quiz Generator
        </h2>
        <p>Describe your quiz topic in plain English, and AI will create perfect questions!</p>
      </GeneratorHeader>

      <InputSection>
        <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Brain size={20} />
          Describe Your Quiz
        </h3>
        <TextArea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Create a quiz about Python programming basics for kids who are just starting to code"
        />
      </InputSection>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lightbulb size={18} />
          Try These Examples:
        </h4>
        <ExamplePrompts>
          {examplePrompts.map((example, index) => (
            <ExampleCard key={index} onClick={() => handleExampleClick(example.prompt)}>
              <div className="title">{example.title}</div>
              <div className="prompt">"{example.prompt}"</div>
            </ExampleCard>
          ))}
        </ExamplePrompts>
      </div>

      <OptionsSection>
        <OptionGroup>
          <h4 style={{ margin: '0 0 10px 0' }}>Age Group</h4>
          <Select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
            <option value="8-9">8-9 Years</option>
            <option value="10-11">10-11 Years</option>
            <option value="12-14">12-14 Years</option>
          </Select>
        </OptionGroup>

        <OptionGroup>
          <h4 style={{ margin: '0 0 10px 0' }}>Questions</h4>
          <Select value={questionCount} onChange={(e) => setQuestionCount(e.target.value)}>
            <option value="3">3 Questions</option>
            <option value="5">5 Questions</option>
            <option value="7">7 Questions</option>
            <option value="10">10 Questions</option>
          </Select>
        </OptionGroup>

        <OptionGroup>
          <h4 style={{ margin: '0 0 10px 0' }}>Difficulty</h4>
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </OptionGroup>
      </OptionsSection>

      <GenerateButton onClick={generateQuiz} disabled={!prompt.trim() || isGenerating}>
        {isGenerating ? (
          <>
            <LoadingSpinner />
            AI is creating your quiz...
          </>
        ) : (
          <>
            <Zap size={20} />
            Generate Quiz
          </>
        )}
      </GenerateButton>

      {generatedQuiz && (
        <PreviewSection>
          <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} />
            Generated Quiz Preview
          </h3>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ fontSize: '18px' }}>{generatedQuiz.title}</strong>
            <p style={{ margin: '5px 0', opacity: 0.9 }}>{generatedQuiz.questions.length} questions generated</p>
          </div>
          
          {generatedQuiz.questions.slice(0, 2).map((question, index) => (
            <QuestionPreview key={index}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Q{index + 1}: {question.question}
              </div>
              <div style={{ fontSize: '14px' }}>
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} style={{ 
                    margin: '5px 0', 
                    opacity: question.correct === optIndex ? 1 : 0.7,
                    fontWeight: question.correct === optIndex ? 'bold' : 'normal'
                  }}>
                    {question.correct === optIndex ? '✅' : '○'} {option}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8 }}>
                💡 {question.explanation}
              </div>
            </QuestionPreview>
          ))}
          
          {generatedQuiz.questions.length > 2 && (
            <div style={{ textAlign: 'center', opacity: 0.7, fontSize: '14px', margin: '10px 0' }}>
              ... and {generatedQuiz.questions.length - 2} more questions
            </div>
          )}
          
          <GenerateButton onClick={handleGenerate}>
            <CheckCircle size={20} />
            Use This Quiz
          </GenerateButton>
        </PreviewSection>
      )}
    </GeneratorContainer>
  );
};

export default AIQuizGenerator;