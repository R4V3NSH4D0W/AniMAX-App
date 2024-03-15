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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../utils/button';
import {
  bookMark,
  fetchWatchedEpisodes,
  isEpisodeWatched,
} from '../helper/bookmarkhelper';

import {ICONS} from '../constants/app.constants';
import {IKitsuneeInfo} from '../constants/app.type';
import {colors, sizes, spacing} from '../constants/theme';
import {storeEpisodes} from '../actions/action';

interface IProps {
  id: string;
  data: IKitsuneeInfo;
}

const {width} = Dimensions.get('window');

const AnimeDetailCard = ({data, id}: IProps) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [watchedEpisodes, setWatchedEpisodes] = useState<
    {animeId: string; episodeId: string}[]
  >([]);
  const isFocused = useIsFocused();
  const toast = useToast();
  const navigation = useNavigation();

  const notificationCount = useSelector(
    state => state.notification.notificationCount,
  );
  useEffect(() => {
    dispatch(storeEpisodes(data.episodes, data.image, id));
  }, [data.episodes, dispatch]);

  useEffect(() => {
    checkIfBookmarked();
  }, []);

  const checkIfBookmarked = async () => {
    const bookmarkedIds = await AsyncStorage.getItem('bookmarkedIds');
    if (bookmarkedIds) {
      const parsedIds = JSON.parse(bookmarkedIds);
      if (parsedIds.includes(id.toString())) {
        setBookmarked(true);
      }
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const descriptionText = expanded
    ? data?.description
    : `${data?.description?.slice(0, 500)}${
        data?.description?.length > 500 ? '...' : ''
      }`;

  const navigateToVideoPlayer = (episode, allEpisodes) => {
    navigation.navigate('VideoPlayer', {
      episodeData: episode,
      allEpisodes,
    });
  };

  useEffect(() => {
    fetchWatchedEpisodes(setWatchedEpisodes);
  }, [isFocused]);

  const checkIfEpisodeWatched = episodeId => {
    return isEpisodeWatched(id, episodeId, watchedEpisodes);
  };

  return (
    <View style={styles.card}>
      <Animatable.View
        delay={500}
        duration={400}
        animation="fadeInUp"
        easing="ease-in-out"
        style={styles.header}>
        <Text style={styles.title}>{data.title}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={styles.description}>{descriptionText}</Text>
          </TouchableOpacity>
          {/* <Text style={styles.subText}>{data?.otherName}</Text> */}
          <Text style={styles.subTitle}>Status: {data?.status}</Text>
          <Text style={styles.subText}>Release Date: {data?.releaseDate}</Text>
          <Text style={styles.subText}>Genre: {data?.genres?.join(', ')}</Text>

          <View style={{width: '40%'}}>
            <Button
              hasIcon
              bookmarked={bookmarked}
              title={bookmarked ? 'Bookmarked' : 'Bookmark'}
              iconName={ICONS.BOOKMARK}
              onPress={() =>
                bookMark(
                  id,
                  bookmarked,
                  setBookmarked,
                  toast,
                  dispatch,
                  notificationCount,
                )
              }
            />
          </View>

          <View style={styles.episodesContainer}>
            {data?.episodes?.map((episode, index) => (
              <View key={index}>
                <Button
                  title={episode.number.toString()}
                  style={[
                    styles.episodes,
                    checkIfEpisodeWatched(episode.number as number) &&
                      styles.watchedEpisode,
                  ]}
                  onPress={() => navigateToVideoPlayer(episode, data.episodes)}
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
  episodesContainer: {
    gap: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  watchedEpisode: {
    backgroundColor: colors.darkPurple,
  },
});

export default AnimeDetailCard;
