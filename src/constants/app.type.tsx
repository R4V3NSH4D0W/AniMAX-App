export interface IKitsuneePopular {
  id: string;
  title: string;
  image: string;
  url: string;
  genres: string[];
}

export interface IKitsuneeInfo {
  id: string;
  title: string;
  url: string;
  genres: string[];
  episodeNumber: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  number: number;
  url: string;
}

export interface IStyles {
  [key: string]: any;
}

export interface Manga {
  id: string;
  type: string;
  attributes: {
    title: {
      en: string;
    };
    altTitles: {
      [key: string]: string;
    }[];
    description: {
      [key: string]: string;
    };
    isLocked: boolean;
    links: {
      [key: string]: string;
    };
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: string | null;
    status: string;
    year: number;
    contentRating: string;
    tags: {
      id: string;
      type: string;
      attributes: {
        name: {
          en: string;
        };
        description: any;
        group: string;
        version: number;
      };
      relationships: any[];
    }[];
    state: string;
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: string;
    updatedAt: string;
    version: number;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string;
  };
  relationships: {
    id: string;
    type: string;
  }[];
  coverImage: string;
}

export interface MangaDetails {
  id: string;
  title: string;
  altTitles: {
    [key: string]: string;
  }[];
  description: {
    [key: string]: string;
  };
  genres: string[];
  themes: string[];
  status: string;
  releaseDate: number;
  chapters: {
    id: string;
    title: string;
    chapterNumber: string;
    volumeNumber: string;
    pages: number;
  }[];
  image: string;
  coverImage: string;
  relationships: {
    id: string;
    type: string;
    related?: string;
  }[];
  type: string;
}

export interface MangaPage {
  img: string;
  page: number;
}
