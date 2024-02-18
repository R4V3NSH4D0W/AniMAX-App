import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import {IKitsuneeInfo} from '../constants/app.type';
import {colors, sizes, spacing} from '../constants/theme';

import FavoriteButton from './favorite-button';
import useTheme from '../helper/themHelper';
import {Theme} from '../constants/themeProvider';

const CARD_HEIGHT = 220;
const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);

interface AnimeListProps {
  animeData: IKitsuneeInfo[];
  isSearchResult?: boolean;
}

const AnimeList = (props: AnimeListProps) => {
  const theme = useTheme();
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
        <SkeletonPlaceholder backgroundColor={theme.backgroundColor}>
          <>
            {[...Array(4)].map((_, index) => (
              <View key={index} style={styles.cardContainer}>
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
            <View style={styles.card(theme)} key={item.id}>
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
                  <Text style={styles.title(theme)}>
                    {truncate(item.title, 10)}
                  </Text>
                  {isSearchResult ? (
                    <Text style={[{color: theme.textColor}, styles.subOrDub]}>
                      {item?.subOrDub}
                    </Text>
                  ) : (
                    <Text style={styles.episode(theme)}>
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

const styles = StyleSheet.create<any>({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: (theme: Theme) => ({
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    backgroundColor: theme.cardColor,
    borderWidth: 1,
    borderColor: theme.backgroundColor,
  }),
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
  title: (theme: Theme) => ({
    marginVertical: 4,
    fontWeight: 'bold',
    fontSize: sizes.body,
    color: theme.textColor,
  }),
  episode: (theme: Theme) => ({
    fontSize: sizes.body,
    color: theme.textColor,
  }),
  subOrDub: {
    fontWeight: 'bold',
  },
});
export default AnimeList;
