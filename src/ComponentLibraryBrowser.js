import React, { useState } from 'react';
import styled from 'styled-components';
import { pythonExercises, exercisesByCategory, exercisesByAge } from './PrebuiltPythonExercises';
import { quizModules, quizzesByCategory, quizzesByAge } from './PrebuiltQuizModules';
import { contentSlideTemplates, slidesByCategory, slidesByAge } from './PrebuiltContentSlides';
import { X, Play, Brain, FileText, Code, Search, Filter } from 'lucide-react';

const BrowserContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const BrowserModal = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  max-width: 1000px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
`;

const BrowserHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const BrowserTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  opacity: 0.9;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 14px;
  cursor: pointer;
`;

const SearchBox = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 16px;
  
  &::placeholder {
    color: #666;
  }
`;

const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ModuleCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-3px);
  }
`;

const ModuleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ModuleIcon = styled.div`
  font-size: 24px;
`;

const ModuleTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const ModuleDescription = styled.p`
  margin: 8px 0;
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
`;

const ModuleMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 12px;
  font-size: 12px;
  opacity: 0.8;
`;

const MetaTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 11px;
  text-transform: uppercase;
`;

const UseButton = styled.button`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  opacity: 0.8;
  
  .icon {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  .message {
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  .suggestion {
    font-size: 14px;
    opacity: 0.7;
  }
`;

const ComponentLibraryBrowser = ({ componentType, onSelectModule, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Get modules based on component type
  const getModules = () => {
    switch (componentType) {
      case 'python-playground':
        return pythonExercises;
      case 'quiz-block':
        return quizModules;
      case 'content-slide':
        return contentSlideTemplates;
      default:
        return [];
    }
  };

  const modules = getModules();

  // Get available filter options
  const getCategories = () => {
    const categories = [...new Set(modules.map(m => m.category))];
    return ['all', ...categories];
  };

  const getAgeGroups = () => {
    const ages = [...new Set(modules.map(m => m.ageGroup))];
    return ['all', ...ages];
  };

  const getDifficulties = () => {
    const difficulties = [...new Set(modules.map(m => m.difficulty))];
    return ['all', ...difficulties];
  };

  // Filter modules
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || module.category === categoryFilter;
    const matchesAge = ageFilter === 'all' || module.ageGroup === ageFilter;
    const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesAge && matchesDifficulty;
  });

  const getComponentIcon = () => {
    switch (componentType) {
      case 'python-playground':
        return <Code size={28} />;
      case 'quiz-block':
        return <Brain size={28} />;
      case 'content-slide':
        return <FileText size={28} />;
      default:
        return <Play size={28} />;
    }
  };

  const getComponentTitle = () => {
    switch (componentType) {
      case 'python-playground':
        return 'Python Exercise Library';
      case 'quiz-block':
        return 'Quiz Module Library';
      case 'content-slide':
        return 'Content Slide Library';
      default:
        return 'Component Library';
    }
  };

  const getModuleIcon = (module) => {
    switch (componentType) {
      case 'python-playground':
        return '🐍';
      case 'quiz-block':
        return '🧠';
      case 'content-slide':
        return '📖';
      default:
        return '📝';
    }
  };

  const handleSelectModule = (module) => {
    // Convert module to component format
    let componentConfig;

    switch (componentType) {
      case 'python-playground':
        componentConfig = {
          title: module.title,
          description: module.description,
          code: module.code,
          expectedOutput: module.expectedOutput,
          hints: module.hints,
          difficulty: module.difficulty,
          ageGroup: module.ageGroup,
          category: module.category
        };
        break;
      case 'quiz-block':
        componentConfig = {
          title: module.title,
          questions: module.questions,
          difficulty: module.difficulty,
          ageGroup: module.ageGroup,
          category: module.category
        };
        break;
      case 'content-slide':
        componentConfig = {
          title: module.title,
          content: module.content,
          layout: module.layout,
          mediaType: module.mediaType,
          imageUrl: module.imageUrl,
          imageCaption: module.imageCaption,
          backgroundColor: module.backgroundColor,
          ageGroup: module.ageGroup,
          difficulty: module.difficulty
        };
        break;
      default:
        componentConfig = module;
    }

    onSelectModule(componentConfig);
  };

  return (
    <BrowserContainer>
      <BrowserModal>
        <BrowserHeader>
          <BrowserTitle>
            {getComponentIcon()}
            {getComponentTitle()}
          </BrowserTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </BrowserHeader>

        <FilterSection>
          <div style={{ flex: 1 }}>
            <SearchBox
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <FilterGroup>
            <FilterLabel>Category</FilterLabel>
            <FilterSelect 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {getCategories().map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Age Group</FilterLabel>
            <FilterSelect 
              value={ageFilter} 
              onChange={(e) => setAgeFilter(e.target.value)}
            >
              {getAgeGroups().map(age => (
                <option key={age} value={age}>
                  {age === 'all' ? 'All Ages' : `${age} years`}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Difficulty</FilterLabel>
            <FilterSelect 
              value={difficultyFilter} 
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              {getDifficulties().map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>
        </FilterSection>

        {filteredModules.length === 0 ? (
          <NoResults>
            <div className="icon">🔍</div>
            <div className="message">No modules found</div>
            <div className="suggestion">Try adjusting your search or filters</div>
          </NoResults>
        ) : (
          <ModuleGrid>
            {filteredModules.map((module) => (
              <ModuleCard key={module.id}>
                <ModuleHeader>
                  <ModuleIcon>{getModuleIcon(module)}</ModuleIcon>
                  <ModuleTitle>{module.title}</ModuleTitle>
                </ModuleHeader>
                
                <ModuleDescription>{module.description}</ModuleDescription>
                
                <ModuleMeta>
                  <MetaTag>{module.category}</MetaTag>
                  <MetaTag>{module.ageGroup}</MetaTag>
                  <MetaTag>{module.difficulty}</MetaTag>
                </ModuleMeta>
                
                <UseButton onClick={() => handleSelectModule(module)}>
                  Use This Module
                </UseButton>
              </ModuleCard>
            ))}
          </ModuleGrid>
        )}
      </BrowserModal>
    </BrowserContainer>
  );
};

export default ComponentLibraryBrowser;