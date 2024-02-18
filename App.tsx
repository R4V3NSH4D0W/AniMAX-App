import React from 'react';

import MainNavigator from './src/navigations/MainNavigator';

import {Provider} from 'react-redux';
import store from './src/store/store';
import {ThemeProvider} from './src/constants/themeProvider';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
