import { SPOTIFY_API_URL } from '@/constants';

export interface PlayHistorySong {
  context: TrackContext;
  played_at: string;
  track: Track;
}
interface Artist {
  external_urls: ExternalUrl;
  href: SpotifyApiUrl;
  id: string;
  name: string;
}

interface ContextType {
  type: 'album' | 'artist' | 'playlist' | 'show';
}

interface ExternalUrl {
  spotify: SpotifyUrl;
}

type SpotifyApiUrl = `${typeof SPOTIFY_API_URL}/${string}`;

type SpotifyUrl = `https://open.spotify.com/${string}/${string}`;

interface Track {
  artists: Artist[];
  duration_ms: number;
  external_urls: ExternalUrl;
  href: SpotifyApiUrl;
  id: string;
  name: string;
  popularity: number;
}

interface TrackContext {
  external_urls: ExternalUrl;
  href: SpotifyApiUrl;
  type: ContextType;
}
