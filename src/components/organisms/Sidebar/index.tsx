import Button from "@/component/atoms/Button";
import { items, items2 } from "./dataItem";
import { Fragment, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "hooks/useSpotify";

export default function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [pllaylist, setPlaylist] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylist(data.body.items);
      });
    }
  }, [spotifyApi]);

  console.log(pllaylist);

  return (
    <div className=" text-gray-500 p-5 text-sm border-r border-gray-700 overflow-y-auto scrollbar-hide h-screen">
      <div className="space-y-4 ">
        <Button
          title="Log out"
          onClick={() => signOut({ callbackUrl: "/login" })}
        />
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
        {pllaylist.length > 1 ? (
          pllaylist.map((item: any) => (
            <Fragment key={item.id}>
              <p className="cursor-pointer hover:text-slate-100">{item.name}</p>
            </Fragment>
          ))
        ) : (
          <p>Not have playlist</p>
        )}
      </div>
    </div>
  );
}
