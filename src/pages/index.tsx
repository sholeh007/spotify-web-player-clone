import Sidebar from "@/component/organisms/Sidebar";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className=" bg-gray-900 h-screen overflow-hidden">
      <main>
        <Sidebar />
        {/* Center */}
      </main>

      <footer>{/* Player */}</footer>
    </div>
  );
};

export default Home;
