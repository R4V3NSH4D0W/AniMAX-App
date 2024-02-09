import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FavoriteButton from './favorite-button';
import {colors, sizes, spacing} from '../constants/theme';
import {
  fetchAnimeData,
  fetchRecentAnime,
  fetchTrendingAnime,
} from '../api/api.healper';
import {useNavigation} from '@react-navigation/native';

const CARD_HEIGHT = 220;
const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);

interface IProps {
  type?: string;
}

const AnimeList = ({type}: IProps) => {
  const [Anime, setAnime] = useState<any[]>([]);

  useEffect(() => {
    const getAnime = async () => {
      const AnimeData = await fetchRecentAnime();
      setAnime(AnimeData);
    };
    getAnime();
  }, []);

  useEffect(() => {
    if (type === 'trending') {
      const getAnime = async () => {
        const AnimeData = await fetchTrendingAnime();
        setAnime(AnimeData);
      };

      getAnime();
    }
  }, [type]);

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {Anime.map(item => {
        return (
          <TouchableOpacity
            style={styles.cardContainer}
            key={item.id}
            onPress={() => navigation.navigate('AnimeDetail', {detail: item})}>
            <View style={[styles.card]} key={item.id}>
              <View style={styles.imageBox}>
                {console.log(item.attributes?.posterImage)}
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      item.attributes?.posterImage?.original ||
                      item.attributes?.posterImage?.tiny ||
                      item.attributes?.posterImage?.small ||
                      item.attributes?.posterImage?.medium,
                  }}
                />
              </View>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>
                    {truncate(
                      item.attributes?.titles?.en ||
                        item.attributes?.titles?.en_jp,
                      10,
                    )}
                  </Text>
                  <Text style={styles.location}>
                    Episodes {item?.attributes?.episodeLength}
                  </Text>
                </View>
                <FavoriteButton />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    elevation: 3,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default AnimeList;
