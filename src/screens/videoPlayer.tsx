import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
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
import {useNavigation} from '@react-navigation/native';

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
    };
  };
}

const VideoPlayer = ({route}: Props) => {
  const {episodeData} = route.params;

  const storedEpisodes = useSelector(state => state.episodes.episodes);

  const [anime, setAnime] = useState<Anime | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const navigation = useNavigation();

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
  }, [episodeData.id]);

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
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
    <View style={styles.container}>
      {!isFullScreen && (
        <>
          <MainHeader title="Kitsunee" />
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
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <Video
            source={{uri: videoUrl}}
            style={isFullScreen ? styles.fullScreenVideo : styles.video}
            controls={true}
            resizeMode="contain"
          />
        )}
        {!isFullScreen && (
          <View style={styles.qualityButtonsContainer}>
            {anime.sources.map(source => (
              <TouchableOpacity
                key={source.quality}
                style={[
                  styles.qualityButton,
                  selectedQuality === source.quality &&
                    styles.selectedQualityButton,
                ]}
                onPress={() => handleQualityChange(source.quality)}>
                <Text style={{color: 'black'}}>{source.quality}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {!isFullScreen && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.episodesContainer}>
            {storedEpisodes.map(episode => (
              <View key={episode.number}>
                <Button
                  isCurrentEpisode={currentEpisode(episode.id)}
                  title={episode.number.toString()}
                  style={styles.episodes}
                  onPress={() => navigateToVideoPlayer(episode)}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
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
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    marginHorizontal: 5,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderColor: colors.black,
  },
  selectedQualityButton: {
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 16,
    paddingTop: 30,
    paddingLeft: 30,
    fontWeight: '500',
    color: colors.black,
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
    width: 50,
    height: 50,
    flexDirection: 'row',
  },
  episodesContainer: {
    gap: 10,
    marginLeft: 30,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
