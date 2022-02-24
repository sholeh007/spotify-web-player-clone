import { items, items2 } from "./dataItem";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAtom, useSetAtom } from "jotai";
import { playlistIdState, sideState } from "src/store/playlist";
import Button from "@/component/atoms/Button";
import useSpotify from "hooks/useSpotify";
import csx from "classnames";

export default function Sidebar() {
  const spotifyApi = useSpotify();
  const setPlaylistId = useSetAtom(playlistIdState);
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useState<any>([]);
  const [showSide, setShowSide] = useAtom(sideState);

  const classname = csx(
    "text-gray-500 p-5 pb-36 text-xs lg:text-sm w-48 border-r border-gray-700 overflow-y-auto scrollbar-hide h-screen md:block",
    { hidden: !showSide }
  );

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
    <div className={classname}>
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
                onClick={() => {
                  setPlaylistId(item.id);
                  setShowSide(false);
                }}
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
