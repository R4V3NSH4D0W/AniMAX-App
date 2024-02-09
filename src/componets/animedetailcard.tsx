import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';

import {colors, sizes, spacing} from '../constants/theme';

const AnimeDetailCard = ({data}) => {
  const [expanded, setExpanded] = useState(false);

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
        style={styles.header}
        animation="fadeInUp"
        delay={500}
        easing="ease-in-out"
        duration={400}>
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
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default AnimeDetailCard;
