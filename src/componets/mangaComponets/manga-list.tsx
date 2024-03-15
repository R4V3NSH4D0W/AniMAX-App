import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Manga} from '../../constants/app.type';
import useTheme from '../../helper/themHelper';
import {Theme} from '../../constants/themeProvider';
import {sizes, spacing} from '../../constants/theme';
import {Image} from 'react-native-animatable';
import {getCoverFileName} from '../../api/api.helper';
import FavoriteButton from '../favorite-button';

const CARD_HEIGHT = 220;
const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);

interface IProps {
  manga: Manga[];
}

const MangaList: React.FC<IProps> = props => {
  const {manga} = props;
  const theme = useTheme();
  console.log('Manga', manga);
  useEffect(() => {
    const fetchCoverFileNames = async () => {
      for (const item of manga) {
        const coverArtID = item.relationships.find(
          relationship => relationship.type === 'cover_art',
        );
        const fileNameResponse = await getCoverFileName(
          coverArtID?.id as string,
        );
        const fileName = fileNameResponse?.data?.attributes?.fileName;
        item.coverFileName = fileName;
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
        {manga?.map(item => (
          <TouchableOpacity key={item?.id}>
            <View style={styles.card(theme)} key={item.id}>
              {/* <Text>{item?.attributes.title.en}</Text> */}
              <View style={styles.imageBox}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://uploads.mangadex.org/covers/${item.id}/${item.coverFileName}`,
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
        ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 30,
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
});
export default MangaList;
