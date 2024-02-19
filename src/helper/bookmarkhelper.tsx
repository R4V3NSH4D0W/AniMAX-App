import {updateNotificationCount} from '../actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const bookMark = async (
  animeId: string,
  bookmarked: boolean,
  setBookmarked: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any,
  dispatch: any,
  notificationCount: number,
) => {
  try {
    const bookmarkedIds = await AsyncStorage.getItem('bookmarkedIds');
    let updatedIds = [];
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
    toast.show('', {
      type: 'custom_toast',
      data: {title: 'Error Bookmarking', type: 'error'},
    });
  }
};

export const fetchWatchedEpisodes = async setWatchedEpisodes => {
  try {
    const jsonValue = await AsyncStorage.getItem('watchedEpisodes');
    if (jsonValue !== null) {
      setWatchedEpisodes(JSON.parse(jsonValue));
    }
  } catch (e) {
    console.error('Failed to fetch watched episodes: ', e);
  }
};

export const markEpisodeAsWatched = async (
  animeID,
  episodeData,
  watchedEpisodes,
  setWatchedEpisodes,
) => {
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
  } catch (e) {
    console.error('Failed to mark episode as watched: ', e);
  }
};

export const isEpisodeWatched = (animeID, episodeId, watchedEpisodes) => {
  return watchedEpisodes.some(
    episode => episode.animeId === animeID && episode.episodeId === episodeId,
  );
};
