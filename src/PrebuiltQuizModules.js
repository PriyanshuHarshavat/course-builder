// Pre-built quiz modules library
export const quizModules = [
  // Python Basics Quizzes
  {
    id: 'python_basics_1',
    title: 'Python Basics - Variables',
    description: 'Test your knowledge of Python variables',
    category: 'python',
    ageGroup: '10-11',
    difficulty: 'beginner',
    questions: [
      {
        id: 'q1',
        question: 'Which symbol is used to assign a value to a variable in Python?',
        type: 'multiple-choice',
        options: ['=', '==', '->', ':='],
        correct: 0,
        explanation: 'The = symbol assigns values to variables, while == compares values.'
      },
      {
        id: 'q2',
        question: 'Python is a programming language.',
        type: 'true-false',
        correct: true,
        explanation: 'Yes! Python is a popular programming language used for many things.'
      },
      {
        id: 'q3',
        question: 'What do you think makes Python special for beginners?',
        type: 'text-input',
        correctAnswers: ['easy to read', 'simple syntax', 'beginner friendly', 'readable'],
        explanation: 'Python has simple, readable syntax that makes it great for learning!'
      }
    ]
  },

  {
    id: 'python_basics_2',
    title: 'Python Math Operations',
    description: 'Quiz about mathematical operations in Python',
    category: 'python',
    ageGroup: '10-11',
    difficulty: 'beginner',
    questions: [
      {
        id: 'q1',
        question: 'What is the result of 5 + 3 in Python?',
        type: 'multiple-choice',
        options: ['53', '8', '35', '15'],
        correct: 1,
        explanation: 'Python adds the numbers: 5 + 3 = 8'
      },
      {
        id: 'q2',
        question: 'Which operations can Python do? Select all that apply.',
        type: 'multiple-select',
        options: ['Addition (+)', 'Subtraction (-)', 'Multiplication (*)', 'Division (/)'],
        correctAnswers: [0, 1, 2, 3],
        explanation: 'Python can do all basic math operations!'
      },
      {
        id: 'q3',
        question: 'Complete the code: result = 10 _____ 2',
        type: 'fill-blanks',
        question: 'Complete the code: result = 10 _____ 2',
        blanks: ['+'],
        explanation: 'The + symbol adds the numbers together.'
      }
    ]
  },

  // Math Quizzes
  {
    id: 'math_addition_1',
    title: 'Addition Practice',
    description: 'Basic addition problems for young learners',
    category: 'math',
    ageGroup: '8-9',
    difficulty: 'beginner',
    questions: [
      {
        id: 'q1',
        question: 'What is 7 + 5?',
        type: 'multiple-choice',
        options: ['10', '11', '12', '13'],
        correct: 2,
        explanation: 'Count it out: 7 + 5 = 12'
      },
      {
        id: 'q2',
        question: 'Adding zero to any number changes the number.',
        type: 'true-false',
        correct: false,
        explanation: 'Adding zero never changes a number! 5 + 0 = 5'
      },
      {
        id: 'q3',
        question: '4 + 6 = _____',
        type: 'fill-blanks',
        question: '4 + 6 = _____',
        blanks: ['10'],
        explanation: '4 + 6 = 10. You can count on your fingers!'
      }
    ]
  },

  {
    id: 'math_multiplication_1',
    title: 'Times Tables Fun',
    description: 'Practice multiplication tables',
    category: 'math',
    ageGroup: '10-11',
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        question: 'What is 6 × 7?',
        type: 'multiple-choice',
        options: ['35', '42', '48', '54'],
        correct: 1,
        explanation: '6 × 7 = 42. Remember: 6 sevens make 42!'
      },
      {
        id: 'q2',
        question: 'Which numbers equal 24? Select all that apply.',
        type: 'multiple-select',
        options: ['3 × 8', '4 × 6', '2 × 12', '5 × 5'],
        correctAnswers: [0, 1, 2],
        explanation: '3×8=24, 4×6=24, 2×12=24, but 5×5=25'
      },
      {
        id: 'q3',
        question: 'Any number multiplied by 1 equals itself.',
        type: 'true-false',
        correct: true,
        explanation: 'Yes! Multiplying by 1 never changes the number.'
      }
    ]
  },

  // Science Quizzes
  {
    id: 'science_animals_1',
    title: 'Animal Facts',
    description: 'Learn about different animals',
    category: 'science',
    ageGroup: '8-9',
    difficulty: 'beginner',
    questions: [
      {
        id: 'q1',
        question: 'Which animals are mammals? Select all that apply.',
        type: 'multiple-select',
        options: ['Dogs', 'Fish', 'Cats', 'Birds'],
        correctAnswers: [0, 2],
        explanation: 'Dogs and cats are mammals. They have fur and feed milk to babies.'
      },
      {
        id: 'q2',
        question: 'Birds can fly.',
        type: 'true-false',
        correct: false,
        explanation: 'Not all birds can fly! Penguins and ostriches cannot fly.'
      },
      {
        id: 'q3',
        question: 'What do pandas mainly eat?',
        type: 'text-input',
        correctAnswers: ['bamboo', 'bamboo shoots'],
        explanation: 'Pandas eat mostly bamboo - up to 40 pounds per day!'
      }
    ]
  },

  {
    id: 'science_space_1',
    title: 'Space Adventure',
    description: 'Explore our solar system',
    category: 'science',
    ageGroup: '10-11',
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        question: 'Which planet is closest to the Sun?',
        type: 'multiple-choice',
        options: ['Venus', 'Mercury', 'Earth', 'Mars'],
        correct: 1,
        explanation: 'Mercury is the closest planet to the Sun.'
      },
      {
        id: 'q2',
        question: 'The Moon is a planet.',
        type: 'true-false',
        correct: false,
        explanation: 'The Moon is a satellite that orbits Earth, not a planet.'
      },
      {
        id: 'q3',
        question: 'How many planets are in our solar system?',
        type: 'fill-blanks',
        question: 'There are _____ planets in our solar system.',
        blanks: ['8'],
        explanation: 'There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.'
      }
    ]
  },

  // Technology & AI Quizzes
  {
    id: 'tech_computers_1',
    title: 'Computer Basics',
    description: 'Learn about computers and technology',
    category: 'technology',
    ageGroup: '10-11',
    difficulty: 'beginner',
    questions: [
      {
        id: 'q1',
        question: 'What does CPU stand for?',
        type: 'multiple-choice',
        options: ['Computer Processing Unit', 'Central Processing Unit', 'Computer Program Unit', 'Central Program Unit'],
        correct: 1,
        explanation: 'CPU stands for Central Processing Unit - the brain of the computer.'
      },
      {
        id: 'q2',
        question: 'Which are input devices? Select all that apply.',
        type: 'multiple-select',
        options: ['Keyboard', 'Monitor', 'Mouse', 'Speaker'],
        correctAnswers: [0, 2],
        explanation: 'Keyboard and mouse are input devices. Monitor and speaker are output devices.'
      },
      {
        id: 'q3',
        question: 'Computers only understand numbers.',
        type: 'true-false',
        correct: true,
        explanation: 'Computers work with binary code - just 0s and 1s!'
      }
    ]
  },

  {
    id: 'tech_ai_1',
    title: 'Artificial Intelligence Basics',
    description: 'Introduction to AI and machine learning',
    category: 'technology',
    ageGroup: '12-13',
    difficulty: 'advanced',
    questions: [
      {
        id: 'q1',
        question: 'What is artificial intelligence?',
        type: 'text-input',
        correctAnswers: ['computer thinking', 'machines that think', 'smart computers', 'computer intelligence'],
        explanation: 'AI is when computers can think and make decisions like humans.'
      },
      {
        id: 'q2',
        question: 'Which are examples of AI? Select all that apply.',
        type: 'multiple-select',
        options: ['Voice assistants (Siri, Alexa)', 'Calculator', 'Self-driving cars', 'Recommendation systems'],
        correctAnswers: [0, 2, 3],
        explanation: 'Voice assistants, self-driving cars, and recommendation systems use AI. A basic calculator does not.'
      },
      {
        id: 'q3',
        question: 'AI will replace all human jobs.',
        type: 'true-false',
        correct: false,
        explanation: 'AI will change jobs, but humans will always be needed for creativity, empathy, and complex decisions.'
      }
    ]
  },

  // Reading & Language Arts
  {
    id: 'reading_stories_1',
    title: 'Story Elements',
    description: 'Understanding parts of a story',
    category: 'reading',
    ageGroup: '8-9',
    difficulty: 'beginner',
    questions: [
      {
        id: 'q1',
        question: 'Who is the main character in a story called?',
        type: 'multiple-choice',
        options: ['Narrator', 'Protagonist', 'Author', 'Reader'],
        correct: 1,
        explanation: 'The protagonist is the main character that the story follows.'
      },
      {
        id: 'q2',
        question: 'What are the main parts of a story? Select all that apply.',
        type: 'multiple-select',
        options: ['Beginning', 'Middle', 'End', 'Title page'],
        correctAnswers: [0, 1, 2],
        explanation: 'Stories have a beginning, middle, and end. The title page is not part of the story itself.'
      },
      {
        id: 'q3',
        question: 'The setting is _____ and _____ the story happens.',
        type: 'fill-blanks',
        question: 'The setting is _____ and _____ the story happens.',
        blanks: ['where', 'when'],
        explanation: 'Setting tells us WHERE (place) and WHEN (time) the story happens.'
      }
    ]
  },

  // Critical Thinking
  {
    id: 'thinking_logic_1',
    title: 'Logic Puzzles',
    description: 'Practice logical thinking skills',
    category: 'thinking',
    ageGroup: '10-11',
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        question: 'If all cats have fur, and Fluffy is a cat, then...',
        type: 'multiple-choice',
        options: ['Fluffy might have fur', 'Fluffy has fur', 'Fluffy is fluffy', 'We cannot know'],
        correct: 1,
        explanation: 'This is logical reasoning: if ALL cats have fur, and Fluffy IS a cat, then Fluffy MUST have fur.'
      },
      {
        id: 'q2',
        question: 'What comes next in this pattern: 2, 4, 6, 8, ___?',
        type: 'fill-blanks',
        question: 'What comes next in this pattern: 2, 4, 6, 8, ___?',
        blanks: ['10'],
        explanation: 'The pattern adds 2 each time: 2, 4, 6, 8, 10'
      },
      {
        id: 'q3',
        question: 'Good problem solving involves which steps? Select all that apply.',
        type: 'multiple-select',
        options: ['Understanding the problem', 'Guessing randomly', 'Making a plan', 'Checking your answer'],
        correctAnswers: [0, 2, 3],
        explanation: 'Good problem solving: understand, plan, solve, check. Random guessing is not helpful!'
      }
    ]
  }
];

// Organize quizzes by category
export const quizzesByCategory = {
  python: quizModules.filter(quiz => quiz.category === 'python'),
  math: quizModules.filter(quiz => quiz.category === 'math'),
  science: quizModules.filter(quiz => quiz.category === 'science'),
  technology: quizModules.filter(quiz => quiz.category === 'technology'),
  reading: quizModules.filter(quiz => quiz.category === 'reading'),
  thinking: quizModules.filter(quiz => quiz.category === 'thinking')
};

// Organize quizzes by age group
export const quizzesByAge = {
  '8-9': quizModules.filter(quiz => quiz.ageGroup === '8-9'),
  '10-11': quizModules.filter(quiz => quiz.ageGroup === '10-11'),
  '12-13': quizModules.filter(quiz => quiz.ageGroup === '12-13')
};

// Organize quizzes by difficulty
export const quizzesByDifficulty = {
  beginner: quizModules.filter(quiz => quiz.difficulty === 'beginner'),
  medium: quizModules.filter(quiz => quiz.difficulty === 'medium'),
  advanced: quizModules.filter(quiz => quiz.difficulty === 'advanced')
};