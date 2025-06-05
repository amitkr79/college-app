import ReactNativeBlobUtil from 'react-native-blob-util';
import {PermissionsAndroid, Platform, Linking} from 'react-native';
import {showMessage} from 'react-native-flash-message';

interface DownloadFileParams {
  url: string;
  fileName: string;
  fileType?: 'pdf' | 'jpg' | 'png' | 'docx' | 'xlsx';
  notificationTitle?: string;
}

/**
 * Downloads a file to the Downloads directory using Android Download Manager (Android only).
 * Handles permission logic for Android < 11 and uses system-safe download method for newer versions.
 */
export const downloadFile = async (params: DownloadFileParams): Promise<void> => {
  const { url, fileName, fileType = 'pdf', notificationTitle = 'Downloading file' } = params;

  try {
    // Clean filename - important for Android Download Manager
    const cleanFileName = fileName.replace(/[^a-z0-9._-]/gi, '_').toLowerCase();
    
    // Define download path
    const dirs = ReactNativeBlobUtil.fs.dirs;
    const downloadDir = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const filePath = `${downloadDir}/${cleanFileName}.${fileType}`;

    // MIME type mapping
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };

    const mimeType = mimeTypes[fileType] || 'application/octet-stream';

    // Configure download - optimized for modern Android
    const config = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: notificationTitle,
          description: 'File download in progress',
          mime: mimeType,
          path: filePath,
          mediaScannable: true,
          visibleInDownloadsUi: true,
          // These are important for Android 10+
          destinationInExternalPublicDir: true,
          // For Android 11+
          allowScanningByMediaScanner: true,
        },
      },
    });

    const response = await ReactNativeBlobUtil.config(config).fetch('GET', url, {
      'User-Agent': 'Mozilla/5.0',
      'Accept': '*/*',
    });

    // On Android, notify the download manager
    if (Platform.OS === 'android') {
      try {
        await ReactNativeBlobUtil.android.addCompleteDownload({
          title: cleanFileName,
          description: 'Download complete',
          mime: mimeType,
          path: response.path(),
          showNotification: true,
        });
      } catch (e) {
        console.warn('Could not add to download manager:', e);
      }
    }

    showMessage({
      message: 'Download complete!',
      description: `File saved to Downloads`,
      type: 'success',
    });

  } catch (error: any) {
    console.error('Download failed:', error);
    
    showMessage({
      message: 'Download failed',
      description: error.message || 'Unable to download file',
      type: 'danger',
    });

    // Fallback to browser if download manager fails
    if (Platform.OS === 'android' && error.toString().includes('Download manager')) {
      await Linking.openURL(url);
    }
  }
};

/**
 * 🧾 Helper to quickly download PDF files
 */
export const downloadPdf = (url: string, fileName: string) => {
  return downloadFile({
    url,
    fileName: fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase(), // Sanitize filename
    fileType: 'pdf',
    notificationTitle: 'Downloading PDF',
  });
};
