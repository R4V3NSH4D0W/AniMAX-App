import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import FavoriteButton from './favorite-button';
import {kitsuneeFetchPopularAnime} from '../api/api.helper';

import {IKitsuneePopular} from '../constants/app.type';
import {colors, sizes, spacing} from '../constants/theme';

const CARD_HEIGHT = 200;
const CARD_WIDTH = sizes.width - 90;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState<IKitsuneePopular[]>([]);

  useEffect(() => {
    const getPopularAnime = async () => {
      const result = await kitsuneeFetchPopularAnime();
      setTopAnime(result);
    };
    getPopularAnime();
  }, []);

  const navigation = useNavigation();

  return (
    <FlatList
      data={topAnime}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{marginHorizontal: spacing.l}}
          onPress={() => navigation.navigate('AnimeDetail', {detail: item})}>
          <View style={[styles.card, {elevation: 5}]}>
            <FavoriteButton style={styles.favorite} animeId={item.id} />
            <View style={styles.imageBox}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: -18,
    borderRadius: 10,
    width: CARD_WIDTH,
    overflow: 'hidden',
    marginVertical: 10,
    height: CARD_HEIGHT,
  },
  favorite: {
    zIndex: 1,
    top: spacing.m,
    right: spacing.m,
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  textContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.white,
  },
  subTitle: {
    color: colors.white,
  },
});

export default TopAnime;
