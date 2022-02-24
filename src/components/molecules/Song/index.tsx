import useSpotify from "hooks/useSpotify";
import { useAtomValue, useSetAtom } from "jotai";
import { Duration } from "lib/time";
import Image from "next/image";
import {
  currentTrackIdState,
  deviceId,
  isPlayingState,
} from "src/store/songAtom";

type propTypes = {
  item: any;
  order: number;
};

export default function Song({ item, order }: propTypes) {
  const spotifyApi = useSpotify();
  const setCurrentTrackId = useSetAtom(currentTrackIdState);
  const setPlaying = useSetAtom(isPlayingState);
  const deviceUser: any = useAtomValue(deviceId);

  const playSong = async () => {
    setCurrentTrackId(item.track.id);
    setPlaying(true);
    await spotifyApi.play({
      uris: [item.track.uri],
      device_id: deviceUser?.[0]?.id,
    });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 cursor-pointer hover:bg-gray-800"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p className="text-sm">{++order}</p>
        <div className="py-2">
          <Image
            src={
              item?.track?.album?.images?.[0]?.url || "/img/image-default.svg"
            }
            width={44}
            height={44}
            alt="img-album"
            placeholder="blur"
            blurDataURL={
              item?.track?.album?.images?.[0]?.url || "/img/image-default.svg"
            }
          />
        </div>
        <div>
          <p className="w-36 lg:w-64 text-slate-100 truncate text-sm md:text-base">
            {item?.track?.name}
          </p>
          <p className="w-40 text-xs md:text-sm">
            {item?.track?.artists?.[0]?.name}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{item.track.album.name}</p>
        <p>{Duration(item.track.duration_ms)}</p>
      </div>
    </div>
  );
}
