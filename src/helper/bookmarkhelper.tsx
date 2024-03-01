import {updateNotificationCount} from '../actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch, SetStateAction} from 'react';

export const bookMark = async (
  toast: any,
  dispatch: any,
  animeId: string,
  bookmarked: boolean,
  notificationCount: number,
  setBookmarked: Dispatch<SetStateAction<boolean>>,
): Promise<void> => {
  try {
    const bookmarkedIds = await AsyncStorage.getItem('bookmarkedIds');
    let updatedIds: string[] = [];
    if (bookmarkedIds) {
      updatedIds = JSON.parse(bookmarkedIds);
    }
    if (bookmarked) {
      const index = updatedIds.indexOf(animeId.toString());
      if (index !== -1) {
        updatedIds.splice(index, 1);
        await AsyncStorage.setItem('bookmarkedIds', JSON.stringify(updatedIds));
        setBookmarked(false);
        toast.show('', {
          type: 'custom_toast',
          data: {title: 'Removed Bookmark', type: 'info'},
        });
      }
    } else {
      updatedIds.push(animeId.toString());
      await AsyncStorage.setItem('bookmarkedIds', JSON.stringify(updatedIds));
      setBookmarked(true);
      dispatch(updateNotificationCount(notificationCount + 1));
      toast.show('', {
        type: 'custom_toast',
        data: {title: 'Bookmarked Successfully', type: 'success'},
      });
    }
  } catch (error) {
    console.error('Error bookmarking:', error);
    toast.show('', {
      type: 'custom_toast',
      data: {title: 'Error Bookmarking', type: 'error'},
    });
  }
};

export const fetchWatchedEpisodes = async (
  setWatchedEpisodes: Dispatch<SetStateAction<any>>,
): Promise<void> => {
  try {
    const jsonValue = await AsyncStorage.getItem('watchedEpisodes');
    if (jsonValue !== null) {
      setWatchedEpisodes(JSON.parse(jsonValue));
    }
  } catch (error) {
    console.error('Failed to fetch watched episodes: ', error);
  }
};

export const markEpisodeAsWatched = async (
  animeID: string,
  episodeData: any,
  watchedEpisodes: any[],
  setWatchedEpisodes: Dispatch<SetStateAction<any[]>>,
): Promise<void> => {
  const updatedWatchedEpisodes = [
    ...watchedEpisodes,
    {animeId: animeID, episodeId: episodeData.number},
  ];
  try {
    await AsyncStorage.setItem(
      'watchedEpisodes',
      JSON.stringify(updatedWatchedEpisodes),
    );
    setWatchedEpisodes(updatedWatchedEpisodes);
  } catch (error) {
    console.error('Failed to mark episode as watched: ', error);
  }
};

export const isEpisodeWatched = (
  animeID: string,
  episodeId: number,
  watchedEpisodes: any[],
): boolean => {
  return watchedEpisodes.some(
    episode => episode.animeId === animeID && episode.episodeId === episodeId,
  );
};
