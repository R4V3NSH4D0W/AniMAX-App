import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {sizes, spacing} from '../constants/theme';

interface IProps {
  mainTitle: string;
  secondTitle: string;
}

const ScreenHeader = ({mainTitle, secondTitle}: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{mainTitle}</Text>
      <Text style={styles.secondTitle}>{secondTitle}</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: sizes.title,
  },
  secondTitle: {
    fontSize: sizes.h2,
  },
});
