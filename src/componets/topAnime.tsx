import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {IKitsuneePopular} from '../constants/app.type';
import {colors, sizes, spacing} from '../constants/theme';

import FavoriteButton from './favorite-button';
import {kitsuneeFetchPopularAnime} from '../api/api.helper';

const CARD_HEIGHT = 200;
const CARD_WIDTH = sizes.width - 90;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState<IKitsuneePopular[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPopularAnime = async () => {
      const result = await kitsuneeFetchPopularAnime();
      setTopAnime(result);
      setIsLoading(false);
    };
    getPopularAnime();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            {[...Array(4)].map((_, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.imageBox} />

                <View style={[styles.shadow, {width: '70%'}]} />

                <View
                  style={[
                    styles.textContainer,
                    {width: '90%', height: 20, marginTop: 10},
                  ]}
                />
                <View
                  style={[
                    styles.textContainer,
                    {width: '60%', height: 20, marginTop: 10},
                  ]}
                />
              </View>
            ))}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
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
              onPress={() =>
                navigation.navigate('AnimeDetail', {detail: item})
              }>
              <View style={styles.card}>
                <FavoriteButton style={styles.favorite} animeId={item.id} />
                <View style={styles.imageBox}>
                  <Image source={{uri: item.image}} style={styles.image} />
                </View>
                <View style={styles.shadow} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginRight: -18,
    borderRadius: 10,
    width: CARD_WIDTH,
    marginVertical: 10,
    height: CARD_HEIGHT,
    overflow: 'hidden',
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
    borderRadius: 10,
    overflow: 'hidden',
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT / 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  textContainer: {
    left: 10,
    right: 10,
    bottom: 10,
    position: 'absolute',
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default TopAnime;
