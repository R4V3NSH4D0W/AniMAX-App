import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MainHeader from '../componets/MainHeader';
import {fetchChapterImages} from '../api/api.helper';

interface Props {
  route: {
    params: {
      chapterData: any;
      image: string;
    };
  };
}

const {height, width} = Dimensions.get('window');
const MangaViewer = ({route}: Props) => {
  const {chapterData} = route.params;
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChapterImages();
  }, []);

  const getChapterImages = async () => {
    const result = await fetchChapterImages(chapterData);
    setChapterImages(result);
    setLoading(false); // Set loading to false when images are loaded
    console.log('result', result);
  };

  const image = useSelector(state => state.chapters.image);
  const chapters = useSelector(state => state.chapters.chapters);
  console.log('image', chapters);
  return (
    <ImageBackground source={{uri: image}} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      {loading ? (
        // Render loading indicator while images are loading
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <ScrollView>
          <MainHeader title="Kitsunee" whiteHeader={true} />
          {chapterImages.map((item, index) => (
            <View style={styles.imageContainer} key={index}>
              <Text>{item?.page}</Text>
              <ImageBackground
                source={{uri: item?.img}}
                style={styles.imageBackground}
                // page={item?.page}
                // alt={item?.page}
                // onLoadStart={() => setLoading(true)} // Set loading to true when image starts loading
                // onLoadEnd={() => setLoading(false)} // Set loading to false when image finishes loading
              />
            </View>
          ))}
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default MangaViewer;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageContainer: {
    // margin: 30,
    width: width, // Adjust as needed
    height: height,
    // marginHorizontal: 5, // Adjust spacing between images
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
