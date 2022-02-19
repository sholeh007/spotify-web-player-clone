import { items, items2 } from "./dataItem";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSetAtom } from "jotai";
import { playlistIdState } from "src/store/playlist";
import Button from "@/component/atoms/Button";
import useSpotify from "hooks/useSpotify";

export default function Sidebar() {
  const spotifyApi = useSpotify();
  const setPlaylistId = useSetAtom(playlistIdState);
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useState<any>([]);

  const getPlaylist = useCallback(async () => {
    const data = await spotifyApi.getUserPlaylists();
    setPlaylist(data.body.items);
  }, [spotifyApi]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getPlaylist();
    }
  }, [getPlaylist, session, spotifyApi]);

  return (
    <div className=" text-gray-500 p-5 text-xs lg:text-sm w-48 border-r border-gray-700 overflow-y-auto scrollbar-hide h-screen hidden md:inline-flex">
      <div className="space-y-4 ">
        {items.map((item, i) => (
          <Fragment key={i}>
            <Button icon={item.icon} title={item.title} />
          </Fragment>
        ))}
        <hr className="border-t-[0.1px] border-gray-700 " />
        {items2.map((item, i) => (
          <Fragment key={i}>
            <Button icon={item.icon} title={item.title} />
          </Fragment>
        ))}
        <hr className="border-t-[0.1px] border-gray-700 " />
        {playlist.length > 0 ? (
          playlist.map((item: any) => (
            <Fragment key={item.id}>
              <p
                className="cursor-pointer hover:text-slate-100"
                onClick={() => setPlaylistId(item.id)}
              >
                {item.name.length > 20
                  ? item.name.substr(0, 18) + "..."
                  : item.name}
              </p>
            </Fragment>
          ))
        ) : (
          <p>Not have playlist</p>
        )}
      </div>
    </div>
  );
}
