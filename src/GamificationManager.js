import React, { useState, useEffect, useContext, createContext } from 'react';
import MotivationalFeedback from './MotivationalFeedback';
import StreakTracker from './StreakTracker';
import Leaderboard from './Leaderboard';
import BadgeSystem from './BadgeSystem';
import LevelSystem from './LevelSystem';

// Gamification Context
const GamificationContext = createContext();

// Hook to use gamification context
export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// Gamification Provider Component
export const GamificationProvider = ({ children, studentId, initialData = {} }) => {
  // Student progress state
  const [studentData, setStudentData] = useState({
    id: studentId || 'student1',
    name: initialData.name || 'Alex',
    level: initialData.level || 1,
    currentXP: initialData.currentXP || 0,
    totalXP: initialData.totalXP || 0,
    currentStreak: initialData.currentStreak || 0,
    longestStreak: initialData.longestStreak || 0,
    lessonsCompleted: initialData.lessonsCompleted || 0,
    badgesEarned: initialData.badgesEarned || [],
    achievements: initialData.achievements || [],
    lastActivity: initialData.lastActivity || new Date().toISOString(),
    weeklyGoal: initialData.weeklyGoal || 5,
    thisWeekDays: initialData.thisWeekDays || 0,
    ...initialData
  });

  // Pending achievements to show
  const [pendingAchievements, setPendingAchievements] = useState([]);
  
  // Activity tracking
  const [dailyActivities, setDailyActivities] = useState([]);
  const [sessionData, setSessionData] = useState({
    startTime: null,
    activitiesCompleted: 0,
    xpEarned: 0
  });

  // Level definitions
  const levelDefinitions = [
    { level: 1, title: 'AI Curious', xpRequired: 0, description: 'Taking your first steps into AI!' },
    { level: 2, title: 'Code Explorer', xpRequired: 200, description: 'Starting to explore programming!' },
    { level: 3, title: 'Logic Builder', xpRequired: 500, description: 'Building logical thinking skills!' },
    { level: 4, title: 'Problem Solver', xpRequired: 900, description: 'Solving complex challenges!' },
    { level: 5, title: 'Ethics Champion', xpRequired: 1400, description: 'Understanding AI ethics deeply!' },
    { level: 6, title: 'Code Ninja', xpRequired: 2000, description: 'Mastering programming skills!' },
    { level: 7, title: 'AI Designer', xpRequired: 2700, description: 'Creating innovative AI solutions!' },
    { level: 8, title: 'Tech Leader', xpRequired: 3500, description: 'Leading with technology!' },
    { level: 9, title: 'Innovation Master', xpRequired: 4400, description: 'Pushing boundaries of innovation!' },
    { level: 10, title: 'AI Wizard', xpRequired: 5500, description: 'Master of AI magic!' }
  ];

  // Badge definitions
  const badgeDefinitions = {
    'first-lesson': { name: 'First Steps', xpReward: 50, category: 'learning' },
    'hello-world': { name: 'Hello World', xpReward: 75, category: 'coding' },
    'streak-3': { name: '3-Day Streak', xpReward: 100, category: 'consistency' },
    'streak-7': { name: 'Week Warrior', xpReward: 200, category: 'consistency' },
    'streak-14': { name: 'Two Week Champion', xpReward: 400, category: 'consistency' },
    'streak-30': { name: 'Monthly Master', xpReward: 800, category: 'consistency' },
    'perfect-score': { name: 'Perfect Score', xpReward: 150, category: 'achievement' },
    'quick-learner': { name: 'Speed Demon', xpReward: 100, category: 'achievement' },
    'ethics-champion': { name: 'Ethics Champion', xpReward: 250, category: 'ethics' },
    'code-ninja': { name: 'Code Ninja', xpReward: 300, category: 'coding' },
    'problem-solver': { name: 'Problem Solver', xpReward: 200, category: 'logic' }
  };

  // XP rewards for different activities
  const xpRewards = {
    lesson_complete: 50,
    quiz_perfect: 75,
    quiz_good: 50,
    quiz_pass: 25,
    code_run_success: 30,
    code_challenge_complete: 100,
    ethics_scenario_complete: 40,
    daily_goal_met: 50,
    streak_maintained: 25
  };

  // Calculate level from XP
  const calculateLevel = (xp) => {
    for (let i = levelDefinitions.length - 1; i >= 0; i--) {
      if (xp >= levelDefinitions[i].xpRequired) {
        return levelDefinitions[i].level;
      }
    }
    return 1;
  };

  // Award XP and check for level ups
  const awardXP = (amount, activity = 'activity') => {
    const newTotalXP = studentData.totalXP + amount;
    const newCurrentXP = studentData.currentXP + amount;
    const previousLevel = studentData.level;
    const newLevel = calculateLevel(newTotalXP);

    // Update student data
    setStudentData(prev => ({
      ...prev,
      totalXP: newTotalXP,
      currentXP: newCurrentXP,
      level: newLevel
    }));

    // Update session data
    setSessionData(prev => ({
      ...prev,
      xpEarned: prev.xpEarned + amount
    }));

    // Check for level up
    if (newLevel > previousLevel) {
      addAchievement({
        type: 'level_up',
        level: newLevel,
        message: `Congratulations! You've reached Level ${newLevel}!`,
        xpAmount: amount
      });
    } else {
      // Show XP gain notification
      addAchievement({
        type: 'xp_gained',
        xpAmount: amount,
        message: `+${amount} XP from ${activity}`
      });
    }

    return { newLevel, levelUp: newLevel > previousLevel };
  };

  // Award badge
  const awardBadge = (badgeId) => {
    if (studentData.badgesEarned.includes(badgeId)) {
      return false; // Already earned
    }

    const badge = badgeDefinitions[badgeId];
    if (!badge) {
      console.warn(`Badge ${badgeId} not found`);
      return false;
    }

    // Add badge to earned list
    setStudentData(prev => ({
      ...prev,
      badgesEarned: [...prev.badgesEarned, badgeId]
    }));

    // Award XP for the badge
    awardXP(badge.xpReward, `${badge.name} badge`);

    // Add achievement notification
    addAchievement({
      type: 'badge_earned',
      badgeId: badgeId,
      badgeName: badge.name,
      message: `You earned the ${badge.name} badge!`,
      xpAmount: badge.xpReward
    });

    return true;
  };

  // Update streak
  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastActivity = new Date(studentData.lastActivity).toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    let newStreak = studentData.currentStreak;

    if (lastActivity === today) {
      // Already counted today
      return;
    } else if (lastActivity === yesterdayString) {
      // Continuing streak
      newStreak = studentData.currentStreak + 1;
    } else {
      // Starting new streak
      newStreak = 1;
    }

    // Update streak data
    setStudentData(prev => ({
      ...prev,
      currentStreak: newStreak,
      longestStreak: Math.max(prev.longestStreak, newStreak),
      lastActivity: new Date().toISOString(),
      thisWeekDays: prev.thisWeekDays + 1
    }));

    // Check for streak badges
    if (newStreak === 3 && !studentData.badgesEarned.includes('streak-3')) {
      awardBadge('streak-3');
    } else if (newStreak === 7 && !studentData.badgesEarned.includes('streak-7')) {
      awardBadge('streak-7');
      addAchievement({
        type: 'streak_milestone',
        streakDays: newStreak,
        message: `Amazing! ${newStreak} days in a row!`
      });
    } else if (newStreak === 14 && !studentData.badgesEarned.includes('streak-14')) {
      awardBadge('streak-14');
    } else if (newStreak === 30 && !studentData.badgesEarned.includes('streak-30')) {
      awardBadge('streak-30');
    } else if (newStreak > 1) {
      // Regular streak maintenance
      addAchievement({
        type: 'streak_continue',
        streakDays: newStreak,
        message: `${newStreak} days in a row! Keep it up!`
      });
    }

    awardXP(xpRewards.streak_maintained, 'maintaining streak');
  };

  // Add achievement to pending list
  const addAchievement = (achievement) => {
    setPendingAchievements(prev => [...prev, {
      ...achievement,
      id: Date.now() + Math.random(),
      timestamp: Date.now()
    }]);
  };

  // Clear processed achievements
  const clearAchievements = () => {
    setPendingAchievements([]);
  };

  // Complete lesson
  const completeLesson = (lessonData = {}) => {
    // Update lessons completed
    setStudentData(prev => ({
      ...prev,
      lessonsCompleted: prev.lessonsCompleted + 1
    }));

    // Update session
    setSessionData(prev => ({
      ...prev,
      activitiesCompleted: prev.activitiesCompleted + 1
    }));

    // Award XP
    const xpAmount = xpRewards.lesson_complete;
    awardXP(xpAmount, 'completing lesson');

    // Update streak
    updateStreak();

    // Check for first lesson badge
    if (studentData.lessonsCompleted === 0) {
      awardBadge('first-lesson');
    }

    // Add completion achievement
    addAchievement({
      type: 'lesson_complete',
      lessonTitle: lessonData.title || 'lesson',
      message: 'Great work completing this lesson!',
      xpAmount: xpAmount
    });
  };

  // Complete quiz
  const completeQuiz = (score, totalQuestions) => {
    const percentage = (score / totalQuestions) * 100;
    let xpAmount = xpRewards.quiz_pass;
    let achievementType = 'quiz_complete';

    if (percentage === 100) {
      xpAmount = xpRewards.quiz_perfect;
      achievementType = 'perfect_score';
      if (!studentData.badgesEarned.includes('perfect-score')) {
        awardBadge('perfect-score');
      }
    } else if (percentage >= 80) {
      xpAmount = xpRewards.quiz_good;
    }

    awardXP(xpAmount, 'quiz completion');

    addAchievement({
      type: achievementType,
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage,
      message: percentage === 100 ? 'Perfect score!' : `Great job! ${score}/${totalQuestions} correct`,
      xpAmount: xpAmount
    });
  };

  // Complete code challenge
  const completeCodeChallenge = (challengeData = {}) => {
    const xpAmount = challengeData.difficulty === 'advanced' ? 150 : 
                     challengeData.difficulty === 'intermediate' ? 100 : 75;

    awardXP(xpAmount, 'code challenge');

    // Check for coding badges
    if (studentData.lessonsCompleted === 0 && challengeData.isFirstCode) {
      awardBadge('hello-world');
    }

    addAchievement({
      type: 'code_challenge_complete',
      challengeName: challengeData.name || 'code challenge',
      difficulty: challengeData.difficulty || 'beginner',
      message: 'Excellent coding skills!',
      xpAmount: xpAmount
    });
  };

  // Complete ethics scenario
  const completeEthicsScenario = (scenarioData = {}) => {
    const xpAmount = xpRewards.ethics_scenario_complete;
    awardXP(xpAmount, 'ethics scenario');

    // Check for ethics badge
    if (studentData.badgesEarned.filter(b => b.startsWith('ethics')).length === 0) {
      awardBadge('ethics-champion');
    }

    addAchievement({
      type: 'ethics_complete',
      scenarioName: scenarioData.name || 'ethics scenario',
      message: 'Great ethical thinking!',
      xpAmount: xpAmount
    });
  };

  // Start session
  const startSession = () => {
    setSessionData({
      startTime: Date.now(),
      activitiesCompleted: 0,
      xpEarned: 0
    });
  };

  // End session
  const endSession = () => {
    const sessionDuration = Date.now() - sessionData.startTime;
    
    // Save session data (in real app, would save to backend)
    setDailyActivities(prev => [...prev, {
      date: new Date().toISOString(),
      duration: sessionDuration,
      activitiesCompleted: sessionData.activitiesCompleted,
      xpEarned: sessionData.xpEarned
    }]);

    // Reset session
    setSessionData({
      startTime: null,
      activitiesCompleted: 0,
      xpEarned: 0
    });
  };

  // Get leaderboard position (mock)
  const getLeaderboardPosition = () => {
    // In real app, this would fetch from backend
    return Math.floor(Math.random() * 20) + 1;
  };

  // Get weekly progress
  const getWeeklyProgress = () => {
    return {
      daysActive: studentData.thisWeekDays,
      goal: studentData.weeklyGoal,
      percentage: Math.min((studentData.thisWeekDays / studentData.weeklyGoal) * 100, 100)
    };
  };

  // Context value
  const contextValue = {
    // Data
    studentData,
    pendingAchievements,
    dailyActivities,
    sessionData,
    levelDefinitions,
    badgeDefinitions,
    
    // Actions
    awardXP,
    awardBadge,
    updateStreak,
    completeLesson,
    completeQuiz,
    completeCodeChallenge,
    completeEthicsScenario,
    startSession,
    endSession,
    addAchievement,
    clearAchievements,
    
    // Utilities
    calculateLevel,
    getLeaderboardPosition,
    getWeeklyProgress
  };

  return (
    <GamificationContext.Provider value={contextValue}>
      {children}
      
      {/* Motivational Feedback System */}
      <MotivationalFeedback
        achievements={pendingAchievements}
        onClose={clearAchievements}
        studentProgress={studentData}
      />
    </GamificationContext.Provider>
  );
};

// Gamification Dashboard Component
export const GamificationDashboard = ({ 
  showComponent = 'overview',
  studentId,
  onComponentChange = () => {}
}) => {
  const { studentData } = useGamification();

  const renderComponent = () => {
    switch (showComponent) {
      case 'level':
        return (
          <LevelSystem 
            studentData={studentData}
            onLevelUp={(levelData) => console.log('Level up!', levelData)}
          />
        );
      
      case 'badges':
        return (
          <BadgeSystem 
            studentData={{
              ...studentData,
              earnedBadges: studentData.badgesEarned || [],
              badgeProgress: {
                'quick-learner': { current: Math.min(studentData.lessonsCompleted || 0, 5), total: 5 },
                'knowledge-seeker': { current: Math.min(studentData.lessonsCompleted || 0, 10), total: 10 },
                'bug-squasher': { current: Math.min(Math.floor((studentData.lessonsCompleted || 0) / 2), 5), total: 5 },
                'code-ninja': { current: Math.min(studentData.lessonsCompleted || 0, 20), total: 20 },
                'week-warrior': { current: Math.min(studentData.currentStreak || 0, 7), total: 7 },
                'ethics-champion': { current: Math.min(Math.floor((studentData.lessonsCompleted || 0) / 3), 5), total: 5 }
              },
              badgesEarned: (studentData.badgesEarned || []).length,
              streakDays: studentData.currentStreak || 0
            }}
            onBadgeEarned={(badge) => console.log('Badge earned!', badge)}
          />
        );
      
      case 'streak':
        return (
          <StreakTracker 
            studentData={{
              ...studentData,
              totalDays: Math.max(studentData.lessonsCompleted || 0, studentData.currentStreak || 0),
              streakStartDate: new Date(Date.now() - (studentData.currentStreak || 0) * 24 * 60 * 60 * 1000).toISOString()
            }}
            onStreakMilestone={(milestone) => console.log('Streak milestone!', milestone)}
          />
        );
      
      case 'leaderboard':
        return (
          <Leaderboard 
            currentUserId={studentId}
            timeframe="weekly"
            category="xp"
          />
        );
      
      default:
        return (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px',
            padding: '20px'
          }}>
            <LevelSystem studentData={studentData} />
            <StreakTracker studentData={studentData} />
          </div>
        );
    }
  };

  return (
    <div>
      {renderComponent()}
    </div>
  );
};

// Quick Actions Hook
export const useQuickActions = () => {
  const { 
    completeLesson, 
    completeQuiz, 
    completeCodeChallenge, 
    completeEthicsScenario,
    awardXP,
    awardBadge 
  } = useGamification();

  return {
    onLessonComplete: completeLesson,
    onQuizComplete: completeQuiz,
    onCodeComplete: completeCodeChallenge,
    onEthicsComplete: completeEthicsScenario,
    onCustomXP: awardXP,
    onCustomBadge: awardBadge
  };
};

export default GamificationProvider;