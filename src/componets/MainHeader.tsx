import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import Icon from './Icon';
import {sizes, spacing} from '../constants/theme';

const MainHeader = ({title}) => {
  const notificationCount = useSelector(
    state => state.notification.notificationCount,
  );

  return (
    <View style={[styles.container]}>
      <Icon icon="Hamburger" onPress={() => {}} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.notificationContainer}>
        <Icon icon="Notification" />
        {notificationCount > 0 && (
          <Text style={styles.notificationText}>{notificationCount}</Text>
        )}
      </View>
    </View>
  );
};

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
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    left: 12,
    bottom: 12,
    marginLeft: 5,
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
    position: 'absolute',
    backgroundColor: 'red',
  },
});

export default MainHeader;
