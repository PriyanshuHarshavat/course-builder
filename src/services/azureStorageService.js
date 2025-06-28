import { BlobServiceClient } from '@azure/storage-blob';

class AzureStorageService {
  constructor() {
    this.connectionString = process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING;
    this.accountName = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_NAME;
    
    // Container names
    this.containers = {
      franchiseAssets: process.env.REACT_APP_FRANCHISE_ASSETS_CONTAINER,
      courseMedia: process.env.REACT_APP_COURSE_MEDIA_CONTAINER,
      userContent: process.env.REACT_APP_USER_CONTENT_CONTAINER,
      systemAssets: process.env.REACT_APP_SYSTEM_ASSETS_CONTAINER
    };

    // Initialize blob service client
    this.blobServiceClient = null;
    this.initializeClient();
  }

  initializeClient() {
    try {
      if (this.connectionString && this.connectionString !== 'YOUR_CONNECTION_STRING') {
        this.blobServiceClient = BlobServiceClient.fromConnectionString(this.connectionString);
        console.log('✅ Azure Storage connected successfully');
      } else {
        console.warn('⚠️ Azure Storage connection string not configured');
      }
    } catch (error) {
      console.error('❌ Failed to initialize Azure Storage:', error);
    }
  }

  /**
   * Upload file to specific container with franchise isolation
   * @param {File} file - File to upload
   * @param {string} containerType - Type of container (franchiseAssets, courseMedia, etc.)
   * @param {string} franchiseId - Franchise ID for data isolation
   * @param {string} subfolder - Optional subfolder path
   * @returns {Promise<string>} - URL of uploaded file
   */
  async uploadFile(file, containerType, franchiseId = 'system', subfolder = '') {
    if (!this.blobServiceClient) {
      throw new Error('Azure Storage not initialized. Please check connection string.');
    }

    try {
      // Get container reference
      const containerName = this.containers[containerType];
      if (!containerName) {
        throw new Error(`Invalid container type: ${containerType}`);
      }

      const containerClient = this.blobServiceClient.getContainerClient(containerName);

      // Create blob path with franchise isolation
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      
      let blobPath;
      if (containerType === 'systemAssets') {
        // System assets don't need franchise isolation
        blobPath = subfolder ? `${subfolder}/${timestamp}_${sanitizedFileName}` : `${timestamp}_${sanitizedFileName}`;
      } else {
        // Franchise-specific path
        blobPath = subfolder 
          ? `${franchiseId}/${subfolder}/${timestamp}_${sanitizedFileName}`
          : `${franchiseId}/${timestamp}_${sanitizedFileName}`;
      }

      const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

      // Set content type based on file
      const contentType = this.getContentType(file);
      
      // Upload options
      const uploadOptions = {
        blobHTTPHeaders: {
          blobContentType: contentType
        },
        metadata: {
          originalName: file.name,
          franchiseId: franchiseId,
          uploadedAt: new Date().toISOString(),
          uploadedBy: 'course-builder'
        }
      };

      // Upload the file
      console.log(`📤 Uploading ${file.name} to ${containerName}/${blobPath}`);
      const uploadResponse = await blockBlobClient.uploadData(file, uploadOptions);

      if (uploadResponse.errorCode) {
        throw new Error(`Upload failed: ${uploadResponse.errorCode}`);
      }

      // Return the public URL
      const fileUrl = blockBlobClient.url;
      console.log(`✅ Upload successful: ${fileUrl}`);
      
      return {
        url: fileUrl,
        blobPath: blobPath,
        containerName: containerName,
        success: true
      };

    } catch (error) {
      console.error('❌ File upload failed:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  /**
   * Delete file from Azure Storage
   * @param {string} containerType - Type of container
   * @param {string} blobPath - Path to the blob
   * @returns {Promise<boolean>} - Success status
   */
  async deleteFile(containerType, blobPath) {
    if (!this.blobServiceClient) {
      throw new Error('Azure Storage not initialized');
    }

    try {
      const containerName = this.containers[containerType];
      const containerClient = this.blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

      await blockBlobClient.delete();
      console.log(`🗑️ File deleted: ${blobPath}`);
      return true;
    } catch (error) {
      console.error('❌ File deletion failed:', error);
      return false;
    }
  }

  /**
   * List files in a container with franchise filtering
   * @param {string} containerType - Type of container
   * @param {string} franchiseId - Franchise ID filter
   * @param {string} subfolder - Optional subfolder filter
   * @returns {Promise<Array>} - List of files
   */
  async listFiles(containerType, franchiseId = null, subfolder = '') {
    if (!this.blobServiceClient) {
      throw new Error('Azure Storage not initialized');
    }

    try {
      const containerName = this.containers[containerType];
      const containerClient = this.blobServiceClient.getContainerClient(containerName);

      const prefix = franchiseId 
        ? (subfolder ? `${franchiseId}/${subfolder}/` : `${franchiseId}/`)
        : (subfolder ? `${subfolder}/` : '');

      const files = [];
      for await (const blob of containerClient.listBlobsFlat({ prefix })) {
        files.push({
          name: blob.name,
          url: `${containerClient.url}/${blob.name}`,
          lastModified: blob.properties.lastModified,
          contentLength: blob.properties.contentLength,
          contentType: blob.properties.contentType,
          metadata: blob.metadata
        });
      }

      return files;
    } catch (error) {
      console.error('❌ Failed to list files:', error);
      return [];
    }
  }

  /**
   * Generate SAS URL for private containers
   * @param {string} containerType - Type of container
   * @param {string} blobPath - Path to blob
   * @param {number} expirationHours - Hours until expiration
   * @returns {string} - SAS URL
   */
  generateSasUrl(containerType, blobPath, expirationHours = 1) {
    // For now, return regular URL
    // In production, implement SAS token generation
    const containerName = this.containers[containerType];
    return `https://${this.accountName}.blob.core.windows.net/${containerName}/${blobPath}`;
  }

  /**
   * Get appropriate content type for file
   * @param {File} file - File object
   * @returns {string} - Content type
   */
  getContentType(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    
    const contentTypes = {
      // Images
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'ico': 'image/x-icon',
      
      // Videos
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'avi': 'video/avi',
      'mov': 'video/quicktime',
      
      // Audio
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
      
      // Documents
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'txt': 'text/plain',
      'json': 'application/json',
      
      // Web
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript'
    };

    return contentTypes[extension] || 'application/octet-stream';
  }

  /**
   * Upload franchise logo
   * @param {File} file - Logo file
   * @param {string} franchiseId - Franchise ID
   * @returns {Promise<string>} - Logo URL
   */
  async uploadFranchiseLogo(file, franchiseId) {
    return this.uploadFile(file, 'franchiseAssets', franchiseId, 'logos');
  }

  /**
   * Upload custom badge
   * @param {File} file - Badge file
   * @param {string} franchiseId - Franchise ID
   * @returns {Promise<string>} - Badge URL
   */
  async uploadCustomBadge(file, franchiseId) {
    return this.uploadFile(file, 'franchiseAssets', franchiseId, 'badges');
  }

  /**
   * Upload course thumbnail
   * @param {File} file - Thumbnail file
   * @param {string} franchiseId - Franchise ID
   * @param {string} courseId - Course ID
   * @returns {Promise<string>} - Thumbnail URL
   */
  async uploadCourseThumbnail(file, franchiseId, courseId) {
    return this.uploadFile(file, 'courseMedia', franchiseId, `courses/${courseId}/thumbnails`);
  }

  /**
   * Upload user avatar
   * @param {File} file - Avatar file
   * @param {string} franchiseId - Franchise ID
   * @param {string} userId - User ID
   * @returns {Promise<string>} - Avatar URL
   */
  async uploadUserAvatar(file, franchiseId, userId) {
    return this.uploadFile(file, 'userContent', franchiseId, `users/${userId}/profile`);
  }

  /**
   * Get franchise branding assets
   * @param {string} franchiseId - Franchise ID
   * @returns {Promise<Object>} - Branding assets
   */
  async getFranchiseBranding(franchiseId) {
    try {
      const [logos, badges] = await Promise.all([
        this.listFiles('franchiseAssets', franchiseId, 'logos'),
        this.listFiles('franchiseAssets', franchiseId, 'badges')
      ]);

      return {
        logos,
        badges,
        success: true
      };
    } catch (error) {
      console.error('❌ Failed to get franchise branding:', error);
      return { logos: [], badges: [], success: false };
    }
  }
}

// Create singleton instance
const azureStorage = new AzureStorageService();

export default azureStorage;
export { AzureStorageService };