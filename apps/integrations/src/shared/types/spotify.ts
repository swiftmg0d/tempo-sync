type Track = {
  track: {
    id: string;
    name: string;
    duration_ms: number;
    external_urls: {
      spotify: string;
    };
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    artists: {
      id: string;
      name: string;
      href: string;
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
};

export type RecentlyPlayedTracksResponse = {
  items: Track[];
};
