export const kitsuneeFetchPopularAnime = async () => {
  const response = await fetch('https://kitsunee.me/api/anime/popular');
  const data = response.json();
  return data;
};

export const kitsuneeFetchAnimeInfo = async (id: string) => {
  const response = await fetch(`https://kitsunee.me/api/anime/info/${id}
  `);
  const data = response.json();
  return data;
};

export const kitsuneeFetchRecentAnime = async () => {
  const response = await fetch('https://kitsunee.me/api/anime/recent');
  const data = response.json();
  return data;
};

export const KitsuneeFetchVideo = async (episode: string) => {
  const response = await fetch(
    `https://kitsunee.me/api/anime/gogo/watch/${episode}`,
  );
  const data = response.json();
  return data;
};

export const KitsuneeSearch = async (query: string) => {
  const response = await fetch(`https://kitsunee.me/api/anime/search/${query}`);
  const data = response.json();
  return data;
};
