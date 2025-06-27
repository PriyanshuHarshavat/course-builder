import React, { createContext, useContext, useState, useEffect } from 'react';
import { SafetyFilter } from './SafetyManager';

// Safety Context
const SafetyContext = createContext();

// Custom hook to use safety context
export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (!context) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};

// Safety Provider Component
export const SafetyProvider = ({ children, studentAge = '10-11', config = {} }) => {
  const [safetyFilter] = useState(() => new SafetyFilter({ ageGroup: studentAge, ...config }));
  const [safetyStats, setSafetyStats] = useState(safetyFilter.getStats());
  const [alertQueue, setAlertQueue] = useState([]);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSafetyStats(safetyFilter.getStats());
    }, 5000);

    return () => clearInterval(interval);
  }, [safetyFilter]);

  // Add safety alert to queue
  const addAlert = (alert) => {
    const newAlert = {
      id: Date.now(),
      timestamp: new Date(),
      ...alert
    };
    
    setAlertQueue(prev => [newAlert, ...prev.slice(0, 9)]); // Keep last 10 alerts
    
    // Auto-remove after 10 seconds for non-critical alerts
    if (alert.severity !== 'critical') {
      setTimeout(() => {
        setAlertQueue(prev => prev.filter(a => a.id !== newAlert.id));
      }, 10000);
    }
  };

  // Remove alert from queue
  const removeAlert = (alertId) => {
    setAlertQueue(prev => prev.filter(alert => alert.id !== alertId));
  };

  // Check text content for safety
  const checkTextSafety = (text, context = 'general') => {
    if (!isMonitoringActive) {
      return { allowed: true, risk: 'safe', issues: [] };
    }

    const result = safetyFilter.checkContent(text, context);
    setSafetyStats(safetyFilter.getStats());

    // Add alert if content is blocked or flagged
    if (!result.allowed) {
      addAlert({
        type: 'content_blocked',
        severity: 'high',
        message: `Content blocked: ${result.issues.join(', ')}`,
        context,
        content: text.substring(0, 50) + (text.length > 50 ? '...' : '')
      });
    } else if (result.risk === 'medium') {
      addAlert({
        type: 'content_flagged',
        severity: 'medium',
        message: `Content flagged for review`,
        context,
        content: text.substring(0, 50) + (text.length > 50 ? '...' : '')
      });
    }

    return result;
  };

  // Check if URL is safe for students
  const checkUrlSafety = (url) => {
    const safeEducationalDomains = [
      'scratch.mit.edu',
      'code.org',
      'khan-academy.org',
      'codecademy.com',
      'edx.org',
      'coursera.org',
      'huggingface.co',
      'github.com',
      'stackoverflow.com',
      'wikipedia.org',
      'youtube.com/education',
      'google.com/edu',
      'microsoft.com/education'
    ];

    const blockedDomains = [
      'facebook.com',
      'instagram.com',
      'twitter.com',
      'tiktok.com',
      'snapchat.com',
      'discord.com',
      'reddit.com'
    ];

    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.toLowerCase();

      // Check if domain is explicitly blocked
      if (blockedDomains.some(blocked => domain.includes(blocked))) {
        addAlert({
          type: 'url_blocked',
          severity: 'high',
          message: `Blocked access to social media site: ${domain}`,
          context: 'url_check',
          url
        });
        return { allowed: false, reason: 'Social media sites are not permitted' };
      }

      // Check if domain is in safe list
      if (safeEducationalDomains.some(safe => domain.includes(safe))) {
        return { allowed: true, reason: 'Educational domain verified' };
      }

      // For unknown domains, apply age-based restrictions
      const ageNum = parseInt(studentAge.split('-')[0]);
      if (ageNum < 12) {
        addAlert({
          type: 'url_restricted',
          severity: 'medium',
          message: `URL requires supervision for age group ${studentAge}: ${domain}`,
          context: 'url_check',
          url
        });
        return { 
          allowed: false, 
          reason: 'URL requires adult supervision for this age group',
          requiresSupervision: true 
        };
      }

      // Allow with warning for older students
      addAlert({
        type: 'url_warning',
        severity: 'low',
        message: `Please verify this educational resource: ${domain}`,
        context: 'url_check',
        url
      });
      return { 
        allowed: true, 
        reason: 'URL allowed with supervision recommended',
        supervision: true 
      };

    } catch (error) {
      addAlert({
        type: 'url_invalid',
        severity: 'medium',
        message: `Invalid URL format: ${url}`,
        context: 'url_check'
      });
      return { allowed: false, reason: 'Invalid URL format' };
    }
  };

  // Monitor user session for safety
  const monitorSession = (activity) => {
    if (!isMonitoringActive) return;

    const suspiciousPatterns = [
      { pattern: /password|login|signin/i, message: 'Attempting to access login credentials' },
      { pattern: /personal.*info|address|phone/i, message: 'Sharing personal information' },
      { pattern: /meet.*person|location/i, message: 'Discussing meeting in person' },
      { pattern: /download.*file|install/i, message: 'Attempting to download/install software' }
    ];

    const activityText = JSON.stringify(activity).toLowerCase();
    
    suspiciousPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(activityText)) {
        addAlert({
          type: 'suspicious_activity',
          severity: 'high',
          message,
          context: 'session_monitoring',
          activity: activity.type || 'unknown'
        });
      }
    });
  };

  // Get safety recommendations based on current context
  const getSafetyRecommendations = () => {
    const recommendations = [];
    const blockRate = parseFloat(safetyStats.blockRate);

    if (blockRate > 10) {
      recommendations.push({
        type: 'high_block_rate',
        message: 'High content blocking detected. Consider reviewing safety settings.',
        action: 'Review filter sensitivity'
      });
    }

    if (alertQueue.filter(a => a.severity === 'high').length > 3) {
      recommendations.push({
        type: 'multiple_violations',
        message: 'Multiple safety violations detected. Consider increasing supervision.',
        action: 'Increase supervision level'
      });
    }

    if (safetyStats.total > 50 && blockRate < 2) {
      recommendations.push({
        type: 'good_behavior',
        message: 'Excellent safety record! Student is following guidelines well.',
        action: 'Continue current approach'
      });
    }

    return recommendations;
  };

  // Export safety report
  const exportSafetyReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      studentAge,
      stats: safetyStats,
      recentAlerts: alertQueue.slice(0, 20),
      recommendations: getSafetyRecommendations(),
      config: safetyFilter.config,
      summary: {
        totalInteractions: safetyStats.total,
        safetyCompliance: ((safetyStats.approved / safetyStats.total) * 100).toFixed(1) + '%',
        riskLevel: safetyStats.blockRate > 15 ? 'High' : safetyStats.blockRate > 5 ? 'Medium' : 'Low'
      }
    };

    return report;
  };

  const contextValue = {
    // Safety checking functions
    checkTextSafety,
    checkUrlSafety,
    monitorSession,
    
    // Safety state
    safetyStats,
    alertQueue,
    isMonitoringActive,
    
    // Alert management
    addAlert,
    removeAlert,
    
    // Safety controls
    setIsMonitoringActive,
    getSafetyRecommendations,
    exportSafetyReport,
    
    // Safety filter instance
    safetyFilter
  };

  return (
    <SafetyContext.Provider value={contextValue}>
      {children}
    </SafetyContext.Provider>
  );
};

// HOC for adding safety checks to components
export const withSafety = (WrappedComponent) => {
  return function SafetyWrappedComponent(props) {
    const safety = useSafety();
    return <WrappedComponent {...props} safety={safety} />;
  };
};

// Safety Alert Component
export const SafetyAlerts = () => {
  const { alertQueue, removeAlert } = useSafety();

  if (alertQueue.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      {alertQueue.slice(0, 3).map(alert => ( // Show only top 3 alerts
        <div
          key={alert.id}
          style={{
            background: alert.severity === 'critical' ? '#f44336' :
                       alert.severity === 'high' ? '#FF5722' :
                       alert.severity === 'medium' ? '#FF9800' :
                       '#2196F3',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            fontSize: '14px',
            cursor: 'pointer',
            animation: 'slideInRight 0.3s ease-out'
          }}
          onClick={() => removeAlert(alert.id)}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            Safety Alert {alert.severity === 'critical' && '🚨'}
          </div>
          <div>{alert.message}</div>
          <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>
            Click to dismiss • {alert.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SafetyProvider;