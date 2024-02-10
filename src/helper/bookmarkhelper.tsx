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
