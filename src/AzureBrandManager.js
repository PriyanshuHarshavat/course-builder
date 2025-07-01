import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import azureStorage from './services/azureStorageService';
import {
  Settings,
  Upload,
  Palette,
  Award,
  Image,
  Save,
  Eye,
  Plus,
  Trash2,
  Download,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

const ManagerContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  min-height: 600px;
`;

const ManagerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UploadArea = styled.div`
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.05);
  }
  
  &.dragover {
    border-color: #4CAF50;
    background: rgba(76, 175, 80, 0.1);
  }
`;

const UploadText = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const UploadSubtext = styled.div`
  font-size: 14px;
  opacity: 0.7;
`;

const FileInput = styled.input`
  display: none;
`;

const AssetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const AssetCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
`;

const AssetImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const AssetName = styled.div`
  font-size: 12px;
  opacity: 0.8;
  word-break: break-all;
`;

const AssetActions = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
  
  &.success {
    background: rgba(76, 175, 80, 0.2);
    border: 1px solid rgba(76, 175, 80, 0.5);
  }
  
  &.error {
    background: rgba(244, 67, 54, 0.2);
    border: 1px solid rgba(244, 67, 54, 0.5);
  }
  
  &.loading {
    background: rgba(255, 193, 7, 0.2);
    border: 1px solid rgba(255, 193, 7, 0.5);
  }
`;

const FranchiseInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  width: 200px;
  margin-bottom: 20px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const AzureBrandManager = () => {
  const [franchiseId, setFranchiseId] = useState('franchise_001');
  const [logos, setLogos] = useState([]);
  const [badges, setBadges] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFranchiseAssets();
  }, [franchiseId]);

  const loadFranchiseAssets = async () => {
    if (!franchiseId) return;
    
    setLoading(true);
    try {
      const branding = await azureStorage.getFranchiseBranding(franchiseId);
      setLogos(branding.logos);
      setBadges(branding.badges);
      setStatus({
        type: 'success',
        message: `Loaded assets for ${franchiseId}`
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Failed to load assets: ${error.message}`
      });
    }
    setLoading(false);
  };

  const handleFileUpload = async (file, type) => {
    if (!file || !franchiseId) return;

    setLoading(true);
    setStatus({
      type: 'loading',
      message: `Uploading ${file.name}...`
    });

    try {
      let result;
      if (type === 'logo') {
        result = await azureStorage.uploadFranchiseLogo(file, franchiseId);
      } else if (type === 'badge') {
        result = await azureStorage.uploadCustomBadge(file, franchiseId);
      }

      if (result.success) {
        setStatus({
          type: 'success',
          message: `✅ Successfully uploaded ${file.name} to Azure Storage!`
        });
        
        // Reload assets
        await loadFranchiseAssets();
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `❌ Upload failed: ${error.message}`
      });
    }
    setLoading(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      handleFileUpload(imageFiles[0], type);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const deleteAsset = async (containerType, blobPath) => {
    setLoading(true);
    try {
      await azureStorage.deleteFile(containerType, blobPath);
      setStatus({
        type: 'success',
        message: 'Asset deleted successfully'
      });
      await loadFranchiseAssets();
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Delete failed: ${error.message}`
      });
    }
    setLoading(false);
  };

  const renderUploadSection = (title, icon, type, assets) => (
    <Section>
      <SectionTitle>
        {icon}
        {title}
      </SectionTitle>
      
      <UploadArea
        onDrop={(e) => handleDrop(e, type)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById(`${type}-input`).click()}
      >
        <Upload size={48} style={{ opacity: 0.7, marginBottom: '10px' }} />
        <UploadText>Drop {type} here or click to browse</UploadText>
        <UploadSubtext>Supports PNG, JPG, SVG files</UploadSubtext>
      </UploadArea>
      
      <FileInput
        id={`${type}-input`}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], type)}
      />
      
      {assets.length > 0 && (
        <AssetGrid>
          {assets.map((asset, index) => (
            <AssetCard key={index}>
              <AssetImage src={asset.url} alt={asset.name} />
              <AssetName>{asset.name}</AssetName>
              <AssetActions>
                <ActionButton
                  onClick={() => window.open(asset.url, '_blank')}
                  title="View"
                >
                  <Eye size={16} />
                </ActionButton>
                <ActionButton
                  onClick={() => navigator.clipboard.writeText(asset.url)}
                  title="Copy URL"
                >
                  <Download size={16} />
                </ActionButton>
                <ActionButton
                  onClick={() => deleteAsset('franchiseAssets', asset.name)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </ActionButton>
              </AssetActions>
            </AssetCard>
          ))}
        </AssetGrid>
      )}
    </Section>
  );

  return (
    <ManagerContainer>
      <ManagerHeader>
        <HeaderTitle>
          <Settings size={32} />
          Azure Brand Manager
        </HeaderTitle>
      </ManagerHeader>

      {/* Franchise ID Input */}
      <Section>
        <SectionTitle>
          <Award size={24} />
          Franchise Configuration
        </SectionTitle>
        <FranchiseInput
          type="text"
          placeholder="Enter Franchise ID"
          value={franchiseId}
          onChange={(e) => setFranchiseId(e.target.value)}
        />
      </Section>

      {/* Status Messages */}
      {status && (
        <StatusMessage className={status.type}>
          {status.type === 'success' && <CheckCircle size={20} />}
          {status.type === 'error' && <AlertCircle size={20} />}
          {status.type === 'loading' && <Loader size={20} className="spin" />}
          {status.message}
        </StatusMessage>
      )}

      {/* Logo Upload Section */}
      {renderUploadSection('Franchise Logos', <Image size={24} />, 'logo', logos)}

      {/* Badge Upload Section */}
      {renderUploadSection('Custom Badges', <Award size={24} />, 'badge', badges)}

      {/* Connection Status */}
      <Section>
        <SectionTitle>
          <Settings size={24} />
          Azure Storage Status
        </SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {azureStorage.blobServiceClient ? (
            <>
              <CheckCircle size={20} color="#4CAF50" />
              <span>✅ Connected to Azure Storage Account: {azureStorage.accountName}</span>
            </>
          ) : (
            <>
              <AlertCircle size={20} color="#FF6B6B" />
              <span>❌ Azure Storage not configured. Please check your connection string in .env.local</span>
            </>
          )}
        </div>
      </Section>

      <style jsx>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </ManagerContainer>
  );
};

export default AzureBrandManager;