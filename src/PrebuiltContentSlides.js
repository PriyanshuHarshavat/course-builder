// Pre-built content slide templates
export const contentSlideTemplates = [
  // Educational Topic Slides
  {
    id: 'intro_python_1',
    title: 'What is Python?',
    category: 'python',
    layout: 'image-left',
    mediaType: 'image',
    imageUrl: '/api/placeholder/400/300',
    imageCaption: 'Python programming language logo',
    content: `Python is a programming language that's perfect for beginners!

• Easy to read and write
• Used by companies like Google and Netflix
• Great for games, websites, and robots
• Named after Monty Python (the comedy group!)

Let's start our Python adventure together!`,
    backgroundColor: '#f8f9ff',
    ageGroup: '8-10',
    difficulty: 'beginner'
  },

  {
    id: 'intro_variables_1',
    title: 'Understanding Variables',
    category: 'python',
    layout: 'image-right',
    mediaType: 'image',
    imageUrl: '/api/placeholder/400/300',
    imageCaption: 'Variables are like labeled boxes',
    content: `Variables are like boxes that store information!

Think of a variable as a labeled box:
• The label is the variable name
• Inside the box is the value
• You can change what's in the box
• You can have many different boxes

Example: name = "Alex" means we put "Alex" in a box labeled "name"`,
    backgroundColor: '#f0f8ff',
    ageGroup: '8-10',
    difficulty: 'beginner'
  },

  {
    id: 'math_addition_1',
    title: 'Addition in Everyday Life',
    category: 'math',
    layout: 'image-top',
    mediaType: 'image',
    imageUrl: '/api/placeholder/600/200',
    imageCaption: 'Adding objects together',
    content: `Addition is everywhere around us!

Examples of addition in daily life:
• Counting toys: 3 cars + 2 trucks = 5 vehicles
• Saving money: $5 + $3 = $8 total
• Eating snacks: 4 cookies + 1 cookie = 5 cookies
• Playing games: 10 points + 5 points = 15 points

Can you think of other examples?`,
    backgroundColor: '#fff8f0',
    ageGroup: '6-8',
    difficulty: 'beginner'
  },

  {
    id: 'science_planets_1',
    title: 'Our Solar System',
    category: 'science',
    layout: 'image-background',
    mediaType: 'image',
    imageUrl: '/api/placeholder/800/400',
    imageCaption: 'Beautiful view of planets in space',
    content: `Explore the Amazing Solar System!

Our solar system has 8 incredible planets:
• Mercury - Closest to the Sun, very hot!
• Venus - Hottest planet with thick clouds
• Earth - Our home with water and life
• Mars - The red planet
• Jupiter - Biggest planet with a big red spot
• Saturn - Has beautiful rings
• Uranus - Tilted sideways
• Neptune - Farthest from the Sun, very cold

Which planet would you like to visit?`,
    backgroundColor: '#000020',
    ageGroup: '8-10',
    difficulty: 'beginner'
  },

  // Study Tips and Learning Strategies
  {
    id: 'study_tips_1',
    title: 'How to Learn Effectively',
    category: 'study-skills',
    layout: 'image-left',
    mediaType: 'image',
    imageUrl: '/api/placeholder/400/300',
    imageCaption: 'Student studying with books',
    content: `Smart Ways to Learn Better!

✓ Take breaks every 20-30 minutes
✓ Practice a little bit each day
✓ Explain what you learned to someone else
✓ Use different colors and drawings
✓ Ask questions when you don't understand
✓ Celebrate small victories!

Remember: Everyone learns differently, so find what works for you!`,
    backgroundColor: '#f5f5ff',
    ageGroup: '8-12',
    difficulty: 'beginner'
  },

  {
    id: 'growth_mindset_1',
    title: 'The Power of "Yet"',
    category: 'mindset',
    layout: 'image-right',
    mediaType: 'image',
    imageUrl: '/api/placeholder/400/300',
    imageCaption: 'Child climbing a mountain',
    content: `Turn "I Can't" into "I Can't YET"!

Instead of saying:           Try saying:
❌ "I can't do this"        ✅ "I can't do this YET"
❌ "I'm not good at math"   ✅ "I'm learning math"
❌ "This is too hard"       ✅ "This will take time and practice"
❌ "I give up"              ✅ "I'll try a different way"

Your brain is like a muscle - it gets stronger with practice!`,
    backgroundColor: '#f0fff0',
    ageGroup: '8-12',
    difficulty: 'beginner'
  },

  // Technology and Digital Citizenship
  {
    id: 'digital_safety_1',
    title: 'Being Safe Online',
    category: 'digital-citizenship',
    layout: 'image-top',
    mediaType: 'image',
    imageUrl: '/api/placeholder/600/200',
    imageCaption: 'Children using computers safely',
    content: `Stay Safe While Having Fun Online!

Important Safety Rules:
🔒 Keep personal information private
👥 Only talk to people you know in real life
📱 Tell a trusted adult if something feels wrong
⏰ Take breaks from screens
🤝 Be kind to others online
🚫 Never meet strangers from the internet

Remember: The internet is a tool to learn and have fun, but safety always comes first!`,
    backgroundColor: '#fff0f5',
    ageGroup: '8-12',
    difficulty: 'beginner'
  },

  {
    id: 'ai_intro_1',
    title: 'What is Artificial Intelligence?',
    category: 'ai',
    layout: 'image-left',
    mediaType: 'image',
    imageUrl: '/api/placeholder/400/300',
    imageCaption: 'Friendly robot helping humans',
    content: `AI: Computers That Can Think!

Artificial Intelligence (AI) is when computers can:
🧠 Learn new things
🗣️ Understand what we say
👁️ Recognize pictures and faces
🎮 Play games really well
🚗 Help drive cars safely

AI Examples You Might Know:
• Voice assistants (Siri, Alexa)
• Video game characters
• Photo recognition on phones
• Movie recommendations

AI is here to help make life easier and more fun!`,
    backgroundColor: '#f0f8ff',
    ageGroup: '10-12',
    difficulty: 'medium'
  },

  // Creative and Art Topics
  {
    id: 'creativity_1',
    title: 'Unleash Your Creativity!',
    category: 'creativity',
    layout: 'image-background',
    mediaType: 'image',
    imageUrl: '/api/placeholder/800/400',
    imageCaption: 'Colorful art supplies and creations',
    content: `Every Child is Creative!

Ways to Express Your Creativity:
🎨 Drawing and painting
📝 Writing stories and poems
🎵 Making music and songs
🏗️ Building with blocks or LEGO
🎭 Acting and storytelling
💻 Creating games and apps
🌟 Inventing new solutions

There's no "wrong" way to be creative. What will you create today?`,
    backgroundColor: '#fff5ee',
    ageGroup: '6-12',
    difficulty: 'beginner'
  },

  // Problem Solving and Critical Thinking
  {
    id: 'problem_solving_1',
    title: 'Becoming a Problem Solver',
    category: 'critical-thinking',
    layout: 'image-right',
    mediaType: 'image',
    imageUrl: '/api/placeholder/400/300',
    imageCaption: 'Child solving a puzzle',
    content: `The Problem-Solving Super Steps!

1. 🤔 UNDERSTAND: What exactly is the problem?
2. 🗺️ PLAN: What steps could help solve it?
3. ⚡ ACT: Try your plan!
4. ✅ CHECK: Did it work? What can you learn?

Problem-Solving Tips:
• Break big problems into smaller pieces
• Don't be afraid to try different approaches
• Ask for help when you need it
• Learn from mistakes - they help you grow!

You're already a problem solver - you just need to practice!`,
    backgroundColor: '#f8fff8',
    ageGroup: '8-12',
    difficulty: 'medium'
  },

  // Environmental and Science Topics
  {
    id: 'environment_1',
    title: 'Protecting Our Planet',
    category: 'environment',
    layout: 'image-top',
    mediaType: 'image',
    imageUrl: '/api/placeholder/600/200',
    imageCaption: 'Beautiful Earth from space',
    content: `Small Actions, Big Impact!

Ways Kids Can Help the Environment:
🌱 Plant trees and flowers
♻️ Recycle paper, plastic, and cans
💡 Turn off lights when leaving a room
🚶 Walk or bike instead of driving short distances
💧 Don't waste water
🎒 Use reusable bags and water bottles
🐛 Create habitats for insects and birds

Every action counts! What will you do to help our planet?`,
    backgroundColor: '#f0fff8',
    ageGroup: '8-12',
    difficulty: 'beginner'
  },

  // Social Skills and Emotional Learning
  {
    id: 'friendship_1',
    title: 'Being a Good Friend',
    category: 'social-skills',
    layout: 'image-left',
    mediaType: 'image',
    imageUrl: '/api/placeholder/400/300',
    imageCaption: 'Children playing together happily',
    content: `The Art of Friendship!

What Makes a Great Friend:
😊 Being kind and caring
👂 Listening when friends talk
🤝 Sharing and taking turns
💪 Standing up for each other
😔 Saying sorry when you make mistakes
🎉 Celebrating friends' successes
🆘 Offering help when needed

Remember: To have a good friend, you need to BE a good friend!

How do you show kindness to your friends?`,
    backgroundColor: '#fff8f0',
    ageGroup: '6-10',
    difficulty: 'beginner'
  },

  {
    id: 'emotions_1',
    title: 'Understanding Your Emotions',
    category: 'emotional-learning',
    layout: 'image-right',
    mediaType: 'image',
    imageUrl: '/api/placeholder/400/300',
    imageCaption: 'Different emotion faces',
    content: `All Feelings Are Normal!

Common Emotions and What They Mean:
😊 Happy - When good things happen
😢 Sad - When we lose something important
😠 Angry - When things seem unfair
😰 Worried - When we're unsure about the future
😴 Tired - When we need rest
🤗 Excited - When we look forward to something

Healthy Ways to Handle Big Emotions:
• Take deep breaths
• Talk to someone you trust
• Draw or write about how you feel
• Go for a walk or exercise
• Listen to music

It's okay to feel all kinds of emotions!`,
    backgroundColor: '#f8f8ff',
    ageGroup: '6-10',
    difficulty: 'beginner'
  }
];

// Organize slides by category
export const slidesByCategory = {
  python: contentSlideTemplates.filter(slide => slide.category === 'python'),
  math: contentSlideTemplates.filter(slide => slide.category === 'math'),
  science: contentSlideTemplates.filter(slide => slide.category === 'science'),
  'study-skills': contentSlideTemplates.filter(slide => slide.category === 'study-skills'),
  mindset: contentSlideTemplates.filter(slide => slide.category === 'mindset'),
  'digital-citizenship': contentSlideTemplates.filter(slide => slide.category === 'digital-citizenship'),
  ai: contentSlideTemplates.filter(slide => slide.category === 'ai'),
  creativity: contentSlideTemplates.filter(slide => slide.category === 'creativity'),
  'critical-thinking': contentSlideTemplates.filter(slide => slide.category === 'critical-thinking'),
  environment: contentSlideTemplates.filter(slide => slide.category === 'environment'),
  'social-skills': contentSlideTemplates.filter(slide => slide.category === 'social-skills'),
  'emotional-learning': contentSlideTemplates.filter(slide => slide.category === 'emotional-learning')
};

// Organize slides by age group
export const slidesByAge = {
  '6-8': contentSlideTemplates.filter(slide => slide.ageGroup.includes('6-8')),
  '8-10': contentSlideTemplates.filter(slide => slide.ageGroup.includes('8-10')),
  '8-12': contentSlideTemplates.filter(slide => slide.ageGroup.includes('8-12')),
  '10-12': contentSlideTemplates.filter(slide => slide.ageGroup.includes('10-12'))
};

// Organize slides by layout
export const slidesByLayout = {
  'image-left': contentSlideTemplates.filter(slide => slide.layout === 'image-left'),
  'image-right': contentSlideTemplates.filter(slide => slide.layout === 'image-right'),
  'image-top': contentSlideTemplates.filter(slide => slide.layout === 'image-top'),
  'image-background': contentSlideTemplates.filter(slide => slide.layout === 'image-background')
};