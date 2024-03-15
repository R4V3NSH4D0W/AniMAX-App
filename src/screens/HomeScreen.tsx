import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import TopAnime from '../componets/topAnime';
import MainHeader from '../componets/MainHeader';
import ScreenHeader from '../componets/screenHeader';
import SectionHeader from '../componets/section-header';
import useTheme from '../helper/themHelper';
import {useSelector} from 'react-redux';
import {Text} from 'react-native-animatable';
import AnimeList from '../componets/anime-list';
import {kitsuneeFetchRecentAnime, mangalist} from '../api/api.helper';
import MangaList from '../componets/mangaComponets/manga-list';

const HomeScreen = () => {
  const {mode} = useSelector(state => state.mode);
  console.log('mode', mode);
  const theme = useTheme();
  const sectionHeaders = [
    {title: 'Recent Anime', buttonTitle: 'See All', onPress: () => {}},
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
  });

  const [Manga, setManga] = useState<any[]>([]);

  useEffect(() => {
    const getManga = async () => {
      const mangaData = await mangalist();
      setManga(mangaData);
    };
    getManga();
  }, []);

  return (
    <View style={styles.container}>
      <MainHeader title="Kitsunee" showToggle={true} />
      <ScreenHeader mainTitle="Find Your" secondTitle={`Favorite ${mode}`} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {mode === 'Anime' ? (
          <>
            <TopAnime />
            {sectionHeaders.map((section, index) => (
              <SectionHeader
                key={index}
                title={section.title}
                buttonTitle={section.buttonTitle}
                onPress={() => {}}
              />
            ))}
          </>
        ) : (
          <MangaList manga={Manga.data} />
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
