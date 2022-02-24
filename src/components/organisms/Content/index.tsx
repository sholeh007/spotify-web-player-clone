import Image from "next/image";
import useSpotify from "hooks/useSpotify";
import Songs from "@/component/organisms/Songs";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { getRandomInt } from "lib/getRandomInt";
import { useAtom, useAtomValue } from "jotai";
import { playlistState, playlistIdState } from "src/store/playlist";
import { colors } from "./colors";

export default function Content() {
  const spotifyApi = useSpotify();
  const [color, setColor] = useState<string | null>(null);
  const [playlist, setPlaylist]: any = useAtom(playlistState);
  const playlistId = useAtomValue(playlistIdState);

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

  return (
    <div className="flex-grow relative h-screen overflow-y-auto scrollbar-hide">
      <Navbar />
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-slate-100 p-8`}
      >
        <div className="shadow-2xl">
          <Image
            src={playlist?.images?.[0]?.url || "/img/image-default.svg"}
            width={176}
            height={176}
            alt="img"
            placeholder="blur"
            blurDataURL={playlist?.images?.[0]?.url || "/img/image-default.svg"}
          />
        </div>
        <div className="text-slate-100">
          <p className="text-sm md:text-base">PLAYLIST</p>
          <h1 className="text-lg md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
          <p className="text-slate-400 py-2 text-xs md:text-base">
            {playlist?.description}
          </p>
          <small className="font-semibold">
            {playlist?.owner?.display_name} -{" "}
            {`${new Intl.NumberFormat().format(
              playlist?.followers?.total
            )} likes` || ""}{" "}
            - {`${playlist?.tracks?.total} Songs` || ""}
          </small>
        </div>
      </section>
      <section className="p-4 pl-5 pb-28">
        <Songs />
      </section>
    </div>
  );
}
