import Button from "@/component/atoms/Button";
import { items, items2 } from "./dataItem";
import { Fragment } from "react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
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
        <p className="cursor-pointer hover:text-slate-100">Playlist name...</p>
      </div>
    </div>
  );
}
