import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import Icon from './Icon';
import {colors, sizes, spacing} from '../constants/theme';
import useTheme from '../helper/themHelper';
import {Theme} from '../constants/themeProvider';

interface Iprops {
  title: string;
  whiteHeader?: boolean;
}

const MainHeader = ({title, whiteHeader}: Iprops) => {
  const theme = useTheme();
  const notificationCount = useSelector(
    state => state.notification.notificationCount,
  );

  return (
    <View style={[styles.container]}>
      <Icon
        icon="Hamburger"
        style={styles.color(whiteHeader, theme)}
        onPress={() => {}}
      />
      <Text style={[{color: theme.textColor}, styles.title]}>{title}</Text>
      <View style={styles.notificationContainer}>
        <Icon icon="Notification" style={styles.color(whiteHeader, theme)} />
        {notificationCount > 0 && (
          <Text style={styles.notificationText}>{notificationCount}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create<any>({
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
  color: (whiteHeader: boolean, theme: Theme) => ({
    tintColor: whiteHeader ? colors.white : theme.tintColor,
  }),
});

export default MainHeader;
