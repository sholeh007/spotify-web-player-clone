import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { getRandomInt } from "lib/getRandomInt";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yelllow-500",
  "from-pink-500",
  "from-violet-500",
];

export default function Content() {
  const { data: session } = useSession();
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    setColor(colors[getRandomInt(6)]);
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-2 bg-gray-900 rounded-full opacity-90 hover:opacity-80 cursor-pointer p-1 pr-2">
          <Image
            className="rounded-full"
            src={session?.user?.image || "/img/avatar.svg"}
            width={40}
            height={40}
            alt="avatar"
            placeholder="blur"
            blurDataURL={session?.user?.image || "/img/avatar.svg"}
          />
          <h2 className="text-slate-100">{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5 text-slate-100" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-slate-100 p-8`}
      >
        <h1>Hello</h1>
      </section>
    </div>
  );
}
