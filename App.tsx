import React, {useEffect, useState} from 'react';
import {Alert, Linking} from 'react-native';
import MainNavigator from './src/navigations/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {ThemeProvider} from './src/constants/themeProvider';
import VersionInfo from 'react-native-version-info';
import {RELEASE_URL, RELEASE_URL_NOTE} from './env';

const App = () => {
  const [latestVersion, setLatestVersion] = useState('');

  useEffect(() => {
    const checkForUpdates = async () => {
      const response = await fetch(RELEASE_URL_NOTE);
      const data = await response.json();
      const latestVersionNumber = data.tag_name;
      setLatestVersion(latestVersionNumber);
    };

    checkForUpdates();
  }, []);

  const handleUpdate = () => {
    const releaseUrl = RELEASE_URL;
    Linking.openURL(releaseUrl);
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
