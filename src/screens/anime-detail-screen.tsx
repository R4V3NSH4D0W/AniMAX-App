import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Icon from '../componets/Icon';
import {colors, sizes, spacing} from '../constants/theme';
import AnimeDetailCard from '../componets/animedetailcard';

const AnimeDetail = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {detail} = route.params;
  return (
    <View style={styles.container}>
      <Animatable.View
        style={[styles.backButton, {marginTop: insets.top}]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out">
        <Icon
          icon="ArrowLeft"
          size={40}
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
      </Animatable.View>
      <SharedElement
        id={`anime.${detail.id}.image`}
        style={StyleSheet.absoluteFillObject}>
        <View style={[StyleSheet.absoluteFillObject, styles.imageBox]}>
          <Image
            source={{
              uri:
                detail.attributes.posterImage.original ||
                'https://w.wallhaven.cc/full/kx/wallhaven-kxj3l1.jpg',
            }}
            style={[StyleSheet.absoluteFillObject, styles.image]}
          />
          <View style={styles.overlay} />
        </View>
      </SharedElement>
      <AnimeDetailCard data={detail.attributes} id={detail.id} />
    </View>
  );
};

AnimeDetail.sharedElements = route => {
  const {anime} = route.params;
  return [
    {
      id: `anime.${anime.id}.image`,
    },
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    overflow: 'hidden',
  },
  image: {
    width: sizes.width,
    height: sizes.height,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    left: spacing.l,
    zIndex: 1,
  },
  backIcon: {
    top: 30,
    right: 10,
    marginRight: 20,
    tintColor: colors.white,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default AnimeDetail;
