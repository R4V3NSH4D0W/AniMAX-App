import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {colors} from '../constants/theme';

interface ButtonProps {
  title: string;
  bookmarked?: boolean;
  iconName?: string;
  hasIcon?: boolean;
  onPress: () => void;
}

const Button = ({
  title,
  onPress,
  hasIcon,
  iconName,
  bookmarked,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.main(bookmarked)}>
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
  main: (disabled: boolean) => ({
    gap: 10,
    padding: 10,
    width: '40%',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: disabled ? colors.gray : colors.purple,
  }),
  text: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
