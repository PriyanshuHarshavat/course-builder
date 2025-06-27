// Collection of Age-Appropriate AI Ethics Scenarios for TrainArama

export const ethicsScenarios = {
  // AGES 8-9: Simple, concrete scenarios about fairness and kindness
  'ages-8-9': [
    {
      id: 'ai-game-cheating',
      title: 'AI Game Helper',
      ageGroup: '8-9',
      difficulty: 'beginner',
      gradient: 'linear-gradient(135deg, #FFB6C1, #FF69B4)',
      
      character: {
        name: 'Robo',
        avatar: '🤖',
        role: 'Game AI',
        color: '#FF69B4'
      },
      
      story: {
        setup: "You're playing your favorite puzzle game and it's really hard! You've been stuck on the same level for days.",
        situation: "An AI helper pops up and says 'I can solve this puzzle for you instantly! Just click here and you'll win!'",
        dilemma: "Should you let the AI solve the puzzle for you?"
      },
      
      choices: [
        {
          id: 'let-ai-solve',
          text: "Let the AI solve it - I want to win!",
          icon: '🏆',
          color: '#FF9800',
          goodChoice: false,
          consequence: {
            immediate: "The AI solves the puzzle instantly and you advance to the next level.",
            longTerm: "You didn't learn how to solve it yourself, so the next levels are even harder.",
            impact: "You feel less proud of your achievement because you didn't really earn it."
          },
          lesson: "When AI does everything for us, we don't learn and grow. It's better to try ourselves!"
        },
        {
          id: 'ask-for-hint',
          text: "Ask the AI for just a small hint",
          icon: '💡',
          color: '#4CAF50',
          goodChoice: true,
          consequence: {
            immediate: "The AI gives you a helpful hint without solving the whole puzzle.",
            longTerm: "You figure out the solution yourself and feel really proud! The next levels are easier because you learned.",
            impact: "You build confidence and problem-solving skills that help you in other games and school."
          },
          lesson: "AI can be a great helper when it teaches us instead of doing everything for us!"
        },
        {
          id: 'solve-myself',
          text: "Keep trying to solve it myself",
          icon: '💪',
          color: '#2196F3',
          goodChoice: true,
          consequence: {
            immediate: "You keep working on the puzzle, and it takes a while, but you're learning.",
            longTerm: "When you finally solve it, you feel amazing! You learned a lot about problem-solving.",
            impact: "Your brain gets stronger at solving puzzles, and you're ready for bigger challenges."
          },
          lesson: "Sometimes the best learning happens when we work hard and figure things out ourselves!"
        }
      ],
      
      reflectionQuestions: [
        {
          id: 'learning-vs-winning',
          question: "What's more important - winning quickly or learning how to solve problems?",
          type: 'multiple-choice',
          options: ["Winning quickly", "Learning how to solve problems", "Both are equally important"],
          correct: 1
        }
      ]
    },

    {
      id: 'ai-drawing-helper',
      title: 'AI Art Assistant',
      ageGroup: '8-9',
      difficulty: 'beginner',
      gradient: 'linear-gradient(135deg, #98D8C8, #6DB5B8)',
      
      character: {
        name: 'Artie',
        avatar: '🎨',
        role: 'AI Art Helper',
        color: '#6DB5B8'
      },
      
      story: {
        setup: "Your class is having an art contest and everyone is drawing their favorite animal.",
        situation: "You want to draw a lion, but it's really hard. An AI art tool offers to draw a perfect lion for you.",
        dilemma: "Should you submit the AI's perfect drawing as your own artwork?"
      },
      
      choices: [
        {
          id: 'submit-ai-art',
          text: "Submit the AI's drawing - it's perfect!",
          icon: '🖼️',
          color: '#f44336',
          goodChoice: false,
          consequence: {
            immediate: "You submit the perfect lion drawing and everyone thinks it's amazing.",
            longTerm: "When the teacher asks you to draw another animal, you can't do it as well and feel embarrassed.",
            impact: "Other kids feel bad about their own drawings because yours looks 'too perfect' compared to theirs."
          },
          lesson: "Using AI's work as your own isn't honest. Art is about expressing yourself, not about being perfect!"
        },
        {
          id: 'use-as-reference',
          text: "Look at the AI drawing for ideas, then draw my own",
          icon: '👀',
          color: '#4CAF50',
          goodChoice: true,
          consequence: {
            immediate: "You study the AI's lion to understand how lions look, then draw your own version.",
            longTerm: "Your drawing isn't perfect, but it's yours! You learn a lot about drawing animals.",
            impact: "Other kids ask for your tips on drawing, and you can help them learn too."
          },
          lesson: "AI can be a great teacher and reference, but our own creative work is what makes us proud!"
        },
        {
          id: 'draw-myself',
          text: "Draw it myself without any AI help",
          icon: '✏️',
          color: '#2196F3',
          goodChoice: true,
          consequence: {
            immediate: "Your lion doesn't look perfect, but you put a lot of effort into it.",
            longTerm: "You feel really proud because it's 100% your own work, and you improve with practice.",
            impact: "Your friends admire your determination and creativity, even if your drawing isn't the 'best'."
          },
          lesson: "There's special value in creating something completely yourself, even if it's not perfect!"
        }
      ],
      
      reflectionQuestions: [
        {
          id: 'honesty-in-art',
          question: "Why is it important to be honest about who created your artwork?",
          type: 'text',
          placeholder: "Think about how you'd feel if someone else took credit for your drawing..."
        }
      ]
    }
  ],

  // AGES 10-11: More complex scenarios about fairness, privacy, and consequences
  'ages-10-11': [
    {
      id: 'ai-friend-recommendation',
      title: 'AI Friend Recommendations',
      ageGroup: '10-11',
      difficulty: 'intermediate',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      
      character: {
        name: 'SocialBot',
        avatar: '🤝',
        role: 'Social AI',
        color: '#667eea'
      },
      
      story: {
        setup: "Your school's new AI app helps students find friends with similar interests.",
        situation: "The AI suggests you'd be great friends with Maya (who likes science like you) but warns you to 'be careful around Alex because students like Alex often cause trouble.'",
        dilemma: "Should you trust the AI's recommendation about Alex without getting to know them yourself?"
      },
      
      choices: [
        {
          id: 'avoid-alex',
          text: "Avoid Alex - the AI knows better than I do",
          icon: '🚫',
          color: '#f44336',
          goodChoice: false,
          consequence: {
            immediate: "You hang out with Maya and avoid Alex, just like the AI suggested.",
            longTerm: "You later discover Alex is actually really interesting and was just having a tough time. You missed out on a good friendship.",
            impact: "Other students start avoiding Alex too because they see you doing it, making Alex feel even more isolated."
          },
          lesson: "AI can have unfair biases! It might judge people based on incomplete information or unfair patterns."
        },
        {
          id: 'get-to-know-both',
          text: "Get to know both Maya and Alex myself",
          icon: '👥',
          color: '#4CAF50',
          goodChoice: true,
          consequence: {
            immediate: "You spend time with both Maya and Alex to form your own opinions.",
            longTerm: "You become friends with both! Maya shares your love of science, and Alex has amazing creative ideas.",
            impact: "You help other students see that the AI's warning about Alex wasn't fair, creating a more inclusive environment."
          },
          lesson: "It's important to judge people for ourselves rather than letting AI make decisions about our relationships."
        },
        {
          id: 'question-ai-logic',
          text: "Ask the AI why it thinks Alex might cause trouble",
          icon: '❓',
          color: '#FF9800',
          goodChoice: true,
          consequence: {
            immediate: "The AI gives vague answers about 'behavioral patterns' but can't explain specific concerns about Alex.",
            longTerm: "You realize the AI might be using unfair generalizations and decide to meet Alex yourself.",
            impact: "You become more critical of AI recommendations and help others understand the importance of questioning AI."
          },
          lesson: "Always ask AI systems to explain their reasoning, especially when they make judgments about people!"
        }
      ],
      
      reflectionQuestions: [
        {
          id: 'ai-bias',
          question: "How might an AI system develop unfair biases about people?",
          type: 'multiple-choice',
          options: [
            "By learning from biased historical data",
            "By focusing on surface-level patterns", 
            "By not understanding individual personalities",
            "All of the above"
          ],
          correct: 3
        },
        {
          id: 'fair-ai',
          question: "How would you design a fairer AI friend-matching system?",
          type: 'text',
          placeholder: "Think about what information would be fair to use and what should be avoided..."
        }
      ]
    },

    {
      id: 'ai-homework-detector',
      title: 'AI Homework Detection',
      ageGroup: '10-11',
      difficulty: 'intermediate',
      gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
      
      character: {
        name: 'TeacherBot',
        avatar: '🤖',
        role: 'School AI System',
        color: '#11998e'
      },
      
      story: {
        setup: "Your school installed an AI system that can detect if students used AI to help with homework.",
        situation: "The AI flagged your friend Jamie's essay as 'possibly AI-assisted' even though Jamie wrote it themselves. Jamie is in trouble and might get a zero.",
        dilemma: "You know Jamie didn't cheat, but the AI system is usually trusted. What should you do?"
      },
      
      choices: [
        {
          id: 'trust-ai-system',
          text: "Trust the AI - it's probably right",
          icon: '🤖',
          color: '#f44336',
          goodChoice: false,
          consequence: {
            immediate: "You stay quiet and Jamie gets in trouble for something they didn't do.",
            longTerm: "Jamie loses trust in the fairness of school systems and becomes discouraged about writing.",
            impact: "Other students become afraid to write in their natural style if it might 'look like AI' to the detection system."
          },
          lesson: "AI systems can make mistakes! They're not perfect and sometimes need human judgment to correct errors."
        },
        {
          id: 'speak-up-for-jamie',
          text: "Speak up for Jamie and explain the AI might be wrong",
          icon: '🗣️',
          color: '#4CAF50',
          goodChoice: true,
          consequence: {
            immediate: "You talk to the teacher and explain that AI detection systems can make mistakes.",
            longTerm: "The teacher investigates further and realizes Jamie didn't cheat. Jamie is grateful for your support.",
            impact: "The school learns to be more careful about AI detection and implements human review for flagged cases."
          },
          lesson: "It's important to stand up for fairness and remember that AI systems need human oversight."
        },
        {
          id: 'research-ai-errors',
          text: "Research how AI detection systems can make mistakes",
          icon: '🔍',
          color: '#2196F3',
          goodChoice: true,
          consequence: {
            immediate: "You learn about false positives in AI detection and share this information with teachers.",
            longTerm: "You help the school understand AI limitations and improve their policies.",
            impact: "You become known as someone who understands AI well and helps others navigate AI systems fairly."
          },
          lesson: "Understanding how AI works helps us use it more responsibly and catch its mistakes."
        }
      ],
      
      reflectionQuestions: [
        {
          id: 'ai-detection-problems',
          question: "Why might an AI homework detector make mistakes?",
          type: 'multiple-choice',
          options: [
            "Some students write in a style that looks 'AI-like'",
            "The AI was trained on limited examples",
            "Writing styles can be similar between humans and AI",
            "All of the above"
          ],
          correct: 3
        }
      ]
    }
  ],

  // AGES 12-14: Complex scenarios about privacy, manipulation, and societal impact
  'ages-12-14': [
    {
      id: 'ai-social-media-filter',
      title: 'AI Content Filtering',
      ageGroup: '12-14',
      difficulty: 'advanced',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      
      character: {
        name: 'ContentAI',
        avatar: '📱',
        role: 'Social Media AI',
        color: '#667eea'
      },
      
      story: {
        setup: "You're developing a social media app for teens and need to implement AI content filtering to keep users safe.",
        situation: "The AI system you're testing removes posts about mental health struggles, claiming they're 'harmful content,' but it also removes educational posts about climate change because some users flagged them as 'depressing.'",
        dilemma: "How do you balance protecting users from harmful content while preserving important conversations and free expression?"
      },
      
      choices: [
        {
          id: 'strict-filtering',
          text: "Use strict filtering - safety first, remove anything potentially harmful",
          icon: '🛡️',
          color: '#f44336',
          goodChoice: false,
          consequence: {
            immediate: "Your platform becomes very 'clean' but also removes many important discussions.",
            longTerm: "Users can't discuss real issues they face, and educational content gets censored unfairly.",
            impact: "Your platform becomes less useful for meaningful conversations and learning."
          },
          lesson: "Over-censorship can be as harmful as under-censorship. AI systems need nuanced understanding of context."
        },
        {
          id: 'balanced-approach',
          text: "Create a balanced system with human oversight and user choice",
          icon: '⚖️',
          color: '#4CAF50',
          goodChoice: true,
          consequence: {
            immediate: "You implement a system where AI flags content but humans review edge cases, and users can choose their content sensitivity.",
            longTerm: "Users feel more in control and important conversations can happen safely with appropriate support resources.",
            impact: "Your platform becomes known for responsible content moderation that respects both safety and free expression."
          },
          lesson: "The best AI systems combine automated efficiency with human judgment and user agency."
        },
        {
          id: 'minimal-filtering',
          text: "Use minimal filtering - let users decide what they want to see",
          icon: '🔓',
          color: '#FF9800',
          goodChoice: false,
          consequence: {
            immediate: "Your platform has very few restrictions and users see all types of content.",
            longTerm: "Some users are exposed to genuinely harmful content that affects their mental health.",
            impact: "Parents and schools ban your platform, and you face criticism for not protecting vulnerable users."
          },
          lesson: "Complete freedom without safeguards can harm vulnerable users. Some AI filtering is necessary for protection."
        }
      ],
      
      reflectionQuestions: [
        {
          id: 'content-moderation-challenge',
          question: "What makes content moderation so challenging for AI systems?",
          type: 'multiple-choice',
          options: [
            "Context matters - the same words can be helpful or harmful depending on situation",
            "Cultural differences affect what's considered appropriate",
            "AI can't understand human emotions and intent as well as humans",
            "All of the above"
          ],
          correct: 3
        },
        {
          id: 'ideal-system',
          question: "Describe your ideal content moderation system that balances safety and free expression:",
          type: 'text',
          placeholder: "Consider transparency, user control, human oversight, and community guidelines..."
        }
      ]
    },

    {
      id: 'ai-job-screening',
      title: 'AI Hiring Systems',
      ageGroup: '12-14',
      difficulty: 'advanced',
      gradient: 'linear-gradient(135deg, #E0BBE4, #C39BD3)',
      
      character: {
        name: 'HireBot',
        avatar: '💼',
        role: 'AI Recruiter',
        color: '#C39BD3'
      },
      
      story: {
        setup: "You're running a company that uses AI to screen job applications. The AI was trained on historical hiring data to identify 'successful employees.'",
        situation: "You discover the AI is rejecting qualified candidates from certain backgrounds because historically, your company hired fewer people from those groups. The AI learned this as a 'pattern for success.'",
        dilemma: "How do you fix this bias while still using AI to help with hiring efficiency?"
      },
      
      choices: [
        {
          id: 'ignore-bias',
          text: "Keep using the current AI - it's just following patterns",
          icon: '🤖',
          color: '#f44336',
          goodChoice: false,
          consequence: {
            immediate: "Your hiring process remains efficient but continues to discriminate against qualified candidates.",
            longTerm: "Your company faces legal challenges and develops a reputation for unfair hiring practices.",
            impact: "Talented people from diverse backgrounds avoid applying to your company, limiting innovation and growth."
          },
          lesson: "Ignoring AI bias perpetuates historical discrimination and harms both individuals and organizations."
        },
        {
          id: 'remove-biased-factors',
          text: "Retrain the AI to focus only on relevant skills and qualifications",
          icon: '🔧',
          color: '#4CAF50',
          goodChoice: true,
          consequence: {
            immediate: "You work with AI experts to remove biased factors and retrain the system on relevant qualifications only.",
            longTerm: "Your hiring becomes more fair and you discover talented employees you would have missed before.",
            impact: "Your company becomes known for fair AI practices and attracts diverse talent, improving innovation."
          },
          lesson: "AI systems can be fixed! It takes effort to identify and remove bias, but it's worth it for fairness."
        },
        {
          id: 'hybrid-approach',
          text: "Use AI for initial screening but require human review for all final decisions",
          icon: '👥',
          color: '#2196F3',
          goodChoice: true,
          consequence: {
            immediate: "You implement a system where AI helps with efficiency but humans make final decisions with bias awareness.",
            longTerm: "Your hiring becomes both efficient and fair, with humans catching AI mistakes and ensuring equity.",
            impact: "Other companies adopt your model as a best practice for responsible AI hiring."
          },
          lesson: "Combining AI efficiency with human wisdom and oversight often creates the best outcomes."
        }
      ],
      
      reflectionQuestions: [
        {
          id: 'historical-bias',
          question: "Why is training AI on historical data sometimes problematic?",
          type: 'text',
          placeholder: "Think about how past discrimination might be reflected in historical records..."
        },
        {
          id: 'fair-hiring-ai',
          question: "What steps would you take to ensure an AI hiring system is fair?",
          type: 'text',
          placeholder: "Consider data sources, testing methods, oversight processes..."
        }
      ]
    }
  ]
};

// Helper function to get scenarios by age group
export const getScenariosByAge = (ageGroup) => {
  const ageKey = `ages-${ageGroup}`;
  return ethicsScenarios[ageKey] || [];
};

// Helper function to get scenario by ID
export const getScenarioById = (scenarioId) => {
  for (const ageGroup of Object.values(ethicsScenarios)) {
    const scenario = ageGroup.find(s => s.id === scenarioId);
    if (scenario) return scenario;
  }
  return null;
};

// Helper function to get appropriate scenarios for difficulty level
export const getScenariosByDifficulty = (difficulty) => {
  const allScenarios = Object.values(ethicsScenarios).flat();
  return allScenarios.filter(scenario => scenario.difficulty === difficulty);
};

export default ethicsScenarios;