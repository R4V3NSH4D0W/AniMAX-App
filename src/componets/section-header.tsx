import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AnimeList from './anime-list';

interface IProps {
  title?: string;
  onPress?: void;
  type?: string;
  buttonTitle?: string;
}
const SectionHeader = ({title, onPress, buttonTitle, type}: IProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
      <AnimeList />
      <AnimeList type="trending" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingLeft: 25,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: 'blue',
  },
});

export default SectionHeader;
