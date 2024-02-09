import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from './Icon';
import {sizes, spacing} from '../constants/theme';

interface IProps {
  title: string;
}

const MainHeader = ({title}: IProps) => {
  return (
    <View style={[styles.container]}>
      <Icon icon="Hamburger" onPress={() => {}} />
      <Text style={styles.title}>{title}</Text>
      <Icon icon="Notification" />
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
  },
});
