import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toggleMode} from '../actions/action';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../helper/themHelper';
import {colors, sizes, spacing} from '../constants/theme';
import {Theme} from '../constants/themeProvider';
import Icon from './Icon';

interface Iprops {
  title: string;
  showToggle?: boolean;
  whiteHeader?: boolean;
}

const MainHeader = ({title, whiteHeader, showToggle}: Iprops) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const notificationCount = useSelector(
    state => state.notification.notificationCount,
  );
  const mode = useSelector(state => state.mode);
  console.log(mode);
  const dispatch = useDispatch();

  const [isOn, setIsOn] = useState(false);
  const translateXValue = useRef(new Animated.Value(0)).current;

  const handelNavigation = () => {
    navigation.navigate('Favorite');
  };

  const toggleHandle = () => {
    setIsOn(!isOn);
    Animated.spring(translateXValue, {
      toValue: isOn ? 0 : 32,
      useNativeDriver: false,
    }).start();
    dispatch(toggleMode());
  };

  return (
    <View style={[styles.container]}>
      {showToggle && (
        <TouchableOpacity onPress={toggleHandle}>
          <View
            style={[
              styles.toggleButton,
              {backgroundColor: mode === 'Manga' ? 'limegreen' : 'gray'},
            ]}>
            <Animated.View
              style={[
                styles.circle,
                {transform: [{translateX: translateXValue}]},
              ]}
            />
          </View>
        </TouchableOpacity>
      )}
      <Text style={[{color: theme.textColor}, styles.title]}>{title}</Text>
      <View style={styles.notificationContainer}>
        <TouchableOpacity onPress={handelNavigation}>
          <Icon icon="Notification" style={styles.color(whiteHeader, theme)} />
          {notificationCount > 0 && (
            <Text style={styles.notificationText}>{notificationCount}</Text>
          )}
        </TouchableOpacity>
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
  toggleButton: {
    width: 64,
    height: 32,
    borderRadius: 32,
    padding: 4,
    justifyContent: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
});

export default MainHeader;
