// Prerequisite Enforcement Engine for TrainArama
// Ensures students progress through curriculum in the right order

class PrerequisiteEngine {
  constructor() {
    this.prerequisites = this.initializePrerequisites();
    this.ageGroupRequirements = this.initializeAgeRequirements();
    this.skillLevelGates = this.initializeSkillGates();
  }

  // Initialize all prerequisite relationships
  initializePrerequisites() {
    return {
      // YEAR 1 PROGRESSION (Ages 8-11)
      'welcome-ai': {
        requires: [],
        description: 'Starting point for all students',
        ageGroups: ['8-9', '10-11', '12-14'],
        estimatedTime: 5
      },
      
      'ai-basics-quiz': {
        requires: ['welcome-ai'],
        description: 'Must understand what AI is',
        ageGroups: ['8-9', '10-11', '12-14'],
        minScore: 70,
        estimatedTime: 10
      },
      
      'python-hello-world': {
        requires: ['ai-basics-quiz'],
        description: 'First programming experience',
        ageGroups: ['10-11', '12-14'], // 8-9 might skip Python initially
        minScore: 60,
        estimatedTime: 15
      },
      
      'python-variables': {
        requires: ['python-hello-world'],
        description: 'Must understand basic Python syntax',
        ageGroups: ['10-11', '12-14'],
        minScore: 70,
        estimatedTime: 20
      },
      
      'python-loops-basic': {
        requires: ['python-variables'],
        description: 'Need variable mastery first',
        ageGroups: ['10-11', '12-14'],
        minScore: 75,
        estimatedTime: 25
      },
      
      'ai-ethics-basic': {
        requires: ['ai-basics-quiz'],
        description: 'Must understand AI fundamentals',
        ageGroups: ['8-9', '10-11', '12-14'],
        minScore: 70,
        estimatedTime: 15
      },
      
      // YEAR 2 PROGRESSION (Ages 10-14)
      'python-functions': {
        requires: ['python-loops-basic', 'python-variables'],
        description: 'Need loops and variables mastery',
        ageGroups: ['10-11', '12-14'],
        minScore: 80,
        estimatedTime: 30,
        yearLevel: 2
      },
      
      'ai-pattern-recognition': {
        requires: ['python-functions', 'ai-ethics-basic'],
        description: 'Advanced AI concepts',
        ageGroups: ['10-11', '12-14'],
        minScore: 75,
        estimatedTime: 25,
        yearLevel: 2
      },
      
      'ai-ethics-intermediate': {
        requires: ['ai-ethics-basic', 'ai-pattern-recognition'],
        description: 'Deep ethical reasoning',
        ageGroups: ['10-11', '12-14'],
        minScore: 80,
        estimatedTime: 30,
        yearLevel: 2
      },
      
      // YEAR 3 PROGRESSION (Ages 12-14)
      'python-classes': {
        requires: ['python-functions'],
        description: 'Object-oriented programming',
        ageGroups: ['12-14'],
        minScore: 85,
        estimatedTime: 40,
        yearLevel: 3
      },
      
      'ai-machine-learning-basics': {
        requires: ['python-classes', 'ai-pattern-recognition'],
        description: 'Advanced AI implementation',
        ageGroups: ['12-14'],
        minScore: 80,
        estimatedTime: 45,
        yearLevel: 3
      },
      
      'ai-ethics-advanced': {
        requires: ['ai-ethics-intermediate', 'ai-machine-learning-basics'],
        description: 'Complex ethical scenarios',
        ageGroups: ['12-14'],
        minScore: 85,
        estimatedTime: 35,
        yearLevel: 3
      },
      
      'ai-project-capstone': {
        requires: ['ai-machine-learning-basics', 'ai-ethics-advanced'],
        description: 'Final project combining all skills',
        ageGroups: ['12-14'],
        minScore: 80,
        estimatedTime: 60,
        yearLevel: 3
      }
    };
  }

  // Age-specific requirements and restrictions
  initializeAgeRequirements() {
    return {
      '8-9': {
        name: 'Young Explorers',
        maxSessionTime: 45, // minutes
        recommendedActivitiesPerSession: 3,
        focusAreas: ['visual-learning', 'interactive-games', 'basic-concepts'],
        avoidTopics: ['complex-programming', 'abstract-ethics'],
        preferredActivityTypes: ['quiz', 'interactive-demo', 'simple-coding'],
        attentionSpanMinutes: 10,
        helpFrequency: 'high'
      },
      
      '10-11': {
        name: 'Curious Learners',
        maxSessionTime: 60, // minutes
        recommendedActivitiesPerSession: 4,
        focusAreas: ['hands-on-coding', 'practical-examples', 'basic-ethics'],
        avoidTopics: ['advanced-algorithms', 'complex-ethical-dilemmas'],
        preferredActivityTypes: ['python-coding', 'quiz', 'ethics-scenarios'],
        attentionSpanMinutes: 15,
        helpFrequency: 'moderate'
      },
      
      '12-14': {
        name: 'Advanced Thinkers',
        maxSessionTime: 90, // minutes
        recommendedActivitiesPerSession: 5,
        focusAreas: ['complex-programming', 'ethical-reasoning', 'project-building'],
        avoidTopics: [], // Can handle all content
        preferredActivityTypes: ['advanced-python', 'complex-ethics', 'projects'],
        attentionSpanMinutes: 20,
        helpFrequency: 'low'
      }
    };
  }

  // Skill-based progression gates
  initializeSkillGates() {
    return {
      'programming-readiness': {
        name: 'Ready for Programming',
        requirements: ['ai-basics-quiz'],
        minScores: { 'ai-basics-quiz': 70 },
        description: 'Can start Python programming'
      },
      
      'intermediate-concepts': {
        name: 'Intermediate AI Concepts',
        requirements: ['python-variables', 'ai-ethics-basic'],
        minScores: { 'python-variables': 75, 'ai-ethics-basic': 70 },
        description: 'Ready for complex AI topics'
      },
      
      'advanced-programming': {
        name: 'Advanced Programming',
        requirements: ['python-loops-basic', 'python-functions'],
        minScores: { 'python-loops-basic': 80, 'python-functions': 80 },
        description: 'Can handle complex programming'
      },
      
      'ethical-reasoning': {
        name: 'Ethical Reasoning',
        requirements: ['ai-ethics-basic', 'ai-pattern-recognition'],
        minScores: { 'ai-ethics-basic': 75, 'ai-pattern-recognition': 75 },
        description: 'Can handle complex ethical scenarios'
      },
      
      'year-advancement': {
        name: 'Year Level Advancement',
        requirements: ['programming-readiness', 'intermediate-concepts'],
        description: 'Ready for next year curriculum'
      }
    };
  }

  // Check if student can access specific content
  canAccessContent(studentProfile, contentId) {
    const content = this.prerequisites[contentId];
    if (!content) {
      console.warn(`Content ${contentId} not found in prerequisites`);
      return { canAccess: true, reason: 'Content not regulated' };
    }

    // Age group check
    if (!content.ageGroups.includes(studentProfile.ageGroup)) {
      return {
        canAccess: false,
        reason: `Content designed for ages ${content.ageGroups.join(', ')}, student is ${studentProfile.ageGroup}`,
        suggestion: 'Try age-appropriate alternative'
      };
    }

    // Year level check
    if (content.yearLevel && content.yearLevel > studentProfile.yearLevel) {
      return {
        canAccess: false,
        reason: `Content requires Year ${content.yearLevel}, student is Year ${studentProfile.yearLevel}`,
        suggestion: 'Complete current year requirements first'
      };
    }

    // Prerequisites check
    for (const prereq of content.requires) {
      const hasCompleted = studentProfile.completedActivities.some(activity => 
        activity.id === prereq || activity.includes(prereq)
      );
      
      if (!hasCompleted) {
        return {
          canAccess: false,
          reason: `Missing prerequisite: ${prereq}`,
          suggestion: `Complete "${this.getContentName(prereq)}" first`,
          nextStep: prereq
        };
      }

      // Score requirement check
      if (content.minScore) {
        const activity = studentProfile.completedActivities.find(a => 
          a.id === prereq || a.includes(prereq)
        );
        
        if (activity && activity.score < content.minScore) {
          return {
            canAccess: false,
            reason: `Need ${content.minScore}% on ${prereq}, current score: ${activity.score}%`,
            suggestion: 'Retake prerequisite to improve score',
            nextStep: prereq
          };
        }
      }
    }

    return { canAccess: true };
  }

  // Get suggested next activities for student
  getSuggestedNext(studentProfile, limit = 3) {
    const suggestions = [];
    
    // Check all content for accessibility
    Object.keys(this.prerequisites).forEach(contentId => {
      const accessCheck = this.canAccessContent(studentProfile, contentId);
      
      if (accessCheck.canAccess) {
        const alreadyCompleted = studentProfile.completedActivities.some(a => 
          a.id === contentId || a.includes(contentId)
        );
        
        if (!alreadyCompleted) {
          const content = this.prerequisites[contentId];
          suggestions.push({
            id: contentId,
            name: this.getContentName(contentId),
            estimatedTime: content.estimatedTime,
            difficulty: this.getDifficulty(contentId),
            priority: this.calculatePriority(studentProfile, contentId),
            description: content.description
          });
        }
      }
    });

    // Sort by priority and return top suggestions
    return suggestions
      .sort((a, b) => b.priority - a.priority)
      .slice(0, limit);
  }

  // Check skill gate progression
  checkSkillGates(studentProfile) {
    const unlockedGates = [];
    const lockedGates = [];
    
    Object.values(this.skillLevelGates).forEach(gate => {
      const meetsRequirements = gate.requirements.every(req => {
        if (typeof req === 'string') {
          // Simple prerequisite check
          return studentProfile.completedActivities.some(a => 
            a.id === req || a.includes(req)
          );
        } else {
          // Complex gate requirement
          return this.canAccessContent(studentProfile, req).canAccess;
        }
      });

      // Check minimum scores if specified
      let meetsScores = true;
      if (gate.minScores) {
        Object.entries(gate.minScores).forEach(([activityId, minScore]) => {
          const activity = studentProfile.completedActivities.find(a => 
            a.id === activityId || a.includes(activityId)
          );
          if (!activity || activity.score < minScore) {
            meetsScores = false;
          }
        });
      }

      if (meetsRequirements && meetsScores) {
        unlockedGates.push(gate);
      } else {
        lockedGates.push({
          ...gate,
          missingRequirements: gate.requirements.filter(req => {
            return !studentProfile.completedActivities.some(a => 
              a.id === req || a.includes(req)
            );
          })
        });
      }
    });

    return { unlockedGates, lockedGates };
  }

  // Get age-appropriate session plan
  getSessionPlan(studentProfile, sessionLengthMinutes = 60) {
    const ageRequirements = this.ageGroupRequirements[studentProfile.ageGroup];
    const maxTime = Math.min(sessionLengthMinutes, ageRequirements.maxSessionTime);
    const maxActivities = ageRequirements.recommendedActivitiesPerSession;
    
    const suggestions = this.getSuggestedNext(studentProfile, maxActivities * 2);
    const plan = [];
    let totalTime = 0;
    
    // Prioritize based on age group preferences
    const prioritizedSuggestions = suggestions.filter(s => 
      ageRequirements.preferredActivityTypes.some(type => s.id.includes(type))
    );
    
    // Add activities within time and attention span constraints
    for (const suggestion of prioritizedSuggestions) {
      if (plan.length >= maxActivities) break;
      if (totalTime + suggestion.estimatedTime > maxTime) break;
      if (suggestion.estimatedTime > ageRequirements.attentionSpanMinutes * 1.5) continue;
      
      plan.push(suggestion);
      totalTime += suggestion.estimatedTime;
    }

    return {
      plan,
      totalTime,
      ageGroup: studentProfile.ageGroup,
      recommendations: this.getAgeSpecificRecommendations(studentProfile),
      sessionMetadata: {
        maxTime: ageRequirements.maxSessionTime,
        recommendedActivities: ageRequirements.recommendedActivitiesPerSession,
        attentionSpan: ageRequirements.attentionSpanMinutes,
        expectedHelpFrequency: ageRequirements.helpFrequency
      }
    };
  }

  // Helper methods
  getContentName(contentId) {
    const nameMap = {
      'welcome-ai': 'Welcome to AI',
      'ai-basics-quiz': 'AI Basics Quiz',
      'python-hello-world': 'Python Hello World',
      'python-variables': 'Python Variables',
      'python-loops-basic': 'Basic Python Loops',
      'ai-ethics-basic': 'Basic AI Ethics',
      'python-functions': 'Python Functions',
      'ai-pattern-recognition': 'AI Pattern Recognition',
      // ... add more mappings
    };
    return nameMap[contentId] || contentId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  getDifficulty(contentId) {
    const content = this.prerequisites[contentId];
    if (content.yearLevel === 3) return 'advanced';
    if (content.yearLevel === 2) return 'intermediate';
    return 'beginner';
  }

  calculatePriority(studentProfile, contentId) {
    let priority = 50; // Base priority
    
    const content = this.prerequisites[contentId];
    
    // Higher priority for current year level
    if (content.yearLevel === studentProfile.yearLevel) priority += 20;
    
    // Higher priority for age-appropriate content
    if (content.ageGroups.includes(studentProfile.ageGroup)) priority += 15;
    
    // Lower priority if requires higher year level
    if (content.yearLevel && content.yearLevel > studentProfile.yearLevel) priority -= 30;
    
    return priority;
  }

  getAgeSpecificRecommendations(studentProfile) {
    const ageReq = this.ageGroupRequirements[studentProfile.ageGroup];
    const recommendations = [];
    
    recommendations.push(`Break activities into ${ageReq.attentionSpanMinutes}-minute segments`);
    recommendations.push(`Expect ${ageReq.helpFrequency} help requests`);
    recommendations.push(`Focus on: ${ageReq.focusAreas.join(', ')}`);
    
    if (ageReq.avoidTopics.length > 0) {
      recommendations.push(`Avoid: ${ageReq.avoidTopics.join(', ')}`);
    }
    
    return recommendations;
  }
}

// Export singleton instance
const prerequisiteEngine = new PrerequisiteEngine();
export default prerequisiteEngine;