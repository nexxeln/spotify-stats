import { topTracks } from "../lib/spotify";
import type { SpotifyTrack } from "../lib/spotify";

export const get = async () => {
  const response = await topTracks();
  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track: SpotifyTrack) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    url: track.external_urls.spotify,
    title: track.name,
  }));

  return new Response(JSON.stringify({ tracks }), {
    status: 200,
  });
};
