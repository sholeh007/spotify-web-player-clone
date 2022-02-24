import { useSetAtom } from "jotai";
import spotifyApi from "lib/spotify";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { deviceId } from "src/store/songAtom";

export default function useSpotify() {
  const { data: session } = useSession();
  const setDeviceId = useSetAtom(deviceId);

  useEffect(() => {
    if (session) {
      if (session.error === "RefrehAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session.user.accessToken);
      spotifyApi.getMyDevices().then((data) => setDeviceId(data.body.devices));
    }
    return;
  }, [session, setDeviceId]);

  return spotifyApi;
}
