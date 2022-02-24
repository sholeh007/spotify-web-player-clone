import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { currentTrackIdState } from "src/store/songAtom";
import useSpotify from "./useSpotify";

export default function useSongInfo() {
  const spotifyApi = useSpotify();
  const currentIdTrack = useAtomValue(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const getSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        );
        const res = await trackInfo.json();
        setSongInfo(res);
      }
    };
    getSongInfo();
  }, [currentIdTrack, spotifyApi]);

  return songInfo;
}
