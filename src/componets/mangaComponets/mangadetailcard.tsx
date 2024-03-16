/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

import Button from '../../utils/button';

import {ICONS} from '../../constants/app.constants';
import {IKitsuneeInfo, MangaDetails} from '../../constants/app.type';
import {colors, sizes, spacing} from '../../constants/theme';
import {storeChapters} from '../../actions/action';

interface IProps {
  id?: string;
  data?: IKitsuneeInfo;
  manga?: MangaDetails;
}

const {width} = Dimensions.get('window');

const MangaDetailCard = ({manga}: IProps) => {
  console.log('MangaID', manga?.id);
  //   console.log(manga?.attributes?.description);
  //   console.log('MangaInfo', manga);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    dispatch(storeChapters(manga?.chapters, manga?.image, manga?.id));
  }, [manga, dispatch]);

  //   const [watchedEpisodes, setWatchedEpisodes] = useState<
  //     {animeId: string; episodeId: string}[]
  //   >([]);
  const isFocused = useIsFocused();
  const toast = useToast();
  const navigation = useNavigation();

  const notificationCount = useSelector(
    state => state.notification.notificationCount,
  );
  //   useEffect(() => {
  //     dispatch(storeEpisodes(data.episodes, data.image, id));
  //   }, [data.episodes, dispatch]);

  //   useEffect(() => {
  //     checkIfBookmarked();
  //   }, []);

  //   const checkIfBookmarked = async () => {
  //     const bookmarkedIds = await AsyncStorage.getItem('bookmarkedIds');
  //     if (bookmarkedIds) {
  //       const parsedIds = JSON.parse(bookmarkedIds);
  //       if (parsedIds.includes(id.toString())) {
  //         setBookmarked(true);
  //       }
  //     }
  //   };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const descriptionText = expanded
    ? manga?.description.en
    : `${manga?.description?.en?.slice(0, 500)}${
        manga?.description?.en?.length > 500 ? '...' : ''
      }`;

  //   const navigateToVideoPlayer = (episode, allEpisodes) => {
  //     navigation.navigate('VideoPlayer', {
  //       episodeData: episode,
  //       allEpisodes,
  //     });
  //   };

  //   useEffect(() => {
  //     fetchWatchedEpisodes(setWatchedEpisodes);
  //   }, [isFocused]);

  //   const checkIfEpisodeWatched = episodeId => {
  //     return isEpisodeWatched(id, episodeId, watchedEpisodes);
  //   };

  return (
    <View style={styles.card}>
      <Animatable.View
        delay={500}
        duration={400}
        animation="fadeInUp"
        easing="ease-in-out"
        style={styles.header}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{manga?.title}</Text>
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={styles.description}>{descriptionText}</Text>
          </TouchableOpacity>
          <Text style={styles.subTitle}>Status: {manga?.status}</Text>
          <Text style={styles.subText}>Release Date: {manga?.releaseDate}</Text>
          <Text style={styles.subText}>Genre: {manga?.genres?.join(', ')}</Text>

          <View style={{width: '40%'}}>
            <Button
              hasIcon
              bookmarked={bookmarked}
              title={bookmarked ? 'Bookmarked' : 'Bookmark'}
              iconName={ICONS.BOOKMARK}
              //   onPress={}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '48%'}}>
              <Button title="First Chapter" />
            </View>
            <View style={{width: '48%'}}>
              <Button title="Last Chapter" />
            </View>
          </View>
          {/* <View style={{marginTop: 10}}>
            <Button style={styles.chapterList} title="Chapter 1" />
          </View> */}
          <View style={styles.chapterContainer}>
            {manga?.chapters?.map(chapter => (
              <View key={chapter.id} style={{width: 50}}>
                <Button
                  title={chapter.chapterNumber.toString()}
                  onPress={() =>
                    navigation.navigate('MangaViewer', {
                      chapterData: chapter.id,
                    })
                  }
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    left: 0,
    right: 0,
    bottom: 0,
    height: '90%',
    position: 'absolute',
  },
  chapterList: {
    // backgroundColor: colors.darkPurple,
  },
  header: {
    flex: 1,
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
  },
  title: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: sizes.title,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    paddingTop: 10,
    paddingBottom: 10,
    color: colors.white,
  },
  subTitle: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: 'bold',
    color: colors.white,
  },
  subText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.white,
  },
  episodes: {
    marginTop: 20,
    width: width / 8,
    height: 50,
    flexDirection: 'row',
  },
  chapterContainer: {
    gap: 10,
    marginLeft: 6.5,
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  watchedEpisode: {
    backgroundColor: colors.darkPurple,
  },
});

export default MangaDetailCard;
