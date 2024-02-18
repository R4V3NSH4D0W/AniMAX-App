import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {colors} from '../constants/theme';

interface ButtonProps {
  title: string;
  style?: any;
  bookmarked?: boolean;
  iconName?: string;
  hasIcon?: boolean;
  isCurrentEpisode?: boolean;
  onPress?: () => void;
}

const Button = ({
  title,
  onPress,
  hasIcon,
  style,
  iconName,
  bookmarked,
  isCurrentEpisode,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.main(bookmarked, isCurrentEpisode), style]}>
        {hasIcon ? (
          <Icons name={iconName as string} size={16} color="white" />
        ) : (
          ''
        )}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  main: (disabled: boolean, isCurrentEpisode: boolean) => ({
    gap: 10,
    padding: 10,
    width: '40%',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: disabled || isCurrentEpisode ? colors.gray : colors.purple,
  }),
  text: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
