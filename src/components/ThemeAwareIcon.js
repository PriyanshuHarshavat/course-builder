import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

const ThemeAwareIcon = ({ 
  iconPath, 
  fallbackIcon: FallbackIcon, 
  fallbackEmoji,
  size = 24, 
  color,
  style,
  className 
}) => {
  const { getAsset, theme } = useTheme();
  
  // Try to get custom uploaded icon
  const customIcon = getAsset(iconPath);
  
  if (customIcon) {
    return (
      <img 
        src={customIcon} 
        alt={iconPath}
        style={{ 
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          ...style
        }}
        className={className}
      />
    );
  }
  
  // Try fallback Lucide icon
  if (FallbackIcon) {
    return (
      <FallbackIcon 
        size={size} 
        color={color}
        style={style}
        className={className}
      />
    );
  }
  
  // Final fallback to emoji
  if (fallbackEmoji) {
    return (
      <span 
        style={{ 
          fontSize: `${size}px`,
          lineHeight: 1,
          ...style
        }}
        className={`emoji-fallback ${className}`}
      >
        {fallbackEmoji}
      </span>
    );
  }
  
  return null;
};

export default ThemeAwareIcon;