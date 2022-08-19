import { topTracks } from "../lib/spotify";
import type { SpotifyTrack } from "../lib/spotify";

export type TrackResponse = {
  artist: string;
  url: string;
  title: string;
  img: string;
};

export const get = async () => {
  const response = await topTracks();
  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track: SpotifyTrack) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    url: track.external_urls.spotify,
    title: track.name,
    img: track.album.images[1].url,
  }));

  return new Response(JSON.stringify({ tracks }), {
    status: 200,
  });
};
