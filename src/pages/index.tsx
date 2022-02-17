import Content from "@/component/organisms/Content";
import Footer from "@/component/organisms/Footer";
import Sidebar from "@/component/organisms/Sidebar";
import useSpotify from "hooks/useSpotify";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";

const Home: NextPage = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const timeExpires = useMemo(() => {
    const timeMilisecond = new Date(
      Date.parse(`${session?.expires}`) - Date.now()
    );
    return timeMilisecond;
  }, [session?.expires]);

  useEffect(() => {
    if (timeExpires.getMinutes() === 0) {
      spotifyApi.getAccessToken();
    }
  }, [spotifyApi, timeExpires]);

  return (
    <div className=" bg-gray-900 h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Content />
      </main>

      <footer className="relative">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
};
