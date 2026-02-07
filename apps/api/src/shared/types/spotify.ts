export interface TopArtist {
  name: string;
  href: string;
}

export interface AthleteTopArtistResponse {
  items: (TopArtist & { external_urls: { spotify: string } })[];
}
