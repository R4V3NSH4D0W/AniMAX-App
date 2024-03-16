import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Icon from '../componets/Icon';
import {colors, spacing} from '../constants/theme';
import {fetchMangaDetail, kitsuneeFetchAnimeInfo} from '../api/api.helper';
import AnimeDetailCard from '../componets/animedetailcard';
import useTheme from '../helper/themHelper';
import {useSelector} from 'react-redux';
import MangaDetailCard from '../componets/mangaComponets/mangadetailcard';
import {MangaDetails} from '../constants/app.type';

const {height, width} = Dimensions.get('window');

const AnimeDetail = ({navigation, route}: any) => {
  const theme = useTheme();
  const {mode} = useSelector(state => state.mode);
  const insets = useSafeAreaInsets();
  const {detail} = route.params;
  console.log('detail', detail);

  const [animeDetail, setAnimeDetail] = useState([]);
  const [MangaDetail, setMangaDetail] = useState<MangaDetails>({});
  const [loading, setLoading] = useState(false);
  // console.log('animeDetail', animeDetail);
  console.log('Detail', detail.id);
  console.log('MangaDetail', MangaDetail);

  useEffect(() => {
    if (mode === 'Anime') {
      getAnimeDetail();
    } else {
      getMangaDetail();
    }
  }, [mode]);

  const getAnimeDetail = async () => {
    setLoading(true);
    const result = await kitsuneeFetchAnimeInfo(detail.id);
    setAnimeDetail(result);
    setLoading(false);
  };

  const getMangaDetail = async () => {
    setLoading(true);
    const result = await fetchMangaDetail(detail.id);
    setMangaDetail(result);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
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
              {mode === 'Anime' ? (
                <Image
                  source={{
                    uri: animeDetail.image,
                  }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={{
                    uri:
                      MangaDetail.image ||
                      'https://w.wallhaven.cc/full/l8/wallhaven-l8vp7y.jpg',
                  }}
                  style={styles.image}
                />
              )}
              <View style={styles.overlay} />
            </View>
          </SharedElement>
          {mode === 'Anime' ? (
            <AnimeDetailCard data={animeDetail} id={animeDetail.id} />
          ) : (
            <MangaDetailCard manga={MangaDetail} id={MangaDetail.id} />
          )}
        </>
      ) : (
        <View
          style={[
            {backgroundColor: theme.backgroundColor},
            styles.activityIndicatorContainer,
          ]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
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
    flex: 1,
    width: width,
    height: height,
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
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimeDetail;
