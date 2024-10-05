// rest
export interface IRickAndMortyApiCharactersResponse {
  info: IInfo;
  results: ICharacter[];
}

export interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// graphql
export interface IRickAndMortyCharactersNames {
  data: {
    characters: {
      results: {
        name: string;
      }[];
    };
  };
}

export interface IRelevance {
  name: string;
  relevance: number;
}
