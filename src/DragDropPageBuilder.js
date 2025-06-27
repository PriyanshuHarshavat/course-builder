import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Layout,
  MousePointer,
  Move,
  RotateCcw,
  Copy,
  Trash2,
  ZoomIn,
  ZoomOut,
  Grid,
  Eye,
  Save,
  Download,
  Upload,
  Layers,
  Settings,
  Lock,
  Unlock,
  Palette,
  Type,
  Image,
  Video,
  Square,
  Circle,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

// Main Container
const BuilderContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 20px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
`;

const BuilderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
`;

const BuilderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToolbarContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ToolButton = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.active ? 'rgba(255, 255, 255, 0.5)' : 'transparent'};
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`;

// Layout Templates Panel
const TemplatesPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
`;

const TemplatesTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;

const TemplateCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const TemplatePreview = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  height: 60px;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
`;

const TemplateName = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

// Main Editor Area
const EditorMain = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  gap: 20px;
  flex: 1;
  min-height: 0;
`;

// Component Palette
const ComponentPalette = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  overflow-y: auto;
`;

const PaletteTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ComponentGrid = styled.div`
  display: grid;
  gap: 8px;
`;

const ComponentItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  cursor: grab;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
  
  &:active {
    cursor: grabbing;
  }
`;

// Canvas Area
const CanvasContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const CanvasArea = styled.div`
  background: white;
  border-radius: 10px;
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: scale(${props => props.zoom || 1});
  transform-origin: center;
  transition: transform 0.3s ease;
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.showGrid ? 0.3 : 0};
  background-image: 
    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

// Draggable Components
const DraggableComponent = styled.div`
  position: absolute;
  background: ${props => props.selected ? 'rgba(76, 175, 80, 0.1)' : 'transparent'};
  border: ${props => props.selected ? '2px solid #4CAF50' : '2px solid transparent'};
  border-radius: 6px;
  cursor: ${props => props.isSelected ? 'move' : 'pointer'};
  transition: all 0.2s ease;
  
  /* Auto-resize container */
  ${props => props.autoResize && css`
    width: auto !important;
    height: auto !important;
    min-width: 60px;
    min-height: 30px;
  `}
  
  &:hover {
    border-color: ${props => props.selected ? '#4CAF50' : 'rgba(102, 126, 234, 0.5)'};
  }
  
  ${props => props.selected && css`animation: ${pulse} 2s infinite;`}
`;

const ComponentContent = styled.div`
  min-width: 100%;
  min-height: 100%;
  padding: 8px;
  border-radius: 4px;
  background: ${props => props.backgroundColor || '#f8f9fa'};
  color: ${props => props.textColor || '#2d3748'};
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-wrap: break-word;
  
  /* Auto-resize based on content */
  ${props => props.autoResize && css`
    width: fit-content;
    height: fit-content;
    min-width: 60px;
    min-height: 30px;
    max-width: 400px;
    white-space: pre-wrap;
  `}
`;

const ResizeHandle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: #4CAF50;
  border: 2px solid white;
  border-radius: 50%;
  cursor: ${props => props.cursor || 'nw-resize'};
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.2s ease;
  
  &.top-left { top: -4px; left: -4px; cursor: nw-resize; }
  &.top-right { top: -4px; right: -4px; cursor: ne-resize; }
  &.bottom-left { bottom: -4px; left: -4px; cursor: sw-resize; }
  &.bottom-right { bottom: -4px; right: -4px; cursor: se-resize; }
`;

// Properties Panel
const PropertiesPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  overflow-y: auto;
`;

const PropertiesTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PropertyGroup = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

const PropertyLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 6px;
  opacity: 0.9;
`;

const PropertyInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  color: white;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 12px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const ColorInput = styled.input`
  width: 40px;
  height: 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
`;

const PropertyRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

// Zoom Controls
const ZoomControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 8px;
`;

const ZoomButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ZoomLevel = styled.div`
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

// Layout Templates Data
const layoutTemplates = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    components: []
  },
  {
    id: 'title-content',
    name: 'Title + Content',
    components: [
      { id: 'title', type: 'title', x: 10, y: 10, width: 80, height: 15, content: 'Your Title Here' },
      { id: 'content', type: 'text', x: 10, y: 30, width: 80, height: 60, content: 'Your content goes here...' }
    ]
  },
  {
    id: 'two-column',
    name: 'Two Columns',
    components: [
      { id: 'left', type: 'text', x: 5, y: 10, width: 40, height: 80, content: 'Left column content...' },
      { id: 'right', type: 'text', x: 55, y: 10, width: 40, height: 80, content: 'Right column content...' }
    ]
  },
  {
    id: 'image-text',
    name: 'Image + Text',
    components: [
      { id: 'image', type: 'image', x: 10, y: 10, width: 35, height: 40, content: '🖼️ Image' },
      { id: 'text', type: 'text', x: 55, y: 10, width: 35, height: 80, content: 'Text content alongside image...' }
    ]
  },
  {
    id: 'grid-layout',
    name: 'Grid Layout',
    components: [
      { id: 'top-left', type: 'text', x: 5, y: 10, width: 40, height: 35, content: 'Top Left' },
      { id: 'top-right', type: 'text', x: 55, y: 10, width: 40, height: 35, content: 'Top Right' },
      { id: 'bottom-left', type: 'text', x: 5, y: 55, width: 40, height: 35, content: 'Bottom Left' },
      { id: 'bottom-right', type: 'text', x: 55, y: 55, width: 40, height: 35, content: 'Bottom Right' }
    ]
  },
  {
    id: 'presentation',
    name: 'Presentation',
    components: [
      { id: 'title', type: 'title', x: 10, y: 5, width: 80, height: 20, content: 'Presentation Title' },
      { id: 'bullet1', type: 'text', x: 15, y: 30, width: 70, height: 10, content: '• Key point one' },
      { id: 'bullet2', type: 'text', x: 15, y: 45, width: 70, height: 10, content: '• Key point two' },
      { id: 'bullet3', type: 'text', x: 15, y: 60, width: 70, height: 10, content: '• Key point three' }
    ]
  }
];

// Component Templates
const componentTypes = [
  { id: 'text', name: 'Text Block', icon: Type, defaultProps: { width: 30, height: 20, content: 'Text content...' } },
  { id: 'title', name: 'Title', icon: Type, defaultProps: { width: 50, height: 15, content: 'Title Here' } },
  { id: 'image', name: 'Image', icon: Image, defaultProps: { width: 25, height: 25, content: '🖼️ Image' } },
  { id: 'video', name: 'Video', icon: Video, defaultProps: { width: 40, height: 30, content: '🎥 Video' } },
  { id: 'shape', name: 'Shape', icon: Square, defaultProps: { width: 20, height: 20, content: '■' } },
  { id: 'button', name: 'Button', icon: MousePointer, defaultProps: { width: 20, height: 10, content: 'Click Me' } }
];

// Main Component
const DragDropPageBuilder = ({ onSave, initialData = null }) => {
  const [tool, setTool] = useState('select');
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (initialData?.components) {
      setComponents(initialData.components);
    }
  }, [initialData]);

  const handleTemplateSelect = (template) => {
    setComponents(template.components.map(comp => ({
      ...comp,
      id: `${comp.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    })));
    setSelectedComponent(null);
  };

  const handleComponentDrop = (componentType) => {
    const defaultProps = componentTypes.find(c => c.id === componentType)?.defaultProps || {};
    const newComponent = {
      id: `${componentType}_${Date.now()}`,
      type: componentType,
      x: 20,
      y: 20,
      ...defaultProps,
      backgroundColor: '#f8f9fa',
      textColor: '#2d3748'
    };
    
    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent.id);
  };

  const handleComponentSelect = (componentId) => {
    setSelectedComponent(componentId);
  };

  const handleComponentUpdate = (componentId, updates) => {
    setComponents(components.map(comp => 
      comp.id === componentId ? { ...comp, ...updates } : comp
    ));
  };

  const handleComponentDelete = (componentId) => {
    setComponents(components.filter(comp => comp.id !== componentId));
    if (selectedComponent === componentId) {
      setSelectedComponent(null);
    }
  };

  const handleMouseDown = (e, componentId) => {
    if (tool !== 'select') return;
    
    e.preventDefault();
    setSelectedComponent(componentId);
    setIsDragging(true);
    
    const component = components.find(c => c.id === componentId);
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const componentRect = e.currentTarget.getBoundingClientRect();
    
    setDragOffset({
      x: e.clientX - componentRect.left,
      y: e.clientY - componentRect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedComponent) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - canvasRect.left - dragOffset.x) / canvasRect.width) * 100;
    const y = ((e.clientY - canvasRect.top - dragOffset.y) / canvasRect.height) * 100;
    
    handleComponentUpdate(selectedComponent, {
      x: Math.max(0, Math.min(95, x)),
      y: Math.max(0, Math.min(95, y))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, selectedComponent, dragOffset]);

  const selectedComponentData = selectedComponent ? 
    components.find(c => c.id === selectedComponent) : null;

  const handleSave = () => {
    const pageData = {
      components,
      timestamp: new Date().toISOString()
    };
    
    if (onSave) {
      onSave(pageData);
    }
    
    console.log('Saving page data:', pageData);
  };

  return (
    <BuilderContainer>
      <BuilderHeader>
        <BuilderTitle>
          <Layout size={28} />
          Drag & Drop Page Builder
        </BuilderTitle>
        <ToolbarContainer>
          <ToolButton active={tool === 'select'} onClick={() => setTool('select')}>
            <MousePointer size={16} />
            Select
          </ToolButton>
          <ToolButton active={showGrid} onClick={() => setShowGrid(!showGrid)}>
            <Grid size={16} />
            Grid
          </ToolButton>
          <ToolButton onClick={() => setZoom(1)}>
            <Eye size={16} />
            Fit
          </ToolButton>
          <ToolButton onClick={handleSave}>
            <Save size={16} />
            Save
          </ToolButton>
        </ToolbarContainer>
      </BuilderHeader>

      <TemplatesPanel>
        <TemplatesTitle>
          <Layers size={18} />
          Layout Templates
        </TemplatesTitle>
        <TemplatesGrid>
          {layoutTemplates.map(template => (
            <TemplateCard key={template.id} onClick={() => handleTemplateSelect(template)}>
              <TemplatePreview>
                {/* Visual preview of template layout */}
                <div style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  width: '80%',
                  height: '20%',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '2px'
                }} />
                {template.id === 'two-column' && (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: '40%',
                      left: '10%',
                      width: '35%',
                      height: '50%',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '2px'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '40%',
                      right: '10%',
                      width: '35%',
                      height: '50%',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '2px'
                    }} />
                  </>
                )}
              </TemplatePreview>
              <TemplateName>{template.name}</TemplateName>
            </TemplateCard>
          ))}
        </TemplatesGrid>
      </TemplatesPanel>

      <EditorMain>
        <ComponentPalette>
          <PaletteTitle>
            <Palette size={18} />
            Components
          </PaletteTitle>
          <ComponentGrid>
            {componentTypes.map(componentType => {
              const IconComponent = componentType.icon;
              return (
                <ComponentItem
                  key={componentType.id}
                  onClick={() => handleComponentDrop(componentType.id)}
                >
                  <IconComponent size={16} />
                  {componentType.name}
                </ComponentItem>
              );
            })}
          </ComponentGrid>
        </ComponentPalette>

        <CanvasContainer>
          <CanvasArea ref={canvasRef} zoom={zoom}>
            <GridOverlay showGrid={showGrid} />
            
            {components.map(component => {
              const isTextType = ['text', 'title'].includes(component.type);
              return (
                <DraggableComponent
                  key={component.id}
                  selected={selectedComponent === component.id}
                  autoResize={isTextType}
                  style={{
                    left: `${component.x}%`,
                    top: `${component.y}%`,
                    ...(isTextType ? {} : {
                      width: `${component.width}%`,
                      height: `${component.height}%`
                    })
                  }}
                  onMouseDown={(e) => handleMouseDown(e, component.id)}
                  onClick={() => handleComponentSelect(component.id)}
                >
                  <ComponentContent
                    backgroundColor={component.backgroundColor}
                    textColor={component.textColor}
                    autoResize={isTextType}
                  >
                    {component.content}
                  </ComponentContent>
                
                {selectedComponent === component.id && (
                  <>
                    <ResizeHandle className="top-left" visible={true} />
                    <ResizeHandle className="top-right" visible={true} />
                    <ResizeHandle className="bottom-left" visible={true} />
                    <ResizeHandle className="bottom-right" visible={true} />
                  </>
                )}
              </DraggableComponent>
              );
            })}
          </CanvasArea>
          
          <ZoomControls>
            <ZoomButton onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
              <ZoomOut size={16} />
            </ZoomButton>
            <ZoomLevel>{Math.round(zoom * 100)}%</ZoomLevel>
            <ZoomButton onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
              <ZoomIn size={16} />
            </ZoomButton>
          </ZoomControls>
        </CanvasContainer>

        <PropertiesPanel>
          <PropertiesTitle>
            <Settings size={18} />
            Properties
          </PropertiesTitle>
          
          {selectedComponentData ? (
            <div>
              <PropertyGroup>
                <PropertyLabel>Content</PropertyLabel>
                <PropertyInput
                  value={selectedComponentData.content || ''}
                  onChange={(e) => handleComponentUpdate(selectedComponent, { content: e.target.value })}
                  placeholder="Enter content..."
                />
              </PropertyGroup>
              
              <PropertyGroup>
                <PropertyLabel>Position & Size</PropertyLabel>
                <PropertyRow>
                  <div style={{ flex: 1 }}>
                    <PropertyLabel>X</PropertyLabel>
                    <PropertyInput
                      type="number"
                      value={Math.round(selectedComponentData.x)}
                      onChange={(e) => handleComponentUpdate(selectedComponent, { x: Number(e.target.value) })}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <PropertyLabel>Y</PropertyLabel>
                    <PropertyInput
                      type="number"
                      value={Math.round(selectedComponentData.y)}
                      onChange={(e) => handleComponentUpdate(selectedComponent, { y: Number(e.target.value) })}
                    />
                  </div>
                </PropertyRow>
                <PropertyRow>
                  <div style={{ flex: 1 }}>
                    <PropertyLabel>Width</PropertyLabel>
                    <PropertyInput
                      type="number"
                      value={Math.round(selectedComponentData.width)}
                      onChange={(e) => handleComponentUpdate(selectedComponent, { width: Number(e.target.value) })}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <PropertyLabel>Height</PropertyLabel>
                    <PropertyInput
                      type="number"
                      value={Math.round(selectedComponentData.height)}
                      onChange={(e) => handleComponentUpdate(selectedComponent, { height: Number(e.target.value) })}
                    />
                  </div>
                </PropertyRow>
              </PropertyGroup>
              
              <PropertyGroup>
                <PropertyLabel>Appearance</PropertyLabel>
                <PropertyRow>
                  <div style={{ flex: 1 }}>
                    <PropertyLabel>Background</PropertyLabel>
                    <ColorInput
                      type="color"
                      value={selectedComponentData.backgroundColor || '#f8f9fa'}
                      onChange={(e) => handleComponentUpdate(selectedComponent, { backgroundColor: e.target.value })}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <PropertyLabel>Text Color</PropertyLabel>
                    <ColorInput
                      type="color"
                      value={selectedComponentData.textColor || '#2d3748'}
                      onChange={(e) => handleComponentUpdate(selectedComponent, { textColor: e.target.value })}
                    />
                  </div>
                </PropertyRow>
              </PropertyGroup>
              
              <PropertyGroup>
                <ToolButton 
                  onClick={() => handleComponentDelete(selectedComponent)}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #f44336, #d32f2f)' }}
                >
                  <Trash2 size={16} />
                  Delete Component
                </ToolButton>
              </PropertyGroup>
            </div>
          ) : (
            <div style={{ textAlign: 'center', opacity: 0.7, padding: '20px' }}>
              <Settings size={32} style={{ marginBottom: '10px' }} />
              <p>Select a component to edit its properties</p>
            </div>
          )}
        </PropertiesPanel>
      </EditorMain>
    </BuilderContainer>
  );
};

export default DragDropPageBuilder;