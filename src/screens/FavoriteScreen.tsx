import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AnimeList from '../componets/anime-list';
import {fetchAnimeById} from '../api/api.helper';
import MainHeader from '../componets/MainHeader';

const {height} = Dimensions.get('window');

const FavoriteScreen = () => {
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
    fetchBookmarkedIds();
  }, [isFocused]);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setIsLoading(true);
      const details = await Promise.all(
        bookmarkedIds.map(animeId => fetchAnimeById(animeId)),
      );
      setAnimeDetails(details.filter(detail => detail !== null));
      setIsLoading(false);
    };

    fetchAnimeDetails();
  }, [bookmarkedIds]);

  return (
    <>
      <MainHeader title="Favorite" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          {isLoading ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : animeDetails.length > 0 ? (
            <AnimeList animeData={animeDetails} />
          ) : (
            <Text style={styles.activityIndicatorContainer}>
              No favorite anime found. oops
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 20,
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    marginTop: height / 2.5,
    justifyContent: 'center',
  },
});
