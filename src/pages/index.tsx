import Content from "@/component/organisms/Content";
import Footer from "@/component/organisms/Footer";
import Sidebar from "@/component/organisms/Sidebar";
import type { NextPage } from "next";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
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

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
}
