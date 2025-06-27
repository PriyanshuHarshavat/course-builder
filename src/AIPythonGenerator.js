import React, { useState } from 'react';
import styled from 'styled-components';
import { Brain, Zap, Wand2, Code, Target, Lightbulb } from 'lucide-react';

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

const CodePreview = styled.div`
  background: #1e1e1e;
  color: #d4d4d4;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  white-space: pre-wrap;
  margin-bottom: 15px;
  min-height: 150px;
  max-height: 300px;
  overflow-y: auto;
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

// AI-powered exercise generation functions
const parseNaturalLanguage = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Extract age information
  let ageGroup = '10-11'; // default
  if (lowerPrompt.includes('8') || lowerPrompt.includes('nine') || lowerPrompt.includes('elementary')) {
    ageGroup = '8-9';
  } else if (lowerPrompt.includes('12') || lowerPrompt.includes('13') || lowerPrompt.includes('14') || lowerPrompt.includes('teen')) {
    ageGroup = '12-14';
  }
  
  // Extract subject/topic
  let topic = 'math';
  if (lowerPrompt.includes('math') || lowerPrompt.includes('addition') || lowerPrompt.includes('subtraction') || 
      lowerPrompt.includes('multiplication') || lowerPrompt.includes('division')) {
    topic = 'math';
  } else if (lowerPrompt.includes('string') || lowerPrompt.includes('text') || lowerPrompt.includes('word')) {
    topic = 'strings';
  } else if (lowerPrompt.includes('list') || lowerPrompt.includes('array')) {
    topic = 'lists';
  } else if (lowerPrompt.includes('loop') || lowerPrompt.includes('repeat')) {
    topic = 'loops';
  }
  
  // Extract operation type
  let operation = 'addition';
  if (lowerPrompt.includes('division') || lowerPrompt.includes('divide')) {
    operation = 'division';
  } else if (lowerPrompt.includes('multiplication') || lowerPrompt.includes('multiply')) {
    operation = 'multiplication';
  } else if (lowerPrompt.includes('subtraction') || lowerPrompt.includes('subtract')) {
    operation = 'subtraction';
  }
  
  // Extract number range
  let maxNumber = 10;
  const numberMatches = prompt.match(/(\d+)/g);
  if (numberMatches) {
    const numbers = numberMatches.map(n => parseInt(n));
    maxNumber = Math.max(...numbers.filter(n => n <= 100)); // reasonable limit
  }
  
  return { ageGroup, topic, operation, maxNumber };
};

const generatePythonExercise = (prompt, ageGroup, difficulty) => {
  const parsed = parseNaturalLanguage(prompt);
  const { topic, operation, maxNumber } = parsed;
  const targetAge = ageGroup || parsed.ageGroup;
  
  // Age-appropriate code generation
  const exercises = {
    'math': {
      'division': {
        '8-9': () => ({
          title: `Fun Division Practice! 🎯`,
          description: `Let's practice division with numbers up to ${maxNumber}!`,
          code: `# Division Practice for Kids!
import random

print("🎯 Let's Practice Division! 🎯")
print("I'll give you some division problems to solve!")
print()

# Let's do 3 division problems
for problem_number in range(1, 4):
    # Create a division problem where the answer is a whole number
    answer = random.randint(1, ${Math.min(maxNumber, 5)})
    first_number = answer * random.randint(2, ${Math.min(maxNumber, 4)})
    second_number = first_number // answer
    
    print(f"Problem {problem_number}: {first_number} ÷ {second_number} = ?")
    
    # Show the answer
    result = first_number // second_number
    print(f"Answer: {result} ✅")
    print()

print("Great job practicing division! 🌟")
print("Division helps us share things equally!")`,
          explanation: 'This program creates division problems where the answers are whole numbers, perfect for kids learning division!',
          expectedOutput: `🎯 Let's Practice Division! 🎯
I'll give you some division problems to solve!

Problem 1: 12 ÷ 4 = ?
Answer: 3 ✅

Problem 2: 15 ÷ 5 = ?
Answer: 3 ✅

Problem 3: 8 ÷ 2 = ?
Answer: 4 ✅

Great job practicing division! 🌟
Division helps us share things equally!`,
          hints: [
            'Try changing the range numbers to make harder problems',
            'Can you add more problems by changing range(1, 4) to range(1, 6)?',
            'What happens if you change the emoji decorations?'
          ]
        }),
        '10-11': () => ({
          title: `Interactive Division Calculator`,
          description: `Build a division calculator that checks your answers!`,
          code: `# Interactive Division Calculator
import random

def create_division_problem():
    """Create a division problem with whole number answer"""
    answer = random.randint(1, ${Math.min(maxNumber, 8)})
    divisor = random.randint(2, ${Math.min(maxNumber, 6)})
    dividend = answer * divisor
    return dividend, divisor, answer

def check_answer(dividend, divisor, user_answer, correct_answer):
    """Check if the user's answer is correct"""
    if user_answer == correct_answer:
        print(f"🎉 Correct! {dividend} ÷ {divisor} = {correct_answer}")
        return True
    else:
        print(f"❌ Not quite. {dividend} ÷ {divisor} = {correct_answer}")
        return False

# Main program
print("🧮 Division Practice Calculator 🧮")
print("Solve these division problems!")
print()

score = 0
total_problems = 5

for problem in range(1, total_problems + 1):
    dividend, divisor, correct_answer = create_division_problem()
    
    print(f"Problem {problem}: {dividend} ÷ {divisor} = ?")
    
    # In a real program, you'd use input() here
    # For this demo, we'll simulate different answers
    user_answer = correct_answer if problem <= 3 else correct_answer + 1
    
    if check_answer(dividend, divisor, user_answer, correct_answer):
        score += 1
    
    print()

print(f"Final Score: {score}/{total_problems}")
if score >= 4:
    print("Excellent work! 🏆")
elif score >= 2:
    print("Good job! Keep practicing! 💪")
else:
    print("Keep trying! Practice makes perfect! 📚")`,
          explanation: 'This interactive calculator creates division problems and tracks your score, using functions to organize the code.',
          expectedOutput: `🧮 Division Practice Calculator 🧮
Solve these division problems!

Problem 1: 24 ÷ 6 = ?
🎉 Correct! 24 ÷ 6 = 4

Problem 2: 15 ÷ 3 = ?
🎉 Correct! 15 ÷ 3 = 5

Problem 3: 18 ÷ 2 = ?
🎉 Correct! 18 ÷ 2 = 9

Problem 4: 21 ÷ 7 = ?
❌ Not quite. 21 ÷ 7 = 3

Problem 5: 16 ÷ 4 = ?
❌ Not quite. 16 ÷ 4 = 4

Final Score: 3/5
Good job! Keep practicing! 💪`,
          hints: [
            'Try modifying the score thresholds for different encouragement messages',
            'Add more problems by changing total_problems',
            'Can you add a timer to make it more challenging?'
          ]
        }),
        '12-14': () => ({
          title: `Advanced Division Calculator with Statistics`,
          description: `Create a comprehensive division practice tool with detailed analytics`,
          code: `# Advanced Division Calculator with Statistics
import random
import time
from datetime import datetime

class DivisionTrainer:
    def __init__(self, max_number=${maxNumber}):
        self.max_number = max_number
        self.problems_solved = []
        self.start_time = None
        
    def generate_problem(self, difficulty='medium'):
        """Generate division problems based on difficulty"""
        if difficulty == 'easy':
            answer = random.randint(1, 5)
            divisor = random.randint(2, 4)
        elif difficulty == 'medium':
            answer = random.randint(1, self.max_number)
            divisor = random.randint(2, 6)
        else:  # hard
            answer = random.randint(1, self.max_number * 2)
            divisor = random.randint(2, 8)
            
        dividend = answer * divisor
        return dividend, divisor, answer
    
    def solve_problem(self, dividend, divisor, user_answer):
        """Record problem attempt and return if correct"""
        correct_answer = dividend // divisor
        is_correct = user_answer == correct_answer
        
        problem_data = {
            'dividend': dividend,
            'divisor': divisor,
            'correct_answer': correct_answer,
            'user_answer': user_answer,
            'is_correct': is_correct,
            'timestamp': datetime.now()
        }
        
        self.problems_solved.append(problem_data)
        return is_correct, correct_answer
    
    def get_statistics(self):
        """Calculate performance statistics"""
        if not self.problems_solved:
            return None
            
        total = len(self.problems_solved)
        correct = sum(1 for p in self.problems_solved if p['is_correct'])
        accuracy = (correct / total) * 100
        
        return {
            'total_problems': total,
            'correct_answers': correct,
            'accuracy': accuracy,
            'improvement_areas': self.analyze_mistakes()
        }
    
    def analyze_mistakes(self):
        """Analyze common mistake patterns"""
        mistakes = [p for p in self.problems_solved if not p['is_correct']]
        if not mistakes:
            return "No mistakes - perfect performance!"
            
        # Analyze patterns in mistakes
        large_numbers = sum(1 for m in mistakes if m['dividend'] > 50)
        small_divisors = sum(1 for m in mistakes if m['divisor'] <= 3)
        
        analysis = []
        if large_numbers > len(mistakes) / 2:
            analysis.append("Practice with larger numbers")
        if small_divisors > len(mistakes) / 2:
            analysis.append("Focus on small divisor problems")
            
        return analysis if analysis else ["Keep practicing for improvement"]

# Demo the trainer
trainer = DivisionTrainer(max_number=${maxNumber})

print("🏆 Advanced Division Trainer 🏆")
print("This tool tracks your progress and helps you improve!")
print()

# Simulate a practice session
difficulties = ['easy', 'medium', 'medium', 'hard', 'medium']
for i, difficulty in enumerate(difficulties, 1):
    dividend, divisor, correct_answer = trainer.generate_problem(difficulty)
    
    print(f"Problem {i} ({difficulty}): {dividend} ÷ {divisor} = ?")
    
    # Simulate user answers (mix of correct and incorrect)
    if i <= 3:
        user_answer = correct_answer
    else:
        user_answer = correct_answer + random.randint(-2, 2)
    
    is_correct, correct = trainer.solve_problem(dividend, divisor, user_answer)
    
    if is_correct:
        print(f"✅ Correct! The answer is {correct}")
    else:
        print(f"❌ Incorrect. The correct answer is {correct}")
    print()

# Show statistics
stats = trainer.get_statistics()
print("📊 Your Performance Statistics:")
print(f"Problems solved: {stats['total_problems']}")
print(f"Correct answers: {stats['correct_answers']}")
print(f"Accuracy: {stats['accuracy']:.1f}%")
print(f"Areas to work on: {', '.join(stats['improvement_areas'])}")`,
          explanation: 'This advanced calculator uses object-oriented programming, tracks performance statistics, and provides personalized feedback for improvement.',
          expectedOutput: `🏆 Advanced Division Trainer 🏆
This tool tracks your progress and helps you improve!

Problem 1 (easy): 12 ÷ 3 = ?
✅ Correct! The answer is 4

Problem 2 (medium): 35 ÷ 5 = ?
✅ Correct! The answer is 7

Problem 3 (medium): 48 ÷ 6 = ?
✅ Correct! The answer is 8

Problem 4 (hard): 72 ÷ 8 = ?
❌ Incorrect. The correct answer is 9

Problem 5 (medium): 42 ÷ 7 = ?
❌ Incorrect. The correct answer is 6

📊 Your Performance Statistics:
Problems solved: 5
Correct answers: 3
Accuracy: 60.0%
Areas to work on: Keep practicing for improvement`,
          hints: [
            'Modify the difficulty levels to customize problem complexity',
            'Add more sophisticated mistake analysis patterns',
            'Try implementing a GUI version using tkinter'
          ]
        })
      },
      'multiplication': {
        '8-9': () => ({
          title: `Fun Multiplication Practice! ✖️`,
          description: `Let's practice multiplication with numbers up to ${maxNumber}!`,
          code: `# Multiplication Practice for Kids!
import random

print("✖️ Let's Practice Multiplication! ✖️")
print("I'll give you some multiplication problems to solve!")
print()

# Let's do 3 multiplication problems
for problem_number in range(1, 4):
    # Create multiplication problems with small numbers
    first_number = random.randint(1, ${Math.min(maxNumber, 5)})
    second_number = random.randint(1, ${Math.min(maxNumber, 4)})
    
    print(f"Problem {problem_number}: {first_number} × {second_number} = ?")
    
    # Show the answer
    result = first_number * second_number
    print(f"Answer: {result} ✅")
    print()

print("Great job practicing multiplication! 🌟")
print("Multiplication helps us count groups of things!")`,
          explanation: 'This program creates multiplication problems with small numbers, perfect for kids learning their times tables!',
          expectedOutput: `✖️ Let's Practice Multiplication! ✖️
I'll give you some multiplication problems to solve!

Problem 1: 3 × 4 = ?
Answer: 12 ✅

Problem 2: 2 × 5 = ?
Answer: 10 ✅

Problem 3: 4 × 3 = ?
Answer: 12 ✅

Great job practicing multiplication! 🌟
Multiplication helps us count groups of things!`,
          hints: [
            'Try changing the range numbers to make harder problems',
            'Can you add more problems by changing range(1, 4) to range(1, 6)?',
            'What happens if you change the emoji decorations?'
          ]
        }),
        '10-11': () => ({
          title: `Times Tables Trainer`,
          description: `Master your multiplication tables with this interactive trainer!`,
          code: `# Times Tables Trainer
import random

def create_multiplication_problem():
    """Create a multiplication problem"""
    first_number = random.randint(1, ${Math.min(maxNumber, 10)})
    second_number = random.randint(1, ${Math.min(maxNumber, 10)})
    answer = first_number * second_number
    return first_number, second_number, answer

def check_answer(first, second, user_answer, correct_answer):
    """Check if the user's answer is correct"""
    if user_answer == correct_answer:
        print(f"🎉 Correct! {first} × {second} = {correct_answer}")
        return True
    else:
        print(f"❌ Not quite. {first} × {second} = {correct_answer}")
        return False

# Main program
print("✖️ Times Tables Trainer ✖️")
print("Practice your multiplication skills!")
print()

score = 0
total_problems = 5

for problem in range(1, total_problems + 1):
    first, second, correct_answer = create_multiplication_problem()
    
    print(f"Problem {problem}: {first} × {second} = ?")
    
    # Simulate answers (mix of correct and incorrect)
    user_answer = correct_answer if problem <= 3 else correct_answer + random.randint(1, 5)
    
    if check_answer(first, second, user_answer, correct_answer):
        score += 1
    
    print()

print(f"Final Score: {score}/{total_problems}")
if score >= 4:
    print("Multiplication Master! 🏆")
elif score >= 2:
    print("Good progress! Keep practicing! 💪")
else:
    print("Practice makes perfect! Try again! 📚")`,
          explanation: 'This trainer creates random multiplication problems and tracks your progress through the times tables.',
          expectedOutput: `✖️ Times Tables Trainer ✖️
Practice your multiplication skills!

Problem 1: 6 × 7 = ?
🎉 Correct! 6 × 7 = 42

Problem 2: 4 × 8 = ?
🎉 Correct! 4 × 8 = 32

Problem 3: 5 × 9 = ?
🎉 Correct! 5 × 9 = 45

Problem 4: 7 × 6 = ?
❌ Not quite. 7 × 6 = 42

Problem 5: 8 × 4 = ?
❌ Not quite. 8 × 4 = 32

Final Score: 3/5
Good progress! Keep practicing! 💪`,
          hints: [
            'Try focusing on one times table at a time',
            'Use your fingers or draw pictures to help',
            'Practice the harder ones more often'
          ]
        })
      },
      'addition': {
        '8-9': () => ({
          title: `Fun Addition Practice! ➕`,
          description: `Let's practice addition with numbers up to ${maxNumber}!`,
          code: `# Addition Practice for Kids!
import random

print("➕ Let's Practice Addition! ➕")
print("I'll give you some addition problems to solve!")
print()

# Let's do 3 addition problems
for problem_number in range(1, 4):
    # Create addition problems
    first_number = random.randint(1, ${Math.min(maxNumber, 8)})
    second_number = random.randint(1, ${Math.min(maxNumber, 8)})
    
    print(f"Problem {problem_number}: {first_number} + {second_number} = ?")
    
    # Show the answer
    result = first_number + second_number
    print(f"Answer: {result} ✅")
    print()

print("Great job practicing addition! 🌟")
print("Addition helps us combine numbers together!")`,
          explanation: 'This program creates addition problems to help kids practice combining numbers!',
          expectedOutput: `➕ Let's Practice Addition! ➕
I'll give you some addition problems to solve!

Problem 1: 5 + 3 = ?
Answer: 8 ✅

Problem 2: 7 + 4 = ?
Answer: 11 ✅

Problem 3: 2 + 6 = ?
Answer: 8 ✅

Great job practicing addition! 🌟
Addition helps us combine numbers together!`,
          hints: [
            'Try using your fingers to count',
            'Can you add more problems?',
            'What if you used bigger numbers?'
          ]
        }),
        '10-11': () => ({
          title: `Addition Challenge`,
          description: `Challenge yourself with multi-digit addition problems!`,
          code: `# Addition Challenge
import random

def create_addition_problem():
    """Create an addition problem"""
    if random.choice([True, False]):
        # Two-digit addition
        first_number = random.randint(10, ${Math.min(maxNumber * 10, 99)})
        second_number = random.randint(10, ${Math.min(maxNumber * 10, 99)})
    else:
        # Three numbers
        first_number = random.randint(1, ${Math.min(maxNumber, 20)})
        second_number = random.randint(1, ${Math.min(maxNumber, 20)})
        third_number = random.randint(1, ${Math.min(maxNumber, 20)})
        return first_number, second_number, third_number, first_number + second_number + third_number
    
    return first_number, second_number, None, first_number + second_number

# Main program
print("➕ Addition Challenge ➕")
print("Let's solve some addition problems!")
print()

score = 0
total_problems = 5

for problem in range(1, total_problems + 1):
    first, second, third, correct_answer = create_addition_problem()
    
    if third is not None:
        print(f"Problem {problem}: {first} + {second} + {third} = ?")
    else:
        print(f"Problem {problem}: {first} + {second} = ?")
    
    # Simulate answers
    user_answer = correct_answer if problem <= 3 else correct_answer + random.randint(1, 3)
    
    if user_answer == correct_answer:
        print(f"🎉 Correct! The answer is {correct_answer}")
        score += 1
    else:
        print(f"❌ Not quite. The correct answer is {correct_answer}")
    
    print()

print(f"Final Score: {score}/{total_problems}")
if score >= 4:
    print("Addition Expert! 🏆")
elif score >= 2:
    print("Nice work! Keep practicing! 💪")
else:
    print("Great effort! Try again! 📚")`,
          explanation: 'This challenge includes two-digit numbers and three-number addition for more advanced practice.',
          expectedOutput: `➕ Addition Challenge ➕
Let's solve some addition problems!

Problem 1: 25 + 34 = ?
🎉 Correct! The answer is 59

Problem 2: 7 + 8 + 12 = ?
🎉 Correct! The answer is 27

Problem 3: 46 + 23 = ?
🎉 Correct! The answer is 69

Problem 4: 15 + 19 + 8 = ?
❌ Not quite. The correct answer is 42

Problem 5: 38 + 27 = ?
❌ Not quite. The correct answer is 65

Final Score: 3/5
Nice work! Keep practicing! 💪`,
          hints: [
            'Break big numbers into tens and ones',
            'Line up the numbers vertically in your head',
            'Check your work by adding in reverse order'
          ]
        })
      },
      'subtraction': {
        '8-9': () => ({
          title: `Fun Subtraction Practice! ➖`,
          description: `Let's practice subtraction with numbers up to ${maxNumber}!`,
          code: `# Subtraction Practice for Kids!
import random

print("➖ Let's Practice Subtraction! ➖")
print("I'll give you some subtraction problems to solve!")
print()

# Let's do 3 subtraction problems
for problem_number in range(1, 4):
    # Create subtraction problems (make sure result is positive)
    second_number = random.randint(1, ${Math.min(maxNumber, 5)})
    first_number = random.randint(second_number, ${Math.min(maxNumber, 10)})
    
    print(f"Problem {problem_number}: {first_number} - {second_number} = ?")
    
    # Show the answer
    result = first_number - second_number
    print(f"Answer: {result} ✅")
    print()

print("Great job practicing subtraction! 🌟")
print("Subtraction helps us find the difference between numbers!")`,
          explanation: 'This program creates subtraction problems that always have positive answers!',
          expectedOutput: `➖ Let's Practice Subtraction! ➖
I'll give you some subtraction problems to solve!

Problem 1: 8 - 3 = ?
Answer: 5 ✅

Problem 2: 10 - 4 = ?
Answer: 6 ✅

Problem 3: 7 - 2 = ?
Answer: 5 ✅

Great job practicing subtraction! 🌟
Subtraction helps us find the difference between numbers!`,
          hints: [
            'Count backwards from the first number',
            'Use objects to help you subtract',
            'Remember: big number minus small number'
          ]
        }),
        '10-11': () => ({
          title: `Subtraction Challenge`,
          description: `Master subtraction with multi-digit numbers!`,
          code: `# Subtraction Challenge
import random

def create_subtraction_problem():
    """Create a subtraction problem"""
    # Make sure we don't get negative results
    second_number = random.randint(1, ${Math.min(maxNumber * 5, 50)})
    first_number = random.randint(second_number, ${Math.min(maxNumber * 10, 100)})
    answer = first_number - second_number
    return first_number, second_number, answer

# Main program
print("➖ Subtraction Challenge ➖")
print("Practice your subtraction skills!")
print()

score = 0
total_problems = 5

for problem in range(1, total_problems + 1):
    first, second, correct_answer = create_subtraction_problem()
    
    print(f"Problem {problem}: {first} - {second} = ?")
    
    # Simulate answers
    user_answer = correct_answer if problem <= 3 else correct_answer + random.randint(1, 5)
    
    if user_answer == correct_answer:
        print(f"🎉 Correct! {first} - {second} = {correct_answer}")
        score += 1
    else:
        print(f"❌ Not quite. {first} - {second} = {correct_answer}")
    
    print()

print(f"Final Score: {score}/{total_problems}")
if score >= 4:
    print("Subtraction Star! 🏆")
elif score >= 2:
    print("Good work! Keep practicing! 💪")
else:
    print("Nice try! Practice makes perfect! 📚")`,
          explanation: 'This challenge helps you practice subtraction with larger numbers and develop mental math skills.',
          expectedOutput: `➖ Subtraction Challenge ➖
Practice your subtraction skills!

Problem 1: 68 - 23 = ?
🎉 Correct! 68 - 23 = 45

Problem 2: 85 - 17 = ?
🎉 Correct! 85 - 17 = 68

Problem 3: 92 - 34 = ?
🎉 Correct! 92 - 34 = 58

Problem 4: 76 - 29 = ?
❌ Not quite. 76 - 29 = 47

Problem 5: 83 - 26 = ?
❌ Not quite. 83 - 26 = 57

Final Score: 3/5
Good work! Keep practicing! 💪`,
          hints: [
            'Break numbers into tens and ones',
            'Check your answer by adding back',
            'Practice borrowing with two-digit numbers'
          ]
        })
      }
    }
  };
  
  // Try to find exact match, then fallback intelligently
  if (exercises[topic]?.[operation]?.[targetAge]) {
    return exercises[topic][operation][targetAge]();
  }
  
  // Fallback 1: Try same topic and operation, different age
  if (exercises[topic]?.[operation]) {
    const availableAges = Object.keys(exercises[topic][operation]);
    const fallbackAge = availableAges.includes('10-11') ? '10-11' : availableAges[0];
    return exercises[topic][operation][fallbackAge]();
  }
  
  // Fallback 2: Try same topic, different operation
  if (exercises[topic]) {
    const availableOps = Object.keys(exercises[topic]);
    const fallbackOp = availableOps.includes('addition') ? 'addition' : availableOps[0];
    if (exercises[topic][fallbackOp]?.[targetAge]) {
      return exercises[topic][fallbackOp][targetAge]();
    }
    if (exercises[topic][fallbackOp]) {
      const availableAges = Object.keys(exercises[topic][fallbackOp]);
      const fallbackAge = availableAges.includes('10-11') ? '10-11' : availableAges[0];
      return exercises[topic][fallbackOp][fallbackAge]();
    }
  }
  
  // Final fallback: Default to addition for the age group
  return exercises['math']['addition'][targetAge] ? 
    exercises['math']['addition'][targetAge]() : 
    exercises['math']['addition']['10-11']();
};

const examplePrompts = [
  {
    title: "Math Addition",
    prompt: "Create an addition practice program for elementary kids with numbers up to 15"
  },
  {
    title: "Math Multiplication",
    prompt: "Build a multiplication tables trainer for 10 year olds with numbers up to 12"
  },
  {
    title: "Math Subtraction", 
    prompt: "Make a subtraction practice playground for 9 year olds with positive results only"
  },
  {
    title: "Math Division",
    prompt: "Build a python playground where the user will be able to do division problems appropriate for ages 10 and no number more than 10"
  },
  {
    title: "String Fun",
    prompt: "Create a Python exercise for 8 year olds to practice working with their names and favorite colors"
  },
  {
    title: "List Practice",
    prompt: "Make a Python program for 12 year olds to learn about lists using their favorite movies"
  }
];

const AIPythonGenerator = ({ onGenerate, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [ageGroup, setAgeGroup] = useState('10-11');
  const [difficulty, setDifficulty] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedExercise, setGeneratedExercise] = useState(null);

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt);
  };

  const generateExercise = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const exercise = generatePythonExercise(prompt, ageGroup, difficulty);
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

  return (
    <GeneratorContainer>
      <GeneratorHeader>
        <h2>
          <Wand2 size={28} />
          AI Python Exercise Generator
        </h2>
        <p>Describe what you want in plain English, and AI will create the perfect Python playground!</p>
      </GeneratorHeader>

      <InputSection>
        <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Brain size={20} />
          Describe Your Exercise
        </h3>
        <TextArea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Build a python playground where the user will be able to do division problems appropriate for ages 10 and no number more than 10"
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
          <h4 style={{ margin: '0 0 10px 0' }}>Target Age Group</h4>
          <Select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
            <option value="8-9">8-9 Years (Elementary)</option>
            <option value="10-11">10-11 Years (Middle)</option>
            <option value="12-14">12-14 Years (Advanced)</option>
          </Select>
        </OptionGroup>

        <OptionGroup>
          <h4 style={{ margin: '0 0 10px 0' }}>Difficulty Level</h4>
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </OptionGroup>
      </OptionsSection>

      <GenerateButton onClick={generateExercise} disabled={!prompt.trim() || isGenerating}>
        {isGenerating ? (
          <>
            <LoadingSpinner />
            AI is generating your exercise...
          </>
        ) : (
          <>
            <Zap size={20} />
            Generate Python Exercise
          </>
        )}
      </GenerateButton>

      {generatedExercise && (
        <PreviewSection>
          <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} />
            Generated Exercise Preview
          </h3>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ fontSize: '18px' }}>{generatedExercise.title}</strong>
            <p style={{ margin: '5px 0', opacity: 0.9 }}>{generatedExercise.description}</p>
          </div>
          <CodePreview>{generatedExercise.code}</CodePreview>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '15px' }}>
            <strong>💡 What this teaches:</strong> {generatedExercise.explanation}
          </div>
          
          <GenerateButton onClick={handleGenerate}>
            <Code size={20} />
            Use This Exercise
          </GenerateButton>
        </PreviewSection>
      )}
    </GeneratorContainer>
  );
};

export default AIPythonGenerator;