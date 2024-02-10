import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '../constants/theme';
import MainHeader from '../componets/MainHeader';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <MainHeader title="search" />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});
