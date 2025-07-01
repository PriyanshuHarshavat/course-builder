import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { TrainAramaTheme } from '../src/theme';
import TitleSlide from '../src/components/TitleSlide';
import TextBlock from '../src/components/TextBlock';
import AIChatDemo from '../src/components/AIChatDemo';
import MultipleChoiceQuiz from '../src/components/MultipleChoiceQuiz';

function Demo() {
  return (
    <ThemeProvider theme={TrainAramaTheme}>
      <div className="demo-container">
        <div className="demo-header">
          <h1>🚂 TrainArama Component Library Demo</h1>
          <p>Interactive preview of all AI learning components</p>
        </div>
        
        <TitleSlide 
          title="🚂 Welcome Aboard, AI Detective!" 
          subtitle="Your learning journey starts here!"
        />
        
        <TextBlock 
          content="<h2>🧠 All Aboard the AI Learning Train!</h2><p>AI stands for <strong>Artificial Intelligence</strong>. Think of AI like a really smart computer friend that learned by looking at millions of examples!</p>"
        />
        
        <AIChatDemo 
          title="🚂 Meet Your AI Conductor!"
          description="Try asking some math questions!"
        />
        
        <MultipleChoiceQuiz 
          question="What did we learn about AI today?"
          options={[
            "AI is perfect and never makes mistakes",
            "AI can make mistakes, so we need detectives to check its work", 
            "AI is scary and we shouldn't use it",
            "AI is just for video games"
          ]}
          correctAnswer={1}
        />
      </div>
    </ThemeProvider>
  );
}

ReactDOM.render(<Demo />, document.getElementById('demo-root'));