import Content from "@/component/organisms/Content";
import Footer from "@/component/organisms/Footer";
import Sidebar from "@/component/organisms/Sidebar";
import useSpotify from "hooks/useSpotify";
import Head from "next/head";
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
    <>
      <Head>
        <title>Spotify Clone</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Spotify Clone" />
      </Head>
      <div className=" bg-gray-900 h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Content />
        </main>

        <footer className="sticky bottom-0">
          <Footer />
        </footer>
      </div>
    </>
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
