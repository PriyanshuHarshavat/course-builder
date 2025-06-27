import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  BookOpen,
  Code,
  Shield,
  Brain,
  Palette,
  Users,
  Clock,
  Target,
  Star,
  Play,
  Eye,
  Copy,
  Filter,
  Search,
  ChevronRight,
  Award,
  Zap,
  Heart,
  Download,
  X
} from 'lucide-react';
import { lessonTemplates, getTemplatesByAge, getTemplatesBySubject } from './LessonTemplates';

// Animations
const slideIn = keyframes`
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const cardHover = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-5px); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Main Container
const GalleryContainer = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 20px;
  padding: 30px;
  min-height: 600px;
  position: relative;
  overflow: hidden;
`;

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const GalleryTitle = styled.h1`
  margin: 0 0 10px 0;
  color: #2D3436;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const GallerySubtitle = styled.p`
  color: #636E72;
  font-size: 18px;
  margin: 0;
`;

// Filters Section
const FiltersSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #2D3436;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e0e6ff;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #e0e6ff;
  border-radius: 8px;
  font-size: 14px;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

// Template Grid
const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    ${css`animation: ${cardHover} 0.3s ease forwards;`}
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  }
  
  ${css`animation: ${slideIn} 0.6s ease-out;`}
`;

const CardHeader = styled.div`
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea, #764ba2)'};
  color: white;
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    ${css`animation: ${shimmer} 3s infinite;`}
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 10px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardDescription = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.9;
`;

const CardBody = styled.div`
  padding: 20px;
`;

const ObjectivesList = styled.ul`
  margin: 0 0 15px 0;
  padding-left: 20px;
  color: #2D3436;
`;

const ObjectiveItem = styled.li`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 6px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const Tag = styled.span`
  background: ${props => props.color || '#e0e6ff'};
  color: ${props => props.textColor || '#667eea'};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &.primary {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
  }
  
  &.secondary {
    background: #f1f3f4;
    color: #2D3436;
    
    &:hover {
      background: #e8eaed;
      transform: translateY(-1px);
    }
  }
`;

// Preview Modal
const PreviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

const PreviewContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const PreviewHeader = styled.div`
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea, #764ba2)'};
  color: white;
  padding: 30px;
  border-radius: 20px 20px 0 0;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255,255,255,0.2);
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
    background: rgba(255,255,255,0.3);
  }
`;

const PreviewBody = styled.div`
  padding: 30px;
`;

const ElementPreview = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid ${props => props.color || '#667eea'};
  background: ${props => props.bgColor || '#f8f9ff'};
`;

const ElementType = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

// Subject Icons
const getSubjectIcon = (subject) => {
  const icons = {
    'Python Programming': Code,
    'AI Ethics': Shield,
    'Logic & Problem Solving': Brain,
    'Creativity & AI Design': Palette
  };
  return icons[subject] || BookOpen;
};

const getSubjectColor = (subject) => {
  const colors = {
    'Python Programming': 'linear-gradient(135deg, #3776ab, #ffd43b)',
    'AI Ethics': 'linear-gradient(135deg, #667eea, #764ba2)',
    'Logic & Problem Solving': 'linear-gradient(135deg, #4CAF50, #45a049)',
    'Creativity & AI Design': 'linear-gradient(135deg, #FF6B6B, #FF8E53)'
  };
  return colors[subject] || 'linear-gradient(135deg, #667eea, #764ba2)';
};

// Template Gallery Component
const TemplateGallery = ({ onTemplateSelect, onImportTemplate }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    ageGroup: 'all',
    subject: 'all',
    difficulty: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  // Get all templates on mount
  useEffect(() => {
    const allTemplates = [];
    Object.keys(lessonTemplates).forEach(subject => {
      Object.keys(lessonTemplates[subject]).forEach(ageGroup => {
        allTemplates.push(...lessonTemplates[subject][ageGroup]);
      });
    });
    setFilteredTemplates(allTemplates);
  }, []);

  // Filter templates when filters change
  useEffect(() => {
    let filtered = [];
    
    Object.keys(lessonTemplates).forEach(subject => {
      Object.keys(lessonTemplates[subject]).forEach(ageGroup => {
        lessonTemplates[subject][ageGroup].forEach(template => {
          // Apply filters
          if (selectedFilters.ageGroup !== 'all' && template.ageGroup !== selectedFilters.ageGroup) return;
          if (selectedFilters.subject !== 'all' && template.subject !== selectedFilters.subject) return;
          if (selectedFilters.difficulty !== 'all' && template.difficulty !== selectedFilters.difficulty) return;
          
          // Apply search
          if (searchTerm && !template.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !template.description.toLowerCase().includes(searchTerm.toLowerCase())) return;
          
          filtered.push(template);
        });
      });
    });
    
    setFilteredTemplates(filtered);
  }, [selectedFilters, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const handleImport = (template) => {
    if (onImportTemplate) {
      onImportTemplate(template);
    }
    console.log('Importing template:', template.title);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'beginner': '#4CAF50',
      'intermediate': '#FF9800', 
      'advanced': '#f44336'
    };
    return colors[difficulty] || '#667eea';
  };

  const getElementIcon = (type) => {
    const icons = {
      'title': Star,
      'text': BookOpen,
      'python-playground': Code,
      'quiz': Brain,
      'ethics': Shield,
      'image': Palette
    };
    return icons[type] || BookOpen;
  };

  return (
    <GalleryContainer>
      <GalleryHeader>
        <GalleryTitle>
          <BookOpen size={36} />
          Lesson Template Gallery
          <Award size={36} />
        </GalleryTitle>
        <GallerySubtitle>
          Ready-to-use AI education lessons for ages 8-14 • Franchise-customizable content
        </GallerySubtitle>
      </GalleryHeader>

      {/* Filters */}
      <FiltersSection>
        <FilterGroup>
          <FilterLabel>
            <Users size={16} />
            Age Group
          </FilterLabel>
          <FilterSelect 
            value={selectedFilters.ageGroup}
            onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
          >
            <option value="all">All Ages</option>
            <option value="8-9">Ages 8-9</option>
            <option value="10-11">Ages 10-11</option>
            <option value="12-14">Ages 12-14</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>
            <BookOpen size={16} />
            Subject
          </FilterLabel>
          <FilterSelect 
            value={selectedFilters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
          >
            <option value="all">All Subjects</option>
            <option value="Python Programming">Python Programming</option>
            <option value="AI Ethics">AI Ethics</option>
            <option value="Logic & Problem Solving">Logic & Problem Solving</option>
            <option value="Creativity & AI Design">Creativity & AI Design</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>
            <Target size={16} />
            Difficulty
          </FilterLabel>
          <FilterSelect 
            value={selectedFilters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>
            <Search size={16} />
            Search
          </FilterLabel>
          <SearchInput
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterGroup>
      </FiltersSection>

      {/* Template Grid */}
      <TemplateGrid>
        {filteredTemplates.map((template) => {
          const SubjectIcon = getSubjectIcon(template.subject);
          
          return (
            <TemplateCard key={template.id}>
              <CardHeader gradient={getSubjectColor(template.subject)}>
                <CardTitle>
                  <SubjectIcon size={24} />
                  {template.title}
                </CardTitle>
                <CardMeta>
                  <MetaItem>
                    <Users size={14} />
                    Ages {template.ageGroup}
                  </MetaItem>
                  <MetaItem>
                    <Clock size={14} />
                    {template.duration} min
                  </MetaItem>
                  <MetaItem>
                    <Target size={14} />
                    {template.difficulty}
                  </MetaItem>
                </CardMeta>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>

              <CardBody>
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#2D3436', fontSize: '14px' }}>Learning Objectives:</strong>
                  <ObjectivesList>
                    {template.learningObjectives.slice(0, 3).map((objective, index) => (
                      <ObjectiveItem key={index}>{objective}</ObjectiveItem>
                    ))}
                    {template.learningObjectives.length > 3 && (
                      <ObjectiveItem style={{ fontStyle: 'italic' }}>
                        +{template.learningObjectives.length - 3} more objectives...
                      </ObjectiveItem>
                    )}
                  </ObjectivesList>
                </div>

                <TagsContainer>
                  <Tag color="#e8f5e8" textColor="#2e7d2e">
                    {template.elements.length} Activities
                  </Tag>
                  <Tag 
                    color={getDifficultyColor(template.difficulty) + '20'} 
                    textColor={getDifficultyColor(template.difficulty)}
                  >
                    {template.difficulty}
                  </Tag>
                  <Tag color="#fff3e0" textColor="#f57c00">
                    {template.subject}
                  </Tag>
                </TagsContainer>

                <CardActions>
                  <ActionButton 
                    className="primary"
                    onClick={() => handleImport(template)}
                  >
                    <Download size={14} />
                    Use Template
                  </ActionButton>
                  <ActionButton 
                    className="secondary"
                    onClick={() => handlePreview(template)}
                  >
                    <Eye size={14} />
                    Preview
                  </ActionButton>
                </CardActions>
              </CardBody>
            </TemplateCard>
          );
        })}
      </TemplateGrid>

      {filteredTemplates.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#636E72' 
        }}>
          <Search size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
          <h3>No templates found</h3>
          <p>Try adjusting your filters or search term.</p>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <PreviewModal onClick={() => setPreviewTemplate(null)}>
          <PreviewContent onClick={(e) => e.stopPropagation()}>
            <PreviewHeader gradient={getSubjectColor(previewTemplate.subject)}>
              <CloseButton onClick={() => setPreviewTemplate(null)}>
                <X size={20} />
              </CloseButton>
              
              <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>
                {previewTemplate.title}
              </h2>
              <p style={{ margin: '0 0 15px 0', opacity: 0.9 }}>
                {previewTemplate.description}
              </p>
              
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
                <div>👥 Ages {previewTemplate.ageGroup}</div>
                <div>⏱️ {previewTemplate.duration} minutes</div>
                <div>🎯 {previewTemplate.difficulty}</div>
                <div>📚 {previewTemplate.subject}</div>
              </div>
            </PreviewHeader>

            <PreviewBody>
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#2D3436', marginBottom: '15px' }}>
                  🎯 Learning Objectives
                </h3>
                <ObjectivesList>
                  {previewTemplate.learningObjectives.map((objective, index) => (
                    <ObjectiveItem key={index}>{objective}</ObjectiveItem>
                  ))}
                </ObjectivesList>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#2D3436', marginBottom: '15px' }}>
                  📋 Lesson Structure ({previewTemplate.elements.length} activities)
                </h3>
                
                {previewTemplate.elements.map((element, index) => {
                  const ElementIcon = getElementIcon(element.type);
                  const colors = {
                    'title': { bg: '#fff3e0', border: '#f57c00' },
                    'text': { bg: '#e8f5e8', border: '#4CAF50' },
                    'python-playground': { bg: '#e3f2fd', border: '#2196F3' },
                    'quiz': { bg: '#f3e5f5', border: '#9C27B0' },
                    'ethics': { bg: '#e8eaf6', border: '#667eea' },
                    'image': { bg: '#fce4ec', border: '#e91e63' }
                  };
                  const color = colors[element.type] || colors['text'];
                  
                  return (
                    <ElementPreview 
                      key={index}
                      bgColor={color.bg}
                      color={color.border}
                    >
                      <ElementType>
                        <ElementIcon size={14} />
                        {element.type.replace('-', ' ').toUpperCase()}
                      </ElementType>
                      
                      {element.type === 'title' && (
                        <div>
                          <strong>{element.content.text}</strong>
                        </div>
                      )}
                      
                      {element.type === 'text' && (
                        <div>
                          <strong>Content Block</strong>
                          <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                            {element.content.text.substring(0, 150)}...
                          </p>
                        </div>
                      )}
                      
                      {element.type === 'python-playground' && (
                        <div>
                          <strong>{element.content.title}</strong>
                          <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                            {element.content.description}
                          </p>
                        </div>
                      )}
                      
                      {element.type === 'quiz' && (
                        <div>
                          <strong>Quiz Question</strong>
                          <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                            {element.content.question}
                          </p>
                        </div>
                      )}
                      
                      {element.type === 'ethics' && (
                        <div>
                          <strong>Ethics Scenario</strong>
                          <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                            {element.content.scenario}
                          </p>
                        </div>
                      )}
                    </ElementPreview>
                  );
                })}
              </div>

              <div style={{ 
                textAlign: 'center', 
                padding: '20px', 
                background: '#f8f9ff', 
                borderRadius: '10px' 
              }}>
                <ActionButton 
                  className="primary"
                  onClick={() => {
                    handleImport(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  style={{ fontSize: '16px', padding: '12px 24px' }}
                >
                  <Download size={16} />
                  Import This Template
                </ActionButton>
              </div>
            </PreviewBody>
          </PreviewContent>
        </PreviewModal>
      )}
    </GalleryContainer>
  );
};

export default TemplateGallery;