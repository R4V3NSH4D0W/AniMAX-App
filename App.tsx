import {Provider} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import React, {useEffect, useState} from 'react';
import SendIntent from 'react-native-send-intent';
import VersionInfo from 'react-native-version-info';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

import store from './src/store/store';
import MainNavigator from './src/navigations/MainNavigator';
import {ThemeProvider} from './src/constants/themeProvider';

import {RELEASE_URL_NOTE} from './env';

const App = () => {
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [latestVersion, setLatestVersion] = useState<string>('');

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await fetch(RELEASE_URL_NOTE);
        const data = await response.json();
        const browserDownloadUrls: string[] = data.assets.map(
          (asset: any) => asset.browser_download_url,
        );
        setDownloadUrl(browserDownloadUrls[0]);
        setLatestVersion(data.tag_name);
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    };

    checkForUpdates();
  }, []);

  const requestStoragePermission = async (): Promise<boolean> => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      return (
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.error('Error requesting storage permission:', err);
      return false;
    }
  };

  const downloadAndInstallAPK = async (apkUrl: string) => {
    try {
      const permissionGranted = await requestStoragePermission();
      if (!permissionGranted) {
        return Alert.alert(
          'Permission Denied',
          'You need to grant storage permission to install updates.',
        );
      }

      const apkPath = `${RNFetchBlob.fs.dirs.DownloadDir}/update.apk`;

      const apkExists = await RNFetchBlob.fs.exists(apkPath);

      if (apkExists) {
        Alert.alert(
          'Update Downloaded',
          'The update is already downloaded. Click OK to install it now.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => installApk(apkPath),
            },
          ],
        );
      } else {
        const response = await RNFetchBlob.config({
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: apkPath,
          },
        }).fetch('GET', apkUrl);

        const downloadedFilePath = response.path();

        if (await RNFetchBlob.fs.exists(downloadedFilePath)) {
          installApk(downloadedFilePath);
        } else {
          Alert.alert('Download Failed', 'Failed to download the update.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to download the update.');
    }
  };

  const installApk = async (downloadedFilePath: string) => {
    try {
      if (Platform.OS === 'android') {
        const success = await SendIntent.openFileChooser(
          {
            fileUrl: downloadedFilePath,
            type: 'application/vnd.android.package-archive',
          },
          'com.android.packageinstaller',
        );

        if (success !== undefined && success) {
          await RNFetchBlob.fs.unlink(downloadedFilePath);
        } else {
          Alert.alert('Installation Error', 'Failed to install the update.');
        }
      } else {
        Alert.alert(
          'Unsupported Platform',
          'APK installation is supported only on Android devices.',
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to install the update.');
    }
  };

  const handleUpdate = () => {
    downloadAndInstallAPK(downloadUrl);
  };

  useEffect(() => {
    const currentVersion = VersionInfo.appVersion;
    if (latestVersion && latestVersion !== currentVersion) {
      Alert.alert(
        'Update Available',
        'A new version of the app is available. Do you want to update now?',
        [
          {
            text: 'Remind Me Later',
            style: 'cancel',
          },
          {
            text: 'Update Now',
            onPress: handleUpdate,
          },
        ],
      );
    }
  }, [latestVersion]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
