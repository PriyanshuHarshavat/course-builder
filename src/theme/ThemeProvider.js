import React, { createContext, useContext, useState, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';

// Default theme configuration
const defaultTheme = {
  // Brand Identity
  brand: {
    name: 'TrainArama AI Education',
    logo: null, // Will be uploaded
    favicon: null,
    tagline: 'AI Education for the Next Generation'
  },
  
  // Color Palette
  colors: {
    primary: '#667eea',
    primaryDark: '#5a67d8',
    secondary: '#764ba2',
    secondaryDark: '#6b46c1',
    accent: '#FF6B6B',
    accentDark: '#e53e3e',
    
    // Success/Error States
    success: '#4CAF50',
    successDark: '#388e3c',
    warning: '#FF9800',
    warningDark: '#f57c00',
    error: '#f44336',
    errorDark: '#d32f2f',
    info: '#2196F3',
    infoDark: '#1976d2',
    
    // Neutral Colors
    white: '#ffffff',
    black: '#000000',
    gray100: '#f7fafc',
    gray200: '#edf2f7',
    gray300: '#e2e8f0',
    gray400: '#cbd5e0',
    gray500: '#a0aec0',
    gray600: '#718096',
    gray700: '#4a5568',
    gray800: '#2d3748',
    gray900: '#1a202c',
    
    // Background & Surface
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    surface: 'rgba(255, 255, 255, 0.1)',
    surfaceHover: 'rgba(255, 255, 255, 0.15)',
    overlay: 'rgba(0, 0, 0, 0.8)',
    
    // Text Colors
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    textMuted: 'rgba(255, 255, 255, 0.6)',
    textOnLight: '#2d3748',
    
    // Border Colors
    border: 'rgba(255, 255, 255, 0.2)',
    borderHover: 'rgba(255, 255, 255, 0.4)',
    borderFocus: 'rgba(255, 255, 255, 0.5)'
  },
  
  // Typography
  typography: {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    fontFamilyHeading: "'Comic Sans MS', cursive, sans-serif",
    fontFamilyMono: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.375rem',   // 6px
    base: '0.5rem',   // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    full: '9999px'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    base: '0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
    md: '0 10px 15px rgba(0, 0, 0, 0.12), 0 4px 6px rgba(0, 0, 0, 0.08)',
    lg: '0 20px 25px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(255, 255, 255, 0.4)'
  },
  
  // Gamification Assets
  gamification: {
    badges: {
      'first-lesson': { icon: null, emoji: '🎯', name: 'First Lesson', color: '#4CAF50' },
      'quick-learner': { icon: null, emoji: '⚡', name: 'Quick Learner', color: '#FF9800' },
      'creative-mind': { icon: null, emoji: '🎨', name: 'Creative Mind', color: '#9C27B0' },
      'problem-solver': { icon: null, emoji: '🧩', name: 'Problem Solver', color: '#2196F3' },
      'ai-explorer': { icon: null, emoji: '🤖', name: 'AI Explorer', color: '#607D8B' },
      'safety-champion': { icon: null, emoji: '🛡️', name: 'Safety Champion', color: '#F44336' },
      'collaboration-star': { icon: null, emoji: '⭐', name: 'Collaboration Star', color: '#FFD700' },
      'innovation-master': { icon: null, emoji: '🚀', name: 'Innovation Master', color: '#E91E63' }
    },
    
    pointsIcons: {
      xp: { icon: null, emoji: '✨', color: '#FFD700' },
      streak: { icon: null, emoji: '🔥', color: '#FF6B6B' },
      level: { icon: null, emoji: '🏆', color: '#4CAF50' }
    },
    
    categoryIcons: {
      'ai-basics': { icon: null, emoji: '🤖', color: '#2196F3' },
      'creativity': { icon: null, emoji: '🎨', color: '#9C27B0' },
      'problem-solving': { icon: null, emoji: '🧩', color: '#4CAF50' },
      'safety': { icon: null, emoji: '🛡️', color: '#F44336' },
      'collaboration': { icon: null, emoji: '👥', color: '#FF9800' }
    }
  },
  
  // Component Icons
  componentIcons: {
    'text-block': { icon: null, emoji: '📝' },
    'video-block': { icon: null, emoji: '🎥' },
    'image-block': { icon: null, emoji: '🖼️' },
    'ai-prompt': { icon: null, emoji: '🧠' },
    'quiz-block': { icon: null, emoji: '❓' },
    'code-block': { icon: null, emoji: '💻' },
    'discussion': { icon: null, emoji: '💬' },
    'ai-compare': { icon: null, emoji: '⚖️' },
    'safety-check': { icon: null, emoji: '🛡️' },
    'gamification': { icon: null, emoji: '🏆' }
  },
  
  // Age Group Styling
  ageGroups: {
    '8-9': {
      primaryColor: '#4CAF50',
      secondaryColor: '#81C784',
      name: 'Elementary Explorers',
      icon: null,
      emoji: '🌱'
    },
    '10-11': {
      primaryColor: '#2196F3',
      secondaryColor: '#64B5F6',
      name: 'Middle Innovators',
      icon: null,
      emoji: '🚀'
    },
    '12-14': {
      primaryColor: '#9C27B0',
      secondaryColor: '#BA68C8',
      name: 'Advanced Creators',
      icon: null,
      emoji: '🎯'
    }
  }
};

// Theme Context
const ThemeContext = createContext();

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textPrimary};
    line-height: ${props => props.theme.typography.lineHeight.normal};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.typography.fontFamilyHeading};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    line-height: ${props => props.theme.typography.lineHeight.tight};
  }
  
  button {
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  input, textarea, select {
    font-family: inherit;
  }
  
  .emoji-fallback {
    font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }
`;

// Custom Hook for Theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('trainarama_theme');
    if (savedTheme) {
      try {
        return { ...defaultTheme, ...JSON.parse(savedTheme) };
      } catch (e) {
        console.error('Error loading saved theme:', e);
        return defaultTheme;
      }
    }
    return defaultTheme;
  });

  // Save theme changes to localStorage
  useEffect(() => {
    localStorage.setItem('trainarama_theme', JSON.stringify(theme));
  }, [theme]);

  // Update theme function
  const updateTheme = (updates) => {
    setTheme(prevTheme => {
      const newTheme = typeof updates === 'function' ? updates(prevTheme) : { ...prevTheme, ...updates };
      return newTheme;
    });
  };

  // Reset theme to defaults
  const resetTheme = () => {
    setTheme(defaultTheme);
    localStorage.removeItem('trainarama_theme');
  };

  // Upload asset function
  const uploadAsset = async (file, assetPath) => {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        reject(new Error('Please upload a valid image file'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        
        // Update theme with new asset
        updateTheme(prevTheme => {
          const updatedTheme = { ...prevTheme };
          const pathParts = assetPath.split('.');
          let current = updatedTheme;
          
          for (let i = 0; i < pathParts.length - 1; i++) {
            if (!current[pathParts[i]]) {
              current[pathParts[i]] = {};
            }
            current = current[pathParts[i]];
          }
          
          current[pathParts[pathParts.length - 1]] = dataUrl;
          return updatedTheme;
        });
        
        resolve(dataUrl);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  // Get asset function (returns uploaded asset or fallback)
  const getAsset = (assetPath, fallback = null) => {
    const pathParts = assetPath.split('.');
    let current = theme;
    
    for (const part of pathParts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        return fallback;
      }
    }
    
    return current || fallback;
  };

  const value = {
    theme,
    updateTheme,
    resetTheme,
    uploadAsset,
    getAsset,
    defaultTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Helper function to get theme-aware styled components
export const getThemeColor = (colorPath, theme) => {
  const pathParts = colorPath.split('.');
  let current = theme.colors;
  
  for (const part of pathParts) {
    if (current && current[part] !== undefined) {
      current = current[part];
    } else {
      return colorPath; // Return original if not found
    }
  }
  
  return current;
};

// Export default theme for reference
export { defaultTheme };