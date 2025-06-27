// Auto-Assessment Engine for TrainArama AI Learning Platform
// Handles quiz grading, Python validation, badges, and progress tracking

class AssessmentEngine {
  constructor() {
    this.studentProgress = new Map(); // studentId -> progress data
    this.badgeSystem = new BadgeSystem();
    this.progressGates = new ProgressGates();
  }

  // Initialize student progress tracking
  initializeStudent(studentId, ageGroup, yearLevel) {
    if (!this.studentProgress.has(studentId)) {
      this.studentProgress.set(studentId, {
        studentId,
        ageGroup,
        yearLevel,
        completedActivities: [],
        earnedBadges: [],
        currentStreak: 0,
        totalScore: 0,
        sessionsCompleted: 0,
        weakAreas: [],
        strongAreas: [],
        lastActivity: new Date(),
        learningObjectivesAchieved: [],
        helpRequestHistory: [],
        timeSpentLearning: 0
      });
    }
    return this.studentProgress.get(studentId);
  }

  // Quiz Assessment System
  assessQuiz(studentId, quizData, studentAnswers) {
    try {
      console.log('=== QUIZ ASSESSMENT STARTED ===');
      console.log('Quiz Type:', quizData.type);
      console.log('Student Answers:', studentAnswers);

      const student = this.initializeStudent(studentId);

      const results = {
        quizId: quizData.id,
        score: 0,
        totalQuestions: 0,
        correctAnswers: [],
        incorrectAnswers: [],
        feedback: [],
        badgesEarned: [],
        timeCompleted: new Date(),
        passed: false
      };

      // Handle different quiz types
      switch(quizData.type) {
        case 'multiple-choice':
          Object.assign(results, this.assessMultipleChoice(quizData, studentAnswers));
          break;
        case 'true-false':
          Object.assign(results, this.assessTrueFalse(quizData, studentAnswers));
          break;
        case 'multiple-select':
          Object.assign(results, this.assessMultipleSelect(quizData, studentAnswers));
          break;
        case 'text-input':
          Object.assign(results, this.assessTextInput(quizData, studentAnswers));
          break;
        case 'fill-blanks':
          Object.assign(results, this.assessFillBlanks(quizData, studentAnswers));
          break;
        default:
          Object.assign(results, this.assessMultipleChoice(quizData, studentAnswers));
          break;
      }

      // Calculate final score and passing status
      results.score = Math.round((results.correctAnswers.length / results.totalQuestions) * 100);
      results.passed = results.score >= (quizData.passingScore || 70);

      // Generate age-appropriate feedback
      results.feedback = this.generateQuizFeedback(results, student.ageGroup);

      // Check for badge achievements
      results.badgesEarned = this.badgeSystem.checkQuizBadges(student, results);

      // Update student progress
      this.updateStudentProgress(studentId, 'quiz', results);

      // Check if prerequisites are met for next activities
      results.unlockedActivities = this.progressGates.checkUnlocks(student);

      console.log('=== QUIZ ASSESSMENT COMPLETE ===');
      console.log('Score:', results.score + '%', 'Passed:', results.passed);
      return results;
      
    } catch (error) {
      console.error('=== ASSESSMENT ENGINE ERROR ===');
      console.error('Error in assessQuiz:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  // Multiple Choice Assessment
  assessMultipleChoice(quizData, studentAnswers) {
    const results = {
      totalQuestions: quizData.questions.length,
      correctAnswers: [],
      incorrectAnswers: [],
      detailedFeedback: []
    };

    quizData.questions.forEach((question, index) => {
      const studentAnswer = studentAnswers[index];
      const isCorrect = studentAnswer === question.correctAnswer;

      if (isCorrect) {
        results.correctAnswers.push({
          questionIndex: index,
          question: question.text,
          studentAnswer,
          feedback: question.correctFeedback || "Great job! That's correct! 🎉"
        });
      } else {
        results.incorrectAnswers.push({
          questionIndex: index,
          question: question.text,
          studentAnswer,
          correctAnswer: question.correctAnswer,
          feedback: question.incorrectFeedback || question.explanation || "Not quite right, but keep learning! 💪"
        });
      }
    });

    return results;
  }

  // True/False Assessment
  assessTrueFalse(quizData, studentAnswers) {
    const results = {
      totalQuestions: quizData.questions.length,
      correctAnswers: [],
      incorrectAnswers: []
    };

    quizData.questions.forEach((question, index) => {
      const studentAnswer = studentAnswers[index];
      const isCorrect = studentAnswer === question.correct;

      if (isCorrect) {
        results.correctAnswers.push({
          questionIndex: index,
          question: question.statement,
          studentAnswer,
          feedback: "Correct! " + (question.explanation || "Great reasoning! 🧠")
        });
      } else {
        results.incorrectAnswers.push({
          questionIndex: index,
          question: question.statement,
          studentAnswer,
          correctAnswer: question.correct,
          feedback: "Actually, " + (question.explanation || "the answer is different. Keep exploring! 🔍")
        });
      }
    });

    return results;
  }

  // Multiple Select Assessment
  assessMultipleSelect(quizData, studentAnswers) {
    const results = {
      totalQuestions: quizData.questions.length,
      correctAnswers: [],
      incorrectAnswers: []
    };

    quizData.questions.forEach((question, index) => {
      const studentAnswer = studentAnswers[index] || [];
      const correctAnswers = question.correctAnswers || [];
      
      // Check if arrays match
      const isCorrect = JSON.stringify(studentAnswer.sort()) === JSON.stringify(correctAnswers.sort());

      if (isCorrect) {
        results.correctAnswers.push({
          questionIndex: index,
          question: question.text,
          studentAnswer,
          feedback: "Perfect! You selected all the correct options! 🎯"
        });
      } else {
        results.incorrectAnswers.push({
          questionIndex: index,
          question: question.text,
          studentAnswer,
          correctAnswers,
          feedback: "Close! Check which options are really correct. 🤔"
        });
      }
    });

    return results;
  }

  // Text Input Assessment
  assessTextInput(quizData, studentAnswers) {
    const results = {
      totalQuestions: quizData.questions.length,
      correctAnswers: [],
      incorrectAnswers: []
    };

    quizData.questions.forEach((question, index) => {
      const studentAnswer = (studentAnswers[index] || '').toLowerCase().trim();
      const acceptableAnswers = question.acceptableAnswers || [question.correctAnswer];
      
      const isCorrect = acceptableAnswers.some(answer => 
        answer.toLowerCase().trim() === studentAnswer
      );

      if (isCorrect) {
        results.correctAnswers.push({
          questionIndex: index,
          question: question.text,
          studentAnswer: studentAnswers[index],
          feedback: "Excellent answer! 💯"
        });
      } else {
        results.incorrectAnswers.push({
          questionIndex: index,
          question: question.text,
          studentAnswer: studentAnswers[index],
          correctAnswer: question.correctAnswer,
          feedback: "Good try! The answer we were looking for is: " + question.correctAnswer
        });
      }
    });

    return results;
  }

  // Fill in the Blanks Assessment
  assessFillBlanks(quizData, studentAnswers) {
    const results = {
      totalQuestions: quizData.questions.length,
      correctAnswers: [],
      incorrectAnswers: []
    };

    quizData.questions.forEach((question, index) => {
      const studentAnswer = studentAnswers[index] || [];
      const correctAnswers = question.correctAnswers || [];
      
      let correctCount = 0;
      correctAnswers.forEach((correct, blankIndex) => {
        if (studentAnswer[blankIndex] && 
            studentAnswer[blankIndex].toLowerCase().trim() === correct.toLowerCase().trim()) {
          correctCount++;
        }
      });

      const isCorrect = correctCount === correctAnswers.length;

      if (isCorrect) {
        results.correctAnswers.push({
          questionIndex: index,
          question: question.text,
          studentAnswer,
          feedback: "Perfect! All blanks filled correctly! 🌟"
        });
      } else {
        results.incorrectAnswers.push({
          questionIndex: index,
          question: question.text,
          studentAnswer,
          correctAnswers,
          feedback: `Good effort! You got ${correctCount} out of ${correctAnswers.length} blanks correct.`
        });
      }
    });

    return results;
  }

  // Python Code Assessment
  assessPythonCode(studentId, codeData, studentCode, executionResult) {
    const student = this.initializeStudent(studentId);
    const results = {
      codeId: codeData.id,
      passed: false,
      score: 0,
      feedback: [],
      badgesEarned: [],
      codeQuality: {},
      timeCompleted: new Date()
    };

    // Check if code executes without errors
    if (!executionResult.success) {
      results.feedback.push({
        type: 'error',
        message: this.generateCodeErrorFeedback(executionResult.error, student.ageGroup),
        severity: 'high'
      });
      results.score = 0;
      return results;
    }

    // Check if output matches expected result
    const outputMatch = this.compareOutputs(
      executionResult.output, 
      codeData.expectedOutput,
      codeData.outputType || 'exact'
    );

    if (outputMatch.isMatch) {
      results.passed = true;
      results.score = outputMatch.similarity;
      results.feedback.push({
        type: 'success',
        message: this.generateSuccessFeedback(student.ageGroup, codeData.difficulty),
        severity: 'positive'
      });
    } else {
      results.feedback.push({
        type: 'improvement',
        message: this.generateImprovementFeedback(outputMatch, student.ageGroup),
        severity: 'medium'
      });
      results.score = Math.max(25, outputMatch.similarity); // Partial credit for effort
    }

    // Analyze code quality (basic metrics)
    results.codeQuality = this.analyzeCodeQuality(studentCode, codeData);

    // Check for achievements
    results.badgesEarned = this.badgeSystem.checkPythonBadges(student, results, codeData);

    // Update progress
    this.updateStudentProgress(studentId, 'python', results);

    return results;
  }

  // Generate code error feedback for students
  generateCodeErrorFeedback(error, ageGroup) {
    const ageMessages = {
      '8-9': [
        "Oops! Something went wrong. Let's fix it together! 🔧",
        "Don't worry, every coder makes mistakes! Let's try again! 😊",
        "That's okay! Debugging is part of learning! 🐛"
      ],
      '10-11': [
        "Error detected! Let's figure out what happened! 🕵️",
        "Good try! Errors help us learn what to fix! 💡",
        "Almost there! Let's debug this step by step! 🔍"
      ],
      '12-14': [
        "Error found! Let's analyze and fix this! 🔬",
        "Debugging time! Every error teaches us something! 📚",
        "Error detected! Let's trace through the logic! 🧠"
      ]
    };

    const messages = ageMessages[ageGroup] || ageMessages['10-11'];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Generate success feedback for code
  generateSuccessFeedback(ageGroup, difficulty) {
    const ageMessages = {
      '8-9': [
        "Awesome! Your code works perfectly! 🎉",
        "Great job! You're becoming a coding star! ⭐",
        "Fantastic! You solved it! 🌟"
      ],
      '10-11': [
        "Excellent! Your code runs beautifully! 🚀",
        "Perfect! You've mastered this concept! 🏆",
        "Outstanding! Your logic is spot-on! 🎯"
      ],
      '12-14': [
        "Exceptional work! Your code is well-structured! 💪",
        "Brilliant! You've demonstrated great programming skills! 🧠",
        "Impressive! Your solution is elegant and correct! ✨"
      ]
    };

    const messages = ageMessages[ageGroup] || ageMessages['10-11'];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Generate improvement feedback
  generateImprovementFeedback(outputMatch, ageGroup) {
    const ageMessages = {
      '8-9': [
        "Good try! Your code almost works! Let's make it perfect! 🌈",
        "Nice effort! You're getting closer! Keep going! 💪",
        "Great start! Let's fix this together! 🤝"
      ],
      '10-11': [
        "Good progress! Your code is close to the target! 🎯",
        "Nice work! Let's refine your solution! 🔧",
        "Well done! Small adjustments will make it perfect! ⚡"
      ],
      '12-14': [
        "Good approach! Let's optimize your solution! 🔍",
        "Solid attempt! Consider the expected output format! 📊",
        "Nice logic! Let's align the output with requirements! 📋"
      ]
    };

    const messages = ageMessages[ageGroup] || ageMessages['10-11'];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Analyze code quality (basic metrics)
  analyzeCodeQuality(code, codeData) {
    try {
      const lines = code.split('\n').filter(line => line.trim());
      const quality = {
        lineCount: lines.length,
        hasComments: code.includes('#'),
        hasPrintStatements: code.includes('print'),
        complexity: lines.length > 10 ? 'high' : lines.length > 5 ? 'medium' : 'low',
        readability: code.includes('    ') ? 'good' : 'needs-improvement' // Basic indentation check
      };
      return quality;
    } catch (error) {
      console.error('Error analyzing code quality:', error);
      return { error: 'Could not analyze code quality' };
    }
  }

  // Compare numeric outputs
  compareNumericOutput(studentOutput, expectedOutput) {
    try {
      const studentNum = parseFloat(studentOutput);
      const expectedNum = parseFloat(expectedOutput);
      
      if (isNaN(studentNum) || isNaN(expectedNum)) {
        return { isMatch: false, similarity: 0, differences: ['Not numeric values'] };
      }
      
      const difference = Math.abs(studentNum - expectedNum);
      const tolerance = Math.abs(expectedNum) * 0.01; // 1% tolerance
      
      return {
        isMatch: difference <= tolerance,
        similarity: difference <= tolerance ? 100 : Math.max(0, 100 - (difference / Math.abs(expectedNum)) * 100),
        differences: difference > tolerance ? [`Expected: ${expectedNum}, Got: ${studentNum}`] : []
      };
    } catch (error) {
      return { isMatch: false, similarity: 0, differences: ['Error comparing numeric values'] };
    }
  }

  // Compare code outputs with flexibility
  compareOutputs(studentOutput, expectedOutput, outputType = 'exact') {
    const result = {
      isMatch: false,
      similarity: 0,
      differences: []
    };

    // Clean outputs for comparison
    const cleanStudent = this.cleanOutput(studentOutput);
    const cleanExpected = this.cleanOutput(expectedOutput);

    switch(outputType) {
      case 'exact':
        result.isMatch = cleanStudent === cleanExpected;
        result.similarity = result.isMatch ? 100 : 0;
        break;
        
      case 'fuzzy':
        result.similarity = this.calculateStringSimilarity(cleanStudent, cleanExpected);
        result.isMatch = result.similarity >= 80;
        break;
        
      case 'contains':
        result.isMatch = cleanStudent.includes(cleanExpected) || cleanExpected.includes(cleanStudent);
        result.similarity = result.isMatch ? 100 : 50;
        break;
        
      case 'numeric':
        Object.assign(result, this.compareNumericOutput(cleanStudent, cleanExpected));
        break;
        
      default:
        result.isMatch = cleanStudent === cleanExpected;
        result.similarity = result.isMatch ? 100 : 0;
        break;
    }

    return result;
  }

  // Generate age-appropriate feedback messages
  generateQuizFeedback(results, ageGroup) {
    const feedbackMessages = [];
    const scorePercentage = results.score;

    // Age-specific encouragement
    const ageMessages = {
      '8-9': {
        excellent: ["🌟 Wow! You're an AI superstar!", "🎉 Amazing work, young scientist!", "🚀 You're ready for the next adventure!"],
        good: ["😊 Great job! You're learning so much!", "👏 Nice work! Keep exploring!", "🌈 You're getting better every day!"],
        needsWork: ["🤗 Good try! Let's practice more together!", "💪 You're learning! Every mistake helps you grow!", "🎯 Let's try again - you've got this!"]
      },
      '10-11': {
        excellent: ["🏆 Outstanding! You really understand AI!", "🎯 Perfect score! You're becoming an expert!", "⭐ Excellent reasoning skills!"],
        good: ["👍 Good work! You're making great progress!", "📈 Nice job! Keep building your knowledge!", "🧠 You're thinking like a real AI researcher!"],
        needsWork: ["🔍 Good effort! Let's review and try again!", "💡 You're on the right track! Practice makes perfect!", "🎲 Close! Let's explore this topic more!"]
      },
      '12-14': {
        excellent: ["🎓 Exceptional work! You've mastered this concept!", "🏅 Outstanding! Your critical thinking is impressive!", "🔬 Excellent analysis! You're thinking like a computer scientist!"],
        good: ["✅ Good job! You're developing strong AI literacy!", "📊 Solid work! Your understanding is growing!", "⚡ Nice progress! You're ready for more challenges!"],
        needsWork: ["🤔 Good attempt! Let's dive deeper into this concept!", "📚 You're learning! Let's review the key points!", "🎯 Close! With practice, you'll master this!"]
      }
    };

    const messages = ageMessages[ageGroup] || ageMessages['10-11'];

    if (scorePercentage >= 90) {
      feedbackMessages.push(messages.excellent[Math.floor(Math.random() * messages.excellent.length)]);
    } else if (scorePercentage >= 70) {
      feedbackMessages.push(messages.good[Math.floor(Math.random() * messages.good.length)]);
    } else {
      feedbackMessages.push(messages.needsWork[Math.floor(Math.random() * messages.needsWork.length)]);
    }

    // Add specific learning feedback
    if (results.correctAnswers.length > 0) {
      feedbackMessages.push(`✨ You got ${results.correctAnswers.length} out of ${results.totalQuestions} questions right!`);
    }

    return feedbackMessages;
  }

  // Badge and achievement system
  updateStudentProgress(studentId, activityType, results) {
    const student = this.studentProgress.get(studentId);
    
    // Add completed activity
    student.completedActivities.push({
      type: activityType,
      id: results.quizId || results.codeId,
      score: results.score,
      passed: results.passed,
      completedAt: new Date(),
      timeSpent: results.timeSpent || 0
    });

    // Update streaks and totals
    if (results.passed) {
      student.currentStreak++;
      student.totalScore += results.score;
    } else {
      student.currentStreak = 0;
    }

    // Add badges
    if (results.badgesEarned) {
      student.earnedBadges.push(...results.badgesEarned);
    }

    // Update learning areas
    this.updateLearningAreas(student, results);
  }

  // Update learning areas based on performance
  updateLearningAreas(student, results) {
    try {
      // Analyze performance to identify strong and weak areas
      if (results.passed) {
        // Add to strong areas if not already there
        const topic = results.quizId || results.codeId || 'general';
        if (!student.strongAreas.includes(topic)) {
          student.strongAreas.push(topic);
        }
        
        // Remove from weak areas if previously there
        student.weakAreas = student.weakAreas.filter(area => area !== topic);
      } else {
        // Add to weak areas if not already there
        const topic = results.quizId || results.codeId || 'general';
        if (!student.weakAreas.includes(topic)) {
          student.weakAreas.push(topic);
        }
        
        // Keep only recent weak areas (last 5)
        if (student.weakAreas.length > 5) {
          student.weakAreas = student.weakAreas.slice(-5);
        }
      }
      
      console.log('Learning areas updated:', {
        strong: student.strongAreas,
        weak: student.weakAreas
      });
    } catch (error) {
      console.error('Error updating learning areas:', error);
      // Don't throw error - this is not critical for assessment
    }
  }

  // Clean output for comparison
  cleanOutput(output) {
    return output
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  // Calculate string similarity for fuzzy matching
  calculateStringSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 100;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return Math.round(((longer.length - distance) / longer.length) * 100);
  }

  // Levenshtein distance calculation
  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Get student progress summary
  getStudentProgress(studentId) {
    return this.studentProgress.get(studentId) || null;
  }

  // Check if student can access activity (prerequisites)
  canAccessActivity(studentId, activityId) {
    return this.progressGates.canAccess(
      this.studentProgress.get(studentId), 
      activityId
    );
  }
}

// Badge System - manages achievements and rewards
class BadgeSystem {
  constructor() {
    this.badges = this.initializeBadges();
  }

  initializeBadges() {
    return {
      // Python Coding Badges
      'first-code-run': {
        id: 'first-code-run',
        name: 'First Code Run',
        description: 'Ran your first Python program!',
        icon: '🎯',
        trigger: (student, result) => {
          return student.completedActivities.filter(a => a.type === 'python').length === 1;
        }
      },
      'code-master': {
        id: 'code-master',
        name: 'Code Master',
        description: 'Completed 10 Python exercises perfectly!',
        icon: '👑',
        trigger: (student, result) => {
          const perfectPython = student.completedActivities.filter(a => 
            a.type === 'python' && a.score === 100
          ).length;
          return perfectPython >= 10;
        }
      },
      'debug-detective': {
        id: 'debug-detective',
        name: 'Debug Detective',
        description: 'Fixed 5 coding errors successfully!',
        icon: '🔍',
        trigger: (student, result) => {
          return student.debugsFixed >= 5;
        }
      },
      
      // Quiz Achievement Badges
      'quiz-champion': {
        id: 'quiz-champion',
        name: 'Quiz Champion',
        description: 'Scored 100% on 5 quizzes!',
        icon: '🏆',
        trigger: (student, result) => {
          const perfectQuizzes = student.completedActivities.filter(a => 
            a.type === 'quiz' && a.score === 100
          ).length;
          return perfectQuizzes >= 5;
        }
      },
      'ethics-expert': {
        id: 'ethics-expert',
        name: 'Ethics Expert',
        description: 'Mastered AI ethics scenarios!',
        icon: '🛡️',
        trigger: (student, result) => {
          return student.completedActivities.filter(a => 
            a.id && a.id.includes('ethics')
          ).length >= 3;
        }
      },
      
      // Learning Progress Badges
      'speed-learner': {
        id: 'speed-learner',
        name: 'Speed Learner',
        description: 'Completed lesson in record time!',
        icon: '⚡',
        trigger: (student, result) => {
          return result.timeSpent && result.timeSpent < 600; // Less than 10 minutes
        }
      },
      'persistent-coder': {
        id: 'persistent-coder',
        name: 'Persistent Coder',
        description: 'Never gave up, kept trying!',
        icon: '💪',
        trigger: (student, result) => {
          return student.helpRequestHistory.length >= 3;
        }
      }
    };
  }

  checkQuizBadges(student, results) {
    return this.checkBadges(student, results);
  }

  checkPythonBadges(student, results) {
    return this.checkBadges(student, results);
  }

  checkBadges(student, results) {
    const earnedBadges = [];
    
    Object.values(this.badges).forEach(badge => {
      // Check if student already has this badge
      if (!student.earnedBadges.find(b => b.id === badge.id)) {
        // Check if trigger condition is met
        if (badge.trigger(student, results)) {
          earnedBadges.push({
            ...badge,
            earnedAt: new Date()
          });
        }
      }
    });
    
    return earnedBadges;
  }
}

// Progress Gates - manages prerequisites and unlocks
class ProgressGates {
  constructor() {
    this.prerequisites = this.initializePrerequisites();
  }

  initializePrerequisites() {
    return {
      // Year 1 Prerequisites (Ages 8-9)
      'y1-variables': {
        requires: ['y1-hello-ai'],
        description: 'Complete "Hello AI World" first'
      },
      'y1-loops': {
        requires: ['y1-variables'],
        description: 'Learn about variables first'
      },
      'y1-ethics-basic': {
        requires: ['y1-hello-ai'],
        description: 'Understand what AI is first'
      },
      
      // Year 2 Prerequisites (Ages 10-11)
      'y2-functions': {
        requires: ['y1-loops', 'y1-variables'],
        description: 'Master variables and loops first'
      },
      'y2-data-types': {
        requires: ['y1-variables'],
        description: 'Complete basic variables lesson'
      },
      'y2-ethics-intermediate': {
        requires: ['y1-ethics-basic'],
        description: 'Complete basic ethics scenarios'
      },
      
      // Year 3 Prerequisites (Ages 12-14)
      'y3-classes': {
        requires: ['y2-functions', 'y2-data-types'],
        description: 'Master functions and data types'
      },
      'y3-ai-models': {
        requires: ['y2-functions'],
        description: 'Understand functions first'
      },
      'y3-ethics-advanced': {
        requires: ['y2-ethics-intermediate'],
        description: 'Complete intermediate ethics'
      }
    };
  }

  canAccess(student, activityId) {
    if (!student || !this.prerequisites[activityId]) {
      return true; // No prerequisites defined
    }

    const required = this.prerequisites[activityId].requires;
    const completed = student.completedActivities.map(a => a.id);

    return required.every(reqId => completed.includes(reqId));
  }

  checkUnlocks(student) {
    const unlocked = [];
    
    Object.keys(this.prerequisites).forEach(activityId => {
      if (this.canAccess(student, activityId)) {
        unlocked.push(activityId);
      }
    });
    
    return unlocked;
  }

  getPrerequisiteInfo(activityId) {
    return this.prerequisites[activityId] || null;
  }
}

// Create singleton instance
const assessmentEngine = new AssessmentEngine();

export default assessmentEngine;