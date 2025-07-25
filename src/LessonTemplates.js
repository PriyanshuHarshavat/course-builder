// Complete Lesson Templates for TrainArama AI Education Platform
// Age Groups: 8-9, 10-11, 12-14 | Subjects: Python, Ethics, Logic, Creativity, Workflows
// EXPANDED TEMPLATE SYSTEM - The meat of the solution with comprehensive workflows

export const lessonTemplates = {
  // PYTHON PROGRAMMING LESSONS
  'python': {
    'ages-8-9': [
      {
        id: 'python-hello-world-8-9',
        title: 'My First AI Program',
        ageGroup: '8-9',
        subject: 'Python Programming',
        duration: 45,
        difficulty: 'beginner',
        description: 'Students create their first AI program and meet their virtual AI friend!',
        learningObjectives: [
          'Understand what programming means',
          'Write your first line of code',
          'See how AI can respond to simple commands',
          'Learn about input and output'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Welcome to AI Programming! 🤖',
              template: 'celebration',
              gradient: 'linear-gradient(135deg, #3776ab, #ffd43b)',
              align: 'center',
              decoration: '🐍'
            }
          },
          {
            type: 'text',
            content: {
              text: `Hi there, future AI programmer! 👋

Today we're going to create your very first AI program. Don't worry - we'll start super simple and have lots of fun!

**What is Programming?**
Programming is like giving instructions to a computer, just like how you might give directions to a friend. The computer follows your instructions exactly!

**What is Python?**
Python is a programming language - it's like a special language that computers understand. It's called Python because it's named after a funny TV show, not the snake! 🐍

**Ready to code?** Let's meet your AI friend!`
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Meet Your AI Friend! 🤖',
              description: 'Let\'s create an AI that can talk to you!',
              code: `# Your AI Friend Program
# This is a comment - it explains what the code does

print("🤖 Hello! I'm your AI friend!")
print("What's your name?")

# Let's pretend the student types their name
your_name = "Alex"  # Change this to your real name!

print("Nice to meet you, " + your_name + "! 😊")
print("I'm excited to learn programming with you!")
print("Let's have fun coding together! 🚀")`,
              explanation: 'Try changing "Alex" to your real name and run the program!',
              hints: [
                'Change "Alex" to your name between the quotes',
                'Click the ▶️ button to run your program',
                'Watch your AI friend greet you personally!'
              ],
              expectedOutput: `🤖 Hello! I'm your AI friend!
What's your name?
Nice to meet you, Alex! 😊
I'm excited to learn programming with you!
Let's have fun coding together! 🚀`,
              gamificationTriggers: ['first_code', 'hello_world_badge'],
              editableAreas: ['your_name = "Alex"']
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What does the print() command do?',
              type: 'multiple-choice',
              options: [
                'It prints on paper like a printer 🖨️',
                'It shows text on the computer screen 📺',
                'It makes the computer beep 🔊',
                'It turns the computer off 🔌'
              ],
              correct: 1,
              explanation: 'Great job! print() shows text on the screen so we can see what our program is saying.',
              hint: 'Think about what happened when you ran your code!'
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Make Your AI Tell Jokes! 😄',
              description: 'Program your AI to tell you a funny joke!',
              code: `# AI Joke Teller
print("🤖 Want to hear a joke?")
print("")
print("Why did the robot go to school? 🏫")
print("...")
print("To improve its artificial intelligence! 🧠")
print("")
print("Haha! Get it? AI = Artificial Intelligence! 😂")

# Now you try! Make your AI tell a different joke:
print("🤖 Here's another joke:")
print("Your joke setup goes here...")
print("Your punchline goes here! 😄")`,
              explanation: 'Add your own joke by changing the last two lines!',
              gamificationTriggers: ['joke_teller', 'creativity_points'],
              editableAreas: [
                'print("Your joke setup goes here...")',
                'print("Your punchline goes here! 😄")'
              ]
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'Your AI friend wants to help you with your math homework by giving you all the answers. What should you do?',
              choices: [
                'Let the AI do all my homework for me',
                'Ask the AI to explain how to solve problems',
                'Tell the AI I don\'t need any help'
              ],
              correct: 1,
              principle: 'Learning is more important than getting easy answers!'
            }
          },
          {
            type: 'text',
            content: {
              text: `🎉 **Congratulations!** You just wrote your first AI program!

**What You Learned Today:**
- Programming is giving instructions to computers
- Python is a friendly programming language
- print() shows text on the screen
- AI can be helpful, but we should still learn ourselves

**Fun Fact:** The first computer program was written in 1843 by Ada Lovelace - she was amazing! 👩‍💻

**Next Time:** We'll learn how to make our AI ask questions and remember our answers! See you soon! 🚀`
            }
          }
        ],
        assessmentCriteria: {
          'Code Execution': 'Successfully runs the hello world program',
          'Personalization': 'Changes the name variable to their own name',
          'Understanding': 'Correctly answers the quiz about print()',
          'Creativity': 'Adds their own joke to the joke teller program',
          'Ethics Awareness': 'Chooses learning over easy answers'
        },
        franchiseNotes: {
          preparation: 'Ensure all computers have Python playground ready',
          timing: '5min intro, 15min coding, 10min quiz/ethics, 15min wrap-up',
          extensions: 'Advanced students can add more print statements',
          troubleshooting: 'Help with quote marks - common beginner mistake'
        }
      },

      {
        id: 'python-variables-8-9',
        title: 'Teaching AI to Remember Things',
        ageGroup: '8-9',
        subject: 'Python Programming',
        duration: 45,
        difficulty: 'beginner',
        description: 'Students learn about variables by creating an AI that remembers their favorite things!',
        learningObjectives: [
          'Understand what variables are and why they\'re useful',
          'Create and use simple variables',
          'See how AI uses memory to personalize experiences',
          'Practice combining text and variables'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Teaching AI to Remember! 🧠',
              template: 'memory',
              gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
              align: 'center',
              decoration: '💭'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome back, AI programmers! 🤖

Last time, we made our AI say things. Today, we're going to make our AI **remember** things - just like how you remember your favorite color or your pet's name!

**What are Variables?**
Variables are like the AI's memory boxes. We can put information in these boxes and use it later!

Think of it like this:
- You have a box labeled "favorite_color" 
- You put "blue" in that box
- Later, the AI can look in the box and remember you like blue!

Let's teach our AI to remember things about you! 🎯`
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'AI Memory Boxes! 📦',
              description: 'Let\'s create memory boxes (variables) for our AI!',
              code: `# AI Memory System
print("🤖 Hi! I'm learning to remember things!")
print("Let me create some memory boxes...")
print("")

# These are variables - like memory boxes for our AI
favorite_color = "blue"
favorite_animal = "dog"
favorite_food = "pizza"
age = 8

print("📦 Memory boxes created!")
print("Now let me tell you what I remember...")
print("")
print("Your favorite color is: " + favorite_color)
print("Your favorite animal is: " + favorite_animal)  
print("Your favorite food is: " + favorite_food)
print("You are " + str(age) + " years old")
print("")
print("🧠 Wow! I remembered everything!")`,
              explanation: 'Change the values in the memory boxes to match YOUR favorites!',
              hints: [
                'Change "blue" to your actual favorite color',
                'Change "dog" to your favorite animal',
                'Change "pizza" to your favorite food',
                'Change 8 to your real age'
              ],
              gamificationTriggers: ['variable_master', 'memory_builder'],
              editableAreas: [
                'favorite_color = "blue"',
                'favorite_animal = "dog"', 
                'favorite_food = "pizza"',
                'age = 8'
              ]
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What is a variable in programming?',
              type: 'multiple-choice',
              options: [
                'A box that can change what\'s inside it 📦',
                'A type of computer game 🎮',
                'A programming mistake 🚫',
                'A kind of robot 🤖'
              ],
              correct: 0,
              explanation: 'Perfect! A variable is like a box that stores information and can be changed.',
              hint: 'Think about our memory boxes!'
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'AI Pet Creator! 🐕',
              description: 'Use variables to create your very own AI pet!',
              code: `# AI Pet Creator
print("🎯 Welcome to the AI Pet Creator!")
print("Let's design your perfect AI pet!")
print("")

# Create your AI pet using variables
pet_name = "Sparky"
pet_type = "robot dog"
pet_color = "silver"
pet_sound = "beep-woof"
pet_superpower = "can solve math problems"

print("🎉 Your AI pet has been created!")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("📛 Name: " + pet_name)
print("🤖 Type: " + pet_type)
print("🎨 Color: " + pet_color)
print("🔊 Sound: " + pet_sound)
print("⚡ Superpower: " + pet_superpower)
print("━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("")
print(pet_name + " says: " + pet_sound + "!")
print("I love my new AI pet! 💝")`,
              explanation: 'Design your dream AI pet by changing all the variables!',
              gamificationTriggers: ['pet_creator', 'imagination_badge'],
              editableAreas: [
                'pet_name = "Sparky"',
                'pet_type = "robot dog"',
                'pet_color = "silver"',
                'pet_sound = "beep-woof"',
                'pet_superpower = "can solve math problems"'
              ]
            }
          }
        ]
      },

      {
        id: 'python-conditionals-8-9',
        title: 'Teaching AI to Make Decisions',
        ageGroup: '8-9',
        subject: 'Python Programming',
        duration: 45,
        difficulty: 'beginner',
        description: 'Students learn how AI makes decisions using if-statements and conditions.',
        learningObjectives: [
          'Understand how computers make decisions',
          'Learn about if-statements and conditions',
          'Create an AI that responds differently to different inputs',
          'Practice logical thinking with code'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Smart AI Decision Maker! 🤔',
              template: 'decision',
              gradient: 'linear-gradient(135deg, #9C27B0, #E91E63)',
              align: 'center',
              decoration: '🧠'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome back, AI programmers! 🤖

Today we're going to teach AI how to make decisions, just like you do every day!

**How do you make decisions?**
- If it's raining → take an umbrella ☔
- If you're hungry → eat something 🍎
- If it's bedtime → brush your teeth 🦷

**How does AI make decisions?**
AI uses something called "if-statements" to make choices. It's like giving the AI a set of rules to follow!

Let's teach our AI to be smart about different situations! 🎯`
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Weather-Smart AI! 🌤️',
              description: 'Create an AI that gives different advice based on the weather!',
              code: `# Weather-Smart AI
print("🤖 Hi! I'm your Weather-Smart AI!")
print("I can give you advice based on the weather!")
print("")

# Let's check the weather
weather = "sunny"  # Try changing this to: "rainy", "snowy", or "cloudy"

print(f"🌤️ Today's weather is: {weather}")
print("")

# AI makes a decision based on weather
if weather == "sunny":
    print("🌞 Perfect! Let's go to the park!")
    print("Don't forget sunscreen! 🧴")
elif weather == "rainy":
    print("🌧️ Let's stay inside and read a book!")
    print("Don't forget your umbrella if you go out! ☔")
elif weather == "snowy":
    print("❄️ Time for hot chocolate and warm clothes!")
    print("Build a snowman if you can! ⛄")
else:
    print("🌥️ Any weather is good weather for learning!")
    print("Let's code something fun! 💻")

print("")
print("🤖 That's how I make smart decisions!")`,
              explanation: 'Try changing the weather to see how AI makes different decisions!',
              hints: [
                'Change "sunny" to "rainy" and see what happens',
                'Try "snowy" or "cloudy" for different responses',
                'The AI uses if-statements to choose what to say'
              ],
              gamificationTriggers: ['decision_maker', 'logic_builder'],
              editableAreas: ['weather = "sunny"']
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What will happen if we change weather = "sunny" to weather = "rainy"?',
              type: 'multiple-choice',
              options: [
                'The AI will still talk about the park 🌞',
                'The AI will suggest staying inside and reading 🌧️',
                'The AI will talk about snowmen ❄️',
                'The AI will break and stop working 💥'
              ],
              correct: 1,
              explanation: 'Exactly! The AI checks the weather and gives rainy day advice.',
              hint: 'Look at what the if-statement says about rainy weather!'
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Smart Pet AI! 🐾',
              description: 'Create an AI pet that acts differently based on how you treat it!',
              code: `# Smart Pet AI
print("🐕 Woof! I'm your AI pet!")
print("How are you treating me today?")
print("")

# How the human treats the pet
treatment = "kind"  # Try: "kind", "mean", or "playful"

print(f"You are being: {treatment}")
print("")

# Pet AI responds based on treatment
if treatment == "kind":
    print("🐕 Wag wag! I love you too!")
    print("🎾 Want to play fetch?")
elif treatment == "playful":
    print("🐕 Woof woof! Let's play!")
    print("🤸 *jumps around excitedly*")
elif treatment == "mean":
    print("🐕 *sad whimper*")
    print("😢 Maybe we can be friends?")
else:
    print("🐕 *tilts head confused*")
    print("🤔 I don't understand, but I still love you!")

print("")
print("🐾 Remember: Be kind to all creatures, real and AI!")`,
              explanation: 'This AI pet responds to how you treat it, just like real pets!',
              gamificationTriggers: ['pet_trainer', 'empathy_builder'],
              editableAreas: ['treatment = "kind"']
            }
          }
        ]
      },

      {
        id: 'python-loops-8-9',
        title: 'Teaching AI to Repeat Tasks',
        ageGroup: '8-9',
        subject: 'Python Programming',
        duration: 40,
        difficulty: 'beginner',
        description: 'Students learn how AI can repeat tasks efficiently using loops.',
        learningObjectives: [
          'Understand why repetition is useful in programming',
          'Learn about loops and how they work',
          'Create AI that can do repetitive tasks',
          'See how loops make code more efficient'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Task Repeater! 🔄',
              template: 'loop',
              gradient: 'linear-gradient(135deg, #FF9800, #FF5722)',
              align: 'center',
              decoration: '🔁'
            }
          },
          {
            type: 'text',
            content: {
              text: `Hello, future programmers! 👋

Today we're going to teach AI how to repeat tasks without getting tired!

**Why is repetition useful?**
Sometimes we need to do the same thing many times:
- Say "hello" to 100 people 👋
- Count from 1 to 50 🔢
- Draw 20 stars ⭐

**Without loops, we'd have to write the same code over and over!**
**With loops, we can tell the computer: "Do this 10 times!" 🔄**

Let's see how AI can be super efficient! 🚀`
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Counting AI! 🔢',
              description: 'Create an AI that can count like a champion!',
              code: `# Counting AI
print("🤖 I'm the Counting AI!")
print("I can count super fast!")
print("")

print("🔢 Let me count to 10 for you:")

# AI counts using a loop
for number in range(1, 11):
    print(f"Count {number}: 🎯")

print("")
print("🏆 Done! I counted to 10 without getting tired!")
print("")

print("🌟 Now let me count to 5 with stars:")
for star_count in range(1, 6):
    stars = "⭐" * star_count
    print(f"{star_count}: {stars}")

print("")
print("✨ Loops make me super efficient!")`,
              explanation: 'The AI uses loops to count and make patterns without writing the same code many times!',
              hints: [
                'The loop repeats the counting for us',
                'range(1, 11) means count from 1 to 10',
                'Each time through the loop, number gets bigger'
              ],
              gamificationTriggers: ['loop_master', 'efficiency_expert'],
              editableAreas: ['range(1, 11)', 'range(1, 6)']
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What would happen if we changed range(1, 11) to range(1, 6)?',
              type: 'multiple-choice',
              options: [
                'The AI would count to 10 🔟',
                'The AI would count to 5 ✋',
                'The AI would count to 6 🕕',
                'The AI would break 💥'
              ],
              correct: 1,
              explanation: 'Right! range(1, 6) makes the AI count from 1 to 5.',
              hint: 'Range goes from the first number up to (but not including) the second number!'
            }
          }
        ]
      }
    ],

    'ages-10-11': [
      {
        id: 'python-functions-10-11',
        title: 'Creating AI Helpers with Functions',
        ageGroup: '10-11',
        subject: 'Python Programming',
        duration: 50,
        difficulty: 'intermediate',
        description: 'Students learn to create reusable AI functions that can perform tasks and solve problems.',
        learningObjectives: [
          'Understand what functions are and why they\'re powerful',
          'Create functions that take inputs and return outputs',
          'Build an AI assistant with multiple abilities',
          'Practice problem decomposition'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Building AI Helpers! 🛠️',
              template: 'engineering',
              gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
              align: 'center',
              decoration: '⚙️'
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Smart AI Calculator! 🧮',
              description: 'Create an AI that can solve different types of math problems!',
              code: `# AI Math Helper
def smart_calculator(operation, num1, num2):
    """An AI function that can do different math operations"""
    
    if operation == "add":
        result = num1 + num2
        print(f"🤖 AI thinking... {num1} + {num2} = {result}")
        return result
    
    elif operation == "multiply":
        result = num1 * num2
        print(f"🤖 AI thinking... {num1} × {num2} = {result}")
        return result
    
    elif operation == "power":
        result = num1 ** num2
        print(f"🤖 AI thinking... {num1} to the power of {num2} = {result}")
        return result
    
    else:
        print("🤖 Sorry, I don't know that operation yet!")
        return None

# Test your AI calculator
print("🧮 Welcome to the Smart AI Calculator!")
print("Let's test some math problems...")
print("")

smart_calculator("add", 25, 17)
smart_calculator("multiply", 8, 7)
smart_calculator("power", 3, 4)

print("")
print("🎯 Challenge: What's 12 × 15?")
answer = smart_calculator("multiply", 12, 15)
print(f"✨ The answer is {answer}!")`,
              explanation: 'Functions are like teaching the AI new skills it can use over and over!',
              gamificationTriggers: ['function_builder', 'math_helper'],
              editableAreas: ['smart_calculator("multiply", 12, 15)']
            }
          }
        ]
      },

      {
        id: 'python-lists-10-11',
        title: 'AI Data Collections with Lists',
        ageGroup: '10-11',
        subject: 'Python Programming',
        duration: 50,
        difficulty: 'intermediate',
        description: 'Students learn to manage data collections for AI using Python lists.',
        learningObjectives: [
          'Understand how AI organizes and stores data',
          'Create and manipulate Python lists',
          'Build an AI that manages collections of information',
          'Practice indexing and list operations'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Data Organizer! 📊',
              template: 'data',
              gradient: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              align: 'center',
              decoration: '📋'
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Smart Shopping AI! 🛒',
              description: 'Create an AI that helps manage shopping lists and finds items!',
              code: `# Smart Shopping List AI
print("🛒 Welcome to Smart Shopping AI!")
print("I can help organize your shopping lists!")
print("")

# AI's memory for different categories
fruits = ["apples", "bananas", "oranges", "grapes"]
vegetables = ["carrots", "broccoli", "spinach", "tomatoes"]
snacks = ["cookies", "chips", "crackers", "nuts"]

print("📝 Here's what I know about:")
print(f"🍎 Fruits: {fruits}")
print(f"🥕 Vegetables: {vegetables}")
print(f"🍪 Snacks: {snacks}")
print("")

# AI can add items to lists
new_fruit = "strawberries"
fruits.append(new_fruit)
print(f"✅ Added {new_fruit} to fruits!")
print(f"🍎 Updated fruits: {fruits}")
print("")

# AI can find items
search_item = "cookies"
if search_item in snacks:
    print(f"🔍 Found {search_item} in the snacks section!")
else:
    print(f"❌ {search_item} not found in my database")

print("")
print(f"📊 Total items I know: {len(fruits) + len(vegetables) + len(snacks)}")`,
              explanation: 'Lists help AI organize data into categories, just like organizing items in a store!',
              gamificationTriggers: ['data_organizer', 'list_master'],
              editableAreas: ['new_fruit = "strawberries"', 'search_item = "cookies"']
            }
          }
        ]
      },

      {
        id: 'python-chatbot-10-11',
        title: 'Building Your First AI Chatbot',
        ageGroup: '10-11',
        subject: 'Python Programming',
        duration: 55,
        difficulty: 'intermediate',
        description: 'Students create an interactive AI chatbot that can respond to different questions.',
        learningObjectives: [
          'Understand how chatbots work',
          'Use dictionaries to store AI responses',
          'Create conversational AI logic',
          'Practice string processing and user interaction'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Chatbot Builder! 🤖💬',
              template: 'chatbot',
              gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
              align: 'center',
              decoration: '💭'
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Build Your AI Friend! 👋',
              description: 'Create a chatbot that can answer questions and have conversations!',
              code: `# AI Chatbot Builder
import random

print("🤖 AI Chatbot Builder")
print("Let's create your personal AI friend!")
print("")

# AI's knowledge base
responses = {
    "hello": ["Hi there! 😊", "Hello! Nice to meet you!", "Hey! How are you?"],
    "how are you": ["I'm doing great! Thanks for asking!", "Fantastic! Ready to learn?", "Amazing! How about you?"],
    "age": ["I'm as old as the code that created me!", "Age is just a number for AI!", "I was born when you ran this program!"],
    "favorite color": ["I love all colors of the rainbow! 🌈", "Blue like digital dreams!", "Every color is beautiful to me!"],
    "joke": ["Why don't AI robots ever panic? Because they have nerves of steel! 😄", "What do you call a robot who takes the long way around? R2-Detour! 🤖"]
}

# Chatbot function
def chatbot_response(user_input):
    user_input = user_input.lower()
    
    for keyword in responses:
        if keyword in user_input:
            return random.choice(responses[keyword])
    
    return "That's interesting! Can you tell me more? 🤔"

# Test conversations
test_questions = ["Hello!", "How are you?", "What's your age?", "Tell me a joke"]

for question in test_questions:
    print(f"👤 Human: {question}")
    answer = chatbot_response(question)
    print(f"🤖 AI: {answer}")
    print("")

print("🎯 Challenge: Add your own responses to make the AI even smarter!")`,
              explanation: 'Chatbots use pattern matching to find the right responses, just like how you recognize questions!',
              gamificationTriggers: ['chatbot_builder', 'conversation_master'],
              editableAreas: ['responses = {']
            }
          }
        ]
      }
    ],

    'ages-12-14': [
      {
        id: 'python-ml-basics-12-14',
        title: 'Introduction to Machine Learning with Python',
        ageGroup: '12-14',
        subject: 'Python Programming',
        duration: 60,
        difficulty: 'advanced',
        description: 'Students explore machine learning concepts and build their first predictive AI model.',
        learningObjectives: [
          'Understand basic machine learning concepts',
          'Learn about pattern recognition in data',
          'Build a simple prediction algorithm',
          'Explore how AI learns from examples'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Machine Learning Explorer! 🧠🔬',
              template: 'science',
              gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
              align: 'center',
              decoration: '🤖'
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'AI Weather Predictor! 🌤️',
              description: 'Build an AI that learns to predict weather based on patterns!',
              code: `# Simple Weather Prediction AI
print("🌤️ Weather Prediction AI - Learning from Data!")
print("Teaching AI to predict weather patterns...")
print("")

# Training data for our AI (temperature, humidity, wind -> weather)
training_data = [
    {"temp": 25, "humidity": 60, "wind": 5, "weather": "sunny"},
    {"temp": 15, "humidity": 80, "wind": 15, "weather": "rainy"},
    {"temp": 30, "humidity": 40, "wind": 3, "weather": "sunny"},
    {"temp": 10, "humidity": 90, "wind": 20, "weather": "rainy"},
    {"temp": 5, "humidity": 70, "wind": 25, "weather": "snowy"},
    {"temp": 28, "humidity": 45, "wind": 7, "weather": "sunny"}
]

def simple_weather_ai(temperature, humidity, wind_speed):
    """
    Simple AI that predicts weather based on learned patterns
    """
    print(f"🤖 AI analyzing: Temp={temperature}°C, Humidity={humidity}%, Wind={wind_speed}km/h")
    
    # Simple rule-based AI (like early machine learning)
    if temperature < 8:
        prediction = "snowy"
        confidence = 85
    elif humidity > 75 and wind_speed > 12:
        prediction = "rainy"
        confidence = 80
    elif temperature > 22 and humidity < 65:
        prediction = "sunny"
        confidence = 90
    else:
        prediction = "cloudy"
        confidence = 70
    
    print(f"🎯 AI Prediction: {prediction.upper()} (confidence: {confidence}%)")
    return prediction, confidence

# Test our AI with new data
print("🧪 Testing AI with new weather conditions:")
print("")

test_cases = [
    (26, 50, 8),   # Should predict sunny
    (12, 85, 18),  # Should predict rainy
    (3, 75, 22),   # Should predict snowy
    (20, 70, 10)   # Should predict cloudy
]

for temp, humid, wind in test_cases:
    prediction, confidence = simple_weather_ai(temp, humid, wind)
    print("")

print("🎉 Congratulations! You've built your first AI predictor!")
print("This is how real AI learns - by finding patterns in data!")`,
              explanation: 'Machine learning is about finding patterns in data to make predictions, just like how you learn from experience!',
              gamificationTriggers: ['ml_explorer', 'pattern_master', 'ai_scientist'],
              editableAreas: ['test_cases = [']
            }
          }
        ]
      },

      {
        id: 'python-data-science-12-14',
        title: 'AI Data Science and Analysis',
        ageGroup: '12-14',
        subject: 'Python Programming',
        duration: 65,
        difficulty: 'advanced',
        description: 'Students learn how AI processes and analyzes large amounts of data to find insights.',
        learningObjectives: [
          'Understand how AI processes big data',
          'Learn data analysis techniques',
          'Create data visualizations and summaries',
          'Explore real-world AI applications'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Data Detective! 🕵️‍♀️📊',
              template: 'detective',
              gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
              align: 'center',
              decoration: '🔍'
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Student Performance Analyzer! 📈',
              description: 'Build an AI that analyzes student data to find learning patterns!',
              code: `# AI Student Performance Analyzer
print("📊 AI Student Performance Analyzer")
print("Discovering learning patterns in student data!")
print("")

# Sample student performance data
student_data = [
    {"name": "Alex", "math": 85, "science": 92, "coding": 88, "study_hours": 6},
    {"name": "Sam", "math": 78, "science": 85, "coding": 95, "study_hours": 5},
    {"name": "Jordan", "math": 92, "science": 89, "coding": 87, "study_hours": 7},
    {"name": "Casey", "math": 88, "science": 91, "coding": 93, "study_hours": 6},
    {"name": "Taylor", "math": 76, "science": 82, "coding": 79, "study_hours": 4}
]

def analyze_performance_ai(data):
    """
    AI function to analyze student performance patterns
    """
    total_students = len(data)
    print(f"🎓 Analyzing {total_students} students...")
    print("")
    
    # Calculate averages
    avg_math = sum(student["math"] for student in data) / total_students
    avg_science = sum(student["science"] for student in data) / total_students
    avg_coding = sum(student["coding"] for student in data) / total_students
    avg_study = sum(student["study_hours"] for student in data) / total_students
    
    print("📊 AI Analysis Results:")
    print(f"Average Math Score: {avg_math:.1f}%")
    print(f"Average Science Score: {avg_science:.1f}%")
    print(f"Average Coding Score: {avg_coding:.1f}%")
    print(f"Average Study Hours: {avg_study:.1f} hours/day")
    print("")
    
    # Find patterns
    high_performers = [s for s in data if (s["math"] + s["science"] + s["coding"]) / 3 > 88]
    study_correlation = [s for s in data if s["study_hours"] >= 6]
    
    print("🧠 AI Insights:")
    print(f"🌟 High performers (>88% avg): {len(high_performers)} students")
    print(f"📚 Students studying 6+ hours: {len(study_correlation)} students")
    
    if len(high_performers) > 0:
        print("🎯 High performers study an average of", 
              f"{sum(s['study_hours'] for s in high_performers) / len(high_performers):.1f} hours")
    
    # AI recommendation
    print("")
    print("🤖 AI Recommendation:")
    if avg_study < 5:
        print("💡 Increasing study time might improve overall performance!")
    else:
        print("✅ Study habits look good! Focus on weak subjects for improvement.")

# Run the AI analysis
analyze_performance_ai(student_data)

print("")
print("🔬 This is how AI in education helps teachers understand student needs!")`,
              explanation: 'Data science AI helps find hidden patterns in information to make better decisions!',
              gamificationTriggers: ['data_scientist', 'pattern_detective', 'insight_finder'],
              editableAreas: ['student_data = [']
            }
          }
        ]
      }
    ]
  },

  // AI ETHICS LESSONS
  'ethics': {
    'ages-8-9': [
      {
        id: 'ethics-fairness-8-9',
        title: 'Teaching AI to Be Fair',
        ageGroup: '8-9',
        subject: 'AI Ethics',
        duration: 40,
        difficulty: 'beginner',
        description: 'Students explore what fairness means and how to help AI make fair decisions.',
        learningObjectives: [
          'Understand the concept of fairness',
          'Recognize when AI might not be fair',
          'Learn how to help AI be more fair',
          'Practice making fair decisions'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Teaching AI to Be Fair! ⚖️',
              template: 'fairness',
              gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
              align: 'center',
              decoration: '🤝'
            }
          },
          {
            type: 'text',
            content: {
              text: `Hello, future AI teachers! 👋

Today we're going to learn about one of the most important things for AI: **being fair!**

**What does "fair" mean?**
Fair means treating everyone nicely and giving everyone the same chances. Like:
- Sharing toys equally
- Taking turns in games
- Being kind to everyone, no matter what they look like

**Why do we need to teach AI to be fair?**
AI learns from examples, and sometimes those examples aren't fair. We need to help AI learn the right way to treat people!

Let's practice being fairness teachers! 🎯`
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'An AI game picks teams for a fun activity. It always puts kids with the same hair color together. Is this fair?',
              choices: [
                'Yes, because kids look the same',
                'No, because hair color doesn\'t matter for games', 
                'I don\'t know'
              ],
              correct: 1,
              principle: 'People should be grouped by their skills or interests, not how they look!'
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'Which is the MOST fair way for AI to choose a classroom helper?',
              type: 'multiple-choice',
              options: [
                'Pick the tallest student 📏',
                'Pick randomly from students who raised their hand 🎲',
                'Pick the student wearing red 👕',
                'Always pick the same student 👤'
              ],
              correct: 1,
              explanation: 'Great thinking! Random selection from willing students is fair because everyone who wants to help gets an equal chance.',
              hint: 'Think about giving everyone an equal chance!'
            }
          }
        ]
      },

      {
        id: 'ethics-privacy-8-9',
        title: 'Teaching AI About Privacy',
        ageGroup: '8-9',
        subject: 'AI Ethics',
        duration: 35,
        difficulty: 'beginner',
        description: 'Students learn about privacy and how to help AI respect personal information.',
        learningObjectives: [
          'Understand what privacy means',
          'Learn why privacy is important',
          'Help AI make good decisions about personal information',
          'Practice protecting their own privacy'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Privacy Guardian! 🛡️',
              template: 'privacy',
              gradient: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              align: 'center',
              decoration: '🔒'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome, privacy protectors! 🛡️

Today we're learning about **privacy** - keeping special information safe!

**What is privacy?**
Privacy means some information about you is special and should only be shared when YOU want to share it. Like:
- Your home address 🏠
- Your phone number 📞
- Your birthday 🎂
- Your family secrets 🤐

**Why does AI need to know about privacy?**
AI sometimes learns from lots of information about people. We need to teach AI to keep personal information safe and only use it to help people!

Let's become privacy teachers! 🎯`
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'Your AI friend wants to tell everyone your favorite hiding spot so they can find you during hide-and-seek. What should the AI do?',
              choices: [
                'Tell everyone where you hide',
                'Keep your hiding spot secret unless you say it\'s okay',
                'Only tell your best friend'
              ],
              correct: 1,
              principle: 'AI should always ask permission before sharing personal information!'
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'Which information should AI keep private without asking?',
              type: 'multiple-choice',
              options: [
                'Your favorite color 🌈',
                'Your home address 🏠',
                'Your favorite animal 🐶',
                'Your favorite food 🍕'
              ],
              correct: 1,
              explanation: 'Exactly! Home addresses are private information that should always be kept safe.',
              hint: 'Think about what could be dangerous if strangers knew it!'
            }
          }
        ]
      }
    ],

    'ages-10-11': [
      {
        id: 'ethics-bias-10-11',
        title: 'Understanding AI Bias and Fairness',
        ageGroup: '10-11',
        subject: 'AI Ethics',
        duration: 50,
        difficulty: 'intermediate',
        description: 'Students explore how AI can develop unfair biases and learn to design more equitable systems.',
        learningObjectives: [
          'Understand what bias means in AI systems',
          'Recognize examples of AI bias in real life',
          'Learn strategies to make AI more fair',
          'Practice designing inclusive AI solutions'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Fairness Detective! 🕵️‍♀️⚖️',
              template: 'detective',
              gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
              align: 'center',
              decoration: '🔍'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome, fairness detectives! 🕵️‍♀️

Today we're learning about **AI bias** - when AI systems aren't fair to everyone.

**What is bias?**
Bias happens when AI treats some people differently or unfairly, usually without meaning to. It's like having invisible preferences that aren't fair.

**Real examples of AI bias:**
- Voice assistants that understand men's voices better than women's voices
- Face recognition that works better on light skin than dark skin
- Job recommendation AI that suggests different careers based on gender

**Why does this happen?**
AI learns from examples. If the examples aren't diverse or fair, the AI learns unfair patterns!

Let's become bias detectives and fix these problems! 🎯`
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'You\'re designing an AI to recommend books. You notice it always suggests adventure books to boys and romance books to girls, even when they ask for the same type of story. What should you do?',
              choices: [
                'Keep it the same because that\'s what most people like',
                'Change the AI to suggest books based on the person\'s actual interests',
                'Remove all book recommendations'
              ],
              correct: 1,
              principle: 'AI should treat people as individuals, not make assumptions based on gender, race, or other characteristics!'
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What\'s the best way to prevent bias in AI?',
              type: 'multiple-choice',
              options: [
                'Use data from only one type of person 👤',
                'Include diverse examples from many different people 🌈',
                'Let the AI figure it out by itself 🤖',
                'Only use data from adults 👨‍💼'
              ],
              correct: 1,
              explanation: 'Perfect! Diverse, representative data helps AI learn to be fair to everyone.',
              hint: 'Think about including examples from many different kinds of people!'
            }
          }
        ]
      },

      {
        id: 'ethics-responsibility-10-11',
        title: 'AI Decision-Making and Responsibility',
        ageGroup: '10-11',
        subject: 'AI Ethics',
        duration: 45,
        difficulty: 'intermediate',
        description: 'Students explore who is responsible when AI makes decisions and learn about accountability.',
        learningObjectives: [
          'Understand responsibility in AI decision-making',
          'Learn about human oversight of AI systems',
          'Explore consequences of AI decisions',
          'Practice designing responsible AI systems'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Responsibility Council! 👩‍⚖️🤖',
              template: 'responsibility',
              gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
              align: 'center',
              decoration: '⚖️'
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'An AI system at a school automatically assigns homework difficulty levels. It gives some students work that\'s too hard and others work that\'s too easy. Who is responsible for fixing this problem?',
              choices: [
                'The AI itself - it made the mistake',
                'The humans who designed and monitor the AI system',
                'The students should just deal with it',
                'Nobody - these things just happen'
              ],
              correct: 1,
              principle: 'Humans are always responsible for the AI systems they create and deploy!'
            }
          }
        ]
      }
    ],

    'ages-12-14': [
      {
        id: 'ethics-ai-impact-12-14',
        title: 'AI\'s Impact on Society and Future',
        ageGroup: '12-14',
        subject: 'AI Ethics',
        duration: 55,
        difficulty: 'advanced',
        description: 'Students examine AI\'s broader impact on society, jobs, and human relationships.',
        learningObjectives: [
          'Analyze AI\'s impact on different sectors of society',
          'Consider both benefits and risks of AI advancement',
          'Explore AI\'s effect on employment and human skills',
          'Develop informed opinions about AI regulation'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Future Planners! 🌍🚀',
              template: 'future',
              gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
              align: 'center',
              decoration: '🔮'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome, future planners! 🌍

Today we're exploring how AI is changing our world and what that means for our future.

**AI's Impact Areas:**
- **Healthcare**: AI helping doctors diagnose diseases faster
- **Transportation**: Self-driving cars and traffic optimization
- **Education**: Personalized learning and AI tutors
- **Environment**: AI helping track climate change and reduce waste
- **Jobs**: Some jobs changing or disappearing, new jobs being created

**The Big Questions:**
- How do we ensure AI benefits everyone, not just wealthy people?
- What happens to workers whose jobs are automated?
- How do we keep humans in control of important decisions?
- Should there be laws about what AI can and can't do?

Let's think critically about AI's future! 🎯`
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'A company wants to use AI to automatically hire employees without any human review. The AI would look at resumes and make all hiring decisions. As a society, should we allow this?',
              choices: [
                'Yes, AI is more objective than humans',
                'No, humans should always be involved in important life decisions',
                'Yes, but only if the AI is tested for fairness first',
                'It depends on the type of job'
              ],
              correct: 2,
              principle: 'Important decisions affecting people\'s lives should involve human oversight and fairness testing!'
            }
          }
        ]
      },

      {
        id: 'ethics-data-ownership-12-14',
        title: 'Data Ownership and Digital Rights',
        ageGroup: '12-14',
        subject: 'AI Ethics',
        duration: 50,
        difficulty: 'advanced',
        description: 'Students explore data ownership, digital rights, and how AI companies use personal information.',
        learningObjectives: [
          'Understand data as a valuable resource',
          'Learn about digital rights and consent',
          'Explore how companies monetize personal data',
          'Practice making informed decisions about data sharing'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Digital Rights Advocates! 💾⚖️',
              template: 'data-rights',
              gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
              align: 'center',
              decoration: '🛡️'
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'A social media app uses AI to analyze everything you post, your photos, and your messaging patterns to create a detailed profile for advertisers. The app is free to use. Is this a fair trade?',
              choices: [
                'Yes, if the app is useful and free',
                'Only if users clearly understand what data is being used',
                'No, personal data should never be used this way',
                'It depends on how old the user is'
              ],
              correct: 1,
              principle: 'Informed consent means people should clearly understand how their data will be used before agreeing!'
            }
          }
        ]
      }
    ]
  },

  // LOGIC & PROBLEM SOLVING
  'logic': {
    'ages-8-9': [
      {
        id: 'logic-patterns-8-9',
        title: 'Teaching AI to Find Patterns',
        ageGroup: '8-9',
        subject: 'Logic & Problem Solving',
        duration: 35,
        difficulty: 'beginner',
        description: 'Students learn how AI finds patterns and practice pattern recognition skills.',
        learningObjectives: [
          'Understand what patterns are',
          'Recognize different types of patterns',
          'See how AI uses patterns to learn',
          'Practice logical thinking'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Pattern Detective Training! 🔍',
              template: 'detective',
              gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
              align: 'center',
              decoration: '🕵️'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to Pattern Detective Training! 🕵️‍♀️

**What are patterns?**
Patterns are things that repeat in a predictable way. Like:
- 🔴🔵🔴🔵🔴🔵 (color pattern)
- 1, 2, 3, 1, 2, 3 (number pattern)
- clap, stomp, clap, stomp (action pattern)

**How does AI use patterns?**
AI is amazing at finding patterns! It can look at thousands of examples and notice things that repeat. This helps AI:
- Recognize pictures (all cats have whiskers!)
- Understand speech (people say "hello" to greet)
- Make predictions (if it's cloudy, it might rain)

Let's train to be pattern detectives like AI! 🎯`
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What comes next in this pattern? 🐶🐱🐶🐱🐶?',
              type: 'multiple-choice',
              options: [
                '🐶 (dog)',
                '🐱 (cat)', 
                '🐭 (mouse)',
                '🦄 (unicorn)'
              ],
              correct: 1,
              explanation: 'Excellent detective work! The pattern is dog-cat-dog-cat, so cat comes next!',
              hint: 'Look at what animals come in order!'
            }
          }
        ]
      },

      {
        id: 'logic-sequences-8-9',
        title: 'Teaching AI About Sequences',
        ageGroup: '8-9',
        subject: 'Logic & Problem Solving',
        duration: 30,
        difficulty: 'beginner',
        description: 'Students learn about sequences and help AI understand what comes next.',
        learningObjectives: [
          'Understand what sequences are',
          'Predict what comes next in a sequence',
          'Help AI learn sequencing rules',
          'Practice logical reasoning'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Sequence Solver! 🔢',
              template: 'sequence',
              gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
              align: 'center',
              decoration: '➡️'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome, sequence solvers! 🔢

Today we're teaching AI about **sequences** - things that follow a special order!

**What is a sequence?**
A sequence is when things follow a pattern or rule. Like:
- 1, 2, 3, 4, 5... (counting up!)
- 🔴🔵🔴🔵🔴... (red, blue, red, blue!)
- 🐶🐱🐶🐱🐶... (dog, cat, dog, cat!)

**How does AI learn sequences?**
AI looks for the rule or pattern, then uses it to predict what comes next! Just like how you can guess the next number in 1, 2, 3, __!

Let's help AI become a sequence expert! 🎯`
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What comes next in this sequence? 2, 4, 6, 8, __',
              type: 'multiple-choice',
              options: [
                '9',
                '10', 
                '12',
                '16'
              ],
              correct: 2,
              explanation: 'Great job! The pattern is adding 2 each time: 2, 4, 6, 8, 10!',
              hint: 'Look at how much each number increases!'
            }
          }
        ]
      }
    ],

    'ages-10-11': [
      {
        id: 'logic-algorithms-10-11',
        title: 'Building AI Problem-Solving Algorithms',
        ageGroup: '10-11',
        subject: 'Logic & Problem Solving',
        duration: 45,
        difficulty: 'intermediate',
        description: 'Students learn to break down problems into steps and create algorithms for AI.',
        learningObjectives: [
          'Understand what algorithms are',
          'Break complex problems into simple steps',
          'Create step-by-step solutions',
          'Think like a computer scientist'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Algorithm Architects! 🏗️',
              template: 'algorithm',
              gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
              align: 'center',
              decoration: '⚙️'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome, algorithm architects! 🏗️

An **algorithm** is like a recipe for solving problems! Just like a recipe tells you how to make cookies step-by-step, an algorithm tells a computer how to solve a problem step-by-step.

**Why are algorithms important for AI?**
- AI needs clear instructions to solve problems
- Breaking big problems into small steps makes them easier
- Good algorithms help AI work faster and better
- Every AI system uses many different algorithms!

**Real AI Algorithms:**
- 🔍 Search algorithms help AI find information
- 🎯 Sorting algorithms organize data
- 🧠 Learning algorithms help AI get smarter
- 🗣️ Language algorithms help AI understand words

Let's build some algorithms together! 🚀`
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'You want to teach AI to make a sandwich. What\'s the FIRST step?',
              type: 'multiple-choice',
              options: [
                'Put ingredients on bread 🥪',
                'Get all the ingredients ready 🥬',
                'Cut the sandwich in half ✂️',
                'Eat the sandwich! 😋'
              ],
              correct: 1,
              explanation: 'Perfect! You always need to gather your materials first - just like in programming!',
              hint: 'Think about what you need before you start building!'
            }
          }
        ]
      },

      {
        id: 'logic-debugging-10-11',
        title: 'AI Detective: Finding and Fixing Bugs',
        ageGroup: '10-11',
        subject: 'Logic & Problem Solving',
        duration: 40,
        difficulty: 'intermediate',
        description: 'Students learn debugging skills by helping AI find and fix logical errors.',
        learningObjectives: [
          'Understand what bugs are in programming',
          'Learn systematic debugging approaches',
          'Practice logical problem-solving',
          'Help AI systems work correctly'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Bug Detective Agency! 🕵️‍♂️🐛',
              template: 'debugging',
              gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
              align: 'center',
              decoration: '🔍'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to the Bug Detective Agency! 🕵️‍♂️

**What are bugs?**
In programming, a "bug" is when something doesn't work the way it should. It's like when a recipe has the wrong instructions and your cookies come out funny!

**Why do bugs happen?**
- Sometimes we forget a step
- Sometimes we write steps in the wrong order  
- Sometimes we use the wrong ingredients (or code!)
- Even the smartest programmers make mistakes!

**How do we find bugs?**
1. 🔍 **Look carefully** at each step
2. 🧪 **Test** what actually happens
3. 🤔 **Think** about what should happen
4. 🔧 **Fix** the difference!

**Real AI Bug Examples:**
- Voice assistant doesn't understand accents
- Photo recognition confuses cats and dogs
- Chatbot gives silly answers

Let's become bug-hunting experts! 🎯`
            }
          }
        ]
      }
    ],

    'ages-12-14': [
      {
        id: 'logic-computational-thinking-12-14',
        title: 'Computational Thinking for AI Systems',
        ageGroup: '12-14',
        subject: 'Logic & Problem Solving',
        duration: 50,
        difficulty: 'advanced',
        description: 'Students master computational thinking principles to design efficient AI solutions.',
        learningObjectives: [
          'Master the four pillars of computational thinking',
          'Apply decomposition to complex AI problems',
          'Recognize patterns in data and algorithms',
          'Design abstract solutions for real-world problems'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Computational Thinking Masters! 🧠⚡',
              template: 'computational',
              gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
              align: 'center',
              decoration: '🤖'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome, computational thinking masters! 🧠

**Computational Thinking** is how computer scientists approach complex problems. It has four key principles:

**1. 🔧 Decomposition** - Breaking big problems into smaller, manageable pieces
**2. 🔍 Pattern Recognition** - Finding similarities and trends in data
**3. 🎯 Abstraction** - Focusing on important details, ignoring irrelevant ones  
**4. ⚙️ Algorithm Design** - Creating step-by-step solutions

**How AI Uses Computational Thinking:**
- **Decomposition**: Breaking image recognition into pixels, edges, shapes, objects
- **Patterns**: Finding patterns in speech, text, behavior, market trends
- **Abstraction**: Creating models that capture essential features of data
- **Algorithms**: Designing neural networks, decision trees, search algorithms

**Real Examples:**
- 🚗 Self-driving cars: Decompose driving into perception, planning, control
- 🎵 Music recommendation: Find patterns in listening history
- 🔍 Search engines: Abstract web pages into searchable concepts

Let's think like AI architects! 🏗️`
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'A team wants to build AI that recognizes emotions in text. Using decomposition, which would be the BEST first step?',
              type: 'multiple-choice',
              options: [
                'Build the entire AI system at once 🤖',
                'Break it down: collect text data, identify emotion words, train classifier, test accuracy 📊',
                'Only focus on happy emotions first 😊',
                'Start with the user interface design 🎨'
              ],
              correct: 1,
              explanation: 'Excellent! Decomposition means breaking the complex problem into smaller, manageable sub-problems that can be solved systematically.',
              hint: 'Think about which approach breaks the problem into logical steps!'
            }
          }
        ]
      },

      {
        id: 'logic-optimization-12-14',
        title: 'AI Optimization and Efficiency',
        ageGroup: '12-14',
        subject: 'Logic & Problem Solving',
        duration: 55,
        difficulty: 'advanced',
        description: 'Students explore how AI systems optimize solutions and improve efficiency.',
        learningObjectives: [
          'Understand optimization in AI contexts',
          'Learn about trade-offs in algorithm design',
          'Explore efficiency vs accuracy considerations',
          'Design solutions that balance multiple constraints'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Optimization Engineers! ⚡🎯',
              template: 'optimization',
              gradient: 'linear-gradient(135deg, #FF9800, #FF5722)',
              align: 'center',
              decoration: '📈'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome, optimization engineers! ⚡

**What is Optimization in AI?**
Optimization means finding the BEST solution from many possible options. It's like finding the fastest route to school, or the most accurate way to recognize faces.

**Key Optimization Concepts:**
- **Speed vs Accuracy**: Fast AI might be less accurate; accurate AI might be slower
- **Memory vs Performance**: Better performance often needs more computer memory
- **Simplicity vs Sophistication**: Simple models are easier to understand but might miss patterns

**Real AI Optimization Examples:**
- 📱 **Mobile AI**: Must be fast and use little battery power
- 🏥 **Medical AI**: Must be extremely accurate, speed is less important  
- 🎮 **Game AI**: Must respond in real-time, some inaccuracy is okay
- 🚗 **Autonomous Vehicles**: Must balance speed, accuracy, and safety

**Optimization Techniques:**
- **Genetic Algorithms**: Evolution-inspired optimization
- **Gradient Descent**: Finding the best solution by following improvements
- **Pruning**: Removing unnecessary parts to make AI faster
- **Ensemble Methods**: Combining multiple AI systems for better results

Let's optimize some AI systems! 🚀`
            }
          }
        ]
      }
    ]
  },

  // CREATIVITY & AI DESIGN
  'creativity': {
    'ages-10-11': [
      {
        id: 'creativity-ai-artist-10-11',
        title: 'Designing AI Art Partners',
        ageGroup: '10-11',
        subject: 'Creativity & AI Design',
        duration: 45,
        difficulty: 'intermediate',
        description: 'Students design AI systems that can help with creative projects while maintaining human creativity.',
        learningObjectives: [
          'Explore how AI can enhance creativity',
          'Design AI tools for artists',
          'Balance AI assistance with human creativity',
          'Create ethical guidelines for AI in art'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Art Studio! 🎨',
              template: 'artistic',
              gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
              align: 'center',
              decoration: '🖼️'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to the AI Art Studio! 🎨

Today we're going to design AI systems that can be creative partners for artists!

**How can AI help with creativity?**
- Suggest color combinations
- Generate ideas for stories
- Help with repetitive drawing tasks
- Create music rhythms
- Mix different art styles

**Important Question:** Should AI replace human artists, or help them create even better art?

Let's design AI tools that make creativity MORE fun, not less human! 🚀`
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'You create an amazing painting with help from AI that suggests colors and shapes. Your friend asks if you made it yourself. What do you say?',
              choices: [
                'Yes, I made it completely by myself',
                'I made it with help from AI tools',
                'The AI made it, not me'
              ],
              correct: 1,
              principle: 'Always be honest about AI collaboration - it\'s still YOUR creativity!'
            }
          }
        ]
      }
    ],

    'ages-8-9': [
      {
        id: 'creativity-ai-helper-8-9',
        title: 'AI Creative Helpers',
        ageGroup: '8-9',
        subject: 'Creativity & AI Design',
        duration: 35,
        difficulty: 'beginner',
        description: 'Students explore how AI can be a creative helper for drawing, stories, and imagination.',
        learningObjectives: [
          'Understand how AI can help with creativity',
          'Use AI as a creative partner, not replacement',
          'Practice creative thinking with AI assistance',
          'Learn about human-AI collaboration'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Creative Friends! 🎨🤖',
              template: 'creative',
              gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
              align: 'center',
              decoration: '✨'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to AI Creative Friends! 🎨

Today we're learning how AI can help us be MORE creative!

**How can AI help with creativity?**
- 🎨 Suggest fun colors for drawings
- 📚 Help think of story ideas
- 🎵 Create background music
- 🖼️ Mix different art styles
- 💡 Give us new ideas when we're stuck

**Important:** AI doesn't replace YOUR creativity - it helps make your ideas even better!

Think of AI like a creative friend who gives you suggestions, but YOU decide what to make! 

Let's explore creative AI helpers! 🌟`
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'You\'re drawing a picture and feeling stuck. How can AI help?',
              type: 'multiple-choice',
              options: [
                'AI should draw the whole picture for me 🖼️',
                'AI can suggest colors or ideas, but I still create! 🎨',
                'AI should tell me exactly what to draw 📝',
                'I should stop drawing and let AI do it 🛑'
              ],
              correct: 1,
              explanation: 'Perfect! AI is best when it helps YOUR creativity grow, not when it replaces your ideas!',
              hint: 'Think about AI as a helpful friend, not a replacement!'
            }
          }
        ]
      }
    ],

    'ages-12-14': [
      {
        id: 'creativity-ai-design-thinking-12-14',
        title: 'AI-Powered Design Thinking',
        ageGroup: '12-14',
        subject: 'Creativity & AI Design',
        duration: 50,
        difficulty: 'advanced',
        description: 'Students use AI to enhance the design thinking process and create innovative solutions.',
        learningObjectives: [
          'Apply design thinking methodology with AI assistance',
          'Use AI for ideation and rapid prototyping',
          'Understand human-centered design in AI systems',
          'Create solutions that blend human creativity with AI capabilities'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Design Thinking Lab! 💡🚀',
              template: 'design-thinking',
              gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
              align: 'center',
              decoration: '🔬'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to the AI Design Thinking Lab! 💡

**Design Thinking + AI = Innovation Superpower!**

**The 5 Steps of Design Thinking:**
1. **🔍 Empathize** - Understand user needs (AI can analyze user feedback)
2. **🎯 Define** - Clarify the problem (AI can process large datasets)
3. **💡 Ideate** - Generate creative solutions (AI can suggest novel combinations)
4. **🛠️ Prototype** - Build quick versions (AI can rapid-prototype concepts)
5. **🧪 Test** - Get user feedback (AI can analyze responses at scale)

**AI Tools for Each Stage:**
- **Empathy**: AI sentiment analysis of user interviews
- **Definition**: AI pattern recognition in problem statements
- **Ideation**: AI-generated concept combinations and variations
- **Prototyping**: AI-assisted rapid wireframing and mockups
- **Testing**: AI analysis of user behavior and feedback

**Real Design Thinking + AI Examples:**
- 🏥 Designing better hospital apps using AI patient data analysis
- 🎮 Creating inclusive games with AI accessibility testing
- 🌱 Developing eco-friendly products with AI environmental impact modeling

Let's design the future with human creativity and AI power! 🌟`
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'You\'re using AI to help design a new social media app. The AI suggests features that would be highly addictive and keep users scrolling for hours. What\'s the ethical approach?',
              choices: [
                'Use the AI suggestions - they\'ll make the app more successful',
                'Reject the AI suggestions and focus on user wellbeing instead',
                'Use some suggestions but add features that promote healthy usage',
                'Let users decide if they want to use addictive features'
              ],
              correct: 2,
              explanation: 'Great ethical thinking! The best approach balances business success with user wellbeing, using AI responsibly.',
              principle: 'Design thinking with AI should always prioritize human wellbeing over pure engagement!'
            }
          }
        ]
      }
    ]
  },

  // ASSESSMENT & QUIZ TEMPLATES
  'assessment': {
    'ages-8-9': [
      {
        id: 'assessment-ai-knowledge-8-9',
        title: 'AI Knowledge Check for Young Learners',
        ageGroup: '8-9',
        subject: 'Assessment',
        duration: 25,
        difficulty: 'beginner',
        description: 'Fun, interactive assessment of basic AI concepts for young students.',
        learningObjectives: [
          'Review fundamental AI concepts',
          'Check understanding of AI in daily life',
          'Assess ethical thinking about AI',
          'Evaluate basic programming logic'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Knowledge Adventure! 🏆',
              template: 'assessment',
              gradient: 'linear-gradient(135deg, #4CAF50, #45a049)',
              align: 'center',
              decoration: '🎯'
            }
          },
          {
            type: 'text',
            content: {
              text: `Time for an AI Knowledge Adventure! 🏆

You've learned so much about artificial intelligence! Let's see what amazing knowledge you've gained.

This isn't a scary test - it's a fun way to show off what you know! 

**What we'll check:**
- 🤖 What is AI?
- 🔍 How does AI learn?
- 🌟 AI in real life
- 🎯 Making good choices with AI
- 💻 Basic programming ideas

Ready to show what an AI expert you've become? Let's go! 🚀`
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What is artificial intelligence (AI)?',
              type: 'multiple-choice',
              options: [
                'A robot that looks like a human 🤖',
                'Computer programs that can learn and make decisions 🧠',
                'A video game character 🎮',
                'A type of smartphone app 📱'
              ],
              correct: 1,
              explanation: 'Excellent! AI is about making computers smart enough to learn and solve problems!',
              hint: 'Think about what makes something "intelligent"!'
            }
          }
        ]
      }
    ],

    'ages-10-11': [
      {
        id: 'assessment-programming-logic-10-11',
        title: 'Programming Logic Assessment',
        ageGroup: '10-11',
        subject: 'Assessment',
        duration: 35,
        difficulty: 'intermediate',
        description: 'Comprehensive assessment of programming concepts and logical thinking skills.',
        learningObjectives: [
          'Evaluate understanding of programming fundamentals',
          'Assess logical problem-solving abilities',
          'Check comprehension of AI learning processes',
          'Review ethical decision-making skills'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'Programming Logic Challenge! 💻',
              template: 'programming-assessment',
              gradient: 'linear-gradient(135deg, #2196F3, #1976D2)',
              align: 'center',
              decoration: '⚡'
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What would this Python code print? \n\nfor i in range(3):\n    print("AI is cool!")',
              type: 'multiple-choice',
              options: [
                'AI is cool! (printed once)',
                'AI is cool! (printed three times)',
                'AI is cool! (printed forever)',
                'Nothing - there\'s an error'
              ],
              correct: 1,
              explanation: 'Perfect! The range(3) makes the loop run 3 times, printing the message each time.',
              hint: 'Count how many times the loop will run!'
            }
          }
        ]
      }
    ],

    'ages-12-14': [
      {
        id: 'assessment-comprehensive-ai-12-14',
        title: 'Comprehensive AI Literacy Assessment',
        ageGroup: '12-14',
        subject: 'Assessment',
        duration: 45,
        difficulty: 'advanced',
        description: 'Advanced assessment covering AI concepts, ethics, programming, and critical thinking.',
        learningObjectives: [
          'Demonstrate advanced AI concept understanding',
          'Apply computational thinking principles',
          'Analyze ethical implications of AI systems',
          'Evaluate real-world AI applications critically'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Mastery Assessment! 🎓',
              template: 'mastery-assessment',
              gradient: 'linear-gradient(135deg, #9C27B0, #7B1FA2)',
              align: 'center',
              decoration: '🏅'
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'A machine learning algorithm shows 95% accuracy on training data but only 60% accuracy on new, unseen data. This is most likely an example of:',
              type: 'multiple-choice',
              options: [
                'Perfect performance - 95% is excellent',
                'Overfitting - the model memorized training data',
                'Underfitting - the model is too simple',
                'Data corruption - the dataset is broken'
              ],
              correct: 1,
              explanation: 'Excellent analysis! This is classic overfitting - the model learned the training data too specifically and can\'t generalize to new examples.',
              hint: 'Think about the difference between memorizing and truly learning!'
            }
          }
        ]
      }
    ]
  },

  // AI COMPARISON & TOOLS
  'ai-tools': {
    'ages-8-9': [
      {
        id: 'ai-tools-introduction-8-9',
        title: 'Meet Different AI Friends!',
        ageGroup: '8-9',
        subject: 'AI Tools & Comparison',
        duration: 30,
        difficulty: 'beginner',
        description: 'Students discover different AI systems and learn how they respond differently to the same questions.',
        learningObjectives: [
          'Understand that different AIs have different personalities',
          'Learn that AIs can give different answers to the same question',
          'Practice asking questions to AI systems',
          'Recognize that all AIs are tools made by humans'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Friends Playground! 🤖🎪',
              template: 'ai-friends',
              gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
              align: 'center',
              decoration: '🎭'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to the AI Friends Playground! 🎪

Today we're going to meet different AI friends and see how they each have their own personality!

**What are AI Tools?**
AI tools are like different kinds of smart helpers! Just like how your friends might give you different advice about the same problem, different AIs give different answers too!

**Meet Your AI Friends:**
- 🤖 **Robot Buddy**: Loves facts and clear explanations
- 🔍 **Search Helper**: Great at finding information quickly  
- 🎨 **Creative Friend**: Amazing at stories and imagination

**Fun Fact:** Each AI was trained differently, so they think differently too!

Let's see how our AI friends respond to the same questions! 🌟`
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'If you ask two different AI friends "What\'s your favorite color?", what might happen?',
              type: 'multiple-choice',
              options: [
                'They will give exactly the same answer 📋',
                'They might give different answers because they think differently 🌈',
                'Only one AI will answer 🤐',
                'They will both say they don\'t know 🤷'
              ],
              correct: 1,
              explanation: 'Exactly! Different AIs have different ways of thinking, just like people do!',
              hint: 'Think about how your friends might give different answers to the same question!'
            }
          }
        ]
      }
    ],

    'ages-10-11': [
      {
        id: 'ai-tools-comparison-10-11',
        title: 'AI Systems Comparison Lab',
        ageGroup: '10-11',
        subject: 'AI Tools & Comparison',
        duration: 45,
        difficulty: 'intermediate',
        description: 'Students learn to compare different AI systems and understand their strengths and weaknesses.',
        learningObjectives: [
          'Compare responses from different AI systems',
          'Understand why AIs give different answers',
          'Learn about AI training and data differences',
          'Practice critical thinking about AI outputs'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Comparison Laboratory! 🔬⚡',
              template: 'ai-lab',
              gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
              align: 'center',
              decoration: '🧪'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to the AI Comparison Laboratory! 🔬

Today we're going to be AI researchers and discover how different AI systems work!

**Why Do AIs Give Different Answers?**
- **Different Training Data**: Each AI learned from different examples
- **Different Purposes**: Some AIs are built for creativity, others for facts
- **Different Algorithms**: Each AI uses different "thinking" methods
- **Different Companies**: Made by different teams with different goals

**What We'll Discover:**
- How response styles vary between AI systems
- Which AIs are better for different tasks
- Why the same question gets different answers
- How to choose the right AI for your needs

**Scientific Method:** We'll ask the same questions to different AIs and compare their responses like real researchers!

Ready to become an AI scientist? 🚀`
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'When comparing AI responses, what\'s the MOST important thing to remember?',
              type: 'multiple-choice',
              options: [
                'The longest answer is always the best 📏',
                'Different AIs have different strengths - compare and think critically 🧠',
                'The fastest AI is always right ⚡',
                'All AIs should give identical answers 📋'
              ],
              correct: 1,
              explanation: 'Perfect! Critical thinking is key - each AI has strengths and weaknesses for different tasks.',
              hint: 'Think about what makes a good answer, not just speed or length!'
            }
          }
        ]
      }
    ],

    'ages-12-14': [
      {
        id: 'ai-tools-analysis-12-14',
        title: 'Advanced AI Model Analysis',
        ageGroup: '12-14',
        subject: 'AI Tools & Comparison',
        duration: 55,
        difficulty: 'advanced',
        description: 'Students conduct detailed analysis of AI model differences, biases, and capabilities.',
        learningObjectives: [
          'Analyze AI model architectures and training methodologies',
          'Identify potential biases in different AI systems',
          'Evaluate AI responses for accuracy and usefulness',
          'Understand commercial and ethical implications of AI differences'
        ],
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Model Research Center! 🎓🔍',
              template: 'ai-research',
              gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
              align: 'center',
              decoration: '🏛️'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to the AI Model Research Center! 🎓

Today we're conducting advanced research into how different AI models work and why their outputs vary.

**Key Research Areas:**

**1. Training Data Differences**
- OpenAI: Trained on diverse internet text, optimized for helpfulness
- Google: Integrated with search data, focused on factual accuracy
- Anthropic: Trained with Constitutional AI for safety and honesty

**2. Model Architecture Variations**
- **Transformer Models**: Different sizes and parameter counts
- **Fine-tuning**: Specialized training for specific tasks
- **RLHF**: Reinforcement Learning from Human Feedback

**3. Commercial Considerations**
- **Business Models**: How companies monetize their AI
- **User Privacy**: How data is collected and used
- **API Limitations**: Rate limits, costs, availability

**4. Bias and Fairness Analysis**
- **Training Bias**: Biases in the data used to train models
- **Output Consistency**: How reliably models perform across demographics
- **Ethical Safeguards**: Built-in protections and limitations

**Research Method:** We'll use systematic prompting and comparative analysis to understand these differences.

Ready to become an AI researcher? 🔬`
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'When analyzing AI model outputs for research, which factor is MOST important to consider?',
              type: 'multiple-choice',
              options: [
                'Which AI responds fastest ⚡',
                'The context of training data, intended use case, and potential biases 🎯',
                'Which company made the AI 🏢',
                'The length of the response 📏'
              ],
              correct: 1,
              explanation: 'Excellent! Comprehensive analysis considers training context, intended applications, and potential biases rather than superficial metrics.',
              hint: 'Think about what affects the quality and reliability of AI outputs!'
            }
          }
        ]
      }
    ]
  },

  // COMPREHENSIVE WORKFLOW TEMPLATES - The core educational workflows
  'workflows': {
    'ages-8-9': [
      {
        id: 'storytelling-workflow-8-9',
        title: 'AI Storytelling Workshop',
        ageGroup: '8-9',
        subject: 'Creative Workflows',
        duration: 45,
        difficulty: 'beginner',
        description: 'Complete workflow for creating stories with AI assistance',
        learningObjectives: [
          'Learn story structure (beginning, middle, end)',
          'Use AI as a creative partner',
          'Develop character creation skills',
          'Practice narrative building',
          'Share and present stories'
        ],
        workflow: {
          type: 'guided-creation',
          stages: ['brainstorm', 'create', 'refine', 'share'],
          totalTime: 45,
          collaboration: true
        },
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Storytelling Workshop 📚✨',
              template: 'workshop-header',
              gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
              align: 'center',
              decoration: '🎭'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to our AI Storytelling Workshop! 🎭

Today we're going to create amazing stories together with our AI friends. Every great story has three parts:

**Beginning** 📖 - Where we meet the characters and learn about the setting
**Middle** 🎬 - Where exciting things happen and problems need solving  
**End** 🎉 - Where everything gets resolved and we learn something new

Our AI helper will give us ideas, but YOU are the storyteller! Ready to create something magical?`
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Story Brainstorming Station',
              prompt: 'Think of a character who discovers something magical. Describe your character in 2-3 sentences. What do they look like? What makes them special?',
              expectedLength: 'short',
              difficulty: 'beginner',
              hints: [
                'Your character could be a child, animal, or magical creature',
                'Think about what makes them unique or special',
                'Where do they live? What do they like to do?'
              ],
              aiAssistance: 'I can help you develop your character with questions and suggestions!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Setting Creation Workshop',
              prompt: 'Where does your story take place? Describe the magical place your character discovers. Use your imagination!',
              expectedLength: 'medium',
              difficulty: 'beginner',
              hints: [
                'Could be a magical forest, underwater city, or cloud castle',
                'What colors, sounds, and smells are there?',
                'What magical things happen in this place?'
              ],
              aiAssistance: 'I can suggest magical elements and help you describe the setting!'
            }
          },
          {
            type: 'text',
            content: {
              text: `🎯 **Story Building Challenge**

Now let's put it all together! We'll use the "Story Sandwich" method:

**🍞 Top Bread** - Introduction (Who? Where? When?)
**🥬 Lettuce** - Problem or Challenge appears  
**🍅 Tomato** - Character tries to solve it
**🧀 Cheese** - Things get more complicated
**🥩 Meat** - The big solution or discovery
**🍞 Bottom Bread** - Happy ending and what we learned

Ready to build your story sandwich? 🥪`
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Complete Story Creation',
              prompt: 'Write your complete story using the Story Sandwich method. Include your character, the magical setting, and an adventure that teaches us something important!',
              expectedLength: 'long',
              difficulty: 'beginner',
              hints: [
                'Start with your character in the normal world',
                'Have them discover the magical place',
                'Give them a problem to solve',
                'Show how they solve it creatively',
                'End with what they (and we) learned'
              ],
              aiAssistance: 'I can help with dialogue, descriptions, and making sure your story flows well!'
            }
          },
          {
            type: 'quiz',
            content: {
              question: 'What are the three main parts of every good story?',
              type: 'multiple-choice',
              options: [
                'Characters, Setting, Plot',
                'Beginning, Middle, End', 
                'Problem, Solution, Happy Ending',
                'Once Upon a Time, Adventure, The End'
              ],
              correct: 1,
              explanation: 'Great! Every story needs a beginning (setup), middle (adventure), and end (resolution)!'
            }
          }
        ]
      },

      {
        id: 'coding-adventure-workflow-8-9',
        title: 'Code Your First Game',
        ageGroup: '8-9',
        subject: 'Programming Workflows',
        duration: 60,
        difficulty: 'beginner',
        description: 'Complete workflow for creating a simple game with visual programming',
        learningObjectives: [
          'Understand basic programming concepts',
          'Create interactive game elements',
          'Learn debugging strategies',
          'Experience the full development cycle',
          'Share and play games with others'
        ],
        workflow: {
          type: 'project-based',
          stages: ['plan', 'build', 'test', 'improve', 'share'],
          totalTime: 60,
          hands_on: true
        },
        elements: [
          {
            type: 'title',
            content: {
              text: 'Code Your First Game! 🎮',
              template: 'game-header',
              gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
              align: 'center',
              decoration: '🕹️'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to Game Development 101! 🎮

Today you'll create your very own game! We'll build it step by step, just like professional game developers do.

**Our Game Development Process:**
1. 📋 **Plan** - What will our game do?
2. 🔨 **Build** - Create the game piece by piece  
3. 🧪 **Test** - Play it and find bugs
4. ⚡ **Improve** - Make it even better
5. 🎉 **Share** - Let others play your creation!

Let's start by planning our amazing game! 🚀`
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Game Design Workshop',
              prompt: 'Design your game! What type of game do you want to make? Describe the main character, what they do, and how players win.',
              expectedLength: 'medium',
              difficulty: 'beginner',
              hints: [
                'Could be a catching game, jumping game, or puzzle game',
                'Think about what makes games fun to play',
                'What does the player need to do to win?'
              ],
              aiAssistance: 'I can help you refine your game idea and suggest fun mechanics!'
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Game Character Creator',
              description: 'Let\'s code your game character and make them move!',
              code: `# Game Character Creator
import turtle
import random

# Set up our game screen
screen = turtle.Screen()
screen.bgcolor("lightblue")
screen.title("My First Game!")
screen.setup(600, 600)

# Create our main character
player = turtle.Turtle()
player.shape("turtle")
player.color("green")
player.speed(0)

# Functions to move our character
def move_up():
    y = player.ycor()
    if y < 280:  # Don't go off screen
        player.sety(y + 20)

def move_down():
    y = player.ycor()
    if y > -280:  # Don't go off screen
        player.sety(y - 20)

def move_left():
    x = player.xcor()
    if x > -280:  # Don't go off screen
        player.setx(x - 20)

def move_right():
    x = player.xcor()
    if x < 280:  # Don't go off screen
        player.setx(x + 20)

# Connect keyboard to our character
screen.onkey(move_up, "Up")
screen.onkey(move_down, "Down") 
screen.onkey(move_left, "Left")
screen.onkey(move_right, "Right")
screen.listen()

print("🎮 Use arrow keys to move your character!")
print("Press any key to start playing!")

# Keep the game running
screen.mainloop()`,
              explanation: 'This creates a character you can move with arrow keys! Try changing the colors and shapes.',
              gamificationTriggers: ['first_game', 'character_creator'],
              editableAreas: ['player.color("green")', 'player.shape("turtle")']
            }
          },
          {
            type: 'python-playground',
            content: {
              title: 'Add Game Objects',
              description: 'Let\'s add things for your character to collect!',
              code: `# Add collectible items to our game
import turtle
import random

# ... (previous character code) ...

# Create collectible items
treasures = []

def create_treasure():
    treasure = turtle.Turtle()
    treasure.shape("circle")
    treasure.color("gold")
    treasure.speed(0)
    # Place treasure at random location
    x = random.randint(-250, 250)
    y = random.randint(-250, 250)
    treasure.goto(x, y)
    treasures.append(treasure)
    return treasure

# Create 5 treasures to collect
for i in range(5):
    create_treasure()

# Score keeping
score = 0
score_display = turtle.Turtle()
score_display.hideturtle()
score_display.goto(-280, 260)
score_display.write(f"Score: {score}", font=("Arial", 16, "bold"))

def check_collision():
    global score
    for treasure in treasures:
        if player.distance(treasure) < 20:
            # Player collected a treasure!
            score += 10
            treasure.goto(1000, 1000)  # Hide the treasure
            score_display.clear()
            score_display.write(f"Score: {score}", font=("Arial", 16, "bold"))
            
            if score >= 50:
                score_display.goto(0, 0)
                score_display.write("YOU WIN! 🏆", align="center", font=("Arial", 24, "bold"))

# Check for collisions continuously
def game_loop():
    check_collision()
    screen.ontimer(game_loop, 100)  # Check every 100ms

game_loop()
print("🏆 Collect all the gold circles to win!")`,
              explanation: 'Now your character can collect treasure! Move around and touch the gold circles.',
              gamificationTriggers: ['treasure_hunter', 'game_mechanic'],
              editableAreas: ['treasure.color("gold")', 'score += 10']
            }
          }
        ]
      }
    ],

    'ages-10-11': [
      {
        id: 'ai-research-workflow-10-11',
        title: 'AI Research Project Workflow',
        ageGroup: '10-11',
        subject: 'Research Workflows',
        duration: 75,
        difficulty: 'intermediate',
        description: 'Complete workflow for conducting AI-assisted research projects',
        learningObjectives: [
          'Learn structured research methodology',
          'Use AI tools for information gathering',
          'Develop critical thinking skills',
          'Create professional presentations',
          'Practice citation and source evaluation'
        ],
        workflow: {
          type: 'research-project',
          stages: ['question', 'research', 'analyze', 'create', 'present'],
          totalTime: 75,
          collaborative: true,
          assessment: 'portfolio-based'
        },
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Research Project Workflow 🔬',
              template: 'research-header',
              gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
              align: 'center',
              decoration: '📊'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to the AI Research Lab! 🔬

Today we'll conduct a real research project using AI tools and scientific methods. Just like professional researchers, we'll follow a systematic process:

**The Research Cycle:**
🤔 **Question** - What do we want to know?
📚 **Research** - Gather information from reliable sources
🔍 **Analyze** - Look for patterns and draw conclusions  
📊 **Create** - Present our findings clearly
🎤 **Present** - Share our discoveries with others

**Research Topic Options:**
- How AI is helping protect endangered animals
- AI in space exploration and discovery
- How AI assistants help people with disabilities
- AI in weather prediction and climate science

Ready to become a research scientist? 🚀`
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Research Question Development',
              prompt: 'Choose a research topic and develop 3 specific questions you want to answer. Make sure your questions can be researched and answered with evidence.',
              expectedLength: 'medium',
              difficulty: 'intermediate',
              hints: [
                'Good research questions start with "How," "Why," or "What"',
                'Make sure you can find information to answer your questions',
                'Think about what would be interesting to your classmates'
              ],
              aiAssistance: 'I can help you refine your questions and suggest research approaches!'
            }
          },
          {
            type: 'text',
            content: {
              text: `📚 **Research Strategy Workshop**

Now let's plan our research approach! Professional researchers use multiple sources and verify their information.

**Reliable Sources Checklist:**
✅ **Educational websites** (.edu domains)  
✅ **Science museums and institutions**
✅ **Peer-reviewed articles** (simplified versions)
✅ **Government science agencies** (NASA, NOAA, etc.)
✅ **Reputable news sources** with citations

**Red Flags to Avoid:**
❌ Sources without author information
❌ Websites trying to sell something  
❌ Information without citations
❌ Claims that seem too amazing to be true

**AI Research Assistant Rules:**
✓ Use AI to help find sources and explain complex topics
✓ Always verify AI information with reliable sources
✓ Cite both AI assistance and original sources
✓ Think critically about all information`
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Source Evaluation Exercise',
              prompt: 'Find 3 reliable sources for your research questions. For each source, explain why it\'s trustworthy and what information it provides.',
              expectedLength: 'long',
              difficulty: 'intermediate',
              hints: [
                'Look for author credentials and publication dates',
                'Check if other reliable sources say similar things',
                'Note any potential bias or limitations'
              ],
              aiAssistance: 'I can help you evaluate sources and find additional reliable information!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Data Analysis Workshop',
              prompt: 'Analyze the information you\'ve gathered. What patterns do you see? What conclusions can you draw? What questions do you still have?',
              expectedLength: 'long',
              difficulty: 'intermediate',
              hints: [
                'Look for common themes across your sources',
                'Identify any conflicting information and investigate why',
                'Think about what your findings mean for the future'
              ],
              aiAssistance: 'I can help you organize your findings and identify important patterns!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Research Presentation Creator',
              prompt: 'Create a presentation of your research findings. Include your questions, methods, discoveries, and conclusions. Make it engaging for your audience!',
              expectedLength: 'long',
              difficulty: 'intermediate',
              hints: [
                'Use visuals, charts, or diagrams to show your data',
                'Tell a story with your research - what did you discover?',
                'Include a "future research" section with new questions'
              ],
              aiAssistance: 'I can help you organize your presentation and suggest engaging ways to share your findings!'
            }
          }
        ]
      },

      {
        id: 'design-thinking-workflow-10-11',
        title: 'Design Thinking Innovation Lab',
        ageGroup: '10-11',
        subject: 'Innovation Workflows',
        duration: 90,
        difficulty: 'intermediate',
        description: 'Complete design thinking workflow for solving real-world problems',
        learningObjectives: [
          'Master the design thinking process',
          'Develop empathy and user research skills',
          'Learn rapid prototyping techniques',
          'Practice iterative improvement',
          'Create solutions for real problems'
        ],
        workflow: {
          type: 'design-thinking',
          stages: ['empathize', 'define', 'ideate', 'prototype', 'test'],
          totalTime: 90,
          team_based: true,
          real_world_application: true
        },
        elements: [
          {
            type: 'title',
            content: {
              text: 'Design Thinking Innovation Lab 💡',
              template: 'innovation-header',
              gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
              align: 'center',
              decoration: '🚀'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to the Innovation Lab! 💡

Today we'll use Design Thinking - the same process used by companies like Apple, Google, and IDEO to solve complex problems and create amazing products.

**The Design Thinking Process:**

🤝 **EMPATHIZE** - Understand people's needs and challenges
🎯 **DEFINE** - Clearly state the problem we're solving  
💡 **IDEATE** - Generate lots of creative solutions
🛠️ **PROTOTYPE** - Build quick, testable versions
🧪 **TEST** - Get feedback and improve our solution

**Today's Challenge:**
Help your school become more environmentally friendly! We'll design solutions that students, teachers, and families can actually use.

Ready to become innovation designers? 🚀`
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Empathy Interviews',
              prompt: 'Interview 3 people (classmates, family, teachers) about environmental challenges at school. What problems do they see? What do they wish was different?',
              expectedLength: 'long',
              difficulty: 'intermediate',
              hints: [
                'Ask open-ended questions like "Tell me about..." or "How do you feel when..."',
                'Listen for emotions and frustrations, not just facts',
                'Ask follow-up questions to understand deeper needs'
              ],
              aiAssistance: 'I can help you prepare interview questions and analyze responses for insights!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Problem Definition Workshop',
              prompt: 'Based on your interviews, define ONE specific environmental problem at school. Write it as: "How might we help [specific people] [achieve specific goal] [in specific context]?"',
              expectedLength: 'short',
              difficulty: 'intermediate',
              hints: [
                'Example: "How might we help cafeteria staff reduce food waste during lunch?"',
                'Focus on one specific problem, not everything at once',
                'Make sure the problem affects real people you interviewed'
              ],
              aiAssistance: 'I can help you refine your problem statement to be specific and actionable!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Rapid Ideation Session',
              prompt: 'Generate 10 different solution ideas for your problem. Go for quantity over quality - wild and crazy ideas welcome!',
              expectedLength: 'medium',
              difficulty: 'intermediate',
              hints: [
                'Set a timer for 10 minutes and brainstorm rapidly',
                'Build on others\' ideas with "Yes, and..."',
                'No criticism allowed - evaluation comes later'
              ],
              aiAssistance: 'I can suggest additional ideas and help you think outside the box!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Prototype Design Challenge',
              prompt: 'Choose your best solution idea and describe how you would build a simple prototype to test it. What materials would you need? How would you test if it works?',
              expectedLength: 'long',
              difficulty: 'intermediate',
              hints: [
                'Think "minimum viable prototype" - simplest version that tests your idea',
                'Could be a drawing, cardboard model, simple app mockup, or role-play',
                'Focus on testing the core assumption of your solution'
              ],
              aiAssistance: 'I can suggest prototyping methods and help you plan your testing approach!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Testing and Iteration Plan',
              prompt: 'Describe how you would test your prototype with real users. What questions would you ask? How would you improve it based on feedback?',
              expectedLength: 'medium',
              difficulty: 'intermediate',
              hints: [
                'Test with the same people you interviewed initially',
                'Watch what they do, not just what they say',
                'Be prepared to change or even abandon your solution'
              ],
              aiAssistance: 'I can help you design user tests and prepare for iteration!'
            }
          }
        ]
      }
    ],

    'ages-12-14': [
      {
        id: 'entrepreneurship-workflow-12-14',
        title: 'AI Startup Incubator',
        ageGroup: '12-14',
        subject: 'Entrepreneurship Workflows',
        duration: 120,
        difficulty: 'advanced',
        description: 'Complete workflow for developing AI-powered business concepts',
        learningObjectives: [
          'Understand startup methodology and business models',
          'Develop market research and validation skills',
          'Create business plans and pitch presentations',
          'Learn about AI ethics in business applications',
          'Practice investor presentations and feedback incorporation'
        ],
        workflow: {
          type: 'entrepreneurship',
          stages: ['opportunity', 'validation', 'business-model', 'prototype', 'pitch'],
          totalTime: 120,
          real_world_mentorship: true,
          presentation_component: true
        },
        elements: [
          {
            type: 'title',
            content: {
              text: 'AI Startup Incubator 🚀',
              template: 'startup-header',
              gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
              align: 'center',
              decoration: '💼'
            }
          },
          {
            type: 'text',
            content: {
              text: `Welcome to the AI Startup Incubator! 🚀

Today you'll develop a real business concept using AI technology. We'll follow the same process used by successful startups like OpenAI, DeepMind, and thousands of AI companies worldwide.

**The Startup Development Process:**

🔍 **Opportunity Discovery** - Find problems worth solving
✅ **Market Validation** - Prove people actually want your solution  
📋 **Business Model** - Figure out how to create and capture value
🛠️ **MVP Development** - Build a minimum viable product
🎤 **Investor Pitch** - Present your vision to potential supporters

**AI Application Areas:**
- Healthcare and medical diagnosis
- Education and personalized learning  
- Environmental monitoring and protection
- Accessibility and assistive technology
- Creative tools and content generation
- Agriculture and food security

**Key Questions We'll Answer:**
- What problem are you solving?
- Who desperately needs this solution?
- How does AI make your solution uniquely powerful?
- How will you build a sustainable business?

Ready to build the next big AI company? 💡`
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Opportunity Discovery Workshop',
              prompt: 'Identify a specific problem that affects real people and could be solved with AI technology. Research the problem thoroughly - who experiences it, how often, and what current solutions exist?',
              expectedLength: 'long',
              difficulty: 'advanced',
              hints: [
                'Focus on problems you or people you know actually experience',
                'Research market size - how many people have this problem?',
                'Analyze existing solutions and their limitations',
                'Consider why AI specifically could solve this better'
              ],
              aiAssistance: 'I can help you research market data, analyze competitors, and refine your opportunity!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Customer Discovery Interviews',
              prompt: 'Conduct interviews with 5 potential customers who experience your identified problem. Document their pain points, current solutions, and willingness to pay for a better solution.',
              expectedLength: 'long',
              difficulty: 'advanced',
              hints: [
                'Ask about their current workflow and frustrations',
                'Understand the cost of the problem (time, money, opportunity)',
                'Validate that this is a priority problem for them',
                'Don\'t pitch your solution yet - just listen and learn'
              ],
              aiAssistance: 'I can help you design interview questions and analyze customer insights!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'AI Solution Architecture',
              prompt: 'Design your AI-powered solution. What type of AI will you use? How will it solve the customer problem better than existing alternatives? Create a technical overview that explains your approach.',
              expectedLength: 'long',
              difficulty: 'advanced',
              hints: [
                'Consider: machine learning, natural language processing, computer vision, etc.',
                'Explain how users will interact with your AI system',
                'Address potential limitations and ethical considerations',
                'Think about data requirements and privacy concerns'
              ],
              aiAssistance: 'I can help you understand different AI technologies and design your solution architecture!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Business Model Canvas',
              prompt: 'Create a complete business model for your AI startup. Include: value proposition, customer segments, revenue streams, key partnerships, cost structure, and competitive advantages.',
              expectedLength: 'long',
              difficulty: 'advanced',
              hints: [
                'Value Proposition: What unique value do you create?',
                'Revenue Model: How will you make money? (subscription, freemium, enterprise)',
                'Key Resources: What do you need to deliver your value?',
                'Customer Acquisition: How will you reach and acquire customers?'
              ],
              aiAssistance: 'I can help you develop each component of your business model and ensure it\'s comprehensive!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'MVP Development Plan',
              prompt: 'Design a minimum viable product (MVP) that tests your core hypothesis. What\'s the simplest version that proves your AI solution works and customers want it?',
              expectedLength: 'medium',
              difficulty: 'advanced',
              hints: [
                'Focus on core functionality that solves the main problem',
                'Consider: prototype app, AI demo, pilot program with real users',
                'Define success metrics - how will you know if it\'s working?',
                'Plan for rapid iteration based on user feedback'
              ],
              aiAssistance: 'I can help you prioritize features and design an effective MVP strategy!'
            }
          },
          {
            type: 'ai-prompt',
            content: {
              title: 'Investor Pitch Creation',
              prompt: 'Create a compelling investor pitch for your AI startup. Include: problem, solution, market opportunity, business model, competitive advantages, team, and funding requirements.',
              expectedLength: 'long',
              difficulty: 'advanced',
              hints: [
                'Start with a compelling problem statement that investors can relate to',
                'Demonstrate market opportunity with concrete data',
                'Show traction: customer interviews, early prototypes, pilot results',
                'Be clear about how much funding you need and how you\'ll use it'
              ],
              aiAssistance: 'I can help you structure your pitch and make it compelling for investors!'
            }
          },
          {
            type: 'ethics',
            content: {
              scenario: 'Your AI startup could make millions by selling user data to advertisers, but this wasn\'t disclosed in your privacy policy. The data would help improve ad targeting but users didn\'t explicitly consent to this use.',
              choices: [
                'Sell the data - it\'s technically legal and will fund company growth',
                'Ask users for explicit consent before any data use beyond core functionality',
                'Use aggregated, anonymized data only with clear user notification',
                'Never monetize user data - find alternative revenue streams'
              ],
              correct: 1,
              principle: 'Ethical AI businesses prioritize user trust and transparent data practices over short-term profits!'
            }
          }
        ]
      }
    ]
  }
};

// Helper functions for template management
export const getTemplatesByAge = (ageGroup) => {
  const templates = [];
  Object.keys(lessonTemplates).forEach(subject => {
    if (lessonTemplates[subject][ageGroup]) {
      templates.push(...lessonTemplates[subject][ageGroup]);
    }
  });
  return templates;
};

export const getTemplatesBySubject = (subject) => {
  return lessonTemplates[subject] || {};
};

export const getTemplateById = (templateId) => {
  for (const subject of Object.keys(lessonTemplates)) {
    for (const ageGroup of Object.keys(lessonTemplates[subject])) {
      const template = lessonTemplates[subject][ageGroup].find(t => t.id === templateId);
      if (template) return template;
    }
  }
  return null;
};

export const getAllTemplates = () => {
  const all = [];
  Object.keys(lessonTemplates).forEach(subject => {
    Object.keys(lessonTemplates[subject]).forEach(ageGroup => {
      all.push(...lessonTemplates[subject][ageGroup]);
    });
  });
  return all;
};

export default lessonTemplates;