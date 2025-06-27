import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Star,
  Trophy,
  Zap,
  Heart,
  Crown,
  Gift,
  Sparkles,
  Award,
  Target,
  Flame,
  Gem,
  Medal,
  Rocket,
  Brain,
  Code,
  Shield,
  X,
  ChevronRight,
  CheckCircle,
  ThumbsUp,
  Smile,
  PartyPopper
} from 'lucide-react';

// Celebration Animations
const celebrationBurst = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
  100% { transform: scale(2) rotate(360deg); opacity: 0; }
`;

const confettiFall = keyframes`
  0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
`;

const fireworkExplosion = keyframes`
  0% { transform: scale(0); opacity: 1; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3) translateY(-50px); opacity: 0; }
  50% { transform: scale(1.1) translateY(-20px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
`;

const slideInFromRight = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

// Celebration Overlay
const CelebrationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
`;

const CelebrationModal = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 25px;
  padding: 40px;
  text-align: center;
  color: white;
  position: relative;
  max-width: 500px;
  width: 100%;
  animation: ${bounceIn} 0.8s ease-out;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CelebrationIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
  animation: ${pulse} 2s infinite;
`;

const CelebrationTitle = styled.h1`
  margin: 0 0 15px 0;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const CelebrationMessage = styled.p`
  margin: 0 0 25px 0;
  font-size: 18px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
`;

const RewardDisplay = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
  backdrop-filter: blur(10px);
`;

const RewardTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #FFD700;
`;

const RewardList = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const RewardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  min-width: 80px;
`;

const RewardIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
  animation: ${sparkle} 2s infinite;
`;

const RewardLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ContinueButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  color: white;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px auto 0;
  
  &:hover {
    background: linear-gradient(135deg, #45a049, #4CAF50);
    transform: translateY(-2px);
  }
`;

// Confetti Animation
const ConfettiPiece = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${props => props.color || '#FFD700'};
  animation: ${confettiFall} ${props => props.duration || '3s'} linear infinite;
  animation-delay: ${props => props.delay || '0s'};
  border-radius: ${props => props.shape === 'circle' ? '50%' : '0'};
  opacity: 0;
  
  &:nth-child(odd) {
    transform-origin: 20% 0;
  }
  
  &:nth-child(even) {
    transform-origin: 80% 0;
  }
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 9999;
`;

// Toast Notification
const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastNotification = styled.div`
  background: ${props => {
    switch(props.type) {
      case 'success': return 'linear-gradient(135deg, #4CAF50, #45a049)';
      case 'achievement': return 'linear-gradient(135deg, #FFD700, #FFA500)';
      case 'xp': return 'linear-gradient(135deg, #667eea, #764ba2)';
      case 'streak': return 'linear-gradient(135deg, #FF6B6B, #FF8E53)';
      default: return 'linear-gradient(135deg, #667eea, #764ba2)';
    }
  }};
  color: white;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: ${slideInFromRight} 0.4s ease-out;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 280px;
  max-width: 400px;
`;

const ToastIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;
`;

const ToastContent = styled.div`
  flex: 1;
`;

const ToastTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

const ToastMessage = styled.div`
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.3;
`;

const ToastClose = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`;

// Progress Milestone
const MilestoneBar = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  text-align: center;
`;

const MilestoneTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #FFD700;
`;

const MilestoneProgress = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  height: 8px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const MilestoneProgressFill = styled.div`
  background: linear-gradient(90deg, #4CAF50, #FFD700);
  height: 100%;
  width: ${props => props.percentage || 0}%;
  transition: width 1s ease;
`;

const MilestoneText = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

// Motivational Feedback Component
const MotivationalFeedback = ({
  achievements = [],
  onClose = () => {},
  studentProgress = {
    level: 3,
    xpGained: 150,
    streakDays: 5,
    lessonsCompleted: 12,
    badgesEarned: 8
  }
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [toastNotifications, setToastNotifications] = useState([]);
  const [celebrationType, setCelebrationType] = useState('level_up');
  const [showConfetti, setShowConfetti] = useState(false);

  // Achievement types and their celebrations
  const celebrationTypes = {
    level_up: {
      icon: '👑',
      title: 'Level Up!',
      message: `Congratulations! You've reached Level ${studentProgress.level}!`,
      rewards: [
        { icon: '⭐', label: '+50 Bonus XP' },
        { icon: '🎨', label: 'New Avatar' },
        { icon: '🔓', label: 'Unlock Features' }
      ]
    },
    badge_earned: {
      icon: '🏆',
      title: 'Badge Earned!',
      message: 'You have earned a new achievement badge!',
      rewards: [
        { icon: '💎', label: '+25 XP' },
        { icon: '⭐', label: 'Badge Points' }
      ]
    },
    streak_milestone: {
      icon: '🔥',
      title: 'Streak Master!',
      message: `Amazing! ${studentProgress.streakDays} days in a row!`,
      rewards: [
        { icon: '💪', label: 'Consistency Bonus' },
        { icon: '🎯', label: '+100 XP' }
      ]
    },
    lesson_complete: {
      icon: '🎉',
      title: 'Lesson Complete!',
      message: 'Great work! You completed another lesson!',
      rewards: [
        { icon: '📚', label: 'Knowledge Point' },
        { icon: '⚡', label: `+${studentProgress.xpGained} XP` }
      ]
    },
    perfect_score: {
      icon: '⭐',
      title: 'Perfect Score!',
      message: 'Outstanding! You got everything right!',
      rewards: [
        { icon: '🏆', label: 'Perfect Badge' },
        { icon: '💯', label: 'Bonus XP' }
      ]
    },
    first_code: {
      icon: '👩‍💻',
      title: 'First Code!',
      message: 'You wrote your first program! Welcome to coding!',
      rewards: [
        { icon: '🐍', label: 'Python Badge' },
        { icon: '🚀', label: 'Coder Status' }
      ]
    }
  };

  // Add toast notification
  const addToast = (type, title, message) => {
    const newToast = {
      id: Date.now(),
      type,
      title,
      message,
      timestamp: Date.now()
    };
    
    setToastNotifications(prev => [...prev, newToast]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(newToast.id);
    }, 4000);
  };

  // Remove toast notification
  const removeToast = (id) => {
    setToastNotifications(prev => prev.filter(toast => toast.id !== id));
  };

  // Show celebration modal
  const showCelebrationModal = (type) => {
    setCelebrationType(type);
    setShowCelebration(true);
    setShowConfetti(true);
    
    // Hide confetti after 3 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  // Close celebration
  const closeCelebration = () => {
    setShowCelebration(false);
    setShowConfetti(false);
    onClose();
  };

  // Generate confetti pieces
  const generateConfetti = () => {
    const pieces = [];
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
    
    for (let i = 0; i < 50; i++) {
      pieces.push(
        <ConfettiPiece
          key={i}
          color={colors[Math.floor(Math.random() * colors.length)]}
          duration={`${2 + Math.random() * 2}s`}
          delay={`${Math.random() * 2}s`}
          shape={Math.random() > 0.5 ? 'circle' : 'square'}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      );
    }
    return pieces;
  };

  // Get achievement icon
  const getAchievementIcon = (type) => {
    const icons = {
      success: <CheckCircle size={24} />,
      achievement: <Award size={24} />,
      xp: <Zap size={24} />,
      streak: <Flame size={24} />,
      level: <Crown size={24} />
    };
    return icons[type] || <Star size={24} />;
  };

  // Trigger celebrations based on achievements
  useEffect(() => {
    if (achievements.length > 0) {
      achievements.forEach(achievement => {
        switch (achievement.type) {
          case 'level_up':
            showCelebrationModal('level_up');
            break;
          case 'badge_earned':
            addToast('achievement', 'New Badge!', achievement.message);
            break;
          case 'xp_gained':
            addToast('xp', 'XP Earned!', `+${achievement.xpAmount} Experience Points`);
            break;
          case 'streak_milestone':
            if (achievement.streakDays >= 7) {
              showCelebrationModal('streak_milestone');
            } else {
              addToast('streak', 'Streak Continue!', `${achievement.streakDays} days in a row!`);
            }
            break;
          case 'lesson_complete':
            addToast('success', 'Lesson Complete!', 'Great job finishing this lesson!');
            break;
          case 'perfect_score':
            showCelebrationModal('perfect_score');
            break;
          case 'first_code':
            showCelebrationModal('first_code');
            break;
          default:
            addToast('success', 'Achievement!', achievement.message);
        }
      });
    }
  }, [achievements]);

  const currentCelebration = celebrationTypes[celebrationType];

  return (
    <>
      {/* Toast Notifications */}
      <ToastContainer>
        {toastNotifications.map(toast => (
          <ToastNotification key={toast.id} type={toast.type}>
            <ToastIcon>
              {getAchievementIcon(toast.type)}
            </ToastIcon>
            <ToastContent>
              <ToastTitle>{toast.title}</ToastTitle>
              <ToastMessage>{toast.message}</ToastMessage>
            </ToastContent>
            <ToastClose onClick={() => removeToast(toast.id)}>
              <X size={16} />
            </ToastClose>
          </ToastNotification>
        ))}
      </ToastContainer>

      {/* Confetti Animation */}
      {showConfetti && (
        <ConfettiContainer>
          {generateConfetti()}
        </ConfettiContainer>
      )}

      {/* Celebration Modal */}
      {showCelebration && currentCelebration && (
        <CelebrationOverlay>
          <CelebrationModal>
            <CloseButton onClick={closeCelebration}>
              <X size={20} />
            </CloseButton>
            
            <CelebrationIcon>{currentCelebration.icon}</CelebrationIcon>
            <CelebrationTitle>{currentCelebration.title}</CelebrationTitle>
            <CelebrationMessage>{currentCelebration.message}</CelebrationMessage>
            
            <RewardDisplay>
              <RewardTitle>🎁 Rewards Earned</RewardTitle>
              <RewardList>
                {currentCelebration.rewards.map((reward, index) => (
                  <RewardItem key={index}>
                    <RewardIcon>{reward.icon}</RewardIcon>
                    <RewardLabel>{reward.label}</RewardLabel>
                  </RewardItem>
                ))}
              </RewardList>
            </RewardDisplay>
            
            {/* Progress Milestone */}
            <MilestoneBar>
              <MilestoneTitle>🎯 Your Progress</MilestoneTitle>
              <MilestoneProgress>
                <MilestoneProgressFill percentage={75} />
              </MilestoneProgress>
              <MilestoneText>
                Level {studentProgress.level} • {studentProgress.lessonsCompleted} lessons completed • {studentProgress.badgesEarned} badges earned
              </MilestoneText>
            </MilestoneBar>
            
            <ContinueButton onClick={closeCelebration}>
              <Rocket size={20} />
              Continue Learning!
            </ContinueButton>
          </CelebrationModal>
        </CelebrationOverlay>
      )}
    </>
  );
};

// Quick Feedback Component for inline feedback
export const QuickFeedback = ({ 
  type = 'success', 
  message = 'Great job!', 
  icon = '🎉',
  onClose = () => {},
  autoClose = true,
  duration = 3000
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!visible) return null;

  return (
    <ToastNotification type={type} style={{ position: 'relative', margin: '10px 0' }}>
      <ToastIcon>{icon}</ToastIcon>
      <ToastContent>
        <ToastMessage>{message}</ToastMessage>
      </ToastContent>
      <ToastClose onClick={() => { setVisible(false); onClose(); }}>
        <X size={16} />
      </ToastClose>
    </ToastNotification>
  );
};

// Motivational Messages
export const motivationalMessages = {
  encouragement: [
    "You're doing amazing! Keep up the great work! 🌟",
    "Every expert was once a beginner. You're on the right path! 🚀",
    "Learning is a journey, and you're making excellent progress! 📚",
    "Your curiosity and dedication are inspiring! 💫",
    "Remember: every mistake is a learning opportunity! 🧠"
  ],
  celebration: [
    "Fantastic work! You're becoming an AI expert! 🎉",
    "Outstanding! Your hard work is paying off! 🏆",
    "Incredible! You've mastered another concept! ⭐",
    "Brilliant! You're ready for the next challenge! 🎯",
    "Excellent! Your skills are growing every day! 🌱"
  ],
  persistence: [
    "Don't give up! Every challenge makes you stronger! 💪",
    "Keep trying! You're closer to success than you think! 🎯",
    "Persistence is the key to mastery! You've got this! 🔑",
    "Every step forward is progress! Keep going! 👣",
    "Challenges help us grow! You're doing great! 🌟"
  ]
};

export default MotivationalFeedback;