import React, {useEffect} from 'react';

import MainNavigator from './src/navigations/MainNavigator';
import {NativeModules} from 'react-native';

const {NativeDevSettings} = NativeModules;
const App = () => {
  // useEffect(() => {
  //   // Enable remote debugging in development mode
  //   if (__DEV__) {
  //     NativeDevSettings.setIsDebuggingRemotely(true);
  //   }
  // }, []);
  return <MainNavigator />;
};

export default App;
