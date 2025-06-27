import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Analytics Context
const AnalyticsContext = createContext();

// Custom hook to use analytics
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

// Privacy-compliant analytics for educational use
class EducationalAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = null;
    this.userRole = null;
    this.ageGroup = null;
    this.franchiseId = null;
    this.events = [];
    this.pageStartTime = Date.now();
    this.currentPage = null;
    this.isTracking = true;
  }

  // Generate anonymous session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Initialize user context (privacy-compliant)
  initUser(userData) {
    this.userId = userData.hashedUserId || this.generateAnonymousId(); // Use hashed ID for privacy
    this.userRole = userData.role; // student, teacher, parent
    this.ageGroup = userData.ageGroup; // 8-9, 10-11, 12-14
    this.franchiseId = userData.franchiseId || 'demo';
    
    this.trackEvent('user_session_start', {
      role: this.userRole,
      ageGroup: this.ageGroup,
      franchiseId: this.franchiseId,
      timestamp: Date.now()
    });
  }

  generateAnonymousId() {
    return 'anon_' + Math.random().toString(36).substr(2, 16);
  }

  // Track page views and time spent
  trackPageView(pageName, metadata = {}) {
    // Track previous page exit time
    if (this.currentPage) {
      this.trackEvent('page_exit', {
        page: this.currentPage,
        timeSpent: Date.now() - this.pageStartTime,
        timestamp: Date.now()
      });
    }

    // Track new page entry
    this.currentPage = pageName;
    this.pageStartTime = Date.now();
    
    this.trackEvent('page_view', {
      page: pageName,
      ...metadata,
      timestamp: Date.now()
    });
  }

  // Track button clicks and interactions
  trackButtonClick(buttonId, metadata = {}) {
    this.trackEvent('button_click', {
      buttonId,
      page: this.currentPage,
      ...metadata,
      timestamp: Date.now()
    });
  }

  // Track educational interactions
  trackEducationalEvent(eventType, data = {}) {
    this.trackEvent(`education_${eventType}`, {
      ...data,
      page: this.currentPage,
      timestamp: Date.now()
    });
  }

  // Track AI interactions
  trackAIInteraction(interactionType, data = {}) {
    this.trackEvent(`ai_${interactionType}`, {
      ...data,
      page: this.currentPage,
      timestamp: Date.now()
    });
  }

  // Track learning progress
  trackLearningProgress(progressType, data = {}) {
    this.trackEvent(`learning_${progressType}`, {
      ...data,
      page: this.currentPage,
      timestamp: Date.now()
    });
  }

  // Core event tracking
  trackEvent(eventName, data = {}) {
    if (!this.isTracking) return;

    const event = {
      eventName,
      sessionId: this.sessionId,
      userId: this.userId,
      userRole: this.userRole,
      ageGroup: this.ageGroup,
      franchiseId: this.franchiseId,
      timestamp: Date.now(),
      ...data
    };

    this.events.push(event);
    
    // Send to analytics services
    this.sendToAnalytics(event);
    
    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }
  }

  // Send to multiple analytics services
  async sendToAnalytics(event) {
    try {
      // Send to Google Analytics 4
      if (window.gtag) {
        window.gtag('event', event.eventName, {
          custom_parameter_1: event.userRole,
          custom_parameter_2: event.ageGroup,
          custom_parameter_3: event.franchiseId,
          custom_parameter_4: event.page || 'unknown',
          event_category: this.getEventCategory(event.eventName),
          event_label: event.buttonId || event.page || 'general',
          value: event.value || 1
        });
      }

      // Send to custom backend (replace with your endpoint)
      if (process.env.REACT_APP_ANALYTICS_ENDPOINT) {
        await fetch(process.env.REACT_APP_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event)
        });
      }

      // Store locally for offline support
      this.storeEventLocally(event);

    } catch (error) {
      console.warn('Analytics error:', error);
    }
  }

  // Categorize events for better organization
  getEventCategory(eventName) {
    if (eventName.startsWith('education_')) return 'Educational';
    if (eventName.startsWith('ai_')) return 'AI_Interaction';
    if (eventName.startsWith('learning_')) return 'Learning_Progress';
    if (eventName.includes('button_click')) return 'UI_Interaction';
    if (eventName.includes('page_')) return 'Navigation';
    return 'General';
  }

  // Store events locally for offline support and data recovery
  storeEventLocally(event) {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      storedEvents.push(event);
      
      // Keep only last 1000 events locally
      if (storedEvents.length > 1000) {
        storedEvents.splice(0, storedEvents.length - 1000);
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(storedEvents));
    } catch (error) {
      console.warn('Local storage error:', error);
    }
  }

  // Get analytics summary for current session
  getSessionSummary() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      userRole: this.userRole,
      ageGroup: this.ageGroup,
      franchiseId: this.franchiseId,
      totalEvents: this.events.length,
      sessionDuration: Date.now() - this.events[0]?.timestamp || 0,
      pagesVisited: [...new Set(this.events.filter(e => e.eventName === 'page_view').map(e => e.page))],
      buttonClicks: this.events.filter(e => e.eventName === 'button_click').length,
      aiInteractions: this.events.filter(e => e.eventName.startsWith('ai_')).length,
      educationalEvents: this.events.filter(e => e.eventName.startsWith('education_')).length
    };
  }

  // Privacy compliance - clear user data
  clearUserData() {
    this.userId = null;
    this.userRole = null;
    this.ageGroup = null;
    this.events = [];
    localStorage.removeItem('analytics_events');
  }

  // Toggle tracking for privacy
  setTracking(enabled) {
    this.isTracking = enabled;
    if (!enabled) {
      this.trackEvent('tracking_disabled');
    }
  }
}

// Analytics Provider Component
export const AnalyticsProvider = ({ children }) => {
  const analyticsRef = useRef(new EducationalAnalytics());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const analytics = analyticsRef.current;
    
    // Initialize Google Analytics 4 if not already loaded
    if (!window.gtag && process.env.REACT_APP_GA4_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA4_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', process.env.REACT_APP_GA4_MEASUREMENT_ID, {
          // Privacy-compliant settings for educational use
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
        setIsReady(true);
      };
    } else {
      setIsReady(true);
    }

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        analytics.trackEvent('page_hidden');
      } else {
        analytics.trackEvent('page_visible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track session end
    const handleBeforeUnload = () => {
      analytics.trackEvent('session_end', analytics.getSessionSummary());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const analytics = analyticsRef.current;

  return (
    <AnalyticsContext.Provider value={{
      analytics,
      isReady,
      // Convenience methods
      trackPageView: (page, metadata) => analytics.trackPageView(page, metadata),
      trackButtonClick: (buttonId, metadata) => analytics.trackButtonClick(buttonId, metadata),
      trackEducationalEvent: (eventType, data) => analytics.trackEducationalEvent(eventType, data),
      trackAIInteraction: (interactionType, data) => analytics.trackAIInteraction(interactionType, data),
      trackLearningProgress: (progressType, data) => analytics.trackLearningProgress(progressType, data),
      initUser: (userData) => analytics.initUser(userData),
      getSessionSummary: () => analytics.getSessionSummary(),
      setTracking: (enabled) => analytics.setTracking(enabled)
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// HOC for automatic page tracking
export const withAnalytics = (WrappedComponent, pageName) => {
  return function AnalyticsWrapper(props) {
    const { trackPageView } = useAnalytics();
    
    useEffect(() => {
      trackPageView(pageName, { component: WrappedComponent.name });
    }, [trackPageView]);

    return <WrappedComponent {...props} />;
  };
};

// Utility hook for button click tracking
export const useButtonTracking = () => {
  const { trackButtonClick } = useAnalytics();
  
  return (buttonId, metadata = {}) => {
    return {
      onClick: (e) => {
        trackButtonClick(buttonId, {
          ...metadata,
          target: e.target.textContent,
          position: {
            x: e.clientX,
            y: e.clientY
          }
        });
        
        // Call original onClick if provided
        if (metadata.originalOnClick) {
          metadata.originalOnClick(e);
        }
      }
    };
  };
};

export default AnalyticsProvider;