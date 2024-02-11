import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import React, {useEffect, useState} from 'react';

import MainHeader from '../componets/MainHeader';
import {KitsuneeFetchVideo} from '../api/api.helper';

const VideoPlayer = ({route}) => {
  const {episodeData} = route.params;

  const [anime, setAnime] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEpisode = async () => {
      const data = await KitsuneeFetchVideo(episodeData.id);
      setAnime(data);
      if (data && data.sources && data.sources.length > 0) {
        setVideoUrl(data.sources[0].url);
        setSelectedQuality(data.sources[0].quality);
        setIsLoading(false);
      }
    };
    fetchEpisode();
  }, [episodeData.id]);

  const handleQualityChange = quality => {
    const selectedSource = anime.sources.find(
      source => source.quality === quality,
    );
    if (selectedSource) {
      setVideoUrl(selectedSource.url);
      setSelectedQuality(quality);
    }
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
    <View>
      <MainHeader title="Kitsunee" />
      <Text style={styles.title}>{episodeData.id}</Text>
      <Video
        source={{uri: videoUrl}}
        style={styles.video}
        controls={true}
        resizeMode="contain"
      />
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
            <Text>{source.quality}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 300,
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
    borderColor: 'gray',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  selectedQualityButton: {
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 16,
    paddingTop: 20,
    paddingLeft: 10,
  },
});
