import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { BookOpen } from 'lucide-react';

const ThemeAwareLogo = ({ size = 24, showText = false, className, style }) => {
  const { getAsset, theme } = useTheme();
  
  const logo = getAsset('brand.logo');
  const companyName = theme.brand.name;
  
  if (logo) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', ...style }} className={className}>
        <img 
          src={logo} 
          alt={companyName}
          style={{ 
            height: `${size}px`,
            width: 'auto',
            maxWidth: `${size * 2}px`,
            objectFit: 'contain'
          }} 
        />
        {showText && (
          <span style={{ fontWeight: 'bold', fontSize: `${size * 0.7}px` }}>
            {companyName}
          </span>
        )}
      </div>
    );
  }
  
  // Fallback to BookOpen icon if no logo uploaded
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', ...style }} className={className}>
      <BookOpen size={size} />
      {showText && (
        <span style={{ fontWeight: 'bold', fontSize: `${size * 0.7}px` }}>
          {companyName}
        </span>
      )}
    </div>
  );
};

export default ThemeAwareLogo;