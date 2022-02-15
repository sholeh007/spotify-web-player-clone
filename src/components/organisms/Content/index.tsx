import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { getRandomInt } from "lib/getRandomInt";
import { useAtom } from "jotai";
import { playlistState, playlistIdState } from "src/store/playlist";
import useSpotify from "hooks/useSpotify";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-violet-500",
];

export default function Content() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState<string | null>(null);
  const [playlistId] = useAtom(playlistIdState);
  const [playlist, setPlaylist]: any = useAtom(playlistState);

  useEffect(() => {
    setColor(colors[getRandomInt(6)]);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data: any) => {
        setPlaylist(data.body);
      })
      .catch((error) => console.log("something went wrong", error));
  }, [spotifyApi, playlistId, setPlaylist]);

  console.log(playlist);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-2 bg-gray-900 rounded-full opacity-90 hover:opacity-80 cursor-pointer pr-2">
          <Image
            className="rounded-full"
            src={session?.user?.image || "/img/avatar.svg"}
            width={40}
            height={40}
            alt="avatar"
            placeholder="blur"
            blurDataURL={session?.user?.image || "/img/avatar.svg"}
          />
          <h2 className="text-slate-100">{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5 text-slate-100" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-slate-100 p-8`}
      >
        <div className="shadow-2xl">
          <Image
            src={
              playlist?.images?.[0]?.url?.length > 0
                ? playlist?.images?.[0]?.url
                : "/img/image-default.svg"
            }
            width={176}
            height={176}
            alt="img"
            placeholder="blur"
            blurDataURL={
              playlist?.images[0].url.length > 0
                ? playlist.images[0].url
                : "/img/image-default.svg"
            }
          />
        </div>
        <div className="text-slate-100">
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
          <p className="text-slate-400 py-2">{playlist?.description}</p>
          <small className="font-semibold">
            {playlist?.owner?.display_name} -{" "}
            {`${new Intl.NumberFormat().format(
              playlist?.followers?.total
            )} likes` || ""}{" "}
            - {`${playlist?.tracks?.total} songs` || ""}
          </small>
        </div>
      </section>
    </div>
  );
}
