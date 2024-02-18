import React, {createContext, useEffect, useState, ReactNode} from 'react';
import {Appearance} from 'react-native';
import {colors} from './theme';

// Define the type for the theme object
export interface Theme {
  backgroundColor: string;
  textColor: string;
  tintColor: string;
  cardColor: string;
}

// Define the type for the children prop
interface ThemeProviderProps {
  children: ReactNode;
}

const getTheme = (): Theme => {
  return Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
};

// Custom light and dark themes
const lightTheme: Theme = {
  backgroundColor: colors.light,
  textColor: colors.black,
  tintColor: colors.black,
  cardColor: colors.light,
};

const darkTheme: Theme = {
  backgroundColor: colors.darkGray,
  textColor: colors.light,
  tintColor: colors.white,
  cardColor: colors.darkGray,
};

// Create the context
export const ThemeContext = createContext<Theme>(lightTheme);

// Create the provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(getTheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(getTheme());
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
