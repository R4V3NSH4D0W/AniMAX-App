import axios from 'axios';

const BASE_URL = 'https://kitsu.io/';

export const fetchTopAnime = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/edge/anime?sort=popularityRank&page[limit]=8`,
  );
  return response.data?.data || [];
};

export const fetchGenres = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/api/edge/anime/${id}/genres`);
  return response.data?.data || [];
};

export const fetchDetail = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/api/edge/anime/${id}`);
  return response.data?.data || null;
};

export const fetchRecentAnime = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/edge/anime?page[limit]=10&sort=-createdAt`,
  );
  return response.data?.data || [];
};

export const fetchTrendingAnime = async () => {
  const response = await fetch('https://kitsu.io/api/edge/trending/anime');
  const data = await response.json();
  return data.data;
};

export const fetchAnimeById = async (animeId: number) => {
  const response = await axios.get(`${BASE_URL}/api/edge/anime/${animeId}`);
  return response.data?.data || null;
};
