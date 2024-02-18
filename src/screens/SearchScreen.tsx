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
import MainHeader from '../componets/MainHeader';
import {KitsuneeSearch, kitsuneeFetchRecentAnime} from '../api/api.helper';
import AnimeList from '../componets/anime-list';
import useTheme from '../helper/themHelper';

const SearchScreen = () => {
  const theme = useTheme();
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

    const searchTimeout = setTimeout(search, 1000);

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
      <View
        style={[{backgroundColor: theme.backgroundColor}, styles.container]}>
        <MainHeader title="Search" />
        <View style={[{borderColor: theme.textColor}, styles.search]}>
          <TextInput
            style={[{color: theme.textColor}, styles.searchInput]}
            ref={searchInputRef}
            placeholder="Search.."
            value={searchQuery}
            placeholderTextColor={theme.textColor}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={dismissKeyboard}
          />

          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.searchIcon}>
              <Icons name="search" size={20} color={theme.textColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {searchQuery.length === 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.resultsContainer}>
            <AnimeList animeData={Anime} />
          </ScrollView>
        )}
        {searchQuery.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.resultsContainer}>
            <AnimeList animeData={searchResults} isSearchResult />
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
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
    top: 12,
    right: 10,
    position: 'absolute',
  },
  resultsContainer: {
    flex: 1,
  },
  searchInput: {
    width: '100%',
    height: '100%',
  },
});

export default SearchScreen;
