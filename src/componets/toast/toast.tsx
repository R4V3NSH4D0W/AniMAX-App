import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/theme';

interface ToastProps {
  data: ToastDataItems;
}

interface ToastDataItems {
  title: string;
  type: 'success' | 'error';
}

const Toast = (props: ToastProps) => {
  const {data} = props;

  return (
    <View
      style={[
        styles.container,
        data.type === 'success'
          ? styles.successContainer
          : styles.errorContainer,
      ]}>
      <Text
        style={[
          styles.message,
          data.type === 'success' ? styles.successText : styles.errorText,
        ]}>
        {data.title}
      </Text>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    width: '100%',
  },
  successContainer: {
    backgroundColor: 'green',
  },
  errorContainer: {
    backgroundColor: 'red',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  successText: {
    fontSize: 15,
  },
  errorText: {
    fontSize: 15,
  },
});
