import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from './Icon';
import {colors, shadow} from '../constants/theme';
import {useIsFocused} from '@react-navigation/native';

interface IProps {
  style?: any;
  animeId: string;
}

const FavoriteButton = ({style, animeId}: IProps) => {
  const [bookmarked, setBookmarked] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchBookmarkedStatus = async () => {
      const isBookmarked = await checkIfBookmarked(animeId);
      setBookmarked(isBookmarked);
    };
    fetchBookmarkedStatus();
  }, [animeId, isFocused]);

  const checkIfBookmarked = async (animeId: string) => {
    try {
      const bookmarkedIds = await AsyncStorage.getItem('bookmarkedIds');
      if (bookmarkedIds) {
        const parsedIds = JSON.parse(bookmarkedIds);
        return parsedIds.includes(animeId);
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return (
    <View
      style={[
        {backgroundColor: colors.white, padding: 4, borderRadius: 20},
        shadow.light,
        style,
      ]}>
      <Icon icon={bookmarked ? 'FavoriteFilled' : 'Favorite'} size={24} />
    </View>
  );
};

export default FavoriteButton;
