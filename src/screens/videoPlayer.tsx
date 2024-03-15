import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  ImageBackground,
  BackHandler,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Icons from 'react-native-vector-icons/FontAwesome6';
import Collapse from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../constants/theme';
import MainHeader from '../componets/MainHeader';
import {KitsuneeFetchVideo} from '../api/api.helper';
import Button from '../utils/button';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import useTheme from '../helper/themHelper';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  fetchWatchedEpisodes,
  isEpisodeWatched,
  markEpisodeAsWatched,
} from '../helper/bookmarkhelper';

interface Source {
  quality: string;
  url: string;
}

interface Anime {
  sources: Source[];
}

interface EpisodeData {
  id: string;
}

interface Props {
  route: {
    params: {
      episodeData: EpisodeData;
      image: string;
    };
  };
}

const {width} = Dimensions.get('window');
const VideoPlayer = ({route}: Props) => {
  const {episodeData} = route.params;

  const theme = useTheme();

  const image = useSelector(state => state.episodes.image);
  const storedEpisodes = useSelector(state => state.episodes.episodes);
  const animeID = useSelector(state => state.episodes.animeID);

  const [anime, setAnime] = useState<Anime | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [watchedEpisodes, setWatchedEpisodes] = useState<
    {animeId: string; episodeId: string}[]
  >([]);
  const [videoDuration, setVideoDuration] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleLoad = ({duration}) => {
    setVideoDuration(duration);
  };

  useEffect(() => {
    const fetchEpisode = async () => {
      setIsVideoLoading(true);
      const data = await KitsuneeFetchVideo(episodeData.id);
      setAnime(data);
      if (data && data.sources && data.sources.length > 0) {
        setVideoUrl(data.sources[2].url);
        setSelectedQuality(data.sources[2].quality);
        setIsLoading(false);
        setIsVideoLoading(false);
      }
    };
    fetchEpisode();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress,
    );

    return () => backHandler.remove();
  }, [episodeData.id]);

  useEffect(() => {
    if (isFullScreen) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackButtonPress,
      );
      return () => {
        backHandler.remove();
      };
    }
  }, [isFullScreen]);

  useEffect(() => {
    if (!isFocused) {
      setIsLoading(true);
      setIsVideoLoading(true);
      setAnime(null);
      setVideoUrl(null);
      setSelectedQuality(null);
    }
  }, [isFocused]);

  useEffect(() => {
    fetchWatchedEpisodes(setWatchedEpisodes);
  }, [isFocused]);

  const handleMarkEpisodeAsWatched = async () => {
    await markEpisodeAsWatched(
      animeID,
      episodeData,
      watchedEpisodes,
      setWatchedEpisodes,
    );
  };

  const checkIfEpisodeWatched = episodeId => {
    return isEpisodeWatched(animeID, episodeId, watchedEpisodes);
  };

  const handleBackButtonPress = () => {
    if (isFullScreen) {
      toggleFullScreen();
      return true;
    }
    return false;
  };

  const handleQualityChange = (quality: string) => {
    const selectedSource = anime?.sources.find(
      source => source.quality === quality,
    );
    if (selectedSource) {
      setVideoUrl(selectedSource.url);
      setSelectedQuality(quality);
    }
  };

  const toggleFullScreen = async () => {
    if (isFullScreen) {
      await Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    } else {
      await Orientation.lockToLandscape();
      StatusBar.setHidden(true);
    }
    setIsFullScreen(!isFullScreen);
  };

  if (isLoading) {
    return (
      <View
        style={[
          {backgroundColor: theme.backgroundColor},
          styles.loadingContainer,
        ]}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!anime || !videoUrl) {
    return (
      <View>
        <MainHeader title="Kitsunee" />
        <Text>Error: Video source not found</Text>
      </View>
    );
  }

  const navigateToVideoPlayer = episode => {
    navigation.navigate('VideoPlayer', {episodeData: episode});
  };

  const currentEpisode = (episode: string) => {
    if (episode === episodeData.id) {
      return true;
    }
    return false;
  };

  return (
    <ImageBackground source={{uri: image}} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      {!isFullScreen && (
        <>
          <MainHeader title="Kitsunee" whiteHeader={true} />
          <Text style={styles.title}>{episodeData.id.replace(/-/g, ' ')}</Text>
        </>
      )}
      <View style={styles.videoContainer}>
        <TouchableOpacity
          onPress={toggleFullScreen}
          style={styles.fullScreenButtonContainer(isFullScreen)}>
          <Text style={styles.fullScreenButton}>
            {isFullScreen ? (
              <Collapse name="arrow-collapse" size={20} color={colors.white} />
            ) : (
              <Icons name="expand" size={20} color={colors.white} />
            )}
          </Text>
        </TouchableOpacity>
        {isVideoLoading ? (
          <View style={styles.videoLoadingContainer}>
            <ActivityIndicator
              size="large"
              color="blue"
              style={{paddingTop: 40}}
            />
          </View>
        ) : (
          <Video
            source={{uri: videoUrl}}
            style={isFullScreen ? styles.fullScreenVideo : styles.video}
            controls={true}
            resizeMode="contain"
            onLoad={handleMarkEpisodeAsWatched}
          />
        )}

        {!isFullScreen && (
          <View style={[styles.pickerContainer]}>
            <Text style={styles.qualityText}>Quality</Text>
            <Picker
              selectedValue={selectedQuality}
              onValueChange={itemValue => handleQualityChange(itemValue)}
              style={styles.picker}>
              {anime.sources.map((source, index) => (
                <Picker.Item
                  key={index}
                  label={source.quality}
                  value={source.quality}
                />
              ))}
            </Picker>
          </View>
        )}

        {!isFullScreen && (
          <View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.episodesContainer}>
              {storedEpisodes.map(episode => (
                <View key={episode.number}>
                  <Button
                    isCurrentEpisode={currentEpisode(episode.id)}
                    title={episode.number.toString()}
                    style={[
                      styles.episodes,
                      !currentEpisode(episode.id) &&
                        checkIfEpisodeWatched(episode.number as number) &&
                        styles.watchedEpisode,
                    ]}
                    onPress={() => navigateToVideoPlayer(episode)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: 300,
  },
  fullScreenVideo: {
    flex: 1,
    backgroundColor: colors.black,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLoadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
    marginTop: 30,
    marginBottom: 45,
  },
  qualityButtonsContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qualityButton: {
    borderRadius: 5,
    paddingVertical: 8,
    marginHorizontal: 5,
    paddingHorizontal: 8,
    backgroundColor: colors.purple,
  },
  selectedQualityButton: {
    backgroundColor: colors.darkPurple,
  },
  title: {
    fontSize: 16,
    paddingTop: 30,
    paddingLeft: 30,
    fontWeight: '700',
    color: colors.white,
  },

  fullScreenButtonContainer: (isFullScreen: boolean) => ({
    position: 'absolute',
    top: isFullScreen ? 10 : 50,
    right: 10,
    zIndex: 1,
  }),
  fullScreenButton: {
    padding: 10,
    borderRadius: 5,
  },
  episodes: {
    marginTop: 20,
    width: width / 8,
    height: 50,
    flexDirection: 'row',
  },
  watchedEpisode: {
    backgroundColor: colors.darkPurple,
  },
  episodesContainer: {
    gap: 10,
    marginLeft: 22,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginRight: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  episodeText: {
    fontSize: 18,
    marginLeft: 29,
    fontWeight: 'bold',
    color: colors.white,
  },
  pickerContainer: {
    marginLeft: 29,
    width: 140,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullScreenPicker: {
    top: 50,
  },
  picker: {
    width: '100%',
    height: 40,
    color: colors.white,
  },
  qualityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
