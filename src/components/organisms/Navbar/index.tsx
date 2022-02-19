import Image from "next/image";
import Button from "@/component/atoms/Button";
import csx from "classnames";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuAlt1Icon,
} from "@heroicons/react/outline";
import { useSetAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";
import { sideState } from "src/store/playlist";
import { useState } from "react";

export default function Navbar() {
  const setSideState = useSetAtom(sideState);
  const { data: session } = useSession();
  const [detail, setDetail] = useState<boolean>(false);

  const classname = csx({
    "absolute top-5 right-5 bg-gray-900": true,
    "rounded-full": !detail,
  });

  return (
    <>
      <div className="absolute top-5 left-5 cursor-pointer md:hidden">
        <MenuAlt1Icon
          className="h-5 w-5 text-slate-100"
          onClick={() => setSideState((old) => !old)}
        />
      </div>
      <header className={classname}>
        <div
          className="flex items-center space-x-2 opacity-90 hover:opacity-80 cursor-pointer pr-2"
          onClick={() => setDetail(!detail)}
        >
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
          {detail ? (
            <ChevronUpIcon className="h-5 w-5 text-slate-100" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-slate-100" />
          )}
        </div>
        {detail && (
          <>
            <div className=" mt-2 border-t-[1px] border-gray-700 " />
            <div className="text-slate-100 p-2 hover:opacity-80 ">
              <Button onClick={() => signOut()} title="logout" />
            </div>
          </>
        )}
      </header>
    </>
  );
}
