import Song from "@/component/molecules/Song";
import { useAtomValue } from "jotai";
import { Fragment } from "react";
import { playlistState } from "src/store/playlist";

export default function Songs() {
  const playlist: any = useAtomValue(playlistState);

  return (
    <div>
      {playlist?.tracks?.items.map((item: any, i: number) => (
        <Fragment key={item.track.id}>
          <Song item={item} order={i} />
        </Fragment>
      ))}
    </div>
  );
}
