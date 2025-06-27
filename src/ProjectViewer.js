import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Eye,
  Calendar,
  Clock,
  User,
  Palette,
  Code,
  FileText,
  Music,
  Video,
  Image,
  Star,
  MessageCircle,
  ThumbsUp,
  Award,
  Sparkles,
  Brain,
  Target,
  BookOpen,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Copy,
  ExternalLink
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
  50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.4); }
  100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
`;

// Main Container
const ViewerContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
  animation: ${fadeIn} 0.6s ease-out;
`;

// Header
const ViewerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const ProjectIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.background || 'linear-gradient(135deg, #FF6B6B, #FF8E53)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  animation: ${glow} 3s infinite;
`;

const ProjectInfo = styled.div``;

const ProjectTitle = styled.h1`
  margin: 0;
  font-size: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProjectMeta = styled.div`
  font-size: 16px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 8px;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ControlButton = styled.button`
  background: ${props => 
    props.variant === 'primary' ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.variant === 'love' ? 'linear-gradient(135deg, #E91E63, #C2185B)' :
    'rgba(255, 255, 255, 0.2)'
  };
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-weight: bold;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  ${props => props.loved && css`
    animation: ${pulse} 1s ease-in-out;
  `}
`;

// Main Content
const ContentArea = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

// Project Display
const ProjectDisplay = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const DisplayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DisplayTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProjectCanvas = styled.div`
  background: ${props => props.background || 'linear-gradient(135deg, #FF6B6B, #FF8E53)'};
  border-radius: 12px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const ProjectDescription = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const ProjectStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
`;

const StatItem = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${props => props.color || '#fff'};
`;

const StatLabel = styled.div`
  font-size: 11px;
  opacity: 0.8;
`;

// Project Details
const DetailsPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const DetailSection = styled.div`
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailContent = styled.div`
  font-size: 13px;
  line-height: 1.4;
  opacity: 0.9;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const SkillIcon = styled.div`
  color: ${props => props.color || '#4CAF50'};
`;

const SkillName = styled.div`
  font-weight: bold;
  flex: 1;
`;

const SkillLevel = styled.div`
  font-size: 11px;
  padding: 2px 8px;
  background: ${props => props.color || '#4CAF50'};
  border-radius: 10px;
`;

// Process Steps
const ProcessSteps = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  animation: ${slideIn} 0.5s ease-out;
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const StepDescription = styled.div`
  font-size: 13px;
  opacity: 0.8;
  line-height: 1.3;
`;

// Comments Section
const CommentsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Comment = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px;
  animation: ${slideIn} 0.5s ease-out;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 13px;
`;

const CommentTime = styled.div`
  font-size: 11px;
  opacity: 0.7;
`;

const CommentText = styled.div`
  font-size: 13px;
  line-height: 1.4;
`;

// Mock project data
const generateProjectData = (projectId) => {
  const projects = {
    1: {
      id: 1,
      title: "My Robot Friend",
      type: "AI Art",
      thumbnail: "🤖",
      background: "linear-gradient(135deg, #4CAF50, #45a049)",
      createdDate: "2 days ago",
      timeSpent: "45 minutes",
      description: "I created this colorful robot friend using the AI art generator! I told the AI I wanted a friendly robot with blue circuits and glowing eyes. It took me a few tries to get the colors just right, but I love how happy my robot looks!",
      prompt: "Create a friendly robot with blue circuits, glowing eyes, and a happy expression. Make it colorful and cartoon-like for kids.",
      aiTool: "AI Art Generator",
      skills: [
        { name: "Creative Prompting", level: "Beginner", color: "#4CAF50" },
        { name: "Art Direction", level: "Learning", color: "#FF9800" },
        { name: "AI Collaboration", level: "Good", color: "#2196F3" }
      ],
      tags: ["Robot", "Friendly", "Colorful", "AI Art", "Creative"],
      stats: {
        attempts: 4,
        timeSpent: "45m",
        aiInteractions: 12,
        creativity: "High"
      },
      process: [
        { title: "Brainstorming", description: "Thought about what kind of robot would be a good friend" },
        { title: "First Prompt", description: "Wrote my initial description for the AI" },
        { title: "Iteration", description: "Made the prompt better by adding more details" },
        { title: "Final Creation", description: "Got the perfect robot friend!" }
      ],
      comments: [
        { author: "Ms. Johnson (Teacher)", text: "Excellent work, Alex! Your robot has such personality. I love how you refined your prompt to get exactly what you envisioned.", time: "1 day ago", avatar: "👩‍🏫" },
        { author: "Mom", text: "This is amazing! Your robot looks so friendly and creative. I'm so proud of your imagination! 💕", time: "2 days ago", avatar: "👩" },
        { author: "Emma (Classmate)", text: "Wow! Can you teach me how to make robots too? This is so cool!", time: "2 days ago", avatar: "👧" }
      ]
    }
  };
  
  return projects[projectId] || projects[1];
};

// Main Component
const ProjectViewer = ({ 
  projectId = 1,
  onBack = () => {},
  onLove = () => {},
  onShare = () => {}
}) => {
  const [project, setProject] = useState(generateProjectData(projectId));
  const [isLoved, setIsLoved] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const handleLove = () => {
    setIsLoved(!isLoved);
    onLove({ projectId, loved: !isLoved });
  };

  const handleShare = () => {
    onShare(project);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'AI Art': return <Palette size={16} />;
      case 'AI Writing': return <FileText size={16} />;
      case 'Creative Code': return <Code size={16} />;
      case 'AI Music': return <Music size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  return (
    <ViewerContainer>
      <ViewerHeader>
        <HeaderLeft>
          <BackButton onClick={onBack}>
            <ArrowLeft size={16} />
            Back to Projects
          </BackButton>
          
          <ProjectIcon background={project.background}>
            {project.thumbnail}
          </ProjectIcon>
          
          <ProjectInfo>
            <ProjectTitle>
              {project.title}
              <Star size={24} style={{ color: '#FFD700' }} />
            </ProjectTitle>
            <ProjectMeta>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {getTypeIcon(project.type)}
                {project.type}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} />
                {project.createdDate}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                {project.timeSpent}
              </span>
            </ProjectMeta>
          </ProjectInfo>
        </HeaderLeft>
        
        <HeaderControls>
          <ControlButton variant="love" loved={isLoved} onClick={handleLove}>
            <Heart size={16} />
            {isLoved ? 'Loved!' : 'Love this!'}
          </ControlButton>
          <ControlButton onClick={handleShare}>
            <Share2 size={16} />
            Share
          </ControlButton>
          <ControlButton>
            <Download size={16} />
            Download
          </ControlButton>
        </HeaderControls>
      </ViewerHeader>

      <ContentArea>
        {/* Project Display */}
        <ProjectDisplay>
          <DisplayHeader>
            <DisplayTitle>
              <Eye size={20} />
              Project Showcase
            </DisplayTitle>
            <ControlButton onClick={() => setShowFullImage(!showFullImage)}>
              <Maximize2 size={16} />
              {showFullImage ? 'Normal View' : 'Full View'}
            </ControlButton>
          </DisplayHeader>
          
          <ProjectCanvas 
            background={project.background}
            onClick={() => setShowFullImage(!showFullImage)}
          >
            {project.thumbnail}
            {project.type.includes('Video') && (
              <PlayButton>
                <Play size={24} />
              </PlayButton>
            )}
          </ProjectCanvas>
          
          <ProjectDescription>
            <strong>Alex's Story:</strong> {project.description}
          </ProjectDescription>
          
          <ProjectStats>
            <StatItem>
              <StatValue color="#4CAF50">{project.stats.attempts}</StatValue>
              <StatLabel>Attempts</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue color="#2196F3">{project.stats.timeSpent}</StatValue>
              <StatLabel>Time Spent</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue color="#FF9800">{project.stats.aiInteractions}</StatValue>
              <StatLabel>AI Chats</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue color="#9C27B0">{project.stats.creativity}</StatValue>
              <StatLabel>Creativity</StatLabel>
            </StatItem>
          </ProjectStats>
        </ProjectDisplay>

        {/* Project Details */}
        <DetailsPanel>
          <DetailSection>
            <DetailTitle>
              <Brain size={16} />
              AI Prompt Used
            </DetailTitle>
            <DetailContent>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                padding: '10px', 
                borderRadius: '8px',
                fontStyle: 'italic',
                fontSize: '12px'
              }}>
                "{project.prompt}"
              </div>
            </DetailContent>
          </DetailSection>

          <DetailSection>
            <DetailTitle>
              <Zap size={16} />
              AI Tool Used
            </DetailTitle>
            <DetailContent>
              {project.aiTool}
              <TagList>
                {project.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagList>
            </DetailContent>
          </DetailSection>

          <DetailSection>
            <DetailTitle>
              <Target size={16} />
              Skills Demonstrated
            </DetailTitle>
            <SkillsList>
              {project.skills.map((skill, index) => (
                <SkillItem key={index}>
                  <SkillIcon color={skill.color}>
                    <Star size={14} />
                  </SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                  <SkillLevel color={skill.color}>{skill.level}</SkillLevel>
                </SkillItem>
              ))}
            </SkillsList>
          </DetailSection>
        </DetailsPanel>
      </ContentArea>

      {/* Creation Process */}
      <ProcessSteps>
        <DisplayHeader>
          <DisplayTitle>
            <BookOpen size={20} />
            How Alex Created This Project
          </DisplayTitle>
        </DisplayHeader>
        
        <StepsList>
          {project.process.map((step, index) => (
            <Step key={index}>
              <StepNumber>{index + 1}</StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>
            </Step>
          ))}
        </StepsList>
      </ProcessSteps>

      {/* Comments and Feedback */}
      <CommentsSection>
        <DisplayHeader>
          <DisplayTitle>
            <MessageCircle size={20} />
            Comments & Feedback ({project.comments.length})
          </DisplayTitle>
        </DisplayHeader>
        
        <CommentsList>
          {project.comments.map((comment, index) => (
            <Comment key={index}>
              <CommentHeader>
                <CommentAuthor>
                  <span>{comment.avatar}</span>
                  {comment.author}
                </CommentAuthor>
                <CommentTime>{comment.time}</CommentTime>
              </CommentHeader>
              <CommentText>{comment.text}</CommentText>
            </Comment>
          ))}
        </CommentsList>
      </CommentsSection>
    </ViewerContainer>
  );
};

export default ProjectViewer;