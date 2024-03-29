import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AnimeList from '../componets/anime-list';
import MainHeader from '../componets/MainHeader';

import useTheme from '../helper/themHelper';
import {kitsuneeFetchAnimeInfo} from '../api/api.helper';

const {height} = Dimensions.get('window');

const FavoriteScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [animeDetails, setAnimeDetails] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchBookmarkedIds = async () => {
    const storedIds = await AsyncStorage.getItem('bookmarkedIds');
    if (storedIds) {
      const parsedIds = JSON.parse(storedIds);
      setBookmarkedIds(parsedIds);
    }
  };

  useEffect(() => {
    dispatch({type: 'RESET_NOTIFICATION_COUNT'});
  }, [isFocused, dispatch]);

  useEffect(() => {
    fetchBookmarkedIds();
  }, [isFocused]);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setIsLoading(true);
      const details = await Promise.all(
        bookmarkedIds.map(animeId => kitsuneeFetchAnimeInfo(animeId)),
      );
      setAnimeDetails(details.filter(detail => detail !== null));
      setIsLoading(false);
    };

    fetchAnimeDetails();
  }, [bookmarkedIds]);

  return (
    <View style={[{backgroundColor: theme.backgroundColor}, styles.main]}>
      <MainHeader title="Favorite" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : animeDetails.length > 0 ? (
            <AnimeList animeData={animeDetails} />
          ) : (
            <Text style={styles.noFavoriteText}>
              No favorite anime found. Oops!
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    marginTop: 20,
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: height / 2.5,
    justifyContent: 'center',
  },
  noFavoriteText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: height / 2.5,
  },
});
