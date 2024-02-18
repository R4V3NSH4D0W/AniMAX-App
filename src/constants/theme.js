import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const colors = {
  primary: '#070f18',
  gray: '#8b8989',
  purple: '#9769e2',
  lightGray: '#b2b2b2',
  light: '#fbfbfb',
  white: '#fff',
  black: '#080808',
  brown: '#493E32',
  lightBlue: '#A1B1BC',
  darkBlue: '#56728e',
  orange: '#b8ga18',
  blue: '#6390ob7',
  gold: '#cb913e',
  darkGray: '#292929',
  midGray: '#353535',
  midLightGray: '#202123',
};

export const shadow = {
  light: {
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};

export const sizes = {
  width,
  height,
  h2: 24,
  h3: 18,
  body: 14,
  title: 32,
  radius: 16,
};

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
};
