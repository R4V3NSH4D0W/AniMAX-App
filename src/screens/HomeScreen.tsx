import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import TopAnime from '../componets/topAnime';
import MainHeader from '../componets/MainHeader';
import ScreenHeader from '../componets/screenHeader';
import SectionHeader from '../componets/section-header';

import {colors} from '../constants/theme';

const HomeScreen = () => {
  const sectionHeaders = [
    {title: 'Recent Anime', buttonTitle: 'See All', onPress: () => {}},
  ];

  return (
    <View style={styles.container}>
      <MainHeader title="Kitsunee" />
      <ScreenHeader mainTitle="Find Your" secondTitle="Favorite Anime" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopAnime />
        {sectionHeaders.map((section, index) => (
          <SectionHeader
            key={index}
            title={section.title}
            buttonTitle={section.buttonTitle}
            onPress={() => {}}
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
