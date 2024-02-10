import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import AnimeList from './anime-list';
import {fetchRecentAnime} from '../api/api.helper';

interface IProps {
  title?: string;
  onPress?: void;
  type?: string;
  buttonTitle?: string;
}
const SectionHeader = ({title, onPress, buttonTitle, type}: IProps) => {
  const [Anime, setAnime] = useState<any[]>([]);

  useEffect(() => {
    const getAnime = async () => {
      const AnimeData = await fetchRecentAnime();
      setAnime(AnimeData);
    };
    getAnime();
  }, []);
  console.log('AnimeSelector', Anime);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
      <AnimeList animeData={Anime} />
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
