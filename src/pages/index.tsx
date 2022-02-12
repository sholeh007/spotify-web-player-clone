import Content from "@/component/organisms/Content";
import Footer from "@/component/organisms/Footer";
import Sidebar from "@/component/organisms/Sidebar";
import type { NextPage } from "next";

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
