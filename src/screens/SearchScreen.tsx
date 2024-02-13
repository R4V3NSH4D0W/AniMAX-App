import React, {useRef, useState, useEffect} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/FontAwesome';
import {colors} from '../constants/theme';
import MainHeader from '../componets/MainHeader';
import {KitsuneeSearch, kitsuneeFetchRecentAnime} from '../api/api.helper';
import AnimeList from '../componets/anime-list';
import TopAnime from '../componets/topAnime';

const SearchScreen = () => {
  const searchInputRef = useRef<TextInput>(null);
  const [Anime, setAnime] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    const search = async () => {
      const result = await KitsuneeSearch(searchQuery);
      setSearchResults(result);
    };

    const searchTimeout = setTimeout(search, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  useEffect(() => {
    const getAnime = async () => {
      const AnimeData = await kitsuneeFetchRecentAnime();
      setAnime(AnimeData);
    };
    getAnime();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <MainHeader title="Search" />
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            ref={searchInputRef}
            placeholder="Search.."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={dismissKeyboard}
          />
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.searchIcon}>
              <Icons name="search" size={20} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {searchQuery.length === 0 && (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.resultsContainer}>
            <AnimeList animeData={Anime} />
          </ScrollView>
        )}
        {searchQuery.length > 0 && (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.resultsContainer}>
            <AnimeList animeData={searchResults} />
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 30,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    top: 12,
    right: 10,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: colors.light,
  },
  searchInput: {
    width: '100%',
    height: '100%',
  },
});

export default SearchScreen;
