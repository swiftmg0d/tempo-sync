interface Track {
  track: {
    id: string;
    name: string;
    duration_ms: number;
    external_urls: {
      spotify: string;
    };
    album: {
      images: {
        height: number;
        url: string;
        width: number;
      }[];
    };

    artists: {
      id: string;
      name: string;
      external_urls: {
        spotify: string;
      };
    }[];
  };
  played_at: Date;
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: 'playlist' | 'artist' | 'album' | 'show';
    uri: string;
  };
}

export interface RecentlyPlayedTracksResponse {
  items: Track[];
}

export interface AudioAnalysisResponse {
  id: string;
  href: string;
  isrc: string;
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  valence: number;
}
