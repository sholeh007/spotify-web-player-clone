import { MouseEventHandler, ReactElement } from "react";

type propsType = {
  icon?: ReactElement;
  title: string;
  onClick?: MouseEventHandler;
};

export default function Button({ icon, title, onClick }: propsType) {
  return (
    <button
      className="flex items-center space-x-2 hover:text-slate-100"
      onClick={onClick}
    >
      {icon}
      <p>{title}</p>
    </button>
  );
}
