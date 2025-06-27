// Adaptive Difficulty Engine for TrainArama
// Automatically adjusts content difficulty based on student performance and engagement

class AdaptiveDifficulty {
  constructor() {
    this.difficultyLevels = this.initializeDifficultyLevels();
    this.adaptationRules = this.initializeAdaptationRules();
    this.performanceThresholds = this.initializeThresholds();
  }

  // Define difficulty levels for different content types
  initializeDifficultyLevels() {
    return {
      'beginner': {
        score: 0,
        name: 'Getting Started',
        characteristics: {
          explanationLength: 'detailed',
          exampleCount: 'many',
          hintFrequency: 'high',
          complexity: 'simple',
          vocabulary: 'basic',
          codeLength: 'short',
          conceptsPerActivity: 1
        },
        ageAdjustments: {
          '8-9': { timeAllowance: 1.5, helpFrequency: 'very-high', visualAids: 'extensive' },
          '10-11': { timeAllowance: 1.3, helpFrequency: 'high', visualAids: 'moderate' },
          '12-14': { timeAllowance: 1.1, helpFrequency: 'moderate', visualAids: 'minimal' }
        }
      },
      
      'novice': {
        score: 25,
        name: 'Building Confidence',
        characteristics: {
          explanationLength: 'moderate',
          exampleCount: 'several',
          hintFrequency: 'moderate',
          complexity: 'simple-to-medium',
          vocabulary: 'basic-intermediate',
          codeLength: 'short-medium',
          conceptsPerActivity: 1
        },
        ageAdjustments: {
          '8-9': { timeAllowance: 1.4, helpFrequency: 'high', visualAids: 'high' },
          '10-11': { timeAllowance: 1.2, helpFrequency: 'moderate', visualAids: 'moderate' },
          '12-14': { timeAllowance: 1.0, helpFrequency: 'low', visualAids: 'minimal' }
        }
      },
      
      'intermediate': {
        score: 50,
        name: 'Growing Understanding',
        characteristics: {
          explanationLength: 'concise',
          exampleCount: 'few',
          hintFrequency: 'low',
          complexity: 'medium',
          vocabulary: 'intermediate',
          codeLength: 'medium',
          conceptsPerActivity: 2
        },
        ageAdjustments: {
          '8-9': { timeAllowance: 1.3, helpFrequency: 'moderate', visualAids: 'moderate' },
          '10-11': { timeAllowance: 1.1, helpFrequency: 'low', visualAids: 'low' },
          '12-14': { timeAllowance: 1.0, helpFrequency: 'very-low', visualAids: 'minimal' }
        }
      },
      
      'advanced': {
        score: 75,
        name: 'Mastering Concepts',
        characteristics: {
          explanationLength: 'brief',
          exampleCount: 'minimal',
          hintFrequency: 'very-low',
          complexity: 'medium-high',
          vocabulary: 'advanced',
          codeLength: 'long',
          conceptsPerActivity: 3
        },
        ageAdjustments: {
          '8-9': { timeAllowance: 1.2, helpFrequency: 'low', visualAids: 'low' },
          '10-11': { timeAllowance: 1.0, helpFrequency: 'very-low', visualAids: 'minimal' },
          '12-14': { timeAllowance: 0.9, helpFrequency: 'minimal', visualAids: 'none' }
        }
      },
      
      'expert': {
        score: 90,
        name: 'Ready for Challenges',
        characteristics: {
          explanationLength: 'minimal',
          exampleCount: 'none',
          hintFrequency: 'none',
          complexity: 'high',
          vocabulary: 'expert',
          codeLength: 'very-long',
          conceptsPerActivity: 4
        },
        ageAdjustments: {
          '8-9': { timeAllowance: 1.1, helpFrequency: 'very-low', visualAids: 'minimal' },
          '10-11': { timeAllowance: 0.9, helpFrequency: 'minimal', visualAids: 'none' },
          '12-14': { timeAllowance: 0.8, helpFrequency: 'none', visualAids: 'none' }
        }
      }
    };
  }

  // Rules for when and how to adapt difficulty
  initializeAdaptationRules() {
    return {
      // Increase difficulty triggers
      'increase': {
        'consistent-high-performance': {
          condition: (metrics) => metrics.averageScore >= 90 && metrics.recentActivities >= 3,
          adjustment: 1,
          reason: 'Consistently scoring 90%+ - ready for more challenge'
        },
        'fast-completion': {
          condition: (metrics) => metrics.averageTimeRatio <= 0.7 && metrics.averageScore >= 80,
          adjustment: 1,
          reason: 'Completing activities quickly with good scores'
        },
        'low-help-requests': {
          condition: (metrics) => metrics.helpRequestsPerActivity <= 0.5 && metrics.averageScore >= 85,
          adjustment: 1,
          reason: 'Independent learning with high performance'
        },
        'mastery-demonstrated': {
          condition: (metrics) => metrics.perfectScores >= 2 && metrics.recentActivities >= 4,
          adjustment: 2,
          reason: 'Multiple perfect scores show mastery'
        }
      },

      // Decrease difficulty triggers
      'decrease': {
        'consistent-low-performance': {
          condition: (metrics) => metrics.averageScore <= 60 && metrics.recentActivities >= 3,
          adjustment: -1,
          reason: 'Struggling with current difficulty level'
        },
        'slow-completion': {
          condition: (metrics) => metrics.averageTimeRatio >= 1.5 && metrics.averageScore <= 70,
          adjustment: -1,
          reason: 'Taking too long and still struggling'
        },
        'high-help-requests': {
          condition: (metrics) => metrics.helpRequestsPerActivity >= 3 && metrics.averageScore <= 75,
          adjustment: -1,
          reason: 'Frequently requesting help'
        },
        'multiple-retries': {
          condition: (metrics) => metrics.retriesPerActivity >= 2,
          adjustment: -2,
          reason: 'Multiple retries indicate content too difficult'
        }
      },

      // Maintain difficulty triggers
      'maintain': {
        'optimal-performance': {
          condition: (metrics) => metrics.averageScore >= 75 && metrics.averageScore <= 85,
          reason: 'Performance in optimal learning zone'
        },
        'good-engagement': {
          condition: (metrics) => metrics.engagementScore >= 70 && metrics.helpRequestsPerActivity <= 2,
          reason: 'Good engagement and reasonable help requests'
        }
      }
    };
  }

  // Performance thresholds for different age groups
  initializeThresholds() {
    return {
      '8-9': {
        optimalScoreRange: [70, 85],
        maxHelpRequests: 4,
        maxTimeRatio: 1.8,
        minEngagement: 65
      },
      '10-11': {
        optimalScoreRange: [75, 90],
        maxHelpRequests: 3,
        maxTimeRatio: 1.5,
        minEngagement: 70
      },
      '12-14': {
        optimalScoreRange: [80, 92],
        maxHelpRequests: 2,
        maxTimeRatio: 1.3,
        minEngagement: 75
      }
    };
  }

  // Analyze student performance and recommend difficulty adjustment
  analyzePerformance(studentProfile, recentActivities = []) {
    const metrics = this.calculatePerformanceMetrics(studentProfile, recentActivities);
    const currentDifficulty = this.getCurrentDifficulty(studentProfile);
    const recommendations = this.generateRecommendations(metrics, currentDifficulty, studentProfile.ageGroup);
    
    return {
      currentLevel: currentDifficulty,
      metrics,
      recommendations,
      suggestedAdjustment: this.determineDifficultyAdjustment(metrics, currentDifficulty),
      reasoning: this.explainRecommendation(metrics, currentDifficulty, studentProfile.ageGroup)
    };
  }

  // Calculate comprehensive performance metrics
  calculatePerformanceMetrics(studentProfile, recentActivities) {
    if (recentActivities.length === 0) {
      return this.getDefaultMetrics();
    }

    const scores = recentActivities.map(a => a.score || 0);
    const times = recentActivities.map(a => a.timeSpent || 0);
    const expectedTimes = recentActivities.map(a => a.expectedTime || a.timeSpent || 600);
    const helpRequests = recentActivities.map(a => a.helpRequests || 0);
    const retries = recentActivities.map(a => a.retries || 0);

    return {
      averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length,
      recentActivities: recentActivities.length,
      perfectScores: scores.filter(score => score >= 95).length,
      averageTimeRatio: times.reduce((sum, time, i) => sum + (time / expectedTimes[i]), 0) / times.length,
      helpRequestsPerActivity: helpRequests.reduce((sum, req) => sum + req, 0) / helpRequests.length,
      retriesPerActivity: retries.reduce((sum, retry) => sum + retry, 0) / retries.length,
      engagementScore: this.calculateEngagementScore(recentActivities),
      consistencyScore: this.calculateConsistencyScore(scores),
      improvementTrend: this.calculateImprovementTrend(scores)
    };
  }

  // Get current difficulty level based on average performance
  getCurrentDifficulty(studentProfile) {
    const overallScore = studentProfile.overallProgress || 0;
    
    if (overallScore >= 90) return 'expert';
    if (overallScore >= 75) return 'advanced';
    if (overallScore >= 50) return 'intermediate';
    if (overallScore >= 25) return 'novice';
    return 'beginner';
  }

  // Determine if difficulty should be adjusted
  determineDifficultyAdjustment(metrics, currentDifficulty) {
    // Check increase conditions
    for (const [ruleName, rule] of Object.entries(this.adaptationRules.increase)) {
      if (rule.condition(metrics)) {
        return {
          direction: 'increase',
          amount: rule.adjustment,
          rule: ruleName,
          reason: rule.reason
        };
      }
    }

    // Check decrease conditions
    for (const [ruleName, rule] of Object.entries(this.adaptationRules.decrease)) {
      if (rule.condition(metrics)) {
        return {
          direction: 'decrease',
          amount: rule.adjustment,
          rule: ruleName,
          reason: rule.reason
        };
      }
    }

    // Check maintain conditions
    for (const [ruleName, rule] of Object.entries(this.adaptationRules.maintain)) {
      if (rule.condition(metrics)) {
        return {
          direction: 'maintain',
          amount: 0,
          rule: ruleName,
          reason: rule.reason
        };
      }
    }

    return {
      direction: 'maintain',
      amount: 0,
      rule: 'default',
      reason: 'No clear adaptation signal - maintaining current level'
    };
  }

  // Generate specific content recommendations
  generateContentRecommendations(studentProfile, targetDifficulty, contentType) {
    const difficulty = this.difficultyLevels[targetDifficulty];
    const ageAdjustment = difficulty.ageAdjustments[studentProfile.ageGroup];
    
    const recommendations = {
      general: {
        explanationStyle: difficulty.characteristics.explanationLength,
        numberOfExamples: difficulty.characteristics.exampleCount,
        hintLevel: difficulty.characteristics.hintFrequency,
        vocabularyLevel: difficulty.characteristics.vocabulary,
        conceptsPerActivity: difficulty.characteristics.conceptsPerActivity
      },
      
      ageSpecific: {
        timeAllowance: ageAdjustment.timeAllowance,
        helpSupport: ageAdjustment.helpFrequency,
        visualSupport: ageAdjustment.visualAids
      },

      contentSpecific: this.getContentSpecificRecommendations(contentType, targetDifficulty, studentProfile.ageGroup)
    };

    return recommendations;
  }

  // Content-type specific recommendations
  getContentSpecificRecommendations(contentType, difficulty, ageGroup) {
    const difficultyLevel = this.difficultyLevels[difficulty];
    
    const recommendations = {
      quiz: {
        questionComplexity: difficultyLevel.characteristics.complexity,
        numberOfOptions: difficulty === 'beginner' ? 3 : difficulty === 'expert' ? 5 : 4,
        allowRetries: difficulty === 'beginner' || ageGroup === '8-9',
        showExplanations: difficulty !== 'expert'
      },
      
      python: {
        codeComplexity: difficultyLevel.characteristics.codeLength,
        scaffoldingLevel: difficultyLevel.characteristics.hintFrequency,
        errorHandling: difficulty === 'beginner' ? 'friendly' : 'standard',
        debugging: difficulty === 'expert' ? 'minimal-help' : 'guided'
      },
      
      ethics: {
        scenarioComplexity: difficultyLevel.characteristics.complexity,
        numberOfChoices: difficulty === 'beginner' ? 2 : 3,
        moralAmbiguity: difficulty === 'expert' ? 'high' : 'low',
        discussionDepth: difficultyLevel.characteristics.explanationLength
      }
    };

    return recommendations[contentType] || {};
  }

  // Helper methods
  calculateEngagementScore(activities) {
    // Calculate based on completion rate, time spent, interaction frequency
    let engagementScore = 100;
    
    activities.forEach(activity => {
      if (activity.timeSpent < (activity.expectedTime * 0.5)) {
        engagementScore -= 10; // Rushed through
      }
      if (activity.helpRequests === 0 && activity.score < 70) {
        engagementScore -= 15; // Disengaged (low score, no help)
      }
      if (activity.retries > 2) {
        engagementScore -= 5; // Frustration indicator
      }
    });
    
    return Math.max(0, engagementScore);
  }

  calculateConsistencyScore(scores) {
    if (scores.length < 2) return 100;
    
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / scores.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Lower standard deviation = higher consistency
    return Math.max(0, 100 - (standardDeviation * 2));
  }

  calculateImprovementTrend(scores) {
    if (scores.length < 3) return 0;
    
    const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
    const secondHalf = scores.slice(Math.floor(scores.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, score) => sum + score, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, score) => sum + score, 0) / secondHalf.length;
    
    return secondAvg - firstAvg; // Positive = improving, Negative = declining
  }

  getDefaultMetrics() {
    return {
      averageScore: 75,
      recentActivities: 0,
      perfectScores: 0,
      averageTimeRatio: 1.0,
      helpRequestsPerActivity: 1,
      retriesPerActivity: 0,
      engagementScore: 80,
      consistencyScore: 80,
      improvementTrend: 0
    };
  }

  explainRecommendation(metrics, currentDifficulty, ageGroup) {
    const thresholds = this.performanceThresholds[ageGroup];
    const explanations = [];
    
    if (metrics.averageScore > thresholds.optimalScoreRange[1]) {
      explanations.push(`High performance (${metrics.averageScore.toFixed(1)}%) suggests readiness for more challenge`);
    } else if (metrics.averageScore < thresholds.optimalScoreRange[0]) {
      explanations.push(`Lower performance (${metrics.averageScore.toFixed(1)}%) indicates current level may be too challenging`);
    }
    
    if (metrics.helpRequestsPerActivity > thresholds.maxHelpRequests) {
      explanations.push(`High help frequency (${metrics.helpRequestsPerActivity.toFixed(1)} per activity) suggests content is too difficult`);
    }
    
    if (metrics.averageTimeRatio > thresholds.maxTimeRatio) {
      explanations.push(`Taking longer than expected (${(metrics.averageTimeRatio * 100).toFixed(0)}% of allotted time) may indicate difficulty`);
    }
    
    return explanations.length > 0 ? explanations.join('. ') : 'Performance metrics are within optimal range';
  }
}

// Export singleton instance
const adaptiveDifficulty = new AdaptiveDifficulty();
export default adaptiveDifficulty;