import {Image} from 'react-native-animatable';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {Manga} from '../../constants/app.type';
import {Theme} from '../../constants/themeProvider';
import {sizes, spacing} from '../../constants/theme';

import useTheme from '../../helper/themHelper';
import FavoriteButton from '../favorite-button';
import {getCoverFileName} from '../../api/api.helper';

const CARD_HEIGHT = 220;
const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);

interface IProps {
  manga: Manga[];
}

const MangaList: React.FC<IProps> = props => {
  const {manga} = props;

  const theme = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchCoverFileNames = async () => {
      let loadedImagesCount = 0;

      for (const item of manga) {
        const coverArtID = item.relationships.find(
          relationship => relationship.type === 'cover_art',
        );
        const fileNameResponse = await getCoverFileName(
          coverArtID?.id as string,
        );

        const fileName = fileNameResponse?.data?.attributes?.fileName;
        item.coverImage = `https://uploads.mangadex.org/covers/${item.id}/${fileName}`;

        loadedImagesCount++;

        if (loadedImagesCount === manga.length) {
          setIsLoading(false);
        }
      }
    };

    fetchCoverFileNames();
  }, [manga]);

  const truncate = (text: string, maxLength: number) => {
    return text?.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
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
          manga?.map(item => (
            <TouchableOpacity
              key={item?.id}
              onPress={() =>
                navigation.navigate('AnimeDetail', {detail: item})
              }>
              <View style={styles.card(theme)} key={item.id}>
                {/* <Text>{item?.attributes.title.en}</Text> */}
                <View style={styles.imageBox}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.coverImage,
                    }}
                  />
                </View>
                <View style={styles.footer}>
                  <View style={styles.titleBox}>
                    <Text style={styles.title(theme)}>
                      {truncate(item?.attributes.title.en, 10)}
                    </Text>
                    {/* {isSearchResult ? (
                    <Text style={[{color: theme.textColor}, styles.subOrDub]}>
                      {item?.subOrDub}
                    </Text>
                  ) : (
                    <Text style={styles.episode(theme)}>
                      Episodes {item?.episodeNumber || item?.episodes?.length}
                    </Text>
                  )} */}
                  </View>
                  <FavoriteButton />
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create<any>({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 25,
    justifyContent: 'space-between',
  },
  card: (theme: Theme) => ({
    borderWidth: 1,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    backgroundColor: theme.cardColor,
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
  cardContainer: {
    marginBottom: spacing.l,
  },
});
export default MangaList;
