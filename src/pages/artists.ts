import { topArtists } from "../lib/spotify";
import type { SpotifyArtist } from "../lib/spotify";

export type ArtistResponse = {
  name: string;
  url: string;
  followers: string;
  img: { url: string };
};

export const get = async () => {
  const response = await topArtists();
  const { items } = await response.json();

  const artists = items.slice(0, 10).map((artist: SpotifyArtist) => ({
    name: artist.name,
    url: artist.external_urls.spotify,
    followers: artist.followers.total,
    img: artist.images[1],
  }));

  return new Response(JSON.stringify({ artists }), {
    status: 200,
  });
};
