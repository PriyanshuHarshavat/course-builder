import React, { createContext, useContext, useState, useEffect } from 'react';

// Session Management Context
const SessionContext = createContext();

// Session state management hook
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

// Session Manager Component
export const SessionProvider = ({ children }) => {
  const [sessionState, setSessionState] = useState({
    // Session Information
    sessionId: 'session-' + Date.now(),
    studentId: 'demo-student',
    instructorId: 'instructor-1',
    franchiseId: 'trainarama-location-1',
    
    // Session Timing
    startTime: new Date(),
    duration: 3600, // 60 minutes default
    timeLeft: 3600,
    isActive: true,
    
    // Progress Tracking
    currentActivity: null,
    completedActivities: [],
    totalActivities: 0,
    overallProgress: 0,
    
    // Performance Metrics
    sessionScore: 0,
    badgesEarned: [],
    helpRequests: 0,
    engagementScore: 100,
    
    // Learning Analytics
    timePerActivity: {},
    strugglingAreas: [],
    excellingAreas: [],
    
    // Session Goals
    learningObjectives: [],
    completionGoals: {
      minActivities: 4,
      minScore: 70,
      minTime: 45 * 60 // 45 minutes minimum
    }
  });

  const [progressHistory, setProgressHistory] = useState([]);
  const [realTimeEvents, setRealTimeEvents] = useState([]);

  // Session timer
  useEffect(() => {
    let interval;
    if (sessionState.isActive && sessionState.timeLeft > 0) {
      interval = setInterval(() => {
        setSessionState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
        
        // Log real-time event every minute
        if (sessionState.timeLeft % 60 === 0) {
          logEvent('timer_update', {
            timeLeft: sessionState.timeLeft,
            progress: sessionState.overallProgress
          });
        }
      }, 1000);
    } else if (sessionState.timeLeft <= 0) {
      // Session timeout
      endSession('time_expired');
    }
    
    return () => clearInterval(interval);
  }, [sessionState.isActive, sessionState.timeLeft]);

  // Activity completion handler
  const completeActivity = (activityData) => {
    const {
      activityId,
      type,
      score,
      timeSpent,
      badgesEarned = [],
      learningObjectives = []
    } = activityData;

    setSessionState(prev => {
      const newCompleted = [...prev.completedActivities, {
        id: activityId,
        type,
        score,
        timeSpent,
        completedAt: new Date(),
        badgesEarned
      }];

      const newOverallProgress = Math.round(
        (newCompleted.length / prev.totalActivities) * 100
      );

      const newSessionScore = Math.round(
        newCompleted.reduce((sum, activity) => sum + (activity.score || 0), 0) / newCompleted.length
      );

      return {
        ...prev,
        completedActivities: newCompleted,
        overallProgress: newOverallProgress,
        sessionScore: newSessionScore,
        badgesEarned: [...prev.badgesEarned, ...badgesEarned],
        currentActivity: null,
        timePerActivity: {
          ...prev.timePerActivity,
          [activityId]: timeSpent
        }
      };
    });

    // Log completion event
    logEvent('activity_completed', {
      activityId,
      type,
      score,
      timeSpent,
      badgesEarned: badgesEarned.length
    });

    // Check session completion
    checkSessionCompletion();
  };

  // Activity start handler
  const startActivity = (activityId, activityType) => {
    setSessionState(prev => ({
      ...prev,
      currentActivity: {
        id: activityId,
        type: activityType,
        startTime: new Date()
      }
    }));

    logEvent('activity_started', {
      activityId,
      type: activityType
    });
  };

  // Help request handler
  const requestHelp = (reason, context) => {
    setSessionState(prev => ({
      ...prev,
      helpRequests: prev.helpRequests + 1
    }));

    logEvent('help_requested', {
      reason,
      context,
      currentActivity: sessionState.currentActivity?.id
    });
  };

  // Real-time event logger
  const logEvent = (eventType, data) => {
    const event = {
      id: Date.now().toString(),
      type: eventType,
      timestamp: new Date(),
      data,
      sessionId: sessionState.sessionId,
      studentId: sessionState.studentId
    };

    setRealTimeEvents(prev => [event, ...prev.slice(0, 49)]); // Keep last 50 events
    
    // In production, send to analytics service
    console.log('Session Event:', event);
  };

  // Session completion checker
  const checkSessionCompletion = () => {
    const { completionGoals, completedActivities, sessionScore, timeLeft } = sessionState;
    
    const meetsActivityGoal = completedActivities.length >= completionGoals.minActivities;
    const meetsScoreGoal = sessionScore >= completionGoals.minScore;
    const meetsTimeGoal = (3600 - timeLeft) >= completionGoals.minTime;
    
    if (meetsActivityGoal && meetsScoreGoal && meetsTimeGoal) {
      logEvent('session_goals_achieved', {
        activities: completedActivities.length,
        score: sessionScore,
        timeSpent: 3600 - timeLeft
      });
    }
  };

  // End session handler
  const endSession = (reason = 'manual') => {
    const sessionSummary = {
      sessionId: sessionState.sessionId,
      studentId: sessionState.studentId,
      startTime: sessionState.startTime,
      endTime: new Date(),
      duration: 3600 - sessionState.timeLeft,
      reason,
      completedActivities: sessionState.completedActivities.length,
      totalActivities: sessionState.totalActivities,
      overallProgress: sessionState.overallProgress,
      sessionScore: sessionState.sessionScore,
      badgesEarned: sessionState.badgesEarned.length,
      helpRequests: sessionState.helpRequests,
      goalsAchieved: {
        activities: sessionState.completedActivities.length >= sessionState.completionGoals.minActivities,
        score: sessionState.sessionScore >= sessionState.completionGoals.minScore,
        time: (3600 - sessionState.timeLeft) >= sessionState.completionGoals.minTime
      }
    };

    setSessionState(prev => ({
      ...prev,
      isActive: false
    }));

    logEvent('session_ended', sessionSummary);
    
    // Generate session report
    generateSessionReport(sessionSummary);
  };

  // Generate session report for instructors/franchise
  const generateSessionReport = (summary) => {
    const report = {
      ...summary,
      performance: {
        timeEfficiency: Math.round(((summary.completedActivities / summary.totalActivities) * (3600 / (3600 - sessionState.timeLeft))) * 100),
        averageScore: summary.sessionScore,
        engagementLevel: sessionState.engagementScore,
        learningVelocity: Math.round(summary.completedActivities / ((3600 - sessionState.timeLeft) / 60)) // activities per minute
      },
      insights: generateInsights(summary),
      recommendations: generateRecommendations(summary)
    };

    console.log('Session Report Generated:', report);
    return report;
  };

  // AI-powered insights generation
  const generateInsights = (summary) => {
    const insights = [];
    
    if (summary.sessionScore >= 90) {
      insights.push({
        type: 'success',
        message: 'Exceptional performance! Student demonstrates strong AI comprehension.',
        confidence: 0.95
      });
    }
    
    if (sessionState.helpRequests > 3) {
      insights.push({
        type: 'attention',
        message: 'Multiple help requests indicate areas needing reinforcement.',
        confidence: 0.85
      });
    }
    
    if (summary.completedActivities >= summary.totalActivities) {
      insights.push({
        type: 'success',
        message: 'All learning objectives achieved ahead of schedule.',
        confidence: 1.0
      });
    }
    
    return insights;
  };

  // Recommendations for instructors
  const generateRecommendations = (summary) => {
    const recommendations = [];
    
    if (summary.sessionScore < 70) {
      recommendations.push({
        priority: 'high',
        action: 'Schedule additional practice session',
        reason: 'Below target comprehension score'
      });
    }
    
    if (sessionState.badgesEarned.length >= 3) {
      recommendations.push({
        priority: 'medium',
        action: 'Consider advanced content for next session',
        reason: 'High engagement and achievement level'
      });
    }
    
    return recommendations;
  };

  // Context value
  const contextValue = {
    sessionState,
    progressHistory,
    realTimeEvents,
    
    // Actions
    completeActivity,
    startActivity,
    requestHelp,
    endSession,
    logEvent,
    
    // Utilities
    formatTime: (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    
    isSessionComplete: () => {
      const { completionGoals, completedActivities, sessionScore } = sessionState;
      return completedActivities.length >= completionGoals.minActivities && 
             sessionScore >= completionGoals.minScore;
    },
    
    getTimeRemaining: () => sessionState.timeLeft,
    getCurrentActivity: () => sessionState.currentActivity,
    getProgress: () => sessionState.overallProgress
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;