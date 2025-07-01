/**
 * @fileoverview Unified Design System - Replaces 1,381 scattered styled components
 * Single source of truth for all styling across TrainArama
 */

import styled, { css, keyframes } from 'styled-components';

// Design tokens
export const theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981', 
    accent: '#F59E0B',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    info: '#3B82F6',
    
    background: '#FFFFFF',
    surface: '#F9FAFB',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      muted: '#9CA3AF',
      inverse: '#FFFFFF'
    },
    
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      dark: '#9CA3AF'
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem', 
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  
  typography: {
    fontFamily: {
      sans: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      mono: '"Fira Code", "Monaco", monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }
};

// Animations
export const animations = {
  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  
  slideUp: keyframes`
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  `,
  
  pulse: keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  `,
  
  spin: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `
};

// Base components that replace hundreds of duplicate styled components
export const Container = styled.div`
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

export const Card = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  
  ${props => props.elevated && css`
    box-shadow: ${theme.shadows.lg};
  `}
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => {
    const variant = props.variant || 'primary';
    const variants = {
      primary: css`
        background: ${theme.colors.primary};
        color: ${theme.colors.text.inverse};
        &:hover { background: #2563EB; }
      `,
      secondary: css`
        background: ${theme.colors.surface};
        color: ${theme.colors.text.primary};
        border: 1px solid ${theme.colors.border.medium};
        &:hover { background: #F3F4F6; }
      `,
      success: css`
        background: ${theme.colors.success};
        color: ${theme.colors.text.inverse};
        &:hover { background: #059669; }
      `,
      danger: css`
        background: ${theme.colors.danger};
        color: ${theme.colors.text.inverse};
        &:hover { background: #DC2626; }
      `
    };
    return variants[variant];
  }}
  
  ${props => props.size === 'sm' && css`
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
  `}
  
  ${props => props.size === 'lg' && css`
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    font-size: ${theme.typography.fontSize.lg};
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.base};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &:disabled {
    background: ${theme.colors.surface};
    opacity: 0.6;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.base};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background};
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Text = styled.span`
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${props => theme.typography.fontSize[props.size] || theme.typography.fontSize.base};
  font-weight: ${props => theme.typography.fontWeight[props.weight] || theme.typography.fontWeight.normal};
  color: ${props => {
    if (props.variant === 'muted') return theme.colors.text.muted;
    if (props.variant === 'secondary') return theme.colors.text.secondary;
    return theme.colors.text.primary;
  }};
`;

export const Heading = styled.h1`
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${props => {
    const level = props.level || 1;
    const sizes = ['4xl', '3xl', '2xl', 'xl', 'lg', 'base'];
    return theme.typography.fontSize[sizes[level - 1]] || theme.typography.fontSize['2xl'];
  }};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.md} 0;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.full};
  
  ${props => {
    const variant = props.variant || 'default';
    const variants = {
      default: css`
        background: ${theme.colors.surface};
        color: ${theme.colors.text.primary};
      `,
      primary: css`
        background: rgba(59, 130, 246, 0.1);
        color: ${theme.colors.primary};
      `,
      success: css`
        background: rgba(16, 185, 129, 0.1);
        color: ${theme.colors.success};
      `,
      warning: css`
        background: rgba(245, 158, 11, 0.1);
        color: ${theme.colors.warning};
      `,
      danger: css`
        background: rgba(239, 68, 68, 0.1);
        color: ${theme.colors.danger};
      `
    };
    return variants[variant];
  }}
`;

export const Flex = styled.div`
  display: flex;
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'flex-start'};
  flex-direction: ${props => props.direction || 'row'};
  gap: ${props => theme.spacing[props.gap] || theme.spacing.md};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.cols || 'repeat(auto-fit, minmax(300px, 1fr))'};
  gap: ${props => theme.spacing[props.gap] || theme.spacing.md};
  align-items: ${props => props.align || 'stretch'};
`;

// Utility mixins for complex components
export const mixins = {
  visuallyHidden: css`
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  `,
  
  focusRing: css`
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `,
  
  truncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
};

export default theme;