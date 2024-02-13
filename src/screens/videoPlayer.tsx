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

import MainHeader from '../componets/MainHeader';
import {KitsuneeFetchVideo} from '../api/api.helper';
import {colors} from '../constants/theme';
import Icons from 'react-native-vector-icons/FontAwesome6';
import Collapse from 'react-native-vector-icons/MaterialCommunityIcons';

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
      allEpisodes: EpisodeData;
    };
  };
}

const VideoPlayer = ({route}: Props) => {
  const {episodeData, allEpisodes} = route.params;
  console.log(allEpisodes, 'allEpisodes');

  const [anime, setAnime] = useState<Anime | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fetchEpisode = async () => {
      const data = await KitsuneeFetchVideo(episodeData.id);
      setAnime(data);
      if (data && data.sources && data.sources.length > 0) {
        setVideoUrl(data.sources[2].url);
        setSelectedQuality(data.sources[2].quality);
        setIsLoading(false);
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
              <Icons name="expand" size={20} color={colors.white} />
            ) : (
              <Collapse name="arrow-collapse" size={20} color={colors.white} />
            )}
          </Text>
        </TouchableOpacity>
        <Video
          source={{uri: videoUrl}}
          style={isFullScreen ? styles.fullScreenVideo : styles.video}
          controls={true}
          resizeMode="contain"
        />
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
  qualityButtonsContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qualityButton: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderColor: colors.black,
    marginHorizontal: 5,
    backgroundColor: 'white',
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
});
