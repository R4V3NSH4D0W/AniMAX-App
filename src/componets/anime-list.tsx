import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import FavoriteButton from './favorite-button';
import {colors, sizes, spacing} from '../constants/theme';
import {IAnimeItems} from '../constants/app.type';

const CARD_HEIGHT = 220;
const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);

interface AnimeListProps {
  animeData: IAnimeItems[];
}

const AnimeList = (props: AnimeListProps) => {
  const {animeData} = props;

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {animeData.map(item => {
        return (
          <TouchableOpacity
            style={styles.cardContainer}
            key={item.id}
            onPress={() => navigation.navigate('AnimeDetail', {detail: item})}>
            <View style={[styles.card]} key={item.id}>
              <View style={styles.imageBox}>
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
                <FavoriteButton animeId={item.id} />
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
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: {
    elevation: 3,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    backgroundColor: colors.white,
  },
  imageBox: {
    width: CARD_WIDTH,
    overflow: 'hidden',
    height: CARD_HEIGHT - 60,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
  },
  image: {
    width: CARD_WIDTH,
    resizeMode: 'cover',
    height: CARD_HEIGHT - 60,
  },
  footer: {
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontWeight: 'bold',
    fontSize: sizes.body,
    color: colors.primary,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default AnimeList;
