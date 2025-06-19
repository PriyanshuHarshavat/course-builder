import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Play, RotateCcw, Loader, Award, CheckCircle } from 'lucide-react';
import pythonExecutor from './pythonExecutor';
import assessmentEngine from './AssessmentEngine';

const PlaygroundContainer = styled.div`
  background: ${props => props.gradient || 'linear-gradient(135deg, #3776ab, #ffd43b)'};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  margin: 0 auto;
`;

const Header = styled.div`
  background: rgba(0,0,0,0.1);
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconContainer = styled.div`
  font-size: 24px;
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0;
  color: white;
  font-size: 18px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

const Metadata = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  margin-top: 2px;
`;

const ExplanationSection = styled.div`
  padding: 16px 20px;
  background: rgba(255,255,255,0.1);
  color: white;
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
  }
`;

const CodeEditorContainer = styled.div`
  display: flex;
  height: 400px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const CodeSection = styled.div`
  flex: 1;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  
  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #2d2d2d;
  border-bottom: 1px solid #444;
`;

const CodeLabel = styled.div`
  color: #4CAF50;
  font-size: 12px;
  font-family: monospace;
  font-weight: bold;
`;

const RunControls = styled.div`
  display: flex;
  gap: 8px;
`;

const RunButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: ${props => props.isRunning ? '#f39c12' : '#27ae60'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.isRunning ? 'not-allowed' : 'pointer'};
  font-size: 12px;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isRunning ? '#f39c12' : '#2ecc71'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
  
  &:hover {
    background: #c0392b;
  }
`;

const CodeTextarea = styled.textarea`
  flex: 1;
  padding: 16px;
  background: #1e1e1e;
  color: #f8f8f2;
  border: none;
  outline: none;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.4;
  resize: none;
  tab-size: 4;
  
  &::placeholder {
    color: #666;
  }
`;

const OutputSection = styled.div`
  flex: 1;
  background: #0f0f0f;
  border-left: 1px solid #333;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  
  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid #333;
    min-height: 200px;
  }
`;

const OutputHeader = styled.div`
  padding: 8px 16px;
  background: #1a1a1a;
  border-bottom: 1px solid #333;
`;

const OutputLabel = styled.div`
  color: #FFD700;
  font-size: 12px;
  font-family: monospace;
  font-weight: bold;
`;

const OutputContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const OutputText = styled.pre`
  margin: 0;
  color: ${props => props.isError ? '#ff6b6b' : '#00ff00'};
  font-size: 13px;
  font-family: 'Monaco', 'Consolas', monospace;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ObjectivesSection = styled.div`
  padding: 12px 20px;
  background: rgba(255,255,255,0.05);
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const ObjectivesLabel = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  margin-bottom: 8px;
  font-weight: bold;
`;

const ObjectivesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ObjectiveTag = styled.span`
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
`;

const PrerequisitesSection = styled.div`
  padding: 8px 20px;
  background: rgba(255,255,255,0.05);
  font-size: 11px;
  color: rgba(255,255,255,0.7);
`;

const PythonPlayground = ({ element, studentId = 'demo-student', onComplete }) => {
  const [code, setCode] = useState(element.content.code || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const textareaRef = useRef(null);

  // Initialize Python executor on mount
  useEffect(() => {
    const initPython = async () => {
      setIsInitializing(true);
      try {
        await pythonExecutor.initialize();
        setOutput('🐍 Python is ready! Click "Run Code" to execute your program.');
        
        // Initialize student in assessment engine
        assessmentEngine.initializeStudent(
          studentId, 
          element.content.ageGroup || '10-11', 
          element.content.yearLevel || 1
        );
      } catch (error) {
        setOutput(`❌ Failed to initialize Python: ${error.message}`);
      } finally {
        setIsInitializing(false);
      }
    };

    initPython();
  }, [studentId, element.content.ageGroup, element.content.yearLevel]);

  const handleRunCode = async () => {
    if (isRunning || isInitializing) return;

    setIsRunning(true);
    setOutput('🏃 Running your code...');

    try {
      // Check if code is safe (basic validation)
      if (!pythonExecutor.isCodeSafe(code)) {
        setOutput('⚠️ Your code contains operations that are not allowed in this playground. Please stick to basic Python commands!');
        setIsRunning(false);
        return;
      }

      const result = await pythonExecutor.executeCode(code, {
        timeout: 5000, // 5 second timeout
        maxOutputLength: 5000 // Limit output length
      });

      let displayOutput = '';
      if (result.success) {
        const fullOutput = result.output || '';
        const errorOutput = result.error || '';
        
        if (fullOutput || errorOutput) {
          displayOutput = fullOutput + (errorOutput ? `\n${errorOutput}` : '');
        } else {
          displayOutput = '✅ Code executed successfully! (No output to display)';
        }
      } else {
        displayOutput = result.error || 'An unknown error occurred.';
      }

      setOutput(displayOutput);

      // Run assessment if this is a template with expected output
      if (element.content.expectedOutput && element.content.template) {
        const codeData = {
          id: element.content.template,
          expectedOutput: element.content.expectedOutput,
          outputType: element.content.outputType || 'fuzzy',
          difficulty: element.content.difficulty || 'beginner',
          yearLevel: element.content.yearLevel,
          ageGroup: element.content.ageGroup
        };

        const assessment = assessmentEngine.assessPythonCode(
          studentId,
          codeData,
          code,
          result
        );

        setAssessmentResult(assessment);
        setShowAssessment(true);

        // Show assessment feedback in output
        if (assessment.passed) {
          setOutput(prev => prev + `\n\n🎉 ${assessment.feedback[0]?.message || 'Great job!'}`);
        } else {
          setOutput(prev => prev + `\n\n🤔 ${assessment.feedback[0]?.message || 'Keep trying!'}`);
        }

        // Notify parent component
        if (onComplete) {
          onComplete(assessment);
        }
      }
    } catch (error) {
      setOutput(`💥 Unexpected error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    setCode(element.content.code || '');
    setOutput('🔄 Code reset to original template.');
    setAssessmentResult(null);
    setShowAssessment(false);
  };

  const handleKeyDown = (e) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
    
    // Handle Ctrl+Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
    }
  };

  return (
    <PlaygroundContainer
      gradient={element.content.gradient}
      width={element.content.width}
      height={element.content.height}
    >
      {/* Header */}
      <Header>
        <IconContainer>{element.content.icon}</IconContainer>
        <HeaderInfo>
          <Title>{element.content.title}</Title>
          <Metadata>
            Year {element.content.yearLevel} • {element.content.ageGroup} • {element.content.difficulty}
          </Metadata>
        </HeaderInfo>
      </Header>

      {/* Explanation */}
      <ExplanationSection>
        <p>{element.content.explanation}</p>
      </ExplanationSection>

      {/* Interactive Code Editor */}
      <CodeEditorContainer>
        {/* Code Section */}
        <CodeSection>
          <CodeHeader>
            <CodeLabel># Python Code Editor</CodeLabel>
            <RunControls>
              <RunButton
                onClick={handleRunCode}
                isRunning={isRunning || isInitializing}
                disabled={isRunning || isInitializing}
              >
                {isRunning || isInitializing ? (
                  <>
                    <Loader size={12} className="animate-spin" />
                    {isInitializing ? 'Loading...' : 'Running...'}
                  </>
                ) : (
                  <>
                    <Play size={12} />
                    Run Code
                  </>
                )}
              </RunButton>
              <ResetButton onClick={handleResetCode}>
                <RotateCcw size={12} />
                Reset
              </ResetButton>
            </RunControls>
          </CodeHeader>
          <CodeTextarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your Python code here..."
            spellCheck={false}
          />
        </CodeSection>

        {/* Output Section */}
        <OutputSection>
          <OutputHeader>
            <OutputLabel># Output & Results</OutputLabel>
          </OutputHeader>
          <OutputContent>
            <OutputText isError={output.includes('❌') || output.includes('💥') || output.includes('🚨')}>
              {output || '👋 Ready to run your code! Press the "Run Code" button or use Ctrl+Enter.'}
            </OutputText>
          </OutputContent>
        </OutputSection>
      </CodeEditorContainer>

      {/* Learning Objectives */}
      {element.content.learningObjectives && element.content.learningObjectives.length > 0 && (
        <ObjectivesSection>
          <ObjectivesLabel>🎯 Learning Goals:</ObjectivesLabel>
          <ObjectivesList>
            {element.content.learningObjectives.map((objective, index) => (
              <ObjectiveTag key={index}>{objective}</ObjectiveTag>
            ))}
          </ObjectivesList>
        </ObjectivesSection>
      )}

      {/* Prerequisites */}
      {element.content.prerequisites && element.content.prerequisites.length > 0 && (
        <PrerequisitesSection>
          📚 Prerequisites: {element.content.prerequisites.join(', ')}
        </PrerequisitesSection>
      )}

      {/* Assessment Results and Badges */}
      {showAssessment && assessmentResult && (
        <div style={{
          padding: '12px 20px',
          background: assessmentResult.passed ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {assessmentResult.passed ? (
              <CheckCircle size={16} color="#4CAF50" />
            ) : (
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ff9800', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>
                !
              </div>
            )}
            <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>
              {assessmentResult.passed ? `Perfect! Score: ${assessmentResult.score}%` : `Keep practicing! Score: ${assessmentResult.score}%`}
            </span>
          </div>
          
          {assessmentResult.badgesEarned && assessmentResult.badgesEarned.length > 0 && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {assessmentResult.badgesEarned.map((badge, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 6px',
                  background: '#667eea',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: '600',
                  animation: 'bounceIn 0.6s ease-out'
                }}>
                  <Award size={10} />
                  {badge.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </PlaygroundContainer>
  );
};

export default PythonPlayground;