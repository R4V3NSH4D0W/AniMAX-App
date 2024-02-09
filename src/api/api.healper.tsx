// import {ANIME} from '@consumet/extensions';
import axios from 'axios';

const BASE_URL = 'https://kitsu.io/';

// const gogoanime = new ANIME.Gogoanime();

export const fetchTopAnime = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/edge/anime?sort=popularityRank&page[limit]=8`,
    );
    console.log('data', response.data?.data);

    if (response?.data?.data) {
      return response.data.data;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
};
export const fetchGenres = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/edge/anime/${id}/genres`);
    console.log('data', response.data?.data);

    if (response) {
      return response;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
};

export const fetchdetail = async (id: number) => {
  const url = `${BASE_URL}api/edge/anime/${id}`;
  const result = await fetch(url);
  const detailData = await result.json();
  return detailData?.data;
};

export const fetchRecentAnime = async () => {
  const response = await fetch(
    'https://kitsu.io/api/edge/anime?page[limit]=10&sort=-createdAt',
  );
  const data = await response.json();
  return data.data;
};

export const fetchTrendingAnime = async () => {
  const response = await fetch('https://kitsu.io/api/edge/trending/anime');
  const data = await response.json();
  return data.data;
};

export const fetchAnimeData = async ({title}) => {
  const data = await gogoanime.search(title);
  console.log(data);
  return data;
};

export const testAnime = async () => {
  const data = await gogoanime.search('one piece');
  console.log(data);
  return data;
};
