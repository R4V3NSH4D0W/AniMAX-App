import {useContext} from 'react';
import {ThemeContext, Theme} from '../constants/themeProvider';

const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default useTheme;
