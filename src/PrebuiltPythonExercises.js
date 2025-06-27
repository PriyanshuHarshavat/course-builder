// Pre-built Python exercises library
export const pythonExercises = [
  // Basic Math Exercises (Ages 8-10)
  {
    id: 'math_addition_basic',
    title: 'Addition Practice',
    description: 'Learn to add numbers with Python',
    ageGroup: '8-9',
    difficulty: 'beginner',
    category: 'math',
    code: `# Addition Practice
# Let's learn to add numbers!

num1 = 5
num2 = 3
result = num1 + num2

print("Adding", num1, "and", num2)
print("The answer is:", result)

# Now try with your own numbers!
my_num1 = 7
my_num2 = 4
my_result = my_num1 + my_num2
print("My addition:", my_num1, "+", my_num2, "=", my_result)`,
    expectedOutput: `Adding 5 and 3
The answer is: 8
My addition: 7 + 4 = 11`,
    hints: [
      'Use the + symbol to add numbers',
      'Variables store numbers for us',
      'print() shows the result'
    ]
  },

  {
    id: 'math_subtraction_basic',
    title: 'Subtraction Fun',
    description: 'Practice subtraction with Python',
    ageGroup: '8-9',
    difficulty: 'beginner',
    category: 'math',
    code: `# Subtraction Practice
# Let's learn to subtract numbers!

big_number = 10
small_number = 3
difference = big_number - small_number

print("Starting with:", big_number)
print("Taking away:", small_number)
print("We have left:", difference)

# Your turn to try!
cookies = 12
eaten = 5
remaining = cookies - eaten
print("I had", cookies, "cookies")
print("I ate", eaten, "cookies")
print("I have", remaining, "cookies left")`,
    expectedOutput: `Starting with: 10
Taking away: 3
We have left: 7
I had 12 cookies
I ate 5 cookies
I have 7 cookies left`,
    hints: [
      'Use the - symbol to subtract',
      'The bigger number comes first',
      'Think about taking things away'
    ]
  },

  {
    id: 'math_multiplication_tables',
    title: 'Multiplication Tables',
    description: 'Create multiplication tables with Python',
    ageGroup: '10-11',
    difficulty: 'medium',
    category: 'math',
    code: `# Multiplication Tables
# Let's create a times table!

number = 5
print("Multiplication table for", number)
print("=" * 25)

for i in range(1, 11):
    result = number * i
    print(f"{number} x {i} = {result}")

print()
print("Now let's try with 7:")
for i in range(1, 6):
    result = 7 * i
    print(f"7 x {i} = {result}")`,
    expectedOutput: `Multiplication table for 5
=========================
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

Now let's try with 7:
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35`,
    hints: [
      'Use * for multiplication',
      'for loop repeats code',
      'range(1, 11) gives numbers 1 to 10'
    ]
  },

  // Text and String Exercises
  {
    id: 'text_hello_world',
    title: 'My First Program',
    description: 'Create your first Python program',
    ageGroup: '8-9',
    difficulty: 'beginner',
    category: 'text',
    code: `# My First Python Program
# Let's say hello to the world!

print("Hello, World!")
print("My name is Python")
print("I love to code!")

# Now let's personalize it
name = "Alex"
age = 9
print("Hi, I'm", name)
print("I am", age, "years old")
print("Nice to meet you!")`,
    expectedOutput: `Hello, World!
My name is Python
I love to code!
Hi, I'm Alex
I am 9 years old
Nice to meet you!`,
    hints: [
      'print() displays text on screen',
      'Use quotes around text',
      'Variables can store your information'
    ]
  },

  {
    id: 'text_story_creator',
    title: 'Story Creator',
    description: 'Build stories with Python variables',
    ageGroup: '10-11',
    difficulty: 'medium',
    category: 'text',
    code: `# Story Creator
# Let's create an adventure story!

hero = "brave knight"
monster = "friendly dragon"
treasure = "golden cookies"
place = "magical forest"

print("Once upon a time...")
print(f"A {hero} went to the {place}")
print(f"There, they met a {monster}")
print(f"Together, they found {treasure}")
print("And they all lived happily ever after!")

print()
print("Now let's create another story:")
hero2 = "clever robot"
monster2 = "silly alien"
treasure2 = "rainbow crystals"
place2 = "space station"

print(f"In a {place2}, a {hero2} discovered {monster2}")
print(f"They worked together to collect {treasure2}")
print("The end!")`,
    expectedOutput: `Once upon a time...
A brave knight went to the magical forest
There, they met a friendly dragon
Together, they found golden cookies
And they all lived happily ever after!

Now let's create another story:
In a space station, a clever robot discovered silly alien
They worked together to collect rainbow crystals
The end!`,
    hints: [
      'Variables store parts of your story',
      'f-strings help put variables in text',
      'Change variables to create new stories'
    ]
  },

  // Logic and Decision Making
  {
    id: 'logic_age_checker',
    title: 'Age Categories',
    description: 'Learn about if statements and decisions',
    ageGroup: '10-11',
    difficulty: 'medium',
    category: 'logic',
    code: `# Age Categories
# Let's categorize people by age!

age1 = 7
age2 = 12
age3 = 16

def check_age_category(age):
    if age <= 9:
        return "little kid"
    elif age <= 12:
        return "big kid"
    elif age <= 15:
        return "teenager"
    else:
        return "young adult"

print(f"Age {age1}: {check_age_category(age1)}")
print(f"Age {age2}: {check_age_category(age2)}")
print(f"Age {age3}: {check_age_category(age3)}")

# Test with your own age!
my_age = 10
category = check_age_category(my_age)
print(f"I am {my_age} years old, so I'm a {category}!")`,
    expectedOutput: `Age 7: little kid
Age 12: big kid
Age 16: young adult
I am 10 years old, so I'm a big kid!`,
    hints: [
      'if statements make decisions',
      'elif means "else if"',
      'Functions can be reused with different inputs'
    ]
  },

  {
    id: 'logic_number_guessing',
    title: 'Number Detective',
    description: 'Use logic to check numbers',
    ageGroup: '10-11',
    difficulty: 'medium',
    category: 'logic',
    code: `# Number Detective
# Let's check if numbers are even or odd!

def number_detective(num):
    if num % 2 == 0:
        print(f"{num} is EVEN")
    else:
        print(f"{num} is ODD")
    
    if num > 10:
        print(f"{num} is bigger than 10")
    elif num < 10:
        print(f"{num} is smaller than 10")
    else:
        print(f"{num} is exactly 10")
    
    print("-" * 15)

# Let's test some numbers!
numbers = [5, 8, 10, 13, 20]

for number in numbers:
    print(f"Investigating {number}:")
    number_detective(number)`,
    expectedOutput: `Investigating 5:
5 is ODD
5 is smaller than 10
---------------
Investigating 8:
8 is EVEN
8 is smaller than 10
---------------
Investigating 10:
10 is EVEN
10 is exactly 10
---------------
Investigating 13:
13 is ODD
13 is bigger than 10
---------------
Investigating 20:
20 is EVEN
20 is bigger than 10
---------------`,
    hints: [
      '% finds the remainder after division',
      'Even numbers divide by 2 evenly',
      'Functions help organize our code'
    ]
  },

  // Lists and Collections
  {
    id: 'lists_favorite_things',
    title: 'My Favorite Things',
    description: 'Work with lists of favorite items',
    ageGroup: '10-11',
    difficulty: 'medium',
    category: 'lists',
    code: `# My Favorite Things
# Let's organize our favorites in lists!

favorite_colors = ["blue", "green", "purple", "red"]
favorite_animals = ["cats", "dolphins", "pandas", "eagles"]
favorite_foods = ["pizza", "ice cream", "cookies", "apples"]

print("My Favorite Colors:")
for i, color in enumerate(favorite_colors, 1):
    print(f"{i}. {color}")

print("\nMy Favorite Animals:")
for i, animal in enumerate(favorite_animals, 1):
    print(f"{i}. {animal}")

print("\nMy Favorite Foods:")
for i, food in enumerate(favorite_foods, 1):
    print(f"{i}. {food}")

# Let's add something new!
favorite_colors.append("yellow")
print(f"\nI just discovered I also like: {favorite_colors[-1]}")
print(f"Now I have {len(favorite_colors)} favorite colors!")`,
    expectedOutput: `My Favorite Colors:
1. blue
2. green
3. purple
4. red

My Favorite Animals:
1. cats
2. dolphins
3. pandas
4. eagles

My Favorite Foods:
1. pizza
2. ice cream
3. cookies
4. apples

I just discovered I also like: yellow
Now I have 5 favorite colors!`,
    hints: [
      'Lists store multiple items',
      'enumerate() gives us numbers',
      'append() adds new items to lists'
    ]
  },

  // Functions and Problem Solving
  {
    id: 'functions_calculator',
    title: 'Simple Calculator',
    description: 'Build a calculator with functions',
    ageGroup: '12-13',
    difficulty: 'advanced',
    category: 'functions',
    code: `# Simple Calculator
# Let's build our own calculator!

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b != 0:
        return a / b
    else:
        return "Cannot divide by zero!"

# Let's test our calculator
x = 15
y = 3

print("=== MY CALCULATOR ===")
print(f"Numbers: {x} and {y}")
print(f"Addition: {x} + {y} = {add(x, y)}")
print(f"Subtraction: {x} - {y} = {subtract(x, y)}")
print(f"Multiplication: {x} × {y} = {multiply(x, y)}")
print(f"Division: {x} ÷ {y} = {divide(x, y)}")

# Test with different numbers
a, b = 20, 4
print(f"\nWith {a} and {b}:")
print(f"Sum: {add(a, b)}")
print(f"Product: {multiply(a, b)}")`,
    expectedOutput: `=== MY CALCULATOR ===
Numbers: 15 and 3
Addition: 15 + 3 = 18
Subtraction: 15 - 3 = 12
Multiplication: 15 × 3 = 45
Division: 15 ÷ 3 = 5.0

With 20 and 4:
Sum: 24
Product: 80`,
    hints: [
      'Functions make code reusable',
      'return sends results back',
      'Check for division by zero'
    ]
  },

  // Advanced Problem Solving
  {
    id: 'advanced_password_checker',
    title: 'Password Security',
    description: 'Check if passwords are strong enough',
    ageGroup: '12-13',
    difficulty: 'advanced',
    category: 'security',
    code: `# Password Security Checker
# Let's check if passwords are strong!

def check_password_strength(password):
    score = 0
    feedback = []
    
    # Check length
    if len(password) >= 8:
        score += 1
        feedback.append("✓ Good length (8+ characters)")
    else:
        feedback.append("✗ Too short (needs 8+ characters)")
    
    # Check for numbers
    if any(char.isdigit() for char in password):
        score += 1
        feedback.append("✓ Contains numbers")
    else:
        feedback.append("✗ Needs at least one number")
    
    # Check for uppercase
    if any(char.isupper() for char in password):
        score += 1
        feedback.append("✓ Has uppercase letters")
    else:
        feedback.append("✗ Needs uppercase letters")
    
    # Check for lowercase
    if any(char.islower() for char in password):
        score += 1
        feedback.append("✓ Has lowercase letters")
    else:
        feedback.append("✗ Needs lowercase letters")
    
    return score, feedback

# Test some passwords
passwords = ["weak", "Better123", "VeryStr0ng!", "mypassword"]

for pwd in passwords:
    print(f"Testing: '{pwd}'")
    score, feedback = check_password_strength(pwd)
    
    for comment in feedback:
        print(f"  {comment}")
    
    if score >= 3:
        print(f"  🛡️ STRONG password (Score: {score}/4)")
    else:
        print(f"  ⚠️ WEAK password (Score: {score}/4)")
    print("-" * 30)`,
    expectedOutput: `Testing: 'weak'
  ✗ Too short (needs 8+ characters)
  ✗ Needs at least one number
  ✗ Needs uppercase letters
  ✓ Has lowercase letters
  ⚠️ WEAK password (Score: 1/4)
------------------------------
Testing: 'Better123'
  ✓ Good length (8+ characters)
  ✓ Contains numbers
  ✓ Has uppercase letters
  ✓ Has lowercase letters
  🛡️ STRONG password (Score: 4/4)
------------------------------
Testing: 'VeryStr0ng!'
  ✓ Good length (8+ characters)
  ✓ Contains numbers
  ✓ Has uppercase letters
  ✓ Has lowercase letters
  🛡️ STRONG password (Score: 4/4)
------------------------------
Testing: 'mypassword'
  ✓ Good length (8+ characters)
  ✗ Needs at least one number
  ✗ Needs uppercase letters
  ✓ Has lowercase letters
  ⚠️ WEAK password (Score: 2/4)
------------------------------`,
    hints: [
      'Strong passwords have mixed characters',
      'any() checks if condition is true for any item',
      'String methods help check character types'
    ]
  }
];

// Organize exercises by category for easy browsing
export const exercisesByCategory = {
  math: pythonExercises.filter(ex => ex.category === 'math'),
  text: pythonExercises.filter(ex => ex.category === 'text'),
  logic: pythonExercises.filter(ex => ex.category === 'logic'),
  lists: pythonExercises.filter(ex => ex.category === 'lists'),
  functions: pythonExercises.filter(ex => ex.category === 'functions'),
  security: pythonExercises.filter(ex => ex.category === 'security')
};

// Organize exercises by age group
export const exercisesByAge = {
  '8-9': pythonExercises.filter(ex => ex.ageGroup === '8-9'),
  '10-11': pythonExercises.filter(ex => ex.ageGroup === '10-11'),
  '12-13': pythonExercises.filter(ex => ex.ageGroup === '12-13')
};

// Get exercises by difficulty
export const exercisesByDifficulty = {
  beginner: pythonExercises.filter(ex => ex.difficulty === 'beginner'),
  medium: pythonExercises.filter(ex => ex.difficulty === 'medium'),
  advanced: pythonExercises.filter(ex => ex.difficulty === 'advanced')
};