import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {sizes, spacing} from '../constants/theme';
import useTheme from '../helper/themHelper';
import {Theme} from '../constants/themeProvider';

interface IProps {
  mainTitle: string;
  secondTitle: string;
}

const ScreenHeader = ({mainTitle, secondTitle}: IProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle(theme)}>{mainTitle}</Text>
      <Text style={styles.secondTitle(theme)}>{secondTitle}</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create<any>({
  container: {
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
  },
  mainTitle: (theme: Theme) => ({
    fontWeight: 'bold',
    color: theme.textColor,
    fontSize: sizes.title,
  }),
  secondTitle: (theme: Theme) => ({
    fontSize: sizes.h2,
    color: theme.textColor,
  }),
});
