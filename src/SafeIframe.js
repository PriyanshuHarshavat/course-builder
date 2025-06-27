import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSafety } from './SafetyProvider';
import {
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  Maximize2,
  Minimize2,
  RefreshCw,
  X,
  ExternalLink,
  Lock,
  Unlock,
  Monitor,
  Timer,
  Settings,
  BookOpen,
  Brain
} from 'lucide-react';

// Animations
const loadingPulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main Container
const IframeContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 20px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  height: ${props => props.isFullscreen ? '100vh' : '600px'};
  position: ${props => props.isFullscreen ? 'fixed' : 'relative'};
  top: ${props => props.isFullscreen ? '0' : 'auto'};
  left: ${props => props.isFullscreen ? '0' : 'auto'};
  right: ${props => props.isFullscreen ? '0' : 'auto'};
  bottom: ${props => props.isFullscreen ? '0' : 'auto'};
  z-index: ${props => props.isFullscreen ? '1000' : 'auto'};
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.5s ease-out;
`;

// Header Section
const IframeHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(10px);
`;

const ToolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ToolIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.toolType === 'openai' ? 'linear-gradient(135deg, #10a37f, #1a7f64)' :
                         props.toolType === 'google' ? 'linear-gradient(135deg, #4285f4, #db4437)' :
                         props.toolType === 'huggingface' ? 'linear-gradient(135deg, #ff6b35, #f7931e)' :
                         'linear-gradient(135deg, #667eea, #764ba2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const ToolDetails = styled.div`
  h3 {
    margin: 0 0 5px 0;
    font-size: 20px;
    font-weight: bold;
  }
  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Safety Panel
const SafetyPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SafetyStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  background: ${props => 
    props.status === 'safe' ? 'rgba(76, 175, 80, 0.2)' :
    props.status === 'warning' ? 'rgba(255, 152, 0, 0.2)' :
    props.status === 'blocked' ? 'rgba(244, 67, 54, 0.2)' :
    'rgba(158, 158, 158, 0.2)'
  };
  color: ${props => 
    props.status === 'safe' ? '#4CAF50' :
    props.status === 'warning' ? '#FF9800' :
    props.status === 'blocked' ? '#f44336' :
    '#9E9E9E'
  };
`;

const SessionTimer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  opacity: 0.8;
`;

// Iframe Wrapper
const IframeWrapper = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  svg {
    animation: ${loadingPulse} 1.5s infinite;
  }
`;

const LoadingText = styled.div`
  margin-top: 15px;
  font-size: 16px;
  text-align: center;
`;

const BlockedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(244, 67, 54, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  text-align: center;
  padding: 40px;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 15px;
  background: white;
`;

// Educational Tools Configuration
const AI_TOOLS = {
  'openai-playground': {
    name: 'OpenAI Playground',
    description: 'Interactive AI text generation tool',
    icon: '🤖',
    url: 'https://platform.openai.com/playground',
    toolType: 'openai',
    safetyLevel: 'moderate',
    ageRestriction: '10+',
    educationalFocus: 'Text generation and prompt engineering'
  },
  'huggingface-spaces': {
    name: 'Hugging Face Spaces',
    description: 'Community AI model demonstrations',
    icon: '🤗',
    url: 'https://huggingface.co/spaces',
    toolType: 'huggingface',
    safetyLevel: 'high',
    ageRestriction: '8+',
    educationalFocus: 'Exploring different AI models'
  },
  'ai-dungeon': {
    name: 'AI Dungeon (Educational)',
    description: 'Creative storytelling with AI',
    icon: '📖',
    url: 'https://play.aidungeon.io',
    toolType: 'creative',
    safetyLevel: 'moderate',
    ageRestriction: '12+',
    educationalFocus: 'Creative writing and narrative AI'
  },
  'scratch-ai': {
    name: 'Scratch for AI',
    description: 'Visual programming for AI concepts',
    icon: '🐱',
    url: 'https://scratch.mit.edu',
    toolType: 'educational',
    safetyLevel: 'high',
    ageRestriction: '6+',
    educationalFocus: 'Visual programming and AI logic'
  }
};

// Main Component
const SafeIframe = ({ 
  toolId = 'huggingface-spaces',
  studentAge = '10-11',
  sessionTimeLimit = 30, // minutes
  onSessionEnd = () => {},
  onSafetyViolation = () => {},
  onLearningProgress = () => {}
}) => {
  const { checkUrlSafety, monitorSession, addAlert } = useSafety();
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState('safe');
  const [sessionTime, setSessionTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const iframeRef = useRef(null);
  const sessionTimerRef = useRef(null);

  const tool = AI_TOOLS[toolId] || AI_TOOLS['huggingface-spaces'];

  // Check URL safety on component mount
  useEffect(() => {
    const urlSafetyResult = checkUrlSafety(tool.url);
    
    if (!urlSafetyResult.allowed) {
      setIsBlocked(true);
      setErrorMessage(urlSafetyResult.reason || 'This tool is not available for your age group.');
      setSafetyStatus('danger');
    } else if (urlSafetyResult.supervision) {
      setSafetyStatus('warning');
      addAlert({
        type: 'supervision_recommended',
        severity: 'medium',
        message: `Adult supervision recommended for ${tool.name}`,
        context: 'iframe_launch'
      });
    }

    // Monitor iframe launch
    monitorSession({
      type: 'iframe_tool_launch',
      tool: tool.name,
      url: tool.url,
      timestamp: new Date()
    });
  }, [tool, checkUrlSafety, addAlert, monitorSession]);

  useEffect(() => {
    const handleTimeout = () => {
      setIsBlocked(true);
      setErrorMessage('Session time limit reached. Please take a break!');
      onSessionEnd({ reason: 'timeout', duration: sessionTime });
    };

    // Start session timer
    sessionTimerRef.current = setInterval(() => {
      setSessionTime(prev => {
        const newTime = prev + 1;
        if (newTime >= sessionTimeLimit * 60) {
          handleTimeout();
        }
        return newTime;
      });
    }, 1000);

    return () => {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
      }
    };
  }, [sessionTimeLimit, onSessionEnd, sessionTime]);


  const handleIframeLoad = () => {
    setIsLoading(false);
    onLearningProgress({ 
      type: 'tool_accessed', 
      tool: tool.name,
      timestamp: new Date()
    });
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIsBlocked(true);
    setErrorMessage('Unable to load this tool. Please try again later.');
  };

  const refreshIframe = () => {
    setIsLoading(true);
    setIsBlocked(false);
    setErrorMessage('');
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        iframeRef.current.src = currentSrc;
      }, 100);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleMonitoring = () => {
    setMonitoringEnabled(!monitoringEnabled);
    onLearningProgress({
      type: 'monitoring_toggled',
      enabled: !monitoringEnabled,
      timestamp: new Date()
    });
  };

  const openInNewTab = () => {
    window.open(tool.url, '_blank', 'noopener,noreferrer');
    onLearningProgress({
      type: 'external_access',
      tool: tool.name,
      timestamp: new Date()
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeRemaining = () => {
    const remaining = (sessionTimeLimit * 60) - sessionTime;
    return Math.max(0, remaining);
  };

  const getSafetyStatusInfo = () => {
    switch (safetyStatus) {
      case 'safe':
        return { icon: <CheckCircle size={16} />, text: 'Safe & Monitored' };
      case 'warning':
        return { icon: <AlertTriangle size={16} />, text: 'Needs Supervision' };
      case 'blocked':
        return { icon: <X size={16} />, text: 'Access Blocked' };
      default:
        return { icon: <Shield size={16} />, text: 'Checking...' };
    }
  };

  const statusInfo = getSafetyStatusInfo();

  return (
    <IframeContainer isFullscreen={isFullscreen}>
      <IframeHeader>
        <ToolInfo>
          <ToolIcon toolType={tool.toolType}>
            {tool.icon}
          </ToolIcon>
          <ToolDetails>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </ToolDetails>
        </ToolInfo>
        
        <HeaderControls>
          <ControlButton onClick={refreshIframe} disabled={isBlocked}>
            <RefreshCw size={16} />
            Refresh
          </ControlButton>
          <ControlButton onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </ControlButton>
          <ControlButton onClick={openInNewTab}>
            <ExternalLink size={16} />
            New Tab
          </ControlButton>
        </HeaderControls>
      </IframeHeader>

      <SafetyPanel>
        <SafetyStatus>
          <StatusIndicator status={safetyStatus}>
            {statusInfo.icon}
            {statusInfo.text}
          </StatusIndicator>
          <ControlButton onClick={toggleMonitoring} style={{ padding: '5px 10px' }}>
            {monitoringEnabled ? <Eye size={14} /> : <EyeOff size={14} />}
            {monitoringEnabled ? 'Monitoring On' : 'Monitoring Off'}
          </ControlButton>
        </SafetyStatus>
        
        <SessionTimer>
          <Timer size={16} />
          {formatTime(sessionTime)} / {formatTime(sessionTimeLimit * 60)}
          <span style={{ marginLeft: '10px', color: getTimeRemaining() < 300 ? '#FF9800' : 'inherit' }}>
            ({formatTime(getTimeRemaining())} left)
          </span>
        </SessionTimer>
      </SafetyPanel>

      <IframeWrapper>
        {isLoading && (
          <LoadingOverlay>
            <Brain size={48} />
            <LoadingText>
              Loading {tool.name}...<br />
              <small>Setting up safe learning environment</small>
            </LoadingText>
          </LoadingOverlay>
        )}
        
        {isBlocked && (
          <BlockedOverlay>
            <AlertTriangle size={64} />
            <h3 style={{ margin: '20px 0 10px 0' }}>Access Restricted</h3>
            <p style={{ margin: '0 0 20px 0', opacity: 0.9 }}>
              {errorMessage || 'This tool is currently blocked for safety reasons.'}
            </p>
            <ControlButton onClick={refreshIframe} style={{ background: 'rgba(255,255,255,0.2)' }}>
              <RefreshCw size={16} />
              Try Again
            </ControlButton>
          </BlockedOverlay>
        )}
        
        <StyledIframe
          ref={iframeRef}
          src={tool.url}
          title={`${tool.name} - Educational AI Tool`}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
        />
      </IframeWrapper>
    </IframeContainer>
  );
};

export default SafeIframe;