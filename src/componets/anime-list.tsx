import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import {IKitsuneeInfo} from '../constants/app.type';
import {colors, sizes, spacing} from '../constants/theme';

import FavoriteButton from './favorite-button';

const CARD_HEIGHT = 220;
const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);

interface AnimeListProps {
  animeData: IKitsuneeInfo[];
  isSearchResult?: boolean;
}

const AnimeList = (props: AnimeListProps) => {
  const {animeData, isSearchResult} = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (animeData.length > 0) {
      setIsLoading(false);
    }
  }, [animeData]);

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {isLoading || animeData.length === 0 ? (
        <SkeletonPlaceholder>
          <>
            {[...Array(4)].map((_, index) => (
              <View style={styles.cardContainer} key={index}>
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  alignItems="center"
                  gap={20}>
                  <SkeletonPlaceholder.Item
                    width={CARD_WIDTH}
                    height={CARD_HEIGHT - 60}
                    borderRadius={sizes.radius}
                  />
                  <SkeletonPlaceholder.Item
                    width={CARD_WIDTH}
                    height={CARD_HEIGHT - 60}
                    borderRadius={sizes.radius}
                  />
                </SkeletonPlaceholder.Item>
              </View>
            ))}
          </>
        </SkeletonPlaceholder>
      ) : (
        animeData.map(item => (
          <TouchableOpacity
            style={styles.cardContainer}
            key={item.id}
            onPress={() => navigation.navigate('AnimeDetail', {detail: item})}>
            <View style={[styles.card]} key={item.id}>
              <View style={styles.imageBox}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{truncate(item.title, 10)}</Text>
                  {isSearchResult ? (
                    <Text style={styles.subOrDub}>{item?.subOrDub}</Text>
                  ) : (
                    <Text style={styles.episode}>
                      Episodes {item?.episodeNumber || item?.episodes?.length}
                    </Text>
                  )}
                </View>
                <FavoriteButton animeId={item.id} />
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
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
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#ddd',
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
  episode: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
  subOrDub: {
    fontWeight: 'bold',
    color: colors.black,
  },
});
export default AnimeList;
