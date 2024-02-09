import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {ToastProvider} from 'react-native-toast-notifications';

import TabNavigator from './TabNavigator';
import ToastComponent from '../componets/toast/toast';
import AnimeDetail from '../screens/anime-detail-screen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <ToastProvider
      offset={-10}
      duration={800}
      renderType={{
        custom_toast: toast => ToastComponent(toast),
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AnimeDetail"
            component={AnimeDetail}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default MainNavigator;
