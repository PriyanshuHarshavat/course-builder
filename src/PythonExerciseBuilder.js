import React, { useState } from 'react';
import styled from 'styled-components';
import { Brain, Play, Lightbulb, Target, Zap } from 'lucide-react';

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

const BuilderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
`;

const OptionGroup = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
`;

const OptionTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OptionGrid = styled.div`
  display: grid;
  gap: 10px;
`;

const OptionCard = styled.div`
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.selected ? 'rgba(255, 255, 255, 0.5)' : 'transparent'};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  .title {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 16px;
  }
  
  .description {
    font-size: 14px;
    opacity: 0.8;
  }
`;

const PreviewSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const PreviewTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CodePreview = styled.div`
  background: #1e1e1e;
  color: #d4d4d4;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  white-space: pre-wrap;
  margin-bottom: 15px;
  min-height: 120px;
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Exercise templates for different age groups and types
const exerciseTemplates = {
  'hello-world': {
    '8-9': {
      title: 'My First AI Program! 🤖',
      description: 'Create your very first program and say hello to the computer!',
      code: `# My First Program
print("Hello, World! 🌍")
print("My name is [YOUR NAME]")
print("I'm learning to code! 🚀")`,
      explanation: 'This is your first program! The print() command tells the computer to show words on the screen. Try changing [YOUR NAME] to your real name!',
      expectedOutput: `Hello, World! 🌍
My name is [YOUR NAME]
I'm learning to code! 🚀`,
      hints: [
        'Replace [YOUR NAME] with your actual name',
        'Try adding more print statements',
        'What happens if you add emojis?'
      ]
    },
    '10-11': {
      title: 'Hello World & Variables',
      description: 'Learn to store information in variables and display personalized messages',
      code: `# Hello World with Variables
name = "Alex"  # Change this to your name
age = 10       # Change this to your age

print(f"Hello! My name is {name}")
print(f"I am {age} years old")
print("I'm learning Python programming!")`,
      explanation: 'Variables are like containers that store information. The f-string (f"...") lets us put variable values inside our messages.',
      expectedOutput: `Hello! My name is Alex
I am 10 years old
I'm learning Python programming!`,
      hints: [
        'Change the name and age variables to match yours',
        'Try adding more variables like favorite_color',
        'What happens if you change the age to a different number?'
      ]
    },
    '12-14': {
      title: 'Interactive Hello World Program',
      description: 'Create a dynamic greeting program with user input and formatting',
      code: `# Interactive Hello World Program
def create_greeting():
    name = input("What's your name? ")
    age = int(input("How old are you? "))
    hobby = input("What's your favorite hobby? ")
    
    print("\\n" + "="*40)
    print(f"Welcome to Python, {name}!")
    print(f"Age: {age} years old")
    print(f"Hobby: {hobby}")
    print("="*40)
    
    if age < 13:
        print("You're a young programmer! 🌟")
    else:
        print("Great age to learn coding! 💻")

create_greeting()`,
      explanation: 'This program uses functions, user input, conditionals, and string formatting to create an interactive greeting experience.',
      expectedOutput: `What's your name? [User input]
How old are you? [User input]
What's your favorite hobby? [User input]

========================================
Welcome to Python, [Name]!
Age: [Age] years old
Hobby: [Hobby]
========================================
You're a young programmer! 🌟`,
      hints: [
        'Try running the program and entering different inputs',
        'Modify the age condition to customize messages',
        'Add more input questions and display them'
      ]
    }
  },
  'variables': {
    '8-9': {
      title: 'Magic Boxes (Variables) 📦',
      description: 'Learn how to store things in magic boxes called variables!',
      code: `# Magic Boxes (Variables)
my_name = "Sarah"
my_age = 8
favorite_color = "blue"
favorite_animal = "cat"

print("Let me tell you about myself:")
print("My name is", my_name)
print("I am", my_age, "years old")
print("My favorite color is", favorite_color)
print("My favorite animal is a", favorite_animal)`,
      explanation: 'Variables are like magic boxes where we can store information! We can put words (in quotes) or numbers in these boxes.',
      expectedOutput: `Let me tell you about myself:
My name is Sarah
I am 8 years old
My favorite color is blue
My favorite animal is a cat`,
      hints: [
        'Change the values to match your information',
        'Try adding a favorite_food variable',
        'What happens if you forget the quotes around words?'
      ]
    },
    '10-11': {
      title: 'Variable Math & Operations',
      description: 'Use variables to perform calculations and create dynamic content',
      code: `# Variable Math & Operations
# Personal info
name = "Jordan"
birth_year = 2013
current_year = 2024

# Calculations
age = current_year - birth_year
age_next_year = age + 1
age_in_10_years = age + 10

# Display results
print(f"Hi! I'm {name}")
print(f"I was born in {birth_year}")
print(f"I'm currently {age} years old")
print(f"Next year I'll be {age_next_year}")
print(f"In 10 years, I'll be {age_in_10_years}!")

# Fun with numbers
favorite_number = 7
doubled = favorite_number * 2
print(f"My favorite number is {favorite_number}")
print(f"Double my favorite number is {doubled}")`,
      explanation: 'Variables can store numbers and we can do math with them! Python can calculate ages, double numbers, and much more.',
      expectedOutput: `Hi! I'm Jordan
I was born in 2013
I'm currently 11 years old
Next year I'll be 12
In 10 years, I'll be 21!
My favorite number is 7
Double my favorite number is 14`,
      hints: [
        'Update birth_year to match when you were born',
        'Try different math operations like -, *, /',
        'Add more calculations like age_in_5_years'
      ]
    },
    '12-14': {
      title: 'Advanced Variable Management',
      description: 'Master different data types, type conversion, and variable scope',
      code: `# Advanced Variable Management
import math

# Different data types
name = "Alex"                    # String
age = 13                        # Integer
height = 5.2                    # Float
is_student = True               # Boolean
hobbies = ["coding", "gaming", "reading"]  # List

# Type conversions and calculations
age_str = str(age)
height_cm = height * 30.48      # Convert feet to cm
bmi_calculation = 65 / (height ** 2)  # Simple BMI example

# String manipulation
greeting = f"Hello, {name.upper()}!"
intro = f"I'm {age} years old and {height} feet tall"

# Display information
print("=== Personal Profile ===")
print(f"Name: {name} (Type: {type(name).__name__})")
print(f"Age: {age} (Type: {type(age).__name__})")
print(f"Height: {height} feet or {height_cm:.1f} cm")
print(f"Student: {is_student}")
print(f"Hobbies: {', '.join(hobbies)}")
print(f"\\n{greeting}")
print(intro)`,
      explanation: 'This exercise covers data types, type conversion, string methods, lists, and formatted output - essential variable concepts.',
      expectedOutput: `=== Personal Profile ===
Name: Alex (Type: str)
Age: 13 (Type: int)
Height: 5.2 feet or 158.5 cm
Student: True
Hobbies: coding, gaming, reading

Hello, ALEX!
I'm 13 years old and 5.2 feet tall`,
      hints: [
        'Experiment with different string methods like .lower(), .title()',
        'Try adding or removing items from the hobbies list',
        'Modify the calculations to create new derived values'
      ]
    }
  },
  'loops': {
    '8-9': {
      title: 'Counting Fun with Loops! 🔄',
      description: 'Make the computer count and repeat things automatically!',
      code: `# Counting Fun with Loops!
print("Let's count to 5!")
for number in range(1, 6):
    print(f"Count: {number} 🎈")

print("\\nLet's say hello 3 times!")
for i in range(3):
    print("Hello there! 👋")

print("\\nMy favorite animals:")
animals = ["cat", "dog", "rabbit", "bird"]
for animal in animals:
    print(f"I love {animal}s! 🐾")`,
      explanation: 'Loops make the computer repeat things automatically! Instead of writing the same code many times, we use loops to do it for us.',
      expectedOutput: `Let's count to 5!
Count: 1 🎈
Count: 2 🎈
Count: 3 🎈
Count: 4 🎈
Count: 5 🎈

Let's say hello 3 times!
Hello there! 👋
Hello there! 👋
Hello there! 👋

My favorite animals:
I love cats! 🐾
I love dogs! 🐾
I love rabbits! 🐾
I love birds! 🐾`,
      hints: [
        'Try changing the numbers in range(1, 6) to count higher',
        'Add your own favorite animals to the list',
        'What happens if you change range(3) to range(5)?'
      ]
    },
    '10-11': {
      title: 'Loop Patterns & Lists',
      description: 'Create patterns and work with lists using different types of loops',
      code: `# Loop Patterns & Lists
print("=== Multiplication Table ===")
number = 5
for i in range(1, 11):
    result = number * i
    print(f"{number} x {i} = {result}")

print("\\n=== Fun Patterns ===")
for i in range(1, 6):
    stars = "*" * i
    print(f"Row {i}: {stars}")

print("\\n=== Processing a List ===")
scores = [85, 92, 78, 96, 88]
total = 0
for score in scores:
    total += score
    print(f"Score: {score}, Running total: {total}")

average = total / len(scores)
print(f"\\nFinal average: {average:.1f}")`,
      explanation: 'Loops can create patterns, process lists, and perform calculations. We can accumulate values and create visual patterns.',
      expectedOutput: `=== Multiplication Table ===
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50

=== Fun Patterns ===
Row 1: *
Row 2: **
Row 3: ***
Row 4: ****
Row 5: *****

=== Processing a List ===
Score: 85, Running total: 85
Score: 92, Running total: 177
Score: 78, Running total: 255
Score: 96, Running total: 351
Score: 88, Running total: 439

Final average: 87.8`,
      hints: [
        'Try changing the multiplication number from 5 to your age',
        'Modify the star pattern to use different symbols',
        'Add more scores to the list and see how the average changes'
      ]
    },
    '12-14': {
      title: 'Advanced Loop Control & Nested Loops',
      description: 'Master nested loops, break/continue statements, and complex iterations',
      code: `# Advanced Loop Control & Nested Loops
import random

print("=== Nested Loop Pattern ===")
for row in range(5):
    for col in range(row + 1):
        print("*", end=" ")
    print()  # New line after each row

print("\\n=== Number Guessing with Loop Control ===")
secret_number = random.randint(1, 10)
max_attempts = 3

print(f"Guess my number (1-10)! You have {max_attempts} attempts.")
for attempt in range(1, max_attempts + 1):
    # Simulate a guess (in real program, use input())
    guess = random.randint(1, 10)
    print(f"Attempt {attempt}: Guessing {guess}")
    
    if guess == secret_number:
        print(f"🎉 Correct! The number was {secret_number}")
        break
    elif guess < secret_number:
        print("Too low!")
    else:
        print("Too high!")
        
    if attempt == max_attempts:
        print(f"😔 Out of attempts! The number was {secret_number}")

print("\\n=== List Processing with Conditions ===")
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_sum = 0
odd_count = 0

for num in numbers:
    if num % 2 == 0:
        even_sum += num
        print(f"{num} is even (sum now: {even_sum})")
    else:
        odd_count += 1
        print(f"{num} is odd (count now: {odd_count})")

print(f"\\nResults: Even sum = {even_sum}, Odd count = {odd_count}")`,
      explanation: 'Advanced loops include nested loops for patterns, break/continue for control flow, and combining loops with conditionals for complex logic.',
      expectedOutput: `=== Nested Loop Pattern ===
* 
* * 
* * * 
* * * * 
* * * * * 

=== Number Guessing with Loop Control ===
Guess my number (1-10)! You have 3 attempts.
Attempt 1: Guessing 7
Too high!
Attempt 2: Guessing 3
Too low!
Attempt 3: Guessing 5
🎉 Correct! The number was 5

=== List Processing with Conditions ===
1 is odd (count now: 1)
2 is even (sum now: 2)
3 is odd (count now: 2)
4 is even (sum now: 6)
5 is odd (count now: 3)
6 is even (sum now: 12)
7 is odd (count now: 4)
8 is even (sum now: 20)
9 is odd (count now: 5)
10 is even (sum now: 30)

Results: Even sum = 30, Odd count = 5`,
      hints: [
        'Modify the nested loop to create different patterns',
        'Change the range for the guessing game',
        'Add more complex conditions to the number processing'
      ]
    }
  },
  'functions': {
    '8-9': {
      title: 'Magic Spells (Functions) ✨',
      description: 'Learn to create magic spells that do special tasks!',
      code: `# Magic Spells (Functions)
def say_hello(name):
    print(f"Hello {name}! Nice to meet you! 👋")

def make_happy_face():
    print("😊 😊 😊")
    print("Have a great day!")

def count_to_number(end_number):
    print(f"Counting to {end_number}:")
    for i in range(1, end_number + 1):
        print(f"{i}!", end=" ")
    print("Done! 🎉")

# Using our magic spells
print("=== Using Magic Spells ===")
say_hello("Emma")
make_happy_face()
count_to_number(5)

print("\\n=== More Magic! ===")
say_hello("Your Name")
count_to_number(3)`,
      explanation: 'Functions are like magic spells! Once you create them, you can use them over and over by just saying their name.',
      expectedOutput: `=== Using Magic Spells ===
Hello Emma! Nice to meet you! 👋
😊 😊 😊
Have a great day!
Counting to 5:
1! 2! 3! 4! 5! Done! 🎉

=== More Magic! ===
Hello Your Name! Nice to meet you! 👋
Counting to 3:
1! 2! 3! Done! 🎉`,
      hints: [
        'Try calling say_hello with your own name',
        'Change the numbers in count_to_number',
        'Create your own magic spell function!'
      ]
    },
    '10-11': {
      title: 'Function Calculator & Tools',
      description: 'Build useful functions that calculate and process information',
      code: `# Function Calculator & Tools
def calculate_area(length, width):
    area = length * width
    print(f"Rectangle: {length} x {width} = {area} square units")
    return area

def temperature_converter(celsius):
    fahrenheit = (celsius * 9/5) + 32
    print(f"{celsius}°C = {fahrenheit}°F")
    return fahrenheit

def grade_calculator(score):
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    elif score >= 60:
        grade = "D"
    else:
        grade = "F"
    
    print(f"Score {score} = Grade {grade}")
    return grade

# Using our calculator functions
print("=== Function Calculator ===")
room_area = calculate_area(12, 10)
print(f"Total area: {room_area} square feet\\n")

temp_f = temperature_converter(25)
print(f"Beach weather: {temp_f}°F\\n")

my_grade = grade_calculator(85)
print(f"My grade: {my_grade}\\n")

# Multiple calculations
print("=== Multiple Calculations ===")
for temp in [0, 20, 37, 100]:
    temperature_converter(temp)`,
      explanation: 'Functions can take information (parameters), do calculations, and give back results (return values). They make our code organized and reusable.',
      expectedOutput: `=== Function Calculator ===
Rectangle: 12 x 10 = 120 square units
Total area: 120 square feet

25°C = 77.0°F
Beach weather: 77.0°F

Score 85 = Grade B
My grade: B

=== Multiple Calculations ===
0°C = 32.0°F
20°C = 68.0°F
37°C = 98.6°F
100°C = 212.0°F`,
      hints: [
        'Try calculating the area of your room',
        'Convert your local temperature to Fahrenheit',
        'Test the grade calculator with different scores'
      ]
    },
    '12-14': {
      title: 'Advanced Function Concepts',
      description: 'Master function parameters, return values, and modular programming',
      code: `# Advanced Function Concepts
def analyze_numbers(numbers_list):
    """Analyze a list of numbers and return statistics"""
    if not numbers_list:
        return {"error": "Empty list provided"}
    
    total = sum(numbers_list)
    average = total / len(numbers_list)
    maximum = max(numbers_list)
    minimum = min(numbers_list)
    
    return {
        "total": total,
        "average": round(average, 2),
        "max": maximum,
        "min": minimum,
        "count": len(numbers_list)
    }

def create_password(length=8, include_numbers=True):
    """Generate a simple password with optional parameters"""
    import random
    import string
    
    chars = string.ascii_letters
    if include_numbers:
        chars += string.digits
    
    password = ''.join(random.choice(chars) for _ in range(length))
    strength = "Strong" if length >= 8 and include_numbers else "Weak"
    
    return password, strength

def fibonacci_sequence(n):
    """Generate fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    for i in range(2, n):
        next_num = sequence[i-1] + sequence[i-2]
        sequence.append(next_num)
    
    return sequence

# Demonstrate advanced functions
print("=== Number Analysis ===")
test_scores = [85, 92, 78, 96, 88, 91, 76]
stats = analyze_numbers(test_scores)
print(f"Scores: {test_scores}")
for key, value in stats.items():
    print(f"{key.title()}: {value}")

print("\\n=== Password Generator ===")
password1, strength1 = create_password()
password2, strength2 = create_password(12, True)
print(f"Default password: {password1} ({strength1})")
print(f"Strong password: {password2} ({strength2})")

print("\\n=== Fibonacci Sequence ===")
fib_10 = fibonacci_sequence(10)
print(f"First 10 Fibonacci numbers: {fib_10}")`,
      explanation: 'Advanced functions use docstrings, default parameters, multiple return values, and complex logic. They form the building blocks of larger programs.',
      expectedOutput: `=== Number Analysis ===
Scores: [85, 92, 78, 96, 88, 91, 76]
Total: 606
Average: 86.57
Max: 96
Min: 76
Count: 7

=== Password Generator ===
Default password: aB3kLm9X (Strong)
Strong password: pQ7rT2nM5wE8 (Strong)

=== Fibonacci Sequence ===
First 10 Fibonacci numbers: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
      hints: [
        'Try analyzing different sets of numbers',
        'Experiment with different password lengths',
        'Modify the fibonacci function to calculate more terms'
      ]
    }
  }
};

const ageGroups = [
  { id: '8-9', name: '8-9 Years', description: 'Elementary level with simple concepts and fun examples' },
  { id: '10-11', name: '10-11 Years', description: 'Intermediate level with more logic and problem-solving' },
  { id: '12-14', name: '12-14 Years', description: 'Advanced level with complex concepts and real applications' }
];

const exerciseTypes = [
  { id: 'hello-world', name: 'Hello World', description: 'First program and basic output' },
  { id: 'variables', name: 'Variables', description: 'Storing and using data' },
  { id: 'loops', name: 'Loops', description: 'Repeating actions and patterns' },
  { id: 'functions', name: 'Functions', description: 'Creating reusable code blocks' }
];

const PythonExerciseBuilder = ({ onGenerate, onClose }) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('10-11');
  const [selectedExerciseType, setSelectedExerciseType] = useState('hello-world');

  const currentTemplate = exerciseTemplates[selectedExerciseType]?.[selectedAgeGroup];

  const handleGenerate = () => {
    if (currentTemplate) {
      const pythonPlaygroundConfig = {
        title: currentTemplate.title,
        description: currentTemplate.description,
        code: currentTemplate.code,
        explanation: currentTemplate.explanation,
        expectedOutput: currentTemplate.expectedOutput,
        hints: currentTemplate.hints
      };
      
      onGenerate(pythonPlaygroundConfig);
    }
  };

  return (
    <BuilderContainer>
      <BuilderHeader>
        <h2>
          <Brain size={28} />
          Python Exercise Builder
        </h2>
        <p>Create age-appropriate Python exercises automatically</p>
      </BuilderHeader>

      <BuilderGrid>
        <OptionGroup>
          <OptionTitle>
            <Target size={20} />
            Age Group
          </OptionTitle>
          <OptionGrid>
            {ageGroups.map(group => (
              <OptionCard
                key={group.id}
                selected={selectedAgeGroup === group.id}
                onClick={() => setSelectedAgeGroup(group.id)}
              >
                <div className="title">{group.name}</div>
                <div className="description">{group.description}</div>
              </OptionCard>
            ))}
          </OptionGrid>
        </OptionGroup>

        <OptionGroup>
          <OptionTitle>
            <Lightbulb size={20} />
            Exercise Type
          </OptionTitle>
          <OptionGrid>
            {exerciseTypes.map(type => (
              <OptionCard
                key={type.id}
                selected={selectedExerciseType === type.id}
                onClick={() => setSelectedExerciseType(type.id)}
              >
                <div className="title">{type.name}</div>
                <div className="description">{type.description}</div>
              </OptionCard>
            ))}
          </OptionGrid>
        </OptionGroup>
      </BuilderGrid>

      {currentTemplate && (
        <PreviewSection>
          <PreviewTitle>
            <Play size={20} />
            Exercise Preview
          </PreviewTitle>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ fontSize: '18px' }}>{currentTemplate.title}</strong>
            <p style={{ margin: '5px 0', opacity: 0.9 }}>{currentTemplate.description}</p>
          </div>
          <CodePreview>{currentTemplate.code}</CodePreview>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            <strong>💡 Explanation:</strong> {currentTemplate.explanation}
          </div>
        </PreviewSection>
      )}

      <GenerateButton
        onClick={handleGenerate}
        disabled={!currentTemplate}
      >
        <Zap size={20} />
        Generate Python Exercise
      </GenerateButton>
    </BuilderContainer>
  );
};

export default PythonExerciseBuilder;