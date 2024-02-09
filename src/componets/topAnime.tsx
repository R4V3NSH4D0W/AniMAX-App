import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fetchTopAnime} from '../api/api.healper';
import {FlatList} from 'react-native-gesture-handler';
import {colors, sizes, spacing} from '../constants/theme';
import FavoriteButton from './favorite-button';
import {useNavigation} from '@react-navigation/native';

const CARD_WIDTH = sizes.width - 90;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    const getTopAnime = async () => {
      const topAnimeData = await fetchTopAnime();
      setTopAnime(topAnimeData);
    };
    getTopAnime();
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
            <FavoriteButton style={styles.favorite} />
            <View style={styles.imageBox}>
              <Image
                source={{uri: item.attributes.coverImage.tiny}}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {item.attributes.titles?.en || item.attributes.titles?.en_us}
              </Text>
              <Text style={styles.subTitle}>
                {item.attributes.titles?.Ja_jp || item.attributes.titles?.en_jp}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: -18,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
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
