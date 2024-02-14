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
