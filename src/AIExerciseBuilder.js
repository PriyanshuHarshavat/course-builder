import React, { useState } from 'react';
import styled from 'styled-components';
import { Brain, Wand2, Zap, Target, Lightbulb, BookOpen, PenTool, Users } from 'lucide-react';

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

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.selected ? 'rgba(255, 255, 255, 0.5)' : 'transparent'};
  text-align: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  .icon {
    font-size: 32px;
    margin-bottom: 8px;
  }
  
  .title {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .description {
    font-size: 11px;
    opacity: 0.8;
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

const ExercisePreview = styled.div`
  background: white;
  color: #333;
  border-radius: 8px;
  padding: 20px;
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

// Exercise categories
const exerciseCategories = [
  {
    id: 'creative-writing',
    title: 'Creative Writing',
    icon: '✍️',
    description: 'Stories, poems, creative expressions'
  },
  {
    id: 'critical-thinking',
    title: 'Critical Thinking',
    icon: '🧠',
    description: 'Analysis, reasoning, problem-solving'
  },
  {
    id: 'discussion',
    title: 'Discussion',
    icon: '💬',
    description: 'Debate topics, conversation starters'
  },
  {
    id: 'reflection',
    title: 'Reflection',
    icon: '🤔',
    description: 'Self-assessment, journaling prompts'
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    icon: '👥',
    description: 'Group activities, team exercises'
  },
  {
    id: 'research',
    title: 'Research',
    icon: '🔍',
    description: 'Investigation, exploration activities'
  }
];

// Example prompts by category and age
const examplePrompts = {
  'creative-writing': {
    '8-9': [
      {
        title: "Animal Adventure",
        prompt: "Create a story about a magical animal that helps kids learn about friendship"
      },
      {
        title: "Superhero Day",
        prompt: "Write about a young superhero whose power is being extra kind to others"
      }
    ],
    '10-11': [
      {
        title: "Time Machine",
        prompt: "Imagine you have a time machine. Write about visiting a historical period and what you learn"
      },
      {
        title: "Future School",
        prompt: "Describe what school might look like 100 years from now"
      }
    ],
    '12-14': [
      {
        title: "Digital Ethics",
        prompt: "Write a short story exploring the challenges of AI and human relationships in the future"
      },
      {
        title: "Climate Solutions",
        prompt: "Create a narrative about teenagers who invent a solution to climate change"
      }
    ]
  },
  'critical-thinking': {
    '8-9': [
      {
        title: "Problem Solving",
        prompt: "How would you help two friends who are having an argument? Think of 3 different solutions"
      },
      {
        title: "Smart Choices",
        prompt: "What makes a choice 'good' or 'bad'? Give examples from your own life"
      }
    ],
    '10-11': [
      {
        title: "Technology Ethics",
        prompt: "Should kids your age have smartphones? List 3 reasons for and 3 reasons against"
      },
      {
        title: "Resource Allocation",
        prompt: "If you were in charge of your school's budget, how would you spend $10,000 to help students learn better?"
      }
    ],
    '12-14': [
      {
        title: "AI in Education",
        prompt: "Analyze the benefits and risks of AI tutors replacing human teachers. What would you recommend?"
      },
      {
        title: "Social Media Impact",
        prompt: "Evaluate how social media affects teenage mental health. Propose 3 solutions to address negative impacts"
      }
    ]
  },
  'discussion': {
    '8-9': [
      {
        title: "Favorite Things",
        prompt: "What's your favorite way to learn something new? Share with a partner and find 2 things you have in common"
      },
      {
        title: "Helping Others",
        prompt: "How can kids your age help make the world a better place? Discuss with your group"
      }
    ],
    '10-11': [
      {
        title: "Future Careers",
        prompt: "What jobs do you think will exist in the future that don't exist now? Discuss with your team"
      },
      {
        title: "Environmental Action",
        prompt: "What's one thing your school could do to be more environmentally friendly? Debate the best ideas"
      }
    ],
    '12-14': [
      {
        title: "Digital Citizenship",
        prompt: "How should schools handle cyberbullying? Discuss different approaches and their effectiveness"
      },
      {
        title: "AI and Jobs",
        prompt: "Will AI replace most human jobs? Debate both sides of this issue with evidence"
      }
    ]
  }
};

// AI exercise generation
const generateExercise = (prompt, category, ageGroup, difficulty, responseLength) => {
  const exercises = examplePrompts[category]?.[ageGroup] || examplePrompts['creative-writing']['10-11'];
  
  // If custom prompt, use it; otherwise pick a relevant example
  const exercisePrompt = prompt.trim() || exercises[Math.floor(Math.random() * exercises.length)].prompt;
  
  const difficultyInstructions = {
    'easy': 'Take your time and do your best. There are no wrong answers!',
    'medium': 'Think carefully about your response and provide specific examples.',
    'hard': 'Challenge yourself to think deeply and consider multiple perspectives.'
  };
  
  const lengthInstructions = {
    'short': 'Write 2-3 sentences.',
    'medium': 'Write 1-2 paragraphs (about 5-8 sentences).',
    'long': 'Write 3+ paragraphs with detailed explanations and examples.'
  };
  
  const categoryTitles = {
    'creative-writing': 'Creative Writing Exercise',
    'critical-thinking': 'Critical Thinking Challenge',
    'discussion': 'Discussion Activity',
    'reflection': 'Reflection Exercise',
    'collaboration': 'Collaboration Activity',
    'research': 'Research Investigation'
  };
  
  return {
    title: categoryTitles[category] || 'Learning Exercise',
    prompt: exercisePrompt,
    category,
    difficulty,
    expectedLength: responseLength,
    instructions: difficultyInstructions[difficulty],
    lengthGuidance: lengthInstructions[responseLength],
    ageGroup,
    hints: [
      'Take your time to think before you start',
      'Use specific examples to support your ideas',
      'Ask for help if you need clarification'
    ]
  };
};

const AIExerciseBuilder = ({ onGenerate, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('creative-writing');
  const [ageGroup, setAgeGroup] = useState('10-11');
  const [difficulty, setDifficulty] = useState('medium');
  const [responseLength, setResponseLength] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedExercise, setGeneratedExercise] = useState(null);

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt);
  };

  const generateAIExercise = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const exercise = generateExercise(prompt, selectedCategory, ageGroup, difficulty, responseLength);
      setGeneratedExercise(exercise);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    if (generatedExercise) {
      onGenerate(generatedExercise);
    }
  };

  const currentExamples = examplePrompts[selectedCategory]?.[ageGroup] || [];

  return (
    <BuilderContainer>
      <BuilderHeader>
        <h2>
          <Wand2 size={28} />
          AI Exercise Builder
        </h2>
        <p>Create engaging educational exercises that inspire thinking, creativity, and learning!</p>
      </BuilderHeader>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={18} />
          Choose Exercise Type:
        </h4>
        <CategoryGrid>
          {exerciseCategories.map((category) => (
            <CategoryCard
              key={category.id}
              selected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="icon">{category.icon}</div>
              <div className="title">{category.title}</div>
              <div className="description">{category.description}</div>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </div>

      <InputSection>
        <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Brain size={20} />
          Custom Exercise Prompt (Optional)
        </h3>
        <TextArea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the exercise you want to create, or leave blank to use our AI suggestions..."
        />
      </InputSection>

      {currentExamples.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lightbulb size={18} />
            Example {exerciseCategories.find(c => c.id === selectedCategory)?.title} Prompts:
          </h4>
          <ExamplePrompts>
            {currentExamples.map((example, index) => (
              <ExampleCard key={index} onClick={() => handleExampleClick(example.prompt)}>
                <div className="title">{example.title}</div>
                <div className="prompt">"{example.prompt}"</div>
              </ExampleCard>
            ))}
          </ExamplePrompts>
        </div>
      )}

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
          <h4 style={{ margin: '0 0 10px 0' }}>Difficulty</h4>
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </OptionGroup>

        <OptionGroup>
          <h4 style={{ margin: '0 0 10px 0' }}>Response Length</h4>
          <Select value={responseLength} onChange={(e) => setResponseLength(e.target.value)}>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </Select>
        </OptionGroup>
      </OptionsSection>

      <GenerateButton onClick={generateAIExercise} disabled={isGenerating}>
        {isGenerating ? (
          <>
            <LoadingSpinner />
            AI is creating your exercise...
          </>
        ) : (
          <>
            <Zap size={20} />
            Generate AI Exercise
          </>
        )}
      </GenerateButton>

      {generatedExercise && (
        <PreviewSection>
          <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} />
            Generated Exercise Preview
          </h3>
          
          <ExercisePreview>
            <h2 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '20px' }}>
              {generatedExercise.title}
            </h2>
            
            <div style={{ 
              background: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '15px',
              borderLeft: '4px solid #4CAF50'
            }}>
              <strong style={{ color: '#2c3e50' }}>Exercise Prompt:</strong>
              <p style={{ margin: '8px 0 0', lineHeight: '1.6', color: '#333' }}>
                {generatedExercise.prompt}
              </p>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#2c3e50' }}>Instructions:</strong>
              <p style={{ margin: '5px 0', color: '#666' }}>
                {generatedExercise.instructions} {generatedExercise.lengthGuidance}
              </p>
            </div>
            
            <div style={{ fontSize: '12px', color: '#666', display: 'flex', gap: '15px' }}>
              <span>📊 Difficulty: {generatedExercise.difficulty}</span>
              <span>👥 Age: {generatedExercise.ageGroup}</span>
              <span>📝 Length: {generatedExercise.expectedLength}</span>
            </div>
          </ExercisePreview>
          
          <GenerateButton onClick={handleGenerate}>
            <PenTool size={20} />
            Use This Exercise
          </GenerateButton>
        </PreviewSection>
      )}
    </BuilderContainer>
  );
};

export default AIExerciseBuilder;