/**
 * @fileoverview Simplified Component Editor - Reduced from 1,534 lines using Design System
 * Uses shared design system instead of 24 custom styled components
 */

import React, { useState, useEffect } from 'react';
import PythonExerciseBuilder from './PythonExerciseBuilder';
import AIPythonGenerator from './AIPythonGenerator';
import QuizBuilder from './QuizBuilder';
import AIQuizGenerator from './AIQuizGenerator';
import AIContentSlideBuilder from './AIContentSlideBuilder';
import AIExerciseBuilder from './AIExerciseBuilder';

// Use shared design system
import {
  Container,
  Card,
  Button,
  Input,
  Textarea,
  Flex,
  Grid,
  Heading,
  Text,
  Badge,
  theme
} from './design/DesignSystem';

import {
  Save,
  X,
  Eye,
  Code,
  Type,
  Video,
  Image,
  Brain,
  Target,
  MessageSquare,
  Shield,
  Award,
  Plus,
  Trash2,
  Move,
  Settings,
  Upload,
  Link,
  Play,
  FileText,
  List
} from 'lucide-react';

// Component type definitions
const COMPONENT_TYPES = {
  text: { icon: Type, label: 'Text Content', color: theme.colors.primary },
  title: { icon: FileText, label: 'Title', color: theme.colors.secondary },
  image: { icon: Image, label: 'Image', color: theme.colors.accent },
  video: { icon: Video, label: 'Video', color: theme.colors.info },
  quiz: { icon: Target, label: 'Quiz', color: theme.colors.warning },
  'python-playground': { icon: Code, label: 'Python Code', color: theme.colors.success },
  'ai-exercise': { icon: Brain, label: 'AI Exercise', color: theme.colors.primary },
  badge: { icon: Award, label: 'Badge Reward', color: theme.colors.accent }
};

/**
 * Component Editor - Simplified using Design System
 */
const ComponentEditor = ({ lesson, onChange }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentType, setComponentType] = useState('text');
  const [showAddComponent, setShowAddComponent] = useState(false);

  // Get components from lesson or initialize empty array
  const components = lesson?.elements || [];

  const handleComponentUpdate = (componentIndex, updatedComponent) => {
    const updatedElements = [...components];
    updatedElements[componentIndex] = updatedComponent;
    
    onChange({
      ...lesson,
      elements: updatedElements
    });
  };

  const handleAddComponent = (type) => {
    const newComponent = createDefaultComponent(type);
    const updatedElements = [...components, newComponent];
    
    onChange({
      ...lesson,
      elements: updatedElements
    });
    
    setShowAddComponent(false);
    setSelectedComponent(updatedElements.length - 1);
  };

  const handleRemoveComponent = (index) => {
    const updatedElements = components.filter((_, i) => i !== index);
    onChange({
      ...lesson,
      elements: updatedElements
    });
    
    if (selectedComponent >= updatedElements.length) {
      setSelectedComponent(updatedElements.length - 1);
    }
  };

  const createDefaultComponent = (type) => {
    const defaults = {
      text: {
        type: 'text',
        content: { text: 'Enter your text content here...' }
      },
      title: {
        type: 'title',
        content: { text: 'New Title', level: 2 }
      },
      image: {
        type: 'image',
        content: { src: '', alt: '', caption: '' }
      },
      video: {
        type: 'video',
        content: { src: '', title: '', description: '' }
      },
      quiz: {
        type: 'quiz',
        content: {
          question: 'Enter your question here',
          type: 'multiple-choice',
          options: ['Option 1', 'Option 2', 'Option 3'],
          correct: 0
        }
      },
      'python-playground': {
        type: 'python-playground',
        content: {
          title: 'Python Exercise',
          code: '# Write your Python code here\nprint("Hello, World!")',
          description: 'Try this Python exercise'
        }
      }
    };

    return defaults[type] || defaults.text;
  };

  const renderComponentList = () => (
    <Card>
      <Flex justify="space-between" align="center">
        <Heading level={3}>Lesson Components</Heading>
        <Button size="sm" onClick={() => setShowAddComponent(true)}>
          <Plus size={16} />
          Add Component
        </Button>
      </Flex>

      {components.length === 0 ? (
        <div style={{ 
          padding: theme.spacing.xl, 
          textAlign: 'center',
          color: theme.colors.text.muted 
        }}>
          <Text>No components yet. Add your first component to get started!</Text>
        </div>
      ) : (
        <div style={{ marginTop: theme.spacing.md }}>
          {components.map((component, index) => {
            const typeInfo = COMPONENT_TYPES[component.type] || COMPONENT_TYPES.text;
            const IconComponent = typeInfo.icon;
            
            return (
              <Card 
                key={index}
                style={{ 
                  marginBottom: theme.spacing.sm,
                  cursor: 'pointer',
                  border: selectedComponent === index ? 
                    `2px solid ${theme.colors.primary}` : 
                    `1px solid ${theme.colors.border.light}`
                }}
                onClick={() => setSelectedComponent(index)}
              >
                <Flex justify="space-between" align="center">
                  <Flex align="center" gap="sm">
                    <IconComponent size={20} style={{ color: typeInfo.color }} />
                    <div>
                      <Text weight="medium">{typeInfo.label}</Text>
                      <Text size="sm" variant="muted">
                        {component.content?.title || 
                         component.content?.text?.substring(0, 50) || 
                         'Component content'}
                        {(component.content?.text?.length > 50) && '...'}
                      </Text>
                    </div>
                  </Flex>
                  
                  <Flex gap="xs">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Move component logic here
                      }}
                    >
                      <Move size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveComponent(index);
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
        </div>
      )}
    </Card>
  );

  const renderComponentEditor = () => {
    if (selectedComponent === null || !components[selectedComponent]) {
      return (
        <Card>
          <div style={{ 
            padding: theme.spacing.xl, 
            textAlign: 'center',
            color: theme.colors.text.muted 
          }}>
            <Text>Select a component to edit its properties</Text>
          </div>
        </Card>
      );
    }

    const component = components[selectedComponent];

    return (
      <Card>
        <Heading level={3}>Edit Component</Heading>
        
        {component.type === 'text' && (
          <div>
            <Text weight="medium">Text Content:</Text>
            <Textarea
              value={component.content?.text || ''}
              onChange={(e) => handleComponentUpdate(selectedComponent, {
                ...component,
                content: { ...component.content, text: e.target.value }
              })}
              placeholder="Enter your text content..."
            />
          </div>
        )}

        {component.type === 'title' && (
          <div>
            <Text weight="medium">Title Text:</Text>
            <Input
              value={component.content?.text || ''}
              onChange={(e) => handleComponentUpdate(selectedComponent, {
                ...component,
                content: { ...component.content, text: e.target.value }
              })}
              placeholder="Enter title text..."
            />
          </div>
        )}

        {component.type === 'quiz' && (
          <QuizBuilder
            quiz={component.content}
            onChange={(updatedQuiz) => handleComponentUpdate(selectedComponent, {
              ...component,
              content: updatedQuiz
            })}
          />
        )}

        {component.type === 'python-playground' && (
          <PythonExerciseBuilder
            exercise={component.content}
            onChange={(updatedExercise) => handleComponentUpdate(selectedComponent, {
              ...component,
              content: updatedExercise
            })}
          />
        )}

        {/* Add other component type editors as needed */}
      </Card>
    );
  };

  const renderAddComponentModal = () => {
    if (!showAddComponent) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.colors.overlay,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <Card style={{ maxWidth: '600px', width: '90%' }}>
          <Flex justify="space-between" align="center">
            <Heading level={3}>Add Component</Heading>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setShowAddComponent(false)}
            >
              <X size={16} />
            </Button>
          </Flex>

          <Grid cols="repeat(auto-fit, minmax(200px, 1fr))" gap="md">
            {Object.entries(COMPONENT_TYPES).map(([type, info]) => {
              const IconComponent = info.icon;
              return (
                <Card 
                  key={type}
                  style={{ 
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: theme.spacing.lg
                  }}
                  onClick={() => handleAddComponent(type)}
                >
                  <IconComponent 
                    size={32} 
                    style={{ 
                      color: info.color,
                      marginBottom: theme.spacing.sm 
                    }} 
                  />
                  <Text weight="medium">{info.label}</Text>
                </Card>
              );
            })}
          </Grid>
        </Card>
      </div>
    );
  };

  if (!lesson) {
    return (
      <Card>
        <div style={{ 
          padding: theme.spacing.xl, 
          textAlign: 'center',
          color: theme.colors.text.muted 
        }}>
          <Text>No lesson selected. Please select a lesson to edit.</Text>
        </div>
      </Card>
    );
  }

  return (
    <Container>
      <Grid cols="1fr 1fr" gap="lg">
        {renderComponentList()}
        {renderComponentEditor()}
      </Grid>
      {renderAddComponentModal()}
    </Container>
  );
};

export default ComponentEditor;