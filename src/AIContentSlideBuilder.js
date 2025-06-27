import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Wand2, Brain, Zap, Image, Video, FileText, Lightbulb } from 'lucide-react';

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

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const LayoutCard = styled.div`
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
  
  .preview {
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .name {
    font-size: 12px;
    font-weight: bold;
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
  grid-template-columns: 1fr 1fr;
  gap: 20px;
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

const SlidePreview = styled.div`
  background: white;
  color: #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  min-height: 200px;
  display: ${props => {
    if (props.layout === 'image-top' || props.layout === 'image-bottom') return 'flex';
    if (props.layout === 'image-background') return 'relative';
    return 'grid';
  }};
  flex-direction: ${props => props.layout === 'image-top' ? 'column' : 'column-reverse'};
  grid-template-columns: ${props => {
    if (props.layout === 'image-left') return '40% 60%';
    if (props.layout === 'image-right') return '60% 40%';
    return '1fr';
  }};
  gap: 20px;
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

// Layout options
const layoutOptions = [
  {
    id: 'image-left',
    name: 'Image Left',
    preview: () => (
      <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '5px', height: '100%' }}>
        <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image size={16} />
        </div>
        <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FileText size={12} />
        </div>
      </div>
    )
  },
  {
    id: 'image-right',
    name: 'Image Right',
    preview: () => (
      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', gap: '5px', height: '100%' }}>
        <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FileText size={12} />
        </div>
        <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image size={16} />
        </div>
      </div>
    )
  },
  {
    id: 'image-top',
    name: 'Image Top',
    preview: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', height: '100%' }}>
        <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image size={16} />
        </div>
        <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <FileText size={12} />
        </div>
      </div>
    )
  },
  {
    id: 'image-bottom',
    name: 'Image Bottom',
    preview: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', height: '100%' }}>
        <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <FileText size={12} />
        </div>
        <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image size={16} />
        </div>
      </div>
    )
  },
  {
    id: 'image-background',
    name: 'Background',
    preview: () => (
      <div style={{ position: 'relative', height: '100%', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}>
        <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
          <Image size={12} />
        </div>
        <div style={{ position: 'absolute', bottom: '5px', left: '5px' }}>
          <FileText size={10} />
        </div>
      </div>
    )
  }
];

// AI content generation
const generateContentSlide = (prompt, layout, mediaType, ageGroup) => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Analyze prompt for topic and content type
  let topic = 'general';
  let title = 'Learning Slide';
  let content = 'Educational content goes here...';
  
  if (lowerPrompt.includes('python') || lowerPrompt.includes('programming') || lowerPrompt.includes('code')) {
    topic = 'python';
    title = 'Python Programming Concepts';
    content = generatePythonContent(prompt, ageGroup);
  } else if (lowerPrompt.includes('math') || lowerPrompt.includes('division') || lowerPrompt.includes('addition')) {
    topic = 'math';
    title = 'Math Learning';
    content = generateMathContent(prompt, ageGroup);
  } else if (lowerPrompt.includes('ai') || lowerPrompt.includes('artificial intelligence')) {
    topic = 'ai';
    title = 'Understanding AI';
    content = generateAIContent(prompt, ageGroup);
  } else if (lowerPrompt.includes('science') || lowerPrompt.includes('computer')) {
    topic = 'science';
    title = 'Computer Science Concepts';
    content = generateScienceContent(prompt, ageGroup);
  } else {
    // Extract title from prompt
    const words = prompt.split(' ');
    if (words.length > 0) {
      title = words.slice(0, 4).join(' ').replace(/[^\w\s]/gi, '');
    }
    content = generateGeneralContent(prompt, ageGroup);
  }
  
  // Generate appropriate media suggestion
  let imageUrl = '';
  let imageCaption = '';
  let videoUrl = '';
  let videoTitle = '';
  
  if (mediaType === 'image') {
    imageCaption = `Illustration for ${title}`;
  } else if (mediaType === 'video') {
    videoTitle = `Video: ${title}`;
  }
  
  return {
    title,
    content,
    layout,
    mediaType,
    imageUrl,
    imageCaption,
    videoUrl,
    videoTitle,
    backgroundColor: '#ffffff',
    theme: 'default'
  };
};

const generatePythonContent = (prompt, ageGroup) => {
  const ageContent = {
    '8-9': `🐍 **What is Python?**

Python is a programming language that's easy to learn! It's called Python because it was named after a funny TV show, not the snake.

**Key Points:**
• Python uses simple words like "print" and "if"
• We can make the computer say things
• We can do math and solve problems
• It's like giving the computer instructions

**Why Learn Python?**
Python helps us create games, websites, and even teach robots what to do!`,
    
    '10-11': `🐍 **Python Programming Basics**

Python is one of the most popular programming languages in the world because it's powerful yet easy to understand.

**What Makes Python Special:**
• **Simple Syntax:** Reads almost like English
• **Versatile:** Can build websites, games, AI, and more
• **Beginner-Friendly:** Great first programming language
• **Community:** Millions of programmers help each other

**Getting Started:**
1. Variables store information
2. Functions perform actions
3. Loops repeat code
4. Conditions make decisions

Python is used by companies like Google, Instagram, and NASA!`,
    
    '12-14': `🐍 **Advanced Python Concepts**

Python's philosophy emphasizes code readability and simplicity, making it an excellent choice for beginners and professionals alike.

**Core Programming Concepts:**
• **Object-Oriented Programming:** Classes and inheritance
• **Data Structures:** Lists, dictionaries, sets, tuples
• **Control Flow:** Loops, conditionals, exception handling
• **Modules and Libraries:** Extending Python's capabilities

**Real-World Applications:**
• **Web Development:** Django, Flask frameworks
• **Data Science:** NumPy, Pandas, Matplotlib
• **Artificial Intelligence:** TensorFlow, PyTorch
• **Automation:** Scripting and system administration

**Industry Impact:**
Python powers major platforms like YouTube, Dropbox, and Reddit. Its versatility makes it valuable across industries from finance to healthcare.`
  };
  
  return ageContent[ageGroup] || ageContent['10-11'];
};

const generateMathContent = (prompt, ageGroup) => {
  const ageContent = {
    '8-9': `🔢 **Math is Fun!**

Math helps us solve problems and understand the world around us!

**Division Basics:**
• Division means sharing equally
• 8 ÷ 2 = 4 (sharing 8 things between 2 groups)
• Think of it like sharing cookies with friends!

**Why Learn Division:**
• Helps with everyday problems
• Sharing toys or treats fairly
• Understanding time and money
• Building problem-solving skills

**Practice Tips:**
Start with small numbers and work your way up!`,
    
    '10-11': `🔢 **Mathematical Problem Solving**

Mathematics develops logical thinking and problem-solving skills essential for daily life and future learning.

**Division Concepts:**
• **Understanding:** Division is the inverse of multiplication
• **Applications:** Calculating averages, rates, and proportions
• **Strategies:** Long division, mental math tricks
• **Real-World Use:** Splitting bills, calculating time, measuring

**Problem-Solving Approach:**
1. Read the problem carefully
2. Identify what you know and what you need to find
3. Choose the right operation
4. Check your answer makes sense

Mathematics builds confidence and prepares you for advanced subjects like algebra and geometry.`,
    
    '12-14': `🔢 **Advanced Mathematical Reasoning**

Mathematics is the foundation of scientific thinking and technological advancement.

**Division in Context:**
• **Algebraic Thinking:** Variables and equations
• **Rational Numbers:** Fractions, decimals, percentages
• **Statistical Analysis:** Mean, median, mode calculations
• **Proportional Reasoning:** Ratios and scaling

**Mathematical Modeling:**
• Representing real-world situations with equations
• Analyzing data trends and patterns
• Making predictions based on mathematical relationships
• Understanding exponential growth and decay

**Career Connections:**
Mathematics is essential in engineering, computer science, economics, medicine, and many other fields.`
  };
  
  return ageContent[ageGroup] || ageContent['10-11'];
};

const generateAIContent = (prompt, ageGroup) => {
  const ageContent = {
    '8-9': `🤖 **What is AI?**

AI stands for Artificial Intelligence. It's like making computers smart!

**How AI Helps Us:**
• Voice assistants understand what we say
• Games can play against us
• Apps can recognize pictures
• Computers can translate languages

**AI Safety for Kids:**
• Always ask grown-ups before using new AI tools
• Remember that AI can make mistakes
• Be kind when talking to AI
• Never share personal information

**Fun Facts:**
AI can help doctors, teach robots to dance, and even help protect animals!`,
    
    '10-11': `🤖 **Understanding Artificial Intelligence**

AI is technology that enables computers to perform tasks that typically require human intelligence.

**Types of AI:**
• **Voice Recognition:** Siri, Alexa, Google Assistant
• **Image Recognition:** Photo tagging, medical imaging
• **Game AI:** Chess computers, video game opponents
• **Recommendation Systems:** Netflix, YouTube suggestions

**Responsible AI Use:**
• Verify information from multiple sources
• Understand AI limitations and biases
• Respect privacy and data protection
• Use AI as a learning tool, not a replacement for thinking

**Future Possibilities:**
AI could help solve climate change, cure diseases, and explore space!`,
    
    '12-14': `🤖 **Artificial Intelligence and Society**

AI represents one of the most significant technological advances of our time, with profound implications for society.

**AI Technologies:**
• **Machine Learning:** Algorithms that improve with experience
• **Neural Networks:** Brain-inspired computing models
• **Natural Language Processing:** Understanding human language
• **Computer Vision:** Interpreting visual information

**Ethical Considerations:**
• **Bias and Fairness:** Ensuring AI treats everyone equally
• **Privacy:** Protecting personal data and surveillance concerns
• **Employment:** Balancing automation with human work
• **Transparency:** Understanding how AI makes decisions

**Preparing for an AI Future:**
Develop critical thinking skills, understand technology's impact on society, and consider how to use AI responsibly to benefit humanity.`
  };
  
  return ageContent[ageGroup] || ageContent['10-11'];
};

const generateScienceContent = (prompt, ageGroup) => {
  const ageContent = {
    '8-9': `💻 **How Computers Work**

Computers are amazing machines that help us every day!

**Computer Basics:**
• Computers use electricity to work
• They have tiny switches called transistors
• Everything is stored as numbers (1s and 0s)
• Programs tell computers what to do

**Parts of a Computer:**
• Screen shows us information
• Keyboard lets us type
• Mouse helps us click
• Memory stores our files

**Cool Facts:**
The first computer was as big as a room! Now we have computers in our phones!`,
    
    '10-11': `💻 **Computer Science Fundamentals**

Computer science combines mathematics, engineering, and problem-solving to create amazing technologies.

**How Computers Process Information:**
• **Binary System:** Everything stored as 1s and 0s
• **Algorithms:** Step-by-step instructions for solving problems
• **Data Structures:** Ways to organize and store information
• **Networks:** Connecting computers worldwide

**Programming Concepts:**
• Variables store information
• Functions perform specific tasks
• Loops repeat actions
• Conditions make decisions

**Real-World Applications:**
Computers help scientists study space, doctors save lives, and artists create digital masterpieces!`,
    
    '12-14': `💻 **Advanced Computer Science Concepts**

Computer science is a rapidly evolving field that shapes our digital world and future innovations.

**Core Areas of Study:**
• **Algorithms and Data Structures:** Efficient problem-solving methods
• **Software Engineering:** Building robust, scalable applications
• **Computer Systems:** Hardware-software interaction and optimization
• **Human-Computer Interaction:** Designing intuitive user experiences

**Emerging Technologies:**
• **Quantum Computing:** Leveraging quantum mechanics for computation
• **Cybersecurity:** Protecting digital assets and privacy
• **Cloud Computing:** Distributed systems and scalable infrastructure
• **Internet of Things:** Connecting everyday objects to networks

**Career Pathways:**
Computer science opens doors to careers in technology, research, entrepreneurship, and virtually every industry in the modern economy.`
  };
  
  return ageContent[ageGroup] || ageContent['10-11'];
};

const generateGeneralContent = (prompt, ageGroup) => {
  // Extract key concepts from the prompt
  const words = prompt.toLowerCase().split(' ');
  const keyTerms = words.filter(word => word.length > 3);
  
  const ageTemplates = {
    '8-9': `📚 **Learning About ${keyTerms[0] || 'New Topics'}**

Learning new things is exciting and fun!

**What We'll Discover:**
• Important facts and ideas
• How things work in our world
• Cool examples and stories
• Ways to use what we learn

**Remember:**
• Ask questions when you're curious
• Practice makes perfect
• Everyone learns at their own pace
• Mistakes help us grow!

Let's explore and have fun learning together!`,
    
    '10-11': `📚 **Exploring ${keyTerms[0] || 'Key Concepts'}**

Understanding new concepts helps us make sense of the world around us.

**Key Learning Points:**
• Building on what you already know
• Connecting ideas to real-life situations
• Developing critical thinking skills
• Preparing for more advanced topics

**Study Strategies:**
• Take notes and ask questions
• Practice with examples
• Discuss with classmates and teachers
• Apply learning to solve problems

Knowledge builds upon itself - each new concept makes the next one easier to understand!`,
    
    '12-14': `📚 **Understanding ${keyTerms[0] || 'Complex Topics'}**

Deep learning requires critical analysis and the ability to synthesize information from multiple sources.

**Analytical Approach:**
• Examine evidence and draw conclusions
• Consider multiple perspectives
• Identify patterns and relationships
• Evaluate the reliability of sources

**Application and Synthesis:**
• Connect new knowledge to existing understanding
• Apply concepts to novel situations
• Create original solutions to problems
• Communicate ideas clearly and persuasively

**Lifelong Learning:**
Developing strong learning skills prepares you for success in higher education and professional careers.`
  };
  
  return ageTemplates[ageGroup] || ageTemplates['10-11'];
};

const examplePrompts = [
  {
    title: "Python Basics",
    prompt: "Create a slide explaining Python programming concepts for beginners"
  },
  {
    title: "Math Division",
    prompt: "Make a slide about division problems with visual examples"
  },
  {
    title: "AI Safety",
    prompt: "Build a slide about AI ethics and safety for kids"
  },
  {
    title: "Computer Science",
    prompt: "Create an educational slide about how computers work"
  },
  {
    title: "Science Concepts",
    prompt: "Make a slide explaining electricity and circuits"
  },
  {
    title: "History Topic",
    prompt: "Create a slide about ancient civilizations and their contributions"
  }
];

const AIContentSlideBuilder = ({ onGenerate, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedLayout, setSelectedLayout] = useState('image-right');
  const [mediaType, setMediaType] = useState('image');
  const [ageGroup, setAgeGroup] = useState('10-11');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSlide, setGeneratedSlide] = useState(null);

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt);
  };

  const generateSlide = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const slide = generateContentSlide(prompt, selectedLayout, mediaType, ageGroup);
      setGeneratedSlide(slide);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    if (generatedSlide) {
      onGenerate(generatedSlide);
    }
  };

  return (
    <BuilderContainer>
      <BuilderHeader>
        <h2>
          <Wand2 size={28} />
          AI Content Slide Builder
        </h2>
        <p>Describe your slide content in plain English, choose a layout, and AI will create it!</p>
      </BuilderHeader>

      <InputSection>
        <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Brain size={20} />
          Describe Your Slide
        </h3>
        <TextArea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Create a slide explaining Python programming concepts for beginners"
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

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layout size={18} />
          Choose Layout:
        </h4>
        <LayoutGrid>
          {layoutOptions.map((layout) => (
            <LayoutCard
              key={layout.id}
              selected={selectedLayout === layout.id}
              onClick={() => setSelectedLayout(layout.id)}
            >
              <div className="preview">
                {layout.preview()}
              </div>
              <div className="name">{layout.name}</div>
            </LayoutCard>
          ))}
        </LayoutGrid>
      </div>

      <OptionsSection>
        <OptionGroup>
          <h4 style={{ margin: '0 0 10px 0' }}>Media Type</h4>
          <Select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </Select>
        </OptionGroup>

        <OptionGroup>
          <h4 style={{ margin: '0 0 10px 0' }}>Age Group</h4>
          <Select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
            <option value="8-9">8-9 Years</option>
            <option value="10-11">10-11 Years</option>
            <option value="12-14">12-14 Years</option>
          </Select>
        </OptionGroup>
      </OptionsSection>

      <GenerateButton onClick={generateSlide} disabled={!prompt.trim() || isGenerating}>
        {isGenerating ? (
          <>
            <LoadingSpinner />
            AI is creating your slide...
          </>
        ) : (
          <>
            <Zap size={20} />
            Generate Content Slide
          </>
        )}
      </GenerateButton>

      {generatedSlide && (
        <PreviewSection>
          <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layout size={20} />
            Generated Slide Preview
          </h3>
          
          <SlidePreview layout={generatedSlide.layout}>
            {(generatedSlide.layout === 'image-left' || generatedSlide.layout === 'image-top') && (
              <div style={{
                background: '#f0f0f0',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '14px'
              }}>
                {generatedSlide.mediaType === 'video' ? <Video size={32} /> : <Image size={32} />}
                <br />
                {generatedSlide.mediaType === 'video' ? 'Video Area' : 'Image Area'}
              </div>
            )}
            
            <div style={{ padding: '10px' }}>
              <h2 style={{ margin: '0 0 15px 0', fontSize: '24px', color: '#333' }}>
                {generatedSlide.title}
              </h2>
              <div style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: '#333',
                whiteSpace: 'pre-wrap'
              }}>
                {generatedSlide.content}
              </div>
            </div>
            
            {(generatedSlide.layout === 'image-right' || generatedSlide.layout === 'image-bottom') && (
              <div style={{
                background: '#f0f0f0',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '14px',
                flexDirection: 'column'
              }}>
                {generatedSlide.mediaType === 'video' ? <Video size={32} /> : <Image size={32} />}
                {generatedSlide.mediaType === 'video' ? 'Video Area' : 'Image Area'}
              </div>
            )}
          </SlidePreview>
          
          <GenerateButton onClick={handleGenerate}>
            <Layout size={20} />
            Use This Slide
          </GenerateButton>
        </PreviewSection>
      )}
    </BuilderContainer>
  );
};

export default AIContentSlideBuilder;