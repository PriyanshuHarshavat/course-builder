import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  EyeOff,
  Flag,
  Clock,
  User,
  MessageSquare,
  Brain,
  Lock,
  Unlock,
  Settings,
  AlertCircle,
  Info,
  Star,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Save,
  Download,
  Upload
} from 'lucide-react';

// Animations
const pulseAlert = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main Container
const SafetyContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
  animation: ${slideIn} 0.5s ease-out;
`;

// Header
const SafetyHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const SafetyTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const SafetySubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 20px;
`;

// Safety Status Panel
const StatusPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const StatusCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const StatusIcon = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
  color: ${props => 
    props.status === 'safe' ? '#4CAF50' :
    props.status === 'warning' ? '#FF9800' :
    props.status === 'danger' ? '#f44336' :
    '#9E9E9E'
  };
  
  ${props => props.status === 'danger' && css`
    animation: ${pulseAlert} 2s infinite;
  `}
`;

const StatusLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatusValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${props => 
    props.status === 'safe' ? '#4CAF50' :
    props.status === 'warning' ? '#FF9800' :
    props.status === 'danger' ? '#f44336' :
    'white'
  };
`;

// Content Filter Controls
const FilterControls = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 25px;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
`;

const FilterCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
`;

const FilterToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ToggleSwitch = styled.button`
  width: 50px;
  height: 25px;
  border-radius: 25px;
  border: none;
  background: ${props => props.active ? '#4CAF50' : 'rgba(255,255,255,0.3)'};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${props => props.active ? '27px' : '2px'};
    transition: all 0.3s ease;
  }
`;

const FilterDescription = styled.p`
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
  line-height: 1.3;
`;

// Moderation Log
const ModerationLog = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 25px;
`;

const LogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const LogEntries = styled.div`
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`;

const LogEntry = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LogIcon = styled.div`
  color: ${props => 
    props.type === 'blocked' ? '#f44336' :
    props.type === 'flagged' ? '#FF9800' :
    props.type === 'approved' ? '#4CAF50' :
    '#9E9E9E'
  };
`;

const LogContent = styled.div`
  flex: 1;
`;

const LogTimestamp = styled.div`
  font-size: 11px;
  opacity: 0.7;
`;

// Settings Panel
const SettingsPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const SettingCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
`;

const SettingLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SettingControl = styled.select`
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  
  option {
    background: #333;
    color: white;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background: ${props => 
    props.variant === 'primary' ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.variant === 'secondary' ? 'linear-gradient(135deg, #2196F3, #1976D2)' :
    props.variant === 'warning' ? 'linear-gradient(135deg, #FF9800, #F57C00)' :
    'rgba(255, 255, 255, 0.2)'
  };
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Safety Filter System
class SafetyFilter {
  constructor(config = {}) {
    this.config = {
      strictMode: true,
      ageGroup: '8-9',
      allowedTopics: ['education', 'science', 'art', 'coding'],
      blockedWords: this.getBlockedWords(),
      inappropriatePatterns: this.getInappropriatePatterns(),
      toxicityThreshold: 0.7,
      ...config
    };
    
    this.moderationLog = [];
  }

  getBlockedWords() {
    return [
      // Violence/weapons
      'violence', 'weapon', 'gun', 'knife', 'bomb', 'kill', 'death', 'murder',
      // Inappropriate content
      'hate', 'racist', 'discrimination', 'bullying', 'harassment',
      // Adult content indicators
      'adult', 'mature', 'explicit', 'inappropriate',
      // Personal information
      'address', 'phone number', 'password', 'credit card', 'social security'
    ];
  }

  getInappropriatePatterns() {
    return [
      /personal\s+information/i,
      /contact\s+details/i,
      /meet\s+in\s+person/i,
      /share\s+location/i,
      /dangerous\s+experiment/i,
      /harmful\s+substance/i
    ];
  }

  checkContent(text, type = 'input') {
    const result = {
      allowed: true,
      risk: 'safe',
      issues: [],
      confidence: 1.0,
      suggestions: []
    };

    // Check blocked words
    const blockedFound = this.config.blockedWords.filter(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
    
    if (blockedFound.length > 0) {
      result.allowed = false;
      result.risk = 'high';
      result.issues.push(`Contains blocked words: ${blockedFound.join(', ')}`);
    }

    // Check inappropriate patterns
    const patternMatches = this.config.inappropriatePatterns.filter(pattern => 
      pattern.test(text)
    );
    
    if (patternMatches.length > 0) {
      result.allowed = false;
      result.risk = 'high';
      result.issues.push('Contains inappropriate content patterns');
    }

    // Length check for age appropriateness
    if (text.length > 500 && this.config.ageGroup === '8-9') {
      result.risk = 'medium';
      result.suggestions.push('Consider shorter, simpler text for younger students');
    }

    // Educational content boost
    const educationalKeywords = ['learn', 'study', 'education', 'science', 'math', 'art', 'coding'];
    const educationalScore = educationalKeywords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    
    if (educationalScore > 0) {
      result.confidence += 0.2;
      result.suggestions.push('Great educational content!');
    }

    // Log the check
    this.logModeration(text, result, type);
    
    return result;
  }

  logModeration(content, result, type) {
    this.moderationLog.unshift({
      timestamp: new Date(),
      content: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
      type: type,
      result: result,
      action: result.allowed ? 'approved' : 'blocked'
    });
    
    // Keep only last 50 entries
    if (this.moderationLog.length > 50) {
      this.moderationLog = this.moderationLog.slice(0, 50);
    }
  }

  getStats() {
    const total = this.moderationLog.length;
    const blocked = this.moderationLog.filter(log => log.action === 'blocked').length;
    const flagged = this.moderationLog.filter(log => log.result.risk === 'medium').length;
    
    return {
      total,
      blocked,
      flagged,
      approved: total - blocked,
      blockRate: total > 0 ? (blocked / total * 100).toFixed(1) : 0
    };
  }
}

// Main Component
const SafetyManager = ({ 
  studentAge = '10-11',
  onConfigChange = () => {},
  onModerationAction = () => {}
}) => {
  const [safetyFilter] = useState(() => new SafetyFilter({ ageGroup: studentAge }));
  const [stats, setStats] = useState(safetyFilter.getStats());
  const [moderationLog, setModerationLog] = useState(safetyFilter.moderationLog);
  const [activeTab, setActiveTab] = useState('status');
  
  // Filter settings
  const [filterSettings, setFilterSettings] = useState({
    strictMode: true,
    profanityFilter: true,
    personalInfoBlock: true,
    violenceFilter: true,
    toxicityDetection: true,
    educationalBoost: true,
    realTimeMonitoring: true,
    parentalNotifications: false
  });

  // Safety levels
  const [safetyLevels, setSafetyLevels] = useState({
    contentFiltering: 'strict',
    ageRestrictions: 'enforced',
    timeouts: 'standard',
    supervision: 'active'
  });

  useEffect(() => {
    // Update stats periodically
    const interval = setInterval(() => {
      setStats(safetyFilter.getStats());
      setModerationLog([...safetyFilter.moderationLog]);
    }, 1000);

    return () => clearInterval(interval);
  }, [safetyFilter]);

  const handleFilterToggle = (setting) => {
    setFilterSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    onConfigChange({ filterSettings: { ...filterSettings, [setting]: !filterSettings[setting] } });
  };

  const handleLevelChange = (category, value) => {
    setSafetyLevels(prev => ({
      ...prev,
      [category]: value
    }));
    onConfigChange({ safetyLevels: { ...safetyLevels, [category]: value } });
  };

  const testSafetyFilter = () => {
    const testInputs = [
      "Tell me about artificial intelligence and machine learning",
      "I want to learn how to code in Python",
      "What's your personal phone number?",
      "Let's create some violent content",
      "How do I solve math problems with AI?"
    ];
    
    testInputs.forEach(input => {
      safetyFilter.checkContent(input, 'test');
    });
    
    setStats(safetyFilter.getStats());
    setModerationLog([...safetyFilter.moderationLog]);
  };

  const clearModerationLog = () => {
    safetyFilter.moderationLog = [];
    setModerationLog([]);
    setStats(safetyFilter.getStats());
  };

  const exportSettings = () => {
    const config = {
      filterSettings,
      safetyLevels,
      timestamp: new Date().toISOString(),
      studentAge
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `safety-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSafetyStatusIcon = (status) => {
    switch (status) {
      case 'safe': return <CheckCircle size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'danger': return <X size={20} />;
      default: return <Shield size={20} />;
    }
  };

  const getSafetyStatus = () => {
    const blockRate = parseFloat(stats.blockRate);
    if (blockRate < 5) return 'safe';
    if (blockRate < 15) return 'warning';
    return 'danger';
  };

  const currentStatus = getSafetyStatus();

  return (
    <SafetyContainer>
      <SafetyHeader>
        <SafetyTitle>
          <Shield size={32} />
          AI Safety & Content Moderation
          <Star size={32} />
        </SafetyTitle>
        <SafetySubtitle>
          Keeping students safe while they explore AI technology! 🛡️
        </SafetySubtitle>
      </SafetyHeader>

      {/* Safety Status Overview */}
      <StatusPanel>
        <StatusCard>
          <StatusIcon status={currentStatus}>
            {getSafetyStatusIcon(currentStatus)}
          </StatusIcon>
          <StatusLabel>Safety Status</StatusLabel>
          <StatusValue status={currentStatus}>
            {currentStatus.toUpperCase()}
          </StatusValue>
        </StatusCard>
        
        <StatusCard>
          <StatusIcon status="safe">
            <CheckCircle size={32} />
          </StatusIcon>
          <StatusLabel>Content Approved</StatusLabel>
          <StatusValue status="safe">{stats.approved}</StatusValue>
        </StatusCard>
        
        <StatusCard>
          <StatusIcon status="warning">
            <Flag size={32} />
          </StatusIcon>
          <StatusLabel>Content Flagged</StatusLabel>
          <StatusValue status="warning">{stats.flagged}</StatusValue>
        </StatusCard>
        
        <StatusCard>
          <StatusIcon status="danger">
            <X size={32} />
          </StatusIcon>
          <StatusLabel>Content Blocked</StatusLabel>
          <StatusValue status="danger">{stats.blocked}</StatusValue>
        </StatusCard>
      </StatusPanel>

      {/* Filter Controls */}
      <FilterControls>
        <FilterHeader>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={20} />
            Content Filter Settings
          </h3>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>
            Age Group: {studentAge} | Block Rate: {stats.blockRate}%
          </div>
        </FilterHeader>
        
        <FilterGrid>
          {Object.entries(filterSettings).map(([key, value]) => (
            <FilterCard key={key}>
              <FilterToggle>
                <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <ToggleSwitch 
                  active={value} 
                  onClick={() => handleFilterToggle(key)}
                />
              </FilterToggle>
              <FilterDescription>
                {key === 'strictMode' && 'Enable maximum content filtering and safety checks'}
                {key === 'profanityFilter' && 'Block inappropriate language and expressions'}
                {key === 'personalInfoBlock' && 'Prevent sharing of personal information'}
                {key === 'violenceFilter' && 'Filter violent or harmful content'}
                {key === 'toxicityDetection' && 'Detect and block toxic or harmful language'}
                {key === 'educationalBoost' && 'Prioritize educational and learning content'}
                {key === 'realTimeMonitoring' && 'Monitor content in real-time'}
                {key === 'parentalNotifications' && 'Send notifications to parents/teachers'}
              </FilterDescription>
            </FilterCard>
          ))}
        </FilterGrid>
      </FilterControls>

      {/* Safety Level Configuration */}
      <SettingsPanel>
        <h3 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lock size={20} />
          Safety Level Configuration
        </h3>
        
        <SettingsGrid>
          <SettingCard>
            <SettingLabel>
              <Shield size={16} />
              Content Filtering
            </SettingLabel>
            <SettingControl 
              value={safetyLevels.contentFiltering}
              onChange={(e) => handleLevelChange('contentFiltering', e.target.value)}
            >
              <option value="strict">Strict - Maximum Safety</option>
              <option value="moderate">Moderate - Balanced</option>
              <option value="relaxed">Relaxed - Minimal Filtering</option>
            </SettingControl>
          </SettingCard>
          
          <SettingCard>
            <SettingLabel>
              <User size={16} />
              Age Restrictions
            </SettingLabel>
            <SettingControl 
              value={safetyLevels.ageRestrictions}
              onChange={(e) => handleLevelChange('ageRestrictions', e.target.value)}
            >
              <option value="enforced">Strictly Enforced</option>
              <option value="suggested">Suggested Guidelines</option>
              <option value="disabled">Disabled</option>
            </SettingControl>
          </SettingCard>
          
          <SettingCard>
            <SettingLabel>
              <Clock size={16} />
              Session Timeouts
            </SettingLabel>
            <SettingControl 
              value={safetyLevels.timeouts}
              onChange={(e) => handleLevelChange('timeouts', e.target.value)}
            >
              <option value="short">Short (15 min)</option>
              <option value="standard">Standard (30 min)</option>
              <option value="extended">Extended (60 min)</option>
            </SettingControl>
          </SettingCard>
          
          <SettingCard>
            <SettingLabel>
              <Eye size={16} />
              Supervision Level
            </SettingLabel>
            <SettingControl 
              value={safetyLevels.supervision}
              onChange={(e) => handleLevelChange('supervision', e.target.value)}
            >
              <option value="active">Active Monitoring</option>
              <option value="periodic">Periodic Checks</option>
              <option value="minimal">Minimal Oversight</option>
            </SettingControl>
          </SettingCard>
        </SettingsGrid>
      </SettingsPanel>

      {/* Moderation Log */}
      <ModerationLog>
        <LogHeader>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={20} />
            Recent Moderation Activity
          </h3>
          <ActionButton variant="secondary" onClick={clearModerationLog}>
            <RotateCcw size={16} />
            Clear Log
          </ActionButton>
        </LogHeader>
        
        <LogEntries>
          {moderationLog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', opacity: 0.7 }}>
              <Info size={32} />
              <p>No moderation activity yet. Start using AI tools to see safety logs here!</p>
            </div>
          ) : (
            moderationLog.map((entry, index) => (
              <LogEntry key={index}>
                <LogIcon type={entry.action}>
                  {entry.action === 'blocked' ? <X size={16} /> :
                   entry.action === 'flagged' ? <Flag size={16} /> :
                   <CheckCircle size={16} />}
                </LogIcon>
                <LogContent>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {entry.action.toUpperCase()} - {entry.type}
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>
                    "{entry.content}"
                  </div>
                  {entry.result.issues.length > 0 && (
                    <div style={{ fontSize: '11px', color: '#FF9800', marginTop: '4px' }}>
                      Issues: {entry.result.issues.join(', ')}
                    </div>
                  )}
                </LogContent>
                <LogTimestamp>
                  {entry.timestamp.toLocaleTimeString()}
                </LogTimestamp>
              </LogEntry>
            ))
          )}
        </LogEntries>
      </ModerationLog>

      {/* Action Buttons */}
      <ActionButtons>
        <ActionButton variant="primary" onClick={testSafetyFilter}>
          <Brain size={16} />
          Test Safety Filters
        </ActionButton>
        <ActionButton variant="secondary" onClick={exportSettings}>
          <Download size={16} />
          Export Settings
        </ActionButton>
        <ActionButton onClick={() => window.location.reload()}>
          <RotateCcw size={16} />
          Reset to Defaults
        </ActionButton>
      </ActionButtons>
    </SafetyContainer>
  );
};

export { SafetyManager, SafetyFilter };
export default SafetyManager;