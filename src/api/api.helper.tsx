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

export const mangalist = async () => {
  const response = await fetch('https://api.mangadex.org/manga');
  const data = response.json();
  return data;
};
export const getCoverFileName = async (id: string) => {
  const response = await fetch(`https://api.mangadex.org/cover/${id}`);
  const data = response.json();
  return data;
};

export const mangadexCover = async (id: string, fileName: string) => {
  const response = await fetch(
    `https://uploads.mangadex.org/covers/${id}/${fileName}.png`,
  );
  const data = response.json();
  return data;
};
export const fetchMangaDetail = async (id: string) => {
  const response = await fetch(
    `https://kitsunee.onrender.com/api/mangaInfo/${id}`,
  );
  console.log('response', response);
  const data = response.json();

  return data;
};

export const fetchChapterImages = async (id: string) => {
  const response = await fetch(
    `https://kitsunee.onrender.com/api/chapterPages/${id}`,
  );
  const data = response.json();
  return data;
};
