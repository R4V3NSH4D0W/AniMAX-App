import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../utils/button';
import {bookMark} from '../helper/bookmarkhelper';

import {ICONS} from '../constants/app.constants';
import {IKitsuneeInfo} from '../constants/app.type';
import {colors, sizes, spacing} from '../constants/theme';
import {storeEpisodes} from '../actions/action';

interface IProps {
  id: string;
  data: IKitsuneeInfo;
}

const AnimeDetailCard = ({data, id}: IProps) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();

  const notificationCount = useSelector(
    state => state.notification.notificationCount,
  );
  useEffect(() => {
    dispatch(storeEpisodes(data.episodes));
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
    navigation.navigate('VideoPlayer', {episodeData: episode, allEpisodes});
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
          <Text style={styles.subTitle}>Status: {data?.status}</Text>
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
          <View style={styles.episodesContainer}>
            {data?.episodes?.map((episode, index) => (
              <View key={index}>
                <Button
                  title={episode.number.toString()}
                  style={styles.episodes}
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
  episodes: {
    marginTop: 20,
    width: 50,
    height: 50,
    flexDirection: 'row',
  },
  episodesContainer: {
    gap: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default AnimeDetailCard;
