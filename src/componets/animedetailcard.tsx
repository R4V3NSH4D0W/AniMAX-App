import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../utils/button';
import {ICONS} from '../constants/app.constants';
import {bookMark} from '../helper/bookmarkhelper';
import {useToast} from 'react-native-toast-notifications';
import {colors, sizes, spacing} from '../constants/theme';

const AnimeDetailCard = ({data}) => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const toast = useToast();

  useEffect(() => {
    checkIfBookmarked();
  }, []);

  const checkIfBookmarked = async () => {
    const bookmarkedIds = await AsyncStorage.getItem('bookmarkedIds');
    if (bookmarkedIds) {
      const parsedIds = JSON.parse(bookmarkedIds);
      if (parsedIds.includes(data.id.toString())) {
        setBookmarked(true);
      }
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const descriptionText = expanded
    ? data?.attributes?.description
    : `${data?.attributes?.description?.slice(0, 500)}${
        data?.attributes?.description.length > 500 ? '...' : ''
      }`;

  return (
    <View style={styles.card}>
      <Animatable.View
        delay={500}
        duration={400}
        animation="fadeInUp"
        easing="ease-in-out"
        style={styles.header}>
        <Text style={styles.title}>
          {data?.attributes?.titles?.en || data?.attributes?.titles?.en_jp}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={styles.description}>{descriptionText}</Text>
          </TouchableOpacity>
          <Text style={styles.subTitle}>
            Status: {data?.attributes?.status}
          </Text>
          <Button
            hasIcon
            bookmarked={bookmarked}
            title={bookmarked ? 'Bookmarked' : 'Bookmark'}
            iconName={ICONS.BOOKMARK}
            onPress={() => bookMark(data.id, bookmarked, setBookmarked, toast)}
          />
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
    textAlign: 'justify',
    color: colors.white,
  },
  subTitle: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default AnimeDetailCard;
