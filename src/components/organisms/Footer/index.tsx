import { useAtom, useAtomValue } from "jotai";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import {
  currentTrackIdState,
  deviceId,
  isPlayingState,
} from "src/store/songAtom";
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import useSongInfo from "hooks/useSongInfo";
import useSpotify from "hooks/useSpotify";
import Image from "next/image";

export default function Footer() {
  const spotifyApi = useSpotify();
  const songInfo: any = useSongInfo();
  const deviceUser: any = useAtomValue(deviceId);
  const { data: session } = useSession();
  const [currentTrackId, setCurrentIdTrack] = useAtom(currentTrackIdState);
  const [isPlaying, setPlaying] = useAtom(isPlayingState);
  const [volume, setVolume] = useState(50);

  const fetchCurrentSong = useCallback(async () => {
    if (!songInfo) {
      const data: any = await spotifyApi.getMyCurrentPlayingTrack();
      setCurrentIdTrack(data?.body?.item?.id);
      const playback = await spotifyApi.getMyCurrentPlaybackState();
      setPlaying(playback?.body?.is_playing);
    }
  }, [setCurrentIdTrack, setPlaying, songInfo, spotifyApi]);

  const handlePlay = async () => {
    const data = await spotifyApi.getMyCurrentPlaybackState();
    if (!data?.body?.is_playing) {
      spotifyApi.play({ device_id: deviceUser?.[0]?.id });
      return setPlaying(true);
    }
    spotifyApi.pause();
    return setPlaying(false);
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session, fetchCurrentSong]);

  const debounceVolume = useCallback(
    (volume) => {
      setTimeout(() => {
        spotifyApi.setVolume(volume);
      }, 500);
    },
    [spotifyApi]
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceVolume(volume);
    }
  }, [debounceVolume, volume]);

  return (
    <div className="h-24 bg-gradient-to-t from-gray-900 to-gray-800 text-slate-200 grid grid-cols-3 text-xs md:text-base px-2 md:px-8 ">
      {/* left */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:inline">
          <Image
            src={songInfo?.album?.images?.[0]?.url || "/img/image-default.svg"}
            height={40}
            width={40}
            alt="img"
            placeholder="blur"
            blurDataURL={
              songInfo?.album?.images?.[0]?.url || "/img/image-default.svg"
            }
          />
        </div>
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-center space-x-8">
        <RewindIcon
          className="btn"
          onClick={() => spotifyApi.skipToPrevious()}
        />
        {isPlaying ? (
          <PauseIcon onClick={handlePlay} className="btn w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlay} className="btn w-10 h-10" />
        )}
        <FastForwardIcon
          className="btn"
          onClick={() => spotifyApi.skipToNext()}
        />
      </div>
      {/* right */}
      <div className="flex items-center justify-end space-x-2">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 25)}
          className="btn"
        />
        <input
          className=" w-14 md:w-28 "
          type="range"
          min={0}
          onChange={(e) => setVolume(+e.target.value)}
          max={100}
          value={volume}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 25)}
          className="btn"
        />
      </div>
    </div>
  );
}
