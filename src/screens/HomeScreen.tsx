import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MainHeader from '../componets/MainHeader';
import {colors} from '../constants/theme';
import ScreenHeader from '../componets/screenHeader';
import TopAnime from '../componets/topAnime';

import SectionHeader from '../componets/section-header';

const HomeScreen = () => {
  const sectionHeaders = [
    {
      title: 'Trending Anime',
      type: 'trending',
      buttonTitle: 'See All',
      onPress: () => {},
    },
    {title: 'Recent Anime', buttonTitle: 'See All', onPress: () => {}},
  ];

  return (
    <View style={styles.container}>
      <MainHeader title="AniMAX" />
      <ScreenHeader mainTitle="Find Your" secondTitle="Favorite Anime" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopAnime />
        {sectionHeaders.map((section, index) => (
          <SectionHeader
            key={index}
            title={section.title}
            type={section.type}
            buttonTitle={section.buttonTitle}
            onPress={section.onPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});