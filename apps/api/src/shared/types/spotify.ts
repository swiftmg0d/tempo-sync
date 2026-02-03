export type TopArtist = {
  name: string;
  href: string;
};

export type AthleteTopArtistResponse = {
  items: Array<TopArtist & { external_urls: { spotify: string } }>;
};
