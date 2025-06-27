import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from './theme/ThemeProvider';
import {
  Settings,
  Upload,
  Palette,
  Type,
  Award,
  Image,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Download,
  Copy,
  Check,
  X,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  Target,
  Users,
  BookOpen,
  Shield
} from 'lucide-react';

const ManagerContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  color: ${props => props.theme.colors.textPrimary};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 600px;
`;

const ManagerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const HeaderIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentDark});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`;

const HeaderInfo = styled.div``;

const Title = styled.h1`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize['3xl']};
`;

const Subtitle = styled.p`
  margin: 8px 0 0 0;
  opacity: 0.8;
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  background: ${props => 
    props.variant === 'primary' ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.primaryDark})` :
    props.variant === 'success' ? `linear-gradient(135deg, ${props.theme.colors.success}, ${props.theme.colors.successDark})` :
    props.variant === 'danger' ? `linear-gradient(135deg, ${props.theme.colors.error}, ${props.theme.colors.errorDark})` :
    props.theme.colors.surface
  };
  border: none;
  color: ${props => props.theme.colors.textPrimary};
  padding: 12px 20px;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 30px;
  background: ${props => props.theme.colors.surface};
  padding: 4px;
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const Tab = styled.button`
  background: ${props => props.active ? props.theme.colors.surfaceHover : 'transparent'};
  border: none;
  color: ${props => props.theme.colors.textPrimary};
  padding: 12px 20px;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceHover};
  }
`;

const Section = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 25px;
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: ${props => props.theme.typography.fontSize.xl};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  opacity: 0.9;
`;

const Input = styled.input`
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textPrimary};
  padding: 12px;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.borderFocus};
    background: ${props => props.theme.colors.surfaceHover};
  }
`;

const ColorInput = styled.input`
  width: 100%;
  height: 50px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: calc(${props => props.theme.borderRadius.md} - 2px);
  }
`;

const FileUploadArea = styled.div`
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.borderHover};
    background: ${props => props.theme.colors.surface};
  }
  
  &.drag-over {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.surface};
  }
`;

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const PreviewCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 15px;
  text-align: center;
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;
  border-radius: ${props => props.theme.borderRadius.sm};
  margin-bottom: 10px;
`;

const PreviewEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
`;

const ColorCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColorSwatch = styled.div`
  width: 100%;
  height: 60px;
  background: ${props => props.color};
  border-radius: ${props => props.theme.borderRadius.sm};
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.textColor || 'white'};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const BadgeCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const BadgeIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const BadgeInfo = styled.div`
  flex: 1;
`;

const BadgeName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 4px;
`;

const BadgeActions = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallButton = styled.button`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textPrimary};
  padding: 6px 10px;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.xs};
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceHover};
  }
`;

const BrandManager = () => {
  const { theme, updateTheme, resetTheme, uploadAsset, getAsset } = useTheme();
  const [activeTab, setActiveTab] = useState('brand');
  const [uploadStatus, setUploadStatus] = useState({});
  const [previewChanges, setPreviewChanges] = useState(false);
  
  // Creation modals state
  const [showCreateBadge, setShowCreateBadge] = useState(false);
  const [showCreateAgeGroup, setShowCreateAgeGroup] = useState(false);
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  
  // Form data for new items
  const [newBadgeData, setNewBadgeData] = useState({
    id: '',
    name: '',
    description: '',
    emoji: '🏆',
    color: '#4CAF50'
  });
  
  const [newAgeGroupData, setNewAgeGroupData] = useState({
    id: '',
    name: '',
    emoji: '👶',
    primaryColor: '#2196F3'
  });
  
  const [newComponentData, setNewComponentData] = useState({
    id: '',
    name: '',
    description: '',
    emoji: '⚙️'
  });

  // Emoji picker state
  const [showEmojiPicker, setShowEmojiPicker] = useState('');

  // Common emojis for quick selection
  const commonEmojis = {
    badges: ['🏆', '🥇', '🎖️', '🏅', '⭐', '🌟', '💫', '✨', '🎯', '🎪', '🎨', '🎭', '🎪', '🎊', '🎉', '💎', '👑', '🔥', '⚡', '💪'],
    ageGroups: ['👶', '🧒', '👦', '👧', '🧑', '👨', '👩', '🎓', '📚', '🎒', '✏️', '📝', '🖍️', '🎨', '🧩', '🎮', '⚽', '🏀', '🎯', '🌟'],
    components: ['⚙️', '🔧', '🛠️', '📱', '💻', '🖥️', '⌨️', '🖱️', '📺', '📷', '🎥', '🎬', '🎵', '🎶', '🔊', '📢', '📡', '🎛️', '🔬', '🧪']
  };

  const tabs = [
    { id: 'brand', label: 'Brand Identity', icon: Sparkles },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'gamification', label: 'Gamification', icon: Award },
    { id: 'components', label: 'Components', icon: Settings }
  ];

  const handleFileUpload = async (file, assetPath, displayName) => {
    setUploadStatus({ [assetPath]: 'uploading' });
    
    try {
      await uploadAsset(file, assetPath);
      setUploadStatus({ [assetPath]: 'success' });
      setTimeout(() => {
        setUploadStatus({ [assetPath]: null });
      }, 2000);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus({ [assetPath]: 'error' });
      setTimeout(() => {
        setUploadStatus({ [assetPath]: null });
      }, 3000);
    }
  };

  const handleColorChange = (colorPath, value) => {
    updateTheme(prevTheme => {
      const newTheme = { ...prevTheme };
      const pathParts = colorPath.split('.');
      let current = newTheme;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      current[pathParts[pathParts.length - 1]] = value;
      return newTheme;
    });
  };

  // Badge management functions
  const createBadge = () => {
    if (!newBadgeData.id || !newBadgeData.name) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (theme.gamification.badges[newBadgeData.id]) {
      alert('Badge ID already exists. Please choose a different ID.');
      return;
    }
    
    updateTheme(prevTheme => ({
      ...prevTheme,
      gamification: {
        ...prevTheme.gamification,
        badges: {
          ...prevTheme.gamification.badges,
          [newBadgeData.id]: {
            name: newBadgeData.name,
            description: newBadgeData.description,
            emoji: newBadgeData.emoji,
            color: newBadgeData.color
          }
        }
      }
    }));
    
    setShowCreateBadge(false);
    setNewBadgeData({
      id: '',
      name: '',
      description: '',
      emoji: '🏆',
      color: '#4CAF50'
    });
  };

  const deleteBadge = (badgeId) => {
    if (window.confirm(`Are you sure you want to delete the badge "${theme.gamification.badges[badgeId]?.name}"?`)) {
      updateTheme(prevTheme => {
        const newBadges = { ...prevTheme.gamification.badges };
        delete newBadges[badgeId];
        return {
          ...prevTheme,
          gamification: {
            ...prevTheme.gamification,
            badges: newBadges
          }
        };
      });
    }
  };

  // Age group management functions
  const createAgeGroup = () => {
    if (!newAgeGroupData.id || !newAgeGroupData.name) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (theme.ageGroups[newAgeGroupData.id]) {
      alert('Age group ID already exists. Please choose a different ID.');
      return;
    }
    
    updateTheme(prevTheme => ({
      ...prevTheme,
      ageGroups: {
        ...prevTheme.ageGroups,
        [newAgeGroupData.id]: {
          name: newAgeGroupData.name,
          emoji: newAgeGroupData.emoji,
          primaryColor: newAgeGroupData.primaryColor
        }
      }
    }));
    
    setShowCreateAgeGroup(false);
    setNewAgeGroupData({
      id: '',
      name: '',
      emoji: '👶',
      primaryColor: '#2196F3'
    });
  };

  const deleteAgeGroup = (ageId) => {
    if (window.confirm(`Are you sure you want to delete the age group "${theme.ageGroups[ageId]?.name}"?`)) {
      updateTheme(prevTheme => {
        const newAgeGroups = { ...prevTheme.ageGroups };
        delete newAgeGroups[ageId];
        return {
          ...prevTheme,
          ageGroups: newAgeGroups
        };
      });
    }
  };

  // Component management functions
  const createComponent = () => {
    if (!newComponentData.id || !newComponentData.name) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (theme.componentIcons[newComponentData.id]) {
      alert('Component ID already exists. Please choose a different ID.');
      return;
    }
    
    updateTheme(prevTheme => ({
      ...prevTheme,
      componentIcons: {
        ...prevTheme.componentIcons,
        [newComponentData.id]: {
          name: newComponentData.name,
          description: newComponentData.description,
          emoji: newComponentData.emoji
        }
      }
    }));
    
    setShowCreateComponent(false);
    setNewComponentData({
      id: '',
      name: '',
      description: '',
      emoji: '⚙️'
    });
  };

  const deleteComponent = (componentId) => {
    if (window.confirm(`Are you sure you want to delete the component type "${componentId}"?`)) {
      updateTheme(prevTheme => {
        const newComponents = { ...prevTheme.componentIcons };
        delete newComponents[componentId];
        return {
          ...prevTheme,
          componentIcons: newComponents
        };
      });
    }
  };

  const renderBrandTab = () => (
    <>
      <Section>
        <SectionTitle>
          <BookOpen size={20} />
          Company Information
        </SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>Company Name</Label>
            <Input
              value={theme.brand.name}
              onChange={(e) => updateTheme({ brand: { ...theme.brand, name: e.target.value } })}
              placeholder="Your Company Name"
            />
          </FormGroup>
          <FormGroup>
            <Label>Tagline</Label>
            <Input
              value={theme.brand.tagline}
              onChange={(e) => updateTheme({ brand: { ...theme.brand, tagline: e.target.value } })}
              placeholder="Your company tagline"
            />
          </FormGroup>
        </FormGrid>
      </Section>

      <Section>
        <SectionTitle>
          <Image size={20} />
          Logo & Assets
        </SectionTitle>
        
        <FormGroup>
          <Label>Main Logo</Label>
          <FileUploadArea
            onClick={() => document.getElementById('logo-upload').click()}
          >
            {getAsset('brand.logo') ? (
              <PreviewImage src={getAsset('brand.logo')} alt="Company Logo" />
            ) : (
              <>
                <Upload size={48} style={{ marginBottom: '10px', opacity: 0.5 }} />
                <div>Click to upload your company logo</div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>SVG, PNG, or JPG recommended</div>
              </>
            )}
          </FileUploadArea>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'brand.logo', 'Main Logo')}
          />
          {uploadStatus['brand.logo'] && (
            <div style={{ fontSize: '12px', marginTop: '5px' }}>
              {uploadStatus['brand.logo'] === 'uploading' && '⏳ Uploading...'}
              {uploadStatus['brand.logo'] === 'success' && '✅ Upload successful!'}
              {uploadStatus['brand.logo'] === 'error' && '❌ Upload failed. Please try again.'}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Favicon</Label>
          <FileUploadArea
            onClick={() => document.getElementById('favicon-upload').click()}
          >
            {getAsset('brand.favicon') ? (
              <PreviewImage src={getAsset('brand.favicon')} alt="Favicon" />
            ) : (
              <>
                <Upload size={48} style={{ marginBottom: '10px', opacity: 0.5 }} />
                <div>Click to upload your favicon</div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>16x16 or 32x32 PNG recommended</div>
              </>
            )}
          </FileUploadArea>
          <input
            id="favicon-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'brand.favicon', 'Favicon')}
          />
        </FormGroup>
      </Section>
    </>
  );

  const renderColorsTab = () => (
    <>
      <Section>
        <SectionTitle>
          <Palette size={20} />
          Primary Colors
        </SectionTitle>
        <ColorGrid>
          <ColorCard>
            <Label>Primary Color</Label>
            <ColorSwatch color={theme.colors.primary}>{theme.colors.primary}</ColorSwatch>
            <ColorInput
              type="color"
              value={theme.colors.primary}
              onChange={(e) => handleColorChange('colors.primary', e.target.value)}
            />
          </ColorCard>
          
          <ColorCard>
            <Label>Secondary Color</Label>
            <ColorSwatch color={theme.colors.secondary}>{theme.colors.secondary}</ColorSwatch>
            <ColorInput
              type="color"
              value={theme.colors.secondary}
              onChange={(e) => handleColorChange('colors.secondary', e.target.value)}
            />
          </ColorCard>
          
          <ColorCard>
            <Label>Accent Color</Label>
            <ColorSwatch color={theme.colors.accent}>{theme.colors.accent}</ColorSwatch>
            <ColorInput
              type="color"
              value={theme.colors.accent}
              onChange={(e) => handleColorChange('colors.accent', e.target.value)}
            />
          </ColorCard>
        </ColorGrid>
      </Section>

      <Section>
        <SectionTitle>
          <Target size={20} />
          State Colors
        </SectionTitle>
        <ColorGrid>
          <ColorCard>
            <Label>Success</Label>
            <ColorSwatch color={theme.colors.success}>{theme.colors.success}</ColorSwatch>
            <ColorInput
              type="color"
              value={theme.colors.success}
              onChange={(e) => handleColorChange('colors.success', e.target.value)}
            />
          </ColorCard>
          
          <ColorCard>
            <Label>Warning</Label>
            <ColorSwatch color={theme.colors.warning}>{theme.colors.warning}</ColorSwatch>
            <ColorInput
              type="color"
              value={theme.colors.warning}
              onChange={(e) => handleColorChange('colors.warning', e.target.value)}
            />
          </ColorCard>
          
          <ColorCard>
            <Label>Error</Label>
            <ColorSwatch color={theme.colors.error}>{theme.colors.error}</ColorSwatch>
            <ColorInput
              type="color"
              value={theme.colors.error}
              onChange={(e) => handleColorChange('colors.error', e.target.value)}
            />
          </ColorCard>
          
          <ColorCard>
            <Label>Info</Label>
            <ColorSwatch color={theme.colors.info}>{theme.colors.info}</ColorSwatch>
            <ColorInput
              type="color"
              value={theme.colors.info}
              onChange={(e) => handleColorChange('colors.info', e.target.value)}
            />
          </ColorCard>
        </ColorGrid>
      </Section>
    </>
  );

  const renderGamificationTab = () => (
    <>
      <Section>
        <SectionTitle>
          <Award size={20} />
          Badges
        </SectionTitle>
        
        <FormGroup style={{ marginBottom: '20px' }}>
          <Button
            variant="primary"
            onClick={() => setShowCreateBadge(true)}
            style={{ alignSelf: 'flex-start' }}
          >
            <Plus size={16} />
            Create New Badge
          </Button>
        </FormGroup>

        <BadgeGrid>
          {Object.entries(theme.gamification.badges).map(([badgeId, badge]) => (
            <BadgeCard key={badgeId}>
              <BadgeIcon color={badge.color}>
                {getAsset(`gamification.badges.${badgeId}.icon`) ? (
                  <PreviewImage src={getAsset(`gamification.badges.${badgeId}.icon`)} alt={badge.name} />
                ) : (
                  <span className="emoji-fallback">{badge.emoji}</span>
                )}
              </BadgeIcon>
              <BadgeInfo>
                <BadgeName>{badge.name}</BadgeName>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>{badgeId}</div>
              </BadgeInfo>
              <BadgeActions>
                <SmallButton
                  onClick={() => document.getElementById(`badge-${badgeId}-upload`).click()}
                >
                  <Upload size={12} />
                  Icon
                </SmallButton>
                <input
                  id={`badge-${badgeId}-upload`}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], `gamification.badges.${badgeId}.icon`, badge.name)}
                />
                <ColorInput
                  type="color"
                  value={badge.color}
                  onChange={(e) => handleColorChange(`gamification.badges.${badgeId}.color`, e.target.value)}
                  style={{ width: '30px', height: '30px', border: 'none', borderRadius: '4px' }}
                />
                <SmallButton
                  onClick={() => deleteBadge(badgeId)}
                  style={{ background: 'linear-gradient(135deg, #f44336, #d32f2f)' }}
                >
                  <Trash2 size={12} />
                </SmallButton>
              </BadgeActions>
            </BadgeCard>
          ))}
        </BadgeGrid>
      </Section>

      <Section>
        <SectionTitle>
          <Users size={20} />
          Age Groups
        </SectionTitle>
        
        <FormGroup style={{ marginBottom: '20px' }}>
          <Button
            variant="primary"
            onClick={() => setShowCreateAgeGroup(true)}
            style={{ alignSelf: 'flex-start' }}
          >
            <Plus size={16} />
            Create New Age Group
          </Button>
        </FormGroup>

        <BadgeGrid>
          {Object.entries(theme.ageGroups).map(([ageId, ageGroup]) => (
            <BadgeCard key={ageId}>
              <BadgeIcon color={ageGroup.primaryColor}>
                {getAsset(`ageGroups.${ageId}.icon`) ? (
                  <PreviewImage src={getAsset(`ageGroups.${ageId}.icon`)} alt={ageGroup.name} />
                ) : (
                  <span className="emoji-fallback">{ageGroup.emoji}</span>
                )}
              </BadgeIcon>
              <BadgeInfo>
                <BadgeName>{ageGroup.name}</BadgeName>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>{ageId} years</div>
              </BadgeInfo>
              <BadgeActions>
                <SmallButton
                  onClick={() => document.getElementById(`age-${ageId}-upload`).click()}
                >
                  <Upload size={12} />
                  Icon
                </SmallButton>
                <input
                  id={`age-${ageId}-upload`}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], `ageGroups.${ageId}.icon`, ageGroup.name)}
                />
                <ColorInput
                  type="color"
                  value={ageGroup.primaryColor}
                  onChange={(e) => handleColorChange(`ageGroups.${ageId}.primaryColor`, e.target.value)}
                  style={{ width: '30px', height: '30px', border: 'none', borderRadius: '4px' }}
                />
                <SmallButton
                  onClick={() => deleteAgeGroup(ageId)}
                  style={{ background: 'linear-gradient(135deg, #f44336, #d32f2f)' }}
                >
                  <Trash2 size={12} />
                </SmallButton>
              </BadgeActions>
            </BadgeCard>
          ))}
        </BadgeGrid>
      </Section>
    </>
  );

  const renderTypographyTab = () => (
    <Section>
      <SectionTitle>
        <Type size={20} />
        Typography Settings
      </SectionTitle>
      <FormGrid>
        <FormGroup>
          <Label>Primary Font Family</Label>
          <Input
            value={theme.typography.fontFamily}
            onChange={(e) => updateTheme({ typography: { ...theme.typography, fontFamily: e.target.value } })}
            placeholder="'Inter', sans-serif"
          />
        </FormGroup>
        <FormGroup>
          <Label>Heading Font Family</Label>
          <Input
            value={theme.typography.fontFamilyHeading}
            onChange={(e) => updateTheme({ typography: { ...theme.typography, fontFamilyHeading: e.target.value } })}
            placeholder="'Inter', sans-serif"
          />
        </FormGroup>
      </FormGrid>
    </Section>
  );

  const renderComponentsTab = () => (
    <Section>
      <SectionTitle>
        <Settings size={20} />
        Component Icons
      </SectionTitle>
      
      <FormGroup style={{ marginBottom: '20px' }}>
        <Button
          variant="primary"
          onClick={() => setShowCreateComponent(true)}
          style={{ alignSelf: 'flex-start' }}
        >
          <Plus size={16} />
          Create New Component Type
        </Button>
      </FormGroup>

      <BadgeGrid>
        {Object.entries(theme.componentIcons).map(([componentId, component]) => (
          <BadgeCard key={componentId}>
            <BadgeIcon color={theme.colors.primary}>
              {getAsset(`componentIcons.${componentId}.icon`) ? (
                <PreviewImage src={getAsset(`componentIcons.${componentId}.icon`)} alt={componentId} />
              ) : (
                <span className="emoji-fallback">{component.emoji}</span>
              )}
            </BadgeIcon>
            <BadgeInfo>
              <BadgeName>{componentId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</BadgeName>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>{componentId}</div>
            </BadgeInfo>
            <BadgeActions>
              <SmallButton
                onClick={() => document.getElementById(`component-${componentId}-upload`).click()}
              >
                <Upload size={12} />
                Icon
              </SmallButton>
              <input
                id={`component-${componentId}-upload`}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], `componentIcons.${componentId}.icon`, componentId)}
              />
              <SmallButton
                onClick={() => deleteComponent(componentId)}
                style={{ background: 'linear-gradient(135deg, #f44336, #d32f2f)' }}
              >
                <Trash2 size={12} />
              </SmallButton>
            </BadgeActions>
          </BadgeCard>
        ))}
      </BadgeGrid>
    </Section>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'brand': return renderBrandTab();
      case 'colors': return renderColorsTab();
      case 'typography': return renderTypographyTab();
      case 'gamification': return renderGamificationTab();
      case 'components': return renderComponentsTab();
      default: return renderBrandTab();
    }
  };

  // Modal Components
  const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  const ModalContent = styled.div`
    background: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius.xl};
    padding: ${props => props.theme.spacing['2xl']};
    color: ${props => props.theme.colors.textPrimary};
    font-family: ${props => props.theme.typography.fontFamily};
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  `;

  const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid ${props => props.theme.colors.border};
  `;

  const ModalTitle = styled.h2`
    margin: 0;
    font-size: ${props => props.theme.typography.fontSize['2xl']};
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.colors.textMuted};
    cursor: pointer;
    padding: 5px;
    border-radius: ${props => props.theme.borderRadius.sm};
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.theme.colors.surface};
      color: ${props => props.theme.colors.textPrimary};
    }
  `;

  const ModalFooter = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 25px;
    padding-top: 15px;
    border-top: 1px solid ${props => props.theme.colors.border};
  `;

  const EmojiPicker = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: 15px;
    z-index: 100;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: ${props => props.theme.shadows.lg};
  `;

  const EmojiGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 8px;
  `;

  const EmojiButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    padding: 8px;
    border-radius: ${props => props.theme.borderRadius.sm};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: ${props => props.theme.colors.surfaceHover};
      transform: scale(1.1);
    }
  `;

  const IconInputContainer = styled.div`
    position: relative;
    display: flex;
    gap: 10px;
    align-items: center;
  `;

  const EmojiPickerButton = styled.button`
    background: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.textPrimary};
    padding: 8px;
    border-radius: ${props => props.theme.borderRadius.md};
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: ${props => props.theme.colors.borderHover};
      background: ${props => props.theme.colors.surfaceHover};
    }
  `;

  const renderCreateBadgeModal = () => (
    showCreateBadge && (
      <Modal onClick={(e) => e.target === e.currentTarget && setShowCreateBadge(false)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              <Award size={24} />
              Create New Badge
            </ModalTitle>
            <CloseButton onClick={() => setShowCreateBadge(false)}>
              <X size={20} />
            </CloseButton>
          </ModalHeader>
          
          <FormGrid>
            <FormGroup>
              <Label>Badge ID *</Label>
              <Input
                value={newBadgeData.id}
                onChange={(e) => setNewBadgeData({...newBadgeData, id: e.target.value.replace(/[^a-z0-9-]/g, '')})}
                placeholder="unique-badge-id"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Badge Name *</Label>
              <Input
                value={newBadgeData.name}
                onChange={(e) => setNewBadgeData({...newBadgeData, name: e.target.value})}
                placeholder="Achievement Master"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Description</Label>
              <Input
                value={newBadgeData.description}
                onChange={(e) => setNewBadgeData({...newBadgeData, description: e.target.value})}
                placeholder="Earned for completing challenges"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Icon</Label>
              <IconInputContainer>
                <Input
                  value={newBadgeData.emoji}
                  onChange={(e) => setNewBadgeData({...newBadgeData, emoji: e.target.value})}
                  placeholder="🏆"
                  style={{ flex: 1 }}
                />
                <EmojiPickerButton
                  type="button"
                  onClick={() => setShowEmojiPicker(showEmojiPicker === 'badge' ? '' : 'badge')}
                >
                  😀
                </EmojiPickerButton>
                <Button
                  onClick={() => document.getElementById('new-badge-icon-upload').click()}
                  style={{ padding: '8px 12px', fontSize: '12px' }}
                >
                  <Upload size={14} />
                  Upload
                </Button>
                {showEmojiPicker === 'badge' && (
                  <EmojiPicker>
                    <div style={{ marginBottom: '10px', fontSize: '12px', fontWeight: 'bold' }}>Badge Emojis</div>
                    <EmojiGrid>
                      {commonEmojis.badges.map((emoji, index) => (
                        <EmojiButton
                          key={index}
                          type="button"
                          onClick={() => {
                            setNewBadgeData({...newBadgeData, emoji});
                            setShowEmojiPicker('');
                          }}
                        >
                          {emoji}
                        </EmojiButton>
                      ))}
                    </EmojiGrid>
                  </EmojiPicker>
                )}
              </IconInputContainer>
              <input
                id="new-badge-icon-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleFileUpload(e.target.files[0], `gamification.badges.${newBadgeData.id}.icon`, 'New Badge Icon');
                    setNewBadgeData({...newBadgeData, emoji: '📁'});
                  }
                }}
              />
              <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                Pick an emoji, type your own, or upload a custom icon file
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>Color</Label>
              <ColorInput
                type="color"
                value={newBadgeData.color}
                onChange={(e) => setNewBadgeData({...newBadgeData, color: e.target.value})}
              />
            </FormGroup>
          </FormGrid>
          
          <ModalFooter>
            <Button onClick={() => setShowCreateBadge(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={createBadge}>
              <Plus size={16} />
              Create Badge
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  );

  const renderCreateAgeGroupModal = () => (
    showCreateAgeGroup && (
      <Modal onClick={(e) => e.target === e.currentTarget && setShowCreateAgeGroup(false)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              <Users size={24} />
              Create New Age Group
            </ModalTitle>
            <CloseButton onClick={() => setShowCreateAgeGroup(false)}>
              <X size={20} />
            </CloseButton>
          </ModalHeader>
          
          <FormGrid>
            <FormGroup>
              <Label>Age Range ID *</Label>
              <Input
                value={newAgeGroupData.id}
                onChange={(e) => setNewAgeGroupData({...newAgeGroupData, id: e.target.value.replace(/[^a-z0-9-]/g, '')})}
                placeholder="15-16"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Display Name *</Label>
              <Input
                value={newAgeGroupData.name}
                onChange={(e) => setNewAgeGroupData({...newAgeGroupData, name: e.target.value})}
                placeholder="Young Explorers"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Icon</Label>
              <IconInputContainer>
                <Input
                  value={newAgeGroupData.emoji}
                  onChange={(e) => setNewAgeGroupData({...newAgeGroupData, emoji: e.target.value})}
                  placeholder="🧒"
                  style={{ flex: 1 }}
                />
                <EmojiPickerButton
                  type="button"
                  onClick={() => setShowEmojiPicker(showEmojiPicker === 'ageGroup' ? '' : 'ageGroup')}
                >
                  😀
                </EmojiPickerButton>
                <Button
                  onClick={() => document.getElementById('new-age-group-icon-upload').click()}
                  style={{ padding: '8px 12px', fontSize: '12px' }}
                >
                  <Upload size={14} />
                  Upload
                </Button>
                {showEmojiPicker === 'ageGroup' && (
                  <EmojiPicker>
                    <div style={{ marginBottom: '10px', fontSize: '12px', fontWeight: 'bold' }}>Age Group Emojis</div>
                    <EmojiGrid>
                      {commonEmojis.ageGroups.map((emoji, index) => (
                        <EmojiButton
                          key={index}
                          type="button"
                          onClick={() => {
                            setNewAgeGroupData({...newAgeGroupData, emoji});
                            setShowEmojiPicker('');
                          }}
                        >
                          {emoji}
                        </EmojiButton>
                      ))}
                    </EmojiGrid>
                  </EmojiPicker>
                )}
              </IconInputContainer>
              <input
                id="new-age-group-icon-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleFileUpload(e.target.files[0], `ageGroups.${newAgeGroupData.id}.icon`, 'New Age Group Icon');
                    setNewAgeGroupData({...newAgeGroupData, emoji: '📁'});
                  }
                }}
              />
              <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                Pick an emoji, type your own, or upload a custom icon file
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label>Primary Color</Label>
              <ColorInput
                type="color"
                value={newAgeGroupData.primaryColor}
                onChange={(e) => setNewAgeGroupData({...newAgeGroupData, primaryColor: e.target.value})}
              />
            </FormGroup>
          </FormGrid>
          
          <ModalFooter>
            <Button onClick={() => setShowCreateAgeGroup(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={createAgeGroup}>
              <Plus size={16} />
              Create Age Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  );

  const renderCreateComponentModal = () => (
    showCreateComponent && (
      <Modal onClick={(e) => e.target === e.currentTarget && setShowCreateComponent(false)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              <Settings size={24} />
              Create New Component Type
            </ModalTitle>
            <CloseButton onClick={() => setShowCreateComponent(false)}>
              <X size={20} />
            </CloseButton>
          </ModalHeader>
          
          <FormGrid>
            <FormGroup>
              <Label>Component ID *</Label>
              <Input
                value={newComponentData.id}
                onChange={(e) => setNewComponentData({...newComponentData, id: e.target.value.replace(/[^a-z0-9-]/g, '')})}
                placeholder="custom-interactive"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Component Name *</Label>
              <Input
                value={newComponentData.name}
                onChange={(e) => setNewComponentData({...newComponentData, name: e.target.value})}
                placeholder="Interactive Widget"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Description</Label>
              <Input
                value={newComponentData.description}
                onChange={(e) => setNewComponentData({...newComponentData, description: e.target.value})}
                placeholder="A custom interactive component"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Icon</Label>
              <IconInputContainer>
                <Input
                  value={newComponentData.emoji}
                  onChange={(e) => setNewComponentData({...newComponentData, emoji: e.target.value})}
                  placeholder="🎮"
                  style={{ flex: 1 }}
                />
                <EmojiPickerButton
                  type="button"
                  onClick={() => setShowEmojiPicker(showEmojiPicker === 'component' ? '' : 'component')}
                >
                  😀
                </EmojiPickerButton>
                <Button
                  onClick={() => document.getElementById('new-component-icon-upload').click()}
                  style={{ padding: '8px 12px', fontSize: '12px' }}
                >
                  <Upload size={14} />
                  Upload
                </Button>
                {showEmojiPicker === 'component' && (
                  <EmojiPicker>
                    <div style={{ marginBottom: '10px', fontSize: '12px', fontWeight: 'bold' }}>Component Emojis</div>
                    <EmojiGrid>
                      {commonEmojis.components.map((emoji, index) => (
                        <EmojiButton
                          key={index}
                          type="button"
                          onClick={() => {
                            setNewComponentData({...newComponentData, emoji});
                            setShowEmojiPicker('');
                          }}
                        >
                          {emoji}
                        </EmojiButton>
                      ))}
                    </EmojiGrid>
                  </EmojiPicker>
                )}
              </IconInputContainer>
              <input
                id="new-component-icon-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleFileUpload(e.target.files[0], `componentIcons.${newComponentData.id}.icon`, 'New Component Icon');
                    setNewComponentData({...newComponentData, emoji: '📁'});
                  }
                }}
              />
              <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                Pick an emoji, type your own, or upload a custom icon file
              </div>
            </FormGroup>
          </FormGrid>
          
          <ModalFooter>
            <Button onClick={() => setShowCreateComponent(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={createComponent}>
              <Plus size={16} />
              Create Component
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  );

  return (
    <ManagerContainer>
      <ManagerHeader>
        <HeaderLeft>
          <HeaderIcon>
            <Palette size={28} />
          </HeaderIcon>
          <HeaderInfo>
            <Title>Brand Manager</Title>
            <Subtitle>Customize your platform's look, feel, and assets</Subtitle>
          </HeaderInfo>
        </HeaderLeft>
        
        <HeaderControls>
          <Button onClick={resetTheme}>
            <RotateCcw size={16} />
            Reset to Defaults
          </Button>
          <Button variant="success">
            <Save size={16} />
            Save Changes
          </Button>
        </HeaderControls>
      </ManagerHeader>

      <TabContainer>
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={16} />
              {tab.label}
            </Tab>
          );
        })}
      </TabContainer>

      {renderTabContent()}
      
      {/* Creation Modals */}
      {renderCreateBadgeModal()}
      {renderCreateAgeGroupModal()}
      {renderCreateComponentModal()}
    </ManagerContainer>
  );
};

export default BrandManager;