import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useAnalytics } from './AnalyticsProvider';
import { useTheme } from './theme/ThemeProvider';
import CoursePlayer from './CoursePlayer';
import ThemeAwareLogo from './components/ThemeAwareLogo';
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Target,
  Award,
  Search,
  Filter,
  Grid,
  List,
  Eye,
  Edit3,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  Sparkles,
  Brain,
  Shield
} from 'lucide-react';

const LibraryContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
`;

const LibraryHeader = styled.div`
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
  gap: 15px;
`;

const LibraryIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF6B6B, #FF8E53);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`;

const HeaderInfo = styled.div``;

const LibraryTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LibrarySubtitle = styled.p`
  margin: 8px 0 0 0;
  opacity: 0.9;
  font-size: 16px;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 8px 12px;
  gap: 8px;
  width: 250px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  flex: 1;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
  }
`;

const FilterButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 4px;
`;

const ViewButton = styled.button`
  background: ${props => props.active ? 'rgba(255,255,255,0.3)' : 'transparent'};
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.view === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr'};
  gap: 20px;
  margin-bottom: 30px;
`;

const CourseCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  ${props => props.view === 'list' && css`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px 20px;
  `}
`;

const CourseIcon = styled.div`
  width: ${props => props.view === 'list' ? '50px' : '60px'};
  height: ${props => props.view === 'list' ? '50px' : '60px'};
  border-radius: 12px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.view === 'list' ? '20px' : '24px'};
  margin-bottom: ${props => props.view === 'list' ? '0' : '15px'};
  flex-shrink: 0;
`;

const CourseContent = styled.div`
  flex: 1;
`;

const CourseTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
`;

const CourseDescription = styled.p`
  margin: 0 0 12px 0;
  opacity: 0.8;
  font-size: 14px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CourseMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 13px;
  opacity: 0.9;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CourseTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
`;

const Tag = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 11px;
`;

const CourseActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: ${props => props.view === 'list' ? 'flex-end' : 'flex-start'};
`;

const ActionButton = styled.button`
  background: ${props => 
    props.variant === 'primary' ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.variant === 'secondary' ? 'linear-gradient(135deg, #2196F3, #1976D2)' :
    'rgba(255, 255, 255, 0.2)'
  };
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  opacity: 0.7;
`;

const CreateCoursePrompt = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
`;

// Sample courses for demonstration
const sampleCourses = [
  {
    id: 'sample-1',
    title: 'AI Basics for Young Learners',
    description: 'Introduction to artificial intelligence concepts designed for elementary students. Learn about how AI works through fun activities and games.',
    ageGroup: '8-9',
    difficulty: 'beginner',
    estimatedDuration: '45',
    tags: ['ai-basics', 'introduction', 'games'],
    category: 'ai-basics',
    isPublished: true,
    lessons: [
      {
        id: 'lesson1',
        title: 'What is AI?',
        duration: 15,
        points: 25,
        badges: ['first-lesson'],
        components: [
          {
            id: 'comp1',
            type: 'text-block',
            name: 'Introduction to AI',
            icon: BookOpen,
            config: {
              content: 'Artificial Intelligence, or AI, is like giving computers a brain! Just like how you can think, learn, and solve problems, AI helps computers do the same things.\n\nImagine if your computer could:\n• Recognize your face in photos\n• Help you with homework\n• Play games with you\n• Answer your questions\n\nThat\'s what AI can do! It\'s everywhere around us, helping make our lives easier and more fun.',
              formatting: 'paragraph'
            }
          },
          {
            id: 'comp2',
            type: 'quiz-block',
            name: 'AI Knowledge Check',
            icon: Target,
            config: {
              questions: [
                {
                  question: 'What does AI stand for?',
                  type: 'multiple-choice',
                  options: ['Artificial Intelligence', 'Amazing Ideas', 'Automatic Internet'],
                  correct: 0
                }
              ]
            }
          }
        ]
      },
      {
        id: 'lesson2',
        title: 'AI in Our Daily Lives',
        duration: 20,
        points: 35,
        badges: ['ai-explorer'],
        components: [
          {
            id: 'comp3',
            type: 'ai-prompt',
            name: 'Describe AI Friends',
            icon: Brain,
            config: {
              prompt: 'Imagine you have an AI friend. What would you like this AI friend to help you with? Describe what they would be like and how they would help you.',
              expectedLength: 'medium',
              difficulty: 'beginner',
              hints: ['Think about what you need help with', 'Consider fun activities you could do together', 'What would make this AI friend special?']
            }
          },
          {
            id: 'comp4',
            type: 'safety-check',
            name: 'AI Safety Reminder',
            icon: Shield,
            config: {
              title: 'Remember: AI Safety!',
              points: [
                'Always ask an adult before using new AI tools',
                'Never share personal information with AI',
                'Remember that AI can make mistakes too',
                'Be kind when talking to AI, just like with people'
              ]
            }
          }
        ]
      }
    ]
  }
];

const CourseLibrary = ({ userRole = 'student', onCreateCourse, studentData }) => {
  const { trackPageView, trackButtonClick } = useAnalytics();
  const { theme } = useTheme();
  const [courses, setCourses] = useState(sampleCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterAgeGroup, setFilterAgeGroup] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  useEffect(() => {
    trackPageView('course_library', { userRole });
  }, [trackPageView, userRole]);

  // Load courses from localStorage (saved from Course Builder)
  useEffect(() => {
    const savedCourses = localStorage.getItem('trainarama_created_courses');
    if (savedCourses) {
      try {
        const parsed = JSON.parse(savedCourses);
        setCourses([...sampleCourses, ...parsed]);
      } catch (e) {
        console.error('Error loading saved courses:', e);
      }
    }
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAge = filterAgeGroup === 'all' || course.ageGroup === filterAgeGroup;
    const matchesDifficulty = filterDifficulty === 'all' || course.difficulty === filterDifficulty;
    
    return matchesSearch && matchesAge && matchesDifficulty && course.isPublished;
  });

  const startCourse = (course) => {
    setSelectedCourse(course);
    trackButtonClick('start_course', { 
      courseId: course.id,
      courseTitle: course.title,
      userRole 
    });
  };

  const exitCourse = () => {
    setSelectedCourse(null);
    trackButtonClick('exit_course', { userRole });
  };

  const previewCourse = (course) => {
    setSelectedCourse(course);
    trackButtonClick('preview_course', { 
      courseId: course.id,
      courseTitle: course.title,
      userRole: 'preview' 
    });
  };

  const duplicateCourse = (course) => {
    const duplicated = {
      ...course,
      id: `${course.id}-copy-${Date.now()}`,
      title: `${course.title} (Copy)`,
      isPublished: false
    };
    setCourses([...courses, duplicated]);
    trackButtonClick('duplicate_course', { originalId: course.id });
  };

  const deleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== courseId));
      trackButtonClick('delete_course', { courseId });
    }
  };

  if (selectedCourse) {
    return (
      <CoursePlayer
        course={selectedCourse}
        onExit={exitCourse}
        studentData={studentData}
      />
    );
  }

  return (
    <LibraryContainer>
      <LibraryHeader>
        <HeaderLeft>
          <LibraryIcon>
            <BookOpen size={28} />
          </LibraryIcon>
          <HeaderInfo>
            <LibraryTitle>
              <ThemeAwareLogo size={24} />
              Course Library
            </LibraryTitle>
            <LibrarySubtitle>
              {userRole === 'teacher' 
                ? 'Manage and preview your published courses'
                : 'Discover amazing AI learning adventures'
              }
            </LibrarySubtitle>
          </HeaderInfo>
        </HeaderLeft>
        
        <HeaderControls>
          <SearchBar>
            <Search size={16} />
            <SearchInput
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          
          <FilterButton>
            <Filter size={16} />
            Filters
          </FilterButton>
          
          <ViewToggle>
            <ViewButton 
              active={viewMode === 'grid'} 
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </ViewButton>
            <ViewButton 
              active={viewMode === 'list'} 
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </ViewButton>
          </ViewToggle>
          
          {userRole === 'teacher' && (
            <ActionButton variant="primary" onClick={onCreateCourse}>
              <Plus size={16} />
              Create Course
            </ActionButton>
          )}
        </HeaderControls>
      </LibraryHeader>

      {filteredCourses.length === 0 ? (
        userRole === 'teacher' ? (
          <CreateCoursePrompt>
            <BookOpen size={64} style={{ marginBottom: '20px', opacity: 0.5 }} />
            <h2>No Courses Yet</h2>
            <p>Create your first course to see it here. Use the Course Builder to design engaging AI education experiences.</p>
            <ActionButton variant="primary" onClick={onCreateCourse} style={{ marginTop: '20px' }}>
              <Plus size={16} />
              Create Your First Course
            </ActionButton>
          </CreateCoursePrompt>
        ) : (
          <EmptyState>
            <Search size={64} style={{ marginBottom: '20px' }} />
            <h2>No Courses Found</h2>
            <p>Try adjusting your search terms or filters to find more courses.</p>
          </EmptyState>
        )
      ) : (
        <CoursesGrid view={viewMode}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} view={viewMode}>
              <CourseIcon view={viewMode}>
                <BookOpen size={viewMode === 'list' ? 20 : 24} />
              </CourseIcon>
              
              <CourseContent>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                
                <CourseMeta>
                  <MetaItem>
                    <Users size={12} />
                    {course.ageGroup} years
                  </MetaItem>
                  <MetaItem>
                    <Target size={12} />
                    {course.difficulty}
                  </MetaItem>
                  <MetaItem>
                    <Clock size={12} />
                    {course.estimatedDuration}min
                  </MetaItem>
                  <MetaItem>
                    <BookOpen size={12} />
                    {course.lessons?.length || 0} lessons
                  </MetaItem>
                </CourseMeta>
                
                <CourseTags>
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                  {course.tags.length > 3 && (
                    <Tag>+{course.tags.length - 3} more</Tag>
                  )}
                </CourseTags>
              </CourseContent>
              
              <CourseActions view={viewMode}>
                <ActionButton 
                  variant="primary" 
                  onClick={() => startCourse(course)}
                >
                  <Play size={14} />
                  {userRole === 'teacher' ? 'Preview' : 'Start'}
                </ActionButton>
                
                {userRole === 'teacher' && (
                  <>
                    <ActionButton onClick={() => duplicateCourse(course)}>
                      <Copy size={14} />
                      Copy
                    </ActionButton>
                    <ActionButton onClick={() => deleteCourse(course.id)}>
                      <Trash2 size={14} />
                      Delete
                    </ActionButton>
                  </>
                )}
              </CourseActions>
            </CourseCard>
          ))}
        </CoursesGrid>
      )}
    </LibraryContainer>
  );
};

export default CourseLibrary;