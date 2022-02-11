import SpotifyWebApi from "spotify-web-api-node";

const scope = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(",");

const params = { scope };

const queryParams = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
});

export default spotifyApi;
