/**
 * @fileoverview Simplified Brand Manager - Reduced from 1,521 lines using Design System
 * Uses shared design system instead of 44 custom styled components
 */

import React, { useState, useEffect } from 'react';
import { useAnalytics } from './AnalyticsProvider';
import ThemeAwareLogo from './components/ThemeAwareLogo';
import ThemeAwareIcon from './components/ThemeAwareIcon';

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
  Palette,
  Upload,
  Save,
  Eye,
  Settings,
  Image,
  Type,
  Download,
  RefreshCw,
  Check,
  X,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';

/**
 * Brand Manager Component - Simplified using Design System
 */
const BrandManager = () => {
  const [activeSection, setActiveSection] = useState('colors');
  const [brandConfig, setBrandConfig] = useState({
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B'
    },
    logo: null,
    fonts: {
      primary: 'Inter',
      secondary: 'Roboto'
    },
    spacing: 'comfortable'
  });

  const { trackEvent } = useAnalytics();

  const handleSaveBrand = () => {
    trackEvent('brand_saved', { section: activeSection });
    console.log('Brand configuration saved:', brandConfig);
  };

  const renderColorSection = () => (
    <Card>
      <Heading level={3}>Brand Colors</Heading>
      <Text variant="secondary">Define your brand's color palette</Text>

      <Grid cols="repeat(auto-fit, minmax(200px, 1fr))" gap="md">
        {Object.entries(brandConfig.colors).map(([colorName, colorValue]) => (
          <Card key={colorName}>
            <Flex direction="column" gap="sm">
              <Text weight="medium" style={{ textTransform: 'capitalize' }}>
                {colorName}
              </Text>
              <div
                style={{
                  width: '100%',
                  height: '80px',
                  backgroundColor: colorValue,
                  borderRadius: theme.borderRadius.md,
                  border: `1px solid ${theme.colors.border.light}`
                }}
              />
              <Input
                type="color"
                value={colorValue}
                onChange={(e) => setBrandConfig({
                  ...brandConfig,
                  colors: {
                    ...brandConfig.colors,
                    [colorName]: e.target.value
                  }
                })}
              />
            </Flex>
          </Card>
        ))}
      </Grid>
    </Card>
  );

  const renderLogoSection = () => (
    <Card>
      <Heading level={3}>Brand Logo</Heading>
      <Text variant="secondary">Upload and manage your brand logo</Text>

      <Flex direction="column" gap="lg" align="center">
        {brandConfig.logo ? (
          <Card style={{ padding: theme.spacing.xl, textAlign: 'center' }}>
            <img 
              src={brandConfig.logo} 
              alt="Brand Logo" 
              style={{ maxWidth: '200px', maxHeight: '100px' }}
            />
            <Flex gap="sm" justify="center" style={{ marginTop: theme.spacing.md }}>
              <Button variant="secondary" size="sm">
                <Edit3 size={16} />
                Replace
              </Button>
              <Button variant="danger" size="sm">
                <Trash2 size={16} />
                Remove
              </Button>
            </Flex>
          </Card>
        ) : (
          <Card 
            style={{ 
              padding: theme.spacing.xl, 
              textAlign: 'center',
              border: `2px dashed ${theme.colors.border.medium}`,
              cursor: 'pointer'
            }}
          >
            <Upload size={48} style={{ color: theme.colors.text.muted }} />
            <Heading level={4}>Upload Logo</Heading>
            <Text variant="muted">Drag and drop or click to select</Text>
          </Card>
        )}
      </Flex>
    </Card>
  );

  const renderTypographySection = () => (
    <Card>
      <Heading level={3}>Typography</Heading>
      <Text variant="secondary">Choose fonts for your brand</Text>

      <Grid cols="1fr 1fr" gap="lg">
        <Card>
          <Text weight="medium">Primary Font</Text>
          <select 
            value={brandConfig.fonts.primary}
            onChange={(e) => setBrandConfig({
              ...brandConfig,
              fonts: { ...brandConfig.fonts, primary: e.target.value }
            })}
            style={{
              width: '100%',
              padding: theme.spacing.sm,
              border: `1px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.md,
              background: theme.colors.background
            }}
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
          </select>
          <div style={{ 
            marginTop: theme.spacing.md,
            fontFamily: brandConfig.fonts.primary 
          }}>
            <Text size="lg">Sample text in {brandConfig.fonts.primary}</Text>
          </div>
        </Card>

        <Card>
          <Text weight="medium">Secondary Font</Text>
          <select 
            value={brandConfig.fonts.secondary}
            onChange={(e) => setBrandConfig({
              ...brandConfig,
              fonts: { ...brandConfig.fonts, secondary: e.target.value }
            })}
            style={{
              width: '100%',
              padding: theme.spacing.sm,
              border: `1px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.md,
              background: theme.colors.background
            }}
          >
            <option value="Roboto">Roboto</option>
            <option value="Inter">Inter</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
          </select>
          <div style={{ 
            marginTop: theme.spacing.md,
            fontFamily: brandConfig.fonts.secondary 
          }}>
            <Text size="lg">Sample text in {brandConfig.fonts.secondary}</Text>
          </div>
        </Card>
      </Grid>
    </Card>
  );

  const renderPreviewSection = () => (
    <Card>
      <Heading level={3}>Brand Preview</Heading>
      <Text variant="secondary">See how your brand looks in action</Text>

      <Card 
        style={{ 
          background: `linear-gradient(135deg, ${brandConfig.colors.primary}, ${brandConfig.colors.secondary})`,
          color: 'white',
          padding: theme.spacing.xl
        }}
      >
        <Flex align="center" gap="lg">
          <ThemeAwareLogo size="lg" />
          <div>
            <Heading 
              level={2} 
              style={{ 
                fontFamily: brandConfig.fonts.primary,
                color: 'white',
                margin: 0
              }}
            >
              TrainArama
            </Heading>
            <Text 
              style={{ 
                fontFamily: brandConfig.fonts.secondary,
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              AI-Powered Education Platform
            </Text>
          </div>
        </Flex>
      </Card>

      <Flex gap="sm" style={{ marginTop: theme.spacing.lg }}>
        <Button>
          <Download size={16} />
          Export Brand Kit
        </Button>
        <Button variant="secondary">
          <Eye size={16} />
          Preview Components
        </Button>
      </Flex>
    </Card>
  );

  const sections = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'logo', label: 'Logo', icon: Image },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'preview', label: 'Preview', icon: Eye }
  ];

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.surface }}>
      {/* Header */}
      <Card style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
        <Container>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap="lg">
              <ThemeAwareLogo size="sm" />
              <Heading level={1} style={{ margin: 0 }}>Brand Manager</Heading>
            </Flex>

            <Flex gap="sm">
              <Button variant="secondary">
                <RefreshCw size={16} />
                Reset
              </Button>
              <Button onClick={handleSaveBrand}>
                <Save size={16} />
                Save Brand
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Card>

      <Container style={{ padding: theme.spacing.lg }}>
        <Grid cols="250px 1fr" gap="lg">
          {/* Sidebar */}
          <Card>
            <Heading level={3}>Sections</Heading>
            <div style={{ marginTop: theme.spacing.md }}>
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? 'primary' : 'secondary'}
                    onClick={() => setActiveSection(section.id)}
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      marginBottom: theme.spacing.xs
                    }}
                  >
                    <IconComponent size={16} />
                    {section.label}
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Content */}
          <div>
            {activeSection === 'colors' && renderColorSection()}
            {activeSection === 'logo' && renderLogoSection()}
            {activeSection === 'typography' && renderTypographySection()}
            {activeSection === 'preview' && renderPreviewSection()}
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default BrandManager;